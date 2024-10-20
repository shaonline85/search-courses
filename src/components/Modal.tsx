import React from "react";
import CrossIcon from "./svg/CrossIcon";

interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-semibold">Contact Form</h3>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={onClose}
					>
						<CrossIcon />
						<span className="sr-only">Close modal</span>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
