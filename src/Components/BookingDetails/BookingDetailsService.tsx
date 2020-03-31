import axios from 'axios';
export const BookingData=(id:string)=>axios.get('https://localhost:44334/api/booking/' + id)
            .then(response => {
                if (response.data.status == 0 && new Date(response.data.date) < new Date()) {
                    axios.put('https://localhost:44334/api/booking/' + response.data.id, {
                        Status: 2,
                        NoOfVacentSeats: response.data.noOfSeats
                    })
                    response.data.status = 2;
                }
                return response.data
            })
            .catch(error => {
                console.log("Cannot get data");
            })
export const CancelBooking=(Booking:any)=>{
    axios.put('https://localhost:44334/api/booking/' + Booking.id, {
            Status: 3,
            NoOfVacentSeats: Booking.noOfSeats
        })
            .then(response => {
                // this.componentDidMount()
            })
            .catch(error => {
                console.log("Unable to cancel Booking");
            })
}