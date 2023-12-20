import { EmailMessage } from "../types/EmailMessage";
import { serverUrl } from "./serverUrl";

export default async function handleSendEmail(email: EmailMessage) {
    const result = await fetch(`${serverUrl}/send_emails`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })

    if (result.ok) return true;

    return false;
}