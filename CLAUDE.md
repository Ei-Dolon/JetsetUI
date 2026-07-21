# AI, Agent, Copilot, Claude, DeepSeek, Grox Project Instructions

## Global Rules

### 1. Think before coding, Ask before assuming:

Explicitly surface tradeoffs, ask for clarification on ambiguities, and list assumptions instead of acting silently.

### 2. Simplicity first (Minimal code only):

Implement the simplest solution possible. Avoid speculative abstractions, overcomplication, or unnecessary features.

### 3.Surgical changes (Touch only what is necessary):

Avoid "drive-by" refactoring. Modify only the code necessary for the task, matching existing style and ignoring unrelated dead code.

### 4. Goal-driven execution (Define success and iterate):

Replace general instructions with specific success criteria and validation steps, such as writing tests that reproduce a bug before trying to fix it.

### 5. Verification Mode

Before answering, must **verify information using multiple search engines** and **cite authoritative sources**.  
If verification is not possible, Copilot must not rely on memory or training data alone.

### 6. External‑Source‑First Mode

Must always prioritise **up‑to‑date information** from:

- Official documentation
- GitHub repositories
- npm package pages
- Vendor docs

Training‑data‑only answers must be avoided when authoritative sources exist.

### 7. Uncertainty Disallowed Mode

If not certain about an answer:

- must **stop and verify**
- If still uncertain, it must explicitly state uncertainty
- It must not guess, infer, or hallucinate missing details

### 8. Non‑Hallucination Mode

If the answer is not known or cannot be verified:

> **“I cannot verify this from trustworthy sources.”**

<!---------------------------------------------------------------------------->

# Project Overview:

Creating Decentralized Apps (DApp) for the Jetset token (JTS / JET) and Jetset LUX NFT environment hosted on the BNB Smart Chain since 2021.

### JetsetUI

Jetset DApp Frontend - main connecting point for use of Jetset DApps, handles wallet connection.

### TipTap

DApp provides simple method to tip using Jetset tokens, especially at Jetset sponsored events for example to tip your waiter, an artist's installation, or current DJ.  
Tip destination wallets are encoded into an error correcting QR Code which can be found on ID badges, stall signs, project banners, or in event literature.

## Project Rules

For code generation use TypeScript ^6.0.3 with functional decomposition programming patterns.  
Jetset styling should be provided as a consistent branding with a css v3 file to accompany any code that includes tsx output for display.
Use ai preferred markdown when providing explanations with code.
When including source code for a file, the first line of the code should be a single line comment in the form //_ relative/path/filename.ext relative path from the project root directory
Example:

```ts
//_ src/hooks/useModal.ts
```

The second line should use JSDocs format and tags to help VS Code provide better IntelliSense and type checking, as well as explaining/documenting the code.
Example:

```ts
/** @module color/mixer 
- Blend two colors together. 
- @param {string} color1 - The first color, in hexadecimal format. 
- @param {string} color2 - The second color, in hexadecimal format. 
- @return {string} The blended color. 
  */
```

For code structure make use of Systems Analysis and Design patterns and rules, as much as possible, attempt production of explanations of overview at basic level for user, and indepth at competent level for developer.  
Model the following:  
Logical constructs.  
Data flow.  
Data dictionary.  
Map of physical objects and relationships, include the logical constructs and how they relate, and show the data flow both between physical and logical objects/data structures/files, also if suitable please add mermaid.js data flow diagram code as well.

### Environment:

Microsoft Windows 11 Pro - Dev software  
Ubuntu v26 (WSL2) - project files, dev utils  
Node.js v24 LTS  
**IDE:** VS Code  
**Extensions:**  
VoidZero.vite-plus-extension-pack  
oxc.oxc-vscode  
vitest.explorer  
ms-vscode-remote.vscode-remote-extensionpack

**Toolchain:** Vite+ [Vite+ ^0.2.1](https://viteplus.dev/)  
**Code Versioning:** git, GitHub CLI, Examdiff Pro Master v15

### Library Version Website

Following libraries are dependencies within project, and represent the lowest version number to use, websites include documentation.  
[Typescript v6.0.3](https://typescriptlang.org/)  
[Vite v8.x](https://vite.dev/)  
[React v19.2.7](https://react.dev/)  
[wagmi v3.6.9](https://wagmi.sh/)  
[viem v2.48.x](https://viem.sh/)  
[@tanstack/react-query v5.101.x](https://tanstack.com/query/latest/)

### Blockchain: BNB Smart Chain

**BlockChain Code:** bsc
**BlockChain ID:** 56/0x38
[**Block Explorer:** ](https://bscscan.com)  
**Blockchain SVG Icon:** "https://jetsettoken.com/dapp/public/bsc.svg"

**Native Coin (Name, Symbol, Decimals):** BNB, BNB, 18  
**BNB SVG Icon:** "https://jetsettoken.com/dapp/public/BNB.svg"  
**Coingecko ID:** binancecoin

### Blockchain: Jetset Token:

**Token standard:** BEP-20  
**Name:** Jetset  
**Symbol:** JTS (was JET)  
**Decimals:** 18  
**Icon:** "https://jetsettoken.com/dapp/public/jetset.svg"  
**Contract: ** 0x405BE90996e7F995A08C2FBD8d8822EF5b03466C  
**Coingecko ID:** jetset

Project Description = "JetsetUI - Jetset DApp Frontend"  
Project Name = jetsetui  
Project Location = $HOME/jetsettoken.com/dapp/jetsetui/

Project Description = "TipTap - Jetset Tipping DApp"  
Project Name = tiptap  
Project Location = $HOME/jetsettoken.com/dapp/tiptap/

Assets Library = $HOME/jetsettoken.com/dapp/public/  
assets Index = assets.txt  
**Graphic formats:**  
Image: .png, .webp - name, dimensions  
Animations: .png - name, dimensions, frames, frame dimensions, note: frames are stored horizontally  
Video: intro.mp4  
StateGraphics: .png name, dimensions, (matrix of frames, frame dimensions), note: each state is stored vertically in a logical ordering, if a state has frames these are stored horizontally as normal.  
Icons: /icons/ .svg

### User Flow

1. JetsetUI DApp entry code initially supplied within the Jetset DApp Index at https://jetsettoken.com/dapp/index.html
2. A script is used to open a new browser version with settings similar to a PWA i.e. "width=360,height=680,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=no"
3. The Hostinger server has a backend php script called https://jetsettoken.com/dapp/jetsetui/api/version_check.php, which is setup as part of a new version build and deloyment to the jetset server on Hostinger, it supplies a DApp call to it with the latest version and price data file version and priceData itself.
4. When a user accesses a Jetset DApp the frontend logic calls the version_check.php and checks the versions against its own in localStorage, if it does not contain jetsetui_version then the DApp initialises the localStorage for the first time running the DApp.
5. If it exists but does not match it then updates the localStorage keys with the new version data.
6. If JetsetUI is being run for the very first time on user's device, then a splashscreen is displayed at z=9199 which plays a video intro.mp4
7. src/config/initDApp.ts initializes the JetsetUI localStorage:  
   localStorage.setItem('jetsetui.version': import.meta.env.VITE_APP_VERSION);  
   localStorage.setItem('priceData_version', '20260624221'); // UTC Date Time string of the hostinger file https://jetsettoken.com/dapp/public/priceData.json  
   // example contents of https://jetsettoken.com/dapp/public/priceData.json  
   localStorage.setItem('priceData', JSON.stringify({"binancecoin":{"usd":624.01,"gbp":461.01,"eur":532.33},"jetset":{"usd":0.00010252,"gbp":7.572e-05,"eur":8.746e-05}});  
   // jetsetui user settings  
   localStorage.setItem('selFiat', 'usd'); // Kept lowercase for standard parsing.
8. then preloads the asset files and start rendering of the DApp (z=100 )
9. The video ends final frame, and a softly glowing white message "Press to continue...", a click/tap anywhere within the DApp's window will cause the DApp to register the SoundProvider, and cause the splashscreen to fade via css transition to opacity 0, which reveals the loaded DApp, the splashscreen module unloads itself.
10. The vite entry file is https://jetsettoken.com/dapp/jetsetui/index.html which loads the main.tsx file in src/ within the div id="root", there is an additional div id modal-root for the DApp's modal windows e.g. SettingsModal window, ReceiveModal window that displays connected wallet address as a QRcode, BuyModal window displays a third party crypto vendor in an iframe Embr or Flooz.
11. The Jetset environment DApp's have the same fixed AppHeader and AppFooter components:
12. AppHeader shows the animated Jetset Logo in the center of the header and a Settings Icon cog in the top right of the header, AppHeader z=100 x=100 y=360 fixed to viewport.
13. AppFooter z=100 x=140 y=360 fixed to viewport. AppFooter shows the animated Connect Wallet/Connecting/Disconnect button component that allows the user to connect a wallet of their choice to the DApp using ConnectKit. The button represents the current connection state of the DApp. Aligned along the bottom of the screen is an animated pulse of neon blue electricity that is flowing through a pipe that extends across the whole of the width of the DApp and has 16 frames of animation, this acts as a visual representation of the DApp's continued functionality (i.e. shows DApp has not frozen).
14. The central main content area z=50 y=360 has no horizontal scroll, but can vertically scroll between the header and footer if neccessary and it's contents rely on a responsive design to display correctly for the device being used.
15. The user can then interact with the DApp, via onClick handlers of which currently clickable elements include the "Connect Wallet" button (btnConnect.png), the Disconnect Wallet button (btnDisconnect.png), the Settings Icon (settings.svg), once a wallet is successfully connected there will also be a Buy button, Receive button and TipTap button.
16. The "Connect Wallet" button is an animated button component which uses ConnectKit to allow the user to select a wallet to use out of the wallets thathave been installed.
17. useConnection() updates → isConnected = true
18. UI displays connected wallet information in a header section
19. Wallet contents of BNB and Jetset balances are read and displayed as well as their value based on current fiat prices read from priceData using default fiat usd unless the user has changed the default fiat, or the user has specified a fiat to use with the currently connected wallet.

## Styling:

### Main DApp areas:

each has a 3 color gradient effect going from top right main blue, through diagonal darker blue to bottom left lighter blue.  
each area has a brush metal effect texture either tiled or fitted to area with ever looks best.  
AppHeader has drop shadow on lower edge.  
AppFooter has drop shadow on upper edge.

### Sections:

These are within the main content area they have rounded corners with a colr gradient border around their edge from bright blue to dark purple.  
Wallet header info  
Wallet total assets area  
Wallet assets listings  
Wallet jetset token price graph from dextools

Modals are at z=500 and have a drop shadow on left and lower edges.  
It has grey bg with texture tiled to bg of its page.  
The overlay blurs the visible dapp below it.  
onClose handler called on clicking overlay, clicking close X in modal header top right, clicking modal close button in modal footer, Escape key caught.  
All modals trap focus to modal window, block background dapp scrolling, and prevent propagation of events from bubbling oitside the modal itself.

## Directory Structure:

{Project}/  
.env // API secrets  
.copilot-instructions.md, AGENTS.md, CLAUDE.md, GEMINI.md // AI rules: Global, Project, Performance  
index.html // Vite project entry point  
tsconfig.json // typescript config  
vite.config.ts // Vite+ config

./src/ // source code files  
main.tsx // Initial setup, render, and context wrappers  
index.css // global styles  
App.tsx // Main app control code  
App.css // App styles  
anim.css // animations

./src/components/
Component.tsx // React components - must starts with Uppercase character - UI elements , returns tsx  
Component.module.css // styling for component of same name

./src/hooks/
useHook.ts // React hooks - camelCase normally starts with use, control app logic and state, returns values and/or functions
handleEvent.ts // event handlers - camelCase normally starts with handle

./src/config/
abi.ts // contract ABI prototypes
config.ts // wagmi, blockchain, and wallet setup
consts.ts // project constants
initDApp.ts // Initial DApp setup of locaStorage the first time the DApp is run on an user's device
types.ts // types, data structures, objects, unions

./src/util/
utils.ts // general purpose utils

```ts
//_ src/config/const.ts
/* public constants for Jetset and its DApps - JetsetUI, TipTap ...
 */
export const CONSTS = {
	// Jetset BEP-20 token v1 contract address 2021-11-28 to 2022-09-26
	JTS_V1_ADDR: '0xbf675ed044f2092a4f004aa5709bfa858641ce8b',

	//Jetset BEP-20 token v2 contract address
	JTS_ADDR: '0x405be90996e7f995a08c2fbd8d8822ef5b03466c',
	JTS_NAME: 'Jetset',
	JTS_SYMBOL: 'JTS',
	JTS_DECIMALS: 18,

	// BNB Smart Chain (BSC) ID: 56 || 0x38, Native token: BNB, Symbol BNB, Decimals 18
	BSC_CHAIN_ID: 0x38,
	BSC_RPC: 'https://bsc-dataseed1.binance.org/',
	BSC_RPC2: 'https://rpc.ankr.com/bsc',
	BSC_NAME: 'BNB Smart Chain',
	BSC_SYMBOL: 'BNB',
	BSC_DECIMALS: 18,
	BSC_EXPLORER: 'https://bscscan.com/',

	// DApp MetaInfo
	DAPP_NAME: 'JetsetUI',
	DAPP_DESCRIPTION: 'Jetset DApp Frontend',
	DAPP_URL: 'https://jetsettoken.com/dapp/jetsetui/',
	JETSETUI_SVG_URL: 'https://jetsettoken.com/dapp/public/Jetset.svg',
	JETSETUI_ICO_URL: 'https://jetsettoken.com/dapp/jetsetui/public/favicon.ico',
	DAPP_NETLIFY_URL: 'https://jetsetui.netlify.app/',
	DAPP_RENDER_URL: 'https://jetsetui.onrender.com/',
	JETSETUI_WC_ID: import.meta.env.VITE_JETSETUI_WC_ID,
	cg_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,jetset&vs_currencies=usd,gbp,eur',
} as const;
```

```ts
// src/config/config.ts
import { createConfig, http, createStorage, fallback } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { CONSTS } from './consts.ts';

declare module 'wagmi' {
	interface Register {
		config: typeof config;
	}
}

const projectId = import.meta.env.VITE_JETSETUI_WC_ID;
if (!projectId) {
	throw new Error('WalletConnect Project ID missing — check cloud.reown.com');
}

// SSR/Netlify-safe storage (harmless guard for a Vite SPA, good habit)
const storage = typeof window !== 'undefined' ? createStorage({ storage: window.localStorage }) : undefined;

export const connectors = [
	// EIP-6963 handles MetaMask, Brave, Trust, etc.
	// injected() here covers wallets that only announce via window.ethereum
	// (pre-EIP-6963 fallback). No shimDisconnect — removed in wagmi v2.
	injected(),

	walletConnect({
		projectId,
		metadata: {
			name: CONSTS.DAPP_NAME,
			description: CONSTS.DAPP_DESCRIPTION,
			url: CONSTS.DAPP_URL,
			icons: [CONSTS.JETSETUI_SVG_URL],
		},
		showQrModal: true,
	}),
	// metaMask() removed — multiInjectedProviderDiscovery: true means MetaMask self-announces via EIP-6963

	coinbaseWallet({
		appName: CONSTS.DAPP_NAME,
		appLogoUrl: CONSTS.JETSETUI_SVG_URL,
		// headless option maybe needed with ConnectKit
	}),
];

export const config = createConfig({
	storage,
	multiInjectedProviderDiscovery: true,
	chains: [bsc],
	connectors,
	transports: {
		// fallback() tries each URL in order, moves to next on failure.
		[bsc.id]: fallback([
			http('https://rpc.ankr.com/bsc'),
			http('https://bsc-dataseed1.binance.org'),
			http('https://bsc-dataseed2.defibit.io'),
			http('https://bsc-dataseed3.ninicoin.io'),
			http(),
		]),
	},
});
```

```ts
export const jetsetABI = [
	{
		type: 'function',
		name: 'name',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ name: 'name', type: 'string' }],
	},
	{
		type: 'function',
		name: 'symbol',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ name: 'symbol', type: 'string' }],
	},
	{
		type: 'function',
		name: 'decimals',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ name: 'decimals', type: 'uint8' }],
	},
	{
		type: 'function',
		name: 'balanceOf',
		stateMutability: 'view',
		inputs: [{ name: 'account', type: 'address' }],
		outputs: [{ name: 'balance', type: 'uint256' }],
	},
	{
		type: 'function',
		name: 'transfer',
		stateMutability: 'nonpayable',
		inputs: [
			{ name: 'to', type: 'address' },
			{ name: 'amount', type: 'uint256' },
		],
		outputs: [{ type: 'bool' }],
	},
] as const;
```

<!---------------------------------------------------------------------------->
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

<!--VITE PLUS OXLINT MIGRATION START-->

# name: migrate-oxlint

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

<!---------------------------------------------------------------------------->

# React Performance Rules

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

- Keys ('jetsetui_version', 'priceData_version', 'priceData').
- Version key 'jetsetui_version' is set at build time taken from the package.json Version value e.g. 0.0.3-alpha
- Build process starts src/config/fetchPriceData.js script that fetchs:latest prices storing data to the 'priceData' key and storing the data in /priceData.json
- The priceData.json file time is stored in the key 'priceData_version' as an ISO UTC Data Time string formatted in form YYYYMMDDHHmm
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
- Timestamp API output - using ISO UTC Date Time stamp formatted to YYYYMMDDHHmm
- Client-side prices requested directly from coingecko api, data and time of api json output written to local priceData.json and to localStorage priceData* keys.
- Fetch directly from 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,jetset&vs_currencies=usd,gbp,eur'
- If coingecko fetch error, fallback to fetching file from hostinger web server https://jetsettoken.com/dapp/public/priceData.json
- If host file fetch fails final fallback to JetsetUI localStorage that at its oldest will be the last build time of the DApp when the client-side ran the DApp for the first time.

### UI and UX

- Use modular, extensible components.
- For css generation produce CSS v3 file
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
