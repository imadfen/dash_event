import { Event } from "../types/Event";

type PropsType = {
  event: Event;
};

export default function AdminEventTab({ event }: PropsType) {
  return (
    <div className="flex gap-16">
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
      <div className="max-w-[25%] min-w-[25%]">
        <img src={event.image} alt="" width={350} />
      </div>
    </div>
  );
}
