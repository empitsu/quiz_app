import Head from "next/head";
import RegisterTemplate from "../../components/pages/RegisterTemplate";
import { LayoutForMypage } from "../../components/layouts/LayoutForMypage";

export default function Register() {
  return (
    <LayoutForMypage urlToRedirectWhenNotLoggedIn="/">
      <Head>
        <title>Register</title>
      </Head>
      <RegisterTemplate></RegisterTemplate>
    </LayoutForMypage>
  );
}
