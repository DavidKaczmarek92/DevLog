import type { Preview } from "@storybook/react";
import "../src/index.css";
import { createElement } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../src/i18n/en.json";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      createElement(
        IntlProvider,
        { locale: "en", messages: enMessages, defaultLocale: "en" },
        createElement(Story)
      ),
  ],
};

export default preview;
