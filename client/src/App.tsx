import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import checkLogin from "./utils/checkLogin";
import logoutUser from "./utils/logoutUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NoPage />}>
      <Route
        path="/"
        element={
          <ClientLayout>
            <Home />
          </ClientLayout>
        }
      />
      <Route path="admin">
        <Route
          index
          element={
            <AdminLayout>
              <Admin />
            </AdminLayout>
          }
          loader={async () => {
            const result = await checkLogin();
            if (!result) {
              return redirect("/admin/login");
            } else {
              return null;
            }
          }}
        />
        <Route
          path="login"
          element={<Login />}
          loader={async () => {
            const result = await checkLogin();
            if (result) {
              return redirect("/admin");
            } else {
              return null;
            }
          }}
        />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

function ClientLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full min-h-screen cursor-default">
      <Navbar isAdmin={false} />
      <div className="py-10 px-20">{props.children}</div>
    </div>
  );
}

function AdminLayout(props: React.PropsWithChildren) {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col w-full min-h-screen relative cursor-default">
      <Navbar isAdmin={true} />
      {props.children}
    </div>
  );
}
