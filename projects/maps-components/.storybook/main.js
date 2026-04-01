

/** @type { import('@storybook/angular').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/angular",
  previewBody: (body) => `
    <style>
      body {
        background-color: #fff;
      }
      art-map-plate {
        width: 500px;
        height: 400px;
      }
    </style>
    ${body}
  `
};
export default config;
