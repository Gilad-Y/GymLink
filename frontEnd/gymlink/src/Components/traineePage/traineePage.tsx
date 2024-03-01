import { useParams } from "react-router-dom";
import "./traineePage.css";

function TraineePage(): JSX.Element {
  const params = useParams();
  return <div className="traineePage">{params.id}</div>;
}

export default TraineePage;
