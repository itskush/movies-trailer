const MovieDB = require('node-themoviedb');
const mdb = new MovieDB(process.env.TMDB_API_KEY);
const axios = require("axios");
const localCache = require("../services/cache")

const getVideo = async (id) => {
    const args = {
        pathParameters: {
            movie_id: id,
        },
    };
    const response = await mdb.movie.getDetails(args);
    const credits = await mdb.movie.getCredits(args);
    const videos = await mdb.movie.getVideos(args);
    const trailer = await getTrailer(videos.data.results);
    return { data: response.data, cast: credits.data.cast, trailer: trailer } ;
}


const getTrailer = async (videos) => {
    // if no videos, do nothing
    if (!videos.length) return null;

    // filter by type of video
    videos = videos.find(video => video.type === 'Trailer');

    // if no trailer found, do nothing
    if (!videos) return null;

    return [{
        name: videos.name,
        src: videos.key,
    }];
}



const getExternalIds = async (query) => {
    return await axios.get(process.env.TMDB_API_URL + '/movie/' + query, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            language: process.env.TMDB_API_LANG,
            append_to_response: 'external_ids',
        },
    }).then(async (response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    });
}

const searchMovie = async (query) => {
    const cleanQuery = query.replace(/ /g, '').toLowerCase();
    const foundKey = localCache.getKey(cleanQuery)
    if(!foundKey){
        return await axios.get(process.env.TMDB_API_URL + '/search/movie/', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: process.env.TMDB_API_LANG,
                include_adult:false,
                query: cleanQuery
            },
        }).then(async (response) => {
            localCache.setKey(query,response.data,3600)
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    }else{
        return foundKey;
    }

}

module.exports = {
    getTrailer,
    getVideo,
    getExternalIds,
    searchMovie

}
