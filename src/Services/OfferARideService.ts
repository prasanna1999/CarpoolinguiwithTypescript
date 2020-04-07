import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Vehicle, Ride, Location } from '../Contracts/BookARideContract';

export const AddVehicle = (Vehicle:Vehicle) => axios.post('https://localhost:44334/api/vehicle/',
    {
        Id: Vehicle.userId + Vehicle.VehicleModel,
        Model: Vehicle.VehicleModel,
        CarNumber: Vehicle.VehicleNumber,
        UserId: Vehicle.userId
    })
    .catch(error => {
        toast("Unable to add ride!");
    })

export const AddRide = (Ride:Ride) => axios.post('https://localhost:44334/api/ride/',
    {
        UserId: Ride.userId,
        From: Ride.From,
        To: Ride.To,
        type: 2,
        VehicleId: Ride.userId + Ride.VehicleModel,
        Id: Ride.userId + Ride.From + Ride.To + Ride.formatteddate,
        Distance: 10,
        NoOfVacentSeats: Number(Ride.NoOfSeats),
        Price: Number(Ride.Price),
        Date: Ride.date,
        Time: Ride.date,
        EndDate: Ride.date
    })
    .catch(error => {
        toast("Unable to add ride!");
    })

export const AddLocations = (Location:Location) => axios.post('https://localhost:44334/api/location/',
    {
        RideId: Location.userId + Location.From + Location.To + Location.formattedDate,
        LocationName: location,
        Distance: 5,
        Id: Location.userId + Location.From + Location.To + Location.formattedDate + location
    })
    .then(response => {
        toast("Ride Added SuccessFully!");
    })
    .catch(error => {
        toast("Unable to add ride!");
    })