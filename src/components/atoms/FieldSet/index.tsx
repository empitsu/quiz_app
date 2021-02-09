import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledFieldset = styled.fieldset`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palettes.grey["500"]};
  border-radius: ${({ theme }) => theme.border.radius};
  margin: 0 0 5px 0;
  background: ${({ theme }) => theme.palettes.common.white};
`;

type Props = StyledComponentInnerOtherProps<typeof StyledFieldset> &
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FieldSet = React.forwardRef<HTMLFieldSetElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledFieldset ref={ref} {...otherProps}>
      {children}
    </StyledFieldset>
  )
);

FieldSet.displayName = "FieldSet";
