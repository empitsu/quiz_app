import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledFormItemWrap = styled.div`
  margin: 8px 0;
`;

type Props = StyledComponentInnerOtherProps<typeof StyledFormItemWrap> &
  React.HTMLAttributes<HTMLDivElement>;

export const FormItemWrap = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledFormItemWrap ref={ref} {...otherProps}>
      {children}
    </StyledFormItemWrap>
  )
);

FormItemWrap.displayName = "FormItemWrap";
