import CardCompo from "./cardCompo/cardCompo";
import "./cardLine.css";

function CardLine(): JSX.Element {
  return (
    <div className="cardLine">
      <CardCompo id={0} type={"מנויים"} stat={10} />
      <CardCompo id={0} type={"משימות"} stat={10} />
      <CardCompo id={0} type={"משקל יעד"} stat={10} />
      <CardCompo id={0} type={"דיווחים"} stat={10} />
    </div>
  );
}

export default CardLine;
