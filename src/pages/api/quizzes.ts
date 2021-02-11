import { NextApiRequest, NextApiResponse } from "next";
import { verifyIdToken } from "../../server/firebaseAdminHelpers";
import { getIdTokenFromHeaders } from "../../server/getIdTokenFromHeaders";
import { getFromFirestoreRandomly } from "../../server/quizzes/getFromFirestoreRandomly";
import { postQuizToFirestore } from "../../server/quizzes/postQuizToFirestore";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { random },
    method,
    headers,
    body,
  } = req;

  switch (method) {
    case "GET": {
      const idToken = getIdTokenFromHeaders(headers);

      if (!idToken) {
        // エラー
        res.status(401).json({
          type: "Invalid Token",
        });
        break;
      }
      const decoded = await verifyIdToken(idToken);

      try {
        const result = await getFromFirestoreRandomly(decoded.uid);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({
          type: "Internal Server Error",
        });
      }
      break;
    }
    case "POST": {
      const idToken = getIdTokenFromHeaders(headers);

      if (!idToken) {
        // エラー
        res.status(401).json({
          type: "Invalid Token",
        });
        break;
      }
      const decoded = await verifyIdToken(idToken);

      const parsedBody = JSON.parse(body);
      if (!parsedBody.quiz) {
        //エラー
        res.status(400).json({
          type: "Bad Request",
        });
        break;
      }
      const quiz = parsedBody.quiz as Quiz;
      try {
        await postQuizToFirestore(decoded.uid, quiz);
        res.status(200).json({});
      } catch (e) {
        res.status(500).json({
          type: "Internal Server Error",
        });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
