'use strict';

var CustomerMgr = require('dw/customer/CustomerMgr');
var Locale = require('dw/util/Locale');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');

var server = require('server');
var OrderModel = require('*/cartridge/models/order');
var instanceMiddleware = require('*/cartridge/scripts/middleware/instance');

server.get('Show',
    instanceMiddleware.ensureNonProductionInstance,
    server.middleware.https,
    function (req, res, next) {
        // Look at the template requested
        var template = req.querystring.template;
        // If no template passed as parameter, abort
        if (!template) {
            res.redirect(URLUtils.https('Home-ErrorNotFound'));
            return next();
        }

        // Look at any URL parameter from the URL
        var url = req.querystring.url || URLUtils.httpsHome();

        // Look at any "user" parameter from the URL
        var firstName = req.querystring.firstName || 'Firstname';
        var lastName = req.querystring.lastName || 'Lastname';
        var email = req.querystring.email || 'email@salesforce.com';
        var passwordResetToken = req.querystring.passwordresettoken || 'passwordresettoken';
        var customerNo = req.querystring.customerNo;
        if (customerNo) {
            var customerProfile = CustomerMgr.getProfile(customerNo);
            if (customerProfile) {
                firstName = customerProfile.getFirstName();
                lastName = customerProfile.getLastName();
                email = customerProfile.getEmail();
                Transaction.wrap(function () {
                    passwordResetToken = customerProfile.getCredentials().createResetPasswordToken();
                    url = URLUtils.https('Account-SetNewPassword', 'Token', passwordResetToken);
                });
            }
        }

        // Look at any order no parameter from the URL
        var orderNo = req.querystring.orderNo;
        var order;
        if (orderNo) {
            order = OrderMgr.getOrder(orderNo);
            if (order) {
                var currentLocale = Locale.getLocale(req.locale.id);
                order = new OrderModel(order, { countryCode: currentLocale.country, containerView: 'order' });
            }
        }

        res.render(template, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            passwordResetToken: passwordResetToken,
            order: order,
            url: url
        });
        next();
    }
);

module.exports = server.exports();
