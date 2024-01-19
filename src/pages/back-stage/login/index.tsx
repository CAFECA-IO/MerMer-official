import React, { useContext } from 'react'
import MerMerButton from '../../../components/mermer_button/mermer_button'
import { locker, wait } from '../../../lib/common';
import useStateRef from 'react-usestateref';
import { UserContext} from '../../../contexts/user_context';
import { Code, ICode } from '../../../constants/code';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

export default function index({}: Props) {

  // useContext
  const userCtx = useContext(UserContext)

  // Info (20230117) Murky ConnectedProcess of wallet
  type IConnectingProcessType = 'EMPTY' | 'CONNECTING' | 'CONNECTED' | 'REJECTED';

  interface IConnectingProcessObject {
    EMPTY: IConnectingProcessType;
    CONNECTING: IConnectingProcessType;
    CONNECTED: IConnectingProcessType;
    REJECTED: IConnectingProcessType;
  }

  const ConnectingProcess: IConnectingProcessObject = {
    EMPTY: 'EMPTY',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    REJECTED: 'REJECTED',
  };

  const [connectingProcess, setConnectingProcess, connectingProcessRef] =
      useStateRef<IConnectingProcessType>(ConnectingProcess.EMPTY);
  // End of Connected Process


  // Info (20230117) Murky: ErrorCode for wallet connect
  const [errorCode, setErrorCode, errorCodeRef] = useStateRef<ICode>(Code.SERVICE_TERM_DISABLE); 

  const requestSendingHandler= async () => {
    const [lock, unlock] = locker('signature_process_modal.RequestSendingHandler');
    if (!lock()) return; // 沒有成功上鎖，所以不執行接下來的程式碼

    if(!userCtx.isConnected) { // Wallet has never connected to mermer, this is it's firsttime
      try{
        setConnectingProcess(ConnectingProcess.CONNECTING);
        await userCtx.connect();
      } catch (e) {
        // error can be user refuse signin or other error, don't do anything now
        window.alert(e);
      } finally {
        unlock();
        setConnectingProcess(ConnectingProcess.EMPTY);
        window.alert('finaly');
      }
    } else {
      try {
        
        setConnectingProcess(ConnectingProcess.CONNECTING);
        const signResult = await userCtx.signServiceTerm();
        unlock();

        if (signResult.success) {
            setConnectingProcess(ConnectingProcess.CONNECTED);
            await wait(1);
            setConnectingProcess(ConnectingProcess.EMPTY);

            window.alert('sign success');
        } else {
            switch (signResult.code) {
              case Code.SERVICE_TERM_DISABLE:
                setErrorCode(Code.SERVICE_TERM_DISABLE);
                break;
              case Code.UNKNOWN_ERROR:
                setErrorCode(Code.UNKNOWN_ERROR);
                break;

              default:
                setErrorCode(signResult.code);
                break;
            }

            await wait(1);
            setConnectingProcess(ConnectingProcess.REJECTED);
        }

      } catch(e) {
        unlock();
        window.alert(e);
        setConnectingProcess(ConnectingProcess.REJECTED);
      }
    }
  }

  return (
      <div>
        <MerMerButton onClick={requestSendingHandler}>Hello</MerMerButton>
      </div>
  )
}