import { serverUrl } from "./serverUrl";

type FormData = {
    username: string;
    password: string;
};

export default async function LoginUser({ username, password}: FormData) {
    try {
        const response = await fetch(
            `${serverUrl}/get_token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );

        if (!response.ok) {
            if (response.status === 401)
                throw new Error("invalid username or password");
            else
                throw new Error("something went wrong");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return { success: true, message: "logged in" }
    } catch (err: any) {
        return { success: true, message: err.message as string }
    }
}