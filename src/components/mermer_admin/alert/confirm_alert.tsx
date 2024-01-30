import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { createPortal } from 'react-dom';
import useConfirm from '../../../contexts/confirm_context/useConfirm';
// Referece
// https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/

export default function ConfirmAlert({ }) {

  const { onConfirm, onCancel, confirmState } = useConfirm();
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);


  // 確保只在客戶端訪問 document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalElement(document.getElementById('portal'));
    }
  }, []);
  const isDisplayedCautionModal = confirmState.show ? (

    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-darkBlue3/0 outline-none backdrop-blur-sm focus:outline-none">
      <div
        className='flex w-[269px] flex-col items-center  justify-center gap-4 rounded-[10px] bg-mermerTheme p-4 pt-5 font-Dosis text-[14px] text-lightWhite1'
      >
        <div className='flex flex-col gap-[10px]'>
          <div className='flex items-center justify-center gap-2'>
            <Image
              src='/elements/caution.svg'
              width={24}
              height={24}
              alt='Caution icon'
            />
            <span className='text-[20px] font-bold'>Caution</span>
          </div>
          <div>
            {confirmState?.text && confirmState.text}
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={onCancel}
            className='flex h-auto w-[110px] items-center justify-center rounded-[5px] bg-darkBlue3 px-[7px] py-[6px]'
          >
            <span className="font-bold text-lightWhite1">
              Cancel
            </span>
          </button>
          <button
            onClick={onConfirm}
            className='flex h-auto w-[110px] items-center justify-center rounded-[5px] bg-lightBlue1 px-[7px] py-[6px]'
          >
            <span className="font-bold text-darkBlue2">
              Yes
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return portalElement ? createPortal(isDisplayedCautionModal, portalElement) : null;
}

// 範例用法如下

// 記得在index 或是 loayout中及入下面的錨點
// <div id="portal"></div>
// Reference:
// https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/

// function App() {
//   const {confirm} = useConfirm();
//   const [message, setMessage] = useState('');
//   const showConfirm = async () => {
//       const isConfirmed = await confirm('Do you confirm your choice?');

//       if (isConfirmed) {
//           setMessage('Confirmed!')
//       } else {
//           setMessage('Declined.')
//       }
//   }
//   return (
//       <div className="app">
//           <div>
//               <button className="btn" onClick={showConfirm}>Show confirm</button>
//           </div>
//           <p>
//               {message}
//           </p>
//       </div>
//   );
// }