import { Route, Routes, useNavigate } from "react-router-dom";
import "./mainRoute.css";
import Dashboard from "../../pages/dashboard/dashboard";
import Page404 from "../../pages/page404/page404";
import LogIn from "../../pages/logIn/logIn";
import Register from "../../pages/register/register";
import store from "../../../redux/store";
import { useEffect, useState } from "react";
import Settings from "../../pages/settings/settings";
import AddTrainee from "../../pages/addData/addTrainee/addTrainee";
import TraineePage from "../../traineePage/traineePage";
import PrivateRoute from "../privateRoute/privateRoute";
import AddCoach from "../../pages/coaches/addCoach/addCoach";
import CoachTable from "../../pages/coaches/coachTable/coachTable";

function MainRoute(): React.JSX.Element {
  const nav = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const user = store.getState().users.user;
      if (user && user._id) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Initial check
    const user = store.getState().users.user;
    if (user && user._id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !["/login", "/register"].includes(window.location.pathname)
    ) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  return (
    <div className="mainRoute">
      <Routes>
        <Route
          path="/login"
          element={<LogIn />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addClient/:id"
          element={
            <PrivateRoute>
              <AddTrainee />
            </PrivateRoute>
          }
        />
        <Route
          path="/traineePage/:id"
          element={
            <PrivateRoute>
              <TraineePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/coaches"
          element={<CoachTable />}
        />
        <Route
          path="/addCoach"
          element={<AddCoach id={store.getState().users.user?._id || "fes"} />}
        />
        <Route
          path="*"
          element={<Page404 />}
        />
      </Routes>
    </div>
  );
}

export default MainRoute;
