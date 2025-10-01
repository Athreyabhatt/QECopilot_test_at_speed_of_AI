# QECopilot - Test at speed of AI

**A seamless and autonomous test automation solution for the era of AI**

## 🚀 What is QECopilot?

QECopilot is an AI-powered system that automatically generates test automation scripts from Gherkin feature files using configurable LLM providers (GitHub Copilot, OpenAI, Anthropic Claude, or Windsurf SWE). It runs directly in your GitHub Actions CI/CD pipeline.

### The Problem
- Development teams move at AI-fueled speed
- QE teams become bottlenecks
- Manual test scripting is time-consuming

### The Solution
QECopilot uses configurable LLM providers to autonomously generate test automation code, enabling:
- **80% reduction** in test scripting time
- **Instant test generation** from feature files
- **Zero manual coding** for test automation
- **Continuous testing** at development speed
- **QE-led testing** - Quality Engineers create feature files with testing expertise and critical thinking

## ✨ Key Features

- **🤖 Autonomous Generation** - Configurable LLM providers generate test code without manual approval
- **📦 Smart Setup** - Creates package.json/pom.xml on first run, skips on subsequent runs
- **🔒 Secure** - Uses GitHub's native authentication and secrets management
- **🎯 Context-Aware** - Understands repository structure and coding patterns
- **⚡ Fast** - Runs in parallel with your CI/CD pipeline
- **🔄 Provider Flexibility** - Switch between Copilot, OpenAI, Claude, and Windsurf SWE without code changes
- **⚙️ Repository Configuration** - Configure settings through GitHub UI, not workflow files
- **🔧 Customizable** - Modify instructions to match your coding standards
- **🛠️ Framework Agnostic** - Supports multiple automation tools and languages
- **🚀 Optimized Dependencies** - Only install required dependencies for your chosen stack

## 🎬 How It Works

1. **Quality Engineer** creates/modifies a Gherkin feature file with testing expertise
2. **PR Creation** triggers the GitHub Actions workflow
3. **Configured LLM Provider** reads the feature file and framework-specific instructions
4. **Code Generation** - LLM generates test automation scripts
5. **Test Execution** - Runs the generated tests against your application
6. **Auto-Commit** - Commits generated scripts back to the PR branch
7. **PR Status** - Shows test results and generated code

## 📁 Repository Structure

```
Your Project/
├── .github/
│   ├── workflows/
│   │   ├── QECopilot_GithubActions_integreated_workflow.yml
│   │   └── QECopilot_GithubActions_dedicated_workflow.yml
│   ├── scripts/
│   │   ├── generate-with-openai.js      # OpenAI API integration script
│   │   ├── generate-with-claude.js      # Anthropic Claude API integration script
│   │   └── generate-with-windsurf.js    # Windsurf SWE API integration script
│   └── instructions/
│       ├── QECopilot-playwright-typescript-instructions.md
│       ├── QECopilot-playwright-java-instructions.md
│       ├── QECopilot-selenium-java-instructions.md
│       ├── QECopilot-webdriverio-typescript-instructions.md
│       └── COMPREHENSIVE_GUIDE.md  # This file
├── features/          # Your Gherkin feature files
├── pages/            # Generated page objects
├── steps/            # Generated step definitions
├── package.json      # Generated (Node.js projects)
├── pom.xml          # Generated (Java projects)
└── README.md         # Your project README
```

## 🛠️ Supported Automation Stacks

QECopilot supports multiple automation frameworks and languages:

| Stack | Framework | Language | Best For |
|-------|-----------|----------|----------|
| `playwright-typescript` | Playwright | TypeScript | Modern web apps, fast execution |
| `playwright-java` | Playwright | Java | Enterprise Java projects |
| `selenium-java` | Selenium | Java | Legacy apps, wide browser support |
| `webdriverio-typescript` | WebdriverIO | TypeScript | Mobile testing, Node.js projects |

## 🚀 Quick Start: Choosing Your Automation Stack

### Step 1: Choose Your Stack

Open `.github/workflows/QECopilot_GithubActions_integreated_workflow.yml`

Find this section:
```yaml
env:
  # Choose your automation stack
  AUTOMATION_STACK: playwright-typescript
```

### Step 2: Change the Value

Replace `playwright-typescript` with your preferred stack:

```yaml
env:
  AUTOMATION_STACK: selenium-java  # ← Your choice here
```

### Step 3: Commit and Push

```bash
git add .github/workflows/
git commit -m "Configure automation stack"
git push
```

**Done!** Next PR will use your selected stack.

### Available Stacks

Copy-paste one of these values:

```yaml
# Option 1: Playwright + TypeScript (Recommended for modern web apps)
AUTOMATION_STACK: playwright-typescript

# Option 2: Playwright + Java (For Java teams)
AUTOMATION_STACK: playwright-java

# Option 3: Selenium + Java (For legacy apps or wide browser support)
AUTOMATION_STACK: selenium-java

# Option 4: WebdriverIO + TypeScript (For mobile testing)
AUTOMATION_STACK: webdriverio-typescript
```

## 🔄 Dynamic Instruction File Selection

### How It Works

The GitHub Actions workflows **automatically** select the correct instruction file based on the `AUTOMATION_STACK` repository variable.

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  1. Quality Engineer Sets Configuration via Repository Variables       │
│                                                              │
│  GitHub Settings → Secrets and variables → Actions → Variables:      │
│    AUTOMATION_STACK: playwright-typescript                  │
│    LLM_PROVIDER: copilot                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  2. PR Triggers Workflow                                     │
│                                                              │
│  - Feature file changed                                      │
│  - Workflow starts                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Workflow Dynamically Loads Instruction File              │
│                                                              │
│  INSTRUCTIONS=$(cat ./.github/instructions/                 │
│    QECopilot-${{ env.AUTOMATION_STACK }}-instructions.md)   │
│                                                              │
│  Result: ./.github/instructions/                            │
│          QECopilot-playwright-typescript-instructions.md    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Configured LLM Provider Reads Instructions               │
│                                                              │
│  if LLM_PROVIDER == "copilot":                               │
│    copilot -p "Feature: $FEATURE_CONTENT                     │
│               Instructions: $INSTRUCTIONS"                   │
│  elif LLM_PROVIDER == "openai":                             │
│    node generate-with-openai.js $FEATURE_FILE $INSTRUCTIONS  │
│  elif LLM_PROVIDER == "claude":                             │
│    node generate-with-claude.js $FEATURE_FILE $INSTRUCTIONS  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  5. LLM Generates Code for Selected Framework                │
│                                                              │
│  If playwright-typescript → .page.ts with Playwright API    │
│  If playwright-java → .java with Playwright Java API        │
│  If selenium-java → .java with Selenium WebDriver API       │
│  If webdriverio-typescript → .page.ts with WebdriverIO API  │
└─────────────────────────────────────────────────────────────┘
```

### Result: Automatic Framework Selection

- If `AUTOMATION_STACK: playwright-typescript` → Loads `QECopilot-playwright-typescript-instructions.md`
- If `AUTOMATION_STACK: selenium-java` → Loads `QECopilot-selenium-java-instructions.md`
- If `AUTOMATION_STACK: playwright-java` → Loads `QECopilot-playwright-java-instructions.md`
- If `AUTOMATION_STACK: webdriverio-typescript` → Loads `QECopilot-webdriverio-typescript-instructions.md`

## 📊 Benefits

### Time & Productivity
- **⏱️ 80-95% reduction** in test scripting time
- **🚀 2x faster releases** - Tests generated at AI speed
- **👥 QE empowerment** - Focus on strategy, not scripting
- **📈 Infinite scalability** - Generate tests as fast as features are written
- **💰 Early bug detection** - Catch issues in PR, not production

### Cost to Run QECopilot

**Monthly Cost: Varies by LLM Provider**

#### Option 1: GitHub Copilot (Recommended)
**Monthly Cost: ~$20-30**
- **GitHub Copilot Subscription**: $10-19/month
  - Individual: $10/month
  - Business: $19/month per user
  - Enterprise: $39/month per user
- **GitHub Actions Minutes**: $5-10/month
  - 2,000 free minutes included
  - Additional: $0.008/minute
  - Typical usage: ~$5-10/month

#### Option 2: OpenAI API
**Monthly Cost: ~$15-50+**
- **OpenAI API Usage**: $10-40/month
  - GPT-4: ~$0.03-0.06 per 1K tokens
  - Typical test generation: ~$0.10-0.50 per feature file
  - Volume depends on testing needs
- **GitHub Actions Minutes**: $5-10/month

#### Option 3: Anthropic Claude
**Monthly Cost: ~$15-45+**
- **Anthropic API Usage**: $10-35/month
  - Claude 3: ~$0.015-0.03 per 1K tokens
  - Typical test generation: ~$0.08-0.40 per feature file
  - Volume depends on testing needs
- **GitHub Actions Minutes**: $5-10/month

#### Option 4: Windsurf SWE
**Monthly Cost: ~$20-60+**
- **Windsurf SWE API Usage**: $15-50/month
  - Windsurf SWE: ~$0.02-0.05 per 1K tokens (estimated)
  - Typical test generation: ~$0.12-0.60 per feature file
  - Volume depends on testing needs
- **GitHub Actions Minutes**: $5-10/month

**What's Included (All Providers):**
- ✅ 24/7 availability
- ✅ All frameworks (Playwright, Selenium, WebdriverIO)
- ✅ Unlimited test generation
- ✅ No infrastructure costs
- ✅ No maintenance costs
- ✅ Zero training costs
- ✅ Framework switching at no additional cost
- ✅ Provider switching at no additional cost

**Annual Cost Estimates:**
```
Copilot Individual:   $180-240/year
Copilot Business:     $300-360/year per user
OpenAI (moderate use): $180-600/year
Claude (moderate use): $180-540/year
Windsurf (moderate use): $240-720/year
```

## 🔐 Security

### GitHub Copilot Provider
- ✅ Uses GitHub's native `GITHUB_TOKEN`
- ✅ Granular tool permissions (`--allow-tool`, `--deny-tool`)
- ✅ No external API keys required
- ✅ Runs in isolated GitHub Actions environment
- ✅ All changes require PR review before merge

### OpenAI, Claude & Windsurf SWE Providers
- ✅ API keys stored as GitHub repository secrets
- ✅ Secure secret management with encryption
- ✅ Access restricted to repository workflows
- ✅ Runs in isolated GitHub Actions environment
- ✅ All changes require PR review before merge
- ✅ No external API exposure

### Common Security Features
- ✅ No hardcoded credentials in workflow files
- ✅ Audit trail through GitHub Actions logs
- ✅ Repository-level access control
- ✅ Temporary credentials with workflow scope

## 🧪 Example Feature File

```gherkin
Feature: User Login
  As a user
  I want to log into the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be signed in successfully

  Scenario: Invalid login
    Given I am on the login page
    When I enter invalid credentials
    Then I should see an error message
```

## 🎯 Two Workflow Scenarios

### Scenario 1: Integrated Team Workflow

**Use when:** Developers and QEs work in the same repository

```
Developer ──┐
            ├─ PR Branch ──┐
QE ─────────┘              │
                           ▼
                    GitHub Actions
                           │
                           ▼
                    Copilot Agent
                           │
                           ▼
                    Generate Tests
                           │
                           ▼
                    Run Tests (Local)
                           │
                           ▼
                    Commit Tests
                           │
                           ▼
                    PR Updated
```

### Scenario 2: Dedicated QA Team Workflow

**Use when:** QA team is separate from development team

```
Developer ──┐
            ├─ Deploy to Non-Prod
QE ─────────┘
            │
            ▼
        PR Branch
            │
            ▼
    GitHub Actions
            │
            ▼
     Copilot Agent
            │
            ▼
     Generate Tests
            │
            ▼
     Run Tests (Non-Prod URL)
            │
            ▼
     Commit Tests
            │
            ▼
     PR Updated
```

## 🛠️ Setup Instructions

### Prerequisites

1. **GitHub Repository** with GitHub Actions enabled
2. **LLM Provider Access**:
   - **For Copilot**: GitHub Copilot subscription
   - **For OpenAI**: OpenAI API key
   - **For Claude**: Anthropic API key
3. **Node.js 18+** (for OpenAI/Claude providers)

### Step 1: Copy Configuration Files

Copy the `.github/` directory to your repository:

```bash
cp -r .github/ your-repo/
cd your-repo
```

This includes:
- Workflow files in `.github/workflows/`
- Instruction files in `.github/instructions/`
- API integration scripts in `.github/scripts/`

### Step 2: Configure Repository Variables

Configure your automation stack and LLM provider through GitHub UI:

1. Go to your repository **Settings**
2. Navigate to **Secrets and variables > Actions > Variables**
3. Add the following variables:
   ```
   AUTOMATION_STACK = playwright-typescript  # Options: playwright-typescript, playwright-java, selenium-java, webdriverio-typescript
   LLM_PROVIDER = copilot                   # Options: copilot, openai, claude
   ```

### Step 3: Configure Repository Secrets (if using OpenAI or Claude)

1. Go to your repository **Settings**
2. Navigate to **Secrets and variables > Actions > Secrets**
3. Add the required secrets based on your LLM provider:
   ```
   OPENAI_API_KEY = your_openai_api_key      # Required for OpenAI provider
   ANTHROPIC_API_KEY = your_anthropic_api_key # Required for Claude provider
   ```

### Step 4: Configure Workflow Permissions

1. Go to **Settings > Actions > General**
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**

### Step 5: Create Your First Feature File

```bash
mkdir -p features
cat > features/login.feature << 'EOF'
Feature: User Login
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be signed in successfully
EOF

### Step 6: Commit and Create PR

```bash
git add .
git commit -m "feat: Add login feature"
git push origin main
git checkout -b feature/login-tests
git push origin feature/login-tests
```

### Step 7: Open Pull Request

1. Go to your repository on GitHub
2. Create a pull request from your feature branch
3. Watch as QECopilot automatically generates test automation scripts! ✨

## 🤖 Choosing Your LLM Provider

### Provider Comparison

| Provider | Model | Cost | Setup Complexity | Best For |
|----------|-------|------|------------------|----------|
| **copilot** | GitHub Copilot | $10-19/month | Low | GitHub integration, no API keys |
| **openai** | GPT-4 | Pay-per-use | Medium | High-quality code, advanced reasoning |
| **claude** | Claude 3 | Pay-per-use | Medium | Natural language, context-aware |

### Recommendation

- **Start with Copilot**: Easiest setup, integrated with GitHub
- **Try OpenAI**: If you need the highest code quality and have budget
- **Consider Claude**: If you prefer natural language processing and cost efficiency

### Switching Providers

To switch between providers, simply update the `LLM_PROVIDER` repository variable:

1. Go to **Settings → Secrets and variables → Actions → Variables**
2. Change `LLM_PROVIDER` to your desired provider
3. No workflow file changes needed!

The next PR will automatically use the new provider.

## 📦 Optimized Dependency Management

### How It Works

The workflows use conditional logic to dynamically install only the required dependencies based on the `AUTOMATION_STACK` environment variable:

```yaml
# For TypeScript stacks (playwright-typescript, webdriverio-typescript)
- name: Install TypeScript dependencies
  if: env.AUTOMATION_STACK == 'playwright-typescript' || env.AUTOMATION_STACK == 'webdriverio-typescript'
  run: |
    npm install @playwright/test @cucumber/cucumber typescript @types node

# For Java stacks (playwright-java, selenium-java)
- name: Install Java dependencies
  if: env.AUTOMATION_STACK == 'playwright-java' || env.AUTOMATION_STACK == 'selenium-java'
  run: |
    mvn install
```

### Minimal Configuration Templates

The system uses minimal configuration files that are populated with stack-specific dependencies during workflow execution:

#### package.json (TypeScript projects)
```json
{
  "name": "qecopilot-test-automation",
  "version": "1.0.0",
  "description": "QECopilot test automation project",
  "scripts": {
    "test": "npx cucumber-js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

#### pom.xml (Java projects)
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.qecopilot</groupId>
    <artifactId>qecopilot-test-automation</artifactId>
    <version>1.0.0</version>
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>
    <dependencies>
        <!-- Dependencies added dynamically based on stack -->
    </dependencies>
</project>
```

### Implementation Details

1. **Conditional Installation**: Workflows check the `AUTOMATION_STACK` variable and only install relevant dependencies
2. **Minimal Templates**: Configuration files contain only basic metadata, keeping repositories clean
3. **Dynamic Population**: Required dependencies are installed during workflow execution based on the chosen stack
4. **Resource Optimization**: Avoids dependency bloat and reduces CI/CD resource consumption

This approach ensures that your repository remains clean and that only the necessary dependencies are installed for your chosen automation stack, leading to faster builds and reduced costs.

## 🔧 Customization

### Modifying Instructions

Each framework has its own instruction file:
- `.github/instructions/QECopilot-playwright-typescript-instructions.md`
- `.github/instructions/QECopilot-playwright-java-instructions.md`
- `.github/instructions/QECopilot-selenium-java-instructions.md`
- `.github/instructions/QECopilot-webdriverio-typescript-instructions.md`

Edit these files to:
- Change coding standards
- Add custom patterns
- Modify test structure
- Add specific requirements

### Adding New Frameworks

1. Create new instruction file: `QECopilot-your-framework-instructions.md`
2. Add framework to workflow: `AUTOMATION_STACK: your-framework`
3. Update documentation

## 🚀 Best Practices

### For QE Teams
- Write clear, unambiguous Gherkin scenarios
- Use consistent naming conventions
- Review generated code for quality
- Provide feedback to improve instructions

### For Development Teams
- Keep feature files updated with application changes
- Coordinate with QE on test scenarios
- Review generated tests in PRs
- Maintain application structure for testability

### For DevOps Teams
- Monitor GitHub Actions performance
- Optimize workflow run times
- Manage Copilot subscriptions
- Ensure proper permissions and security

## 🎉 You're Ready!

Your QECopilot setup is complete. The next time you create or modify a feature file and create a PR, QECopilot will automatically generate and run test automation scripts for your chosen framework.

**Happy automated testing!** 🤖✨
