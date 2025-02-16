import "./progressGraph.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
function ProgressGraph(): React.JSX.Element {
  const [xData, setX] = useState<any[]>([]);
  const [yData, setY] = useState<any[]>([]);
  const colors = ["white"];
  useEffect(() => {
    setX([1, 2, 3, 5, 8, 10]);
    setY([2, 5.5, 2, 8.5, 1.5, 5]);
  }, []);
  return (
    <div className="progressGraph">
      <h1>גרף התקדמות</h1>
      <LineChart
        colors={colors}
        xAxis={[{ data: xData }]}
        series={[
          {
            data: yData,
          },
        ]}
        sx={{ background: "rgb(89, 96, 96)" }}
        height={400}
        width={700}
      />
    </div>
  );
}

export default ProgressGraph;
