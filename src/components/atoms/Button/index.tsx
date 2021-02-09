import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledButton = styled.button<{
  isFullWidth: boolean;
  color: "primary" | "secondary" | "info" | "success";
}>`
  ${({ theme }) => theme.typography.button}
  cursor: pointer;
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  color: ${({ theme, color }) => theme.palettes[color].contrastText};
  background-color: ${({ theme, color }) => theme.palettes[color].main};
  padding: 8px 22px;
  box-sizing: border-box;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  appearance: none;
  box-shadow: 0 0.25rem 0 ${({ theme, color }) => theme.palettes[color].dark};
  :hover {
    opacity: ${({ theme }) => theme.palettes.action.hoverOpacity};
  }
`;

type Props = Partial<StyledComponentInnerOtherProps<typeof StyledButton>> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { isFullWidth = false, color = "primary", children, ...otherProps },
    ref
  ) => (
    <StyledButton
      isFullWidth={isFullWidth}
      color={color}
      ref={ref}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
);

Button.displayName = "Button";
