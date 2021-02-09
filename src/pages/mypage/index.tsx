import Head from "next/head";
import { LayoutForMypage } from "../../layouts/LayoutForMypage";
import { MyPageTopTemplate } from "../../components/templates/MyPageTopTemplate";

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
