import styled from "styled-components";
import { loginWithEmailAndPassword } from "../../../utils/firebaseHelpers";
import { useCallback, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const StyledTextField = styled.input<{
  isFullWith: boolean;
}>`
  color: ${({ theme }) => theme.palettes.text.primary};
  width: ${({ isFullWith }) => (isFullWith ? "100%" : "auto")};
  height: 1.1876em;
  margin: 0;
  padding: 18.5px 14px;
  display: inline-flex;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.palettes.grey["400"]};
  border-radius: ${({ theme }) => theme.border.radius};
  background: none;
  box-sizing: content-box;
  letter-spacing: inherit;
  line-height: 1.1876em;
  -webkit-tap-highlight-color: transparent;
  :focus {
    border-color: ${({ theme }) => theme.palettes.primary.main};
  }
`;

const StyledFormItemLabel = styled.label`
  margin: 0 0 10px 0;
  display: block;
`;

const StyledErrorText = styled.p`
  color: ${({ theme }) => theme.palettes.error.main};
`;

const StyledFormItemContainer = styled.div`
  margin: 8px 0;
`;

const StyledButton = styled.button<{
  isFullWith: boolean;
}>`
  ${({ theme }) => theme.typography.button}
  cursor: pointer;
  width: ${({ isFullWith }) => (isFullWith ? "100%" : "auto")};
  color: ${({ theme }) => theme.palettes.primary.contrastText};
  background-color: ${({ theme }) => theme.palettes.primary.main};
  padding: 8px 22px;
  box-sizing: border-box;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  appearance: none;
  box-shadow: 0 0.25rem 0 ${({ theme }) => theme.palettes.primary.dark};
  :hover {
    opacity: ${({ theme }) => theme.palettes.action.hoverOpacity};
  }
`;

const StyledAnchor = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.palettes.primary.main};
  :hover {
    text-decoration: underline;
  }
`;

const StyledNarrowSection = styled.section`
  max-width: 444px;
  padding: 0 24px;
  margin: 0 auto;
`;

const StyledLogoH1 = styled.h1`
  ${({ theme }) => theme.typography.h1}
  text-align: center;
`;

const StyledPageTitleH1 = styled.h1`
  text-align: center;
  ${({ theme }) => theme.typography.h2}
`;

type FormValues = {
  userEmail: string;
  userPassword: string;
};

export function IndexTemplate() {
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
    <div>
      <StyledLogoH1>Simple Quiz Maker</StyledLogoH1>
      <StyledNarrowSection>
        <StyledPageTitleH1>ログイン</StyledPageTitleH1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormItemContainer>
            <StyledFormItemLabel htmlFor="userEmail">
              メールアドレス
            </StyledFormItemLabel>
            <StyledTextField
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
              <StyledErrorText role="alert" aria-label="メールアドレスエラー">
                {errors.userEmail.message}
              </StyledErrorText>
            )}
          </StyledFormItemContainer>

          <StyledFormItemContainer>
            <StyledFormItemLabel htmlFor="userPassword">
              パスワード
            </StyledFormItemLabel>
            <StyledTextField
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
            ></StyledTextField>
            {errors.userPassword && (
              <StyledErrorText role="alert" aria-label="パスワードエラー">
                {errors.userPassword.message}
              </StyledErrorText>
            )}
          </StyledFormItemContainer>
          <StyledFormItemContainer>
            <StyledButton isFullWith type="submit">
              ログイン
            </StyledButton>
            {loggedInError && (
              <StyledErrorText role="alert" aria-label="ログインエラー">
                {loggedInError.message}
              </StyledErrorText>
            )}
          </StyledFormItemContainer>
        </form>
        <Link href="/signup">
          <StyledAnchor>アカウント作成はこちら</StyledAnchor>
        </Link>
      </StyledNarrowSection>
    </div>
  );
}
