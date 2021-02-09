import { Dispatch, useCallback, useContext, useReducer, useState } from "react";
import { AnswerPropStore } from "../../../contexts/AnswerProps";
import { incrementCurrentQuiz } from "../../../ducks/AnswerTemplate";
import { reducer } from "../../../ducks/AnswerSortQuiz";
import {
  Actions,
  popFromSelectedOptions,
  pushToSelectedOptions,
} from "../../../ducks/AnswerSortQuiz/actions";
import { SortableOptionsSet } from "../../../ducks/AnswerSortQuiz/model";
import { Button } from "../../../components/atoms/Button";
import styled from "styled-components";
import { shuffleArray } from "../../../utils/shuffleArray";

type AnswerQuizProps = {
  title: string;
  options: {
    optionId: number;
    text: string;
  }[];
};

type EachOptionButtonProps = {
  option: SortableOptionsSet["restOptions"][number];
  dispatch: Dispatch<Actions>;
};

const StyledEmptyOptionP = styled.p`
  ${({ theme }) => theme.typography.button}
  color: transparent;
  background-color: ${({ theme }) => theme.palettes.grey["400"]};
  padding: 8px 22px;
  box-sizing: border-box;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  appearance: none;
  box-shadow: 0 0.25rem 0 ${({ theme }) => theme.palettes.grey["600"]};
  margin: 0;
`;

function EachOptionButton({ option, dispatch }: EachOptionButtonProps) {
  const onClickAnswer = useCallback(() => {
    dispatch(pushToSelectedOptions(option));
  }, [dispatch, option]);

  if (option.selected) {
    return <StyledEmptyOptionP>{option.text}</StyledEmptyOptionP>;
  }

  return (
    <Button color="secondary" onClick={onClickAnswer}>
      {option.text}
    </Button>
  );
}

type SelectedOptionProps = {
  option: SortableOptionsSet["restOptions"][number];
  dispatch: Dispatch<Actions>;
};

function SelectedOption({ option, dispatch }: SelectedOptionProps) {
  const onClickSelectedOption = useCallback(() => {
    dispatch(popFromSelectedOptions(option));
  }, [dispatch, option]);

  return (
    <Button color="secondary" onClick={onClickSelectedOption}>
      {option.text}
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
        <Button
          color="info"
          onClick={() => {
            dispatch(incrementCurrentQuiz(true));
          }}
        >
          次へ
        </Button>
      </>
    );
  }
  return (
    <>
      <p>不正解！</p>
      <Button
        color="info"
        onClick={() => {
          dispatch(incrementCurrentQuiz(false));
        }}
      >
        次へ
      </Button>
    </>
  );
}

const StyledQuizTitleP = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledSelectedOptionUl = styled.ul`
  min-height: 106px;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;
  border-top: 1px solid ${({ theme }) => theme.palettes.grey["600"]};
  border-bottom: 1px solid ${({ theme }) => theme.palettes.grey["600"]};
  margin: 30px 0;
`;

const StyledRestOptionUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 0;
  margin-bottom: 50px;
`;
const StyledList = styled.li`
  list-style: none;
`;

export function AnswerSortQuiz({ title, options }: AnswerQuizProps) {
  const defaultRestOptions = shuffleArray(options).map((option, index) => {
    return {
      ...option,
      originalIndex: index,
      selected: false,
    };
  });
  const [state, dispatch] = useReducer(reducer, {
    selectedOptions: [],
    restOptions: [...defaultRestOptions],
  });

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const onClickAnswerBtn = useCallback(() => {
    // 正解かどうかチェックする
    const isCorrect = state.selectedOptions.every((option, index) => {
      return option.optionId === index;
    });
    // TODO: 正解の順番に並び替えて模範解答を表示する。

    setIsCorrect(isCorrect);
  }, [state.selectedOptions]);
  return (
    <div>
      <StyledQuizTitleP>{title}</StyledQuizTitleP>
      <StyledSelectedOptionUl>
        {state.selectedOptions.map((option) => {
          return (
            <StyledList key={option.optionId}>
              <SelectedOption
                option={option}
                dispatch={dispatch}
              ></SelectedOption>
            </StyledList>
          );
        })}
      </StyledSelectedOptionUl>
      <StyledRestOptionUl>
        {state.restOptions.map((option) => {
          return (
            <StyledList key={option.optionId}>
              <EachOptionButton
                option={option}
                dispatch={dispatch}
              ></EachOptionButton>
            </StyledList>
          );
        })}
      </StyledRestOptionUl>
      <Button isFullWidth color="secondary" onClick={onClickAnswerBtn}>
        これで回答する
      </Button>
      <Result isCorrect={isCorrect}></Result>
    </div>
  );
}
