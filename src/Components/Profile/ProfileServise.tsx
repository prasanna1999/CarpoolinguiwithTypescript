import axios from 'axios';
import { toast } from 'react-toastify';

export const ProfileData=(Name:string,Email:string,PhoneNumber:string)=>axios.put('https://localhost:44334/api/user/' + localStorage.getItem('Id'), {
    Name: Name,
    Email: Email,
    PhoneNumber: PhoneNumber
})
    .then(response => {
        localStorage.setItem('Name', Name);
        localStorage.setItem('PhoneNumber', PhoneNumber);
        toast("Update SuccessFul !");
    })
    .catch(error => {
        toast("Unable to update your profile")
    })