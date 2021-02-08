import styled from "styled-components";
import { createUserWithEmailAndPassword } from "../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import { SubmitHandler, useForm } from "react-hook-form";
import { LayoutForNotLoggedIn } from "../layouts/LayoutForNotLoggedIn";
import { Heading } from "../components/atoms/Heading";

type FormValues = {
  userEmail: string;
  userPassword: string;
  userPasswordRepeat: string;
};

export default function SignUp() {
  const { register, handleSubmit, getValues, errors } = useForm<FormValues>();

  const [loggedInError, setLoggedInError] = useState<Error | null>(null);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (data) => {
    console.log(data);

    try {
      await createUserWithEmailAndPassword(data.userEmail, data.userPassword);
    } catch (error) {
      setLoggedInError(error);
    }
  }, []);
  return (
    <LayoutForNotLoggedIn urlToRedirectWhenLoggedIn="/mypage/">
      <Head>
        <title>新規会員登録</title>
      </Head>
      <Heading styleLevel="h2">新規会員登録</Heading>

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
            required: "入力してください。",
            validate: (value) => {
              const { userPassword } = getValues();
              return value === userPassword || "パスワードが一致しません。";
            },
          })}
        ></input>
        {errors.userPasswordRepeat && (
          <p>{errors.userPasswordRepeat.message}</p>
        )}

        <button type="submit">登録</button>
        {loggedInError && <p>{loggedInError.message}</p>}
      </form>
      <Link href="/">ログイン画面へ戻る</Link>
    </LayoutForNotLoggedIn>
  );
}
