const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });

};
const notFound = (req, res, next) => {
  res.status(404).send('Route not found');
};
module.exports = {
  handleError,
  notFound
};

