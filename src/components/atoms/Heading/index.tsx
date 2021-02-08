import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledPageTitleH1 = styled.h1<{
  styleLevel: "h1" | "h2" | "h3" | "h4";
}>`
  text-align: center;
  ${({ theme, styleLevel }) => theme.typography[styleLevel]}
`;

type Props = StyledComponentInnerOtherProps<typeof StyledPageTitleH1> &
  React.HTMLAttributes<HTMLHeadingElement>;

export const Heading = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledPageTitleH1 ref={ref} {...otherProps}>
      {children}
    </StyledPageTitleH1>
  )
);

Heading.displayName = "Heading";
