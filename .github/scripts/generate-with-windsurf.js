#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables
const WINDSURF_API_KEY = process.env.WINDSURF_API_KEY;
const WINDSURF_API_URL = process.env.WINDSURF_API_URL || 'https://api.windsurf.ai/v1/chat/completions';
const FEATURE_FILE = process.argv[2];
const INSTRUCTIONS_FILE = process.argv[3];

if (!WINDSURF_API_KEY) {
    console.error('Error: WINDSURF_API_KEY environment variable is required');
    process.exit(1);
}

if (!FEATURE_FILE || !INSTRUCTIONS_FILE) {
    console.error('Usage: node generate-with-windsurf.js <feature-file> <instructions-file>');
    process.exit(1);
}

async function generateAutomationCode() {
    try {
        // Read feature file and instructions
        const featureContent = fs.readFileSync(FEATURE_FILE, 'utf8');
        const instructionsContent = fs.readFileSync(INSTRUCTIONS_FILE, 'utf8');

        const prompt = `You are a test automation code generator. 

Feature File:
${featureContent}

Instructions:
${instructionsContent}

Task: Generate Page Object Model (.page.ts) and Step Definition (.steps.ts) files following the instructions. 
Write the files to pages/ and steps/ directories.

Please respond with a JSON object containing:
{
  "pageObject": "file content here",
  "stepDefinition": "file content here"
}`;

        console.log('Generating automation code with Windsurf SWE...');

        const response = await fetch(WINDSURF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WINDSURF_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'QECopilot/1.0'
            },
            body: JSON.stringify({
                model: 'windsurf-swe',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Windsurf API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        const responseContent = data.choices[0].message.content;

        // Parse JSON response
        let parsedResponse;
        try {
            // Extract JSON from the response (handle cases where AI adds extra text)
            const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedResponse = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Error parsing Windsurf response:', parseError);
            console.error('Raw response:', responseContent);
            throw new Error('Failed to parse Windsurf response as JSON');
        }

        // Generate file names
        const featureName = path.basename(FEATURE_FILE, '.feature');
        const pageObjectFile = path.join(process.cwd(), 'pages', `${featureName}.page.ts`);
        const stepDefinitionFile = path.join(process.cwd(), 'steps', `${featureName}.steps.ts`);

        // Ensure directories exist
        fs.mkdirSync(path.dirname(pageObjectFile), { recursive: true });
        fs.mkdirSync(path.dirname(stepDefinitionFile), { recursive: true });

        // Write generated files
        fs.writeFileSync(pageObjectFile, parsedResponse.pageObject);
        fs.writeFileSync(stepDefinitionFile, parsedResponse.stepDefinition);

        console.log(`✅ Generated Page Object: ${pageObjectFile}`);
        console.log(`✅ Generated Step Definition: ${stepDefinitionFile}`);

    } catch (error) {
        console.error('❌ Error generating automation code:', error.message);
        process.exit(1);
    }
}

generateAutomationCode();
