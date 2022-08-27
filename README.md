
<h1 align="center">Japanesify</h1>
A WebExtension that will replace latin letters with selected Japanese characters. The idea is to gradually expand and practice the Japanese alphabets without intense study sessions.
This WebExtension uses local storage to save preferences.

## What it does
* Replaces latin letters with groups of Hiragana.
* Can quickly be enabled and disabled

## 🚀 Quick Start

Ensure you have

- [Node.js](https://nodejs.org) 10 or later installed

### Development

- `npm install` to install dependencies.
- To watch file changes in development

  - Chrome
    - `npm run dev:chrome`
  - Firefox
    - `npm run dev:firefox`
  - Opera
    - `npm run dev:opera`

- **Load extension in browser**

- ### Chrome

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension…` button.
  - Select your extension’s extracted directory.

- ### Firefox

  - Load the Add-on via `about:debugging` as temporary Add-on.
  - Choose the `manifest.json` file in the extracted directory

- ### Opera

  - Load the extension via `opera:extensions`
  - Check the `Developer Mode` and load as unpacked from extension’s extracted directory.

### Production

- `npm run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.

Note: By default the `manifest.json` is set with version `0.0.0`. The webpack loader will update the version in the build with that of the `package.json` version. In order to release a new version, update version in `package.json` and run script.

### Generating browser specific manifest.json

Update `source/manifest.json` file with browser vendor prefixed manifest keys

```js
{
  "__chrome__name": "SuperChrome",
  "__firefox__name": "SuperFox",
  "__edge__name": "SuperEdge",
  "__opera__name": "SuperOpera"
}
```

if the vendor is `chrome` this compiles to:

```js
{
  "name": "SuperChrome",
}
```

---

Add keys to multiple vendors by separating them with | in the prefix

```
{
  __chrome|opera__name: "SuperBlink"
}
```

if the vendor is `chrome` or `opera`, this compiles to:

```
{
  "name": "SuperBlink"
}
```

See the original [README](https://github.com/abhijithvijayan/wext-manifest-loader) of `wext-manifest-loader` package for more details

## Intended future features
* Enable/Disable for specific pages
* Lookup conversion chart

## Bugs

Please file an issue [here](https://github.com/thorbjxrn/Japanesify/issues/new) for bugs, missing documentation, or unexpected behavior.

## Acknowledgements

* This WebExtension is built upon Mozilla's "emoji-substitute" WebExtension example.

Big thanks to hcortizcolon for his development on video sites and Reddit compability.

## License

MIT ©
