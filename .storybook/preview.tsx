import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { CalendarProvider } from "../src/context";
import GlobalStyle from "../src/styles/GlobalStyles";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    Story => (
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <CalendarProvider calendarProps={{}}>
          <Story />
        </CalendarProvider>
      </ThemeProvider>
    )
  ]
};

export default preview;
