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
  const navToPage = (page: string) => {
    console.log(page);
    switch (page) {
      case "payments":
        nav(`/update/payments/${props.id}`);
        break;
      case "mission":
        nav(`/update/missions/${props.id}`);
        break;
      case "weights":
        nav(`/update/weight/${props.id}`);
        break;
      case "program":
        nav(`/update/program/${props.id}`);
        break;
      case "trainee":
        nav(`/update/newTrainee/${props.id}`);
        break;
    }
  };
  return (
    <div className="addData">
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Button onClick={() => navToPage("payments")}>עדכן תשלום </Button>
        <Button onClick={() => navToPage("mission")}> עדכן משימה </Button>
        <Button onClick={() => navToPage("weights")}> עדכן משקלים</Button>
        <Button onClick={() => navToPage("program")}>
          עדכן תוכנית אימון/תזונה
        </Button>
        <Button onClick={() => navToPage("trainee")}>צרף מתאמן חדש</Button>
      </ButtonGroup>
    </div>
  );
}

export default AddData;
