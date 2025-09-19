import { useState } from "react";

const useToast = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'warning' | 'info'>('success');


    const showToast = (message: string, variant: 'success' | 'error' | 'warning' | 'info') => {
        setToastMessage(message);
        setToastVariant(variant);
        setToastVisible(true);
    };

    return {
        toastVisible,
        toastMessage,
        toastVariant,
        setToastVisible,
        showToast,
        hideToast: () => setToastVisible(false),
    };
}

export default useToast;
