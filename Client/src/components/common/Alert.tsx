import React, { useEffect, useState } from "react";

interface AlertProps {
  type: string;
  message: string;
  timeout?: number;
  manuallyHide?: boolean;
}

export function Alert({ type, message, timeout, manuallyHide }: AlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!manuallyHide) {
      setTimeout(() => {
        setShow(false);
      }, timeout || 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`alert alert-${type} alert-dismissible 
    ${show ? "show" : ""} fade`}
    >
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
      ></button>
      {message}
    </div>
  );
}
