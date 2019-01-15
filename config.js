const { isInteger } = require('lodash');

exports.backgroundColor = process.env.BACKGROUND_COLOR || 'white';
exports.baseUrl = process.env.BASE_URL || '';
exports.port = getEnvInt('PORT') || 3000;

if (exports.port < 0 || exports.port > 65535) {
  throw new Error(`Environment variable $PORT must be a port number between 0 and 63535, but its value is ${exports.port}`);
}

function getEnvInt(name) {

  const value = process.env[name];
  if (value === undefined) {
    return;
  }

  const intValue = parseInt(value, 10);
  if (!isInteger(intValue)) {
    throw new Error(`Environment variable $${name} must be an integer, but its value is "${value}"`);
  }

  return intValue;
}
