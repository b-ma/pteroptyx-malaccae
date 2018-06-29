'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

// --------------------------- example
/**
 * Interface for the view of the `audio-buffer-manager` service.
 *
 * @interface AbstractAudioBufferManagerView
 * @extends module:soundworks/client.View
 */
/**
 * Method called when a new information about the currently loaded assets
 * is received.
 *
 * @function
 * @name AbstractAudioBufferManagerView.onProgress
 * @param {Number} percent - The purcentage of loaded assets.
 */
// ------------------------------------

var noop = function noop() {};

var serviceViews = {
  // ------------------------------------------------
  // AudioBufferManager
  // ------------------------------------------------
  'service:audio-buffer-manager': function (_SegmentedView) {
    (0, _inherits3.default)(AudioBufferManagerView, _SegmentedView);

    function AudioBufferManagerView() {
      (0, _classCallCheck3.default)(this, AudioBufferManagerView);

      var _this = (0, _possibleConstructorReturn3.default)(this, (AudioBufferManagerView.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView)).call(this));

      _this.template = '\n        <div class="section-top flex-middle">\n          <p><%= msg[status] %></p>\n        </div>\n        <div class="section-center flex-center">\n          <% if (showProgress) { %>\n          <div class="progress-wrap">\n            <div class="progress-bar"></div>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this.model = {
        status: 'loading',
        showProgress: true,
        msg: {
          loading: 'Loading sounds...',
          decoding: 'Decoding sounds...'
        }
      };
      return _this;
    }

    (0, _createClass3.default)(AudioBufferManagerView, [{
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(AudioBufferManagerView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView.prototype), 'onRender', this).call(this);
        this.$progressBar = this.$el.querySelector('.progress-bar');
      }
    }, {
      key: 'onProgress',
      value: function onProgress(ratio) {
        var percent = Math.round(ratio * 100);

        if (percent === 100) {
          this.model.status = 'decoding';
          this.render('.section-top');
        }

        if (this.model.showProgress) this.$progressBar.style.width = percent + '%';
      }
    }]);
    return AudioBufferManagerView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Auth
  // ------------------------------------------------
  'service:auth': function (_SegmentedView2) {
    (0, _inherits3.default)(AuthView, _SegmentedView2);

    function AuthView() {
      (0, _classCallCheck3.default)(this, AuthView);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (AuthView.__proto__ || (0, _getPrototypeOf2.default)(AuthView)).call(this));

      _this2.template = '\n        <% if (!rejected) { %>\n          <div class="section-top flex-middle">\n            <p><%= instructions %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div>\n              <input type="password" id="password" />\n              <button class="btn" id="send"><%= send %></button>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= rejectMessage %></p>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } %>\n      ';

      _this2.model = {
        instructions: 'Login',
        send: 'Send',
        reset: 'Reset',
        rejectMessage: 'Sorry, you don\'t have access to this client',
        rejected: false
      };

      _this2._sendPasswordCallback = noop;
      _this2._resetCallback = noop;
      return _this2;
    }

    (0, _createClass3.default)(AuthView, [{
      key: 'onRender',
      value: function onRender() {
        var _this3 = this;

        (0, _get3.default)(AuthView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AuthView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'click #send': function clickSend() {
            var password = _this3.$el.querySelector('#password').value;

            if (password !== '') _this3._sendPasswordCallback(password);
          },
          'click #reset': function clickReset() {
            return _this3._resetCallback();
          }
        });
      }
    }, {
      key: 'setSendPasswordCallback',
      value: function setSendPasswordCallback(callback) {
        this._sendPasswordCallback = callback;
      }
    }, {
      key: 'setResetCallback',
      value: function setResetCallback(callback) {
        this._resetCallback = callback;
      }
    }, {
      key: 'updateRejectedStatus',
      value: function updateRejectedStatus(value) {
        this.model.rejected = value;
        this.render();
      }
    }]);
    return AuthView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Checkin
  // ------------------------------------------------
  'service:checkin': function (_SegmentedView3) {
    (0, _inherits3.default)(CheckinView, _SegmentedView3);

    function CheckinView() {
      (0, _classCallCheck3.default)(this, CheckinView);

      var _this4 = (0, _possibleConstructorReturn3.default)(this, (CheckinView.__proto__ || (0, _getPrototypeOf2.default)(CheckinView)).call(this));

      _this4.template = '\n        <% if (label) { %>\n          <div class="section-top flex-middle">\n            <p class="big"><%= labelPrefix %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div class="checkin-label">\n              <p class="huge bold"><%= label %></p>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <p class="small"><%= labelPostfix %></p>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= error ? errorMessage : wait %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } %>\n      ';

      _this4.model = {
        labelPrefix: 'Go to',
        labelPostfix: 'Touch the screen<br class="portrait-only" />when you are ready.',
        error: false,
        errorMessage: 'Sorry,<br/>no place available',
        wait: 'Please wait...',
        label: ''
      };

      _this4._readyCallback = null;
      return _this4;
    }

    (0, _createClass3.default)(CheckinView, [{
      key: 'onRender',
      value: function onRender() {
        var _this5 = this;

        (0, _get3.default)(CheckinView.prototype.__proto__ || (0, _getPrototypeOf2.default)(CheckinView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';

        this.installEvents((0, _defineProperty3.default)({}, eventName, function () {
          return _this5._readyCallback();
        }));
      }
    }, {
      key: 'setReadyCallback',
      value: function setReadyCallback(callback) {
        this._readyCallback = callback;
      }
    }, {
      key: 'updateLabel',
      value: function updateLabel(value) {
        this.model.label = value;
        this.render();
      }
    }, {
      key: 'updateErrorStatus',
      value: function updateErrorStatus(value) {
        this.model.error = value;
        this.render();
      }
    }]);
    return CheckinView;
  }(_client.SegmentedView),

  'service:language': function (_SegmentedView4) {
    (0, _inherits3.default)(LanguageView, _SegmentedView4);

    function LanguageView() {
      (0, _classCallCheck3.default)(this, LanguageView);

      var _this6 = (0, _possibleConstructorReturn3.default)(this, (LanguageView.__proto__ || (0, _getPrototypeOf2.default)(LanguageView)).call(this));

      _this6.template = '\n        <div class="section-top"></div>\n        <div class="section-center">\n          <% for (let key in options) { %>\n            <button class="btn" data-id="<%= key %>"><%= options[key] %></button>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this6.model = {};

      _this6._selectionCallback = noop;
      return _this6;
    }

    (0, _createClass3.default)(LanguageView, [{
      key: 'onRender',
      value: function onRender() {
        var _this7 = this;

        (0, _get3.default)(LanguageView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LanguageView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';
        this.installEvents((0, _defineProperty3.default)({}, eventName + ' .btn', function undefined(e) {
          var target = e.target;
          var id = target.getAttribute('data-id');
          _this7._selectionCallback(id);
        }));
      }
    }, {
      key: 'setSelectionCallback',
      value: function setSelectionCallback(callback) {
        this._selectionCallback = callback;
      }
    }]);
    return LanguageView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Locator
  // ------------------------------------------------
  'service:locator': function (_SquaredView) {
    (0, _inherits3.default)(LocatorView, _SquaredView);

    function LocatorView() {
      (0, _classCallCheck3.default)(this, LocatorView);

      var _this8 = (0, _possibleConstructorReturn3.default)(this, (LocatorView.__proto__ || (0, _getPrototypeOf2.default)(LocatorView)).call(this));

      _this8.template = '\n        <div class="section-square"></div>\n        <div class="section-float flex-middle">\n          <% if (!showBtn) { %>\n            <p class="small"><%= instructions %></p>\n          <% } else { %>\n            <button class="btn"><%= send %></button>\n          <% } %>\n        </div>\n      ';

      _this8.model = {
        instructions: 'Define your position in the area',
        send: 'Send',
        showBtn: false
      };

      _this8.area = null;
      _this8._selectCallback = noop;

      _this8._onAreaTouchStart = _this8._onAreaTouchStart.bind(_this8);
      _this8._onAreaTouchMove = _this8._onAreaTouchMove.bind(_this8);
      return _this8;
    }

    (0, _createClass3.default)(LocatorView, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onRender', this).call(this);
        this.$areaContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {
        this._area = area;
        this._renderArea();
      }
    }, {
      key: 'setSelectCallback',
      value: function setSelectCallback(callback) {
        this._selectCallback = callback;
      }
    }, {
      key: 'remove',
      value: function remove() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'remove', this).call(this);

        this.surface.removeListener('touchstart', this._onAreaTouchStart);
        this.surface.removeListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: '_renderArea',
      value: function _renderArea() {
        this.selector = new _client.SpaceView();
        this.selector.setArea(this._area);

        this.selector.render();
        this.selector.appendTo(this.$areaContainer);
        this.selector.onRender();

        this.surface = new _client.TouchSurface(this.selector.$svgContainer);
        this.surface.addListener('touchstart', this._onAreaTouchStart);
        this.surface.addListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: '_onAreaTouchStart',
      value: function _onAreaTouchStart(id, normX, normY) {
        var _this9 = this;

        if (!this.position) {
          this._createPosition(normX, normY);

          this.model.showBtn = true;
          this.render('.section-float');
          this.installEvents({
            'click .btn': function clickBtn(e) {
              return _this9._selectCallback(_this9.position.x, _this9.position.y);
            }
          });
        } else {
          this._updatePosition(normX, normY);
        }
      }
    }, {
      key: '_onAreaTouchMove',
      value: function _onAreaTouchMove(id, normX, normY) {
        this._updatePosition(normX, normY);
      }
    }, {
      key: '_createPosition',
      value: function _createPosition(normX, normY) {
        this.position = {
          id: 'locator',
          x: normX * this._area.width,
          y: normY * this._area.height
        };

        this.selector.addPoint(this.position);
      }
    }, {
      key: '_updatePosition',
      value: function _updatePosition(normX, normY) {
        this.position.x = normX * this._area.width;
        this.position.y = normY * this._area.height;

        this.selector.updatePoint(this.position);
      }
    }]);
    return LocatorView;
  }(_client.SquaredView),

  // ------------------------------------------------
  // Placer
  // ------------------------------------------------
  'service:placer': function (_SquaredView2) {
    (0, _inherits3.default)(PlacerViewList, _SquaredView2);

    function PlacerViewList() {
      (0, _classCallCheck3.default)(this, PlacerViewList);

      var _this10 = (0, _possibleConstructorReturn3.default)(this, (PlacerViewList.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList)).call(this));

      _this10.template = '\n        <div class="section-square flex-middle">\n          <% if (rejected) { %>\n          <div class="fit-container flex-middle">\n            <p><%= reject %></p>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-float flex-middle">\n          <% if (!rejected) { %>\n            <% if (showBtn) { %>\n              <button class="btn"><%= send %></button>\n            <% } %>\n          <% } %>\n        </div>\n      ';

      _this10.model = {
        instructions: 'Select your position',
        send: 'Send',
        reject: 'Sorry, no place is available',
        showBtn: false,
        rejected: false
      };

      _this10._onSelectionChange = _this10._onSelectionChange.bind(_this10);
      return _this10;
    }

    (0, _createClass3.default)(PlacerViewList, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: '_onSelectionChange',
      value: function _onSelectionChange(e) {
        var _this11 = this;

        this.model.showBtn = true;
        this.render('.section-float');

        this.installEvents({
          'click .btn': function clickBtn(e) {
            var position = _this11.selector.value;

            if (position) _this11._onSelect(position.index, position.label, position.coordinates);
          }
        });
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {/* no need for area */}
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onRender', this).call(this);
        this.$selectorContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: 'displayPositions',
      value: function displayPositions(capacity) {
        var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var coordinates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var maxClientsPerPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.positions = [];
        this.numberPositions = capacity / maxClientsPerPosition;

        for (var index = 0; index < this.numberPositions; index++) {
          var label = labels !== null ? labels[index] : (index + 1).toString();
          var position = { index: index, label: label };

          if (coordinates) position.coordinates = coordinates[index];

          this.positions.push(position);
        }

        this.selector = new _client.SelectView({
          instructions: this.model.instructions,
          entries: this.positions
        });

        this.selector.render();
        this.selector.appendTo(this.$selectorContainer);
        this.selector.onRender();

        this.selector.installEvents({
          'change': this._onSelectionChange
        });
      }
    }, {
      key: 'updateDisabledPositions',
      value: function updateDisabledPositions(indexes) {
        for (var index = 0; index < this.numberPositions; index++) {
          if (indexes.indexOf(index) === -1) this.selector.enableIndex(index);else this.selector.disableIndex(index);
        }
      }
    }, {
      key: 'setSelectCallack',
      value: function setSelectCallack(callback) {
        this._onSelect = callback;
      }
    }, {
      key: 'reject',
      value: function reject(disabledPositions) {
        this.model.rejected = true;
        this.render();
      }
    }]);
    return PlacerViewList;
  }(_client.SquaredView),

  // graphic placer flavor for predetermined coordinates
  // 'service:placer': class PlacerViewGraphic extends SquaredView {
  //   constructor() {
  //     super();

  //     this.template = `
  //       <div class="section-square flex-middle">
  //         <% if (rejected) { %>
  //         <div class="fit-container flex-middle">
  //           <p><%= reject %></p>
  //         </div>
  //         <% } %>
  //       </div>
  //       <div class="section-float flex-middle">
  //         <% if (!rejected) { %>
  //           <% if (showBtn) { %>
  //             <button class="btn"><%= send %></button>
  //           <% } %>
  //         <% } %>
  //       </div>
  //     `;

  //     this.model = {
  //       instructions: 'Select your position',
  //       send: 'Send',
  //       reject: 'Sorry, no place is available',
  //       showBtn: false,
  //       rejected: false,
  //     };

  //     this._area = null;
  //     this._disabledPositions = [];
  //     this._onSelectionChange = this._onSelectionChange.bind(this);
  //   }

  //   show() {
  //     super.show();
  //     this.selector.show();
  //   }

  //   onRender() {
  //     super.onRender();
  //     this.$selectorContainer = this.$el.querySelector('.section-square');
  //   }

  //   onResize(viewportWidth, viewportHeight, orientation) {
  //     super.onResize(viewportWidth, viewportHeight, orientation);

  //     if (this.selector)
  //       this.selector.onResize(viewportWidth, viewportHeight, orientation);
  //   }

  //   _onSelectionChange(e) {
  //     const position = this.selector.shapePointMap.get(e.target);
  //     const disabledIndex = this._disabledPositions.indexOf(position.index);

  //     if (disabledIndex === -1)
  //       this._onSelect(position.id, position.label, [position.x, position.y]);
  //   }

  //   setArea(area) {
  //     this._area = area;
  //   }

  //   displayPositions(capacity, labels = null, coordinates = null, maxClientsPerPosition = 1) {
  //     this.numberPositions = capacity / maxClientsPerPosition;
  //     this.positions = [];

  //     for (let i = 0; i < this.numberPositions; i++) {
  //       const label = labels !== null ? labels[i] : (i + 1).toString();
  //       const position = { id: i, label: label };
  //       const coords = coordinates[i];
  //       position.x = coords[0];
  //       position.y = coords[1];

  //       this.positions.push(position);
  //     }

  //     this.selector = new SpaceView();
  //     this.selector.setArea(this._area);
  //     this.selector.render();
  //     this.selector.appendTo(this.$selectorContainer);
  //     this.selector.onRender();
  //     this.selector.setPoints(this.positions);

  //     this.selector.installEvents({
  //       'click .point': this._onSelectionChange
  //     });
  //   }

  //   updateDisabledPositions(indexes) {
  //     this._disabledPositions = indexes;

  //     for (let index = 0; index < this.numberPositions; index++) {
  //       const position = this.positions[index];
  //       const isDisabled = indexes.indexOf(index) !== -1;
  //       position.selected = isDisabled ? true : false;
  //       this.selector.updatePoint(position);
  //     }
  //   }

  //   setSelectCallack(callback) {
  //     this._onSelect = callback;
  //   }

  //   reject(disabledPositions) {
  //     this.model.rejected = true;
  //     this.render();
  //   }
  // },

  // ------------------------------------------------
  // Platform
  // ------------------------------------------------
  'service:platform': function (_SegmentedView5) {
    (0, _inherits3.default)(PlatformView, _SegmentedView5);

    function PlatformView() {
      (0, _classCallCheck3.default)(this, PlatformView);

      var _this12 = (0, _possibleConstructorReturn3.default)(this, (PlatformView.__proto__ || (0, _getPrototypeOf2.default)(PlatformView)).call(this));

      _this12.template = '\n        <% if (isCompatible === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorCompatibleMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else if (hasAuthorizations === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorHooksMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else { %>\n          <div class="section-top flex-middle"></div>\n          <div class="section-center flex-center">\n              <p class="big">\n                <%= intro %>\n                <br />\n                <b><%= globals.appName %></b>\n              </p>\n          </div>\n          <div class="section-bottom flex-middle">\n            <% if (checking === true) { %>\n            <p class="small soft-blink"><%= checkingMessage %></p>\n            <% } else if (hasAuthorizations === true) { %>\n            <p class="small soft-blink"><%= instructions %></p>\n            <% } %>\n          </div>\n        <% } %>\n      ';

      _this12.model = {
        isCompatible: null,
        hasAuthorizations: null,
        checking: false,
        intro: 'Welcome to',
        instructions: 'Touch the screen to join!',
        checkingMessage: 'Please wait while checking compatiblity',
        errorCompatibleMessage: 'Sorry,<br />Your device is not compatible with the application.',
        errorHooksMessage: 'Sorry,<br />The application didn\'t obtain the necessary authorizations.'
      };

      _this12._touchstartCallback = noop;
      _this12._mousedownCallback = noop;
      return _this12;
    }

    (0, _createClass3.default)(PlatformView, [{
      key: 'onRender',
      value: function onRender() {
        var _this13 = this;

        (0, _get3.default)(PlatformView.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlatformView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'mousedown': function mousedown(e) {
            return _this13._mousedownCallback(e);
          },
          'touchstart': function touchstart(e) {
            return _this13._touchstartCallback(e);
          }
        });
      }
    }, {
      key: 'setTouchStartCallback',
      value: function setTouchStartCallback(callback) {
        this._touchstartCallback = callback;
      }
    }, {
      key: 'setMouseDownCallback',
      value: function setMouseDownCallback(callback) {
        this._mousedownCallback = callback;
      }
    }, {
      key: 'updateCheckingStatus',
      value: function updateCheckingStatus(value) {
        this.model.checking = value;
        this.render();
      }
    }, {
      key: 'updateIsCompatibleStatus',
      value: function updateIsCompatibleStatus(value) {
        this.model.isCompatible = value;
        this.render();
      }
    }, {
      key: 'updateHasAuthorizationsStatus',
      value: function updateHasAuthorizationsStatus(value) {
        this.model.hasAuthorizations = value;
        this.render();
      }
    }]);
    return PlatformView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Raw-Socket
  // ------------------------------------------------
  'service:raw-socket': function (_SegmentedView6) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView6);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this14 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this14.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this14.model = {
        wait: 'Opening socket,<br />stand by&hellip;'
      };
      return _this14;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Sync
  // ------------------------------------------------
  'service:sync': function (_SegmentedView7) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView7);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this15 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this15.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this15.model = {
        wait: 'Clock syncing,<br />stand by&hellip;'
      };
      return _this15;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // public API
  has: function has(id) {
    return !!this[id];
  },
  get: function get(id, config) {
    var ctor = this[id];
    var view = new ctor();
    // additionnal configuration
    view.model.globals = (0, _assign2.default)({}, config);
    view.options.id = id.replace(/\:/g, '-');

    return view;
  }
};

exports.default = serviceViews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VWaWV3cy5qcyJdLCJuYW1lcyI6WyJub29wIiwic2VydmljZVZpZXdzIiwidGVtcGxhdGUiLCJtb2RlbCIsInN0YXR1cyIsInNob3dQcm9ncmVzcyIsIm1zZyIsImxvYWRpbmciLCJkZWNvZGluZyIsIiRwcm9ncmVzc0JhciIsIiRlbCIsInF1ZXJ5U2VsZWN0b3IiLCJyYXRpbyIsInBlcmNlbnQiLCJNYXRoIiwicm91bmQiLCJyZW5kZXIiLCJzdHlsZSIsIndpZHRoIiwiaW5zdHJ1Y3Rpb25zIiwic2VuZCIsInJlc2V0IiwicmVqZWN0TWVzc2FnZSIsInJlamVjdGVkIiwiX3NlbmRQYXNzd29yZENhbGxiYWNrIiwiX3Jlc2V0Q2FsbGJhY2siLCJpbnN0YWxsRXZlbnRzIiwicGFzc3dvcmQiLCJ2YWx1ZSIsImNhbGxiYWNrIiwibGFiZWxQcmVmaXgiLCJsYWJlbFBvc3RmaXgiLCJlcnJvciIsImVycm9yTWVzc2FnZSIsIndhaXQiLCJsYWJlbCIsIl9yZWFkeUNhbGxiYWNrIiwiZXZlbnROYW1lIiwib3B0aW9ucyIsImludGVyYWN0aW9uIiwiX3NlbGVjdGlvbkNhbGxiYWNrIiwiZSIsInRhcmdldCIsImlkIiwiZ2V0QXR0cmlidXRlIiwic2hvd0J0biIsImFyZWEiLCJfc2VsZWN0Q2FsbGJhY2siLCJfb25BcmVhVG91Y2hTdGFydCIsImJpbmQiLCJfb25BcmVhVG91Y2hNb3ZlIiwic2VsZWN0b3IiLCJzaG93IiwiJGFyZWFDb250YWluZXIiLCJfYXJlYSIsIl9yZW5kZXJBcmVhIiwic3VyZmFjZSIsInJlbW92ZUxpc3RlbmVyIiwidmlld3BvcnRXaWR0aCIsInZpZXdwb3J0SGVpZ2h0Iiwib3JpZW50YXRpb24iLCJvblJlc2l6ZSIsInNldEFyZWEiLCJhcHBlbmRUbyIsIm9uUmVuZGVyIiwiJHN2Z0NvbnRhaW5lciIsImFkZExpc3RlbmVyIiwibm9ybVgiLCJub3JtWSIsInBvc2l0aW9uIiwiX2NyZWF0ZVBvc2l0aW9uIiwieCIsInkiLCJfdXBkYXRlUG9zaXRpb24iLCJoZWlnaHQiLCJhZGRQb2ludCIsInVwZGF0ZVBvaW50IiwicmVqZWN0IiwiX29uU2VsZWN0aW9uQ2hhbmdlIiwiX29uU2VsZWN0IiwiaW5kZXgiLCJjb29yZGluYXRlcyIsIiRzZWxlY3RvckNvbnRhaW5lciIsImNhcGFjaXR5IiwibGFiZWxzIiwibWF4Q2xpZW50c1BlclBvc2l0aW9uIiwicG9zaXRpb25zIiwibnVtYmVyUG9zaXRpb25zIiwidG9TdHJpbmciLCJwdXNoIiwiZW50cmllcyIsImluZGV4ZXMiLCJpbmRleE9mIiwiZW5hYmxlSW5kZXgiLCJkaXNhYmxlSW5kZXgiLCJkaXNhYmxlZFBvc2l0aW9ucyIsImlzQ29tcGF0aWJsZSIsImhhc0F1dGhvcml6YXRpb25zIiwiY2hlY2tpbmciLCJpbnRybyIsImNoZWNraW5nTWVzc2FnZSIsImVycm9yQ29tcGF0aWJsZU1lc3NhZ2UiLCJlcnJvckhvb2tzTWVzc2FnZSIsIl90b3VjaHN0YXJ0Q2FsbGJhY2siLCJfbW91c2Vkb3duQ2FsbGJhY2siLCJoYXMiLCJnZXQiLCJjb25maWciLCJjdG9yIiwidmlldyIsImdsb2JhbHMiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBUUE7QUFDQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBUUE7O0FBRUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjs7QUFFQSxJQUFNQyxlQUFlO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBQ0Usc0NBQXFCO0FBQUE7O0FBQUE7O0FBR25CLFlBQUtDLFFBQUw7O0FBY0EsWUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGdCQUFRLFNBREc7QUFFWEMsc0JBQWMsSUFGSDtBQUdYQyxhQUFLO0FBQ0hDLG1CQUFTLG1CQUROO0FBRUhDLG9CQUFVO0FBRlA7QUFITSxPQUFiO0FBakJtQjtBQXlCcEI7O0FBMUJIO0FBQUE7QUFBQSxpQ0E0QmE7QUFDVDtBQUNBLGFB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LEVBM3JCZSxFQTJyQlhnRSxNQTNyQlcsRUEyckJIO0FBQ2QsUUFBTUMsT0FBTyxLQUFLakUsRUFBTCxDQUFiO0FBQ0EsUUFBTWtFLE9BQU8sSUFBSUQsSUFBSixFQUFiO0FBQ0E7QUFDQUMsU0FBSzFHLEtBQUwsQ0FBVzJHLE9BQVgsR0FBcUIsc0JBQWMsRUFBZCxFQUFrQkgsTUFBbEIsQ0FBckI7QUFDQUUsU0FBS3ZFLE9BQUwsQ0FBYUssRUFBYixHQUFrQkEsR0FBR29FLE9BQUgsQ0FBVyxLQUFYLEVBQWtCLEdBQWxCLENBQWxCOztBQUVBLFdBQU9GLElBQVA7QUFDRDtBQW5zQmtCLENBQXJCOztrQkFzc0JlNUcsWSIsImZpbGUiOiJzZXJ2aWNlVmlld3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTZWdtZW50ZWRWaWV3LFxuICBTZWxlY3RWaWV3LFxuICBTcGFjZVZpZXcsXG4gIFNxdWFyZWRWaWV3LFxuICBUb3VjaFN1cmZhY2UsXG59IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV4YW1wbGVcbi8qKlxuICogSW50ZXJmYWNlIGZvciB0aGUgdmlldyBvZiB0aGUgYGF1ZGlvLWJ1ZmZlci1tYW5hZ2VyYCBzZXJ2aWNlLlxuICpcbiAqIEBpbnRlcmZhY2UgQWJzdHJhY3RBdWRpb0J1ZmZlck1hbmFnZXJWaWV3XG4gKiBAZXh0ZW5kcyBtb2R1bGU6c291bmR3b3Jrcy9jbGllbnQuVmlld1xuICovXG4vKipcbiAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhIG5ldyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudGx5IGxvYWRlZCBhc3NldHNcbiAqIGlzIHJlY2VpdmVkLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgQWJzdHJhY3RBdWRpb0J1ZmZlck1hbmFnZXJWaWV3Lm9uUHJvZ3Jlc3NcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50IC0gVGhlIHB1cmNlbnRhZ2Ugb2YgbG9hZGVkIGFzc2V0cy5cbiAqL1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3Qgc2VydmljZVZpZXdzID0ge1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXVkaW9CdWZmZXJNYW5hZ2VyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTphdWRpby1idWZmZXItbWFuYWdlcic6IGNsYXNzIEF1ZGlvQnVmZmVyTWFuYWdlclZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8cD48JT0gbXNnW3N0YXR1c10gJT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICA8JSBpZiAoc2hvd1Byb2dyZXNzKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLXdyYXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIHN0YXR1czogJ2xvYWRpbmcnLFxuICAgICAgICBzaG93UHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgIG1zZzoge1xuICAgICAgICAgIGxvYWRpbmc6ICdMb2FkaW5nIHNvdW5kcy4uLicsXG4gICAgICAgICAgZGVjb2Rpbmc6ICdEZWNvZGluZyBzb3VuZHMuLi4nLFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgICAgIHRoaXMuJHByb2dyZXNzQmFyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLWJhcicpO1xuICAgIH1cblxuICAgIG9uUHJvZ3Jlc3MocmF0aW8pIHtcbiAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKTtcblxuICAgICAgaWYgKHBlcmNlbnQgPT09IDEwMCkge1xuICAgICAgICB0aGlzLm1vZGVsLnN0YXR1cyA9ICdkZWNvZGluZyc7XG4gICAgICAgIHRoaXMucmVuZGVyKCcuc2VjdGlvbi10b3AnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubW9kZWwuc2hvd1Byb2dyZXNzKVxuICAgICAgICB0aGlzLiRwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBdXRoXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTphdXRoJzogY2xhc3MgQXV0aFZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDwlIGlmICghcmVqZWN0ZWQpIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxwPjwlPSBpbnN0cnVjdGlvbnMgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIC8+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBpZD1cInNlbmRcIj48JT0gc2VuZCAlPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXRcIiBjbGFzcz1cImJ0blwiPjwlPSByZXNldCAlPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8JSB9IGVsc2UgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPHA+PCU9IHJlamVjdE1lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXRcIiBjbGFzcz1cImJ0blwiPjwlPSByZXNldCAlPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8JSB9ICU+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBpbnN0cnVjdGlvbnM6ICdMb2dpbicsXG4gICAgICAgIHNlbmQ6ICdTZW5kJyxcbiAgICAgICAgcmVzZXQ6ICdSZXNldCcsXG4gICAgICAgIHJlamVjdE1lc3NhZ2U6IGBTb3JyeSwgeW91IGRvbid0IGhhdmUgYWNjZXNzIHRvIHRoaXMgY2xpZW50YCxcbiAgICAgICAgcmVqZWN0ZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fc2VuZFBhc3N3b3JkQ2FsbGJhY2sgPSBub29wO1xuICAgICAgdGhpcy5fcmVzZXRDYWxsYmFjayA9IG5vb3A7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuXG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAnY2xpY2sgI3NlbmQnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcblxuICAgICAgICAgIGlmIChwYXNzd29yZCAhPT0gJycpXG4gICAgICAgICAgICB0aGlzLl9zZW5kUGFzc3dvcmRDYWxsYmFjayhwYXNzd29yZCk7XG4gICAgICAgIH0sXG4gICAgICAgICdjbGljayAjcmVzZXQnOiAoKSA9PiB0aGlzLl9yZXNldENhbGxiYWNrKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRTZW5kUGFzc3dvcmRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fc2VuZFBhc3N3b3JkQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBzZXRSZXNldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9yZXNldENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgdXBkYXRlUmVqZWN0ZWRTdGF0dXModmFsdWUpIHtcbiAgICAgIHRoaXMubW9kZWwucmVqZWN0ZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBDaGVja2luXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTpjaGVja2luJzogY2xhc3MgQ2hlY2tpblZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDwlIGlmIChsYWJlbCkgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gbGFiZWxQcmVmaXggJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tpbi1sYWJlbFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImh1Z2UgYm9sZFwiPjwlPSBsYWJlbCAlPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwlPSBsYWJlbFBvc3RmaXggJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cD48JT0gZXJyb3IgPyBlcnJvck1lc3NhZ2UgOiB3YWl0ICU+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgICA8JSB9ICU+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBsYWJlbFByZWZpeDogJ0dvIHRvJyxcbiAgICAgICAgbGFiZWxQb3N0Zml4OiAnVG91Y2ggdGhlIHNjcmVlbjxiciBjbGFzcz1cInBvcnRyYWl0LW9ubHlcIiAvPndoZW4geW91IGFyZSByZWFkeS4nLFxuICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgIGVycm9yTWVzc2FnZTogJ1NvcnJ5LDxici8+bm8gcGxhY2UgYXZhaWxhYmxlJyxcbiAgICAgICAgd2FpdDogJ1BsZWFzZSB3YWl0Li4uJyxcbiAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fcmVhZHlDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuXG4gICAgICBjb25zdCBldmVudE5hbWUgPSB0aGlzLm9wdGlvbnMuaW50ZXJhY3Rpb24gPT09ICdtb3VzZScgPyAnY2xpY2snIDogJ3RvdWNoc3RhcnQnO1xuXG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICBbZXZlbnROYW1lXTogKCkgPT4gdGhpcy5fcmVhZHlDYWxsYmFjaygpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0UmVhZHlDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fcmVhZHlDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHVwZGF0ZUxhYmVsKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLmxhYmVsID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUVycm9yU3RhdHVzKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLmVycm9yID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAnc2VydmljZTpsYW5ndWFnZSc6IGNsYXNzIExhbmd1YWdlVmlldyBleHRlbmRzIFNlZ21lbnRlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlclwiPlxuICAgICAgICAgIDwlIGZvciAobGV0IGtleSBpbiBvcHRpb25zKSB7ICU+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1pZD1cIjwlPSBrZXkgJT5cIj48JT0gb3B0aW9uc1trZXldICU+PC9idXR0b24+XG4gICAgICAgICAgPCUgfSAlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge307XG5cbiAgICAgIHRoaXMuX3NlbGVjdGlvbkNhbGxiYWNrID0gbm9vcDtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG5cbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IHRoaXMub3B0aW9ucy5pbnRlcmFjdGlvbiA9PT0gJ21vdXNlJyA/ICdjbGljaycgOiAndG91Y2hzdGFydCc7XG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICBbYCR7ZXZlbnROYW1lfSAuYnRuYF06IChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0aW9uQ2FsbGJhY2soaWQpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25DYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIExvY2F0b3JcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOmxvY2F0b3InOiBjbGFzcyBMb2NhdG9yVmlldyBleHRlbmRzIFNxdWFyZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1mbG9hdCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgIDwlIGlmICghc2hvd0J0bikgeyAlPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwlPSBpbnN0cnVjdGlvbnMgJT48L3A+XG4gICAgICAgICAgPCUgfSBlbHNlIHsgJT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIj48JT0gc2VuZCAlPjwvYnV0dG9uPlxuICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBpbnN0cnVjdGlvbnM6ICdEZWZpbmUgeW91ciBwb3NpdGlvbiBpbiB0aGUgYXJlYScsXG4gICAgICAgIHNlbmQ6ICdTZW5kJyxcbiAgICAgICAgc2hvd0J0bjogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFyZWEgPSBudWxsO1xuICAgICAgdGhpcy5fc2VsZWN0Q2FsbGJhY2sgPSBub29wO1xuXG4gICAgICB0aGlzLl9vbkFyZWFUb3VjaFN0YXJ0ID0gdGhpcy5fb25BcmVhVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5fb25BcmVhVG91Y2hNb3ZlID0gdGhpcy5fb25BcmVhVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdygpO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgICAgIHRoaXMuJGFyZWFDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1zcXVhcmUnKTtcbiAgICB9XG5cbiAgICBzZXRBcmVhKGFyZWEpIHtcbiAgICAgIHRoaXMuX2FyZWEgPSBhcmVhO1xuICAgICAgdGhpcy5fcmVuZGVyQXJlYSgpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9zZWxlY3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgIHN1cGVyLnJlbW92ZSgpO1xuXG4gICAgICB0aGlzLnN1cmZhY2UucmVtb3ZlTGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbkFyZWFUb3VjaFN0YXJ0KTtcbiAgICAgIHRoaXMuc3VyZmFjZS5yZW1vdmVMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25BcmVhVG91Y2hNb3ZlKTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdG9yKVxuICAgICAgICB0aGlzLnNlbGVjdG9yLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG4gICAgfVxuXG4gICAgX3JlbmRlckFyZWEoKSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gbmV3IFNwYWNlVmlldygpO1xuICAgICAgdGhpcy5zZWxlY3Rvci5zZXRBcmVhKHRoaXMuX2FyZWEpO1xuXG4gICAgICB0aGlzLnNlbGVjdG9yLnJlbmRlcigpO1xuICAgICAgdGhpcy5zZWxlY3Rvci5hcHBlbmRUbyh0aGlzLiRhcmVhQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5zdXJmYWNlID0gbmV3IFRvdWNoU3VyZmFjZSh0aGlzLnNlbGVjdG9yLiRzdmdDb250YWluZXIpO1xuICAgICAgdGhpcy5zdXJmYWNlLmFkZExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25BcmVhVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnN1cmZhY2UuYWRkTGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uQXJlYVRvdWNoTW92ZSk7XG4gICAgfVxuXG4gICAgX29uQXJlYVRvdWNoU3RhcnQoaWQsIG5vcm1YLCBub3JtWSkge1xuICAgICAgaWYgKCF0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBvc2l0aW9uKG5vcm1YLCBub3JtWSk7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5zaG93QnRuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXIoJy5zZWN0aW9uLWZsb2F0Jyk7XG4gICAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cyh7XG4gICAgICAgICAgJ2NsaWNrIC5idG4nOiAoZSkgPT4gdGhpcy5fc2VsZWN0Q2FsbGJhY2sodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKG5vcm1YLCBub3JtWSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX29uQXJlYVRvdWNoTW92ZShpZCwgbm9ybVgsIG5vcm1ZKSB7XG4gICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpO1xuICAgIH1cblxuICAgIF9jcmVhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgIGlkOiAnbG9jYXRvcicsXG4gICAgICAgIHg6IG5vcm1YICogdGhpcy5fYXJlYS53aWR0aCxcbiAgICAgICAgeTogbm9ybVkgKiB0aGlzLl9hcmVhLmhlaWdodCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IuYWRkUG9pbnQodGhpcy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVBvc2l0aW9uKG5vcm1YLCBub3JtWSkge1xuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gbm9ybVggKiB0aGlzLl9hcmVhLndpZHRoO1xuICAgICAgdGhpcy5wb3NpdGlvbi55ID0gbm9ybVkgKiB0aGlzLl9hcmVhLmhlaWdodDtcblxuICAgICAgdGhpcy5zZWxlY3Rvci51cGRhdGVQb2ludCh0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFBsYWNlclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6cGxhY2VyJzogY2xhc3MgUGxhY2VyVmlld0xpc3QgZXh0ZW5kcyBTcXVhcmVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1zcXVhcmUgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8JSBpZiAocmVqZWN0ZWQpIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZml0LWNvbnRhaW5lciBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPHA+PCU9IHJlamVjdCAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1mbG9hdCBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgIDwlIGlmICghcmVqZWN0ZWQpIHsgJT5cbiAgICAgICAgICAgIDwlIGlmIChzaG93QnRuKSB7ICU+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIj48JT0gc2VuZCAlPjwvYnV0dG9uPlxuICAgICAgICAgICAgPCUgfSAlPlxuICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBpbnN0cnVjdGlvbnM6ICdTZWxlY3QgeW91ciBwb3NpdGlvbicsXG4gICAgICAgIHNlbmQ6ICdTZW5kJyxcbiAgICAgICAgcmVqZWN0OiAnU29ycnksIG5vIHBsYWNlIGlzIGF2YWlsYWJsZScsXG4gICAgICAgIHNob3dCdG46IGZhbHNlLFxuICAgICAgICByZWplY3RlZDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZSA9IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdygpO1xuICAgIH1cblxuICAgIF9vblNlbGVjdGlvbkNoYW5nZShlKSB7XG4gICAgICB0aGlzLm1vZGVsLnNob3dCdG4gPSB0cnVlO1xuICAgICAgdGhpcy5yZW5kZXIoJy5zZWN0aW9uLWZsb2F0Jyk7XG5cbiAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cyh7XG4gICAgICAgICdjbGljayAuYnRuJzogKGUpID0+IHtcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2VsZWN0b3IudmFsdWU7XG5cbiAgICAgICAgICBpZiAocG9zaXRpb24pXG4gICAgICAgICAgICB0aGlzLl9vblNlbGVjdChwb3NpdGlvbi5pbmRleCwgcG9zaXRpb24ubGFiZWwsIHBvc2l0aW9uLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0QXJlYShhcmVhKSB7IC8qIG5vIG5lZWQgZm9yIGFyZWEgKi8gfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuICAgICAgdGhpcy4kc2VsZWN0b3JDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1zcXVhcmUnKTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pIHtcbiAgICAgIHN1cGVyLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdG9yKVxuICAgICAgICB0aGlzLnNlbGVjdG9yLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG4gICAgfVxuXG4gICAgZGlzcGxheVBvc2l0aW9ucyhjYXBhY2l0eSwgbGFiZWxzID0gbnVsbCwgY29vcmRpbmF0ZXMgPSBudWxsLCBtYXhDbGllbnRzUGVyUG9zaXRpb24gPSAxKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5udW1iZXJQb3NpdGlvbnMgPSBjYXBhY2l0eSAvIG1heENsaWVudHNQZXJQb3NpdGlvbjtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubnVtYmVyUG9zaXRpb25zOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxzICE9PSBudWxsID8gbGFiZWxzW2luZGV4XSA6IChpbmRleCArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0geyBpbmRleDogaW5kZXgsIGxhYmVsOiBsYWJlbCB9O1xuXG4gICAgICAgIGlmIChjb29yZGluYXRlcylcbiAgICAgICAgICBwb3NpdGlvbi5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzW2luZGV4XTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWxlY3RvciA9IG5ldyBTZWxlY3RWaWV3KHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiB0aGlzLm1vZGVsLmluc3RydWN0aW9ucyxcbiAgICAgICAgZW50cmllczogdGhpcy5wb3NpdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zZWxlY3Rvci5yZW5kZXIoKTtcbiAgICAgIHRoaXMuc2VsZWN0b3IuYXBwZW5kVG8odGhpcy4kc2VsZWN0b3JDb250YWluZXIpO1xuICAgICAgdGhpcy5zZWxlY3Rvci5vblJlbmRlcigpO1xuXG4gICAgICB0aGlzLnNlbGVjdG9yLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAnY2hhbmdlJzogdGhpcy5fb25TZWxlY3Rpb25DaGFuZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFBvc2l0aW9ucyhpbmRleGVzKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5udW1iZXJQb3NpdGlvbnM7IGluZGV4KyspIHtcbiAgICAgICAgaWYgKGluZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKVxuICAgICAgICAgIHRoaXMuc2VsZWN0b3IuZW5hYmxlSW5kZXgoaW5kZXgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5zZWxlY3Rvci5kaXNhYmxlSW5kZXgoaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFNlbGVjdENhbGxhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX29uU2VsZWN0ID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgcmVqZWN0KGRpc2FibGVkUG9zaXRpb25zKSB7XG4gICAgICB0aGlzLm1vZGVsLnJlamVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9LFxuXG4gIC8vIGdyYXBoaWMgcGxhY2VyIGZsYXZvciBmb3IgcHJlZGV0ZXJtaW5lZCBjb29yZGluYXRlc1xuICAvLyAnc2VydmljZTpwbGFjZXInOiBjbGFzcyBQbGFjZXJWaWV3R3JhcGhpYyBleHRlbmRzIFNxdWFyZWRWaWV3IHtcbiAgLy8gICBjb25zdHJ1Y3RvcigpIHtcbiAgLy8gICAgIHN1cGVyKCk7XG5cbiAgLy8gICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gIC8vICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXNxdWFyZSBmbGV4LW1pZGRsZVwiPlxuICAvLyAgICAgICAgIDwlIGlmIChyZWplY3RlZCkgeyAlPlxuICAvLyAgICAgICAgIDxkaXYgY2xhc3M9XCJmaXQtY29udGFpbmVyIGZsZXgtbWlkZGxlXCI+XG4gIC8vICAgICAgICAgICA8cD48JT0gcmVqZWN0ICU+PC9wPlxuICAvLyAgICAgICAgIDwvZGl2PlxuICAvLyAgICAgICAgIDwlIH0gJT5cbiAgLy8gICAgICAgPC9kaXY+XG4gIC8vICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWZsb2F0IGZsZXgtbWlkZGxlXCI+XG4gIC8vICAgICAgICAgPCUgaWYgKCFyZWplY3RlZCkgeyAlPlxuICAvLyAgICAgICAgICAgPCUgaWYgKHNob3dCdG4pIHsgJT5cbiAgLy8gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiPjwlPSBzZW5kICU+PC9idXR0b24+XG4gIC8vICAgICAgICAgICA8JSB9ICU+XG4gIC8vICAgICAgICAgPCUgfSAlPlxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgIGA7XG5cbiAgLy8gICAgIHRoaXMubW9kZWwgPSB7XG4gIC8vICAgICAgIGluc3RydWN0aW9uczogJ1NlbGVjdCB5b3VyIHBvc2l0aW9uJyxcbiAgLy8gICAgICAgc2VuZDogJ1NlbmQnLFxuICAvLyAgICAgICByZWplY3Q6ICdTb3JyeSwgbm8gcGxhY2UgaXMgYXZhaWxhYmxlJyxcbiAgLy8gICAgICAgc2hvd0J0bjogZmFsc2UsXG4gIC8vICAgICAgIHJlamVjdGVkOiBmYWxzZSxcbiAgLy8gICAgIH07XG5cbiAgLy8gICAgIHRoaXMuX2FyZWEgPSBudWxsO1xuICAvLyAgICAgdGhpcy5fZGlzYWJsZWRQb3NpdGlvbnMgPSBbXTtcbiAgLy8gICAgIHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlID0gdGhpcy5fb25TZWxlY3Rpb25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgLy8gICB9XG5cbiAgLy8gICBzaG93KCkge1xuICAvLyAgICAgc3VwZXIuc2hvdygpO1xuICAvLyAgICAgdGhpcy5zZWxlY3Rvci5zaG93KCk7XG4gIC8vICAgfVxuXG4gIC8vICAgb25SZW5kZXIoKSB7XG4gIC8vICAgICBzdXBlci5vblJlbmRlcigpO1xuICAvLyAgICAgdGhpcy4kc2VsZWN0b3JDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1zcXVhcmUnKTtcbiAgLy8gICB9XG5cbiAgLy8gICBvblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pIHtcbiAgLy8gICAgIHN1cGVyLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG5cbiAgLy8gICAgIGlmICh0aGlzLnNlbGVjdG9yKVxuICAvLyAgICAgICB0aGlzLnNlbGVjdG9yLm9uUmVzaXplKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0LCBvcmllbnRhdGlvbik7XG4gIC8vICAgfVxuXG4gIC8vICAgX29uU2VsZWN0aW9uQ2hhbmdlKGUpIHtcbiAgLy8gICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zZWxlY3Rvci5zaGFwZVBvaW50TWFwLmdldChlLnRhcmdldCk7XG4gIC8vICAgICBjb25zdCBkaXNhYmxlZEluZGV4ID0gdGhpcy5fZGlzYWJsZWRQb3NpdGlvbnMuaW5kZXhPZihwb3NpdGlvbi5pbmRleCk7XG5cbiAgLy8gICAgIGlmIChkaXNhYmxlZEluZGV4ID09PSAtMSlcbiAgLy8gICAgICAgdGhpcy5fb25TZWxlY3QocG9zaXRpb24uaWQsIHBvc2l0aW9uLmxhYmVsLCBbcG9zaXRpb24ueCwgcG9zaXRpb24ueV0pO1xuICAvLyAgIH1cblxuICAvLyAgIHNldEFyZWEoYXJlYSkge1xuICAvLyAgICAgdGhpcy5fYXJlYSA9IGFyZWE7XG4gIC8vICAgfVxuXG4gIC8vICAgZGlzcGxheVBvc2l0aW9ucyhjYXBhY2l0eSwgbGFiZWxzID0gbnVsbCwgY29vcmRpbmF0ZXMgPSBudWxsLCBtYXhDbGllbnRzUGVyUG9zaXRpb24gPSAxKSB7XG4gIC8vICAgICB0aGlzLm51bWJlclBvc2l0aW9ucyA9IGNhcGFjaXR5IC8gbWF4Q2xpZW50c1BlclBvc2l0aW9uO1xuICAvLyAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcblxuICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlclBvc2l0aW9uczsgaSsrKSB7XG4gIC8vICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxzICE9PSBudWxsID8gbGFiZWxzW2ldIDogKGkgKyAxKS50b1N0cmluZygpO1xuICAvLyAgICAgICBjb25zdCBwb3NpdGlvbiA9IHsgaWQ6IGksIGxhYmVsOiBsYWJlbCB9O1xuICAvLyAgICAgICBjb25zdCBjb29yZHMgPSBjb29yZGluYXRlc1tpXTtcbiAgLy8gICAgICAgcG9zaXRpb24ueCA9IGNvb3Jkc1swXTtcbiAgLy8gICAgICAgcG9zaXRpb24ueSA9IGNvb3Jkc1sxXTtcblxuICAvLyAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgLy8gICAgIH1cblxuICAvLyAgICAgdGhpcy5zZWxlY3RvciA9IG5ldyBTcGFjZVZpZXcoKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3Iuc2V0QXJlYSh0aGlzLl9hcmVhKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3IucmVuZGVyKCk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLmFwcGVuZFRvKHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3Iub25SZW5kZXIoKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3Iuc2V0UG9pbnRzKHRoaXMucG9zaXRpb25zKTtcblxuICAvLyAgICAgdGhpcy5zZWxlY3Rvci5pbnN0YWxsRXZlbnRzKHtcbiAgLy8gICAgICAgJ2NsaWNrIC5wb2ludCc6IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlXG4gIC8vICAgICB9KTtcbiAgLy8gICB9XG5cbiAgLy8gICB1cGRhdGVEaXNhYmxlZFBvc2l0aW9ucyhpbmRleGVzKSB7XG4gIC8vICAgICB0aGlzLl9kaXNhYmxlZFBvc2l0aW9ucyA9IGluZGV4ZXM7XG5cbiAgLy8gICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm51bWJlclBvc2l0aW9uczsgaW5kZXgrKykge1xuICAvLyAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zW2luZGV4XTtcbiAgLy8gICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IGluZGV4ZXMuaW5kZXhPZihpbmRleCkgIT09IC0xO1xuICAvLyAgICAgICBwb3NpdGlvbi5zZWxlY3RlZCA9IGlzRGlzYWJsZWQgPyB0cnVlIDogZmFsc2U7XG4gIC8vICAgICAgIHRoaXMuc2VsZWN0b3IudXBkYXRlUG9pbnQocG9zaXRpb24pO1xuICAvLyAgICAgfVxuICAvLyAgIH1cblxuICAvLyAgIHNldFNlbGVjdENhbGxhY2soY2FsbGJhY2spIHtcbiAgLy8gICAgIHRoaXMuX29uU2VsZWN0ID0gY2FsbGJhY2s7XG4gIC8vICAgfVxuXG4gIC8vICAgcmVqZWN0KGRpc2FibGVkUG9zaXRpb25zKSB7XG4gIC8vICAgICB0aGlzLm1vZGVsLnJlamVjdGVkID0gdHJ1ZTtcbiAgLy8gICAgIHRoaXMucmVuZGVyKCk7XG4gIC8vICAgfVxuICAvLyB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQbGF0Zm9ybVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6cGxhdGZvcm0nOiBjbGFzcyBQbGF0Zm9ybVZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDwlIGlmIChpc0NvbXBhdGlibGUgPT09IGZhbHNlKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cD48JT0gZXJyb3JDb21wYXRpYmxlTWVzc2FnZSAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgPCUgfSBlbHNlIGlmIChoYXNBdXRob3JpemF0aW9ucyA9PT0gZmFsc2UpIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxwPjwlPSBlcnJvckhvb2tzTWVzc2FnZSAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgPCUgfSBlbHNlIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJiaWdcIj5cbiAgICAgICAgICAgICAgICA8JT0gaW50cm8gJT5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8Yj48JT0gZ2xvYmFscy5hcHBOYW1lICU+PC9iPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8JSBpZiAoY2hlY2tpbmcgPT09IHRydWUpIHsgJT5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGwgc29mdC1ibGlua1wiPjwlPSBjaGVja2luZ01lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgICA8JSB9IGVsc2UgaWYgKGhhc0F1dGhvcml6YXRpb25zID09PSB0cnVlKSB7ICU+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsIHNvZnQtYmxpbmtcIj48JT0gaW5zdHJ1Y3Rpb25zICU+PC9wPlxuICAgICAgICAgICAgPCUgfSAlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8JSB9ICU+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBpc0NvbXBhdGlibGU6IG51bGwsXG4gICAgICAgIGhhc0F1dGhvcml6YXRpb25zOiBudWxsLFxuICAgICAgICBjaGVja2luZzogZmFsc2UsXG4gICAgICAgIGludHJvOiAnV2VsY29tZSB0bycsXG4gICAgICAgIGluc3RydWN0aW9uczogJ1RvdWNoIHRoZSBzY3JlZW4gdG8gam9pbiEnLFxuICAgICAgICBjaGVja2luZ01lc3NhZ2U6ICdQbGVhc2Ugd2FpdCB3aGlsZSBjaGVja2luZyBjb21wYXRpYmxpdHknLFxuICAgICAgICBlcnJvckNvbXBhdGlibGVNZXNzYWdlOiAnU29ycnksPGJyIC8+WW91ciBkZXZpY2UgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgYXBwbGljYXRpb24uJyxcbiAgICAgICAgZXJyb3JIb29rc01lc3NhZ2U6IGBTb3JyeSw8YnIgLz5UaGUgYXBwbGljYXRpb24gZGlkbid0IG9idGFpbiB0aGUgbmVjZXNzYXJ5IGF1dGhvcml6YXRpb25zLmAsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl90b3VjaHN0YXJ0Q2FsbGJhY2sgPSBub29wO1xuICAgICAgdGhpcy5fbW91c2Vkb3duQ2FsbGJhY2sgPSBub29wO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgJ21vdXNlZG93bic6IChlKSA9PiB0aGlzLl9tb3VzZWRvd25DYWxsYmFjayhlKSxcbiAgICAgICAgJ3RvdWNoc3RhcnQnOiAoZSkgPT4gdGhpcy5fdG91Y2hzdGFydENhbGxiYWNrKGUpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0VG91Y2hTdGFydENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl90b3VjaHN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBzZXRNb3VzZURvd25DYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fbW91c2Vkb3duQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICB1cGRhdGVDaGVja2luZ1N0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5jaGVja2luZyA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJc0NvbXBhdGlibGVTdGF0dXModmFsdWUpIHtcbiAgICAgIHRoaXMubW9kZWwuaXNDb21wYXRpYmxlID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhhc0F1dGhvcml6YXRpb25zU3RhdHVzKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLmhhc0F1dGhvcml6YXRpb25zID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUmF3LVNvY2tldFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6cmF3LXNvY2tldCc6IGNsYXNzIFJhd1NvY2tldFZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInNvZnQtYmxpbmtcIj48JT0gd2FpdCAlPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgd2FpdDogYE9wZW5pbmcgc29ja2V0LDxiciAvPnN0YW5kIGJ5JmhlbGxpcDtgLFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFN5bmNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnN5bmMnOiBjbGFzcyBSYXdTb2NrZXRWaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzb2Z0LWJsaW5rXCI+PCU9IHdhaXQgJT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIHdhaXQ6IGBDbG9jayBzeW5jaW5nLDxiciAvPnN0YW5kIGJ5JmhlbGxpcDtgLFxuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cblxuICAvLyBwdWJsaWMgQVBJXG4gIGhhcyhpZCkge1xuICAgIHJldHVybiAhIXRoaXNbaWRdO1xuICB9LFxuXG4gIGdldChpZCwgY29uZmlnKSB7XG4gICAgY29uc3QgY3RvciA9IHRoaXNbaWRdO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgY3RvcigpO1xuICAgIC8vIGFkZGl0aW9ubmFsIGNvbmZpZ3VyYXRpb25cbiAgICB2aWV3Lm1vZGVsLmdsb2JhbHMgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHZpZXcub3B0aW9ucy5pZCA9IGlkLnJlcGxhY2UoL1xcOi9nLCAnLScpO1xuXG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2aWNlVmlld3M7XG4iXX0=