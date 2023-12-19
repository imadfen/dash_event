import dashIcon from "../assets/dash_icon.png"

type PropsType = {
  isAdmin: boolean
}

export default function Navbar({isAdmin}: PropsType) {
  return (
    <div className="w-full p-5 bg-white flex items-center gap-5 shadow-md">
      <img src={dashIcon} alt="Logo" width={45} height={45} />
      <h1 className="rubik-font text-3xl font-black text-primary">{isAdmin ? "Dashboard" : "Dash Event"}</h1>
    </div>
  );
}
