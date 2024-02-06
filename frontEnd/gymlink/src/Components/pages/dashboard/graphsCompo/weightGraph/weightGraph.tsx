import { useEffect, useState } from "react";
import "./weightGraph.css";
import { LineChart } from "@mui/x-charts/LineChart";
function WeightGraph(): JSX.Element {
  const [xData, setX] = useState<any[]>([]);
  const [yData, setY] = useState<any[]>([]);
  const colors = ["purple"];
  useEffect(() => {
    setX([1, 2, 3, 5, 8, 10]);
    setY([2, 5.5, 2, 8.5, 1.5, 5]);
  }, []);
  return (
    <div className="weightGraph">
      <h1>גרף משקלים</h1>
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

export default WeightGraph;
