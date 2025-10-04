'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsUserMjs = require('../models/User.mjs');

var _modelsUserMjs2 = _interopRequireDefault(_modelsUserMjs);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var register = function register(req, res) {
    var _req$body, name, email, password, user, salt, payload;

    return regeneratorRuntime.async(function register$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _req$body = req.body;
                name = _req$body.name;
                email = _req$body.email;
                password = _req$body.password;
                context$1$0.prev = 4;
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(_modelsUserMjs2['default'].findOne({ email: email }));

            case 7:
                user = context$1$0.sent;

                if (!user) {
                    context$1$0.next = 10;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ msg: 'User already exists' }));

            case 10:

                user = new _modelsUserMjs2['default']({
                    name: name,
                    email: email,
                    password: password
                });

                context$1$0.next = 13;
                return regeneratorRuntime.awrap(_bcryptjs2['default'].genSalt(10));

            case 13:
                salt = context$1$0.sent;
                context$1$0.next = 16;
                return regeneratorRuntime.awrap(_bcryptjs2['default'].hash(password, salt));

            case 16:
                user.password = context$1$0.sent;
                context$1$0.next = 19;
                return regeneratorRuntime.awrap(user.save());

            case 19:
                payload = {
                    user: {
                        id: user.id
                    }
                };

                _jsonwebtoken2['default'].sign(payload, process.env.JWT_SECRET, // Use a more secure secret in production
                { expiresIn: 3600 }, function (err, token) {
                    if (err) throw err;
                    res.json({ token: token });
                });
                context$1$0.next = 27;
                break;

            case 23:
                context$1$0.prev = 23;
                context$1$0.t0 = context$1$0['catch'](4);

                console.error(context$1$0.t0.message);
                res.status(500).send('Server error');

            case 27:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[4, 23]]);
};

exports.register = register;
var login = function login(req, res) {
    var _req$body2, email, password, user, isMatch, payload;

    return regeneratorRuntime.async(function login$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _req$body2 = req.body;
                email = _req$body2.email;
                password = _req$body2.password;
                context$1$0.prev = 3;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(_modelsUserMjs2['default'].findOne({ email: email }));

            case 6:
                user = context$1$0.sent;

                if (user) {
                    context$1$0.next = 9;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ msg: 'Invalid Credentials' }));

            case 9:
                context$1$0.next = 11;
                return regeneratorRuntime.awrap(_bcryptjs2['default'].compare(password, user.password));

            case 11:
                isMatch = context$1$0.sent;

                if (isMatch) {
                    context$1$0.next = 14;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ msg: 'Invalid Credentials' }));

            case 14:
                payload = {
                    user: {
                        id: user.id
                    }
                };

                _jsonwebtoken2['default'].sign(payload, process.env.JWT_SECRET, // Use a more secure secret in production
                { expiresIn: 3600 }, function (err, token) {
                    if (err) throw err;
                    res.json({ token: token });
                });
                context$1$0.next = 22;
                break;

            case 18:
                context$1$0.prev = 18;
                context$1$0.t0 = context$1$0['catch'](3);

                console.error(context$1$0.t0.message);
                res.status(500).send('Server error');

            case 22:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[3, 18]]);
};
exports.login = login;