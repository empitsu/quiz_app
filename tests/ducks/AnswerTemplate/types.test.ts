import { INCREMENT_CURRENT_QUIZ } from "../../../src/ducks/AnswerTemplate/types";

describe("types of AnswerSortQuiz", () => {
  describe("INCREMENT_CURRENT_QUIZ", () => {
    it("should be a action type of incrementCurrentQuiz", () => {
      expect(INCREMENT_CURRENT_QUIZ).toMatchSnapshot();
    });
  });
});
