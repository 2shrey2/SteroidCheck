'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllersUserControllerMjs = require('../controllers/userController.mjs');

var router = _express2['default'].Router();

router.post('/register', _controllersUserControllerMjs.register);
router.post('/login', _controllersUserControllerMjs.login);

exports['default'] = router;
module.exports = exports['default'];