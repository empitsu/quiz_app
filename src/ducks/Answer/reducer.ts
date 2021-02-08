import { INCREMENT_CURRENT_QUIZ } from "./types";
import { AnswerProps } from "./model";
import { Actions } from "./actions";

export const reducer = (state: AnswerProps, action: Actions): AnswerProps => {
  switch (action.type) {
    case INCREMENT_CURRENT_QUIZ: {
      console.log("INCREMENT_CURRENT_QUIZ", {
        currentQuizIndex: state.currentQuizIndex + 1,
        correctAnswersLength: action.payload
          ? state.correctAnswersLength + 1
          : state.correctAnswersLength,
      });
      return {
        currentQuizIndex: state.currentQuizIndex + 1,
        correctAnswersLength: action.payload
          ? state.correctAnswersLength + 1
          : state.correctAnswersLength,
      };
    }
  }
};
