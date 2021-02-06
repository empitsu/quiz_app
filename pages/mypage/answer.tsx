import { useCollectionData } from "react-firebase-hooks/firestore";
import type firebase from "firebase";
import Link from "next/link";

import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { getQuizzes } from "../../utils/getQuizzes";
import { AnswerSelectionQuiz } from "../../components/organisms/Answer/AnswerSelectionQuiz";
import { shuffleArray } from "../../utils/shuffleArray";
import { AnswerSortQuiz } from "../../components/organisms/Answer/AnswerSortQuiz";
import { useRouter } from "next/router";

function Result({
  correctAnswersLength,
  quizzesLength,
}: {
  correctAnswersLength: number;
  quizzesLength: number;
}) {
  const router = useRouter();
  const onClickRetryBtn = useCallback(() => {
    router.reload();
  }, [router]);
  return (
    <div>
      <p>
        {quizzesLength}問中{correctAnswersLength}問正解しました。
      </p>
      <button onClick={onClickRetryBtn}>もう一度挑戦</button>
      <Link href="/mypage/top">
        <button>TOPに戻る</button>
      </Link>
    </div>
  );
}

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
      options: {
        optionId: number;
        text: string;
      }[];
    };

//
type Docs = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[];
export default function Answer() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [correctAnswersLength, setCorrectAnswersLength] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const [docs, setDocs] = useState<null | Docs>(null);

  const onAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersLength((preLength) => preLength + 1);
    }

    setCurrentQuizIndex((preIndex) => preIndex + 1);
  }, []);

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
      {docs !== null && docs.length === 0 && (
        <p>まだ問題がありません。登録画面からクイズを登録してください。</p>
      )}
      {docs !== null &&
        currentQuizIndex < docs.length &&
        ((doc) => {
          const quiz = doc.data() as Data;
          if (quiz.type === "selection") {
            return (
              <AnswerSelectionQuiz
                key={doc.id}
                title={quiz.title}
                options={quiz.options}
                correctOptionId={quiz.correctOptionId}
                onAnswer={onAnswer}
              ></AnswerSelectionQuiz>
            );
          }
          // sortable
          const defaultRestOptions = shuffleArray(quiz.options).map(
            (option, index) => {
              return {
                ...option,
                originalIndex: index,
              };
            }
          );

          return (
            <AnswerSortQuiz
              key={doc.id}
              title={quiz.title}
              onAnswer={onAnswer}
              options={defaultRestOptions}
            ></AnswerSortQuiz>
          );
        })(docs[currentQuizIndex])}
      {docs !== null && currentQuizIndex >= docs.length && (
        <Result
          correctAnswersLength={correctAnswersLength}
          quizzesLength={docs.length}
        ></Result>
      )}
    </Layout>
  );
}
