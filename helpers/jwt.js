const jwt = require('jsonwebtoken');

module.exports = {
    createJWTToken: (payload, duration) => {
        return jwt.sign(payload, 'rangermerah', duration)
    }
}