#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const FEATURE_FILE = process.argv[2];
const INSTRUCTIONS_FILE = process.argv[3];

if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    process.exit(1);
}

if (!FEATURE_FILE || !INSTRUCTIONS_FILE) {
    console.error('Usage: node generate-with-openai.js <feature-file> <instructions-file>');
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

        console.log('Generating automation code with OpenAI...');

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert test automation code generator. Always respond with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Parse JSON response
        const generatedCode = JSON.parse(content);
        
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
