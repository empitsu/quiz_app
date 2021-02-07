import { getApp } from "./firebaseHelpers";

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

// TODO:永続化層へアクセスする処理はapiで行う
export async function postQuiz(json: QuizToPost) {
  // todo: call api for post and cookie for auth
  // https://developer.mozilla.org/ja/docs/Web/API/Document/cookie
  // document.cookie = "token=; path=/;samesite=strict;secure";
  // mutate("/api/quizzes");
  const auth = getApp().auth();
  if (!auth || auth.currentUser === null) {
    throw new Error("ログインされていません");
  }

  const db = getApp().firestore();
  const docRef = db
    .collection("quizzes")
    .doc(auth.currentUser.uid)
    .collection("quizzes");
  try {
    await docRef.doc().set(json);
  } catch (error) {
    throw new Error(error);
  }
}
