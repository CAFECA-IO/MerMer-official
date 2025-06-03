import Image from 'next/image';
import Link from 'next/link';
import MerMerButton from '../../components/mermer_button/mermer_button';
import smallConnectingAnimation from '../../../public/animations/lf30_editor_cnkxmhy3.json';
import activeIconPulse from '../../../public/animations/lf30_editor_cyvxlluo.json';
import Lottie from 'lottie-react';
import {UserContext} from '../../contexts/user_context';
import React, {useContext} from 'react';
import {useGlobal} from '../../contexts/global_context';
import {locker, wait} from '../../lib/common';
import {DELAYED_HIDDEN_SECONDS} from '../../constants/display';
import {useTranslation} from 'next-i18next';
import {Code, ICode} from '../../constants/code';
import useStateRef from 'react-usestateref';
import {RxCrossCircled} from 'react-icons/rx';

type TranslateFunction = (s: string) => string;
interface ISignatureProcessModal {
  loading?: boolean;
  firstStepSuccess?: boolean;
  firstStepError?: boolean;
  secondStepSuccess?: boolean;
  secondStepError?: boolean;
  processModalRef?: React.RefObject<HTMLDivElement>;
  processModalVisible: boolean;
  processClickHandler: () => void;
  requestSendingHandler?: () => void;
}

const SignatureProcessModal = ({
  processModalRef,
  processModalVisible = false,
  processClickHandler,
}: ISignatureProcessModal) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const userCtx = useContext(UserContext);
  const globalCtx = useGlobal();
  // const notificationCtx = useContext(NotificationContext);

  // TODO: 從 UserContext 拿字串狀態來判斷，取代`connectingProcess`跟`setConnectingProcess`，用來判斷第二步應顯示'打勾、打叉、數字'哪一種圖示
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
  // Info: for the use of useStateRef (20231106 - Shirley)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorCode, setErrorCode, errorCodeRef] = useStateRef<ICode>(Code.SERVICE_TERM_DISABLE);

  const firstStepIcon = (
    <div className="relative flex items-center justify-center">
      <Lottie className="absolute ml-3px mt-2px w-32" animationData={activeIconPulse} />

      <Image
        className="relative"
        src="/elements/group_2415.svg"
        width={32}
        height={32}
        alt="step 1 icon"
      />
    </div>
  );

  const successIcon = (
    <Image src="/elements/group_2415_check.svg" width={32} height={32} alt="successful icon" />
  );

  const errorIcon = (
    <Image src="/elements/group_2418_error.svg" width={32} height={32} alt="error icon" />
  );

  const secondStepDefaultIcon = (
    <Image src="/elements/group_2418.svg" width={32} height={32} alt="step 2 icon" />
  );

  const secondStepActivatedIcon = (
    <div className="relative flex w-32px items-center justify-center gap-8">
      <Lottie className="absolute ml-1 mt-2px w-32" animationData={activeIconPulse} />

      <Image
        className="relative"
        src="/elements/group_2418(1).svg"
        width={32}
        height={32}
        alt="step 2 icon"
      />
    </div>
  );

  const requestSendingHandler = async () => {
    const [lock, unlock] = locker('signature_process_modal.RequestSendingHandler');

    if (!lock()) return; // 沒有成功上鎖，所以不執行接下來的程式碼

    if (!userCtx.isConnected) {
      // It's a cycle
      try {
        setConnectingProcess(ConnectingProcess.CONNECTING);

        await userCtx.connect();
      } catch (e) {
        window.alert(e);
      } finally {
        unlock();
        setConnectingProcess(ConnectingProcess.EMPTY);
      }
    } else {
      try {
        setConnectingProcess(ConnectingProcess.CONNECTING);

        const signResult = await userCtx.signServiceTerm();

        unlock();

        if (signResult.success) {
          setConnectingProcess(ConnectingProcess.CONNECTED);

          await wait(DELAYED_HIDDEN_SECONDS / 5);
          setConnectingProcess(ConnectingProcess.EMPTY);

          globalCtx.visibleSignatureProcessModalHandler();
          globalCtx.visibleHelloModalHandler();
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

          await wait(DELAYED_HIDDEN_SECONDS / 5);
          setConnectingProcess(ConnectingProcess.REJECTED);
        }
      } catch (e) {
        unlock();
        window.alert(e);
        setErrorCode(Code.UNKNOWN_ERROR_IN_COMPONENT);
        setConnectingProcess(ConnectingProcess.REJECTED);
      }
    }
  };

  const requestButtonHandler =
    connectingProcessRef.current === ConnectingProcess.CONNECTING ||
    connectingProcessRef.current === ConnectingProcess.CONNECTED ? (
      <Lottie className="w-40px" animationData={smallConnectingAnimation} />
    ) : connectingProcessRef.current === ConnectingProcess.EMPTY ||
      connectingProcessRef.current === ConnectingProcess.REJECTED ? (
      <MerMerButton
        id="SendRequestButton"
        onClick={requestSendingHandler}
        className="mx-10 my-10px flex gap-2 rounded text-lg transition-all hover:opacity-90"
      >
        <Image
          className="relative"
          src="/elements/Sent.svg"
          width={24}
          height={24}
          alt="send icon"
        />
        <div>{t('WALLET_PANEL.SEND_REQUESTS_BUTTON')}</div>
      </MerMerButton>
    ) : null;

  const firstStepDefaultView = (
    <>
      <div className="relative mr-8">{firstStepIcon}</div>
      <div className="flex flex-col gap-4 space-y-1 text-lightWhite1">
        <div className="text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP1_TITLE')}</div>
        <div className="text-sm">{t('WALLET_PANEL.SIGNATURE_STEP1_DESCRIPTION')}</div>
      </div>
    </>
  );

  const firstStepSuccessView = (
    <>
      <div className="mr-8">{successIcon}</div>
      <div className="flex flex-col gap-4 space-y-1 text-lightWhite1">
        <div className="text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP1_TITLE')}</div>
        <div className="text-sm">{t('WALLET_PANEL.SIGNATURE_STEP1_DESCRIPTION')}</div>
      </div>
    </>
  );

  const firstStepSectionHandler = (
    <>{userCtx.isConnected ? firstStepSuccessView : firstStepDefaultView}</>
  );

  const secondStepDefaultView = (
    <>
      <div className="relative mr-8 w-32px">{secondStepDefaultIcon}</div>
      <div className="flex flex-col gap-4 space-y-1 text-lightWhite1 lg:w-auto">
        <div className="text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP2_TITLE')}</div>
        <div className="text-sm">
          {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION1')}
          <Link href="#" className="text-lightBlue1">
            {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION2')}
          </Link>
        </div>
      </div>
    </>
  );
  const secondStepActiveView = (
    <>
      <div className="relative mr-8">{secondStepActivatedIcon}</div>
      <div className="flex flex-col gap-4 space-y-1 text-lightWhite1">
        <div className="text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP2_TITLE')}</div>
        <div className="text-sm">
          {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION1')}
          <Link href="#" className="text-lightBlue1">
            {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION2')}
          </Link>
        </div>
      </div>
    </>
  );

  const secondStepSuccessView = (
    <>
      <div className="mr-8">{successIcon}</div>
      <div className="flex flex-col gap-4 space-y-1 text-lightWhite1">
        <div className="text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP2_TITLE')}</div>
        <div className="text-sm">
          {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION1')}
          <Link href="#" className="text-lightBlue1">
            {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION2')}
          </Link>
        </div>
      </div>
    </>
  );

  const secondStepErrorView = (
    <>
      <div className="mr-8">{errorIcon}</div>
      <div className="space-y-1 text-lightWhite1">
        <div className="mb-4 text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP2_TITLE')}</div>
        <div className="text-sm">
          {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION1')}
          <Link href="#" className="text-lightBlue1">
            {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION2')}
          </Link>
        </div>
        <div className="mt-2 text-sm text-errorRed">
          {t('WALLET_PANEL.ERROR_MESSAGE')} ({errorCodeRef.current})
        </div>
      </div>
    </>
  );

  const secondStepDisableServiceTermErrorView = (
    <>
      <div className="mr-8">{errorIcon}</div>
      <div className="space-y-1 text-lightWhite1">
        <div className="mb-4 text-lg font-bold">{t('WALLET_PANEL.SIGNATURE_STEP2_TITLE')}</div>
        <div className="text-sm">
          {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION1')}
          <Link href="#" className="text-lightBlue1">
            {t('WALLET_PANEL.SIGNATURE_STEP2_DESCRIPTION2')}
          </Link>
        </div>
        <div className="mt-2 text-sm text-errorRed">
          {t('WALLET_PANEL.DISABLE_SERVICE_TERM_ERROR_MESSAGE')} ({errorCodeRef.current})
        </div>
      </div>
    </>
  );

  const secondStopErrorHandler = (errorType?: string) => {
    switch (errorType) {
      case Code.SERVICE_TERM_DISABLE:
        return secondStepDisableServiceTermErrorView;

      default:
        return secondStepErrorView;
    }
  };

  const secondStepSectionHandler = (
    <>
      {!userCtx.isConnected
        ? secondStepDefaultView
        : connectingProcess === ConnectingProcess.CONNECTED
        ? secondStepSuccessView
        : connectingProcess === ConnectingProcess.REJECTED
        ? secondStopErrorHandler(errorCodeRef.current)
        : secondStepActiveView}
    </>
  );

  const displayedSection = (
    <div className={`flex flex-col items-start gap-6 px-6 pt-6`}>
      <div className="flex items-center justify-center">{firstStepSectionHandler}</div>

      {/* Info: Second Step (20231106 - Shirley) */}
      <div className="flex items-center justify-center">{secondStepSectionHandler}</div>
    </div>
  );

  const isDisplayedProcessModal = processModalVisible ? (
    /* Info: (20231129 - Julian) Blur Mask */
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-darkBlue3/0 outline-none backdrop-blur-sm focus:outline-none">
      <div
        id="SignatureProcessModal"
        ref={processModalRef}
        className="relative mx-6 flex h-500px w-430px flex-col items-center justify-between rounded-xl bg-darkBlue3 p-6 pb-10 font-Dosis shadow-lg shadow-black/80"
      >
        {/* Info: (20231129 - Julian) Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-lightWhite1">{t('WALLET_PANEL.TITLE')}</h3>
          {/* Info: (20231004 - Julian) Close Button */}
          <button
            id="SignatureCloseButton"
            onClick={processClickHandler}
            className="absolute right-6 top-6"
          >
            <RxCrossCircled size={30} />
          </button>
        </div>

        <div className="flex w-80 flex-col items-center text-base leading-relaxed text-lightWhite1">
          <div className="text-center text-lightWhite1  ">
            <div>{t('WALLET_PANEL.SIGNATURE_DESCRIPTION_LINE1')}</div>
            <div>
              {' '}
              {t('WALLET_PANEL.SIGNATURE_DESCRIPTION_LINE2_PART1')}{' '}
              <span className="text-lightBlue1">
                <Link href="#">{t('WALLET_PANEL.SIGNATURE_DESCRIPTION_LINE2_HIGHLIGHT')}</Link>
              </span>{' '}
              {t('WALLET_PANEL.SIGNATURE_DESCRIPTION_LINE2_PART2')}
            </div>
          </div>

          {displayedSection}
        </div>
        <div className="">{requestButtonHandler}</div>
      </div>
    </div>
  ) : null;

  return <div>{isDisplayedProcessModal}</div>;
};

export default SignatureProcessModal;
