#!/usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var readRC = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var result, cfg, _arr, _i, type, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, sub;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            result = { presets: [], plugins: [] };
            _context.next = 4;
            return (0, _jsonUpdate.load)('.babelrc');

          case 4:
            cfg = _context.sent;

            if (cfg) {
              _context.next = 8;
              break;
            }

            console.log('No .babelrc found.');
            return _context.abrupt('return', { presets: presets, plugins: plugins });

          case 8:
            _arr = ['presets', 'plugins'];
            _i = 0;

          case 10:
            if (!(_i < _arr.length)) {
              _context.next = 62;
              break;
            }

            type = _arr[_i];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;
            _iterator = (0, _getIterator3.default)(cfg[type]);

          case 17:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 45;
              break;
            }

            item = _step.value;

            if (!Array.isArray(item)) {
              _context.next = 41;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 23;

            for (_iterator2 = (0, _getIterator3.default)(item); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              sub = _step2.value;

              if (!(0, _isobject2.default)(sub)) result[type].push(sub);
            }_context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](23);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError2) {
              _context.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
            _context.next = 42;
            break;

          case 41:
            result[type].push(item);

          case 42:
            _iteratorNormalCompletion = true;
            _context.next = 17;
            break;

          case 45:
            _context.next = 51;
            break;

          case 47:
            _context.prev = 47;
            _context.t1 = _context['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 51:
            _context.prev = 51;
            _context.prev = 52;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 54:
            _context.prev = 54;

            if (!_didIteratorError) {
              _context.next = 57;
              break;
            }

            throw _iteratorError;

          case 57:
            return _context.finish(54);

          case 58:
            return _context.finish(51);

          case 59:
            _i++;
            _context.next = 10;
            break;

          case 62:
            return _context.abrupt('return', result);

          case 65:
            _context.prev = 65;
            _context.t2 = _context['catch'](0);

            console.error('Trouble reading .babelrc:', _context.t2);

          case 68:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 65], [15, 47, 51, 59], [23, 27, 31, 39], [32,, 34, 38], [52,, 54, 58]]);
  }));

  return function readRC() {
    return _ref2.apply(this, arguments);
  };
}();

var go = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var _ref4, presets, plugins;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readRC();

          case 2:
            _ref4 = _context2.sent;
            presets = _ref4.presets;
            plugins = _ref4.plugins;

            if (!(presets.length > 0 || plugins.length > 0)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return installAll({ presets: presets, plugins: plugins });

          case 8:
            _context2.next = 11;
            break;

          case 10:
            console.log('No presets or plugins found in .babelrc');

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function go() {
    return _ref3.apply(this, arguments);
  };
}();

var _jsonUpdate = require('json-update');

var _pty = require('pty.js');

var _pty2 = _interopRequireDefault(_pty);

var _isobject = require('isobject');

var _isobject2 = _interopRequireDefault(_isobject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installAll(_ref) {
  var presets = _ref.presets;
  var plugins = _ref.plugins;

  return new _promise2.default(function (resolve) {
    presets = presets.map(function (p) {
      return 'babel-preset-' + p;
    });
    plugins = plugins.map(function (p) {
      return 'babel-plugin-' + p;
    });
    var cmd = 'npm';
    var args = ['i', '-D'].concat(presets).concat(plugins);

    console.log('Installing:', args.slice(2).join());
    var term = _pty2.default.spawn(cmd, args, { name: process.env.TERM, cols: process.stdout.columns,
      rows: process.stdout.rows, cwd: process.cwd(), env: process.env });

    term.on('data', function (data) {
      process.stdout.write(data.toString());
    });

    term.on('exit', function (code) {
      var wh = 'log';
      if (code != 0) wh = 'error';
      console[wh]('babelrc-install finished with exit code', code);
      resolve();
    });
  });
}

go().catch(console.error);