import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SortQuizOption } from "../SortQuizOption";
import { useRouter } from "next/router";
import { postQuiz, QuizToPost } from "../postQuiz";
import { FormItemLabel } from "../../../uikit/FormItemLabel";
import { Textfield } from "../../../uikit/Textfield";
import { FormErrorText } from "../../../uikit/FormErrorText";
import { Button } from "../../../uikit/Button";
import { FormItemWrap } from "../../../uikit/FormItemWrap";
import styled from "styled-components";

type FormValues = {
  sortQuizTitle: string;
  sortQuizOption: string[];
};

const StyledFormItemWrap = styled(FormItemWrap)`
  text-align: center;
  margin-bottom: 15px;
`;

const StyledCenteredP = styled.p`
  text-align: center;
`;

export type SortableQuiz = Extract<QuizToPost, { type: "sort" }>;

export function RegisterSortQuiz() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<FormValues>();

  // 表示する選択肢のidリスト
  const [indexes, setIndexes] = useState<number[]>([1]);

  const onClickAddBtn = useCallback(() => {
    setIndexes((prevIndexes) => [...prevIndexes, Math.max(...prevIndexes) + 1]);
  }, []);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      const options: SortableQuiz["options"] = data.sortQuizOption
        .filter((element) => element !== undefined)
        .map((text, index) => {
          return {
            optionId: index + 1,
            text: text,
          };
        });

      const postData: SortableQuiz = {
        type: "sort",
        title: data.sortQuizTitle,
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

  const removeOption = useCallback(
    (optionId: number) => () => {
      setIndexes((prevIndexes) => [
        ...prevIndexes.filter((item) => item !== optionId),
      ]);
    },
    []
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledCenteredP>
          表示されている選択肢を全て使い、正しい順番に並び替える問題です。
          <br />
          実際の出題時は選択肢がランダムな順番で提示されます。
        </StyledCenteredP>
        <StyledCenteredP>
          例）「りんごは英語で？」という問題を登録する場合、
          <br />
          選択肢欄には順番に「a」、「p」、「p」、「l」、「e」と登録してください。
        </StyledCenteredP>
        <FormItemWrap>
          <FormItemLabel htmlFor="register-quiz-title">問題文</FormItemLabel>
          <Textfield
            id="register-quiz-title"
            name="sortQuizTitle"
            placeholder="問題文を入力してください。"
            ref={register({
              required: "問題文を入力してください。",
            })}
            isFullWidth
          ></Textfield>
          {errors.sortQuizTitle && (
            <FormErrorText role="alert" aria-label="問題文エラー">
              {errors.sortQuizTitle.message}
            </FormErrorText>
          )}
        </FormItemWrap>
        {indexes.map((optionId) => {
          return (
            <SortQuizOption
              key={optionId}
              optionId={optionId}
              ref={register({
                required: "入力してください。",
              })}
              isError={
                !!(errors.sortQuizOption && errors.sortQuizOption[optionId])
              }
              errorMessage={
                errors.sortQuizOption && errors.sortQuizOption[optionId]
                  ? errors.sortQuizOption[optionId]?.message
                  : null
              }
              isRemovable={indexes.length > 1}
              onRemove={removeOption}
            />
          );
        })}
        <StyledFormItemWrap>
          <Button color="info" onClick={onClickAddBtn}>
            追加する
          </Button>
        </StyledFormItemWrap>
        <FormItemWrap>
          <Button isFullWidth type="submit">
            クイズを登録する
          </Button>
        </FormItemWrap>
      </form>
    </>
  );
}
