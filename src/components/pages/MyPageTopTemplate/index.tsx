import Link from "next/link";
import { Button } from "../../uikit/Button";
import { Heading } from "../../uikit/Heading";
import { FormItemWrap } from "../../uikit/FormItemWrap";
import { Column1 } from "../../uikit/Column1";
import styled from "styled-components";

const StyledP = styled.p`
  text-align: center;
`;

export function MyPageTopTemplate() {
  return (
    <Column1>
      <Heading styleLevel="h1">MyPageTop</Heading>

      <FormItemWrap>
        <Link href="/mypage/register">
          <Button isFullWidth color="primary">
            クイズを登録する
          </Button>
        </Link>
      </FormItemWrap>
      <FormItemWrap>
        <Link href="/mypage/answer">
          <Button isFullWidth color="secondary">
            クイズに回答する
          </Button>
        </Link>
        <StyledP>ランダムで5問まで回答できます。</StyledP>
      </FormItemWrap>
    </Column1>
  );
}
