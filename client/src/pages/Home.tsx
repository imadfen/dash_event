import { useState } from "react";
import EventsSection from "../components/EventsSection";
import { RegistarionData } from "../types/RegistarionData";
import { Event } from "../types/Event";
import ExampleEventData from "../utils/ExampleEventData";
import RegisterSection from "../components/RegisterSection";
import RegisterSuccessScreen from "../components/RegisterSuccessScreen";

const events = ExampleEventData;

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (data: RegistarionData) => {
    // I should send it to server but there is a lack of time 😅

    setSelectedEvent(null);
    setIsSubmitted(true);
  };

  const unselectEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      {isSubmitted ? (
        <RegisterSuccessScreen goHome={() => setIsSubmitted(false)} />
      ) : selectedEvent ? (
        <RegisterSection
          event={selectedEvent}
          onSubmit={handleSubmit}
          unselectEvent={unselectEvent}
        />
      ) : (
        <EventsSection events={events} handleSelect={setSelectedEvent} />
      )}
    </div>
  );
}
