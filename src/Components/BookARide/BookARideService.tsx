import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AvailableRides= (From:string,To:string,NoOfSeats:any,Date:any) => axios.get('https://localhost:44334/api/ride/'+From+"/"+To+"/"+NoOfSeats+"/"+Date)
.then(respose=>{
    return respose.data;
})

export const UserNames= (userId:string) => axios.get('https://localhost:44334/api/user/' + userId)
.then(respose=>{
    return respose.data.name;
})

export const BookRide=(From:string,To:string,NoOfSeats:number,id:any,index:number,AvailableRides:any)=>axios.post('https://localhost:44334/api/booking/', {
    From: From,
    To: To,
    NoOfPersons: Number(NoOfSeats),
    RideId: id,
    UserId: localStorage.getItem('Id'),
    Price: AvailableRides[index].price,
    Date: AvailableRides[index].date,
    Time: AvailableRides[index].time,
    Status: 0,
    Id: id + localStorage.getItem('Id')
})
    .then(response => {
        toast("Waiting for approval!");
    })
    .catch(error => {
        toast("Unable book this ride")
    })