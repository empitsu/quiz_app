import styled from "styled-components";
import { loginWithEmailAndPassword } from "../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { LayoutForNotLoggedIn } from "../layouts/LayoutForNotLoggedIn";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

type FormValues = {
  userEmail: string;
  userPassword: string;
};

export default function Home() {
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const [loggedInError, setLoggedInError] = useState<Error | null>(null);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (data) => {
    console.log(data);
    try {
      await loginWithEmailAndPassword(data.userEmail, data.userPassword);
    } catch (error) {
      setLoggedInError(error);
    }
  }, []);

  return (
    <LayoutForNotLoggedIn urlToRedirectWhenLoggedIn="/mypage">
      <Head>
        <title>ログイン</title>
      </Head>
      <Title>ログイン</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="userEmail"
          placeholder="example@example.com"
          ref={register({
            required: "メールアドレスを入力してください。",
          })}
        ></input>
        {errors.userEmail && <p>{errors.userEmail.message}</p>}

        <input
          type="password"
          name="userPassword"
          placeholder="password"
          ref={register({
            required: "パスワードを入力してください。",
            minLength: {
              value: 6,
              message: "パスワードは6文字以上です。",
            },
          })}
        ></input>
        {errors.userPassword && <p>{errors.userPassword.message}</p>}
        <button type="submit">ログイン</button>
        {loggedInError && <p>{loggedInError.message}</p>}
      </form>
      <Link href="/signup">アカウント作成はこちら</Link>
    </LayoutForNotLoggedIn>
  );
}
