import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledAnchor = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.palettes.primary.main};
  :hover {
    text-decoration: underline;
  }
`;

type Props = StyledComponentInnerOtherProps<typeof StyledAnchor> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkText = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledAnchor ref={ref} {...otherProps}>
      {children}
    </StyledAnchor>
  )
);

LinkText.displayName = "LinkText";
