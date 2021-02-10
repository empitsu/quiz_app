import { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../uikit/Button";
import { Heading } from "../../../uikit/Heading";
import { AnswerResult } from "../AnswerResult";
// todo:共通化
type Option = {
  optionId: number;
  text: string;
};

type AnswerQuizProps = {
  title: string;
  correctOptionId: number;
  options: Option[];
};

type ButtonToAnswerProps = {
  optionId: number;
  text: string;
  correctOptionId: number;
  onAnswerCorrectly: () => void;
  onMistake: () => void;
};

function ButtonToAnswer({
  optionId,
  text,
  correctOptionId,
  onAnswerCorrectly,
  onMistake,
}: ButtonToAnswerProps) {
  const onClickAnswer = useCallback(() => {
    if (optionId === correctOptionId) {
      onAnswerCorrectly();
    } else {
      onMistake();
    }
  }, [correctOptionId, onAnswerCorrectly, onMistake, optionId]);

  return (
    <Button isFullWidth color="secondary" onClick={onClickAnswer}>
      {text}
    </Button>
  );
}

const StyledQuizTitleP = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledList = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

const StyledUl = styled.ul`
  margin-bottom: 50px;
  padding: 0;
`;

const StyledSelectionQuizWrapDiv = styled.div`
  position: relative;
`;

export function AnswerSelectionQuiz({
  title,
  options,
  correctOptionId,
}: AnswerQuizProps) {
  const officialAnswer = options.find(
    (option) => option.optionId === correctOptionId
  )?.text;
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const onAnswerCorrectly = useCallback(() => {
    setIsCorrect(true);
  }, []);
  const onMistake = useCallback(() => {
    setIsCorrect(false);
  }, []);
  return (
    <article>
      <Heading styleLevel="h3">選択してください</Heading>

      <StyledQuizTitleP>{title}</StyledQuizTitleP>
      <StyledSelectionQuizWrapDiv>
        {isCorrect === null ? (
          <StyledUl>
            {options.map((option) => {
              return (
                <StyledList key={option.optionId}>
                  <ButtonToAnswer
                    optionId={option.optionId}
                    text={option.text}
                    correctOptionId={correctOptionId}
                    onAnswerCorrectly={onAnswerCorrectly}
                    onMistake={onMistake}
                  ></ButtonToAnswer>
                </StyledList>
              );
            })}
          </StyledUl>
        ) : (
          <AnswerResult
            isCorrect={isCorrect}
            officialAnswer={officialAnswer ?? ""}
          ></AnswerResult>
        )}
      </StyledSelectionQuizWrapDiv>
    </article>
  );
}
