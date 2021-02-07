import { useCallback, useState } from "react";

// todo:共通化
type Option = {
  optionId: number;
  text: string;
};

type AnswerQuizProps = {
  title: string;
  correctOptionId: number;
  options: Option[];
  onAnswer: (isCorrect: boolean) => void;
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
  onAnswer: (isCorrect: boolean) => void;
};

function Result({ isCorrect, onAnswer }: ResultProps) {
  if (isCorrect === null) return null;
  if (isCorrect) {
    return (
      <>
        <p>正解！</p>
        <button
          onClick={() => {
            onAnswer(true);
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
          onAnswer(false);
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
  onAnswer,
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
      <Result isCorrect={isCorrect} onAnswer={onAnswer}></Result>
    </div>
  );
}
