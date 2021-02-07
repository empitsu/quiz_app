import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../../utils/firebaseHelpers";

type Props = {
  children: React.ReactNode;
};

export function LayoutForMypage({ children }: Props) {
  const router = useRouter();

  const [_user, loadingForAuth, authError] = useAuthState(getAuth());
  const onClickLogout = useCallback(async () => {
    await logout();
    if (!authError && !loadingForAuth) {
      router.push("/");
    }
  }, [authError, loadingForAuth, router]);

  return (
    <>
      <header>
        <nav>
          <Link href="/mypage/">もどる</Link>
          <button onClick={onClickLogout} disabled={loadingForAuth}>
            ログアウト
          </button>
          <p>{authError}</p>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
