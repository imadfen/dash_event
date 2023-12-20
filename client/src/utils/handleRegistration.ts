import { RegistrationToEventData } from "../types/RegistarionData";
import { serverUrl } from "./serverUrl";

export default async function handleRegistration(data: RegistrationToEventData) {
    console.log(data);

    const response = await fetch(`${serverUrl}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.ok
}