import { answerProps } from "../../../src/ducks/AnswerTemplate";

describe("answerProps", () => {
  it("should create a empty model", () => {
    expect(answerProps).toMatchSnapshot();
  });
});
