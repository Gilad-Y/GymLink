import { CssVarsProvider } from "@mui/joy";
import Sidebar from "./Sidebar";
import "./menu.css"; // If you have additional CSS styles, you can apply them here

function Menu(): React.JSX.Element {
  return (
    <div
      className="menu"
      style={{ width: "100%", height: "100%" }}
    >
      <CssVarsProvider>
        <Sidebar />
      </CssVarsProvider>
    </div>
  );
}

export default Menu;
