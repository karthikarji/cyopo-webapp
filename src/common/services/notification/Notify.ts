/**
 * Notify
 * Static service class for showing toast notifications.
 * Wraps react-hot-toast so the rest of the app never imports
 * it directly. If we switch libraries, only this file changes.
 *
 * Usage:
 *   Notify.success('Portfolio saved')
 *   Notify.error('Something went wrong')
 *   Notify.warn('Draft not saved yet')
 *   Notify.info('Changes are live')
 */

import toast from "react-hot-toast";

const Notify = {
  success(message: string): void {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        background: "#ffffff",
        color: "#1d1b20",
        border: "1px solid #e1d4fd",
        borderLeft: "4px solid #1a7f4b",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
      },
      iconTheme: {
        primary: "#1a7f4b",
        secondary: "#ffffff",
      },
    });
  },

  error(message: string): void {
    toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        background: "#ffffff",
        color: "#1d1b20",
        border: "1px solid #ffdad6",
        borderLeft: "4px solid #ba1a1a",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
      },
      iconTheme: {
        primary: "#ba1a1a",
        secondary: "#ffffff",
      },
    });
  },

  warn(message: string): void {
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "⚠️",
      style: {
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        background: "#ffffff",
        color: "#1d1b20",
        border: "1px solid #ffdf93",
        borderLeft: "4px solid #765b00",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
      },
    });
  },

  info(message: string): void {
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        fontFamily: "Ubuntu, sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        background: "#ffffff",
        color: "#1d1b20",
        border: "1px solid #e1d4fd",
        borderLeft: "4px solid #4f378a",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07)",
      },
    });
  },

  dismiss(): void {
    toast.dismiss();
  },
};

export default Notify;
