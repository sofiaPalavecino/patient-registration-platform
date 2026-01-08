import { ReactNode, useEffect } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {


    useEffect(() => {
        if (!open) return;

        function onEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }

        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, [open, onClose]);


    if (!open) return null;

    return (
        <div className="c-modal fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 animate-fade-in"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-sm rounded bg-white p-6 animate-scale-in">
                {children}
            </div>
        </div>
    );
}
