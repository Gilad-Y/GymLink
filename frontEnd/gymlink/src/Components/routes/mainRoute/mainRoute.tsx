import { Route, Routes, useNavigate } from "react-router-dom";
import "./mainRoute.css";
import Dashboard from "../../pages/dashboard/dashboard";
import Page404 from "../../pages/page404/page404";
import LogIn from "../../pages/logIn/logIn";
import store from "../../../redux/store";
import { useEffect } from "react";

function MainRoute(): JSX.Element {
  const nav = useNavigate();
  useEffect(() => {
    !store.getState().users.user[0]?.userId && nav("/login");
  }, []);
  store.subscribe(() => {
    !store.getState().users.user[0]?.userId && nav("/login");
  });
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
