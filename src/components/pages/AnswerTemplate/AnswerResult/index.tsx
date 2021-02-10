import { useContext } from "react";
import { AnswerPropStore } from "../../../../contexts/AnswerProps";

import { incrementCurrentQuiz } from "../../../../ducks/AnswerTemplate";
import { FiberManualRecordOutlined, Clear } from "@material-ui/icons";
import { Button } from "../../../uikit/Button";

import styled from "styled-components";

type ResultProps = {
  isCorrect: boolean;
  officialAnswer: string;
};

const StyledFiberManualRecordOutlinedIcon = styled(FiberManualRecordOutlined)`
  && {
    font-size: 150px;
    color: ${({ theme }) => theme.palettes.success.main};
  }
`;

const StyledClear = styled(Clear)`
  && {
    font-size: 150px;
    color: ${({ theme }) => theme.palettes.error.main};
  }
`;
const StyledWrapDiv = styled.div`
  text-align: center;
  width: 100%;
`;

export function AnswerResult({ isCorrect, officialAnswer }: ResultProps) {
  const { dispatch } = useContext(AnswerPropStore);

  if (isCorrect) {
    return (
      <StyledWrapDiv>
        <div>
          <StyledFiberManualRecordOutlinedIcon></StyledFiberManualRecordOutlinedIcon>
        </div>

        <p>正解！</p>
        <p>正解：{officialAnswer}</p>
        <Button
          isFullWidth
          color="info"
          onClick={() => {
            dispatch(incrementCurrentQuiz(true));
          }}
        >
          次へ
        </Button>
      </StyledWrapDiv>
    );
  }
  return (
    <StyledWrapDiv>
      <div>
        <StyledClear></StyledClear>
      </div>
      <p>不正解！</p>
      <p>正解：{officialAnswer}</p>

      <Button
        isFullWidth
        color="info"
        onClick={() => {
          dispatch(incrementCurrentQuiz(false));
        }}
      >
        次へ
      </Button>
    </StyledWrapDiv>
  );
}
