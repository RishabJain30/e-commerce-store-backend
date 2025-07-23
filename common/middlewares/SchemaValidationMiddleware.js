const Ajv = require('ajv').default,
  AJV_OPTS = {allErrors: true}; //collects all errors instead of stopping at the first one

module.exports = {

  /**
   * @description Compiles the schema provided in argument and validates the data for the
   * compiled schema, and returns errors if any
   *
   * @param {Object} schema - AJV Schema to validate against
   *
   * @returns {Function} - Express request handler
   */
  verify: (schema) => {
    if(!schema) {
        throw new Error('Schema not provided');
    }

    return (req, res, next) => {
        const { body } = req;
        const ajv = new Ajv(AJV_OPTS);
        const validate = ajv.compile(schema); //The provided schema is compiled into a validation function using AJV.
        const isValid = validate(body);
        if (isValid) {
            return next();
        }

        return res.send({
            status: false,
            error: {
                message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`
            }
        })
    }
  }
};