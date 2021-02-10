import { render, fireEvent } from "@testing-library/react";
import RegisterTemplate from "../../../../src/components/pages/RegisterTemplate";
import { StyleThemeProvider } from "../../../../src/contexts/StyleThemeProvider";
import { RegisterSelectionQuiz } from "../../../../src/components/pages/RegisterTemplate/RegisterSelectionQuiz";
import { RegisterSortQuiz } from "../../../../src/components/pages/RegisterTemplate/RegisterSortQuiz";

jest.mock(
  "../../../../src/components/pages/RegisterTemplate/RegisterSelectionQuiz",
  () => {
    return {
      RegisterSelectionQuiz: jest.fn(() => <></>),
    };
  }
);
jest.mock(
  "../../../../src/components/pages/RegisterTemplate/RegisterSortQuiz",
  () => {
    return {
      RegisterSortQuiz: jest.fn(() => <></>),
    };
  }
);

describe("<RegisterTemplate />", () => {
  describe("<RegisterSelectionQuiz />", () => {
    it("should be called when the page is loaded and selecting `four-choice question`", () => {
      const { getByText } = render(
        <StyleThemeProvider>
          <RegisterTemplate />
        </StyleThemeProvider>
      );
      fireEvent.click(getByText("並び替え問題"));

      fireEvent.click(getByText("4択問題"));
      expect(RegisterSelectionQuiz).toHaveBeenCalledTimes(2);
    });
  });
  describe("<RegisterSortQuiz />", () => {
    it("should be called when selecting `sortable question`", async () => {
      const { getByText } = render(
        <StyleThemeProvider>
          <RegisterTemplate />
        </StyleThemeProvider>
      );
      fireEvent.click(getByText("並び替え問題"));
      expect(RegisterSortQuiz).toHaveBeenCalledTimes(1);
    });
  });
});
