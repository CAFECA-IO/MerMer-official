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
  { confirmReducer: [initialState, (value: Action) => { }] }
);

export const ConfirmContextProvider = ({ children }: IConfirmProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ConfirmContext.Provider value={{ confirmReducer: [state, dispatch] }}>
      {children}
    </ConfirmContext.Provider>
  )
}