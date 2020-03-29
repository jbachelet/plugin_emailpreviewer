'use strict';

var System = require('dw/system/System');
var URLUtils = require('dw/web/URLUtils');

/**
 * Middleware that ensures the current request is through a non-production instance
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function ensureNonProductionInstance(req, res, next) {
    var isProduction = System.getInstanceType() === System.PRODUCTION_SYSTEM;
    if (isProduction) {
        res.redirect(URLUtils.https('Home-ErrorNotFound'));
    }

    next();
}

module.exports = {
    ensureNonProductionInstance: ensureNonProductionInstance
};
