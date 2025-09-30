# QECopilot - Test at speed of AI

**A seamless and autonomous test automation solution for the era of AI**

## 🚀 What is QECopilot?

QECopilot is an AI-powered system that automatically generates test automation scripts from Gherkin feature files using GitHub Copilot in autonomous agent mode. It runs directly in your GitHub Actions CI/CD pipeline.

### The Problem
- Development teams move at AI-fueled speed
- QE teams become bottlenecks
- Manual test scripting is time-consuming

### The Solution
QECopilot uses GitHub Copilot CLI to autonomously generate test automation code, enabling:
- **80% reduction** in test scripting time
- **Instant test generation** from feature files
- **Zero manual coding** for test automation
- **Continuous testing** at development speed
- **QE-led testing** - Quality Engineers create feature files with testing expertise and critical thinking

## ✨ Key Features

- **🤖 Autonomous Generation** - Copilot CLI generates test code without manual approval
- **📦 Smart Setup** - Creates package.json/pom.xml on first run, skips on subsequent runs
- **🔒 Secure** - Uses GitHub's native authentication, no external API keys
- **🎯 Context-Aware** - Understands repository structure and coding patterns
- **⚡ Fast** - Runs in parallel with your CI/CD pipeline
- **🚀 Optimized Dependencies** - Dynamic dependency installation based on automation stack for maximum efficiency
- **🔧 Customizable** - Modify instructions to match your coding standards
- **🛠️ Framework Agnostic** - Supports multiple automation tools and languages

## 🎬 How It Works

1. **Quality Engineer** creates/modifies a Gherkin feature file with testing expertise
2. **PR Creation** triggers the GitHub Actions workflow
3. **Copilot Agent** reads the feature file and framework-specific instructions
4. **Code Generation** - Copilot generates test automation scripts
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

## 🔄 Dynamic Dependency Installation

### How It Works

The GitHub Actions workflows use **dynamic dependency installation** to optimize build performance and resource usage. Instead of installing all possible dependencies, the system only installs what's needed for your chosen automation stack.

### Benefits

- **🚀 Faster Builds**: Only install dependencies required for your specific automation stack
- **💰 Reduced Costs**: Minimize GitHub Actions minutes and resource usage
- **🧹 Clean Dependencies**: Maintain lean package.json/pom.xml files without bloat
- **🎯 Stack-Specific**: Each automation stack gets exactly the dependencies it needs
- **⚡ Efficient Scaling**: Handle high-volume testing without unnecessary overhead

### Implementation

The workflows use conditional logic to install dependencies based on the `AUTOMATION_STACK` variable:

```yaml
- name: Install Dependencies
  run: |
    if [ "${{ env.AUTOMATION_STACK }}" = "playwright-typescript" ]; then
      npm install @playwright/test @cucumber/cucumber typescript @types/node
    elif [ "${{ env.AUTOMATION_STACK }}" = "webdriverio-typescript" ]; then
      npm install @wdio/cli @wdio/cucumber-framework @wdio/local-runner @wdio/spec-reporter @cucumber/cucumber typescript @types/node
    elif [ "${{ env.AUTOMATION_STACK }}" = "playwright-java" ] || [ "${{ env.AUTOMATION_STACK }}" = "selenium-java" ]; then
      mvn install
    fi
```

### Minimal Configuration Templates

The system uses minimal package.json/pom.xml templates that are populated with stack-specific dependencies during runtime:

**package.json (Node.js stacks):**
```json
{
  "name": "qecopilot-test-at-speed-of-ai",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {}
}
```

**pom.xml (Java stacks):**
```xml
<project>
    <groupId>com.qecopilot</groupId>
    <artifactId>qecopilot-test-automation</artifactId>
    <version>1.0.0</version>
    <!-- Dependencies added dynamically by workflow -->
</project>
```

## 🔄 Dynamic Instruction File Selection

### How It Works

The GitHub Actions workflows **automatically** select the correct instruction file based on the `AUTOMATION_STACK` environment variable.

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  1. Developer Sets Automation Stack in Workflow             │
│                                                              │
│  env:                                                        │
│    AUTOMATION_STACK: playwright-typescript                  │
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
│  4. Copilot Reads Framework-Specific Instructions            │
│                                                              │
│  copilot -p "Feature: $FEATURE_CONTENT                      │
│             Instructions: $INSTRUCTIONS"                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Copilot Generates Code for Selected Framework           │
│                                                              │
│  If playwright-typescript → .page.ts with Playwright API    │
│  If playwright-java → .java with Playwright Java API        │
│  If selenium-java → .java with Selenium WebDriver API       │
│  If webdriverio-typescript → .page.ts with WebdriverIO API  │
└─────────────────────────────────────────────────────────────┘
```

### Example: Dynamic Path Construction

```yaml
- name: Invoke Copilot Agent to Generate Scripts
  run: |
    # This line dynamically builds the path based on AUTOMATION_STACK
    INSTRUCTIONS=$(cat ./.github/instructions/QECopilot-${{ env.AUTOMATION_STACK }}-instructions.md)
    
    copilot -p "Instructions: $INSTRUCTIONS
    Feature: ${{ steps.read-feature.outputs.content }}"
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

**Monthly Cost: ~$20-30**

Breakdown:
- **GitHub Copilot Subscription**: $10-19/month
  - Individual: $10/month
  - Business: $19/month per user
  - Enterprise: $39/month per user
- **GitHub Actions Minutes**: $5-10/month
  - 2,000 free minutes included
  - Additional: $0.008/minute
  - Typical usage: ~$5-10/month

**What's Included:**
- ✅ 24/7 availability
- ✅ All frameworks (Playwright, Selenium, WebdriverIO)
- ✅ Unlimited test generation
- ✅ No LLM API costs (uses GitHub Copilot)
- ✅ No infrastructure costs
- ✅ No maintenance costs
- ✅ Zero training costs
- ✅ Framework switching at no additional cost

**Annual Cost:**
```
Individual Plan:    $180-240/year
Business Plan:      $300-360/year per user
Enterprise Plan:    $540-600/year per user
```

## 🔐 Security

- ✅ Uses GitHub's native `GITHUB_TOKEN`
- ✅ Granular tool permissions (`--allow-tool`, `--deny-tool`)
- ✅ No external API keys required
- ✅ Runs in isolated GitHub Actions environment
- ✅ All changes require PR review before merge

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
2. **GitHub Copilot CLI** installed (if testing locally)
3. **GitHub Copilot Subscription** (Individual, Business, or Enterprise)

### Step 1: Copy Configuration Files

Copy the `.github/` directory to your repository:

```bash
cp -r .github/ your-repo/
cd your-repo
```

### Step 2: Configure Your Automation Stack

Edit `.github/workflows/QECopilot_GithubActions_integreated_workflow.yml`:

```yaml
env:
  # Choose your automation stack
  AUTOMATION_STACK: playwright-typescript  # Change this
```

### Step 3: Configure Repository Settings

1. Go to your repository **Settings**
2. Navigate to **Secrets and variables > Actions**
3. Add repository secret `AI_API_KEY` (if needed)
4. Go to **Settings > Actions > General**
5. Under "Workflow permissions", select **"Read and write permissions"**

### Step 4: Create Your First Feature File

```bash
mkdir -p features
cat > features/login.feature << 'EOF'
Feature: User Login
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be signed in successfully
EOF
```

### Step 5: Commit and Create PR

```bash
git add .
git commit -m "feat: Add login feature"
git push origin main
git checkout -b feature/login-tests
git push origin feature/login-tests
```

Create a Pull Request and watch QECopilot in action!

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
