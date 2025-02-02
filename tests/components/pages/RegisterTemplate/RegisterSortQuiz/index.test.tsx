import { render, fireEvent } from "@testing-library/react";
import { delayEventLoop } from "../../../../delayEventLoop";
import { postQuiz } from "../../../../../src/components/pages/RegisterTemplate/postQuiz";
import { StyleThemeProvider } from "../../../../../src/contexts/StyleThemeProvider";
import {
  RegisterSortQuiz,
  SortableQuiz,
} from "../../../../../src/components/pages/RegisterTemplate/RegisterSortQuiz";

jest.spyOn(window, "alert").mockImplementation(jest.fn());

jest.mock(
  "../../../../../src/components/pages/RegisterTemplate/postQuiz",
  () => {
    return {
      postQuiz: jest.fn().mockImplementation(() => {
        return Promise.resolve();
      }),
    };
  }
);

function submitWithValidValues({
  titleElement,
  optionElements,
  submitElement,
}: {
  titleElement: HTMLElement;
  optionElements: HTMLElement[];
  submitElement: HTMLElement;
}) {
  fireEvent.input(titleElement, { target: { value: "test" } });
  // TODO: SortQuizOptionのテストを書いたらSortQuizOptionをmock化する。
  optionElements.forEach((inputElement) => {
    fireEvent.input(inputElement, { target: { value: "test" } });
  });

  fireEvent.submit(submitElement);
}

function TestComponent() {
  return (
    <StyleThemeProvider>
      <RegisterSortQuiz />
    </StyleThemeProvider>
  );
}

describe("<RegisterSortQuiz />", () => {
  describe("An error message for title of the quiz", () => {
    it("should be displayed when the value is empty", async () => {
      const { getByLabelText, queryByRole, getByText } = render(
        <TestComponent />
      );
      const titleInputElement = getByLabelText("問題文");
      fireEvent.input(titleInputElement, { target: { value: "" } });
      const submitBtn = getByText("クイズを登録する");
      fireEvent.submit(submitBtn);
      await delayEventLoop();

      expect(
        queryByRole("alert", { name: "問題文エラー" })
      ).toBeInTheDocument();
    });
  });
  // SortQuizOption
  describe("An error message for an option", () => {
    it("should be displayed when the value is empty", async () => {
      const { getByLabelText, queryByRole, getByText } = render(
        <TestComponent />
      );
      const optionInputElement = getByLabelText("選択肢1");
      fireEvent.input(optionInputElement, { target: { value: "" } });
      const submitBtn = getByText("クイズを登録する");
      fireEvent.submit(submitBtn);
      await delayEventLoop();
      expect(
        queryByRole("alert", { name: "選択肢1のエラー" })
      ).toBeInTheDocument();
    });
  });
  // SortQuizOption
  describe("`Add` button", () => {
    it("should show an additional field", async () => {
      const { getByLabelText, getByText } = render(<TestComponent />);
      fireEvent.click(getByText("追加する"));
      await delayEventLoop();
      expect(getByLabelText("選択肢2")).toBeInTheDocument();
    });
  });

  // SortQuizOption
  describe("Remove button", () => {
    it("should remove the corresponding option when it is clicked", async () => {
      const { queryByLabelText, getByText, findAllByText } = render(
        <TestComponent />
      );
      fireEvent.click(getByText("追加する"));
      await delayEventLoop();
      expect(queryByLabelText("選択肢2")).toBeInTheDocument();

      const removeBtns = await findAllByText("削除");
      fireEvent.click(removeBtns[1]);
      await delayEventLoop();

      expect(queryByLabelText("選択肢2")).not.toBeInTheDocument();
    });
    it("should not be displayed when the number of options is only one", () => {
      const { queryByText } = render(<TestComponent />);
      const removeBtn = queryByText("削除");
      expect(removeBtn).not.toBeInTheDocument();
    });
  });

  describe("postQuiz", () => {
    it("should be called with quiz when all values are valid and then submit button is clicked", async () => {
      const { getByLabelText, getByText } = render(<TestComponent />);
      const optionInputElements = [...Array(1)].map((_, index) => {
        return getByLabelText(`選択肢${index + 1}`);
      });

      submitWithValidValues({
        titleElement: getByLabelText("問題文"),
        optionElements: optionInputElements,
        submitElement: getByText("クイズを登録する"),
      });

      await delayEventLoop();
      const expectedData: SortableQuiz = {
        type: "sort",
        title: "test",
        options: [{ optionId: 1, text: "test" }],
      };

      expect(postQuiz).toHaveBeenCalledWith(expectedData);
      expect.assertions(1);
    });
  });

  describe("window.alert", () => {
    it("should be displayed when completing posting a quiz", async () => {
      const { getByLabelText, getByText } = render(<TestComponent />);
      const optionInputElements = [...Array(1)].map((_, index) => {
        return getByLabelText(`選択肢${index + 1}`);
      });

      submitWithValidValues({
        titleElement: getByLabelText("問題文"),
        optionElements: optionInputElements,
        submitElement: getByText("クイズを登録する"),
      });
      await delayEventLoop();

      expect(window.alert).toHaveBeenCalledWith("クイズを登録しました。");
    });
  });
});
