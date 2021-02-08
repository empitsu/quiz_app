import Head from "next/head";
import RegisterTemplate from "../../components/templates/RegisterTemplate";
import { LayoutForMypage } from "../../layouts/LayoutForMypage";

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
