import { HTMLAttributes } from 'react'
import clsx from 'clsx'

import {
  RiCloseFill,
  RiCloseCircleFill,
  RiInformationFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from '@remixicon/react'
import { Transition } from '@headlessui/react'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'danger' | 'warning' | 'info' | 'success'
}

const AlertClasses = {
  danger: 'bg-red-400 text-red-100',
  warning: 'bg-amber-400 text-amber-50',
  info: 'bg-blue-400 dark:bg-blue-600 dark:text-blue-200',
  success: 'bg-green-400 dark:bg-green-600 dark:text-green-200',
}

const IconMapper = {
  danger: <RiCloseCircleFill />,
  warning: <RiErrorWarningFill />,
  info: <RiInformationFill />,
  success: <RiCheckboxCircleFill />,
}

const Alert = ({ type, children, hidden, className, ...htmlAttributes }: AlertProps): JSX.Element | null => {
  return (
    <Transition
      show={!hidden}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={clsx('absolute top-0 left-0 right-0', type && AlertClasses[type], className)} {...htmlAttributes}>
        <div className={clsx('relative flex  justify-between items-center p-4')}>
          <div className="inline-flex">
            <span onClick={() => null} className="mr-4">
              {type && IconMapper[type]}
            </span>
            <span>{children}</span>
          </div>
          <button className="hover:bg-slate-900/50 rounded-full transition-colors p-2">
            <RiCloseFill />
          </button>
        </div>
      </div>
    </Transition>
  )
}

export default Alert
