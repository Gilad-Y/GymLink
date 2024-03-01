import "./traineeTable.css";
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import NoTrainees from "../noTrainees/noTrainees";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Trainee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  card: number;
  cardLeft: number;
  days_until_end: number;
}

interface Props {
  id: number;
}

function TraineeTable(props: Props): JSX.Element {
  const [trainees, setTrainees] = React.useState<Trainee[]>([]);
  const nav = useNavigate();

  React.useEffect(() => {
    props.id &&
      axios
        .get(`http://localhost:4000/api/v1/user/getAllById/${props.id}`)
        .then((res) => {
          const data = res.data as Trainee[];
          console.log(data);
          // Group trainees by their ID
          const traineeMap = new Map<number, Trainee>();
          data.forEach((trainee) => {
            const existingTrainee = traineeMap.get(trainee.id);
            if (existingTrainee) {
              // If trainee with same ID exists, update card, cardLeft, and prioritize days_until_end from the ending date
              existingTrainee.card += trainee.card;
              existingTrainee.cardLeft += trainee.cardLeft;
              if (
                trainee.days_until_end !== null &&
                (existingTrainee.days_until_end === null ||
                  trainee.days_until_end < existingTrainee.days_until_end)
              ) {
                existingTrainee.days_until_end = trainee.days_until_end;
              }
            } else {
              // Otherwise, add trainee to the map
              traineeMap.set(trainee.id, trainee);
            }
          });
          // Convert map values back to array
          const mergedTrainees = Array.from(traineeMap.values());
          console.log(mergedTrainees);
          setTrainees(mergedTrainees);
        })
        .catch((error) => {
          console.error("Error fetching trainees:", error);
        });
  }, [props.id]);

  return (
    <div className="traineeTable">
      {trainees.length > 0 ? (
        <>
          <h1>רשימת מתאמנים</h1>{" "}
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th>שם</th>
                  <th>מייל</th>
                  <th> טלפון</th>
                  <th>כרטיס</th>
                  <th>כרטיס נותר</th>
                  <th>ימים עד לסיום</th>
                  <th>הערות מערכת</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => (
                  <tr
                    key={trainee.id}
                    onClick={() => {
                      nav(`traineePage/${trainee.id}`);
                    }}
                  >
                    <td>{`${trainee.firstName} ${trainee.lastName}`}</td>
                    <td>{trainee.email}</td>
                    <td>{trainee.phone}</td>
                    <td>{trainee.card}</td>
                    <td>{trainee.cardLeft}</td>
                    <td>
                      {trainee.days_until_end >= 0 && trainee.days_until_end}
                    </td>
                    <td>
                      <div>
                        <div style={{ color: "red" }}>
                          {trainee.cardLeft <= 2 &&
                            trainee.cardLeft != null &&
                            `נותרו ${trainee.cardLeft} אימונים`}
                        </div>
                        <div style={{ color: "red" }}>
                          {trainee.days_until_end <= 7 &&
                            trainee.days_until_end > 0 &&
                            trainee.days_until_end != null &&
                            `נותרו ${trainee.days_until_end} ימים לליווי`}
                        </div>
                        <div style={{ color: "red" }}>
                          {trainee.days_until_end === 0 &&
                            trainee.days_until_end != null &&
                            `הליווי נגמר היום!`}
                        </div>
                        <div style={{ color: "red" }}>
                          {trainee.days_until_end < 0 &&
                            trainee.days_until_end != null &&
                            `תקופת ליווי נגמרה`}
                        </div>
                        <div style={{ color: "red" }}>
                          {trainee.days_until_end === null &&
                            trainee.card === null &&
                            `יש לעדכן כרטיסייה או פרטי ליווי`}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <br />
        </>
      ) : (
        <NoTrainees />
      )}
    </div>
  );
}

export default TraineeTable;
