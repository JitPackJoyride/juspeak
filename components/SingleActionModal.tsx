import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

export type ModalType = "success" | "warning" | "error" | "info";

export interface ModalProps {
  modalType: ModalType;
  title: string;
  description: string;
  buttonText: string;
  onSubmit: () => void;
}

export default function SingleActionModal({
  modalType,
  title,
  description,
  buttonText,
  onSubmit,
}: ModalProps) {
  const [open, setOpen] = useState(true);

  function ModalIcon({ modalType }: { modalType: ModalType }) {
    switch (modalType) {
      case "success":
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <CheckIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
          </div>
        );
      case "error":
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        );
      default:
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <CheckIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
          </div>
        );
    }
  }

  const buttonColors = () => {
    switch (modalType) {
      case "success":
        return "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500";
      case "error":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      default:
        return "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500";
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <div>
                <ModalIcon modalType={modalType} />
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className={`${buttonColors()} inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
                  onClick={() => {
                    setOpen(false);
                    onSubmit();
                  }}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
