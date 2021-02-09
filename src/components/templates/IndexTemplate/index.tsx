import styled from "styled-components";
import { loginWithEmailAndPassword } from "../../../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../atoms/Button";
import { Textfield } from "../../atoms/Textfield";
import { LinkText } from "../../atoms/LinkText";
import { FormItemLabel } from "../../atoms/FormItemLabel/index";
import { FormErrorText } from "../../atoms/FormErrorText";
import { FormItemWrap } from "../../atoms/FormItemWrap";
import { Heading } from "../../atoms/Heading";
import { Column1 } from "../../atoms/Column1";

const StyledLogoH1 = styled.h1`
  ${({ theme }) => theme.typography.h1}
  text-align: center;
`;

type FormValues = {
  userEmail: string;
  userPassword: string;
};

export function IndexTemplate() {
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const [loggedInError, setLoggedInError] = useState<Error | null>(null);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (data) => {
    try {
      await loginWithEmailAndPassword(data.userEmail, data.userPassword);
    } catch (error) {
      setLoggedInError(error);
    }
  }, []);

  return (
    <Column1>
      <StyledLogoH1>Simple Quiz Maker</StyledLogoH1>

      <Heading styleLevel="h2">ログイン</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItemWrap>
          <FormItemLabel htmlFor="userEmail">メールアドレス</FormItemLabel>
          <Textfield
            isFullWidth
            type="text"
            id="userEmail"
            name="userEmail"
            placeholder="example@example.com"
            ref={register({
              required: "メールアドレスを入力してください。",
            })}
          />
          {errors.userEmail && (
            <FormErrorText role="alert" aria-label="メールアドレスエラー">
              {errors.userEmail.message}
            </FormErrorText>
          )}
        </FormItemWrap>

        <FormItemWrap>
          <FormItemLabel htmlFor="userPassword">パスワード</FormItemLabel>
          <Textfield
            isFullWidth
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="password"
            ref={register({
              required: "パスワードを入力してください。",
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
          <Button isFullWidth type="submit">
            ログイン
          </Button>
          {loggedInError && (
            <FormErrorText role="alert" aria-label="ログインエラー">
              {loggedInError.message}
            </FormErrorText>
          )}
        </FormItemWrap>
      </form>
      <Link href="/signup">
        <LinkText>アカウント作成はこちら</LinkText>
      </Link>
    </Column1>
  );
}
