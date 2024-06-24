import { toast } from "react-toastify";

const createNotificationSlice = () => ({
  showSuccess: (message) => toast.success(message),
  showError: (message) => toast.error(message),
  showWarning: (message) => toast.warn(message),
  showInfo: (message) => toast.info(message),
});

export default createNotificationSlice;
