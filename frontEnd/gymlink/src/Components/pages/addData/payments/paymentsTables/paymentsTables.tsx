import { useEffect, useState } from "react";
import "./paymentsTables.css";
import axios from "axios";
import CardsTable from "./cardsTable/cardsTable";
import MembershipsTable from "./membershipsTable/membershipsTable";
import { Button } from "@mui/joy";
interface props {
  id: number;
}
function PaymentsTables(props: props): JSX.Element {
  const [cardsData, setCards] = useState<any>([]);
  const [membershipData, setMembership] = useState<any>([]);
  const [refresh, setRef] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getPaymentsById/${props.id}`)
      .then((res) => {
        setMembership(res.data.membershipData);
        setCards(res.data.cardsData);
      });
  }, [props.id, refresh]);
  const refreshDate = () => {
    setRef(!refresh);
  };
  const showData = () => {
    console.log(cardsData, membershipData);
  };
  return (
    <div className="paymentsTables">
      {props.id > 0 && (
        <div className="tables">
          <div className="table">
            {<CardsTable data={cardsData} refFn={refreshDate} id={props.id} />}
          </div>
          <div className="table">
            <MembershipsTable
              data={membershipData}
              refFn={refreshDate}
              id={props.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsTables;
