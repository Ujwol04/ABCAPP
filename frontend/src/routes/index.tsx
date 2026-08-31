import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthLayout from "@Components/common/AuthLayout"
import RequireAuth from "@Components/common/RequireAuth"
import Login from "@/pages/Login/Login"
import Dashboard from "@/pages/Dashboard"
import Templates from "@/pages/Templates/Templates"
import EditTemplate from "@/pages/Templates/EditTemplate"
import Documents from "@/pages/Document/Documents"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "templates", element: <Templates /> },
          { path: "templates/:id/edit", element: <EditTemplate /> },
          { path: "documents", element: <Documents /> },
        ],
      },
    ],
  },
])