import "styled-components";
import { appTheme } from "../src/styles/theme";

type Theme = typeof appTheme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
