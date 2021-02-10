import Head from "next/head";
import { LayoutForNotLoggedIn } from "../components/layouts/LayoutForNotLoggedIn";
import { IndexTemplate } from "../components/pages/IndexTemplate";

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
