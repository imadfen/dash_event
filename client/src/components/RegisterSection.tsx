import { Event } from "../types/Event";
import { RegistrationData } from "../types/RegistarionData";
import RegisterForm from "./RegisterForm";
import { Icon } from "@iconify/react";
import dash from "../assets/dash.png";

type PropsType = {
  event: Event;
  onSubmit: (data: RegistrationData) => void;
  unselectEvent: () => void;
};

export default function RegisterSection({
  event,
  onSubmit,
  unselectEvent,
}: PropsType) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20">
      <div className="w-full h-full p-6 bg-gray-100 shadow-md z-10">
        <div className="w-full h-full flex flex-col bg-gray-100 bg-opacity-50 relative">
          <button
            onClick={unselectEvent}
            className="my-3 w-fit flex items-center gap-2"
          >
            <Icon icon="mingcute:arrow-left-fill" width={30} />
            <p className="text-lg font-bold">Back</p>
          </button>
          <div className="flex items-center gap-4">
            <img src={event.image} alt="" width={150} />
            <h1 className="text-4xl font-black text-wrap">{event.name}</h1>
          </div>
          <h2 className="text-2xl font-bold mt-5">About the event</h2>
          <p>{event.description}</p>
          <h2 className="text-2xl font-bold mt-5">When</h2>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <h2 className="text-2xl font-bold mt-5">Where</h2>
          <p>{event.location}</p>
          <img src={dash} alt="" width={150} className="absolute bottom-1 right-1 -z-10" />
        </div>
      </div>

      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
}
