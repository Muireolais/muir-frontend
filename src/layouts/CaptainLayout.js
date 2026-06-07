import { Outlet } from "react-router-dom";
import Header from "../pages/Header";

const CaptainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default CaptainLayout;