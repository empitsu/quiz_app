import { render, fireEvent } from "@testing-library/react";
import RegisterSelectionQuiz, {
  SelectionQuiz,
} from "../../../../src/projects/Register/RegisterSelectionQuiz";
import { delayEventLoop } from "../../../delayEventLoop";
import { postQuiz } from "../../../../src/utils/postQuiz";

jest.spyOn(window, "alert").mockImplementation(jest.fn());

jest.mock("../../../../src/utils/postQuiz", () => {
  return {
    postQuiz: jest.fn().mockImplementation(() => {
      return Promise.resolve;
    }),
  };
});

function submitWithValidValues({
  titleElement,
  correctAnswerRadioElement,
  optionElements,
  submitElement,
}: {
  titleElement: HTMLElement;
  correctAnswerRadioElement: HTMLElement;
  optionElements: HTMLElement[];
  submitElement: HTMLElement;
}) {
  fireEvent.input(titleElement, { target: { value: "test" } });
  // TODO: SelectionQuizOptionのテストを書いたらSelectionQuizOptionをmock化する。
  optionElements.forEach((inputElement) => {
    fireEvent.input(inputElement, { target: { value: "test" } });
  });
  fireEvent.click(correctAnswerRadioElement, { target: { value: 1 } });

  fireEvent.submit(submitElement);
}

describe("RegisterSelectionQuiz", () => {
  describe("An error message for title of the quiz", () => {
    it("should be displayed when the value is empty", async () => {
      const { getByLabelText, queryByRole, getByText } = render(
        <RegisterSelectionQuiz />
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
  describe("An error message to select the correct answer", () => {
    it("should be displayed when the radio is not selected", async () => {
      const { queryByRole, getByText } = render(<RegisterSelectionQuiz />);
      const submitBtn = getByText("クイズを登録する");
      fireEvent.submit(submitBtn);
      await delayEventLoop();

      expect(
        queryByRole("alert", { name: "正答選択のエラー" })
      ).toBeInTheDocument();
    });
  });
  // SelectionQuizOption
  describe("An error message for an option", () => {
    it("should be displayed when the value is empty", async () => {
      const { getByLabelText, queryByRole, getByText } = render(
        <RegisterSelectionQuiz />
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
  describe("postQuiz", () => {
    it("should be called with quiz when all values are valid and then submit button is clicked", async () => {
      const { getByLabelText, getByText } = render(<RegisterSelectionQuiz />);
      const optionInputElements = [...Array(4)].map((_, index) => {
        return getByLabelText(`選択肢${index + 1}`);
      });

      submitWithValidValues({
        titleElement: getByLabelText("問題文"),
        optionElements: optionInputElements,
        correctAnswerRadioElement: getByLabelText("正答"),
        submitElement: getByText("クイズを登録する"),
      });

      await delayEventLoop();
      const expectedData: SelectionQuiz = {
        type: "selection",
        title: "test",
        correctOptionId: 1,
        options: [
          { optionId: 1, text: "test" },
          { optionId: 2, text: "test" },
          { optionId: 3, text: "test" },
          { optionId: 4, text: "test" },
        ],
      };

      expect(postQuiz).toHaveBeenCalledWith(expectedData);
      expect.assertions(1);
    });
  });
  describe("window.alert", () => {
    it("should be displayed when completing posting a quiz", async () => {
      const { getByLabelText, getByText } = render(<RegisterSelectionQuiz />);
      const optionInputElements = [...Array(4)].map((_, index) => {
        return getByLabelText(`選択肢${index + 1}`);
      });

      submitWithValidValues({
        titleElement: getByLabelText("問題文"),
        optionElements: optionInputElements,
        correctAnswerRadioElement: getByLabelText("正答"),
        submitElement: getByText("クイズを登録する"),
      });
      await delayEventLoop();

      expect(window.alert).toHaveBeenCalledWith("クイズを登録しました。");
    });
  });
});
