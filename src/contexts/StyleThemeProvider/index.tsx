import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { appTheme } from "../../styles/theme";

export function StyleThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
}
