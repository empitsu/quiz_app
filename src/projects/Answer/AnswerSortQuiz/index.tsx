import { Dispatch, useCallback, useContext, useReducer, useState } from "react";
import { AnswerPropStore } from "../../../contexts/AnswerProps";
import { incrementCurrentQuiz } from "../../../ducks/Answer";
import { reducer } from "../../../ducks/AnswerSortQuiz";
import {
  Actions,
  popFromSelectedOptions,
  pushToSelectedOptions,
} from "../../../ducks/AnswerSortQuiz/actions";
import { SortableOptionsSet } from "../../../ducks/AnswerSortQuiz/model";

type AnswerQuizProps = {
  title: string;
  options: SortableOptionsSet["restOptions"];
};

type EachOptionButtonProps = {
  option: SortableOptionsSet["restOptions"][number];
  dispatch: Dispatch<Actions>;
};

function EachOptionButton({ option, dispatch }: EachOptionButtonProps) {
  const onClickAnswer = useCallback(() => {
    dispatch(pushToSelectedOptions(option));
  }, [dispatch, option]);

  if (option.text === "") {
    return <p></p>;
  }

  return <button onClick={onClickAnswer}>{option.text}</button>;
}

type SelectedOptionProps = {
  option: SortableOptionsSet["restOptions"][number];
  dispatch: Dispatch<Actions>;
};

function SelectedOption({ option, dispatch }: SelectedOptionProps) {
  const onClickSelectedOption = useCallback(() => {
    dispatch(popFromSelectedOptions(option));
  }, [dispatch, option]);

  return <button onClick={onClickSelectedOption}>{option.text}</button>;
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

export function AnswerSortQuiz({ title, options }: AnswerQuizProps) {
  const [state, dispatch] = useReducer(reducer, {
    selectedOptions: [],
    restOptions: [...options],
  });

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const onClickAnswerBtn = useCallback(() => {
    // 正解かどうかチェックする
    const isCorrect = state.selectedOptions.every((option, index) => {
      return option.optionId === index;
    });
    setIsCorrect(isCorrect);
  }, [state.selectedOptions]);
  return (
    <div>
      <p>{title}</p>
      <ul>
        {state.selectedOptions.map((option) => {
          return (
            <li key={option.optionId}>
              <SelectedOption
                option={option}
                dispatch={dispatch}
              ></SelectedOption>
            </li>
          );
        })}
      </ul>
      <ul>
        {state.restOptions.map((option) => {
          return (
            <li key={option.optionId}>
              <EachOptionButton
                option={option}
                dispatch={dispatch}
              ></EachOptionButton>
            </li>
          );
        })}
      </ul>
      <button onClick={onClickAnswerBtn}>これで回答する</button>
      <Result isCorrect={isCorrect}></Result>
    </div>
  );
}
