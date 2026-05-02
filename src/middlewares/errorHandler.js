import CustomError from "../helpers/customError.js";

const errorHandler = async (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, details: error.details });
  } else {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export default errorHandler;
