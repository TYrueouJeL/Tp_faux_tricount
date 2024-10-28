import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Home from "./routes/Home.jsx";
import Event, { loader as eventLoader } from "./routes/Event.jsx";
import AddUserPage from "./routes/AddUserPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/event/:slug',
                element: <Event />,
                loader: eventLoader,
            },
            {
                path: '/adduser/:slug',
                element: <AddUserPage />,
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
