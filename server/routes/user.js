const express = require('express')
const {searchMovie} = require("../utils/helpers");
const router = express.Router();


router.post('/favorites/', async function(req, res, next) {
    console.log(req.params.id)
    // res.send({data:response.results.slice(0, 12)});
});
router.post('/favorites/',)
router.get('/favorites/', loginUser)
router.get('/me', decodeHeader, me)

module.exports = router;
