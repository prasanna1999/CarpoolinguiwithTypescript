export interface RideData {
    From: string;
    To: string;
    NoOfSeats: any;
    Date: any
}

export interface BookingData{
    From: string;
    To: string;
    NoOfSeats: number;
    id: any;
    index: number;
    AvailableRides: any;
}

export interface Vehicle{
    userId: string | null;
    VehicleModel: string;
    VehicleNumber: string;
}

export interface Ride{
    userId: string | any;
    From: string;
    To: string;
    VehicleModel: string;
    NoOfSeats: number;
    Price: string;
    date: any;
    formatteddate: any
}

export interface Location{
    userId: string | null;
    From: string;
    To: string;
    formattedDate: any;
    location: any
}

export interface UserData{
    Name: string;
    Email: string;
    PhoneNumber: string;
}