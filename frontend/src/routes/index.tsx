import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthLayout from "@Components/common/AuthLayout"
import Dashboard from "@/pages/Dashboard"
import Templates from "@/pages/Templates/Templates"
import Documents from "@/pages/Document/Documents"
<<<<<<< HEAD
=======
import CreateABC from "@/pages/ABC/create"
import UpdateABC from "@/pages/ABC/up"
>>>>>>> af6a519f0b71d85cb0a3a5b0b6956e181585db9a

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