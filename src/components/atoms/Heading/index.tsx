import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

type StyledProps = {
  styleLevel: "h1" | "h2" | "h3" | "h4";
};

const StyledHeadingH2 = styled.h1<StyledProps>`
  position: relative;
  text-align: center;
  ${({ theme, styleLevel }) => theme.typography[styleLevel]}
  padding-bottom: 1.0rem;

  ::before {
    position: absolute;
    bottom: 0;
    left: calc(50% - 30px);
    width: 60px;
    height: 5px;
    content: "";
    border-radius: 3px;
    background: ${({ theme }) => theme.palettes.primary.main};
  }
`;

const StyledHeading = styled.h1<StyledProps>`
  position: relative;
  text-align: center;
  ${({ theme }) => theme.typography.h3}
`;

type Props = StyledComponentInnerOtherProps<typeof StyledHeading> &
  React.HTMLAttributes<HTMLHeadingElement>;

export const Heading = React.forwardRef<HTMLDivElement, Props>(
  ({ styleLevel, children, ...otherProps }, ref) => {
    switch (styleLevel) {
      case "h2":
        return (
          <StyledHeadingH2 styleLevel={styleLevel} ref={ref} {...otherProps}>
            <span>{children}</span>
          </StyledHeadingH2>
        );
        break;
      default:
        return (
          <StyledHeading styleLevel={styleLevel} ref={ref} {...otherProps}>
            {children}
          </StyledHeading>
        );
    }
  }
);

Heading.displayName = "Heading";
