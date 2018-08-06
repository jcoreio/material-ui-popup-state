'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindMenu = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.bindTrigger = bindTrigger;
exports.bindToggle = bindToggle;
exports.bindHover = bindHover;
exports.bindPopover = bindPopover;
exports.bindPopper = bindPopper;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
function bindTrigger(_ref) {
  var isOpen = _ref.isOpen,
      open = _ref.open,
      popupId = _ref.popupId;

  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onClick: open
  };
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
function bindToggle(_ref2) {
  var isOpen = _ref2.isOpen,
      toggle = _ref2.toggle,
      popupId = _ref2.popupId;

  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onClick: toggle
  };
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
function bindHover(_ref3) {
  var isOpen = _ref3.isOpen,
      open = _ref3.open,
      close = _ref3.close,
      popupId = _ref3.popupId;

  return {
    'aria-owns': isOpen ? popupId : null,
    'aria-haspopup': true,
    onMouseEnter: open,
    onMouseLeave: close
  };
}

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
function bindPopover(_ref4) {
  var isOpen = _ref4.isOpen,
      anchorEl = _ref4.anchorEl,
      close = _ref4.close,
      popupId = _ref4.popupId;

  return {
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen,
    onClose: close
  };
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
var bindMenu = exports.bindMenu = bindPopover;

/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
function bindPopper(_ref5) {
  var isOpen = _ref5.isOpen,
      anchorEl = _ref5.anchorEl,
      popupId = _ref5.popupId;

  return {
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen
  };
}

var eventOrAnchorElWarned = false;

var PopupState = function (_React$Component) {
  (0, _inherits3.default)(PopupState, _React$Component);

  function PopupState() {
    var _ref6;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PopupState);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref6 = PopupState.__proto__ || (0, _getPrototypeOf2.default)(PopupState)).call.apply(_ref6, [this].concat(args))), _this), _this.state = { anchorEl: null }, _this.handleToggle = function (eventOrAnchorEl) {
      if (_this.state.anchorEl) _this.handleClose();else _this.handleOpen(eventOrAnchorEl);
    }, _this.handleOpen = function (eventOrAnchorEl) {
      if (!eventOrAnchorElWarned && !eventOrAnchorEl && !eventOrAnchorEl.target) {
        eventOrAnchorElWarned = true;
        console.error('eventOrAnchorEl should be defined'); // eslint-disable-line no-console
      }
      _this.setState({
        anchorEl: eventOrAnchorEl && eventOrAnchorEl.target ? eventOrAnchorEl.target : eventOrAnchorEl
      });
    }, _this.handleClose = function () {
      return _this.setState({ anchorEl: null });
    }, _this.handleSetOpen = function (open, eventOrAnchorEl) {
      if (open) _this.handleOpen(eventOrAnchorEl);else _this.handleClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PopupState, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          popupId = _props.popupId;
      var anchorEl = this.state.anchorEl;


      var isOpen = Boolean(anchorEl);

      return children({
        open: this.handleOpen,
        close: this.handleClose,
        toggle: this.handleToggle,
        setOpen: this.handleSetOpen,
        isOpen: isOpen,
        anchorEl: anchorEl,
        popupId: popupId
      });
    }
  }]);
  return PopupState;
}(React.Component);

PopupState.propTypes = {
  /**
   * The render function.
   *
   * @param {object} props the properties injected by `PopupState`:
   * <ul>
   *   <li>`open(eventOrAnchorEl)`: opens the popup</li>
   *   <li>`close()`: closes the popup</li>
   *   <li>`toggle(eventOrAnchorEl)`: opens the popup if it is closed, or
   *     closes the popup if it is open.
   *   </li>
   *   <li>`setOpen(open, [eventOrAnchorEl])`: sets whether the popup is open.
   *     `eventOrAnchorEl` is required if `open` is truthy.
   *   </li>
   *   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>
   *   <li>`anchorEl`: the current anchor element (`null` the popup is closed)</li>
   *   <li>`popupId`: the `popupId` prop you passed</li>
   * </ul>
   *
   * @returns {React.Node} the content to display
   */
  children: _propTypes2.default.func.isRequired,
  /**
   * The `id` property to use for the popup.  Will be passed to the render
   * function as `bindPopup.id`, and also used for the `aria-owns` property
   * passed to the trigger component via `bindTrigger`.
   */
  popupId: _propTypes2.default.string
};
exports.default = PopupState;