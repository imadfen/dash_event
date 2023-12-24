import { Event } from "../types/Event";
import { serverUrl } from "./serverUrl";

export default async function handleAddEvent(event: Omit<Event, "id">) {
    const result = await fetch(`${serverUrl}/new_event`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(event)
    })

    if (result.ok) return true;

    return false;
}