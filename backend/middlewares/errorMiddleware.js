class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    // Default error message and status code
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    // Handle specific errors
    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(', ')}`;
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === "JsonWebTokenError") {
      const message = "Json Web Token is invalid. Please try again.";
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === "TokenExpiredError") {
      const message = "Json Web Token has expired. Please try again.";
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}: ${err.value}`;
      err = new ErrorHandler(message, 400);
    }
  
    // Handle validation errors (e.g., from Mongoose)
    const errorMessage = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;
  
    // Send response
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;
  