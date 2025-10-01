# QECopilot Instructions - Multiple Automation Frameworks

This directory contains instruction files for different automation tool combinations. Choose the instruction file that matches your preferred automation stack.

## Available Instruction Files

### 1. **QECopilot-playwright-typescript-instructions.md** (Recommended)
- **Framework**: Playwright
- **Language**: TypeScript
- **Package Manager**: npm
- **Best For**: Modern web applications, fast execution, built-in waiting
- **Dependencies**: @playwright/test, @cucumber/cucumber

### 2. **QECopilot-playwright-java-instructions.md**
- **Framework**: Playwright
- **Language**: Java
- **Build Tool**: Maven
- **Best For**: Java-based projects, enterprise applications
- **Dependencies**: com.microsoft.playwright, cucumber-java

### 3. **QECopilot-selenium-java-instructions.md**
- **Framework**: Selenium WebDriver
- **Language**: Java
- **Build Tool**: Maven
- **Best For**: Legacy applications, wide browser support, mature ecosystem
- **Dependencies**: selenium-java, cucumber-java

### 4. **QECopilot-webdriverio-typescript-instructions.md**
- **Framework**: WebdriverIO
- **Language**: TypeScript
- **Package Manager**: npm
- **Best For**: Node.js projects, flexible configuration, mobile testing
- **Dependencies**: @wdio/cli, @wdio/cucumber-framework

## How to Use

### LLM Provider Selection

QECopilot supports multiple LLM providers for generating test automation scripts:

- **copilot**: GitHub Copilot CLI (default)
- **openai**: OpenAI GPT-4 via API
- **claude**: Anthropic Claude via API  
- **windsurf**: Windsurf SWE via API

Configure the LLM provider using the `LLM_PROVIDER` environment variable or repository variable:

```yaml
env:
  LLM_PROVIDER: ${{ vars.LLM_PROVIDER || 'copilot' }}
```

### Option 1: Specify in Workflow (Recommended)

Update your GitHub Actions workflow to specify which instruction file to use:

```yaml
- name: Invoke Copilot Agent to Generate Scripts
  run: |
    INSTRUCTIONS=$(cat ./.github/instructions/QECopilot-playwright-typescript-instructions.md)
    copilot -p "..." \
      --allow-tool 'write'
```

### Option 2: Environment Variable

Set an environment variable in your workflow:

```yaml
env:
  INSTRUCTION_FILE: QECopilot-playwright-typescript-instructions.md

- name: Invoke Copilot Agent to Generate Scripts
  run: |
    INSTRUCTIONS=$(cat ./.github/instructions/${{ env.INSTRUCTION_FILE }})
```

### Option 3: Repository Variable

Configure in GitHub Repository Settings → Variables:
- Variable name: `AUTOMATION_STACK`
- Variable value: `playwright-typescript` or `selenium-java` etc.
- Variable name: `LLM_PROVIDER`  
- Variable value: `copilot`, `openai`, `claude`, or `windsurf`

Then reference in workflow:
```yaml
INSTRUCTIONS=$(cat ./.github/instructions/QECopilot-${{ vars.AUTOMATION_STACK }}-instructions.md)
```

### Windsurf SWE Setup

To use Windsurf SWE as your LLM provider:

1. **Add API Key as GitHub Secret**:
   - Secret name: `WINDSURF_API_KEY`
   - Value: Your Windsurf SWE API key

2. **Optional: Configure API URL** (if different from default):
   - Variable name: `WINDSURF_API_URL`
   - Value: `https://api.windsurf.ai/v1/chat/completions`

3. **Set LLM Provider**:
   ```yaml
   env:
     LLM_PROVIDER: windsurf
   ```

## Customization

You can customize any instruction file to match your specific requirements:

1. **Locator Strategies**: Modify preferred selector methods
2. **Code Patterns**: Change class structures or naming conventions
3. **Dependencies**: Update package versions
4. **Directory Structure**: Adjust output paths
5. **Code Quality**: Add specific linting or formatting rules

## Creating Custom Instructions

To create a custom instruction file for your stack:

1. Copy an existing instruction file
2. Rename it: `QECopilot-<framework>-<language>-instructions.md`
3. Update the framework-specific sections:
   - Dependencies (package.json or pom.xml)
   - Import statements
   - Locator strategies
   - Assertion libraries
   - Code examples
4. Test with a sample feature file
5. Commit to your repository

## Framework Comparison

| Framework | Language | Speed | Learning Curve | Browser Support | Mobile Support |
|-----------|----------|-------|----------------|-----------------|----------------|
| Playwright | TypeScript | ⚡⚡⚡ | Easy | Modern browsers | Limited |
| Playwright | Java | ⚡⚡⚡ | Medium | Modern browsers | Limited |
| Selenium | Java | ⚡⚡ | Easy | All browsers | Via Appium |
| WebdriverIO | TypeScript | ⚡⚡⚡ | Medium | All browsers | ✅ Native |

## Best Practices

1. **Choose One Stack**: Use a single instruction file per project
2. **Version Control**: Commit your chosen instruction file
3. **Team Alignment**: Ensure team agrees on the automation stack
4. **Regular Updates**: Keep dependencies up to date
5. **Test Coverage**: Validate generated code with sample features

## Support

For framework-specific questions:
- **Playwright**: https://playwright.dev/docs
- **Selenium**: https://www.selenium.dev/documentation/
- **WebdriverIO**: https://webdriver.io/docs/gettingstarted
- **Cucumber**: https://cucumber.io/docs/cucumber/

---

**Default**: If no instruction file is specified, the workflow uses `QECopilot-playwright-typescript-instructions.md` (default)
