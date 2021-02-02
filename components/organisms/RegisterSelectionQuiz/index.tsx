type QuizOptionProps = {
  optionId: number;
};

function QuizOption({ optionId }: QuizOptionProps) {
  return (
    <>
      <label htmlFor="register-selection-quiz-option">{`選択肢${optionId}`}</label>
      <input
        type="text"
        id={`register-selection-quiz-option${optionId}`}
        placeholder="問題文を入力してください"
      ></input>
    </>
  );
}

export default function RegisterSelectionQuiz() {
  return (
    <>
      <label htmlFor="register-quiz-title">問題文</label>
      <input
        type="text"
        id="register-quiz-title"
        placeholder="問題文を入力してください"
      ></input>

      {[...Array(4)].map((_, index) => {
        const optionNumber = index + 1;
        return <QuizOption key={optionNumber} optionId={optionNumber} />;
      })}
    </>
  );
}
