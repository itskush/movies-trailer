const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log('test')
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.userId;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;
