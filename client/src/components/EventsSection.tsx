import { Event } from "../types/Event";
import EventCard from "./EventCard";

type PropsType = {
  events: Event[];
  handleSelect: (event: Event) => void;
};

export default function EventsSection({ events, handleSelect }: PropsType) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Current Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10">
        {events.map((event) => (
          <div
            className="w-full h-full flex place-content-center"
          >
            <div className="w-full cursor-pointer hover:scale-105 duration-300" onClick={() => handleSelect(event)}>
              <EventCard key={event.id} {...event} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
