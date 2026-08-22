import type { JwtPayload } from "jsonwebtoken";

// req.user = decoded; M:9 V:5 express typescript namespace eta search divo and dev cominity te jabo and eta kaj holo authorization/auth.js req.user set korle type error ditechi so eta type error ta solve korbe
declare global{
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}