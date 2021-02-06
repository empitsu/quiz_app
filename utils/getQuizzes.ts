import { getApp } from "./firebaseHelpers";
import firebase from "firebase/app";
import { shuffleArray } from "./shuffleArray";

async function getNearestDoc(
  docRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
  maxLength: number,
  direction: "<" | ">=",
  randomId: string
) {
  try {
    const res = await docRef
      .where(firebase.firestore.FieldPath.documentId(), direction, randomId)
      .limit(maxLength)
      .get();

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getQuizzes(): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
  const auth = getApp().auth();
  if (!auth || auth.currentUser === null) {
    throw new Error("ログインされていません");
  }
  const maxLength = 5;

  const db = getApp().firestore();
  const docRef = db
    .collection("quizzes")
    .doc(auth.currentUser.uid)
    .collection("quizzes");
  // 新しいDocumentのためにランダムに生成されるID
  const randomId = docRef.doc().id;

  try {
    const firstResponse = await getNearestDoc(
      docRef,
      maxLength,
      ">=",
      randomId
    );
    console.log("first access", firstResponse);

    if (firstResponse.size < maxLength) {
      // 方向を変えてリトライ
      try {
        const res = await getNearestDoc(docRef, maxLength, "<", randomId);
        console.log("second access", res);

        return shuffleArray([...res.docs, ...firstResponse.docs]).slice(0, 5);
      } catch (error) {
        throw new Error(error);
      }
    }
    return shuffleArray(firstResponse.docs);
  } catch (error) {
    throw new Error(error);
  }
}
