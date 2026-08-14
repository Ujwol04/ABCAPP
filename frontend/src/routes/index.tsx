import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthLayout from "@Components/common/AuthLayout"
import Dashboard from "@/pages/Dashboard"
import Templates from "@/pages/Templates/Templates"
import Documents from "@/pages/Document/Documents"
import CreateABC from "@/pages/ABC/create"
import UpdateABC from "@/pages/ABC/up"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "templates", element: <Templates /> },
      { path: "documents", element: <Documents /> },
    ],
  },
])