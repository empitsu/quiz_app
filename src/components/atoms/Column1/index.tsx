import React from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const sizeList = {
  small: "444px",
  medium: "600px",
  large: "800px",
} as const;

const StyledNarrowSection = styled.section<{
  size?: "small" | "medium" | "large";
}>`
  max-width: ${({ size }) => (size ? sizeList[size] : sizeList["medium"])};
  padding: 0 24px;
  margin: 0 auto;
`;

type Props = StyledComponentInnerOtherProps<typeof StyledNarrowSection> &
  React.HTMLAttributes<HTMLElement>;

export const Column1 = React.forwardRef<HTMLElement, Props>(
  ({ children, ...otherProps }, ref) => (
    <StyledNarrowSection ref={ref} {...otherProps}>
      {children}
    </StyledNarrowSection>
  )
);

Column1.displayName = "Column1";
