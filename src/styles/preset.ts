import { css } from "styled-components";
import { appTheme } from "./theme";

export const preset = css`
  body {
    color: ${appTheme.palettes.text.primary};
    margin: 0;
    ${appTheme.typography.body}
    background-color: ${appTheme.palettes.background.default};
  }
  @media print {
    body {
      background-color: ${appTheme.palettes.background.paper};
    }
  }
  body::backdrop {
    background-color: ${appTheme.palettes.background.default};
  }
`;
