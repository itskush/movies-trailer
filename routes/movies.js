var express = require('express');
var router = express.Router();
const MovieDB = require("node-themoviedb");
const mdb = new MovieDB(process.env.TMDB_API_KEY);

const { getVideo, getExternalIds, searchMovie } = require( '../utils/helpers')

router.get('/popular/', async function(req, res, next) {
    const response = await mdb.movie.getPopular();
    res.send({data:response.data.results.slice(0, 12)});
});

router.get('/top-rated/', async function(req, res, next) {
    const response = await mdb.movie.getTopRated();
    res.send({data:response.data.results.slice(0, 12)});
});

router.get('/upcoming/', async function(req, res, next) {
    const response = await mdb.movie.getUpcoming();
    res.send({data:response.data.results.slice(0, 12)});
});

/* GET users listing. */
router.get('/single/:id', async function(req, res, next) {
    const results = await getVideo(req.params.id)
    if (results){
        const externalIds = await getExternalIds(req.params.id)
        results.externals = externalIds.external_ids;
    }
    res.send(results);
});


/* GET users listing. */
router.get('/search/:query', async function(req, res, next) {
    const response = await searchMovie(req.params.query)
    res.send({data:response.results.slice(0, 12)});
});



module.exports = router;
