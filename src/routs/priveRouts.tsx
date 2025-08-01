import { useContext } from "react";
import NavFree from "./navFree";
import Register from "../pages/register";
import { AppContext } from "../context";

export default function PrivateRoutes() {
    const { logad} = useContext(AppContext);

  return (
    logad ? <NavFree /> : <Register />
  );
}