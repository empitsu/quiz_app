import AnswerTemplate from "../../components/pages/AnswerTemplate";
import { AnswerPropsProvider } from "../../contexts/AnswerProps";
import { answerProps } from "../../ducks/AnswerTemplate";
import { LayoutForMypage } from "../../components/layouts/LayoutForMypage";
import Head from "next/head";

export default function Answer() {
  return (
    <AnswerPropsProvider initialState={answerProps}>
      <LayoutForMypage urlToRedirectWhenNotLoggedIn="/">
        <Head>
          <title>Answer</title>
        </Head>
        <AnswerTemplate></AnswerTemplate>
      </LayoutForMypage>
    </AnswerPropsProvider>
  );
}
