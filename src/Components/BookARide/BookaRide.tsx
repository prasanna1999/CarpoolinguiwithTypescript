import React from 'react';
import './BookARide.scss';
import { DocumentCard, DatePicker, Toggle } from 'office-ui-fabric-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from 'D:/carpoolingui/src/Images/logo.png';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { toast } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';
import {AvailableRides,UserNames,BookRide} from './BookARideService';

class BookARide extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            isSubmitClicked: false, isValid: true,
            From: null, To: null, NoOfSeats: null, Date: null, Time: null,
            AvailableRides: [],
            errors: { From: 'e', To: 'e', NoOfSeats: 'e', Date: 'e', Time: 'e' },
            userName: []
        }
    }

    handleToggle = () => {
        this.props.history.push("/ui/offeraride");
    }

    setClass(e:any) {
        if (e.target.innerText == null)
            this.state.errors.Time = "Please select atleast one";
        else {
            this.state.errors.Time = "";
            let time;
            switch (e.target.innerText) {
                case '5am - 9am':
                    time = '05:00:00'
                    break;
                case '9am - 12pm':
                    time = '09:00:00'
                    break;
                case '12pm - 3pm':
                    time = '12:00:00'
                    break;
                case '3pm - 6pm':
                    time = '15:00:00'
                    break;
                case '6pm - 9pm':
                    time = '18:00:00'
                    break;
                default:
                    time = '00:00:00'
                    break;
            }
            this.setState({ id: e.target.id, Time: time });
        }
    }

    validateForm = (errors:any) => {
        let valid = true;
        Object.values(errors).forEach(
            (val:any) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    async showMatchedBooking() {
        if (!this.validateForm(this.state.errors)) {
            this.setState({ isValid: false });
        }
        else {
            this.setState({ isValid: true });
            this.setState({ isSubmitClicked: true });
            let date = this._onFormatDate(this.state.Date) + "T" + this.state.Time;
            // axios.get('https://localhost:44334/api/ride/' + this.state.From + "/" + this.state.To + "/" + this.state.NoOfSeats + "/" + date)
            //     .then(response => {
            //         this.setState({ AvailableRides: response.data })
            //         let users;
            //         this.state.AvailableRides.forEach(function (ride:any) {
            //             let userId;
            //             axios.get('https://localhost:44334/api/user/' + ride.userId)
            //                 .then(response => {
            //                     // this.setState({ userName: this.state.userName.concat(response.data.name) })
            //                 })
            //         }, this);
            //     })
            //     .catch(error => {
            //         this.setState({ AvailableRide: "" })
            //     })
            this.setState({ AvailableRides: await AvailableRides(this.state.From,this.state.To,this.state.NoOfSeats,date) })
            this.state.AvailableRides.forEach(async function (ride:any) {
                this.setState({ userName:this.state.userName.concat(await UserNames(ride.userId)) })
            })
        }
    }

    handleDate = (event:any) => {
        let date = new Date();
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        if (event < date)
            this.state.errors.Date = "Please select valid date";
        else
            this.state.errors.Date = ""
        this.setState({ Date: event });
    }
    handleChange = (event:any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'From':
                errors.From =
                    value.length < 2
                        ? 'Please enter minimum 2 letters'
                        : '';
                break;
            case 'To':
                errors.To =
                    value.length < 2
                        ? 'Please enter minimum 2 letters'
                        : '';
                break;
            case 'NoOfSeats':
                errors.NoOfSeats =
                    value <= 0 || value > 3
                        ? 'Please enter number in between 1 and 3'
                        : '';
                break;
        }
        this.setState({ errors, [name]: value });
        this.setState({ [name]: event.target.value });
    }
    _onFormatDate = (date:any) => {
        let month, day;
        if (date.getMonth() + 1 < 10)
            month = '0' + (date.getMonth() + 1);
        else
            month = date.getMonth() + 1;
        if (date.getDate() < 10)
            day = '0' + date.getDate();
        else
            day = date.getDate();
        return (date.getFullYear()) + '-' + (month) + '-' + (day);
    };

    handleBooking = async (id:any) => {
        let index = this.state.AvailableRides.findIndex((x: { id: any; }) => x.id == id);
        await BookRide(this.state.From,this.state.To,this.state.NoOfSeats,id,index,AvailableRides);
        // axios.post('https://localhost:44334/api/booking/', {
        //     From: this.state.From,
        //     To: this.state.To,
        //     NoOfPersons: Number(this.state.NoOfSeats),
        //     RideId: id,
        //     UserId: localStorage.getItem('Id'),
        //     Price: this.state.AvailableRides[index].price,
        //     Date: this.state.AvailableRides[index].date,
        //     Time: this.state.AvailableRides[index].time,
        //     Status: 0,
        //     Id: id + localStorage.getItem('Id')
        // })
        //     .then(response => {
        //         toast("Waiting for approval!");
        //     })
        //     .catch(error => {
        //         toast("Unable book this ride")
        //     })
    }
    index = 0

    render() {
        const { errors } = this.state;
        return (
            <div className="bookride">
                <DocumentCard className="book">
                    <div className="title">Book a Ride<Toggle className="toggle" checked onClick={this.handleToggle} /></div>
                    <div className="tag">we get you the rides asap !</div>
                    <form className="bookingForm">
                        <div className="formdata">
                            {!this.state.isValid ? <p className="error">Please enter required feilds</p> : ""}
                            <label>From {errors.From.length > 0 && errors.From !== 'e' ? <div className='error'>{errors.From}</div> : ''}</label>
                            <input type="text" name="From" onChange={this.handleChange} value={this.state.From} />
                            <label>To {errors.To.length > 0 && errors.To !== 'e' ? <div className='error'>{errors.To}</div> : ''}</label>
                            <input type="text" name="To" onChange={this.handleChange} value={this.state.To} />
                            <label>Seats Required {errors.NoOfSeats.length > 0 && errors.NoOfSeats !== 'e' ? <div className='error'>{errors.NoOfSeats}</div> : ''}</label>
                            <input type="number" name="NoOfSeats" onChange={this.handleChange} value={this.state.NoOfSeats} />
                            <label>Date {errors.Date.length > 0 && errors.Date !== 'e' ? <div className='error'>{errors.Date}</div> : ''}</label>
                            <DatePicker onSelectDate={this.handleDate} value={this.state.Date} formatDate={this._onFormatDate} />
                            <label>
                                Time {errors.Time.length > 0 && errors.Time !== 'e' ? <div className='error'>{errors.Time}</div> : ''}
                            </label>
                            <div>
                                <span id="time1" className={this.state.id === "time1" ? "activetime" : "time"} onClick={this.setClass.bind(this)}>5am - 9am</span>
                                <span id="time2" className={this.state.id === "time2" ? "activetime" : "time"} onClick={this.setClass.bind(this)}>9am - 12pm</span>
                                <span id="time3" className={this.state.id === "time3" ? "activetime" : "time"} onClick={this.setClass.bind(this)}>12pm - 3pm</span>
                                <span id="time4" className={this.state.id === "time4" ? "activetime" : "time"} onClick={this.setClass.bind(this)}>3pm - 6pm</span>
                                <span id="time5" className={this.state.id === "time5" ? "activetime" : "time"} onClick={this.setClass.bind(this)}>6pm - 9pm</span>
                            </div>
                        </div>
                        <div className="faicons">
                            <div className="icon"><Icon iconName='StatusCircleInner' className="circle_icon" /></div>
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <div className="icon"><Icon iconName='POISolid' className="poiicon" /></div>
                        </div>

                        <input type="button" className='submitButton' value='Submit' onClick={this.showMatchedBooking.bind(this)} />
                    </form>
                </DocumentCard>
                {this.state.isSubmitClicked ?
                    <div className="booking">
                        <div className="machedRides">
                            { this.state.AvailableRides.filter((AvailableRide: { userId: string | null; }) => AvailableRide.userId != localStorage.getItem('Id')).length > 0 ? <div className="matches">Your Matches</div> : <div className="matches">Sorry, No matches available on the requested date</div>}
                            <div className="hidedisplay">{this.index = 0}</div>
                            {this.state.AvailableRides.filter((AvailableRide: { userId: string | null; }) => AvailableRide.userId != localStorage.getItem('Id')).map((AvailableRide: { from: React.ReactNode; to: React.ReactNode; date: string | any[]; price: React.ReactNode; noOfSeats: React.ReactNode; id: any; }) =>
                                <DocumentCard className="card">
                                    <table className="details">
                                        <tr className="name">
                                            <td >{this.state.userName[this.index++]}</td>
                                            <td ><img src={logo} /></td>
                                        </tr>
                                        <tr className="names">
                                            <td>From</td><td>To</td>
                                        </tr>
                                        <tr className="values">
                                            <td>
                                                {AvailableRide.from}
                                                <Icon iconName='StatusCircleInner' className="circleicon" />
                                                <Icon iconName='StatusCircleInner' className="circle" />
                                                <Icon iconName='StatusCircleInner' className="circle" />
                                                <Icon iconName='StatusCircleInner' className="circle" />
                                                <Icon iconName='StatusCircleInner' className="circle" />
                                                <Icon iconName='POISolid' className="poiicon" />
                                            </td><td>{AvailableRide.to}</td>
                                        </tr>
                                        <tr className="names">
                                            <td>Date</td><td>Time</td>
                                        </tr>
                                        <tr className="values">
                                            <td>{AvailableRide.date.slice(0, 10)}</td><td>{AvailableRide.date.slice(11, )}</td>
                                        </tr>
                                        <tr className="names">
                                            <td>Price</td><td>Seat Availability</td>
                                        </tr>
                                        <tr className="values">
                                            <td>{AvailableRide.price}</td><td>{AvailableRide.noOfSeats}</td>
                                        </tr>
                                        <input type="button" name="book" value="Book Now" onClick={this.handleBooking.bind(this, AvailableRide.id)} className="bookingbutton" />
                                    </table>
                                </DocumentCard>
                            )}
                        </div>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default BookARide;