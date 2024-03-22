# vite-edit-compiled-files-in-pot

vite-edit-compiled-files-in-pot is a package used to replace compiled file names inside a pot translation file

## Usage example

vite-edit-compiled-files-in-pot is available as an NPM package:

```bash
npm i @mlnop/vite-edit-compiled-files-in-pot --save-dev
```

You need to pass 3 parameters
- The path to the generated `manifest.json` file
- The path to the translation.pot file you want to Edit
- The relative path where your compiled assets are nested (if there are)

```js
export default defineConfig(async ({command, mode, isSsrBuild, isPreview}) => {
  return {
    plugins: [
      {
        ...checkI18NFiles(`buildPath/.vite/manifest.json`, `path/to/translationFile.pot`, 'path/to/assets'),
        apply: "build",
        enforce: "pre",
      },
    ],
  };
});
```

## Changelog

#### 1.0.0 &mdash; 22/03/2024

- First commit.
- Published to NPM.
