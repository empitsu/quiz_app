import { INCREMENT_CURRENT_QUIZ } from "./types";

export const incrementCurrentQuiz = (isCorrect: boolean) =>
  ({
    type: INCREMENT_CURRENT_QUIZ,
    payload: isCorrect,
  } as const);

export type Actions = ReturnType<typeof incrementCurrentQuiz>;
