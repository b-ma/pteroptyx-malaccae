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

var _server = require('soundworks/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server-side 'player' experience.
var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(clientType, com) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this, clientType));

    _this.com = com;

    _this.checkin = _this.require('checkin');
    _this.sharedParams = _this.require('shared-params');
    // this.sharedConfig = this.require('shared-config');

    _this.sync = _this.require('sync');
    return _this;
  }

  // if anything needs to append when the experience starts


  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {}

    // if anything needs to happen when a client enters the performance (*i.e.*
    // starts the experience on the client side), write it in the `enter` method

  }, {
    key: 'enter',
    value: function enter(client) {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'enter', this).call(this, client);
      // send a message to all the other clients of the same type
      this.broadcast(client.type, client, 'play');

      this.receive(client, 'flash', function () {
        _this2.broadcast('player', client, 'process:flash');
      });

      this.com.emit('players', this.clients);
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'exit', this).call(this, client);
      // ...
    }
  }]);
  return PlayerExperience;
}(_server.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiUGxheWVyRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJjb20iLCJjaGVja2luIiwicmVxdWlyZSIsInNoYXJlZFBhcmFtcyIsInN5bmMiLCJjbGllbnQiLCJicm9hZGNhc3QiLCJ0eXBlIiwicmVjZWl2ZSIsImVtaXQiLCJjbGllbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBO0lBQ3FCQSxnQjs7O0FBQ25CLDRCQUFZQyxVQUFaLEVBQXdCQyxHQUF4QixFQUE2QjtBQUFBOztBQUFBLDBKQUNyQkQsVUFEcUI7O0FBRzNCLFVBQUtDLEdBQUwsR0FBV0EsR0FBWDs7QUFFQSxVQUFLQyxPQUFMLEdBQWUsTUFBS0MsT0FBTCxDQUFhLFNBQWIsQ0FBZjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsTUFBS0QsT0FBTCxDQUFhLGVBQWIsQ0FBcEI7QUFDQTs7QUFFQSxVQUFLRSxJQUFMLEdBQVksTUFBS0YsT0FBTCxDQUFhLE1BQWIsQ0FBWjtBQVQyQjtBQVU1Qjs7QUFFRDs7Ozs7NEJBQ1EsQ0FBRTs7QUFFVjtBQUNBOzs7OzBCQUNNRyxNLEVBQVE7QUFBQTs7QUFDWixzSkFBWUEsTUFBWjtBQUNBO0FBQ0EsV0FBS0MsU0FBTCxDQUFlRCxPQUFPRSxJQUF0QixFQUE0QkYsTUFBNUIsRUFBb0MsTUFBcEM7O0FBRUEsV0FBS0csT0FBTCxDQUFhSCxNQUFiLEVBQXFCLE9BQXJCLEVBQThCLFlBQU07QUFDbEMsZUFBS0MsU0FBTCxDQUFlLFFBQWYsRUFBeUJELE1BQXpCLEVBQWlDLGVBQWpDO0FBQ0QsT0FGRDs7QUFJQSxXQUFLTCxHQUFMLENBQVNTLElBQVQsQ0FBYyxTQUFkLEVBQXlCLEtBQUtDLE9BQTlCO0FBQ0Q7Ozt5QkFFSUwsTSxFQUFRO0FBQ1gscUpBQVdBLE1BQVg7QUFDQTtBQUNEOzs7OztrQkFqQ2tCUCxnQiIsImZpbGUiOiJQbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwZXJpZW5jZSB9IGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcblxuLy8gc2VydmVyLXNpZGUgJ3BsYXllcicgZXhwZXJpZW5jZS5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckV4cGVyaWVuY2UgZXh0ZW5kcyBFeHBlcmllbmNlIHtcbiAgY29uc3RydWN0b3IoY2xpZW50VHlwZSwgY29tKSB7XG4gICAgc3VwZXIoY2xpZW50VHlwZSk7XG5cbiAgICB0aGlzLmNvbSA9IGNvbTtcblxuICAgIHRoaXMuY2hlY2tpbiA9IHRoaXMucmVxdWlyZSgnY2hlY2tpbicpO1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zID0gdGhpcy5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG4gICAgLy8gdGhpcy5zaGFyZWRDb25maWcgPSB0aGlzLnJlcXVpcmUoJ3NoYXJlZC1jb25maWcnKTtcblxuICAgIHRoaXMuc3luYyA9IHRoaXMucmVxdWlyZSgnc3luYycpO1xuICB9XG5cbiAgLy8gaWYgYW55dGhpbmcgbmVlZHMgdG8gYXBwZW5kIHdoZW4gdGhlIGV4cGVyaWVuY2Ugc3RhcnRzXG4gIHN0YXJ0KCkge31cblxuICAvLyBpZiBhbnl0aGluZyBuZWVkcyB0byBoYXBwZW4gd2hlbiBhIGNsaWVudCBlbnRlcnMgdGhlIHBlcmZvcm1hbmNlICgqaS5lLipcbiAgLy8gc3RhcnRzIHRoZSBleHBlcmllbmNlIG9uIHRoZSBjbGllbnQgc2lkZSksIHdyaXRlIGl0IGluIHRoZSBgZW50ZXJgIG1ldGhvZFxuICBlbnRlcihjbGllbnQpIHtcbiAgICBzdXBlci5lbnRlcihjbGllbnQpO1xuICAgIC8vIHNlbmQgYSBtZXNzYWdlIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50cyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgdGhpcy5icm9hZGNhc3QoY2xpZW50LnR5cGUsIGNsaWVudCwgJ3BsYXknKTtcblxuICAgIHRoaXMucmVjZWl2ZShjbGllbnQsICdmbGFzaCcsICgpID0+IHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0KCdwbGF5ZXInLCBjbGllbnQsICdwcm9jZXNzOmZsYXNoJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbS5lbWl0KCdwbGF5ZXJzJywgdGhpcy5jbGllbnRzKTtcbiAgfVxuXG4gIGV4aXQoY2xpZW50KSB7XG4gICAgc3VwZXIuZXhpdChjbGllbnQpO1xuICAgIC8vIC4uLlxuICB9XG59XG4iXX0=