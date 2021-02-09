import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledPageTitleH1 = styled.h1<{
  styleLevel: "h1" | "h2" | "h3" | "h4";
}>`
  position: relative;
  text-align: center;
  ${({ theme, styleLevel }) => theme.typography[styleLevel]}
  padding-bottom: 0.7rem;

  ::before {
    position: absolute;
    bottom: -10px;
    left: calc(50% - 30px);
    width: 60px;
    height: 5px;
    content: "";
    border-radius: 3px;
    background: ${({ theme }) => theme.palettes.primary.main};
  }
`;

type Props = StyledComponentInnerOtherProps<typeof StyledPageTitleH1> &
  React.HTMLAttributes<HTMLHeadingElement>;

export const Heading = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledPageTitleH1 ref={ref} {...otherProps}>
      <span>{children}</span>
    </StyledPageTitleH1>
  )
);

Heading.displayName = "Heading";
