import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import Search from "../components/UI/Search/Search";
import NavBar from "../components/UI/NavBar/NavBar";

const Header = ({links}) => {

  const navigate = useNavigate();
  const routes = [
    { path: "/", label: "Home" },
    { path: "/", label: "News" },
    { path: "/", label: "Contacts" },
  ];

  return (
    <header>
      <div className="container">
        <a href="/">
          <img alt="muir" style={{height: "50px"}} src="/images/Logo.svg"></img>
        </a>
        <NavBar links={routes} />

        <Search name="search" type="text" placeholder="Search"/>

        <Button name="login" onClick={() => navigate("/login")}>Log in</Button>
      </div>
    </header>
  );
};

export default Header;
