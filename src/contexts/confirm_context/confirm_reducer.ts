// Reference:
// https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/
export const SHOW_CONFIRM = 'SHOW_CONFIRM'
export const HIDE_CONFIRM = 'HIDE_CONFIRM'

export type Action = {
  type: 'SHOW_CONFIRM' | 'HIDE_CONFIRM',
  payload: {
    text: string
  }
}

export type State = {
  show: boolean,
  text: string
}
export const initialState: State = {
  show: false,
  text: ""
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        text: action.payload.text
      };
    case HIDE_CONFIRM:
      return initialState;
    default:
      return initialState;
  }

}