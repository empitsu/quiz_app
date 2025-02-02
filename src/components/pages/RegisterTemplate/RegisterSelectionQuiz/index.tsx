import { useRouter } from "next/router";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../uikit/Button";
import { FormErrorText } from "../../../uikit/FormErrorText";
import { FormItemLabel } from "../../../uikit/FormItemLabel";
import { FormItemWrap } from "../../../uikit/FormItemWrap";
import { Textfield } from "../../../uikit/Textfield";
import { postQuiz, QuizToPost } from "../postQuiz";
import { SelectionQuizOption } from "../SelectionQuizOption";
import styled from "styled-components";

type FormValues = {
  selectionQuizTitle: string;
  selectionQuizOption: string[];
  selectionQuizCorrectAnswer: string;
};

const StyledCenteredP = styled.p`
  text-align: center;
`;

export type SelectionQuiz = Extract<QuizToPost, { type: "selection" }>;

export function RegisterSelectionQuiz() {
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
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
      <StyledCenteredP>
        選択肢を4つ表示し、その中から1つを選択する問題です。
        <br />
        実際の出題時は選択肢がランダムな順番で提示されます。
      </StyledCenteredP>
      <FormItemWrap>
        <FormItemLabel htmlFor="register-quiz-title">問題文</FormItemLabel>
        <Textfield
          type="text"
          id="register-quiz-title"
          name="selectionQuizTitle"
          placeholder="問題文を入力してください"
          isFullWidth
          ref={register({
            required: "問題文を入力してください",
          })}
        ></Textfield>
        {errors.selectionQuizTitle && (
          <FormErrorText role="alert" aria-label="問題文エラー">
            {errors.selectionQuizTitle.message}
          </FormErrorText>
        )}
      </FormItemWrap>
      <p>正答</p>

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
        <FormErrorText role="alert" aria-label="正答選択のエラー">
          {errors.selectionQuizCorrectAnswer.message}
        </FormErrorText>
      )}
      <FormItemWrap>
        <Button isFullWidth type="submit">
          クイズを登録する
        </Button>
      </FormItemWrap>
    </form>
  );
}
