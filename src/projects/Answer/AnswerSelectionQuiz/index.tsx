import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/atoms/Button";
import { AnswerPropStore } from "../../../contexts/AnswerProps";
import { incrementCurrentQuiz } from "../../../ducks/AnswerTemplate";

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

type ResultProps = {
  isCorrect: boolean | null;
};

function Result({ isCorrect }: ResultProps) {
  const { dispatch } = useContext(AnswerPropStore);

  if (isCorrect === null) return null;
  if (isCorrect) {
    return (
      <>
        <p>正解！</p>
        <button
          onClick={() => {
            dispatch(incrementCurrentQuiz(true));
          }}
        >
          次へ
        </button>
      </>
    );
  }
  return (
    <>
      <p>不正解！</p>
      <button
        onClick={() => {
          dispatch(incrementCurrentQuiz(false));
        }}
      >
        次へ
      </button>
    </>
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

export function AnswerSelectionQuiz({
  title,
  options,
  correctOptionId,
}: AnswerQuizProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const onAnswerCorrectly = useCallback(() => {
    setIsCorrect(true);
  }, []);
  const onMistake = useCallback(() => {
    setIsCorrect(false);
  }, []);
  return (
    <div>
      <StyledQuizTitleP>{title}</StyledQuizTitleP>
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
      <Result isCorrect={isCorrect}></Result>
    </div>
  );
}
