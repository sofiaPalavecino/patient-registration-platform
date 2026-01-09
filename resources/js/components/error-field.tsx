import { useEffect, useState } from 'react';

interface Props {
    message?: string;
}

export default function ErrorField({ message }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    if (!message) return null;

    return (
        <p
            className={`mt-1 text-sm text-red-600 transition-all duration-300 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
        >
            {message}
        </p>
    );
}
