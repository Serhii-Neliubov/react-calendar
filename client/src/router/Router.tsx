import {
  createBrowserRouter,
} from "react-router-dom";

import { Login } from "../pages/Login.tsx";
import { Register } from "../pages/Register.tsx";
import { Home } from "../pages/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login  setIsAuth={() => false}/>,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);
