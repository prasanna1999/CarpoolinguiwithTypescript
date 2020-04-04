import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddVehicle=(userId:string|null,VehicleModel:string,VehicleNumber:string)=>axios.post('https://localhost:44334/api/vehicle/',
                {
                    Id: userId + VehicleModel,
                    Model: VehicleModel,
                    CarNumber: VehicleNumber,
                    UserId: userId
                })
                .catch(error => {
                    toast("Unable to add ride!");
                })

export const AddRide = (userId:string|any,From:string,To:string,VehicleModel:string,NoOfSeats:number,Price:string,date:any,formatteddate:any)=>axios.post('https://localhost:44334/api/ride/',
{
    UserId: userId,
    From: From,
    To: To,
    type: 2,
    VehicleId: userId + VehicleModel,
    Id: userId + From + To + formatteddate,
    Distance: 10,
    NoOfVacentSeats: Number(NoOfSeats),
    Price: Number(Price),
    Date: date,
    Time: date,
    EndDate: date
})
.catch(error => {
    toast("Unable to add ride!");
})

export const AddLocations=(userId:string|null,From:string,To:string,formattedDate:any,location:any)=>axios.post('https://localhost:44334/api/location/',
{
    RideId: userId + From + To + formattedDate,
    LocationName: location,
    Distance: 5,
    Id: userId + From + To + formattedDate + location
})
.then(response => {
    toast("Ride Added SuccessFully!");
})
.catch(error => {
    toast("Unable to add ride!");
})