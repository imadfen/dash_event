import { useState } from "react";
import EventsSideList from "../components/EventsSideList";
import ExampleEventData from "../utils/ExampleEventData";
import ExampleParticipants from "../utils/ExampleParticipants";
import DashboardSection from "../components/DashboardSection";
import { Event } from "../types/Event";

export default function Admin() {
  const [selectedEvent, setSelectedEvent] = useState<Event>(ExampleEventData[0])
  
  return (
    <div className="w-full h-full flex-grow flex items-stretch relative">
      <EventsSideList events={ExampleEventData} selectedEvent={selectedEvent} selectEvent={setSelectedEvent} />
      <DashboardSection selectedEvent={selectedEvent} participants={ExampleParticipants} />
    </div>
  );
}
