import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center py-8 text-red-500">{message}</div>
);

export default ErrorMessage;
