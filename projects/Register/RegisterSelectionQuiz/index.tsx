import { useRouter } from "next/router";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postQuiz } from "../../../utils/postQuiz";
import { SelectionQuizOption } from "../SelectionQuizOption";

type FormValues = {
  selectionQuizTitle: string;
  selectionQuizOption: string[];
  selectionQuizCorrectAnswer: string;
};

export default function RegisterSelectionQuiz() {
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      console.log(data);

      const options = data.selectionQuizOption
        .filter((element) => element !== undefined)
        .map((text, index) => {
          return {
            optionId: index + 1,
            text: text,
          };
        });

      try {
        await postQuiz({
          type: "selection",
          title: data.selectionQuizTitle,
          correctOptionId: Number(data.selectionQuizCorrectAnswer),
          options: options,
        });
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
          required: true,
        })}
      ></input>
      <label htmlFor="selectionQuizCorrectAnswer">正答</label>

      {[...Array(4)].map((_, index) => {
        const optionId = index + 1;
        return (
          <SelectionQuizOption
            key={optionId}
            optionId={optionId}
            ref={register({
              required: true,
            })}
            isError={
              !!(
                errors.selectionQuizOption &&
                errors.selectionQuizOption[optionId]
              )
            }
          />
        );
      })}

      <button type="submit">クイズを登録する</button>
    </form>
  );
}
