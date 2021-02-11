import {
  popFromSelectedOptions,
  pushToSelectedOptions,
  reset,
} from "../../../src/ducks/AnswerSortQuiz";

const testOption = {
  optionId: 1,
  text: "test",
  originalIndex: 1,
  selected: false,
};
describe("Actions of AnswerSortQuiz", () => {
  describe("popFromSelectedOptions()", () => {
    it("should create an action to remove from selected options", () => {
      expect(popFromSelectedOptions(testOption)).toMatchSnapshot();
    });
  });
  describe("pushToSelectedOptions()", () => {
    it("should create an action to push to selected options", () => {
      expect(pushToSelectedOptions(testOption)).toMatchSnapshot();
    });
  });
  describe("reset()", () => {
    it("should create an action to reset", () => {
      expect(reset([testOption])).toMatchSnapshot();
    });
  });
});
