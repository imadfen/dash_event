import { Event } from "../types/Event";
import { serverUrl } from "./serverUrl";

type ResponseType = {
    ok: boolean;
    data: Event[];
}

export default async function fetchEvents(): Promise<ResponseType> {
    const response = await fetch(`${serverUrl}/events`);

    if (!response.ok)
        return {
            ok: false,
            data: []
        }
    
    const data = await response.json();
    return {
        ok: true,
        data
    }
}