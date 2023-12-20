export type EmailOptions = {
    subject: string;
    salutation: string;
    useReceiverName: boolean;
    signature: string;
}

export type EmailMessage = {
    eventId: number;
    body: string;
    options: EmailOptions
}