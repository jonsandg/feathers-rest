'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Service = function (_Base) {
  _inherits(Service, _Base);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, (Service.__proto__ || Object.getPrototypeOf(Service)).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'request',
    value: function request(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.connection(_extends({
          json: true
        }, options), function (error, res, data) {
          if (error) {
            return reject(error);
          }

          if (!error && res.statusCode >= 400) {
            if (typeof data === 'string') {
              return reject(new Error(data));
            }

            data.response = res;

            return reject(_extends(new Error(data.message), data));
          }

          resolve(data);
        });
      });
    }
  }]);

  return Service;
}(_base2.default);

exports.default = Service;
module.exports = exports['default'];