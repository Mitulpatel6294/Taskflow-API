const validate = (schema) => (req, res, next) => {
  schema.parseAsync(req.body)
    .then((data) => {
      req.body = data;
      next();
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: error.issues,
      });
    });
};

export default validate;
