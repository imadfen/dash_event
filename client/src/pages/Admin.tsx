import { useEffect, useState } from "react";
import EventsSideList from "../components/EventsSideList";
import DashboardSection from "../components/DashboardSection";
import { Event } from "../types/Event";
import { Participant } from "../types/Pariticipant";
import fetchParticipants from "../utils/fetchParticipants";
import fetchEvents from "../utils/fetchEvents";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Admin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchEvents(), fetchParticipants()]).then(
      ([eventsResponse, participantsResponse]) => {
        setEvents(eventsResponse.data);
        setSelectedEvent(eventsResponse.data[0]);
        setParticipants(participantsResponse.data);

        setLoading(false);
        setErrorLoading(!eventsResponse.ok || !participantsResponse.ok);
      }
    );
  }, []);

  return (
    <div className="w-full h-full flex-grow flex items-stretch relative">
      {errorLoading ? (
        <div className="fixed bg-white w-full h-full z-50 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-error text-center">Error while fetching data</h1>
        </div>
      ) : loading ? (
        <div className="fixed bg-white w-full h-full z-50 flex justify-center items-center">
          <Icon icon="eos-icons:loading" width={60} />
        </div>
      ) : (
        <>
          <EventsSideList
            events={events}
            selectedEvent={selectedEvent}
            selectEvent={setSelectedEvent}
          />
          <DashboardSection
            selectedEvent={selectedEvent}
            participants={participants}
          />
        </>
      )}
    </div>
  );
}
