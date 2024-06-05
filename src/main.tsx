import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import CitizenGrid from "./Components/Cidadaos/CitizenGrid";
import AddNewFamily from "./Components/Family/NewFamilyForm";
import AddUserForm from "./Components/Pages/AddUserForm";
import SendAlerts from "./Components/Pages/SendAlerts";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Login />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/familias",
    element: <Dashboard />,
  },
  {
    path: `/familia/:id`,
    element: <CitizenGrid />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/familias/nova",
    element: <AddNewFamily />,
  },
  {
    path: "/addnewuser",
    element: <AddUserForm />,
  },
  {
    path: "/emitiralertas",
    element: <SendAlerts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
