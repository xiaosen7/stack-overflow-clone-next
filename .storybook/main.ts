import type { StorybookConfig } from "@storybook/nextjs";
import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";

console.log(
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);

const config: StorybookConfig = {
  stories: [
    "../modules/*/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal(config) {
    // copy env if it is built in vercel
    if (!process.env.VERCEL) {
      return config;
    }

    return merge(config, {
      plugins: [
        new DefinePlugin({
          "process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": JSON.stringify(
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          ),
          "process.env.CLERK_SECRET_KEY": JSON.stringify(
            process.env.CLERK_SECRET_KEY
          ),
          "process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL": JSON.stringify(
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
          ),
          "process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL": JSON.stringify(
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
          ),
        }),
      ],
    });
  },
  staticDirs: process.env.NODE_ENV === "development" ? ["../public"] : [], // in build mode, it is built into public folder, so we didn't need to specify it.
};
export default config;
