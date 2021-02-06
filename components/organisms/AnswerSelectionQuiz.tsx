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

function Result({ isCorrect }: { isCorrect: boolean | null }) {
  if (isCorrect === null) return null;
  if (isCorrect) {
    return <p>正解！</p>;
  }
  return <p>不正解！</p>;
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
