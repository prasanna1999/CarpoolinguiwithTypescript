import React from 'react';
import './Profile.scss';
import { DocumentCard, Label, TextField, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import User from '../User';
import {ProfileData} from './ProfileServise';
toast.configure({
    autoClose: 2000,
    draggable: false,
});
class Profile extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            Name: localStorage.getItem('Name'), Email: localStorage.getItem('Email'), PhoneNumber: localStorage.getItem('PhoneNumber'), isValid: true,
            errors: { Name: '', Email: '', PhoneNumber: '' }
        };
    }
    update = () => {
        if (!this.validateForm(this.state.errors)) {
            this.setState({ isValid: false });
        }
        else {
            this.setState({ isValid: true });
            ProfileData(this.state.Name,this.state.Email,this.state.PhoneNumber)
            // axios.put('https://localhost:44334/api/user/' + localStorage.getItem('Id'), {
            //     Name: this.state.Name,
            //     Email: this.state.Email,
            //     PhoneNumber: this.state.PhoneNumber
            // })
            //     .then(response => {
            //         localStorage.setItem('Name', this.state.Name);
            //         localStorage.setItem('PhoneNumber', this.state.PhoneNumber);
            //         toast("Update SuccessFul !");
            //     })
            //     .catch(error => {
            //         toast("Unable to update your profile")
            //     })
        }
    }
    validateForm = (errors:any) => {
        let valid = true;
        Object.values(errors).forEach(
            (val:any) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    handleChange = (e:any) => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'Name':
                errors.Name =
                    value.length < 3
                        ? 'Name must be 3 characters long!'
                        : '';
                break;
            case 'Email':
                errors.Email =
                    this.validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'PhoneNumber':
                errors.PhoneNumber =
                    this.validPhoneNumberRegex.test(value)
                        ? ''
                        : 'PhoneNumber is not valid!';
                break;
        }
        this.setState({ errors, [name]: value });
        this.setState({ [name]: e.target.value });
    }
    validEmailRegex = RegExp(/^([a-z0-9_.])+\@(([a-z0-9-])+\.)+([a-z]{2,4})+$/i);
    validPhoneNumberRegex = RegExp(/^[0-9]{10}$/);
    successmessage() {
        this.setState({ isMessageBarActivate: true });
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="ms-Grid profileInfo" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <DocumentCard className="formcard">
                            {!this.state.isValid ? <p className="error">Please enter required feilds</p> : ""}
                            <div className="formdata">
                                <Label>Name {errors.Name.length > 0 && errors.Name !== 'e' ? <div className='error'>{errors.Name}</div> : ''}</Label>
                                <TextField name="Name" value={this.state.Name} onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="formdata">
                                <Label>Email {errors.Email.length > 0 && errors.Email !== 'e' ? <div className='error'>{errors.Email}</div> : ''}</Label>
                                <TextField name="Email" disabled value={this.state.Email} onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="formdata">
                                <Label>Phone Number {errors.PhoneNumber.length > 0 && errors.PhoneNumber !== 'e' ? <div className='error'>{errors.PhoneNumber}</div> : ''}</Label>
                                <TextField name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange.bind(this)} />
                            </div>
                            <input type="button" value="Update" onClick={this.update} />
                        </DocumentCard>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;