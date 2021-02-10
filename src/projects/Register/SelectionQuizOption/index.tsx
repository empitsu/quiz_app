import { forwardRef } from "react";
import styled from "styled-components";
import { FieldSet } from "../../../components/atoms/FieldSet";
import { FormErrorText } from "../../../components/atoms/FormErrorText";
import { FormItemLabel } from "../../../components/atoms/FormItemLabel";
import { Radio } from "../../../components/atoms/Radio";
import { Textfield } from "../../../components/atoms/Textfield";

type QuizOptionProps = {
  optionId: number;
  errorMessage: string | null | undefined;
  radioRef: (ref: HTMLInputElement) => void;
};

const StyledRadioWrapDiv = styled.div`
  width: 37px;
`;

const StyledTextFieldWrapDiv = styled.div`
  width: 100%;
`;

export const SelectionQuizOption = forwardRef<
  HTMLInputElement,
  QuizOptionProps
>(({ optionId, radioRef, errorMessage }, ref) => {
  // nameを`SelectionQuizOption[${optionId}]`にするとsubmit時のdataが配列形式になる
  // https://react-hook-form.com/api#register
  const fieldName = `selectionQuizOption[${optionId}]`;
  return (
    <>
      <FieldSet name={fieldName} key={fieldName}>
        <StyledRadioWrapDiv>
          <Radio
            id={`selectionQuizCorrectAnswer${optionId}`}
            name="selectionQuizCorrectAnswer"
            value={optionId}
            ref={radioRef}
            aria-label={`選択肢${optionId}を正答にする`}
          >
            {""}
          </Radio>
        </StyledRadioWrapDiv>
        <StyledTextFieldWrapDiv>
          <FormItemLabel
            htmlFor={fieldName}
          >{`選択肢${optionId}`}</FormItemLabel>
          <Textfield
            id={fieldName}
            name={fieldName}
            placeholder="選択肢を入力してください"
            isFullWidth
            ref={ref}
          ></Textfield>
          {errorMessage && (
            <FormErrorText
              role="alert"
              aria-label={`選択肢${optionId}のエラー`}
            >
              {errorMessage}
            </FormErrorText>
          )}
        </StyledTextFieldWrapDiv>
      </FieldSet>
    </>
  );
});

SelectionQuizOption.displayName = "SelectionQuizOption";
