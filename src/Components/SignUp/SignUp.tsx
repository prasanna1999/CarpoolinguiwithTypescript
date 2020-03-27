import React from 'react';
import logo from 'D:/carpoolingui/src/Images/logo.png';
import './SignUp.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

class SignUp extends React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = ({
            isLoginClicked: false,
            isUserExists: false,
            isCredentialsValidated: false,
            isSignUpSelected: true, passwordtype: 'password', Name: null, Email: null, Password: null, ConfirmPassword: null, errors: { Email: 'e', Password: 'e', ConfirmPassword: 'e' }, isValid: true
        });
    }
    componentDidUpdate() {
        console.log(localStorage.getItem('Id') != null&&'')
        if (localStorage.getItem('Id') != null&&'')
            this.props.history.push("/ui/home");
    }
    changeState() {
        let status=!this.state.isSignUpSelected;
        this.setState({ isSignUpSelected: status });
    }
    showHide(e:any) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            passwordtype: this.state.passwordtype === 'input' ? 'password' : 'input'
        });
    }
    handleChange = (event:any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'Password':
                errors.Password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : this.state.ConfirmPassword != null ? value == this.state.ConfirmPassword ? '' : 'Password and Confirm Password must be same.' : '';
                break;
            case 'ConfirmPassword':
                errors.ConfirmPassword =
                    value != this.state.Password
                        ? 'Password and Confirm Password must be same.'
                        : '';
                break;
            case 'Email':
                errors.Email =
                    this.validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
        }
        this.setState({ errors, [name]: value });
        this.setState({ [name]: event.target.value });
    }

    validateSignIn() {
        if (!this.validateForm(this.state.errors)) {
            this.setState({ isValid: false });
        }
        else {
            let index = this.state.Email.indexOf('@');
            axios.post('https://localhost:44334/api/user/', { Id: this.state.Email.slice(0, index) + this.state.Email, Name: this.state.Email.slice(0, index), Email: this.state.Email, PhoneNumber: '9876543210', Password: this.state.Password, Role: 'User' })
            localStorage.setItem('Name', this.state.Email.slice(0, index));
            localStorage.setItem('Email', this.state.Email);
            localStorage.setItem('Id', this.state.Email.slice(0, index) + this.state.Email);
            localStorage.setItem('PhoneNumber', '9876543210');
            this.props.history.push("/ui/home");
        }
    }

    validateLogIn() {
        if (!this.validateLoginForm(this.state.errors)) {
            this.setState({ isValid: false });
        }
        else {
            this.setState({ isLoginClicked: true });
            axios.get('https://localhost:44334/api/user/' + this.state.Email)
                .then(response => {
                    if (response.data == "") {
                        this.setState({ isUserExists: false });
                        return;
                    }
                    else {
                        this.setState({ isUserExists: true });
                        if (this.state.Password == response.data.password) {
                            this.setState({ isCredentialsValidated: true });
                            localStorage.setItem('Name', response.data.name);
                            localStorage.setItem('Email', response.data.email);
                            localStorage.setItem('Id', response.data.id);
                            localStorage.setItem('PhoneNumber', response.data.phoneNumber);
                            this.props.history.push("/ui/home");
                        }
                        else {
                            console.log("wrong password");
                        }
                    }
                })
        }
    }

    validateLoginForm = (errors:any) => {
        errors.ConfirmPassword = "";
        let valid = true;
        Object.values(errors).forEach(
            (val:any) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    validateForm = (errors:any) => {
        let valid = true;
        Object.values(errors).forEach(
            (val:any) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    validEmailRegex = RegExp(/^([a-z0-9_.])+\@(([a-z0-9-])+\.)+([a-z]{2,4})+$/i);
    render() {
        const { errors } = this.state;
        return (
            <div className="signUp">
                <div className="caption">
                    <div><img className="image" src={logo} /></div>
                    <div className="captiontitle">
                        <div className="lines">
                            <span className="initial">TURN</span>
                            <span className="second">MILES</span>
                        </div>
                        <div className="lines">
                            <span className="initial">INTO</span>
                            <span className="last">MONEY</span>
                        </div>
                    </div>
                    <div className="tagline">
                        RIDES ON TAP
                    </div>
                </div>
                <div className={this.state.isSignUpSelected ? "signupdetails" : "signupdetails colorchange"}>
                    <div className="signupblock">
                        <div className="signupheading">{this.state.isSignUpSelected ? "Sign Up" : "Login"}</div>
                        <div className="signupform">
                            {this.state.isLoginClicked ? !this.state.isUserExists ? <p className="error">No such email exists</p> : !this.state.isCredentialsValidated ? <p className="error">Incorrect password</p> : "" : ""}
                            {!this.state.isValid ? <p className="error">Please enter required feilds</p> : ""}
                            {errors.Email.length > 0 && errors.Email !== 'e' ? <p className='error'>{errors.Email}</p> : ''}
                            <div className="passwordfeild">
                                <input type="email" name="Email" placeholder="Enter Email Id" onChange={this.handleChange.bind(this)} /></div>
                            {errors.Password.length > 0 && errors.Password !== 'e' ? <p className='error'>{errors.Password}</p> : ''}
                            <div className="passwordfeild">
                                <input type={this.state.passwordtype} name="Password" placeholder="Enter Password" className="password" onChange={this.handleChange.bind(this)} />
                                <span className="showpassword" onClick={this.showHide.bind(this)}>{this.state.passwordtype === 'input' ? <Icon iconName='Hide' className="redeye" /> : <Icon iconName='RedEye' className="redeye" />}</span>
                            </div>
                            {errors.ConfirmPassword.length > 0 && errors.ConfirmPassword !== 'e' ? <p className='error'>{errors.ConfirmPassword}</p> : ''}
                            {this.state.isSignUpSelected ?
                                <div className="passwordfeild">
                                    <input type="password" name="ConfirmPassword" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} /></div> : ""}
                            <input className={this.state.isSignUpSelected ? "signupbutton" : "loginbutton"} type="button" value="Submit" onClick={this.state.isSignUpSelected ? this.validateSignIn.bind(this) : this.validateLogIn.bind(this)} />
                        </div>
                        <div className="membertext">
                            {this.state.isSignUpSelected ? "Already a member?" : "Not a member?"}
                            {this.state.isSignUpSelected ? <span className="signuppointer" onClick={this.changeState.bind(this)}>LOG IN</span> : <span className="signuppointer" onClick={this.changeState.bind(this)}>SIGN UP</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;