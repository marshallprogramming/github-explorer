import { FC } from "react";

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard: FC<StatCardProps> = ({ label, value }) => (
  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
  </div>
);

export default StatCard;
