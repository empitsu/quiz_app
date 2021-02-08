import { css } from "styled-components";

export const normalize = css`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  strong,
  b {
    font-weight: 700;
  }
`;
