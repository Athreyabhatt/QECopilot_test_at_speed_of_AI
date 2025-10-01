#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FEATURE_FILE = process.argv[2];
const INSTRUCTIONS_FILE = process.argv[3];

if (!ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
}

if (!FEATURE_FILE || !INSTRUCTIONS_FILE) {
    console.error('Usage: node generate-with-claude.js <feature-file> <instructions-file>');
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

        console.log('Generating automation code with Claude...');

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': ANTHROPIC_API_KEY,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.content[0].text;
        
        // Extract JSON from response (Claude might wrap it in markdown)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Could not parse JSON response from Claude');
        }
        
        const generatedCode = JSON.parse(jsonMatch[0]);
        
        // Create directories if they don't exist
        if (!fs.existsSync('pages')) {
            fs.mkdirSync('pages', { recursive: true });
        }
        if (!fs.existsSync('steps')) {
            fs.mkdirSync('steps', { recursive: true });
        }
        
        // Extract feature name for file naming
        const featureName = path.basename(FEATURE_FILE, '.feature');
        
        // Write generated files
        const pageObjectFile = `pages/${featureName}.page.ts`;
        const stepDefinitionFile = `steps/${featureName}.steps.ts`;
        
        fs.writeFileSync(pageObjectFile, generatedCode.pageObject);
        fs.writeFileSync(stepDefinitionFile, generatedCode.stepDefinition);
        
        console.log(`✅ Generated files:`);
        console.log(`   - ${pageObjectFile}`);
        console.log(`   - ${stepDefinitionFile}`);
        
    } catch (error) {
        console.error('Error generating automation code:', error.message);
        process.exit(1);
    }
}

generateAutomationCode();
