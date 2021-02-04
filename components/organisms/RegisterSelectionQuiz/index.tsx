import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectionQuizOption } from "../SelectionQuizOption";

type FormValues = {
  selectionQuizTitle: string;
  selectionQuizOption: string[];
};

export default function RegisterSelectionQuiz() {
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit = useCallback<SubmitHandler<FormValues>>((data) => {
    console.log(data);
  }, []);
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
