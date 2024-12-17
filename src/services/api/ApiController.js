import axios from "axios";

export default axios.create(
    {
        baseURL: 'http://192.168.1.107:8000/api',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    }
);