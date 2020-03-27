import React from 'react';
import logo from 'D:/carpoolingui/src/Images/logo.png';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import 'office-ui-fabric-react';
import { DocumentCard } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './MyRides.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyRides extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = { Rides: [], Bookings: [], userName: [] };
    }
    componentDidMount() {
        console.log('Hello');
        axios.get('https://localhost:44334/api/ride/userRides/' + localStorage.getItem('Id'))
            .then(response => {
                console.log('Hello Response');
                this.setState({ Rides: response.data },()=>{
                    console.log('Hello Response inside callback');
                })
                console.log('Hello Response after setstate');
            })
            .catch(error => {
                this.setState({ Rides: [] })
            })
        axios.get('https://localhost:44334/api/booking/userBookings/' + localStorage.getItem('Id'))
            .then(response => {
                this.setState({ Bookings: response.data })
                let users;
                this.state.Bookings.forEach(function (booking:any) {
                    console.log(booking)
                    let userId;
                    axios.get('https://localhost:44334/api/ride/' + booking.rideId)
                        .then(response => {
                            console.log(response.data)
                            userId = response.data.userId
                            axios.get('https://localhost:44334/api/user/' + userId)
                                .then(response => {
                                    console.log(response.data)
                                    // this.setState({ userName: this.state.userName.concat(response.data.name) })
                                })
                        })
                }, this);
            })
            .catch(error => {
                this.setState({ Bookings: [] })
            })
            console.log('Hello Something');
    }
    index = 0
    render() {
        return (
            <div className="ms-Grid myRides" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl6 ms-xxl6">
                        <div className="bookedRidesTitle"> Booked Rides</div>
                        {this.state.Bookings.length > 0 ? "" : <div className="heading">You have not booked any ride yet.</div>}
                        <div className="hidedisplay">{this.index = 0}</div>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                {this.state.Bookings.map((booking:any) =>
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10 ms-xxl6 ms-xxxl6">
                                        <DocumentCard className="cards">
                                            <div className="ms-Grid" dir="ltr">
                                                <div className="ms-Grid-row details">
                                                    <div className="ms-Grid-col ms-sm8">
                                                        <div className="name">{this.state.userName[this.index]}</div>
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm4">
                                                        <img src={logo} />
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm12 ms-md6">
                                                        <div className="names">
                                                            From
                                                        </div>
                                                        <div className="values">
                                                            {booking.from}
                                                        </div>
                                                        <div className="names">
                                                            Date
                                                        </div>
                                                        <div className="values">
                                                            {booking.date.slice(0, 10)}
                                                        </div>
                                                        <div className="names">
                                                            Price
                                                        </div>
                                                        <div className="values">
                                                            {booking.price}
                                                        </div>
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm12 ms-md6">
                                                        <div className="names">
                                                            To
                                                        </div>
                                                        <div className="values">
                                                            {booking.to}
                                                        </div>
                                                        <div className="names">
                                                            Time
                                                        </div>
                                                        <div className="values">
                                                            {booking.date.slice(11, )}
                                                        </div>
                                                        <div className="names">
                                                        </div>
                                                        <div className="values">
                                                            <Link to={"/ui/bookedRide/" + booking.id}><input type="button" value="View Details" className="button" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidedisplay">{this.index++}</div>
                                        </DocumentCard>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6">
                        <div className="offeredRidesTitle"> Offered Rides</div>
                        {this.state.Rides.length > 0 ? "" : <div className="heading">You have not offered any ride yet.</div>}
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                {this.state.Rides.map((ride:any) =>
                                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10 ms-xxl6 ms-xxxl6">
                                        <DocumentCard className="cards">
                                            <div className="ms-Grid" dir="ltr">
                                                <div className="ms-Grid-row details">
                                                    <div className="ms-Grid-col ms-sm12 ms-md6">
                                                        <div className="names">
                                                            From
                                                        </div>
                                                        <div className="values">
                                                            {ride.from}
                                                        </div>
                                                        <div className="names">
                                                            Date
                                                        </div>
                                                        <div className="values">
                                                            {ride.date.slice(0, 10)}
                                                        </div>
                                                        <div className="names">
                                                            Price
                                                        </div>
                                                        <div className="values">
                                                            {ride.price}
                                                        </div>
                                                    </div>
                                                    <div className="ms-Grid-col ms-sm12 ms-md6">
                                                        <div className="names">
                                                            To
                                                        </div>
                                                        <div className="values">
                                                            {ride.to}
                                                        </div>
                                                        <div className="names">
                                                            Time
                                                        </div>
                                                        <div className="values">
                                                            {ride.date.slice(11, )}
                                                        </div>
                                                        <div className="names">
                                                        </div>
                                                        <div className="values">
                                                            <Link to={"/ui/offeredRide/" + ride.id}><input type="button" value="View Details" className="button" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DocumentCard>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyRides;