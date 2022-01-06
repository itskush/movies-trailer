const express = require('express')
const passport = require("passport");
const router = express.Router()
const userController = require('../controllers/user');
// const favoriteController = require('../controllers/favourites');
// const socialController = require('../controllers/socials');
const authJwt = require('../middleware/authJwt')

router.post('/login', userController.login)
router.post("/refreshtoken", userController.refreshToken);
router.post("/checktoken", authJwt.verifyToken,(req,res) => {
    return res.status(200).send({
        message: "Success"
    });
});
router.post('/sign-up', userController.create)
// router.get('/favorites',authJwt.verifyToken, favoriteController.getFavorites)



module.exports = router
