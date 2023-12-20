import { Participant } from "../types/Pariticipant";
import { serverUrl } from "./serverUrl";

type ResponseType = {
    ok: boolean;
    data: Participant[];
}


export default async function fetchParticipants(): Promise<ResponseType> {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;

    const response = await fetch(`${serverUrl}/participants`, {
        headers: {
            Authorization
        }
    });

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