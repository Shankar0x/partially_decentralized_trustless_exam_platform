import { Toaster, toast } from 'react-hot-toast';

export const showToast = (msg: string, type: 'default' | 'success' | 'error' = 'default') => {
    switch (type) {
        case 'success':
            toast.success(msg);
            break;
        case 'error':
            toast.error(msg);
            break;
        default:
            toast(msg);
            break;
    }
};

const Notify = () => {
    return <Toaster position="top-right" reverseOrder={false} />;
};

export default Notify;
