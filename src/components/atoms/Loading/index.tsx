import React from "react";
import styled, {
  keyframes,
  StyledComponentInnerOtherProps,
} from "styled-components";

const gridAnimation = keyframes`
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
`;

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  > div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palettes.primary.main};
    animation: ${gridAnimation} 1.2s linear infinite;
  }
  > div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  > div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  > div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  > div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  > div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  > div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  > div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  > div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  > div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
`;

type Props = StyledComponentInnerOtherProps<typeof StyledDiv> &
  React.HTMLAttributes<HTMLDivElement>;

/**
 * refer to: https://loading.io/css/
 */
export const Loading = React.forwardRef<HTMLDivElement, Props>(
  ({ ...otherProps }, ref) => (
    <StyledDiv ref={ref} {...otherProps}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledDiv>
  )
);

Loading.displayName = "Loading";
