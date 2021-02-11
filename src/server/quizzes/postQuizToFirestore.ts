import { getAdmin } from "../../server/firebaseAdminHelpers";

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

export async function postQuizToFirestore(uid: string, quiz: Quiz) {
  const db = getAdmin().firestore();

  const docRef = db.collection("quizzes").doc(uid).collection("quizzes");
  try {
    await docRef.doc().set(quiz);
  } catch (error) {
    throw new Error(error);
  }
}
