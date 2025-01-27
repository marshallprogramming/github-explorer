import { FC } from "react";

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
  </div>
);

export default LoadingSpinner;
