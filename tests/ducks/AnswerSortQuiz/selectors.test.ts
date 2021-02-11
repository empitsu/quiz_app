import { isAnswerCorrect } from "../../../src/ducks/AnswerSortQuiz";

const testOption1 = {
  optionId: 1,
  text: "test",
  originalIndex: 1,
  selected: true,
};
const testOption2 = {
  optionId: 2,
  text: "test",
  originalIndex: 0,
  selected: true,
};
describe("selectors", () => {
  describe("isAnswerCorrect", () => {
    it("should return true when the order of selectedOptions matches its optionId", () => {
      const isCorrect = isAnswerCorrect({
        restOptions: [testOption2, testOption1],
        selectedOptions: [testOption1, testOption2],
      });
      expect(isCorrect).toBeTruthy();
    });

    it("should return false when the order of selectedOptions doesn't matche its optionId", () => {
      const isCorrect = isAnswerCorrect({
        restOptions: [testOption2, testOption1],
        selectedOptions: [testOption2, testOption1],
      });
      expect(isCorrect).toBeFalsy();
    });

    it("should return false when the selectedOptions is empty", () => {
      const isCorrect = isAnswerCorrect({
        restOptions: [testOption1],
        selectedOptions: [],
      });
      expect(isCorrect).toBeFalsy();
    });
  });
});
