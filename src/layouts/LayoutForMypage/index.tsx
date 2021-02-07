import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../../utils/firebaseHelpers";

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
      <main>
        <p>loading...</p>
      </main>
    );
  }

  if (authError) {
    <main>
      <p>エラーが発生しました。画面をリロードしてください。</p>
    </main>;
  }

  // 非ログインなのでリダイレクト
  if (!user) {
    return (
      <main>
        <p>redirecting...</p>
      </main>
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
