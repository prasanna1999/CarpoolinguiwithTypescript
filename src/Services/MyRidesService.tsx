import axios from 'axios';

export const Rides=()=>axios.get('https://localhost:44334/api/ride/userRides/' + localStorage.getItem('Id'))
.then(response => {
    return response.data;
})
.catch(error => {
})

export const Bookings=()=>axios.get('https://localhost:44334/api/booking/userBookings/' + localStorage.getItem('Id'))
.then(response => {
    return response.data;
})

export const UserId=(rideId:any)=>axios.get('https://localhost:44334/api/ride/' + rideId)
.then(response => {return response.data.userId})

export const UserName=(userId:any)=>axios.get('https://localhost:44334/api/user/' + userId)
.then(response => {
    return response.data.name
})