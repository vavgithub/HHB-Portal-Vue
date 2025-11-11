

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  "stories": [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  }
};
export default config;