import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV, LOCALHOST_SECRET } from "../config/constants.js";
import CustomError from "../helpers/customError.js";

const NODE_ENVIRONMENT = NODE_ENV || "production";

const verifyAuthorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (
      NODE_ENVIRONMENT == "DEV" &&
      authorization == `Bearer ${LOCALHOST_SECRET}`
    )
      return next();
    if (!authorization)
      throw new CustomError(400, "'Authorization' header is required");

    const [auth, token] = authorization.split(" ");
    if (auth != "Bearer")
      throw new CustomError(400, "'Authorization' must be 'Bearer'");

    const result = jwt.verify(token, JWT_SECRET);
    if (!result) throw new CustomError(500, "Decrypt error");

    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default verifyAuthorization;
