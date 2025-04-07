import React from "react";
import store from "../../../../redux/store";
import CardCompo from "./cardCompo/cardCompo";
import "./cardLine.css";

function CardLine(): React.JSX.Element {
  const user = store.getState().users.user;

  const [stats, setStats] = React.useState<string[]>([]);
  const usedStats = new Set(); // Keeps track of already used stats
  const defaultStats = ["members", "expiring soon", "growth", "expired"];
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    fetchData();
  }, [user, refresh]);
  const fetchData = async () => {
    setStats(user?.stats ? user?.stats : []);
  };
  const refreshData = () => {
    setRefresh(!refresh);
  };
  return (
    <div className="cardLine">
      {Array.from({ length: 3 }).map((_, i) => {
        let type = stats[i] ?? defaultStats.find((s) => !usedStats.has(s)); // Get a unique stat
        if (type) usedStats.add(type); // Mark stat as used

        return (
          <CardCompo
            key={i}
            id={i}
            type={type}
            refresh={refreshData}
          />
        );
      })}

      {/* <CardCompo
        id={0}
        type={"members"}
        stat={trainees.length}
      />
      <CardCompo
        id={0}
        type={"expired"}
        stat={10}
      />
      <CardCompo
        id={0}
        type={"expiring soon"}
        stat={10}
      /> */}
    </div>
  );
}

export default CardLine;
