import AccountButton from "./accountButton/accountButton";
import "./header.css";
import LangAndNot from "./langAndNot/langAndNot";

function Header(): JSX.Element {
  return (
    <div className="header">
      <h1 className="logo" style={{ marginTop: "-1px" }}>
        GymLink
      </h1>
      <div className="headerButtons">
        <LangAndNot />
        <AccountButton />
      </div>
    </div>
  );
}

export default Header;
