import { Dispatch, useCallback, useReducer, useState } from "react";
import { reducer } from "../../../../ducks/AnswerSortQuiz";
import {
  Actions,
  popFromSelectedOptions,
  pushToSelectedOptions,
} from "../../../../ducks/AnswerSortQuiz/actions";
import { SortableOptionsSet } from "../../../../ducks/AnswerSortQuiz/model";
import { Button } from "../../../uikit/Button";
import styled from "styled-components";
import { shuffleArray } from "../../../../utils/shuffleArray";
import { AnswerResult } from "../AnswerResult";
import { Heading } from "../../../uikit/Heading";

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

const StyledEmptyOptionButton = styled(Button)`
  color: transparent;
`;

function EachOptionButton({ option, dispatch }: EachOptionButtonProps) {
  const onClickAnswer = useCallback(() => {
    dispatch(pushToSelectedOptions(option));
  }, [dispatch, option]);

  if (option.selected) {
    return (
      <StyledEmptyOptionButton disabled>{option.text}</StyledEmptyOptionButton>
    );
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
  margin-right: 5px;
`;

const StyledSelectionQuizWrapDiv = styled.div`
  position: relative;
`;

export function AnswerSortQuiz({ title, options }: AnswerQuizProps) {
  const officialAnswer = [...options]
    .sort()
    .map((option) => option.text)
    .join(" ");
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

  // 正解かどうかチェックする
  const onClickAnswerBtn = useCallback(() => {
    const isCorrect =
      state.selectedOptions.length === 0
        ? false
        : state.selectedOptions.every((option, index) => {
            return option.optionId === index;
          });

    setIsCorrect(isCorrect);
  }, [state.selectedOptions]);
  return (
    <article>
      <Heading styleLevel="h3">ボタンを順番に選択してください</Heading>
      <StyledQuizTitleP>{title}</StyledQuizTitleP>
      <StyledSelectionQuizWrapDiv>
        {isCorrect === null ? (
          <div>
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
            <Button
              disabled={isCorrect !== null}
              isFullWidth
              color="secondary"
              onClick={onClickAnswerBtn}
            >
              これで回答する
            </Button>
          </div>
        ) : (
          <AnswerResult
            isCorrect={isCorrect}
            officialAnswer={officialAnswer}
          ></AnswerResult>
        )}
      </StyledSelectionQuizWrapDiv>
    </article>
  );
}
