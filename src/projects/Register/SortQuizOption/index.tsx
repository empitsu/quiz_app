import { forwardRef } from "react";

type QuizOptionProps = {
  optionId: number;
  isRemovable: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
  onRemove: (id: number) => () => void;
};

export const SortQuizOption = forwardRef<HTMLInputElement, QuizOptionProps>(
  ({ optionId, onRemove, errorMessage, isRemovable }, ref) => {
    // nameを`sortQuizOption[${optionId}]`にするとsubmit時のdataが配列形式になる
    const fieldName = `sortQuizOption[${optionId}]`;
    return (
      <fieldset name={fieldName} key={fieldName}>
        <label htmlFor={fieldName}>{`選択肢${optionId}`}</label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          placeholder="問題文を入力してください"
          ref={ref}
        ></input>
        {errorMessage && (
          <p role="alert" aria-label={`選択肢${optionId}のエラー`}>
            {errorMessage}
          </p>
        )}
        {isRemovable && (
          <button type="button" onClick={onRemove(optionId)}>
            Remove
          </button>
        )}
      </fieldset>
    );
  }
);

SortQuizOption.displayName = "SortQuizOption";
