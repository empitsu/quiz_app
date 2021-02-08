import { useCollectionData } from "react-firebase-hooks/firestore";
import type firebase from "firebase";
import Link from "next/link";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { getQuizzes } from "../../../utils/getQuizzes";
import { AnswerSelectionQuiz } from "../../../projects/Answer/AnswerSelectionQuiz";
import { shuffleArray } from "../../../utils/shuffleArray";
import { AnswerSortQuiz } from "../../../projects/Answer/AnswerSortQuiz";
import { useRouter } from "next/router";
import { AnswerPropStore } from "../../../contexts/AnswerProps";

// TODO: quizzesLengthはcontextから取得するようにする。
function Result({ quizzesLength }: { quizzesLength: number }) {
  const { state } = useContext(AnswerPropStore);

  const router = useRouter();
  const onClickRetryBtn = useCallback(() => {
    router.reload();
  }, [router]);
  return (
    <div>
      <p>
        {quizzesLength}問中{state.correctAnswersLength}問正解しました。
      </p>
      <button onClick={onClickRetryBtn}>もう一度挑戦</button>
      <Link href="/mypage/">
        <button>TOPに戻る</button>
      </Link>
    </div>
  );
}

// TODO: quiz dataやidもcontextに保存する。テストが書きやすくなるため。
function AnswerSelectionOrSortQuiz({
  quizId,
  quiz,
}: {
  quizId: string;
  quiz: QuizData;
}) {
  if (quiz.type === "selection") {
    return (
      <AnswerSelectionQuiz
        key={quizId}
        title={quiz.title}
        options={quiz.options}
        correctOptionId={quiz.correctOptionId}
      ></AnswerSelectionQuiz>
    );
  }
  // sortable
  const defaultRestOptions = shuffleArray(quiz.options).map((option, index) => {
    return {
      ...option,
      originalIndex: index,
    };
  });

  return (
    <AnswerSortQuiz
      key={quizId}
      title={quiz.title}
      options={defaultRestOptions}
    ></AnswerSortQuiz>
  );
}

// todo:共通化
export type QuizData =
  | {
      type: "sort";
      title: string;
      options: {
        optionId: number;
        text: string;
      }[];
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
export default function AnswerTemplate() {
  const { state } = useContext(AnswerPropStore);
  const [error, setError] = useState<Error | null>(null);
  const [docs, setDocs] = useState<null | Docs>(null);
  const isMountedRef = useRef<null | boolean>(null);

  useEffect(() => {
    isMountedRef.current = true;
    (async () => {
      try {
        // TODO: useEffectごとカスタムフックス化。hooksの中でcontextに保存するとテストも書きやすくなる。
        const docs = await getQuizzes();
        setDocs(docs);
      } catch (error) {
        setError(error);
      }
    })();
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return (
    <div>
      <h1>Answer</h1>
      {error && (
        <p role="alert" aria-label="通信時エラー">
          {error.message}
        </p>
      )}
      {docs !== null && docs.length === 0 && (
        <p>まだ問題がありません。登録画面からクイズを登録してください。</p>
      )}
      {docs !== null && state.currentQuizIndex < docs.length && (
        <AnswerSelectionOrSortQuiz
          quizId={docs[state.currentQuizIndex].id}
          quiz={docs[state.currentQuizIndex].data() as QuizData}
        />
      )}
      {docs !== null && state.currentQuizIndex >= docs.length && (
        <Result quizzesLength={docs.length}></Result>
      )}
    </div>
  );
}
