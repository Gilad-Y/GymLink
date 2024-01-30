import MainRoute from "../../routes/mainRoute/mainRoute";
import Header from "../header/header";
import "./mainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="mainLayout">
      <header>
        <Header />
      </header>
      <main>
        <MainRoute />
      </main>
    </div>
  );
}

export default MainLayout;
