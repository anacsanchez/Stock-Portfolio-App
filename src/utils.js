const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { models } = db;

const createStore = () => {
    return { db, models };
};

const generateToken = (email, id) => {
    const signJWT = (resolve,reject) => {
        jwt.sign(
            { email, id },
            process.env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: "30 days"},
            (err, token) => err ? reject(err) : resolve(token)
        );
    };
    return new Promise(signJWT);
};

const decodeToken = token => {
    const decodeJWT = (resolve,reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => err ? reject(err) : resolve(decoded)
        );
    };
    return new Promise(decodeJWT);
};

const verifyPassword = (password, hash) => {
    const compareCrypted = (resolve, reject) => {
        bcrypt.compare(password, hash, (err,result) => err ? reject(err) : resolve(result));
    };
    return new Promise(compareCrypted);
};

module.exports = {
    createStore,
    generateToken,
    decodeToken,
    verifyPassword
};
