import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RideData, BookingData } from '../Contracts/BookARideContract';

export const AvailableRides = (RideData: RideData) => axios.get('https://localhost:44334/api/ride/' + RideData.From + "/" + RideData.To + "/" + RideData.NoOfSeats + "/" + RideData.Date)
    .then(respose => {
        return respose.data;
    })

export const UserNames = (userId: string) => axios.get('https://localhost:44334/api/user/' + userId)
    .then(respose => {
        return respose.data.name;
    })

export const BookRide = (BookingData:BookingData) => axios.post('https://localhost:44334/api/booking/', {
    From:BookingData.From,
    To: BookingData.To,
    NoOfPersons: Number(BookingData.NoOfSeats),
    RideId: BookingData.id,
    UserId: localStorage.getItem('Id'),
    Price: BookingData.AvailableRides[BookingData.index].price,
    Date: BookingData.AvailableRides[BookingData.index].date,
    Time: BookingData.AvailableRides[BookingData.index].time,
    Status: 0,
    Id: BookingData.id + localStorage.getItem('Id')
})
    .then(response => {
        toast("Waiting for approval!");
    })
    .catch(error => {
        toast("Unable book this ride")
    })