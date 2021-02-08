import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledFormItemLabel = styled.label`
  margin: 0 0 10px 0;
  display: block;
`;

type Props = StyledComponentInnerOtherProps<typeof StyledFormItemLabel> &
  React.LabelHTMLAttributes<HTMLLabelElement>;

export const FormItemLabel = React.forwardRef<HTMLLabelElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledFormItemLabel ref={ref} {...otherProps}>
      {children}
    </StyledFormItemLabel>
  )
);

FormItemLabel.displayName = "FormItemLabel";
