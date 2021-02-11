import React from "react";
import styled, {
  CSSProperties,
  StyledComponentInnerOtherProps,
} from "styled-components";

const StyledButton = styled.button<{
  isFullWidth: boolean;
  color: "primary" | "secondary" | "info" | "success";
  disabled: boolean;
}>`
  ${({ theme }) => theme.typography.button}
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  color: ${({ theme, color, disabled }) =>
    disabled
      ? theme.palettes.disabled.contrastText
      : theme.palettes[color].contrastText};
  background-color: ${({ theme, color, disabled }) => {
    if (disabled) return theme.palettes.disabled.main;
    return theme.palettes[color].main;
  }};
  padding: 8px 22px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, color }) =>
    color === "info" ? theme.palettes.info.light : "transparent"};
  border-radius: ${({ theme }) => theme.border.radius};
  appearance: none;
  box-shadow: 0 0.25rem 0
    ${({ theme, color, disabled }) =>
      disabled ? theme.palettes.disabled.dark : theme.palettes[color].dark};
  :hover {
    opacity: ${({ theme, disabled }): CSSProperties["opacity"] =>
      disabled ? 1 : theme.palettes.action.hoverOpacity};
  }
`;

type Props = Partial<StyledComponentInnerOtherProps<typeof StyledButton>> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      isFullWidth = false,
      disabled = false,
      color = "primary",
      children,
      ...otherProps
    },
    ref
  ) => (
    <StyledButton
      isFullWidth={isFullWidth}
      disabled={disabled}
      color={color}
      ref={ref}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
);

Button.displayName = "Button";
