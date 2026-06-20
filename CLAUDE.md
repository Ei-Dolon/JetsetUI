# AI, Agent, Copilot, Claude, DeepSeek, Grox Project Instructions

# Global Rules

## 1. Think before coding, Ask before assuming:

Explicitly surface tradeoffs, ask for clarification on ambiguities, and list assumptions instead of acting silently.

## 2. Simplicity first (Minimal code only):

Implement the simplest solution possible. Avoid speculative abstractions, overcomplication, or unnecessary features.

## 3.Surgical changes (Touch only what is necessary):

Avoid "drive-by" refactoring. Modify only the code necessary for the task, matching existing style and ignoring unrelated dead code.

## 4. Goal-driven execution (Define success and iterate):

Replace general instructions with specific success criteria and validation steps, such as writing tests that reproduce a bug before trying to fix it.

## 5. Verification Mode

Before answering, must **verify information using multiple search engines** and **cite authoritative sources**.
If verification is not possible, Copilot must not rely on memory or training data alone.

## 6. External‑Source‑First Mode

Must always prioritise **up‑to‑date information** from:

- Official documentation
- GitHub repositories
- npm package pages
- Vendor docs

Training‑data‑only answers must be avoided when authoritative sources exist.

## 7. Uncertainty Disallowed Mode

If not certain about an answer:

- must **stop and verify**
- If still uncertain, it must explicitly state uncertainty
- It must not guess, infer, or hallucinate missing details

## 8. Non‑Hallucination Mode

If the answer is not known or cannot be verified:

> **“I cannot verify this from trustworthy sources.”**

;\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

# Project Overview:

Creating Decentralized Apps (DApp) for the Jetset token (JTS / JET) and Jetset LUX NFT environment hosted on the BNB Smart Chain since 2021.

## JetsetUI

Jetset DApp Frontend - main connecting point for use of Jetset DApps, handles wallet connection.

## TipTap

DApp provides simple method to tip using Jetset tokens, especially at Jetset sponsored events for example to tip your waiter, an artist's installation, or current DJ.
Tip destination wallets are encoded into an error correcting QR Code which can be found on ID badges, stall signs, project banners, or in event literature.

# Project Rules

For code generation use TypeScript ^6.0.2 with functional decomposition programming patterns.
For css generation produce two versions CSS v3 and Tailwindcss v4.2
Use ai preferred markdown when providing explanations with code.
When including source code for a file, the first line of the code should be a single line comment in the form //_ relative/path/filename.ext relative path from the project root directory
Example:
//_ src/hooks/useModal.ts
The second line should use JSDocs format and tags to help VS Code provide better IntelliSense and type checking, as well as explaining/documenting the code.
Example:
/\*\* @module color/mixer

- Blend two colors together.
- @param {string} color1 - The first color, in hexadecimal format.
- @param {string} color2 - The second color, in hexadecimal format.
- @return {string} The blended color.
  \*/

For code structure make use of Systems Analysis and Design patterns and rules, as much as possible, attempt production of explanations of overview at basic level for user, and indepth at competent level for developer.
Model the following:
Logical constructs.
Data flow.
Data dictionary.
Map of physical objects and relationships, include the logical constructs and how they relate, and show the data flow both between physical and logical objects/data structures/files, also if suitable please add mermaid.js data flow diagram code as well.

# Environment:

Ubuntu Desktop v24 LTS - development: \\Devstation
Microsoft Windows 10 Pro - testing: \\ALPHA
Node.js v24 LTS
IDE: VS Code
Toolchain: Vite+

Vite+ ^0.1.20 https://viteplus.dev/

## Library Version; Website

Following libraries are dependencies within project, and represent the lowest version number to use, websites include documentation.
Typescript v6.0.2; https://typescriptlang.org/
Vite v8.x; https://vite.dev/
React v19.2.5; https://react.dev/
wagmi v3.6.9; https://wagmi.sh/
viem v2.48.x; https://viem.sh/
@tanstack/react-query v5.100.x; https://tanstack.com/query/latest/

# Blockchain: BNB Smart Chain

BlockChain Code: bsc
BlockChain ID: 56/0x38
Block Explorer: https://bscscan.com
Native Coin (Name, Symbol, Decimals): BNB, BNB, 18
Coingecko ID: binancecoin

Jetset Token:
Token standard: BEP-20
Name: Jetset
Symbol: JTS (was JET)
Decimals: 18
Icon: "https://jetsettoken.com/dapp/public/Jetset.svg"
Contract: 0x405BE90996e7F995A08C2FBD8d8822EF5b03466C

Project Description = "JetsetUI - Jetset DApp Frontend"
Project Name = jetsetui
Project Location = $HOME/projects/jetsettoken.com/dapp/jetsetui/

Project Description = "TipTap - Jetset Tipping DApp"
Project Name = tiptap
Project Location = $HOME/projects/jetsettoken.com/dapp/tiptap/

Assets Library = $HOME/projects/jetsettoken.com/dapp/public/
assets.txt //index of assets

Graphic formats:
Image: .png, .webp - name, dimensions
Animations: .png - name, dimensions, frames, frame dimensions, note: frames are stored horizontally
StateGraphics: .png name, dimensions, (matrix of frames, frame dimensions), note: each state is stored vertically in a logical ordering, if a state has frames these are stored horizontally as normal.
Icons: /icons/ .svg

## Directory Structure:

{Project}/
.env // API secrets
CLAUDE.md // this file, rules for AIs to follow
index.html // Vite project entry point
tsconfig.json // typescript config
vite.config.ts // Vite+ config

./src/ // source code files
main.tsx // Initial setup, render, and context wrappers
index.css // global styles
App.tsx // Main app control code
App.css // App styles

./src/config/
config.ts // wagmi, blockchain, and wallet setup
abi.ts // contract ABI prototypes
util.ts // general purpose utils
consts.ts // project constants
types.ts // types, data structures, objects, unions
version.ts // version controller

./src/components/
CapitalFileNamed.tsx // React components - UI elements , returns tsx

./src/hooks/
useHook.ts // React hooks control app logic and state, returns values and/or functions
handleEvent.ts // event handlers

### Data Flow

1. App loads
2. WagmiProvider + QueryClientProvider initialize
3. ConnectWallet checks useConnection()
4. If not connected → show wallet list
5. User clicks a connector → connect()
6. Wagmi stores session + provider
7. useConnection() updates → isConnected = true
8. UI switches to <Connection />
9. User can disconnect → session cleared

;\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

;\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

<!--VITE PLUS OXLINT MIGRATION START-->

name: migrate-oxlint
description: Guide for migrating a project from ESLint to Oxlint. Use when asked to migrate, convert, or switch a JavaScript/TypeScript project's linter from ESLint to Oxlint.

---

This skill guides you through migrating a JavaScript/TypeScript project from ESLint to [Oxlint](https://oxc.rs/docs/guide/usage/linter/).

## Overview

Oxlint is a high-performance linter that implements many popular ESLint rules natively in Rust. It can be used alongside ESLint or as a full replacement.

An official migration tool is available, and will be used by this skill: [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate)

## Step 1: Run Automated Migration

Run the migration tool in the project root:

```bash
npx @oxlint/migrate
```

This reads your ESLint flat config (`eslint.config.js` for example) and generates a `.oxlintrc.json` file from it. It will find your ESLint config file automatically in most cases.

See options below for more info.

### Key Options

| Option                      | Description                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--type-aware`              | Include type-aware rules from `@typescript-eslint` (will require the `oxlint-tsgolint` package to be installed after migrating) |
| `--with-nursery`            | Include experimental rules still under development, may not be fully stable or consistent with ESLint equivalents               |
| `--js-plugins [bool]`       | Enable/disable ESLint plugin migration via `jsPlugins` (default: enabled)                                                       |
| `--details`                 | List rules that could not be migrated                                                                                           |
| `--replace-eslint-comments` | Convert all `// eslint-disable` comments to `// oxlint-disable`                                                                 |
| `--output-file <file>`      | Specify a different output path (default: `.oxlintrc.json`)                                                                     |

If your ESLint config is not at the default location, pass the path explicitly:

```bash
npx @oxlint/migrate ./path/to/eslint.config.js
```

## Step 2: Review Generated Config

After migration, review the generated `.oxlintrc.json`.

### Plugin Mapping

The migration tool automatically maps ESLint plugins to oxlint's built-in equivalents. The following table is for reference when reviewing the generated config:

| ESLint Plugin                                       | Oxlint Plugin Name |
| --------------------------------------------------- | ------------------ |
| `@typescript-eslint/eslint-plugin`                  | `typescript`       |
| `eslint-plugin-react` / `eslint-plugin-react-hooks` | `react`            |
| `eslint-plugin-import` / `eslint-plugin-import-x`   | `import`           |
| `eslint-plugin-unicorn`                             | `unicorn`          |
| `eslint-plugin-jsx-a11y`                            | `jsx-a11y`         |
| `eslint-plugin-react-perf`                          | `react-perf`       |
| `eslint-plugin-promise`                             | `promise`          |
| `eslint-plugin-jest`                                | `jest`             |
| `@vitest/eslint-plugin`                             | `vitest`           |
| `eslint-plugin-jsdoc`                               | `jsdoc`            |
| `eslint-plugin-next`                                | `nextjs`           |
| `eslint-plugin-node`                                | `node`             |
| `eslint-plugin-vue`                                 | `vue`              |

Default plugins (enabled when `plugins` field is omitted): `unicorn`, `typescript`, `oxc`.
Setting the `plugins` array explicitly overrides these defaults.

ESLint core rules are usable in oxlint without needing to configure a plugin in the config file.

### Rule Categories

Oxlint groups rules into categories for bulk configuration, though only `correctness` is enabled by default:

```json
{ "categories": { "correctness": "error", "suspicious": "warn" } }
```

Available categories: `correctness` (default: enabled), `suspicious`, `pedantic`, `perf`, `style`, `restriction`, `nursery`.

Individual rule settings in `rules` override category settings.

`@oxlint/migrate` will turn `correctness` off to avoid enabling additional rules that weren't enabled by your ESLint config. You can choose to enable additional categories after migration if desired.

### Check Unmigrated Rules

Run with `--details` to see which ESLint rules could not be migrated:

```bash
npx @oxlint/migrate --details
```

Review the output and decide whether to keep ESLint for those rules or not. Some rules may be mentioned in the output from `--details` as having equivalents in oxlint that were not automatically mapped by the migration tool. In those cases, consider enabling the equivalent oxlint rule manually after migration.

## Step 3: Install Oxlint

Install the core oxlint package (use `yarn install`, `pnpm install`, `vp install`, `bun install`, etc. depending on your package manager):

```bash
npm install -D oxlint
```

If you want to add the `oxlint-tsgolint` package, if you intend to use type-aware rules that require TypeScript type information:

```bash
npm install -D oxlint-tsgolint
```

No other packages besides the above are needed by default, though you will need to keep/install any additional ESLint plugins that were migrated into `jsPlugins`. Do not add `@oxlint/migrate` to the package.json, it is meant for one-off usage.

## Step 4: Handle Unsupported Features

Some features require manual attention:

- Local plugins (relative path imports): Must be migrated manually to `jsPlugins`
- `eslint-plugin-prettier`: Supported, but very slow. It is recommended to use [oxfmt](https://oxc.rs/docs/guide/usage/formatter) instead, or switch to `prettier --check` as a separate step alongside oxlint.
- `settings` in override configs: Oxlint does not support `settings` inside `overrides` blocks.
- ESLint v9+ plugins: Not all work with oxlint's JS Plugins API, but the majority will.

### Local Plugins

If you have any custom ESLint rules in the project repo itself, you can migrate them manually after running the migration tool by adding them to the `jsPlugins` field in `.oxlintrc.json`:

```json
{ "jsPlugins": ["./path/to/my-plugin.js"], "rules": { "local-plugin/rule-name": "error" } }
```

### External ESLint Plugins

For ESLint plugins without a built-in oxlint equivalent, use the `jsPlugins` field to load them:

```json
{ "jsPlugins": ["eslint-plugin-custom"], "rules": { "custom/my-rule": "warn" } }
```

## Step 5: Update CI and Scripts

Replace ESLint commands with oxlint. Path arguments are optional; oxlint defaults to the current working directory.

```bash
# Before
npx eslint src/
npx eslint --fix src/

# After
npx oxlint src/
npx oxlint --fix src/
```

### Common CLI Options

| ESLint                    | oxlint equivalent                              |
| ------------------------- | ---------------------------------------------- |
| `eslint .`                | `oxlint` (default: lints the cwd)              |
| `eslint src/`             | `oxlint src/`                                  |
| `eslint --fix`            | `oxlint --fix`                                 |
| `eslint --max-warnings 0` | `oxlint --deny-warnings` or `--max-warnings 0` |
| `eslint --format json`    | `oxlint --format json`                         |

Additional oxlint options:

- `--tsconfig <path>`: Specify tsconfig.json path, likely unnecessary unless you have a non-standard name for `tsconfig.json`.

## Tips

- You can run alongside ESLint if necessary: Oxlint is designed to complement ESLint during migration, but with JS Plugins many projects can switch over fully without losing many rules.
- Disable comments work: `// eslint-disable` and `// eslint-disable-next-line` comments are supported by oxlint. Use `--replace-eslint-comments` when running @oxlint/migrate to convert them to `// oxlint-disable` equivalents if desired.
- List available rules: Run `npx oxlint --rules` to see all supported rules, or refer to the [rule documentation](https://oxc.rs/docs/guide/usage/linter/rules.html).
- Schema support: Add `"$schema": "./node_modules/oxlint/configuration_schema.json"` to `.oxlintrc.json` for editor autocompletion if the migration tool didn't do it automatically.
- Output formats: `default`, `stylish`, `json`, `github`, `gitlab`, `junit`, `checkstyle`, `unix`
- Ignore files: `.eslintignore` is supported by oxlint if you have it, but it's recommended to move any ignore patterns into the `ignorePatterns` field in `.oxlintrc.json` for consistency and simplicity. All files and paths ignored via a `.gitignore` file will be ignored by oxlint by default as well.
- If you ran the migration tool multiple times, remove the `.oxlintrc.json.bak` backup file created by the migration tool once you've finished migrating.
- If you are not using any JS Plugins and have replaced your ESLint configuration, you can remove all ESLint packages from your project dependencies.
- Ensure your editor is configured to use oxlint instead of ESLint for linting and error reporting. You may want to install the Oxc extension for your preferred editor. See https://oxc.rs/docs/guide/usage/linter/editors.html for more details.

## References

- [CLI Reference](https://oxc.rs/docs/guide/usage/linter/cli.html)
- [Config File Reference](https://oxc.rs/docs/guide/usage/linter/config-file-reference.html)
- [Complete Oxlint rule list and docs](https://oxc.rs/docs/guide/usage/linter/rules.html)
  <!--VITE PLUS OXLINT MIGRATION END-->

;\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

## React Performance Rules

### Stable Handlers

- Use `useEffectEvent` for stable callback refs.
- Avoid re‑subscribing effects due to unstable handlers.

### Effect Hygiene

- Avoid effects that run due to object/array identity changes.
- Avoid computing derived state inside effects.
- Avoid defining components inside components.
- Avoid unnecessary dependencies.

### Async Patterns

- Avoid waterfall chains.
- Use `Promise.all` for independent operations.
- Defer awaits until needed.
- Start async operations early.
- Use dependency‑based parallelisation where possible.

### Suspense & RSC (React Server Components)

- Use strategic Suspense boundaries.
- Avoid blocking entire layouts with awaited data.
- Minimise serialization across RSC boundaries.
- Authenticate server actions.
- Avoid hydration mismatches.

### Dynamic Imports

- Use dynamic imports for heavy components.
- Defer non‑critical third‑party libraries.

## UI & DOM Performance Rules

### DOM Access

- Batch DOM reads and writes.
- Avoid layout thrashing.
- Use passive event listeners for scroll/touch events.

### Caching

- Cache repeated function calls.
- Cache property access in loops.
- Use Set/Map for O(1) lookups.
- Build index maps for repeated lookups.

### Array Operations

- Combine multiple array iterations.
- Use `flatMap` instead of map+filter.
- Use `toSorted()` instead of mutating `sort()`.

### SVG & Animation

- Animate wrapper elements, not SVGs.
- Optimise SVG precision.

## Storage & Local Data Rules

### localStorage

- Version keys (`jetsetui:userConfig:v1.0.0'`).
- Minimise stored data.
- Wrap reads/writes in try/catch.
- Cache storage API calls in memory.

## JetsetUI and dApp Architecture Rules

### Wallet Integration

- Use stable connector identity uid for wallets supported by connection to the BNB Smart Chain.
- Ensure SSR‑safe wagmi config.
- Use low‑latency RPC fallbacks.
- Use typed hooks for balances, fiat values, and token metadata.

### Serverless Price Fetching

- Minify JSON output.
- Timestamp API output.
- Client-side cache should handle :
    - Check staleness (>10 minutes)
    - Fetch directly from CoinGecko if stale, on error use host file at https://jetsettoken.com/dapp/public/priceData.json fallback after 2 retries to using original file bundled with app found ./priceData.json which is ./public/priceData.json on dev server.

### UI and UX

- Use modular, extensible components.
- For css generation produce two versions CSS v3 and Tailwindcss v4.2
- Use Tailwind CSS v4.2 with utility‑first patterns.
- Use css animations and transition (sprite‑driven UI) where possible.

## Code Style and Structure

### General

- Prefer early returns.
- Hoist static JSX.
- Hoist RegExp creation.
- Avoid barrel file imports unless transformed safely.
- Use explicit conditional rendering.

### Loops

- Use loops for min/max instead of sorting.
- Use early length checks for array comparisons.
