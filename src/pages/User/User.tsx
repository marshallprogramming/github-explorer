import { FC } from "react";
import { useParams } from "react-router-dom";

const User: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">User User: {id}</h1>
    </div>
  );
};

export default User;
