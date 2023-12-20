import { Icon } from "@iconify/react/dist/iconify.js";
import { Event } from "../types/Event";

type PropsType = {
  events: Event[];
  selectedEvent: Event | null;
  selectEvent: (event: Event) => void;
};

export default function EventsSideList({ events, selectedEvent, selectEvent }: PropsType) {
  return (
    <div className="min-w-[256px] min-h-full bg-gray-100 drop-shadow-lg p-4 overflow-y-auto">
      <div className="flex mb-4 justify-between items-center">
        <h2 className="text-lg font-semibold">Events</h2>
        <Icon icon="mingcute:plus-fill" width={20} className="cursor-pointer" />
      </div>
      <div>
        {events.map((event) => (
          <div
            key={event.id}
            className={`flex items-center mb-3 rounded-lg p-2 duration-100 cursor-pointer ${selectedEvent && selectedEvent.id === event.id ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => selectEvent(event)}
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="text-sm font-bold">{event.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
