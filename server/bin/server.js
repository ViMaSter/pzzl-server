/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/debug/src/index.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/debug/src/node.js":
/*!****************************************!*\
  !*** ./node_modules/debug/src/node.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(/*! fs */ "fs");
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(/*! net */ "net");
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "./node_modules/http-shutdown/index.js":
/*!*********************************************!*\
  !*** ./node_modules/http-shutdown/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");

/**
 * Expose `addShutdown`.
 */
exports = module.exports = addShutdown;

/**
 * Adds shutdown functionaility to the `http.Server` object
 * @param {http.Server} server The server to add shutdown functionaility to
 */
function addShutdown(server) {
  var connections = {};
  var isShuttingDown = false;
  var connectionCounter = 0;

  function destroy(socket, force) {
    if (force || (socket._isIdle && isShuttingDown)) {
      socket.destroy();
      delete connections[socket._connectionId];
    }
  };

  function onConnection(socket) {
    var id = connectionCounter++;
    socket._isIdle = true;
    socket._connectionId = id;
    connections[id] = socket;

    socket.on('close', function() {
      delete connections[id];
    });
  };

  server.on('request', function(req, res) {
    req.socket._isIdle = false;

    res.on('finish', function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });

  server.on('connection', onConnection);
  server.on('secureConnection', onConnection);

  function shutdown(force, cb) {
    isShuttingDown = true;
    server.close(function(err) {
      if (cb) {
        process.nextTick(function() { cb(err) });
      }
    });

    Object.keys(connections).forEach(function(key) {
      destroy(connections[key], force);
    });
  };

  server.shutdown = function(cb) {
    shutdown(false, cb);
  };

  server.forceShutdown = function(cb) {
    shutdown(true, cb);
  };

  return server;
};

/**
 * Extends the {http.Server} object with shutdown functionaility.
 * @return {http.Server} The decorated server object
 */
exports.extend = function() {
  http.Server.prototype.withShutdown = function() {
    return addShutdown(this);
  };

  https.Server.prototype.withShutdown = function() {
    return addShutdown(this);
  };
};


/***/ }),

/***/ "./node_modules/is-typedarray/index.js":
/*!*********************************************!*\
  !*** ./node_modules/is-typedarray/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports      = isTypedArray
isTypedArray.strict = isStrictTypedArray
isTypedArray.loose  = isLooseTypedArray

var toString = Object.prototype.toString
var names = {
    '[object Int8Array]': true
  , '[object Int16Array]': true
  , '[object Int32Array]': true
  , '[object Uint8Array]': true
  , '[object Uint8ClampedArray]': true
  , '[object Uint16Array]': true
  , '[object Uint32Array]': true
  , '[object Float32Array]': true
  , '[object Float64Array]': true
}

function isTypedArray(arr) {
  return (
       isStrictTypedArray(arr)
    || isLooseTypedArray(arr)
  )
}

function isStrictTypedArray(arr) {
  return (
       arr instanceof Int8Array
    || arr instanceof Int16Array
    || arr instanceof Int32Array
    || arr instanceof Uint8Array
    || arr instanceof Uint8ClampedArray
    || arr instanceof Uint16Array
    || arr instanceof Uint32Array
    || arr instanceof Float32Array
    || arr instanceof Float64Array
  )
}

function isLooseTypedArray(arr) {
  return names[toString.call(arr)]
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/typedarray-to-buffer/index.js":
/*!****************************************************!*\
  !*** ./node_modules/typedarray-to-buffer/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Convert a typed array to a Buffer without a copy
 *
 * Author:   Feross Aboukhadijeh <https://feross.org>
 * License:  MIT
 *
 * `npm install typedarray-to-buffer`
 */

var isTypedArray = __webpack_require__(/*! is-typedarray */ "./node_modules/is-typedarray/index.js").strict

module.exports = function typedarrayToBuffer (arr) {
  if (isTypedArray(arr)) {
    // To avoid a copy, use the typed array's underlying ArrayBuffer to back new Buffer
    var buf = Buffer.from(arr.buffer)
    if (arr.byteLength !== arr.buffer.byteLength) {
      // Respect the "view", i.e. byteOffset and byteLength, without doing a copy
      buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength)
    }
    return buf
  } else {
    // Pass through all other types to `Buffer.from`
    return Buffer.from(arr)
  }
}


/***/ }),

/***/ "./node_modules/websocket/index.js":
/*!*****************************************!*\
  !*** ./node_modules/websocket/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/websocket */ "./node_modules/websocket/lib/websocket.js");

/***/ }),

/***/ "./node_modules/websocket/lib/BufferUtil.fallback.js":
/*!***********************************************************!*\
  !*** ./node_modules/websocket/lib/BufferUtil.fallback.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Copied from:
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

/* jshint -W086 */

module.exports.BufferUtil = {
  merge: function(mergedBuffer, buffers) {
    var offset = 0;
    for (var i = 0, l = buffers.length; i < l; ++i) {
      var buf = buffers[i];
      buf.copy(mergedBuffer, offset);
      offset += buf.length;
    }
  },
  mask: function(source, mask, output, offset, length) {
    var maskNum = mask.readUInt32LE(0);
    var i = 0;
    for (; i < length - 3; i += 4) {
      var num = maskNum ^ source.readUInt32LE(i);
      if (num < 0) { num = 4294967296 + num; }
      output.writeUInt32LE(num, offset + i);
    }
    switch (length % 4) {
      case 3: output[offset + i + 2] = source[i + 2] ^ mask[2];
      case 2: output[offset + i + 1] = source[i + 1] ^ mask[1];
      case 1: output[offset + i] = source[i] ^ mask[0];
      case 0:
    }
  },
  unmask: function(data, mask) {
    var maskNum = mask.readUInt32LE(0);
    var length = data.length;
    var i = 0;
    for (; i < length - 3; i += 4) {
      var num = maskNum ^ data.readUInt32LE(i);
      if (num < 0) { num = 4294967296 + num; }
      data.writeUInt32LE(num, i);
    }
    switch (length % 4) {
      case 3: data[i + 2] = data[i + 2] ^ mask[2];
      case 2: data[i + 1] = data[i + 1] ^ mask[1];
      case 1: data[i] = data[i] ^ mask[0];
      case 0:
    }
  }
};

/* jshint +W086 */

/***/ }),

/***/ "./node_modules/websocket/lib/BufferUtil.js":
/*!**************************************************!*\
  !*** ./node_modules/websocket/lib/BufferUtil.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copied from:
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

try {
  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../build/Release/bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) { try {
  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../build/default/bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) { try {
  module.exports = __webpack_require__(/*! ./BufferUtil.fallback */ "./node_modules/websocket/lib/BufferUtil.fallback.js");
} catch (e) {
  console.error('bufferutil.node seems to not have been built. Run npm install.');
  throw e;
}}}


/***/ }),

/***/ "./node_modules/websocket/lib/Deprecation.js":
/*!***************************************************!*\
  !*** ./node_modules/websocket/lib/Deprecation.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var Deprecation = {
    disableWarnings: false,

    deprecationWarningMap: {

    },

    warn: function(deprecationName) {
        if (!this.disableWarnings && this.deprecationWarningMap[deprecationName]) {
            console.warn('DEPRECATION WARNING: ' + this.deprecationWarningMap[deprecationName]);
            this.deprecationWarningMap[deprecationName] = false;
        }
    }
};

module.exports = Deprecation;


/***/ }),

/***/ "./node_modules/websocket/lib/Validation.fallback.js":
/*!***********************************************************!*\
  !*** ./node_modules/websocket/lib/Validation.fallback.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * UTF-8 Validation Fallback Code originally from:
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

module.exports.Validation = {
  isValidUTF8: function() {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/websocket/lib/Validation.js":
/*!**************************************************!*\
  !*** ./node_modules/websocket/lib/Validation.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * UTF-8 Validation Code originally from:
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */

try {
    module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../build/Release/validation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) { try {
    module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../build/default/validation'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) { try {
    module.exports = __webpack_require__(/*! ./Validation.fallback */ "./node_modules/websocket/lib/Validation.fallback.js");
} catch (e) {
    console.error('validation.node seems not to have been built. Run npm install.');
    throw e;
}}}


/***/ }),

/***/ "./node_modules/websocket/lib/W3CWebSocket.js":
/*!****************************************************!*\
  !*** ./node_modules/websocket/lib/W3CWebSocket.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var WebSocketClient = __webpack_require__(/*! ./WebSocketClient */ "./node_modules/websocket/lib/WebSocketClient.js");
var toBuffer = __webpack_require__(/*! typedarray-to-buffer */ "./node_modules/typedarray-to-buffer/index.js");
var yaeti = __webpack_require__(/*! yaeti */ "./node_modules/yaeti/index.js");


const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;


module.exports = W3CWebSocket;


function W3CWebSocket(url, protocols, origin, headers, requestOptions, clientConfig) {
    // Make this an EventTarget.
    yaeti.EventTarget.call(this);

    // Sanitize clientConfig.
    clientConfig = clientConfig || {};
    clientConfig.assembleFragments = true;  // Required in the W3C API.

    var self = this;

    this._url = url;
    this._readyState = CONNECTING;
    this._protocol = undefined;
    this._extensions = '';
    this._bufferedAmount = 0;  // Hack, always 0.
    this._binaryType = 'arraybuffer';  // TODO: Should be 'blob' by default, but Node has no Blob.

    // The WebSocketConnection instance.
    this._connection = undefined;

    // WebSocketClient instance.
    this._client = new WebSocketClient(clientConfig);

    this._client.on('connect', function(connection) {
        onConnect.call(self, connection);
    });

    this._client.on('connectFailed', function() {
        onConnectFailed.call(self);
    });

    this._client.connect(url, protocols, origin, headers, requestOptions);
}


// Expose W3C read only attributes.
Object.defineProperties(W3CWebSocket.prototype, {
    url:            { get: function() { return this._url;            } },
    readyState:     { get: function() { return this._readyState;     } },
    protocol:       { get: function() { return this._protocol;       } },
    extensions:     { get: function() { return this._extensions;     } },
    bufferedAmount: { get: function() { return this._bufferedAmount; } }
});


// Expose W3C write/read attributes.
Object.defineProperties(W3CWebSocket.prototype, {
    binaryType: {
        get: function() {
            return this._binaryType;
        },
        set: function(type) {
            // TODO: Just 'arraybuffer' supported.
            if (type !== 'arraybuffer') {
                throw new SyntaxError('just "arraybuffer" type allowed for "binaryType" attribute');
            }
            this._binaryType = type;
        }
    }
});


// Expose W3C readyState constants into the WebSocket instance as W3C states.
[['CONNECTING',CONNECTING], ['OPEN',OPEN], ['CLOSING',CLOSING], ['CLOSED',CLOSED]].forEach(function(property) {
    Object.defineProperty(W3CWebSocket.prototype, property[0], {
        get: function() { return property[1]; }
    });
});

// Also expose W3C readyState constants into the WebSocket class (not defined by the W3C,
// but there are so many libs relying on them).
[['CONNECTING',CONNECTING], ['OPEN',OPEN], ['CLOSING',CLOSING], ['CLOSED',CLOSED]].forEach(function(property) {
    Object.defineProperty(W3CWebSocket, property[0], {
        get: function() { return property[1]; }
    });
});


W3CWebSocket.prototype.send = function(data) {
    if (this._readyState !== OPEN) {
        throw new Error('cannot call send() while not connected');
    }

    // Text.
    if (typeof data === 'string' || data instanceof String) {
        this._connection.sendUTF(data);
    }
    // Binary.
    else {
        // Node Buffer.
        if (data instanceof Buffer) {
            this._connection.sendBytes(data);
        }
        // If ArrayBuffer or ArrayBufferView convert it to Node Buffer.
        else if (data.byteLength || data.byteLength === 0) {
            data = toBuffer(data);
            this._connection.sendBytes(data);
        }
        else {
            throw new Error('unknown binary data:', data);
        }
    }
};


W3CWebSocket.prototype.close = function(code, reason) {
    switch(this._readyState) {
        case CONNECTING:
            // NOTE: We don't have the WebSocketConnection instance yet so no
            // way to close the TCP connection.
            // Artificially invoke the onConnectFailed event.
            onConnectFailed.call(this);
            // And close if it connects after a while.
            this._client.on('connect', function(connection) {
                if (code) {
                    connection.close(code, reason);
                } else {
                    connection.close();
                }
            });
            break;
        case OPEN:
            this._readyState = CLOSING;
            if (code) {
                this._connection.close(code, reason);
            } else {
                this._connection.close();
            }
            break;
        case CLOSING:
        case CLOSED:
            break;
    }
};


/**
 * Private API.
 */


function createCloseEvent(code, reason) {
    var event = new yaeti.Event('close');

    event.code = code;
    event.reason = reason;
    event.wasClean = (typeof code === 'undefined' || code === 1000);

    return event;
}


function createMessageEvent(data) {
    var event = new yaeti.Event('message');

    event.data = data;

    return event;
}


function onConnect(connection) {
    var self = this;

    this._readyState = OPEN;
    this._connection = connection;
    this._protocol = connection.protocol;
    this._extensions = connection.extensions;

    this._connection.on('close', function(code, reason) {
        onClose.call(self, code, reason);
    });

    this._connection.on('message', function(msg) {
        onMessage.call(self, msg);
    });

    this.dispatchEvent(new yaeti.Event('open'));
}


function onConnectFailed() {
    destroy.call(this);
    this._readyState = CLOSED;

    try {
        this.dispatchEvent(new yaeti.Event('error'));
    } finally {
        this.dispatchEvent(createCloseEvent(1006, 'connection failed'));
    }
}


function onClose(code, reason) {
    destroy.call(this);
    this._readyState = CLOSED;

    this.dispatchEvent(createCloseEvent(code, reason || ''));
}


function onMessage(message) {
    if (message.utf8Data) {
        this.dispatchEvent(createMessageEvent(message.utf8Data));
    }
    else if (message.binaryData) {
        // Must convert from Node Buffer to ArrayBuffer.
        // TODO: or to a Blob (which does not exist in Node!).
        if (this.binaryType === 'arraybuffer') {
            var buffer = message.binaryData;
            var arraybuffer = new ArrayBuffer(buffer.length);
            var view = new Uint8Array(arraybuffer);
            for (var i=0, len=buffer.length; i<len; ++i) {
                view[i] = buffer[i];
            }
            this.dispatchEvent(createMessageEvent(arraybuffer));
        }
    }
}


function destroy() {
    this._client.removeAllListeners();
    if (this._connection) {
        this._connection.removeAllListeners();
    }
}


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketClient.js":
/*!*******************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketClient.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var utils = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js");
var extend = utils.extend;
var util = __webpack_require__(/*! util */ "util");
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var url = __webpack_require__(/*! url */ "url");
var crypto = __webpack_require__(/*! crypto */ "crypto");
var WebSocketConnection = __webpack_require__(/*! ./WebSocketConnection */ "./node_modules/websocket/lib/WebSocketConnection.js");
var bufferAllocUnsafe = utils.bufferAllocUnsafe;

var protocolSeparators = [
    '(', ')', '<', '>', '@',
    ',', ';', ':', '\\', '\"',
    '/', '[', ']', '?', '=',
    '{', '}', ' ', String.fromCharCode(9)
];

var excludedTlsOptions = ['hostname','port','method','path','headers'];

function WebSocketClient(config) {
    // Superclass Constructor
    EventEmitter.call(this);

    // TODO: Implement extensions

    this.config = {
        // 1MiB max frame size.
        maxReceivedFrameSize: 0x100000,

        // 8MiB max message size, only applicable if
        // assembleFragments is true
        maxReceivedMessageSize: 0x800000,

        // Outgoing messages larger than fragmentationThreshold will be
        // split into multiple fragments.
        fragmentOutgoingMessages: true,

        // Outgoing frames are fragmented if they exceed this threshold.
        // Default is 16KiB
        fragmentationThreshold: 0x4000,

        // Which version of the protocol to use for this session.  This
        // option will be removed once the protocol is finalized by the IETF
        // It is only available to ease the transition through the
        // intermediate draft protocol versions.
        // At present, it only affects the name of the Origin header.
        webSocketVersion: 13,

        // If true, fragmented messages will be automatically assembled
        // and the full message will be emitted via a 'message' event.
        // If false, each frame will be emitted via a 'frame' event and
        // the application will be responsible for aggregating multiple
        // fragmented frames.  Single-frame messages will emit a 'message'
        // event in addition to the 'frame' event.
        // Most users will want to leave this set to 'true'
        assembleFragments: true,

        // The Nagle Algorithm makes more efficient use of network resources
        // by introducing a small delay before sending small packets so that
        // multiple messages can be batched together before going onto the
        // wire.  This however comes at the cost of latency, so the default
        // is to disable it.  If you don't need low latency and are streaming
        // lots of small messages, you can change this to 'false'
        disableNagleAlgorithm: true,

        // The number of milliseconds to wait after sending a close frame
        // for an acknowledgement to come back before giving up and just
        // closing the socket.
        closeTimeout: 5000,

        // Options to pass to https.connect if connecting via TLS
        tlsOptions: {}
    };

    if (config) {
        var tlsOptions;
        if (config.tlsOptions) {
          tlsOptions = config.tlsOptions;
          delete config.tlsOptions;
        }
        else {
          tlsOptions = {};
        }
        extend(this.config, config);
        extend(this.config.tlsOptions, tlsOptions);
    }

    this._req = null;
    
    switch (this.config.webSocketVersion) {
        case 8:
        case 13:
            break;
        default:
            throw new Error('Requested webSocketVersion is not supported. Allowed values are 8 and 13.');
    }
}

util.inherits(WebSocketClient, EventEmitter);

WebSocketClient.prototype.connect = function(requestUrl, protocols, origin, headers, extraRequestOptions) {
    var self = this;
    
    if (typeof(protocols) === 'string') {
        if (protocols.length > 0) {
            protocols = [protocols];
        }
        else {
            protocols = [];
        }
    }
    if (!(protocols instanceof Array)) {
        protocols = [];
    }
    this.protocols = protocols;
    this.origin = origin;

    if (typeof(requestUrl) === 'string') {
        this.url = url.parse(requestUrl);
    }
    else {
        this.url = requestUrl; // in case an already parsed url is passed in.
    }
    if (!this.url.protocol) {
        throw new Error('You must specify a full WebSocket URL, including protocol.');
    }
    if (!this.url.host) {
        throw new Error('You must specify a full WebSocket URL, including hostname. Relative URLs are not supported.');
    }

    this.secure = (this.url.protocol === 'wss:');

    // validate protocol characters:
    this.protocols.forEach(function(protocol) {
        for (var i=0; i < protocol.length; i ++) {
            var charCode = protocol.charCodeAt(i);
            var character = protocol.charAt(i);
            if (charCode < 0x0021 || charCode > 0x007E || protocolSeparators.indexOf(character) !== -1) {
                throw new Error('Protocol list contains invalid character "' + String.fromCharCode(charCode) + '"');
            }
        }
    });

    var defaultPorts = {
        'ws:': '80',
        'wss:': '443'
    };

    if (!this.url.port) {
        this.url.port = defaultPorts[this.url.protocol];
    }

    var nonce = bufferAllocUnsafe(16);
    for (var i=0; i < 16; i++) {
        nonce[i] = Math.round(Math.random()*0xFF);
    }
    this.base64nonce = nonce.toString('base64');

    var hostHeaderValue = this.url.hostname;
    if ((this.url.protocol === 'ws:' && this.url.port !== '80') ||
        (this.url.protocol === 'wss:' && this.url.port !== '443'))  {
        hostHeaderValue += (':' + this.url.port);
    }

    var reqHeaders = {};
    if (this.secure && this.config.tlsOptions.hasOwnProperty('headers')) {
      // Allow for additional headers to be provided when connecting via HTTPS
      extend(reqHeaders, this.config.tlsOptions.headers);
    }
    if (headers) {
      // Explicitly provided headers take priority over any from tlsOptions
      extend(reqHeaders, headers);
    }
    extend(reqHeaders, {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Version': this.config.webSocketVersion.toString(10),
        'Sec-WebSocket-Key': this.base64nonce,
        'Host': reqHeaders.Host || hostHeaderValue
    });

    if (this.protocols.length > 0) {
        reqHeaders['Sec-WebSocket-Protocol'] = this.protocols.join(', ');
    }
    if (this.origin) {
        if (this.config.webSocketVersion === 13) {
            reqHeaders['Origin'] = this.origin;
        }
        else if (this.config.webSocketVersion === 8) {
            reqHeaders['Sec-WebSocket-Origin'] = this.origin;
        }
    }

    // TODO: Implement extensions

    var pathAndQuery;
    // Ensure it begins with '/'.
    if (this.url.pathname) {
        pathAndQuery = this.url.path;
    }
    else if (this.url.path) {
        pathAndQuery = '/' + this.url.path;
    }
    else {
        pathAndQuery = '/';
    }

    function handleRequestError(error) {
        self._req = null;
        self.emit('connectFailed', error);
    }

    var requestOptions = {
        agent: false
    };
    if (extraRequestOptions) {
        extend(requestOptions, extraRequestOptions);
    }
    // These options are always overridden by the library.  The user is not
    // allowed to specify these directly.
    extend(requestOptions, {
        hostname: this.url.hostname,
        port: this.url.port,
        method: 'GET',
        path: pathAndQuery,
        headers: reqHeaders
    });
    if (this.secure) {
        var tlsOptions = this.config.tlsOptions;
        for (var key in tlsOptions) {
            if (tlsOptions.hasOwnProperty(key) && excludedTlsOptions.indexOf(key) === -1) {
                requestOptions[key] = tlsOptions[key];
            }
        }
    }

    var req = this._req = (this.secure ? https : http).request(requestOptions);
    req.on('upgrade', function handleRequestUpgrade(response, socket, head) {
        self._req = null;
        req.removeListener('error', handleRequestError);
        self.socket = socket;
        self.response = response;
        self.firstDataChunk = head;
        self.validateHandshake();
    });
    req.on('error', handleRequestError);

    req.on('response', function(response) {
        self._req = null;
        if (utils.eventEmitterListenerCount(self, 'httpResponse') > 0) {
            self.emit('httpResponse', response, self);
            if (response.socket) {
                response.socket.end();
            }
        }
        else {
            var headerDumpParts = [];
            for (var headerName in response.headers) {
                headerDumpParts.push(headerName + ': ' + response.headers[headerName]);
            }
            self.failHandshake(
                'Server responded with a non-101 status: ' +
                response.statusCode + ' ' + response.statusMessage +
                '\nResponse Headers Follow:\n' +
                headerDumpParts.join('\n') + '\n'
            );
        }
    });
    req.end();
};

WebSocketClient.prototype.validateHandshake = function() {
    var headers = this.response.headers;

    if (this.protocols.length > 0) {
        this.protocol = headers['sec-websocket-protocol'];
        if (this.protocol) {
            if (this.protocols.indexOf(this.protocol) === -1) {
                this.failHandshake('Server did not respond with a requested protocol.');
                return;
            }
        }
        else {
            this.failHandshake('Expected a Sec-WebSocket-Protocol header.');
            return;
        }
    }

    if (!(headers['connection'] && headers['connection'].toLocaleLowerCase() === 'upgrade')) {
        this.failHandshake('Expected a Connection: Upgrade header from the server');
        return;
    }

    if (!(headers['upgrade'] && headers['upgrade'].toLocaleLowerCase() === 'websocket')) {
        this.failHandshake('Expected an Upgrade: websocket header from the server');
        return;
    }

    var sha1 = crypto.createHash('sha1');
    sha1.update(this.base64nonce + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    var expectedKey = sha1.digest('base64');

    if (!headers['sec-websocket-accept']) {
        this.failHandshake('Expected Sec-WebSocket-Accept header from server');
        return;
    }

    if (headers['sec-websocket-accept'] !== expectedKey) {
        this.failHandshake('Sec-WebSocket-Accept header from server didn\'t match expected value of ' + expectedKey);
        return;
    }

    // TODO: Support extensions

    this.succeedHandshake();
};

WebSocketClient.prototype.failHandshake = function(errorDescription) {
    if (this.socket && this.socket.writable) {
        this.socket.end();
    }
    this.emit('connectFailed', new Error(errorDescription));
};

WebSocketClient.prototype.succeedHandshake = function() {
    var connection = new WebSocketConnection(this.socket, [], this.protocol, true, this.config);

    connection.webSocketVersion = this.config.webSocketVersion;
    connection._addSocketEventListeners();

    this.emit('connect', connection);
    if (this.firstDataChunk.length > 0) {
        connection.handleSocketData(this.firstDataChunk);
    }
    this.firstDataChunk = null;
};

WebSocketClient.prototype.abort = function() {
    if (this._req) {
        this._req.abort();
    }
};

module.exports = WebSocketClient;


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketConnection.js":
/*!***********************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketConnection.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var util = __webpack_require__(/*! util */ "util");
var utils = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js");
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var WebSocketFrame = __webpack_require__(/*! ./WebSocketFrame */ "./node_modules/websocket/lib/WebSocketFrame.js");
var BufferList = __webpack_require__(/*! ../vendor/FastBufferList */ "./node_modules/websocket/vendor/FastBufferList.js");
var Validation = __webpack_require__(/*! ./Validation */ "./node_modules/websocket/lib/Validation.js").Validation;
var bufferAllocUnsafe = utils.bufferAllocUnsafe;
var bufferFromString = utils.bufferFromString;

// Connected, fully-open, ready to send and receive frames
const STATE_OPEN = 'open';
// Received a close frame from the remote peer
const STATE_PEER_REQUESTED_CLOSE = 'peer_requested_close';
// Sent close frame to remote peer.  No further data can be sent.
const STATE_ENDING = 'ending';
// Connection is fully closed.  No further data can be sent or received.
const STATE_CLOSED = 'closed';

var setImmediateImpl = ('setImmediate' in global) ?
                            global.setImmediate.bind(global) :
                            process.nextTick.bind(process);

var idCounter = 0;

function WebSocketConnection(socket, extensions, protocol, maskOutgoingPackets, config) {
    this._debug = utils.BufferingLogger('websocket:connection', ++idCounter);
    this._debug('constructor');
    
    if (this._debug.enabled) {
        instrumentSocketForDebugging(this, socket);
    }
    
    // Superclass Constructor
    EventEmitter.call(this);

    this._pingListenerCount = 0;
    this.on('newListener', function(ev) {
        if (ev === 'ping'){
            this._pingListenerCount++;
        }
      }).on('removeListener', function(ev) {
        if (ev === 'ping') {
            this._pingListenerCount--;
        }
    });

    this.config = config;
    this.socket = socket;
    this.protocol = protocol;
    this.extensions = extensions;
    this.remoteAddress = socket.remoteAddress;
    this.closeReasonCode = -1;
    this.closeDescription = null;
    this.closeEventEmitted = false;

    // We have to mask outgoing packets if we're acting as a WebSocket client.
    this.maskOutgoingPackets = maskOutgoingPackets;

    // We re-use the same buffers for the mask and frame header for all frames
    // received on each connection to avoid a small memory allocation for each
    // frame.
    this.maskBytes = bufferAllocUnsafe(4);
    this.frameHeader = bufferAllocUnsafe(10);

    // the BufferList will handle the data streaming in
    this.bufferList = new BufferList();

    // Prepare for receiving first frame
    this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    this.fragmentationSize = 0; // data received so far...
    this.frameQueue = [];
    
    // Various bits of connection state
    this.connected = true;
    this.state = STATE_OPEN;
    this.waitingForCloseResponse = false;
    // Received TCP FIN, socket's readable stream is finished.
    this.receivedEnd = false;

    this.closeTimeout = this.config.closeTimeout;
    this.assembleFragments = this.config.assembleFragments;
    this.maxReceivedMessageSize = this.config.maxReceivedMessageSize;

    this.outputBufferFull = false;
    this.inputPaused = false;
    this.receivedDataHandler = this.processReceivedData.bind(this);
    this._closeTimerHandler = this.handleCloseTimer.bind(this);

    // Disable nagle algorithm?
    this.socket.setNoDelay(this.config.disableNagleAlgorithm);

    // Make sure there is no socket inactivity timeout
    this.socket.setTimeout(0);

    if (this.config.keepalive && !this.config.useNativeKeepalive) {
        if (typeof(this.config.keepaliveInterval) !== 'number') {
            throw new Error('keepaliveInterval must be specified and numeric ' +
                            'if keepalive is true.');
        }
        this._keepaliveTimerHandler = this.handleKeepaliveTimer.bind(this);
        this.setKeepaliveTimer();

        if (this.config.dropConnectionOnKeepaliveTimeout) {
            if (typeof(this.config.keepaliveGracePeriod) !== 'number') {
                throw new Error('keepaliveGracePeriod  must be specified and ' +
                                'numeric if dropConnectionOnKeepaliveTimeout ' +
                                'is true.');
            }
            this._gracePeriodTimerHandler = this.handleGracePeriodTimer.bind(this);
        }
    }
    else if (this.config.keepalive && this.config.useNativeKeepalive) {
        if (!('setKeepAlive' in this.socket)) {
            throw new Error('Unable to use native keepalive: unsupported by ' +
                            'this version of Node.');
        }
        this.socket.setKeepAlive(true, this.config.keepaliveInterval);
    }
    
    // The HTTP Client seems to subscribe to socket error events
    // and re-dispatch them in such a way that doesn't make sense
    // for users of our client, so we want to make sure nobody
    // else is listening for error events on the socket besides us.
    this.socket.removeAllListeners('error');
}

WebSocketConnection.CLOSE_REASON_NORMAL = 1000;
WebSocketConnection.CLOSE_REASON_GOING_AWAY = 1001;
WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR = 1002;
WebSocketConnection.CLOSE_REASON_UNPROCESSABLE_INPUT = 1003;
WebSocketConnection.CLOSE_REASON_RESERVED = 1004; // Reserved value.  Undefined meaning.
WebSocketConnection.CLOSE_REASON_NOT_PROVIDED = 1005; // Not to be used on the wire
WebSocketConnection.CLOSE_REASON_ABNORMAL = 1006; // Not to be used on the wire
WebSocketConnection.CLOSE_REASON_INVALID_DATA = 1007;
WebSocketConnection.CLOSE_REASON_POLICY_VIOLATION = 1008;
WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG = 1009;
WebSocketConnection.CLOSE_REASON_EXTENSION_REQUIRED = 1010;
WebSocketConnection.CLOSE_REASON_INTERNAL_SERVER_ERROR = 1011;
WebSocketConnection.CLOSE_REASON_TLS_HANDSHAKE_FAILED = 1015; // Not to be used on the wire

WebSocketConnection.CLOSE_DESCRIPTIONS = {
    1000: 'Normal connection closure',
    1001: 'Remote peer is going away',
    1002: 'Protocol error',
    1003: 'Unprocessable input',
    1004: 'Reserved',
    1005: 'Reason not provided',
    1006: 'Abnormal closure, no further detail available',
    1007: 'Invalid data received',
    1008: 'Policy violation',
    1009: 'Message too big',
    1010: 'Extension requested by client is required',
    1011: 'Internal Server Error',
    1015: 'TLS Handshake Failed'
};

function validateCloseReason(code) {
    if (code < 1000) {
        // Status codes in the range 0-999 are not used
        return false;
    }
    if (code >= 1000 && code <= 2999) {
        // Codes from 1000 - 2999 are reserved for use by the protocol.  Only
        // a few codes are defined, all others are currently illegal.
        return [1000, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014].indexOf(code) !== -1;
    }
    if (code >= 3000 && code <= 3999) {
        // Reserved for use by libraries, frameworks, and applications.
        // Should be registered with IANA.  Interpretation of these codes is
        // undefined by the WebSocket protocol.
        return true;
    }
    if (code >= 4000 && code <= 4999) {
        // Reserved for private use.  Interpretation of these codes is
        // undefined by the WebSocket protocol.
        return true;
    }
    if (code >= 5000) {
        return false;
    }
}

util.inherits(WebSocketConnection, EventEmitter);

WebSocketConnection.prototype._addSocketEventListeners = function() {
    this.socket.on('error', this.handleSocketError.bind(this));
    this.socket.on('end', this.handleSocketEnd.bind(this));
    this.socket.on('close', this.handleSocketClose.bind(this));
    this.socket.on('drain', this.handleSocketDrain.bind(this));
    this.socket.on('pause', this.handleSocketPause.bind(this));
    this.socket.on('resume', this.handleSocketResume.bind(this));
    this.socket.on('data', this.handleSocketData.bind(this));
};

// set or reset the keepalive timer when data is received.
WebSocketConnection.prototype.setKeepaliveTimer = function() {
    this._debug('setKeepaliveTimer');
    if (!this.config.keepalive  || this.config.useNativeKeepalive) { return; }
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();
    this._keepaliveTimeoutID = setTimeout(this._keepaliveTimerHandler, this.config.keepaliveInterval);
};

WebSocketConnection.prototype.clearKeepaliveTimer = function() {
    if (this._keepaliveTimeoutID) {
        clearTimeout(this._keepaliveTimeoutID);
    }
};

// No data has been received within config.keepaliveTimeout ms.
WebSocketConnection.prototype.handleKeepaliveTimer = function() {
    this._debug('handleKeepaliveTimer');
    this._keepaliveTimeoutID = null;
    this.ping();

    // If we are configured to drop connections if the client doesn't respond
    // then set the grace period timer.
    if (this.config.dropConnectionOnKeepaliveTimeout) {
        this.setGracePeriodTimer();
    }
    else {
        // Otherwise reset the keepalive timer to send the next ping.
        this.setKeepaliveTimer();
    }
};

WebSocketConnection.prototype.setGracePeriodTimer = function() {
    this._debug('setGracePeriodTimer');
    this.clearGracePeriodTimer();
    this._gracePeriodTimeoutID = setTimeout(this._gracePeriodTimerHandler, this.config.keepaliveGracePeriod);
};

WebSocketConnection.prototype.clearGracePeriodTimer = function() {
    if (this._gracePeriodTimeoutID) {
        clearTimeout(this._gracePeriodTimeoutID);
    }
};

WebSocketConnection.prototype.handleGracePeriodTimer = function() {
    this._debug('handleGracePeriodTimer');
    // If this is called, the client has not responded and is assumed dead.
    this._gracePeriodTimeoutID = null;
    this.drop(WebSocketConnection.CLOSE_REASON_ABNORMAL, 'Peer not responding.', true);
};

WebSocketConnection.prototype.handleSocketData = function(data) {
    this._debug('handleSocketData');
    // Reset the keepalive timer when receiving data of any kind.
    this.setKeepaliveTimer();

    // Add received data to our bufferList, which efficiently holds received
    // data chunks in a linked list of Buffer objects.
    this.bufferList.write(data);

    this.processReceivedData();
};

WebSocketConnection.prototype.processReceivedData = function() {
    this._debug('processReceivedData');
    // If we're not connected, we should ignore any data remaining on the buffer.
    if (!this.connected) { return; }

    // Receiving/parsing is expected to be halted when paused.
    if (this.inputPaused) { return; }

    var frame = this.currentFrame;

    // WebSocketFrame.prototype.addData returns true if all data necessary to
    // parse the frame was available.  It returns false if we are waiting for
    // more data to come in on the wire.
    if (!frame.addData(this.bufferList)) { this._debug('-- insufficient data for frame'); return; }

    var self = this;

    // Handle possible parsing errors
    if (frame.protocolError) {
        // Something bad happened.. get rid of this client.
        this._debug('-- protocol error');
        process.nextTick(function() {
            self.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR, frame.dropReason);
        });
        return;
    }
    else if (frame.frameTooLarge) {
        this._debug('-- frame too large');
        process.nextTick(function() {
            self.drop(WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG, frame.dropReason);
        });
        return;
    }

    // For now since we don't support extensions, all RSV bits are illegal
    if (frame.rsv1 || frame.rsv2 || frame.rsv3) {
        this._debug('-- illegal rsv flag');
        process.nextTick(function() {
            self.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR,
              'Unsupported usage of rsv bits without negotiated extension.');
        });
        return;
    }

    if (!this.assembleFragments) {
        this._debug('-- emitting frame');
        process.nextTick(function() { self.emit('frame', frame); });
    }

    process.nextTick(function() { self.processFrame(frame); });
    
    this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);

    // If there's data remaining, schedule additional processing, but yield
    // for now so that other connections have a chance to have their data
    // processed.  We use setImmediate here instead of process.nextTick to
    // explicitly indicate that we wish for other I/O to be handled first.
    if (this.bufferList.length > 0) {
        setImmediateImpl(this.receivedDataHandler);
    }
};

WebSocketConnection.prototype.handleSocketError = function(error) {
    this._debug('handleSocketError: %j', error);
    if (this.state === STATE_CLOSED) {
		// See https://github.com/theturtle32/WebSocket-Node/issues/288
        this._debug('  --- Socket \'error\' after \'close\'');
        return;
    }
    this.closeReasonCode = WebSocketConnection.CLOSE_REASON_ABNORMAL;
    this.closeDescription = 'Socket Error: ' + error.syscall + ' ' + error.code;
    this.connected = false;
    this.state = STATE_CLOSED;
    this.fragmentationSize = 0;
    if (utils.eventEmitterListenerCount(this, 'error') > 0) {
        this.emit('error', error);
    }
    this.socket.destroy(error);
    this._debug.printOutput();
};

WebSocketConnection.prototype.handleSocketEnd = function() {
    this._debug('handleSocketEnd: received socket end.  state = %s', this.state);
    this.receivedEnd = true;
    if (this.state === STATE_CLOSED) {
        // When using the TLS module, sometimes the socket will emit 'end'
        // after it emits 'close'.  I don't think that's correct behavior,
        // but we should deal with it gracefully by ignoring it.
        this._debug('  --- Socket \'end\' after \'close\'');
        return;
    }
    if (this.state !== STATE_PEER_REQUESTED_CLOSE &&
        this.state !== STATE_ENDING) {
      this._debug('  --- UNEXPECTED socket end.');
      this.socket.end();
    }
};

WebSocketConnection.prototype.handleSocketClose = function(hadError) {
    this._debug('handleSocketClose: received socket close');
    this.socketHadError = hadError;
    this.connected = false;
    this.state = STATE_CLOSED;
    // If closeReasonCode is still set to -1 at this point then we must
    // not have received a close frame!!
    if (this.closeReasonCode === -1) {
        this.closeReasonCode = WebSocketConnection.CLOSE_REASON_ABNORMAL;
        this.closeDescription = 'Connection dropped by remote peer.';
    }
    this.clearCloseTimer();
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();
    if (!this.closeEventEmitted) {
        this.closeEventEmitted = true;
        this._debug('-- Emitting WebSocketConnection close event');
        this.emit('close', this.closeReasonCode, this.closeDescription);
    }
};

WebSocketConnection.prototype.handleSocketDrain = function() {
    this._debug('handleSocketDrain: socket drain event');
    this.outputBufferFull = false;
    this.emit('drain');
};

WebSocketConnection.prototype.handleSocketPause = function() {
    this._debug('handleSocketPause: socket pause event');
    this.inputPaused = true;
    this.emit('pause');
};

WebSocketConnection.prototype.handleSocketResume = function() {
    this._debug('handleSocketResume: socket resume event');
    this.inputPaused = false;
    this.emit('resume');
    this.processReceivedData();
};

WebSocketConnection.prototype.pause = function() {
    this._debug('pause: pause requested');
    this.socket.pause();
};

WebSocketConnection.prototype.resume = function() {
    this._debug('resume: resume requested');
    this.socket.resume();
};

WebSocketConnection.prototype.close = function(reasonCode, description) {
    if (this.connected) {
        this._debug('close: Initating clean WebSocket close sequence.');
        if ('number' !== typeof reasonCode) {
            reasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
        }
        if (!validateCloseReason(reasonCode)) {
            throw new Error('Close code ' + reasonCode + ' is not valid.');
        }
        if ('string' !== typeof description) {
            description = WebSocketConnection.CLOSE_DESCRIPTIONS[reasonCode];
        }
        this.closeReasonCode = reasonCode;
        this.closeDescription = description;
        this.setCloseTimer();
        this.sendCloseFrame(this.closeReasonCode, this.closeDescription);
        this.state = STATE_ENDING;
        this.connected = false;
    }
};

WebSocketConnection.prototype.drop = function(reasonCode, description, skipCloseFrame) {
    this._debug('drop');
    if (typeof(reasonCode) !== 'number') {
        reasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
    }

    if (typeof(description) !== 'string') {
        // If no description is provided, try to look one up based on the
        // specified reasonCode.
        description = WebSocketConnection.CLOSE_DESCRIPTIONS[reasonCode];
    }

    this._debug('Forcefully dropping connection. skipCloseFrame: %s, code: %d, description: %s',
        skipCloseFrame, reasonCode, description
    );

    this.closeReasonCode = reasonCode;
    this.closeDescription = description;
    this.frameQueue = [];
    this.fragmentationSize = 0;
    if (!skipCloseFrame) {
        this.sendCloseFrame(reasonCode, description);
    }
    this.connected = false;
    this.state = STATE_CLOSED;
    this.clearCloseTimer();
    this.clearKeepaliveTimer();
    this.clearGracePeriodTimer();

    if (!this.closeEventEmitted) {
        this.closeEventEmitted = true;
        this._debug('Emitting WebSocketConnection close event');
        this.emit('close', this.closeReasonCode, this.closeDescription);
    }
    
    this._debug('Drop: destroying socket');
    this.socket.destroy();
};

WebSocketConnection.prototype.setCloseTimer = function() {
    this._debug('setCloseTimer');
    this.clearCloseTimer();
    this._debug('Setting close timer');
    this.waitingForCloseResponse = true;
    this.closeTimer = setTimeout(this._closeTimerHandler, this.closeTimeout);
};

WebSocketConnection.prototype.clearCloseTimer = function() {
    this._debug('clearCloseTimer');
    if (this.closeTimer) {
        this._debug('Clearing close timer');
        clearTimeout(this.closeTimer);
        this.waitingForCloseResponse = false;
        this.closeTimer = null;
    }
};

WebSocketConnection.prototype.handleCloseTimer = function() {
    this._debug('handleCloseTimer');
    this.closeTimer = null;
    if (this.waitingForCloseResponse) {
        this._debug('Close response not received from client.  Forcing socket end.');
        this.waitingForCloseResponse = false;
        this.state = STATE_CLOSED;
        this.socket.end();
    }
};

WebSocketConnection.prototype.processFrame = function(frame) {
    this._debug('processFrame');
    this._debug(' -- frame: %s', frame);
    
    // Any non-control opcode besides 0x00 (continuation) received in the
    // middle of a fragmented message is illegal.
    if (this.frameQueue.length !== 0 && (frame.opcode > 0x00 && frame.opcode < 0x08)) {
        this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR,
          'Illegal frame opcode 0x' + frame.opcode.toString(16) + ' ' +
          'received in middle of fragmented message.');
        return;
    }

    switch(frame.opcode) {
        case 0x02: // WebSocketFrame.BINARY_FRAME
            this._debug('-- Binary Frame');
            if (this.assembleFragments) {
                if (frame.fin) {
                    // Complete single-frame message received
                    this._debug('---- Emitting \'message\' event');
                    this.emit('message', {
                        type: 'binary',
                        binaryData: frame.binaryPayload
                    });
                }
                else {
                    // beginning of a fragmented message
                    this.frameQueue.push(frame);
                    this.fragmentationSize = frame.length;
                }
            }
            break;
        case 0x01: // WebSocketFrame.TEXT_FRAME
            this._debug('-- Text Frame');
            if (this.assembleFragments) {
                if (frame.fin) {
                    if (!Validation.isValidUTF8(frame.binaryPayload)) {
                        this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA,
                          'Invalid UTF-8 Data Received');
                        return;
                    }
                    // Complete single-frame message received
                    this._debug('---- Emitting \'message\' event');
                    this.emit('message', {
                        type: 'utf8',
                        utf8Data: frame.binaryPayload.toString('utf8')
                    });
                }
                else {
                    // beginning of a fragmented message
                    this.frameQueue.push(frame);
                    this.fragmentationSize = frame.length;
                }
            }
            break;
        case 0x00: // WebSocketFrame.CONTINUATION
            this._debug('-- Continuation Frame');
            if (this.assembleFragments) {
                if (this.frameQueue.length === 0) {
                    this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR,
                      'Unexpected Continuation Frame');
                    return;
                }

                this.fragmentationSize += frame.length;

                if (this.fragmentationSize > this.maxReceivedMessageSize) {
                    this.drop(WebSocketConnection.CLOSE_REASON_MESSAGE_TOO_BIG,
                      'Maximum message size exceeded.');
                    return;
                }

                this.frameQueue.push(frame);

                if (frame.fin) {
                    // end of fragmented message, so we process the whole
                    // message now.  We also have to decode the utf-8 data
                    // for text frames after combining all the fragments.
                    var bytesCopied = 0;
                    var binaryPayload = bufferAllocUnsafe(this.fragmentationSize);
                    var opcode = this.frameQueue[0].opcode;
                    this.frameQueue.forEach(function (currentFrame) {
                        currentFrame.binaryPayload.copy(binaryPayload, bytesCopied);
                        bytesCopied += currentFrame.binaryPayload.length;
                    });
                    this.frameQueue = [];
                    this.fragmentationSize = 0;

                    switch (opcode) {
                        case 0x02: // WebSocketOpcode.BINARY_FRAME
                            this.emit('message', {
                                type: 'binary',
                                binaryData: binaryPayload
                            });
                            break;
                        case 0x01: // WebSocketOpcode.TEXT_FRAME
                            if (!Validation.isValidUTF8(binaryPayload)) {
                                this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA,
                                  'Invalid UTF-8 Data Received');
                                return;
                            }
                            this.emit('message', {
                                type: 'utf8',
                                utf8Data: binaryPayload.toString('utf8')
                            });
                            break;
                        default:
                            this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR,
                              'Unexpected first opcode in fragmentation sequence: 0x' + opcode.toString(16));
                            return;
                    }
                }
            }
            break;
        case 0x09: // WebSocketFrame.PING
            this._debug('-- Ping Frame');

            if (this._pingListenerCount > 0) {
                // logic to emit the ping frame: this is only done when a listener is known to exist
                // Expose a function allowing the user to override the default ping() behavior
                var cancelled = false;
                var cancel = function() { 
                  cancelled = true; 
                };
                this.emit('ping', cancel, frame.binaryPayload);

                // Only send a pong if the client did not indicate that he would like to cancel
                if (!cancelled) {
                    this.pong(frame.binaryPayload);
                }
            }
            else {
                this.pong(frame.binaryPayload);
            }

            break;
        case 0x0A: // WebSocketFrame.PONG
            this._debug('-- Pong Frame');
            this.emit('pong', frame.binaryPayload);
            break;
        case 0x08: // WebSocketFrame.CONNECTION_CLOSE
            this._debug('-- Close Frame');
            if (this.waitingForCloseResponse) {
                // Got response to our request to close the connection.
                // Close is complete, so we just hang up.
                this._debug('---- Got close response from peer.  Completing closing handshake.');
                this.clearCloseTimer();
                this.waitingForCloseResponse = false;
                this.state = STATE_CLOSED;
                this.socket.end();
                return;
            }
            
            this._debug('---- Closing handshake initiated by peer.');
            // Got request from other party to close connection.
            // Send back acknowledgement and then hang up.
            this.state = STATE_PEER_REQUESTED_CLOSE;
            var respondCloseReasonCode;

            // Make sure the close reason provided is legal according to
            // the protocol spec.  Providing no close status is legal.
            // WebSocketFrame sets closeStatus to -1 by default, so if it
            // is still -1, then no status was provided.
            if (frame.invalidCloseFrameLength) {
                this.closeReasonCode = 1005; // 1005 = No reason provided.
                respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
            }
            else if (frame.closeStatus === -1 || validateCloseReason(frame.closeStatus)) {
                this.closeReasonCode = frame.closeStatus;
                respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
            }
            else {
                this.closeReasonCode = frame.closeStatus;
                respondCloseReasonCode = WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR;
            }
            
            // If there is a textual description in the close frame, extract it.
            if (frame.binaryPayload.length > 1) {
                if (!Validation.isValidUTF8(frame.binaryPayload)) {
                    this.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA,
                      'Invalid UTF-8 Data Received');
                    return;
                }
                this.closeDescription = frame.binaryPayload.toString('utf8');
            }
            else {
                this.closeDescription = WebSocketConnection.CLOSE_DESCRIPTIONS[this.closeReasonCode];
            }
            this._debug(
                '------ Remote peer %s - code: %d - %s - close frame payload length: %d',
                this.remoteAddress, this.closeReasonCode,
                this.closeDescription, frame.length
            );
            this._debug('------ responding to remote peer\'s close request.');
            this.sendCloseFrame(respondCloseReasonCode, null);
            this.connected = false;
            break;
        default:
            this._debug('-- Unrecognized Opcode %d', frame.opcode);
            this.drop(WebSocketConnection.CLOSE_REASON_PROTOCOL_ERROR,
              'Unrecognized Opcode: 0x' + frame.opcode.toString(16));
            break;
    }
};

WebSocketConnection.prototype.send = function(data, cb) {
    this._debug('send');
    if (Buffer.isBuffer(data)) {
        this.sendBytes(data, cb);
    }
    else if (typeof(data['toString']) === 'function') {
        this.sendUTF(data, cb);
    }
    else {
        throw new Error('Data provided must either be a Node Buffer or implement toString()');
    }
};

WebSocketConnection.prototype.sendUTF = function(data, cb) {
    data = bufferFromString(data.toString(), 'utf8');
    this._debug('sendUTF: %d bytes', data.length);
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 0x01; // WebSocketOpcode.TEXT_FRAME
    frame.binaryPayload = data;
    this.fragmentAndSend(frame, cb);
};

WebSocketConnection.prototype.sendBytes = function(data, cb) {
    this._debug('sendBytes');
    if (!Buffer.isBuffer(data)) {
        throw new Error('You must pass a Node Buffer object to WebSocketConnection.prototype.sendBytes()');
    }
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 0x02; // WebSocketOpcode.BINARY_FRAME
    frame.binaryPayload = data;
    this.fragmentAndSend(frame, cb);
};

WebSocketConnection.prototype.ping = function(data) {
    this._debug('ping');
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 0x09; // WebSocketOpcode.PING
    frame.fin = true;
    if (data) {
        if (!Buffer.isBuffer(data)) {
            data = bufferFromString(data.toString(), 'utf8');
        }
        if (data.length > 125) {
            this._debug('WebSocket: Data for ping is longer than 125 bytes.  Truncating.');
            data = data.slice(0,124);
        }
        frame.binaryPayload = data;
    }
    this.sendFrame(frame);
};

// Pong frames have to echo back the contents of the data portion of the
// ping frame exactly, byte for byte.
WebSocketConnection.prototype.pong = function(binaryPayload) {
    this._debug('pong');
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.opcode = 0x0A; // WebSocketOpcode.PONG
    if (Buffer.isBuffer(binaryPayload) && binaryPayload.length > 125) {
        this._debug('WebSocket: Data for pong is longer than 125 bytes.  Truncating.');
        binaryPayload = binaryPayload.slice(0,124);
    }
    frame.binaryPayload = binaryPayload;
    frame.fin = true;
    this.sendFrame(frame);
};

WebSocketConnection.prototype.fragmentAndSend = function(frame, cb) {
    this._debug('fragmentAndSend');
    if (frame.opcode > 0x07) {
        throw new Error('You cannot fragment control frames.');
    }

    var threshold = this.config.fragmentationThreshold;
    var length = frame.binaryPayload.length;

    // Send immediately if fragmentation is disabled or the message is not
    // larger than the fragmentation threshold.
    if (!this.config.fragmentOutgoingMessages || (frame.binaryPayload && length <= threshold)) {
        frame.fin = true;
        this.sendFrame(frame, cb);
        return;
    }
    
    var numFragments = Math.ceil(length / threshold);
    var sentFragments = 0;
    var sentCallback = function fragmentSentCallback(err) {
        if (err) {
            if (typeof cb === 'function') {
                // pass only the first error
                cb(err);
                cb = null;
            }
            return;
        }
        ++sentFragments;
        if ((sentFragments === numFragments) && (typeof cb === 'function')) {
            cb();
        }
    };
    for (var i=1; i <= numFragments; i++) {
        var currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
        
        // continuation opcode except for first frame.
        currentFrame.opcode = (i === 1) ? frame.opcode : 0x00;
        
        // fin set on last frame only
        currentFrame.fin = (i === numFragments);
        
        // length is likely to be shorter on the last fragment
        var currentLength = (i === numFragments) ? length - (threshold * (i-1)) : threshold;
        var sliceStart = threshold * (i-1);
        
        // Slice the right portion of the original payload
        currentFrame.binaryPayload = frame.binaryPayload.slice(sliceStart, sliceStart + currentLength);
        
        this.sendFrame(currentFrame, sentCallback);
    }
};

WebSocketConnection.prototype.sendCloseFrame = function(reasonCode, description, cb) {
    if (typeof(reasonCode) !== 'number') {
        reasonCode = WebSocketConnection.CLOSE_REASON_NORMAL;
    }
    
    this._debug('sendCloseFrame state: %s, reasonCode: %d, description: %s', this.state, reasonCode, description);
    
    if (this.state !== STATE_OPEN && this.state !== STATE_PEER_REQUESTED_CLOSE) { return; }
    
    var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    frame.fin = true;
    frame.opcode = 0x08; // WebSocketOpcode.CONNECTION_CLOSE
    frame.closeStatus = reasonCode;
    if (typeof(description) === 'string') {
        frame.binaryPayload = bufferFromString(description, 'utf8');
    }
    
    this.sendFrame(frame, cb);
    this.socket.end();
};

WebSocketConnection.prototype.sendFrame = function(frame, cb) {
    this._debug('sendFrame');
    frame.mask = this.maskOutgoingPackets;
    var flushed = this.socket.write(frame.toBuffer(), cb);
    this.outputBufferFull = !flushed;
    return flushed;
};

module.exports = WebSocketConnection;



function instrumentSocketForDebugging(connection, socket) {
    /* jshint loopfunc: true */
    if (!connection._debug.enabled) { return; }
    
    var originalSocketEmit = socket.emit;
    socket.emit = function(event) {
        connection._debug('||| Socket Event  \'%s\'', event);
        originalSocketEmit.apply(this, arguments);
    };
    
    for (var key in socket) {
        if ('function' !== typeof(socket[key])) { continue; }
        if (['emit'].indexOf(key) !== -1) { continue; }
        (function(key) {
            var original = socket[key];
            if (key === 'on') {
                socket[key] = function proxyMethod__EventEmitter__On() {
                    connection._debug('||| Socket method called:  %s (%s)', key, arguments[0]);
                    return original.apply(this, arguments);
                };
                return;
            }
            socket[key] = function proxyMethod() {
                connection._debug('||| Socket method called:  %s', key);
                return original.apply(this, arguments);
            };
        })(key);
    }
}


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketFrame.js":
/*!******************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketFrame.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var bufferUtil = __webpack_require__(/*! ./BufferUtil */ "./node_modules/websocket/lib/BufferUtil.js").BufferUtil;
var bufferAllocUnsafe = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js").bufferAllocUnsafe;

const DECODE_HEADER = 1;
const WAITING_FOR_16_BIT_LENGTH = 2;
const WAITING_FOR_64_BIT_LENGTH = 3;
const WAITING_FOR_MASK_KEY = 4;
const WAITING_FOR_PAYLOAD = 5;
const COMPLETE = 6;

// WebSocketConnection will pass shared buffer objects for maskBytes and
// frameHeader into the constructor to avoid tons of small memory allocations
// for each frame we have to parse.  This is only used for parsing frames
// we receive off the wire.
function WebSocketFrame(maskBytes, frameHeader, config) {
    this.maskBytes = maskBytes;
    this.frameHeader = frameHeader;
    this.config = config;
    this.maxReceivedFrameSize = config.maxReceivedFrameSize;
    this.protocolError = false;
    this.frameTooLarge = false;
    this.invalidCloseFrameLength = false;
    this.parseState = DECODE_HEADER;
    this.closeStatus = -1;
}

WebSocketFrame.prototype.addData = function(bufferList) {
    if (this.parseState === DECODE_HEADER) {
        if (bufferList.length >= 2) {
            bufferList.joinInto(this.frameHeader, 0, 0, 2);
            bufferList.advance(2);
            var firstByte = this.frameHeader[0];
            var secondByte = this.frameHeader[1];

            this.fin     = Boolean(firstByte  & 0x80);
            this.rsv1    = Boolean(firstByte  & 0x40);
            this.rsv2    = Boolean(firstByte  & 0x20);
            this.rsv3    = Boolean(firstByte  & 0x10);
            this.mask    = Boolean(secondByte & 0x80);

            this.opcode  = firstByte  & 0x0F;
            this.length = secondByte & 0x7F;

            // Control frame sanity check
            if (this.opcode >= 0x08) {
                if (this.length > 125) {
                    this.protocolError = true;
                    this.dropReason = 'Illegal control frame longer than 125 bytes.';
                    return true;
                }
                if (!this.fin) {
                    this.protocolError = true;
                    this.dropReason = 'Control frames must not be fragmented.';
                    return true;
                }
            }

            if (this.length === 126) {
                this.parseState = WAITING_FOR_16_BIT_LENGTH;
            }
            else if (this.length === 127) {
                this.parseState = WAITING_FOR_64_BIT_LENGTH;
            }
            else {
                this.parseState = WAITING_FOR_MASK_KEY;
            }
        }
    }
    if (this.parseState === WAITING_FOR_16_BIT_LENGTH) {
        if (bufferList.length >= 2) {
            bufferList.joinInto(this.frameHeader, 2, 0, 2);
            bufferList.advance(2);
            this.length = this.frameHeader.readUInt16BE(2);
            this.parseState = WAITING_FOR_MASK_KEY;
        }
    }
    else if (this.parseState === WAITING_FOR_64_BIT_LENGTH) {
        if (bufferList.length >= 8) {
            bufferList.joinInto(this.frameHeader, 2, 0, 8);
            bufferList.advance(8);
            var lengthPair = [
              this.frameHeader.readUInt32BE(2),
              this.frameHeader.readUInt32BE(2+4)
            ];

            if (lengthPair[0] !== 0) {
                this.protocolError = true;
                this.dropReason = 'Unsupported 64-bit length frame received';
                return true;
            }
            this.length = lengthPair[1];
            this.parseState = WAITING_FOR_MASK_KEY;
        }
    }

    if (this.parseState === WAITING_FOR_MASK_KEY) {
        if (this.mask) {
            if (bufferList.length >= 4) {
                bufferList.joinInto(this.maskBytes, 0, 0, 4);
                bufferList.advance(4);
                this.parseState = WAITING_FOR_PAYLOAD;
            }
        }
        else {
            this.parseState = WAITING_FOR_PAYLOAD;
        }
    }

    if (this.parseState === WAITING_FOR_PAYLOAD) {
        if (this.length > this.maxReceivedFrameSize) {
            this.frameTooLarge = true;
            this.dropReason = 'Frame size of ' + this.length.toString(10) +
                              ' bytes exceeds maximum accepted frame size';
            return true;
        }

        if (this.length === 0) {
            this.binaryPayload = bufferAllocUnsafe(0);
            this.parseState = COMPLETE;
            return true;
        }
        if (bufferList.length >= this.length) {
            this.binaryPayload = bufferList.take(this.length);
            bufferList.advance(this.length);
            if (this.mask) {
                bufferUtil.unmask(this.binaryPayload, this.maskBytes);
                // xor(this.binaryPayload, this.maskBytes, 0);
            }

            if (this.opcode === 0x08) { // WebSocketOpcode.CONNECTION_CLOSE
                if (this.length === 1) {
                    // Invalid length for a close frame.  Must be zero or at least two.
                    this.binaryPayload = bufferAllocUnsafe(0);
                    this.invalidCloseFrameLength = true;
                }
                if (this.length >= 2) {
                    this.closeStatus = this.binaryPayload.readUInt16BE(0);
                    this.binaryPayload = this.binaryPayload.slice(2);
                }
            }

            this.parseState = COMPLETE;
            return true;
        }
    }
    return false;
};

WebSocketFrame.prototype.throwAwayPayload = function(bufferList) {
    if (bufferList.length >= this.length) {
        bufferList.advance(this.length);
        this.parseState = COMPLETE;
        return true;
    }
    return false;
};

WebSocketFrame.prototype.toBuffer = function(nullMask) {
    var maskKey;
    var headerLength = 2;
    var data;
    var outputPos;
    var firstByte = 0x00;
    var secondByte = 0x00;

    if (this.fin) {
        firstByte |= 0x80;
    }
    if (this.rsv1) {
        firstByte |= 0x40;
    }
    if (this.rsv2) {
        firstByte |= 0x20;
    }
    if (this.rsv3) {
        firstByte |= 0x10;
    }
    if (this.mask) {
        secondByte |= 0x80;
    }

    firstByte |= (this.opcode & 0x0F);

    // the close frame is a special case because the close reason is
    // prepended to the payload data.
    if (this.opcode === 0x08) {
        this.length = 2;
        if (this.binaryPayload) {
            this.length += this.binaryPayload.length;
        }
        data = bufferAllocUnsafe(this.length);
        data.writeUInt16BE(this.closeStatus, 0);
        if (this.length > 2) {
            this.binaryPayload.copy(data, 2);
        }
    }
    else if (this.binaryPayload) {
        data = this.binaryPayload;
        this.length = data.length;
    }
    else {
        this.length = 0;
    }

    if (this.length <= 125) {
        // encode the length directly into the two-byte frame header
        secondByte |= (this.length & 0x7F);
    }
    else if (this.length > 125 && this.length <= 0xFFFF) {
        // Use 16-bit length
        secondByte |= 126;
        headerLength += 2;
    }
    else if (this.length > 0xFFFF) {
        // Use 64-bit length
        secondByte |= 127;
        headerLength += 8;
    }

    var output = bufferAllocUnsafe(this.length + headerLength + (this.mask ? 4 : 0));

    // write the frame header
    output[0] = firstByte;
    output[1] = secondByte;

    outputPos = 2;

    if (this.length > 125 && this.length <= 0xFFFF) {
        // write 16-bit length
        output.writeUInt16BE(this.length, outputPos);
        outputPos += 2;
    }
    else if (this.length > 0xFFFF) {
        // write 64-bit length
        output.writeUInt32BE(0x00000000, outputPos);
        output.writeUInt32BE(this.length, outputPos + 4);
        outputPos += 8;
    }

    if (this.mask) {
        maskKey = nullMask ? 0 : ((Math.random() * 0xFFFFFFFF) >>> 0);
        this.maskBytes.writeUInt32BE(maskKey, 0);

        // write the mask key
        this.maskBytes.copy(output, outputPos);
        outputPos += 4;

        if (data) {
          bufferUtil.mask(data, this.maskBytes, output, outputPos, this.length);
        }
    }
    else if (data) {
        data.copy(output, outputPos);
    }

    return output;
};

WebSocketFrame.prototype.toString = function() {
    return 'Opcode: ' + this.opcode + ', fin: ' + this.fin + ', length: ' + this.length + ', hasPayload: ' + Boolean(this.binaryPayload) + ', masked: ' + this.mask;
};


module.exports = WebSocketFrame;


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var crypto = __webpack_require__(/*! crypto */ "crypto");
var util = __webpack_require__(/*! util */ "util");
var url = __webpack_require__(/*! url */ "url");
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var WebSocketConnection = __webpack_require__(/*! ./WebSocketConnection */ "./node_modules/websocket/lib/WebSocketConnection.js");

var headerValueSplitRegExp = /,\s*/;
var headerParamSplitRegExp = /;\s*/;
var headerSanitizeRegExp = /[\r\n]/g;
var xForwardedForSeparatorRegExp = /,\s*/;
var separators = [
    '(', ')', '<', '>', '@',
    ',', ';', ':', '\\', '\"',
    '/', '[', ']', '?', '=',
    '{', '}', ' ', String.fromCharCode(9)
];
var controlChars = [String.fromCharCode(127) /* DEL */];
for (var i=0; i < 31; i ++) {
    /* US-ASCII Control Characters */
    controlChars.push(String.fromCharCode(i));
}

var cookieNameValidateRegEx = /([\x00-\x20\x22\x28\x29\x2c\x2f\x3a-\x3f\x40\x5b-\x5e\x7b\x7d\x7f])/;
var cookieValueValidateRegEx = /[^\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]/;
var cookieValueDQuoteValidateRegEx = /^"[^"]*"$/;
var controlCharsAndSemicolonRegEx = /[\x00-\x20\x3b]/g;

var cookieSeparatorRegEx = /[;,] */;

var httpStatusDescriptions = {
    100: 'Continue',
    101: 'Switching Protocols',
    200: 'OK',
    201: 'Created',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    406: 'Not Acceptable',
    407: 'Proxy Authorization Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Long',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    426: 'Upgrade Required',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported'
};

function WebSocketRequest(socket, httpRequest, serverConfig) {
    // Superclass Constructor
    EventEmitter.call(this);

    this.socket = socket;
    this.httpRequest = httpRequest;
    this.resource = httpRequest.url;
    this.remoteAddress = socket.remoteAddress;
    this.remoteAddresses = [this.remoteAddress];
    this.serverConfig = serverConfig;
    
    // Watch for the underlying TCP socket closing before we call accept
    this._socketIsClosing = false;
    this._socketCloseHandler = this._handleSocketCloseBeforeAccept.bind(this);
    this.socket.on('end', this._socketCloseHandler);
    this.socket.on('close', this._socketCloseHandler);
    
    this._resolved = false;
}

util.inherits(WebSocketRequest, EventEmitter);

WebSocketRequest.prototype.readHandshake = function() {
    var self = this;
    var request = this.httpRequest;

    // Decode URL
    this.resourceURL = url.parse(this.resource, true);

    this.host = request.headers['host'];
    if (!this.host) {
        throw new Error('Client must provide a Host header.');
    }

    this.key = request.headers['sec-websocket-key'];
    if (!this.key) {
        throw new Error('Client must provide a value for Sec-WebSocket-Key.');
    }

    this.webSocketVersion = parseInt(request.headers['sec-websocket-version'], 10);

    if (!this.webSocketVersion || isNaN(this.webSocketVersion)) {
        throw new Error('Client must provide a value for Sec-WebSocket-Version.');
    }

    switch (this.webSocketVersion) {
        case 8:
        case 13:
            break;
        default:
            var e = new Error('Unsupported websocket client version: ' + this.webSocketVersion +
                              'Only versions 8 and 13 are supported.');
            e.httpCode = 426;
            e.headers = {
                'Sec-WebSocket-Version': '13'
            };
            throw e;
    }

    if (this.webSocketVersion === 13) {
        this.origin = request.headers['origin'];
    }
    else if (this.webSocketVersion === 8) {
        this.origin = request.headers['sec-websocket-origin'];
    }

    // Protocol is optional.
    var protocolString = request.headers['sec-websocket-protocol'];
    this.protocolFullCaseMap = {};
    this.requestedProtocols = [];
    if (protocolString) {
        var requestedProtocolsFullCase = protocolString.split(headerValueSplitRegExp);
        requestedProtocolsFullCase.forEach(function(protocol) {
            var lcProtocol = protocol.toLocaleLowerCase();
            self.requestedProtocols.push(lcProtocol);
            self.protocolFullCaseMap[lcProtocol] = protocol;
        });
    }

    if (!this.serverConfig.ignoreXForwardedFor &&
        request.headers['x-forwarded-for']) {
        var immediatePeerIP = this.remoteAddress;
        this.remoteAddresses = request.headers['x-forwarded-for']
            .split(xForwardedForSeparatorRegExp);
        this.remoteAddresses.push(immediatePeerIP);
        this.remoteAddress = this.remoteAddresses[0];
    }

    // Extensions are optional.
    var extensionsString = request.headers['sec-websocket-extensions'];
    this.requestedExtensions = this.parseExtensions(extensionsString);

    // Cookies are optional
    var cookieString = request.headers['cookie'];
    this.cookies = this.parseCookies(cookieString);
};

WebSocketRequest.prototype.parseExtensions = function(extensionsString) {
    if (!extensionsString || extensionsString.length === 0) {
        return [];
    }
    var extensions = extensionsString.toLocaleLowerCase().split(headerValueSplitRegExp);
    extensions.forEach(function(extension, index, array) {
        var params = extension.split(headerParamSplitRegExp);
        var extensionName = params[0];
        var extensionParams = params.slice(1);
        extensionParams.forEach(function(rawParam, index, array) {
            var arr = rawParam.split('=');
            var obj = {
                name: arr[0],
                value: arr[1]
            };
            array.splice(index, 1, obj);
        });
        var obj = {
            name: extensionName,
            params: extensionParams
        };
        array.splice(index, 1, obj);
    });
    return extensions;
};

// This function adapted from node-cookie
// https://github.com/shtylman/node-cookie
WebSocketRequest.prototype.parseCookies = function(str) {
    // Sanity Check
    if (!str || typeof(str) !== 'string') {
        return [];
    }

    var cookies = [];
    var pairs = str.split(cookieSeparatorRegEx);

    pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=');
        if (eq_idx === -1) {
            cookies.push({
                name: pair,
                value: null
            });
            return;
        }

        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' === val[0]) {
            val = val.slice(1, -1);
        }

        cookies.push({
            name: key,
            value: decodeURIComponent(val)
        });
    });

    return cookies;
};

WebSocketRequest.prototype.accept = function(acceptedProtocol, allowedOrigin, cookies) {
    this._verifyResolution();
    
    // TODO: Handle extensions

    var protocolFullCase;

    if (acceptedProtocol) {
        protocolFullCase = this.protocolFullCaseMap[acceptedProtocol.toLocaleLowerCase()];
        if (typeof(protocolFullCase) === 'undefined') {
            protocolFullCase = acceptedProtocol;
        }
    }
    else {
        protocolFullCase = acceptedProtocol;
    }
    this.protocolFullCaseMap = null;

    // Create key validation hash
    var sha1 = crypto.createHash('sha1');
    sha1.update(this.key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
    var acceptKey = sha1.digest('base64');

    var response = 'HTTP/1.1 101 Switching Protocols\r\n' +
                   'Upgrade: websocket\r\n' +
                   'Connection: Upgrade\r\n' +
                   'Sec-WebSocket-Accept: ' + acceptKey + '\r\n';

    if (protocolFullCase) {
        // validate protocol
        for (var i=0; i < protocolFullCase.length; i++) {
            var charCode = protocolFullCase.charCodeAt(i);
            var character = protocolFullCase.charAt(i);
            if (charCode < 0x21 || charCode > 0x7E || separators.indexOf(character) !== -1) {
                this.reject(500);
                throw new Error('Illegal character "' + String.fromCharCode(character) + '" in subprotocol.');
            }
        }
        if (this.requestedProtocols.indexOf(acceptedProtocol) === -1) {
            this.reject(500);
            throw new Error('Specified protocol was not requested by the client.');
        }

        protocolFullCase = protocolFullCase.replace(headerSanitizeRegExp, '');
        response += 'Sec-WebSocket-Protocol: ' + protocolFullCase + '\r\n';
    }
    this.requestedProtocols = null;

    if (allowedOrigin) {
        allowedOrigin = allowedOrigin.replace(headerSanitizeRegExp, '');
        if (this.webSocketVersion === 13) {
            response += 'Origin: ' + allowedOrigin + '\r\n';
        }
        else if (this.webSocketVersion === 8) {
            response += 'Sec-WebSocket-Origin: ' + allowedOrigin + '\r\n';
        }
    }

    if (cookies) {
        if (!Array.isArray(cookies)) {
            this.reject(500);
            throw new Error('Value supplied for "cookies" argument must be an array.');
        }
        var seenCookies = {};
        cookies.forEach(function(cookie) {
            if (!cookie.name || !cookie.value) {
                this.reject(500);
                throw new Error('Each cookie to set must at least provide a "name" and "value"');
            }

            // Make sure there are no \r\n sequences inserted
            cookie.name = cookie.name.replace(controlCharsAndSemicolonRegEx, '');
            cookie.value = cookie.value.replace(controlCharsAndSemicolonRegEx, '');

            if (seenCookies[cookie.name]) {
                this.reject(500);
                throw new Error('You may not specify the same cookie name twice.');
            }
            seenCookies[cookie.name] = true;

            // token (RFC 2616, Section 2.2)
            var invalidChar = cookie.name.match(cookieNameValidateRegEx);
            if (invalidChar) {
                this.reject(500);
                throw new Error('Illegal character ' + invalidChar[0] + ' in cookie name');
            }

            // RFC 6265, Section 4.1.1
            // *cookie-octet / ( DQUOTE *cookie-octet DQUOTE ) | %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
            if (cookie.value.match(cookieValueDQuoteValidateRegEx)) {
                invalidChar = cookie.value.slice(1, -1).match(cookieValueValidateRegEx);
            } else {
                invalidChar = cookie.value.match(cookieValueValidateRegEx);
            }
            if (invalidChar) {
                this.reject(500);
                throw new Error('Illegal character ' + invalidChar[0] + ' in cookie value');
            }

            var cookieParts = [cookie.name + '=' + cookie.value];

            // RFC 6265, Section 4.1.1
            // 'Path=' path-value | <any CHAR except CTLs or ';'>
            if(cookie.path){
                invalidChar = cookie.path.match(controlCharsAndSemicolonRegEx);
                if (invalidChar) {
                    this.reject(500);
                    throw new Error('Illegal character ' + invalidChar[0] + ' in cookie path');
                }
                cookieParts.push('Path=' + cookie.path);
            }

            // RFC 6265, Section 4.1.2.3
            // 'Domain=' subdomain
            if (cookie.domain) {
                if (typeof(cookie.domain) !== 'string') {
                    this.reject(500);
                    throw new Error('Domain must be specified and must be a string.');
                }
                invalidChar = cookie.domain.match(controlCharsAndSemicolonRegEx);
                if (invalidChar) {
                    this.reject(500);
                    throw new Error('Illegal character ' + invalidChar[0] + ' in cookie domain');
                }
                cookieParts.push('Domain=' + cookie.domain.toLowerCase());
            }

            // RFC 6265, Section 4.1.1
            //'Expires=' sane-cookie-date | Force Date object requirement by using only epoch
            if (cookie.expires) {
                if (!(cookie.expires instanceof Date)){
                    this.reject(500);
                    throw new Error('Value supplied for cookie "expires" must be a vaild date object');
                }
                cookieParts.push('Expires=' + cookie.expires.toGMTString());
            }

            // RFC 6265, Section 4.1.1
            //'Max-Age=' non-zero-digit *DIGIT
            if (cookie.maxage) {
                var maxage = cookie.maxage;
                if (typeof(maxage) === 'string') {
                    maxage = parseInt(maxage, 10);
                }
                if (isNaN(maxage) || maxage <= 0 ) {
                    this.reject(500);
                    throw new Error('Value supplied for cookie "maxage" must be a non-zero number');
                }
                maxage = Math.round(maxage);
                cookieParts.push('Max-Age=' + maxage.toString(10));
            }

            // RFC 6265, Section 4.1.1
            //'Secure;'
            if (cookie.secure) {
                if (typeof(cookie.secure) !== 'boolean') {
                    this.reject(500);
                    throw new Error('Value supplied for cookie "secure" must be of type boolean');
                }
                cookieParts.push('Secure');
            }

            // RFC 6265, Section 4.1.1
            //'HttpOnly;'
            if (cookie.httponly) {
                if (typeof(cookie.httponly) !== 'boolean') {
                    this.reject(500);
                    throw new Error('Value supplied for cookie "httponly" must be of type boolean');
                }
                cookieParts.push('HttpOnly');
            }

            response += ('Set-Cookie: ' + cookieParts.join(';') + '\r\n');
        }.bind(this));
    }

    // TODO: handle negotiated extensions
    // if (negotiatedExtensions) {
    //     response += 'Sec-WebSocket-Extensions: ' + negotiatedExtensions.join(', ') + '\r\n';
    // }
    
    // Mark the request resolved now so that the user can't call accept or
    // reject a second time.
    this._resolved = true;
    this.emit('requestResolved', this);
    
    response += '\r\n';

    var connection = new WebSocketConnection(this.socket, [], acceptedProtocol, false, this.serverConfig);
    connection.webSocketVersion = this.webSocketVersion;
    connection.remoteAddress = this.remoteAddress;
    connection.remoteAddresses = this.remoteAddresses;
    
    var self = this;
    
    if (this._socketIsClosing) {
        // Handle case when the client hangs up before we get a chance to
        // accept the connection and send our side of the opening handshake.
        cleanupFailedConnection(connection);
    }
    else {
        this.socket.write(response, 'ascii', function(error) {
            if (error) {
                cleanupFailedConnection(connection);
                return;
            }
            
            self._removeSocketCloseListeners();
            connection._addSocketEventListeners();
        });
    }

    this.emit('requestAccepted', connection);
    return connection;
};

WebSocketRequest.prototype.reject = function(status, reason, extraHeaders) {
    this._verifyResolution();
    
    // Mark the request resolved now so that the user can't call accept or
    // reject a second time.
    this._resolved = true;
    this.emit('requestResolved', this);
    
    if (typeof(status) !== 'number') {
        status = 403;
    }
    var response = 'HTTP/1.1 ' + status + ' ' + httpStatusDescriptions[status] + '\r\n' +
                   'Connection: close\r\n';
    if (reason) {
        reason = reason.replace(headerSanitizeRegExp, '');
        response += 'X-WebSocket-Reject-Reason: ' + reason + '\r\n';
    }

    if (extraHeaders) {
        for (var key in extraHeaders) {
            var sanitizedValue = extraHeaders[key].toString().replace(headerSanitizeRegExp, '');
            var sanitizedKey = key.replace(headerSanitizeRegExp, '');
            response += (sanitizedKey + ': ' + sanitizedValue + '\r\n');
        }
    }

    response += '\r\n';
    this.socket.end(response, 'ascii');

    this.emit('requestRejected', this);
};

WebSocketRequest.prototype._handleSocketCloseBeforeAccept = function() {
    this._socketIsClosing = true;
    this._removeSocketCloseListeners();
};

WebSocketRequest.prototype._removeSocketCloseListeners = function() {
    this.socket.removeListener('end', this._socketCloseHandler);
    this.socket.removeListener('close', this._socketCloseHandler);
};

WebSocketRequest.prototype._verifyResolution = function() {
    if (this._resolved) {
        throw new Error('WebSocketRequest may only be accepted or rejected one time.');
    }
};

function cleanupFailedConnection(connection) {
    // Since we have to return a connection object even if the socket is
    // already dead in order not to break the API, we schedule a 'close'
    // event on the connection object to occur immediately.
    process.nextTick(function() {
        // WebSocketConnection.CLOSE_REASON_ABNORMAL = 1006
        // Third param: Skip sending the close frame to a dead socket
        connection.drop(1006, 'TCP connection lost before handshake completed.', true);
    });
}

module.exports = WebSocketRequest;


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketRouter.js":
/*!*******************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketRouter.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var extend = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js").extend;
var util = __webpack_require__(/*! util */ "util");
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var WebSocketRouterRequest = __webpack_require__(/*! ./WebSocketRouterRequest */ "./node_modules/websocket/lib/WebSocketRouterRequest.js");

function WebSocketRouter(config) {
    // Superclass Constructor
    EventEmitter.call(this);

    this.config = {
        // The WebSocketServer instance to attach to.
        server: null
    };
    if (config) {
        extend(this.config, config);
    }
    this.handlers = [];

    this._requestHandler = this.handleRequest.bind(this);
    if (this.config.server) {
        this.attachServer(this.config.server);
    }
}

util.inherits(WebSocketRouter, EventEmitter);

WebSocketRouter.prototype.attachServer = function(server) {
    if (server) {
        this.server = server;
        this.server.on('request', this._requestHandler);
    }
    else {
        throw new Error('You must specify a WebSocketServer instance to attach to.');
    }
};

WebSocketRouter.prototype.detachServer = function() {
    if (this.server) {
        this.server.removeListener('request', this._requestHandler);
        this.server = null;
    }
    else {
        throw new Error('Cannot detach from server: not attached.');
    }
};

WebSocketRouter.prototype.mount = function(path, protocol, callback) {
    if (!path) {
        throw new Error('You must specify a path for this handler.');
    }
    if (!protocol) {
        protocol = '____no_protocol____';
    }
    if (!callback) {
        throw new Error('You must specify a callback for this handler.');
    }

    path = this.pathToRegExp(path);
    if (!(path instanceof RegExp)) {
        throw new Error('Path must be specified as either a string or a RegExp.');
    }
    var pathString = path.toString();

    // normalize protocol to lower-case
    protocol = protocol.toLocaleLowerCase();

    if (this.findHandlerIndex(pathString, protocol) !== -1) {
        throw new Error('You may only mount one handler per path/protocol combination.');
    }

    this.handlers.push({
        'path': path,
        'pathString': pathString,
        'protocol': protocol,
        'callback': callback
    });
};
WebSocketRouter.prototype.unmount = function(path, protocol) {
    var index = this.findHandlerIndex(this.pathToRegExp(path).toString(), protocol);
    if (index !== -1) {
        this.handlers.splice(index, 1);
    }
    else {
        throw new Error('Unable to find a route matching the specified path and protocol.');
    }
};

WebSocketRouter.prototype.findHandlerIndex = function(pathString, protocol) {
    protocol = protocol.toLocaleLowerCase();
    for (var i=0, len=this.handlers.length; i < len; i++) {
        var handler = this.handlers[i];
        if (handler.pathString === pathString && handler.protocol === protocol) {
            return i;
        }
    }
    return -1;
};

WebSocketRouter.prototype.pathToRegExp = function(path) {
    if (typeof(path) === 'string') {
        if (path === '*') {
            path = /^.*$/;
        }
        else {
            path = path.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            path = new RegExp('^' + path + '$');
        }
    }
    return path;
};

WebSocketRouter.prototype.handleRequest = function(request) {
    var requestedProtocols = request.requestedProtocols;
    if (requestedProtocols.length === 0) {
        requestedProtocols = ['____no_protocol____'];
    }

    // Find a handler with the first requested protocol first
    for (var i=0; i < requestedProtocols.length; i++) {
        var requestedProtocol = requestedProtocols[i].toLocaleLowerCase();

        // find the first handler that can process this request
        for (var j=0, len=this.handlers.length; j < len; j++) {
            var handler = this.handlers[j];
            if (handler.path.test(request.resourceURL.pathname)) {
                if (requestedProtocol === handler.protocol ||
                    handler.protocol === '*')
                {
                    var routerRequest = new WebSocketRouterRequest(request, requestedProtocol);
                    handler.callback(routerRequest);
                    return;
                }
            }
        }
    }

    // If we get here we were unable to find a suitable handler.
    request.reject(404, 'No handler is available for the given request.');
};

module.exports = WebSocketRouter;


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketRouterRequest.js":
/*!**************************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketRouterRequest.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var util = __webpack_require__(/*! util */ "util");
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;

function WebSocketRouterRequest(webSocketRequest, resolvedProtocol) {
    // Superclass Constructor
    EventEmitter.call(this);

    this.webSocketRequest = webSocketRequest;
    if (resolvedProtocol === '____no_protocol____') {
        this.protocol = null;
    }
    else {
        this.protocol = resolvedProtocol;
    }
    this.origin = webSocketRequest.origin;
    this.resource = webSocketRequest.resource;
    this.resourceURL = webSocketRequest.resourceURL;
    this.httpRequest = webSocketRequest.httpRequest;
    this.remoteAddress = webSocketRequest.remoteAddress;
    this.webSocketVersion = webSocketRequest.webSocketVersion;
    this.requestedExtensions = webSocketRequest.requestedExtensions;
    this.cookies = webSocketRequest.cookies;
}

util.inherits(WebSocketRouterRequest, EventEmitter);

WebSocketRouterRequest.prototype.accept = function(origin, cookies) {
    var connection = this.webSocketRequest.accept(this.protocol, origin, cookies);
    this.emit('requestAccepted', connection);
    return connection;
};

WebSocketRouterRequest.prototype.reject = function(status, reason, extraHeaders) {
    this.webSocketRequest.reject(status, reason, extraHeaders);
    this.emit('requestRejected', this);
};

module.exports = WebSocketRouterRequest;


/***/ }),

/***/ "./node_modules/websocket/lib/WebSocketServer.js":
/*!*******************************************************!*\
  !*** ./node_modules/websocket/lib/WebSocketServer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************
 *  Copyright 2010-2015 Brian McKelvey.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ***********************************************************************/

var extend = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js").extend;
var utils = __webpack_require__(/*! ./utils */ "./node_modules/websocket/lib/utils.js");
var util = __webpack_require__(/*! util */ "util");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/index.js")('websocket:server');
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var WebSocketRequest = __webpack_require__(/*! ./WebSocketRequest */ "./node_modules/websocket/lib/WebSocketRequest.js");

var WebSocketServer = function WebSocketServer(config) {
    // Superclass Constructor
    EventEmitter.call(this);

    this._handlers = {
        upgrade: this.handleUpgrade.bind(this),
        requestAccepted: this.handleRequestAccepted.bind(this),
        requestResolved: this.handleRequestResolved.bind(this)
    };
    this.connections = [];
    this.pendingRequests = [];
    if (config) {
        this.mount(config);
    }
};

util.inherits(WebSocketServer, EventEmitter);

WebSocketServer.prototype.mount = function(config) {
    this.config = {
        // The http server instance to attach to.  Required.
        httpServer: null,

        // 64KiB max frame size.
        maxReceivedFrameSize: 0x10000,

        // 1MiB max message size, only applicable if
        // assembleFragments is true
        maxReceivedMessageSize: 0x100000,

        // Outgoing messages larger than fragmentationThreshold will be
        // split into multiple fragments.
        fragmentOutgoingMessages: true,

        // Outgoing frames are fragmented if they exceed this threshold.
        // Default is 16KiB
        fragmentationThreshold: 0x4000,

        // If true, the server will automatically send a ping to all
        // clients every 'keepaliveInterval' milliseconds.  The timer is
        // reset on any received data from the client.
        keepalive: true,

        // The interval to send keepalive pings to connected clients if the
        // connection is idle.  Any received data will reset the counter.
        keepaliveInterval: 20000,

        // If true, the server will consider any connection that has not
        // received any data within the amount of time specified by
        // 'keepaliveGracePeriod' after a keepalive ping has been sent to
        // be dead, and will drop the connection.
        // Ignored if keepalive is false.
        dropConnectionOnKeepaliveTimeout: true,

        // The amount of time to wait after sending a keepalive ping before
        // closing the connection if the connected peer does not respond.
        // Ignored if keepalive is false.
        keepaliveGracePeriod: 10000,

        // Whether to use native TCP keep-alive instead of WebSockets ping
        // and pong packets.  Native TCP keep-alive sends smaller packets
        // on the wire and so uses bandwidth more efficiently.  This may
        // be more important when talking to mobile devices.
        // If this value is set to true, then these values will be ignored:
        //   keepaliveGracePeriod
        //   dropConnectionOnKeepaliveTimeout
        useNativeKeepalive: false,

        // If true, fragmented messages will be automatically assembled
        // and the full message will be emitted via a 'message' event.
        // If false, each frame will be emitted via a 'frame' event and
        // the application will be responsible for aggregating multiple
        // fragmented frames.  Single-frame messages will emit a 'message'
        // event in addition to the 'frame' event.
        // Most users will want to leave this set to 'true'
        assembleFragments: true,

        // If this is true, websocket connections will be accepted
        // regardless of the path and protocol specified by the client.
        // The protocol accepted will be the first that was requested
        // by the client.  Clients from any origin will be accepted.
        // This should only be used in the simplest of cases.  You should
        // probably leave this set to 'false' and inspect the request
        // object to make sure it's acceptable before accepting it.
        autoAcceptConnections: false,

        // Whether or not the X-Forwarded-For header should be respected.
        // It's important to set this to 'true' when accepting connections
        // from untrusted clients, as a malicious client could spoof its
        // IP address by simply setting this header.  It's meant to be added
        // by a trusted proxy or other intermediary within your own
        // infrastructure.
        // See:  http://en.wikipedia.org/wiki/X-Forwarded-For
        ignoreXForwardedFor: false,

        // The Nagle Algorithm makes more efficient use of network resources
        // by introducing a small delay before sending small packets so that
        // multiple messages can be batched together before going onto the
        // wire.  This however comes at the cost of latency, so the default
        // is to disable it.  If you don't need low latency and are streaming
        // lots of small messages, you can change this to 'false'
        disableNagleAlgorithm: true,

        // The number of milliseconds to wait after sending a close frame
        // for an acknowledgement to come back before giving up and just
        // closing the socket.
        closeTimeout: 5000
    };
    extend(this.config, config);

    if (this.config.httpServer) {
        if (!Array.isArray(this.config.httpServer)) {
            this.config.httpServer = [this.config.httpServer];
        }
        var upgradeHandler = this._handlers.upgrade;
        this.config.httpServer.forEach(function(httpServer) {
            httpServer.on('upgrade', upgradeHandler);
        });
    }
    else {
        throw new Error('You must specify an httpServer on which to mount the WebSocket server.');
    }
};

WebSocketServer.prototype.unmount = function() {
    var upgradeHandler = this._handlers.upgrade;
    this.config.httpServer.forEach(function(httpServer) {
        httpServer.removeListener('upgrade', upgradeHandler);
    });
};

WebSocketServer.prototype.closeAllConnections = function() {
    this.connections.forEach(function(connection) {
        connection.close();
    });
    this.pendingRequests.forEach(function(request) {
        process.nextTick(function() {
          request.reject(503); // HTTP 503 Service Unavailable
        });
    });
};

WebSocketServer.prototype.broadcast = function(data) {
    if (Buffer.isBuffer(data)) {
        this.broadcastBytes(data);
    }
    else if (typeof(data.toString) === 'function') {
        this.broadcastUTF(data);
    }
};

WebSocketServer.prototype.broadcastUTF = function(utfData) {
    this.connections.forEach(function(connection) {
        connection.sendUTF(utfData);
    });
};

WebSocketServer.prototype.broadcastBytes = function(binaryData) {
    this.connections.forEach(function(connection) {
        connection.sendBytes(binaryData);
    });
};

WebSocketServer.prototype.shutDown = function() {
    this.unmount();
    this.closeAllConnections();
};

WebSocketServer.prototype.handleUpgrade = function(request, socket) {
    var wsRequest = new WebSocketRequest(socket, request, this.config);
    try {
        wsRequest.readHandshake();
    }
    catch(e) {
        wsRequest.reject(
            e.httpCode ? e.httpCode : 400,
            e.message,
            e.headers
        );
        debug('Invalid handshake: %s', e.message);
        return;
    }
    
    this.pendingRequests.push(wsRequest);

    wsRequest.once('requestAccepted', this._handlers.requestAccepted);
    wsRequest.once('requestResolved', this._handlers.requestResolved);

    if (!this.config.autoAcceptConnections && utils.eventEmitterListenerCount(this, 'request') > 0) {
        this.emit('request', wsRequest);
    }
    else if (this.config.autoAcceptConnections) {
        wsRequest.accept(wsRequest.requestedProtocols[0], wsRequest.origin);
    }
    else {
        wsRequest.reject(404, 'No handler is configured to accept the connection.');
    }
};

WebSocketServer.prototype.handleRequestAccepted = function(connection) {
    var self = this;
    connection.once('close', function(closeReason, description) {
        self.handleConnectionClose(connection, closeReason, description);
    });
    this.connections.push(connection);
    this.emit('connect', connection);
};

WebSocketServer.prototype.handleConnectionClose = function(connection, closeReason, description) {
    var index = this.connections.indexOf(connection);
    if (index !== -1) {
        this.connections.splice(index, 1);
    }
    this.emit('close', connection, closeReason, description);
};

WebSocketServer.prototype.handleRequestResolved = function(request) {
    var index = this.pendingRequests.indexOf(request);
    if (index !== -1) { this.pendingRequests.splice(index, 1); }
};

module.exports = WebSocketServer;


/***/ }),

/***/ "./node_modules/websocket/lib/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/websocket/lib/utils.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var noop = exports.noop = function(){};

exports.extend = function extend(dest, source) {
    for (var prop in source) {
        dest[prop] = source[prop];
    }
};

exports.eventEmitterListenerCount =
    __webpack_require__(/*! events */ "events").EventEmitter.listenerCount ||
    function(emitter, type) { return emitter.listeners(type).length; };

exports.bufferAllocUnsafe = Buffer.allocUnsafe ?
    Buffer.allocUnsafe :
    function oldBufferAllocUnsafe(size) { return new Buffer(size); };

exports.bufferFromString = Buffer.from ?
    Buffer.from :
    function oldBufferFromString(string, encoding) {
      return new Buffer(string, encoding);
    };

exports.BufferingLogger = function createBufferingLogger(identifier, uniqueID) {
    var logFunction = __webpack_require__(/*! debug */ "./node_modules/debug/src/index.js")(identifier);
    if (logFunction.enabled) {
        var logger = new BufferingLogger(identifier, uniqueID, logFunction);
        var debug = logger.log.bind(logger);
        debug.printOutput = logger.printOutput.bind(logger);
        debug.enabled = logFunction.enabled;
        return debug;
    }
    logFunction.printOutput = noop;
    return logFunction;
};

function BufferingLogger(identifier, uniqueID, logFunction) {
    this.logFunction = logFunction;
    this.identifier = identifier;
    this.uniqueID = uniqueID;
    this.buffer = [];
}

BufferingLogger.prototype.log = function() {
  this.buffer.push([ new Date(), Array.prototype.slice.call(arguments) ]);
  return this;
};

BufferingLogger.prototype.clear = function() {
  this.buffer = [];
  return this;
};

BufferingLogger.prototype.printOutput = function(logFunction) {
    if (!logFunction) { logFunction = this.logFunction; }
    var uniqueID = this.uniqueID;
    this.buffer.forEach(function(entry) {
        var date = entry[0].toLocaleString();
        var args = entry[1].slice();
        var formatString = args[0];
        if (formatString !== (void 0) && formatString !== null) {
            formatString = '%s - %s - ' + formatString.toString();
            args.splice(0, 1, formatString, date, uniqueID);
            logFunction.apply(global, args);
        }
    });
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/lib/websocket.js":
/*!*************************************************!*\
  !*** ./node_modules/websocket/lib/websocket.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'server'       : __webpack_require__(/*! ./WebSocketServer */ "./node_modules/websocket/lib/WebSocketServer.js"),
    'client'       : __webpack_require__(/*! ./WebSocketClient */ "./node_modules/websocket/lib/WebSocketClient.js"),
    'router'       : __webpack_require__(/*! ./WebSocketRouter */ "./node_modules/websocket/lib/WebSocketRouter.js"),
    'frame'        : __webpack_require__(/*! ./WebSocketFrame */ "./node_modules/websocket/lib/WebSocketFrame.js"),
    'request'      : __webpack_require__(/*! ./WebSocketRequest */ "./node_modules/websocket/lib/WebSocketRequest.js"),
    'connection'   : __webpack_require__(/*! ./WebSocketConnection */ "./node_modules/websocket/lib/WebSocketConnection.js"),
    'w3cwebsocket' : __webpack_require__(/*! ./W3CWebSocket */ "./node_modules/websocket/lib/W3CWebSocket.js"),
    'deprecation'  : __webpack_require__(/*! ./Deprecation */ "./node_modules/websocket/lib/Deprecation.js"),
    'version'      : __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js")
};


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, config, contributors, dependencies, deprecated, description, devDependencies, directories, engines, homepage, keywords, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"websocket","_id":"websocket@1.0.28","_inBundle":false,"_integrity":"sha512-00y/20/80P7H4bCYkzuuvvfDvh+dgtXi5kzDf3UcZwN6boTYaKvsrtZ5lIYm1Gsg48siMErd9M4zjSYfYFHTrA==","_location":"/websocket","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"websocket","name":"websocket","escapedName":"websocket","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/websocket/-/websocket-1.0.28.tgz","_shasum":"9e5f6fdc8a3fe01d4422647ef93abdd8d45a78d3","_spec":"websocket","_where":"C:\\prj\\4_pzzl\\0_git\\server","author":{"name":"Brian McKelvey","email":"theturtle32@gmail.com","url":"https://github.com/theturtle32"},"browser":"lib/browser.js","bugs":{"url":"https://github.com/theturtle32/WebSocket-Node/issues"},"bundleDependencies":false,"config":{"verbose":false},"contributors":[{"name":"Iñaki Baz Castillo","email":"ibc@aliax.net","url":"http://dev.sipdoc.net"}],"dependencies":{"debug":"^2.2.0","nan":"^2.11.0","typedarray-to-buffer":"^3.1.5","yaeti":"^0.0.6"},"deprecated":false,"description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","devDependencies":{"buffer-equal":"^1.0.0","faucet":"^0.0.1","gulp":"git+https://github.com/gulpjs/gulp.git#4.0","gulp-jshint":"^2.0.4","jshint":"^2.0.0","jshint-stylish":"^2.2.1","tape":"^4.9.1"},"directories":{"lib":"./lib"},"engines":{"node":">=0.10.0"},"homepage":"https://github.com/theturtle32/WebSocket-Node","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"license":"Apache-2.0","main":"index","name":"websocket","repository":{"type":"git","url":"git+https://github.com/theturtle32/WebSocket-Node.git"},"scripts":{"gulp":"gulp","install":"(node-gyp rebuild 2> builderror.log) || (exit 0)","test":"faucet test/unit"},"version":"1.0.28"};

/***/ }),

/***/ "./node_modules/websocket/vendor/FastBufferList.js":
/*!*********************************************************!*\
  !*** ./node_modules/websocket/vendor/FastBufferList.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// This file was copied from https://github.com/substack/node-bufferlist
// and modified to be able to copy bytes from the bufferlist directly into
// a pre-existing fixed-size buffer without an additional memory allocation.

// bufferlist.js
// Treat a linked list of buffers as a single variable-size buffer.
var Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer;
var EventEmitter = __webpack_require__(/*! events */ "events").EventEmitter;
var bufferAllocUnsafe = __webpack_require__(/*! ../lib/utils */ "./node_modules/websocket/lib/utils.js").bufferAllocUnsafe;

module.exports = BufferList;
module.exports.BufferList = BufferList; // backwards compatibility

function BufferList(opts) {
    if (!(this instanceof BufferList)) return new BufferList(opts);
    EventEmitter.call(this);
    var self = this;
    
    if (typeof(opts) == 'undefined') opts = {};
    
    // default encoding to use for take(). Leaving as 'undefined'
    // makes take() return a Buffer instead.
    self.encoding = opts.encoding;
    
    var head = { next : null, buffer : null };
    var last = { next : null, buffer : null };
    
    // length can get negative when advanced past the end
    // and this is the desired behavior
    var length = 0;
    self.__defineGetter__('length', function () {
        return length;
    });
    
    // keep an offset of the head to decide when to head = head.next
    var offset = 0;
    
    // Write to the bufferlist. Emits 'write'. Always returns true.
    self.write = function (buf) {
        if (!head.buffer) {
            head.buffer = buf;
            last = head;
        }
        else {
            last.next = { next : null, buffer : buf };
            last = last.next;
        }
        length += buf.length;
        self.emit('write', buf);
        return true;
    };
    
    self.end = function (buf) {
        if (Buffer.isBuffer(buf)) self.write(buf);
    };
    
    // Push buffers to the end of the linked list. (deprecated)
    // Return this (self).
    self.push = function () {
        var args = [].concat.apply([], arguments);
        args.forEach(self.write);
        return self;
    };
    
    // For each buffer, perform some action.
    // If fn's result is a true value, cut out early.
    // Returns this (self).
    self.forEach = function (fn) {
        if (!head.buffer) return bufferAllocUnsafe(0);
        
        if (head.buffer.length - offset <= 0) return self;
        var firstBuf = head.buffer.slice(offset);
        
        var b = { buffer : firstBuf, next : head.next };
        
        while (b && b.buffer) {
            var r = fn(b.buffer);
            if (r) break;
            b = b.next;
        }
        
        return self;
    };
    
    // Create a single Buffer out of all the chunks or some subset specified by
    // start and one-past the end (like slice) in bytes.
    self.join = function (start, end) {
        if (!head.buffer) return bufferAllocUnsafe(0);
        if (start == undefined) start = 0;
        if (end == undefined) end = self.length;
        
        var big = bufferAllocUnsafe(end - start);
        var ix = 0;
        self.forEach(function (buffer) {
            if (start < (ix + buffer.length) && ix < end) {
                // at least partially contained in the range
                buffer.copy(
                    big,
                    Math.max(0, ix - start),
                    Math.max(0, start - ix),
                    Math.min(buffer.length, end - ix)
                );
            }
            ix += buffer.length;
            if (ix > end) return true; // stop processing past end
        });
        
        return big;
    };
    
    self.joinInto = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
        if (!head.buffer) return new bufferAllocUnsafe(0);
        if (sourceStart == undefined) sourceStart = 0;
        if (sourceEnd == undefined) sourceEnd = self.length;
        
        var big = targetBuffer;
        if (big.length - targetStart < sourceEnd - sourceStart) {
            throw new Error("Insufficient space available in target Buffer.");
        }
        var ix = 0;
        self.forEach(function (buffer) {
            if (sourceStart < (ix + buffer.length) && ix < sourceEnd) {
                // at least partially contained in the range
                buffer.copy(
                    big,
                    Math.max(targetStart, targetStart + ix - sourceStart),
                    Math.max(0, sourceStart - ix),
                    Math.min(buffer.length, sourceEnd - ix)
                );
            }
            ix += buffer.length;
            if (ix > sourceEnd) return true; // stop processing past end
        });
        
        return big;
    };
    
    // Advance the buffer stream by n bytes.
    // If n the aggregate advance offset passes the end of the buffer list,
    // operations such as .take() will return empty strings until enough data is
    // pushed.
    // Returns this (self).
    self.advance = function (n) {
        offset += n;
        length -= n;
        while (head.buffer && offset >= head.buffer.length) {
            offset -= head.buffer.length;
            head = head.next
                ? head.next
                : { buffer : null, next : null }
            ;
        }
        if (head.buffer === null) last = { next : null, buffer : null };
        self.emit('advance', n);
        return self;
    };
    
    // Take n bytes from the start of the buffers.
    // Returns a string.
    // If there are less than n bytes in all the buffers or n is undefined,
    // returns the entire concatenated buffer string.
    self.take = function (n, encoding) {
        if (n == undefined) n = self.length;
        else if (typeof n !== 'number') {
            encoding = n;
            n = self.length;
        }
        var b = head;
        if (!encoding) encoding = self.encoding;
        if (encoding) {
            var acc = '';
            self.forEach(function (buffer) {
                if (n <= 0) return true;
                acc += buffer.toString(
                    encoding, 0, Math.min(n,buffer.length)
                );
                n -= buffer.length;
            });
            return acc;
        } else {
            // If no 'encoding' is specified, then return a Buffer.
            return self.join(0, n);
        }
    };
    
    // The entire concatenated buffer as a string.
    self.toString = function () {
        return self.take('binary');
    };
}
__webpack_require__(/*! util */ "util").inherits(BufferList, EventEmitter);


/***/ }),

/***/ "./node_modules/yaeti/index.js":
/*!*************************************!*\
  !*** ./node_modules/yaeti/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	EventTarget : __webpack_require__(/*! ./lib/EventTarget */ "./node_modules/yaeti/lib/EventTarget.js"),
	Event       : __webpack_require__(/*! ./lib/Event */ "./node_modules/yaeti/lib/Event.js")
};


/***/ }),

/***/ "./node_modules/yaeti/lib/Event.js":
/*!*****************************************!*\
  !*** ./node_modules/yaeti/lib/Event.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Expose the Event class.
 */
module.exports = _Event;


function _Event(type) {
	this.type = type;
	this.isTrusted = false;

	// Set a flag indicating this is not a DOM Event object
	this._yaeti = true;
}


/***/ }),

/***/ "./node_modules/yaeti/lib/EventTarget.js":
/*!***********************************************!*\
  !*** ./node_modules/yaeti/lib/EventTarget.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Expose the _EventTarget class.
 */
module.exports = _EventTarget;

function _EventTarget() {
	// Do nothing if called for a native EventTarget object..
	if (typeof this.addEventListener === 'function') {
		return;
	}

	this._listeners = {};

	this.addEventListener = _addEventListener;
	this.removeEventListener = _removeEventListener;
	this.dispatchEvent = _dispatchEvent;
}

Object.defineProperties(_EventTarget.prototype, {
	listeners: {
		get: function () {
			return this._listeners;
		}
	}
});

function _addEventListener(type, newListener) {
	var
		listenersType,
		i, listener;

	if (!type || !newListener) {
		return;
	}

	listenersType = this._listeners[type];
	if (listenersType === undefined) {
		this._listeners[type] = listenersType = [];
	}

	for (i = 0; !!(listener = listenersType[i]); i++) {
		if (listener === newListener) {
			return;
		}
	}

	listenersType.push(newListener);
}

function _removeEventListener(type, oldListener) {
	var
		listenersType,
		i, listener;

	if (!type || !oldListener) {
		return;
	}

	listenersType = this._listeners[type];
	if (listenersType === undefined) {
		return;
	}

	for (i = 0; !!(listener = listenersType[i]); i++) {
		if (listener === oldListener) {
			listenersType.splice(i, 1);
			break;
		}
	}

	if (listenersType.length === 0) {
		delete this._listeners[type];
	}
}

function _dispatchEvent(event) {
	var
		type,
		listenersType,
		dummyListener,
		stopImmediatePropagation = false,
		i, listener;

	if (!event || typeof event.type !== 'string') {
		throw new Error('`event` must have a valid `type` property');
	}

	// Do some stuff to emulate DOM Event behavior (just if this is not a
	// DOM Event object)
	if (event._yaeti) {
		event.target = this;
		event.cancelable = true;
	}

	// Attempt to override the stopImmediatePropagation() method
	try {
		event.stopImmediatePropagation = function () {
			stopImmediatePropagation = true;
		};
	} catch (error) {}

	type = event.type;
	listenersType = (this._listeners[type] || []);

	dummyListener = this['on' + type];
	if (typeof dummyListener === 'function') {
		dummyListener.call(this, event);
	}

	for (i = 0; !!(listener = listenersType[i]); i++) {
		if (stopImmediatePropagation) {
			break;
		}

		listener.call(this, event);
	}

	return !event.defaultPrevented;
}


/***/ }),

/***/ "./src/PageServer/PageServer.ts":
/*!**************************************!*\
  !*** ./src/PageServer/PageServer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(__webpack_require__(/*! http */ "http"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
//@ts-ignore
const http_shutdown_1 = __importDefault(__webpack_require__(/*! http-shutdown */ "./node_modules/http-shutdown/index.js"));
class PageServer {
    constructor() { }
    static Create(port, rootFolder) {
        const server = new PageServer();
        return new Promise((resolve, reject) => {
            if (!fs.lstatSync(rootFolder).isDirectory()) {
                reject(new ReferenceError(`Root folder '${rootFolder}' is not a valid folder!`));
                return;
            }
            server.httpServer = http_shutdown_1.default(http.createServer((request, response) => {
                const { headers, method, url } = request;
                let body = [];
                request.on('error', (err) => {
                    console.error(err);
                }).on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    let filePath = rootFolder + request.url;
                    if (filePath == rootFolder + "/") {
                        filePath = rootFolder + "/index.html";
                    }
                    const extname = path.extname(filePath);
                    let contentType = 'text/html';
                    switch (extname) {
                        case '.js':
                            contentType = 'text/javascript';
                            break;
                        case '.css':
                            contentType = 'text/css';
                            break;
                        case '.json':
                            contentType = 'application/json';
                            break;
                        case '.png':
                            contentType = 'image/png';
                            break;
                        case '.jpg':
                            contentType = 'image/jpg';
                            break;
                    }
                    console.log(`[PageServer] Handling request for ${filePath}...`);
                    fs.readFile(filePath, function (error, content) {
                        if (error) {
                            console.group("[PageServer] Couldn't handle request");
                            console.error(error);
                            console.groupEnd();
                            fs.readFile(rootFolder + '/index.html', function (error, content) {
                                if (error) {
                                    response.writeHead(500);
                                    response.end('500');
                                    console.group("[PageServer] Couldn't return index.html as response to error handling");
                                    console.error(error);
                                    console.groupEnd();
                                    response.end();
                                }
                                response.writeHead(200, { 'Content-Type': contentType });
                                response.end(content, 'utf-8');
                            });
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        }
                    });
                });
            }));
            server.httpServer.on('listening', () => {
                console.log(`[PageServer] Listening on port ${port}...`);
                resolve(server);
            });
            server.httpServer.on('error', (error) => {
                console.error(`[PageServer] Error starting server...`);
                console.error(error);
                reject(error);
            });
            server.httpServer.listen(port);
        });
    }
    shutdown() {
        return new Promise((resolve, reject) => {
            this.httpServer.shutdown(() => {
                resolve();
            });
        });
    }
}
exports.PageServer = PageServer;


/***/ }),

/***/ "./src/SessionServer/SessionServer.ts":
/*!********************************************!*\
  !*** ./src/SessionServer/SessionServer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
if (Array.prototype.remove) {
    Array.prototype.remove = function (elem) {
        return this.filter(e => e !== elem);
    };
}
class Session {
    constructor(ID, sessionData) {
        this.connectedPlayerIDs = [];
        this.id = ID;
        this.currentSessionData = sessionData;
    }
    get CurrentPlayerCount() { return this.connectedPlayerIDs.length; }
    ;
    addPlayerByID(playerID) {
        this.connectedPlayerIDs.push(playerID);
        if (this.connectedPlayerIDs.indexOf(playerID) > -1) {
            console.error(`[SessionServer] Player ${playerID} is already part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
            return false;
        }
        return true;
    }
    removePlayerByID(playerID) {
        if (this.connectedPlayerIDs.indexOf(playerID) <= -1) {
            console.error(`[SessionServer] Player ${playerID} is not part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
            return false;
        }
        this.connectedPlayerIDs.remove(playerID);
        return true;
    }
    serializeData() {
        return JSON.stringify(this.currentSessionData);
    }
    forEachPlayer(callback) {
        this.connectedPlayerIDs.forEach(callback);
    }
}
;
const http = __importStar(__webpack_require__(/*! http */ "http"));
const ws = __importStar(__webpack_require__(/*! websocket */ "./node_modules/websocket/index.js"));
class SessionServer {
    constructor(port) {
        this.commands = {};
        this.nextSessionID = 0;
        this.sessions = {};
        this.nextPlayerID = 0;
        this.player = {};
        this.port = port;
        this.httpServer = http.createServer(() => { });
        this.httpServer.listen(this.port, () => { });
        this.wsServer = new ws.server({ httpServer: this.httpServer });
        this.wsServer.on('request', this.handleNewPlayer);
        console.log(`[SessionServer] Running at port ${this.port}`);
    }
    SetupCommands() {
        this.commands["createSession"] = (playerID, jsonMessage) => {
            const newSessionID = this.generateSessionID();
            this.sessions[newSessionID] = new Session(newSessionID, jsonMessage.mapName);
            if (this.sessions[newSessionID].addPlayerByID(playerID)) {
                console.error(`[SessionServer] Unable to add player ${playerID} to newly created session ${newSessionID}`);
                return;
            }
            console.log(`[SessionServer] Created new session with ID ${newSessionID}`);
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": "sessionJoin",
                "sessionID": newSessionID,
                "session": this.sessions[newSessionID].serializeData()
            }));
        };
        this.commands["joinSession"] = (playerID, jsonMessage) => {
            console.log(`[SessionServer] Player ${playerID} attempting to join session ${jsonMessage.sessionID}`);
            if (jsonMessage.sessionID < -1) {
                console.log("[SessionServer] Invalid session id");
                return { "sessionID": -1 };
            }
            // requesting a join to session ID -1 will join the latest session
            if (jsonMessage.sessionID == -1) {
                jsonMessage.sessionID = this.nextSessionID - 1;
            }
            if (!this.sessions[jsonMessage.sessionID]) {
                console.log(`[SessionServer] Session ${jsonMessage.sessionID} (no longer) doesn't exist`);
                return { "sessionID": -1 };
            }
            this.sessions[jsonMessage.sessionID].addPlayerByID(playerID);
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": "sessionJoin",
                "sessionID": jsonMessage.sessionID,
                "session": this.sessions[jsonMessage.sessionID].serializeData()
            }));
        };
        this.commands["leaveSession"] = (playerID, jsonMessage) => {
            if (typeof jsonMessage.sessionID != "number") {
                console.error(`[SessionServer] leaveSession requires a 'sessionID'-parameter as number! (supplied: ${jsonMessage.sessionID} [${typeof jsonMessage.sessionID}])`);
                return;
            }
            this.sessions[jsonMessage.sessionID].removePlayerByID(playerID);
            console.log(`[SessionServer] Players left in session ${jsonMessage.sessionID}: ${this.sessions[jsonMessage.sessionID].CurrentPlayerCount}`);
            if (!this.sessions[jsonMessage.sessionID].CurrentPlayerCount) {
                console.log(`[SessionServer] Session ${jsonMessage.sessionID} has no players left; discarding it`);
                delete this.sessions[jsonMessage.sessionID];
            }
            this.sendMessageToPlayer(playerID, "{}");
        };
    }
    generatePlayerCloseHandler(playerID) {
        return (reasonCode, description) => {
            this.removePlayer(playerID);
        };
    }
    removePlayer(playerID) {
        console.log(`[SessionServer] Connection from player ${playerID} closed...`);
        for (const sessionID in this.sessions) {
            this.commands.leaveSession.apply(this, [playerID, { "sessionID": parseInt(sessionID) }]);
        }
        delete this.player[playerID];
    }
    handleNewPlayer(request) {
        const connection = request.accept(undefined, request.origin);
        const playerID = this.generatePlayerID();
        this.player[playerID] = connection;
        this.player[playerID].on('message', (message) => {
            if (message.type === 'utf8') {
                try {
                    const jsonMessage = JSON.parse(message.utf8Data);
                    this.handleMessage(playerID, jsonMessage);
                }
                catch (e) {
                    console.group("Invalid JSON string received!");
                    console.error(message);
                    console.error(e);
                    console.groupEnd();
                }
            }
        });
        this.player[playerID].on('close', this.generatePlayerCloseHandler(playerID));
    }
    generatePlayerID() {
        return this.nextPlayerID++;
    }
    generateSessionID() {
        return this.nextSessionID++;
    }
    handleMessage(playerID, jsonMessage) {
        if (jsonMessage.command) {
            if (typeof this.commands[jsonMessage.command] == "function") {
                this.commands[jsonMessage.command].apply(this, [playerID, jsonMessage]);
            }
            else {
                console.error(`[SessionServer] no command called "${jsonMessage.command}" available`);
            }
        }
    }
    sendMessageToPlayer(playerID, message) {
        if (!this.player[playerID]) {
            console.error(`[SessionServer] No player with ID ${playerID} is connected!`);
            return false;
        }
        this.player[playerID].send(message);
        return true;
    }
    updateReplica(session) {
        session.forEachPlayer(((playerID) => {
            this.sendMessageToPlayer(playerID, JSON.stringify({ "command": "sessionUpdate", "session": session.serializeData() }));
        }).bind(this));
    }
}
exports.SessionServer = SessionServer;
;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SessionServer_1 = __webpack_require__(/*! SessionServer/SessionServer */ "./src/SessionServer/SessionServer.ts");
const PageServer_1 = __webpack_require__(/*! PageServer/PageServer */ "./src/PageServer/PageServer.ts");
const sessionServer = new SessionServer_1.SessionServer(parseInt(process.env.PORT || "") || 7996);
const pageServer = PageServer_1.PageServer.Create(parseInt(process.env.PORT || "") || 7995, "html");


/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0dHAtc2h1dGRvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXR5cGVkYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90eXBlZGFycmF5LXRvLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL0J1ZmZlclV0aWwuZmFsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvQnVmZmVyVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9EZXByZWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9WYWxpZGF0aW9uLmZhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvVzNDV2ViU29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9XZWJTb2NrZXRDb25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldEZyYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvV2ViU29ja2V0Um91dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldFJvdXRlclJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvV2ViU29ja2V0U2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvdmVuZG9yL0Zhc3RCdWZmZXJMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95YWV0aS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWFldGkvbGliL0V2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95YWV0aS9saWIvRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VTZXJ2ZXIvUGFnZVNlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2Vzc2lvblNlcnZlci9TZXNzaW9uU2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJ1ZmZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInR0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsbUJBQU8sQ0FBQyxrREFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1C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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDeFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLG1CQUFtQixtQkFBTyxDQUFDLHNCQUFRO0FBQ25DLHFCQUFxQixtQkFBTyxDQUFDLHdFQUFrQjtBQUMvQyxpQkFBaUIsbUJBQU8sQ0FBQyxtRkFBMEI7QUFDbkQsaUJBQWlCLG1CQUFPLENBQUMsZ0VBQWM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQscURBQXFEO0FBQ3JELGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxRQUFRO0FBQzVFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFROztBQUVsQztBQUNBLDJCQUEyQixRQUFROztBQUVuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsK0NBQStDLFFBQVE7O0FBRWpHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDLDJCQUEyQixFQUFFO0FBQ2xFOztBQUVBLGlDQUFpQywwQkFBMEIsRUFBRTs7QUFFN0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QztBQUNBLG1DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRkFBaUYsUUFBUTs7QUFFekY7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0EscUNBQXFDLFFBQVE7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQsVUFBVTtBQUMzRCwyQ0FBMkMsVUFBVTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7QUMvM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxnRUFBYztBQUN2Qyx3QkFBd0IsbUJBQU8sQ0FBQyxzREFBUzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7Ozs7QUN2UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsVUFBVSxtQkFBTyxDQUFDLGdCQUFLO0FBQ3ZCLG1CQUFtQixtQkFBTyxDQUFDLHNCQUFRO0FBQ25DLDBCQUEwQixtQkFBTyxDQUFDLGtGQUF1Qjs7QUFFekQ7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxNQUFNLEtBQUs7QUFDWDtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZEQUE2RDtBQUM3RCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7Ozs7QUMzZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0RBQVM7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCLG1CQUFtQixtQkFBTyxDQUFDLHNCQUFRO0FBQ25DLDZCQUE2QixtQkFBTyxDQUFD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LG1DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBEZXRlY3QgRWxlY3Ryb24gcmVuZGVyZXIgcHJvY2Vzcywgd2hpY2ggaXMgbm9kZSwgYnV0IHdlIHNob3VsZFxuICogdHJlYXQgYXMgYSBicm93c2VyLlxuICovXG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0dHkgPSByZXF1aXJlKCd0dHknKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIE5vZGUuanMgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmluaXQgPSBpbml0O1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbNiwgMiwgMywgNCwgNSwgMV07XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIC9eZGVidWdfL2kudGVzdChrZXkpO1xufSkucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAvLyBjYW1lbC1jYXNlXG4gIHZhciBwcm9wID0ga2V5XG4gICAgLnN1YnN0cmluZyg2KVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL18oW2Etel0pL2csIGZ1bmN0aW9uIChfLCBrKSB7IHJldHVybiBrLnRvVXBwZXJDYXNlKCkgfSk7XG5cbiAgLy8gY29lcmNlIHN0cmluZyB2YWx1ZSBpbnRvIEpTIHZhbHVlXG4gIHZhciB2YWwgPSBwcm9jZXNzLmVudltrZXldO1xuICBpZiAoL14oeWVzfG9ufHRydWV8ZW5hYmxlZCkkL2kudGVzdCh2YWwpKSB2YWwgPSB0cnVlO1xuICBlbHNlIGlmICgvXihub3xvZmZ8ZmFsc2V8ZGlzYWJsZWQpJC9pLnRlc3QodmFsKSkgdmFsID0gZmFsc2U7XG4gIGVsc2UgaWYgKHZhbCA9PT0gJ251bGwnKSB2YWwgPSBudWxsO1xuICBlbHNlIHZhbCA9IE51bWJlcih2YWwpO1xuXG4gIG9ialtwcm9wXSA9IHZhbDtcbiAgcmV0dXJuIG9iajtcbn0sIHt9KTtcblxuLyoqXG4gKiBUaGUgZmlsZSBkZXNjcmlwdG9yIHRvIHdyaXRlIHRoZSBgZGVidWcoKWAgY2FsbHMgdG8uXG4gKiBTZXQgdGhlIGBERUJVR19GRGAgZW52IHZhcmlhYmxlIHRvIG92ZXJyaWRlIHdpdGggYW5vdGhlciB2YWx1ZS4gaS5lLjpcbiAqXG4gKiAgICQgREVCVUdfRkQ9MyBub2RlIHNjcmlwdC5qcyAzPmRlYnVnLmxvZ1xuICovXG5cbnZhciBmZCA9IHBhcnNlSW50KHByb2Nlc3MuZW52LkRFQlVHX0ZELCAxMCkgfHwgMjtcblxuaWYgKDEgIT09IGZkICYmIDIgIT09IGZkKSB7XG4gIHV0aWwuZGVwcmVjYXRlKGZ1bmN0aW9uKCl7fSwgJ2V4Y2VwdCBmb3Igc3RkZXJyKDIpIGFuZCBzdGRvdXQoMSksIGFueSBvdGhlciB1c2FnZSBvZiBERUJVR19GRCBpcyBkZXByZWNhdGVkLiBPdmVycmlkZSBkZWJ1Zy5sb2cgaWYgeW91IHdhbnQgdG8gdXNlIGEgZGlmZmVyZW50IGxvZyBmdW5jdGlvbiAoaHR0cHM6Ly9naXQuaW8vZGVidWdfZmQpJykoKVxufVxuXG52YXIgc3RyZWFtID0gMSA9PT0gZmQgPyBwcm9jZXNzLnN0ZG91dCA6XG4gICAgICAgICAgICAgMiA9PT0gZmQgPyBwcm9jZXNzLnN0ZGVyciA6XG4gICAgICAgICAgICAgY3JlYXRlV3JpdGFibGVTdGRpb1N0cmVhbShmZCk7XG5cbi8qKlxuICogSXMgc3Rkb3V0IGEgVFRZPyBDb2xvcmVkIG91dHB1dCBpcyBlbmFibGVkIHdoZW4gYHRydWVgLlxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgcmV0dXJuICdjb2xvcnMnIGluIGV4cG9ydHMuaW5zcGVjdE9wdHNcbiAgICA/IEJvb2xlYW4oZXhwb3J0cy5pbnNwZWN0T3B0cy5jb2xvcnMpXG4gICAgOiB0dHkuaXNhdHR5KGZkKTtcbn1cblxuLyoqXG4gKiBNYXAgJW8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsIG9uIGEgc2luZ2xlIGxpbmUuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLm8gPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG4gIHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcbiAgICAuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihzdHIpIHtcbiAgICAgIHJldHVybiBzdHIudHJpbSgpXG4gICAgfSkuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJW8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5PID0gZnVuY3Rpb24odikge1xuICB0aGlzLmluc3BlY3RPcHRzLmNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuICByZXR1cm4gdXRpbC5pbnNwZWN0KHYsIHRoaXMuaW5zcGVjdE9wdHMpO1xufTtcblxuLyoqXG4gKiBBZGRzIEFOU0kgY29sb3IgZXNjYXBlIGNvZGVzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLm5hbWVzcGFjZTtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGlmICh1c2VDb2xvcnMpIHtcbiAgICB2YXIgYyA9IHRoaXMuY29sb3I7XG4gICAgdmFyIHByZWZpeCA9ICcgIFxcdTAwMWJbMycgKyBjICsgJzsxbScgKyBuYW1lICsgJyAnICsgJ1xcdTAwMWJbMG0nO1xuXG4gICAgYXJnc1swXSA9IHByZWZpeCArIGFyZ3NbMF0uc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbicgKyBwcmVmaXgpO1xuICAgIGFyZ3MucHVzaCgnXFx1MDAxYlszJyArIGMgKyAnbSsnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpICsgJ1xcdTAwMWJbMG0nKTtcbiAgfSBlbHNlIHtcbiAgICBhcmdzWzBdID0gbmV3IERhdGUoKS50b1VUQ1N0cmluZygpXG4gICAgICArICcgJyArIG5hbWUgKyAnICcgKyBhcmdzWzBdO1xuICB9XG59XG5cbi8qKlxuICogSW52b2tlcyBgdXRpbC5mb3JtYXQoKWAgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cyBhbmQgd3JpdGVzIHRvIGBzdHJlYW1gLlxuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgcmV0dXJuIHN0cmVhbS53cml0ZSh1dGlsLmZvcm1hdC5hcHBseSh1dGlsLCBhcmd1bWVudHMpICsgJ1xcbicpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgIC8vIElmIHlvdSBzZXQgYSBwcm9jZXNzLmVudiBmaWVsZCB0byBudWxsIG9yIHVuZGVmaW5lZCwgaXQgZ2V0cyBjYXN0IHRvIHRoZVxuICAgIC8vIHN0cmluZyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuIEp1c3QgZGVsZXRlIGluc3RlYWQuXG4gICAgZGVsZXRlIHByb2Nlc3MuZW52LkRFQlVHO1xuICB9IGVsc2Uge1xuICAgIHByb2Nlc3MuZW52LkRFQlVHID0gbmFtZXNwYWNlcztcbiAgfVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5ERUJVRztcbn1cblxuLyoqXG4gKiBDb3BpZWQgZnJvbSBgbm9kZS9zcmMvbm9kZS5qc2AuXG4gKlxuICogWFhYOiBJdCdzIGxhbWUgdGhhdCBub2RlIGRvZXNuJ3QgZXhwb3NlIHRoaXMgQVBJIG91dC1vZi10aGUtYm94LiBJdCBhbHNvXG4gKiByZWxpZXMgb24gdGhlIHVuZG9jdW1lbnRlZCBgdHR5X3dyYXAuZ3Vlc3NIYW5kbGVUeXBlKClgIHdoaWNoIGlzIGFsc28gbGFtZS5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVXcml0YWJsZVN0ZGlvU3RyZWFtIChmZCkge1xuICB2YXIgc3RyZWFtO1xuICB2YXIgdHR5X3dyYXAgPSBwcm9jZXNzLmJpbmRpbmcoJ3R0eV93cmFwJyk7XG5cbiAgLy8gTm90ZSBzdHJlYW0uX3R5cGUgaXMgdXNlZCBmb3IgdGVzdC1tb2R1bGUtbG9hZC1saXN0LmpzXG5cbiAgc3dpdGNoICh0dHlfd3JhcC5ndWVzc0hhbmRsZVR5cGUoZmQpKSB7XG4gICAgY2FzZSAnVFRZJzpcbiAgICAgIHN0cmVhbSA9IG5ldyB0dHkuV3JpdGVTdHJlYW0oZmQpO1xuICAgICAgc3RyZWFtLl90eXBlID0gJ3R0eSc7XG5cbiAgICAgIC8vIEhhY2sgdG8gaGF2ZSBzdHJlYW0gbm90IGtlZXAgdGhlIGV2ZW50IGxvb3AgYWxpdmUuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzI2XG4gICAgICBpZiAoc3RyZWFtLl9oYW5kbGUgJiYgc3RyZWFtLl9oYW5kbGUudW5yZWYpIHtcbiAgICAgICAgc3RyZWFtLl9oYW5kbGUudW5yZWYoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnRklMRSc6XG4gICAgICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgc3RyZWFtID0gbmV3IGZzLlN5bmNXcml0ZVN0cmVhbShmZCwgeyBhdXRvQ2xvc2U6IGZhbHNlIH0pO1xuICAgICAgc3RyZWFtLl90eXBlID0gJ2ZzJztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnUElQRSc6XG4gICAgY2FzZSAnVENQJzpcbiAgICAgIHZhciBuZXQgPSByZXF1aXJlKCduZXQnKTtcbiAgICAgIHN0cmVhbSA9IG5ldyBuZXQuU29ja2V0KHtcbiAgICAgICAgZmQ6IGZkLFxuICAgICAgICByZWFkYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgLy8gRklYTUUgU2hvdWxkIHByb2JhYmx5IGhhdmUgYW4gb3B0aW9uIGluIG5ldC5Tb2NrZXQgdG8gY3JlYXRlIGFcbiAgICAgIC8vIHN0cmVhbSBmcm9tIGFuIGV4aXN0aW5nIGZkIHdoaWNoIGlzIHdyaXRhYmxlIG9ubHkuIEJ1dCBmb3Igbm93XG4gICAgICAvLyB3ZSdsbCBqdXN0IGFkZCB0aGlzIGhhY2sgYW5kIHNldCB0aGUgYHJlYWRhYmxlYCBtZW1iZXIgdG8gZmFsc2UuXG4gICAgICAvLyBUZXN0OiAuL25vZGUgdGVzdC9maXh0dXJlcy9lY2hvLmpzIDwgL2V0Yy9wYXNzd2RcbiAgICAgIHN0cmVhbS5yZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgc3RyZWFtLnJlYWQgPSBudWxsO1xuICAgICAgc3RyZWFtLl90eXBlID0gJ3BpcGUnO1xuXG4gICAgICAvLyBGSVhNRSBIYWNrIHRvIGhhdmUgc3RyZWFtIG5vdCBrZWVwIHRoZSBldmVudCBsb29wIGFsaXZlLlxuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcyNlxuICAgICAgaWYgKHN0cmVhbS5faGFuZGxlICYmIHN0cmVhbS5faGFuZGxlLnVucmVmKSB7XG4gICAgICAgIHN0cmVhbS5faGFuZGxlLnVucmVmKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBQcm9iYWJseSBhbiBlcnJvciBvbiBpbiB1dl9ndWVzc19oYW5kbGUoKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBsZW1lbnQgbWUuIFVua25vd24gc3RyZWFtIGZpbGUgdHlwZSEnKTtcbiAgfVxuXG4gIC8vIEZvciBzdXBwb3J0aW5nIGxlZ2FjeSBBUEkgd2UgcHV0IHRoZSBGRCBoZXJlLlxuICBzdHJlYW0uZmQgPSBmZDtcblxuICBzdHJlYW0uX2lzU3RkaW8gPSB0cnVlO1xuXG4gIHJldHVybiBzdHJlYW07XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdCAoZGVidWcpIHtcbiAgZGVidWcuaW5zcGVjdE9wdHMgPSB7fTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuaW5zcGVjdE9wdHMpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBkZWJ1Zy5pbnNwZWN0T3B0c1trZXlzW2ldXSA9IGV4cG9ydHMuaW5zcGVjdE9wdHNba2V5c1tpXV07XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYHByb2Nlc3MuZW52LkRFQlVHYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcblxuLyoqXG4gKiBFeHBvc2UgYGFkZFNodXRkb3duYC5cbiAqL1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gYWRkU2h1dGRvd247XG5cbi8qKlxuICogQWRkcyBzaHV0ZG93biBmdW5jdGlvbmFpbGl0eSB0byB0aGUgYGh0dHAuU2VydmVyYCBvYmplY3RcbiAqIEBwYXJhbSB7aHR0cC5TZXJ2ZXJ9IHNlcnZlciBUaGUgc2VydmVyIHRvIGFkZCBzaHV0ZG93biBmdW5jdGlvbmFpbGl0eSB0b1xuICovXG5mdW5jdGlvbiBhZGRTaHV0ZG93bihzZXJ2ZXIpIHtcbiAgdmFyIGNvbm5lY3Rpb25zID0ge307XG4gIHZhciBpc1NodXR0aW5nRG93biA9IGZhbHNlO1xuICB2YXIgY29ubmVjdGlvbkNvdW50ZXIgPSAwO1xuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koc29ja2V0LCBmb3JjZSkge1xuICAgIGlmIChmb3JjZSB8fCAoc29ja2V0Ll9pc0lkbGUgJiYgaXNTaHV0dGluZ0Rvd24pKSB7XG4gICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgZGVsZXRlIGNvbm5lY3Rpb25zW3NvY2tldC5fY29ubmVjdGlvbklkXTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gb25Db25uZWN0aW9uKHNvY2tldCkge1xuICAgIHZhciBpZCA9IGNvbm5lY3Rpb25Db3VudGVyKys7XG4gICAgc29ja2V0Ll9pc0lkbGUgPSB0cnVlO1xuICAgIHNvY2tldC5fY29ubmVjdGlvbklkID0gaWQ7XG4gICAgY29ubmVjdGlvbnNbaWRdID0gc29ja2V0O1xuXG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIGNvbm5lY3Rpb25zW2lkXTtcbiAgICB9KTtcbiAgfTtcblxuICBzZXJ2ZXIub24oJ3JlcXVlc3QnLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIHJlcS5zb2NrZXQuX2lzSWRsZSA9IGZhbHNlO1xuXG4gICAgcmVzLm9uKCdmaW5pc2gnLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlcS5zb2NrZXQuX2lzSWRsZSA9IHRydWU7XG4gICAgICBkZXN0cm95KHJlcS5zb2NrZXQpO1xuICAgIH0pO1xuICB9KTtcblxuICBzZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBvbkNvbm5lY3Rpb24pO1xuICBzZXJ2ZXIub24oJ3NlY3VyZUNvbm5lY3Rpb24nLCBvbkNvbm5lY3Rpb24pO1xuXG4gIGZ1bmN0aW9uIHNodXRkb3duKGZvcmNlLCBjYikge1xuICAgIGlzU2h1dHRpbmdEb3duID0gdHJ1ZTtcbiAgICBzZXJ2ZXIuY2xvc2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHsgY2IoZXJyKSB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgZGVzdHJveShjb25uZWN0aW9uc1trZXldLCBmb3JjZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgc2VydmVyLnNodXRkb3duID0gZnVuY3Rpb24oY2IpIHtcbiAgICBzaHV0ZG93bihmYWxzZSwgY2IpO1xuICB9O1xuXG4gIHNlcnZlci5mb3JjZVNodXRkb3duID0gZnVuY3Rpb24oY2IpIHtcbiAgICBzaHV0ZG93bih0cnVlLCBjYik7XG4gIH07XG5cbiAgcmV0dXJuIHNlcnZlcjtcbn07XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUge2h0dHAuU2VydmVyfSBvYmplY3Qgd2l0aCBzaHV0ZG93biBmdW5jdGlvbmFpbGl0eS5cbiAqIEByZXR1cm4ge2h0dHAuU2VydmVyfSBUaGUgZGVjb3JhdGVkIHNlcnZlciBvYmplY3RcbiAqL1xuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgaHR0cC5TZXJ2ZXIucHJvdG90eXBlLndpdGhTaHV0ZG93biA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhZGRTaHV0ZG93bih0aGlzKTtcbiAgfTtcblxuICBodHRwcy5TZXJ2ZXIucHJvdG90eXBlLndpdGhTaHV0ZG93biA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhZGRTaHV0ZG93bih0aGlzKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyAgICAgID0gaXNUeXBlZEFycmF5XG5pc1R5cGVkQXJyYXkuc3RyaWN0ID0gaXNTdHJpY3RUeXBlZEFycmF5XG5pc1R5cGVkQXJyYXkubG9vc2UgID0gaXNMb29zZVR5cGVkQXJyYXlcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xudmFyIG5hbWVzID0ge1xuICAgICdbb2JqZWN0IEludDhBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgSW50MTZBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgSW50MzJBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgVWludDhBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJzogdHJ1ZVxuICAsICdbb2JqZWN0IFVpbnQxNkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBVaW50MzJBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgRmxvYXQzMkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBGbG9hdDY0QXJyYXldJzogdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkoYXJyKSB7XG4gIHJldHVybiAoXG4gICAgICAgaXNTdHJpY3RUeXBlZEFycmF5KGFycilcbiAgICB8fCBpc0xvb3NlVHlwZWRBcnJheShhcnIpXG4gIClcbn1cblxuZnVuY3Rpb24gaXNTdHJpY3RUeXBlZEFycmF5KGFycikge1xuICByZXR1cm4gKFxuICAgICAgIGFyciBpbnN0YW5jZW9mIEludDhBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIEludDE2QXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBJbnQzMkFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgVWludDhBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgVWludDE2QXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBVaW50MzJBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheVxuICApXG59XG5cbmZ1bmN0aW9uIGlzTG9vc2VUeXBlZEFycmF5KGFycikge1xuICByZXR1cm4gbmFtZXNbdG9TdHJpbmcuY2FsbChhcnIpXVxufVxuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwiLyoqXG4gKiBDb252ZXJ0IGEgdHlwZWQgYXJyYXkgdG8gYSBCdWZmZXIgd2l0aG91dCBhIGNvcHlcbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogTGljZW5zZTogIE1JVFxuICpcbiAqIGBucG0gaW5zdGFsbCB0eXBlZGFycmF5LXRvLWJ1ZmZlcmBcbiAqL1xuXG52YXIgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnaXMtdHlwZWRhcnJheScpLnN0cmljdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHR5cGVkYXJyYXlUb0J1ZmZlciAoYXJyKSB7XG4gIGlmIChpc1R5cGVkQXJyYXkoYXJyKSkge1xuICAgIC8vIFRvIGF2b2lkIGEgY29weSwgdXNlIHRoZSB0eXBlZCBhcnJheSdzIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIgdG8gYmFjayBuZXcgQnVmZmVyXG4gICAgdmFyIGJ1ZiA9IEJ1ZmZlci5mcm9tKGFyci5idWZmZXIpXG4gICAgaWYgKGFyci5ieXRlTGVuZ3RoICE9PSBhcnIuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgIC8vIFJlc3BlY3QgdGhlIFwidmlld1wiLCBpLmUuIGJ5dGVPZmZzZXQgYW5kIGJ5dGVMZW5ndGgsIHdpdGhvdXQgZG9pbmcgYSBjb3B5XG4gICAgICBidWYgPSBidWYuc2xpY2UoYXJyLmJ5dGVPZmZzZXQsIGFyci5ieXRlT2Zmc2V0ICsgYXJyLmJ5dGVMZW5ndGgpXG4gICAgfVxuICAgIHJldHVybiBidWZcbiAgfSBlbHNlIHtcbiAgICAvLyBQYXNzIHRocm91Z2ggYWxsIG90aGVyIHR5cGVzIHRvIGBCdWZmZXIuZnJvbWBcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYXJyKVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldCcpOyIsIi8qIVxuICogQ29waWVkIGZyb206XG4gKiB3czogYSBub2RlLmpzIHdlYnNvY2tldCBjbGllbnRcbiAqIENvcHlyaWdodChjKSAyMDExIEVpbmFyIE90dG8gU3Rhbmd2aWsgPGVpbmFyb3NAZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoganNoaW50IC1XMDg2ICovXG5cbm1vZHVsZS5leHBvcnRzLkJ1ZmZlclV0aWwgPSB7XG4gIG1lcmdlOiBmdW5jdGlvbihtZXJnZWRCdWZmZXIsIGJ1ZmZlcnMpIHtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICB2YXIgYnVmID0gYnVmZmVyc1tpXTtcbiAgICAgIGJ1Zi5jb3B5KG1lcmdlZEJ1ZmZlciwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBidWYubGVuZ3RoO1xuICAgIH1cbiAgfSxcbiAgbWFzazogZnVuY3Rpb24oc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgdmFyIG1hc2tOdW0gPSBtYXNrLnJlYWRVSW50MzJMRSgwKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yICg7IGkgPCBsZW5ndGggLSAzOyBpICs9IDQpIHtcbiAgICAgIHZhciBudW0gPSBtYXNrTnVtIF4gc291cmNlLnJlYWRVSW50MzJMRShpKTtcbiAgICAgIGlmIChudW0gPCAwKSB7IG51bSA9IDQyOTQ5NjcyOTYgKyBudW07IH1cbiAgICAgIG91dHB1dC53cml0ZVVJbnQzMkxFKG51bSwgb2Zmc2V0ICsgaSk7XG4gICAgfVxuICAgIHN3aXRjaCAobGVuZ3RoICUgNCkge1xuICAgICAgY2FzZSAzOiBvdXRwdXRbb2Zmc2V0ICsgaSArIDJdID0gc291cmNlW2kgKyAyXSBeIG1hc2tbMl07XG4gICAgICBjYXNlIDI6IG91dHB1dFtvZmZzZXQgKyBpICsgMV0gPSBzb3VyY2VbaSArIDFdIF4gbWFza1sxXTtcbiAgICAgIGNhc2UgMTogb3V0cHV0W29mZnNldCArIGldID0gc291cmNlW2ldIF4gbWFza1swXTtcbiAgICAgIGNhc2UgMDpcbiAgICB9XG4gIH0sXG4gIHVubWFzazogZnVuY3Rpb24oZGF0YSwgbWFzaykge1xuICAgIHZhciBtYXNrTnVtID0gbWFzay5yZWFkVUludDMyTEUoMCk7XG4gICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKDsgaSA8IGxlbmd0aCAtIDM7IGkgKz0gNCkge1xuICAgICAgdmFyIG51bSA9IG1hc2tOdW0gXiBkYXRhLnJlYWRVSW50MzJMRShpKTtcbiAgICAgIGlmIChudW0gPCAwKSB7IG51bSA9IDQyOTQ5NjcyOTYgKyBudW07IH1cbiAgICAgIGRhdGEud3JpdGVVSW50MzJMRShudW0sIGkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMzogZGF0YVtpICsgMl0gPSBkYXRhW2kgKyAyXSBeIG1hc2tbMl07XG4gICAgICBjYXNlIDI6IGRhdGFbaSArIDFdID0gZGF0YVtpICsgMV0gXiBtYXNrWzFdO1xuICAgICAgY2FzZSAxOiBkYXRhW2ldID0gZGF0YVtpXSBeIG1hc2tbMF07XG4gICAgICBjYXNlIDA6XG4gICAgfVxuICB9XG59O1xuXG4vKiBqc2hpbnQgK1cwODYgKi8iLCIvKiFcbiAqIENvcGllZCBmcm9tOlxuICogd3M6IGEgbm9kZS5qcyB3ZWJzb2NrZXQgY2xpZW50XG4gKiBDb3B5cmlnaHQoYykgMjAxMSBFaW5hciBPdHRvIFN0YW5ndmlrIDxlaW5hcm9zQGdtYWlsLmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vYnVpbGQvUmVsZWFzZS9idWZmZXJ1dGlsJyk7XG59IGNhdGNoIChlKSB7IHRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vYnVpbGQvZGVmYXVsdC9idWZmZXJ1dGlsJyk7XG59IGNhdGNoIChlKSB7IHRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9CdWZmZXJVdGlsLmZhbGxiYWNrJyk7XG59IGNhdGNoIChlKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ2J1ZmZlcnV0aWwubm9kZSBzZWVtcyB0byBub3QgaGF2ZSBiZWVuIGJ1aWx0LiBSdW4gbnBtIGluc3RhbGwuJyk7XG4gIHRocm93IGU7XG59fX1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIERlcHJlY2F0aW9uID0ge1xuICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG5cbiAgICBkZXByZWNhdGlvbldhcm5pbmdNYXA6IHtcblxuICAgIH0sXG5cbiAgICB3YXJuOiBmdW5jdGlvbihkZXByZWNhdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVXYXJuaW5ncyAmJiB0aGlzLmRlcHJlY2F0aW9uV2FybmluZ01hcFtkZXByZWNhdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RFUFJFQ0FUSU9OIFdBUk5JTkc6ICcgKyB0aGlzLmRlcHJlY2F0aW9uV2FybmluZ01hcFtkZXByZWNhdGlvbk5hbWVdKTtcbiAgICAgICAgICAgIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nTWFwW2RlcHJlY2F0aW9uTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGVwcmVjYXRpb247XG4iLCIvKiFcbiAqIFVURi04IFZhbGlkYXRpb24gRmFsbGJhY2sgQ29kZSBvcmlnaW5hbGx5IGZyb206XG4gKiB3czogYSBub2RlLmpzIHdlYnNvY2tldCBjbGllbnRcbiAqIENvcHlyaWdodChjKSAyMDExIEVpbmFyIE90dG8gU3Rhbmd2aWsgPGVpbmFyb3NAZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMuVmFsaWRhdGlvbiA9IHtcbiAgaXNWYWxpZFVURjg6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiLyohXG4gKiBVVEYtOCBWYWxpZGF0aW9uIENvZGUgb3JpZ2luYWxseSBmcm9tOlxuICogd3M6IGEgbm9kZS5qcyB3ZWJzb2NrZXQgY2xpZW50XG4gKiBDb3B5cmlnaHQoYykgMjAxMSBFaW5hciBPdHRvIFN0YW5ndmlrIDxlaW5hcm9zQGdtYWlsLmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbnRyeSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9idWlsZC9SZWxlYXNlL3ZhbGlkYXRpb24nKTtcbn0gY2F0Y2ggKGUpIHsgdHJ5IHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2J1aWxkL2RlZmF1bHQvdmFsaWRhdGlvbicpO1xufSBjYXRjaCAoZSkgeyB0cnkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9WYWxpZGF0aW9uLmZhbGxiYWNrJyk7XG59IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcigndmFsaWRhdGlvbi5ub2RlIHNlZW1zIG5vdCB0byBoYXZlIGJlZW4gYnVpbHQuIFJ1biBucG0gaW5zdGFsbC4nKTtcbiAgICB0aHJvdyBlO1xufX19XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBXZWJTb2NrZXRDbGllbnQgPSByZXF1aXJlKCcuL1dlYlNvY2tldENsaWVudCcpO1xudmFyIHRvQnVmZmVyID0gcmVxdWlyZSgndHlwZWRhcnJheS10by1idWZmZXInKTtcbnZhciB5YWV0aSA9IHJlcXVpcmUoJ3lhZXRpJyk7XG5cblxuY29uc3QgQ09OTkVDVElORyA9IDA7XG5jb25zdCBPUEVOID0gMTtcbmNvbnN0IENMT1NJTkcgPSAyO1xuY29uc3QgQ0xPU0VEID0gMztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFczQ1dlYlNvY2tldDtcblxuXG5mdW5jdGlvbiBXM0NXZWJTb2NrZXQodXJsLCBwcm90b2NvbHMsIG9yaWdpbiwgaGVhZGVycywgcmVxdWVzdE9wdGlvbnMsIGNsaWVudENvbmZpZykge1xuICAgIC8vIE1ha2UgdGhpcyBhbiBFdmVudFRhcmdldC5cbiAgICB5YWV0aS5FdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gU2FuaXRpemUgY2xpZW50Q29uZmlnLlxuICAgIGNsaWVudENvbmZpZyA9IGNsaWVudENvbmZpZyB8fCB7fTtcbiAgICBjbGllbnRDb25maWcuYXNzZW1ibGVGcmFnbWVudHMgPSB0cnVlOyAgLy8gUmVxdWlyZWQgaW4gdGhlIFczQyBBUEkuXG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgdGhpcy5fcmVhZHlTdGF0ZSA9IENPTk5FQ1RJTkc7XG4gICAgdGhpcy5fcHJvdG9jb2wgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9ICcnO1xuICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ID0gMDsgIC8vIEhhY2ssIGFsd2F5cyAwLlxuICAgIHRoaXMuX2JpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInOyAgLy8gVE9ETzogU2hvdWxkIGJlICdibG9iJyBieSBkZWZhdWx0LCBidXQgTm9kZSBoYXMgbm8gQmxvYi5cblxuICAgIC8vIFRoZSBXZWJTb2NrZXRDb25uZWN0aW9uIGluc3RhbmNlLlxuICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBXZWJTb2NrZXRDbGllbnQgaW5zdGFuY2UuXG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYlNvY2tldENsaWVudChjbGllbnRDb25maWcpO1xuXG4gICAgdGhpcy5fY2xpZW50Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICAgICAgICBvbkNvbm5lY3QuY2FsbChzZWxmLCBjb25uZWN0aW9uKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2NsaWVudC5vbignY29ubmVjdEZhaWxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBvbkNvbm5lY3RGYWlsZWQuY2FsbChzZWxmKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2NsaWVudC5jb25uZWN0KHVybCwgcHJvdG9jb2xzLCBvcmlnaW4sIGhlYWRlcnMsIHJlcXVlc3RPcHRpb25zKTtcbn1cblxuXG4vLyBFeHBvc2UgVzNDIHJlYWQgb25seSBhdHRyaWJ1dGVzLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVzNDV2ViU29ja2V0LnByb3RvdHlwZSwge1xuICAgIHVybDogICAgICAgICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl91cmw7ICAgICAgICAgICAgfSB9LFxuICAgIHJlYWR5U3RhdGU6ICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9yZWFkeVN0YXRlOyAgICAgfSB9LFxuICAgIHByb3RvY29sOiAgICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9wcm90b2NvbDsgICAgICAgfSB9LFxuICAgIGV4dGVuc2lvbnM6ICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9leHRlbnNpb25zOyAgICAgfSB9LFxuICAgIGJ1ZmZlcmVkQW1vdW50OiB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9idWZmZXJlZEFtb3VudDsgfSB9XG59KTtcblxuXG4vLyBFeHBvc2UgVzNDIHdyaXRlL3JlYWQgYXR0cmlidXRlcy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFczQ1dlYlNvY2tldC5wcm90b3R5cGUsIHtcbiAgICBiaW5hcnlUeXBlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluYXJ5VHlwZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBKdXN0ICdhcnJheWJ1ZmZlcicgc3VwcG9ydGVkLlxuICAgICAgICAgICAgaWYgKHR5cGUgIT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ2p1c3QgXCJhcnJheWJ1ZmZlclwiIHR5cGUgYWxsb3dlZCBmb3IgXCJiaW5hcnlUeXBlXCIgYXR0cmlidXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9iaW5hcnlUeXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIEV4cG9zZSBXM0MgcmVhZHlTdGF0ZSBjb25zdGFudHMgaW50byB0aGUgV2ViU29ja2V0IGluc3RhbmNlIGFzIFczQyBzdGF0ZXMuXG5bWydDT05ORUNUSU5HJyxDT05ORUNUSU5HXSwgWydPUEVOJyxPUEVOXSwgWydDTE9TSU5HJyxDTE9TSU5HXSwgWydDTE9TRUQnLENMT1NFRF1dLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVzNDV2ViU29ja2V0LnByb3RvdHlwZSwgcHJvcGVydHlbMF0sIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHByb3BlcnR5WzFdOyB9XG4gICAgfSk7XG59KTtcblxuLy8gQWxzbyBleHBvc2UgVzNDIHJlYWR5U3RhdGUgY29uc3RhbnRzIGludG8gdGhlIFdlYlNvY2tldCBjbGFzcyAobm90IGRlZmluZWQgYnkgdGhlIFczQyxcbi8vIGJ1dCB0aGVyZSBhcmUgc28gbWFueSBsaWJzIHJlbHlpbmcgb24gdGhlbSkuXG5bWydDT05ORUNUSU5HJyxDT05ORUNUSU5HXSwgWydPUEVOJyxPUEVOXSwgWydDTE9TSU5HJyxDTE9TSU5HXSwgWydDTE9TRUQnLENMT1NFRF1dLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVzNDV2ViU29ja2V0LCBwcm9wZXJ0eVswXSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gcHJvcGVydHlbMV07IH1cbiAgICB9KTtcbn0pO1xuXG5cblczQ1dlYlNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAodGhpcy5fcmVhZHlTdGF0ZSAhPT0gT1BFTikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjYWxsIHNlbmQoKSB3aGlsZSBub3QgY29ubmVjdGVkJyk7XG4gICAgfVxuXG4gICAgLy8gVGV4dC5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnIHx8IGRhdGEgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kVVRGKGRhdGEpO1xuICAgIH1cbiAgICAvLyBCaW5hcnkuXG4gICAgZWxzZSB7XG4gICAgICAgIC8vIE5vZGUgQnVmZmVyLlxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kQnl0ZXMoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgQXJyYXlCdWZmZXIgb3IgQXJyYXlCdWZmZXJWaWV3IGNvbnZlcnQgaXQgdG8gTm9kZSBCdWZmZXIuXG4gICAgICAgIGVsc2UgaWYgKGRhdGEuYnl0ZUxlbmd0aCB8fCBkYXRhLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRhdGEgPSB0b0J1ZmZlcihkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZEJ5dGVzKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIGJpbmFyeSBkYXRhOicsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5XM0NXZWJTb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gICAgc3dpdGNoKHRoaXMuX3JlYWR5U3RhdGUpIHtcbiAgICAgICAgY2FzZSBDT05ORUNUSU5HOlxuICAgICAgICAgICAgLy8gTk9URTogV2UgZG9uJ3QgaGF2ZSB0aGUgV2ViU29ja2V0Q29ubmVjdGlvbiBpbnN0YW5jZSB5ZXQgc28gbm9cbiAgICAgICAgICAgIC8vIHdheSB0byBjbG9zZSB0aGUgVENQIGNvbm5lY3Rpb24uXG4gICAgICAgICAgICAvLyBBcnRpZmljaWFsbHkgaW52b2tlIHRoZSBvbkNvbm5lY3RGYWlsZWQgZXZlbnQuXG4gICAgICAgICAgICBvbkNvbm5lY3RGYWlsZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8vIEFuZCBjbG9zZSBpZiBpdCBjb25uZWN0cyBhZnRlciBhIHdoaWxlLlxuICAgICAgICAgICAgdGhpcy5fY2xpZW50Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoY29kZSwgcmVhc29uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPUEVOOlxuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IENMT1NJTkc7XG4gICAgICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24uY2xvc2UoY29kZSwgcmVhc29uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ0xPU0lORzpcbiAgICAgICAgY2FzZSBDTE9TRUQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5cbi8qKlxuICogUHJpdmF0ZSBBUEkuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVDbG9zZUV2ZW50KGNvZGUsIHJlYXNvbikge1xuICAgIHZhciBldmVudCA9IG5ldyB5YWV0aS5FdmVudCgnY2xvc2UnKTtcblxuICAgIGV2ZW50LmNvZGUgPSBjb2RlO1xuICAgIGV2ZW50LnJlYXNvbiA9IHJlYXNvbjtcbiAgICBldmVudC53YXNDbGVhbiA9ICh0eXBlb2YgY29kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29kZSA9PT0gMTAwMCk7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUV2ZW50KGRhdGEpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgeWFldGkuRXZlbnQoJ21lc3NhZ2UnKTtcblxuICAgIGV2ZW50LmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIGV2ZW50O1xufVxuXG5cbmZ1bmN0aW9uIG9uQ29ubmVjdChjb25uZWN0aW9uKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5fcmVhZHlTdGF0ZSA9IE9QRU47XG4gICAgdGhpcy5fY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgdGhpcy5fcHJvdG9jb2wgPSBjb25uZWN0aW9uLnByb3RvY29sO1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSBjb25uZWN0aW9uLmV4dGVuc2lvbnM7XG5cbiAgICB0aGlzLl9jb25uZWN0aW9uLm9uKCdjbG9zZScsIGZ1bmN0aW9uKGNvZGUsIHJlYXNvbikge1xuICAgICAgICBvbkNsb3NlLmNhbGwoc2VsZiwgY29kZSwgcmVhc29uKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2Nvbm5lY3Rpb24ub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgb25NZXNzYWdlLmNhbGwoc2VsZiwgbXNnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgeWFldGkuRXZlbnQoJ29wZW4nKSk7XG59XG5cblxuZnVuY3Rpb24gb25Db25uZWN0RmFpbGVkKCkge1xuICAgIGRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gQ0xPU0VEO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyB5YWV0aS5FdmVudCgnZXJyb3InKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoMTAwNiwgJ2Nvbm5lY3Rpb24gZmFpbGVkJykpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBvbkNsb3NlKGNvZGUsIHJlYXNvbikge1xuICAgIGRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gQ0xPU0VEO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZUNsb3NlRXZlbnQoY29kZSwgcmVhc29uIHx8ICcnKSk7XG59XG5cblxuZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBpZiAobWVzc2FnZS51dGY4RGF0YSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlTWVzc2FnZUV2ZW50KG1lc3NhZ2UudXRmOERhdGEpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS5iaW5hcnlEYXRhKSB7XG4gICAgICAgIC8vIE11c3QgY29udmVydCBmcm9tIE5vZGUgQnVmZmVyIHRvIEFycmF5QnVmZmVyLlxuICAgICAgICAvLyBUT0RPOiBvciB0byBhIEJsb2IgKHdoaWNoIGRvZXMgbm90IGV4aXN0IGluIE5vZGUhKS5cbiAgICAgICAgaWYgKHRoaXMuYmluYXJ5VHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG1lc3NhZ2UuYmluYXJ5RGF0YTtcbiAgICAgICAgICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49YnVmZmVyLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIHZpZXdbaV0gPSBidWZmZXJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlTWVzc2FnZUV2ZW50KGFycmF5YnVmZmVyKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0aGlzLl9jbGllbnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB9XG59XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBleHRlbmQgPSB1dGlscy5leHRlbmQ7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG52YXIgV2ViU29ja2V0Q29ubmVjdGlvbiA9IHJlcXVpcmUoJy4vV2ViU29ja2V0Q29ubmVjdGlvbicpO1xudmFyIGJ1ZmZlckFsbG9jVW5zYWZlID0gdXRpbHMuYnVmZmVyQWxsb2NVbnNhZmU7XG5cbnZhciBwcm90b2NvbFNlcGFyYXRvcnMgPSBbXG4gICAgJygnLCAnKScsICc8JywgJz4nLCAnQCcsXG4gICAgJywnLCAnOycsICc6JywgJ1xcXFwnLCAnXFxcIicsXG4gICAgJy8nLCAnWycsICddJywgJz8nLCAnPScsXG4gICAgJ3snLCAnfScsICcgJywgU3RyaW5nLmZyb21DaGFyQ29kZSg5KVxuXTtcblxudmFyIGV4Y2x1ZGVkVGxzT3B0aW9ucyA9IFsnaG9zdG5hbWUnLCdwb3J0JywnbWV0aG9kJywncGF0aCcsJ2hlYWRlcnMnXTtcblxuZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KGNvbmZpZykge1xuICAgIC8vIFN1cGVyY2xhc3MgQ29uc3RydWN0b3JcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8vIFRPRE86IEltcGxlbWVudCBleHRlbnNpb25zXG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgLy8gMU1pQiBtYXggZnJhbWUgc2l6ZS5cbiAgICAgICAgbWF4UmVjZWl2ZWRGcmFtZVNpemU6IDB4MTAwMDAwLFxuXG4gICAgICAgIC8vIDhNaUIgbWF4IG1lc3NhZ2Ugc2l6ZSwgb25seSBhcHBsaWNhYmxlIGlmXG4gICAgICAgIC8vIGFzc2VtYmxlRnJhZ21lbnRzIGlzIHRydWVcbiAgICAgICAgbWF4UmVjZWl2ZWRNZXNzYWdlU2l6ZTogMHg4MDAwMDAsXG5cbiAgICAgICAgLy8gT3V0Z29pbmcgbWVzc2FnZXMgbGFyZ2VyIHRoYW4gZnJhZ21lbnRhdGlvblRocmVzaG9sZCB3aWxsIGJlXG4gICAgICAgIC8vIHNwbGl0IGludG8gbXVsdGlwbGUgZnJhZ21lbnRzLlxuICAgICAgICBmcmFnbWVudE91dGdvaW5nTWVzc2FnZXM6IHRydWUsXG5cbiAgICAgICAgLy8gT3V0Z29pbmcgZnJhbWVzIGFyZSBmcmFnbWVudGVkIGlmIHRoZXkgZXhjZWVkIHRoaXMgdGhyZXNob2xkLlxuICAgICAgICAvLyBEZWZhdWx0IGlzIDE2S2lCXG4gICAgICAgIGZyYWdtZW50YXRpb25UaHJlc2hvbGQ6IDB4NDAwMCxcblxuICAgICAgICAvLyBXaGljaCB2ZXJzaW9uIG9mIHRoZSBwcm90b2NvbCB0byB1c2UgZm9yIHRoaXMgc2Vzc2lvbi4gIFRoaXNcbiAgICAgICAgLy8gb3B0aW9uIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSBwcm90b2NvbCBpcyBmaW5hbGl6ZWQgYnkgdGhlIElFVEZcbiAgICAgICAgLy8gSXQgaXMgb25seSBhdmFpbGFibGUgdG8gZWFzZSB0aGUgdHJhbnNpdGlvbiB0aHJvdWdoIHRoZVxuICAgICAgICAvLyBpbnRlcm1lZGlhdGUgZHJhZnQgcHJvdG9jb2wgdmVyc2lvbnMuXG4gICAgICAgIC8vIEF0IHByZXNlbnQsIGl0IG9ubHkgYWZmZWN0cyB0aGUgbmFtZSBvZiB0aGUgT3JpZ2luIGhlYWRlci5cbiAgICAgICAgd2ViU29ja2V0VmVyc2lvbjogMTMsXG5cbiAgICAgICAgLy8gSWYgdHJ1ZSwgZnJhZ21lbnRlZCBtZXNzYWdlcyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYXNzZW1ibGVkXG4gICAgICAgIC8vIGFuZCB0aGUgZnVsbCBtZXNzYWdlIHdpbGwgYmUgZW1pdHRlZCB2aWEgYSAnbWVzc2FnZScgZXZlbnQuXG4gICAgICAgIC8vIElmIGZhbHNlLCBlYWNoIGZyYW1lIHdpbGwgYmUgZW1pdHRlZCB2aWEgYSAnZnJhbWUnIGV2ZW50IGFuZFxuICAgICAgICAvLyB0aGUgYXBwbGljYXRpb24gd2lsbCBiZSByZXNwb25zaWJsZSBmb3IgYWdncmVnYXRpbmcgbXVsdGlwbGVcbiAgICAgICAgLy8gZnJhZ21lbnRlZCBmcmFtZXMuICBTaW5nbGUtZnJhbWUgbWVzc2FnZXMgd2lsbCBlbWl0IGEgJ21lc3NhZ2UnXG4gICAgICAgIC8vIGV2ZW50IGluIGFkZGl0aW9uIHRvIHRoZSAnZnJhbWUnIGV2ZW50LlxuICAgICAgICAvLyBNb3N0IHVzZXJzIHdpbGwgd2FudCB0byBsZWF2ZSB0aGlzIHNldCB0byAndHJ1ZSdcbiAgICAgICAgYXNzZW1ibGVGcmFnbWVudHM6IHRydWUsXG5cbiAgICAgICAgLy8gVGhlIE5hZ2xlIEFsZ29yaXRobSBtYWtlcyBtb3JlIGVmZmljaWVudCB1c2Ugb2YgbmV0d29yayByZXNvdXJjZXNcbiAgICAgICAgLy8gYnkgaW50cm9kdWNpbmcgYSBzbWFsbCBkZWxheSBiZWZvcmUgc2VuZGluZyBzbWFsbCBwYWNrZXRzIHNvIHRoYXRcbiAgICAgICAgLy8gbXVsdGlwbGUgbWVzc2FnZXMgY2FuIGJlIGJhdGNoZWQgdG9nZXRoZXIgYmVmb3JlIGdvaW5nIG9udG8gdGhlXG4gICAgICAgIC8vIHdpcmUuICBUaGlzIGhvd2V2ZXIgY29tZXMgYXQgdGhlIGNvc3Qgb2YgbGF0ZW5jeSwgc28gdGhlIGRlZmF1bHRcbiAgICAgICAgLy8gaXMgdG8gZGlzYWJsZSBpdC4gIElmIHlvdSBkb24ndCBuZWVkIGxvdyBsYXRlbmN5IGFuZCBhcmUgc3RyZWFtaW5nXG4gICAgICAgIC8vIGxvdHMgb2Ygc21hbGwgbWVzc2FnZXMsIHlvdSBjYW4gY2hhbmdlIHRoaXMgdG8gJ2ZhbHNlJ1xuICAgICAgICBkaXNhYmxlTmFnbGVBbGdvcml0aG06IHRydWUsXG5cbiAgICAgICAgLy8gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBhZnRlciBzZW5kaW5nIGEgY2xvc2UgZnJhbWVcbiAgICAgICAgLy8gZm9yIGFuIGFja25vd2xlZGdlbWVudCB0byBjb21lIGJhY2sgYmVmb3JlIGdpdmluZyB1cCBhbmQganVzdFxuICAgICAgICAvLyBjbG9zaW5nIHRoZSBzb2NrZXQuXG4gICAgICAgIGNsb3NlVGltZW91dDogNTAwMCxcblxuICAgICAgICAvLyBPcHRpb25zIHRvIHBhc3MgdG8gaHR0cHMuY29ubmVjdCBpZiBjb25uZWN0aW5nIHZpYSBUTFNcbiAgICAgICAgdGxzT3B0aW9uczoge31cbiAgICB9O1xuXG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgICB2YXIgdGxzT3B0aW9ucztcbiAgICAgICAgaWYgKGNvbmZpZy50bHNPcHRpb25zKSB7XG4gICAgICAgICAgdGxzT3B0aW9ucyA9IGNvbmZpZy50bHNPcHRpb25zO1xuICAgICAgICAgIGRlbGV0ZSBjb25maWcudGxzT3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0bHNPcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgICAgICBleHRlbmQodGhpcy5jb25maWcudGxzT3B0aW9ucywgdGxzT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVxID0gbnVsbDtcbiAgICBcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLndlYlNvY2tldFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3RlZCB3ZWJTb2NrZXRWZXJzaW9uIGlzIG5vdCBzdXBwb3J0ZWQuIEFsbG93ZWQgdmFsdWVzIGFyZSA4IGFuZCAxMy4nKTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoV2ViU29ja2V0Q2xpZW50LCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRDbGllbnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbihyZXF1ZXN0VXJsLCBwcm90b2NvbHMsIG9yaWdpbiwgaGVhZGVycywgZXh0cmFSZXF1ZXN0T3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICBpZiAodHlwZW9mKHByb3RvY29scykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChwcm90b2NvbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm90b2NvbHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIShwcm90b2NvbHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgcHJvdG9jb2xzID0gW107XG4gICAgfVxuICAgIHRoaXMucHJvdG9jb2xzID0gcHJvdG9jb2xzO1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuXG4gICAgaWYgKHR5cGVvZihyZXF1ZXN0VXJsKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnVybCA9IHJlcXVlc3RVcmw7IC8vIGluIGNhc2UgYW4gYWxyZWFkeSBwYXJzZWQgdXJsIGlzIHBhc3NlZCBpbi5cbiAgICB9XG4gICAgaWYgKCF0aGlzLnVybC5wcm90b2NvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYSBmdWxsIFdlYlNvY2tldCBVUkwsIGluY2x1ZGluZyBwcm90b2NvbC4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnVybC5ob3N0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhIGZ1bGwgV2ViU29ja2V0IFVSTCwgaW5jbHVkaW5nIGhvc3RuYW1lLiBSZWxhdGl2ZSBVUkxzIGFyZSBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cblxuICAgIHRoaXMuc2VjdXJlID0gKHRoaXMudXJsLnByb3RvY29sID09PSAnd3NzOicpO1xuXG4gICAgLy8gdmFsaWRhdGUgcHJvdG9jb2wgY2hhcmFjdGVyczpcbiAgICB0aGlzLnByb3RvY29scy5mb3JFYWNoKGZ1bmN0aW9uKHByb3RvY29sKSB7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IHByb3RvY29sLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgdmFyIGNoYXJDb2RlID0gcHJvdG9jb2wuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBwcm90b2NvbC5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAweDAwMjEgfHwgY2hhckNvZGUgPiAweDAwN0UgfHwgcHJvdG9jb2xTZXBhcmF0b3JzLmluZGV4T2YoY2hhcmFjdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3RvY29sIGxpc3QgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXIgXCInICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSkgKyAnXCInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlZmF1bHRQb3J0cyA9IHtcbiAgICAgICAgJ3dzOic6ICc4MCcsXG4gICAgICAgICd3c3M6JzogJzQ0MydcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLnVybC5wb3J0KSB7XG4gICAgICAgIHRoaXMudXJsLnBvcnQgPSBkZWZhdWx0UG9ydHNbdGhpcy51cmwucHJvdG9jb2xdO1xuICAgIH1cblxuICAgIHZhciBub25jZSA9IGJ1ZmZlckFsbG9jVW5zYWZlKDE2KTtcbiAgICBmb3IgKHZhciBpPTA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIG5vbmNlW2ldID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjB4RkYpO1xuICAgIH1cbiAgICB0aGlzLmJhc2U2NG5vbmNlID0gbm9uY2UudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXG4gICAgdmFyIGhvc3RIZWFkZXJWYWx1ZSA9IHRoaXMudXJsLmhvc3RuYW1lO1xuICAgIGlmICgodGhpcy51cmwucHJvdG9jb2wgPT09ICd3czonICYmIHRoaXMudXJsLnBvcnQgIT09ICc4MCcpIHx8XG4gICAgICAgICh0aGlzLnVybC5wcm90b2NvbCA9PT0gJ3dzczonICYmIHRoaXMudXJsLnBvcnQgIT09ICc0NDMnKSkgIHtcbiAgICAgICAgaG9zdEhlYWRlclZhbHVlICs9ICgnOicgKyB0aGlzLnVybC5wb3J0KTtcbiAgICB9XG5cbiAgICB2YXIgcmVxSGVhZGVycyA9IHt9O1xuICAgIGlmICh0aGlzLnNlY3VyZSAmJiB0aGlzLmNvbmZpZy50bHNPcHRpb25zLmhhc093blByb3BlcnR5KCdoZWFkZXJzJykpIHtcbiAgICAgIC8vIEFsbG93IGZvciBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gYmUgcHJvdmlkZWQgd2hlbiBjb25uZWN0aW5nIHZpYSBIVFRQU1xuICAgICAgZXh0ZW5kKHJlcUhlYWRlcnMsIHRoaXMuY29uZmlnLnRsc09wdGlvbnMuaGVhZGVycyk7XG4gICAgfVxuICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAvLyBFeHBsaWNpdGx5IHByb3ZpZGVkIGhlYWRlcnMgdGFrZSBwcmlvcml0eSBvdmVyIGFueSBmcm9tIHRsc09wdGlvbnNcbiAgICAgIGV4dGVuZChyZXFIZWFkZXJzLCBoZWFkZXJzKTtcbiAgICB9XG4gICAgZXh0ZW5kKHJlcUhlYWRlcnMsIHtcbiAgICAgICAgJ1VwZ3JhZGUnOiAnd2Vic29ja2V0JyxcbiAgICAgICAgJ0Nvbm5lY3Rpb24nOiAnVXBncmFkZScsXG4gICAgICAgICdTZWMtV2ViU29ja2V0LVZlcnNpb24nOiB0aGlzLmNvbmZpZy53ZWJTb2NrZXRWZXJzaW9uLnRvU3RyaW5nKDEwKSxcbiAgICAgICAgJ1NlYy1XZWJTb2NrZXQtS2V5JzogdGhpcy5iYXNlNjRub25jZSxcbiAgICAgICAgJ0hvc3QnOiByZXFIZWFkZXJzLkhvc3QgfHwgaG9zdEhlYWRlclZhbHVlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm90b2NvbHMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXFIZWFkZXJzWydTZWMtV2ViU29ja2V0LVByb3RvY29sJ10gPSB0aGlzLnByb3RvY29scy5qb2luKCcsICcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcmlnaW4pIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLndlYlNvY2tldFZlcnNpb24gPT09IDEzKSB7XG4gICAgICAgICAgICByZXFIZWFkZXJzWydPcmlnaW4nXSA9IHRoaXMub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLndlYlNvY2tldFZlcnNpb24gPT09IDgpIHtcbiAgICAgICAgICAgIHJlcUhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtT3JpZ2luJ10gPSB0aGlzLm9yaWdpbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IEltcGxlbWVudCBleHRlbnNpb25zXG5cbiAgICB2YXIgcGF0aEFuZFF1ZXJ5O1xuICAgIC8vIEVuc3VyZSBpdCBiZWdpbnMgd2l0aCAnLycuXG4gICAgaWYgKHRoaXMudXJsLnBhdGhuYW1lKSB7XG4gICAgICAgIHBhdGhBbmRRdWVyeSA9IHRoaXMudXJsLnBhdGg7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMudXJsLnBhdGgpIHtcbiAgICAgICAgcGF0aEFuZFF1ZXJ5ID0gJy8nICsgdGhpcy51cmwucGF0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBhdGhBbmRRdWVyeSA9ICcvJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpIHtcbiAgICAgICAgc2VsZi5fcmVxID0gbnVsbDtcbiAgICAgICAgc2VsZi5lbWl0KCdjb25uZWN0RmFpbGVkJywgZXJyb3IpO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgYWdlbnQ6IGZhbHNlXG4gICAgfTtcbiAgICBpZiAoZXh0cmFSZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBleHRlbmQocmVxdWVzdE9wdGlvbnMsIGV4dHJhUmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBUaGVzZSBvcHRpb25zIGFyZSBhbHdheXMgb3ZlcnJpZGRlbiBieSB0aGUgbGlicmFyeS4gIFRoZSB1c2VyIGlzIG5vdFxuICAgIC8vIGFsbG93ZWQgdG8gc3BlY2lmeSB0aGVzZSBkaXJlY3RseS5cbiAgICBleHRlbmQocmVxdWVzdE9wdGlvbnMsIHtcbiAgICAgICAgaG9zdG5hbWU6IHRoaXMudXJsLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB0aGlzLnVybC5wb3J0LFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBwYXRoOiBwYXRoQW5kUXVlcnksXG4gICAgICAgIGhlYWRlcnM6IHJlcUhlYWRlcnNcbiAgICB9KTtcbiAgICBpZiAodGhpcy5zZWN1cmUpIHtcbiAgICAgICAgdmFyIHRsc09wdGlvbnMgPSB0aGlzLmNvbmZpZy50bHNPcHRpb25zO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGxzT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRsc09wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBleGNsdWRlZFRsc09wdGlvbnMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zW2tleV0gPSB0bHNPcHRpb25zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVxID0gdGhpcy5fcmVxID0gKHRoaXMuc2VjdXJlID8gaHR0cHMgOiBodHRwKS5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKTtcbiAgICByZXEub24oJ3VwZ3JhZGUnLCBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0VXBncmFkZShyZXNwb25zZSwgc29ja2V0LCBoZWFkKSB7XG4gICAgICAgIHNlbGYuX3JlcSA9IG51bGw7XG4gICAgICAgIHJlcS5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBoYW5kbGVSZXF1ZXN0RXJyb3IpO1xuICAgICAgICBzZWxmLnNvY2tldCA9IHNvY2tldDtcbiAgICAgICAgc2VsZi5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICBzZWxmLmZpcnN0RGF0YUNodW5rID0gaGVhZDtcbiAgICAgICAgc2VsZi52YWxpZGF0ZUhhbmRzaGFrZSgpO1xuICAgIH0pO1xuICAgIHJlcS5vbignZXJyb3InLCBoYW5kbGVSZXF1ZXN0RXJyb3IpO1xuXG4gICAgcmVxLm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHNlbGYuX3JlcSA9IG51bGw7XG4gICAgICAgIGlmICh1dGlscy5ldmVudEVtaXR0ZXJMaXN0ZW5lckNvdW50KHNlbGYsICdodHRwUmVzcG9uc2UnKSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnaHR0cFJlc3BvbnNlJywgcmVzcG9uc2UsIHNlbGYpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnNvY2tldCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvY2tldC5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBoZWFkZXJEdW1wUGFydHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGhlYWRlck5hbWUgaW4gcmVzcG9uc2UuaGVhZGVycykge1xuICAgICAgICAgICAgICAgIGhlYWRlckR1bXBQYXJ0cy5wdXNoKGhlYWRlck5hbWUgKyAnOiAnICsgcmVzcG9uc2UuaGVhZGVyc1toZWFkZXJOYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmZhaWxIYW5kc2hha2UoXG4gICAgICAgICAgICAgICAgJ1NlcnZlciByZXNwb25kZWQgd2l0aCBhIG5vbi0xMDEgc3RhdHVzOiAnICtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlICsgJyAnICsgcmVzcG9uc2Uuc3RhdHVzTWVzc2FnZSArXG4gICAgICAgICAgICAgICAgJ1xcblJlc3BvbnNlIEhlYWRlcnMgRm9sbG93OlxcbicgK1xuICAgICAgICAgICAgICAgIGhlYWRlckR1bXBQYXJ0cy5qb2luKCdcXG4nKSArICdcXG4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmVxLmVuZCgpO1xufTtcblxuV2ViU29ja2V0Q2xpZW50LnByb3RvdHlwZS52YWxpZGF0ZUhhbmRzaGFrZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5yZXNwb25zZS5oZWFkZXJzO1xuXG4gICAgaWYgKHRoaXMucHJvdG9jb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IGhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcbiAgICAgICAgaWYgKHRoaXMucHJvdG9jb2wpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3RvY29scy5pbmRleE9mKHRoaXMucHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFpbEhhbmRzaGFrZSgnU2VydmVyIGRpZCBub3QgcmVzcG9uZCB3aXRoIGEgcmVxdWVzdGVkIHByb3RvY29sLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFpbEhhbmRzaGFrZSgnRXhwZWN0ZWQgYSBTZWMtV2ViU29ja2V0LVByb3RvY29sIGhlYWRlci4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKGhlYWRlcnNbJ2Nvbm5lY3Rpb24nXSAmJiBoZWFkZXJzWydjb25uZWN0aW9uJ10udG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ3VwZ3JhZGUnKSkge1xuICAgICAgICB0aGlzLmZhaWxIYW5kc2hha2UoJ0V4cGVjdGVkIGEgQ29ubmVjdGlvbjogVXBncmFkZSBoZWFkZXIgZnJvbSB0aGUgc2VydmVyJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIShoZWFkZXJzWyd1cGdyYWRlJ10gJiYgaGVhZGVyc1sndXBncmFkZSddLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICd3ZWJzb2NrZXQnKSkge1xuICAgICAgICB0aGlzLmZhaWxIYW5kc2hha2UoJ0V4cGVjdGVkIGFuIFVwZ3JhZGU6IHdlYnNvY2tldCBoZWFkZXIgZnJvbSB0aGUgc2VydmVyJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2hhMSA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGExJyk7XG4gICAgc2hhMS51cGRhdGUodGhpcy5iYXNlNjRub25jZSArICcyNThFQUZBNS1FOTE0LTQ3REEtOTVDQS1DNUFCMERDODVCMTEnKTtcbiAgICB2YXIgZXhwZWN0ZWRLZXkgPSBzaGExLmRpZ2VzdCgnYmFzZTY0Jyk7XG5cbiAgICBpZiAoIWhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtYWNjZXB0J10pIHtcbiAgICAgICAgdGhpcy5mYWlsSGFuZHNoYWtlKCdFeHBlY3RlZCBTZWMtV2ViU29ja2V0LUFjY2VwdCBoZWFkZXIgZnJvbSBzZXJ2ZXInKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChoZWFkZXJzWydzZWMtd2Vic29ja2V0LWFjY2VwdCddICE9PSBleHBlY3RlZEtleSkge1xuICAgICAgICB0aGlzLmZhaWxIYW5kc2hha2UoJ1NlYy1XZWJTb2NrZXQtQWNjZXB0IGhlYWRlciBmcm9tIHNlcnZlciBkaWRuXFwndCBtYXRjaCBleHBlY3RlZCB2YWx1ZSBvZiAnICsgZXhwZWN0ZWRLZXkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBleHRlbnNpb25zXG5cbiAgICB0aGlzLnN1Y2NlZWRIYW5kc2hha2UoKTtcbn07XG5cbldlYlNvY2tldENsaWVudC5wcm90b3R5cGUuZmFpbEhhbmRzaGFrZSA9IGZ1bmN0aW9uKGVycm9yRGVzY3JpcHRpb24pIHtcbiAgICBpZiAodGhpcy5zb2NrZXQgJiYgdGhpcy5zb2NrZXQud3JpdGFibGUpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kKCk7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgnY29ubmVjdEZhaWxlZCcsIG5ldyBFcnJvcihlcnJvckRlc2NyaXB0aW9uKSk7XG59O1xuXG5XZWJTb2NrZXRDbGllbnQucHJvdG90eXBlLnN1Y2NlZWRIYW5kc2hha2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXRDb25uZWN0aW9uKHRoaXMuc29ja2V0LCBbXSwgdGhpcy5wcm90b2NvbCwgdHJ1ZSwgdGhpcy5jb25maWcpO1xuXG4gICAgY29ubmVjdGlvbi53ZWJTb2NrZXRWZXJzaW9uID0gdGhpcy5jb25maWcud2ViU29ja2V0VmVyc2lvbjtcbiAgICBjb25uZWN0aW9uLl9hZGRTb2NrZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5lbWl0KCdjb25uZWN0JywgY29ubmVjdGlvbik7XG4gICAgaWYgKHRoaXMuZmlyc3REYXRhQ2h1bmsubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25uZWN0aW9uLmhhbmRsZVNvY2tldERhdGEodGhpcy5maXJzdERhdGFDaHVuayk7XG4gICAgfVxuICAgIHRoaXMuZmlyc3REYXRhQ2h1bmsgPSBudWxsO1xufTtcblxuV2ViU29ja2V0Q2xpZW50LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9yZXEpIHtcbiAgICAgICAgdGhpcy5fcmVxLmFib3J0KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRDbGllbnQ7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBXZWJTb2NrZXRGcmFtZSA9IHJlcXVpcmUoJy4vV2ViU29ja2V0RnJhbWUnKTtcbnZhciBCdWZmZXJMaXN0ID0gcmVxdWlyZSgnLi4vdmVuZG9yL0Zhc3RCdWZmZXJMaXN0Jyk7XG52YXIgVmFsaWRhdGlvbiA9IHJlcXVpcmUoJy4vVmFsaWRhdGlvbicpLlZhbGlkYXRpb247XG52YXIgYnVmZmVyQWxsb2NVbnNhZmUgPSB1dGlscy5idWZmZXJBbGxvY1Vuc2FmZTtcbnZhciBidWZmZXJGcm9tU3RyaW5nID0gdXRpbHMuYnVmZmVyRnJvbVN0cmluZztcblxuLy8gQ29ubmVjdGVkLCBmdWxseS1vcGVuLCByZWFkeSB0byBzZW5kIGFuZCByZWNlaXZlIGZyYW1lc1xuY29uc3QgU1RBVEVfT1BFTiA9ICdvcGVuJztcbi8vIFJlY2VpdmVkIGEgY2xvc2UgZnJhbWUgZnJvbSB0aGUgcmVtb3RlIHBlZXJcbmNvbnN0IFNUQVRFX1BFRVJfUkVRVUVTVEVEX0NMT1NFID0gJ3BlZXJfcmVxdWVzdGVkX2Nsb3NlJztcbi8vIFNlbnQgY2xvc2UgZnJhbWUgdG8gcmVtb3RlIHBlZXIuICBObyBmdXJ0aGVyIGRhdGEgY2FuIGJlIHNlbnQuXG5jb25zdCBTVEFURV9FTkRJTkcgPSAnZW5kaW5nJztcbi8vIENvbm5lY3Rpb24gaXMgZnVsbHkgY2xvc2VkLiAgTm8gZnVydGhlciBkYXRhIGNhbiBiZSBzZW50IG9yIHJlY2VpdmVkLlxuY29uc3QgU1RBVEVfQ0xPU0VEID0gJ2Nsb3NlZCc7XG5cbnZhciBzZXRJbW1lZGlhdGVJbXBsID0gKCdzZXRJbW1lZGlhdGUnIGluIGdsb2JhbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5zZXRJbW1lZGlhdGUuYmluZChnbG9iYWwpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrLmJpbmQocHJvY2Vzcyk7XG5cbnZhciBpZENvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBXZWJTb2NrZXRDb25uZWN0aW9uKHNvY2tldCwgZXh0ZW5zaW9ucywgcHJvdG9jb2wsIG1hc2tPdXRnb2luZ1BhY2tldHMsIGNvbmZpZykge1xuICAgIHRoaXMuX2RlYnVnID0gdXRpbHMuQnVmZmVyaW5nTG9nZ2VyKCd3ZWJzb2NrZXQ6Y29ubmVjdGlvbicsICsraWRDb3VudGVyKTtcbiAgICB0aGlzLl9kZWJ1ZygnY29uc3RydWN0b3InKTtcbiAgICBcbiAgICBpZiAodGhpcy5fZGVidWcuZW5hYmxlZCkge1xuICAgICAgICBpbnN0cnVtZW50U29ja2V0Rm9yRGVidWdnaW5nKHRoaXMsIHNvY2tldCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFN1cGVyY2xhc3MgQ29uc3RydWN0b3JcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuX3BpbmdMaXN0ZW5lckNvdW50ID0gMDtcbiAgICB0aGlzLm9uKCduZXdMaXN0ZW5lcicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChldiA9PT0gJ3BpbmcnKXtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdMaXN0ZW5lckNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKCdyZW1vdmVMaXN0ZW5lcicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChldiA9PT0gJ3BpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9waW5nTGlzdGVuZXJDb3VudC0tO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgdGhpcy5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICB0aGlzLnJlbW90ZUFkZHJlc3MgPSBzb2NrZXQucmVtb3RlQWRkcmVzcztcbiAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IC0xO1xuICAgIHRoaXMuY2xvc2VEZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5jbG9zZUV2ZW50RW1pdHRlZCA9IGZhbHNlO1xuXG4gICAgLy8gV2UgaGF2ZSB0byBtYXNrIG91dGdvaW5nIHBhY2tldHMgaWYgd2UncmUgYWN0aW5nIGFzIGEgV2ViU29ja2V0IGNsaWVudC5cbiAgICB0aGlzLm1hc2tPdXRnb2luZ1BhY2tldHMgPSBtYXNrT3V0Z29pbmdQYWNrZXRzO1xuXG4gICAgLy8gV2UgcmUtdXNlIHRoZSBzYW1lIGJ1ZmZlcnMgZm9yIHRoZSBtYXNrIGFuZCBmcmFtZSBoZWFkZXIgZm9yIGFsbCBmcmFtZXNcbiAgICAvLyByZWNlaXZlZCBvbiBlYWNoIGNvbm5lY3Rpb24gdG8gYXZvaWQgYSBzbWFsbCBtZW1vcnkgYWxsb2NhdGlvbiBmb3IgZWFjaFxuICAgIC8vIGZyYW1lLlxuICAgIHRoaXMubWFza0J5dGVzID0gYnVmZmVyQWxsb2NVbnNhZmUoNCk7XG4gICAgdGhpcy5mcmFtZUhlYWRlciA9IGJ1ZmZlckFsbG9jVW5zYWZlKDEwKTtcblxuICAgIC8vIHRoZSBCdWZmZXJMaXN0IHdpbGwgaGFuZGxlIHRoZSBkYXRhIHN0cmVhbWluZyBpblxuICAgIHRoaXMuYnVmZmVyTGlzdCA9IG5ldyBCdWZmZXJMaXN0KCk7XG5cbiAgICAvLyBQcmVwYXJlIGZvciByZWNlaXZpbmcgZmlyc3QgZnJhbWVcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuICAgIHRoaXMuZnJhZ21lbnRhdGlvblNpemUgPSAwOyAvLyBkYXRhIHJlY2VpdmVkIHNvIGZhci4uLlxuICAgIHRoaXMuZnJhbWVRdWV1ZSA9IFtdO1xuICAgIFxuICAgIC8vIFZhcmlvdXMgYml0cyBvZiBjb25uZWN0aW9uIHN0YXRlXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9PUEVOO1xuICAgIHRoaXMud2FpdGluZ0ZvckNsb3NlUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAvLyBSZWNlaXZlZCBUQ1AgRklOLCBzb2NrZXQncyByZWFkYWJsZSBzdHJlYW0gaXMgZmluaXNoZWQuXG4gICAgdGhpcy5yZWNlaXZlZEVuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jbG9zZVRpbWVvdXQgPSB0aGlzLmNvbmZpZy5jbG9zZVRpbWVvdXQ7XG4gICAgdGhpcy5hc3NlbWJsZUZyYWdtZW50cyA9IHRoaXMuY29uZmlnLmFzc2VtYmxlRnJhZ21lbnRzO1xuICAgIHRoaXMubWF4UmVjZWl2ZWRNZXNzYWdlU2l6ZSA9IHRoaXMuY29uZmlnLm1heFJlY2VpdmVkTWVzc2FnZVNpemU7XG5cbiAgICB0aGlzLm91dHB1dEJ1ZmZlckZ1bGwgPSBmYWxzZTtcbiAgICB0aGlzLmlucHV0UGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5yZWNlaXZlZERhdGFIYW5kbGVyID0gdGhpcy5wcm9jZXNzUmVjZWl2ZWREYXRhLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fY2xvc2VUaW1lckhhbmRsZXIgPSB0aGlzLmhhbmRsZUNsb3NlVGltZXIuYmluZCh0aGlzKTtcblxuICAgIC8vIERpc2FibGUgbmFnbGUgYWxnb3JpdGhtP1xuICAgIHRoaXMuc29ja2V0LnNldE5vRGVsYXkodGhpcy5jb25maWcuZGlzYWJsZU5hZ2xlQWxnb3JpdGhtKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBpcyBubyBzb2NrZXQgaW5hY3Rpdml0eSB0aW1lb3V0XG4gICAgdGhpcy5zb2NrZXQuc2V0VGltZW91dCgwKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5rZWVwYWxpdmUgJiYgIXRoaXMuY29uZmlnLnVzZU5hdGl2ZUtlZXBhbGl2ZSkge1xuICAgICAgICBpZiAodHlwZW9mKHRoaXMuY29uZmlnLmtlZXBhbGl2ZUludGVydmFsKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2VlcGFsaXZlSW50ZXJ2YWwgbXVzdCBiZSBzcGVjaWZpZWQgYW5kIG51bWVyaWMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmIGtlZXBhbGl2ZSBpcyB0cnVlLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tlZXBhbGl2ZVRpbWVySGFuZGxlciA9IHRoaXMuaGFuZGxlS2VlcGFsaXZlVGltZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXRLZWVwYWxpdmVUaW1lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5kcm9wQ29ubmVjdGlvbk9uS2VlcGFsaXZlVGltZW91dCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLmNvbmZpZy5rZWVwYWxpdmVHcmFjZVBlcmlvZCkgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZWVwYWxpdmVHcmFjZVBlcmlvZCAgbXVzdCBiZSBzcGVjaWZpZWQgYW5kICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbnVtZXJpYyBpZiBkcm9wQ29ubmVjdGlvbk9uS2VlcGFsaXZlVGltZW91dCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lzIHRydWUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ncmFjZVBlcmlvZFRpbWVySGFuZGxlciA9IHRoaXMuaGFuZGxlR3JhY2VQZXJpb2RUaW1lci5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLmtlZXBhbGl2ZSAmJiB0aGlzLmNvbmZpZy51c2VOYXRpdmVLZWVwYWxpdmUpIHtcbiAgICAgICAgaWYgKCEoJ3NldEtlZXBBbGl2ZScgaW4gdGhpcy5zb2NrZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byB1c2UgbmF0aXZlIGtlZXBhbGl2ZTogdW5zdXBwb3J0ZWQgYnkgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoaXMgdmVyc2lvbiBvZiBOb2RlLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0LnNldEtlZXBBbGl2ZSh0cnVlLCB0aGlzLmNvbmZpZy5rZWVwYWxpdmVJbnRlcnZhbCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFRoZSBIVFRQIENsaWVudCBzZWVtcyB0byBzdWJzY3JpYmUgdG8gc29ja2V0IGVycm9yIGV2ZW50c1xuICAgIC8vIGFuZCByZS1kaXNwYXRjaCB0aGVtIGluIHN1Y2ggYSB3YXkgdGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyBmb3IgdXNlcnMgb2Ygb3VyIGNsaWVudCwgc28gd2Ugd2FudCB0byBtYWtlIHN1cmUgbm9ib2R5XG4gICAgLy8gZWxzZSBpcyBsaXN0ZW5pbmcgZm9yIGVycm9yIGV2ZW50cyBvbiB0aGUgc29ja2V0IGJlc2lkZXMgdXMuXG4gICAgdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCdlcnJvcicpO1xufVxuXG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9OT1JNQUwgPSAxMDAwO1xuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fR09JTkdfQVdBWSA9IDEwMDE7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUiA9IDEwMDI7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9VTlBST0NFU1NBQkxFX0lOUFVUID0gMTAwMztcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1JFU0VSVkVEID0gMTAwNDsgLy8gUmVzZXJ2ZWQgdmFsdWUuICBVbmRlZmluZWQgbWVhbmluZy5cbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX05PVF9QUk9WSURFRCA9IDEwMDU7IC8vIE5vdCB0byBiZSB1c2VkIG9uIHRoZSB3aXJlXG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9BQk5PUk1BTCA9IDEwMDY7IC8vIE5vdCB0byBiZSB1c2VkIG9uIHRoZSB3aXJlXG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9JTlZBTElEX0RBVEEgPSAxMDA3O1xuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUE9MSUNZX1ZJT0xBVElPTiA9IDEwMDg7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9NRVNTQUdFX1RPT19CSUcgPSAxMDA5O1xuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fRVhURU5TSU9OX1JFUVVJUkVEID0gMTAxMDtcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0lOVEVSTkFMX1NFUlZFUl9FUlJPUiA9IDEwMTE7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9UTFNfSEFORFNIQUtFX0ZBSUxFRCA9IDEwMTU7IC8vIE5vdCB0byBiZSB1c2VkIG9uIHRoZSB3aXJlXG5cbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfREVTQ1JJUFRJT05TID0ge1xuICAgIDEwMDA6ICdOb3JtYWwgY29ubmVjdGlvbiBjbG9zdXJlJyxcbiAgICAxMDAxOiAnUmVtb3RlIHBlZXIgaXMgZ29pbmcgYXdheScsXG4gICAgMTAwMjogJ1Byb3RvY29sIGVycm9yJyxcbiAgICAxMDAzOiAnVW5wcm9jZXNzYWJsZSBpbnB1dCcsXG4gICAgMTAwNDogJ1Jlc2VydmVkJyxcbiAgICAxMDA1OiAnUmVhc29uIG5vdCBwcm92aWRlZCcsXG4gICAgMTAwNjogJ0Fibm9ybWFsIGNsb3N1cmUsIG5vIGZ1cnRoZXIgZGV0YWlsIGF2YWlsYWJsZScsXG4gICAgMTAwNzogJ0ludmFsaWQgZGF0YSByZWNlaXZlZCcsXG4gICAgMTAwODogJ1BvbGljeSB2aW9sYXRpb24nLFxuICAgIDEwMDk6ICdNZXNzYWdlIHRvbyBiaWcnLFxuICAgIDEwMTA6ICdFeHRlbnNpb24gcmVxdWVzdGVkIGJ5IGNsaWVudCBpcyByZXF1aXJlZCcsXG4gICAgMTAxMTogJ0ludGVybmFsIFNlcnZlciBFcnJvcicsXG4gICAgMTAxNTogJ1RMUyBIYW5kc2hha2UgRmFpbGVkJ1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVDbG9zZVJlYXNvbihjb2RlKSB7XG4gICAgaWYgKGNvZGUgPCAxMDAwKSB7XG4gICAgICAgIC8vIFN0YXR1cyBjb2RlcyBpbiB0aGUgcmFuZ2UgMC05OTkgYXJlIG5vdCB1c2VkXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPj0gMTAwMCAmJiBjb2RlIDw9IDI5OTkpIHtcbiAgICAgICAgLy8gQ29kZXMgZnJvbSAxMDAwIC0gMjk5OSBhcmUgcmVzZXJ2ZWQgZm9yIHVzZSBieSB0aGUgcHJvdG9jb2wuICBPbmx5XG4gICAgICAgIC8vIGEgZmV3IGNvZGVzIGFyZSBkZWZpbmVkLCBhbGwgb3RoZXJzIGFyZSBjdXJyZW50bHkgaWxsZWdhbC5cbiAgICAgICAgcmV0dXJuIFsxMDAwLCAxMDAxLCAxMDAyLCAxMDAzLCAxMDA3LCAxMDA4LCAxMDA5LCAxMDEwLCAxMDExLCAxMDEyLCAxMDEzLCAxMDE0XS5pbmRleE9mKGNvZGUpICE9PSAtMTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPj0gMzAwMCAmJiBjb2RlIDw9IDM5OTkpIHtcbiAgICAgICAgLy8gUmVzZXJ2ZWQgZm9yIHVzZSBieSBsaWJyYXJpZXMsIGZyYW1ld29ya3MsIGFuZCBhcHBsaWNhdGlvbnMuXG4gICAgICAgIC8vIFNob3VsZCBiZSByZWdpc3RlcmVkIHdpdGggSUFOQS4gIEludGVycHJldGF0aW9uIG9mIHRoZXNlIGNvZGVzIGlzXG4gICAgICAgIC8vIHVuZGVmaW5lZCBieSB0aGUgV2ViU29ja2V0IHByb3RvY29sLlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPj0gNDAwMCAmJiBjb2RlIDw9IDQ5OTkpIHtcbiAgICAgICAgLy8gUmVzZXJ2ZWQgZm9yIHByaXZhdGUgdXNlLiAgSW50ZXJwcmV0YXRpb24gb2YgdGhlc2UgY29kZXMgaXNcbiAgICAgICAgLy8gdW5kZWZpbmVkIGJ5IHRoZSBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29kZSA+PSA1MDAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoV2ViU29ja2V0Q29ubmVjdGlvbiwgRXZlbnRFbWl0dGVyKTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuX2FkZFNvY2tldEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zb2NrZXQub24oJ2Vycm9yJywgdGhpcy5oYW5kbGVTb2NrZXRFcnJvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNvY2tldC5vbignZW5kJywgdGhpcy5oYW5kbGVTb2NrZXRFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zb2NrZXQub24oJ2Nsb3NlJywgdGhpcy5oYW5kbGVTb2NrZXRDbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNvY2tldC5vbignZHJhaW4nLCB0aGlzLmhhbmRsZVNvY2tldERyYWluLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdwYXVzZScsIHRoaXMuaGFuZGxlU29ja2V0UGF1c2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zb2NrZXQub24oJ3Jlc3VtZScsIHRoaXMuaGFuZGxlU29ja2V0UmVzdW1lLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdkYXRhJywgdGhpcy5oYW5kbGVTb2NrZXREYXRhLmJpbmQodGhpcykpO1xufTtcblxuLy8gc2V0IG9yIHJlc2V0IHRoZSBrZWVwYWxpdmUgdGltZXIgd2hlbiBkYXRhIGlzIHJlY2VpdmVkLlxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2V0S2VlcGFsaXZlVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1Zygnc2V0S2VlcGFsaXZlVGltZXInKTtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmtlZXBhbGl2ZSAgfHwgdGhpcy5jb25maWcudXNlTmF0aXZlS2VlcGFsaXZlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY2xlYXJLZWVwYWxpdmVUaW1lcigpO1xuICAgIHRoaXMuY2xlYXJHcmFjZVBlcmlvZFRpbWVyKCk7XG4gICAgdGhpcy5fa2VlcGFsaXZlVGltZW91dElEID0gc2V0VGltZW91dCh0aGlzLl9rZWVwYWxpdmVUaW1lckhhbmRsZXIsIHRoaXMuY29uZmlnLmtlZXBhbGl2ZUludGVydmFsKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFyS2VlcGFsaXZlVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fa2VlcGFsaXZlVGltZW91dElEKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9rZWVwYWxpdmVUaW1lb3V0SUQpO1xuICAgIH1cbn07XG5cbi8vIE5vIGRhdGEgaGFzIGJlZW4gcmVjZWl2ZWQgd2l0aGluIGNvbmZpZy5rZWVwYWxpdmVUaW1lb3V0IG1zLlxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlS2VlcGFsaXZlVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlS2VlcGFsaXZlVGltZXInKTtcbiAgICB0aGlzLl9rZWVwYWxpdmVUaW1lb3V0SUQgPSBudWxsO1xuICAgIHRoaXMucGluZygpO1xuXG4gICAgLy8gSWYgd2UgYXJlIGNvbmZpZ3VyZWQgdG8gZHJvcCBjb25uZWN0aW9ucyBpZiB0aGUgY2xpZW50IGRvZXNuJ3QgcmVzcG9uZFxuICAgIC8vIHRoZW4gc2V0IHRoZSBncmFjZSBwZXJpb2QgdGltZXIuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRyb3BDb25uZWN0aW9uT25LZWVwYWxpdmVUaW1lb3V0KSB7XG4gICAgICAgIHRoaXMuc2V0R3JhY2VQZXJpb2RUaW1lcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJlc2V0IHRoZSBrZWVwYWxpdmUgdGltZXIgdG8gc2VuZCB0aGUgbmV4dCBwaW5nLlxuICAgICAgICB0aGlzLnNldEtlZXBhbGl2ZVRpbWVyKCk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2V0R3JhY2VQZXJpb2RUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdzZXRHcmFjZVBlcmlvZFRpbWVyJyk7XG4gICAgdGhpcy5jbGVhckdyYWNlUGVyaW9kVGltZXIoKTtcbiAgICB0aGlzLl9ncmFjZVBlcmlvZFRpbWVvdXRJRCA9IHNldFRpbWVvdXQodGhpcy5fZ3JhY2VQZXJpb2RUaW1lckhhbmRsZXIsIHRoaXMuY29uZmlnLmtlZXBhbGl2ZUdyYWNlUGVyaW9kKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFyR3JhY2VQZXJpb2RUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9ncmFjZVBlcmlvZFRpbWVvdXRJRCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZ3JhY2VQZXJpb2RUaW1lb3V0SUQpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZUdyYWNlUGVyaW9kVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlR3JhY2VQZXJpb2RUaW1lcicpO1xuICAgIC8vIElmIHRoaXMgaXMgY2FsbGVkLCB0aGUgY2xpZW50IGhhcyBub3QgcmVzcG9uZGVkIGFuZCBpcyBhc3N1bWVkIGRlYWQuXG4gICAgdGhpcy5fZ3JhY2VQZXJpb2RUaW1lb3V0SUQgPSBudWxsO1xuICAgIHRoaXMuZHJvcChXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9BQk5PUk1BTCwgJ1BlZXIgbm90IHJlc3BvbmRpbmcuJywgdHJ1ZSk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5oYW5kbGVTb2NrZXREYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXREYXRhJyk7XG4gICAgLy8gUmVzZXQgdGhlIGtlZXBhbGl2ZSB0aW1lciB3aGVuIHJlY2VpdmluZyBkYXRhIG9mIGFueSBraW5kLlxuICAgIHRoaXMuc2V0S2VlcGFsaXZlVGltZXIoKTtcblxuICAgIC8vIEFkZCByZWNlaXZlZCBkYXRhIHRvIG91ciBidWZmZXJMaXN0LCB3aGljaCBlZmZpY2llbnRseSBob2xkcyByZWNlaXZlZFxuICAgIC8vIGRhdGEgY2h1bmtzIGluIGEgbGlua2VkIGxpc3Qgb2YgQnVmZmVyIG9iamVjdHMuXG4gICAgdGhpcy5idWZmZXJMaXN0LndyaXRlKGRhdGEpO1xuXG4gICAgdGhpcy5wcm9jZXNzUmVjZWl2ZWREYXRhKCk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5wcm9jZXNzUmVjZWl2ZWREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ3Byb2Nlc3NSZWNlaXZlZERhdGEnKTtcbiAgICAvLyBJZiB3ZSdyZSBub3QgY29ubmVjdGVkLCB3ZSBzaG91bGQgaWdub3JlIGFueSBkYXRhIHJlbWFpbmluZyBvbiB0aGUgYnVmZmVyLlxuICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBSZWNlaXZpbmcvcGFyc2luZyBpcyBleHBlY3RlZCB0byBiZSBoYWx0ZWQgd2hlbiBwYXVzZWQuXG4gICAgaWYgKHRoaXMuaW5wdXRQYXVzZWQpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgZnJhbWUgPSB0aGlzLmN1cnJlbnRGcmFtZTtcblxuICAgIC8vIFdlYlNvY2tldEZyYW1lLnByb3RvdHlwZS5hZGREYXRhIHJldHVybnMgdHJ1ZSBpZiBhbGwgZGF0YSBuZWNlc3NhcnkgdG9cbiAgICAvLyBwYXJzZSB0aGUgZnJhbWUgd2FzIGF2YWlsYWJsZS4gIEl0IHJldHVybnMgZmFsc2UgaWYgd2UgYXJlIHdhaXRpbmcgZm9yXG4gICAgLy8gbW9yZSBkYXRhIHRvIGNvbWUgaW4gb24gdGhlIHdpcmUuXG4gICAgaWYgKCFmcmFtZS5hZGREYXRhKHRoaXMuYnVmZmVyTGlzdCkpIHsgdGhpcy5fZGVidWcoJy0tIGluc3VmZmljaWVudCBkYXRhIGZvciBmcmFtZScpOyByZXR1cm47IH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIEhhbmRsZSBwb3NzaWJsZSBwYXJzaW5nIGVycm9yc1xuICAgIGlmIChmcmFtZS5wcm90b2NvbEVycm9yKSB7XG4gICAgICAgIC8vIFNvbWV0aGluZyBiYWQgaGFwcGVuZWQuLiBnZXQgcmlkIG9mIHRoaXMgY2xpZW50LlxuICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gcHJvdG9jb2wgZXJyb3InKTtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZHJvcChXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUiwgZnJhbWUuZHJvcFJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGZyYW1lLmZyYW1lVG9vTGFyZ2UpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJy0tIGZyYW1lIHRvbyBsYXJnZScpO1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX01FU1NBR0VfVE9PX0JJRywgZnJhbWUuZHJvcFJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRm9yIG5vdyBzaW5jZSB3ZSBkb24ndCBzdXBwb3J0IGV4dGVuc2lvbnMsIGFsbCBSU1YgYml0cyBhcmUgaWxsZWdhbFxuICAgIGlmIChmcmFtZS5yc3YxIHx8IGZyYW1lLnJzdjIgfHwgZnJhbWUucnN2Mykge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gaWxsZWdhbCByc3YgZmxhZycpO1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SLFxuICAgICAgICAgICAgICAnVW5zdXBwb3J0ZWQgdXNhZ2Ugb2YgcnN2IGJpdHMgd2l0aG91dCBuZWdvdGlhdGVkIGV4dGVuc2lvbi4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYXNzZW1ibGVGcmFnbWVudHMpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJy0tIGVtaXR0aW5nIGZyYW1lJyk7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7IHNlbGYuZW1pdCgnZnJhbWUnLCBmcmFtZSk7IH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7IHNlbGYucHJvY2Vzc0ZyYW1lKGZyYW1lKTsgfSk7XG4gICAgXG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcblxuICAgIC8vIElmIHRoZXJlJ3MgZGF0YSByZW1haW5pbmcsIHNjaGVkdWxlIGFkZGl0aW9uYWwgcHJvY2Vzc2luZywgYnV0IHlpZWxkXG4gICAgLy8gZm9yIG5vdyBzbyB0aGF0IG90aGVyIGNvbm5lY3Rpb25zIGhhdmUgYSBjaGFuY2UgdG8gaGF2ZSB0aGVpciBkYXRhXG4gICAgLy8gcHJvY2Vzc2VkLiAgV2UgdXNlIHNldEltbWVkaWF0ZSBoZXJlIGluc3RlYWQgb2YgcHJvY2Vzcy5uZXh0VGljayB0b1xuICAgIC8vIGV4cGxpY2l0bHkgaW5kaWNhdGUgdGhhdCB3ZSB3aXNoIGZvciBvdGhlciBJL08gdG8gYmUgaGFuZGxlZCBmaXJzdC5cbiAgICBpZiAodGhpcy5idWZmZXJMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlSW1wbCh0aGlzLnJlY2VpdmVkRGF0YUhhbmRsZXIpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldEVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlU29ja2V0RXJyb3I6ICVqJywgZXJyb3IpO1xuICAgIGlmICh0aGlzLnN0YXRlID09PSBTVEFURV9DTE9TRUQpIHtcblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZXR1cnRsZTMyL1dlYlNvY2tldC1Ob2RlL2lzc3Vlcy8yODhcbiAgICAgICAgdGhpcy5fZGVidWcoJyAgLS0tIFNvY2tldCBcXCdlcnJvclxcJyBhZnRlciBcXCdjbG9zZVxcJycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2xvc2VSZWFzb25Db2RlID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fQUJOT1JNQUw7XG4gICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gJ1NvY2tldCBFcnJvcjogJyArIGVycm9yLnN5c2NhbGwgKyAnICcgKyBlcnJvci5jb2RlO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0NMT1NFRDtcbiAgICB0aGlzLmZyYWdtZW50YXRpb25TaXplID0gMDtcbiAgICBpZiAodXRpbHMuZXZlbnRFbWl0dGVyTGlzdGVuZXJDb3VudCh0aGlzLCAnZXJyb3InKSA+IDApIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQuZGVzdHJveShlcnJvcik7XG4gICAgdGhpcy5fZGVidWcucHJpbnRPdXRwdXQoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXRFbmQ6IHJlY2VpdmVkIHNvY2tldCBlbmQuICBzdGF0ZSA9ICVzJywgdGhpcy5zdGF0ZSk7XG4gICAgdGhpcy5yZWNlaXZlZEVuZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX0NMT1NFRCkge1xuICAgICAgICAvLyBXaGVuIHVzaW5nIHRoZSBUTFMgbW9kdWxlLCBzb21ldGltZXMgdGhlIHNvY2tldCB3aWxsIGVtaXQgJ2VuZCdcbiAgICAgICAgLy8gYWZ0ZXIgaXQgZW1pdHMgJ2Nsb3NlJy4gIEkgZG9uJ3QgdGhpbmsgdGhhdCdzIGNvcnJlY3QgYmVoYXZpb3IsXG4gICAgICAgIC8vIGJ1dCB3ZSBzaG91bGQgZGVhbCB3aXRoIGl0IGdyYWNlZnVsbHkgYnkgaWdub3JpbmcgaXQuXG4gICAgICAgIHRoaXMuX2RlYnVnKCcgIC0tLSBTb2NrZXQgXFwnZW5kXFwnIGFmdGVyIFxcJ2Nsb3NlXFwnJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1BFRVJfUkVRVUVTVEVEX0NMT1NFICYmXG4gICAgICAgIHRoaXMuc3RhdGUgIT09IFNUQVRFX0VORElORykge1xuICAgICAgdGhpcy5fZGVidWcoJyAgLS0tIFVORVhQRUNURUQgc29ja2V0IGVuZC4nKTtcbiAgICAgIHRoaXMuc29ja2V0LmVuZCgpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldENsb3NlID0gZnVuY3Rpb24oaGFkRXJyb3IpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlU29ja2V0Q2xvc2U6IHJlY2VpdmVkIHNvY2tldCBjbG9zZScpO1xuICAgIHRoaXMuc29ja2V0SGFkRXJyb3IgPSBoYWRFcnJvcjtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9DTE9TRUQ7XG4gICAgLy8gSWYgY2xvc2VSZWFzb25Db2RlIGlzIHN0aWxsIHNldCB0byAtMSBhdCB0aGlzIHBvaW50IHRoZW4gd2UgbXVzdFxuICAgIC8vIG5vdCBoYXZlIHJlY2VpdmVkIGEgY2xvc2UgZnJhbWUhIVxuICAgIGlmICh0aGlzLmNsb3NlUmVhc29uQ29kZSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5jbG9zZVJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9BQk5PUk1BTDtcbiAgICAgICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gJ0Nvbm5lY3Rpb24gZHJvcHBlZCBieSByZW1vdGUgcGVlci4nO1xuICAgIH1cbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lcigpO1xuICAgIHRoaXMuY2xlYXJLZWVwYWxpdmVUaW1lcigpO1xuICAgIHRoaXMuY2xlYXJHcmFjZVBlcmlvZFRpbWVyKCk7XG4gICAgaWYgKCF0aGlzLmNsb3NlRXZlbnRFbWl0dGVkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VFdmVudEVtaXR0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gRW1pdHRpbmcgV2ViU29ja2V0Q29ubmVjdGlvbiBjbG9zZSBldmVudCcpO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgdGhpcy5jbG9zZVJlYXNvbkNvZGUsIHRoaXMuY2xvc2VEZXNjcmlwdGlvbik7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlU29ja2V0RHJhaW4gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlU29ja2V0RHJhaW46IHNvY2tldCBkcmFpbiBldmVudCcpO1xuICAgIHRoaXMub3V0cHV0QnVmZmVyRnVsbCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldFBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ2hhbmRsZVNvY2tldFBhdXNlOiBzb2NrZXQgcGF1c2UgZXZlbnQnKTtcbiAgICB0aGlzLmlucHV0UGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJyk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5oYW5kbGVTb2NrZXRSZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlU29ja2V0UmVzdW1lOiBzb2NrZXQgcmVzdW1lIGV2ZW50Jyk7XG4gICAgdGhpcy5pbnB1dFBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgncmVzdW1lJyk7XG4gICAgdGhpcy5wcm9jZXNzUmVjZWl2ZWREYXRhKCk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdwYXVzZTogcGF1c2UgcmVxdWVzdGVkJyk7XG4gICAgdGhpcy5zb2NrZXQucGF1c2UoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdyZXN1bWU6IHJlc3VtZSByZXF1ZXN0ZWQnKTtcbiAgICB0aGlzLnNvY2tldC5yZXN1bWUoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24ocmVhc29uQ29kZSwgZGVzY3JpcHRpb24pIHtcbiAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJ2Nsb3NlOiBJbml0YXRpbmcgY2xlYW4gV2ViU29ja2V0IGNsb3NlIHNlcXVlbmNlLicpO1xuICAgICAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiByZWFzb25Db2RlKSB7XG4gICAgICAgICAgICByZWFzb25Db2RlID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fTk9STUFMO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdGVDbG9zZVJlYXNvbihyZWFzb25Db2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbG9zZSBjb2RlICcgKyByZWFzb25Db2RlICsgJyBpcyBub3QgdmFsaWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9ERVNDUklQVElPTlNbcmVhc29uQ29kZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZVJlYXNvbkNvZGUgPSByZWFzb25Db2RlO1xuICAgICAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zZXRDbG9zZVRpbWVyKCk7XG4gICAgICAgIHRoaXMuc2VuZENsb3NlRnJhbWUodGhpcy5jbG9zZVJlYXNvbkNvZGUsIHRoaXMuY2xvc2VEZXNjcmlwdGlvbik7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9FTkRJTkc7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuZHJvcCA9IGZ1bmN0aW9uKHJlYXNvbkNvZGUsIGRlc2NyaXB0aW9uLCBza2lwQ2xvc2VGcmFtZSkge1xuICAgIHRoaXMuX2RlYnVnKCdkcm9wJyk7XG4gICAgaWYgKHR5cGVvZihyZWFzb25Db2RlKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmVhc29uQ29kZSA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YoZGVzY3JpcHRpb24pICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBJZiBubyBkZXNjcmlwdGlvbiBpcyBwcm92aWRlZCwgdHJ5IHRvIGxvb2sgb25lIHVwIGJhc2VkIG9uIHRoZVxuICAgICAgICAvLyBzcGVjaWZpZWQgcmVhc29uQ29kZS5cbiAgICAgICAgZGVzY3JpcHRpb24gPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX0RFU0NSSVBUSU9OU1tyZWFzb25Db2RlXTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWJ1ZygnRm9yY2VmdWxseSBkcm9wcGluZyBjb25uZWN0aW9uLiBza2lwQ2xvc2VGcmFtZTogJXMsIGNvZGU6ICVkLCBkZXNjcmlwdGlvbjogJXMnLFxuICAgICAgICBza2lwQ2xvc2VGcmFtZSwgcmVhc29uQ29kZSwgZGVzY3JpcHRpb25cbiAgICApO1xuXG4gICAgdGhpcy5jbG9zZVJlYXNvbkNvZGUgPSByZWFzb25Db2RlO1xuICAgIHRoaXMuY2xvc2VEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZnJhbWVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuZnJhZ21lbnRhdGlvblNpemUgPSAwO1xuICAgIGlmICghc2tpcENsb3NlRnJhbWUpIHtcbiAgICAgICAgdGhpcy5zZW5kQ2xvc2VGcmFtZShyZWFzb25Db2RlLCBkZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0NMT1NFRDtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lcigpO1xuICAgIHRoaXMuY2xlYXJLZWVwYWxpdmVUaW1lcigpO1xuICAgIHRoaXMuY2xlYXJHcmFjZVBlcmlvZFRpbWVyKCk7XG5cbiAgICBpZiAoIXRoaXMuY2xvc2VFdmVudEVtaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZUV2ZW50RW1pdHRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RlYnVnKCdFbWl0dGluZyBXZWJTb2NrZXRDb25uZWN0aW9uIGNsb3NlIGV2ZW50Jyk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCB0aGlzLmNsb3NlUmVhc29uQ29kZSwgdGhpcy5jbG9zZURlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5fZGVidWcoJ0Ryb3A6IGRlc3Ryb3lpbmcgc29ja2V0Jyk7XG4gICAgdGhpcy5zb2NrZXQuZGVzdHJveSgpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2V0Q2xvc2VUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdzZXRDbG9zZVRpbWVyJyk7XG4gICAgdGhpcy5jbGVhckNsb3NlVGltZXIoKTtcbiAgICB0aGlzLl9kZWJ1ZygnU2V0dGluZyBjbG9zZSB0aW1lcicpO1xuICAgIHRoaXMud2FpdGluZ0ZvckNsb3NlUmVzcG9uc2UgPSB0cnVlO1xuICAgIHRoaXMuY2xvc2VUaW1lciA9IHNldFRpbWVvdXQodGhpcy5fY2xvc2VUaW1lckhhbmRsZXIsIHRoaXMuY2xvc2VUaW1lb3V0KTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFyQ2xvc2VUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdjbGVhckNsb3NlVGltZXInKTtcbiAgICBpZiAodGhpcy5jbG9zZVRpbWVyKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCdDbGVhcmluZyBjbG9zZSB0aW1lcicpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVyKTtcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yQ2xvc2VSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlVGltZXIgPSBudWxsO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZUNsb3NlVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlQ2xvc2VUaW1lcicpO1xuICAgIHRoaXMuY2xvc2VUaW1lciA9IG51bGw7XG4gICAgaWYgKHRoaXMud2FpdGluZ0ZvckNsb3NlUmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJ0Nsb3NlIHJlc3BvbnNlIG5vdCByZWNlaXZlZCBmcm9tIGNsaWVudC4gIEZvcmNpbmcgc29ja2V0IGVuZC4nKTtcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yQ2xvc2VSZXNwb25zZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfQ0xPU0VEO1xuICAgICAgICB0aGlzLnNvY2tldC5lbmQoKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5wcm9jZXNzRnJhbWUgPSBmdW5jdGlvbihmcmFtZSkge1xuICAgIHRoaXMuX2RlYnVnKCdwcm9jZXNzRnJhbWUnKTtcbiAgICB0aGlzLl9kZWJ1ZygnIC0tIGZyYW1lOiAlcycsIGZyYW1lKTtcbiAgICBcbiAgICAvLyBBbnkgbm9uLWNvbnRyb2wgb3Bjb2RlIGJlc2lkZXMgMHgwMCAoY29udGludWF0aW9uKSByZWNlaXZlZCBpbiB0aGVcbiAgICAvLyBtaWRkbGUgb2YgYSBmcmFnbWVudGVkIG1lc3NhZ2UgaXMgaWxsZWdhbC5cbiAgICBpZiAodGhpcy5mcmFtZVF1ZXVlLmxlbmd0aCAhPT0gMCAmJiAoZnJhbWUub3Bjb2RlID4gMHgwMCAmJiBmcmFtZS5vcGNvZGUgPCAweDA4KSkge1xuICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1IsXG4gICAgICAgICAgJ0lsbGVnYWwgZnJhbWUgb3Bjb2RlIDB4JyArIGZyYW1lLm9wY29kZS50b1N0cmluZygxNikgKyAnICcgK1xuICAgICAgICAgICdyZWNlaXZlZCBpbiBtaWRkbGUgb2YgZnJhZ21lbnRlZCBtZXNzYWdlLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoKGZyYW1lLm9wY29kZSkge1xuICAgICAgICBjYXNlIDB4MDI6IC8vIFdlYlNvY2tldEZyYW1lLkJJTkFSWV9GUkFNRVxuICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tIEJpbmFyeSBGcmFtZScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXNzZW1ibGVGcmFnbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUuZmluKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbXBsZXRlIHNpbmdsZS1mcmFtZSBtZXNzYWdlIHJlY2VpdmVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLS0tIEVtaXR0aW5nIFxcJ21lc3NhZ2VcXCcgZXZlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2JpbmFyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlEYXRhOiBmcmFtZS5iaW5hcnlQYXlsb2FkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIGEgZnJhZ21lbnRlZCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVRdWV1ZS5wdXNoKGZyYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA9IGZyYW1lLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAweDAxOiAvLyBXZWJTb2NrZXRGcmFtZS5URVhUX0ZSQU1FXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gVGV4dCBGcmFtZScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXNzZW1ibGVGcmFnbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUuZmluKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghVmFsaWRhdGlvbi5pc1ZhbGlkVVRGOChmcmFtZS5iaW5hcnlQYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0lOVkFMSURfREFUQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0ludmFsaWQgVVRGLTggRGF0YSBSZWNlaXZlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbXBsZXRlIHNpbmdsZS1mcmFtZSBtZXNzYWdlIHJlY2VpdmVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLS0tIEVtaXR0aW5nIFxcJ21lc3NhZ2VcXCcgZXZlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3V0ZjgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXRmOERhdGE6IGZyYW1lLmJpbmFyeVBheWxvYWQudG9TdHJpbmcoJ3V0ZjgnKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiBhIGZyYWdtZW50ZWQgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lUXVldWUucHVzaChmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRhdGlvblNpemUgPSBmcmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMHgwMDogLy8gV2ViU29ja2V0RnJhbWUuQ09OVElOVUFUSU9OXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gQ29udGludWF0aW9uIEZyYW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3NlbWJsZUZyYWdtZW50cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lUXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcChXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUixcbiAgICAgICAgICAgICAgICAgICAgICAnVW5leHBlY3RlZCBDb250aW51YXRpb24gRnJhbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRhdGlvblNpemUgKz0gZnJhbWUubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRhdGlvblNpemUgPiB0aGlzLm1heFJlY2VpdmVkTWVzc2FnZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX01FU1NBR0VfVE9PX0JJRyxcbiAgICAgICAgICAgICAgICAgICAgICAnTWF4aW11bSBtZXNzYWdlIHNpemUgZXhjZWVkZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lUXVldWUucHVzaChmcmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUuZmluKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiBmcmFnbWVudGVkIG1lc3NhZ2UsIHNvIHdlIHByb2Nlc3MgdGhlIHdob2xlXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2Ugbm93LiAgV2UgYWxzbyBoYXZlIHRvIGRlY29kZSB0aGUgdXRmLTggZGF0YVxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgdGV4dCBmcmFtZXMgYWZ0ZXIgY29tYmluaW5nIGFsbCB0aGUgZnJhZ21lbnRzLlxuICAgICAgICAgICAgICAgICAgICB2YXIgYnl0ZXNDb3BpZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmluYXJ5UGF5bG9hZCA9IGJ1ZmZlckFsbG9jVW5zYWZlKHRoaXMuZnJhZ21lbnRhdGlvblNpemUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3Bjb2RlID0gdGhpcy5mcmFtZVF1ZXVlWzBdLm9wY29kZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKGN1cnJlbnRGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEZyYW1lLmJpbmFyeVBheWxvYWQuY29weShiaW5hcnlQYXlsb2FkLCBieXRlc0NvcGllZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlc0NvcGllZCArPSBjdXJyZW50RnJhbWUuYmluYXJ5UGF5bG9hZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMjogLy8gV2ViU29ja2V0T3Bjb2RlLkJJTkFSWV9GUkFNRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2JpbmFyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeURhdGE6IGJpbmFyeVBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMTogLy8gV2ViU29ja2V0T3Bjb2RlLlRFWFRfRlJBTUVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVZhbGlkYXRpb24uaXNWYWxpZFVURjgoYmluYXJ5UGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0lOVkFMSURfREFUQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSW52YWxpZCBVVEYtOCBEYXRhIFJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndXRmOCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0ZjhEYXRhOiBiaW5hcnlQYXlsb2FkLnRvU3RyaW5nKCd1dGY4JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1VuZXhwZWN0ZWQgZmlyc3Qgb3Bjb2RlIGluIGZyYWdtZW50YXRpb24gc2VxdWVuY2U6IDB4JyArIG9wY29kZS50b1N0cmluZygxNikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDB4MDk6IC8vIFdlYlNvY2tldEZyYW1lLlBJTkdcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLSBQaW5nIEZyYW1lJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9waW5nTGlzdGVuZXJDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBsb2dpYyB0byBlbWl0IHRoZSBwaW5nIGZyYW1lOiB0aGlzIGlzIG9ubHkgZG9uZSB3aGVuIGEgbGlzdGVuZXIgaXMga25vd24gdG8gZXhpc3RcbiAgICAgICAgICAgICAgICAvLyBFeHBvc2UgYSBmdW5jdGlvbiBhbGxvd2luZyB0aGUgdXNlciB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBwaW5nKCkgYmVoYXZpb3JcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGNhbmNlbCA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7IFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdwaW5nJywgY2FuY2VsLCBmcmFtZS5iaW5hcnlQYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIC8vIE9ubHkgc2VuZCBhIHBvbmcgaWYgdGhlIGNsaWVudCBkaWQgbm90IGluZGljYXRlIHRoYXQgaGUgd291bGQgbGlrZSB0byBjYW5jZWxcbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbmcoZnJhbWUuYmluYXJ5UGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb25nKGZyYW1lLmJpbmFyeVBheWxvYWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAweDBBOiAvLyBXZWJTb2NrZXRGcmFtZS5QT05HXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gUG9uZyBGcmFtZScpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdwb25nJywgZnJhbWUuYmluYXJ5UGF5bG9hZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAweDA4OiAvLyBXZWJTb2NrZXRGcmFtZS5DT05ORUNUSU9OX0NMT1NFXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gQ2xvc2UgRnJhbWUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndhaXRpbmdGb3JDbG9zZVJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy8gR290IHJlc3BvbnNlIHRvIG91ciByZXF1ZXN0IHRvIGNsb3NlIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICAgICAgICAgIC8vIENsb3NlIGlzIGNvbXBsZXRlLCBzbyB3ZSBqdXN0IGhhbmcgdXAuXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tLS0gR290IGNsb3NlIHJlc3BvbnNlIGZyb20gcGVlci4gIENvbXBsZXRpbmcgY2xvc2luZyBoYW5kc2hha2UuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNsb3NlVGltZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JDbG9zZVJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0NMT1NFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLS0tIENsb3NpbmcgaGFuZHNoYWtlIGluaXRpYXRlZCBieSBwZWVyLicpO1xuICAgICAgICAgICAgLy8gR290IHJlcXVlc3QgZnJvbSBvdGhlciBwYXJ0eSB0byBjbG9zZSBjb25uZWN0aW9uLlxuICAgICAgICAgICAgLy8gU2VuZCBiYWNrIGFja25vd2xlZGdlbWVudCBhbmQgdGhlbiBoYW5nIHVwLlxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BFRVJfUkVRVUVTVEVEX0NMT1NFO1xuICAgICAgICAgICAgdmFyIHJlc3BvbmRDbG9zZVJlYXNvbkNvZGU7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY2xvc2UgcmVhc29uIHByb3ZpZGVkIGlzIGxlZ2FsIGFjY29yZGluZyB0b1xuICAgICAgICAgICAgLy8gdGhlIHByb3RvY29sIHNwZWMuICBQcm92aWRpbmcgbm8gY2xvc2Ugc3RhdHVzIGlzIGxlZ2FsLlxuICAgICAgICAgICAgLy8gV2ViU29ja2V0RnJhbWUgc2V0cyBjbG9zZVN0YXR1cyB0byAtMSBieSBkZWZhdWx0LCBzbyBpZiBpdFxuICAgICAgICAgICAgLy8gaXMgc3RpbGwgLTEsIHRoZW4gbm8gc3RhdHVzIHdhcyBwcm92aWRlZC5cbiAgICAgICAgICAgIGlmIChmcmFtZS5pbnZhbGlkQ2xvc2VGcmFtZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VSZWFzb25Db2RlID0gMTAwNTsgLy8gMTAwNSA9IE5vIHJlYXNvbiBwcm92aWRlZC5cbiAgICAgICAgICAgICAgICByZXNwb25kQ2xvc2VSZWFzb25Db2RlID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChmcmFtZS5jbG9zZVN0YXR1cyA9PT0gLTEgfHwgdmFsaWRhdGVDbG9zZVJlYXNvbihmcmFtZS5jbG9zZVN0YXR1cykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IGZyYW1lLmNsb3NlU3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3BvbmRDbG9zZVJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9OT1JNQUw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IGZyYW1lLmNsb3NlU3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3BvbmRDbG9zZVJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB0ZXh0dWFsIGRlc2NyaXB0aW9uIGluIHRoZSBjbG9zZSBmcmFtZSwgZXh0cmFjdCBpdC5cbiAgICAgICAgICAgIGlmIChmcmFtZS5iaW5hcnlQYXlsb2FkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIVZhbGlkYXRpb24uaXNWYWxpZFVURjgoZnJhbWUuYmluYXJ5UGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0lOVkFMSURfREFUQSxcbiAgICAgICAgICAgICAgICAgICAgICAnSW52YWxpZCBVVEYtOCBEYXRhIFJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gZnJhbWUuYmluYXJ5UGF5bG9hZC50b1N0cmluZygndXRmOCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9ERVNDUklQVElPTlNbdGhpcy5jbG9zZVJlYXNvbkNvZGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGVidWcoXG4gICAgICAgICAgICAgICAgJy0tLS0tLSBSZW1vdGUgcGVlciAlcyAtIGNvZGU6ICVkIC0gJXMgLSBjbG9zZSBmcmFtZSBwYXlsb2FkIGxlbmd0aDogJWQnLFxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQWRkcmVzcywgdGhpcy5jbG9zZVJlYXNvbkNvZGUsXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uLCBmcmFtZS5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0tLS0tIHJlc3BvbmRpbmcgdG8gcmVtb3RlIHBlZXJcXCdzIGNsb3NlIHJlcXVlc3QuJyk7XG4gICAgICAgICAgICB0aGlzLnNlbmRDbG9zZUZyYW1lKHJlc3BvbmRDbG9zZVJlYXNvbkNvZGUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tIFVucmVjb2duaXplZCBPcGNvZGUgJWQnLCBmcmFtZS5vcGNvZGUpO1xuICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SLFxuICAgICAgICAgICAgICAnVW5yZWNvZ25pemVkIE9wY29kZTogMHgnICsgZnJhbWUub3Bjb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICB0aGlzLl9kZWJ1Zygnc2VuZCcpO1xuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMoZGF0YSwgY2IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YoZGF0YVsndG9TdHJpbmcnXSkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zZW5kVVRGKGRhdGEsIGNiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBwcm92aWRlZCBtdXN0IGVpdGhlciBiZSBhIE5vZGUgQnVmZmVyIG9yIGltcGxlbWVudCB0b1N0cmluZygpJyk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZFVURiA9IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgZGF0YSA9IGJ1ZmZlckZyb21TdHJpbmcoZGF0YS50b1N0cmluZygpLCAndXRmOCcpO1xuICAgIHRoaXMuX2RlYnVnKCdzZW5kVVRGOiAlZCBieXRlcycsIGRhdGEubGVuZ3RoKTtcbiAgICB2YXIgZnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcbiAgICBmcmFtZS5vcGNvZGUgPSAweDAxOyAvLyBXZWJTb2NrZXRPcGNvZGUuVEVYVF9GUkFNRVxuICAgIGZyYW1lLmJpbmFyeVBheWxvYWQgPSBkYXRhO1xuICAgIHRoaXMuZnJhZ21lbnRBbmRTZW5kKGZyYW1lLCBjYik7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kQnl0ZXMgPSBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgIHRoaXMuX2RlYnVnKCdzZW5kQnl0ZXMnKTtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSBOb2RlIEJ1ZmZlciBvYmplY3QgdG8gV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZEJ5dGVzKCknKTtcbiAgICB9XG4gICAgdmFyIGZyYW1lID0gbmV3IFdlYlNvY2tldEZyYW1lKHRoaXMubWFza0J5dGVzLCB0aGlzLmZyYW1lSGVhZGVyLCB0aGlzLmNvbmZpZyk7XG4gICAgZnJhbWUub3Bjb2RlID0gMHgwMjsgLy8gV2ViU29ja2V0T3Bjb2RlLkJJTkFSWV9GUkFNRVxuICAgIGZyYW1lLmJpbmFyeVBheWxvYWQgPSBkYXRhO1xuICAgIHRoaXMuZnJhZ21lbnRBbmRTZW5kKGZyYW1lLCBjYik7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5waW5nID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuX2RlYnVnKCdwaW5nJyk7XG4gICAgdmFyIGZyYW1lID0gbmV3IFdlYlNvY2tldEZyYW1lKHRoaXMubWFza0J5dGVzLCB0aGlzLmZyYW1lSGVhZGVyLCB0aGlzLmNvbmZpZyk7XG4gICAgZnJhbWUub3Bjb2RlID0gMHgwOTsgLy8gV2ViU29ja2V0T3Bjb2RlLlBJTkdcbiAgICBmcmFtZS5maW4gPSB0cnVlO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gYnVmZmVyRnJvbVN0cmluZyhkYXRhLnRvU3RyaW5nKCksICd1dGY4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMTI1KSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnV2ViU29ja2V0OiBEYXRhIGZvciBwaW5nIGlzIGxvbmdlciB0aGFuIDEyNSBieXRlcy4gIFRydW5jYXRpbmcuJyk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZSgwLDEyNCk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWUuYmluYXJ5UGF5bG9hZCA9IGRhdGE7XG4gICAgfVxuICAgIHRoaXMuc2VuZEZyYW1lKGZyYW1lKTtcbn07XG5cbi8vIFBvbmcgZnJhbWVzIGhhdmUgdG8gZWNobyBiYWNrIHRoZSBjb250ZW50cyBvZiB0aGUgZGF0YSBwb3J0aW9uIG9mIHRoZVxuLy8gcGluZyBmcmFtZSBleGFjdGx5LCBieXRlIGZvciBieXRlLlxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUucG9uZyA9IGZ1bmN0aW9uKGJpbmFyeVBheWxvYWQpIHtcbiAgICB0aGlzLl9kZWJ1ZygncG9uZycpO1xuICAgIHZhciBmcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuICAgIGZyYW1lLm9wY29kZSA9IDB4MEE7IC8vIFdlYlNvY2tldE9wY29kZS5QT05HXG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihiaW5hcnlQYXlsb2FkKSAmJiBiaW5hcnlQYXlsb2FkLmxlbmd0aCA+IDEyNSkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnV2ViU29ja2V0OiBEYXRhIGZvciBwb25nIGlzIGxvbmdlciB0aGFuIDEyNSBieXRlcy4gIFRydW5jYXRpbmcuJyk7XG4gICAgICAgIGJpbmFyeVBheWxvYWQgPSBiaW5hcnlQYXlsb2FkLnNsaWNlKDAsMTI0KTtcbiAgICB9XG4gICAgZnJhbWUuYmluYXJ5UGF5bG9hZCA9IGJpbmFyeVBheWxvYWQ7XG4gICAgZnJhbWUuZmluID0gdHJ1ZTtcbiAgICB0aGlzLnNlbmRGcmFtZShmcmFtZSk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5mcmFnbWVudEFuZFNlbmQgPSBmdW5jdGlvbihmcmFtZSwgY2IpIHtcbiAgICB0aGlzLl9kZWJ1ZygnZnJhZ21lbnRBbmRTZW5kJyk7XG4gICAgaWYgKGZyYW1lLm9wY29kZSA+IDB4MDcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGZyYWdtZW50IGNvbnRyb2wgZnJhbWVzLicpO1xuICAgIH1cblxuICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLmNvbmZpZy5mcmFnbWVudGF0aW9uVGhyZXNob2xkO1xuICAgIHZhciBsZW5ndGggPSBmcmFtZS5iaW5hcnlQYXlsb2FkLmxlbmd0aDtcblxuICAgIC8vIFNlbmQgaW1tZWRpYXRlbHkgaWYgZnJhZ21lbnRhdGlvbiBpcyBkaXNhYmxlZCBvciB0aGUgbWVzc2FnZSBpcyBub3RcbiAgICAvLyBsYXJnZXIgdGhhbiB0aGUgZnJhZ21lbnRhdGlvbiB0aHJlc2hvbGQuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5mcmFnbWVudE91dGdvaW5nTWVzc2FnZXMgfHwgKGZyYW1lLmJpbmFyeVBheWxvYWQgJiYgbGVuZ3RoIDw9IHRocmVzaG9sZCkpIHtcbiAgICAgICAgZnJhbWUuZmluID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZW5kRnJhbWUoZnJhbWUsIGNiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbnVtRnJhZ21lbnRzID0gTWF0aC5jZWlsKGxlbmd0aCAvIHRocmVzaG9sZCk7XG4gICAgdmFyIHNlbnRGcmFnbWVudHMgPSAwO1xuICAgIHZhciBzZW50Q2FsbGJhY2sgPSBmdW5jdGlvbiBmcmFnbWVudFNlbnRDYWxsYmFjayhlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIHBhc3Mgb25seSB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgICAgIGNiID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICArK3NlbnRGcmFnbWVudHM7XG4gICAgICAgIGlmICgoc2VudEZyYWdtZW50cyA9PT0gbnVtRnJhZ21lbnRzKSAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9yICh2YXIgaT0xOyBpIDw9IG51bUZyYWdtZW50czsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyZW50RnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnRpbnVhdGlvbiBvcGNvZGUgZXhjZXB0IGZvciBmaXJzdCBmcmFtZS5cbiAgICAgICAgY3VycmVudEZyYW1lLm9wY29kZSA9IChpID09PSAxKSA/IGZyYW1lLm9wY29kZSA6IDB4MDA7XG4gICAgICAgIFxuICAgICAgICAvLyBmaW4gc2V0IG9uIGxhc3QgZnJhbWUgb25seVxuICAgICAgICBjdXJyZW50RnJhbWUuZmluID0gKGkgPT09IG51bUZyYWdtZW50cyk7XG4gICAgICAgIFxuICAgICAgICAvLyBsZW5ndGggaXMgbGlrZWx5IHRvIGJlIHNob3J0ZXIgb24gdGhlIGxhc3QgZnJhZ21lbnRcbiAgICAgICAgdmFyIGN1cnJlbnRMZW5ndGggPSAoaSA9PT0gbnVtRnJhZ21lbnRzKSA/IGxlbmd0aCAtICh0aHJlc2hvbGQgKiAoaS0xKSkgOiB0aHJlc2hvbGQ7XG4gICAgICAgIHZhciBzbGljZVN0YXJ0ID0gdGhyZXNob2xkICogKGktMSk7XG4gICAgICAgIFxuICAgICAgICAvLyBTbGljZSB0aGUgcmlnaHQgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgcGF5bG9hZFxuICAgICAgICBjdXJyZW50RnJhbWUuYmluYXJ5UGF5bG9hZCA9IGZyYW1lLmJpbmFyeVBheWxvYWQuc2xpY2Uoc2xpY2VTdGFydCwgc2xpY2VTdGFydCArIGN1cnJlbnRMZW5ndGgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZW5kRnJhbWUoY3VycmVudEZyYW1lLCBzZW50Q2FsbGJhY2spO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRDbG9zZUZyYW1lID0gZnVuY3Rpb24ocmVhc29uQ29kZSwgZGVzY3JpcHRpb24sIGNiKSB7XG4gICAgaWYgKHR5cGVvZihyZWFzb25Db2RlKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmVhc29uQ29kZSA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX05PUk1BTDtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5fZGVidWcoJ3NlbmRDbG9zZUZyYW1lIHN0YXRlOiAlcywgcmVhc29uQ29kZTogJWQsIGRlc2NyaXB0aW9uOiAlcycsIHRoaXMuc3RhdGUsIHJlYXNvbkNvZGUsIGRlc2NyaXB0aW9uKTtcbiAgICBcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfT1BFTiAmJiB0aGlzLnN0YXRlICE9PSBTVEFURV9QRUVSX1JFUVVFU1RFRF9DTE9TRSkgeyByZXR1cm47IH1cbiAgICBcbiAgICB2YXIgZnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcbiAgICBmcmFtZS5maW4gPSB0cnVlO1xuICAgIGZyYW1lLm9wY29kZSA9IDB4MDg7IC8vIFdlYlNvY2tldE9wY29kZS5DT05ORUNUSU9OX0NMT1NFXG4gICAgZnJhbWUuY2xvc2VTdGF0dXMgPSByZWFzb25Db2RlO1xuICAgIGlmICh0eXBlb2YoZGVzY3JpcHRpb24pID09PSAnc3RyaW5nJykge1xuICAgICAgICBmcmFtZS5iaW5hcnlQYXlsb2FkID0gYnVmZmVyRnJvbVN0cmluZyhkZXNjcmlwdGlvbiwgJ3V0ZjgnKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5zZW5kRnJhbWUoZnJhbWUsIGNiKTtcbiAgICB0aGlzLnNvY2tldC5lbmQoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lLCBjYikge1xuICAgIHRoaXMuX2RlYnVnKCdzZW5kRnJhbWUnKTtcbiAgICBmcmFtZS5tYXNrID0gdGhpcy5tYXNrT3V0Z29pbmdQYWNrZXRzO1xuICAgIHZhciBmbHVzaGVkID0gdGhpcy5zb2NrZXQud3JpdGUoZnJhbWUudG9CdWZmZXIoKSwgY2IpO1xuICAgIHRoaXMub3V0cHV0QnVmZmVyRnVsbCA9ICFmbHVzaGVkO1xuICAgIHJldHVybiBmbHVzaGVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRDb25uZWN0aW9uO1xuXG5cblxuZnVuY3Rpb24gaW5zdHJ1bWVudFNvY2tldEZvckRlYnVnZ2luZyhjb25uZWN0aW9uLCBzb2NrZXQpIHtcbiAgICAvKiBqc2hpbnQgbG9vcGZ1bmM6IHRydWUgKi9cbiAgICBpZiAoIWNvbm5lY3Rpb24uX2RlYnVnLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgXG4gICAgdmFyIG9yaWdpbmFsU29ja2V0RW1pdCA9IHNvY2tldC5lbWl0O1xuICAgIHNvY2tldC5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29ubmVjdGlvbi5fZGVidWcoJ3x8fCBTb2NrZXQgRXZlbnQgIFxcJyVzXFwnJywgZXZlbnQpO1xuICAgICAgICBvcmlnaW5hbFNvY2tldEVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIFxuICAgIGZvciAodmFyIGtleSBpbiBzb2NrZXQpIHtcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZihzb2NrZXRba2V5XSkpIHsgY29udGludWU7IH1cbiAgICAgICAgaWYgKFsnZW1pdCddLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHsgY29udGludWU7IH1cbiAgICAgICAgKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gc29ja2V0W2tleV07XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnb24nKSB7XG4gICAgICAgICAgICAgICAgc29ja2V0W2tleV0gPSBmdW5jdGlvbiBwcm94eU1ldGhvZF9fRXZlbnRFbWl0dGVyX19PbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fZGVidWcoJ3x8fCBTb2NrZXQgbWV0aG9kIGNhbGxlZDogICVzICglcyknLCBrZXksIGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc29ja2V0W2tleV0gPSBmdW5jdGlvbiBwcm94eU1ldGhvZCgpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl9kZWJ1ZygnfHx8IFNvY2tldCBtZXRob2QgY2FsbGVkOiAgJXMnLCBrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkoa2V5KTtcbiAgICB9XG59XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBidWZmZXJVdGlsID0gcmVxdWlyZSgnLi9CdWZmZXJVdGlsJykuQnVmZmVyVXRpbDtcbnZhciBidWZmZXJBbGxvY1Vuc2FmZSA9IHJlcXVpcmUoJy4vdXRpbHMnKS5idWZmZXJBbGxvY1Vuc2FmZTtcblxuY29uc3QgREVDT0RFX0hFQURFUiA9IDE7XG5jb25zdCBXQUlUSU5HX0ZPUl8xNl9CSVRfTEVOR1RIID0gMjtcbmNvbnN0IFdBSVRJTkdfRk9SXzY0X0JJVF9MRU5HVEggPSAzO1xuY29uc3QgV0FJVElOR19GT1JfTUFTS19LRVkgPSA0O1xuY29uc3QgV0FJVElOR19GT1JfUEFZTE9BRCA9IDU7XG5jb25zdCBDT01QTEVURSA9IDY7XG5cbi8vIFdlYlNvY2tldENvbm5lY3Rpb24gd2lsbCBwYXNzIHNoYXJlZCBidWZmZXIgb2JqZWN0cyBmb3IgbWFza0J5dGVzIGFuZFxuLy8gZnJhbWVIZWFkZXIgaW50byB0aGUgY29uc3RydWN0b3IgdG8gYXZvaWQgdG9ucyBvZiBzbWFsbCBtZW1vcnkgYWxsb2NhdGlvbnNcbi8vIGZvciBlYWNoIGZyYW1lIHdlIGhhdmUgdG8gcGFyc2UuICBUaGlzIGlzIG9ubHkgdXNlZCBmb3IgcGFyc2luZyBmcmFtZXNcbi8vIHdlIHJlY2VpdmUgb2ZmIHRoZSB3aXJlLlxuZnVuY3Rpb24gV2ViU29ja2V0RnJhbWUobWFza0J5dGVzLCBmcmFtZUhlYWRlciwgY29uZmlnKSB7XG4gICAgdGhpcy5tYXNrQnl0ZXMgPSBtYXNrQnl0ZXM7XG4gICAgdGhpcy5mcmFtZUhlYWRlciA9IGZyYW1lSGVhZGVyO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMubWF4UmVjZWl2ZWRGcmFtZVNpemUgPSBjb25maWcubWF4UmVjZWl2ZWRGcmFtZVNpemU7XG4gICAgdGhpcy5wcm90b2NvbEVycm9yID0gZmFsc2U7XG4gICAgdGhpcy5mcmFtZVRvb0xhcmdlID0gZmFsc2U7XG4gICAgdGhpcy5pbnZhbGlkQ2xvc2VGcmFtZUxlbmd0aCA9IGZhbHNlO1xuICAgIHRoaXMucGFyc2VTdGF0ZSA9IERFQ09ERV9IRUFERVI7XG4gICAgdGhpcy5jbG9zZVN0YXR1cyA9IC0xO1xufVxuXG5XZWJTb2NrZXRGcmFtZS5wcm90b3R5cGUuYWRkRGF0YSA9IGZ1bmN0aW9uKGJ1ZmZlckxpc3QpIHtcbiAgICBpZiAodGhpcy5wYXJzZVN0YXRlID09PSBERUNPREVfSEVBREVSKSB7XG4gICAgICAgIGlmIChidWZmZXJMaXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmpvaW5JbnRvKHRoaXMuZnJhbWVIZWFkZXIsIDAsIDAsIDIpO1xuICAgICAgICAgICAgYnVmZmVyTGlzdC5hZHZhbmNlKDIpO1xuICAgICAgICAgICAgdmFyIGZpcnN0Qnl0ZSA9IHRoaXMuZnJhbWVIZWFkZXJbMF07XG4gICAgICAgICAgICB2YXIgc2Vjb25kQnl0ZSA9IHRoaXMuZnJhbWVIZWFkZXJbMV07XG5cbiAgICAgICAgICAgIHRoaXMuZmluICAgICA9IEJvb2xlYW4oZmlyc3RCeXRlICAmIDB4ODApO1xuICAgICAgICAgICAgdGhpcy5yc3YxICAgID0gQm9vbGVhbihmaXJzdEJ5dGUgICYgMHg0MCk7XG4gICAgICAgICAgICB0aGlzLnJzdjIgICAgPSBCb29sZWFuKGZpcnN0Qnl0ZSAgJiAweDIwKTtcbiAgICAgICAgICAgIHRoaXMucnN2MyAgICA9IEJvb2xlYW4oZmlyc3RCeXRlICAmIDB4MTApO1xuICAgICAgICAgICAgdGhpcy5tYXNrICAgID0gQm9vbGVhbihzZWNvbmRCeXRlICYgMHg4MCk7XG5cbiAgICAgICAgICAgIHRoaXMub3Bjb2RlICA9IGZpcnN0Qnl0ZSAgJiAweDBGO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBzZWNvbmRCeXRlICYgMHg3RjtcblxuICAgICAgICAgICAgLy8gQ29udHJvbCBmcmFtZSBzYW5pdHkgY2hlY2tcbiAgICAgICAgICAgIGlmICh0aGlzLm9wY29kZSA+PSAweDA4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMTI1KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdG9jb2xFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFJlYXNvbiA9ICdJbGxlZ2FsIGNvbnRyb2wgZnJhbWUgbG9uZ2VyIHRoYW4gMTI1IGJ5dGVzLic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmluKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdG9jb2xFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFJlYXNvbiA9ICdDb250cm9sIGZyYW1lcyBtdXN0IG5vdCBiZSBmcmFnbWVudGVkLic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAxMjYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBXQUlUSU5HX0ZPUl8xNl9CSVRfTEVOR1RIO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5sZW5ndGggPT09IDEyNykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SXzY0X0JJVF9MRU5HVEg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBXQUlUSU5HX0ZPUl9NQVNLX0tFWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wYXJzZVN0YXRlID09PSBXQUlUSU5HX0ZPUl8xNl9CSVRfTEVOR1RIKSB7XG4gICAgICAgIGlmIChidWZmZXJMaXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmpvaW5JbnRvKHRoaXMuZnJhbWVIZWFkZXIsIDIsIDAsIDIpO1xuICAgICAgICAgICAgYnVmZmVyTGlzdC5hZHZhbmNlKDIpO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmZyYW1lSGVhZGVyLnJlYWRVSW50MTZCRSgyKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SX01BU0tfS0VZO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucGFyc2VTdGF0ZSA9PT0gV0FJVElOR19GT1JfNjRfQklUX0xFTkdUSCkge1xuICAgICAgICBpZiAoYnVmZmVyTGlzdC5sZW5ndGggPj0gOCkge1xuICAgICAgICAgICAgYnVmZmVyTGlzdC5qb2luSW50byh0aGlzLmZyYW1lSGVhZGVyLCAyLCAwLCA4KTtcbiAgICAgICAgICAgIGJ1ZmZlckxpc3QuYWR2YW5jZSg4KTtcbiAgICAgICAgICAgIHZhciBsZW5ndGhQYWlyID0gW1xuICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyLnJlYWRVSW50MzJCRSgyKSxcbiAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlYWRlci5yZWFkVUludDMyQkUoMis0KVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKGxlbmd0aFBhaXJbMF0gIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3RvY29sRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcFJlYXNvbiA9ICdVbnN1cHBvcnRlZCA2NC1iaXQgbGVuZ3RoIGZyYW1lIHJlY2VpdmVkJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoUGFpclsxXTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SX01BU0tfS0VZO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyc2VTdGF0ZSA9PT0gV0FJVElOR19GT1JfTUFTS19LRVkpIHtcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlckxpc3QubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICBidWZmZXJMaXN0LmpvaW5JbnRvKHRoaXMubWFza0J5dGVzLCAwLCAwLCA0KTtcbiAgICAgICAgICAgICAgICBidWZmZXJMaXN0LmFkdmFuY2UoNCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gV0FJVElOR19GT1JfUEFZTE9BRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SX1BBWUxPQUQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJzZVN0YXRlID09PSBXQUlUSU5HX0ZPUl9QQVlMT0FEKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IHRoaXMubWF4UmVjZWl2ZWRGcmFtZVNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUb29MYXJnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRyb3BSZWFzb24gPSAnRnJhbWUgc2l6ZSBvZiAnICsgdGhpcy5sZW5ndGgudG9TdHJpbmcoMTApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgYnl0ZXMgZXhjZWVkcyBtYXhpbXVtIGFjY2VwdGVkIGZyYW1lIHNpemUnO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYmluYXJ5UGF5bG9hZCA9IGJ1ZmZlckFsbG9jVW5zYWZlKDApO1xuICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gQ09NUExFVEU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnVmZmVyTGlzdC5sZW5ndGggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuYmluYXJ5UGF5bG9hZCA9IGJ1ZmZlckxpc3QudGFrZSh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmFkdmFuY2UodGhpcy5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgICAgIGJ1ZmZlclV0aWwudW5tYXNrKHRoaXMuYmluYXJ5UGF5bG9hZCwgdGhpcy5tYXNrQnl0ZXMpO1xuICAgICAgICAgICAgICAgIC8vIHhvcih0aGlzLmJpbmFyeVBheWxvYWQsIHRoaXMubWFza0J5dGVzLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3Bjb2RlID09PSAweDA4KSB7IC8vIFdlYlNvY2tldE9wY29kZS5DT05ORUNUSU9OX0NMT1NFXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgbGVuZ3RoIGZvciBhIGNsb3NlIGZyYW1lLiAgTXVzdCBiZSB6ZXJvIG9yIGF0IGxlYXN0IHR3by5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5hcnlQYXlsb2FkID0gYnVmZmVyQWxsb2NVbnNhZmUoMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZENsb3NlRnJhbWVMZW5ndGggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlU3RhdHVzID0gdGhpcy5iaW5hcnlQYXlsb2FkLnJlYWRVSW50MTZCRSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5hcnlQYXlsb2FkID0gdGhpcy5iaW5hcnlQYXlsb2FkLnNsaWNlKDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gQ09NUExFVEU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5XZWJTb2NrZXRGcmFtZS5wcm90b3R5cGUudGhyb3dBd2F5UGF5bG9hZCA9IGZ1bmN0aW9uKGJ1ZmZlckxpc3QpIHtcbiAgICBpZiAoYnVmZmVyTGlzdC5sZW5ndGggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgYnVmZmVyTGlzdC5hZHZhbmNlKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gQ09NUExFVEU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5XZWJTb2NrZXRGcmFtZS5wcm90b3R5cGUudG9CdWZmZXIgPSBmdW5jdGlvbihudWxsTWFzaykge1xuICAgIHZhciBtYXNrS2V5O1xuICAgIHZhciBoZWFkZXJMZW5ndGggPSAyO1xuICAgIHZhciBkYXRhO1xuICAgIHZhciBvdXRwdXRQb3M7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IDB4MDA7XG4gICAgdmFyIHNlY29uZEJ5dGUgPSAweDAwO1xuXG4gICAgaWYgKHRoaXMuZmluKSB7XG4gICAgICAgIGZpcnN0Qnl0ZSB8PSAweDgwO1xuICAgIH1cbiAgICBpZiAodGhpcy5yc3YxKSB7XG4gICAgICAgIGZpcnN0Qnl0ZSB8PSAweDQwO1xuICAgIH1cbiAgICBpZiAodGhpcy5yc3YyKSB7XG4gICAgICAgIGZpcnN0Qnl0ZSB8PSAweDIwO1xuICAgIH1cbiAgICBpZiAodGhpcy5yc3YzKSB7XG4gICAgICAgIGZpcnN0Qnl0ZSB8PSAweDEwO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgIHNlY29uZEJ5dGUgfD0gMHg4MDtcbiAgICB9XG5cbiAgICBmaXJzdEJ5dGUgfD0gKHRoaXMub3Bjb2RlICYgMHgwRik7XG5cbiAgICAvLyB0aGUgY2xvc2UgZnJhbWUgaXMgYSBzcGVjaWFsIGNhc2UgYmVjYXVzZSB0aGUgY2xvc2UgcmVhc29uIGlzXG4gICAgLy8gcHJlcGVuZGVkIHRvIHRoZSBwYXlsb2FkIGRhdGEuXG4gICAgaWYgKHRoaXMub3Bjb2RlID09PSAweDA4KSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMjtcbiAgICAgICAgaWYgKHRoaXMuYmluYXJ5UGF5bG9hZCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggKz0gdGhpcy5iaW5hcnlQYXlsb2FkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gYnVmZmVyQWxsb2NVbnNhZmUodGhpcy5sZW5ndGgpO1xuICAgICAgICBkYXRhLndyaXRlVUludDE2QkUodGhpcy5jbG9zZVN0YXR1cywgMCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHRoaXMuYmluYXJ5UGF5bG9hZC5jb3B5KGRhdGEsIDIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuYmluYXJ5UGF5bG9hZCkge1xuICAgICAgICBkYXRhID0gdGhpcy5iaW5hcnlQYXlsb2FkO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlbmd0aCA8PSAxMjUpIHtcbiAgICAgICAgLy8gZW5jb2RlIHRoZSBsZW5ndGggZGlyZWN0bHkgaW50byB0aGUgdHdvLWJ5dGUgZnJhbWUgaGVhZGVyXG4gICAgICAgIHNlY29uZEJ5dGUgfD0gKHRoaXMubGVuZ3RoICYgMHg3Rik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMTI1ICYmIHRoaXMubGVuZ3RoIDw9IDB4RkZGRikge1xuICAgICAgICAvLyBVc2UgMTYtYml0IGxlbmd0aFxuICAgICAgICBzZWNvbmRCeXRlIHw9IDEyNjtcbiAgICAgICAgaGVhZGVyTGVuZ3RoICs9IDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMHhGRkZGKSB7XG4gICAgICAgIC8vIFVzZSA2NC1iaXQgbGVuZ3RoXG4gICAgICAgIHNlY29uZEJ5dGUgfD0gMTI3O1xuICAgICAgICBoZWFkZXJMZW5ndGggKz0gODtcbiAgICB9XG5cbiAgICB2YXIgb3V0cHV0ID0gYnVmZmVyQWxsb2NVbnNhZmUodGhpcy5sZW5ndGggKyBoZWFkZXJMZW5ndGggKyAodGhpcy5tYXNrID8gNCA6IDApKTtcblxuICAgIC8vIHdyaXRlIHRoZSBmcmFtZSBoZWFkZXJcbiAgICBvdXRwdXRbMF0gPSBmaXJzdEJ5dGU7XG4gICAgb3V0cHV0WzFdID0gc2Vjb25kQnl0ZTtcblxuICAgIG91dHB1dFBvcyA9IDI7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPiAxMjUgJiYgdGhpcy5sZW5ndGggPD0gMHhGRkZGKSB7XG4gICAgICAgIC8vIHdyaXRlIDE2LWJpdCBsZW5ndGhcbiAgICAgICAgb3V0cHV0LndyaXRlVUludDE2QkUodGhpcy5sZW5ndGgsIG91dHB1dFBvcyk7XG4gICAgICAgIG91dHB1dFBvcyArPSAyO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA+IDB4RkZGRikge1xuICAgICAgICAvLyB3cml0ZSA2NC1iaXQgbGVuZ3RoXG4gICAgICAgIG91dHB1dC53cml0ZVVJbnQzMkJFKDB4MDAwMDAwMDAsIG91dHB1dFBvcyk7XG4gICAgICAgIG91dHB1dC53cml0ZVVJbnQzMkJFKHRoaXMubGVuZ3RoLCBvdXRwdXRQb3MgKyA0KTtcbiAgICAgICAgb3V0cHV0UG9zICs9IDg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICBtYXNrS2V5ID0gbnVsbE1hc2sgPyAwIDogKChNYXRoLnJhbmRvbSgpICogMHhGRkZGRkZGRikgPj4+IDApO1xuICAgICAgICB0aGlzLm1hc2tCeXRlcy53cml0ZVVJbnQzMkJFKG1hc2tLZXksIDApO1xuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBtYXNrIGtleVxuICAgICAgICB0aGlzLm1hc2tCeXRlcy5jb3B5KG91dHB1dCwgb3V0cHV0UG9zKTtcbiAgICAgICAgb3V0cHV0UG9zICs9IDQ7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICBidWZmZXJVdGlsLm1hc2soZGF0YSwgdGhpcy5tYXNrQnl0ZXMsIG91dHB1dCwgb3V0cHV0UG9zLCB0aGlzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmNvcHkob3V0cHV0LCBvdXRwdXRQb3MpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5XZWJTb2NrZXRGcmFtZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJ09wY29kZTogJyArIHRoaXMub3Bjb2RlICsgJywgZmluOiAnICsgdGhpcy5maW4gKyAnLCBsZW5ndGg6ICcgKyB0aGlzLmxlbmd0aCArICcsIGhhc1BheWxvYWQ6ICcgKyBCb29sZWFuKHRoaXMuYmluYXJ5UGF5bG9hZCkgKyAnLCBtYXNrZWQ6ICcgKyB0aGlzLm1hc2s7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0RnJhbWU7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBXZWJTb2NrZXRDb25uZWN0aW9uID0gcmVxdWlyZSgnLi9XZWJTb2NrZXRDb25uZWN0aW9uJyk7XG5cbnZhciBoZWFkZXJWYWx1ZVNwbGl0UmVnRXhwID0gLyxcXHMqLztcbnZhciBoZWFkZXJQYXJhbVNwbGl0UmVnRXhwID0gLztcXHMqLztcbnZhciBoZWFkZXJTYW5pdGl6ZVJlZ0V4cCA9IC9bXFxyXFxuXS9nO1xudmFyIHhGb3J3YXJkZWRGb3JTZXBhcmF0b3JSZWdFeHAgPSAvLFxccyovO1xudmFyIHNlcGFyYXRvcnMgPSBbXG4gICAgJygnLCAnKScsICc8JywgJz4nLCAnQCcsXG4gICAgJywnLCAnOycsICc6JywgJ1xcXFwnLCAnXFxcIicsXG4gICAgJy8nLCAnWycsICddJywgJz8nLCAnPScsXG4gICAgJ3snLCAnfScsICcgJywgU3RyaW5nLmZyb21DaGFyQ29kZSg5KVxuXTtcbnZhciBjb250cm9sQ2hhcnMgPSBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMjcpIC8qIERFTCAqL107XG5mb3IgKHZhciBpPTA7IGkgPCAzMTsgaSArKykge1xuICAgIC8qIFVTLUFTQ0lJIENvbnRyb2wgQ2hhcmFjdGVycyAqL1xuICAgIGNvbnRyb2xDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xufVxuXG52YXIgY29va2llTmFtZVZhbGlkYXRlUmVnRXggPSAvKFtcXHgwMC1cXHgyMFxceDIyXFx4MjhcXHgyOVxceDJjXFx4MmZcXHgzYS1cXHgzZlxceDQwXFx4NWItXFx4NWVcXHg3YlxceDdkXFx4N2ZdKS87XG52YXIgY29va2llVmFsdWVWYWxpZGF0ZVJlZ0V4ID0gL1teXFx4MjFcXHgyMy1cXHgyYlxceDJkLVxceDNhXFx4M2MtXFx4NWJcXHg1ZC1cXHg3ZV0vO1xudmFyIGNvb2tpZVZhbHVlRFF1b3RlVmFsaWRhdGVSZWdFeCA9IC9eXCJbXlwiXSpcIiQvO1xudmFyIGNvbnRyb2xDaGFyc0FuZFNlbWljb2xvblJlZ0V4ID0gL1tcXHgwMC1cXHgyMFxceDNiXS9nO1xuXG52YXIgY29va2llU2VwYXJhdG9yUmVnRXggPSAvWzssXSAqLztcblxudmFyIGh0dHBTdGF0dXNEZXNjcmlwdGlvbnMgPSB7XG4gICAgMTAwOiAnQ29udGludWUnLFxuICAgIDEwMTogJ1N3aXRjaGluZyBQcm90b2NvbHMnLFxuICAgIDIwMDogJ09LJyxcbiAgICAyMDE6ICdDcmVhdGVkJyxcbiAgICAyMDM6ICdOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvbicsXG4gICAgMjA0OiAnTm8gQ29udGVudCcsXG4gICAgMjA1OiAnUmVzZXQgQ29udGVudCcsXG4gICAgMjA2OiAnUGFydGlhbCBDb250ZW50JyxcbiAgICAzMDA6ICdNdWx0aXBsZSBDaG9pY2VzJyxcbiAgICAzMDE6ICdNb3ZlZCBQZXJtYW5lbnRseScsXG4gICAgMzAyOiAnRm91bmQnLFxuICAgIDMwMzogJ1NlZSBPdGhlcicsXG4gICAgMzA0OiAnTm90IE1vZGlmaWVkJyxcbiAgICAzMDU6ICdVc2UgUHJveHknLFxuICAgIDMwNzogJ1RlbXBvcmFyeSBSZWRpcmVjdCcsXG4gICAgNDAwOiAnQmFkIFJlcXVlc3QnLFxuICAgIDQwMTogJ1VuYXV0aG9yaXplZCcsXG4gICAgNDAyOiAnUGF5bWVudCBSZXF1aXJlZCcsXG4gICAgNDAzOiAnRm9yYmlkZGVuJyxcbiAgICA0MDQ6ICdOb3QgRm91bmQnLFxuICAgIDQwNjogJ05vdCBBY2NlcHRhYmxlJyxcbiAgICA0MDc6ICdQcm94eSBBdXRob3JpemF0aW9uIFJlcXVpcmVkJyxcbiAgICA0MDg6ICdSZXF1ZXN0IFRpbWVvdXQnLFxuICAgIDQwOTogJ0NvbmZsaWN0JyxcbiAgICA0MTA6ICdHb25lJyxcbiAgICA0MTE6ICdMZW5ndGggUmVxdWlyZWQnLFxuICAgIDQxMjogJ1ByZWNvbmRpdGlvbiBGYWlsZWQnLFxuICAgIDQxMzogJ1JlcXVlc3QgRW50aXR5IFRvbyBMb25nJyxcbiAgICA0MTQ6ICdSZXF1ZXN0LVVSSSBUb28gTG9uZycsXG4gICAgNDE1OiAnVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZScsXG4gICAgNDE2OiAnUmVxdWVzdGVkIFJhbmdlIE5vdCBTYXRpc2ZpYWJsZScsXG4gICAgNDE3OiAnRXhwZWN0YXRpb24gRmFpbGVkJyxcbiAgICA0MjY6ICdVcGdyYWRlIFJlcXVpcmVkJyxcbiAgICA1MDA6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLFxuICAgIDUwMTogJ05vdCBJbXBsZW1lbnRlZCcsXG4gICAgNTAyOiAnQmFkIEdhdGV3YXknLFxuICAgIDUwMzogJ1NlcnZpY2UgVW5hdmFpbGFibGUnLFxuICAgIDUwNDogJ0dhdGV3YXkgVGltZW91dCcsXG4gICAgNTA1OiAnSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWQnXG59O1xuXG5mdW5jdGlvbiBXZWJTb2NrZXRSZXF1ZXN0KHNvY2tldCwgaHR0cFJlcXVlc3QsIHNlcnZlckNvbmZpZykge1xuICAgIC8vIFN1cGVyY2xhc3MgQ29uc3RydWN0b3JcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIHRoaXMuaHR0cFJlcXVlc3QgPSBodHRwUmVxdWVzdDtcbiAgICB0aGlzLnJlc291cmNlID0gaHR0cFJlcXVlc3QudXJsO1xuICAgIHRoaXMucmVtb3RlQWRkcmVzcyA9IHNvY2tldC5yZW1vdGVBZGRyZXNzO1xuICAgIHRoaXMucmVtb3RlQWRkcmVzc2VzID0gW3RoaXMucmVtb3RlQWRkcmVzc107XG4gICAgdGhpcy5zZXJ2ZXJDb25maWcgPSBzZXJ2ZXJDb25maWc7XG4gICAgXG4gICAgLy8gV2F0Y2ggZm9yIHRoZSB1bmRlcmx5aW5nIFRDUCBzb2NrZXQgY2xvc2luZyBiZWZvcmUgd2UgY2FsbCBhY2NlcHRcbiAgICB0aGlzLl9zb2NrZXRJc0Nsb3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9zb2NrZXRDbG9zZUhhbmRsZXIgPSB0aGlzLl9oYW5kbGVTb2NrZXRDbG9zZUJlZm9yZUFjY2VwdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdlbmQnLCB0aGlzLl9zb2NrZXRDbG9zZUhhbmRsZXIpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdjbG9zZScsIHRoaXMuX3NvY2tldENsb3NlSGFuZGxlcik7XG4gICAgXG4gICAgdGhpcy5fcmVzb2x2ZWQgPSBmYWxzZTtcbn1cblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRSZXF1ZXN0LCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5yZWFkSGFuZHNoYWtlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5odHRwUmVxdWVzdDtcblxuICAgIC8vIERlY29kZSBVUkxcbiAgICB0aGlzLnJlc291cmNlVVJMID0gdXJsLnBhcnNlKHRoaXMucmVzb3VyY2UsIHRydWUpO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVxdWVzdC5oZWFkZXJzWydob3N0J107XG4gICAgaWYgKCF0aGlzLmhvc3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgbXVzdCBwcm92aWRlIGEgSG9zdCBoZWFkZXIuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSByZXF1ZXN0LmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQta2V5J107XG4gICAgaWYgKCF0aGlzLmtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBtdXN0IHByb3ZpZGUgYSB2YWx1ZSBmb3IgU2VjLVdlYlNvY2tldC1LZXkuJyk7XG4gICAgfVxuXG4gICAgdGhpcy53ZWJTb2NrZXRWZXJzaW9uID0gcGFyc2VJbnQocmVxdWVzdC5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXZlcnNpb24nXSwgMTApO1xuXG4gICAgaWYgKCF0aGlzLndlYlNvY2tldFZlcnNpb24gfHwgaXNOYU4odGhpcy53ZWJTb2NrZXRWZXJzaW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBtdXN0IHByb3ZpZGUgYSB2YWx1ZSBmb3IgU2VjLVdlYlNvY2tldC1WZXJzaW9uLicpO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy53ZWJTb2NrZXRWZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHdlYnNvY2tldCBjbGllbnQgdmVyc2lvbjogJyArIHRoaXMud2ViU29ja2V0VmVyc2lvbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnT25seSB2ZXJzaW9ucyA4IGFuZCAxMyBhcmUgc3VwcG9ydGVkLicpO1xuICAgICAgICAgICAgZS5odHRwQ29kZSA9IDQyNjtcbiAgICAgICAgICAgIGUuaGVhZGVycyA9IHtcbiAgICAgICAgICAgICAgICAnU2VjLVdlYlNvY2tldC1WZXJzaW9uJzogJzEzJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2ViU29ja2V0VmVyc2lvbiA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXF1ZXN0LmhlYWRlcnNbJ29yaWdpbiddO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLndlYlNvY2tldFZlcnNpb24gPT09IDgpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXF1ZXN0LmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtb3JpZ2luJ107XG4gICAgfVxuXG4gICAgLy8gUHJvdG9jb2wgaXMgb3B0aW9uYWwuXG4gICAgdmFyIHByb3RvY29sU3RyaW5nID0gcmVxdWVzdC5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXByb3RvY29sJ107XG4gICAgdGhpcy5wcm90b2NvbEZ1bGxDYXNlTWFwID0ge307XG4gICAgdGhpcy5yZXF1ZXN0ZWRQcm90b2NvbHMgPSBbXTtcbiAgICBpZiAocHJvdG9jb2xTdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RlZFByb3RvY29sc0Z1bGxDYXNlID0gcHJvdG9jb2xTdHJpbmcuc3BsaXQoaGVhZGVyVmFsdWVTcGxpdFJlZ0V4cCk7XG4gICAgICAgIHJlcXVlc3RlZFByb3RvY29sc0Z1bGxDYXNlLmZvckVhY2goZnVuY3Rpb24ocHJvdG9jb2wpIHtcbiAgICAgICAgICAgIHZhciBsY1Byb3RvY29sID0gcHJvdG9jb2wudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHNlbGYucmVxdWVzdGVkUHJvdG9jb2xzLnB1c2gobGNQcm90b2NvbCk7XG4gICAgICAgICAgICBzZWxmLnByb3RvY29sRnVsbENhc2VNYXBbbGNQcm90b2NvbF0gPSBwcm90b2NvbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNlcnZlckNvbmZpZy5pZ25vcmVYRm9yd2FyZGVkRm9yICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ10pIHtcbiAgICAgICAgdmFyIGltbWVkaWF0ZVBlZXJJUCA9IHRoaXMucmVtb3RlQWRkcmVzcztcbiAgICAgICAgdGhpcy5yZW1vdGVBZGRyZXNzZXMgPSByZXF1ZXN0LmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWZvciddXG4gICAgICAgICAgICAuc3BsaXQoeEZvcndhcmRlZEZvclNlcGFyYXRvclJlZ0V4cCk7XG4gICAgICAgIHRoaXMucmVtb3RlQWRkcmVzc2VzLnB1c2goaW1tZWRpYXRlUGVlcklQKTtcbiAgICAgICAgdGhpcy5yZW1vdGVBZGRyZXNzID0gdGhpcy5yZW1vdGVBZGRyZXNzZXNbMF07XG4gICAgfVxuXG4gICAgLy8gRXh0ZW5zaW9ucyBhcmUgb3B0aW9uYWwuXG4gICAgdmFyIGV4dGVuc2lvbnNTdHJpbmcgPSByZXF1ZXN0LmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtZXh0ZW5zaW9ucyddO1xuICAgIHRoaXMucmVxdWVzdGVkRXh0ZW5zaW9ucyA9IHRoaXMucGFyc2VFeHRlbnNpb25zKGV4dGVuc2lvbnNTdHJpbmcpO1xuXG4gICAgLy8gQ29va2llcyBhcmUgb3B0aW9uYWxcbiAgICB2YXIgY29va2llU3RyaW5nID0gcmVxdWVzdC5oZWFkZXJzWydjb29raWUnXTtcbiAgICB0aGlzLmNvb2tpZXMgPSB0aGlzLnBhcnNlQ29va2llcyhjb29raWVTdHJpbmcpO1xufTtcblxuV2ViU29ja2V0UmVxdWVzdC5wcm90b3R5cGUucGFyc2VFeHRlbnNpb25zID0gZnVuY3Rpb24oZXh0ZW5zaW9uc1N0cmluZykge1xuICAgIGlmICghZXh0ZW5zaW9uc1N0cmluZyB8fCBleHRlbnNpb25zU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHZhciBleHRlbnNpb25zID0gZXh0ZW5zaW9uc1N0cmluZy50b0xvY2FsZUxvd2VyQ2FzZSgpLnNwbGl0KGhlYWRlclZhbHVlU3BsaXRSZWdFeHApO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24sIGluZGV4LCBhcnJheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gZXh0ZW5zaW9uLnNwbGl0KGhlYWRlclBhcmFtU3BsaXRSZWdFeHApO1xuICAgICAgICB2YXIgZXh0ZW5zaW9uTmFtZSA9IHBhcmFtc1swXTtcbiAgICAgICAgdmFyIGV4dGVuc2lvblBhcmFtcyA9IHBhcmFtcy5zbGljZSgxKTtcbiAgICAgICAgZXh0ZW5zaW9uUGFyYW1zLmZvckVhY2goZnVuY3Rpb24ocmF3UGFyYW0sIGluZGV4LCBhcnJheSkge1xuICAgICAgICAgICAgdmFyIGFyciA9IHJhd1BhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGFyclswXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXJyWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxLCBvYmopO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgIG5hbWU6IGV4dGVuc2lvbk5hbWUsXG4gICAgICAgICAgICBwYXJhbXM6IGV4dGVuc2lvblBhcmFtc1xuICAgICAgICB9O1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG9iaik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGV4dGVuc2lvbnM7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGFkYXB0ZWQgZnJvbSBub2RlLWNvb2tpZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NodHlsbWFuL25vZGUtY29va2llXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5wYXJzZUNvb2tpZXMgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAvLyBTYW5pdHkgQ2hlY2tcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Yoc3RyKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHZhciBjb29raWVzID0gW107XG4gICAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KGNvb2tpZVNlcGFyYXRvclJlZ0V4KTtcblxuICAgIHBhaXJzLmZvckVhY2goZnVuY3Rpb24ocGFpcikge1xuICAgICAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgICAgIGlmIChlcV9pZHggPT09IC0xKSB7XG4gICAgICAgICAgICBjb29raWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBhaXIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpO1xuICAgICAgICB2YXIgdmFsID0gcGFpci5zdWJzdHIoKytlcV9pZHgsIHBhaXIubGVuZ3RoKS50cmltKCk7XG5cbiAgICAgICAgLy8gcXVvdGVkIHZhbHVlc1xuICAgICAgICBpZiAoJ1wiJyA9PT0gdmFsWzBdKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMSwgLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29va2llcy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiBkZWNvZGVVUklDb21wb25lbnQodmFsKVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb29raWVzO1xufTtcblxuV2ViU29ja2V0UmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24oYWNjZXB0ZWRQcm90b2NvbCwgYWxsb3dlZE9yaWdpbiwgY29va2llcykge1xuICAgIHRoaXMuX3ZlcmlmeVJlc29sdXRpb24oKTtcbiAgICBcbiAgICAvLyBUT0RPOiBIYW5kbGUgZXh0ZW5zaW9uc1xuXG4gICAgdmFyIHByb3RvY29sRnVsbENhc2U7XG5cbiAgICBpZiAoYWNjZXB0ZWRQcm90b2NvbCkge1xuICAgICAgICBwcm90b2NvbEZ1bGxDYXNlID0gdGhpcy5wcm90b2NvbEZ1bGxDYXNlTWFwW2FjY2VwdGVkUHJvdG9jb2wudG9Mb2NhbGVMb3dlckNhc2UoKV07XG4gICAgICAgIGlmICh0eXBlb2YocHJvdG9jb2xGdWxsQ2FzZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwcm90b2NvbEZ1bGxDYXNlID0gYWNjZXB0ZWRQcm90b2NvbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcHJvdG9jb2xGdWxsQ2FzZSA9IGFjY2VwdGVkUHJvdG9jb2w7XG4gICAgfVxuICAgIHRoaXMucHJvdG9jb2xGdWxsQ2FzZU1hcCA9IG51bGw7XG5cbiAgICAvLyBDcmVhdGUga2V5IHZhbGlkYXRpb24gaGFzaFxuICAgIHZhciBzaGExID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTEnKTtcbiAgICBzaGExLnVwZGF0ZSh0aGlzLmtleSArICcyNThFQUZBNS1FOTE0LTQ3REEtOTVDQS1DNUFCMERDODVCMTEnKTtcbiAgICB2YXIgYWNjZXB0S2V5ID0gc2hhMS5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgdmFyIHJlc3BvbnNlID0gJ0hUVFAvMS4xIDEwMSBTd2l0Y2hpbmcgUHJvdG9jb2xzXFxyXFxuJyArXG4gICAgICAgICAgICAgICAgICAgJ1VwZ3JhZGU6IHdlYnNvY2tldFxcclxcbicgK1xuICAgICAgICAgICAgICAgICAgICdDb25uZWN0aW9uOiBVcGdyYWRlXFxyXFxuJyArXG4gICAgICAgICAgICAgICAgICAgJ1NlYy1XZWJTb2NrZXQtQWNjZXB0OiAnICsgYWNjZXB0S2V5ICsgJ1xcclxcbic7XG5cbiAgICBpZiAocHJvdG9jb2xGdWxsQ2FzZSkge1xuICAgICAgICAvLyB2YWxpZGF0ZSBwcm90b2NvbFxuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBwcm90b2NvbEZ1bGxDYXNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGUgPSBwcm90b2NvbEZ1bGxDYXNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gcHJvdG9jb2xGdWxsQ2FzZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAweDIxIHx8IGNoYXJDb2RlID4gMHg3RSB8fCBzZXBhcmF0b3JzLmluZGV4T2YoY2hhcmFjdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjaGFyYWN0ZXIgXCInICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyYWN0ZXIpICsgJ1wiIGluIHN1YnByb3RvY29sLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RlZFByb3RvY29scy5pbmRleE9mKGFjY2VwdGVkUHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3BlY2lmaWVkIHByb3RvY29sIHdhcyBub3QgcmVxdWVzdGVkIGJ5IHRoZSBjbGllbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90b2NvbEZ1bGxDYXNlID0gcHJvdG9jb2xGdWxsQ2FzZS5yZXBsYWNlKGhlYWRlclNhbml0aXplUmVnRXhwLCAnJyk7XG4gICAgICAgIHJlc3BvbnNlICs9ICdTZWMtV2ViU29ja2V0LVByb3RvY29sOiAnICsgcHJvdG9jb2xGdWxsQ2FzZSArICdcXHJcXG4nO1xuICAgIH1cbiAgICB0aGlzLnJlcXVlc3RlZFByb3RvY29scyA9IG51bGw7XG5cbiAgICBpZiAoYWxsb3dlZE9yaWdpbikge1xuICAgICAgICBhbGxvd2VkT3JpZ2luID0gYWxsb3dlZE9yaWdpbi5yZXBsYWNlKGhlYWRlclNhbml0aXplUmVnRXhwLCAnJyk7XG4gICAgICAgIGlmICh0aGlzLndlYlNvY2tldFZlcnNpb24gPT09IDEzKSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSAnT3JpZ2luOiAnICsgYWxsb3dlZE9yaWdpbiArICdcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMud2ViU29ja2V0VmVyc2lvbiA9PT0gOCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gJ1NlYy1XZWJTb2NrZXQtT3JpZ2luOiAnICsgYWxsb3dlZE9yaWdpbiArICdcXHJcXG4nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvb2tpZXMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvb2tpZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgXCJjb29raWVzXCIgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VlbkNvb2tpZXMgPSB7fTtcbiAgICAgICAgY29va2llcy5mb3JFYWNoKGZ1bmN0aW9uKGNvb2tpZSkge1xuICAgICAgICAgICAgaWYgKCFjb29raWUubmFtZSB8fCAhY29va2llLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VhY2ggY29va2llIHRvIHNldCBtdXN0IGF0IGxlYXN0IHByb3ZpZGUgYSBcIm5hbWVcIiBhbmQgXCJ2YWx1ZVwiJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gXFxyXFxuIHNlcXVlbmNlcyBpbnNlcnRlZFxuICAgICAgICAgICAgY29va2llLm5hbWUgPSBjb29raWUubmFtZS5yZXBsYWNlKGNvbnRyb2xDaGFyc0FuZFNlbWljb2xvblJlZ0V4LCAnJyk7XG4gICAgICAgICAgICBjb29raWUudmFsdWUgPSBjb29raWUudmFsdWUucmVwbGFjZShjb250cm9sQ2hhcnNBbmRTZW1pY29sb25SZWdFeCwgJycpO1xuXG4gICAgICAgICAgICBpZiAoc2VlbkNvb2tpZXNbY29va2llLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IHNwZWNpZnkgdGhlIHNhbWUgY29va2llIG5hbWUgdHdpY2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWVuQ29va2llc1tjb29raWUubmFtZV0gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyB0b2tlbiAoUkZDIDI2MTYsIFNlY3Rpb24gMi4yKVxuICAgICAgICAgICAgdmFyIGludmFsaWRDaGFyID0gY29va2llLm5hbWUubWF0Y2goY29va2llTmFtZVZhbGlkYXRlUmVnRXgpO1xuICAgICAgICAgICAgaWYgKGludmFsaWRDaGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgY2hhcmFjdGVyICcgKyBpbnZhbGlkQ2hhclswXSArICcgaW4gY29va2llIG5hbWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUkZDIDYyNjUsIFNlY3Rpb24gNC4xLjFcbiAgICAgICAgICAgIC8vICpjb29raWUtb2N0ZXQgLyAoIERRVU9URSAqY29va2llLW9jdGV0IERRVU9URSApIHwgJXgyMSAvICV4MjMtMkIgLyAleDJELTNBIC8gJXgzQy01QiAvICV4NUQtN0VcbiAgICAgICAgICAgIGlmIChjb29raWUudmFsdWUubWF0Y2goY29va2llVmFsdWVEUXVvdGVWYWxpZGF0ZVJlZ0V4KSkge1xuICAgICAgICAgICAgICAgIGludmFsaWRDaGFyID0gY29va2llLnZhbHVlLnNsaWNlKDEsIC0xKS5tYXRjaChjb29raWVWYWx1ZVZhbGlkYXRlUmVnRXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ2hhciA9IGNvb2tpZS52YWx1ZS5tYXRjaChjb29raWVWYWx1ZVZhbGlkYXRlUmVnRXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGludmFsaWRDaGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgY2hhcmFjdGVyICcgKyBpbnZhbGlkQ2hhclswXSArICcgaW4gY29va2llIHZhbHVlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb29raWVQYXJ0cyA9IFtjb29raWUubmFtZSArICc9JyArIGNvb2tpZS52YWx1ZV07XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4xXG4gICAgICAgICAgICAvLyAnUGF0aD0nIHBhdGgtdmFsdWUgfCA8YW55IENIQVIgZXhjZXB0IENUTHMgb3IgJzsnPlxuICAgICAgICAgICAgaWYoY29va2llLnBhdGgpe1xuICAgICAgICAgICAgICAgIGludmFsaWRDaGFyID0gY29va2llLnBhdGgubWF0Y2goY29udHJvbENoYXJzQW5kU2VtaWNvbG9uUmVnRXgpO1xuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgY2hhcmFjdGVyICcgKyBpbnZhbGlkQ2hhclswXSArICcgaW4gY29va2llIHBhdGgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29va2llUGFydHMucHVzaCgnUGF0aD0nICsgY29va2llLnBhdGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSRkMgNjI2NSwgU2VjdGlvbiA0LjEuMi4zXG4gICAgICAgICAgICAvLyAnRG9tYWluPScgc3ViZG9tYWluXG4gICAgICAgICAgICBpZiAoY29va2llLmRvbWFpbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29va2llLmRvbWFpbikgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRG9tYWluIG11c3QgYmUgc3BlY2lmaWVkIGFuZCBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnZhbGlkQ2hhciA9IGNvb2tpZS5kb21haW4ubWF0Y2goY29udHJvbENoYXJzQW5kU2VtaWNvbG9uUmVnRXgpO1xuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgY2hhcmFjdGVyICcgKyBpbnZhbGlkQ2hhclswXSArICcgaW4gY29va2llIGRvbWFpbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb29raWVQYXJ0cy5wdXNoKCdEb21haW49JyArIGNvb2tpZS5kb21haW4udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4xXG4gICAgICAgICAgICAvLydFeHBpcmVzPScgc2FuZS1jb29raWUtZGF0ZSB8IEZvcmNlIERhdGUgb2JqZWN0IHJlcXVpcmVtZW50IGJ5IHVzaW5nIG9ubHkgZXBvY2hcbiAgICAgICAgICAgIGlmIChjb29raWUuZXhwaXJlcykge1xuICAgICAgICAgICAgICAgIGlmICghKGNvb2tpZS5leHBpcmVzIGluc3RhbmNlb2YgRGF0ZSkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciBjb29raWUgXCJleHBpcmVzXCIgbXVzdCBiZSBhIHZhaWxkIGRhdGUgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvb2tpZVBhcnRzLnB1c2goJ0V4cGlyZXM9JyArIGNvb2tpZS5leHBpcmVzLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSRkMgNjI2NSwgU2VjdGlvbiA0LjEuMVxuICAgICAgICAgICAgLy8nTWF4LUFnZT0nIG5vbi16ZXJvLWRpZ2l0ICpESUdJVFxuICAgICAgICAgICAgaWYgKGNvb2tpZS5tYXhhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF4YWdlID0gY29va2llLm1heGFnZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1heGFnZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heGFnZSA9IHBhcnNlSW50KG1heGFnZSwgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWF4YWdlKSB8fCBtYXhhZ2UgPD0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgY29va2llIFwibWF4YWdlXCIgbXVzdCBiZSBhIG5vbi16ZXJvIG51bWJlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXhhZ2UgPSBNYXRoLnJvdW5kKG1heGFnZSk7XG4gICAgICAgICAgICAgICAgY29va2llUGFydHMucHVzaCgnTWF4LUFnZT0nICsgbWF4YWdlLnRvU3RyaW5nKDEwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4xXG4gICAgICAgICAgICAvLydTZWN1cmU7J1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5zZWN1cmUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvb2tpZS5zZWN1cmUpICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgY29va2llIFwic2VjdXJlXCIgbXVzdCBiZSBvZiB0eXBlIGJvb2xlYW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29va2llUGFydHMucHVzaCgnU2VjdXJlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4xXG4gICAgICAgICAgICAvLydIdHRwT25seTsnXG4gICAgICAgICAgICBpZiAoY29va2llLmh0dHBvbmx5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb29raWUuaHR0cG9ubHkpICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgY29va2llIFwiaHR0cG9ubHlcIiBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb29raWVQYXJ0cy5wdXNoKCdIdHRwT25seScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZSArPSAoJ1NldC1Db29raWU6ICcgKyBjb29raWVQYXJ0cy5qb2luKCc7JykgKyAnXFxyXFxuJyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogaGFuZGxlIG5lZ290aWF0ZWQgZXh0ZW5zaW9uc1xuICAgIC8vIGlmIChuZWdvdGlhdGVkRXh0ZW5zaW9ucykge1xuICAgIC8vICAgICByZXNwb25zZSArPSAnU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zOiAnICsgbmVnb3RpYXRlZEV4dGVuc2lvbnMuam9pbignLCAnKSArICdcXHJcXG4nO1xuICAgIC8vIH1cbiAgICBcbiAgICAvLyBNYXJrIHRoZSByZXF1ZXN0IHJlc29sdmVkIG5vdyBzbyB0aGF0IHRoZSB1c2VyIGNhbid0IGNhbGwgYWNjZXB0IG9yXG4gICAgLy8gcmVqZWN0IGEgc2Vjb25kIHRpbWUuXG4gICAgdGhpcy5fcmVzb2x2ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdCgncmVxdWVzdFJlc29sdmVkJywgdGhpcyk7XG4gICAgXG4gICAgcmVzcG9uc2UgKz0gJ1xcclxcbic7XG5cbiAgICB2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXRDb25uZWN0aW9uKHRoaXMuc29ja2V0LCBbXSwgYWNjZXB0ZWRQcm90b2NvbCwgZmFsc2UsIHRoaXMuc2VydmVyQ29uZmlnKTtcbiAgICBjb25uZWN0aW9uLndlYlNvY2tldFZlcnNpb24gPSB0aGlzLndlYlNvY2tldFZlcnNpb247XG4gICAgY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzID0gdGhpcy5yZW1vdGVBZGRyZXNzO1xuICAgIGNvbm5lY3Rpb24ucmVtb3RlQWRkcmVzc2VzID0gdGhpcy5yZW1vdGVBZGRyZXNzZXM7XG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIGlmICh0aGlzLl9zb2NrZXRJc0Nsb3NpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0aGUgY2xpZW50IGhhbmdzIHVwIGJlZm9yZSB3ZSBnZXQgYSBjaGFuY2UgdG9cbiAgICAgICAgLy8gYWNjZXB0IHRoZSBjb25uZWN0aW9uIGFuZCBzZW5kIG91ciBzaWRlIG9mIHRoZSBvcGVuaW5nIGhhbmRzaGFrZS5cbiAgICAgICAgY2xlYW51cEZhaWxlZENvbm5lY3Rpb24oY29ubmVjdGlvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNvY2tldC53cml0ZShyZXNwb25zZSwgJ2FzY2lpJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNsZWFudXBGYWlsZWRDb25uZWN0aW9uKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2VsZi5fcmVtb3ZlU29ja2V0Q2xvc2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uX2FkZFNvY2tldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdCgncmVxdWVzdEFjY2VwdGVkJywgY29ubmVjdGlvbik7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG59O1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbihzdGF0dXMsIHJlYXNvbiwgZXh0cmFIZWFkZXJzKSB7XG4gICAgdGhpcy5fdmVyaWZ5UmVzb2x1dGlvbigpO1xuICAgIFxuICAgIC8vIE1hcmsgdGhlIHJlcXVlc3QgcmVzb2x2ZWQgbm93IHNvIHRoYXQgdGhlIHVzZXIgY2FuJ3QgY2FsbCBhY2NlcHQgb3JcbiAgICAvLyByZWplY3QgYSBzZWNvbmQgdGltZS5cbiAgICB0aGlzLl9yZXNvbHZlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KCdyZXF1ZXN0UmVzb2x2ZWQnLCB0aGlzKTtcbiAgICBcbiAgICBpZiAodHlwZW9mKHN0YXR1cykgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHN0YXR1cyA9IDQwMztcbiAgICB9XG4gICAgdmFyIHJlc3BvbnNlID0gJ0hUVFAvMS4xICcgKyBzdGF0dXMgKyAnICcgKyBodHRwU3RhdHVzRGVzY3JpcHRpb25zW3N0YXR1c10gKyAnXFxyXFxuJyArXG4gICAgICAgICAgICAgICAgICAgJ0Nvbm5lY3Rpb246IGNsb3NlXFxyXFxuJztcbiAgICBpZiAocmVhc29uKSB7XG4gICAgICAgIHJlYXNvbiA9IHJlYXNvbi5yZXBsYWNlKGhlYWRlclNhbml0aXplUmVnRXhwLCAnJyk7XG4gICAgICAgIHJlc3BvbnNlICs9ICdYLVdlYlNvY2tldC1SZWplY3QtUmVhc29uOiAnICsgcmVhc29uICsgJ1xcclxcbic7XG4gICAgfVxuXG4gICAgaWYgKGV4dHJhSGVhZGVycykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICB2YXIgc2FuaXRpemVkVmFsdWUgPSBleHRyYUhlYWRlcnNba2V5XS50b1N0cmluZygpLnJlcGxhY2UoaGVhZGVyU2FuaXRpemVSZWdFeHAsICcnKTtcbiAgICAgICAgICAgIHZhciBzYW5pdGl6ZWRLZXkgPSBrZXkucmVwbGFjZShoZWFkZXJTYW5pdGl6ZVJlZ0V4cCwgJycpO1xuICAgICAgICAgICAgcmVzcG9uc2UgKz0gKHNhbml0aXplZEtleSArICc6ICcgKyBzYW5pdGl6ZWRWYWx1ZSArICdcXHJcXG4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3BvbnNlICs9ICdcXHJcXG4nO1xuICAgIHRoaXMuc29ja2V0LmVuZChyZXNwb25zZSwgJ2FzY2lpJyk7XG5cbiAgICB0aGlzLmVtaXQoJ3JlcXVlc3RSZWplY3RlZCcsIHRoaXMpO1xufTtcblxuV2ViU29ja2V0UmVxdWVzdC5wcm90b3R5cGUuX2hhbmRsZVNvY2tldENsb3NlQmVmb3JlQWNjZXB0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc29ja2V0SXNDbG9zaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW1vdmVTb2NrZXRDbG9zZUxpc3RlbmVycygpO1xufTtcblxuV2ViU29ja2V0UmVxdWVzdC5wcm90b3R5cGUuX3JlbW92ZVNvY2tldENsb3NlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHRoaXMuX3NvY2tldENsb3NlSGFuZGxlcik7XG4gICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgdGhpcy5fc29ja2V0Q2xvc2VIYW5kbGVyKTtcbn07XG5cbldlYlNvY2tldFJlcXVlc3QucHJvdG90eXBlLl92ZXJpZnlSZXNvbHV0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3Jlc29sdmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0UmVxdWVzdCBtYXkgb25seSBiZSBhY2NlcHRlZCBvciByZWplY3RlZCBvbmUgdGltZS4nKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjbGVhbnVwRmFpbGVkQ29ubmVjdGlvbihjb25uZWN0aW9uKSB7XG4gICAgLy8gU2luY2Ugd2UgaGF2ZSB0byByZXR1cm4gYSBjb25uZWN0aW9uIG9iamVjdCBldmVuIGlmIHRoZSBzb2NrZXQgaXNcbiAgICAvLyBhbHJlYWR5IGRlYWQgaW4gb3JkZXIgbm90IHRvIGJyZWFrIHRoZSBBUEksIHdlIHNjaGVkdWxlIGEgJ2Nsb3NlJ1xuICAgIC8vIGV2ZW50IG9uIHRoZSBjb25uZWN0aW9uIG9iamVjdCB0byBvY2N1ciBpbW1lZGlhdGVseS5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9BQk5PUk1BTCA9IDEwMDZcbiAgICAgICAgLy8gVGhpcmQgcGFyYW06IFNraXAgc2VuZGluZyB0aGUgY2xvc2UgZnJhbWUgdG8gYSBkZWFkIHNvY2tldFxuICAgICAgICBjb25uZWN0aW9uLmRyb3AoMTAwNiwgJ1RDUCBjb25uZWN0aW9uIGxvc3QgYmVmb3JlIGhhbmRzaGFrZSBjb21wbGV0ZWQuJywgdHJ1ZSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0UmVxdWVzdDtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5leHRlbmQ7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgV2ViU29ja2V0Um91dGVyUmVxdWVzdCA9IHJlcXVpcmUoJy4vV2ViU29ja2V0Um91dGVyUmVxdWVzdCcpO1xuXG5mdW5jdGlvbiBXZWJTb2NrZXRSb3V0ZXIoY29uZmlnKSB7XG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgIC8vIFRoZSBXZWJTb2NrZXRTZXJ2ZXIgaW5zdGFuY2UgdG8gYXR0YWNoIHRvLlxuICAgICAgICBzZXJ2ZXI6IG51bGxcbiAgICB9O1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgZXh0ZW5kKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG5cbiAgICB0aGlzLl9yZXF1ZXN0SGFuZGxlciA9IHRoaXMuaGFuZGxlUmVxdWVzdC5iaW5kKHRoaXMpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5zZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hTZXJ2ZXIodGhpcy5jb25maWcuc2VydmVyKTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoV2ViU29ja2V0Um91dGVyLCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLmF0dGFjaFNlcnZlciA9IGZ1bmN0aW9uKHNlcnZlcikge1xuICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKCdyZXF1ZXN0JywgdGhpcy5fcmVxdWVzdEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGEgV2ViU29ja2V0U2VydmVyIGluc3RhbmNlIHRvIGF0dGFjaCB0by4nKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLmRldGFjaFNlcnZlciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgICB0aGlzLnNlcnZlci5yZW1vdmVMaXN0ZW5lcigncmVxdWVzdCcsIHRoaXMuX3JlcXVlc3RIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZGV0YWNoIGZyb20gc2VydmVyOiBub3QgYXR0YWNoZWQuJyk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Um91dGVyLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uKHBhdGgsIHByb3RvY29sLCBjYWxsYmFjaykge1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYSBwYXRoIGZvciB0aGlzIGhhbmRsZXIuJyk7XG4gICAgfVxuICAgIGlmICghcHJvdG9jb2wpIHtcbiAgICAgICAgcHJvdG9jb2wgPSAnX19fX25vX3Byb3RvY29sX19fXyc7XG4gICAgfVxuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGEgY2FsbGJhY2sgZm9yIHRoaXMgaGFuZGxlci4nKTtcbiAgICB9XG5cbiAgICBwYXRoID0gdGhpcy5wYXRoVG9SZWdFeHAocGF0aCk7XG4gICAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXRoIG11c3QgYmUgc3BlY2lmaWVkIGFzIGVpdGhlciBhIHN0cmluZyBvciBhIFJlZ0V4cC4nKTtcbiAgICB9XG4gICAgdmFyIHBhdGhTdHJpbmcgPSBwYXRoLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBub3JtYWxpemUgcHJvdG9jb2wgdG8gbG93ZXItY2FzZVxuICAgIHByb3RvY29sID0gcHJvdG9jb2wudG9Mb2NhbGVMb3dlckNhc2UoKTtcblxuICAgIGlmICh0aGlzLmZpbmRIYW5kbGVySW5kZXgocGF0aFN0cmluZywgcHJvdG9jb2wpICE9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgb25seSBtb3VudCBvbmUgaGFuZGxlciBwZXIgcGF0aC9wcm90b2NvbCBjb21iaW5hdGlvbi4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgICAncGF0aCc6IHBhdGgsXG4gICAgICAgICdwYXRoU3RyaW5nJzogcGF0aFN0cmluZyxcbiAgICAgICAgJ3Byb3RvY29sJzogcHJvdG9jb2wsXG4gICAgICAgICdjYWxsYmFjayc6IGNhbGxiYWNrXG4gICAgfSk7XG59O1xuV2ViU29ja2V0Um91dGVyLnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24ocGF0aCwgcHJvdG9jb2wpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZpbmRIYW5kbGVySW5kZXgodGhpcy5wYXRoVG9SZWdFeHAocGF0aCkudG9TdHJpbmcoKSwgcHJvdG9jb2wpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCBhIHJvdXRlIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgcGF0aCBhbmQgcHJvdG9jb2wuJyk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Um91dGVyLnByb3RvdHlwZS5maW5kSGFuZGxlckluZGV4ID0gZnVuY3Rpb24ocGF0aFN0cmluZywgcHJvdG9jb2wpIHtcbiAgICBwcm90b2NvbCA9IHByb3RvY29sLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgZm9yICh2YXIgaT0wLCBsZW49dGhpcy5oYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbaV07XG4gICAgICAgIGlmIChoYW5kbGVyLnBhdGhTdHJpbmcgPT09IHBhdGhTdHJpbmcgJiYgaGFuZGxlci5wcm90b2NvbCA9PT0gcHJvdG9jb2wpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbldlYlNvY2tldFJvdXRlci5wcm90b3R5cGUucGF0aFRvUmVnRXhwID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmICh0eXBlb2YocGF0aCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChwYXRoID09PSAnKicpIHtcbiAgICAgICAgICAgIHBhdGggPSAvXi4qJC87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICAgICAgICAgICAgcGF0aCA9IG5ldyBSZWdFeHAoJ14nICsgcGF0aCArICckJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59O1xuXG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLmhhbmRsZVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgdmFyIHJlcXVlc3RlZFByb3RvY29scyA9IHJlcXVlc3QucmVxdWVzdGVkUHJvdG9jb2xzO1xuICAgIGlmIChyZXF1ZXN0ZWRQcm90b2NvbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlcXVlc3RlZFByb3RvY29scyA9IFsnX19fX25vX3Byb3RvY29sX19fXyddO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYSBoYW5kbGVyIHdpdGggdGhlIGZpcnN0IHJlcXVlc3RlZCBwcm90b2NvbCBmaXJzdFxuICAgIGZvciAodmFyIGk9MDsgaSA8IHJlcXVlc3RlZFByb3RvY29scy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVxdWVzdGVkUHJvdG9jb2wgPSByZXF1ZXN0ZWRQcm90b2NvbHNbaV0udG9Mb2NhbGVMb3dlckNhc2UoKTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBoYW5kbGVyIHRoYXQgY2FuIHByb2Nlc3MgdGhpcyByZXF1ZXN0XG4gICAgICAgIGZvciAodmFyIGo9MCwgbGVuPXRoaXMuaGFuZGxlcnMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1tqXTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLnBhdGgudGVzdChyZXF1ZXN0LnJlc291cmNlVVJMLnBhdGhuYW1lKSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0ZWRQcm90b2NvbCA9PT0gaGFuZGxlci5wcm90b2NvbCB8fFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLnByb3RvY29sID09PSAnKicpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91dGVyUmVxdWVzdCA9IG5ldyBXZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0KHJlcXVlc3QsIHJlcXVlc3RlZFByb3RvY29sKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhyb3V0ZXJSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlIGdldCBoZXJlIHdlIHdlcmUgdW5hYmxlIHRvIGZpbmQgYSBzdWl0YWJsZSBoYW5kbGVyLlxuICAgIHJlcXVlc3QucmVqZWN0KDQwNCwgJ05vIGhhbmRsZXIgaXMgYXZhaWxhYmxlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdC4nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0Um91dGVyO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogIENvcHlyaWdodCAyMDEwLTIwMTUgQnJpYW4gTWNLZWx2ZXkuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmZ1bmN0aW9uIFdlYlNvY2tldFJvdXRlclJlcXVlc3Qod2ViU29ja2V0UmVxdWVzdCwgcmVzb2x2ZWRQcm90b2NvbCkge1xuICAgIC8vIFN1cGVyY2xhc3MgQ29uc3RydWN0b3JcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMud2ViU29ja2V0UmVxdWVzdCA9IHdlYlNvY2tldFJlcXVlc3Q7XG4gICAgaWYgKHJlc29sdmVkUHJvdG9jb2wgPT09ICdfX19fbm9fcHJvdG9jb2xfX19fJykge1xuICAgICAgICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSByZXNvbHZlZFByb3RvY29sO1xuICAgIH1cbiAgICB0aGlzLm9yaWdpbiA9IHdlYlNvY2tldFJlcXVlc3Qub3JpZ2luO1xuICAgIHRoaXMucmVzb3VyY2UgPSB3ZWJTb2NrZXRSZXF1ZXN0LnJlc291cmNlO1xuICAgIHRoaXMucmVzb3VyY2VVUkwgPSB3ZWJTb2NrZXRSZXF1ZXN0LnJlc291cmNlVVJMO1xuICAgIHRoaXMuaHR0cFJlcXVlc3QgPSB3ZWJTb2NrZXRSZXF1ZXN0Lmh0dHBSZXF1ZXN0O1xuICAgIHRoaXMucmVtb3RlQWRkcmVzcyA9IHdlYlNvY2tldFJlcXVlc3QucmVtb3RlQWRkcmVzcztcbiAgICB0aGlzLndlYlNvY2tldFZlcnNpb24gPSB3ZWJTb2NrZXRSZXF1ZXN0LndlYlNvY2tldFZlcnNpb247XG4gICAgdGhpcy5yZXF1ZXN0ZWRFeHRlbnNpb25zID0gd2ViU29ja2V0UmVxdWVzdC5yZXF1ZXN0ZWRFeHRlbnNpb25zO1xuICAgIHRoaXMuY29va2llcyA9IHdlYlNvY2tldFJlcXVlc3QuY29va2llcztcbn1cblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0LCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihvcmlnaW4sIGNvb2tpZXMpIHtcbiAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMud2ViU29ja2V0UmVxdWVzdC5hY2NlcHQodGhpcy5wcm90b2NvbCwgb3JpZ2luLCBjb29raWVzKTtcbiAgICB0aGlzLmVtaXQoJ3JlcXVlc3RBY2NlcHRlZCcsIGNvbm5lY3Rpb24pO1xuICAgIHJldHVybiBjb25uZWN0aW9uO1xufTtcblxuV2ViU29ja2V0Um91dGVyUmVxdWVzdC5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24oc3RhdHVzLCByZWFzb24sIGV4dHJhSGVhZGVycykge1xuICAgIHRoaXMud2ViU29ja2V0UmVxdWVzdC5yZWplY3Qoc3RhdHVzLCByZWFzb24sIGV4dHJhSGVhZGVycyk7XG4gICAgdGhpcy5lbWl0KCdyZXF1ZXN0UmVqZWN0ZWQnLCB0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0Um91dGVyUmVxdWVzdDtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5leHRlbmQ7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3dlYnNvY2tldDpzZXJ2ZXInKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgV2ViU29ja2V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vV2ViU29ja2V0UmVxdWVzdCcpO1xuXG52YXIgV2ViU29ja2V0U2VydmVyID0gZnVuY3Rpb24gV2ViU29ja2V0U2VydmVyKGNvbmZpZykge1xuICAgIC8vIFN1cGVyY2xhc3MgQ29uc3RydWN0b3JcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuX2hhbmRsZXJzID0ge1xuICAgICAgICB1cGdyYWRlOiB0aGlzLmhhbmRsZVVwZ3JhZGUuYmluZCh0aGlzKSxcbiAgICAgICAgcmVxdWVzdEFjY2VwdGVkOiB0aGlzLmhhbmRsZVJlcXVlc3RBY2NlcHRlZC5iaW5kKHRoaXMpLFxuICAgICAgICByZXF1ZXN0UmVzb2x2ZWQ6IHRoaXMuaGFuZGxlUmVxdWVzdFJlc29sdmVkLmJpbmQodGhpcylcbiAgICB9O1xuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBbXTtcbiAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cyA9IFtdO1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgdGhpcy5tb3VudChjb25maWcpO1xuICAgIH1cbn07XG5cbnV0aWwuaW5oZXJpdHMoV2ViU29ja2V0U2VydmVyLCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgIC8vIFRoZSBodHRwIHNlcnZlciBpbnN0YW5jZSB0byBhdHRhY2ggdG8uICBSZXF1aXJlZC5cbiAgICAgICAgaHR0cFNlcnZlcjogbnVsbCxcblxuICAgICAgICAvLyA2NEtpQiBtYXggZnJhbWUgc2l6ZS5cbiAgICAgICAgbWF4UmVjZWl2ZWRGcmFtZVNpemU6IDB4MTAwMDAsXG5cbiAgICAgICAgLy8gMU1pQiBtYXggbWVzc2FnZSBzaXplLCBvbmx5IGFwcGxpY2FibGUgaWZcbiAgICAgICAgLy8gYXNzZW1ibGVGcmFnbWVudHMgaXMgdHJ1ZVxuICAgICAgICBtYXhSZWNlaXZlZE1lc3NhZ2VTaXplOiAweDEwMDAwMCxcblxuICAgICAgICAvLyBPdXRnb2luZyBtZXNzYWdlcyBsYXJnZXIgdGhhbiBmcmFnbWVudGF0aW9uVGhyZXNob2xkIHdpbGwgYmVcbiAgICAgICAgLy8gc3BsaXQgaW50byBtdWx0aXBsZSBmcmFnbWVudHMuXG4gICAgICAgIGZyYWdtZW50T3V0Z29pbmdNZXNzYWdlczogdHJ1ZSxcblxuICAgICAgICAvLyBPdXRnb2luZyBmcmFtZXMgYXJlIGZyYWdtZW50ZWQgaWYgdGhleSBleGNlZWQgdGhpcyB0aHJlc2hvbGQuXG4gICAgICAgIC8vIERlZmF1bHQgaXMgMTZLaUJcbiAgICAgICAgZnJhZ21lbnRhdGlvblRocmVzaG9sZDogMHg0MDAwLFxuXG4gICAgICAgIC8vIElmIHRydWUsIHRoZSBzZXJ2ZXIgd2lsbCBhdXRvbWF0aWNhbGx5IHNlbmQgYSBwaW5nIHRvIGFsbFxuICAgICAgICAvLyBjbGllbnRzIGV2ZXJ5ICdrZWVwYWxpdmVJbnRlcnZhbCcgbWlsbGlzZWNvbmRzLiAgVGhlIHRpbWVyIGlzXG4gICAgICAgIC8vIHJlc2V0IG9uIGFueSByZWNlaXZlZCBkYXRhIGZyb20gdGhlIGNsaWVudC5cbiAgICAgICAga2VlcGFsaXZlOiB0cnVlLFxuXG4gICAgICAgIC8vIFRoZSBpbnRlcnZhbCB0byBzZW5kIGtlZXBhbGl2ZSBwaW5ncyB0byBjb25uZWN0ZWQgY2xpZW50cyBpZiB0aGVcbiAgICAgICAgLy8gY29ubmVjdGlvbiBpcyBpZGxlLiAgQW55IHJlY2VpdmVkIGRhdGEgd2lsbCByZXNldCB0aGUgY291bnRlci5cbiAgICAgICAga2VlcGFsaXZlSW50ZXJ2YWw6IDIwMDAwLFxuXG4gICAgICAgIC8vIElmIHRydWUsIHRoZSBzZXJ2ZXIgd2lsbCBjb25zaWRlciBhbnkgY29ubmVjdGlvbiB0aGF0IGhhcyBub3RcbiAgICAgICAgLy8gcmVjZWl2ZWQgYW55IGRhdGEgd2l0aGluIHRoZSBhbW91bnQgb2YgdGltZSBzcGVjaWZpZWQgYnlcbiAgICAgICAgLy8gJ2tlZXBhbGl2ZUdyYWNlUGVyaW9kJyBhZnRlciBhIGtlZXBhbGl2ZSBwaW5nIGhhcyBiZWVuIHNlbnQgdG9cbiAgICAgICAgLy8gYmUgZGVhZCwgYW5kIHdpbGwgZHJvcCB0aGUgY29ubmVjdGlvbi5cbiAgICAgICAgLy8gSWdub3JlZCBpZiBrZWVwYWxpdmUgaXMgZmFsc2UuXG4gICAgICAgIGRyb3BDb25uZWN0aW9uT25LZWVwYWxpdmVUaW1lb3V0OiB0cnVlLFxuXG4gICAgICAgIC8vIFRoZSBhbW91bnQgb2YgdGltZSB0byB3YWl0IGFmdGVyIHNlbmRpbmcgYSBrZWVwYWxpdmUgcGluZyBiZWZvcmVcbiAgICAgICAgLy8gY2xvc2luZyB0aGUgY29ubmVjdGlvbiBpZiB0aGUgY29ubmVjdGVkIHBlZXIgZG9lcyBub3QgcmVzcG9uZC5cbiAgICAgICAgLy8gSWdub3JlZCBpZiBrZWVwYWxpdmUgaXMgZmFsc2UuXG4gICAgICAgIGtlZXBhbGl2ZUdyYWNlUGVyaW9kOiAxMDAwMCxcblxuICAgICAgICAvLyBXaGV0aGVyIHRvIHVzZSBuYXRpdmUgVENQIGtlZXAtYWxpdmUgaW5zdGVhZCBvZiBXZWJTb2NrZXRzIHBpbmdcbiAgICAgICAgLy8gYW5kIHBvbmcgcGFja2V0cy4gIE5hdGl2ZSBUQ1Aga2VlcC1hbGl2ZSBzZW5kcyBzbWFsbGVyIHBhY2tldHNcbiAgICAgICAgLy8gb24gdGhlIHdpcmUgYW5kIHNvIHVzZXMgYmFuZHdpZHRoIG1vcmUgZWZmaWNpZW50bHkuICBUaGlzIG1heVxuICAgICAgICAvLyBiZSBtb3JlIGltcG9ydGFudCB3aGVuIHRhbGtpbmcgdG8gbW9iaWxlIGRldmljZXMuXG4gICAgICAgIC8vIElmIHRoaXMgdmFsdWUgaXMgc2V0IHRvIHRydWUsIHRoZW4gdGhlc2UgdmFsdWVzIHdpbGwgYmUgaWdub3JlZDpcbiAgICAgICAgLy8gICBrZWVwYWxpdmVHcmFjZVBlcmlvZFxuICAgICAgICAvLyAgIGRyb3BDb25uZWN0aW9uT25LZWVwYWxpdmVUaW1lb3V0XG4gICAgICAgIHVzZU5hdGl2ZUtlZXBhbGl2ZTogZmFsc2UsXG5cbiAgICAgICAgLy8gSWYgdHJ1ZSwgZnJhZ21lbnRlZCBtZXNzYWdlcyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYXNzZW1ibGVkXG4gICAgICAgIC8vIGFuZCB0aGUgZnVsbCBtZXNzYWdlIHdpbGwgYmUgZW1pdHRlZCB2aWEgYSAnbWVzc2FnZScgZXZlbnQuXG4gICAgICAgIC8vIElmIGZhbHNlLCBlYWNoIGZyYW1lIHdpbGwgYmUgZW1pdHRlZCB2aWEgYSAnZnJhbWUnIGV2ZW50IGFuZFxuICAgICAgICAvLyB0aGUgYXBwbGljYXRpb24gd2lsbCBiZSByZXNwb25zaWJsZSBmb3IgYWdncmVnYXRpbmcgbXVsdGlwbGVcbiAgICAgICAgLy8gZnJhZ21lbnRlZCBmcmFtZXMuICBTaW5nbGUtZnJhbWUgbWVzc2FnZXMgd2lsbCBlbWl0IGEgJ21lc3NhZ2UnXG4gICAgICAgIC8vIGV2ZW50IGluIGFkZGl0aW9uIHRvIHRoZSAnZnJhbWUnIGV2ZW50LlxuICAgICAgICAvLyBNb3N0IHVzZXJzIHdpbGwgd2FudCB0byBsZWF2ZSB0aGlzIHNldCB0byAndHJ1ZSdcbiAgICAgICAgYXNzZW1ibGVGcmFnbWVudHM6IHRydWUsXG5cbiAgICAgICAgLy8gSWYgdGhpcyBpcyB0cnVlLCB3ZWJzb2NrZXQgY29ubmVjdGlvbnMgd2lsbCBiZSBhY2NlcHRlZFxuICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHRoZSBwYXRoIGFuZCBwcm90b2NvbCBzcGVjaWZpZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgICAgLy8gVGhlIHByb3RvY29sIGFjY2VwdGVkIHdpbGwgYmUgdGhlIGZpcnN0IHRoYXQgd2FzIHJlcXVlc3RlZFxuICAgICAgICAvLyBieSB0aGUgY2xpZW50LiAgQ2xpZW50cyBmcm9tIGFueSBvcmlnaW4gd2lsbCBiZSBhY2NlcHRlZC5cbiAgICAgICAgLy8gVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGluIHRoZSBzaW1wbGVzdCBvZiBjYXNlcy4gIFlvdSBzaG91bGRcbiAgICAgICAgLy8gcHJvYmFibHkgbGVhdmUgdGhpcyBzZXQgdG8gJ2ZhbHNlJyBhbmQgaW5zcGVjdCB0aGUgcmVxdWVzdFxuICAgICAgICAvLyBvYmplY3QgdG8gbWFrZSBzdXJlIGl0J3MgYWNjZXB0YWJsZSBiZWZvcmUgYWNjZXB0aW5nIGl0LlxuICAgICAgICBhdXRvQWNjZXB0Q29ubmVjdGlvbnM6IGZhbHNlLFxuXG4gICAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHRoZSBYLUZvcndhcmRlZC1Gb3IgaGVhZGVyIHNob3VsZCBiZSByZXNwZWN0ZWQuXG4gICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHNldCB0aGlzIHRvICd0cnVlJyB3aGVuIGFjY2VwdGluZyBjb25uZWN0aW9uc1xuICAgICAgICAvLyBmcm9tIHVudHJ1c3RlZCBjbGllbnRzLCBhcyBhIG1hbGljaW91cyBjbGllbnQgY291bGQgc3Bvb2YgaXRzXG4gICAgICAgIC8vIElQIGFkZHJlc3MgYnkgc2ltcGx5IHNldHRpbmcgdGhpcyBoZWFkZXIuICBJdCdzIG1lYW50IHRvIGJlIGFkZGVkXG4gICAgICAgIC8vIGJ5IGEgdHJ1c3RlZCBwcm94eSBvciBvdGhlciBpbnRlcm1lZGlhcnkgd2l0aGluIHlvdXIgb3duXG4gICAgICAgIC8vIGluZnJhc3RydWN0dXJlLlxuICAgICAgICAvLyBTZWU6ICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1gtRm9yd2FyZGVkLUZvclxuICAgICAgICBpZ25vcmVYRm9yd2FyZGVkRm9yOiBmYWxzZSxcblxuICAgICAgICAvLyBUaGUgTmFnbGUgQWxnb3JpdGhtIG1ha2VzIG1vcmUgZWZmaWNpZW50IHVzZSBvZiBuZXR3b3JrIHJlc291cmNlc1xuICAgICAgICAvLyBieSBpbnRyb2R1Y2luZyBhIHNtYWxsIGRlbGF5IGJlZm9yZSBzZW5kaW5nIHNtYWxsIHBhY2tldHMgc28gdGhhdFxuICAgICAgICAvLyBtdWx0aXBsZSBtZXNzYWdlcyBjYW4gYmUgYmF0Y2hlZCB0b2dldGhlciBiZWZvcmUgZ29pbmcgb250byB0aGVcbiAgICAgICAgLy8gd2lyZS4gIFRoaXMgaG93ZXZlciBjb21lcyBhdCB0aGUgY29zdCBvZiBsYXRlbmN5LCBzbyB0aGUgZGVmYXVsdFxuICAgICAgICAvLyBpcyB0byBkaXNhYmxlIGl0LiAgSWYgeW91IGRvbid0IG5lZWQgbG93IGxhdGVuY3kgYW5kIGFyZSBzdHJlYW1pbmdcbiAgICAgICAgLy8gbG90cyBvZiBzbWFsbCBtZXNzYWdlcywgeW91IGNhbiBjaGFuZ2UgdGhpcyB0byAnZmFsc2UnXG4gICAgICAgIGRpc2FibGVOYWdsZUFsZ29yaXRobTogdHJ1ZSxcblxuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGFmdGVyIHNlbmRpbmcgYSBjbG9zZSBmcmFtZVxuICAgICAgICAvLyBmb3IgYW4gYWNrbm93bGVkZ2VtZW50IHRvIGNvbWUgYmFjayBiZWZvcmUgZ2l2aW5nIHVwIGFuZCBqdXN0XG4gICAgICAgIC8vIGNsb3NpbmcgdGhlIHNvY2tldC5cbiAgICAgICAgY2xvc2VUaW1lb3V0OiA1MDAwXG4gICAgfTtcbiAgICBleHRlbmQodGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuaHR0cFNlcnZlcikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuaHR0cFNlcnZlcikpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmh0dHBTZXJ2ZXIgPSBbdGhpcy5jb25maWcuaHR0cFNlcnZlcl07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVwZ3JhZGVIYW5kbGVyID0gdGhpcy5faGFuZGxlcnMudXBncmFkZTtcbiAgICAgICAgdGhpcy5jb25maWcuaHR0cFNlcnZlci5mb3JFYWNoKGZ1bmN0aW9uKGh0dHBTZXJ2ZXIpIHtcbiAgICAgICAgICAgIGh0dHBTZXJ2ZXIub24oJ3VwZ3JhZGUnLCB1cGdyYWRlSGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGFuIGh0dHBTZXJ2ZXIgb24gd2hpY2ggdG8gbW91bnQgdGhlIFdlYlNvY2tldCBzZXJ2ZXIuJyk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVwZ3JhZGVIYW5kbGVyID0gdGhpcy5faGFuZGxlcnMudXBncmFkZTtcbiAgICB0aGlzLmNvbmZpZy5odHRwU2VydmVyLmZvckVhY2goZnVuY3Rpb24oaHR0cFNlcnZlcikge1xuICAgICAgICBodHRwU2VydmVyLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgdXBncmFkZUhhbmRsZXIpO1xuICAgIH0pO1xufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS5jbG9zZUFsbENvbm5lY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgIH0pO1xuICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlcXVlc3QucmVqZWN0KDUwMyk7IC8vIEhUVFAgNTAzIFNlcnZpY2UgVW5hdmFpbGFibGVcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmJyb2FkY2FzdCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0Qnl0ZXMoZGF0YSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZihkYXRhLnRvU3RyaW5nKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmJyb2FkY2FzdFVURihkYXRhKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmJyb2FkY2FzdFVURiA9IGZ1bmN0aW9uKHV0ZkRhdGEpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICAgICAgICBjb25uZWN0aW9uLnNlbmRVVEYodXRmRGF0YSk7XG4gICAgfSk7XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmJyb2FkY2FzdEJ5dGVzID0gZnVuY3Rpb24oYmluYXJ5RGF0YSkge1xuICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gICAgICAgIGNvbm5lY3Rpb24uc2VuZEJ5dGVzKGJpbmFyeURhdGEpO1xuICAgIH0pO1xufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS5zaHV0RG93biA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudW5tb3VudCgpO1xuICAgIHRoaXMuY2xvc2VBbGxDb25uZWN0aW9ucygpO1xufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS5oYW5kbGVVcGdyYWRlID0gZnVuY3Rpb24ocmVxdWVzdCwgc29ja2V0KSB7XG4gICAgdmFyIHdzUmVxdWVzdCA9IG5ldyBXZWJTb2NrZXRSZXF1ZXN0KHNvY2tldCwgcmVxdWVzdCwgdGhpcy5jb25maWcpO1xuICAgIHRyeSB7XG4gICAgICAgIHdzUmVxdWVzdC5yZWFkSGFuZHNoYWtlKCk7XG4gICAgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgd3NSZXF1ZXN0LnJlamVjdChcbiAgICAgICAgICAgIGUuaHR0cENvZGUgPyBlLmh0dHBDb2RlIDogNDAwLFxuICAgICAgICAgICAgZS5tZXNzYWdlLFxuICAgICAgICAgICAgZS5oZWFkZXJzXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnKCdJbnZhbGlkIGhhbmRzaGFrZTogJXMnLCBlLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzLnB1c2god3NSZXF1ZXN0KTtcblxuICAgIHdzUmVxdWVzdC5vbmNlKCdyZXF1ZXN0QWNjZXB0ZWQnLCB0aGlzLl9oYW5kbGVycy5yZXF1ZXN0QWNjZXB0ZWQpO1xuICAgIHdzUmVxdWVzdC5vbmNlKCdyZXF1ZXN0UmVzb2x2ZWQnLCB0aGlzLl9oYW5kbGVycy5yZXF1ZXN0UmVzb2x2ZWQpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hdXRvQWNjZXB0Q29ubmVjdGlvbnMgJiYgdXRpbHMuZXZlbnRFbWl0dGVyTGlzdGVuZXJDb3VudCh0aGlzLCAncmVxdWVzdCcpID4gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB3c1JlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5hdXRvQWNjZXB0Q29ubmVjdGlvbnMpIHtcbiAgICAgICAgd3NSZXF1ZXN0LmFjY2VwdCh3c1JlcXVlc3QucmVxdWVzdGVkUHJvdG9jb2xzWzBdLCB3c1JlcXVlc3Qub3JpZ2luKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdzUmVxdWVzdC5yZWplY3QoNDA0LCAnTm8gaGFuZGxlciBpcyBjb25maWd1cmVkIHRvIGFjY2VwdCB0aGUgY29ubmVjdGlvbi4nKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmhhbmRsZVJlcXVlc3RBY2NlcHRlZCA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgY29ubmVjdGlvbi5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uKGNsb3NlUmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICBzZWxmLmhhbmRsZUNvbm5lY3Rpb25DbG9zZShjb25uZWN0aW9uLCBjbG9zZVJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgIH0pO1xuICAgIHRoaXMuY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnLCBjb25uZWN0aW9uKTtcbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuaGFuZGxlQ29ubmVjdGlvbkNsb3NlID0gZnVuY3Rpb24oY29ubmVjdGlvbiwgY2xvc2VSZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5jb25uZWN0aW9ucy5pbmRleE9mKGNvbm5lY3Rpb24pO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgY29ubmVjdGlvbiwgY2xvc2VSZWFzb24sIGRlc2NyaXB0aW9uKTtcbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuaGFuZGxlUmVxdWVzdFJlc29sdmVkID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMucGVuZGluZ1JlcXVlc3RzLmluZGV4T2YocmVxdWVzdCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkgeyB0aGlzLnBlbmRpbmdSZXF1ZXN0cy5zcGxpY2UoaW5kZXgsIDEpOyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldFNlcnZlcjtcbiIsInZhciBub29wID0gZXhwb3J0cy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICBkZXN0W3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZXZlbnRFbWl0dGVyTGlzdGVuZXJDb3VudCA9XG4gICAgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgfHxcbiAgICBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7IHJldHVybiBlbWl0dGVyLmxpc3RlbmVycyh0eXBlKS5sZW5ndGg7IH07XG5cbmV4cG9ydHMuYnVmZmVyQWxsb2NVbnNhZmUgPSBCdWZmZXIuYWxsb2NVbnNhZmUgP1xuICAgIEJ1ZmZlci5hbGxvY1Vuc2FmZSA6XG4gICAgZnVuY3Rpb24gb2xkQnVmZmVyQWxsb2NVbnNhZmUoc2l6ZSkgeyByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTsgfTtcblxuZXhwb3J0cy5idWZmZXJGcm9tU3RyaW5nID0gQnVmZmVyLmZyb20gP1xuICAgIEJ1ZmZlci5mcm9tIDpcbiAgICBmdW5jdGlvbiBvbGRCdWZmZXJGcm9tU3RyaW5nKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgICAgIHJldHVybiBuZXcgQnVmZmVyKHN0cmluZywgZW5jb2RpbmcpO1xuICAgIH07XG5cbmV4cG9ydHMuQnVmZmVyaW5nTG9nZ2VyID0gZnVuY3Rpb24gY3JlYXRlQnVmZmVyaW5nTG9nZ2VyKGlkZW50aWZpZXIsIHVuaXF1ZUlEKSB7XG4gICAgdmFyIGxvZ0Z1bmN0aW9uID0gcmVxdWlyZSgnZGVidWcnKShpZGVudGlmaWVyKTtcbiAgICBpZiAobG9nRnVuY3Rpb24uZW5hYmxlZCkge1xuICAgICAgICB2YXIgbG9nZ2VyID0gbmV3IEJ1ZmZlcmluZ0xvZ2dlcihpZGVudGlmaWVyLCB1bmlxdWVJRCwgbG9nRnVuY3Rpb24pO1xuICAgICAgICB2YXIgZGVidWcgPSBsb2dnZXIubG9nLmJpbmQobG9nZ2VyKTtcbiAgICAgICAgZGVidWcucHJpbnRPdXRwdXQgPSBsb2dnZXIucHJpbnRPdXRwdXQuYmluZChsb2dnZXIpO1xuICAgICAgICBkZWJ1Zy5lbmFibGVkID0gbG9nRnVuY3Rpb24uZW5hYmxlZDtcbiAgICAgICAgcmV0dXJuIGRlYnVnO1xuICAgIH1cbiAgICBsb2dGdW5jdGlvbi5wcmludE91dHB1dCA9IG5vb3A7XG4gICAgcmV0dXJuIGxvZ0Z1bmN0aW9uO1xufTtcblxuZnVuY3Rpb24gQnVmZmVyaW5nTG9nZ2VyKGlkZW50aWZpZXIsIHVuaXF1ZUlELCBsb2dGdW5jdGlvbikge1xuICAgIHRoaXMubG9nRnVuY3Rpb24gPSBsb2dGdW5jdGlvbjtcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xuICAgIHRoaXMudW5pcXVlSUQgPSB1bmlxdWVJRDtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xufVxuXG5CdWZmZXJpbmdMb2dnZXIucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmJ1ZmZlci5wdXNoKFsgbmV3IERhdGUoKSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSBdKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CdWZmZXJpbmdMb2dnZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYnVmZmVyID0gW107XG4gIHJldHVybiB0aGlzO1xufTtcblxuQnVmZmVyaW5nTG9nZ2VyLnByb3RvdHlwZS5wcmludE91dHB1dCA9IGZ1bmN0aW9uKGxvZ0Z1bmN0aW9uKSB7XG4gICAgaWYgKCFsb2dGdW5jdGlvbikgeyBsb2dGdW5jdGlvbiA9IHRoaXMubG9nRnVuY3Rpb247IH1cbiAgICB2YXIgdW5pcXVlSUQgPSB0aGlzLnVuaXF1ZUlEO1xuICAgIHRoaXMuYnVmZmVyLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBlbnRyeVswXS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB2YXIgYXJncyA9IGVudHJ5WzFdLnNsaWNlKCk7XG4gICAgICAgIHZhciBmb3JtYXRTdHJpbmcgPSBhcmdzWzBdO1xuICAgICAgICBpZiAoZm9ybWF0U3RyaW5nICE9PSAodm9pZCAwKSAmJiBmb3JtYXRTdHJpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm1hdFN0cmluZyA9ICclcyAtICVzIC0gJyArIGZvcm1hdFN0cmluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgYXJncy5zcGxpY2UoMCwgMSwgZm9ybWF0U3RyaW5nLCBkYXRlLCB1bmlxdWVJRCk7XG4gICAgICAgICAgICBsb2dGdW5jdGlvbi5hcHBseShnbG9iYWwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ3NlcnZlcicgICAgICAgOiByZXF1aXJlKCcuL1dlYlNvY2tldFNlcnZlcicpLFxuICAgICdjbGllbnQnICAgICAgIDogcmVxdWlyZSgnLi9XZWJTb2NrZXRDbGllbnQnKSxcbiAgICAncm91dGVyJyAgICAgICA6IHJlcXVpcmUoJy4vV2ViU29ja2V0Um91dGVyJyksXG4gICAgJ2ZyYW1lJyAgICAgICAgOiByZXF1aXJlKCcuL1dlYlNvY2tldEZyYW1lJyksXG4gICAgJ3JlcXVlc3QnICAgICAgOiByZXF1aXJlKCcuL1dlYlNvY2tldFJlcXVlc3QnKSxcbiAgICAnY29ubmVjdGlvbicgICA6IHJlcXVpcmUoJy4vV2ViU29ja2V0Q29ubmVjdGlvbicpLFxuICAgICd3M2N3ZWJzb2NrZXQnIDogcmVxdWlyZSgnLi9XM0NXZWJTb2NrZXQnKSxcbiAgICAnZGVwcmVjYXRpb24nICA6IHJlcXVpcmUoJy4vRGVwcmVjYXRpb24nKSxcbiAgICAndmVyc2lvbicgICAgICA6IHJlcXVpcmUoJy4vdmVyc2lvbicpXG59O1xuIiwiLy8gVGhpcyBmaWxlIHdhcyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svbm9kZS1idWZmZXJsaXN0XG4vLyBhbmQgbW9kaWZpZWQgdG8gYmUgYWJsZSB0byBjb3B5IGJ5dGVzIGZyb20gdGhlIGJ1ZmZlcmxpc3QgZGlyZWN0bHkgaW50b1xuLy8gYSBwcmUtZXhpc3RpbmcgZml4ZWQtc2l6ZSBidWZmZXIgd2l0aG91dCBhbiBhZGRpdGlvbmFsIG1lbW9yeSBhbGxvY2F0aW9uLlxuXG4vLyBidWZmZXJsaXN0LmpzXG4vLyBUcmVhdCBhIGxpbmtlZCBsaXN0IG9mIGJ1ZmZlcnMgYXMgYSBzaW5nbGUgdmFyaWFibGUtc2l6ZSBidWZmZXIuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBidWZmZXJBbGxvY1Vuc2FmZSA9IHJlcXVpcmUoJy4uL2xpYi91dGlscycpLmJ1ZmZlckFsbG9jVW5zYWZlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlckxpc3Q7XG5tb2R1bGUuZXhwb3J0cy5CdWZmZXJMaXN0ID0gQnVmZmVyTGlzdDsgLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblxuZnVuY3Rpb24gQnVmZmVyTGlzdChvcHRzKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlckxpc3QpKSByZXR1cm4gbmV3IEJ1ZmZlckxpc3Qob3B0cyk7XG4gICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIGlmICh0eXBlb2Yob3B0cykgPT0gJ3VuZGVmaW5lZCcpIG9wdHMgPSB7fTtcbiAgICBcbiAgICAvLyBkZWZhdWx0IGVuY29kaW5nIHRvIHVzZSBmb3IgdGFrZSgpLiBMZWF2aW5nIGFzICd1bmRlZmluZWQnXG4gICAgLy8gbWFrZXMgdGFrZSgpIHJldHVybiBhIEJ1ZmZlciBpbnN0ZWFkLlxuICAgIHNlbGYuZW5jb2RpbmcgPSBvcHRzLmVuY29kaW5nO1xuICAgIFxuICAgIHZhciBoZWFkID0geyBuZXh0IDogbnVsbCwgYnVmZmVyIDogbnVsbCB9O1xuICAgIHZhciBsYXN0ID0geyBuZXh0IDogbnVsbCwgYnVmZmVyIDogbnVsbCB9O1xuICAgIFxuICAgIC8vIGxlbmd0aCBjYW4gZ2V0IG5lZ2F0aXZlIHdoZW4gYWR2YW5jZWQgcGFzdCB0aGUgZW5kXG4gICAgLy8gYW5kIHRoaXMgaXMgdGhlIGRlc2lyZWQgYmVoYXZpb3JcbiAgICB2YXIgbGVuZ3RoID0gMDtcbiAgICBzZWxmLl9fZGVmaW5lR2V0dGVyX18oJ2xlbmd0aCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBrZWVwIGFuIG9mZnNldCBvZiB0aGUgaGVhZCB0byBkZWNpZGUgd2hlbiB0byBoZWFkID0gaGVhZC5uZXh0XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgXG4gICAgLy8gV3JpdGUgdG8gdGhlIGJ1ZmZlcmxpc3QuIEVtaXRzICd3cml0ZScuIEFsd2F5cyByZXR1cm5zIHRydWUuXG4gICAgc2VsZi53cml0ZSA9IGZ1bmN0aW9uIChidWYpIHtcbiAgICAgICAgaWYgKCFoZWFkLmJ1ZmZlcikge1xuICAgICAgICAgICAgaGVhZC5idWZmZXIgPSBidWY7XG4gICAgICAgICAgICBsYXN0ID0gaGVhZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxhc3QubmV4dCA9IHsgbmV4dCA6IG51bGwsIGJ1ZmZlciA6IGJ1ZiB9O1xuICAgICAgICAgICAgbGFzdCA9IGxhc3QubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBsZW5ndGggKz0gYnVmLmxlbmd0aDtcbiAgICAgICAgc2VsZi5lbWl0KCd3cml0ZScsIGJ1Zik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5lbmQgPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYnVmKSkgc2VsZi53cml0ZShidWYpO1xuICAgIH07XG4gICAgXG4gICAgLy8gUHVzaCBidWZmZXJzIHRvIHRoZSBlbmQgb2YgdGhlIGxpbmtlZCBsaXN0LiAoZGVwcmVjYXRlZClcbiAgICAvLyBSZXR1cm4gdGhpcyAoc2VsZikuXG4gICAgc2VsZi5wdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLmNvbmNhdC5hcHBseShbXSwgYXJndW1lbnRzKTtcbiAgICAgICAgYXJncy5mb3JFYWNoKHNlbGYud3JpdGUpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIFxuICAgIC8vIEZvciBlYWNoIGJ1ZmZlciwgcGVyZm9ybSBzb21lIGFjdGlvbi5cbiAgICAvLyBJZiBmbidzIHJlc3VsdCBpcyBhIHRydWUgdmFsdWUsIGN1dCBvdXQgZWFybHkuXG4gICAgLy8gUmV0dXJucyB0aGlzIChzZWxmKS5cbiAgICBzZWxmLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgaWYgKCFoZWFkLmJ1ZmZlcikgcmV0dXJuIGJ1ZmZlckFsbG9jVW5zYWZlKDApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGhlYWQuYnVmZmVyLmxlbmd0aCAtIG9mZnNldCA8PSAwKSByZXR1cm4gc2VsZjtcbiAgICAgICAgdmFyIGZpcnN0QnVmID0gaGVhZC5idWZmZXIuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBiID0geyBidWZmZXIgOiBmaXJzdEJ1ZiwgbmV4dCA6IGhlYWQubmV4dCB9O1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKGIgJiYgYi5idWZmZXIpIHtcbiAgICAgICAgICAgIHZhciByID0gZm4oYi5idWZmZXIpO1xuICAgICAgICAgICAgaWYgKHIpIGJyZWFrO1xuICAgICAgICAgICAgYiA9IGIubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBcbiAgICAvLyBDcmVhdGUgYSBzaW5nbGUgQnVmZmVyIG91dCBvZiBhbGwgdGhlIGNodW5rcyBvciBzb21lIHN1YnNldCBzcGVjaWZpZWQgYnlcbiAgICAvLyBzdGFydCBhbmQgb25lLXBhc3QgdGhlIGVuZCAobGlrZSBzbGljZSkgaW4gYnl0ZXMuXG4gICAgc2VsZi5qb2luID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgaWYgKCFoZWFkLmJ1ZmZlcikgcmV0dXJuIGJ1ZmZlckFsbG9jVW5zYWZlKDApO1xuICAgICAgICBpZiAoc3RhcnQgPT0gdW5kZWZpbmVkKSBzdGFydCA9IDA7XG4gICAgICAgIGlmIChlbmQgPT0gdW5kZWZpbmVkKSBlbmQgPSBzZWxmLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIHZhciBiaWcgPSBidWZmZXJBbGxvY1Vuc2FmZShlbmQgLSBzdGFydCk7XG4gICAgICAgIHZhciBpeCA9IDA7XG4gICAgICAgIHNlbGYuZm9yRWFjaChmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnQgPCAoaXggKyBidWZmZXIubGVuZ3RoKSAmJiBpeCA8IGVuZCkge1xuICAgICAgICAgICAgICAgIC8vIGF0IGxlYXN0IHBhcnRpYWxseSBjb250YWluZWQgaW4gdGhlIHJhbmdlXG4gICAgICAgICAgICAgICAgYnVmZmVyLmNvcHkoXG4gICAgICAgICAgICAgICAgICAgIGJpZyxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMCwgaXggLSBzdGFydCksXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDAsIHN0YXJ0IC0gaXgpLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihidWZmZXIubGVuZ3RoLCBlbmQgLSBpeClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXggKz0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChpeCA+IGVuZCkgcmV0dXJuIHRydWU7IC8vIHN0b3AgcHJvY2Vzc2luZyBwYXN0IGVuZFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBiaWc7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmpvaW5JbnRvID0gZnVuY3Rpb24gKHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQsIHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpIHtcbiAgICAgICAgaWYgKCFoZWFkLmJ1ZmZlcikgcmV0dXJuIG5ldyBidWZmZXJBbGxvY1Vuc2FmZSgwKTtcbiAgICAgICAgaWYgKHNvdXJjZVN0YXJ0ID09IHVuZGVmaW5lZCkgc291cmNlU3RhcnQgPSAwO1xuICAgICAgICBpZiAoc291cmNlRW5kID09IHVuZGVmaW5lZCkgc291cmNlRW5kID0gc2VsZi5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICB2YXIgYmlnID0gdGFyZ2V0QnVmZmVyO1xuICAgICAgICBpZiAoYmlnLmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgc291cmNlRW5kIC0gc291cmNlU3RhcnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluc3VmZmljaWVudCBzcGFjZSBhdmFpbGFibGUgaW4gdGFyZ2V0IEJ1ZmZlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl4ID0gMDtcbiAgICAgICAgc2VsZi5mb3JFYWNoKGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTdGFydCA8IChpeCArIGJ1ZmZlci5sZW5ndGgpICYmIGl4IDwgc291cmNlRW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gYXQgbGVhc3QgcGFydGlhbGx5IGNvbnRhaW5lZCBpbiB0aGUgcmFuZ2VcbiAgICAgICAgICAgICAgICBidWZmZXIuY29weShcbiAgICAgICAgICAgICAgICAgICAgYmlnLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCh0YXJnZXRTdGFydCwgdGFyZ2V0U3RhcnQgKyBpeCAtIHNvdXJjZVN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMCwgc291cmNlU3RhcnQgLSBpeCksXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWluKGJ1ZmZlci5sZW5ndGgsIHNvdXJjZUVuZCAtIGl4KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpeCArPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGl4ID4gc291cmNlRW5kKSByZXR1cm4gdHJ1ZTsgLy8gc3RvcCBwcm9jZXNzaW5nIHBhc3QgZW5kXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJpZztcbiAgICB9O1xuICAgIFxuICAgIC8vIEFkdmFuY2UgdGhlIGJ1ZmZlciBzdHJlYW0gYnkgbiBieXRlcy5cbiAgICAvLyBJZiBuIHRoZSBhZ2dyZWdhdGUgYWR2YW5jZSBvZmZzZXQgcGFzc2VzIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlciBsaXN0LFxuICAgIC8vIG9wZXJhdGlvbnMgc3VjaCBhcyAudGFrZSgpIHdpbGwgcmV0dXJuIGVtcHR5IHN0cmluZ3MgdW50aWwgZW5vdWdoIGRhdGEgaXNcbiAgICAvLyBwdXNoZWQuXG4gICAgLy8gUmV0dXJucyB0aGlzIChzZWxmKS5cbiAgICBzZWxmLmFkdmFuY2UgPSBmdW5jdGlvbiAobikge1xuICAgICAgICBvZmZzZXQgKz0gbjtcbiAgICAgICAgbGVuZ3RoIC09IG47XG4gICAgICAgIHdoaWxlIChoZWFkLmJ1ZmZlciAmJiBvZmZzZXQgPj0gaGVhZC5idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBvZmZzZXQgLT0gaGVhZC5idWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgaGVhZCA9IGhlYWQubmV4dFxuICAgICAgICAgICAgICAgID8gaGVhZC5uZXh0XG4gICAgICAgICAgICAgICAgOiB7IGJ1ZmZlciA6IG51bGwsIG5leHQgOiBudWxsIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVhZC5idWZmZXIgPT09IG51bGwpIGxhc3QgPSB7IG5leHQgOiBudWxsLCBidWZmZXIgOiBudWxsIH07XG4gICAgICAgIHNlbGYuZW1pdCgnYWR2YW5jZScsIG4pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIFxuICAgIC8vIFRha2UgbiBieXRlcyBmcm9tIHRoZSBzdGFydCBvZiB0aGUgYnVmZmVycy5cbiAgICAvLyBSZXR1cm5zIGEgc3RyaW5nLlxuICAgIC8vIElmIHRoZXJlIGFyZSBsZXNzIHRoYW4gbiBieXRlcyBpbiBhbGwgdGhlIGJ1ZmZlcnMgb3IgbiBpcyB1bmRlZmluZWQsXG4gICAgLy8gcmV0dXJucyB0aGUgZW50aXJlIGNvbmNhdGVuYXRlZCBidWZmZXIgc3RyaW5nLlxuICAgIHNlbGYudGFrZSA9IGZ1bmN0aW9uIChuLCBlbmNvZGluZykge1xuICAgICAgICBpZiAobiA9PSB1bmRlZmluZWQpIG4gPSBzZWxmLmxlbmd0aDtcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBlbmNvZGluZyA9IG47XG4gICAgICAgICAgICBuID0gc2VsZi5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGIgPSBoZWFkO1xuICAgICAgICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9IHNlbGYuZW5jb2Rpbmc7XG4gICAgICAgIGlmIChlbmNvZGluZykge1xuICAgICAgICAgICAgdmFyIGFjYyA9ICcnO1xuICAgICAgICAgICAgc2VsZi5mb3JFYWNoKGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobiA8PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhY2MgKz0gYnVmZmVyLnRvU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZywgMCwgTWF0aC5taW4obixidWZmZXIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbiAtPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgbm8gJ2VuY29kaW5nJyBpcyBzcGVjaWZpZWQsIHRoZW4gcmV0dXJuIGEgQnVmZmVyLlxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuam9pbigwLCBuKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgLy8gVGhlIGVudGlyZSBjb25jYXRlbmF0ZWQgYnVmZmVyIGFzIGEgc3RyaW5nLlxuICAgIHNlbGYudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnRha2UoJ2JpbmFyeScpO1xuICAgIH07XG59XG5yZXF1aXJlKCd1dGlsJykuaW5oZXJpdHMoQnVmZmVyTGlzdCwgRXZlbnRFbWl0dGVyKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRFdmVudFRhcmdldCA6IHJlcXVpcmUoJy4vbGliL0V2ZW50VGFyZ2V0JyksXG5cdEV2ZW50ICAgICAgIDogcmVxdWlyZSgnLi9saWIvRXZlbnQnKVxufTtcbiIsIi8qKlxuICogRXhwb3NlIHRoZSBFdmVudCBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfRXZlbnQ7XG5cblxuZnVuY3Rpb24gX0V2ZW50KHR5cGUpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5pc1RydXN0ZWQgPSBmYWxzZTtcblxuXHQvLyBTZXQgYSBmbGFnIGluZGljYXRpbmcgdGhpcyBpcyBub3QgYSBET00gRXZlbnQgb2JqZWN0XG5cdHRoaXMuX3lhZXRpID0gdHJ1ZTtcbn1cbiIsIi8qKlxuICogRXhwb3NlIHRoZSBfRXZlbnRUYXJnZXQgY2xhc3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX0V2ZW50VGFyZ2V0O1xuXG5mdW5jdGlvbiBfRXZlbnRUYXJnZXQoKSB7XG5cdC8vIERvIG5vdGhpbmcgaWYgY2FsbGVkIGZvciBhIG5hdGl2ZSBFdmVudFRhcmdldCBvYmplY3QuLlxuXHRpZiAodHlwZW9mIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciA9IF9hZGRFdmVudExpc3RlbmVyO1xuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBfcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblx0dGhpcy5kaXNwYXRjaEV2ZW50ID0gX2Rpc3BhdGNoRXZlbnQ7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKF9FdmVudFRhcmdldC5wcm90b3R5cGUsIHtcblx0bGlzdGVuZXJzOiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fbGlzdGVuZXJzO1xuXHRcdH1cblx0fVxufSk7XG5cbmZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVyKHR5cGUsIG5ld0xpc3RlbmVyKSB7XG5cdHZhclxuXHRcdGxpc3RlbmVyc1R5cGUsXG5cdFx0aSwgbGlzdGVuZXI7XG5cblx0aWYgKCF0eXBlIHx8ICFuZXdMaXN0ZW5lcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGxpc3RlbmVyc1R5cGUgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG5cdGlmIChsaXN0ZW5lcnNUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBsaXN0ZW5lcnNUeXBlID0gW107XG5cdH1cblxuXHRmb3IgKGkgPSAwOyAhIShsaXN0ZW5lciA9IGxpc3RlbmVyc1R5cGVbaV0pOyBpKyspIHtcblx0XHRpZiAobGlzdGVuZXIgPT09IG5ld0xpc3RlbmVyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0bGlzdGVuZXJzVHlwZS5wdXNoKG5ld0xpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgb2xkTGlzdGVuZXIpIHtcblx0dmFyXG5cdFx0bGlzdGVuZXJzVHlwZSxcblx0XHRpLCBsaXN0ZW5lcjtcblxuXHRpZiAoIXR5cGUgfHwgIW9sZExpc3RlbmVyKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGlzdGVuZXJzVHlwZSA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcblx0aWYgKGxpc3RlbmVyc1R5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAoaSA9IDA7ICEhKGxpc3RlbmVyID0gbGlzdGVuZXJzVHlwZVtpXSk7IGkrKykge1xuXHRcdGlmIChsaXN0ZW5lciA9PT0gb2xkTGlzdGVuZXIpIHtcblx0XHRcdGxpc3RlbmVyc1R5cGUuc3BsaWNlKGksIDEpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGxpc3RlbmVyc1R5cGUubGVuZ3RoID09PSAwKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcblx0fVxufVxuXG5mdW5jdGlvbiBfZGlzcGF0Y2hFdmVudChldmVudCkge1xuXHR2YXJcblx0XHR0eXBlLFxuXHRcdGxpc3RlbmVyc1R5cGUsXG5cdFx0ZHVtbXlMaXN0ZW5lcixcblx0XHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmYWxzZSxcblx0XHRpLCBsaXN0ZW5lcjtcblxuXHRpZiAoIWV2ZW50IHx8IHR5cGVvZiBldmVudC50eXBlICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignYGV2ZW50YCBtdXN0IGhhdmUgYSB2YWxpZCBgdHlwZWAgcHJvcGVydHknKTtcblx0fVxuXG5cdC8vIERvIHNvbWUgc3R1ZmYgdG8gZW11bGF0ZSBET00gRXZlbnQgYmVoYXZpb3IgKGp1c3QgaWYgdGhpcyBpcyBub3QgYVxuXHQvLyBET00gRXZlbnQgb2JqZWN0KVxuXHRpZiAoZXZlbnQuX3lhZXRpKSB7XG5cdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcztcblx0XHRldmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblx0fVxuXG5cdC8vIEF0dGVtcHQgdG8gb3ZlcnJpZGUgdGhlIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIG1ldGhvZFxuXHR0cnkge1xuXHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IHRydWU7XG5cdFx0fTtcblx0fSBjYXRjaCAoZXJyb3IpIHt9XG5cblx0dHlwZSA9IGV2ZW50LnR5cGU7XG5cdGxpc3RlbmVyc1R5cGUgPSAodGhpcy5fbGlzdGVuZXJzW3R5cGVdIHx8IFtdKTtcblxuXHRkdW1teUxpc3RlbmVyID0gdGhpc1snb24nICsgdHlwZV07XG5cdGlmICh0eXBlb2YgZHVtbXlMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGR1bW15TGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG5cdH1cblxuXHRmb3IgKGkgPSAwOyAhIShsaXN0ZW5lciA9IGxpc3RlbmVyc1R5cGVbaV0pOyBpKyspIHtcblx0XHRpZiAoc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fVxuXG5cdHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZDtcbn1cbiIsImltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuXHJcbi8vQHRzLWlnbm9yZVxyXG5pbXBvcnQgaHR0cFNodXRkb3duIGZyb20gJ2h0dHAtc2h1dGRvd24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTZXJ2ZXJcclxue1xyXG5cdGh0dHBTZXJ2ZXIgOiBhbnk7XHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblx0c3RhdGljIENyZWF0ZShwb3J0IDogbnVtYmVyLCByb290Rm9sZGVyIDogc3RyaW5nKSA6IFByb21pc2U8UGFnZVNlcnZlcj5cclxuXHR7XHJcblx0XHRjb25zdCBzZXJ2ZXIgOiBQYWdlU2VydmVyID0gbmV3IFBhZ2VTZXJ2ZXIoKTtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxQYWdlU2VydmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGlmICghZnMubHN0YXRTeW5jKHJvb3RGb2xkZXIpLmlzRGlyZWN0b3J5KCkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZWplY3QobmV3IFJlZmVyZW5jZUVycm9yKGBSb290IGZvbGRlciAnJHtyb290Rm9sZGVyfScgaXMgbm90IGEgdmFsaWQgZm9sZGVyIWApKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNlcnZlci5odHRwU2VydmVyID0gaHR0cFNodXRkb3duKGh0dHAuY3JlYXRlU2VydmVyKChyZXF1ZXN0IDogaHR0cC5JbmNvbWluZ01lc3NhZ2UsIHJlc3BvbnNlIDogaHR0cC5TZXJ2ZXJSZXNwb25zZSkgPT4ge1xyXG5cclxuXHJcblx0XHRcdFx0Y29uc3QgeyBoZWFkZXJzLCBtZXRob2QsIHVybCB9ID0gcmVxdWVzdDtcclxuXHRcdFx0XHRsZXQgYm9keSA6IFVpbnQ4QXJyYXlbXSA9IFtdO1xyXG5cclxuXHRcdFx0XHRyZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnIgOiBFcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0XHRcdH0pLm9uKCdkYXRhJywgKGNodW5rIDogQnVmZmVyKSA9PiB7XHJcblx0XHRcdFx0XHRib2R5LnB1c2goY2h1bmspO1xyXG5cdFx0XHRcdH0pLm9uKCdlbmQnLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgZmlsZVBhdGggOiBzdHJpbmcgPSByb290Rm9sZGVyICsgcmVxdWVzdC51cmw7XHJcblx0XHRcdFx0XHRpZiAoZmlsZVBhdGggPT0gcm9vdEZvbGRlciArIFwiL1wiKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRmaWxlUGF0aCA9IHJvb3RGb2xkZXIgKyBcIi9pbmRleC5odG1sXCI7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXh0bmFtZSA6IHN0cmluZyA9IHBhdGguZXh0bmFtZShmaWxlUGF0aCk7XHJcblx0XHRcdFx0XHRsZXQgY29udGVudFR5cGUgOiBzdHJpbmcgPSAndGV4dC9odG1sJztcclxuXHRcdFx0XHRcdHN3aXRjaCAoZXh0bmFtZSkgeyBcclxuXHRcdFx0XHRcdFx0Y2FzZSAnLmpzJzpcclxuXHRcdFx0XHRcdFx0XHRjb250ZW50VHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICcuY3NzJzpcclxuXHRcdFx0XHRcdFx0XHRjb250ZW50VHlwZSA9ICd0ZXh0L2Nzcyc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJy5qc29uJzpcclxuXHRcdFx0XHRcdFx0XHRjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAnLnBuZyc6XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSAnaW1hZ2UvcG5nJztcclxuXHRcdFx0XHRcdFx0XHRicmVhazsgICAgICBcclxuXHRcdFx0XHRcdFx0Y2FzZSAnLmpwZyc6XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSAnaW1hZ2UvanBnJztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhgW1BhZ2VTZXJ2ZXJdIEhhbmRsaW5nIHJlcXVlc3QgZm9yICR7ZmlsZVBhdGh9Li4uYCk7XHJcblxyXG5cdFx0XHRcdFx0ZnMucmVhZEZpbGUoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycm9yIDogRXJyb3IsIGNvbnRlbnQgOiBCdWZmZXIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGVycm9yKVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5ncm91cChcIltQYWdlU2VydmVyXSBDb3VsZG4ndCBoYW5kbGUgcmVxdWVzdFwiKTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHRcdFx0XHRcdFx0ZnMucmVhZEZpbGUocm9vdEZvbGRlciArICcvaW5kZXguaHRtbCcsIGZ1bmN0aW9uKGVycm9yIDogRXJyb3IsIGNvbnRlbnQgOiBCdWZmZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChlcnJvcilcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2Uud3JpdGVIZWFkKDUwMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmVuZCgnNTAwJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZ3JvdXAoXCJbUGFnZVNlcnZlcl0gQ291bGRuJ3QgcmV0dXJuIGluZGV4Lmh0bWwgYXMgcmVzcG9uc2UgdG8gZXJyb3IgaGFuZGxpbmdcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmVuZCgpOyBcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6IGNvbnRlbnRUeXBlIH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UuZW5kKGNvbnRlbnQsICd1dGYtOCcpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6IGNvbnRlbnRUeXBlIH0pO1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmVuZChjb250ZW50LCAndXRmLTgnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pKTtcclxuXHJcblx0XHRcdHNlcnZlci5odHRwU2VydmVyLm9uKCdsaXN0ZW5pbmcnLCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coYFtQYWdlU2VydmVyXSBMaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9Li4uYCk7XHJcblx0XHRcdFx0cmVzb2x2ZShzZXJ2ZXIpO1xyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0c2VydmVyLmh0dHBTZXJ2ZXIub24oJ2Vycm9yJywgKGVycm9yIDogRXJyb3IpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGBbUGFnZVNlcnZlcl0gRXJyb3Igc3RhcnRpbmcgc2VydmVyLi4uYCk7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHJcblx0XHRcdHNlcnZlci5odHRwU2VydmVyLmxpc3Rlbihwb3J0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c2h1dGRvd24oKSA6IFByb21pc2U8dm9pZD5cclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmh0dHBTZXJ2ZXIuc2h1dGRvd24oKCk9PntcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59IiwiZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBBcnJheTxUPiB7XHJcblx0XHRyZW1vdmUoZWxlbTogVCk6IEFycmF5PFQ+O1xyXG5cdH1cclxufVxyXG5cclxuaWYgKEFycmF5LnByb3RvdHlwZS5yZW1vdmUpIHtcclxuXHRBcnJheS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb248VD4odGhpczogVFtdLCBlbGVtOiBUKTogVFtdIHtcclxuXHRcdHJldHVybiB0aGlzLmZpbHRlcihlID0+IGUgIT09IGVsZW0pO1xyXG5cdH1cclxufVxyXG5cclxudHlwZSBGb3JFYWNoUGxheWVyQ2FsbGJhY2sgPSAocGxheWVySUQgOiBudW1iZXIpID0+IHZvaWQ7XHJcbmNsYXNzIFNlc3Npb248U2Vzc2lvbkRhdGE+IHtcclxuXHRwcml2YXRlIGlkIDogbnVtYmVyO1xyXG5cdHByaXZhdGUgY3VycmVudFNlc3Npb25EYXRhIDogU2Vzc2lvbkRhdGE7XHJcblx0cHJpdmF0ZSBjb25uZWN0ZWRQbGF5ZXJJRHMgOiBudW1iZXJbXSA9IFtdO1xyXG5cdGdldCBDdXJyZW50UGxheWVyQ291bnQoKSB7IHJldHVybiB0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5sZW5ndGg7IH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKElEIDogbnVtYmVyLCBzZXNzaW9uRGF0YSA6IFNlc3Npb25EYXRhKVxyXG5cdHtcclxuXHRcdHRoaXMuaWQgPSBJRDtcclxuXHRcdHRoaXMuY3VycmVudFNlc3Npb25EYXRhID0gc2Vzc2lvbkRhdGE7XHJcblx0fVxyXG5cclxuXHRhZGRQbGF5ZXJCeUlEKHBsYXllcklEIDogbnVtYmVyKSA6IGJvb2xlYW5cclxuXHR7XHJcblx0XHR0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5wdXNoKHBsYXllcklEKTtcclxuXHRcdGlmICh0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5pbmRleE9mKHBsYXllcklEKSA+IC0xKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBbU2Vzc2lvblNlcnZlcl0gUGxheWVyICR7cGxheWVySUR9IGlzIGFscmVhZHkgcGFydCBvZiBzZXNzaW9uICR7dGhpcy5pZH0gKGN1cnJlbnQgcGxheWVyczogJHt0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5qb2luKCcsICcpfSlgKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRyZW1vdmVQbGF5ZXJCeUlEKHBsYXllcklEIDogbnVtYmVyKSA6IGJvb2xlYW5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5jb25uZWN0ZWRQbGF5ZXJJRHMuaW5kZXhPZihwbGF5ZXJJRCkgPD0gLTEpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFtTZXNzaW9uU2VydmVyXSBQbGF5ZXIgJHtwbGF5ZXJJRH0gaXMgbm90IHBhcnQgb2Ygc2Vzc2lvbiAke3RoaXMuaWR9IChjdXJyZW50IHBsYXllcnM6ICR7dGhpcy5jb25uZWN0ZWRQbGF5ZXJJRHMuam9pbignLCAnKX0pYCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY29ubmVjdGVkUGxheWVySURzLnJlbW92ZShwbGF5ZXJJRCk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHNlcmlhbGl6ZURhdGEoKSA6IHN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmN1cnJlbnRTZXNzaW9uRGF0YSk7XHJcblx0fVxyXG5cclxuXHRmb3JFYWNoUGxheWVyKGNhbGxiYWNrIDogRm9yRWFjaFBsYXllckNhbGxiYWNrKVxyXG5cdHtcclxuXHRcdHRoaXMuY29ubmVjdGVkUGxheWVySURzLmZvckVhY2goY2FsbGJhY2spO1xyXG5cdH1cclxufTtcclxuXHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCAqIGFzIHdzIGZyb20gJ3dlYnNvY2tldCc7XHJcblxyXG50eXBlIGNvbW1hbmRTaWduYXR1cmUgPSAocGxheWVySUQgOiBudW1iZXIsIGpzb25NZXNzYWdlIDogYW55KSA9PiBhbnk7XHJcbmV4cG9ydCBjbGFzcyBTZXNzaW9uU2VydmVyPFNlc3Npb25EYXRhPlxyXG57XHJcblx0cHJpdmF0ZSBjb21tYW5kcyA6IHtbbmFtZSA6IHN0cmluZ106IGNvbW1hbmRTaWduYXR1cmV9ID0ge307XHJcblxyXG5cdHByaXZhdGUgbmV4dFNlc3Npb25JRCA6IG51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBzZXNzaW9ucyA6IHtbSUQgOiBudW1iZXJdOiBTZXNzaW9uPFNlc3Npb25EYXRhPn0gPSB7fTtcclxuXHJcblx0cHJpdmF0ZSBuZXh0UGxheWVySUQgOiBudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgcGxheWVyIDoge1tJRCA6IG51bWJlcl06IHdzLmNvbm5lY3Rpb259ID0ge307XHJcblxyXG5cdHByaXZhdGUgcG9ydCA6IG51bWJlcjtcclxuXHJcblx0cHJpdmF0ZSBodHRwU2VydmVyIDogaHR0cC5TZXJ2ZXI7XHJcblx0cHJpdmF0ZSB3c1NlcnZlciA6IHdzLnNlcnZlcjtcclxuXHJcblx0cHJpdmF0ZSBTZXR1cENvbW1hbmRzKClcclxuXHR7XHJcblx0XHR0aGlzLmNvbW1hbmRzW1wiY3JlYXRlU2Vzc2lvblwiXSA9IChwbGF5ZXJJRCA6IG51bWJlciwganNvbk1lc3NhZ2UgOiBhbnkpID0+XHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IG5ld1Nlc3Npb25JRCA9IHRoaXMuZ2VuZXJhdGVTZXNzaW9uSUQoKTtcclxuXHRcdFx0dGhpcy5zZXNzaW9uc1tuZXdTZXNzaW9uSURdID0gbmV3IFNlc3Npb24obmV3U2Vzc2lvbklELCBqc29uTWVzc2FnZS5tYXBOYW1lKTtcclxuXHRcdFx0aWYgKHRoaXMuc2Vzc2lvbnNbbmV3U2Vzc2lvbklEXS5hZGRQbGF5ZXJCeUlEKHBsYXllcklEKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFtTZXNzaW9uU2VydmVyXSBVbmFibGUgdG8gYWRkIHBsYXllciAke3BsYXllcklEfSB0byBuZXdseSBjcmVhdGVkIHNlc3Npb24gJHtuZXdTZXNzaW9uSUR9YCk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIENyZWF0ZWQgbmV3IHNlc3Npb24gd2l0aCBJRCAke25ld1Nlc3Npb25JRH1gKTtcclxuXHJcblx0XHRcdHRoaXMuc2VuZE1lc3NhZ2VUb1BsYXllcihwbGF5ZXJJRCwgSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25Kb2luXCIsXHJcblx0XHRcdFx0XCJzZXNzaW9uSURcIjogbmV3U2Vzc2lvbklELFxyXG5cdFx0XHRcdFwic2Vzc2lvblwiOiB0aGlzLnNlc3Npb25zW25ld1Nlc3Npb25JRF0uc2VyaWFsaXplRGF0YSgpXHJcblx0XHRcdH0pKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jb21tYW5kc1tcImpvaW5TZXNzaW9uXCJdID0gKHBsYXllcklEIDogbnVtYmVyLCBqc29uTWVzc2FnZSA6IGFueSkgPT5cclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5sb2coYFtTZXNzaW9uU2VydmVyXSBQbGF5ZXIgJHtwbGF5ZXJJRH0gYXR0ZW1wdGluZyB0byBqb2luIHNlc3Npb24gJHtqc29uTWVzc2FnZS5zZXNzaW9uSUR9YCk7XHJcblx0XHRcdGlmIChqc29uTWVzc2FnZS5zZXNzaW9uSUQgPCAtMSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiW1Nlc3Npb25TZXJ2ZXJdIEludmFsaWQgc2Vzc2lvbiBpZFwiKTtcclxuXHRcdFx0XHRyZXR1cm4ge1wic2Vzc2lvbklEXCI6IC0xfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gcmVxdWVzdGluZyBhIGpvaW4gdG8gc2Vzc2lvbiBJRCAtMSB3aWxsIGpvaW4gdGhlIGxhdGVzdCBzZXNzaW9uXHJcblx0XHRcdGlmIChqc29uTWVzc2FnZS5zZXNzaW9uSUQgPT0gLTEpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRqc29uTWVzc2FnZS5zZXNzaW9uSUQgPSB0aGlzLm5leHRTZXNzaW9uSUQgLSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuc2Vzc2lvbnNbanNvbk1lc3NhZ2Uuc2Vzc2lvbklEXSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGBbU2Vzc2lvblNlcnZlcl0gU2Vzc2lvbiAke2pzb25NZXNzYWdlLnNlc3Npb25JRH0gKG5vIGxvbmdlcikgZG9lc24ndCBleGlzdGApO1xyXG5cdFx0XHRcdHJldHVybiB7XCJzZXNzaW9uSURcIjogLTF9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uYWRkUGxheWVyQnlJRChwbGF5ZXJJRCk7XHJcblxyXG5cdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcImNvbW1hbmRcIjogXCJzZXNzaW9uSm9pblwiLFxyXG5cdFx0XHRcdFwic2Vzc2lvbklEXCI6IGpzb25NZXNzYWdlLnNlc3Npb25JRCxcclxuXHRcdFx0XHRcInNlc3Npb25cIjogdGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdLnNlcmlhbGl6ZURhdGEoKVxyXG5cdFx0XHR9KSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuY29tbWFuZHNbXCJsZWF2ZVNlc3Npb25cIl0gPSAocGxheWVySUQgOiBudW1iZXIsIGpzb25NZXNzYWdlIDogYW55KSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRpZiAodHlwZW9mIGpzb25NZXNzYWdlLnNlc3Npb25JRCAhPSBcIm51bWJlclwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgW1Nlc3Npb25TZXJ2ZXJdIGxlYXZlU2Vzc2lvbiByZXF1aXJlcyBhICdzZXNzaW9uSUQnLXBhcmFtZXRlciBhcyBudW1iZXIhIChzdXBwbGllZDogJHtqc29uTWVzc2FnZS5zZXNzaW9uSUR9IFske3R5cGVvZiBqc29uTWVzc2FnZS5zZXNzaW9uSUR9XSlgKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdLnJlbW92ZVBsYXllckJ5SUQocGxheWVySUQpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIFBsYXllcnMgbGVmdCBpbiBzZXNzaW9uICR7anNvbk1lc3NhZ2Uuc2Vzc2lvbklEfTogJHt0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uQ3VycmVudFBsYXllckNvdW50fWApO1xyXG5cdFx0XHRpZiAoIXRoaXMuc2Vzc2lvbnNbanNvbk1lc3NhZ2Uuc2Vzc2lvbklEXS5DdXJyZW50UGxheWVyQ291bnQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIFNlc3Npb24gJHtqc29uTWVzc2FnZS5zZXNzaW9uSUR9IGhhcyBubyBwbGF5ZXJzIGxlZnQ7IGRpc2NhcmRpbmcgaXRgKTtcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIFwie31cIik7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZW5lcmF0ZVBsYXllckNsb3NlSGFuZGxlcihwbGF5ZXJJRCA6IG51bWJlcilcclxuXHR7XHJcblx0XHRyZXR1cm4gKHJlYXNvbkNvZGUgOiBudW1iZXIsIGRlc2NyaXB0aW9uIDogc3RyaW5nKSA9PiB7XHJcblx0XHRcdHRoaXMucmVtb3ZlUGxheWVyKHBsYXllcklEKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZVBsYXllcihwbGF5ZXJJRCA6IG51bWJlcilcclxuXHR7XHJcblx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIENvbm5lY3Rpb24gZnJvbSBwbGF5ZXIgJHtwbGF5ZXJJRH0gY2xvc2VkLi4uYCk7XHJcblx0XHRmb3IgKGNvbnN0IHNlc3Npb25JRCBpbiB0aGlzLnNlc3Npb25zKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNvbW1hbmRzLmxlYXZlU2Vzc2lvbi5hcHBseSh0aGlzLCBbcGxheWVySUQsIHtcInNlc3Npb25JRFwiOiBwYXJzZUludChzZXNzaW9uSUQpfV0pO1xyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIHRoaXMucGxheWVyW3BsYXllcklEXTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaGFuZGxlTmV3UGxheWVyKHJlcXVlc3QgOiB3cy5yZXF1ZXN0KVxyXG5cdHtcclxuXHRcdGNvbnN0IGNvbm5lY3Rpb24gOiB3cy5jb25uZWN0aW9uID0gcmVxdWVzdC5hY2NlcHQodW5kZWZpbmVkLCByZXF1ZXN0Lm9yaWdpbik7XHJcblx0XHRcclxuXHRcdGNvbnN0IHBsYXllcklEIDogbnVtYmVyID0gdGhpcy5nZW5lcmF0ZVBsYXllcklEKCk7XHJcblx0XHR0aGlzLnBsYXllcltwbGF5ZXJJRF0gPSBjb25uZWN0aW9uO1xyXG5cclxuXHRcdHRoaXMucGxheWVyW3BsYXllcklEXS5vbignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XHJcblx0XHRcdGlmIChtZXNzYWdlLnR5cGUgPT09ICd1dGY4JylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRyeVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGNvbnN0IGpzb25NZXNzYWdlID0gSlNPTi5wYXJzZShtZXNzYWdlLnV0ZjhEYXRhIGFzIHN0cmluZyk7XHJcblx0XHRcdFx0XHR0aGlzLmhhbmRsZU1lc3NhZ2UocGxheWVySUQsIGpzb25NZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2goZSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb25zb2xlLmdyb3VwKFwiSW52YWxpZCBKU09OIHN0cmluZyByZWNlaXZlZCFcIik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMucGxheWVyW3BsYXllcklEXS5vbignY2xvc2UnLFxyXG5cdFx0XHR0aGlzLmdlbmVyYXRlUGxheWVyQ2xvc2VIYW5kbGVyKHBsYXllcklEKVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHBvcnQgOiBudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5wb3J0ID0gcG9ydDtcclxuXHJcblx0XHR0aGlzLmh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigoKSA9PiB7fSk7XHJcblx0XHR0aGlzLmh0dHBTZXJ2ZXIubGlzdGVuKHRoaXMucG9ydCwgKCkgPT4ge30pO1xyXG5cclxuXHRcdHRoaXMud3NTZXJ2ZXIgPSBuZXcgd3Muc2VydmVyKHsgaHR0cFNlcnZlcjogdGhpcy5odHRwU2VydmVyIH0pO1xyXG5cclxuXHRcdHRoaXMud3NTZXJ2ZXIub24oJ3JlcXVlc3QnLCB0aGlzLmhhbmRsZU5ld1BsYXllcik7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coYFtTZXNzaW9uU2VydmVyXSBSdW5uaW5nIGF0IHBvcnQgJHt0aGlzLnBvcnR9YCk7XHJcblx0fVxyXG5cclxuXHRnZW5lcmF0ZVBsYXllcklEKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5uZXh0UGxheWVySUQrKztcclxuXHR9XHJcblxyXG5cdGdlbmVyYXRlU2Vzc2lvbklEKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5uZXh0U2Vzc2lvbklEKys7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVNZXNzYWdlKHBsYXllcklEIDogbnVtYmVyLCBqc29uTWVzc2FnZSA6IGFueSlcclxuXHR7XHJcblx0XHRpZiAoanNvbk1lc3NhZ2UuY29tbWFuZClcclxuXHRcdHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLmNvbW1hbmRzW2pzb25NZXNzYWdlLmNvbW1hbmRdID09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY29tbWFuZHNbanNvbk1lc3NhZ2UuY29tbWFuZF0uYXBwbHkodGhpcywgW3BsYXllcklELCBqc29uTWVzc2FnZV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFtTZXNzaW9uU2VydmVyXSBubyBjb21tYW5kIGNhbGxlZCBcIiR7anNvbk1lc3NhZ2UuY29tbWFuZH1cIiBhdmFpbGFibGVgKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZW5kTWVzc2FnZVRvUGxheWVyKHBsYXllcklEIDogbnVtYmVyLCBtZXNzYWdlIDogc3RyaW5nKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5wbGF5ZXJbcGxheWVySURdKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBbU2Vzc2lvblNlcnZlcl0gTm8gcGxheWVyIHdpdGggSUQgJHtwbGF5ZXJJRH0gaXMgY29ubmVjdGVkIWApO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbGF5ZXJbcGxheWVySURdLnNlbmQobWVzc2FnZSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZVJlcGxpY2Eoc2Vzc2lvbiA6IFNlc3Npb248U2Vzc2lvbkRhdGE+KVxyXG5cdHtcclxuXHRcdHNlc3Npb24uZm9yRWFjaFBsYXllcigoKHBsYXllcklEIDogbnVtYmVyKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcImNvbW1hbmRcIjogXCJzZXNzaW9uVXBkYXRlXCIsIFwic2Vzc2lvblwiOiBzZXNzaW9uLnNlcmlhbGl6ZURhdGEoKX0pKTtcclxuXHRcdH0pLmJpbmQodGhpcykpO1xyXG5cdH1cclxufTsiLCJpbXBvcnQge1Nlc3Npb25EYXRhfSBmcm9tIFwiR2FtZS9TZXNzaW9uRGF0YVwiXHJcbmltcG9ydCB7U2Vzc2lvblNlcnZlcn0gZnJvbSBcIlNlc3Npb25TZXJ2ZXIvU2Vzc2lvblNlcnZlclwiXHJcbmltcG9ydCB7UGFnZVNlcnZlcn0gZnJvbSBcIlBhZ2VTZXJ2ZXIvUGFnZVNlcnZlclwiXHJcblxyXG5jb25zdCBzZXNzaW9uU2VydmVyIDogU2Vzc2lvblNlcnZlcjxTZXNzaW9uRGF0YT4gPSBuZXcgU2Vzc2lvblNlcnZlcjxTZXNzaW9uRGF0YT4ocGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCB8fCBcIlwiKSB8fCA3OTk2KTtcclxuY29uc3QgcGFnZVNlcnZlciA6IFByb21pc2U8UGFnZVNlcnZlcj4gPSBQYWdlU2VydmVyLkNyZWF0ZShwYXJzZUludChwcm9jZXNzLmVudi5QT1JUIHx8IFwiXCIpIHx8IDc5OTUsIFwiaHRtbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9