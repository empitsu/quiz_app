import { ReducerState } from "react";
import {
  reducer,
  incrementCurrentQuiz,
} from "../../../src/ducks/AnswerTemplate";

describe("reducer()", () => {
  it("should increment currentQuizIndex and correctAnswersLength when 'incrementCurrentQuiz' is invoked with true", () => {
    const result = reducer(
      {
        currentQuizIndex: 0,
        correctAnswersLength: 0,
      },
      incrementCurrentQuiz(true)
    );
    const expectedData: ReducerState<typeof reducer> = {
      currentQuizIndex: 1,
      correctAnswersLength: 1,
    };
    expect(result).toEqual(expectedData);
  });

  it("should increment currentQuizIndex and not increment correctAnswersLength when 'incrementCurrentQuiz' is invoked with false", () => {
    const result = reducer(
      {
        currentQuizIndex: 0,
        correctAnswersLength: 0,
      },
      incrementCurrentQuiz(false)
    );
    const expectedData: ReducerState<typeof reducer> = {
      currentQuizIndex: 1,
      correctAnswersLength: 0,
    };
    expect(result).toEqual(expectedData);
  });
});
