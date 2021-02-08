import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledTextField = styled.input<{
  isFullWidth?: boolean;
}>`
  color: ${({ theme }) => theme.palettes.text.primary};
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  margin: 0;
  padding: 18.5px 14px;
  display: inline-flex;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.palettes.grey["400"]};
  border-radius: ${({ theme }) => theme.border.radius};
  background: ${({ theme }) => theme.palettes.background.level1};
  box-sizing: border-box;
  letter-spacing: inherit;
  line-height: 1.5em;
  -webkit-tap-highlight-color: transparent;
  :focus {
    border-color: ${({ theme }) => theme.palettes.primary.main};
  }
`;

type Props = StyledComponentInnerOtherProps<typeof StyledTextField> &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Textfield = React.forwardRef<HTMLInputElement, Props>(
  ({ isFullWidth = false, ...otherProps }, ref) => (
    <StyledTextField
      isFullWidth={isFullWidth}
      ref={ref}
      {...otherProps}
    ></StyledTextField>
  )
);

Textfield.displayName = "Textfield";
