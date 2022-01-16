class CustomError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
const AsyncHandler = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      console.log(e);
      next(e);
    });
  };
};

module.exports = {
  CustomError,
  AsyncHandler,
};
