import {
  filePathForDocumentId,
  getAdmin,
} from "../../server/firebaseAdminHelpers";
import { shuffleArray } from "../../utils/shuffleArray";

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

type QuizArray = {
  id: string;
  data: Quiz;
}[];

function convertQueryDocumentSnapshotsToArray(
  data: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]
): QuizArray {
  return data.map((snapshot) => {
    return {
      id: snapshot.id,
      data: snapshot.data() as Quiz,
    };
  });
}

async function getNearestDoc(
  docRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  maxLength: number,
  direction: "<" | ">=",
  randomId: string
) {
  try {
    const res = await docRef
      .where(filePathForDocumentId, direction, randomId)
      .limit(maxLength)
      .get();

    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFromFirestoreRandomly(uid: string) {
  const maxLength = 5;

  const db = getAdmin().firestore();
  const docRef = db.collection("quizzes").doc(uid).collection("quizzes");
  // 新しいDocumentのためにランダムに生成されるID
  const randomId = docRef.doc().id;

  try {
    const firstResponse = await getNearestDoc(
      docRef,
      maxLength,
      ">=",
      randomId
    );
    // console.log("first access", firstResponse);

    if (firstResponse.size < maxLength) {
      // 方向を変えてリトライ
      try {
        const res = await getNearestDoc(docRef, maxLength, "<", randomId);
        // console.log("second access", res);
        const queryDocumentSnapshots = shuffleArray([
          ...res.docs,
          ...firstResponse.docs,
        ]).slice(0, 5);
        return convertQueryDocumentSnapshotsToArray(queryDocumentSnapshots);
      } catch (error) {
        throw new Error(error);
      }
    }
    return convertQueryDocumentSnapshotsToArray(
      shuffleArray(firstResponse.docs)
    );
  } catch (error) {
    throw new Error(error);
  }
}
