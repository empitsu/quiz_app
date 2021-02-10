import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledErrorText = styled.p`
  color: ${({ theme }) => theme.palettes.error.main};
`;

type Props = StyledComponentInnerOtherProps<typeof StyledErrorText> &
  React.HTMLAttributes<HTMLParagraphElement>;

export const FormErrorText = React.forwardRef<HTMLParagraphElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledErrorText ref={ref} {...otherProps}>
      {children}
    </StyledErrorText>
  )
);

FormErrorText.displayName = "FormErrorText";
