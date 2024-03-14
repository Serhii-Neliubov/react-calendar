import {IRoute} from "../models/IRoute.ts";
import {Login} from "../pages/Login.tsx";
import {Register} from "../pages/Register.tsx";
import {Home} from "../pages/Home.tsx";

export const noAuth: IRoute[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Register',
    component: Register,
  },
];

export const authRoutes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];