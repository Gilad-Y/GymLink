import { Route, Routes } from "react-router-dom";
import "./mainRoute.css";
import Dashboard from "../../pages/dashboard/dashboard";
import Page404 from "../../pages/page404/page404";
import LogIn from "../../pages/logIn/logIn";
import Register from "../../pages/register/register";
import Settings from "../../pages/settings/settings";
import TraineePage from "../../traineePage/traineePage";
import PrivateRoute from "../privateRoute/privateRoute";
import CoachPage from "../../pages/coaches/coachPage";
import Calendar from "../../pages/Calendar/Calendar";
import Extensions from "../../pages/extensions/extensions";
import SetPasswordForCoach from "../../pages/setPasswordForCoach/setPasswordForCoach";
import Stats from "../../pages/stats/stats";
import SupportPage from "../../pages/support/supportPage";
import store from "../../../redux/store";

function MainRoute(): React.JSX.Element {
  const user = store.getState().users.user;
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
          path="/traineePage/:id"
          element={
            <PrivateRoute>
              <TraineePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/setPassword/:id"
          element={<SetPasswordForCoach />}
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/coaches"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? <CoachPage /> : <Page404 />}
            </PrivateRoute>
          }
        />
        <Route
          path="/extensions"
          element={
            <PrivateRoute>
              <Extensions />
            </PrivateRoute>
          }
        />

        <Route
          path="/support"
          element={
            <PrivateRoute>
              <SupportPage />
            </PrivateRoute>
          }
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
