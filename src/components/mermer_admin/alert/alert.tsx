// Reference
// https://dev.to/tripathics/creating-an-alert-system-with-context-and-hook-in-react-713
import React, { useEffect } from 'react'
import Image from 'next/image'

type Props = {
  message: string,
  severity: string,
  timeout: number,
  handleDismiss?: () => void
}

const svgPaths: { [key: string]: string } = {
  success: '/elements/check-circle.svg',
  error: '/elements/exclamation-circle.svg',
}

export type IAlert = {
  id: string,
  severity: 'success' | 'error',
  message: string,
  timeout: number,
  handleDismiss?: () => void
}



export function Alert({
  message = 'This is alert message',
  severity = 'success',
  timeout = 5000,
  handleDismiss = undefined
}: Props) {

  useEffect(() => {
    if (timeout > 0 && handleDismiss) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, timeout)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    message?.length > 0 && (
      <div className='flex h-[58px] w-[400px] items-center justify-center gap-2 rounded-b-[20px] bg-mermerTheme2 shadow-drop transition ease-in-out'>
        <Image
          src={svgPaths[severity]}
          width={24}
          height={24}
          alt={`${severity} icon`}
        />
        <span className='font-Dosis  font-bold text-lightWhite1'>{message}</span>
      </div>
    )
  )
}

export function AlertsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 mx-auto flex w-screen flex-col items-center justify-start gap-4">
      {children}
    </div>
  );
}