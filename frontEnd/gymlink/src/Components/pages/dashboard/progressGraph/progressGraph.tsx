import { useEffect, useState } from "react";
import "./progressGraph.css";
import { LineChart } from "@mui/x-charts/LineChart";
function ProgressGraph(): JSX.Element {
  const [xData, setX] = useState<any[]>([]);
  const [yData, setY] = useState<any[]>([]);
  useEffect(() => {
    setX([1, 2, 3, 5, 8, 10]);
    setY([2, 5.5, 2, 8.5, 1.5, 5]);
  }, []);
  return (
    <div className="progressGraph">
      <LineChart
        xAxis={[{ data: xData }]}
        series={[
          {
            data: yData,
          },
        ]}
        sx={{ width: "93%", background: "rgb(89, 96, 96)" }}
        // width={"93.5%"}
        height={400}
      />
    </div>
  );
}

export default ProgressGraph;
