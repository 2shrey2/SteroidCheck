// server.js
'use strict';

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _routesPredictMjs = require('./routes/predict.mjs');

var _routesPredictMjs2 = _interopRequireDefault(_routesPredictMjs);

// Import the steroidCheckRouter

// Load environment variables
_dotenv2['default'].config();

var app = (0, _express2['default'])();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(_bodyParser2['default'].json());
app.use((0, _cors2['default'])());

// API routes
app.use('/api/predict', _routesPredictMjs2['default']); // Use the steroidCheckRouter

// MongoDB connection
_mongoose2['default'].connect(process.env.MONGODB_URI).then(function () {
    return console.log('MongoDB connected');
})['catch'](function (err) {
    return console.error('MongoDB connection error:', err);
});

// User Model
var UserSchema = new _mongoose2['default'].Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

var Users = _mongoose2['default'].model('Users', UserSchema);

// Register Route
app.post('/api/users/register', function callee$0$0(req, res) {
    var _req$body, name, email, password, user, salt, payload;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _req$body = req.body;
                name = _req$body.name;
                email = _req$body.email;
                password = _req$body.password;
                context$1$0.prev = 4;
                context$1$0.next = 7;
                return regeneratorRuntime.awrap(Users.findOne({ email: email }));

            case 7:
                user = context$1$0.sent;

                if (!user) {
                    context$1$0.next = 10;
                    break;
                }

                return context$1$0.abrupt('return', res.status(400).json({ msg: 'User already exists' }));

            case 10:

                user = new Users({
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
});

// Login Route
app.post('/api/users/login', function callee$0$0(req, res) {
    var _req$body2, email, password, user, isMatch, payload;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _req$body2 = req.body;
                email = _req$body2.email;
                password = _req$body2.password;
                context$1$0.prev = 3;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(Users.findOne({ email: email }));

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
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});