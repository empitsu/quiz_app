import { createUserWithEmailAndPassword } from "../../../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Heading } from "../../uikit/Heading";
import { FormItemLabel } from "../../uikit/FormItemLabel";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { Textfield } from "../../uikit/Textfield";
import { FormErrorText } from "../../uikit/FormErrorText";
import { Button } from "../../uikit/Button";
import { LinkText } from "../../uikit/LinkText";
import { Column1 } from "../../uikit/Column1";

type FormValues = {
  userEmail: string;
  userPassword: string;
  userPasswordRepeat: string;
};

export function SignUpTemplate() {
  const { register, handleSubmit, getValues, errors } = useForm<FormValues>();

  const [loggedInError, setLoggedInError] = useState<Error | null>(null);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (data) => {
    try {
      await createUserWithEmailAndPassword(data.userEmail, data.userPassword);
    } catch (error) {
      setLoggedInError(error);
    }
  }, []);
  return (
    <div>
      <Heading styleLevel="h2">新規会員登録</Heading>
      <Column1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItemWrap>
            <FormItemLabel htmlFor="userEmail">メールアドレス</FormItemLabel>
            <Textfield
              type="text"
              name="userEmail"
              placeholder="example@example.com"
              isFullWidth
              ref={register({
                required: "メールアドレスを入力してください。",
              })}
            ></Textfield>
            {errors.userEmail && (
              <FormErrorText role="alert" aria-label="メールアドレスエラー">
                {errors.userEmail.message}
              </FormErrorText>
            )}
          </FormItemWrap>
          <FormItemWrap>
            <FormItemLabel htmlFor="userPassword">パスワード</FormItemLabel>
            <Textfield
              type="password"
              name="userPassword"
              placeholder="パスワード"
              isFullWidth
              ref={register({
                required: "入力してください。",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上です。",
                },
              })}
            ></Textfield>
            {errors.userPassword && (
              <FormErrorText role="alert" aria-label="パスワードエラー">
                {errors.userPassword.message}
              </FormErrorText>
            )}
          </FormItemWrap>

          <FormItemWrap>
            <FormItemLabel htmlFor="userPassword">
              パスワード（再入力）
            </FormItemLabel>
            <Textfield
              type="password"
              name="userPasswordRepeat"
              placeholder="確認のためパスワードを再度入力してください。"
              isFullWidth
              ref={register({
                required: "入力してください。",
                validate: (value) => {
                  const { userPassword } = getValues();
                  return value === userPassword || "パスワードが一致しません。";
                },
              })}
            ></Textfield>
            {errors.userPasswordRepeat && (
              <FormErrorText role="alert" aria-label="パスワード確認エラー">
                {errors.userPasswordRepeat.message}
              </FormErrorText>
            )}
          </FormItemWrap>

          <FormItemWrap>
            <Button isFullWidth type="submit">
              登録
            </Button>
            {loggedInError && (
              <FormErrorText role="alert" aria-label="会員登録エラー">
                {loggedInError.message}
              </FormErrorText>
            )}
          </FormItemWrap>
        </form>
        <Link href="/">
          <LinkText>ログイン画面へ戻る</LinkText>
        </Link>
      </Column1>
    </div>
  );
}
