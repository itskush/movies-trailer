
const db = require("../models");
const UserModel = require('../models/user');
const User = UserModel(db.sequelize,db.Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // models path depend on your structure
const config = require("../config/auth");

exports.create = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(data =>{
            if (data) {
                res.status(409).send({
                    msg: 'This email is already in use!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        User.create({ username: req.body.username, email: req.body.email, password: hash })
                        .then(() => {
                            res.status(201).send({
                                msg: 'Registered!'
                            });
                        })
                        .catch(err => {
                            res.status(400).send({
                                msg: err
                            });
                        });
                    }
                });
            }
        })
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "email can not be empty!"
        });
        return;
    }

    User.findOne({ where: { email: req.body.email } })
        .then(data =>{
            if (!data) {
                res.status(401).send({
                    msg: 'email or password is incorrect!'
                });
            }else{
                bcrypt.compare(
                    req.body.password,
                    data.password,
                    async (bErr, bResult) => {
                        // wrong password
                        if (bErr) {
                            return res.status(401).send({
                                msg: 'Username or password is incorrect!'
                            });
                        }
                        if (bResult) {
                            const token = jwt.sign({
                                    username: data.username,
                                    userId: data.id
                                },
                                process.env.JWT_SECRET, {
                                    expiresIn:  process.env.JWT_EXPIRES_IN
                                }
                            );

                            return res.status(200).send({
                                msg: 'Logged in!',
                                token,
                                user: data.username,
                            });
                        }
                    }
                );
            }
        }).catch(err => {
            res.status(500).send({
                message: err
            });
        })
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
