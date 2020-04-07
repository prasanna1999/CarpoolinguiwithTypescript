import React from 'react';
import { DocumentCard, Label, TextField } from 'office-ui-fabric-react';
import logo from 'D:/carpoolingui/src/Images/logo.png';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { RideStatus, BookingStatus } from '../Enum';
import { Link } from 'react-router-dom';
import './RideDetails.scss';
import axios from 'axios';

class RideDetails extends React.Component<any, any> {
    id: any;
    constructor(props: any) {
        super(props);
        this.state = { Ride: [], ViaPoints: [], Bookings: [], userName: [] }
    }
    componentDidMount() {
        this.id = this.props.match.params.id;
        axios.get('https://localhost:44334/api/ride/' + this.id)
            .then(response => {
                this.setState({ Ride: response.data })
                if (response.data.status == 0 && new Date(response.data.date) < new Date()) {
                    axios.put('https://localhost:44334/api/ride/' + this.id, {
                        Status: 2,
                        NoOfVacentSeats: response.data.noOfVacentSeats
                    })
                }
                let users;
                this.state.Bookings.forEach(function (booking: any) {
                    let userId;
                    axios.get('https://localhost:44334/api/user/' + booking.userId)
                        .then(response => {
                            // this.setState({ userName: this.state.userName.concat(response.data.name) })
                        })
                }, this);
            })
            .catch(error => {
                this.setState({ Ride: [] })
            })
        axios.get('https://localhost:44334/api/location/' + this.id)
            .then(response => {
                this.setState({ ViaPoints: response.data });
            })
            .catch(error => {
                this.setState({ ViaPoints: [] })
            })
        axios.get('https://localhost:44334/api/booking/rideBookings/' + this.id)
            .then(response => {
                this.setState({ Bookings: response.data });
            })
            .catch(error => {
                this.setState({ Bookings: [] })
            })
    }
    cancelRide = () => {
        axios.put('https://localhost:44334/api/ride/' + this.id, {
            Status: 1,
            NoOfVacentSeats: this.state.Ride.noOfVacentSeats
        })
            .then(response => {
                this.componentDidMount();
            })
        axios.put('https://localhost:44334/api/booking/' + this.id)
    }
    approveBooking(booking: any) {
        axios.put('https://localhost:44334/api/booking/' + booking.id, {
            Status: 1,
            NoOfPersons: booking.noOfPersons
        })
            .then(response => {
                this.componentDidMount();
            })
    }
    rejectBooking(booking: any) {
        axios.put('https://localhost:44334/api/booking/' + booking.id, {
            Status: 2,
            NoOfPersons: booking.noOfPersons
        })
            .then(response => {
                this.componentDidMount();
            })
    }
    index = 0;
    render() {
        return (
            <div className="rideDetails">
                <Link className="backbutton" to="/ui/myrides">My Rides</Link>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl4 ms-xxl3">
                            <DocumentCard className="detailsCard">
                                <Label>From</Label>
                                <TextField name="from" value={this.state.Ride.from} disabled />
                                <Label>To</Label>
                                <TextField name="to" value={this.state.Ride.to} disabled />
                                {this.state.ViaPoints.length > 0 ? <Label>ViaPoints</Label> : ""}
                                {this.state.ViaPoints.map((viaPoint: any) =>
                                    <TextField value={viaPoint.locationName} disabled />
                                )}
                                <Label>Date</Label>
                                <TextField name="date" value={this.state.Ride.date} disabled />
                                <Label>Time</Label>
                                <TextField name="time" value={this.state.Ride.time} disabled />
                                <Label>Status</Label>
                                <TextField name="time" value={RideStatus[this.state.Ride.status]} disabled />
                                {new Date(this.state.Ride.date) > new Date() ? this.state.Ride.status == RideStatus.NotYetStarted ? <input type="button" className="cancelButton" onClick={this.cancelRide} value="Cancel Ride" /> : "" : ""}
                            </DocumentCard>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl8 ms-xxl9">
                            {this.state.Bookings.length > 0 ? <div className="heading">Ride Bookings</div> : <div className="heading">No one booked your ride.</div>}
                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className="hidedisplay">{this.index = 0}</div>
                                    {this.state.Bookings.map((booking: any) =>
                                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl4 ms-xxl4 bookingCard">
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
                                                                {booking.date.slice(11)}
                                                            </div>
                                                            <div className="names">
                                                                No Of Seats
                                                        </div>
                                                            <div className="values">
                                                                {booking.noOfPersons}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <table className="details">
                                                    <tr className="name">
                                                        <td colspan="2">{this.state.userName[this.index++]}</td>
                                                        <td rowspan="2"><img src={logo} /></td>
                                                    </tr>
                                                    <tr className="names">
                                                        <td>From</td>
                                                        <td>To</td>
                                                    </tr>
                                                    <tr className="values">
                                                        <td>
                                                            {booking.from}
                                                            <Icon iconName='StatusCircleInner' className="circleicon" />
                                                            <Icon iconName='StatusCircleInner' className="circle" />
                                                            <Icon iconName='StatusCircleInner' className="circle" />
                                                            <Icon iconName='StatusCircleInner' className="circle" />
                                                            <Icon iconName='StatusCircleInner' className="circle" />
                                                            <Icon iconName='POISolid' className="poiicon" />
                                                        </td><td>{booking.to}</td>
                                                    </tr>
                                                    <tr className="names">
                                                        <td>Date</td><td>Time</td>
                                                    </tr>
                                                    <tr className="values">
                                                        <td>{booking.date.slice(0, 10)}</td><td>{booking.time.slice(11, )}</td>
                                                    </tr>
                                                    <tr className="names">
                                                        <td>Price</td>
                                                        <td>No Of Seats</td>
                                                    </tr>
                                                    <tr className="values">
                                                        <td>{booking.price}</td>
                                                        <td>{booking.noOfPersons}</td>
                                                    </tr>
                                                </table> */}
                                                {booking.status == BookingStatus.Pending ?
                                                    new Date(booking.date) > new Date() ?
                                                        <div className="buttons"><input type="button" className="approveButton" value="Approve Booking" onClick={this.approveBooking.bind(this, booking)} />
                                                            <input type="button" className="rejectButton" value="Reject Booking" onClick={this.rejectBooking.bind(this, booking)} />
                                                        </div>
                                                        :
                                                        <div><tr className="names">Status</tr><tr className="values">Rejected</tr></div>
                                                    : <div><tr className="names">Status</tr><tr className="values">{BookingStatus[booking.status]}</tr></div>
                                                }
                                                <div className="hidedisplay">{this.index++}</div>
                                            </DocumentCard>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RideDetails;