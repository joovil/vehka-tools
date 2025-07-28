"use client";

interface ErrorModalProps {
  message?: string;
}

const ErrorModal = ({ message }: ErrorModalProps) => {
  if (!message) return null;

  return (
    <div className="relative">
      <div
        className="absolute right-0 bottom-full z-10 w-fit"
        role="alert"
      >
        <div className="flex items-center justify-between rounded border border-red-400 bg-red-100 px-2 py-1 text-red-700 shadow-lg">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
