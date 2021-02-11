import { getApp } from "../../../utils/firebaseHelpers";

// TODO:共通化？
type Option = {
  optionId: number;
  text: string;
};

export type QuizToPost =
  | {
      type: "sort";
      title: string;
      options: Option[];
    }
  | {
      type: "selection";
      title: string;
      correctOptionId: number;
      options: Option[];
    };

export async function postQuiz(json: QuizToPost) {
  const auth = getApp().auth();
  if (!auth || auth.currentUser === null) {
    throw new Error("ログインされていません");
  }

  const token = await auth.currentUser.getIdToken(true);
  try {
    const res = await fetch(`/api/quizzes`, {
      method: "POST",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ quiz: json }),
    });
    if (!res.ok) {
      const errorType: string = ((res.json() as unknown) as { type: string })
        .type;

      throw new Error(errorType);
    }
  } catch (error) {
    throw new Error(error);
  }
}
