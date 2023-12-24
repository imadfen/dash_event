import { useState } from "react";
import { Event } from "../types/Event";
import ConfirmDeleteEventDialog from "./ConfirmDeleteEventDialog";
import { useNavigate } from "react-router-dom";
import handleDeleteEvent from "../utils/handleDeleteEvent";

type PropsType = {
  event: Event;
};

export default function AdminEventTab({ event }: PropsType) {
  const [deleteEventDialog, setDeleteEventDialog] = useState(false);
  const navigate = useNavigate();

  const handleDeleteEventConfirm = (value: boolean) => {
    if (value) {
      handleDeleteEvent(event.id);
      navigate(0);
    } else {
      setDeleteEventDialog(false);
    }
  };

  return (
    <div className="flex gap-16 min-h-full">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold">{event.name}</h1>
        <p className="text-xl my-10 whitespace-break-spaces">
          {event.description}
        </p>
        <div className="my-10">
          <p className="text-lg font-semibold">{event.date}</p>
          <p className="text-lg font-semibold">{event.time}</p>
          <p className="text-lg font-semibold mt-10">{event.location}</p>
        </div>
      </div>
      <div className="max-w-[25%] min-w-[25%] min-h-full flex flex-col">
        <img src={event.image} alt="" width={350} />
        <button
          className="mt-auto w-fit text-white font-bold self-end justify-self-end p-3 rounded-xl bg-red-400 hover:bg-red-500"
          onClick={() => setDeleteEventDialog(true)}
        >
          Delete
        </button>
      </div>
      <ConfirmDeleteEventDialog
        isOpen={deleteEventDialog}
        reponseWith={handleDeleteEventConfirm}
      />
    </div>
  );
}
