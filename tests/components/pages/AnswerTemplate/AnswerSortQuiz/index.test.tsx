import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { mocked } from "ts-jest/utils";
import { AnswerSortQuiz } from "../../../../../src/components/pages/AnswerTemplate/AnswerSortQuiz";
import { StyleThemeProvider } from "../../../../../src/contexts/StyleThemeProvider";
import { SortableOptionsSet } from "../../../../../src/ducks/AnswerSortQuiz/model";
import * as selectors from "../../../../../src/ducks/AnswerSortQuiz/selectors";
import * as actions from "../../../../../src/ducks/AnswerSortQuiz/actions";
import { delayEventLoop } from "../../../../delayEventLoop";

const isAnswerCorrect = jest.spyOn(selectors, "isAnswerCorrect");
const pushToSelectedOptions = jest.spyOn(actions, "pushToSelectedOptions");
const popFromSelectedOptions = jest.spyOn(actions, "popFromSelectedOptions");

afterEach(() => {
  jest.clearAllMocks();
});

// これだとexpect(mockedUseReducer).toHaveBeenCalled()が0になってしまう
// const mockedUseReducer = jest.spyOn(React, "useReducer");

// これだとexpect(mockedUseReducer).toHaveBeenCalled()が0になってしまう
// const mockedUseReducer = jest.fn()
// React.useReducer = mockedUseReducer;

jest.mock("react", () => {
  const original = jest.requireActual("react");
  return {
    ...original,
    useReducer: jest.fn(),
  };
});

// jest.mockの中でmockImplementationを実装してもexpectでアクセスできないため、
// jest.mockの外でmockImplementationを実行する。
const mockedUseReducer = mocked(React.useReducer).mockImplementation(
  (reducer, initialValue) => {
    return [initialValue, jest.fn()];
  }
);

describe("<AnswerSortQuiz />", () => {
  const testOption = { optionId: 1, text: "選択肢1" };
  const initializedOption = {
    optionId: 1,
    text: "選択肢1",
    originalIndex: 0,
    selected: false,
  };

  it("useReducer should be initialized with expected data", async () => {
    render(
      <StyleThemeProvider>
        <AnswerSortQuiz title="タイトル" options={[testOption]} />
      </StyleThemeProvider>
    );

    const expectedState: SortableOptionsSet = {
      selectedOptions: [],
      restOptions: [initializedOption],
    };

    expect(mockedUseReducer.mock.calls[0][1]).toEqual(expectedState);
  });

  it("isAnswer should be called with the current state when the answer button is clicked", () => {
    const { getByText } = render(
      <StyleThemeProvider>
        <AnswerSortQuiz title="タイトル" options={[testOption]} />
      </StyleThemeProvider>
    );

    const expectedState: SortableOptionsSet = {
      selectedOptions: [],
      restOptions: [{ ...testOption, originalIndex: 0, selected: false }],
    };

    fireEvent.click(getByText("これで回答する"));
    expect(isAnswerCorrect).toHaveBeenCalledWith(expectedState);
  });

  it("pushToSelectedOptions should be called with the selected option when the option button is clicked", () => {
    const { getByLabelText } = render(
      <StyleThemeProvider>
        <AnswerSortQuiz title="タイトル" options={[testOption]} />
      </StyleThemeProvider>
    );

    fireEvent.click(getByLabelText("選択肢1を選択する"));
    expect(pushToSelectedOptions).toHaveBeenCalledWith(initializedOption);
  });

  it.skip("popFromSelectedOptions should be called with the selected option when the selected option button is clicked", async () => {
    const { getByLabelText } = render(
      <StyleThemeProvider>
        <AnswerSortQuiz title="タイトル" options={[testOption]} />
      </StyleThemeProvider>
    );

    fireEvent.click(getByLabelText("選択肢1を選択する"));

    await delayEventLoop();
    await waitFor(() => {
      // FIXME: Error: Unable to find a label with the text of: 選択肢1を戻す
      fireEvent.click(getByLabelText("選択肢1を戻す"));
      expect(popFromSelectedOptions).toHaveBeenCalledWith(initializedOption);
    });
  });
});
