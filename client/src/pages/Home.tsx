import { useEffect, useState } from "react";
import EventsSection from "../components/EventsSection";
import { RegistarionData } from "../types/RegistarionData";
import { Event } from "../types/Event";
import RegisterSection from "../components/RegisterSection";
import RegisterSuccessScreen from "../components/RegisterSuccessScreen";
import fetchEvents from "../utils/fetchEvents";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorLoadingEvents, setErrorLoadingEvents] = useState(false);

  useEffect(() => {
    fetchEvents().then((response) => {
      setEvents(response.data);
      setLoadingEvents(false);
      setErrorLoadingEvents(!response.ok);
    });
  }, []);

  const handleSubmit = (data: RegistarionData) => {
    // I should send it to server but there is a lack of time 😅

    setSelectedEvent(null);
    setIsSubmitted(true);
  };

  const unselectEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-full">
      {errorLoadingEvents ? (
        <h1 className="text-2xl font-bold text-error text-center">Error while fetching data</h1>
      ) : isSubmitted ? (
        <RegisterSuccessScreen goHome={() => setIsSubmitted(false)} />
      ) : selectedEvent ? (
        <RegisterSection
          event={selectedEvent}
          onSubmit={handleSubmit}
          unselectEvent={unselectEvent}
        />
      ) : loadingEvents ? (
        <div className="w-full min-h-full flex justify-center items-center ">
          <Icon icon="eos-icons:loading" width={60} />
        </div>
      ) : (
        <EventsSection events={events} handleSelect={setSelectedEvent} />
      )}
    </div>
  );
}
