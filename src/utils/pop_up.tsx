import ConfettiAnimation from "@/components/win_game/component/confetti_animation";
import React from "react";

const Popup = ({ isOpen, onClose, children, showConffetti = false }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0  items-center justify-center z-50 "
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 w-full h-full  flex-col">
        {children}
        {showConffetti && <ConfettiAnimation />}
      </div>
    </div>
  );
};

export default Popup;
