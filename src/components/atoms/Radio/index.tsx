import React, { ReactNode } from "react";
import styled, { StyledComponentInnerOtherProps } from "styled-components";

const StyledRadioWrapSpan = styled.span`
  position: relative;
  display: inline-block;
`;

const StyledInputRadio = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

const StyledRadioLabel = styled.label`
  position: relative;
  display: inline-block;
  padding-left: 2.1rem;
  font-size: 1rem;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.palettes.text.primary};
  vertical-align: text-top;
  cursor: pointer;

  ::before {
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    display: block;
    height: 1.6rem;
    width: 1.6rem;
    content: "";
    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.palettes.common.white};
    border: 0.2rem solid ${({ theme }) => theme.palettes.grey["400"]};
  }
  input:focus + &::before {
    border-color: ${({ theme }) => theme.palettes.primary.main};
  }

  ::after {
    position: absolute;
    box-sizing: border-box;
    display: block;
    content: "";
  }

  input:checked + &::after {
    top: 0.5rem;
    left: 0.5rem;
    background-color: ${({ theme }) => theme.palettes.primary.main};
    border-radius: 0.3rem;
    height: 0.6rem;
    width: 0.6rem;
  }
`;

type Props = {
  id: string;
  children: ReactNode;
} & StyledComponentInnerOtherProps<typeof StyledInputRadio> &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ id, children, ...otherProps }, ref) => (
    <StyledRadioWrapSpan>
      <StyledInputRadio
        type="radio"
        id={id}
        ref={ref}
        {...otherProps}
      ></StyledInputRadio>
      <StyledRadioLabel htmlFor={id}>{children}</StyledRadioLabel>
    </StyledRadioWrapSpan>
  )
);

Radio.displayName = "Radio";
