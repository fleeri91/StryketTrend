import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import type { Size } from 'types/Tailwind';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  width?: Size;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ title, children, width, isOpen, onClose }: ModalProps) => {
  const SizeMapper = {
    '2xl': 'max-w-screen-2xl',
    xl: 'max-w-screen-xl',
    lg: 'max-w-screen-lg',
    md: 'max-w-screen-md',
    sm: 'max-w-screen-sm',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-12 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  'dark:bg-gray-950 dark:text-white transform overflow-hidden w-full rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  width && SizeMapper[width]
                )}
              >
                <Dialog.Title
                  as='h3'
                  className='text-2xl font-medium text-center leading-6'
                >
                  {title}
                </Dialog.Title>
                <Dialog.Panel>{children}</Dialog.Panel>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
