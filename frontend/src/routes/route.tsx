import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@Components/layout/AppLayout"
import Dashboard from "@/views/Dashboard"
import Templates from "@/views/Templates"
import Documents from "@/views/Documents"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "templates", element: <Templates /> },
      { path: "documents", element: <Documents /> },
    ],
  },
])