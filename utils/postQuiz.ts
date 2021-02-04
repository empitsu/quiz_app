import { getApp } from "./firebaseHelpers";

type Option = {
  optionId: number;
  text: string;
};
type PostData =
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
// todo: 永続化層は切り出す

export async function postQuiz(json: PostData) {
  // todo: call api for post and cookie for auth
  // https://developer.mozilla.org/ja/docs/Web/API/Document/cookie
  // document.cookie = "token=; path=/;samesite=strict;secure";
  // mutate("/api/quizzes");
  const auth = getApp().auth();
  if (!auth || auth.currentUser === null) {
    return new Error("ログインされていません");
  }

  const db = getApp().firestore();
  const docRef = db
    .collection("quizzes")
    .doc(auth.currentUser.uid)
    .collection("quizzes");
  try {
    const res = await docRef.doc().set(json);
    return res;
  } catch (error) {
    return new Error(error);
  }
}
