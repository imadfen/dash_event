import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

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
        />
        <Route
          path="login"
          element={
            <AdminLayout>
              <Login />
            </AdminLayout>
          }
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
      {props.children}
    </div>
  );
}

function AdminLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full min-h-screen cursor-default">
      <Navbar isAdmin={true} />
      {props.children}
    </div>
  );
}
