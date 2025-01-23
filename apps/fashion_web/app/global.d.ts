export {};

declare global {
  interface Window {
    showToast: (message: string, type?: "SUCCESS" | "ERROR"="SUCCESS", duration?: number) => void;
  }
}
