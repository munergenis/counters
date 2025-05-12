import { ReactNode, useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  const Modal = () => {
    return (
      <div
        className="absolute top-0 left-0 h-screen w-screen p-8 flex items-center justify-center bg-black/30"
        onClick={closeModal}
      >
        <div
          className="relative bg-white p-16 rounded-lg w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {modalContent}
          <button
            className="absolute top-2 right-2 bg-accent text-black font-bold text-2xl p-0 w-8 h-8 rounded-sm cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      </div>
    );
  };

  return { Modal, showModal, openModal, closeModal };
};
