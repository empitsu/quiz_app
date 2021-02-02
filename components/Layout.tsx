import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <Link href="/mypage/top">もどる</Link>
      </nav>
      <div>{children}</div>
    </>
  );
}

export default Layout;
