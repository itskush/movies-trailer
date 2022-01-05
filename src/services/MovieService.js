import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_BASE_URI ? process.env.VUE_APP_BASE_URI : 'http://localhost:3000/';

export default {
    async getPopular(){
        let res = await axios.get("api/movies/popular/");
        return res.data;
    },
    async getUpcoming(){
        let res = await axios.get("api/movies/upcoming/");
        return res.data;
    },
    async getTopRated(){
        let res = await axios.get("api/movies/top-rated/");
        return res.data;
    },
    /**
     * Get movie (single)
     */
     async getMovie (id) {
        let res = await axios.get(`api/movies/single/${id}`);
        return res.data;
    },
    /**
     * Get movie (single)
     */
    async getSearchedMovie (query) {
        let res = await axios.get(`api/movies/search/${query}`);
        return res.data;
    },


}
