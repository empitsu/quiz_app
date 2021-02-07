import { useRouter } from "next/router";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postQuiz, QuizToPost } from "../../../utils/postQuiz";
import { SelectionQuizOption } from "../SelectionQuizOption";

type FormValues = {
  selectionQuizTitle: string;
  selectionQuizOption: string[];
  selectionQuizCorrectAnswer: string;
};

export type SelectionQuiz = Extract<QuizToPost, { type: "selection" }>;

export default function RegisterSelectionQuiz() {
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      console.log(data);

      const options: SelectionQuiz["options"] = data.selectionQuizOption
        .filter((element) => element !== undefined)
        .map((text, index) => {
          return {
            optionId: index + 1,
            text: text,
          };
        });
      const postData: SelectionQuiz = {
        type: "selection",
        title: data.selectionQuizTitle,
        correctOptionId: Number(data.selectionQuizCorrectAnswer),
        options: options,
      };

      try {
        await postQuiz(postData);
        window.alert(`クイズを登録しました。`);
        router.reload();
      } catch (error) {
        window.alert(`エラーが発生しました。${error}`);
      }
    },
    [router]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="register-quiz-title">問題文</label>
      <input
        type="text"
        id="register-quiz-title"
        name="selectionQuizTitle"
        placeholder="問題文を入力してください"
        ref={register({
          required: "問題文を入力してください",
        })}
      ></input>
      {errors.selectionQuizTitle && (
        <p role="alert" aria-label="問題文エラー">
          {errors.selectionQuizTitle.message}
        </p>
      )}
      <label htmlFor="selectionQuizCorrectAnswer">正答</label>

      {[...Array(4)].map((_, index) => {
        const optionId = index + 1;
        return (
          <SelectionQuizOption
            key={optionId}
            optionId={optionId}
            radioRef={register({
              required: "正答を選択してください。",
            })}
            ref={register({
              required: "入力してください",
            })}
            errorMessage={
              errors.selectionQuizOption && errors.selectionQuizOption[optionId]
                ? errors.selectionQuizOption[optionId]?.message
                : null
            }
          />
        );
      })}
      {errors.selectionQuizCorrectAnswer && (
        <p role="alert" aria-label="正答選択のエラー">
          {errors.selectionQuizCorrectAnswer.message}
        </p>
      )}

      <button type="submit">クイズを登録する</button>
    </form>
  );
}
