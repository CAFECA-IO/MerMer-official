// Reference:
// https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/
import { Dispatch, createContext, useReducer } from "react";
import { initialState, reducer } from "./confirm_reducer";
import type { State, Action } from "./confirm_reducer";

export interface IConfirmContext {
  confirmReducer: [State, Dispatch<Action>];
}
export interface IConfirmProvider {
  children: React.ReactNode;
}
export const ConfirmContext = createContext<IConfirmContext>(
  {
    confirmReducer: [initialState, (value: Action) => {
      value
      return
    }]
  }
);

export const ConfirmContextProvider = ({ children }: IConfirmProvider) => {
  //Info (20240130) Murky: state做為參數傳入reducer，但是eslint會報錯，所以先註解掉
  //eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ConfirmContext.Provider value={{ confirmReducer: [state, dispatch] }}>
      {children}
    </ConfirmContext.Provider>
  )
}