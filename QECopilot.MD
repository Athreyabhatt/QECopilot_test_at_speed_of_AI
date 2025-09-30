Hackathon Demo Guide: QECopilot - Test at speed of AI

**A seamless and autonomous test automation solution for the era of AI**
Objective: To demonstrate, in under 5 minutes, how our AI-powered system autonomously generates, executes, and commits test automation scripts, adapting to a team's specific workflow and solving the AI-era testing bottleneck.

**NEW: Framework Agnostic Support**
QECopilot now supports multiple automation frameworks and languages:
- Playwright + TypeScript (Modern web apps)
- Playwright + Java (Enterprise Java projects)
- Selenium + Java (Legacy apps, wide browser support)
- WebdriverIO + TypeScript (Mobile testing, Node.js projects)

Simply configure your preferred stack in the workflow file, and Copilot generates framework-specific code automatically.

Part 1: The Setup (To Be Done Before the Demo)
This preparation is the key to a smooth presentation.

1. Create a New Public GitHub Repository:
Name it qecopilot-hackathon-demo.

Initialize it with a README.md.

2. Create a Barebones Web Application:

In the root, create an index.html file.

<!-- index.html -->
<!DOCTYPE html><html><head><title>Demo App</title></head><body><h1>Welcome to the App</h1><p>This is the main page.</p><a href="login.html">Login</a></body></html>

Create a login.html file.

<!-- login.html -->
<!DOCTYPE html><html><head><title>Login</title></head><body><h1>Login Page</h1><input type="text" id="username" aria-label="Username" /><input type="password" id="password" aria-label="Password" /><button>Sign In</button></body></html>

3. Add Project & Agent Files:

Create a package.json file for Node.js dependencies.

{
  "name": "demo-app",
  "version": "1.0.0",
  "devDependencies": {
    "@cucumber/cucumber": "^10.0.0",
    "@playwright/test": "^1.40.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.3"
  }
}

Create the agent/ directory. Inside, create a placeholder run.js. (The content doesn't matter for the demo, as the CI workflow just needs a file to call).

Add the master instructions.md file to the root of the repo.

4. Add the GitHub Actions Workflows:

Create the directory path .github/workflows/.

Add the two YAML files: pr-integrated.yml and qa-non-prod.yml.

5. Configure GitHub Repository Settings:

Go to Settings > Secrets and variables > Actions.

Add a Repository secret named AI_API_KEY. The value can be a placeholder (e.g., placeholder_key), but it must exist.

Go to Settings > Actions > General.

Under "Workflow permissions," select "Read and write permissions". This is CRITICAL for allowing the Action to push code back to your branch.

6. Final Check:

Commit all these files to the main branch.

Your repository is now prepped and ready for the live demo.

Part 2: The Live Demo Script (The "Story")
This demo focuses on Scenario 1 (Integrated Team) as it's the most comprehensive and impressive flow.

(Start with the GitHub repository page open in your browser)

Narrator: "Good morning. We've talked about the AI-fueled speed crisis in development. Now we're going to show you how our solution solves it. Here we have a simple web application repository. Let's walk through a day in the life of a development team using our system."

Step 1: Create the Feature Branch

Action: Open your terminal. Create and switch to a new branch: git checkout -b feature/user-login

Talking Point: "Our story begins. A new feature, 'user login,' has just started development."

Step 2: The QE Defines the Test

Action: Create a features/ directory and a new file inside named login.feature. Paste the following Gherkin code:

Feature: User Login
  Scenario: Successful Login
    Given I am on the login page
    When I enter valid credentials
    Then I should be signed in successfully

Action: Commit the file: git add . && git commit -m "feat(qe): Define login test specification"

Talking Point: "Crucially, our process starts with the QE, the domain expert. They've just defined the required behavior in plain English. Notice, they haven't written a single line of code."

Step 3: The Developer Builds the Feature

Action: Make a small, trivial change to login.html (like adding a comment) so git sees a modification.

Action: Commit the change: git add . && git commit -m "feat(dev): Implement login page UI"

Talking Point: "Next, the developer builds the feature to satisfy the QE's requirements. Now both the test specification and the application code are on the same branch."

Step 4: The Pull Request & The "Wow" Moment

Action: Push the branch to GitHub: git push origin feature/user-login

Action: Switch to your browser. Click "Compare & pull request." Create the Pull Request.

Action: IMMEDIATELY click on the "Actions" tab.

Talking Point: "This is where the magic happens. The moment the PR is created, QECopilot takes over. It detected the new .feature file and has invoked our AI Agent."

Step 5: Narrate the Live Action

Action: Keep the "Actions" tab open. Click on the running workflow to show the live logs.

Talking Point: "As you can see live, the system is now:

Setting up the environment.

Invoking our AI Agent to generate Playwright scripts from the Gherkin file.

Running those brand-new, AI-generated tests against the developer's code.

And now... it's committing the generated test scripts back to the branch."

Step 6: The Proof of Automation

Action: Go back to the Pull Request page.

Talking Point: "The process is complete. Let's look at the results."

Action: Point to the screen.

Show the green checkmark. "The PR is green. The AI-generated tests passed against the dev's code, giving us high confidence."

Show the new commit. "Look here. Our 'QECopilot Bot' has just pushed a new commit. This wasn't a human."

Click on the "Files Changed" tab. "And this is the ultimate proof. These professional-grade, maintainable Playwright test scripts... were written entirely by our AI agent, just moments ago. The QE defined the 'what,' and the AI handled the 'how'."

Narrator (Conclusion): "We have just demonstrated a closed-loop, autonomous system that keeps test automation perfectly in sync with development speed. We didn't just automate the tests; we automated the automation engineer. Thank you."

Part 3: Contingency Plan (The "Safety Net")
If the live demo fails (internet issue, platform outage):

Don't Panic. Acknowledge it calmly: "It seems we're having a live demo gremlin."

Switch to your backup. Have a slide deck ready with screenshots of each key stage: The PR, the successful Action run, the bot's commit, and the generated .ts files.

Use the screenshots to walk through the exact same narrative. The story is just as powerful.

Have a pre-recorded video. As a final backup, have a simple screen recording of the entire successful process on your desktop, ready to play.