import { mocked } from "ts-jest/utils";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ComponentPropsWithoutRef } from "react";

import { AnswerSelectionQuiz } from "../../../../src/projects/Answer/AnswerSelectionQuiz";
import { AnswerSortQuiz } from "../../../../src/projects/Answer/AnswerSortQuiz";
import { getQuizzes } from "../../../../src/utils/getQuizzes";
import { delayEventLoop } from "../../../delayEventLoop";
import AnswerTemplate, {
  QuizData,
} from "../../../../src/components/templates/AnswerTemplate";
import { AnswerPropsProvider } from "../../../../src/contexts/AnswerProps";
import { AnswerProps } from "../../../../src/ducks/Answer/model";
import { NextRouter } from "next/router";
import { RouterMock } from "../../../RouterMock";

jest.mock("../../../../src/layouts/LayoutForMypage", () => {
  return {
    LayoutForMypage: jest.fn(({ children }) => <div>{children}</div>),
  };
});

jest.mock("../../../../src/projects/Answer/AnswerSortQuiz", () => {
  return {
    AnswerSortQuiz: jest.fn(() => <></>),
  };
});

jest.mock("../../../../src/projects/Answer/AnswerSelectionQuiz", () => {
  return {
    AnswerSelectionQuiz: jest.fn(() => <></>),
  };
});

jest.mock("../../../../src/utils/getQuizzes");

// https://www.debuggr.io/react-update-unmounted-component/#:~:text=Warning%3A%20Can't%20perform%20a,in%20a%20useEffect%20cleanup%20function.

beforeEach(() => {
  jest.resetModules();
});

type AnswerSortQuizProps = ComponentPropsWithoutRef<typeof AnswerSortQuiz>;
function TestComponent(answerProps: AnswerProps) {
  return (
    <AnswerPropsProvider initialState={answerProps}>
      <AnswerTemplate />
    </AnswerPropsProvider>
  );
}

type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U
  : never;

type Documents = PromiseType<ReturnType<typeof getQuizzes>>;

type AnswerSelectionQuizProps = ComponentPropsWithoutRef<
  typeof AnswerSelectionQuiz
>;

function mockGetQuizzes(responseDocs: Documents) {
  mocked(getQuizzes).mockImplementation(() => {
    return Promise.resolve(responseDocs);
  });
}
describe("<AnswerTemplate />", () => {
  const sortQuiz: QuizData = {
    type: "sort",
    title: "quiz1",
    options: [
      {
        optionId: 1,
        text: "option1",
      },
    ],
  };
  it("<AnswerSortQuiz /> should be called when the type of the first quiz is sort", async () => {
    mockGetQuizzes(([
      {
        id: "id1",
        data: () => {
          return sortQuiz;
        },
      },
    ] as unknown) as Documents);
    render(<TestComponent correctAnswersLength={0} currentQuizIndex={0} />);
    await delayEventLoop();
    expect(AnswerSortQuiz).toHaveBeenCalledTimes(1);
    const options: AnswerSortQuizProps["options"] = [
      {
        optionId: 1,
        text: "option1",
        originalIndex: 0,
      },
    ];
    expect(mocked(AnswerSortQuiz).mock.calls[0][0].options).toEqual(options);
  });

  it("<AnswerSelectionQuiz /> should be called when the type of the first quiz is selection", async () => {
    const options: AnswerSelectionQuizProps["options"] = [
      {
        optionId: 1,
        text: "option1",
      },
    ];
    const selectionQuiz: QuizData = {
      type: "selection",
      title: "quiz1",
      correctOptionId: 1,
      options: options,
    };
    mockGetQuizzes(([
      {
        id: "id1",
        data: () => {
          return selectionQuiz;
        },
      },
    ] as unknown) as Documents);
    render(<TestComponent correctAnswersLength={0} currentQuizIndex={0} />);
    await delayEventLoop();

    expect(AnswerSelectionQuiz).toHaveBeenCalledTimes(1);

    expect(mocked(AnswerSelectionQuiz).mock.calls[0][0].options).toEqual(
      options
    );
  });

  it("An message indicating that no quiz exists should be displayed", async () => {
    mockGetQuizzes([]);
    const { getByText } = render(
      <TestComponent correctAnswersLength={0} currentQuizIndex={0} />
    );
    await waitFor(() => {
      expect(
        getByText(
          "まだ問題がありません。登録画面からクイズを登録してください。"
        )
      ).toBeInTheDocument();
    });
  });

  it("The result should be displayed when all quizzes are answered", async () => {
    mockGetQuizzes(([
      {
        id: "id1",
        data: () => {
          return sortQuiz;
        },
      },
    ] as unknown) as Documents);

    const { getByText } = render(
      <TestComponent correctAnswersLength={1} currentQuizIndex={1} />
    );
    await waitFor(async () => {
      const resultText = getByText("1問中1問正解しました。");
      expect(resultText).toBeInTheDocument();
    });
  });
  it("router.reload() should be called when retry button is clicked", async () => {
    mockGetQuizzes(([
      {
        id: "id1",
        data: () => {
          return sortQuiz;
        },
      },
    ] as unknown) as Documents);
    const mockedReload = jest.fn();

    const { getByText } = render(
      <RouterMock
        router={
          ({
            reload: mockedReload,
          } as unknown) as NextRouter
        }
      >
        <TestComponent correctAnswersLength={1} currentQuizIndex={1} />
      </RouterMock>
    );
    await waitFor(() => {
      fireEvent.click(getByText("もう一度挑戦"));
      expect(mockedReload).toHaveBeenCalledTimes(1);
    });
  });
  it("An error message should be displayed when an error occurs", async () => {
    mocked(getQuizzes).mockImplementation(() => {
      return Promise.reject(new Error("エラーです"));
    });
    const { getByRole } = render(
      <TestComponent correctAnswersLength={0} currentQuizIndex={0} />
    );
    await waitFor(async () => {
      const errorText = getByRole("alert", { name: "通信時エラー" });
      expect(errorText).toBeInTheDocument();
    });
  });
});
