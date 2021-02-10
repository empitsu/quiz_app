import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../../../utils/firebaseHelpers";
import { Loading } from "../../uikit/Loading";
import styled from "styled-components";
import { Button } from "../../uikit/Button";
import { FormErrorText } from "../../uikit/FormErrorText";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
`;

const StyledH1 = styled.h1`
  margin: 0;
`;

const StyledMain = styled.main`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled.footer`
  margin-top: 20px;
  padding: 20px;
`;

const StyledFooterP = styled.p`
  text-align: center;
`;

type Props = {
  children: React.ReactNode;
  urlToRedirectWhenNotLoggedIn: string;
};

export function LayoutForMypage({
  urlToRedirectWhenNotLoggedIn,
  children,
}: Props) {
  const router = useRouter();
  const [logoutError, setLogoutError] = useState<Error | null>(null);
  const [user, loadingForAuth, authError] = useAuthState(getAuth());
  const onClickLogout = useCallback(async () => {
    try {
      await logout();
      router.push(urlToRedirectWhenNotLoggedIn);
    } catch (error) {
      setLogoutError(error);
    }
  }, [router, urlToRedirectWhenNotLoggedIn]);

  useEffect(() => {
    if (!user && !loadingForAuth) {
      // ログインしてないのでリダイレクト
      router.push(urlToRedirectWhenNotLoggedIn);
    }
  }, [loadingForAuth, router, urlToRedirectWhenNotLoggedIn, user]);

  // ログイン情報取得中
  if (loadingForAuth) {
    return (
      <StyledMain>
        <Loading></Loading>
      </StyledMain>
    );
  }

  // 認証エラー
  if (authError) {
    return (
      <StyledMain>
        <p role="alert" aria-label="認証エラー">
          エラーが発生しました。画面をリロードしてください。
        </p>
      </StyledMain>
    );
  }

  // 非ログインなのでリダイレクト
  if (!user) {
    return (
      <StyledMain>
        <Loading></Loading>
      </StyledMain>
    );
  }

  // ログイン済み
  return (
    <div>
      <StyledHeader>
        <Link href="/mypage/">
          <StyledH1>
            <a>Simple Quiz Maker</a>
          </StyledH1>
        </Link>
        <div>
          <Button
            color="info"
            onClick={onClickLogout}
            disabled={loadingForAuth}
          >
            ログアウト
          </Button>
          {logoutError && (
            <FormErrorText role="alert" aria-label="ログアウトエラー">
              {logoutError.message}
            </FormErrorText>
          )}
        </div>
      </StyledHeader>
      <main>{children}</main>
      <StyledFooter>
        <StyledFooterP>©2021 empitsu</StyledFooterP>
      </StyledFooter>
    </div>
  );
}
