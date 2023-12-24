import { serverUrl } from "./serverUrl";

export default async function handleDeleteEvent(eventId: string) {
    const result = await fetch(`${serverUrl}/delete_event`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(eventId)
    })

    if (result.ok) return true;

    return false;
}