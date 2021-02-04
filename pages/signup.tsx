import styled from "styled-components";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "../utils/firebaseHelpers";
import { useCallback, useEffect, useRef } from "react";
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
  userPasswordRepeat: string;
};

export default function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm<FormValues>();

  const [user, loadingForAuth, authError] = useAuthState(getAuth());
  const router = useRouter();
  const password = useRef({});
  password.current = watch("userPasswordRepeat", "");

  useEffect(() => {
    if (user && !loadingForAuth) {
      router.push("/mypage/top");
    }
  }, [loadingForAuth, router, user]);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      console.log(data);

      const user = await createUserWithEmailAndPassword(
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
        <title>新規会員登録</title>
      </Head>
      <Title>新規会員登録</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="userEmail"
          placeholder="example@example.com"
          ref={register({
            required: true,
          })}
        ></input>
        {errors.userEmail?.types?.required && (
          <p>メールアドレスを入力してください。</p>
        )}
        <p>パスワードは6文字以上で設定してください。</p>
        <input
          type="password"
          name="userPassword"
          placeholder="パスワード"
          ref={register({
            required: "入力してください。",
            minLength: {
              value: 6,
              message: "パスワードは6文字以上です。",
            },
          })}
        ></input>
        {errors.userPassword && <p>{errors.userPassword.message}</p>}

        <input
          type="password"
          name="userPasswordRepeat"
          placeholder="確認のためパスワードを再度入力してください。"
          ref={register({
            validate: (value) => {
              return value === password.current || "パスワードが一致しません。";
            },
          })}
        ></input>
        {errors.userPasswordRepeat && (
          <p>{errors.userPasswordRepeat.message}</p>
        )}

        <button type="submit" disabled={loadingForAuth}>
          登録
        </button>
        {authError && <p>authError</p>}
      </form>
      <Link href="/">ログイン画面へ戻る</Link>
    </>
  );
}
