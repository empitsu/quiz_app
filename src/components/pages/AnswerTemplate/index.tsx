import Link from "next/link";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getQuizzes, QuizArray } from "./getQuizzes";
import { useRouter } from "next/router";
import { AnswerPropStore } from "../../../contexts/AnswerProps";
import { Column1 } from "../../uikit/Column1";
import { Heading } from "../../uikit/Heading";
import { FormErrorText } from "../../uikit/FormErrorText";
import styled from "styled-components";
import { Button } from "../../uikit/Button";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { LinkText } from "../../uikit/LinkText";
import { AnswerSortQuiz } from "./AnswerSortQuiz";
import { AnswerSelectionQuiz } from "./AnswerSelectionQuiz";

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
        <Button isFullWidth color="primary" onClick={onClickRetryBtn}>
          もう一度挑戦
        </Button>
      </FormItemWrap>
      <FormItemWrap>
        <Link href="/mypage/">
          <Button isFullWidth color="secondary">
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
function AnswerSelectionOrSortQuiz({ quiz }: { quiz: QuizArray[number] }) {
  const router = useRouter();
  const onClickCancelBtn = useCallback(() => {
    router.reload();
  }, [router]);
  if (quiz.data.type === "selection") {
    return (
      <>
        <AnswerSelectionQuiz
          key={quiz.id}
          title={quiz.data.title}
          options={quiz.data.options}
          correctOptionId={quiz.data.correctOptionId}
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
        key={quiz.id}
        title={quiz.data.title}
        options={quiz.data.options}
      ></AnswerSortQuiz>
      <StyledCancelP>
        <LinkText onClick={onClickCancelBtn}>キャンセルしてやり直す</LinkText>
      </StyledCancelP>
    </>
  );
}

export default function AnswerTemplate() {
  const { state } = useContext(AnswerPropStore);
  const [error, setError] = useState<Error | null>(null);
  const [docs, setDocs] = useState<null | QuizArray>(null);
  const isMountedRef = useRef<null | boolean>(null);

  const isEmptyQuiz = docs !== null && docs.length === 0;
  const isQuizAvailable = docs !== null && state.currentQuizIndex < docs.length;
  const isShowResult =
    docs !== null && docs.length !== 0 && state.currentQuizIndex >= docs.length;

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
      {isEmptyQuiz && (
        <StyledNoQuizP>
          まだ問題がありません。登録画面からクイズを登録してください。
        </StyledNoQuizP>
      )}
      {isQuizAvailable && (
        <AnswerSelectionOrSortQuiz
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          quiz={docs![state.currentQuizIndex]}
        />
      )}
      {isShowResult && (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <OverallGrade quizzesLength={docs!.length}></OverallGrade>
      )}
    </Column1>
  );
}
