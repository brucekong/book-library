import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#f9faf2] rounded-2xl shadow-xl border border-[#e2e3dc] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e3dc] bg-[#f3f4ed]/50">
          <h3 className="font-bold text-lg text-[#154212] tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#72796e] hover:text-[#154212] hover:bg-[#edefe7] rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-[#191c18] text-sm leading-relaxed space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2e3dc] bg-[#f3f4ed]/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#154212] text-white rounded-full hover:bg-[#2d5a27] transition-colors"
          >
            Got it / 知道了
          </button>
        </div>
      </div>
    </div>
  );
};
