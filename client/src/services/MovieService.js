import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_BASE_URI ? process.env.VUE_APP_BASE_URI : 'http://localhost:3000/';

export default {
    /**
     * Get popular movie
     */
    async getPopular(){
        let res = await axios.get("api/movies/popular/");
        return res.data;
    },
    /**
     * Get upcoming movie
     */
    async getUpcoming(){
        let res = await axios.get("api/movies/upcoming/");
        return res.data;
    },
    /**
     * Get toprated movie
     */
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
     * Get searched movie
     */
    async getSearchedMovie (query) {
        let res = await axios.get(`api/movies/search/${query}`);
        return res.data;
    },


}
