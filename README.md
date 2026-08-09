# JetsetUI v0.0.45-alpha

a = alpha, b = beta, r=release

**Toolchain:** Vite+ [Vite+ ^0.2.8](https://viteplus.dev/)  
Dev environment: pnpm v11+, Typescript v7.0.2, Vite v8+, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task.

**Code Versioning:** git, GitHub CLI, Examdiff Pro Master v15

### Environment:

Microsoft Windows 11 Pro - dev software  
Ubuntu v26 (WSL2) - project files, dev environment  
Node.js v24 LTS - required to run buildData.js script

**IDE:** VS Code  
**Extensions:**  
VoidZero.vite-plus-extension-pack  
oxc.oxc-vscode  
vitest.explorer  
ms-vscode-remote.vscode-remote-extensionpack

DApp version number has a single source of truth, all other instances/applications of version are derived from this source:  
"version": {string},  
within /package.json

### [Library Version](Website)

Following libraries are dependencies within project, and represent the lowest version number to use, websites include documentation.  
[Typescript v7.0.2](https://typescriptlang.org/)  
[Vite v8.x](https://vite.dev/)  
[React v19.2.8](https://react.dev/)  
[wagmi v3.7.4](https://wagmi.sh/)  
[viem v2.55.x](https://viem.sh/)  
[@tanstack/react-query v5.101.x](https://tanstack.com/query/latest/)  
[ConnectKit v1.9.2](https://family.co/docs/connectkit)

**Wallets Supported:**  
Coinbase Wallet  
WalletConnect (Wallets installed on mobile devices)  
EIP-6963 Injected wallets - MetaMask, Brave, Trust, Ledger, etc installed in web browser.

The DApp handles most wallets installed on a mobile (Android or iOS) or through a web browser (via desktop/laptop using windows/linux/Mac or on a mobile :)

### User Flow Document:

0.  The vite entry file is https://jetsettoken.com/dapp/jetsetui/index.html which loads the main.tsx file in src/ within the div id="root", there is an additional div id modal-root for the DApp's modal windows e.g. SettingsModal window, ReceiveModal window that displays connected wallet address as a QRcode, BuyModal window displays a third party crypto vendor in an iframe Embr or Flooz.

1.  The Jetset environment DApp's have the same fixed DApp Header and Footer components.

2.  Header shows the animated Jetset Logo in the center of the header and a Settings Icon cog in the top right of the header, AppHeader z=100 x=360 y=140 fixed to top of viewport.

3.  Footer z=100 x=360 y=100 fixed to bottom of viewport. Footer displays the main user interaction interface as an animated connect wallet button.

- The button provides 3 visual states: Connect Wallet/Connecting/Disconnect
- The connection modal is handled by ConnectKit v1.9.2
- Aligned along the bottom of the screen is an animated pulse of neon blue electricity that is flowing through a pipe that extends across 360px of the DApp and has 16 frames of animation, it is a visual representation of the DApp's continued functionality (i.e. shows DApp has not frozen).

4.  The central main content area z=50 y=360 has no horizontal scroll, but can vertically scroll between the header and footer if neccessary and it's contents rely on a responsive design to display correctly for the device being used.

5.  The user can then interact with the DApp, via onClick handlers of which currently clickable elements include the "Connect Wallet" button (btnConnect.png), the Disconnect Wallet button (btnDisconnect.png), the Settings Icon (settings.svg), once a wallet is successfully connected there will also be a Buy button, Receive button and TipTap button.

6.  Once the user has successfully connected an installed wallet, the DApp displays a wallet header with info on the connected wallet.

7.  The wallets BNB Smart Chain portfolio values are then display using wagmi useBalance to read BNB in wallet, and useReadContract to read the Jetset contract for the connected wallets address for the number of Jetset tokens held.

8.  These balances are displayed along with their fiat currency value in the selected fiat currency, defaults to usd ($), as provided by priceData.json

9.  The total sum of the cryptocurrency values in fiat currency is also displayed.

10. The Settings button displays a modal window to allow the fiat currency to be changed from usd to gbp or eur. The selected fiat if saved will be then used for all fiat calulations as it is stored in localStorage selFiat key.

11. The Buy button displays a modal window that allows on-ramping of currency via the third party provider Embr.

12. The Receive button displays a modal window that show a QR code of the successfully connected wallet in a format that other wallets can use to send too.

13. The TipTap button replaces the wallet display with the TipTap DApp that allows a connected wallet to send a tip of Jetset to a destintion wallet that is provided by a QR scan of an encoded QR Tag.

**QR Tag:**  
You will then need to scan the QR code of the professional you wish to tip.  
Your waiter should have an id tag that includes their QR code, your waiters QR code should also be found on the back of your table menu.  
To tip a DJ at the nightclub - see the DJ listings for their QR codes, for any artists that have installations the placard introducing the piece will contain their QR code, event speakers will be listed on the events programme, and finally any stall owners that have stock to sell will list prices at their stall or you can request a price from them directly.

## History:

### Alpha release

**v0.0.44-alpha**  
Updated Hostinger server to use php v8.4.22 and cURL v8.20.0  
Added fetch-prices.php script to use Jetset Coingecko API key to create /dapp/public/priceData.json  
Created CRON job to execute fetch-prices.php every 10 minutes  
Added draft /dapp/index.html page intoducing Jetset DApps and providing a button to start the latest version of JetsetUI.

**v0.0.45-alpha**  
Fixes: Adding 7dvh offset from bottom of page so DApps are visible on devices with task/button bars e.g. iOS, etc.

Fixes: Changed fiat price of wallet asset from $ prefix to three letter postfix that matches currently selected Fiat (selFiat) and matches format of prior line crypto output.

Fixes: Portfolio/Wallet asset total in fiat now matches currently selected fiat both in symbol and value.

Improvement: Latest price data is created during build and is used as initialData for the query cache, the ISO Date UTC Time output is converted to jstime (ms since unix epoch 1/1/1970) and added as initialDataUpdatedAt. The web server uses CRON to fetch the price data every 10 minutes which is written to /dapp/public/ for use by the DApps. On starting JetsetUI the client will attempt to fetch the very latest version of the pricing data, success writes this data to localStorage keys. If rate limiting in effect on the client, then the latest prices wwritten to the server are fetched, this whole process ensures there is always pricing data available and usually under 10 minutes old.

**v0.0.46-alpha**  
Fixes: Uses priceData generated and written to the DApp assets folder at build time to create the initialData for ['priceData'] tanstack query cache at DApp first ever start.
After this point, if the version matches then drop out of initialising DApp data as already setup previously, if new version then writes new version data to localStorage DApp keys, including buildtime priceData.

Fixed: usePriceData hook has been modified to use priceData from the Tanstack cache, the cache data fetching hook getPriceData now accesses the Coingecko API directly, if successful uses this data and updates the localStorage keys with latest data. If data fetch fails, e.g. rate limit, then fallsback to fetch the priceData.json and priceMeta.json files from the websites dapp/public folder, which is updated by the server every 10 minutes, successful read updates localStorage as usual, else fail fallsback to previous cache data either build time pricceData, or last successful priceData fetch by the DApp.

Updated: Crypto can now be purchased. The Buy Modal has had Flooz exchanged for Onramper as it has been voted one of the best on-ramp and off-ramp services. Embr seems to have disappeared.

Added: Lucide-react icons have been added as a professional icon that provides platform specific icons, and the code automatically tree shakes.

Added: Setting - Header cog icon.

Added: Info Icon for TipTap and JetsetUI help text.
