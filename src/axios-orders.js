import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-aec71-default-rtdb.firebaseio.com'
});

export default instance;