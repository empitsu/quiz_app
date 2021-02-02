import { ChangeEventHandler, useCallback, useState } from "react";
import Layout from "../../components/Layout";
import RegisterSelectionQuiz from "../../components/organisms/RegisterSelectionQuiz";
import { RegisterSortQuiz } from "../../components/organisms/RegisterSortQuiz";

type QuizType = "selection" | "sort";

export default function Register() {
  const [quizType, setQuizType] = useState<QuizType>("selection");

  const onClickQuizType = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setQuizType(e.target.value as QuizType);
    },
    [setQuizType]
  );

  return (
    <>
      <Layout>
        <h1>Register</h1>
        <section>
          <input
            type="radio"
            name="register-quiz-type"
            id="register-quiz-type1"
            value="selection"
            checked={quizType === "selection"}
            onChange={onClickQuizType}
          ></input>
          <label htmlFor="register-quiz-type1">4択問題</label>
          <input
            type="radio"
            name="register-quiz-type"
            id="register-quiz-type2"
            value="sort"
            checked={quizType === "sort"}
            onChange={onClickQuizType}
          ></input>
          <label htmlFor="register-quiz-type2">並び替え問題</label>
        </section>
        {quizType === "selection" ? (
          <RegisterSelectionQuiz></RegisterSelectionQuiz>
        ) : (
          <RegisterSortQuiz></RegisterSortQuiz>
        )}
      </Layout>
    </>
  );
}
