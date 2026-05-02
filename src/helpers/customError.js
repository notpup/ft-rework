// Gracias felipe x2
export default class CustomError extends Error {
  constructor(statusCode, message, details) {
    super((message = message || "Datos invalidos [Revisar customError.js]"));
    ((this.statusCode = statusCode),
      (this.details = { success: false, status: statusCode, ...details }));
    Error.captureStackTrace(this, this.constructor);
  }
}
