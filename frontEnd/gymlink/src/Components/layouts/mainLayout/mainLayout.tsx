import { CssVarsProvider } from "@mui/joy";
import MainRoute from "../../routes/mainRoute/mainRoute";
import Header from "../header/header";
import Sidebar from "../menu/Sidebar";
import Menu from "../menu/menu";
import "./mainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="mainLayout">
      {/* <header>
        <Header />
      </header> */}
      <menu className="menu">
        <Menu />
      </menu>
      <main>
        <MainRoute />
      </main>
    </div>
  );
}

export default MainLayout;
