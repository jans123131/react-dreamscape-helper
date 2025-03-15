
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const apiLogFile = path.join(logsDir, 'api.log');
const errorLogFile = path.join(logsDir, 'error.log');

/**
 * Logs API requests to both console and log file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Number} duration - Request duration in milliseconds
 */
function logApiRequest(req, res, duration) {
  const timestamp = new Date().toISOString();
  const status = res.statusCode;
  const method = req.method;
  const path = req.path;
  const query = Object.keys(req.query).length ? JSON.stringify(req.query) : '';
  const ip = req.ip || req.connection.remoteAddress;
  
  const logEntry = `[${timestamp}] ${method} ${path} ${status} ${duration}ms ${ip} ${query}\n`;
  
  // Append to log file
  fs.appendFile(apiLogFile, logEntry, (err) => {
    if (err) console.error('Error writing to API log file:', err);
  });
}

/**
 * Logs errors to both console and error log file
 * @param {Error} err - The error object
 * @param {Object} req - Express request object (optional)
 */
function logError(err, req = null) {
  const timestamp = new Date().toISOString();
  const reqInfo = req ? `${req.method} ${req.path}` : 'No request info';
  
  const logEntry = `[${timestamp}] ERROR: ${reqInfo}\n${err.stack || err.message || err}\n\n`;
  
  // Log to console
  console.error(chalk.red('ERROR:'), err.stack || err.message || err);
  
  // Append to error log file
  fs.appendFile(errorLogFile, logEntry, (err) => {
    if (err) console.error('Error writing to error log file:', err);
  });
}

module.exports = {
  logApiRequest,
  logError
};
