import React from 'react';
import axios from 'axios';
import './OfferRide.scss';
import { DocumentCard, Icon, DatePicker, Toggle } from 'office-ui-fabric-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddVehicle,AddRide,AddLocations} from './OfferARideService';
toast.configure({
    autoClose: 2000,
    draggable: false,
});
class OfferRide extends React.Component<any,any> {
    isVehicleExists: any;
    _onParseDateFromString: ((dateStr: string) => Date | null) | undefined;
    constructor(props:any) {
        super(props);
        this.state = {
            noOfStops: 1, id: "", isSubmitClicked: false, isValid: true, isStopValid: true, seatid: "",
            From: "", To: "", NoOfSeats: 0, Date: "", Time: "", VehicleModel: "", VehicleNumber: "", Price: 0, Stops: [],
            errors: { From: 'e', To: 'e', Date: 'e', Time: 'e', VehicleModel: 'e', VehicleNumber: 'e' },
            stoperrors: { NoOfSeats: 'e' },
            isVehicleExists: false,
            stop: null
        }
    }
    addStop() {
        if (this.locationName != "") {
            this.setState({ Stops: this.state.Stops.concat(this.locationName) });
            this.setState({ noOfStops: this.state.noOfStops + 1 });
            this.locationName = ""
        }
    }
    appendedComponents = [];
    getAppendedComponents = () => {
        this.appendedComponents = [];
        for (let i = 1; i <= this.state.noOfStops; i++) {
            this.appendedComponents.push(
                // <div className="stop">
                //     <label>Stop{i}</label>
                //     <input type="text" name={"stop" + i} onChange={this.handleStop} />
                // </div>
            )
        }
    }
    locationName = "";
    handleStop = (e:any) => {
        this.locationName = e.target.value;
    }

    OfferRide = () => {
        if (!this.validateForm(this.state.stoperrors)) {
            this.setState({ isStopValid: false });
        }
        else {
            this.setState({ isStopValid: true });
            let userId = localStorage.getItem('Id');
            let date = this._onFormatDate(this.state.Date) + 'T' + this.state.Time + ':00';
            // axios.post('https://localhost:44334/api/vehicle/',
            //     {
            //         Id: userId + this.state.VehicleModel,
            //         Model: this.state.VehicleModel,
            //         CarNumber: this.state.VehicleNumber,
            //         UserId: userId
            //     })
            //     .catch(error => {
            //         toast("Unable to add ride!");
            //     })
            AddVehicle(userId,this.state.VehicleModel,this.state.VehicleNumber);
            // axios.post('https://localhost:44334/api/ride/',
            //     {
            //         UserId: userId,
            //         From: this.state.From,
            //         To: this.state.To,
            //         type: 2,
            //         VehicleId: userId + this.state.VehicleModel,
            //         Id: userId + this.state.From + this.state.To + this._onFormatDate(this.state.Date),
            //         Distance: 10,
            //         NoOfVacentSeats: Number(this.state.NoOfSeats),
            //         Price: Number(this.state.Price),
            //         Date: date,
            //         Time: date,
            //         EndDate: date
            //     })
            //     .catch(error => {
            //         toast("Unable to add ride!");
            //     })
            AddRide(userId,this.state.From,this.state.To,this.state.VehicleModel,this.state.NoOfSeats,this.state.Price,date,this._onFormatDate(date))
            let locations = this.state.Stops;
            if (this.locationName != "") {
                locations.push(this.locationName);
            }
            locations.map((location:any) => {
                AddLocations(userId,this.state.From,this.state.To,this._onFormatDate(this.state.Date),location)
                // axios.post('https://localhost:44334/api/location/',
                //     {
                //         RideId: userId + this.state.From + this.state.To + this._onFormatDate(this.state.Date),
                //         LocationName: location,
                //         Distance: 5,
                //         Id: userId + this.state.From + this.state.To + this._onFormatDate(this.state.Date) + location
                //     })
                //     .then(response => {
                //         toast("Ride Added SuccessFully!");
                //     })
                //     .catch(error => {
                //         toast("Unable to add ride!");
                //     })
            })
            this.setState({
                noOfStops: 1, id: "", isSubmitClicked: false, isValid: true, isStopValid: true, seatid: "",
                From: "", To: "", NoOfSeats: "", Date: "", Time: "", VehicleModel: "", VehicleNumber: "",
                errors: { From: 'e', To: 'e', Date: 'e', Time: 'e', VehicleModel: 'e', VehicleNumber: 'e' },
                stoperrors: { NoOfSeats: 'e' }
            });
        }
    }
    showNextForm() {
        if (!this.validateForm(this.state.errors)) {
            this.setState({ isValid: false });
        }
        else {
            this.setState({ isValid: true });
            this.setState({ isSubmitClicked: true });
        }
    }
    settimeClass(e:any) {
        if (e.target.innerText == null)
            this.state.errors.Time = "Please select atleast one";
        else
            this.state.errors.Time = "";
        this.setState({ id: e.target.id, Time: 2 });
    }

    validateForm = (errors:any) => {
        let valid = true;
        Object.values(errors).forEach(
            (val:any) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    setClass(e:any) {
        if (e.target.innerText == null)
            this.state.stoperrors.NoOfSeats = "Please select atleast one";
        else
            this.state.stoperrors.NoOfSeats = "";
        this.setState({ seatid: e.target.id, NoOfSeats: e.target.innerText });
    }

    handleToggle = () => {
        this.props.history.push("/ui/bookaride");
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
            case 'VehicleModel':
                errors.VehicleModel =
                    value.length < 3
                        ? 'Please enter minimum 3 letters'
                        : '';
                break;
            case 'VehicleNumber':
                errors.VehicleNumber =
                    value.length < 7
                        ? 'Please enter valid vechicle number'
                        : '';
                break;
            case 'Time':
                errors.Time = '';
                break;
            default:
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

    render() {
        const { errors } = this.state;
        const { stoperrors } = this.state;
        return (
            <div className="offeraRide">
                <DocumentCard className="book">
                    <div className="title">Offer a Ride<Toggle className="toggle" onClick={this.handleToggle} /></div>
                    <div className="tag">we get you the rides asap !</div>
                    {!this.state.isValid ? <p className="error">Please enter required feilds</p> : ""}
                    <form className="bookingForm">
                        <div className="formdata">
                            <label>From {errors.From.length > 0 && errors.From !== 'e' ? <div className='error'>{errors.From}</div> : ''}</label>
                            <input type="text" name="From" onChange={this.handleChange} value={this.state.From} />
                            <label>To {errors.To.length > 0 && errors.To !== 'e' ? <div className='error'>{errors.To}</div> : ''}</label>
                            <input type="text" name="To" onChange={this.handleChange} value={this.state.To} />
                            <label>Date {errors.Date.length > 0 && errors.Date !== 'e' ? <div className='error'>{errors.Date}</div> : ''}</label>
                            <DatePicker onSelectDate={this.handleDate} value={this.state.Date} formatDate={this._onFormatDate} parseDateFromString={this._onParseDateFromString} />
                            <label>
                                Time {errors.Time.length > 0 && errors.Time !== 'e' ? <div className='error'>{errors.Time}</div> : ''}
                            </label>
                            <input type="time" name="Time" value={this.state.Time} onChange={this.handleChange} />
                            {this.isVehicleExists
                                ? ""
                                : <div><label>Vehicle Model {errors.VehicleModel.length > 0 && errors.VehicleModel !== 'e' ? <div className='error'>{errors.VehicleModel}</div> : ''}</label>
                                    <input type="text" name="VehicleModel" onChange={this.handleChange} value={this.state.VehicleModel} />
                                    <label>Vehicle Number {errors.VehicleNumber.length > 0 && errors.VehicleNumber !== 'e' ? <div className='error'>{errors.VehicleNumber}</div> : ''}</label>
                                    <input type="text" name="VehicleNumber" onChange={this.handleChange} value={this.state.VehicleNumber} />
                                </div>
                            }
                        </div>
                        <div className="faicons">
                            <div className="icon"><Icon iconName='StatusCircleInner' className="circle_icon" /></div>
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <Icon iconName='StatusCircleInner' className="circle" />
                            <div className="icon"><Icon iconName='POISolid' className="poiicon" /></div>
                        </div>

                        <input type="button" className='nextButton' value='Next>>' onClick={this.showNextForm.bind(this)} />
                    </form>
                </DocumentCard>
                {this.state.isSubmitClicked ?
                    <DocumentCard className="book">
                        <div className="title">Offer a Ride</div>
                        <div className="tag">we get you the rides asap !</div>
                        <form className="form">
                            {!this.state.isStopValid ? <p className="error">Please enter required feilds</p> : ""}
                            {this.getAppendedComponents()}
                            {this.appendedComponents}
                            <input type="button" className="addStopButton" onClick={this.addStop.bind(this)} value="+" />
                            <table><tr><td>
                                <label>Available Seats {stoperrors.NoOfSeats.length > 0 && stoperrors.NoOfSeats !== 'e' ? <div className='error'>{stoperrors.NoOfSeats}</div> : ''}</label></td><td>
                                    <label>Price</label></td></tr>
                                <tr><td>
                                    <span id="seat1" onClick={this.setClass.bind(this)} className={this.state.seatid === "seat1" ? "activeseat" : "vacentSeats"}>1</span>
                                    <span id="seat2" onClick={this.setClass.bind(this)} className={this.state.seatid === "seat2" ? "activeseat" : "vacentSeats"}>2</span>
                                    <span id="seat3" onClick={this.setClass.bind(this)} className={this.state.seatid === "seat3" ? "activeseat" : "vacentSeats"}>3</span>
                                </td><td>
                                        <input type="number" className="price" name="Price" value={this.state.Price} onChange={this.handleChange} /></td></tr>
                            </table>
                            <input type="button" className='submitButton' value='Submit' onClick={this.OfferRide} />
                        </form>
                    </DocumentCard>
                    : ""
                }
            </div>
        );
    }
}


export default OfferRide;