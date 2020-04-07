import axios from 'axios';
import { toast } from 'react-toastify';
import { UserData } from '../Contracts/BookARideContract';

export const ProfileData = (UserData:UserData) => axios.put('https://localhost:44334/api/user/' + localStorage.getItem('Id'), {
    Name: UserData.Name,
    Email: UserData.Email,
    PhoneNumber: UserData.PhoneNumber
})
    .then(response => {
        localStorage.setItem('Name', UserData.Name);
        localStorage.setItem('PhoneNumber', UserData.PhoneNumber);
        toast("Update SuccessFul !");
    })
    .catch(error => {
        toast("Unable to update your profile")
    })