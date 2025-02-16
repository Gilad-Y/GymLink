import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../../models/userModel";

interface Props {
  id: string;
}

export default function TraineeTable(props: Props) {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const nav = useNavigate();

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getAllById/${props.id}`)
      .then((res) => {
        const usersMapped = res.data.map(
          (user: any) =>
            new UserModel(
              user._id,
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.role,
              user.brand,
              user.coaches,
              user.trainees,
              user.belongsTo
            )
        );
        setUsers(usersMapped);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [props.id]);

  return (
    <div>
      <Typography
        level="body-lg"
        sx={{ textAlign: "center", mb: 2 }}
      >
        רשימת לקוחות
      </Typography>
      <Sheet
        sx={(theme) => ({
          "--TableCell-height": "40px",
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          height: 400,
          overflow: "auto",
          whiteSpace: "nowrap",
          background: `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 50% 0,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize: "100% 40px, 100% 40px, 100% 14px, 100% 14px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%",
          backgroundColor: "background.surface",
        })}
      >
        <Table
          stickyHeader
          sx={{
            textAlign: "center",
            "& th, & td": { textAlign: "center" },
          }}
        >
          <thead>
            <tr>
              <th>שם</th>
              <th style={{ width: 200 }}>מייל</th>
              <th>טלפון</th>
              <th>סוג משתמש</th>
              <th>מספר תשלום</th>
              <th>תשלום הושלם</th>
              <th>שיטת תשלום</th>
              <th>התחלה</th>
              <th>סיום</th>
              <th>מחיר</th>
              <th>סטטוס</th>
              <th>הערות</th>
              <th>קוד לקוח</th>
              <th>סוג חבילה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                onDoubleClick={() => nav(`userPage/${user._id}`)}
              >
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td style={{ width: 200 }}>{user.email || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
