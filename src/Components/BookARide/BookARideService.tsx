import React from 'react';
import axios from 'axios';

export const AvailableRides= (From:string,To:string,NoOfSeats:any,Date:any) => axios.get('https://localhost:44334/api/ride/'+From+"/"+To+"/"+NoOfSeats+"/"+Date)
.then(respose=>{
    return respose.data;
})

export const UserNames= (userId:string) => axios.get('https://localhost:44334/api/user/' + userId)
.then(respose=>{
    return respose.data.name;
})