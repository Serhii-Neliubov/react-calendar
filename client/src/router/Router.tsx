import {
  createBrowserRouter,
} from "react-router-dom";

import { Home } from "../pages/Home.tsx";
import { Login } from "../pages/Login.tsx";
import {Register} from "../pages/Register.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);
