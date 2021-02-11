import styled from "styled-components";
import { loginWithEmailAndPassword } from "../../../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../uikit/Button";
import { Textfield } from "../../uikit/Textfield";
import { FormItemLabel } from "../../uikit/FormItemLabel/index";
import { FormErrorText } from "../../uikit/FormErrorText";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { Heading } from "../../uikit/Heading";
import { Column1 } from "../../uikit/Column1";

const StyledLogoH1 = styled.h1`
  margin: 50px 0 40px 0;
  text-align: center;
`;

const StyledBorderP = styled.p`
  font-size: 14px;
  max-width: 80%;
  margin: 0px auto;
  line-height: 1.5;
  text-align: center;
  font-weight: 400;
  overflow: hidden;
  position: relative;
  ::before,
  ::after {
    background-color: ${({ theme }) => theme.palettes.grey["400"]};
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }
  ::before {
    right: 0.5em;
    margin-left: -50%;
  }
  ::after {
    left: 0.5em;
    margin-right: -50%;
  }
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
      <StyledLogoH1>
        <Image
          src="/images/QuizMakerLogo.svg"
          width="350"
          height="70"
          alt="QuizMaker"
        ></Image>
      </StyledLogoH1>

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
      <StyledBorderP>or</StyledBorderP>
      <FormItemWrap>
        <Link href="/signup">
          <Button isFullWidth color="secondary">
            アカウント作成はこちら
          </Button>
        </Link>
      </FormItemWrap>
    </Column1>
  );
}
