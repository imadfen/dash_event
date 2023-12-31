import dashIcon from "../assets/dash_icon.png";
import dashComputers from "../assets/dash_computers.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import logoutUser from "../utils/logoutUser";

type PropsType = {
  isAdmin: boolean;
};

export default function Navbar({ isAdmin }: PropsType) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full px-8 navbar-bg flex shadow-md relative ${
        isAdmin ? "py-2" : "py-8"
      }`}
    >
      {isAdmin ? (
        <>
          <div
            className="flex items-center gap-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={dashIcon} alt="Logo" width={60} />
            <h1 className="rubik-font text-3xl font-black text-primary">
              Dash-board
            </h1>
          </div>
          <div
            className="flex justify-center items-center ml-auto cursor-pointer"
            onClick={() => {
              logoutUser();
              navigate("/admin/login");
            }}
          >
            <Icon icon="mingcute:exit-fill" className="text-4xl text-text" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-5">
            <img src={dashIcon} alt="Logo" width={60} />
            <h1 className="rubik-font text-3xl font-black text-primary">
              Dash Event
            </h1>
          </div>
          <img
            src={dashComputers}
            alt=""
            width={100}
            height={100}
            className="absolute right-10 top-0"
          />
        </>
      )}
    </div>
  );
}
