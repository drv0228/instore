// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import pluginReact from "eslint-plugin-react";

// const { settings: reactSettings } = pluginReact;

// export default [
//   { files: ["**/*.{js,mjs,cjs,jsx}"] },
//   { files: ["**/*.test.js"], env: { jest: true } }, 
//   { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   pluginReactConfig,
//   {
//     settings: {
//       react: {
//         version: "detect", // Automatically detect the React version
//       },
//     },
//   },
// ];
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReact from "eslint-plugin-react";

const { settings: reactSettings } = pluginReact;

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
