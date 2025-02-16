import CardCompo from "./cardCompo/cardCompo";
import "./cardLine.css";

function CardLine(): React.JSX.Element {
  return (
    <div className="cardLine">
      <CardCompo
        id={0}
        type={"מנויים"}
        stat={10}
      />
      <CardCompo
        id={0}
        type={"איחור"}
        stat={10}
      />
      <CardCompo
        id={0}
        type={"נגמרות בקרוב"}
        stat={10}
      />
      {/* <CardCompo
        id={0}
        type={"דיווחים"}
        stat={10}
      /> */}
    </div>
  );
}

export default CardLine;
