export interface CreateClientRequest {
    name: string;
    email: string;
    phoneNumber: string;
    vehicle: {
        model: string;
        color: string;
        plate: string;
        year: string;
        scheduledDate: Date;
    };
}
