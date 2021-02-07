import { forwardRef } from "react";

type QuizOptionProps = {
  optionId: number;
  errorMessage: string | null | undefined;
  radioRef: (ref: HTMLInputElement) => void;
};

export const SelectionQuizOption = forwardRef<
  HTMLInputElement,
  QuizOptionProps
>(({ optionId, radioRef, errorMessage }, ref) => {
  // nameを`SelectionQuizOption[${optionId}]`にするとsubmit時のdataが配列形式になる
  const fieldName = `selectionQuizOption[${optionId}]`;
  return (
    <>
      <input
        type="radio"
        id="selectionQuizCorrectAnswer"
        name="selectionQuizCorrectAnswer"
        value={optionId}
        ref={radioRef}
      ></input>
      <fieldset name={fieldName} key={fieldName}>
        <label htmlFor={fieldName}>{`選択肢${optionId}`}</label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          placeholder="選択肢を入力してください"
          ref={ref}
        ></input>
        {errorMessage && (
          <p role="alert" aria-label={`選択肢${optionId}のエラー`}>
            {errorMessage}
          </p>
        )}
      </fieldset>
    </>
  );
});

SelectionQuizOption.displayName = "SelectionQuizOption";
