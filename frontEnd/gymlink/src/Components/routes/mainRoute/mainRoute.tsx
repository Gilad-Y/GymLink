import { Route, Routes, useNavigate } from "react-router-dom";
import "./mainRoute.css";
import Dashboard from "../../pages/dashboard/dashboard";
import Page404 from "../../pages/page404/page404";
import LogIn from "../../pages/logIn/logIn";
import store from "../../../redux/store";
import { useEffect } from "react";
import Payments from "../../pages/addData/payments/payments";
import AddWeights from "../../pages/addData/addWeights/addWeights";
import AddMission from "../../pages/addData/addMission/addMission";
import AddProgram from "../../pages/addData/addProgram/addProgram";
import AddTrainee from "../../pages/addData/addTrainee/addTrainee";

function MainRoute(): JSX.Element {
  const nav = useNavigate();
  useEffect(() => {
    !store.getState().users.user[0]?.id && nav("/login");
  }, []);
  store.subscribe(() => {
    !store.getState().users.user[0]?.id && nav("/login");
  });
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/update/payments/:id" element={<Payments />} />
        <Route path="/update/weight/:id" element={<AddWeights />} />
        <Route path="/update/missions/:id" element={<AddMission />} />
        <Route path="/update/program/:id" element={<AddProgram />} />
        <Route path="/update/newTrainee/:id" element={<AddTrainee />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
