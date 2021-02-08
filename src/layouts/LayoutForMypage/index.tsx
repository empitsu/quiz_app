import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../../utils/firebaseHelpers";
import { Loading } from "../../components/atoms/Loading";
import styled from "styled-components";

const StyledMain = styled.main`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
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
      console.log("ログインしてないのでリダイレクト！in Layout");

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
      <header>
        <nav>
          <Link href="/mypage/">もどる</Link>
          <button onClick={onClickLogout} disabled={loadingForAuth}>
            ログアウト
          </button>
          {logoutError && <p>{logoutError.message}</p>}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
