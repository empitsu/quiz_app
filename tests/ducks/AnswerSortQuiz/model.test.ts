import { sortableOptionsSet } from "../../../src/ducks/AnswerSortQuiz";

describe("sortableOptionsSet", () => {
  it("should create a empty model", () => {
    expect(sortableOptionsSet).toMatchSnapshot();
  });
});
