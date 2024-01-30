import AccountButton from "./accountButton/accountButton";
import "./header.css";
import LangAndNot from "./langAndNot/langAndNot";

function Header(): JSX.Element {
  return (
    <div className="header">
      GymLink
      <div className="headerButtons">
        <AccountButton />
        <LangAndNot />
      </div>
    </div>
  );
}

export default Header;
