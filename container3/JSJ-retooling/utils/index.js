const asyncHandler = require('./asyncHandler');
const handleValidationErrors = require('./handleValidationErrors');
const restoreUser = require('./restoreUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const requireAuth = require('./requireAuth');
const getThreadsByIds = require('./getThreadsByIds');
const userValidator = require('./userValidator');
const loginValidator = require('./loginValidator');
const sanitizeOptions = require('./sanitizeOptions');

module.exports = {
  restoreUser,
  requireAuth,
  asyncHandler,
  handleValidationErrors,
  loginUser,
  logoutUser,
  getThreadsByIds,
  userValidator,
  loginValidator,
  sanitizeOptions
};
