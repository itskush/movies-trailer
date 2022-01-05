import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URI ? process.env.VUE_APP_BASE_URI : 'http://localhost:3000/';
const url = 'api/auth/';
export default {
    login(credentials) {
        return axios
            .post(url + 'login', credentials)
            .then(response => response.data);
    },
    signUp(credentials) {
        return axios
            .post(url + 'sign-up', credentials)
            .then(response => response.data);
    },
    async checkToken(credentials) {
        axios.defaults.headers.common['x-access-token'] = `${credentials}`;
        return await axios.post(url + 'checktoken').then((response) => {
            return response.status
        }).catch((error) => {
            return error.response.status;
        });
    },
};
