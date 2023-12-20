import { serverUrl } from "./serverUrl";

export default async function checkLogin() {
    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
        const response = await fetch(`${serverUrl}/validate_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })

        return response.ok;
    } catch (error) {
        return false;
    }
}