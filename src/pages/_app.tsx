import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { StyleThemeProvider } from "../contexts/StyleThemeProvider";
import { normalize } from "../styles/normalize";
import { preset } from "../styles/preset";

const GlobalStyle = createGlobalStyle`
${normalize}
${preset}
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <StyleThemeProvider>
        <Component {...pageProps} />
      </StyleThemeProvider>
    </>
  );
}
