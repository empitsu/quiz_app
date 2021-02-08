import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "../styles/normalize";
import { preset } from "../styles/preset";
import { appTheme } from "../styles/theme";

const GlobalStyle = createGlobalStyle`
${normalize}
${preset}
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={appTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
