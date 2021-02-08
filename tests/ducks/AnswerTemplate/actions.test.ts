import { incrementCurrentQuiz } from "../../../src/ducks/AnswerTemplate";

describe("Actions of AnswerTemplate", () => {
  describe("incrementCurrentQuiz()", () => {
    it("should create an action to increment the current quiz index", () => {
      expect(incrementCurrentQuiz(true)).toMatchSnapshot();
    });
  });
});
