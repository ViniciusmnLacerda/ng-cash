const errorsMap = {
  'INVALID_VALUE': 422,
  "string.min": 422
}

const mapError = (type) => errorsMap[type] || 500;

module.exports = mapError;