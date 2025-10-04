// utils.js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getDirName = getDirName;

var _url = require('url');

var _path = require('path');

function getDirName(metaUrl) {
  return (0, _path.dirname)((0, _url.fileURLToPath)(metaUrl));
}