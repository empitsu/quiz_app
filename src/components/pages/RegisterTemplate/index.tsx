import { ChangeEventHandler, useCallback, useState } from "react";
import styled from "styled-components";
import { RegisterSelectionQuiz } from "./RegisterSelectionQuiz";
import { Column1 } from "../../uikit/Column1";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { Heading } from "../../uikit/Heading";
import { Radio } from "../../uikit/Radio";
import { RegisterSortQuiz } from "./RegisterSortQuiz";
import { LinkText } from "../../uikit/LinkText";
import { useRouter } from "next/router";

type QuizType = "selection" | "sort";

const StyledWrapP = styled.p`
  display: inline-block;

  :not(:last-child) {
    margin: 0 15px 0 0;
  }
`;
const StyledCenteredDiv = styled.div`
  text-align: center;
`;

const StyledBackLink = styled.p`
  text-align: center;
  margin: 20px 0;
`;

export default function RegisterTemplate() {
  const [quizType, setQuizType] = useState<QuizType>("selection");

  const router = useRouter();
  const onClickBackLink = useCallback(() => {
    router.reload();
  }, [router]);

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
        <StyledCenteredDiv>
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
        </StyledCenteredDiv>

        {quizType === "selection" ? (
          <RegisterSelectionQuiz></RegisterSelectionQuiz>
        ) : (
          <RegisterSortQuiz></RegisterSortQuiz>
        )}
        <StyledBackLink>
          <LinkText onClick={onClickBackLink}>トップに戻る</LinkText>
        </StyledBackLink>
      </Column1>
    </div>
  );
}
