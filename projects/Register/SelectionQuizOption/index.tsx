import { forwardRef } from "react";

type QuizOptionProps = {
  optionId: number;
  isError: boolean;
};

export const SelectionQuizOption = forwardRef<
  HTMLInputElement,
  QuizOptionProps
>(({ optionId, isError }, ref) => {
  // nameを`SelectionQuizOption[${optionId}]`にするとsubmit時のdataが配列形式になる
  const fieldName = `selectionQuizOption[${optionId}]`;
  return (
    <>
      <input
        type="radio"
        name="selectionQuizCorrectAnswer"
        value={optionId}
        ref={ref}
      ></input>
      <fieldset name={fieldName} key={fieldName}>
        <label htmlFor={fieldName}>{`選択肢${optionId}`}</label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          placeholder="問題文を入力してください"
          ref={ref}
        ></input>
        {isError && <p>入力してください。</p>}
      </fieldset>
    </>
  );
});

SelectionQuizOption.displayName = "SelectionQuizOption";
