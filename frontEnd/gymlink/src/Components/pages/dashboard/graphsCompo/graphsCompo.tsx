import "./graphsCompo.css";
import ProgressGraph from "./progressGraph/progressGraph";
import WeightGraph from "./weightGraph/weightGraph";

function GraphsCompo(): React.JSX.Element {
  return (
    <div className="graphsCompo">
      <ProgressGraph />
      <WeightGraph />
    </div>
  );
}

export default GraphsCompo;
