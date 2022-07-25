import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'

const CustomModal = ({content, isOpen = false, onClose}) => {

	return (
		<>
			<Transition className="w-full" appear show={isOpen} as="div">
				<Dialog as="div" className="relative z-10" onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-60 width-50"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel 
									className="max-w-1/2 transform bg-blue-500 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"

									as="div"
								>
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										<div className="w-full absolute flex flex-row justify-end px-2">
												<button
													type="button"
													className="text-2xl inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={onClose}
												>
													<FontAwesomeIcon icon={faCircleXmark} />
												</button>
										</div>

									</Dialog.Title>
									<div className="">
										{content}
									</div>

								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default CustomModal;
