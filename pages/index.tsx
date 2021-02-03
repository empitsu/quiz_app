import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { loginWithEmailAndPassword, getAuth } from "../utils/firebaseHelpers";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const [user, loadingForAuth, authError] = useAuthState(getAuth());
  const router = useRouter();

  useEffect(() => {
    if (user && !loadingForAuth) {
      router.push("/mypage/top");
    }
  }, [loadingForAuth, router, user]);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      console.log(data);

      const user = await loginWithEmailAndPassword(
        data.userEmail,
        data.userPassword
      );
      if (user) {
        router.push("/mypage/top");
      }
    },
    [router]
  );
  return (
    <>
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
            required: true,
            minLength: {
              value: 6,
              message: "パスワードは6文字以上です。",
            },
          })}
        ></input>
        {errors.userPassword && <p>{errors.userPassword.message}</p>}
        <button type="submit" disabled={loadingForAuth}>
          ログイン
        </button>
        {authError && <p>authError</p>}
      </form>
      <Link href="/signup">アカウント作成はこちら</Link>
    </>
  );
}
