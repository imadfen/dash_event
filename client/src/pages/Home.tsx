import { useEffect, useState } from "react";
import EventsSection from "../components/EventsSection";
import { RegistrationData } from "../types/RegistarionData";
import { Event } from "../types/Event";
import RegisterSection from "../components/RegisterSection";
import RegisterSuccessScreen from "../components/RegisterSuccessScreen";
import fetchEvents from "../utils/fetchEvents";
import { Icon } from "@iconify/react/dist/iconify.js";
import handleRegistration from "../utils/handleRegistration";
import RegisterFailScreen from "../components/RegisterFailScreen";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorLoadingEvents, setErrorLoadingEvents] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  useEffect(() => {
    fetchEvents().then((response) => {
      setEvents(response.data);
      setLoadingEvents(false);
      setErrorLoadingEvents(!response.ok);
    });
  }, []);

  const handleSubmit = async (data: RegistrationData) => {
    if (!selectedEvent) return false;

    setLoadingRegistration(true);

    const registerToEventData = { eventId: selectedEvent.id, ...data };
    const result = await handleRegistration(registerToEventData);

    if (result) {
      setIsSubmitted(true);
    } else {
      setErrorRegister(true);
    }

    setSelectedEvent(null);
    setLoadingRegistration(false);
  };

  const unselectEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-full">
      {loadingRegistration && (
        <div className="bg-white bg-opacity-50 w-screen h-full z-50 fixed top-0 left-0"></div>
      )}
      {errorLoadingEvents ? (
        <h1 className="text-2xl font-bold text-error text-center">
          Error while fetching data
        </h1>
      ) : errorRegister ? (
        <RegisterFailScreen goHome={() => setErrorRegister(false)} />
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
