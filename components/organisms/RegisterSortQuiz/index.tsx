import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SortQuizOption } from "../SortQuizOption";

type FormValues = {
  sortQuizTitle: string;
  sortQuizOption: string[];
};

export function RegisterSortQuiz() {
  const { register, handleSubmit, errors, clearErrors } = useForm<FormValues>();

  // 表示する選択肢のidリスト
  const [indexes, setIndexes] = useState<number[]>([1]);

  const onClickAddBtn = useCallback(() => {
    setIndexes((prevIndexes) => [...prevIndexes, Math.max(...prevIndexes) + 1]);

    clearErrors("sortQuizOption"); // always clear errors when there is add action.
  }, [clearErrors]);

  const onSubmit = useCallback<SubmitHandler<FormValues>>((data) => {
    console.log(data);
  }, []);

  const removeOption = useCallback(
    (optionId: number) => () => {
      setIndexes((prevIndexes) => [
        ...prevIndexes.filter((item) => item !== optionId),
      ]);
    },
    []
  );
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="register-quiz-title">問題文</label>
        <input
          type="text"
          id="register-quiz-title"
          name="sortQuizTitle"
          placeholder="問題文を入力してください"
          ref={register({
            required: true,
          })}
        ></input>
        {indexes.map((optionId) => {
          return (
            <SortQuizOption
              key={optionId}
              optionId={optionId}
              ref={register({
                required: true,
              })}
              isError={
                !!(errors.sortQuizOption && errors.sortQuizOption[optionId])
              }
              isRemovable={indexes.length > 1}
              onRemove={removeOption}
            />
          );
        })}
        <button onClick={onClickAddBtn}>追加する</button>

        <button type="submit">クイズを登録する</button>
      </form>
    </>
  );
}
