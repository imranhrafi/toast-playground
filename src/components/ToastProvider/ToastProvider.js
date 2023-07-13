import React, { useCallback, useState } from "react";
import useKeyDown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function handleToastCreate(selectedVariant, message) {
    const NewToast = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        selectedVariant: selectedVariant,
        message: message,
      },
    ];

    setToasts(NewToast);
  }
  function handleDismiss(id) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown("Escape", handleEscape);

  const value = {
    handleDismiss,
    handleToastCreate,
    toasts,
    setToasts,
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
