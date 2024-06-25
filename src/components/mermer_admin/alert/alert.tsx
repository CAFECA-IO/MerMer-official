// Reference
// https://dev.to/tripathics/creating-an-alert-system-with-context-and-hook-in-react-713
// 使用方法請看 /src/contexts/alert_context.tsx
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

// Info (20240210) Murky: handlessui is for alert animation
import {Transition} from '@headlessui/react';

type Props = {
  message: string;
  severity: string;
  timeout: number;
  handleDismiss?: () => void;
};

const svgPaths: {[key: string]: string} = {
  success: '/elements/check-circle.svg',
  error: '/elements/exclamation-circle.svg',
};

export type IAlert = {
  id: string;
  severity: 'success' | 'error';
  message: string;
  timeout: number;
  handleDismiss?: () => void;
};

export function Alert({
  message = 'This is alert message',
  severity = 'success',
  timeout = 5000,
  handleDismiss = undefined,
}: Props) {
  const [show, setShow] = useState(false);
  // useEffect(() => {
  //   setShow(!show)
  //   if (timeout > 0 && handleDismiss) {
  //     const timer = setTimeout(() => {
  //       handleDismiss()
  //       setShow(!show)
  //     }, timeout)
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   }
  // }, [])
  useEffect(() => {
    setShow(true);

    if (timeout > 0) {
      const timer = setTimeout(() => {
        if (handleDismiss) {
          handleDismiss();
        }
        setShow(false);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [handleDismiss, timeout]);

  return (
    <Transition
      className="fixed top-0 mx-auto my-0 max-w-md space-y-4"
      show={show}
      enter="transition-all ease-in-out duration-500 delay-[200ms]"
      enterFrom="opacity-0 translate-y-[-100%]"
      enterTo="opacity-100 translate-y-100"
      leave="transition-all ease-in-out duration-1000 delay-[200ms]"
      leaveFrom="opacity-100 translate-y-100"
      leaveTo="opacity-0 translate-y-[-100%]"
    >
      <div className="flex h-58px w-400px items-center justify-center gap-2 rounded-b-large bg-mermerTheme2 shadow-drop">
        <Image src={svgPaths[severity]} width={24} height={24} alt={`${severity} icon`} />
        <span className="font-Dosis  font-bold text-lightWhite1">{message}</span>
      </div>
    </Transition>
  );
}

export function AlertsWrapper({children}: {children: React.ReactNode}) {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 mx-auto flex w-screen flex-col items-center justify-start gap-4">
      {children}
    </div>
  );
}
