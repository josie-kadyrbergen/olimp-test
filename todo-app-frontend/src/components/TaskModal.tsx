import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {description && <p className="mb-4">{description}</p>}
                {children}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
