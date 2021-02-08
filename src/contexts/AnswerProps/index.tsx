import {
  createContext,
  Dispatch,
  ReactNode,
  ReducerAction,
  useReducer,
} from "react";
import { answerProps, reducer } from "../../ducks/AnswerTemplate";
import { AnswerProps } from "../../ducks/AnswerTemplate/model";

export const AnswerPropStore = createContext({
  state: answerProps,
  dispatch: (() => {
    // do nothing
  }) as Dispatch<ReducerAction<typeof reducer>>,
});

export function AnswerPropsProvider({
  initialState,
  children,
}: {
  initialState: AnswerProps;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AnswerPropStore.Provider value={{ state, dispatch }}>
      {children}
    </AnswerPropStore.Provider>
  );
}
