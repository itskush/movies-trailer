const express = require("express");
const router = express.Router();
const search = require('youtube-search');


router.get("/:query", async (req, res, next) => {
    try {
        var opts = {
            maxResults: 6,
            key: process.env.YOUTUBE_API
        };

        await search(req.params.query, opts, (err, results, pageInfo) => {
            if(err) return console.log(err);
            res.status(200).send({videos: results, pageInfo: pageInfo});
        })
    } catch (err) {
        next(err)
    }
    // let videos;
    // try {
    //     var opts = {
    //         maxResults: 9,
    //         key: process.env.YOUTUBE_API
    //     };
    //
    //     await search(req.params.genre, opts, function(err, results) {
    //         if(err) return console.log(err);
    //
    //         // console.dir(results);
    //         videos = results;
    //         // console.log(trending);
    //         res.status(200).send({videos: videos});
    //     });
    // } catch (err) {
    //     next(err)
    // }
    // await YouTube.search(req.params.genre, { limit: 9 })
    //     .then(x => res.status(200).send({videos: x}))
    //     .catch(console.error);
})

module.exports = router;
