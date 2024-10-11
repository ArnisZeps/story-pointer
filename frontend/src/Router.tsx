import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Session from "./components/pages/Session";
import SessionCreatePage from "./components/pages/SessionCreatePage";
import Canvas from "./components/pages/canvas";
const routes = createBrowserRouter([
  {
    path: "/:sessionId",
    element: <Session />,
  },
  {
    path: "/create",
    element: <SessionCreatePage />,
  },
  {
    path: "/",
    element: <Canvas className="123" />,
  },
]);

const Router: FC = () => {
    return <RouterProvider router={routes} />
}

export default Router;
