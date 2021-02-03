import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, logout } from "../utils/firebaseHelpers";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();

  const [user, loadingForAuth, authError] = useAuthState(getAuth());
  const onClickLogout = useCallback(async () => {
    await logout();
    if (!authError && !loadingForAuth) {
      router.push("/");
    }
  }, [authError, loadingForAuth, router]);

  return (
    <>
      <nav>
        <Link href="/mypage/top">もどる</Link>
        <button onClick={onClickLogout} disabled={loadingForAuth}>
          ログアウト
        </button>
        <p>{authError}</p>
      </nav>
      <div>{children}</div>
    </>
  );
}

export default Layout;
