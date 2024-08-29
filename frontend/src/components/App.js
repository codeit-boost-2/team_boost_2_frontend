import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to="/">
        <img className="logoImg" src="../imgs/logo.svg" alt="logo" />
      </Link>
      <Outlet />
    </>
  );
}

export default App;
