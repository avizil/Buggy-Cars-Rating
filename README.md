# 🧪 Playwright Test Suite for [Buggy Cars Rating](https://buggy.justtestit.org/)

## 📚 Table of Contents

-  [Project Structure](#-project-structure)
-  [Installation and Setup](#-installation-and-setup)
-  [How to Run Tests](#-how-to-run-tests)

# 🧪 Playwright TypeScript Test Suite

---

## 📁 Project Structure

.
├── core/
│ ├── api/ # API helpers and request logic
│ ├── pages/ # Page object models
│ └── utils/ # Utility functions
├── env/
│ ├── .env.example # Template for environment variables
│ ├── .env.dev # Example: Development env config
│ └── .env.<envName> # Other environments (staging, prod, etc.)
├── tests/ # Playwright test files
├── config/
│ └── const.ts # Determines which .env.<envName> to use
├── .auth/ # Stored authentication state (e.g., login sessions)
├── playwright.config.ts
├── package.json
└── README.md

## 🚀 Installation and Setup

Follow these steps to install dependencies, configure the environment, and prepare the project for test execution.

### 1. Clone the Repository

Open the desired path to store the repository in terminal, and run:

```bash
git clone <your-repo-url>
cd <your-project-directory>
```

2. Install Dependencies

Make sure you have Node.js v16 or later installed.

```bash
npm install
```

3. Install Playwright Browsers

Playwright requires downloading browser binaries:

```bash
npx playwright install
```

4. Configure Environment Variables

Environment-specific .env files are stored in the env/ directory.

Copy the example .env.example file into a new .env.<your envName> file.
The envName to use is set in ./config/consts.ts:

```typescript
export const env: string = '<envName>';
```

## ▶️ How to Run Tests

This project is organized into three logical test groups (Playwright "projects"):

1. **`setup`** – Handles login and saves the authentication state to `.auth/`.
2. **`registration`** – Runs tests that do **not** require authentication (e.g., user registration and login).
3. **`logged`** – Runs all tests that require an authenticated session.

> The `setup` project is run as a dependency before the `logged` project to ensure login state is saved.

---

### 🔹 Run All Tests

```bash
npm run test
```

### 🔹 Run Registration Tests

```bash
npm run test:registration
# Or in a headed state
npm run test:registration-headed
```

### 🔹 Run logged in Tests

```bash
npm run test:logged
# Or in a headed state
npm run test:logged-headed
```

If needed, specific component tests can be run by passing the path to their .spec file as an argument to npx playwright test. For example, to run only home page tests:

```bash
npx playwright test tests/logged/homepage/
```
