import { useCallback, useContext, useState } from "react";
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

  return <button onClick={onClickAnswer}>{text}</button>;
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
      <p>{title}</p>
      <ul>
        {options.map((option) => {
          return (
            <li key={option.optionId}>
              <ButtonToAnswer
                optionId={option.optionId}
                text={option.text}
                correctOptionId={correctOptionId}
                onAnswerCorrectly={onAnswerCorrectly}
                onMistake={onMistake}
              ></ButtonToAnswer>
            </li>
          );
        })}
      </ul>
      <Result isCorrect={isCorrect}></Result>
    </div>
  );
}
