import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledButton = styled.button<{
  isFullWidth?: boolean;
}>`
  ${({ theme }) => theme.typography.button}
  cursor: pointer;
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  color: ${({ theme }) => theme.palettes.primary.contrastText};
  background-color: ${({ theme }) => theme.palettes.primary.main};
  padding: 8px 22px;
  box-sizing: border-box;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  appearance: none;
  box-shadow: 0 0.25rem 0 ${({ theme }) => theme.palettes.primary.dark};
  :hover {
    opacity: ${({ theme }) => theme.palettes.action.hoverOpacity};
  }
`;

type Props = StyledComponentInnerOtherProps<typeof StyledButton> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ isFullWidth = false, children, ...otherProps }, ref) => (
    <StyledButton isFullWidth={isFullWidth} ref={ref} {...otherProps}>
      {children}
    </StyledButton>
  )
);

Button.displayName = "Button";
