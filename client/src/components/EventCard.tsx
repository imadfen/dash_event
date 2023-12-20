import { Event } from "../types/Event";

type PropsType = Event;

export default function EventCard({
  name,
  date,
  time,
  image,
}: PropsType) {
  return (
    <div className="w-full h-full flex flex-col rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="text-gray-600 text-sm mt-2 font-semibold">
            <p>{date}</p>
            <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
