import React, {createContext, useState, useContext, useMemo, useCallback, useEffect} from 'react';
import HelloModal from '../components/hello_modal/hello_modal';
import SignatureProcessModal from '../components/signature_process_modal/signature_process_modal';
 
export interface IGlobalProvider {
  children: React.ReactNode;
}

export interface IGlobalContext {
  visibleSignatureProcessModal: boolean;
  visibleSignatureProcessModalHandler: () => void;

  visibleHelloModal: boolean;
  visibleHelloModalHandler: () => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  visibleSignatureProcessModal: false,
  visibleSignatureProcessModalHandler: () => null,

  visibleHelloModal: false,
  visibleHelloModalHandler: () => null,

});

export const GlobalProvider = ({children}: IGlobalProvider) => {
  const [visibleHelloModal, setVisibleHelloModal] = useState(false);

  const [visibleSignatureProcessModal, setVisibleSignatureProcessModal] = useState(false);


  const visibleSignatureProcessModalHandler = useCallback(() => {
    setVisibleSignatureProcessModal(prev => !prev);
  }, []);

  const visibleHelloModalHandler = useCallback(() => {
    setVisibleHelloModal(prev => !prev);
  }, []);

  const defaultValue = {
    visibleSignatureProcessModal,
    visibleSignatureProcessModalHandler,

    visibleHelloModal,
    visibleHelloModalHandler,
  };
  return (
    <GlobalContext.Provider value={defaultValue}>

      <SignatureProcessModal
        processModalVisible={visibleSignatureProcessModal}
        processClickHandler={visibleSignatureProcessModalHandler}
      />
      <HelloModal
        helloModalVisible={visibleHelloModal}
        helloClickHandler={visibleHelloModalHandler}
      />

      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  // Info: If not in a provider, it still reveals `createContext<IGlobalContext>` data, meaning it'll never be falsy.

  // Deprecated: Debug tool [to be removed](20231120 - Shirley)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any =
    typeof globalThis === 'object'
      ? globalThis
      : typeof window === 'object'
      ? window
      : typeof global === 'object'
      ? global
      : null; // Info: Causes an error on the next line

  g.globalContext = context;

  return context;
};
