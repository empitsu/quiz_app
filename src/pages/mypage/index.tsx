import Link from "next/link";
import Head from "next/head";
import { LayoutForMypage } from "../../layouts/LayoutForMypage";

export default function MyPageTop() {
  return (
    <LayoutForMypage urlToRedirectWhenNotLoggedIn="/">
      <Head>
        <title>MyPageTop</title>
      </Head>
      <h1>MyPageTop</h1>

      <Link href="/mypage/register">クイズを登録する</Link>
      <Link href="/mypage/answer">クイズに回答する</Link>
      <p>ランダムで5問まで回答できます。</p>
    </LayoutForMypage>
  );
}
