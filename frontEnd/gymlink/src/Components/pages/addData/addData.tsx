import { Button } from "@mui/joy";
import "./addData.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
interface props {
  closeModal: any;
  id: number;
}
function AddData(props: props): JSX.Element {
  const nav = useNavigate();
  const payments = () => {
    nav(`/update/payments/${props.id}`);
  };
  return (
    <div className="addData">
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Button onClick={payments}>עדכן תשלום </Button>
        <Button onClick={props.closeModal}> עדכן משימה </Button>
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Button onClick={props.closeModal}> עדכן משקלים</Button>
        <Button onClick={props.closeModal}>עדכן תוכנית אימון/תזונה</Button>
      </ButtonGroup>
    </div>
  );
}

export default AddData;
