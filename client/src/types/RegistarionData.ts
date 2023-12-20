export type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isStudent: boolean;
    university?: string;
}

export type RegistrationToEventData = RegistrationData & {eventId: number}