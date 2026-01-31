import { useState, useEffect } from 'react';

interface AlertProps {
    message: string;
    onClose?: () => void;
}

function Alert({ message, onClose }: AlertProps) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div
            className={`w-full max-w-[360px] p-4 bg-[#FCEDE9] border-2 border-[#DBBAB1] rounded-[10px] flex items-center gap-4 transition-all duration-300 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path
                    d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="#ED2428"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="flex-1 min-w-0">{message}</p>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="cursor-pointer shrink-0"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L15 15M15 5L5 15" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Alert;
