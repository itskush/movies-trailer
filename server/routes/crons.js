const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre");
const playlistController = require("../controllers/playlist");
const channelController = require("../controllers/channel");
const ytch = require("yt-channel-info");
// const redisClient = redis.createClient({
//     password: process.env.REDIS_PASS
// }); // Redis server started at port 6379

// const redis = require("redis");
// const redisClient = redis.createClient({
//     password: process.env.REDIS_PASS
// }); // Redis server started at port 6379

router.get("/genres/:genre", genreController.setGenre);
router.get("/playlist/:channelid", playlistController.setPlaylist);
router.get("/channel/:channelid", channelController.setChannelVideos);
//
// router.get("/channelplaylists/:channelid", async (req, res, next) => {
//     const sortBy = 'last'
//
//     ytch.getChannelPlaylistInfo(req.params.channelid, sortBy)
//         .then(x => res.status(200).send({videos: x}))
//         .catch(console.error);
// })
//
// router.get("/channel/:channelid", async (req, res, next) => {
//     const sortBy = 'last'
//     ytch.getChannelVideos(req.params.channelid, sortBy)
//         .then(x => res.status(200).send({videos: x.items}))
//         .catch(console.error);
// })
//
// router.get("/playlists/:playlistid", async (req, res, next) => {
//     ytfps(req.params.playlistid)
//         .then(x => res.status(200).send({videos: x}))
//         .catch(console.error);
// })


module.exports = router;
