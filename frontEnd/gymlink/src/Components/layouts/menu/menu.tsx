import { CssVarsProvider } from "@mui/joy";
import Sidebar from "./Sidebar";
import "./menu.css";

function Menu(): JSX.Element {
  return (
    <div className="menu">
      <CssVarsProvider>
        <Sidebar />
      </CssVarsProvider>
    </div>
  );
}

export default Menu;
