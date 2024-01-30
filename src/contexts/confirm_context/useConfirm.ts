// Reference:
// https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/
// this is hook of confirm_alert
import { useContext } from 'react';
import { ConfirmContext } from './confirm_context';
import { HIDE_CONFIRM, SHOW_CONFIRM } from './confirm_reducer';

let resolveCallback: (value: unknown) => void;

export default function useConfirm() {
  const [confirmState, dispatch] = useContext(ConfirmContext).confirmReducer;

  const confirm = (text: string) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: {
        text
      }
    });

    // Info (20240130) Murky: 用Promise的方法，把 resolve綁到 resolveCallback
    // 當onConfirm和 onCancel輸入 true 和 false 的時候都會resolve
    // 並回傳 true/false 到 hook 外面變成 isConfirmed
    return new Promise((resolve, rejected) => {
      resolveCallback = resolve;
    });
  }

  const closeConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
      payload: {
        text: ""
      }
    });
  }

  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };

  return { confirm, onConfirm, onCancel, confirmState };
}