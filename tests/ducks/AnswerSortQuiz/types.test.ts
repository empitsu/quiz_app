import {
  POP_FROM_SELECTED_OPTIONS,
  PUSH_T0_SELECTED_OPTIONS,
  RESET,
} from "../../../src/ducks/AnswerSortQuiz/types";

describe("types of AnswerSortQuiz", () => {
  describe("POP_FROM_SELECTED_OPTIONS", () => {
    it("should be a action type of popFromSelectedOptions", () => {
      expect(POP_FROM_SELECTED_OPTIONS).toMatchSnapshot();
    });
  });
  describe("PUSH_T0_SELECTED_OPTIONS", () => {
    it("should be a action type of pushToSelectedOptions", () => {
      expect(PUSH_T0_SELECTED_OPTIONS).toMatchSnapshot();
    });
  });
  describe("RESET", () => {
    it("should be a action type of reset", () => {
      expect(RESET).toMatchSnapshot();
    });
  });
});
