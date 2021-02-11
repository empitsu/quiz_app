import { getApp } from "../../../utils/firebaseHelpers";

// TODO:共通化
type Option = {
  optionId: number;
  text: string;
};

type Quiz =
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

export type QuizArray = {
  id: string;
  data: Quiz;
}[];

export async function getQuizzes(): Promise<QuizArray> {
  const auth = getApp().auth();
  if (!auth || auth.currentUser === null) {
    throw new Error("ログインされていません");
  }

  const token = await auth.currentUser.getIdToken(true);
  try {
    const res = await fetch(`/api/quizzes`, {
      method: "GET",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("res", res);

    const responseJson = await res.json();

    console.log("responseJson", responseJson);
    if (res.ok) {
      return responseJson;
    } else {
      const errorType: string = ((responseJson as unknown) as { type: string })
        .type;

      throw new Error(errorType);
    }
  } catch (error) {
    throw new Error(error);
  }
}
