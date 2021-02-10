import Head from "next/head";
import { LayoutForMypage } from "../../components/layouts/LayoutForMypage";
import { MyPageTopTemplate } from "../../components/pages/MyPageTopTemplate";

export default function MyPageTop() {
  return (
    <LayoutForMypage urlToRedirectWhenNotLoggedIn="/">
      <Head>
        <title>MyPageTop</title>
      </Head>
      <MyPageTopTemplate></MyPageTopTemplate>
    </LayoutForMypage>
  );
}
