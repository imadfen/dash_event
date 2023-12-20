import { useState } from "react";
import AdminEmailTab from "./AdminEmailTab";
import AdminParticipantsTab from "./AdminParticipantsTab";
import Tabs from "./Tabs";
import AdminEventTab from "./AdminEventTab";
import { Event } from "../types/Event";
import { Participant } from "../types/Pariticipant";

type PropsType = {
    selectedEvent: Event;
    participants: Participant[];
}

export default function DashboardSection({selectedEvent, participants}: PropsType) {
  const [activeTab, setActiveTab] = useState("Event");

  return (
    <div className="flex-grow min-h-full flex flex-col items-center bg-white">
      <Tabs selectedTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full h-full px-10 py-4">
        <div style={{ display: activeTab === "Event" ? "block" : "none" }}>
          <AdminEventTab event={selectedEvent} />
        </div>
        <div
          style={{ display: activeTab === "Participants" ? "block" : "none" }}
        >
          <AdminParticipantsTab participants={participants.filter(part => part.eventId === selectedEvent.id)} />
        </div>
        <div style={{ display: activeTab === "Email" ? "block" : "none" }}>
          <AdminEmailTab selectedEvent={selectedEvent} />
        </div>
      </div>
    </div>
  );
}
