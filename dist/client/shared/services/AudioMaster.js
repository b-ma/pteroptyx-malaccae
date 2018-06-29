'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVICE_ID = 'service:audio-master';

var AudioMaster = function (_Service) {
  (0, _inherits3.default)(AudioMaster, _Service);

  function AudioMaster(options) {
    (0, _classCallCheck3.default)(this, AudioMaster);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioMaster.__proto__ || (0, _getPrototypeOf2.default)(AudioMaster)).call(this, SERVICE_ID, false));

    var defaults = {
      convolver: false,
      masterGain: 1
    };

    _this.configure(defaults, options);

    _this.require('platform', { features: ['web-audio'] });
    return _this;
  }

  (0, _createClass3.default)(AudioMaster, [{
    key: 'init',
    value: function init() {
      var highpass = _client.audioContext.createBiquadFilter();
      highpass.connect(_client.audioContext.destination);
      highpass.type = 'highpass';
      highpass.frequency.value = 250;

      this.input = _client.audioContext.createGain();
      this.input.connect(highpass);
      this.input.gain.value = this.options.masterGain;
    }
  }, {
    key: 'start',
    value: function start() {
      (0, _get3.default)(AudioMaster.prototype.__proto__ || (0, _getPrototypeOf2.default)(AudioMaster.prototype), 'start', this).call(this);

      if (!this.hasStarted) this.init();

      this.ready();
    }
  }, {
    key: 'gain',
    set: function set(value) {
      this.input.gain.value = value;
    }
  }]);
  return AudioMaster;
}(_client.Service);

_client.serviceManager.register(SERVICE_ID, AudioMaster);

exports.default = AudioMaster;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1ZGlvTWFzdGVyLmpzIl0sIm5hbWVzIjpbIlNFUlZJQ0VfSUQiLCJBdWRpb01hc3RlciIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsImNvbnZvbHZlciIsIm1hc3RlckdhaW4iLCJjb25maWd1cmUiLCJyZXF1aXJlIiwiZmVhdHVyZXMiLCJoaWdocGFzcyIsImNyZWF0ZUJpcXVhZEZpbHRlciIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInR5cGUiLCJmcmVxdWVuY3kiLCJ2YWx1ZSIsImlucHV0IiwiY3JlYXRlR2FpbiIsImdhaW4iLCJoYXNTdGFydGVkIiwiaW5pdCIsInJlYWR5IiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsYUFBYSxzQkFBbkI7O0lBRU1DLFc7OztBQUNKLHVCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsZ0pBQ2JGLFVBRGEsRUFDRCxLQURDOztBQUduQixRQUFNRyxXQUFXO0FBQ2ZDLGlCQUFXLEtBREk7QUFFZkMsa0JBQVk7QUFGRyxLQUFqQjs7QUFLQSxVQUFLQyxTQUFMLENBQWVILFFBQWYsRUFBeUJELE9BQXpCOztBQUVBLFVBQUtLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLEVBQUVDLFVBQVUsQ0FBQyxXQUFELENBQVosRUFBekI7QUFWbUI7QUFXcEI7Ozs7MkJBRU07QUFDTCxVQUFNQyxXQUFXLHFCQUFhQyxrQkFBYixFQUFqQjtBQUNBRCxlQUFTRSxPQUFULENBQWlCLHFCQUFhQyxXQUE5QjtBQUNBSCxlQUFTSSxJQUFULEdBQWdCLFVBQWhCO0FBQ0FKLGVBQVNLLFNBQVQsQ0FBbUJDLEtBQW5CLEdBQTJCLEdBQTNCOztBQUVBLFdBQUtDLEtBQUwsR0FBYSxxQkFBYUMsVUFBYixFQUFiO0FBQ0EsV0FBS0QsS0FBTCxDQUFXTCxPQUFYLENBQW1CRixRQUFuQjtBQUNBLFdBQUtPLEtBQUwsQ0FBV0UsSUFBWCxDQUFnQkgsS0FBaEIsR0FBd0IsS0FBS2IsT0FBTCxDQUFhRyxVQUFyQztBQUNEOzs7NEJBRU87QUFDTjs7QUFFQSxVQUFJLENBQUMsS0FBS2MsVUFBVixFQUNFLEtBQUtDLElBQUw7O0FBRUYsV0FBS0MsS0FBTDtBQUNEOzs7c0JBRVFOLEssRUFBTztBQUNkLFdBQUtDLEtBQUwsQ0FBV0UsSUFBWCxDQUFnQkgsS0FBaEIsR0FBd0JBLEtBQXhCO0FBQ0Q7Ozs7O0FBR0gsdUJBQWVPLFFBQWYsQ0FBd0J0QixVQUF4QixFQUFvQ0MsV0FBcEM7O2tCQUVlQSxXIiwiZmlsZSI6IkF1ZGlvTWFzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZSwgc2VydmljZU1hbmFnZXIsIGF1ZGlvQ29udGV4dCB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY29uc3QgU0VSVklDRV9JRCA9ICdzZXJ2aWNlOmF1ZGlvLW1hc3Rlcic7XG5cbmNsYXNzIEF1ZGlvTWFzdGVyIGV4dGVuZHMgU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihTRVJWSUNFX0lELCBmYWxzZSk7XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIGNvbnZvbHZlcjogZmFsc2UsXG4gICAgICBtYXN0ZXJHYWluOiAxLFxuICAgIH07XG5cbiAgICB0aGlzLmNvbmZpZ3VyZShkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnJlcXVpcmUoJ3BsYXRmb3JtJywgeyBmZWF0dXJlczogWyd3ZWItYXVkaW8nXSB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgaGlnaHBhc3MgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG4gICAgaGlnaHBhc3MuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIGhpZ2hwYXNzLnR5cGUgPSAnaGlnaHBhc3MnO1xuICAgIGhpZ2hwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDI1MDtcblxuICAgIHRoaXMuaW5wdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuaW5wdXQuY29ubmVjdChoaWdocGFzcyk7XG4gICAgdGhpcy5pbnB1dC5nYWluLnZhbHVlID0gdGhpcy5vcHRpb25zLm1hc3RlckdhaW47XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQpXG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMucmVhZHkoKTtcbiAgfVxuXG4gIHNldCBnYWluKHZhbHVlKSB7XG4gICAgdGhpcy5pbnB1dC5nYWluLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuc2VydmljZU1hbmFnZXIucmVnaXN0ZXIoU0VSVklDRV9JRCwgQXVkaW9NYXN0ZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBBdWRpb01hc3RlcjtcbiJdfQ==