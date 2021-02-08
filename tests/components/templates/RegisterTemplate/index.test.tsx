import { render, fireEvent } from "@testing-library/react";
import RegisterTemplate from "../../../../src/components/templates/RegisterTemplate";
import { RegisterSelectionQuiz } from "../../../../src/projects/Register/RegisterSelectionQuiz";
import { RegisterSortQuiz } from "../../../../src/projects/Register/RegisterSortQuiz";

jest.mock("../../../../src/projects/Register/RegisterSelectionQuiz", () => {
  return {
    RegisterSelectionQuiz: jest.fn(() => <></>),
  };
});
jest.mock("../../../../src/projects/Register/RegisterSortQuiz", () => {
  return {
    RegisterSortQuiz: jest.fn(() => <></>),
  };
});

describe("register page", () => {
  describe("<RegisterSelectionQuiz />", () => {
    it("should be called when the page is loaded and selecting `four-choice question`", () => {
      const { getByText } = render(<RegisterTemplate />);
      fireEvent.click(getByText("並び替え問題"));

      fireEvent.click(getByText("4択問題"));
      expect(RegisterSelectionQuiz).toHaveBeenCalledTimes(2);
    });
  });
  describe("<RegisterSortQuiz />", () => {
    it("should be called when selecting `sortable question`", async () => {
      const { getByText } = render(<RegisterTemplate />);
      fireEvent.click(getByText("並び替え問題"));
      expect(RegisterSortQuiz).toHaveBeenCalledTimes(1);
    });
  });
});
