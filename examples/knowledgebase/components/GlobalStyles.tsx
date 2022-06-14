import React from "react";
import { css } from "@emotion/core";

import tokens from "@contentful/f36-tokens";

import { Global } from "@emotion/core";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        *,
        *::after,
        *::before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          box-sizing: inherit;
        }

        html {
          border: 0;
          box-sizing: border-box;
          margin: 0;
          min-height: 100%;
          padding: 0;
        }

        body {
          color: ${tokens.gray800};
          font-family: ${tokens.fontStackPrimary};
          font-size: ${tokens.fontSizeM};
          line-height: ${tokens.lineHeightM};
          min-width: 1280px;
        }

        body *::-webkit-scrollbar {
          width: 12px;
        }
        body *::-webkit-scrollbar-track {
          background: ${tokens.colorWhite};
        }
        body *::-webkit-scrollbar-thumb {
          background-color: ${tokens.gray400};
          border-radius: 6px;
          border: 3px solid ${tokens.colorWhite};
        }

        code {
          font-family: ${tokens.fontStackMonospace};
          white-space: nowrap;
          font-weight: ${tokens.fontWeightMedium};
          background-color: ${tokens.gray200};
          font-size: 95%;
          margin: 0;
          padding: 0.2em 0.4em;
          border-radius: ${tokens.borderRadiusSmall};
        }

        pre {
          margin: 0;
          white-space: break-spaces;
        }

        fieldset {
          border: 0;
          margin: 0;
          padding: 0;
        }
      `}
    />
  );
};
