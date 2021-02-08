import Head from "next/head";
import { LayoutForNotLoggedIn } from "../layouts/LayoutForNotLoggedIn";
import { IndexTemplate } from "../components/templates/IndexTemplate";

export default function Home() {
  return (
    <LayoutForNotLoggedIn urlToRedirectWhenLoggedIn="/mypage">
      <Head>
        <title>ログイン</title>
      </Head>
      <IndexTemplate></IndexTemplate>
    </LayoutForNotLoggedIn>
  );
}
