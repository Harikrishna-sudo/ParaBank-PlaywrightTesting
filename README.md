# ParaBank Playwright — Multi-Member Base Skeleton

Standardized **Playwright + JavaScript (CommonJS)** test automation framework for the **ParaBank** banking demo application (`https://parabank-17m8.onrender.com/parabank`).

All test display names use sequential `TS-001` through `TS-030` identifiers that strictly follow the folder execution order. Every spec file is scaffolded with step-by-step `TODO` comments — team members fill in their assigned scenarios while the shared structure (fixtures, page objects, test data) remains consistent across the suite.

---

## 1. Ordered Execution & Scenario Map

| Order | Folder (`tests/`) | Spec File | Scenarios |
|---|---|---|---|
| **1st** | [`tests/01-registration-failure/`](tests/01-registration-failure/registration-failure.spec.js) | `registration-failure.spec.js` | **TS-001** Empty fields validation<br>**TS-002** Existing username validation |
| **2nd** | [`tests/02-registration-success/`](tests/02-registration-success/registration-success.spec.js) | `registration-success.spec.js` | **TS-003** New user registration with valid data |
| **3rd** | [`tests/03-login-failure/`](tests/03-login-failure/login-failure.spec.js) | `login-failure.spec.js` | **TS-004** Login fails with invalid password<br>**TS-005** Login fails with empty credentials |
| **4th** | [`tests/04-login-success/`](tests/04-login-success/login-success.spec.js) | `login-success.spec.js` | **TS-006** Successful login with valid credentials |
| **5th** | [`tests/05-open-account/`](tests/05-open-account/open-account.spec.js) | `open-account.spec.js` | **TS-007** Open CHECKING account<br>**TS-008** Open SAVINGS account<br>**TS-009** Verify account appears in list |
| **6th** | [`tests/06-transfer-funds/`](tests/06-transfer-funds/transfer-funds.spec.js) | `transfer-funds.spec.js` | **TS-010** Transfer valid amount<br>**TS-011** Transfer greater than balance<br>**TS-012** Transfer zero/negative amount |
| **7th** | [`tests/07-bill-pay/`](tests/07-bill-pay/bill-pay.spec.js) | `bill-pay.spec.js` | **TS-013** Bill pay with valid details<br>**TS-014** Bill pay with empty fields<br>**TS-015** Bill pay with zero amount |
| **8th** | [`tests/08-find-transactions/`](tests/08-find-transactions/find-transactions.spec.js) | `find-transactions.spec.js` | **TS-016** Find by transaction ID<br>**TS-017** Find by date<br>**TS-018** Find by amount |
| **9th** | [`tests/09-request-loan/`](tests/09-request-loan/request-loan.spec.js) | `request-loan.spec.js` | **TS-019** Loan approved<br>**TS-020** Loan denied<br>**TS-021** Loan result status display |
| **10th** | [`tests/10-update-contact-info/`](tests/10-update-contact-info/update-contact-info.spec.js) | `update-contact-info.spec.js` | **TS-022** Update profile with valid data<br>**TS-023** Verify profile data persists<br>**TS-024** Error on empty mandatory fields |
| **11th** | [`tests/11-logout-navigation/`](tests/11-logout-navigation/logout-navigation.spec.js) | `logout-navigation.spec.js` | **TS-025** Verify navigation menu links<br>**TS-026** Log out of active session<br>**TS-027** Direct URL access to protected page after logout |
| **12th** | [`tests/12-forgot-login/`](tests/12-forgot-login/forgot-login.spec.js) | `forgot-login.spec.js` | **TS-028** Retrieve forgotten username<br>**TS-029** Reset/retrieve password<br>**TS-030** Lookup with non-matching info |

---

## 2. Directory Layout

```text
parabank-playwright/
│
├── tests/
│   ├── setup/
│   │   └── auth.setup.js                   # Logs in once; writes playwright/.auth/user.json
│   │                                       # Runs before all authenticated modules (05-11)
│   │
│   │   -- UNAUTHENTICATED (public pages, no login required) --
│   ├── 01-registration-failure/
│   │   └── registration-failure.spec.js    # TS-001, TS-002
│   ├── 02-registration-success/
│   │   └── registration-success.spec.js    # TS-003
│   ├── 03-login-failure/
│   │   └── login-failure.spec.js           # TS-004, TS-005
│   ├── 04-login-success/
│   │   └── login-success.spec.js           # TS-006
│   │
│   │   -- AUTHENTICATED (session pre-loaded from storageState) --
│   ├── 05-open-account/
│   │   └── open-account.spec.js            # TS-007, TS-008, TS-009
│   ├── 06-transfer-funds/
│   │   └── transfer-funds.spec.js          # TS-010, TS-011, TS-012
│   ├── 07-bill-pay/
│   │   └── bill-pay.spec.js                # TS-013, TS-014, TS-015
│   ├── 08-find-transactions/
│   │   └── find-transactions.spec.js       # TS-016, TS-017, TS-018
│   ├── 09-request-loan/
│   │   └── request-loan.spec.js            # TS-019, TS-020, TS-021
│   ├── 10-update-contact-info/
│   │   └── update-contact-info.spec.js     # TS-022, TS-023, TS-024
│   ├── 11-logout-navigation/
│   │   └── logout-navigation.spec.js       # TS-025, TS-026, TS-027
│   │
│   │   -- UNAUTHENTICATED (public pages, no login required) --
│   └── 12-forgot-login/
│       └── forgot-login.spec.js            # TS-028, TS-029, TS-030
│
├── playwright/
│   └── .auth/
│       ├── .gitkeep                        # Keeps folder in git; user.json is gitignored
│       └── user.json                       # generated at runtime by auth.setup.js (gitignored)
│
├── pages/                                  # Page Object Model classes (stubbed)
│   ├── LoginPage.js
│   ├── RegistrationPage.js
│   ├── ForgotLoginInfoPage.js
│   ├── AccountsOverviewPage.js
│   ├── OpenNewAccountPage.js
│   ├── TransferFundsPage.js
│   ├── BillPayPage.js
│   ├── FindTransactionsPage.js
│   ├── RequestLoanPage.js
│   ├── UpdateContactInfoPage.js
│   └── NavigationComponent.js
│
├── fixtures/
│   └── test-fixtures.js                    # Custom Playwright fixtures (page object injection)
│
├── test-data/
│   └── sample-data.js                      # Centralised test data (login, registration, bill pay, loan)
│
├── utils/
│   └── README.md                           # Guidelines for placing shared helper functions
│
├── playwright.config.js                    # Playwright config — setup + unauthenticated + authenticated projects
├── package.json
├── .env.example                            # Environment variable template
├── .gitignore
└── README.md
```

---

## 3. Authentication Setup

### How it works

Modules **05–11** require a logged-in session. Rather than logging in inside every `beforeEach`, the framework uses Playwright's **global setup + `storageState`** pattern:

1. **[`tests/setup/auth.setup.js`](tests/setup/auth.setup.js)** runs once before any authenticated module. It logs in using `USERNAME` / `PASSWORD` from `.env`, asserts the session is established, and writes the entire browser state (cookies + localStorage) to **`playwright/.auth/user.json`**.
2. **[`playwright.config.js`](playwright.config.js)** declares an `authenticated` project that `depends on: ['setup']` and loads `storageState: 'playwright/.auth/user.json'` into every browser context it opens — so each spec in modules 05–11 starts already logged in with zero extra code in the spec files.
3. **`playwright/.auth/user.json`** is gitignored (contains session cookies). The folder itself is committed via `.gitkeep` so the path always exists on a fresh clone.

### Execution order

```
npx playwright test
        |
        v
+---------------------+
|   project: setup    |  auth.setup.js -- login once, write user.json
+----------+----------+
           |  must pass before authenticated project starts
    +------+----------------------------+
    v                                   v
+----------------------+   +----------------------------+
|  unauthenticated     |   |  authenticated             |
|  modules 01-04, 12   |   |  modules 05-11             |
|  clean browser ctx   |   |  storageState loaded       |
|  (sequential)        |   |  (sequential)              |
+----------------------+   +----------------------------+
```

### Project split in `playwright.config.js`

| Project | Matches | Depends on | `storageState` |
|---|---|---|---|
| `setup` | `tests/setup/auth.setup.js` | — | — |
| `unauthenticated` | modules 01–04, 12 | — | — (clean context) |
| `authenticated` | modules 05–11 | `setup` | `playwright/.auth/user.json` |

> If `auth.setup.js` fails (bad credentials, app unreachable), the entire `authenticated` project is skipped immediately — no false failures across 7 modules.

---

## 4. Key Configuration

**[`playwright.config.js`](playwright.config.js)**

| Setting | Value |
|---|---|
| `testDir` | `./tests` |
| `fullyParallel` | `false` (sequential — tests share state across modules) |
| `workers` | `1` |
| `retries` | `2` on CI, `0` locally |
| `reporter` | `html` |
| `baseURL` | `process.env.BASE_URL` → fallback `https://parabank-17m8.onrender.com/parabank` |
| `trace` | `on-first-retry` |
| `screenshot` | `only-on-failure` |
| `video` | `on-first-retry` |
| Projects | `setup` · `unauthenticated` · `authenticated` |

---

## 5. Environment Setup

Copy [`.env.example`](.env.example) to `.env` and fill in values before running:

```bash
cp .env.example .env
```

```dotenv
# Base URL of the application under test
BASE_URL=https://parabank-17m8.onrender.com/parabank

# Credentials — keep out of version control
USERNAME=
PASSWORD=
```

> `.env` is listed in [`.gitignore`](.gitignore). Never commit real credentials.

Test data that **is not secret** (payee details, loan amounts, registration templates) lives in [`test-data/sample-data.js`](test-data/sample-data.js). Credentials are read from `process.env` inside that file.

---

## 6. Running Tests

### Install dependencies
```bash
npm install
npx playwright install
```

### Run the entire suite sequentially
```bash
npm test
# or
npx playwright test
```

### Run only the setup (login) step
```bash
npx playwright test --project=setup
```

### Run only unauthenticated modules
```bash
npx playwright test --project=unauthenticated
```

### Run only authenticated modules (runs setup first automatically)
```bash
npx playwright test --project=authenticated
```

### Run an individual module
```bash
npx playwright test tests/01-registration-failure/
npx playwright test tests/04-login-success/
npx playwright test tests/05-open-account/
```

### Run headed or in interactive UI mode
```bash
npm run test:headed
npx playwright test --ui
```

### Debug a specific test
```bash
npm run test:debug
```

### Open the HTML report
```bash
npm run report
# or
npx playwright show-report
```

---

## 7. Page Object Model

All page classes live under [`pages/`](pages/) and follow the same minimal contract:

```js
class ExamplePage {
  constructor(page) { /* define locators */ }
  async goto()      { /* navigate to page URL */ }
  async action()    { /* reusable interaction method */ }
}
module.exports = { ExamplePage };
```

Each page object is pre-wired into [`fixtures/test-fixtures.js`](fixtures/test-fixtures.js) as a named fixture. Specs import `{ test, expect }` from the fixtures file and receive page objects via destructuring — no manual instantiation required in test files.

---

## 8. Team Workflow

1. **Pick your assigned spec(s)** from the scenario map above.
2. **Implement the page object** for your module under `pages/` — fill in locators and action methods.
3. **Wire the fixture** in [`fixtures/test-fixtures.js`](fixtures/test-fixtures.js) — uncomment the import and instantiate the class.
4. **Implement the test steps** in the spec file, replacing the `// TODO` comments.
5. **Add test data** to [`test-data/sample-data.js`](test-data/sample-data.js) if your scenario needs new data constants.
6. **Run your module** with `npx playwright test tests/<your-module>/` before pushing.

### Working on authenticated modules (05–11)

Before running an authenticated module locally, ensure `.env` has valid `USERNAME` and `PASSWORD`. Either run the full suite so setup runs automatically, or run setup then your module explicitly:

```bash
npx playwright test --project=setup
npx playwright test tests/05-open-account/ --project=authenticated
```

Once `user.json` is written it is reused for the rest of the local session — you do not need to re-run setup unless credentials change or the session expires.

### Implementing `auth.setup.js`

The person assigned to module **04 (Login Success)** is best placed to also implement [`tests/setup/auth.setup.js`](tests/setup/auth.setup.js), since it uses the same `LoginPage` object and credentials flow. Fill in the `TODO` blocks there once `LoginPage` is implemented.

### Shared utility helpers

If you write a helper that is not a page object, fixture, or test data entry, place it in [`utils/`](utils/) and follow the guidelines in [`utils/README.md`](utils/README.md).
