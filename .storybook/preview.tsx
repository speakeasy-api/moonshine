import type { Preview, Decorator } from "@storybook/react-vite";
import "../src/global.css";
import "./fonts.css";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { ThemedDocsContainer } from "./themedDocsContainer";

import { MoonshineConfigProvider } from "../src/context/ConfigContext";

const moonshineConfigProviderDecorator: Decorator = (story, context) => {
  return (
    <MoonshineConfigProvider theme={context.globals.theme} setTheme={() => {}}>
      {story()}
    </MoonshineConfigProvider>
  );
};

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: { light: "light", dark: "dark" },
    defaultTheme: "light",
  }),
  moonshineConfigProviderDecorator,
];

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        small: { name: "Small", styles: { width: "640px", height: "800px" } },
        large: {
          name: "Large",
          styles: { width: "1024px", height: "1000px" },
        },
      },
    },
    backgrounds: {
      options: {
        light: { name: "light", value: "#fff" },
        dark: { name: "dark", value: "hsl(0, 0%, 7%)" },
      },
    },

    docs: {
      container: ThemedDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
