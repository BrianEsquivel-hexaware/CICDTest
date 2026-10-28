# OrangeHRM: Playwright Tests

An example project for testing the OrangeHRM login form and automatically
running the tests with GitHub Actions.

## Included tests

- The login form displays its fields and submit button.
- Valid credentials successfully open the Dashboard.
- Invalid credentials display an error message.

The tests use accessible selectors (`getByRole`) and do not create or modify
business records on the site.

## Run locally

Requirements: Node.js 24.22.1.

```powershell
npm ci
npx playwright install chromium
npm test
```

The configuration automatically loads variables from the `.env` file in the
project root. Copy `.env.example` to `.env` and update its values to use a
different site or credentials. `.env` is excluded from Git; do not commit
private credentials to the repository.

To open the HTML report after a test run:

```powershell
npm run report
```

Other useful modes:

```powershell
npm run test:headed
npm run test:ui
npm run test:debug
```

By default, the demo site and its published credentials are used:
`Admin` / `admin123`. To change them without editing the tests, set
`ORANGEHRM_USERNAME`, `ORANGEHRM_PASSWORD`, and optionally
`ORANGEHRM_BASE_URL` in the environment.

## GitHub CI workflow

The `.github/workflows/playwright.yml` workflow runs the tests:

- When code is pushed to `main` or `master`.
- When a Pull Request targeting `main` or `master` is opened or updated.
- When manually started from **Actions > Playwright tests > Run workflow**.
- Every day at 12:00 UTC, according to the schedule.

To use your own credentials, configure `ORANGEHRM_USERNAME` and
`ORANGEHRM_PASSWORD` as repository **Actions secrets**, and set
`ORANGEHRM_BASE_URL` as an **Actions variable** if using a different site.
Otherwise, the tests use the demo's public credentials and the project's
default URL.

The Playwright report and results are uploaded as artifacts for each run,
including when a test fails. Download them from the workflow run summary on
GitHub.

## Setup steps

1. Create a GitHub repository and push this project, including
   `package-lock.json`.
2. Make sure **Actions** is enabled for the repository.
3. Review or update the credentials and URL under **Settings > Secrets and
   variables > Actions**.
4. Run `npm test` locally to verify access to the site.
5. Push to `main`/`master` or open a Pull Request. Actions will run the workflow
   and show the result and report artifact.
6. To run it on demand, use **Actions > Playwright tests > Run workflow**.
7. To change the schedule, edit the workflow's `cron` expression. GitHub uses
   UTC for scheduled runs, which may be delayed.

## Recommended next steps

- If this workflow should be required for changes, configure a branch
  protection rule that requires the **End-to-end tests** job.
- Add browsers or devices as needed; CI currently installs only Chromium.
- Use a dedicated test environment for greater stability: the demo site is
  external, shared, and may change or become unavailable.
- If CD is needed, first define the target environment and deployment process;
  this example provides CI and does not deploy the application.
