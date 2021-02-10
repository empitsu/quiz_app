import { ChangeEventHandler, useCallback, useState } from "react";
import styled from "styled-components";
import { RegisterSelectionQuiz } from "./RegisterSelectionQuiz";
import { Column1 } from "../../uikit/Column1";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { Heading } from "../../uikit/Heading";
import { Radio } from "../../uikit/Radio";
import { RegisterSortQuiz } from "./RegisterSortQuiz";

type QuizType = "selection" | "sort";

const StyledWrapP = styled.p`
  display: inline-block;

  :not(:last-child) {
    margin: 0 7px 0 0;
  }
`;

export default function RegisterTemplate() {
  const [quizType, setQuizType] = useState<QuizType>("selection");

  const onClickQuizType = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setQuizType(e.target.value as QuizType);
    },
    [setQuizType]
  );

  return (
    <div>
      <Heading styleLevel="h2">クイズ登録</Heading>
      <Column1 size="large">
        <FormItemWrap>
          <StyledWrapP>
            <Radio
              name="register-quiz-type"
              id="register-quiz-type1"
              value="selection"
              checked={quizType === "selection"}
              onChange={onClickQuizType}
            >
              4択問題
            </Radio>
          </StyledWrapP>
          <StyledWrapP>
            <Radio
              name="register-quiz-type"
              id="register-quiz-type2"
              value="sort"
              checked={quizType === "sort"}
              onChange={onClickQuizType}
            >
              並び替え問題
            </Radio>
          </StyledWrapP>
        </FormItemWrap>

        {quizType === "selection" ? (
          <RegisterSelectionQuiz></RegisterSelectionQuiz>
        ) : (
          <RegisterSortQuiz></RegisterSortQuiz>
        )}
      </Column1>
    </div>
  );
}
