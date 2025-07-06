let jwt = require( 'jsonwebtoken');


exports.validateToken = (async (req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token

        try {
            const decoded = jwt.verify(token, "abdulsecretkey");

            req.user = {
                userID: decoded.userID,
                username: decoded.username,
                email: decoded.email
            }; //  Attach user data to req
            next(); // Pass to the next middleware
        } catch (err) {
            console.error("JWT Verification Error:", err.message);
            res.status(401);
            throw new Error("User is not authorized - Invalid Token");
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized - No Token");
    }
});


