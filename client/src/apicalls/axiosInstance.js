import axios from 'axios';
export const axiosInstance = axios.create({
    headers : {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

// making axiosInstance as the global object otherwise i have to use headers for every endpoint call