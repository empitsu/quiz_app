import { render, fireEvent } from "@testing-library/react";
import { ComponentPropsWithoutRef } from "react";
import { mocked } from "ts-jest/utils";
import { QuizData } from "../../src/components/templates/AnswerTemplate";

import { AnswerSelectionQuiz } from "../../../../src/projects/Answer/AnswerSelectionQuiz";
import { getQuizzes } from "../../../../src/utils/getQuizzes";
import { delayEventLoop } from "../../../delayEventLoop";

jest.mock("../../../../src/layouts/LayoutForMypage", () => {
  return {
    LayoutForMypage: jest.fn(({ children }) => <div>{children}</div>),
  };
});

jest.mock("../../../../src/projects/Answer/AnswerSelectionQuiz", () => {
  return {
    AnswerSelectionQuiz: jest.fn(() => <></>),
  };
});

// https://www.debuggr.io/react-update-unmounted-component/#:~:text=Warning%3A%20Can't%20perform%20a,in%20a%20useEffect%20cleanup%20function.

// beforeEach(() => {
//   jest.resetModules();
// });

type AnswerSelectionQuizProps = ComponentPropsWithoutRef<
  typeof AnswerSelectionQuiz
>;

// 本当は一つのファイルにまとめないがdoMockによる同一ファイル内でのモックの上書きがうまく行かないため別ファイルで実施。
describe("answer page", () => {
  it("<AnswerSelectionQuiz /> should be called when the type of the first quiz is selection", async () => {
    // jest.resetModules();を使うとError: Invalid hook callになるためisolateModulesを使う。
    // 参考： https://github.com/facebook/jest/issues/8987#issuecomment-552980635
    // が、それでもなぜかdoMockによるモックの上書きができなかったためやむを得ず別ファイルで実施。
    jest.isolateModules(async () => {
      // https://spectrum.chat/testing-library/help-react/using-jest-domock-with-rtl~f41f013b-6e94-45a7-b003-995ae369d9f9

      jest.doMock("../../../../src/utils/getQuizzes", () => {
        return {
          getQuizzes: jest.fn().mockImplementation((value) => {
            console.log(value, "getquizzzzzzzzzzzz");
            const quiz: QuizData = {
              type: "selection",
              title: "quiz1",
              correctOptionId: 1,
              options: [
                {
                  optionId: 1,
                  text: "option1",
                },
              ],
            };
            return Promise.resolve([
              {
                id: "id1",
                data: () => {
                  return quiz;
                },
              },
            ]);
          }),
        };
      });

      // refer to: https://jestjs.io/docs/ja/jest-object#jestdomockmodulename-factory-options
      return import("../../../../src/components/templates/AnswerTemplate").then(
        async (module) => {
          const AnswerTemplate = module.default;
          const div = document.createElement("div");
          render(<AnswerTemplate />, {
            container: div,
          });
          await delayEventLoop();
          expect(AnswerSelectionQuiz).toHaveBeenCalledTimes(1);

          const options: AnswerSelectionQuizProps["options"] = [
            {
              optionId: 1,
              text: "option1",
            },
          ];
          expect(mocked(AnswerSelectionQuiz).mock.calls[0][0].options).toEqual(
            options
          );
        }
      );
    });
  });
});
