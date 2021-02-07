import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "../../utils/firebaseHelpers";

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
    <main>
      <p>redirecting...</p>
    </main>
  );
}
