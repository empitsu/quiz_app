import { forwardRef } from "react";
import styled from "styled-components";
import { Button } from "../../../components/atoms/Button";
import { FieldSet } from "../../../components/atoms/FieldSet";
import { FormErrorText } from "../../../components/atoms/FormErrorText";
import { FormItemLabel } from "../../../components/atoms/FormItemLabel";
import { Textfield } from "../../../components/atoms/Textfield";

type QuizOptionProps = {
  optionId: number;
  isRemovable: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
  onRemove: (id: number) => () => void;
};

const StyledWrapDiv = styled.div`
  width: 100%;
  margin-right: 5px;
`;

export const SortQuizOption = forwardRef<HTMLInputElement, QuizOptionProps>(
  ({ optionId, onRemove, errorMessage, isRemovable }, ref) => {
    // nameを`sortQuizOption[${optionId}]`にするとsubmit時のdataが配列形式になる
    const fieldName = `sortQuizOption[${optionId}]`;
    return (
      <FieldSet name={fieldName} key={fieldName}>
        <StyledWrapDiv>
          <FormItemLabel
            htmlFor={fieldName}
          >{`選択肢${optionId}`}</FormItemLabel>
          <Textfield
            id={fieldName}
            name={fieldName}
            isFullWidth
            placeholder="選択肢を入力してください"
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
        </StyledWrapDiv>
        {isRemovable && <Button onClick={onRemove(optionId)}>Remove</Button>}
      </FieldSet>
    );
  }
);

SortQuizOption.displayName = "SortQuizOption";
