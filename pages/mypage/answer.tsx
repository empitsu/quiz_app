import { useCollectionData } from "react-firebase-hooks/firestore";
import type firebase from "firebase";

import Head from "next/head";
import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { getQuizzes } from "../../utils/getQuizzes";
import { AnswerSelectionQuiz } from "../../components/organisms/AnswerSelectionQuiz";

// todo:共通化
type Option = {
  optionId: number;
  text: string;
};
type Data =
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

//
type Docs = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[];
export default function Answer() {
  const [error, setError] = useState<Error | null>(null);
  const [docs, setDocs] = useState<null | Docs>(null);
  useEffect(() => {
    (async () => {
      try {
        const docs = await getQuizzes();
        setDocs(docs);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);
  return (
    <Layout>
      <Head>
        <title>Answer</title>
      </Head>
      <h1>Answer</h1>
      {error && <p>{error.message}</p>}
      {docs &&
        docs.map((doc) => {
          const quiz = doc.data() as Data;
          if (quiz.type === "selection") {
            return (
              <AnswerSelectionQuiz
                key={doc.id}
                title={quiz.title}
                options={quiz.options}
                correctOptionId={quiz.correctOptionId}
              ></AnswerSelectionQuiz>
            );
          }
          return (
            <div key={doc.id}>
              {quiz.title}
              {JSON.stringify(quiz.options)}
            </div>
          );
        })}
    </Layout>
  );
}
