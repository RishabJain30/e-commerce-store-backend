const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserModel = require('../../common/models/User');

const { roles, jwtSecret, jwtExpirationInSeconds } = require('../../config');

// Generates an Access Token using username and userId for the user's authentication
const generateAccessToken = (username, userId) => {
    return jwt.sign(
        {
            userId,
            username,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }
    );
};

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

module.exports = {
    register: (req, res) => {
        const payload = req.body;

        let encryptedPassword = encryptPassword(payload.password);
        let role = payload.role || roles.USER;

        UserModel.createUser(
            Object.assign(payload, { password: encryptedPassword, role })
        )
        .then((user) => {
            const accessToken = generateAccessToken(payload.username, user.id);
            return res.status(200).json({
                status: true,
                result: {
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        UserModel.findUser({username})
        .then((user) => {
            if(!user){
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username: \`${username}\`.`,
                    },
                });
            }

            const encryptedPassword = encryptPassword(password);

            if(user.password!=encryptedPassword){
                return res.status(400).json({
                    status: false,
                    error: {
                        message: 'Password is incorrect.',
                    },
                });
            }

            // Generating an AccessToken for the user, which will be
            // required in every subsequent request.
            const accessToken = generateAccessToken(user.username, user.id);        
            
            return res.status(200).json({
                status: true,
                data: {
                    user: user.toJSON(),
                    token: accessToken,
                },
            });
        })
        .catch((err)=>{
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }
};