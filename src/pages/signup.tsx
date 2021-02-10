import Head from "next/head";

import { LayoutForNotLoggedIn } from "../components/layouts/LayoutForNotLoggedIn";
import { SignUpTemplate } from "../components/pages/SignUpTemplate";

export default function SignUp() {
  return (
    <LayoutForNotLoggedIn urlToRedirectWhenLoggedIn="/mypage/">
      <Head>
        <title>新規会員登録</title>
      </Head>
      <SignUpTemplate></SignUpTemplate>
    </LayoutForNotLoggedIn>
  );
}
