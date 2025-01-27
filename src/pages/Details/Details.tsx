import { FC } from "react";
import { useParams } from "react-router-dom";

const Details: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Pokemon Details: {id}</h1>
    </div>
  );
};

export default Details;
