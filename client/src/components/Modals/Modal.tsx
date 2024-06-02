import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, body }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black/30 z-[1000] p-4 flex items-center justify-center h-screen">
      <div
        className={`w-full max-w-xl transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all relative`}
      >
        {body}
      </div>
    </div>
  );
};

export default Modal;
