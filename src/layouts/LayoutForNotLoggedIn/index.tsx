import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Loading } from "../../components/atoms/Loading";
import { getAuth } from "../../utils/firebaseHelpers";

const StyledMain = styled.main`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  children: React.ReactNode;
  urlToRedirectWhenLoggedIn: string;
};

export function LayoutForNotLoggedIn({
  urlToRedirectWhenLoggedIn,
  children,
}: Props) {
  const [user, loadingForAuth, authError] = useAuthState(getAuth());
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("ログイン完了したのでリダイレクト！in Layout");

      router.push(urlToRedirectWhenLoggedIn);
    }
  }, [router, urlToRedirectWhenLoggedIn, user]);

  // ログイン情報取得中
  if (loadingForAuth) {
    return (
      <StyledMain>
        <Loading></Loading>
      </StyledMain>
    );
  }
  if (authError) {
    return (
      <StyledMain>
        <p role="alert" aria-label="認証エラー">
          エラーが発生しました。画面をリロードしてください。
        </p>
      </StyledMain>
    );
  }

  // 非ログイン時
  if (!user) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  // ログイン済みだったのでリダイレクト
  return (
    <StyledMain>
      <Loading></Loading>
    </StyledMain>
  );
}
