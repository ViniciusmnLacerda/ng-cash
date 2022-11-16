const errorsMap = {
  'INVALID_VALUE': 422,
  'string.min': 422,
  'any.required': 400,
  'string.required': 400,
  'string.base': 422,
}

const mapError = (type) => errorsMap[type] || 500;

module.exports = mapError;