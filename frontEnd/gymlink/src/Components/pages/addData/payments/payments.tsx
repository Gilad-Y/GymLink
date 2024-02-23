import { useParams } from "react-router-dom";
import TraineesList from "../traineesList/traineesList";
import "./payments.css";
import UserCard from "../../userCard/userCard";
import { useState } from "react";
import PaymentsTables from "./paymentsTables/paymentsTables";

function Payments(): JSX.Element {
  const [traineeId, setId] = useState<number>(0);
  const params = useParams();
  const getTrainee = (trainee: any) => {
    // console.log(trainee);
    setId(trainee);
  };
  return (
    <div className="payments">
      <h1>עדכון תשלום</h1>
      <TraineesList id={params.id ? +params.id : 0} getTrainee={getTrainee} />
      <UserCard id={traineeId} />
      <PaymentsTables id={traineeId} />
    </div>
  );
}

export default Payments;
