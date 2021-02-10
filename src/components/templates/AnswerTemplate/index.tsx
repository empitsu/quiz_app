import type firebase from "firebase";
import Link from "next/link";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { getQuizzes } from "../../../utils/getQuizzes";
import { AnswerSelectionQuiz } from "../../../projects/Answer/AnswerSelectionQuiz";
import { AnswerSortQuiz } from "../../../projects/Answer/AnswerSortQuiz";
import { useRouter } from "next/router";
import { AnswerPropStore } from "../../../contexts/AnswerProps";
import { Column1 } from "../../atoms/Column1";
import { Heading } from "../../atoms/Heading";
import { FormErrorText } from "../../atoms/FormErrorText";
import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { FormItemWrap } from "../../atoms/FormItemWrap";
import { LinkText } from "../../atoms/LinkText";

const StyledNoQuizP = styled.p`
  text-align: center;
`;

const StyledResultP = styled.p`
  text-align: center;
  margin: 60px 0;
  font-size: 1.5rem;
`;

// TODO: quizzesLengthはcontextから取得するようにする。
function OverallGrade({ quizzesLength }: { quizzesLength: number }) {
  const { state } = useContext(AnswerPropStore);

  const router = useRouter();
  const onClickRetryBtn = useCallback(() => {
    router.reload();
  }, [router]);
  return (
    <Column1 size="small">
      <StyledResultP>
        {quizzesLength}問中{state.correctAnswersLength}問正解しました。
      </StyledResultP>
      <FormItemWrap>
        <Button isFullWidth color="secondary" onClick={onClickRetryBtn}>
          もう一度挑戦
        </Button>
      </FormItemWrap>
      <FormItemWrap>
        <Link href="/mypage/">
          <Button isFullWidth color="info">
            TOPに戻る
          </Button>
        </Link>
      </FormItemWrap>
    </Column1>
  );
}

const StyledCancelP = styled.p`
  text-align: center;
  margin: 20px 0;
`;

// TODO: quiz dataやidもcontextに保存する。テストが書きやすくなるため。
function AnswerSelectionOrSortQuiz({
  quizId,
  quiz,
}: {
  quizId: string;
  quiz: QuizData;
}) {
  const router = useRouter();
  const onClickCancelBtn = useCallback(() => {
    router.reload();
  }, [router]);
  if (quiz.type === "selection") {
    return (
      <>
        <AnswerSelectionQuiz
          key={quizId}
          title={quiz.title}
          options={quiz.options}
          correctOptionId={quiz.correctOptionId}
        ></AnswerSelectionQuiz>
        <StyledCancelP>
          <LinkText onClick={onClickCancelBtn}>キャンセルしてやり直す</LinkText>
        </StyledCancelP>
      </>
    );
  }

  return (
    <>
      <AnswerSortQuiz
        key={quizId}
        title={quiz.title}
        options={quiz.options}
      ></AnswerSortQuiz>
      <StyledCancelP>
        <LinkText onClick={onClickCancelBtn}>キャンセルしてやり直す</LinkText>
      </StyledCancelP>
    </>
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
    <Column1 size="small">
      <Heading styleLevel="h2">クイズに挑戦</Heading>
      {error && (
        <FormErrorText role="alert" aria-label="通信時エラー">
          {error.message}
        </FormErrorText>
      )}
      {docs !== null && docs.length === 0 && (
        <StyledNoQuizP>
          まだ問題がありません。登録画面からクイズを登録してください。
        </StyledNoQuizP>
      )}
      {docs !== null && state.currentQuizIndex < docs.length && (
        <AnswerSelectionOrSortQuiz
          quizId={docs[state.currentQuizIndex].id}
          quiz={docs[state.currentQuizIndex].data() as QuizData}
        />
      )}
      {docs !== null && state.currentQuizIndex >= docs.length && (
        <OverallGrade quizzesLength={docs.length}></OverallGrade>
      )}
    </Column1>
  );
}
