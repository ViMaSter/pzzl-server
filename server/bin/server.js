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

/***/ "./src/Game/PuzzleData.ts":
/*!********************************!*\
  !*** ./src/Game/PuzzleData.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class PuzzleData {
    constructor(parameters) {
        this.pieces = [];
        this.imageURL = "";
        if (typeof parameters.imageURL != "string") {
            throw TypeError("Constructing PuzzleData requires a 'imageURL'-string parameter");
            return;
        }
        this.imageURL = parameters.imageURL;
    }
    Update(parameters) {
        if (typeof parameters.indexX != "number") {
            throw TypeError("Constructing PuzzleData requires a 'indexX'-number parameter");
            return;
        }
        if (typeof parameters.indexY != "number") {
            throw TypeError("Constructing PuzzleData requires a 'indexY'-number parameter");
            return;
        }
        if (typeof parameters.posX != "number") {
            throw TypeError("Constructing PuzzleData requires a 'posX'-number parameter");
            return;
        }
        if (typeof parameters.posY != "number") {
            throw TypeError("Constructing PuzzleData requires a 'posY'-number parameter");
            return;
        }
        if (typeof this.pieces[parameters.indexX] == "undefined") {
            this.pieces[parameters.indexX] = [];
        }
        if (typeof this.pieces[parameters.indexX][parameters.indexY] == "undefined") {
            this.pieces[parameters.indexX][parameters.indexY] = new Piece();
        }
        this.pieces[parameters.indexX][parameters.indexY].x = parameters.posX;
        this.pieces[parameters.indexX][parameters.indexY].y = parameters.posY;
    }
}
exports.PuzzleData = PuzzleData;


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
    constructor(sessionType, ID, sessionCreationArguments) {
        this.connectedPlayerIDs = [];
        this.id = ID;
        this.currentSessionData = new sessionType(sessionCreationArguments);
    }
    get CurrentPlayerCount() { return this.connectedPlayerIDs.length; }
    ;
    HasPlayerInSession(playerID) {
        return this.connectedPlayerIDs.indexOf(playerID) > -1;
    }
    AddPlayerByID(playerID) {
        if (this.HasPlayerInSession(playerID)) {
            console.error(`[SessionServer] Player ${playerID} is already part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
            return false;
        }
        this.connectedPlayerIDs.push(playerID);
        return true;
    }
    RemovePlayerByID(playerID) {
        if (!this.HasPlayerInSession(playerID)) {
            console.error(`[SessionServer] Player ${playerID} is not part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
            return false;
        }
        this.connectedPlayerIDs.slice(this.connectedPlayerIDs.indexOf(playerID), 1);
        return true;
    }
    Update(playerID, sessionUpdateArguments) {
        if (!this.HasPlayerInSession(playerID)) {
            console.error(`[SessionServer] Player ${playerID} is not part of session ${this.id} and therefore can't update the session (current players: ${this.connectedPlayerIDs.join(', ')})`);
            return false;
        }
        this.currentSessionData.Update(sessionUpdateArguments);
        return true;
    }
    GetData() {
        return this.currentSessionData;
    }
    ForEachPlayer(callback) {
        this.connectedPlayerIDs.forEach(callback);
    }
}
;
const http = __importStar(__webpack_require__(/*! http */ "http"));
const ws = __importStar(__webpack_require__(/*! websocket */ "./node_modules/websocket/index.js"));
class SessionServer {
    constructor(sessionType, port) {
        this.commands = {};
        this.nextSessionID = 0;
        this.sessions = {};
        this.nextPlayerID = 0;
        this.player = {};
        this.sessionType = sessionType;
        this.port = port;
        this.httpServer = http.createServer(() => { });
        this.httpServer.listen(this.port, () => { });
        this.wsServer = new ws.server({ httpServer: this.httpServer });
        this.setupCommands();
        this.wsServer.on('request', this.handleNewPlayer.bind(this));
        console.log(`[SessionServer] Listening on port ${this.port}...`);
    }
    validateSessionID(playerID, sessionID, request) {
        if (typeof sessionID != "number") {
            console.error(`[SessionServer] ${request} requires a 'sessionID'-parameter as number! (supplied: ${sessionID} [${typeof sessionID}])`);
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": request,
                "sessionID": -1
            }));
            return false;
        }
        if (!this.sessions[sessionID]) {
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": request,
                "sessionID": -2
            }));
            return false;
        }
        return true;
    }
    setupCommands() {
        this.commands["createSession"] = (playerID, jsonMessage) => {
            const newSessionID = this.generateSessionID();
            this.sessions[newSessionID] = new Session(this.sessionType, newSessionID, jsonMessage.parameters);
            if (!this.sessions[newSessionID].AddPlayerByID(playerID)) {
                console.error(`[SessionServer] Unable to add player ${playerID} to newly created session ${newSessionID}`);
                this.sendMessageToPlayer(playerID, JSON.stringify({
                    "command": "sessionJoin",
                    "sessionID": -1,
                    "session": {}
                }));
                return;
            }
            console.log(`[SessionServer] Created new session with ID ${newSessionID}`);
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": "sessionJoin",
                "sessionID": newSessionID,
                "session": this.sessions[newSessionID].GetData()
            }));
        };
        this.commands["updateSession"] = (playerID, jsonMessage) => {
            console.log(`[SessionServer] Player ${playerID} attempting to update session ${jsonMessage.sessionID}`);
            if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionUpdate")) {
                return;
            }
            if (!this.sessions[jsonMessage.sessionID].Update(playerID, jsonMessage.parameters)) {
                this.sendMessageToPlayer(playerID, JSON.stringify({
                    "command": "sessionUpdate",
                    "sessionID": -3
                }));
            }
            console.log("FFFFFFFFFFFFFFFFFF");
            console.log(this.sessions[jsonMessage.sessionID].connectedPlayerIDs);
            this.sessions[jsonMessage.sessionID].ForEachPlayer(((playerID) => {
                console.log("Update for " + playerID);
                this.sendMessageToPlayer(playerID, JSON.stringify({ "command": "sessionUpdate", "sessionID": jsonMessage.sessionID, "session": this.sessions[jsonMessage.sessionID].GetData() }));
            }).bind(this));
        };
        this.commands["joinSession"] = (playerID, jsonMessage) => {
            if (jsonMessage.sessionID != -1 && !this.validateSessionID(playerID, jsonMessage.sessionID, "sessionJoin")) {
                return;
            }
            // requesting a join to session ID -1 will join the latest session
            if (jsonMessage.sessionID == -1) {
                jsonMessage.sessionID = this.nextSessionID - 1;
            }
            if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionJoin")) {
                return;
            }
            if (!this.sessions[jsonMessage.sessionID].AddPlayerByID(playerID)) {
                this.sendMessageToPlayer(playerID, JSON.stringify({
                    "command": "sessionJoin",
                    "sessionID": -3
                }));
                return;
            }
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": "sessionJoin",
                "sessionID": jsonMessage.sessionID,
                "session": this.sessions[jsonMessage.sessionID].GetData()
            }));
        };
        this.commands["leaveSession"] = (playerID, jsonMessage) => {
            if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionLeave")) {
                return;
            }
            if (!this.sessions[jsonMessage.sessionID].RemovePlayerByID(playerID)) {
                this.sendMessageToPlayer(playerID, JSON.stringify({
                    "command": "sessionLeave",
                    "sessionID": -3
                }));
                return;
            }
            console.log(`[SessionServer] Players left in session ${jsonMessage.sessionID}: ${this.sessions[jsonMessage.sessionID].CurrentPlayerCount}`);
            if (!this.sessions[jsonMessage.sessionID].CurrentPlayerCount) {
                console.log(`[SessionServer] Session ${jsonMessage.sessionID} has no players left; discarding it`);
                delete this.sessions[jsonMessage.sessionID];
            }
            this.sendMessageToPlayer(playerID, JSON.stringify({
                "command": "sessionLeave",
                "sessionID": jsonMessage.sessionID
            }));
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
const PuzzleData_1 = __webpack_require__(/*! Game/PuzzleData */ "./src/Game/PuzzleData.ts");
const SessionServer_1 = __webpack_require__(/*! SessionServer/SessionServer */ "./src/SessionServer/SessionServer.ts");
const PageServer_1 = __webpack_require__(/*! PageServer/PageServer */ "./src/PageServer/PageServer.ts");
const sessionServer = new SessionServer_1.SessionServer(PuzzleData_1.PuzzleData, parseInt(process.env.PORT || "") || 7996);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0dHAtc2h1dGRvd24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXR5cGVkYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90eXBlZGFycmF5LXRvLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL0J1ZmZlclV0aWwuZmFsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvQnVmZmVyVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9EZXByZWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9WYWxpZGF0aW9uLmZhbGxiYWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvVzNDV2ViU29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9XZWJTb2NrZXRDb25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldEZyYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvV2ViU29ja2V0Um91dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL1dlYlNvY2tldFJvdXRlclJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvV2ViU29ja2V0U2VydmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvd2Vic29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJzb2NrZXQvdmVuZG9yL0Zhc3RCdWZmZXJMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95YWV0aS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWFldGkvbGliL0V2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95YWV0aS9saWIvRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUvUHV6emxlRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZVNlcnZlci9QYWdlU2VydmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TZXNzaW9uU2VydmVyL1Nlc3Npb25TZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYnVmZmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHR5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixtQkFBTyxDQUFDLGtEQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN4V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTtBQUN6QixZQUFZLG1CQUFPLENBQUMsc0RBQVM7QUFDN0IsbUJBQW1CLG1CQUFPLENBQUMsc0JBQVE7QUFDbkMscUJBQXFCLG1CQUFPLENBQUMsd0VBQWtCO0FBQy9DLGlCQUFpQixtQkFBTyxDQUFDLG1GQUEwQjtBQUNuRCxpQkFBaUIsbUJBQU8sQ0FBQyxnRUFBYztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxxREFBcUQ7QUFDckQsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLFFBQVE7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7O0FBRWxDO0FBQ0EsMkJBQTJCLFFBQVE7O0FBRW5DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywrQ0FBK0MsUUFBUTs7QUFFakc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsMkJBQTJCLEVBQUU7QUFDbEU7O0FBRUEsaUNBQWlDLDBCQUEwQixFQUFFOztBQUU3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDO0FBQ0EsbUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlGQUFpRixRQUFROztBQUV6RjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxVQUFVO0FBQzNELDJDQUEyQyxVQUFVO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7OztBQy8zQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBTyxDQUFDLGdFQUFjO0FBQ3ZDLHdCQUF3QixtQkFBTyxDQUFDLHNEQUFTOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7OztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNCQUFRO0FBQzdCLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTtBQUN6QixVQUFVLG1CQUFPLENBQUMsZ0JBQUs7QUFDdkIsbUJBQW1CLG1CQUFPLENBQUMsc0JBQVE7QUFDbkMsMEJBQTBCLG1CQUFPLENBQUMsa0ZBQXVCOztBQUV6RDtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE1BQU0sS0FBSztBQUNYO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkRBQTZEO0FBQzdELFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzREFBUztBQUM5QixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsbUJBQW1CLG1CQUFPLENBQUMsc0JBQVE7QUFDbkMsNkJBQTZCLG1CQUFPLENBQUMsd0ZBQTBCOztBQUUvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLCtCQUErQjtBQUNoRDs7QUFFQTtBQUNBLCtDQUErQyxTQUFTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCLG1CQUFtQixtQkFBTyxDQUFDLHNCQUFROztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0RBQVM7QUFDOUIsWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTtBQUN6QixZQUFZLG1CQUFPLENBQUMsZ0RBQU87QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsc0JBQVE7QUFDbkMsdUJBQXVCLG1CQUFPLENBQUMsNEVBQW9COztBQUVuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsdUNBQXVDO0FBQzlEOztBQUVBOzs7Ozs7Ozs7Ozs7QUNwUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksbUJBQU8sQ0FBQyxzQkFBUTtBQUNwQiw2QkFBNkIsdUNBQXVDOztBQUVwRTtBQUNBO0FBQ0EseUNBQXlDLHlCQUF5Qjs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLGdEQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixnQ0FBZ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ2pFQSxpQkFBaUIsbUJBQU8sQ0FBQyw4REFBaUI7Ozs7Ozs7Ozs7OztBQ0ExQztBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDBFQUFtQjtBQUNoRCxxQkFBcUIsbUJBQU8sQ0FBQywwRUFBbUI7QUFDaEQscUJBQXFCLG1CQUFPLENBQUMsMEVBQW1CO0FBQ2hELHFCQUFxQixtQkFBTyxDQUFDLHdFQUFrQjtBQUMvQyxxQkFBcUIsbUJBQU8sQ0FBQyw0RUFBb0I7QUFDakQscUJBQXFCLG1CQUFPLENBQUMsa0ZBQXVCO0FBQ3BELHFCQUFxQixtQkFBTyxDQUFDLG9FQUFnQjtBQUM3QyxxQkFBcUIsbUJBQU8sQ0FBQyxrRUFBZTtBQUM1QyxxQkFBcUIsbUJBQU8sQ0FBQywwREFBVztBQUN4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQyxzQkFBUTtBQUNuQyx3QkFBd0IsbUJBQU8sQ0FBQywyREFBYzs7QUFFOUM7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEIsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLGtCQUFNOzs7Ozs7Ozs7Ozs7QUM5TGQ7QUFDQSxlQUFlLG1CQUFPLENBQUMsa0VBQW1CO0FBQzFDLGVBQWUsbUJBQU8sQ0FBQyxzREFBYTtBQUNwQzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEhBLE1BQU0sS0FBSztJQUFYO1FBRUMsTUFBQyxHQUFZLENBQUMsQ0FBQztRQUNmLE1BQUMsR0FBWSxDQUFDLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBRUQsTUFBYSxVQUFVO0lBSXRCLFlBQVksVUFBZ0I7UUFGNUIsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksRUFBRSxDQUFDO1FBR3RCLElBQUksT0FBTyxVQUFVLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFDMUM7WUFDQyxNQUFNLFNBQVMsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1lBQ2xGLE9BQU87U0FDUDtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQWdCO1FBRXRCLElBQUksT0FBTyxVQUFVLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFDeEM7WUFDQyxNQUFNLFNBQVMsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQ2hGLE9BQU87U0FDUDtRQUNELElBQUksT0FBTyxVQUFVLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFDeEM7WUFDQyxNQUFNLFNBQVMsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQ2hGLE9BQU87U0FDUDtRQUNELElBQUksT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFDdEM7WUFDQyxNQUFNLFNBQVMsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1lBQzlFLE9BQU87U0FDUDtRQUNELElBQUksT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFDdEM7WUFDQyxNQUFNLFNBQVMsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1lBQzlFLE9BQU87U0FDUDtRQUVELElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQ3hEO1lBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQzNFO1lBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7U0FDaEU7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7Q0FDRDtBQWpERCxnQ0FpREM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REQsbUVBQTZCO0FBQzdCLG1FQUE2QjtBQUM3Qiw2REFBeUI7QUFFekIsWUFBWTtBQUNaLDJIQUF5QztBQUV6QyxNQUFhLFVBQVU7SUFHdEIsZ0JBQXVCLENBQUM7SUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFhLEVBQUUsVUFBbUI7UUFFL0MsTUFBTSxNQUFNLEdBQWdCLElBQUksVUFBVSxFQUFFLENBQUM7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFDM0M7Z0JBQ0MsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLGdCQUFnQixVQUFVLDBCQUEwQixDQUFDLENBQUMsQ0FBQztnQkFDakYsT0FBTzthQUNQO1lBRUQsTUFBTSxDQUFDLFVBQVUsR0FBRyx1QkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUE4QixFQUFFLFFBQThCLEVBQUUsRUFBRTtnQkFHckgsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO2dCQUN6QyxJQUFJLElBQUksR0FBa0IsRUFBRSxDQUFDO2dCQUU3QixPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVcsRUFBRSxFQUFFO29CQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBYyxFQUFFLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNqQixJQUFJLFFBQVEsR0FBWSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDakQsSUFBSSxRQUFRLElBQUksVUFBVSxHQUFHLEdBQUcsRUFDaEM7d0JBQ0MsUUFBUSxHQUFHLFVBQVUsR0FBRyxhQUFhLENBQUM7cUJBQ3RDO29CQUVELE1BQU0sT0FBTyxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2hELElBQUksV0FBVyxHQUFZLFdBQVcsQ0FBQztvQkFDdkMsUUFBUSxPQUFPLEVBQUU7d0JBQ2hCLEtBQUssS0FBSzs0QkFDVCxXQUFXLEdBQUcsaUJBQWlCLENBQUM7NEJBQ2hDLE1BQU07d0JBQ1AsS0FBSyxNQUFNOzRCQUNWLFdBQVcsR0FBRyxVQUFVLENBQUM7NEJBQ3pCLE1BQU07d0JBQ1AsS0FBSyxPQUFPOzRCQUNYLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQzs0QkFDakMsTUFBTTt3QkFDUCxLQUFLLE1BQU07NEJBQ1YsV0FBVyxHQUFHLFdBQVcsQ0FBQzs0QkFDMUIsTUFBTTt3QkFDUCxLQUFLLE1BQU07NEJBQ1YsV0FBVyxHQUFHLFdBQVcsQ0FBQzs0QkFDMUIsTUFBTTtxQkFDUDtvQkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxRQUFRLEtBQUssQ0FBQyxDQUFDO29CQUVoRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxVQUFTLEtBQWEsRUFBRSxPQUFnQjt3QkFDN0QsSUFBSSxLQUFLLEVBQ1Q7NEJBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOzRCQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ25CLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRSxVQUFTLEtBQWEsRUFBRSxPQUFnQjtnQ0FDL0UsSUFBSSxLQUFLLEVBQ1Q7b0NBQ0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO29DQUN2RixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQ25CLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQ0FDZjtnQ0FDRCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dDQUN6RCxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDaEMsQ0FBQyxDQUFDLENBQUM7eUJBQ0g7NkJBRUQ7NEJBQ0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQzs0QkFDekQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7eUJBQy9CO29CQUNGLENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVKLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLElBQUksS0FBSyxDQUFDLENBQUM7Z0JBQ3pELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBRVAsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFFLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQXpHRCxnQ0F5R0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0QsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtJQUMzQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUF1QixJQUFPO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Q7QUFLRCxNQUFNLE9BQU87SUFNWixZQUFZLFdBQXFDLEVBQUUsRUFBVyxFQUFFLHdCQUE4QjtRQUh0Rix1QkFBa0IsR0FBYyxFQUFFLENBQUM7UUFLMUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBTkQsSUFBSSxrQkFBa0IsS0FBSyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQVFwRSxrQkFBa0IsQ0FBQyxRQUFpQjtRQUVuQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGFBQWEsQ0FBQyxRQUFpQjtRQUU5QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFDckM7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixRQUFRLCtCQUErQixJQUFJLENBQUMsRUFBRSxzQkFBc0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkosT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBaUI7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFDdEM7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixRQUFRLDJCQUEyQixJQUFJLENBQUMsRUFBRSxzQkFBc0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0ksT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBaUIsRUFBRSxzQkFBNEI7UUFFckQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFDdEM7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixRQUFRLDJCQUEyQixJQUFJLENBQUMsRUFBRSw2REFBNkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEwsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPO1FBRU4sT0FBTyxJQUFJLENBQUMsa0JBQXlCLENBQUM7SUFDdkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxRQUFnQztRQUU3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRDtBQUFBLENBQUM7QUFFRixtRUFBNkI7QUFDN0IsbUdBQWdDO0FBR2hDLE1BQWEsYUFBYTtJQXdNekIsWUFBWSxXQUFxQyxFQUFFLElBQWE7UUF0TXhELGFBQVEsR0FBeUMsRUFBRSxDQUFDO1FBRXBELGtCQUFhLEdBQVksQ0FBQyxDQUFDO1FBQzNCLGFBQVEsR0FBOEIsRUFBRSxDQUFDO1FBRXpDLGlCQUFZLEdBQVksQ0FBQyxDQUFDO1FBQzFCLFdBQU0sR0FBb0MsRUFBRSxDQUFDO1FBa01wRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUUvRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQXZNTyxpQkFBaUIsQ0FBQyxRQUFpQixFQUFFLFNBQWUsRUFBRSxPQUFnQjtRQUU3RSxJQUFJLE9BQU8sU0FBUyxJQUFJLFFBQVEsRUFDaEM7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixPQUFPLDJEQUEyRCxTQUFTLEtBQUssT0FBTyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3ZJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDakQsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDZixDQUFDLENBQUMsQ0FBQztZQUNKLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDN0I7WUFDQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pELFNBQVMsRUFBRSxPQUFPO2dCQUNsQixXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSixPQUFPLEtBQUssQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRU8sYUFBYTtRQUVwQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBaUIsRUFBRSxXQUFpQixFQUFFLEVBQUU7WUFFekUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUN4RDtnQkFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxRQUFRLDZCQUE2QixZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2pELFNBQVMsRUFBRSxhQUFhO29CQUN4QixXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUNmLFNBQVMsRUFBRSxFQUFFO2lCQUNiLENBQUMsQ0FBQyxDQUFDO2dCQUNKLE9BQU87YUFDUDtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFFM0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNqRCxTQUFTLEVBQUUsYUFBYTtnQkFDeEIsV0FBVyxFQUFFLFlBQVk7Z0JBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRTthQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFpQixFQUFFLFdBQWlCLEVBQUUsRUFBRTtZQUV6RSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixRQUFRLGlDQUFpQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxFQUM3RTtnQkFDQyxPQUFPO2FBQ1A7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQ2xGO2dCQUNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDakQsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLFdBQVcsRUFBRSxDQUFDLENBQUM7aUJBQ2YsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUU7Z0JBRXpFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNqTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBaUIsRUFBRSxXQUFpQixFQUFFLEVBQUU7WUFFdkUsSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUMxRztnQkFDQyxPQUFPO2FBQ1A7WUFFRCxrRUFBa0U7WUFDbEUsSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUMvQjtnQkFDQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsRUFDM0U7Z0JBQ0MsT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFDakU7Z0JBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNqRCxTQUFTLEVBQUUsYUFBYTtvQkFDeEIsV0FBVyxFQUFFLENBQUMsQ0FBQztpQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSixPQUFPO2FBQ1A7WUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pELFNBQVMsRUFBRSxhQUFhO2dCQUN4QixXQUFXLEVBQUUsV0FBVyxDQUFDLFNBQVM7Z0JBQ2xDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUU7YUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBaUIsRUFBRSxXQUFpQixFQUFFLEVBQUU7WUFFeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFDNUU7Z0JBQ0MsT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUNwRTtnQkFDQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2pELFNBQVMsRUFBRSxjQUFjO29CQUN6QixXQUFXLEVBQUUsQ0FBQyxDQUFDO2lCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUNKLE9BQU87YUFDUDtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLFdBQVcsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQzVJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsRUFDNUQ7Z0JBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsV0FBVyxDQUFDLFNBQVMscUNBQXFDLENBQUMsQ0FBQztnQkFDbkcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDakQsU0FBUyxFQUFFLGNBQWM7Z0JBQ3pCLFdBQVcsRUFBRSxXQUFXLENBQUMsU0FBUzthQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNILENBQUM7SUFFTywwQkFBMEIsQ0FBQyxRQUFpQjtRQUVuRCxPQUFPLENBQUMsVUFBbUIsRUFBRSxXQUFvQixFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7SUFDSCxDQUFDO0lBRU8sWUFBWSxDQUFDLFFBQWlCO1FBRXJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLFFBQVEsWUFBWSxDQUFDLENBQUM7UUFDNUUsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUNyQztZQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxlQUFlLENBQUMsT0FBb0I7UUFFM0MsTUFBTSxVQUFVLEdBQW1CLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3RSxNQUFNLFFBQVEsR0FBWSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMvQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUMzQjtnQkFDQyxJQUNBO29CQUNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWtCLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQzFDO2dCQUNELE9BQU0sQ0FBQyxFQUNQO29CQUNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQy9CLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FDekMsQ0FBQztJQUNILENBQUM7SUFtQk8sZ0JBQWdCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxpQkFBaUI7UUFFeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLGFBQWEsQ0FBQyxRQUFpQixFQUFFLFdBQWlCO1FBRXpELElBQUksV0FBVyxDQUFDLE9BQU8sRUFDdkI7WUFDQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxFQUMzRDtnQkFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDeEU7aUJBRUQ7Z0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsV0FBVyxDQUFDLE9BQU8sYUFBYSxDQUFDO2FBQ3JGO1NBQ0Q7SUFDRixDQUFDO0lBRU8sbUJBQW1CLENBQUMsUUFBaUIsRUFBRSxPQUFnQjtRQUU5RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFDMUI7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxRQUFRLGdCQUFnQixDQUFDLENBQUM7WUFDN0UsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNEO0FBN1BELHNDQTZQQztBQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdVRiw0RkFBMEM7QUFDMUMsdUhBQXlEO0FBQ3pELHdHQUFnRDtBQUVoRCxNQUFNLGFBQWEsR0FBbUIsSUFBSSw2QkFBYSxDQUFDLHVCQUFVLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQzlHLE1BQU0sVUFBVSxHQUF5Qix1QkFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNMN0csbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCIvKipcbiAqIERldGVjdCBFbGVjdHJvbiByZW5kZXJlciBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Jyb3dzZXIuanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub2RlLmpzJyk7XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHR0eSA9IHJlcXVpcmUoJ3R0eScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFs2LCAyLCAzLCA0LCA1LCAxXTtcblxuLyoqXG4gKiBCdWlsZCB1cCB0aGUgZGVmYXVsdCBgaW5zcGVjdE9wdHNgIG9iamVjdCBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKlxuICogICAkIERFQlVHX0NPTE9SUz1ubyBERUJVR19ERVBUSD0xMCBERUJVR19TSE9XX0hJRERFTj1lbmFibGVkIG5vZGUgc2NyaXB0LmpzXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0T3B0cyA9IE9iamVjdC5rZXlzKHByb2Nlc3MuZW52KS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gL15kZWJ1Z18vaS50ZXN0KGtleSk7XG59KS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gIC8vIGNhbWVsLWNhc2VcbiAgdmFyIHByb3AgPSBrZXlcbiAgICAuc3Vic3RyaW5nKDYpXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZSgvXyhbYS16XSkvZywgZnVuY3Rpb24gKF8sIGspIHsgcmV0dXJuIGsudG9VcHBlckNhc2UoKSB9KTtcblxuICAvLyBjb2VyY2Ugc3RyaW5nIHZhbHVlIGludG8gSlMgdmFsdWVcbiAgdmFyIHZhbCA9IHByb2Nlc3MuZW52W2tleV07XG4gIGlmICgvXih5ZXN8b258dHJ1ZXxlbmFibGVkKSQvaS50ZXN0KHZhbCkpIHZhbCA9IHRydWU7XG4gIGVsc2UgaWYgKC9eKG5vfG9mZnxmYWxzZXxkaXNhYmxlZCkkL2kudGVzdCh2YWwpKSB2YWwgPSBmYWxzZTtcbiAgZWxzZSBpZiAodmFsID09PSAnbnVsbCcpIHZhbCA9IG51bGw7XG4gIGVsc2UgdmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgb2JqW3Byb3BdID0gdmFsO1xuICByZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIFRoZSBmaWxlIGRlc2NyaXB0b3IgdG8gd3JpdGUgdGhlIGBkZWJ1ZygpYCBjYWxscyB0by5cbiAqIFNldCB0aGUgYERFQlVHX0ZEYCBlbnYgdmFyaWFibGUgdG8gb3ZlcnJpZGUgd2l0aCBhbm90aGVyIHZhbHVlLiBpLmUuOlxuICpcbiAqICAgJCBERUJVR19GRD0zIG5vZGUgc2NyaXB0LmpzIDM+ZGVidWcubG9nXG4gKi9cblxudmFyIGZkID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuREVCVUdfRkQsIDEwKSB8fCAyO1xuXG5pZiAoMSAhPT0gZmQgJiYgMiAhPT0gZmQpIHtcbiAgdXRpbC5kZXByZWNhdGUoZnVuY3Rpb24oKXt9LCAnZXhjZXB0IGZvciBzdGRlcnIoMikgYW5kIHN0ZG91dCgxKSwgYW55IG90aGVyIHVzYWdlIG9mIERFQlVHX0ZEIGlzIGRlcHJlY2F0ZWQuIE92ZXJyaWRlIGRlYnVnLmxvZyBpZiB5b3Ugd2FudCB0byB1c2UgYSBkaWZmZXJlbnQgbG9nIGZ1bmN0aW9uIChodHRwczovL2dpdC5pby9kZWJ1Z19mZCknKSgpXG59XG5cbnZhciBzdHJlYW0gPSAxID09PSBmZCA/IHByb2Nlc3Muc3Rkb3V0IDpcbiAgICAgICAgICAgICAyID09PSBmZCA/IHByb2Nlc3Muc3RkZXJyIDpcbiAgICAgICAgICAgICBjcmVhdGVXcml0YWJsZVN0ZGlvU3RyZWFtKGZkKTtcblxuLyoqXG4gKiBJcyBzdGRvdXQgYSBUVFk/IENvbG9yZWQgb3V0cHV0IGlzIGVuYWJsZWQgd2hlbiBgdHJ1ZWAuXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICByZXR1cm4gJ2NvbG9ycycgaW4gZXhwb3J0cy5pbnNwZWN0T3B0c1xuICAgID8gQm9vbGVhbihleHBvcnRzLmluc3BlY3RPcHRzLmNvbG9ycylcbiAgICA6IHR0eS5pc2F0dHkoZmQpO1xufVxuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGwgb24gYSBzaW5nbGUgbGluZS5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5pbnNwZWN0T3B0cy5jb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcbiAgcmV0dXJuIHV0aWwuaW5zcGVjdCh2LCB0aGlzLmluc3BlY3RPcHRzKVxuICAgIC5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci50cmltKClcbiAgICB9KS5qb2luKCcgJyk7XG59O1xuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGxvd2luZyBtdWx0aXBsZSBsaW5lcyBpZiBuZWVkZWQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLk8gPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG4gIHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuXG4vKipcbiAqIEFkZHMgQU5TSSBjb2xvciBlc2NhcGUgY29kZXMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgbmFtZSA9IHRoaXMubmFtZXNwYWNlO1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgaWYgKHVzZUNvbG9ycykge1xuICAgIHZhciBjID0gdGhpcy5jb2xvcjtcbiAgICB2YXIgcHJlZml4ID0gJyAgXFx1MDAxYlszJyArIGMgKyAnOzFtJyArIG5hbWUgKyAnICcgKyAnXFx1MDAxYlswbSc7XG5cbiAgICBhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG4gICAgYXJncy5wdXNoKCdcXHUwMDFiWzMnICsgYyArICdtKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZikgKyAnXFx1MDAxYlswbScpO1xuICB9IGVsc2Uge1xuICAgIGFyZ3NbMF0gPSBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKClcbiAgICAgICsgJyAnICsgbmFtZSArICcgJyArIGFyZ3NbMF07XG4gIH1cbn1cblxuLyoqXG4gKiBJbnZva2VzIGB1dGlsLmZvcm1hdCgpYCB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzIGFuZCB3cml0ZXMgdG8gYHN0cmVhbWAuXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICByZXR1cm4gc3RyZWFtLndyaXRlKHV0aWwuZm9ybWF0LmFwcGx5KHV0aWwsIGFyZ3VtZW50cykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgLy8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG4gICAgLy8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cbiAgICBkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH0gZWxzZSB7XG4gICAgcHJvY2Vzcy5lbnYuREVCVUcgPSBuYW1lc3BhY2VzO1xuICB9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52LkRFQlVHO1xufVxuXG4vKipcbiAqIENvcGllZCBmcm9tIGBub2RlL3NyYy9ub2RlLmpzYC5cbiAqXG4gKiBYWFg6IEl0J3MgbGFtZSB0aGF0IG5vZGUgZG9lc24ndCBleHBvc2UgdGhpcyBBUEkgb3V0LW9mLXRoZS1ib3guIEl0IGFsc29cbiAqIHJlbGllcyBvbiB0aGUgdW5kb2N1bWVudGVkIGB0dHlfd3JhcC5ndWVzc0hhbmRsZVR5cGUoKWAgd2hpY2ggaXMgYWxzbyBsYW1lLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVdyaXRhYmxlU3RkaW9TdHJlYW0gKGZkKSB7XG4gIHZhciBzdHJlYW07XG4gIHZhciB0dHlfd3JhcCA9IHByb2Nlc3MuYmluZGluZygndHR5X3dyYXAnKTtcblxuICAvLyBOb3RlIHN0cmVhbS5fdHlwZSBpcyB1c2VkIGZvciB0ZXN0LW1vZHVsZS1sb2FkLWxpc3QuanNcblxuICBzd2l0Y2ggKHR0eV93cmFwLmd1ZXNzSGFuZGxlVHlwZShmZCkpIHtcbiAgICBjYXNlICdUVFknOlxuICAgICAgc3RyZWFtID0gbmV3IHR0eS5Xcml0ZVN0cmVhbShmZCk7XG4gICAgICBzdHJlYW0uX3R5cGUgPSAndHR5JztcblxuICAgICAgLy8gSGFjayB0byBoYXZlIHN0cmVhbSBub3Qga2VlcCB0aGUgZXZlbnQgbG9vcCBhbGl2ZS5cbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MjZcbiAgICAgIGlmIChzdHJlYW0uX2hhbmRsZSAmJiBzdHJlYW0uX2hhbmRsZS51bnJlZikge1xuICAgICAgICBzdHJlYW0uX2hhbmRsZS51bnJlZigpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdGSUxFJzpcbiAgICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICBzdHJlYW0gPSBuZXcgZnMuU3luY1dyaXRlU3RyZWFtKGZkLCB7IGF1dG9DbG9zZTogZmFsc2UgfSk7XG4gICAgICBzdHJlYW0uX3R5cGUgPSAnZnMnO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdQSVBFJzpcbiAgICBjYXNlICdUQ1AnOlxuICAgICAgdmFyIG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xuICAgICAgc3RyZWFtID0gbmV3IG5ldC5Tb2NrZXQoe1xuICAgICAgICBmZDogZmQsXG4gICAgICAgIHJlYWRhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICAvLyBGSVhNRSBTaG91bGQgcHJvYmFibHkgaGF2ZSBhbiBvcHRpb24gaW4gbmV0LlNvY2tldCB0byBjcmVhdGUgYVxuICAgICAgLy8gc3RyZWFtIGZyb20gYW4gZXhpc3RpbmcgZmQgd2hpY2ggaXMgd3JpdGFibGUgb25seS4gQnV0IGZvciBub3dcbiAgICAgIC8vIHdlJ2xsIGp1c3QgYWRkIHRoaXMgaGFjayBhbmQgc2V0IHRoZSBgcmVhZGFibGVgIG1lbWJlciB0byBmYWxzZS5cbiAgICAgIC8vIFRlc3Q6IC4vbm9kZSB0ZXN0L2ZpeHR1cmVzL2VjaG8uanMgPCAvZXRjL3Bhc3N3ZFxuICAgICAgc3RyZWFtLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgICBzdHJlYW0ucmVhZCA9IG51bGw7XG4gICAgICBzdHJlYW0uX3R5cGUgPSAncGlwZSc7XG5cbiAgICAgIC8vIEZJWE1FIEhhY2sgdG8gaGF2ZSBzdHJlYW0gbm90IGtlZXAgdGhlIGV2ZW50IGxvb3AgYWxpdmUuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzI2XG4gICAgICBpZiAoc3RyZWFtLl9oYW5kbGUgJiYgc3RyZWFtLl9oYW5kbGUudW5yZWYpIHtcbiAgICAgICAgc3RyZWFtLl9oYW5kbGUudW5yZWYoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFByb2JhYmx5IGFuIGVycm9yIG9uIGluIHV2X2d1ZXNzX2hhbmRsZSgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcGxlbWVudCBtZS4gVW5rbm93biBzdHJlYW0gZmlsZSB0eXBlIScpO1xuICB9XG5cbiAgLy8gRm9yIHN1cHBvcnRpbmcgbGVnYWN5IEFQSSB3ZSBwdXQgdGhlIEZEIGhlcmUuXG4gIHN0cmVhbS5mZCA9IGZkO1xuXG4gIHN0cmVhbS5faXNTdGRpbyA9IHRydWU7XG5cbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuLyoqXG4gKiBJbml0IGxvZ2ljIGZvciBgZGVidWdgIGluc3RhbmNlcy5cbiAqXG4gKiBDcmVhdGUgYSBuZXcgYGluc3BlY3RPcHRzYCBvYmplY3QgaW4gY2FzZSBgdXNlQ29sb3JzYCBpcyBzZXRcbiAqIGRpZmZlcmVudGx5IGZvciBhIHBhcnRpY3VsYXIgYGRlYnVnYCBpbnN0YW5jZS5cbiAqL1xuXG5mdW5jdGlvbiBpbml0IChkZWJ1Zykge1xuICBkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5pbnNwZWN0T3B0cyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGRlYnVnLmluc3BlY3RPcHRzW2tleXNbaV1dID0gZXhwb3J0cy5pbnNwZWN0T3B0c1trZXlzW2ldXTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgcHJvY2Vzcy5lbnYuREVCVUdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xuXG4vKipcbiAqIEV4cG9zZSBgYWRkU2h1dGRvd25gLlxuICovXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBhZGRTaHV0ZG93bjtcblxuLyoqXG4gKiBBZGRzIHNodXRkb3duIGZ1bmN0aW9uYWlsaXR5IHRvIHRoZSBgaHR0cC5TZXJ2ZXJgIG9iamVjdFxuICogQHBhcmFtIHtodHRwLlNlcnZlcn0gc2VydmVyIFRoZSBzZXJ2ZXIgdG8gYWRkIHNodXRkb3duIGZ1bmN0aW9uYWlsaXR5IHRvXG4gKi9cbmZ1bmN0aW9uIGFkZFNodXRkb3duKHNlcnZlcikge1xuICB2YXIgY29ubmVjdGlvbnMgPSB7fTtcbiAgdmFyIGlzU2h1dHRpbmdEb3duID0gZmFsc2U7XG4gIHZhciBjb25uZWN0aW9uQ291bnRlciA9IDA7XG5cbiAgZnVuY3Rpb24gZGVzdHJveShzb2NrZXQsIGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlIHx8IChzb2NrZXQuX2lzSWRsZSAmJiBpc1NodXR0aW5nRG93bikpIHtcbiAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICBkZWxldGUgY29ubmVjdGlvbnNbc29ja2V0Ll9jb25uZWN0aW9uSWRdO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBvbkNvbm5lY3Rpb24oc29ja2V0KSB7XG4gICAgdmFyIGlkID0gY29ubmVjdGlvbkNvdW50ZXIrKztcbiAgICBzb2NrZXQuX2lzSWRsZSA9IHRydWU7XG4gICAgc29ja2V0Ll9jb25uZWN0aW9uSWQgPSBpZDtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBzb2NrZXQ7XG5cbiAgICBzb2NrZXQub24oJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgY29ubmVjdGlvbnNbaWRdO1xuICAgIH0pO1xuICB9O1xuXG4gIHNlcnZlci5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgcmVxLnNvY2tldC5faXNJZGxlID0gZmFsc2U7XG5cbiAgICByZXMub24oJ2ZpbmlzaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVxLnNvY2tldC5faXNJZGxlID0gdHJ1ZTtcbiAgICAgIGRlc3Ryb3kocmVxLnNvY2tldCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHNlcnZlci5vbignY29ubmVjdGlvbicsIG9uQ29ubmVjdGlvbik7XG4gIHNlcnZlci5vbignc2VjdXJlQ29ubmVjdGlvbicsIG9uQ29ubmVjdGlvbik7XG5cbiAgZnVuY3Rpb24gc2h1dGRvd24oZm9yY2UsIGNiKSB7XG4gICAgaXNTaHV0dGluZ0Rvd24gPSB0cnVlO1xuICAgIHNlcnZlci5jbG9zZShmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChjYikge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkgeyBjYihlcnIpIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBkZXN0cm95KGNvbm5lY3Rpb25zW2tleV0sIGZvcmNlKTtcbiAgICB9KTtcbiAgfTtcblxuICBzZXJ2ZXIuc2h1dGRvd24gPSBmdW5jdGlvbihjYikge1xuICAgIHNodXRkb3duKGZhbHNlLCBjYik7XG4gIH07XG5cbiAgc2VydmVyLmZvcmNlU2h1dGRvd24gPSBmdW5jdGlvbihjYikge1xuICAgIHNodXRkb3duKHRydWUsIGNiKTtcbiAgfTtcblxuICByZXR1cm4gc2VydmVyO1xufTtcblxuLyoqXG4gKiBFeHRlbmRzIHRoZSB7aHR0cC5TZXJ2ZXJ9IG9iamVjdCB3aXRoIHNodXRkb3duIGZ1bmN0aW9uYWlsaXR5LlxuICogQHJldHVybiB7aHR0cC5TZXJ2ZXJ9IFRoZSBkZWNvcmF0ZWQgc2VydmVyIG9iamVjdFxuICovXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICBodHRwLlNlcnZlci5wcm90b3R5cGUud2l0aFNodXRkb3duID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFkZFNodXRkb3duKHRoaXMpO1xuICB9O1xuXG4gIGh0dHBzLlNlcnZlci5wcm90b3R5cGUud2l0aFNodXRkb3duID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFkZFNodXRkb3duKHRoaXMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzICAgICAgPSBpc1R5cGVkQXJyYXlcbmlzVHlwZWRBcnJheS5zdHJpY3QgPSBpc1N0cmljdFR5cGVkQXJyYXlcbmlzVHlwZWRBcnJheS5sb29zZSAgPSBpc0xvb3NlVHlwZWRBcnJheVxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG52YXIgbmFtZXMgPSB7XG4gICAgJ1tvYmplY3QgSW50OEFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBJbnQxNkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBJbnQzMkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBVaW50OEFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgVWludDE2QXJyYXldJzogdHJ1ZVxuICAsICdbb2JqZWN0IFVpbnQzMkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBGbG9hdDMyQXJyYXldJzogdHJ1ZVxuICAsICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nOiB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheShhcnIpIHtcbiAgcmV0dXJuIChcbiAgICAgICBpc1N0cmljdFR5cGVkQXJyYXkoYXJyKVxuICAgIHx8IGlzTG9vc2VUeXBlZEFycmF5KGFycilcbiAgKVxufVxuXG5mdW5jdGlvbiBpc1N0cmljdFR5cGVkQXJyYXkoYXJyKSB7XG4gIHJldHVybiAoXG4gICAgICAgYXJyIGluc3RhbmNlb2YgSW50OEFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgSW50MTZBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIEludDMyQXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBVaW50OEFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBVaW50MTZBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIFVpbnQzMkFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5XG4gIClcbn1cblxuZnVuY3Rpb24gaXNMb29zZVR5cGVkQXJyYXkoYXJyKSB7XG4gIHJldHVybiBuYW1lc1t0b1N0cmluZy5jYWxsKGFycildXG59XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG59XG4iLCIvKipcbiAqIENvbnZlcnQgYSB0eXBlZCBhcnJheSB0byBhIEJ1ZmZlciB3aXRob3V0IGEgY29weVxuICpcbiAqIEF1dGhvcjogICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIHR5cGVkYXJyYXktdG8tYnVmZmVyYFxuICovXG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZGFycmF5Jykuc3RyaWN0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHlwZWRhcnJheVRvQnVmZmVyIChhcnIpIHtcbiAgaWYgKGlzVHlwZWRBcnJheShhcnIpKSB7XG4gICAgLy8gVG8gYXZvaWQgYSBjb3B5LCB1c2UgdGhlIHR5cGVkIGFycmF5J3MgdW5kZXJseWluZyBBcnJheUJ1ZmZlciB0byBiYWNrIG5ldyBCdWZmZXJcbiAgICB2YXIgYnVmID0gQnVmZmVyLmZyb20oYXJyLmJ1ZmZlcilcbiAgICBpZiAoYXJyLmJ5dGVMZW5ndGggIT09IGFyci5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgLy8gUmVzcGVjdCB0aGUgXCJ2aWV3XCIsIGkuZS4gYnl0ZU9mZnNldCBhbmQgYnl0ZUxlbmd0aCwgd2l0aG91dCBkb2luZyBhIGNvcHlcbiAgICAgIGJ1ZiA9IGJ1Zi5zbGljZShhcnIuYnl0ZU9mZnNldCwgYXJyLmJ5dGVPZmZzZXQgKyBhcnIuYnl0ZUxlbmd0aClcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZlxuICB9IGVsc2Uge1xuICAgIC8vIFBhc3MgdGhyb3VnaCBhbGwgb3RoZXIgdHlwZXMgdG8gYEJ1ZmZlci5mcm9tYFxuICAgIHJldHVybiBCdWZmZXIuZnJvbShhcnIpXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvd2Vic29ja2V0Jyk7IiwiLyohXG4gKiBDb3BpZWQgZnJvbTpcbiAqIHdzOiBhIG5vZGUuanMgd2Vic29ja2V0IGNsaWVudFxuICogQ29weXJpZ2h0KGMpIDIwMTEgRWluYXIgT3R0byBTdGFuZ3ZpayA8ZWluYXJvc0BnbWFpbC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiBqc2hpbnQgLVcwODYgKi9cblxubW9kdWxlLmV4cG9ydHMuQnVmZmVyVXRpbCA9IHtcbiAgbWVyZ2U6IGZ1bmN0aW9uKG1lcmdlZEJ1ZmZlciwgYnVmZmVycykge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYnVmZmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIHZhciBidWYgPSBidWZmZXJzW2ldO1xuICAgICAgYnVmLmNvcHkobWVyZ2VkQnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IGJ1Zi5sZW5ndGg7XG4gICAgfVxuICB9LFxuICBtYXNrOiBmdW5jdGlvbihzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICB2YXIgbWFza051bSA9IG1hc2sucmVhZFVJbnQzMkxFKDApO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKDsgaSA8IGxlbmd0aCAtIDM7IGkgKz0gNCkge1xuICAgICAgdmFyIG51bSA9IG1hc2tOdW0gXiBzb3VyY2UucmVhZFVJbnQzMkxFKGkpO1xuICAgICAgaWYgKG51bSA8IDApIHsgbnVtID0gNDI5NDk2NzI5NiArIG51bTsgfVxuICAgICAgb3V0cHV0LndyaXRlVUludDMyTEUobnVtLCBvZmZzZXQgKyBpKTtcbiAgICB9XG4gICAgc3dpdGNoIChsZW5ndGggJSA0KSB7XG4gICAgICBjYXNlIDM6IG91dHB1dFtvZmZzZXQgKyBpICsgMl0gPSBzb3VyY2VbaSArIDJdIF4gbWFza1syXTtcbiAgICAgIGNhc2UgMjogb3V0cHV0W29mZnNldCArIGkgKyAxXSA9IHNvdXJjZVtpICsgMV0gXiBtYXNrWzFdO1xuICAgICAgY2FzZSAxOiBvdXRwdXRbb2Zmc2V0ICsgaV0gPSBzb3VyY2VbaV0gXiBtYXNrWzBdO1xuICAgICAgY2FzZSAwOlxuICAgIH1cbiAgfSxcbiAgdW5tYXNrOiBmdW5jdGlvbihkYXRhLCBtYXNrKSB7XG4gICAgdmFyIG1hc2tOdW0gPSBtYXNrLnJlYWRVSW50MzJMRSgwKTtcbiAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoOyBpIDwgbGVuZ3RoIC0gMzsgaSArPSA0KSB7XG4gICAgICB2YXIgbnVtID0gbWFza051bSBeIGRhdGEucmVhZFVJbnQzMkxFKGkpO1xuICAgICAgaWYgKG51bSA8IDApIHsgbnVtID0gNDI5NDk2NzI5NiArIG51bTsgfVxuICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKG51bSwgaSk7XG4gICAgfVxuICAgIHN3aXRjaCAobGVuZ3RoICUgNCkge1xuICAgICAgY2FzZSAzOiBkYXRhW2kgKyAyXSA9IGRhdGFbaSArIDJdIF4gbWFza1syXTtcbiAgICAgIGNhc2UgMjogZGF0YVtpICsgMV0gPSBkYXRhW2kgKyAxXSBeIG1hc2tbMV07XG4gICAgICBjYXNlIDE6IGRhdGFbaV0gPSBkYXRhW2ldIF4gbWFza1swXTtcbiAgICAgIGNhc2UgMDpcbiAgICB9XG4gIH1cbn07XG5cbi8qIGpzaGludCArVzA4NiAqLyIsIi8qIVxuICogQ29waWVkIGZyb206XG4gKiB3czogYSBub2RlLmpzIHdlYnNvY2tldCBjbGllbnRcbiAqIENvcHlyaWdodChjKSAyMDExIEVpbmFyIE90dG8gU3Rhbmd2aWsgPGVpbmFyb3NAZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9idWlsZC9SZWxlYXNlL2J1ZmZlcnV0aWwnKTtcbn0gY2F0Y2ggKGUpIHsgdHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9idWlsZC9kZWZhdWx0L2J1ZmZlcnV0aWwnKTtcbn0gY2F0Y2ggKGUpIHsgdHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL0J1ZmZlclV0aWwuZmFsbGJhY2snKTtcbn0gY2F0Y2ggKGUpIHtcbiAgY29uc29sZS5lcnJvcignYnVmZmVydXRpbC5ub2RlIHNlZW1zIHRvIG5vdCBoYXZlIGJlZW4gYnVpbHQuIFJ1biBucG0gaW5zdGFsbC4nKTtcbiAgdGhyb3cgZTtcbn19fVxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogIENvcHlyaWdodCAyMDEwLTIwMTUgQnJpYW4gTWNLZWx2ZXkuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgRGVwcmVjYXRpb24gPSB7XG4gICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcblxuICAgIGRlcHJlY2F0aW9uV2FybmluZ01hcDoge1xuXG4gICAgfSxcblxuICAgIHdhcm46IGZ1bmN0aW9uKGRlcHJlY2F0aW9uTmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZVdhcm5pbmdzICYmIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nTWFwW2RlcHJlY2F0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignREVQUkVDQVRJT04gV0FSTklORzogJyArIHRoaXMuZGVwcmVjYXRpb25XYXJuaW5nTWFwW2RlcHJlY2F0aW9uTmFtZV0pO1xuICAgICAgICAgICAgdGhpcy5kZXByZWNhdGlvbldhcm5pbmdNYXBbZGVwcmVjYXRpb25OYW1lXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZXByZWNhdGlvbjtcbiIsIi8qIVxuICogVVRGLTggVmFsaWRhdGlvbiBGYWxsYmFjayBDb2RlIG9yaWdpbmFsbHkgZnJvbTpcbiAqIHdzOiBhIG5vZGUuanMgd2Vic29ja2V0IGNsaWVudFxuICogQ29weXJpZ2h0KGMpIDIwMTEgRWluYXIgT3R0byBTdGFuZ3ZpayA8ZWluYXJvc0BnbWFpbC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5WYWxpZGF0aW9uID0ge1xuICBpc1ZhbGlkVVRGODogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvKiFcbiAqIFVURi04IFZhbGlkYXRpb24gQ29kZSBvcmlnaW5hbGx5IGZyb206XG4gKiB3czogYSBub2RlLmpzIHdlYnNvY2tldCBjbGllbnRcbiAqIENvcHlyaWdodChjKSAyMDExIEVpbmFyIE90dG8gU3Rhbmd2aWsgPGVpbmFyb3NAZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudHJ5IHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2J1aWxkL1JlbGVhc2UvdmFsaWRhdGlvbicpO1xufSBjYXRjaCAoZSkgeyB0cnkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vYnVpbGQvZGVmYXVsdC92YWxpZGF0aW9uJyk7XG59IGNhdGNoIChlKSB7IHRyeSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL1ZhbGlkYXRpb24uZmFsbGJhY2snKTtcbn0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCd2YWxpZGF0aW9uLm5vZGUgc2VlbXMgbm90IHRvIGhhdmUgYmVlbiBidWlsdC4gUnVuIG5wbSBpbnN0YWxsLicpO1xuICAgIHRocm93IGU7XG59fX1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFdlYlNvY2tldENsaWVudCA9IHJlcXVpcmUoJy4vV2ViU29ja2V0Q2xpZW50Jyk7XG52YXIgdG9CdWZmZXIgPSByZXF1aXJlKCd0eXBlZGFycmF5LXRvLWJ1ZmZlcicpO1xudmFyIHlhZXRpID0gcmVxdWlyZSgneWFldGknKTtcblxuXG5jb25zdCBDT05ORUNUSU5HID0gMDtcbmNvbnN0IE9QRU4gPSAxO1xuY29uc3QgQ0xPU0lORyA9IDI7XG5jb25zdCBDTE9TRUQgPSAzO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVzNDV2ViU29ja2V0O1xuXG5cbmZ1bmN0aW9uIFczQ1dlYlNvY2tldCh1cmwsIHByb3RvY29scywgb3JpZ2luLCBoZWFkZXJzLCByZXF1ZXN0T3B0aW9ucywgY2xpZW50Q29uZmlnKSB7XG4gICAgLy8gTWFrZSB0aGlzIGFuIEV2ZW50VGFyZ2V0LlxuICAgIHlhZXRpLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG5cbiAgICAvLyBTYW5pdGl6ZSBjbGllbnRDb25maWcuXG4gICAgY2xpZW50Q29uZmlnID0gY2xpZW50Q29uZmlnIHx8IHt9O1xuICAgIGNsaWVudENvbmZpZy5hc3NlbWJsZUZyYWdtZW50cyA9IHRydWU7ICAvLyBSZXF1aXJlZCBpbiB0aGUgVzNDIEFQSS5cblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gQ09OTkVDVElORztcbiAgICB0aGlzLl9wcm90b2NvbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9leHRlbnNpb25zID0gJyc7XG4gICAgdGhpcy5fYnVmZmVyZWRBbW91bnQgPSAwOyAgLy8gSGFjaywgYWx3YXlzIDAuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7ICAvLyBUT0RPOiBTaG91bGQgYmUgJ2Jsb2InIGJ5IGRlZmF1bHQsIGJ1dCBOb2RlIGhhcyBubyBCbG9iLlxuXG4gICAgLy8gVGhlIFdlYlNvY2tldENvbm5lY3Rpb24gaW5zdGFuY2UuXG4gICAgdGhpcy5fY29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFdlYlNvY2tldENsaWVudCBpbnN0YW5jZS5cbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViU29ja2V0Q2xpZW50KGNsaWVudENvbmZpZyk7XG5cbiAgICB0aGlzLl9jbGllbnQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gICAgICAgIG9uQ29ubmVjdC5jYWxsKHNlbGYsIGNvbm5lY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2xpZW50Lm9uKCdjb25uZWN0RmFpbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uQ29ubmVjdEZhaWxlZC5jYWxsKHNlbGYpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2xpZW50LmNvbm5lY3QodXJsLCBwcm90b2NvbHMsIG9yaWdpbiwgaGVhZGVycywgcmVxdWVzdE9wdGlvbnMpO1xufVxuXG5cbi8vIEV4cG9zZSBXM0MgcmVhZCBvbmx5IGF0dHJpYnV0ZXMuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhXM0NXZWJTb2NrZXQucHJvdG90eXBlLCB7XG4gICAgdXJsOiAgICAgICAgICAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3VybDsgICAgICAgICAgICB9IH0sXG4gICAgcmVhZHlTdGF0ZTogICAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3JlYWR5U3RhdGU7ICAgICB9IH0sXG4gICAgcHJvdG9jb2w6ICAgICAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3Byb3RvY29sOyAgICAgICB9IH0sXG4gICAgZXh0ZW5zaW9uczogICAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbnM7ICAgICB9IH0sXG4gICAgYnVmZmVyZWRBbW91bnQ6IHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2J1ZmZlcmVkQW1vdW50OyB9IH1cbn0pO1xuXG5cbi8vIEV4cG9zZSBXM0Mgd3JpdGUvcmVhZCBhdHRyaWJ1dGVzLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVzNDV2ViU29ja2V0LnByb3RvdHlwZSwge1xuICAgIGJpbmFyeVR5cGU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW5hcnlUeXBlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IEp1c3QgJ2FycmF5YnVmZmVyJyBzdXBwb3J0ZWQuXG4gICAgICAgICAgICBpZiAodHlwZSAhPT0gJ2FycmF5YnVmZmVyJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignanVzdCBcImFycmF5YnVmZmVyXCIgdHlwZSBhbGxvd2VkIGZvciBcImJpbmFyeVR5cGVcIiBhdHRyaWJ1dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2JpbmFyeVR5cGUgPSB0eXBlO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gRXhwb3NlIFczQyByZWFkeVN0YXRlIGNvbnN0YW50cyBpbnRvIHRoZSBXZWJTb2NrZXQgaW5zdGFuY2UgYXMgVzNDIHN0YXRlcy5cbltbJ0NPTk5FQ1RJTkcnLENPTk5FQ1RJTkddLCBbJ09QRU4nLE9QRU5dLCBbJ0NMT1NJTkcnLENMT1NJTkddLCBbJ0NMT1NFRCcsQ0xPU0VEXV0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXM0NXZWJTb2NrZXQucHJvdG90eXBlLCBwcm9wZXJ0eVswXSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gcHJvcGVydHlbMV07IH1cbiAgICB9KTtcbn0pO1xuXG4vLyBBbHNvIGV4cG9zZSBXM0MgcmVhZHlTdGF0ZSBjb25zdGFudHMgaW50byB0aGUgV2ViU29ja2V0IGNsYXNzIChub3QgZGVmaW5lZCBieSB0aGUgVzNDLFxuLy8gYnV0IHRoZXJlIGFyZSBzbyBtYW55IGxpYnMgcmVseWluZyBvbiB0aGVtKS5cbltbJ0NPTk5FQ1RJTkcnLENPTk5FQ1RJTkddLCBbJ09QRU4nLE9QRU5dLCBbJ0NMT1NJTkcnLENMT1NJTkddLCBbJ0NMT1NFRCcsQ0xPU0VEXV0uZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXM0NXZWJTb2NrZXQsIHByb3BlcnR5WzBdLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBwcm9wZXJ0eVsxXTsgfVxuICAgIH0pO1xufSk7XG5cblxuVzNDV2ViU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICh0aGlzLl9yZWFkeVN0YXRlICE9PSBPUEVOKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGNhbGwgc2VuZCgpIHdoaWxlIG5vdCBjb25uZWN0ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBUZXh0LlxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgfHwgZGF0YSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uLnNlbmRVVEYoZGF0YSk7XG4gICAgfVxuICAgIC8vIEJpbmFyeS5cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gTm9kZSBCdWZmZXIuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uLnNlbmRCeXRlcyhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBBcnJheUJ1ZmZlciBvciBBcnJheUJ1ZmZlclZpZXcgY29udmVydCBpdCB0byBOb2RlIEJ1ZmZlci5cbiAgICAgICAgZWxzZSBpZiAoZGF0YS5ieXRlTGVuZ3RoIHx8IGRhdGEuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGF0YSA9IHRvQnVmZmVyKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kQnl0ZXMoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gYmluYXJ5IGRhdGE6JywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cblczQ1dlYlNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihjb2RlLCByZWFzb24pIHtcbiAgICBzd2l0Y2godGhpcy5fcmVhZHlTdGF0ZSkge1xuICAgICAgICBjYXNlIENPTk5FQ1RJTkc6XG4gICAgICAgICAgICAvLyBOT1RFOiBXZSBkb24ndCBoYXZlIHRoZSBXZWJTb2NrZXRDb25uZWN0aW9uIGluc3RhbmNlIHlldCBzbyBub1xuICAgICAgICAgICAgLy8gd2F5IHRvIGNsb3NlIHRoZSBUQ1AgY29ubmVjdGlvbi5cbiAgICAgICAgICAgIC8vIEFydGlmaWNpYWxseSBpbnZva2UgdGhlIG9uQ29ubmVjdEZhaWxlZCBldmVudC5cbiAgICAgICAgICAgIG9uQ29ubmVjdEZhaWxlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLy8gQW5kIGNsb3NlIGlmIGl0IGNvbm5lY3RzIGFmdGVyIGEgd2hpbGUuXG4gICAgICAgICAgICB0aGlzLl9jbGllbnQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZShjb2RlLCByZWFzb24pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9QRU46XG4gICAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gQ0xPU0lORztcbiAgICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbi5jbG9zZShjb2RlLCByZWFzb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDTE9TSU5HOlxuICAgICAgICBjYXNlIENMT1NFRDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBQcml2YXRlIEFQSS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUNsb3NlRXZlbnQoY29kZSwgcmVhc29uKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IHlhZXRpLkV2ZW50KCdjbG9zZScpO1xuXG4gICAgZXZlbnQuY29kZSA9IGNvZGU7XG4gICAgZXZlbnQucmVhc29uID0gcmVhc29uO1xuICAgIGV2ZW50Lndhc0NsZWFuID0gKHR5cGVvZiBjb2RlID09PSAndW5kZWZpbmVkJyB8fCBjb2RlID09PSAxMDAwKTtcblxuICAgIHJldHVybiBldmVudDtcbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlRXZlbnQoZGF0YSkge1xuICAgIHZhciBldmVudCA9IG5ldyB5YWV0aS5FdmVudCgnbWVzc2FnZScpO1xuXG4gICAgZXZlbnQuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cblxuZnVuY3Rpb24gb25Db25uZWN0KGNvbm5lY3Rpb24pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gT1BFTjtcbiAgICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICB0aGlzLl9wcm90b2NvbCA9IGNvbm5lY3Rpb24ucHJvdG9jb2w7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IGNvbm5lY3Rpb24uZXh0ZW5zaW9ucztcblxuICAgIHRoaXMuX2Nvbm5lY3Rpb24ub24oJ2Nsb3NlJywgZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gICAgICAgIG9uQ2xvc2UuY2FsbChzZWxmLCBjb2RlLCByZWFzb24pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29ubmVjdGlvbi5vbignbWVzc2FnZScsIGZ1bmN0aW9uKG1zZykge1xuICAgICAgICBvbk1lc3NhZ2UuY2FsbChzZWxmLCBtc2cpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyB5YWV0aS5FdmVudCgnb3BlbicpKTtcbn1cblxuXG5mdW5jdGlvbiBvbkNvbm5lY3RGYWlsZWQoKSB7XG4gICAgZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBDTE9TRUQ7XG5cbiAgICB0cnkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IHlhZXRpLkV2ZW50KCdlcnJvcicpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ2xvc2VFdmVudCgxMDA2LCAnY29ubmVjdGlvbiBmYWlsZWQnKSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIG9uQ2xvc2UoY29kZSwgcmVhc29uKSB7XG4gICAgZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBDTE9TRUQ7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ2xvc2VFdmVudChjb2RlLCByZWFzb24gfHwgJycpKTtcbn1cblxuXG5mdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnV0ZjhEYXRhKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVNZXNzYWdlRXZlbnQobWVzc2FnZS51dGY4RGF0YSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLmJpbmFyeURhdGEpIHtcbiAgICAgICAgLy8gTXVzdCBjb252ZXJ0IGZyb20gTm9kZSBCdWZmZXIgdG8gQXJyYXlCdWZmZXIuXG4gICAgICAgIC8vIFRPRE86IG9yIHRvIGEgQmxvYiAod2hpY2ggZG9lcyBub3QgZXhpc3QgaW4gTm9kZSEpLlxuICAgICAgICBpZiAodGhpcy5iaW5hcnlUeXBlID09PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gbWVzc2FnZS5iaW5hcnlEYXRhO1xuICAgICAgICAgICAgdmFyIGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlci5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1idWZmZXIubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmlld1tpXSA9IGJ1ZmZlcltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVNZXNzYWdlRXZlbnQoYXJyYXlidWZmZXIpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRoaXMuX2NsaWVudC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5fY29ubmVjdGlvbikge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIH1cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGV4dGVuZCA9IHV0aWxzLmV4dGVuZDtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcbnZhciBXZWJTb2NrZXRDb25uZWN0aW9uID0gcmVxdWlyZSgnLi9XZWJTb2NrZXRDb25uZWN0aW9uJyk7XG52YXIgYnVmZmVyQWxsb2NVbnNhZmUgPSB1dGlscy5idWZmZXJBbGxvY1Vuc2FmZTtcblxudmFyIHByb3RvY29sU2VwYXJhdG9ycyA9IFtcbiAgICAnKCcsICcpJywgJzwnLCAnPicsICdAJyxcbiAgICAnLCcsICc7JywgJzonLCAnXFxcXCcsICdcXFwiJyxcbiAgICAnLycsICdbJywgJ10nLCAnPycsICc9JyxcbiAgICAneycsICd9JywgJyAnLCBTdHJpbmcuZnJvbUNoYXJDb2RlKDkpXG5dO1xuXG52YXIgZXhjbHVkZWRUbHNPcHRpb25zID0gWydob3N0bmFtZScsJ3BvcnQnLCdtZXRob2QnLCdwYXRoJywnaGVhZGVycyddO1xuXG5mdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQoY29uZmlnKSB7XG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgLy8gVE9ETzogSW1wbGVtZW50IGV4dGVuc2lvbnNcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAvLyAxTWlCIG1heCBmcmFtZSBzaXplLlxuICAgICAgICBtYXhSZWNlaXZlZEZyYW1lU2l6ZTogMHgxMDAwMDAsXG5cbiAgICAgICAgLy8gOE1pQiBtYXggbWVzc2FnZSBzaXplLCBvbmx5IGFwcGxpY2FibGUgaWZcbiAgICAgICAgLy8gYXNzZW1ibGVGcmFnbWVudHMgaXMgdHJ1ZVxuICAgICAgICBtYXhSZWNlaXZlZE1lc3NhZ2VTaXplOiAweDgwMDAwMCxcblxuICAgICAgICAvLyBPdXRnb2luZyBtZXNzYWdlcyBsYXJnZXIgdGhhbiBmcmFnbWVudGF0aW9uVGhyZXNob2xkIHdpbGwgYmVcbiAgICAgICAgLy8gc3BsaXQgaW50byBtdWx0aXBsZSBmcmFnbWVudHMuXG4gICAgICAgIGZyYWdtZW50T3V0Z29pbmdNZXNzYWdlczogdHJ1ZSxcblxuICAgICAgICAvLyBPdXRnb2luZyBmcmFtZXMgYXJlIGZyYWdtZW50ZWQgaWYgdGhleSBleGNlZWQgdGhpcyB0aHJlc2hvbGQuXG4gICAgICAgIC8vIERlZmF1bHQgaXMgMTZLaUJcbiAgICAgICAgZnJhZ21lbnRhdGlvblRocmVzaG9sZDogMHg0MDAwLFxuXG4gICAgICAgIC8vIFdoaWNoIHZlcnNpb24gb2YgdGhlIHByb3RvY29sIHRvIHVzZSBmb3IgdGhpcyBzZXNzaW9uLiAgVGhpc1xuICAgICAgICAvLyBvcHRpb24gd2lsbCBiZSByZW1vdmVkIG9uY2UgdGhlIHByb3RvY29sIGlzIGZpbmFsaXplZCBieSB0aGUgSUVURlxuICAgICAgICAvLyBJdCBpcyBvbmx5IGF2YWlsYWJsZSB0byBlYXNlIHRoZSB0cmFuc2l0aW9uIHRocm91Z2ggdGhlXG4gICAgICAgIC8vIGludGVybWVkaWF0ZSBkcmFmdCBwcm90b2NvbCB2ZXJzaW9ucy5cbiAgICAgICAgLy8gQXQgcHJlc2VudCwgaXQgb25seSBhZmZlY3RzIHRoZSBuYW1lIG9mIHRoZSBPcmlnaW4gaGVhZGVyLlxuICAgICAgICB3ZWJTb2NrZXRWZXJzaW9uOiAxMyxcblxuICAgICAgICAvLyBJZiB0cnVlLCBmcmFnbWVudGVkIG1lc3NhZ2VzIHdpbGwgYmUgYXV0b21hdGljYWxseSBhc3NlbWJsZWRcbiAgICAgICAgLy8gYW5kIHRoZSBmdWxsIG1lc3NhZ2Ugd2lsbCBiZSBlbWl0dGVkIHZpYSBhICdtZXNzYWdlJyBldmVudC5cbiAgICAgICAgLy8gSWYgZmFsc2UsIGVhY2ggZnJhbWUgd2lsbCBiZSBlbWl0dGVkIHZpYSBhICdmcmFtZScgZXZlbnQgYW5kXG4gICAgICAgIC8vIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGJlIHJlc3BvbnNpYmxlIGZvciBhZ2dyZWdhdGluZyBtdWx0aXBsZVxuICAgICAgICAvLyBmcmFnbWVudGVkIGZyYW1lcy4gIFNpbmdsZS1mcmFtZSBtZXNzYWdlcyB3aWxsIGVtaXQgYSAnbWVzc2FnZSdcbiAgICAgICAgLy8gZXZlbnQgaW4gYWRkaXRpb24gdG8gdGhlICdmcmFtZScgZXZlbnQuXG4gICAgICAgIC8vIE1vc3QgdXNlcnMgd2lsbCB3YW50IHRvIGxlYXZlIHRoaXMgc2V0IHRvICd0cnVlJ1xuICAgICAgICBhc3NlbWJsZUZyYWdtZW50czogdHJ1ZSxcblxuICAgICAgICAvLyBUaGUgTmFnbGUgQWxnb3JpdGhtIG1ha2VzIG1vcmUgZWZmaWNpZW50IHVzZSBvZiBuZXR3b3JrIHJlc291cmNlc1xuICAgICAgICAvLyBieSBpbnRyb2R1Y2luZyBhIHNtYWxsIGRlbGF5IGJlZm9yZSBzZW5kaW5nIHNtYWxsIHBhY2tldHMgc28gdGhhdFxuICAgICAgICAvLyBtdWx0aXBsZSBtZXNzYWdlcyBjYW4gYmUgYmF0Y2hlZCB0b2dldGhlciBiZWZvcmUgZ29pbmcgb250byB0aGVcbiAgICAgICAgLy8gd2lyZS4gIFRoaXMgaG93ZXZlciBjb21lcyBhdCB0aGUgY29zdCBvZiBsYXRlbmN5LCBzbyB0aGUgZGVmYXVsdFxuICAgICAgICAvLyBpcyB0byBkaXNhYmxlIGl0LiAgSWYgeW91IGRvbid0IG5lZWQgbG93IGxhdGVuY3kgYW5kIGFyZSBzdHJlYW1pbmdcbiAgICAgICAgLy8gbG90cyBvZiBzbWFsbCBtZXNzYWdlcywgeW91IGNhbiBjaGFuZ2UgdGhpcyB0byAnZmFsc2UnXG4gICAgICAgIGRpc2FibGVOYWdsZUFsZ29yaXRobTogdHJ1ZSxcblxuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGFmdGVyIHNlbmRpbmcgYSBjbG9zZSBmcmFtZVxuICAgICAgICAvLyBmb3IgYW4gYWNrbm93bGVkZ2VtZW50IHRvIGNvbWUgYmFjayBiZWZvcmUgZ2l2aW5nIHVwIGFuZCBqdXN0XG4gICAgICAgIC8vIGNsb3NpbmcgdGhlIHNvY2tldC5cbiAgICAgICAgY2xvc2VUaW1lb3V0OiA1MDAwLFxuXG4gICAgICAgIC8vIE9wdGlvbnMgdG8gcGFzcyB0byBodHRwcy5jb25uZWN0IGlmIGNvbm5lY3RpbmcgdmlhIFRMU1xuICAgICAgICB0bHNPcHRpb25zOiB7fVxuICAgIH07XG5cbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgIHZhciB0bHNPcHRpb25zO1xuICAgICAgICBpZiAoY29uZmlnLnRsc09wdGlvbnMpIHtcbiAgICAgICAgICB0bHNPcHRpb25zID0gY29uZmlnLnRsc09wdGlvbnM7XG4gICAgICAgICAgZGVsZXRlIGNvbmZpZy50bHNPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRsc09wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbmQodGhpcy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgIGV4dGVuZCh0aGlzLmNvbmZpZy50bHNPcHRpb25zLCB0bHNPcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXEgPSBudWxsO1xuICAgIFxuICAgIHN3aXRjaCAodGhpcy5jb25maWcud2ViU29ja2V0VmVyc2lvbikge1xuICAgICAgICBjYXNlIDg6XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdGVkIHdlYlNvY2tldFZlcnNpb24gaXMgbm90IHN1cHBvcnRlZC4gQWxsb3dlZCB2YWx1ZXMgYXJlIDggYW5kIDEzLicpO1xuICAgIH1cbn1cblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRDbGllbnQsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldENsaWVudC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKHJlcXVlc3RVcmwsIHByb3RvY29scywgb3JpZ2luLCBoZWFkZXJzLCBleHRyYVJlcXVlc3RPcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIGlmICh0eXBlb2YocHJvdG9jb2xzKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHByb3RvY29scy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwcm90b2NvbHMgPSBbcHJvdG9jb2xzXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3RvY29scyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghKHByb3RvY29scyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBwcm90b2NvbHMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5wcm90b2NvbHMgPSBwcm90b2NvbHM7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG5cbiAgICBpZiAodHlwZW9mKHJlcXVlc3RVcmwpID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLnVybCA9IHVybC5wYXJzZShyZXF1ZXN0VXJsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMudXJsID0gcmVxdWVzdFVybDsgLy8gaW4gY2FzZSBhbiBhbHJlYWR5IHBhcnNlZCB1cmwgaXMgcGFzc2VkIGluLlxuICAgIH1cbiAgICBpZiAoIXRoaXMudXJsLnByb3RvY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhIGZ1bGwgV2ViU29ja2V0IFVSTCwgaW5jbHVkaW5nIHByb3RvY29sLicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudXJsLmhvc3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGEgZnVsbCBXZWJTb2NrZXQgVVJMLCBpbmNsdWRpbmcgaG9zdG5hbWUuIFJlbGF0aXZlIFVSTHMgYXJlIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWN1cmUgPSAodGhpcy51cmwucHJvdG9jb2wgPT09ICd3c3M6Jyk7XG5cbiAgICAvLyB2YWxpZGF0ZSBwcm90b2NvbCBjaGFyYWN0ZXJzOlxuICAgIHRoaXMucHJvdG9jb2xzLmZvckVhY2goZnVuY3Rpb24ocHJvdG9jb2wpIHtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgcHJvdG9jb2wubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGUgPSBwcm90b2NvbC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IHByb3RvY29sLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDB4MDAyMSB8fCBjaGFyQ29kZSA+IDB4MDA3RSB8fCBwcm90b2NvbFNlcGFyYXRvcnMuaW5kZXhPZihjaGFyYWN0ZXIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdG9jb2wgbGlzdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlciBcIicgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJDb2RlKSArICdcIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVmYXVsdFBvcnRzID0ge1xuICAgICAgICAnd3M6JzogJzgwJyxcbiAgICAgICAgJ3dzczonOiAnNDQzJ1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMudXJsLnBvcnQpIHtcbiAgICAgICAgdGhpcy51cmwucG9ydCA9IGRlZmF1bHRQb3J0c1t0aGlzLnVybC5wcm90b2NvbF07XG4gICAgfVxuXG4gICAgdmFyIG5vbmNlID0gYnVmZmVyQWxsb2NVbnNhZmUoMTYpO1xuICAgIGZvciAodmFyIGk9MDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgbm9uY2VbaV0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMHhGRik7XG4gICAgfVxuICAgIHRoaXMuYmFzZTY0bm9uY2UgPSBub25jZS50b1N0cmluZygnYmFzZTY0Jyk7XG5cbiAgICB2YXIgaG9zdEhlYWRlclZhbHVlID0gdGhpcy51cmwuaG9zdG5hbWU7XG4gICAgaWYgKCh0aGlzLnVybC5wcm90b2NvbCA9PT0gJ3dzOicgJiYgdGhpcy51cmwucG9ydCAhPT0gJzgwJykgfHxcbiAgICAgICAgKHRoaXMudXJsLnByb3RvY29sID09PSAnd3NzOicgJiYgdGhpcy51cmwucG9ydCAhPT0gJzQ0MycpKSAge1xuICAgICAgICBob3N0SGVhZGVyVmFsdWUgKz0gKCc6JyArIHRoaXMudXJsLnBvcnQpO1xuICAgIH1cblxuICAgIHZhciByZXFIZWFkZXJzID0ge307XG4gICAgaWYgKHRoaXMuc2VjdXJlICYmIHRoaXMuY29uZmlnLnRsc09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2hlYWRlcnMnKSkge1xuICAgICAgLy8gQWxsb3cgZm9yIGFkZGl0aW9uYWwgaGVhZGVycyB0byBiZSBwcm92aWRlZCB3aGVuIGNvbm5lY3RpbmcgdmlhIEhUVFBTXG4gICAgICBleHRlbmQocmVxSGVhZGVycywgdGhpcy5jb25maWcudGxzT3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgIC8vIEV4cGxpY2l0bHkgcHJvdmlkZWQgaGVhZGVycyB0YWtlIHByaW9yaXR5IG92ZXIgYW55IGZyb20gdGxzT3B0aW9uc1xuICAgICAgZXh0ZW5kKHJlcUhlYWRlcnMsIGhlYWRlcnMpO1xuICAgIH1cbiAgICBleHRlbmQocmVxSGVhZGVycywge1xuICAgICAgICAnVXBncmFkZSc6ICd3ZWJzb2NrZXQnLFxuICAgICAgICAnQ29ubmVjdGlvbic6ICdVcGdyYWRlJyxcbiAgICAgICAgJ1NlYy1XZWJTb2NrZXQtVmVyc2lvbic6IHRoaXMuY29uZmlnLndlYlNvY2tldFZlcnNpb24udG9TdHJpbmcoMTApLFxuICAgICAgICAnU2VjLVdlYlNvY2tldC1LZXknOiB0aGlzLmJhc2U2NG5vbmNlLFxuICAgICAgICAnSG9zdCc6IHJlcUhlYWRlcnMuSG9zdCB8fCBob3N0SGVhZGVyVmFsdWVcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3RvY29scy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcUhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtUHJvdG9jb2wnXSA9IHRoaXMucHJvdG9jb2xzLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9yaWdpbikge1xuICAgICAgICBpZiAodGhpcy5jb25maWcud2ViU29ja2V0VmVyc2lvbiA9PT0gMTMpIHtcbiAgICAgICAgICAgIHJlcUhlYWRlcnNbJ09yaWdpbiddID0gdGhpcy5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcud2ViU29ja2V0VmVyc2lvbiA9PT0gOCkge1xuICAgICAgICAgICAgcmVxSGVhZGVyc1snU2VjLVdlYlNvY2tldC1PcmlnaW4nXSA9IHRoaXMub3JpZ2luO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogSW1wbGVtZW50IGV4dGVuc2lvbnNcblxuICAgIHZhciBwYXRoQW5kUXVlcnk7XG4gICAgLy8gRW5zdXJlIGl0IGJlZ2lucyB3aXRoICcvJy5cbiAgICBpZiAodGhpcy51cmwucGF0aG5hbWUpIHtcbiAgICAgICAgcGF0aEFuZFF1ZXJ5ID0gdGhpcy51cmwucGF0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy51cmwucGF0aCkge1xuICAgICAgICBwYXRoQW5kUXVlcnkgPSAnLycgKyB0aGlzLnVybC5wYXRoO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGF0aEFuZFF1ZXJ5ID0gJy8nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcikge1xuICAgICAgICBzZWxmLl9yZXEgPSBudWxsO1xuICAgICAgICBzZWxmLmVtaXQoJ2Nvbm5lY3RGYWlsZWQnLCBlcnJvcik7XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICBhZ2VudDogZmFsc2VcbiAgICB9O1xuICAgIGlmIChleHRyYVJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIGV4dGVuZChyZXF1ZXN0T3B0aW9ucywgZXh0cmFSZXF1ZXN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIFRoZXNlIG9wdGlvbnMgYXJlIGFsd2F5cyBvdmVycmlkZGVuIGJ5IHRoZSBsaWJyYXJ5LiAgVGhlIHVzZXIgaXMgbm90XG4gICAgLy8gYWxsb3dlZCB0byBzcGVjaWZ5IHRoZXNlIGRpcmVjdGx5LlxuICAgIGV4dGVuZChyZXF1ZXN0T3B0aW9ucywge1xuICAgICAgICBob3N0bmFtZTogdGhpcy51cmwuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHRoaXMudXJsLnBvcnQsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHBhdGg6IHBhdGhBbmRRdWVyeSxcbiAgICAgICAgaGVhZGVyczogcmVxSGVhZGVyc1xuICAgIH0pO1xuICAgIGlmICh0aGlzLnNlY3VyZSkge1xuICAgICAgICB2YXIgdGxzT3B0aW9ucyA9IHRoaXMuY29uZmlnLnRsc09wdGlvbnM7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0bHNPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGxzT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV4Y2x1ZGVkVGxzT3B0aW9ucy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnNba2V5XSA9IHRsc09wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZXEgPSB0aGlzLl9yZXEgPSAodGhpcy5zZWN1cmUgPyBodHRwcyA6IGh0dHApLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpO1xuICAgIHJlcS5vbigndXBncmFkZScsIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RVcGdyYWRlKHJlc3BvbnNlLCBzb2NrZXQsIGhlYWQpIHtcbiAgICAgICAgc2VsZi5fcmVxID0gbnVsbDtcbiAgICAgICAgcmVxLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGhhbmRsZVJlcXVlc3RFcnJvcik7XG4gICAgICAgIHNlbGYuc29ja2V0ID0gc29ja2V0O1xuICAgICAgICBzZWxmLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHNlbGYuZmlyc3REYXRhQ2h1bmsgPSBoZWFkO1xuICAgICAgICBzZWxmLnZhbGlkYXRlSGFuZHNoYWtlKCk7XG4gICAgfSk7XG4gICAgcmVxLm9uKCdlcnJvcicsIGhhbmRsZVJlcXVlc3RFcnJvcik7XG5cbiAgICByZXEub24oJ3Jlc3BvbnNlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgc2VsZi5fcmVxID0gbnVsbDtcbiAgICAgICAgaWYgKHV0aWxzLmV2ZW50RW1pdHRlckxpc3RlbmVyQ291bnQoc2VsZiwgJ2h0dHBSZXNwb25zZScpID4gMCkge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdodHRwUmVzcG9uc2UnLCByZXNwb25zZSwgc2VsZik7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ja2V0LmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGhlYWRlckR1bXBQYXJ0cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaGVhZGVyTmFtZSBpbiByZXNwb25zZS5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyRHVtcFBhcnRzLnB1c2goaGVhZGVyTmFtZSArICc6ICcgKyByZXNwb25zZS5oZWFkZXJzW2hlYWRlck5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuZmFpbEhhbmRzaGFrZShcbiAgICAgICAgICAgICAgICAnU2VydmVyIHJlc3BvbmRlZCB3aXRoIGEgbm9uLTEwMSBzdGF0dXM6ICcgK1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyAnICcgKyByZXNwb25zZS5zdGF0dXNNZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnXFxuUmVzcG9uc2UgSGVhZGVycyBGb2xsb3c6XFxuJyArXG4gICAgICAgICAgICAgICAgaGVhZGVyRHVtcFBhcnRzLmpvaW4oJ1xcbicpICsgJ1xcbidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXEuZW5kKCk7XG59O1xuXG5XZWJTb2NrZXRDbGllbnQucHJvdG90eXBlLnZhbGlkYXRlSGFuZHNoYWtlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhlYWRlcnMgPSB0aGlzLnJlc3BvbnNlLmhlYWRlcnM7XG5cbiAgICBpZiAodGhpcy5wcm90b2NvbHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb3RvY29sID0gaGVhZGVyc1snc2VjLXdlYnNvY2tldC1wcm90b2NvbCddO1xuICAgICAgICBpZiAodGhpcy5wcm90b2NvbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvdG9jb2xzLmluZGV4T2YodGhpcy5wcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsSGFuZHNoYWtlKCdTZXJ2ZXIgZGlkIG5vdCByZXNwb25kIHdpdGggYSByZXF1ZXN0ZWQgcHJvdG9jb2wuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mYWlsSGFuZHNoYWtlKCdFeHBlY3RlZCBhIFNlYy1XZWJTb2NrZXQtUHJvdG9jb2wgaGVhZGVyLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEoaGVhZGVyc1snY29ubmVjdGlvbiddICYmIGhlYWRlcnNbJ2Nvbm5lY3Rpb24nXS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAndXBncmFkZScpKSB7XG4gICAgICAgIHRoaXMuZmFpbEhhbmRzaGFrZSgnRXhwZWN0ZWQgYSBDb25uZWN0aW9uOiBVcGdyYWRlIGhlYWRlciBmcm9tIHRoZSBzZXJ2ZXInKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghKGhlYWRlcnNbJ3VwZ3JhZGUnXSAmJiBoZWFkZXJzWyd1cGdyYWRlJ10udG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ3dlYnNvY2tldCcpKSB7XG4gICAgICAgIHRoaXMuZmFpbEhhbmRzaGFrZSgnRXhwZWN0ZWQgYW4gVXBncmFkZTogd2Vic29ja2V0IGhlYWRlciBmcm9tIHRoZSBzZXJ2ZXInKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzaGExID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTEnKTtcbiAgICBzaGExLnVwZGF0ZSh0aGlzLmJhc2U2NG5vbmNlICsgJzI1OEVBRkE1LUU5MTQtNDdEQS05NUNBLUM1QUIwREM4NUIxMScpO1xuICAgIHZhciBleHBlY3RlZEtleSA9IHNoYTEuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGlmICghaGVhZGVyc1snc2VjLXdlYnNvY2tldC1hY2NlcHQnXSkge1xuICAgICAgICB0aGlzLmZhaWxIYW5kc2hha2UoJ0V4cGVjdGVkIFNlYy1XZWJTb2NrZXQtQWNjZXB0IGhlYWRlciBmcm9tIHNlcnZlcicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtYWNjZXB0J10gIT09IGV4cGVjdGVkS2V5KSB7XG4gICAgICAgIHRoaXMuZmFpbEhhbmRzaGFrZSgnU2VjLVdlYlNvY2tldC1BY2NlcHQgaGVhZGVyIGZyb20gc2VydmVyIGRpZG5cXCd0IG1hdGNoIGV4cGVjdGVkIHZhbHVlIG9mICcgKyBleHBlY3RlZEtleSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTdXBwb3J0IGV4dGVuc2lvbnNcblxuICAgIHRoaXMuc3VjY2VlZEhhbmRzaGFrZSgpO1xufTtcblxuV2ViU29ja2V0Q2xpZW50LnByb3RvdHlwZS5mYWlsSGFuZHNoYWtlID0gZnVuY3Rpb24oZXJyb3JEZXNjcmlwdGlvbikge1xuICAgIGlmICh0aGlzLnNvY2tldCAmJiB0aGlzLnNvY2tldC53cml0YWJsZSkge1xuICAgICAgICB0aGlzLnNvY2tldC5lbmQoKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdjb25uZWN0RmFpbGVkJywgbmV3IEVycm9yKGVycm9yRGVzY3JpcHRpb24pKTtcbn07XG5cbldlYlNvY2tldENsaWVudC5wcm90b3R5cGUuc3VjY2VlZEhhbmRzaGFrZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldENvbm5lY3Rpb24odGhpcy5zb2NrZXQsIFtdLCB0aGlzLnByb3RvY29sLCB0cnVlLCB0aGlzLmNvbmZpZyk7XG5cbiAgICBjb25uZWN0aW9uLndlYlNvY2tldFZlcnNpb24gPSB0aGlzLmNvbmZpZy53ZWJTb2NrZXRWZXJzaW9uO1xuICAgIGNvbm5lY3Rpb24uX2FkZFNvY2tldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnLCBjb25uZWN0aW9uKTtcbiAgICBpZiAodGhpcy5maXJzdERhdGFDaHVuay5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbm5lY3Rpb24uaGFuZGxlU29ja2V0RGF0YSh0aGlzLmZpcnN0RGF0YUNodW5rKTtcbiAgICB9XG4gICAgdGhpcy5maXJzdERhdGFDaHVuayA9IG51bGw7XG59O1xuXG5XZWJTb2NrZXRDbGllbnQucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3JlcSkge1xuICAgICAgICB0aGlzLl9yZXEuYWJvcnQoKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldENsaWVudDtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIFdlYlNvY2tldEZyYW1lID0gcmVxdWlyZSgnLi9XZWJTb2NrZXRGcmFtZScpO1xudmFyIEJ1ZmZlckxpc3QgPSByZXF1aXJlKCcuLi92ZW5kb3IvRmFzdEJ1ZmZlckxpc3QnKTtcbnZhciBWYWxpZGF0aW9uID0gcmVxdWlyZSgnLi9WYWxpZGF0aW9uJykuVmFsaWRhdGlvbjtcbnZhciBidWZmZXJBbGxvY1Vuc2FmZSA9IHV0aWxzLmJ1ZmZlckFsbG9jVW5zYWZlO1xudmFyIGJ1ZmZlckZyb21TdHJpbmcgPSB1dGlscy5idWZmZXJGcm9tU3RyaW5nO1xuXG4vLyBDb25uZWN0ZWQsIGZ1bGx5LW9wZW4sIHJlYWR5IHRvIHNlbmQgYW5kIHJlY2VpdmUgZnJhbWVzXG5jb25zdCBTVEFURV9PUEVOID0gJ29wZW4nO1xuLy8gUmVjZWl2ZWQgYSBjbG9zZSBmcmFtZSBmcm9tIHRoZSByZW1vdGUgcGVlclxuY29uc3QgU1RBVEVfUEVFUl9SRVFVRVNURURfQ0xPU0UgPSAncGVlcl9yZXF1ZXN0ZWRfY2xvc2UnO1xuLy8gU2VudCBjbG9zZSBmcmFtZSB0byByZW1vdGUgcGVlci4gIE5vIGZ1cnRoZXIgZGF0YSBjYW4gYmUgc2VudC5cbmNvbnN0IFNUQVRFX0VORElORyA9ICdlbmRpbmcnO1xuLy8gQ29ubmVjdGlvbiBpcyBmdWxseSBjbG9zZWQuICBObyBmdXJ0aGVyIGRhdGEgY2FuIGJlIHNlbnQgb3IgcmVjZWl2ZWQuXG5jb25zdCBTVEFURV9DTE9TRUQgPSAnY2xvc2VkJztcblxudmFyIHNldEltbWVkaWF0ZUltcGwgPSAoJ3NldEltbWVkaWF0ZScgaW4gZ2xvYmFsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLnNldEltbWVkaWF0ZS5iaW5kKGdsb2JhbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2suYmluZChwcm9jZXNzKTtcblxudmFyIGlkQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIFdlYlNvY2tldENvbm5lY3Rpb24oc29ja2V0LCBleHRlbnNpb25zLCBwcm90b2NvbCwgbWFza091dGdvaW5nUGFja2V0cywgY29uZmlnKSB7XG4gICAgdGhpcy5fZGVidWcgPSB1dGlscy5CdWZmZXJpbmdMb2dnZXIoJ3dlYnNvY2tldDpjb25uZWN0aW9uJywgKytpZENvdW50ZXIpO1xuICAgIHRoaXMuX2RlYnVnKCdjb25zdHJ1Y3RvcicpO1xuICAgIFxuICAgIGlmICh0aGlzLl9kZWJ1Zy5lbmFibGVkKSB7XG4gICAgICAgIGluc3RydW1lbnRTb2NrZXRGb3JEZWJ1Z2dpbmcodGhpcywgc29ja2V0KTtcbiAgICB9XG4gICAgXG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5fcGluZ0xpc3RlbmVyQ291bnQgPSAwO1xuICAgIHRoaXMub24oJ25ld0xpc3RlbmVyJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGV2ID09PSAncGluZycpe1xuICAgICAgICAgICAgdGhpcy5fcGluZ0xpc3RlbmVyQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSkub24oJ3JlbW92ZUxpc3RlbmVyJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGV2ID09PSAncGluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdMaXN0ZW5lckNvdW50LS07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgIHRoaXMucmVtb3RlQWRkcmVzcyA9IHNvY2tldC5yZW1vdGVBZGRyZXNzO1xuICAgIHRoaXMuY2xvc2VSZWFzb25Db2RlID0gLTE7XG4gICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLmNsb3NlRXZlbnRFbWl0dGVkID0gZmFsc2U7XG5cbiAgICAvLyBXZSBoYXZlIHRvIG1hc2sgb3V0Z29pbmcgcGFja2V0cyBpZiB3ZSdyZSBhY3RpbmcgYXMgYSBXZWJTb2NrZXQgY2xpZW50LlxuICAgIHRoaXMubWFza091dGdvaW5nUGFja2V0cyA9IG1hc2tPdXRnb2luZ1BhY2tldHM7XG5cbiAgICAvLyBXZSByZS11c2UgdGhlIHNhbWUgYnVmZmVycyBmb3IgdGhlIG1hc2sgYW5kIGZyYW1lIGhlYWRlciBmb3IgYWxsIGZyYW1lc1xuICAgIC8vIHJlY2VpdmVkIG9uIGVhY2ggY29ubmVjdGlvbiB0byBhdm9pZCBhIHNtYWxsIG1lbW9yeSBhbGxvY2F0aW9uIGZvciBlYWNoXG4gICAgLy8gZnJhbWUuXG4gICAgdGhpcy5tYXNrQnl0ZXMgPSBidWZmZXJBbGxvY1Vuc2FmZSg0KTtcbiAgICB0aGlzLmZyYW1lSGVhZGVyID0gYnVmZmVyQWxsb2NVbnNhZmUoMTApO1xuXG4gICAgLy8gdGhlIEJ1ZmZlckxpc3Qgd2lsbCBoYW5kbGUgdGhlIGRhdGEgc3RyZWFtaW5nIGluXG4gICAgdGhpcy5idWZmZXJMaXN0ID0gbmV3IEJ1ZmZlckxpc3QoKTtcblxuICAgIC8vIFByZXBhcmUgZm9yIHJlY2VpdmluZyBmaXJzdCBmcmFtZVxuICAgIHRoaXMuY3VycmVudEZyYW1lID0gbmV3IFdlYlNvY2tldEZyYW1lKHRoaXMubWFza0J5dGVzLCB0aGlzLmZyYW1lSGVhZGVyLCB0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA9IDA7IC8vIGRhdGEgcmVjZWl2ZWQgc28gZmFyLi4uXG4gICAgdGhpcy5mcmFtZVF1ZXVlID0gW107XG4gICAgXG4gICAgLy8gVmFyaW91cyBiaXRzIG9mIGNvbm5lY3Rpb24gc3RhdGVcbiAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX09QRU47XG4gICAgdGhpcy53YWl0aW5nRm9yQ2xvc2VSZXNwb25zZSA9IGZhbHNlO1xuICAgIC8vIFJlY2VpdmVkIFRDUCBGSU4sIHNvY2tldCdzIHJlYWRhYmxlIHN0cmVhbSBpcyBmaW5pc2hlZC5cbiAgICB0aGlzLnJlY2VpdmVkRW5kID0gZmFsc2U7XG5cbiAgICB0aGlzLmNsb3NlVGltZW91dCA9IHRoaXMuY29uZmlnLmNsb3NlVGltZW91dDtcbiAgICB0aGlzLmFzc2VtYmxlRnJhZ21lbnRzID0gdGhpcy5jb25maWcuYXNzZW1ibGVGcmFnbWVudHM7XG4gICAgdGhpcy5tYXhSZWNlaXZlZE1lc3NhZ2VTaXplID0gdGhpcy5jb25maWcubWF4UmVjZWl2ZWRNZXNzYWdlU2l6ZTtcblxuICAgIHRoaXMub3V0cHV0QnVmZmVyRnVsbCA9IGZhbHNlO1xuICAgIHRoaXMuaW5wdXRQYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlY2VpdmVkRGF0YUhhbmRsZXIgPSB0aGlzLnByb2Nlc3NSZWNlaXZlZERhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jbG9zZVRpbWVySGFuZGxlciA9IHRoaXMuaGFuZGxlQ2xvc2VUaW1lci5iaW5kKHRoaXMpO1xuXG4gICAgLy8gRGlzYWJsZSBuYWdsZSBhbGdvcml0aG0/XG4gICAgdGhpcy5zb2NrZXQuc2V0Tm9EZWxheSh0aGlzLmNvbmZpZy5kaXNhYmxlTmFnbGVBbGdvcml0aG0pO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGlzIG5vIHNvY2tldCBpbmFjdGl2aXR5IHRpbWVvdXRcbiAgICB0aGlzLnNvY2tldC5zZXRUaW1lb3V0KDApO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmtlZXBhbGl2ZSAmJiAhdGhpcy5jb25maWcudXNlTmF0aXZlS2VlcGFsaXZlKSB7XG4gICAgICAgIGlmICh0eXBlb2YodGhpcy5jb25maWcua2VlcGFsaXZlSW50ZXJ2YWwpICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdrZWVwYWxpdmVJbnRlcnZhbCBtdXN0IGJlIHNwZWNpZmllZCBhbmQgbnVtZXJpYyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWYga2VlcGFsaXZlIGlzIHRydWUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fa2VlcGFsaXZlVGltZXJIYW5kbGVyID0gdGhpcy5oYW5kbGVLZWVwYWxpdmVUaW1lci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNldEtlZXBhbGl2ZVRpbWVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRyb3BDb25uZWN0aW9uT25LZWVwYWxpdmVUaW1lb3V0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuY29uZmlnLmtlZXBhbGl2ZUdyYWNlUGVyaW9kKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tlZXBhbGl2ZUdyYWNlUGVyaW9kICBtdXN0IGJlIHNwZWNpZmllZCBhbmQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdudW1lcmljIGlmIGRyb3BDb25uZWN0aW9uT25LZWVwYWxpdmVUaW1lb3V0ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaXMgdHJ1ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2dyYWNlUGVyaW9kVGltZXJIYW5kbGVyID0gdGhpcy5oYW5kbGVHcmFjZVBlcmlvZFRpbWVyLmJpbmQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jb25maWcua2VlcGFsaXZlICYmIHRoaXMuY29uZmlnLnVzZU5hdGl2ZUtlZXBhbGl2ZSkge1xuICAgICAgICBpZiAoISgnc2V0S2VlcEFsaXZlJyBpbiB0aGlzLnNvY2tldCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHVzZSBuYXRpdmUga2VlcGFsaXZlOiB1bnN1cHBvcnRlZCBieSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhpcyB2ZXJzaW9uIG9mIE5vZGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb2NrZXQuc2V0S2VlcEFsaXZlKHRydWUsIHRoaXMuY29uZmlnLmtlZXBhbGl2ZUludGVydmFsKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVGhlIEhUVFAgQ2xpZW50IHNlZW1zIHRvIHN1YnNjcmliZSB0byBzb2NrZXQgZXJyb3IgZXZlbnRzXG4gICAgLy8gYW5kIHJlLWRpc3BhdGNoIHRoZW0gaW4gc3VjaCBhIHdheSB0aGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxuICAgIC8vIGZvciB1c2VycyBvZiBvdXIgY2xpZW50LCBzbyB3ZSB3YW50IHRvIG1ha2Ugc3VyZSBub2JvZHlcbiAgICAvLyBlbHNlIGlzIGxpc3RlbmluZyBmb3IgZXJyb3IgZXZlbnRzIG9uIHRoZSBzb2NrZXQgYmVzaWRlcyB1cy5cbiAgICB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Vycm9yJyk7XG59XG5cbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX05PUk1BTCA9IDEwMDA7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9HT0lOR19BV0FZID0gMTAwMTtcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SID0gMTAwMjtcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1VOUFJPQ0VTU0FCTEVfSU5QVVQgPSAxMDAzO1xuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUkVTRVJWRUQgPSAxMDA0OyAvLyBSZXNlcnZlZCB2YWx1ZS4gIFVuZGVmaW5lZCBtZWFuaW5nLlxuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fTk9UX1BST1ZJREVEID0gMTAwNTsgLy8gTm90IHRvIGJlIHVzZWQgb24gdGhlIHdpcmVcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0FCTk9STUFMID0gMTAwNjsgLy8gTm90IHRvIGJlIHVzZWQgb24gdGhlIHdpcmVcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0lOVkFMSURfREFUQSA9IDEwMDc7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QT0xJQ1lfVklPTEFUSU9OID0gMTAwODtcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX01FU1NBR0VfVE9PX0JJRyA9IDEwMDk7XG5XZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9FWFRFTlNJT05fUkVRVUlSRUQgPSAxMDEwO1xuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fSU5URVJOQUxfU0VSVkVSX0VSUk9SID0gMTAxMTtcbldlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1RMU19IQU5EU0hBS0VfRkFJTEVEID0gMTAxNTsgLy8gTm90IHRvIGJlIHVzZWQgb24gdGhlIHdpcmVcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9ERVNDUklQVElPTlMgPSB7XG4gICAgMTAwMDogJ05vcm1hbCBjb25uZWN0aW9uIGNsb3N1cmUnLFxuICAgIDEwMDE6ICdSZW1vdGUgcGVlciBpcyBnb2luZyBhd2F5JyxcbiAgICAxMDAyOiAnUHJvdG9jb2wgZXJyb3InLFxuICAgIDEwMDM6ICdVbnByb2Nlc3NhYmxlIGlucHV0JyxcbiAgICAxMDA0OiAnUmVzZXJ2ZWQnLFxuICAgIDEwMDU6ICdSZWFzb24gbm90IHByb3ZpZGVkJyxcbiAgICAxMDA2OiAnQWJub3JtYWwgY2xvc3VyZSwgbm8gZnVydGhlciBkZXRhaWwgYXZhaWxhYmxlJyxcbiAgICAxMDA3OiAnSW52YWxpZCBkYXRhIHJlY2VpdmVkJyxcbiAgICAxMDA4OiAnUG9saWN5IHZpb2xhdGlvbicsXG4gICAgMTAwOTogJ01lc3NhZ2UgdG9vIGJpZycsXG4gICAgMTAxMDogJ0V4dGVuc2lvbiByZXF1ZXN0ZWQgYnkgY2xpZW50IGlzIHJlcXVpcmVkJyxcbiAgICAxMDExOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgICAxMDE1OiAnVExTIEhhbmRzaGFrZSBGYWlsZWQnXG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUNsb3NlUmVhc29uKGNvZGUpIHtcbiAgICBpZiAoY29kZSA8IDEwMDApIHtcbiAgICAgICAgLy8gU3RhdHVzIGNvZGVzIGluIHRoZSByYW5nZSAwLTk5OSBhcmUgbm90IHVzZWRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY29kZSA+PSAxMDAwICYmIGNvZGUgPD0gMjk5OSkge1xuICAgICAgICAvLyBDb2RlcyBmcm9tIDEwMDAgLSAyOTk5IGFyZSByZXNlcnZlZCBmb3IgdXNlIGJ5IHRoZSBwcm90b2NvbC4gIE9ubHlcbiAgICAgICAgLy8gYSBmZXcgY29kZXMgYXJlIGRlZmluZWQsIGFsbCBvdGhlcnMgYXJlIGN1cnJlbnRseSBpbGxlZ2FsLlxuICAgICAgICByZXR1cm4gWzEwMDAsIDEwMDEsIDEwMDIsIDEwMDMsIDEwMDcsIDEwMDgsIDEwMDksIDEwMTAsIDEwMTEsIDEwMTIsIDEwMTMsIDEwMTRdLmluZGV4T2YoY29kZSkgIT09IC0xO1xuICAgIH1cbiAgICBpZiAoY29kZSA+PSAzMDAwICYmIGNvZGUgPD0gMzk5OSkge1xuICAgICAgICAvLyBSZXNlcnZlZCBmb3IgdXNlIGJ5IGxpYnJhcmllcywgZnJhbWV3b3JrcywgYW5kIGFwcGxpY2F0aW9ucy5cbiAgICAgICAgLy8gU2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBJQU5BLiAgSW50ZXJwcmV0YXRpb24gb2YgdGhlc2UgY29kZXMgaXNcbiAgICAgICAgLy8gdW5kZWZpbmVkIGJ5IHRoZSBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29kZSA+PSA0MDAwICYmIGNvZGUgPD0gNDk5OSkge1xuICAgICAgICAvLyBSZXNlcnZlZCBmb3IgcHJpdmF0ZSB1c2UuICBJbnRlcnByZXRhdGlvbiBvZiB0aGVzZSBjb2RlcyBpc1xuICAgICAgICAvLyB1bmRlZmluZWQgYnkgdGhlIFdlYlNvY2tldCBwcm90b2NvbC5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjb2RlID49IDUwMDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRDb25uZWN0aW9uLCBFdmVudEVtaXR0ZXIpO1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5fYWRkU29ja2V0RXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNvY2tldC5vbignZXJyb3InLCB0aGlzLmhhbmRsZVNvY2tldEVycm9yLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdlbmQnLCB0aGlzLmhhbmRsZVNvY2tldEVuZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNvY2tldC5vbignY2xvc2UnLCB0aGlzLmhhbmRsZVNvY2tldENsb3NlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdkcmFpbicsIHRoaXMuaGFuZGxlU29ja2V0RHJhaW4uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zb2NrZXQub24oJ3BhdXNlJywgdGhpcy5oYW5kbGVTb2NrZXRQYXVzZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNvY2tldC5vbigncmVzdW1lJywgdGhpcy5oYW5kbGVTb2NrZXRSZXN1bWUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zb2NrZXQub24oJ2RhdGEnLCB0aGlzLmhhbmRsZVNvY2tldERhdGEuYmluZCh0aGlzKSk7XG59O1xuXG4vLyBzZXQgb3IgcmVzZXQgdGhlIGtlZXBhbGl2ZSB0aW1lciB3aGVuIGRhdGEgaXMgcmVjZWl2ZWQuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRLZWVwYWxpdmVUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdzZXRLZWVwYWxpdmVUaW1lcicpO1xuICAgIGlmICghdGhpcy5jb25maWcua2VlcGFsaXZlICB8fCB0aGlzLmNvbmZpZy51c2VOYXRpdmVLZWVwYWxpdmUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jbGVhcktlZXBhbGl2ZVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhckdyYWNlUGVyaW9kVGltZXIoKTtcbiAgICB0aGlzLl9rZWVwYWxpdmVUaW1lb3V0SUQgPSBzZXRUaW1lb3V0KHRoaXMuX2tlZXBhbGl2ZVRpbWVySGFuZGxlciwgdGhpcy5jb25maWcua2VlcGFsaXZlSW50ZXJ2YWwpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYXJLZWVwYWxpdmVUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9rZWVwYWxpdmVUaW1lb3V0SUQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2tlZXBhbGl2ZVRpbWVvdXRJRCk7XG4gICAgfVxufTtcblxuLy8gTm8gZGF0YSBoYXMgYmVlbiByZWNlaXZlZCB3aXRoaW4gY29uZmlnLmtlZXBhbGl2ZVRpbWVvdXQgbXMuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5oYW5kbGVLZWVwYWxpdmVUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVLZWVwYWxpdmVUaW1lcicpO1xuICAgIHRoaXMuX2tlZXBhbGl2ZVRpbWVvdXRJRCA9IG51bGw7XG4gICAgdGhpcy5waW5nKCk7XG5cbiAgICAvLyBJZiB3ZSBhcmUgY29uZmlndXJlZCB0byBkcm9wIGNvbm5lY3Rpb25zIGlmIHRoZSBjbGllbnQgZG9lc24ndCByZXNwb25kXG4gICAgLy8gdGhlbiBzZXQgdGhlIGdyYWNlIHBlcmlvZCB0aW1lci5cbiAgICBpZiAodGhpcy5jb25maWcuZHJvcENvbm5lY3Rpb25PbktlZXBhbGl2ZVRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5zZXRHcmFjZVBlcmlvZFRpbWVyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UgcmVzZXQgdGhlIGtlZXBhbGl2ZSB0aW1lciB0byBzZW5kIHRoZSBuZXh0IHBpbmcuXG4gICAgICAgIHRoaXMuc2V0S2VlcGFsaXZlVGltZXIoKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRHcmFjZVBlcmlvZFRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ3NldEdyYWNlUGVyaW9kVGltZXInKTtcbiAgICB0aGlzLmNsZWFyR3JhY2VQZXJpb2RUaW1lcigpO1xuICAgIHRoaXMuX2dyYWNlUGVyaW9kVGltZW91dElEID0gc2V0VGltZW91dCh0aGlzLl9ncmFjZVBlcmlvZFRpbWVySGFuZGxlciwgdGhpcy5jb25maWcua2VlcGFsaXZlR3JhY2VQZXJpb2QpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYXJHcmFjZVBlcmlvZFRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2dyYWNlUGVyaW9kVGltZW91dElEKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9ncmFjZVBlcmlvZFRpbWVvdXRJRCk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlR3JhY2VQZXJpb2RUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVHcmFjZVBlcmlvZFRpbWVyJyk7XG4gICAgLy8gSWYgdGhpcyBpcyBjYWxsZWQsIHRoZSBjbGllbnQgaGFzIG5vdCByZXNwb25kZWQgYW5kIGlzIGFzc3VtZWQgZGVhZC5cbiAgICB0aGlzLl9ncmFjZVBlcmlvZFRpbWVvdXRJRCA9IG51bGw7XG4gICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0FCTk9STUFMLCAnUGVlciBub3QgcmVzcG9uZGluZy4nLCB0cnVlKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5fZGVidWcoJ2hhbmRsZVNvY2tldERhdGEnKTtcbiAgICAvLyBSZXNldCB0aGUga2VlcGFsaXZlIHRpbWVyIHdoZW4gcmVjZWl2aW5nIGRhdGEgb2YgYW55IGtpbmQuXG4gICAgdGhpcy5zZXRLZWVwYWxpdmVUaW1lcigpO1xuXG4gICAgLy8gQWRkIHJlY2VpdmVkIGRhdGEgdG8gb3VyIGJ1ZmZlckxpc3QsIHdoaWNoIGVmZmljaWVudGx5IGhvbGRzIHJlY2VpdmVkXG4gICAgLy8gZGF0YSBjaHVua3MgaW4gYSBsaW5rZWQgbGlzdCBvZiBCdWZmZXIgb2JqZWN0cy5cbiAgICB0aGlzLmJ1ZmZlckxpc3Qud3JpdGUoZGF0YSk7XG5cbiAgICB0aGlzLnByb2Nlc3NSZWNlaXZlZERhdGEoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NSZWNlaXZlZERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygncHJvY2Vzc1JlY2VpdmVkRGF0YScpO1xuICAgIC8vIElmIHdlJ3JlIG5vdCBjb25uZWN0ZWQsIHdlIHNob3VsZCBpZ25vcmUgYW55IGRhdGEgcmVtYWluaW5nIG9uIHRoZSBidWZmZXIuXG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkgeyByZXR1cm47IH1cblxuICAgIC8vIFJlY2VpdmluZy9wYXJzaW5nIGlzIGV4cGVjdGVkIHRvIGJlIGhhbHRlZCB3aGVuIHBhdXNlZC5cbiAgICBpZiAodGhpcy5pbnB1dFBhdXNlZCkgeyByZXR1cm47IH1cblxuICAgIHZhciBmcmFtZSA9IHRoaXMuY3VycmVudEZyYW1lO1xuXG4gICAgLy8gV2ViU29ja2V0RnJhbWUucHJvdG90eXBlLmFkZERhdGEgcmV0dXJucyB0cnVlIGlmIGFsbCBkYXRhIG5lY2Vzc2FyeSB0b1xuICAgIC8vIHBhcnNlIHRoZSBmcmFtZSB3YXMgYXZhaWxhYmxlLiAgSXQgcmV0dXJucyBmYWxzZSBpZiB3ZSBhcmUgd2FpdGluZyBmb3JcbiAgICAvLyBtb3JlIGRhdGEgdG8gY29tZSBpbiBvbiB0aGUgd2lyZS5cbiAgICBpZiAoIWZyYW1lLmFkZERhdGEodGhpcy5idWZmZXJMaXN0KSkgeyB0aGlzLl9kZWJ1ZygnLS0gaW5zdWZmaWNpZW50IGRhdGEgZm9yIGZyYW1lJyk7IHJldHVybjsgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gSGFuZGxlIHBvc3NpYmxlIHBhcnNpbmcgZXJyb3JzXG4gICAgaWYgKGZyYW1lLnByb3RvY29sRXJyb3IpIHtcbiAgICAgICAgLy8gU29tZXRoaW5nIGJhZCBoYXBwZW5lZC4uIGdldCByaWQgb2YgdGhpcyBjbGllbnQuXG4gICAgICAgIHRoaXMuX2RlYnVnKCctLSBwcm90b2NvbCBlcnJvcicpO1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SLCBmcmFtZS5kcm9wUmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZnJhbWUuZnJhbWVUb29MYXJnZSkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gZnJhbWUgdG9vIGxhcmdlJyk7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fTUVTU0FHRV9UT09fQklHLCBmcmFtZS5kcm9wUmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGb3Igbm93IHNpbmNlIHdlIGRvbid0IHN1cHBvcnQgZXh0ZW5zaW9ucywgYWxsIFJTViBiaXRzIGFyZSBpbGxlZ2FsXG4gICAgaWYgKGZyYW1lLnJzdjEgfHwgZnJhbWUucnN2MiB8fCBmcmFtZS5yc3YzKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCctLSBpbGxlZ2FsIHJzdiBmbGFnJyk7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1IsXG4gICAgICAgICAgICAgICdVbnN1cHBvcnRlZCB1c2FnZSBvZiByc3YgYml0cyB3aXRob3V0IG5lZ290aWF0ZWQgZXh0ZW5zaW9uLicpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5hc3NlbWJsZUZyYWdtZW50cykge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gZW1pdHRpbmcgZnJhbWUnKTtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHsgc2VsZi5lbWl0KCdmcmFtZScsIGZyYW1lKTsgfSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHsgc2VsZi5wcm9jZXNzRnJhbWUoZnJhbWUpOyB9KTtcbiAgICBcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuXG4gICAgLy8gSWYgdGhlcmUncyBkYXRhIHJlbWFpbmluZywgc2NoZWR1bGUgYWRkaXRpb25hbCBwcm9jZXNzaW5nLCBidXQgeWllbGRcbiAgICAvLyBmb3Igbm93IHNvIHRoYXQgb3RoZXIgY29ubmVjdGlvbnMgaGF2ZSBhIGNoYW5jZSB0byBoYXZlIHRoZWlyIGRhdGFcbiAgICAvLyBwcm9jZXNzZWQuICBXZSB1c2Ugc2V0SW1tZWRpYXRlIGhlcmUgaW5zdGVhZCBvZiBwcm9jZXNzLm5leHRUaWNrIHRvXG4gICAgLy8gZXhwbGljaXRseSBpbmRpY2F0ZSB0aGF0IHdlIHdpc2ggZm9yIG90aGVyIEkvTyB0byBiZSBoYW5kbGVkIGZpcnN0LlxuICAgIGlmICh0aGlzLmJ1ZmZlckxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRJbW1lZGlhdGVJbXBsKHRoaXMucmVjZWl2ZWREYXRhSGFuZGxlcik7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlU29ja2V0RXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXRFcnJvcjogJWonLCBlcnJvcik7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX0NMT1NFRCkge1xuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhldHVydGxlMzIvV2ViU29ja2V0LU5vZGUvaXNzdWVzLzI4OFxuICAgICAgICB0aGlzLl9kZWJ1ZygnICAtLS0gU29ja2V0IFxcJ2Vycm9yXFwnIGFmdGVyIFxcJ2Nsb3NlXFwnJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbG9zZVJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9BQk5PUk1BTDtcbiAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24gPSAnU29ja2V0IEVycm9yOiAnICsgZXJyb3Iuc3lzY2FsbCArICcgJyArIGVycm9yLmNvZGU7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfQ0xPU0VEO1xuICAgIHRoaXMuZnJhZ21lbnRhdGlvblNpemUgPSAwO1xuICAgIGlmICh1dGlscy5ldmVudEVtaXR0ZXJMaXN0ZW5lckNvdW50KHRoaXMsICdlcnJvcicpID4gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgICB0aGlzLnNvY2tldC5kZXN0cm95KGVycm9yKTtcbiAgICB0aGlzLl9kZWJ1Zy5wcmludE91dHB1dCgpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlU29ja2V0RW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ2hhbmRsZVNvY2tldEVuZDogcmVjZWl2ZWQgc29ja2V0IGVuZC4gIHN0YXRlID0gJXMnLCB0aGlzLnN0YXRlKTtcbiAgICB0aGlzLnJlY2VpdmVkRW5kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU1RBVEVfQ0xPU0VEKSB7XG4gICAgICAgIC8vIFdoZW4gdXNpbmcgdGhlIFRMUyBtb2R1bGUsIHNvbWV0aW1lcyB0aGUgc29ja2V0IHdpbGwgZW1pdCAnZW5kJ1xuICAgICAgICAvLyBhZnRlciBpdCBlbWl0cyAnY2xvc2UnLiAgSSBkb24ndCB0aGluayB0aGF0J3MgY29ycmVjdCBiZWhhdmlvcixcbiAgICAgICAgLy8gYnV0IHdlIHNob3VsZCBkZWFsIHdpdGggaXQgZ3JhY2VmdWxseSBieSBpZ25vcmluZyBpdC5cbiAgICAgICAgdGhpcy5fZGVidWcoJyAgLS0tIFNvY2tldCBcXCdlbmRcXCcgYWZ0ZXIgXFwnY2xvc2VcXCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUEVFUl9SRVFVRVNURURfQ0xPU0UgJiZcbiAgICAgICAgdGhpcy5zdGF0ZSAhPT0gU1RBVEVfRU5ESU5HKSB7XG4gICAgICB0aGlzLl9kZWJ1ZygnICAtLS0gVU5FWFBFQ1RFRCBzb2NrZXQgZW5kLicpO1xuICAgICAgdGhpcy5zb2NrZXQuZW5kKCk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlU29ja2V0Q2xvc2UgPSBmdW5jdGlvbihoYWRFcnJvcikge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXRDbG9zZTogcmVjZWl2ZWQgc29ja2V0IGNsb3NlJyk7XG4gICAgdGhpcy5zb2NrZXRIYWRFcnJvciA9IGhhZEVycm9yO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0NMT1NFRDtcbiAgICAvLyBJZiBjbG9zZVJlYXNvbkNvZGUgaXMgc3RpbGwgc2V0IHRvIC0xIGF0IHRoaXMgcG9pbnQgdGhlbiB3ZSBtdXN0XG4gICAgLy8gbm90IGhhdmUgcmVjZWl2ZWQgYSBjbG9zZSBmcmFtZSEhXG4gICAgaWYgKHRoaXMuY2xvc2VSZWFzb25Db2RlID09PSAtMSkge1xuICAgICAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0FCTk9STUFMO1xuICAgICAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24gPSAnQ29ubmVjdGlvbiBkcm9wcGVkIGJ5IHJlbW90ZSBwZWVyLic7XG4gICAgfVxuICAgIHRoaXMuY2xlYXJDbG9zZVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhcktlZXBhbGl2ZVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhckdyYWNlUGVyaW9kVGltZXIoKTtcbiAgICBpZiAoIXRoaXMuY2xvc2VFdmVudEVtaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZUV2ZW50RW1pdHRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RlYnVnKCctLSBFbWl0dGluZyBXZWJTb2NrZXRDb25uZWN0aW9uIGNsb3NlIGV2ZW50Jyk7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCB0aGlzLmNsb3NlUmVhc29uQ29kZSwgdGhpcy5jbG9zZURlc2NyaXB0aW9uKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5oYW5kbGVTb2NrZXREcmFpbiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXREcmFpbjogc29ja2V0IGRyYWluIGV2ZW50Jyk7XG4gICAgdGhpcy5vdXRwdXRCdWZmZXJGdWxsID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdkcmFpbicpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlU29ja2V0UGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9kZWJ1ZygnaGFuZGxlU29ja2V0UGF1c2U6IHNvY2tldCBwYXVzZSBldmVudCcpO1xuICAgIHRoaXMuaW5wdXRQYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZVNvY2tldFJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVTb2NrZXRSZXN1bWU6IHNvY2tldCByZXN1bWUgZXZlbnQnKTtcbiAgICB0aGlzLmlucHV0UGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdyZXN1bWUnKTtcbiAgICB0aGlzLnByb2Nlc3NSZWNlaXZlZERhdGEoKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ3BhdXNlOiBwYXVzZSByZXF1ZXN0ZWQnKTtcbiAgICB0aGlzLnNvY2tldC5wYXVzZSgpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ3Jlc3VtZTogcmVzdW1lIHJlcXVlc3RlZCcpO1xuICAgIHRoaXMuc29ja2V0LnJlc3VtZSgpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihyZWFzb25Db2RlLCBkZXNjcmlwdGlvbikge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnY2xvc2U6IEluaXRhdGluZyBjbGVhbiBXZWJTb2NrZXQgY2xvc2Ugc2VxdWVuY2UuJyk7XG4gICAgICAgIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIHJlYXNvbkNvZGUpIHtcbiAgICAgICAgICAgIHJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9OT1JNQUw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZGF0ZUNsb3NlUmVhc29uKHJlYXNvbkNvZGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nsb3NlIGNvZGUgJyArIHJlYXNvbkNvZGUgKyAnIGlzIG5vdCB2YWxpZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX0RFU0NSSVBUSU9OU1tyZWFzb25Db2RlXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IHJlYXNvbkNvZGU7XG4gICAgICAgIHRoaXMuY2xvc2VEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnNldENsb3NlVGltZXIoKTtcbiAgICAgICAgdGhpcy5zZW5kQ2xvc2VGcmFtZSh0aGlzLmNsb3NlUmVhc29uQ29kZSwgdGhpcy5jbG9zZURlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0VORElORztcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5kcm9wID0gZnVuY3Rpb24ocmVhc29uQ29kZSwgZGVzY3JpcHRpb24sIHNraXBDbG9zZUZyYW1lKSB7XG4gICAgdGhpcy5fZGVidWcoJ2Ryb3AnKTtcbiAgICBpZiAodHlwZW9mKHJlYXNvbkNvZGUpICE9PSAnbnVtYmVyJykge1xuICAgICAgICByZWFzb25Db2RlID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1I7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZihkZXNjcmlwdGlvbikgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIElmIG5vIGRlc2NyaXB0aW9uIGlzIHByb3ZpZGVkLCB0cnkgdG8gbG9vayBvbmUgdXAgYmFzZWQgb24gdGhlXG4gICAgICAgIC8vIHNwZWNpZmllZCByZWFzb25Db2RlLlxuICAgICAgICBkZXNjcmlwdGlvbiA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfREVTQ1JJUFRJT05TW3JlYXNvbkNvZGVdO1xuICAgIH1cblxuICAgIHRoaXMuX2RlYnVnKCdGb3JjZWZ1bGx5IGRyb3BwaW5nIGNvbm5lY3Rpb24uIHNraXBDbG9zZUZyYW1lOiAlcywgY29kZTogJWQsIGRlc2NyaXB0aW9uOiAlcycsXG4gICAgICAgIHNraXBDbG9zZUZyYW1lLCByZWFzb25Db2RlLCBkZXNjcmlwdGlvblxuICAgICk7XG5cbiAgICB0aGlzLmNsb3NlUmVhc29uQ29kZSA9IHJlYXNvbkNvZGU7XG4gICAgdGhpcy5jbG9zZURlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5mcmFtZVF1ZXVlID0gW107XG4gICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA9IDA7XG4gICAgaWYgKCFza2lwQ2xvc2VGcmFtZSkge1xuICAgICAgICB0aGlzLnNlbmRDbG9zZUZyYW1lKHJlYXNvbkNvZGUsIGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfQ0xPU0VEO1xuICAgIHRoaXMuY2xlYXJDbG9zZVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhcktlZXBhbGl2ZVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhckdyYWNlUGVyaW9kVGltZXIoKTtcblxuICAgIGlmICghdGhpcy5jbG9zZUV2ZW50RW1pdHRlZCkge1xuICAgICAgICB0aGlzLmNsb3NlRXZlbnRFbWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGVidWcoJ0VtaXR0aW5nIFdlYlNvY2tldENvbm5lY3Rpb24gY2xvc2UgZXZlbnQnKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIHRoaXMuY2xvc2VSZWFzb25Db2RlLCB0aGlzLmNsb3NlRGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl9kZWJ1ZygnRHJvcDogZGVzdHJveWluZyBzb2NrZXQnKTtcbiAgICB0aGlzLnNvY2tldC5kZXN0cm95KCk7XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRDbG9zZVRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ3NldENsb3NlVGltZXInKTtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lcigpO1xuICAgIHRoaXMuX2RlYnVnKCdTZXR0aW5nIGNsb3NlIHRpbWVyJyk7XG4gICAgdGhpcy53YWl0aW5nRm9yQ2xvc2VSZXNwb25zZSA9IHRydWU7XG4gICAgdGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dCh0aGlzLl9jbG9zZVRpbWVySGFuZGxlciwgdGhpcy5jbG9zZVRpbWVvdXQpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYXJDbG9zZVRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZGVidWcoJ2NsZWFyQ2xvc2VUaW1lcicpO1xuICAgIGlmICh0aGlzLmNsb3NlVGltZXIpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJ0NsZWFyaW5nIGNsb3NlIHRpbWVyJyk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpO1xuICAgICAgICB0aGlzLndhaXRpbmdGb3JDbG9zZVJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VUaW1lciA9IG51bGw7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlQ2xvc2VUaW1lciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2RlYnVnKCdoYW5kbGVDbG9zZVRpbWVyJyk7XG4gICAgdGhpcy5jbG9zZVRpbWVyID0gbnVsbDtcbiAgICBpZiAodGhpcy53YWl0aW5nRm9yQ2xvc2VSZXNwb25zZSkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnQ2xvc2UgcmVzcG9uc2Ugbm90IHJlY2VpdmVkIGZyb20gY2xpZW50LiAgRm9yY2luZyBzb2NrZXQgZW5kLicpO1xuICAgICAgICB0aGlzLndhaXRpbmdGb3JDbG9zZVJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9DTE9TRUQ7XG4gICAgICAgIHRoaXMuc29ja2V0LmVuZCgpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgdGhpcy5fZGVidWcoJ3Byb2Nlc3NGcmFtZScpO1xuICAgIHRoaXMuX2RlYnVnKCcgLS0gZnJhbWU6ICVzJywgZnJhbWUpO1xuICAgIFxuICAgIC8vIEFueSBub24tY29udHJvbCBvcGNvZGUgYmVzaWRlcyAweDAwIChjb250aW51YXRpb24pIHJlY2VpdmVkIGluIHRoZVxuICAgIC8vIG1pZGRsZSBvZiBhIGZyYWdtZW50ZWQgbWVzc2FnZSBpcyBpbGxlZ2FsLlxuICAgIGlmICh0aGlzLmZyYW1lUXVldWUubGVuZ3RoICE9PSAwICYmIChmcmFtZS5vcGNvZGUgPiAweDAwICYmIGZyYW1lLm9wY29kZSA8IDB4MDgpKSB7XG4gICAgICAgIHRoaXMuZHJvcChXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUixcbiAgICAgICAgICAnSWxsZWdhbCBmcmFtZSBvcGNvZGUgMHgnICsgZnJhbWUub3Bjb2RlLnRvU3RyaW5nKDE2KSArICcgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkIGluIG1pZGRsZSBvZiBmcmFnbWVudGVkIG1lc3NhZ2UuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2goZnJhbWUub3Bjb2RlKSB7XG4gICAgICAgIGNhc2UgMHgwMjogLy8gV2ViU29ja2V0RnJhbWUuQklOQVJZX0ZSQU1FXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gQmluYXJ5IEZyYW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3NlbWJsZUZyYWdtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZS5maW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcGxldGUgc2luZ2xlLWZyYW1lIG1lc3NhZ2UgcmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tLS0gRW1pdHRpbmcgXFwnbWVzc2FnZVxcJyBldmVudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmluYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeURhdGE6IGZyYW1lLmJpbmFyeVBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZWdpbm5pbmcgb2YgYSBmcmFnbWVudGVkIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVF1ZXVlLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50YXRpb25TaXplID0gZnJhbWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDB4MDE6IC8vIFdlYlNvY2tldEZyYW1lLlRFWFRfRlJBTUVcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLSBUZXh0IEZyYW1lJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5hc3NlbWJsZUZyYWdtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZS5maW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFWYWxpZGF0aW9uLmlzVmFsaWRVVEY4KGZyYW1lLmJpbmFyeVBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fSU5WQUxJRF9EQVRBLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnSW52YWxpZCBVVEYtOCBEYXRhIFJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcGxldGUgc2luZ2xlLWZyYW1lIG1lc3NhZ2UgcmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tLS0gRW1pdHRpbmcgXFwnbWVzc2FnZVxcJyBldmVudCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndXRmOCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGY4RGF0YTogZnJhbWUuYmluYXJ5UGF5bG9hZC50b1N0cmluZygndXRmOCcpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIGEgZnJhZ21lbnRlZCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVRdWV1ZS5wdXNoKGZyYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA9IGZyYW1lLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAweDAwOiAvLyBXZWJTb2NrZXRGcmFtZS5DT05USU5VQVRJT05cbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLSBDb250aW51YXRpb24gRnJhbWUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFzc2VtYmxlRnJhZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWVRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wKFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICAgICdVbmV4cGVjdGVkIENvbnRpbnVhdGlvbiBGcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudGF0aW9uU2l6ZSArPSBmcmFtZS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudGF0aW9uU2l6ZSA+IHRoaXMubWF4UmVjZWl2ZWRNZXNzYWdlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fTUVTU0FHRV9UT09fQklHLFxuICAgICAgICAgICAgICAgICAgICAgICdNYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBleGNlZWRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVRdWV1ZS5wdXNoKGZyYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChmcmFtZS5maW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIGZyYWdtZW50ZWQgbWVzc2FnZSwgc28gd2UgcHJvY2VzcyB0aGUgd2hvbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBub3cuICBXZSBhbHNvIGhhdmUgdG8gZGVjb2RlIHRoZSB1dGYtOCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciB0ZXh0IGZyYW1lcyBhZnRlciBjb21iaW5pbmcgYWxsIHRoZSBmcmFnbWVudHMuXG4gICAgICAgICAgICAgICAgICAgIHZhciBieXRlc0NvcGllZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiaW5hcnlQYXlsb2FkID0gYnVmZmVyQWxsb2NVbnNhZmUodGhpcy5mcmFnbWVudGF0aW9uU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGNvZGUgPSB0aGlzLmZyYW1lUXVldWVbMF0ub3Bjb2RlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lUXVldWUuZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudEZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RnJhbWUuYmluYXJ5UGF5bG9hZC5jb3B5KGJpbmFyeVBheWxvYWQsIGJ5dGVzQ29waWVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzQ29waWVkICs9IGN1cnJlbnRGcmFtZS5iaW5hcnlQYXlsb2FkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50YXRpb25TaXplID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDAyOiAvLyBXZWJTb2NrZXRPcGNvZGUuQklOQVJZX0ZSQU1FXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmluYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5RGF0YTogYmluYXJ5UGF5bG9hZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDAxOiAvLyBXZWJTb2NrZXRPcGNvZGUuVEVYVF9GUkFNRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghVmFsaWRhdGlvbi5pc1ZhbGlkVVRGOChiaW5hcnlQYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fSU5WQUxJRF9EQVRBLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJbnZhbGlkIFVURi04IERhdGEgUmVjZWl2ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1dGY4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRmOERhdGE6IGJpbmFyeVBheWxvYWQudG9TdHJpbmcoJ3V0ZjgnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVW5leHBlY3RlZCBmaXJzdCBvcGNvZGUgaW4gZnJhZ21lbnRhdGlvbiBzZXF1ZW5jZTogMHgnICsgb3Bjb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMHgwOTogLy8gV2ViU29ja2V0RnJhbWUuUElOR1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tIFBpbmcgRnJhbWUnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3BpbmdMaXN0ZW5lckNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGxvZ2ljIHRvIGVtaXQgdGhlIHBpbmcgZnJhbWU6IHRoaXMgaXMgb25seSBkb25lIHdoZW4gYSBsaXN0ZW5lciBpcyBrbm93biB0byBleGlzdFxuICAgICAgICAgICAgICAgIC8vIEV4cG9zZSBhIGZ1bmN0aW9uIGFsbG93aW5nIHRoZSB1c2VyIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHBpbmcoKSBiZWhhdmlvclxuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3BpbmcnLCBjYW5jZWwsIGZyYW1lLmJpbmFyeVBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gT25seSBzZW5kIGEgcG9uZyBpZiB0aGUgY2xpZW50IGRpZCBub3QgaW5kaWNhdGUgdGhhdCBoZSB3b3VsZCBsaWtlIHRvIGNhbmNlbFxuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9uZyhmcmFtZS5iaW5hcnlQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbmcoZnJhbWUuYmluYXJ5UGF5bG9hZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDB4MEE6IC8vIFdlYlNvY2tldEZyYW1lLlBPTkdcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLSBQb25nIEZyYW1lJyk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3BvbmcnLCBmcmFtZS5iaW5hcnlQYXlsb2FkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDB4MDg6IC8vIFdlYlNvY2tldEZyYW1lLkNPTk5FQ1RJT05fQ0xPU0VcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLSBDbG9zZSBGcmFtZScpO1xuICAgICAgICAgICAgaWYgKHRoaXMud2FpdGluZ0ZvckNsb3NlUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBHb3QgcmVzcG9uc2UgdG8gb3VyIHJlcXVlc3QgdG8gY2xvc2UgdGhlIGNvbm5lY3Rpb24uXG4gICAgICAgICAgICAgICAgLy8gQ2xvc2UgaXMgY29tcGxldGUsIHNvIHdlIGp1c3QgaGFuZyB1cC5cbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0tLSBHb3QgY2xvc2UgcmVzcG9uc2UgZnJvbSBwZWVyLiAgQ29tcGxldGluZyBjbG9zaW5nIGhhbmRzaGFrZS4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvckNsb3NlUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfQ0xPU0VEO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fZGVidWcoJy0tLS0gQ2xvc2luZyBoYW5kc2hha2UgaW5pdGlhdGVkIGJ5IHBlZXIuJyk7XG4gICAgICAgICAgICAvLyBHb3QgcmVxdWVzdCBmcm9tIG90aGVyIHBhcnR5IHRvIGNsb3NlIGNvbm5lY3Rpb24uXG4gICAgICAgICAgICAvLyBTZW5kIGJhY2sgYWNrbm93bGVkZ2VtZW50IGFuZCB0aGVuIGhhbmcgdXAuXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUEVFUl9SRVFVRVNURURfQ0xPU0U7XG4gICAgICAgICAgICB2YXIgcmVzcG9uZENsb3NlUmVhc29uQ29kZTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBjbG9zZSByZWFzb24gcHJvdmlkZWQgaXMgbGVnYWwgYWNjb3JkaW5nIHRvXG4gICAgICAgICAgICAvLyB0aGUgcHJvdG9jb2wgc3BlYy4gIFByb3ZpZGluZyBubyBjbG9zZSBzdGF0dXMgaXMgbGVnYWwuXG4gICAgICAgICAgICAvLyBXZWJTb2NrZXRGcmFtZSBzZXRzIGNsb3NlU3RhdHVzIHRvIC0xIGJ5IGRlZmF1bHQsIHNvIGlmIGl0XG4gICAgICAgICAgICAvLyBpcyBzdGlsbCAtMSwgdGhlbiBubyBzdGF0dXMgd2FzIHByb3ZpZGVkLlxuICAgICAgICAgICAgaWYgKGZyYW1lLmludmFsaWRDbG9zZUZyYW1lTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVJlYXNvbkNvZGUgPSAxMDA1OyAvLyAxMDA1ID0gTm8gcmVhc29uIHByb3ZpZGVkLlxuICAgICAgICAgICAgICAgIHJlc3BvbmRDbG9zZVJlYXNvbkNvZGUgPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX1JFQVNPTl9QUk9UT0NPTF9FUlJPUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lLmNsb3NlU3RhdHVzID09PSAtMSB8fCB2YWxpZGF0ZUNsb3NlUmVhc29uKGZyYW1lLmNsb3NlU3RhdHVzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VSZWFzb25Db2RlID0gZnJhbWUuY2xvc2VTdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzcG9uZENsb3NlUmVhc29uQ29kZSA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX05PUk1BTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VSZWFzb25Db2RlID0gZnJhbWUuY2xvc2VTdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzcG9uZENsb3NlUmVhc29uQ29kZSA9IFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX1BST1RPQ09MX0VSUk9SO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHRleHR1YWwgZGVzY3JpcHRpb24gaW4gdGhlIGNsb3NlIGZyYW1lLCBleHRyYWN0IGl0LlxuICAgICAgICAgICAgaWYgKGZyYW1lLmJpbmFyeVBheWxvYWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGlmICghVmFsaWRhdGlvbi5pc1ZhbGlkVVRGOChmcmFtZS5iaW5hcnlQYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fSU5WQUxJRF9EQVRBLFxuICAgICAgICAgICAgICAgICAgICAgICdJbnZhbGlkIFVURi04IERhdGEgUmVjZWl2ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24gPSBmcmFtZS5iaW5hcnlQYXlsb2FkLnRvU3RyaW5nKCd1dGY4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24gPSBXZWJTb2NrZXRDb25uZWN0aW9uLkNMT1NFX0RFU0NSSVBUSU9OU1t0aGlzLmNsb3NlUmVhc29uQ29kZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhcbiAgICAgICAgICAgICAgICAnLS0tLS0tIFJlbW90ZSBwZWVyICVzIC0gY29kZTogJWQgLSAlcyAtIGNsb3NlIGZyYW1lIHBheWxvYWQgbGVuZ3RoOiAlZCcsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVBZGRyZXNzLCB0aGlzLmNsb3NlUmVhc29uQ29kZSxcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRGVzY3JpcHRpb24sIGZyYW1lLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCctLS0tLS0gcmVzcG9uZGluZyB0byByZW1vdGUgcGVlclxcJ3MgY2xvc2UgcmVxdWVzdC4nKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZENsb3NlRnJhbWUocmVzcG9uZENsb3NlUmVhc29uQ29kZSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnLS0gVW5yZWNvZ25pemVkIE9wY29kZSAlZCcsIGZyYW1lLm9wY29kZSk7XG4gICAgICAgICAgICB0aGlzLmRyb3AoV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fUFJPVE9DT0xfRVJST1IsXG4gICAgICAgICAgICAgICdVbnJlY29nbml6ZWQgT3Bjb2RlOiAweCcgKyBmcmFtZS5vcGNvZGUudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgIHRoaXMuX2RlYnVnKCdzZW5kJyk7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICB0aGlzLnNlbmRCeXRlcyhkYXRhLCBjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZihkYXRhWyd0b1N0cmluZyddKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNlbmRVVEYoZGF0YSwgY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIHByb3ZpZGVkIG11c3QgZWl0aGVyIGJlIGEgTm9kZSBCdWZmZXIgb3IgaW1wbGVtZW50IHRvU3RyaW5nKCknKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kVVRGID0gZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICBkYXRhID0gYnVmZmVyRnJvbVN0cmluZyhkYXRhLnRvU3RyaW5nKCksICd1dGY4Jyk7XG4gICAgdGhpcy5fZGVidWcoJ3NlbmRVVEY6ICVkIGJ5dGVzJywgZGF0YS5sZW5ndGgpO1xuICAgIHZhciBmcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuICAgIGZyYW1lLm9wY29kZSA9IDB4MDE7IC8vIFdlYlNvY2tldE9wY29kZS5URVhUX0ZSQU1FXG4gICAgZnJhbWUuYmluYXJ5UGF5bG9hZCA9IGRhdGE7XG4gICAgdGhpcy5mcmFnbWVudEFuZFNlbmQoZnJhbWUsIGNiKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRCeXRlcyA9IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgdGhpcy5fZGVidWcoJ3NlbmRCeXRlcycpO1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcGFzcyBhIE5vZGUgQnVmZmVyIG9iamVjdCB0byBXZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kQnl0ZXMoKScpO1xuICAgIH1cbiAgICB2YXIgZnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcbiAgICBmcmFtZS5vcGNvZGUgPSAweDAyOyAvLyBXZWJTb2NrZXRPcGNvZGUuQklOQVJZX0ZSQU1FXG4gICAgZnJhbWUuYmluYXJ5UGF5bG9hZCA9IGRhdGE7XG4gICAgdGhpcy5mcmFnbWVudEFuZFNlbmQoZnJhbWUsIGNiKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5fZGVidWcoJ3BpbmcnKTtcbiAgICB2YXIgZnJhbWUgPSBuZXcgV2ViU29ja2V0RnJhbWUodGhpcy5tYXNrQnl0ZXMsIHRoaXMuZnJhbWVIZWFkZXIsIHRoaXMuY29uZmlnKTtcbiAgICBmcmFtZS5vcGNvZGUgPSAweDA5OyAvLyBXZWJTb2NrZXRPcGNvZGUuUElOR1xuICAgIGZyYW1lLmZpbiA9IHRydWU7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBidWZmZXJGcm9tU3RyaW5nKGRhdGEudG9TdHJpbmcoKSwgJ3V0ZjgnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAxMjUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdXZWJTb2NrZXQ6IERhdGEgZm9yIHBpbmcgaXMgbG9uZ2VyIHRoYW4gMTI1IGJ5dGVzLiAgVHJ1bmNhdGluZy4nKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDAsMTI0KTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZS5iaW5hcnlQYXlsb2FkID0gZGF0YTtcbiAgICB9XG4gICAgdGhpcy5zZW5kRnJhbWUoZnJhbWUpO1xufTtcblxuLy8gUG9uZyBmcmFtZXMgaGF2ZSB0byBlY2hvIGJhY2sgdGhlIGNvbnRlbnRzIG9mIHRoZSBkYXRhIHBvcnRpb24gb2YgdGhlXG4vLyBwaW5nIGZyYW1lIGV4YWN0bHksIGJ5dGUgZm9yIGJ5dGUuXG5XZWJTb2NrZXRDb25uZWN0aW9uLnByb3RvdHlwZS5wb25nID0gZnVuY3Rpb24oYmluYXJ5UGF5bG9hZCkge1xuICAgIHRoaXMuX2RlYnVnKCdwb25nJyk7XG4gICAgdmFyIGZyYW1lID0gbmV3IFdlYlNvY2tldEZyYW1lKHRoaXMubWFza0J5dGVzLCB0aGlzLmZyYW1lSGVhZGVyLCB0aGlzLmNvbmZpZyk7XG4gICAgZnJhbWUub3Bjb2RlID0gMHgwQTsgLy8gV2ViU29ja2V0T3Bjb2RlLlBPTkdcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJpbmFyeVBheWxvYWQpICYmIGJpbmFyeVBheWxvYWQubGVuZ3RoID4gMTI1KSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCdXZWJTb2NrZXQ6IERhdGEgZm9yIHBvbmcgaXMgbG9uZ2VyIHRoYW4gMTI1IGJ5dGVzLiAgVHJ1bmNhdGluZy4nKTtcbiAgICAgICAgYmluYXJ5UGF5bG9hZCA9IGJpbmFyeVBheWxvYWQuc2xpY2UoMCwxMjQpO1xuICAgIH1cbiAgICBmcmFtZS5iaW5hcnlQYXlsb2FkID0gYmluYXJ5UGF5bG9hZDtcbiAgICBmcmFtZS5maW4gPSB0cnVlO1xuICAgIHRoaXMuc2VuZEZyYW1lKGZyYW1lKTtcbn07XG5cbldlYlNvY2tldENvbm5lY3Rpb24ucHJvdG90eXBlLmZyYWdtZW50QW5kU2VuZCA9IGZ1bmN0aW9uKGZyYW1lLCBjYikge1xuICAgIHRoaXMuX2RlYnVnKCdmcmFnbWVudEFuZFNlbmQnKTtcbiAgICBpZiAoZnJhbWUub3Bjb2RlID4gMHgwNykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgZnJhZ21lbnQgY29udHJvbCBmcmFtZXMuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRocmVzaG9sZCA9IHRoaXMuY29uZmlnLmZyYWdtZW50YXRpb25UaHJlc2hvbGQ7XG4gICAgdmFyIGxlbmd0aCA9IGZyYW1lLmJpbmFyeVBheWxvYWQubGVuZ3RoO1xuXG4gICAgLy8gU2VuZCBpbW1lZGlhdGVseSBpZiBmcmFnbWVudGF0aW9uIGlzIGRpc2FibGVkIG9yIHRoZSBtZXNzYWdlIGlzIG5vdFxuICAgIC8vIGxhcmdlciB0aGFuIHRoZSBmcmFnbWVudGF0aW9uIHRocmVzaG9sZC5cbiAgICBpZiAoIXRoaXMuY29uZmlnLmZyYWdtZW50T3V0Z29pbmdNZXNzYWdlcyB8fCAoZnJhbWUuYmluYXJ5UGF5bG9hZCAmJiBsZW5ndGggPD0gdGhyZXNob2xkKSkge1xuICAgICAgICBmcmFtZS5maW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbmRGcmFtZShmcmFtZSwgY2IpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHZhciBudW1GcmFnbWVudHMgPSBNYXRoLmNlaWwobGVuZ3RoIC8gdGhyZXNob2xkKTtcbiAgICB2YXIgc2VudEZyYWdtZW50cyA9IDA7XG4gICAgdmFyIHNlbnRDYWxsYmFjayA9IGZ1bmN0aW9uIGZyYWdtZW50U2VudENhbGxiYWNrKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFzcyBvbmx5IHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICAgICAgY2IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgICsrc2VudEZyYWdtZW50cztcbiAgICAgICAgaWYgKChzZW50RnJhZ21lbnRzID09PSBudW1GcmFnbWVudHMpICYmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IgKHZhciBpPTE7IGkgPD0gbnVtRnJhZ21lbnRzOyBpKyspIHtcbiAgICAgICAgdmFyIGN1cnJlbnRGcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuICAgICAgICBcbiAgICAgICAgLy8gY29udGludWF0aW9uIG9wY29kZSBleGNlcHQgZm9yIGZpcnN0IGZyYW1lLlxuICAgICAgICBjdXJyZW50RnJhbWUub3Bjb2RlID0gKGkgPT09IDEpID8gZnJhbWUub3Bjb2RlIDogMHgwMDtcbiAgICAgICAgXG4gICAgICAgIC8vIGZpbiBzZXQgb24gbGFzdCBmcmFtZSBvbmx5XG4gICAgICAgIGN1cnJlbnRGcmFtZS5maW4gPSAoaSA9PT0gbnVtRnJhZ21lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGxlbmd0aCBpcyBsaWtlbHkgdG8gYmUgc2hvcnRlciBvbiB0aGUgbGFzdCBmcmFnbWVudFxuICAgICAgICB2YXIgY3VycmVudExlbmd0aCA9IChpID09PSBudW1GcmFnbWVudHMpID8gbGVuZ3RoIC0gKHRocmVzaG9sZCAqIChpLTEpKSA6IHRocmVzaG9sZDtcbiAgICAgICAgdmFyIHNsaWNlU3RhcnQgPSB0aHJlc2hvbGQgKiAoaS0xKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNsaWNlIHRoZSByaWdodCBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCBwYXlsb2FkXG4gICAgICAgIGN1cnJlbnRGcmFtZS5iaW5hcnlQYXlsb2FkID0gZnJhbWUuYmluYXJ5UGF5bG9hZC5zbGljZShzbGljZVN0YXJ0LCBzbGljZVN0YXJ0ICsgY3VycmVudExlbmd0aCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNlbmRGcmFtZShjdXJyZW50RnJhbWUsIHNlbnRDYWxsYmFjayk7XG4gICAgfVxufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZENsb3NlRnJhbWUgPSBmdW5jdGlvbihyZWFzb25Db2RlLCBkZXNjcmlwdGlvbiwgY2IpIHtcbiAgICBpZiAodHlwZW9mKHJlYXNvbkNvZGUpICE9PSAnbnVtYmVyJykge1xuICAgICAgICByZWFzb25Db2RlID0gV2ViU29ja2V0Q29ubmVjdGlvbi5DTE9TRV9SRUFTT05fTk9STUFMO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl9kZWJ1Zygnc2VuZENsb3NlRnJhbWUgc3RhdGU6ICVzLCByZWFzb25Db2RlOiAlZCwgZGVzY3JpcHRpb246ICVzJywgdGhpcy5zdGF0ZSwgcmVhc29uQ29kZSwgZGVzY3JpcHRpb24pO1xuICAgIFxuICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9PUEVOICYmIHRoaXMuc3RhdGUgIT09IFNUQVRFX1BFRVJfUkVRVUVTVEVEX0NMT1NFKSB7IHJldHVybjsgfVxuICAgIFxuICAgIHZhciBmcmFtZSA9IG5ldyBXZWJTb2NrZXRGcmFtZSh0aGlzLm1hc2tCeXRlcywgdGhpcy5mcmFtZUhlYWRlciwgdGhpcy5jb25maWcpO1xuICAgIGZyYW1lLmZpbiA9IHRydWU7XG4gICAgZnJhbWUub3Bjb2RlID0gMHgwODsgLy8gV2ViU29ja2V0T3Bjb2RlLkNPTk5FQ1RJT05fQ0xPU0VcbiAgICBmcmFtZS5jbG9zZVN0YXR1cyA9IHJlYXNvbkNvZGU7XG4gICAgaWYgKHR5cGVvZihkZXNjcmlwdGlvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZyYW1lLmJpbmFyeVBheWxvYWQgPSBidWZmZXJGcm9tU3RyaW5nKGRlc2NyaXB0aW9uLCAndXRmOCcpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnNlbmRGcmFtZShmcmFtZSwgY2IpO1xuICAgIHRoaXMuc29ja2V0LmVuZCgpO1xufTtcblxuV2ViU29ja2V0Q29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZEZyYW1lID0gZnVuY3Rpb24oZnJhbWUsIGNiKSB7XG4gICAgdGhpcy5fZGVidWcoJ3NlbmRGcmFtZScpO1xuICAgIGZyYW1lLm1hc2sgPSB0aGlzLm1hc2tPdXRnb2luZ1BhY2tldHM7XG4gICAgdmFyIGZsdXNoZWQgPSB0aGlzLnNvY2tldC53cml0ZShmcmFtZS50b0J1ZmZlcigpLCBjYik7XG4gICAgdGhpcy5vdXRwdXRCdWZmZXJGdWxsID0gIWZsdXNoZWQ7XG4gICAgcmV0dXJuIGZsdXNoZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldENvbm5lY3Rpb247XG5cblxuXG5mdW5jdGlvbiBpbnN0cnVtZW50U29ja2V0Rm9yRGVidWdnaW5nKGNvbm5lY3Rpb24sIHNvY2tldCkge1xuICAgIC8qIGpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuICAgIGlmICghY29ubmVjdGlvbi5fZGVidWcuZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICBcbiAgICB2YXIgb3JpZ2luYWxTb2NrZXRFbWl0ID0gc29ja2V0LmVtaXQ7XG4gICAgc29ja2V0LmVtaXQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25uZWN0aW9uLl9kZWJ1ZygnfHx8IFNvY2tldCBFdmVudCAgXFwnJXNcXCcnLCBldmVudCk7XG4gICAgICAgIG9yaWdpbmFsU29ja2V0RW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgXG4gICAgZm9yICh2YXIga2V5IGluIHNvY2tldCkge1xuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mKHNvY2tldFtrZXldKSkgeyBjb250aW51ZTsgfVxuICAgICAgICBpZiAoWydlbWl0J10uaW5kZXhPZihrZXkpICE9PSAtMSkgeyBjb250aW51ZTsgfVxuICAgICAgICAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSBzb2NrZXRba2V5XTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdvbicpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXRba2V5XSA9IGZ1bmN0aW9uIHByb3h5TWV0aG9kX19FdmVudEVtaXR0ZXJfX09uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl9kZWJ1ZygnfHx8IFNvY2tldCBtZXRob2QgY2FsbGVkOiAgJXMgKCVzKScsIGtleSwgYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb2NrZXRba2V5XSA9IGZ1bmN0aW9uIHByb3h5TWV0aG9kKCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uX2RlYnVnKCd8fHwgU29ja2V0IG1ldGhvZCBjYWxsZWQ6ICAlcycsIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KShrZXkpO1xuICAgIH1cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGJ1ZmZlclV0aWwgPSByZXF1aXJlKCcuL0J1ZmZlclV0aWwnKS5CdWZmZXJVdGlsO1xudmFyIGJ1ZmZlckFsbG9jVW5zYWZlID0gcmVxdWlyZSgnLi91dGlscycpLmJ1ZmZlckFsbG9jVW5zYWZlO1xuXG5jb25zdCBERUNPREVfSEVBREVSID0gMTtcbmNvbnN0IFdBSVRJTkdfRk9SXzE2X0JJVF9MRU5HVEggPSAyO1xuY29uc3QgV0FJVElOR19GT1JfNjRfQklUX0xFTkdUSCA9IDM7XG5jb25zdCBXQUlUSU5HX0ZPUl9NQVNLX0tFWSA9IDQ7XG5jb25zdCBXQUlUSU5HX0ZPUl9QQVlMT0FEID0gNTtcbmNvbnN0IENPTVBMRVRFID0gNjtcblxuLy8gV2ViU29ja2V0Q29ubmVjdGlvbiB3aWxsIHBhc3Mgc2hhcmVkIGJ1ZmZlciBvYmplY3RzIGZvciBtYXNrQnl0ZXMgYW5kXG4vLyBmcmFtZUhlYWRlciBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0byBhdm9pZCB0b25zIG9mIHNtYWxsIG1lbW9yeSBhbGxvY2F0aW9uc1xuLy8gZm9yIGVhY2ggZnJhbWUgd2UgaGF2ZSB0byBwYXJzZS4gIFRoaXMgaXMgb25seSB1c2VkIGZvciBwYXJzaW5nIGZyYW1lc1xuLy8gd2UgcmVjZWl2ZSBvZmYgdGhlIHdpcmUuXG5mdW5jdGlvbiBXZWJTb2NrZXRGcmFtZShtYXNrQnl0ZXMsIGZyYW1lSGVhZGVyLCBjb25maWcpIHtcbiAgICB0aGlzLm1hc2tCeXRlcyA9IG1hc2tCeXRlcztcbiAgICB0aGlzLmZyYW1lSGVhZGVyID0gZnJhbWVIZWFkZXI7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5tYXhSZWNlaXZlZEZyYW1lU2l6ZSA9IGNvbmZpZy5tYXhSZWNlaXZlZEZyYW1lU2l6ZTtcbiAgICB0aGlzLnByb3RvY29sRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmZyYW1lVG9vTGFyZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmludmFsaWRDbG9zZUZyYW1lTGVuZ3RoID0gZmFsc2U7XG4gICAgdGhpcy5wYXJzZVN0YXRlID0gREVDT0RFX0hFQURFUjtcbiAgICB0aGlzLmNsb3NlU3RhdHVzID0gLTE7XG59XG5cbldlYlNvY2tldEZyYW1lLnByb3RvdHlwZS5hZGREYXRhID0gZnVuY3Rpb24oYnVmZmVyTGlzdCkge1xuICAgIGlmICh0aGlzLnBhcnNlU3RhdGUgPT09IERFQ09ERV9IRUFERVIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlckxpc3QubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxpc3Quam9pbkludG8odGhpcy5mcmFtZUhlYWRlciwgMCwgMCwgMik7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmFkdmFuY2UoMik7XG4gICAgICAgICAgICB2YXIgZmlyc3RCeXRlID0gdGhpcy5mcmFtZUhlYWRlclswXTtcbiAgICAgICAgICAgIHZhciBzZWNvbmRCeXRlID0gdGhpcy5mcmFtZUhlYWRlclsxXTtcblxuICAgICAgICAgICAgdGhpcy5maW4gICAgID0gQm9vbGVhbihmaXJzdEJ5dGUgICYgMHg4MCk7XG4gICAgICAgICAgICB0aGlzLnJzdjEgICAgPSBCb29sZWFuKGZpcnN0Qnl0ZSAgJiAweDQwKTtcbiAgICAgICAgICAgIHRoaXMucnN2MiAgICA9IEJvb2xlYW4oZmlyc3RCeXRlICAmIDB4MjApO1xuICAgICAgICAgICAgdGhpcy5yc3YzICAgID0gQm9vbGVhbihmaXJzdEJ5dGUgICYgMHgxMCk7XG4gICAgICAgICAgICB0aGlzLm1hc2sgICAgPSBCb29sZWFuKHNlY29uZEJ5dGUgJiAweDgwKTtcblxuICAgICAgICAgICAgdGhpcy5vcGNvZGUgID0gZmlyc3RCeXRlICAmIDB4MEY7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHNlY29uZEJ5dGUgJiAweDdGO1xuXG4gICAgICAgICAgICAvLyBDb250cm9sIGZyYW1lIHNhbml0eSBjaGVja1xuICAgICAgICAgICAgaWYgKHRoaXMub3Bjb2RlID49IDB4MDgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAxMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm90b2NvbEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUmVhc29uID0gJ0lsbGVnYWwgY29udHJvbCBmcmFtZSBsb25nZXIgdGhhbiAxMjUgYnl0ZXMuJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm90b2NvbEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUmVhc29uID0gJ0NvbnRyb2wgZnJhbWVzIG11c3Qgbm90IGJlIGZyYWdtZW50ZWQuJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDEyNikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SXzE2X0JJVF9MRU5HVEg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PT0gMTI3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gV0FJVElOR19GT1JfNjRfQklUX0xFTkdUSDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VTdGF0ZSA9IFdBSVRJTkdfRk9SX01BU0tfS0VZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcnNlU3RhdGUgPT09IFdBSVRJTkdfRk9SXzE2X0JJVF9MRU5HVEgpIHtcbiAgICAgICAgaWYgKGJ1ZmZlckxpc3QubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxpc3Quam9pbkludG8odGhpcy5mcmFtZUhlYWRlciwgMiwgMCwgMik7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmFkdmFuY2UoMik7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZnJhbWVIZWFkZXIucmVhZFVJbnQxNkJFKDIpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gV0FJVElOR19GT1JfTUFTS19LRVk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wYXJzZVN0YXRlID09PSBXQUlUSU5HX0ZPUl82NF9CSVRfTEVOR1RIKSB7XG4gICAgICAgIGlmIChidWZmZXJMaXN0Lmxlbmd0aCA+PSA4KSB7XG4gICAgICAgICAgICBidWZmZXJMaXN0LmpvaW5JbnRvKHRoaXMuZnJhbWVIZWFkZXIsIDIsIDAsIDgpO1xuICAgICAgICAgICAgYnVmZmVyTGlzdC5hZHZhbmNlKDgpO1xuICAgICAgICAgICAgdmFyIGxlbmd0aFBhaXIgPSBbXG4gICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWFkZXIucmVhZFVJbnQzMkJFKDIpLFxuICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyLnJlYWRVSW50MzJCRSgyKzQpXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBpZiAobGVuZ3RoUGFpclswXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdG9jb2xFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wUmVhc29uID0gJ1Vuc3VwcG9ydGVkIDY0LWJpdCBsZW5ndGggZnJhbWUgcmVjZWl2ZWQnO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGhQYWlyWzFdO1xuICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gV0FJVElOR19GT1JfTUFTS19LRVk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJzZVN0YXRlID09PSBXQUlUSU5HX0ZPUl9NQVNLX0tFWSkge1xuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyTGlzdC5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlckxpc3Quam9pbkludG8odGhpcy5tYXNrQnl0ZXMsIDAsIDAsIDQpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlckxpc3QuYWR2YW5jZSg0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBXQUlUSU5HX0ZPUl9QQVlMT0FEO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJzZVN0YXRlID0gV0FJVElOR19GT1JfUEFZTE9BRDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcnNlU3RhdGUgPT09IFdBSVRJTkdfRk9SX1BBWUxPQUQpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gdGhpcy5tYXhSZWNlaXZlZEZyYW1lU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVRvb0xhcmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZHJvcFJlYXNvbiA9ICdGcmFtZSBzaXplIG9mICcgKyB0aGlzLmxlbmd0aC50b1N0cmluZygxMCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyBieXRlcyBleGNlZWRzIG1heGltdW0gYWNjZXB0ZWQgZnJhbWUgc2l6ZSc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5iaW5hcnlQYXlsb2FkID0gYnVmZmVyQWxsb2NVbnNhZmUoMCk7XG4gICAgICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBDT01QTEVURTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWZmZXJMaXN0Lmxlbmd0aCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5iaW5hcnlQYXlsb2FkID0gYnVmZmVyTGlzdC50YWtlKHRoaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGJ1ZmZlckxpc3QuYWR2YW5jZSh0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyVXRpbC51bm1hc2sodGhpcy5iaW5hcnlQYXlsb2FkLCB0aGlzLm1hc2tCeXRlcyk7XG4gICAgICAgICAgICAgICAgLy8geG9yKHRoaXMuYmluYXJ5UGF5bG9hZCwgdGhpcy5tYXNrQnl0ZXMsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcGNvZGUgPT09IDB4MDgpIHsgLy8gV2ViU29ja2V0T3Bjb2RlLkNPTk5FQ1RJT05fQ0xPU0VcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBsZW5ndGggZm9yIGEgY2xvc2UgZnJhbWUuICBNdXN0IGJlIHplcm8gb3IgYXQgbGVhc3QgdHdvLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmFyeVBheWxvYWQgPSBidWZmZXJBbGxvY1Vuc2FmZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkQ2xvc2VGcmFtZUxlbmd0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTdGF0dXMgPSB0aGlzLmJpbmFyeVBheWxvYWQucmVhZFVJbnQxNkJFKDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmFyeVBheWxvYWQgPSB0aGlzLmJpbmFyeVBheWxvYWQuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBDT01QTEVURTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbldlYlNvY2tldEZyYW1lLnByb3RvdHlwZS50aHJvd0F3YXlQYXlsb2FkID0gZnVuY3Rpb24oYnVmZmVyTGlzdCkge1xuICAgIGlmIChidWZmZXJMaXN0Lmxlbmd0aCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICBidWZmZXJMaXN0LmFkdmFuY2UodGhpcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnBhcnNlU3RhdGUgPSBDT01QTEVURTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbldlYlNvY2tldEZyYW1lLnByb3RvdHlwZS50b0J1ZmZlciA9IGZ1bmN0aW9uKG51bGxNYXNrKSB7XG4gICAgdmFyIG1hc2tLZXk7XG4gICAgdmFyIGhlYWRlckxlbmd0aCA9IDI7XG4gICAgdmFyIGRhdGE7XG4gICAgdmFyIG91dHB1dFBvcztcbiAgICB2YXIgZmlyc3RCeXRlID0gMHgwMDtcbiAgICB2YXIgc2Vjb25kQnl0ZSA9IDB4MDA7XG5cbiAgICBpZiAodGhpcy5maW4pIHtcbiAgICAgICAgZmlyc3RCeXRlIHw9IDB4ODA7XG4gICAgfVxuICAgIGlmICh0aGlzLnJzdjEpIHtcbiAgICAgICAgZmlyc3RCeXRlIHw9IDB4NDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnJzdjIpIHtcbiAgICAgICAgZmlyc3RCeXRlIHw9IDB4MjA7XG4gICAgfVxuICAgIGlmICh0aGlzLnJzdjMpIHtcbiAgICAgICAgZmlyc3RCeXRlIHw9IDB4MTA7XG4gICAgfVxuICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgc2Vjb25kQnl0ZSB8PSAweDgwO1xuICAgIH1cblxuICAgIGZpcnN0Qnl0ZSB8PSAodGhpcy5vcGNvZGUgJiAweDBGKTtcblxuICAgIC8vIHRoZSBjbG9zZSBmcmFtZSBpcyBhIHNwZWNpYWwgY2FzZSBiZWNhdXNlIHRoZSBjbG9zZSByZWFzb24gaXNcbiAgICAvLyBwcmVwZW5kZWQgdG8gdGhlIHBheWxvYWQgZGF0YS5cbiAgICBpZiAodGhpcy5vcGNvZGUgPT09IDB4MDgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAyO1xuICAgICAgICBpZiAodGhpcy5iaW5hcnlQYXlsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCArPSB0aGlzLmJpbmFyeVBheWxvYWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSBidWZmZXJBbGxvY1Vuc2FmZSh0aGlzLmxlbmd0aCk7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MTZCRSh0aGlzLmNsb3NlU3RhdHVzLCAwKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgdGhpcy5iaW5hcnlQYXlsb2FkLmNvcHkoZGF0YSwgMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5iaW5hcnlQYXlsb2FkKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLmJpbmFyeVBheWxvYWQ7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IDEyNSkge1xuICAgICAgICAvLyBlbmNvZGUgdGhlIGxlbmd0aCBkaXJlY3RseSBpbnRvIHRoZSB0d28tYnl0ZSBmcmFtZSBoZWFkZXJcbiAgICAgICAgc2Vjb25kQnl0ZSB8PSAodGhpcy5sZW5ndGggJiAweDdGKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5sZW5ndGggPiAxMjUgJiYgdGhpcy5sZW5ndGggPD0gMHhGRkZGKSB7XG4gICAgICAgIC8vIFVzZSAxNi1iaXQgbGVuZ3RoXG4gICAgICAgIHNlY29uZEJ5dGUgfD0gMTI2O1xuICAgICAgICBoZWFkZXJMZW5ndGggKz0gMjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5sZW5ndGggPiAweEZGRkYpIHtcbiAgICAgICAgLy8gVXNlIDY0LWJpdCBsZW5ndGhcbiAgICAgICAgc2Vjb25kQnl0ZSB8PSAxMjc7XG4gICAgICAgIGhlYWRlckxlbmd0aCArPSA4O1xuICAgIH1cblxuICAgIHZhciBvdXRwdXQgPSBidWZmZXJBbGxvY1Vuc2FmZSh0aGlzLmxlbmd0aCArIGhlYWRlckxlbmd0aCArICh0aGlzLm1hc2sgPyA0IDogMCkpO1xuXG4gICAgLy8gd3JpdGUgdGhlIGZyYW1lIGhlYWRlclxuICAgIG91dHB1dFswXSA9IGZpcnN0Qnl0ZTtcbiAgICBvdXRwdXRbMV0gPSBzZWNvbmRCeXRlO1xuXG4gICAgb3V0cHV0UG9zID0gMjtcblxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDEyNSAmJiB0aGlzLmxlbmd0aCA8PSAweEZGRkYpIHtcbiAgICAgICAgLy8gd3JpdGUgMTYtYml0IGxlbmd0aFxuICAgICAgICBvdXRwdXQud3JpdGVVSW50MTZCRSh0aGlzLmxlbmd0aCwgb3V0cHV0UG9zKTtcbiAgICAgICAgb3V0cHV0UG9zICs9IDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoID4gMHhGRkZGKSB7XG4gICAgICAgIC8vIHdyaXRlIDY0LWJpdCBsZW5ndGhcbiAgICAgICAgb3V0cHV0LndyaXRlVUludDMyQkUoMHgwMDAwMDAwMCwgb3V0cHV0UG9zKTtcbiAgICAgICAgb3V0cHV0LndyaXRlVUludDMyQkUodGhpcy5sZW5ndGgsIG91dHB1dFBvcyArIDQpO1xuICAgICAgICBvdXRwdXRQb3MgKz0gODtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgIG1hc2tLZXkgPSBudWxsTWFzayA/IDAgOiAoKE1hdGgucmFuZG9tKCkgKiAweEZGRkZGRkZGKSA+Pj4gMCk7XG4gICAgICAgIHRoaXMubWFza0J5dGVzLndyaXRlVUludDMyQkUobWFza0tleSwgMCk7XG5cbiAgICAgICAgLy8gd3JpdGUgdGhlIG1hc2sga2V5XG4gICAgICAgIHRoaXMubWFza0J5dGVzLmNvcHkob3V0cHV0LCBvdXRwdXRQb3MpO1xuICAgICAgICBvdXRwdXRQb3MgKz0gNDtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGJ1ZmZlclV0aWwubWFzayhkYXRhLCB0aGlzLm1hc2tCeXRlcywgb3V0cHV0LCBvdXRwdXRQb3MsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEuY29weShvdXRwdXQsIG91dHB1dFBvcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbldlYlNvY2tldEZyYW1lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnT3Bjb2RlOiAnICsgdGhpcy5vcGNvZGUgKyAnLCBmaW46ICcgKyB0aGlzLmZpbiArICcsIGxlbmd0aDogJyArIHRoaXMubGVuZ3RoICsgJywgaGFzUGF5bG9hZDogJyArIEJvb2xlYW4odGhpcy5iaW5hcnlQYXlsb2FkKSArICcsIG1hc2tlZDogJyArIHRoaXMubWFzaztcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRGcmFtZTtcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICBDb3B5cmlnaHQgMjAxMC0yMDE1IEJyaWFuIE1jS2VsdmV5LlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIFdlYlNvY2tldENvbm5lY3Rpb24gPSByZXF1aXJlKCcuL1dlYlNvY2tldENvbm5lY3Rpb24nKTtcblxudmFyIGhlYWRlclZhbHVlU3BsaXRSZWdFeHAgPSAvLFxccyovO1xudmFyIGhlYWRlclBhcmFtU3BsaXRSZWdFeHAgPSAvO1xccyovO1xudmFyIGhlYWRlclNhbml0aXplUmVnRXhwID0gL1tcXHJcXG5dL2c7XG52YXIgeEZvcndhcmRlZEZvclNlcGFyYXRvclJlZ0V4cCA9IC8sXFxzKi87XG52YXIgc2VwYXJhdG9ycyA9IFtcbiAgICAnKCcsICcpJywgJzwnLCAnPicsICdAJyxcbiAgICAnLCcsICc7JywgJzonLCAnXFxcXCcsICdcXFwiJyxcbiAgICAnLycsICdbJywgJ10nLCAnPycsICc9JyxcbiAgICAneycsICd9JywgJyAnLCBTdHJpbmcuZnJvbUNoYXJDb2RlKDkpXG5dO1xudmFyIGNvbnRyb2xDaGFycyA9IFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEyNykgLyogREVMICovXTtcbmZvciAodmFyIGk9MDsgaSA8IDMxOyBpICsrKSB7XG4gICAgLyogVVMtQVNDSUkgQ29udHJvbCBDaGFyYWN0ZXJzICovXG4gICAgY29udHJvbENoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG59XG5cbnZhciBjb29raWVOYW1lVmFsaWRhdGVSZWdFeCA9IC8oW1xceDAwLVxceDIwXFx4MjJcXHgyOFxceDI5XFx4MmNcXHgyZlxceDNhLVxceDNmXFx4NDBcXHg1Yi1cXHg1ZVxceDdiXFx4N2RcXHg3Zl0pLztcbnZhciBjb29raWVWYWx1ZVZhbGlkYXRlUmVnRXggPSAvW15cXHgyMVxceDIzLVxceDJiXFx4MmQtXFx4M2FcXHgzYy1cXHg1YlxceDVkLVxceDdlXS87XG52YXIgY29va2llVmFsdWVEUXVvdGVWYWxpZGF0ZVJlZ0V4ID0gL15cIlteXCJdKlwiJC87XG52YXIgY29udHJvbENoYXJzQW5kU2VtaWNvbG9uUmVnRXggPSAvW1xceDAwLVxceDIwXFx4M2JdL2c7XG5cbnZhciBjb29raWVTZXBhcmF0b3JSZWdFeCA9IC9bOyxdICovO1xuXG52YXIgaHR0cFN0YXR1c0Rlc2NyaXB0aW9ucyA9IHtcbiAgICAxMDA6ICdDb250aW51ZScsXG4gICAgMTAxOiAnU3dpdGNoaW5nIFByb3RvY29scycsXG4gICAgMjAwOiAnT0snLFxuICAgIDIwMTogJ0NyZWF0ZWQnLFxuICAgIDIwMzogJ05vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uJyxcbiAgICAyMDQ6ICdObyBDb250ZW50JyxcbiAgICAyMDU6ICdSZXNldCBDb250ZW50JyxcbiAgICAyMDY6ICdQYXJ0aWFsIENvbnRlbnQnLFxuICAgIDMwMDogJ011bHRpcGxlIENob2ljZXMnLFxuICAgIDMwMTogJ01vdmVkIFBlcm1hbmVudGx5JyxcbiAgICAzMDI6ICdGb3VuZCcsXG4gICAgMzAzOiAnU2VlIE90aGVyJyxcbiAgICAzMDQ6ICdOb3QgTW9kaWZpZWQnLFxuICAgIDMwNTogJ1VzZSBQcm94eScsXG4gICAgMzA3OiAnVGVtcG9yYXJ5IFJlZGlyZWN0JyxcbiAgICA0MDA6ICdCYWQgUmVxdWVzdCcsXG4gICAgNDAxOiAnVW5hdXRob3JpemVkJyxcbiAgICA0MDI6ICdQYXltZW50IFJlcXVpcmVkJyxcbiAgICA0MDM6ICdGb3JiaWRkZW4nLFxuICAgIDQwNDogJ05vdCBGb3VuZCcsXG4gICAgNDA2OiAnTm90IEFjY2VwdGFibGUnLFxuICAgIDQwNzogJ1Byb3h5IEF1dGhvcml6YXRpb24gUmVxdWlyZWQnLFxuICAgIDQwODogJ1JlcXVlc3QgVGltZW91dCcsXG4gICAgNDA5OiAnQ29uZmxpY3QnLFxuICAgIDQxMDogJ0dvbmUnLFxuICAgIDQxMTogJ0xlbmd0aCBSZXF1aXJlZCcsXG4gICAgNDEyOiAnUHJlY29uZGl0aW9uIEZhaWxlZCcsXG4gICAgNDEzOiAnUmVxdWVzdCBFbnRpdHkgVG9vIExvbmcnLFxuICAgIDQxNDogJ1JlcXVlc3QtVVJJIFRvbyBMb25nJyxcbiAgICA0MTU6ICdVbnN1cHBvcnRlZCBNZWRpYSBUeXBlJyxcbiAgICA0MTY6ICdSZXF1ZXN0ZWQgUmFuZ2UgTm90IFNhdGlzZmlhYmxlJyxcbiAgICA0MTc6ICdFeHBlY3RhdGlvbiBGYWlsZWQnLFxuICAgIDQyNjogJ1VwZ3JhZGUgUmVxdWlyZWQnLFxuICAgIDUwMDogJ0ludGVybmFsIFNlcnZlciBFcnJvcicsXG4gICAgNTAxOiAnTm90IEltcGxlbWVudGVkJyxcbiAgICA1MDI6ICdCYWQgR2F0ZXdheScsXG4gICAgNTAzOiAnU2VydmljZSBVbmF2YWlsYWJsZScsXG4gICAgNTA0OiAnR2F0ZXdheSBUaW1lb3V0JyxcbiAgICA1MDU6ICdIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZCdcbn07XG5cbmZ1bmN0aW9uIFdlYlNvY2tldFJlcXVlc3Qoc29ja2V0LCBodHRwUmVxdWVzdCwgc2VydmVyQ29uZmlnKSB7XG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgdGhpcy5odHRwUmVxdWVzdCA9IGh0dHBSZXF1ZXN0O1xuICAgIHRoaXMucmVzb3VyY2UgPSBodHRwUmVxdWVzdC51cmw7XG4gICAgdGhpcy5yZW1vdGVBZGRyZXNzID0gc29ja2V0LnJlbW90ZUFkZHJlc3M7XG4gICAgdGhpcy5yZW1vdGVBZGRyZXNzZXMgPSBbdGhpcy5yZW1vdGVBZGRyZXNzXTtcbiAgICB0aGlzLnNlcnZlckNvbmZpZyA9IHNlcnZlckNvbmZpZztcbiAgICBcbiAgICAvLyBXYXRjaCBmb3IgdGhlIHVuZGVybHlpbmcgVENQIHNvY2tldCBjbG9zaW5nIGJlZm9yZSB3ZSBjYWxsIGFjY2VwdFxuICAgIHRoaXMuX3NvY2tldElzQ2xvc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX3NvY2tldENsb3NlSGFuZGxlciA9IHRoaXMuX2hhbmRsZVNvY2tldENsb3NlQmVmb3JlQWNjZXB0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zb2NrZXQub24oJ2VuZCcsIHRoaXMuX3NvY2tldENsb3NlSGFuZGxlcik7XG4gICAgdGhpcy5zb2NrZXQub24oJ2Nsb3NlJywgdGhpcy5fc29ja2V0Q2xvc2VIYW5kbGVyKTtcbiAgICBcbiAgICB0aGlzLl9yZXNvbHZlZCA9IGZhbHNlO1xufVxuXG51dGlsLmluaGVyaXRzKFdlYlNvY2tldFJlcXVlc3QsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFJlcXVlc3QucHJvdG90eXBlLnJlYWRIYW5kc2hha2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmh0dHBSZXF1ZXN0O1xuXG4gICAgLy8gRGVjb2RlIFVSTFxuICAgIHRoaXMucmVzb3VyY2VVUkwgPSB1cmwucGFyc2UodGhpcy5yZXNvdXJjZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmhvc3QgPSByZXF1ZXN0LmhlYWRlcnNbJ2hvc3QnXTtcbiAgICBpZiAoIXRoaXMuaG9zdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBtdXN0IHByb3ZpZGUgYSBIb3N0IGhlYWRlci4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmtleSA9IHJlcXVlc3QuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1rZXknXTtcbiAgICBpZiAoIXRoaXMua2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IG11c3QgcHJvdmlkZSBhIHZhbHVlIGZvciBTZWMtV2ViU29ja2V0LUtleS4nKTtcbiAgICB9XG5cbiAgICB0aGlzLndlYlNvY2tldFZlcnNpb24gPSBwYXJzZUludChyZXF1ZXN0LmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtdmVyc2lvbiddLCAxMCk7XG5cbiAgICBpZiAoIXRoaXMud2ViU29ja2V0VmVyc2lvbiB8fCBpc05hTih0aGlzLndlYlNvY2tldFZlcnNpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IG11c3QgcHJvdmlkZSBhIHZhbHVlIGZvciBTZWMtV2ViU29ja2V0LVZlcnNpb24uJyk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLndlYlNvY2tldFZlcnNpb24pIHtcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgd2Vic29ja2V0IGNsaWVudCB2ZXJzaW9uOiAnICsgdGhpcy53ZWJTb2NrZXRWZXJzaW9uICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdPbmx5IHZlcnNpb25zIDggYW5kIDEzIGFyZSBzdXBwb3J0ZWQuJyk7XG4gICAgICAgICAgICBlLmh0dHBDb2RlID0gNDI2O1xuICAgICAgICAgICAgZS5oZWFkZXJzID0ge1xuICAgICAgICAgICAgICAgICdTZWMtV2ViU29ja2V0LVZlcnNpb24nOiAnMTMnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy53ZWJTb2NrZXRWZXJzaW9uID09PSAxMykge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHJlcXVlc3QuaGVhZGVyc1snb3JpZ2luJ107XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMud2ViU29ja2V0VmVyc2lvbiA9PT0gOCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHJlcXVlc3QuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1vcmlnaW4nXTtcbiAgICB9XG5cbiAgICAvLyBQcm90b2NvbCBpcyBvcHRpb25hbC5cbiAgICB2YXIgcHJvdG9jb2xTdHJpbmcgPSByZXF1ZXN0LmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcbiAgICB0aGlzLnByb3RvY29sRnVsbENhc2VNYXAgPSB7fTtcbiAgICB0aGlzLnJlcXVlc3RlZFByb3RvY29scyA9IFtdO1xuICAgIGlmIChwcm90b2NvbFN0cmluZykge1xuICAgICAgICB2YXIgcmVxdWVzdGVkUHJvdG9jb2xzRnVsbENhc2UgPSBwcm90b2NvbFN0cmluZy5zcGxpdChoZWFkZXJWYWx1ZVNwbGl0UmVnRXhwKTtcbiAgICAgICAgcmVxdWVzdGVkUHJvdG9jb2xzRnVsbENhc2UuZm9yRWFjaChmdW5jdGlvbihwcm90b2NvbCkge1xuICAgICAgICAgICAgdmFyIGxjUHJvdG9jb2wgPSBwcm90b2NvbC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgc2VsZi5yZXF1ZXN0ZWRQcm90b2NvbHMucHVzaChsY1Byb3RvY29sKTtcbiAgICAgICAgICAgIHNlbGYucHJvdG9jb2xGdWxsQ2FzZU1hcFtsY1Byb3RvY29sXSA9IHByb3RvY29sO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2VydmVyQ29uZmlnLmlnbm9yZVhGb3J3YXJkZWRGb3IgJiZcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzWyd4LWZvcndhcmRlZC1mb3InXSkge1xuICAgICAgICB2YXIgaW1tZWRpYXRlUGVlcklQID0gdGhpcy5yZW1vdGVBZGRyZXNzO1xuICAgICAgICB0aGlzLnJlbW90ZUFkZHJlc3NlcyA9IHJlcXVlc3QuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ11cbiAgICAgICAgICAgIC5zcGxpdCh4Rm9yd2FyZGVkRm9yU2VwYXJhdG9yUmVnRXhwKTtcbiAgICAgICAgdGhpcy5yZW1vdGVBZGRyZXNzZXMucHVzaChpbW1lZGlhdGVQZWVySVApO1xuICAgICAgICB0aGlzLnJlbW90ZUFkZHJlc3MgPSB0aGlzLnJlbW90ZUFkZHJlc3Nlc1swXTtcbiAgICB9XG5cbiAgICAvLyBFeHRlbnNpb25zIGFyZSBvcHRpb25hbC5cbiAgICB2YXIgZXh0ZW5zaW9uc1N0cmluZyA9IHJlcXVlc3QuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1leHRlbnNpb25zJ107XG4gICAgdGhpcy5yZXF1ZXN0ZWRFeHRlbnNpb25zID0gdGhpcy5wYXJzZUV4dGVuc2lvbnMoZXh0ZW5zaW9uc1N0cmluZyk7XG5cbiAgICAvLyBDb29raWVzIGFyZSBvcHRpb25hbFxuICAgIHZhciBjb29raWVTdHJpbmcgPSByZXF1ZXN0LmhlYWRlcnNbJ2Nvb2tpZSddO1xuICAgIHRoaXMuY29va2llcyA9IHRoaXMucGFyc2VDb29raWVzKGNvb2tpZVN0cmluZyk7XG59O1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5wYXJzZUV4dGVuc2lvbnMgPSBmdW5jdGlvbihleHRlbnNpb25zU3RyaW5nKSB7XG4gICAgaWYgKCFleHRlbnNpb25zU3RyaW5nIHx8IGV4dGVuc2lvbnNTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zU3RyaW5nLnRvTG9jYWxlTG93ZXJDYXNlKCkuc3BsaXQoaGVhZGVyVmFsdWVTcGxpdFJlZ0V4cCk7XG4gICAgZXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGV4dGVuc2lvbiwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBleHRlbnNpb24uc3BsaXQoaGVhZGVyUGFyYW1TcGxpdFJlZ0V4cCk7XG4gICAgICAgIHZhciBleHRlbnNpb25OYW1lID0gcGFyYW1zWzBdO1xuICAgICAgICB2YXIgZXh0ZW5zaW9uUGFyYW1zID0gcGFyYW1zLnNsaWNlKDEpO1xuICAgICAgICBleHRlbnNpb25QYXJhbXMuZm9yRWFjaChmdW5jdGlvbihyYXdQYXJhbSwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gcmF3UGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogYXJyWzBdLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBhcnJbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEsIG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgbmFtZTogZXh0ZW5zaW9uTmFtZSxcbiAgICAgICAgICAgIHBhcmFtczogZXh0ZW5zaW9uUGFyYW1zXG4gICAgICAgIH07XG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSwgb2JqKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZXh0ZW5zaW9ucztcbn07XG5cbi8vIFRoaXMgZnVuY3Rpb24gYWRhcHRlZCBmcm9tIG5vZGUtY29va2llXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2h0eWxtYW4vbm9kZS1jb29raWVcbldlYlNvY2tldFJlcXVlc3QucHJvdG90eXBlLnBhcnNlQ29va2llcyA9IGZ1bmN0aW9uKHN0cikge1xuICAgIC8vIFNhbml0eSBDaGVja1xuICAgIGlmICghc3RyIHx8IHR5cGVvZihzdHIpICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgdmFyIGNvb2tpZXMgPSBbXTtcbiAgICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoY29va2llU2VwYXJhdG9yUmVnRXgpO1xuXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihwYWlyKSB7XG4gICAgICAgIHZhciBlcV9pZHggPSBwYWlyLmluZGV4T2YoJz0nKTtcbiAgICAgICAgaWYgKGVxX2lkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvb2tpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGFpcixcbiAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5ID0gcGFpci5zdWJzdHIoMCwgZXFfaWR4KS50cmltKCk7XG4gICAgICAgIHZhciB2YWwgPSBwYWlyLnN1YnN0cigrK2VxX2lkeCwgcGFpci5sZW5ndGgpLnRyaW0oKTtcblxuICAgICAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgICAgIGlmICgnXCInID09PSB2YWxbMF0pIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb29raWVzLnB1c2goe1xuICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgdmFsdWU6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvb2tpZXM7XG59O1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihhY2NlcHRlZFByb3RvY29sLCBhbGxvd2VkT3JpZ2luLCBjb29raWVzKSB7XG4gICAgdGhpcy5fdmVyaWZ5UmVzb2x1dGlvbigpO1xuICAgIFxuICAgIC8vIFRPRE86IEhhbmRsZSBleHRlbnNpb25zXG5cbiAgICB2YXIgcHJvdG9jb2xGdWxsQ2FzZTtcblxuICAgIGlmIChhY2NlcHRlZFByb3RvY29sKSB7XG4gICAgICAgIHByb3RvY29sRnVsbENhc2UgPSB0aGlzLnByb3RvY29sRnVsbENhc2VNYXBbYWNjZXB0ZWRQcm90b2NvbC50b0xvY2FsZUxvd2VyQ2FzZSgpXTtcbiAgICAgICAgaWYgKHR5cGVvZihwcm90b2NvbEZ1bGxDYXNlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHByb3RvY29sRnVsbENhc2UgPSBhY2NlcHRlZFByb3RvY29sO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwcm90b2NvbEZ1bGxDYXNlID0gYWNjZXB0ZWRQcm90b2NvbDtcbiAgICB9XG4gICAgdGhpcy5wcm90b2NvbEZ1bGxDYXNlTWFwID0gbnVsbDtcblxuICAgIC8vIENyZWF0ZSBrZXkgdmFsaWRhdGlvbiBoYXNoXG4gICAgdmFyIHNoYTEgPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpO1xuICAgIHNoYTEudXBkYXRlKHRoaXMua2V5ICsgJzI1OEVBRkE1LUU5MTQtNDdEQS05NUNBLUM1QUIwREM4NUIxMScpO1xuICAgIHZhciBhY2NlcHRLZXkgPSBzaGExLmRpZ2VzdCgnYmFzZTY0Jyk7XG5cbiAgICB2YXIgcmVzcG9uc2UgPSAnSFRUUC8xLjEgMTAxIFN3aXRjaGluZyBQcm90b2NvbHNcXHJcXG4nICtcbiAgICAgICAgICAgICAgICAgICAnVXBncmFkZTogd2Vic29ja2V0XFxyXFxuJyArXG4gICAgICAgICAgICAgICAgICAgJ0Nvbm5lY3Rpb246IFVwZ3JhZGVcXHJcXG4nICtcbiAgICAgICAgICAgICAgICAgICAnU2VjLVdlYlNvY2tldC1BY2NlcHQ6ICcgKyBhY2NlcHRLZXkgKyAnXFxyXFxuJztcblxuICAgIGlmIChwcm90b2NvbEZ1bGxDYXNlKSB7XG4gICAgICAgIC8vIHZhbGlkYXRlIHByb3RvY29sXG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IHByb3RvY29sRnVsbENhc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGFyQ29kZSA9IHByb3RvY29sRnVsbENhc2UuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBwcm90b2NvbEZ1bGxDYXNlLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDB4MjEgfHwgY2hhckNvZGUgPiAweDdFIHx8IHNlcGFyYXRvcnMuaW5kZXhPZihjaGFyYWN0ZXIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGNoYXJhY3RlciBcIicgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJhY3RlcikgKyAnXCIgaW4gc3VicHJvdG9jb2wuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdGVkUHJvdG9jb2xzLmluZGV4T2YoYWNjZXB0ZWRQcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgcHJvdG9jb2wgd2FzIG5vdCByZXF1ZXN0ZWQgYnkgdGhlIGNsaWVudC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RvY29sRnVsbENhc2UgPSBwcm90b2NvbEZ1bGxDYXNlLnJlcGxhY2UoaGVhZGVyU2FuaXRpemVSZWdFeHAsICcnKTtcbiAgICAgICAgcmVzcG9uc2UgKz0gJ1NlYy1XZWJTb2NrZXQtUHJvdG9jb2w6ICcgKyBwcm90b2NvbEZ1bGxDYXNlICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHRoaXMucmVxdWVzdGVkUHJvdG9jb2xzID0gbnVsbDtcblxuICAgIGlmIChhbGxvd2VkT3JpZ2luKSB7XG4gICAgICAgIGFsbG93ZWRPcmlnaW4gPSBhbGxvd2VkT3JpZ2luLnJlcGxhY2UoaGVhZGVyU2FuaXRpemVSZWdFeHAsICcnKTtcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0VmVyc2lvbiA9PT0gMTMpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlICs9ICdPcmlnaW46ICcgKyBhbGxvd2VkT3JpZ2luICsgJ1xcclxcbic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy53ZWJTb2NrZXRWZXJzaW9uID09PSA4KSB7XG4gICAgICAgICAgICByZXNwb25zZSArPSAnU2VjLVdlYlNvY2tldC1PcmlnaW46ICcgKyBhbGxvd2VkT3JpZ2luICsgJ1xcclxcbic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29va2llcykge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29va2llcykpIHtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciBcImNvb2tpZXNcIiBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWVuQ29va2llcyA9IHt9O1xuICAgICAgICBjb29raWVzLmZvckVhY2goZnVuY3Rpb24oY29va2llKSB7XG4gICAgICAgICAgICBpZiAoIWNvb2tpZS5uYW1lIHx8ICFjb29raWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWFjaCBjb29raWUgdG8gc2V0IG11c3QgYXQgbGVhc3QgcHJvdmlkZSBhIFwibmFtZVwiIGFuZCBcInZhbHVlXCInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBcXHJcXG4gc2VxdWVuY2VzIGluc2VydGVkXG4gICAgICAgICAgICBjb29raWUubmFtZSA9IGNvb2tpZS5uYW1lLnJlcGxhY2UoY29udHJvbENoYXJzQW5kU2VtaWNvbG9uUmVnRXgsICcnKTtcbiAgICAgICAgICAgIGNvb2tpZS52YWx1ZSA9IGNvb2tpZS52YWx1ZS5yZXBsYWNlKGNvbnRyb2xDaGFyc0FuZFNlbWljb2xvblJlZ0V4LCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChzZWVuQ29va2llc1tjb29raWUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3Qgc3BlY2lmeSB0aGUgc2FtZSBjb29raWUgbmFtZSB0d2ljZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW5Db29raWVzW2Nvb2tpZS5uYW1lXSA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIHRva2VuIChSRkMgMjYxNiwgU2VjdGlvbiAyLjIpXG4gICAgICAgICAgICB2YXIgaW52YWxpZENoYXIgPSBjb29raWUubmFtZS5tYXRjaChjb29raWVOYW1lVmFsaWRhdGVSZWdFeCk7XG4gICAgICAgICAgICBpZiAoaW52YWxpZENoYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjaGFyYWN0ZXIgJyArIGludmFsaWRDaGFyWzBdICsgJyBpbiBjb29raWUgbmFtZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSRkMgNjI2NSwgU2VjdGlvbiA0LjEuMVxuICAgICAgICAgICAgLy8gKmNvb2tpZS1vY3RldCAvICggRFFVT1RFICpjb29raWUtb2N0ZXQgRFFVT1RFICkgfCAleDIxIC8gJXgyMy0yQiAvICV4MkQtM0EgLyAleDNDLTVCIC8gJXg1RC03RVxuICAgICAgICAgICAgaWYgKGNvb2tpZS52YWx1ZS5tYXRjaChjb29raWVWYWx1ZURRdW90ZVZhbGlkYXRlUmVnRXgpKSB7XG4gICAgICAgICAgICAgICAgaW52YWxpZENoYXIgPSBjb29raWUudmFsdWUuc2xpY2UoMSwgLTEpLm1hdGNoKGNvb2tpZVZhbHVlVmFsaWRhdGVSZWdFeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGludmFsaWRDaGFyID0gY29va2llLnZhbHVlLm1hdGNoKGNvb2tpZVZhbHVlVmFsaWRhdGVSZWdFeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW52YWxpZENoYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjaGFyYWN0ZXIgJyArIGludmFsaWRDaGFyWzBdICsgJyBpbiBjb29raWUgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvb2tpZVBhcnRzID0gW2Nvb2tpZS5uYW1lICsgJz0nICsgY29va2llLnZhbHVlXTtcblxuICAgICAgICAgICAgLy8gUkZDIDYyNjUsIFNlY3Rpb24gNC4xLjFcbiAgICAgICAgICAgIC8vICdQYXRoPScgcGF0aC12YWx1ZSB8IDxhbnkgQ0hBUiBleGNlcHQgQ1RMcyBvciAnOyc+XG4gICAgICAgICAgICBpZihjb29raWUucGF0aCl7XG4gICAgICAgICAgICAgICAgaW52YWxpZENoYXIgPSBjb29raWUucGF0aC5tYXRjaChjb250cm9sQ2hhcnNBbmRTZW1pY29sb25SZWdFeCk7XG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRDaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjaGFyYWN0ZXIgJyArIGludmFsaWRDaGFyWzBdICsgJyBpbiBjb29raWUgcGF0aCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb29raWVQYXJ0cy5wdXNoKCdQYXRoPScgKyBjb29raWUucGF0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4yLjNcbiAgICAgICAgICAgIC8vICdEb21haW49JyBzdWJkb21haW5cbiAgICAgICAgICAgIGlmIChjb29raWUuZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihjb29raWUuZG9tYWluKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWplY3QoNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEb21haW4gbXVzdCBiZSBzcGVjaWZpZWQgYW5kIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGludmFsaWRDaGFyID0gY29va2llLmRvbWFpbi5tYXRjaChjb250cm9sQ2hhcnNBbmRTZW1pY29sb25SZWdFeCk7XG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRDaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjaGFyYWN0ZXIgJyArIGludmFsaWRDaGFyWzBdICsgJyBpbiBjb29raWUgZG9tYWluJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvb2tpZVBhcnRzLnB1c2goJ0RvbWFpbj0nICsgY29va2llLmRvbWFpbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUkZDIDYyNjUsIFNlY3Rpb24gNC4xLjFcbiAgICAgICAgICAgIC8vJ0V4cGlyZXM9JyBzYW5lLWNvb2tpZS1kYXRlIHwgRm9yY2UgRGF0ZSBvYmplY3QgcmVxdWlyZW1lbnQgYnkgdXNpbmcgb25seSBlcG9jaFxuICAgICAgICAgICAgaWYgKGNvb2tpZS5leHBpcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoY29va2llLmV4cGlyZXMgaW5zdGFuY2VvZiBEYXRlKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0KDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgc3VwcGxpZWQgZm9yIGNvb2tpZSBcImV4cGlyZXNcIiBtdXN0IGJlIGEgdmFpbGQgZGF0ZSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29va2llUGFydHMucHVzaCgnRXhwaXJlcz0nICsgY29va2llLmV4cGlyZXMudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJGQyA2MjY1LCBTZWN0aW9uIDQuMS4xXG4gICAgICAgICAgICAvLydNYXgtQWdlPScgbm9uLXplcm8tZGlnaXQgKkRJR0lUXG4gICAgICAgICAgICBpZiAoY29va2llLm1heGFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXhhZ2UgPSBjb29raWUubWF4YWdlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobWF4YWdlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4YWdlID0gcGFyc2VJbnQobWF4YWdlLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtYXhhZ2UpIHx8IG1heGFnZSA8PSAwICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciBjb29raWUgXCJtYXhhZ2VcIiBtdXN0IGJlIGEgbm9uLXplcm8gbnVtYmVyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1heGFnZSA9IE1hdGgucm91bmQobWF4YWdlKTtcbiAgICAgICAgICAgICAgICBjb29raWVQYXJ0cy5wdXNoKCdNYXgtQWdlPScgKyBtYXhhZ2UudG9TdHJpbmcoMTApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUkZDIDYyNjUsIFNlY3Rpb24gNC4xLjFcbiAgICAgICAgICAgIC8vJ1NlY3VyZTsnXG4gICAgICAgICAgICBpZiAoY29va2llLnNlY3VyZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoY29va2llLnNlY3VyZSkgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciBjb29raWUgXCJzZWN1cmVcIiBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb29raWVQYXJ0cy5wdXNoKCdTZWN1cmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUkZDIDYyNjUsIFNlY3Rpb24gNC4xLjFcbiAgICAgICAgICAgIC8vJ0h0dHBPbmx5OydcbiAgICAgICAgICAgIGlmIChjb29raWUuaHR0cG9ubHkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGNvb2tpZS5odHRwb25seSkgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlamVjdCg1MDApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciBjb29raWUgXCJodHRwb25seVwiIG11c3QgYmUgb2YgdHlwZSBib29sZWFuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvb2tpZVBhcnRzLnB1c2goJ0h0dHBPbmx5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3BvbnNlICs9ICgnU2V0LUNvb2tpZTogJyArIGNvb2tpZVBhcnRzLmpvaW4oJzsnKSArICdcXHJcXG4nKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBoYW5kbGUgbmVnb3RpYXRlZCBleHRlbnNpb25zXG4gICAgLy8gaWYgKG5lZ290aWF0ZWRFeHRlbnNpb25zKSB7XG4gICAgLy8gICAgIHJlc3BvbnNlICs9ICdTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnM6ICcgKyBuZWdvdGlhdGVkRXh0ZW5zaW9ucy5qb2luKCcsICcpICsgJ1xcclxcbic7XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIE1hcmsgdGhlIHJlcXVlc3QgcmVzb2x2ZWQgbm93IHNvIHRoYXQgdGhlIHVzZXIgY2FuJ3QgY2FsbCBhY2NlcHQgb3JcbiAgICAvLyByZWplY3QgYSBzZWNvbmQgdGltZS5cbiAgICB0aGlzLl9yZXNvbHZlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KCdyZXF1ZXN0UmVzb2x2ZWQnLCB0aGlzKTtcbiAgICBcbiAgICByZXNwb25zZSArPSAnXFxyXFxuJztcblxuICAgIHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldENvbm5lY3Rpb24odGhpcy5zb2NrZXQsIFtdLCBhY2NlcHRlZFByb3RvY29sLCBmYWxzZSwgdGhpcy5zZXJ2ZXJDb25maWcpO1xuICAgIGNvbm5lY3Rpb24ud2ViU29ja2V0VmVyc2lvbiA9IHRoaXMud2ViU29ja2V0VmVyc2lvbjtcbiAgICBjb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MgPSB0aGlzLnJlbW90ZUFkZHJlc3M7XG4gICAgY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzZXMgPSB0aGlzLnJlbW90ZUFkZHJlc3NlcztcbiAgICBcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgXG4gICAgaWYgKHRoaXMuX3NvY2tldElzQ2xvc2luZykge1xuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRoZSBjbGllbnQgaGFuZ3MgdXAgYmVmb3JlIHdlIGdldCBhIGNoYW5jZSB0b1xuICAgICAgICAvLyBhY2NlcHQgdGhlIGNvbm5lY3Rpb24gYW5kIHNlbmQgb3VyIHNpZGUgb2YgdGhlIG9wZW5pbmcgaGFuZHNoYWtlLlxuICAgICAgICBjbGVhbnVwRmFpbGVkQ29ubmVjdGlvbihjb25uZWN0aW9uKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc29ja2V0LndyaXRlKHJlc3BvbnNlLCAnYXNjaWknLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cEZhaWxlZENvbm5lY3Rpb24oY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZWxmLl9yZW1vdmVTb2NrZXRDbG9zZUxpc3RlbmVycygpO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5fYWRkU29ja2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0KCdyZXF1ZXN0QWNjZXB0ZWQnLCBjb25uZWN0aW9uKTtcbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbn07XG5cbldlYlNvY2tldFJlcXVlc3QucHJvdG90eXBlLnJlamVjdCA9IGZ1bmN0aW9uKHN0YXR1cywgcmVhc29uLCBleHRyYUhlYWRlcnMpIHtcbiAgICB0aGlzLl92ZXJpZnlSZXNvbHV0aW9uKCk7XG4gICAgXG4gICAgLy8gTWFyayB0aGUgcmVxdWVzdCByZXNvbHZlZCBub3cgc28gdGhhdCB0aGUgdXNlciBjYW4ndCBjYWxsIGFjY2VwdCBvclxuICAgIC8vIHJlamVjdCBhIHNlY29uZCB0aW1lLlxuICAgIHRoaXMuX3Jlc29sdmVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoJ3JlcXVlc3RSZXNvbHZlZCcsIHRoaXMpO1xuICAgIFxuICAgIGlmICh0eXBlb2Yoc3RhdHVzKSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgc3RhdHVzID0gNDAzO1xuICAgIH1cbiAgICB2YXIgcmVzcG9uc2UgPSAnSFRUUC8xLjEgJyArIHN0YXR1cyArICcgJyArIGh0dHBTdGF0dXNEZXNjcmlwdGlvbnNbc3RhdHVzXSArICdcXHJcXG4nICtcbiAgICAgICAgICAgICAgICAgICAnQ29ubmVjdGlvbjogY2xvc2VcXHJcXG4nO1xuICAgIGlmIChyZWFzb24pIHtcbiAgICAgICAgcmVhc29uID0gcmVhc29uLnJlcGxhY2UoaGVhZGVyU2FuaXRpemVSZWdFeHAsICcnKTtcbiAgICAgICAgcmVzcG9uc2UgKz0gJ1gtV2ViU29ja2V0LVJlamVjdC1SZWFzb246ICcgKyByZWFzb24gKyAnXFxyXFxuJztcbiAgICB9XG5cbiAgICBpZiAoZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBleHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgIHZhciBzYW5pdGl6ZWRWYWx1ZSA9IGV4dHJhSGVhZGVyc1trZXldLnRvU3RyaW5nKCkucmVwbGFjZShoZWFkZXJTYW5pdGl6ZVJlZ0V4cCwgJycpO1xuICAgICAgICAgICAgdmFyIHNhbml0aXplZEtleSA9IGtleS5yZXBsYWNlKGhlYWRlclNhbml0aXplUmVnRXhwLCAnJyk7XG4gICAgICAgICAgICByZXNwb25zZSArPSAoc2FuaXRpemVkS2V5ICsgJzogJyArIHNhbml0aXplZFZhbHVlICsgJ1xcclxcbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcG9uc2UgKz0gJ1xcclxcbic7XG4gICAgdGhpcy5zb2NrZXQuZW5kKHJlc3BvbnNlLCAnYXNjaWknKTtcblxuICAgIHRoaXMuZW1pdCgncmVxdWVzdFJlamVjdGVkJywgdGhpcyk7XG59O1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5faGFuZGxlU29ja2V0Q2xvc2VCZWZvcmVBY2NlcHQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zb2NrZXRJc0Nsb3NpbmcgPSB0cnVlO1xuICAgIHRoaXMuX3JlbW92ZVNvY2tldENsb3NlTGlzdGVuZXJzKCk7XG59O1xuXG5XZWJTb2NrZXRSZXF1ZXN0LnByb3RvdHlwZS5fcmVtb3ZlU29ja2V0Q2xvc2VMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcignZW5kJywgdGhpcy5fc29ja2V0Q2xvc2VIYW5kbGVyKTtcbiAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCB0aGlzLl9zb2NrZXRDbG9zZUhhbmRsZXIpO1xufTtcblxuV2ViU29ja2V0UmVxdWVzdC5wcm90b3R5cGUuX3ZlcmlmeVJlc29sdXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcmVzb2x2ZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXRSZXF1ZXN0IG1heSBvbmx5IGJlIGFjY2VwdGVkIG9yIHJlamVjdGVkIG9uZSB0aW1lLicpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNsZWFudXBGYWlsZWRDb25uZWN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgICAvLyBTaW5jZSB3ZSBoYXZlIHRvIHJldHVybiBhIGNvbm5lY3Rpb24gb2JqZWN0IGV2ZW4gaWYgdGhlIHNvY2tldCBpc1xuICAgIC8vIGFscmVhZHkgZGVhZCBpbiBvcmRlciBub3QgdG8gYnJlYWsgdGhlIEFQSSwgd2Ugc2NoZWR1bGUgYSAnY2xvc2UnXG4gICAgLy8gZXZlbnQgb24gdGhlIGNvbm5lY3Rpb24gb2JqZWN0IHRvIG9jY3VyIGltbWVkaWF0ZWx5LlxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdlYlNvY2tldENvbm5lY3Rpb24uQ0xPU0VfUkVBU09OX0FCTk9STUFMID0gMTAwNlxuICAgICAgICAvLyBUaGlyZCBwYXJhbTogU2tpcCBzZW5kaW5nIHRoZSBjbG9zZSBmcmFtZSB0byBhIGRlYWQgc29ja2V0XG4gICAgICAgIGNvbm5lY3Rpb24uZHJvcCgxMDA2LCAnVENQIGNvbm5lY3Rpb24gbG9zdCBiZWZvcmUgaGFuZHNoYWtlIGNvbXBsZXRlZC4nLCB0cnVlKTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRSZXF1ZXN0O1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogIENvcHlyaWdodCAyMDEwLTIwMTUgQnJpYW4gTWNLZWx2ZXkuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscycpLmV4dGVuZDtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBXZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0ID0gcmVxdWlyZSgnLi9XZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0Jyk7XG5cbmZ1bmN0aW9uIFdlYlNvY2tldFJvdXRlcihjb25maWcpIHtcbiAgICAvLyBTdXBlcmNsYXNzIENvbnN0cnVjdG9yXG4gICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgLy8gVGhlIFdlYlNvY2tldFNlcnZlciBpbnN0YW5jZSB0byBhdHRhY2ggdG8uXG4gICAgICAgIHNlcnZlcjogbnVsbFxuICAgIH07XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgICBleHRlbmQodGhpcy5jb25maWcsIGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX3JlcXVlc3RIYW5kbGVyID0gdGhpcy5oYW5kbGVSZXF1ZXN0LmJpbmQodGhpcyk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnNlcnZlcikge1xuICAgICAgICB0aGlzLmF0dGFjaFNlcnZlcih0aGlzLmNvbmZpZy5zZXJ2ZXIpO1xuICAgIH1cbn1cblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRSb3V0ZXIsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFJvdXRlci5wcm90b3R5cGUuYXR0YWNoU2VydmVyID0gZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oJ3JlcXVlc3QnLCB0aGlzLl9yZXF1ZXN0SGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYSBXZWJTb2NrZXRTZXJ2ZXIgaW5zdGFuY2UgdG8gYXR0YWNoIHRvLicpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldFJvdXRlci5wcm90b3R5cGUuZGV0YWNoU2VydmVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICAgIHRoaXMuc2VydmVyLnJlbW92ZUxpc3RlbmVyKCdyZXF1ZXN0JywgdGhpcy5fcmVxdWVzdEhhbmRsZXIpO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkZXRhY2ggZnJvbSBzZXJ2ZXI6IG5vdCBhdHRhY2hlZC4nKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24ocGF0aCwgcHJvdG9jb2wsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhIHBhdGggZm9yIHRoaXMgaGFuZGxlci4nKTtcbiAgICB9XG4gICAgaWYgKCFwcm90b2NvbCkge1xuICAgICAgICBwcm90b2NvbCA9ICdfX19fbm9fcHJvdG9jb2xfX19fJztcbiAgICB9XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYSBjYWxsYmFjayBmb3IgdGhpcyBoYW5kbGVyLicpO1xuICAgIH1cblxuICAgIHBhdGggPSB0aGlzLnBhdGhUb1JlZ0V4cChwYXRoKTtcbiAgICBpZiAoIShwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggbXVzdCBiZSBzcGVjaWZpZWQgYXMgZWl0aGVyIGEgc3RyaW5nIG9yIGEgUmVnRXhwLicpO1xuICAgIH1cbiAgICB2YXIgcGF0aFN0cmluZyA9IHBhdGgudG9TdHJpbmcoKTtcblxuICAgIC8vIG5vcm1hbGl6ZSBwcm90b2NvbCB0byBsb3dlci1jYXNlXG4gICAgcHJvdG9jb2wgPSBwcm90b2NvbC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHRoaXMuZmluZEhhbmRsZXJJbmRleChwYXRoU3RyaW5nLCBwcm90b2NvbCkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBvbmx5IG1vdW50IG9uZSBoYW5kbGVyIHBlciBwYXRoL3Byb3RvY29sIGNvbWJpbmF0aW9uLicpO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgICAgICdwYXRoJzogcGF0aCxcbiAgICAgICAgJ3BhdGhTdHJpbmcnOiBwYXRoU3RyaW5nLFxuICAgICAgICAncHJvdG9jb2wnOiBwcm90b2NvbCxcbiAgICAgICAgJ2NhbGxiYWNrJzogY2FsbGJhY2tcbiAgICB9KTtcbn07XG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLnVubW91bnQgPSBmdW5jdGlvbihwYXRoLCBwcm90b2NvbCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuZmluZEhhbmRsZXJJbmRleCh0aGlzLnBhdGhUb1JlZ0V4cChwYXRoKS50b1N0cmluZygpLCBwcm90b2NvbCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmhhbmRsZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGEgcm91dGUgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBwYXRoIGFuZCBwcm90b2NvbC4nKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRSb3V0ZXIucHJvdG90eXBlLmZpbmRIYW5kbGVySW5kZXggPSBmdW5jdGlvbihwYXRoU3RyaW5nLCBwcm90b2NvbCkge1xuICAgIHByb3RvY29sID0gcHJvdG9jb2wudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBmb3IgKHZhciBpPTAsIGxlbj10aGlzLmhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1tpXTtcbiAgICAgICAgaWYgKGhhbmRsZXIucGF0aFN0cmluZyA9PT0gcGF0aFN0cmluZyAmJiBoYW5kbGVyLnByb3RvY29sID09PSBwcm90b2NvbCkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuV2ViU29ja2V0Um91dGVyLnByb3RvdHlwZS5wYXRoVG9SZWdFeHAgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYgKHR5cGVvZihwYXRoKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHBhdGggPT09ICcqJykge1xuICAgICAgICAgICAgcGF0aCA9IC9eLiokLztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gICAgICAgICAgICBwYXRoID0gbmV3IFJlZ0V4cCgnXicgKyBwYXRoICsgJyQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn07XG5cbldlYlNvY2tldFJvdXRlci5wcm90b3R5cGUuaGFuZGxlUmVxdWVzdCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICB2YXIgcmVxdWVzdGVkUHJvdG9jb2xzID0gcmVxdWVzdC5yZXF1ZXN0ZWRQcm90b2NvbHM7XG4gICAgaWYgKHJlcXVlc3RlZFByb3RvY29scy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVxdWVzdGVkUHJvdG9jb2xzID0gWydfX19fbm9fcHJvdG9jb2xfX19fJ107XG4gICAgfVxuXG4gICAgLy8gRmluZCBhIGhhbmRsZXIgd2l0aCB0aGUgZmlyc3QgcmVxdWVzdGVkIHByb3RvY29sIGZpcnN0XG4gICAgZm9yICh2YXIgaT0wOyBpIDwgcmVxdWVzdGVkUHJvdG9jb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ZWRQcm90b2NvbCA9IHJlcXVlc3RlZFByb3RvY29sc1tpXS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGhhbmRsZXIgdGhhdCBjYW4gcHJvY2VzcyB0aGlzIHJlcXVlc3RcbiAgICAgICAgZm9yICh2YXIgaj0wLCBsZW49dGhpcy5oYW5kbGVycy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2pdO1xuICAgICAgICAgICAgaWYgKGhhbmRsZXIucGF0aC50ZXN0KHJlcXVlc3QucmVzb3VyY2VVUkwucGF0aG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RlZFByb3RvY29sID09PSBoYW5kbGVyLnByb3RvY29sIHx8XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIucHJvdG9jb2wgPT09ICcqJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3V0ZXJSZXF1ZXN0ID0gbmV3IFdlYlNvY2tldFJvdXRlclJlcXVlc3QocmVxdWVzdCwgcmVxdWVzdGVkUHJvdG9jb2wpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGxiYWNrKHJvdXRlclJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgZ2V0IGhlcmUgd2Ugd2VyZSB1bmFibGUgdG8gZmluZCBhIHN1aXRhYmxlIGhhbmRsZXIuXG4gICAgcmVxdWVzdC5yZWplY3QoNDA0LCAnTm8gaGFuZGxlciBpcyBhdmFpbGFibGUgZm9yIHRoZSBnaXZlbiByZXF1ZXN0LicpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRSb3V0ZXI7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiAgQ29weXJpZ2h0IDIwMTAtMjAxNSBCcmlhbiBNY0tlbHZleS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZnVuY3Rpb24gV2ViU29ja2V0Um91dGVyUmVxdWVzdCh3ZWJTb2NrZXRSZXF1ZXN0LCByZXNvbHZlZFByb3RvY29sKSB7XG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy53ZWJTb2NrZXRSZXF1ZXN0ID0gd2ViU29ja2V0UmVxdWVzdDtcbiAgICBpZiAocmVzb2x2ZWRQcm90b2NvbCA9PT0gJ19fX19ub19wcm90b2NvbF9fX18nKSB7XG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IHJlc29sdmVkUHJvdG9jb2w7XG4gICAgfVxuICAgIHRoaXMub3JpZ2luID0gd2ViU29ja2V0UmVxdWVzdC5vcmlnaW47XG4gICAgdGhpcy5yZXNvdXJjZSA9IHdlYlNvY2tldFJlcXVlc3QucmVzb3VyY2U7XG4gICAgdGhpcy5yZXNvdXJjZVVSTCA9IHdlYlNvY2tldFJlcXVlc3QucmVzb3VyY2VVUkw7XG4gICAgdGhpcy5odHRwUmVxdWVzdCA9IHdlYlNvY2tldFJlcXVlc3QuaHR0cFJlcXVlc3Q7XG4gICAgdGhpcy5yZW1vdGVBZGRyZXNzID0gd2ViU29ja2V0UmVxdWVzdC5yZW1vdGVBZGRyZXNzO1xuICAgIHRoaXMud2ViU29ja2V0VmVyc2lvbiA9IHdlYlNvY2tldFJlcXVlc3Qud2ViU29ja2V0VmVyc2lvbjtcbiAgICB0aGlzLnJlcXVlc3RlZEV4dGVuc2lvbnMgPSB3ZWJTb2NrZXRSZXF1ZXN0LnJlcXVlc3RlZEV4dGVuc2lvbnM7XG4gICAgdGhpcy5jb29raWVzID0gd2ViU29ja2V0UmVxdWVzdC5jb29raWVzO1xufVxuXG51dGlsLmluaGVyaXRzKFdlYlNvY2tldFJvdXRlclJlcXVlc3QsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFJvdXRlclJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKG9yaWdpbiwgY29va2llcykge1xuICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy53ZWJTb2NrZXRSZXF1ZXN0LmFjY2VwdCh0aGlzLnByb3RvY29sLCBvcmlnaW4sIGNvb2tpZXMpO1xuICAgIHRoaXMuZW1pdCgncmVxdWVzdEFjY2VwdGVkJywgY29ubmVjdGlvbik7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG59O1xuXG5XZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0LnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbihzdGF0dXMsIHJlYXNvbiwgZXh0cmFIZWFkZXJzKSB7XG4gICAgdGhpcy53ZWJTb2NrZXRSZXF1ZXN0LnJlamVjdChzdGF0dXMsIHJlYXNvbiwgZXh0cmFIZWFkZXJzKTtcbiAgICB0aGlzLmVtaXQoJ3JlcXVlc3RSZWplY3RlZCcsIHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRSb3V0ZXJSZXF1ZXN0O1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogIENvcHlyaWdodCAyMDEwLTIwMTUgQnJpYW4gTWNLZWx2ZXkuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscycpLmV4dGVuZDtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnd2Vic29ja2V0OnNlcnZlcicpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBXZWJTb2NrZXRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9XZWJTb2NrZXRSZXF1ZXN0Jyk7XG5cbnZhciBXZWJTb2NrZXRTZXJ2ZXIgPSBmdW5jdGlvbiBXZWJTb2NrZXRTZXJ2ZXIoY29uZmlnKSB7XG4gICAgLy8gU3VwZXJjbGFzcyBDb25zdHJ1Y3RvclxuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5faGFuZGxlcnMgPSB7XG4gICAgICAgIHVwZ3JhZGU6IHRoaXMuaGFuZGxlVXBncmFkZS5iaW5kKHRoaXMpLFxuICAgICAgICByZXF1ZXN0QWNjZXB0ZWQ6IHRoaXMuaGFuZGxlUmVxdWVzdEFjY2VwdGVkLmJpbmQodGhpcyksXG4gICAgICAgIHJlcXVlc3RSZXNvbHZlZDogdGhpcy5oYW5kbGVSZXF1ZXN0UmVzb2x2ZWQuYmluZCh0aGlzKVxuICAgIH07XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzID0gW107XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgICB0aGlzLm1vdW50KGNvbmZpZyk7XG4gICAgfVxufTtcblxudXRpbC5pbmhlcml0cyhXZWJTb2NrZXRTZXJ2ZXIsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgLy8gVGhlIGh0dHAgc2VydmVyIGluc3RhbmNlIHRvIGF0dGFjaCB0by4gIFJlcXVpcmVkLlxuICAgICAgICBodHRwU2VydmVyOiBudWxsLFxuXG4gICAgICAgIC8vIDY0S2lCIG1heCBmcmFtZSBzaXplLlxuICAgICAgICBtYXhSZWNlaXZlZEZyYW1lU2l6ZTogMHgxMDAwMCxcblxuICAgICAgICAvLyAxTWlCIG1heCBtZXNzYWdlIHNpemUsIG9ubHkgYXBwbGljYWJsZSBpZlxuICAgICAgICAvLyBhc3NlbWJsZUZyYWdtZW50cyBpcyB0cnVlXG4gICAgICAgIG1heFJlY2VpdmVkTWVzc2FnZVNpemU6IDB4MTAwMDAwLFxuXG4gICAgICAgIC8vIE91dGdvaW5nIG1lc3NhZ2VzIGxhcmdlciB0aGFuIGZyYWdtZW50YXRpb25UaHJlc2hvbGQgd2lsbCBiZVxuICAgICAgICAvLyBzcGxpdCBpbnRvIG11bHRpcGxlIGZyYWdtZW50cy5cbiAgICAgICAgZnJhZ21lbnRPdXRnb2luZ01lc3NhZ2VzOiB0cnVlLFxuXG4gICAgICAgIC8vIE91dGdvaW5nIGZyYW1lcyBhcmUgZnJhZ21lbnRlZCBpZiB0aGV5IGV4Y2VlZCB0aGlzIHRocmVzaG9sZC5cbiAgICAgICAgLy8gRGVmYXVsdCBpcyAxNktpQlxuICAgICAgICBmcmFnbWVudGF0aW9uVGhyZXNob2xkOiAweDQwMDAsXG5cbiAgICAgICAgLy8gSWYgdHJ1ZSwgdGhlIHNlcnZlciB3aWxsIGF1dG9tYXRpY2FsbHkgc2VuZCBhIHBpbmcgdG8gYWxsXG4gICAgICAgIC8vIGNsaWVudHMgZXZlcnkgJ2tlZXBhbGl2ZUludGVydmFsJyBtaWxsaXNlY29uZHMuICBUaGUgdGltZXIgaXNcbiAgICAgICAgLy8gcmVzZXQgb24gYW55IHJlY2VpdmVkIGRhdGEgZnJvbSB0aGUgY2xpZW50LlxuICAgICAgICBrZWVwYWxpdmU6IHRydWUsXG5cbiAgICAgICAgLy8gVGhlIGludGVydmFsIHRvIHNlbmQga2VlcGFsaXZlIHBpbmdzIHRvIGNvbm5lY3RlZCBjbGllbnRzIGlmIHRoZVxuICAgICAgICAvLyBjb25uZWN0aW9uIGlzIGlkbGUuICBBbnkgcmVjZWl2ZWQgZGF0YSB3aWxsIHJlc2V0IHRoZSBjb3VudGVyLlxuICAgICAgICBrZWVwYWxpdmVJbnRlcnZhbDogMjAwMDAsXG5cbiAgICAgICAgLy8gSWYgdHJ1ZSwgdGhlIHNlcnZlciB3aWxsIGNvbnNpZGVyIGFueSBjb25uZWN0aW9uIHRoYXQgaGFzIG5vdFxuICAgICAgICAvLyByZWNlaXZlZCBhbnkgZGF0YSB3aXRoaW4gdGhlIGFtb3VudCBvZiB0aW1lIHNwZWNpZmllZCBieVxuICAgICAgICAvLyAna2VlcGFsaXZlR3JhY2VQZXJpb2QnIGFmdGVyIGEga2VlcGFsaXZlIHBpbmcgaGFzIGJlZW4gc2VudCB0b1xuICAgICAgICAvLyBiZSBkZWFkLCBhbmQgd2lsbCBkcm9wIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICAvLyBJZ25vcmVkIGlmIGtlZXBhbGl2ZSBpcyBmYWxzZS5cbiAgICAgICAgZHJvcENvbm5lY3Rpb25PbktlZXBhbGl2ZVRpbWVvdXQ6IHRydWUsXG5cbiAgICAgICAgLy8gVGhlIGFtb3VudCBvZiB0aW1lIHRvIHdhaXQgYWZ0ZXIgc2VuZGluZyBhIGtlZXBhbGl2ZSBwaW5nIGJlZm9yZVxuICAgICAgICAvLyBjbG9zaW5nIHRoZSBjb25uZWN0aW9uIGlmIHRoZSBjb25uZWN0ZWQgcGVlciBkb2VzIG5vdCByZXNwb25kLlxuICAgICAgICAvLyBJZ25vcmVkIGlmIGtlZXBhbGl2ZSBpcyBmYWxzZS5cbiAgICAgICAga2VlcGFsaXZlR3JhY2VQZXJpb2Q6IDEwMDAwLFxuXG4gICAgICAgIC8vIFdoZXRoZXIgdG8gdXNlIG5hdGl2ZSBUQ1Aga2VlcC1hbGl2ZSBpbnN0ZWFkIG9mIFdlYlNvY2tldHMgcGluZ1xuICAgICAgICAvLyBhbmQgcG9uZyBwYWNrZXRzLiAgTmF0aXZlIFRDUCBrZWVwLWFsaXZlIHNlbmRzIHNtYWxsZXIgcGFja2V0c1xuICAgICAgICAvLyBvbiB0aGUgd2lyZSBhbmQgc28gdXNlcyBiYW5kd2lkdGggbW9yZSBlZmZpY2llbnRseS4gIFRoaXMgbWF5XG4gICAgICAgIC8vIGJlIG1vcmUgaW1wb3J0YW50IHdoZW4gdGFsa2luZyB0byBtb2JpbGUgZGV2aWNlcy5cbiAgICAgICAgLy8gSWYgdGhpcyB2YWx1ZSBpcyBzZXQgdG8gdHJ1ZSwgdGhlbiB0aGVzZSB2YWx1ZXMgd2lsbCBiZSBpZ25vcmVkOlxuICAgICAgICAvLyAgIGtlZXBhbGl2ZUdyYWNlUGVyaW9kXG4gICAgICAgIC8vICAgZHJvcENvbm5lY3Rpb25PbktlZXBhbGl2ZVRpbWVvdXRcbiAgICAgICAgdXNlTmF0aXZlS2VlcGFsaXZlOiBmYWxzZSxcblxuICAgICAgICAvLyBJZiB0cnVlLCBmcmFnbWVudGVkIG1lc3NhZ2VzIHdpbGwgYmUgYXV0b21hdGljYWxseSBhc3NlbWJsZWRcbiAgICAgICAgLy8gYW5kIHRoZSBmdWxsIG1lc3NhZ2Ugd2lsbCBiZSBlbWl0dGVkIHZpYSBhICdtZXNzYWdlJyBldmVudC5cbiAgICAgICAgLy8gSWYgZmFsc2UsIGVhY2ggZnJhbWUgd2lsbCBiZSBlbWl0dGVkIHZpYSBhICdmcmFtZScgZXZlbnQgYW5kXG4gICAgICAgIC8vIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGJlIHJlc3BvbnNpYmxlIGZvciBhZ2dyZWdhdGluZyBtdWx0aXBsZVxuICAgICAgICAvLyBmcmFnbWVudGVkIGZyYW1lcy4gIFNpbmdsZS1mcmFtZSBtZXNzYWdlcyB3aWxsIGVtaXQgYSAnbWVzc2FnZSdcbiAgICAgICAgLy8gZXZlbnQgaW4gYWRkaXRpb24gdG8gdGhlICdmcmFtZScgZXZlbnQuXG4gICAgICAgIC8vIE1vc3QgdXNlcnMgd2lsbCB3YW50IHRvIGxlYXZlIHRoaXMgc2V0IHRvICd0cnVlJ1xuICAgICAgICBhc3NlbWJsZUZyYWdtZW50czogdHJ1ZSxcblxuICAgICAgICAvLyBJZiB0aGlzIGlzIHRydWUsIHdlYnNvY2tldCBjb25uZWN0aW9ucyB3aWxsIGJlIGFjY2VwdGVkXG4gICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2YgdGhlIHBhdGggYW5kIHByb3RvY29sIHNwZWNpZmllZCBieSB0aGUgY2xpZW50LlxuICAgICAgICAvLyBUaGUgcHJvdG9jb2wgYWNjZXB0ZWQgd2lsbCBiZSB0aGUgZmlyc3QgdGhhdCB3YXMgcmVxdWVzdGVkXG4gICAgICAgIC8vIGJ5IHRoZSBjbGllbnQuICBDbGllbnRzIGZyb20gYW55IG9yaWdpbiB3aWxsIGJlIGFjY2VwdGVkLlxuICAgICAgICAvLyBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gdGhlIHNpbXBsZXN0IG9mIGNhc2VzLiAgWW91IHNob3VsZFxuICAgICAgICAvLyBwcm9iYWJseSBsZWF2ZSB0aGlzIHNldCB0byAnZmFsc2UnIGFuZCBpbnNwZWN0IHRoZSByZXF1ZXN0XG4gICAgICAgIC8vIG9iamVjdCB0byBtYWtlIHN1cmUgaXQncyBhY2NlcHRhYmxlIGJlZm9yZSBhY2NlcHRpbmcgaXQuXG4gICAgICAgIGF1dG9BY2NlcHRDb25uZWN0aW9uczogZmFsc2UsXG5cbiAgICAgICAgLy8gV2hldGhlciBvciBub3QgdGhlIFgtRm9yd2FyZGVkLUZvciBoZWFkZXIgc2hvdWxkIGJlIHJlc3BlY3RlZC5cbiAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gc2V0IHRoaXMgdG8gJ3RydWUnIHdoZW4gYWNjZXB0aW5nIGNvbm5lY3Rpb25zXG4gICAgICAgIC8vIGZyb20gdW50cnVzdGVkIGNsaWVudHMsIGFzIGEgbWFsaWNpb3VzIGNsaWVudCBjb3VsZCBzcG9vZiBpdHNcbiAgICAgICAgLy8gSVAgYWRkcmVzcyBieSBzaW1wbHkgc2V0dGluZyB0aGlzIGhlYWRlci4gIEl0J3MgbWVhbnQgdG8gYmUgYWRkZWRcbiAgICAgICAgLy8gYnkgYSB0cnVzdGVkIHByb3h5IG9yIG90aGVyIGludGVybWVkaWFyeSB3aXRoaW4geW91ciBvd25cbiAgICAgICAgLy8gaW5mcmFzdHJ1Y3R1cmUuXG4gICAgICAgIC8vIFNlZTogIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvWC1Gb3J3YXJkZWQtRm9yXG4gICAgICAgIGlnbm9yZVhGb3J3YXJkZWRGb3I6IGZhbHNlLFxuXG4gICAgICAgIC8vIFRoZSBOYWdsZSBBbGdvcml0aG0gbWFrZXMgbW9yZSBlZmZpY2llbnQgdXNlIG9mIG5ldHdvcmsgcmVzb3VyY2VzXG4gICAgICAgIC8vIGJ5IGludHJvZHVjaW5nIGEgc21hbGwgZGVsYXkgYmVmb3JlIHNlbmRpbmcgc21hbGwgcGFja2V0cyBzbyB0aGF0XG4gICAgICAgIC8vIG11bHRpcGxlIG1lc3NhZ2VzIGNhbiBiZSBiYXRjaGVkIHRvZ2V0aGVyIGJlZm9yZSBnb2luZyBvbnRvIHRoZVxuICAgICAgICAvLyB3aXJlLiAgVGhpcyBob3dldmVyIGNvbWVzIGF0IHRoZSBjb3N0IG9mIGxhdGVuY3ksIHNvIHRoZSBkZWZhdWx0XG4gICAgICAgIC8vIGlzIHRvIGRpc2FibGUgaXQuICBJZiB5b3UgZG9uJ3QgbmVlZCBsb3cgbGF0ZW5jeSBhbmQgYXJlIHN0cmVhbWluZ1xuICAgICAgICAvLyBsb3RzIG9mIHNtYWxsIG1lc3NhZ2VzLCB5b3UgY2FuIGNoYW5nZSB0aGlzIHRvICdmYWxzZSdcbiAgICAgICAgZGlzYWJsZU5hZ2xlQWxnb3JpdGhtOiB0cnVlLFxuXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYWZ0ZXIgc2VuZGluZyBhIGNsb3NlIGZyYW1lXG4gICAgICAgIC8vIGZvciBhbiBhY2tub3dsZWRnZW1lbnQgdG8gY29tZSBiYWNrIGJlZm9yZSBnaXZpbmcgdXAgYW5kIGp1c3RcbiAgICAgICAgLy8gY2xvc2luZyB0aGUgc29ja2V0LlxuICAgICAgICBjbG9zZVRpbWVvdXQ6IDUwMDBcbiAgICB9O1xuICAgIGV4dGVuZCh0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5odHRwU2VydmVyKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5odHRwU2VydmVyKSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuaHR0cFNlcnZlciA9IFt0aGlzLmNvbmZpZy5odHRwU2VydmVyXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXBncmFkZUhhbmRsZXIgPSB0aGlzLl9oYW5kbGVycy51cGdyYWRlO1xuICAgICAgICB0aGlzLmNvbmZpZy5odHRwU2VydmVyLmZvckVhY2goZnVuY3Rpb24oaHR0cFNlcnZlcikge1xuICAgICAgICAgICAgaHR0cFNlcnZlci5vbigndXBncmFkZScsIHVwZ3JhZGVIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYW4gaHR0cFNlcnZlciBvbiB3aGljaCB0byBtb3VudCB0aGUgV2ViU29ja2V0IHNlcnZlci4nKTtcbiAgICB9XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLnVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXBncmFkZUhhbmRsZXIgPSB0aGlzLl9oYW5kbGVycy51cGdyYWRlO1xuICAgIHRoaXMuY29uZmlnLmh0dHBTZXJ2ZXIuZm9yRWFjaChmdW5jdGlvbihodHRwU2VydmVyKSB7XG4gICAgICAgIGh0dHBTZXJ2ZXIucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLCB1cGdyYWRlSGFuZGxlcik7XG4gICAgfSk7XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmNsb3NlQWxsQ29ubmVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVxdWVzdC5yZWplY3QoNTAzKTsgLy8gSFRUUCA1MDMgU2VydmljZSBVbmF2YWlsYWJsZVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RCeXRlcyhkYXRhKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mKGRhdGEudG9TdHJpbmcpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0VVRGKGRhdGEpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuYnJvYWRjYXN0VVRGID0gZnVuY3Rpb24odXRmRGF0YSkge1xuICAgIHRoaXMuY29ubmVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gICAgICAgIGNvbm5lY3Rpb24uc2VuZFVURih1dGZEYXRhKTtcbiAgICB9KTtcbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuYnJvYWRjYXN0Qnl0ZXMgPSBmdW5jdGlvbihiaW5hcnlEYXRhKSB7XG4gICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgY29ubmVjdGlvbi5zZW5kQnl0ZXMoYmluYXJ5RGF0YSk7XG4gICAgfSk7XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLnNodXREb3duID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy51bm1vdW50KCk7XG4gICAgdGhpcy5jbG9zZUFsbENvbm5lY3Rpb25zKCk7XG59O1xuXG5XZWJTb2NrZXRTZXJ2ZXIucHJvdG90eXBlLmhhbmRsZVVwZ3JhZGUgPSBmdW5jdGlvbihyZXF1ZXN0LCBzb2NrZXQpIHtcbiAgICB2YXIgd3NSZXF1ZXN0ID0gbmV3IFdlYlNvY2tldFJlcXVlc3Qoc29ja2V0LCByZXF1ZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgdHJ5IHtcbiAgICAgICAgd3NSZXF1ZXN0LnJlYWRIYW5kc2hha2UoKTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICB3c1JlcXVlc3QucmVqZWN0KFxuICAgICAgICAgICAgZS5odHRwQ29kZSA/IGUuaHR0cENvZGUgOiA0MDAsXG4gICAgICAgICAgICBlLm1lc3NhZ2UsXG4gICAgICAgICAgICBlLmhlYWRlcnNcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWcoJ0ludmFsaWQgaGFuZHNoYWtlOiAlcycsIGUubWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMucHVzaCh3c1JlcXVlc3QpO1xuXG4gICAgd3NSZXF1ZXN0Lm9uY2UoJ3JlcXVlc3RBY2NlcHRlZCcsIHRoaXMuX2hhbmRsZXJzLnJlcXVlc3RBY2NlcHRlZCk7XG4gICAgd3NSZXF1ZXN0Lm9uY2UoJ3JlcXVlc3RSZXNvbHZlZCcsIHRoaXMuX2hhbmRsZXJzLnJlcXVlc3RSZXNvbHZlZCk7XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLmF1dG9BY2NlcHRDb25uZWN0aW9ucyAmJiB1dGlscy5ldmVudEVtaXR0ZXJMaXN0ZW5lckNvdW50KHRoaXMsICdyZXF1ZXN0JykgPiAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgncmVxdWVzdCcsIHdzUmVxdWVzdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLmF1dG9BY2NlcHRDb25uZWN0aW9ucykge1xuICAgICAgICB3c1JlcXVlc3QuYWNjZXB0KHdzUmVxdWVzdC5yZXF1ZXN0ZWRQcm90b2NvbHNbMF0sIHdzUmVxdWVzdC5vcmlnaW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3NSZXF1ZXN0LnJlamVjdCg0MDQsICdObyBoYW5kbGVyIGlzIGNvbmZpZ3VyZWQgdG8gYWNjZXB0IHRoZSBjb25uZWN0aW9uLicpO1xuICAgIH1cbn07XG5cbldlYlNvY2tldFNlcnZlci5wcm90b3R5cGUuaGFuZGxlUmVxdWVzdEFjY2VwdGVkID0gZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBjb25uZWN0aW9uLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24oY2xvc2VSZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHNlbGYuaGFuZGxlQ29ubmVjdGlvbkNsb3NlKGNvbm5lY3Rpb24sIGNsb3NlUmVhc29uLCBkZXNjcmlwdGlvbik7XG4gICAgfSk7XG4gICAgdGhpcy5jb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xuICAgIHRoaXMuZW1pdCgnY29ubmVjdCcsIGNvbm5lY3Rpb24pO1xufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS5oYW5kbGVDb25uZWN0aW9uQ2xvc2UgPSBmdW5jdGlvbihjb25uZWN0aW9uLCBjbG9zZVJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNvbm5lY3Rpb25zLmluZGV4T2YoY29ubmVjdGlvbik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCBjb25uZWN0aW9uLCBjbG9zZVJlYXNvbiwgZGVzY3JpcHRpb24pO1xufTtcblxuV2ViU29ja2V0U2VydmVyLnByb3RvdHlwZS5oYW5kbGVSZXF1ZXN0UmVzb2x2ZWQgPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5wZW5kaW5nUmVxdWVzdHMuaW5kZXhPZihyZXF1ZXN0KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7IHRoaXMucGVuZGluZ1JlcXVlc3RzLnNwbGljZShpbmRleCwgMSk7IH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0U2VydmVyO1xuIiwidmFyIG5vb3AgPSBleHBvcnRzLm5vb3AgPSBmdW5jdGlvbigpe307XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNvdXJjZSkge1xuICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgfVxufTtcblxuZXhwb3J0cy5ldmVudEVtaXR0ZXJMaXN0ZW5lckNvdW50ID1cbiAgICByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCB8fFxuICAgIGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHsgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJzKHR5cGUpLmxlbmd0aDsgfTtcblxuZXhwb3J0cy5idWZmZXJBbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSA/XG4gICAgQnVmZmVyLmFsbG9jVW5zYWZlIDpcbiAgICBmdW5jdGlvbiBvbGRCdWZmZXJBbGxvY1Vuc2FmZShzaXplKSB7IHJldHVybiBuZXcgQnVmZmVyKHNpemUpOyB9O1xuXG5leHBvcnRzLmJ1ZmZlckZyb21TdHJpbmcgPSBCdWZmZXIuZnJvbSA/XG4gICAgQnVmZmVyLmZyb20gOlxuICAgIGZ1bmN0aW9uIG9sZEJ1ZmZlckZyb21TdHJpbmcoc3RyaW5nLCBlbmNvZGluZykge1xuICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc3RyaW5nLCBlbmNvZGluZyk7XG4gICAgfTtcblxuZXhwb3J0cy5CdWZmZXJpbmdMb2dnZXIgPSBmdW5jdGlvbiBjcmVhdGVCdWZmZXJpbmdMb2dnZXIoaWRlbnRpZmllciwgdW5pcXVlSUQpIHtcbiAgICB2YXIgbG9nRnVuY3Rpb24gPSByZXF1aXJlKCdkZWJ1ZycpKGlkZW50aWZpZXIpO1xuICAgIGlmIChsb2dGdW5jdGlvbi5lbmFibGVkKSB7XG4gICAgICAgIHZhciBsb2dnZXIgPSBuZXcgQnVmZmVyaW5nTG9nZ2VyKGlkZW50aWZpZXIsIHVuaXF1ZUlELCBsb2dGdW5jdGlvbik7XG4gICAgICAgIHZhciBkZWJ1ZyA9IGxvZ2dlci5sb2cuYmluZChsb2dnZXIpO1xuICAgICAgICBkZWJ1Zy5wcmludE91dHB1dCA9IGxvZ2dlci5wcmludE91dHB1dC5iaW5kKGxvZ2dlcik7XG4gICAgICAgIGRlYnVnLmVuYWJsZWQgPSBsb2dGdW5jdGlvbi5lbmFibGVkO1xuICAgICAgICByZXR1cm4gZGVidWc7XG4gICAgfVxuICAgIGxvZ0Z1bmN0aW9uLnByaW50T3V0cHV0ID0gbm9vcDtcbiAgICByZXR1cm4gbG9nRnVuY3Rpb247XG59O1xuXG5mdW5jdGlvbiBCdWZmZXJpbmdMb2dnZXIoaWRlbnRpZmllciwgdW5pcXVlSUQsIGxvZ0Z1bmN0aW9uKSB7XG4gICAgdGhpcy5sb2dGdW5jdGlvbiA9IGxvZ0Z1bmN0aW9uO1xuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XG4gICAgdGhpcy51bmlxdWVJRCA9IHVuaXF1ZUlEO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG59XG5cbkJ1ZmZlcmluZ0xvZ2dlci5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYnVmZmVyLnB1c2goWyBuZXcgRGF0ZSgpLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIF0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkJ1ZmZlcmluZ0xvZ2dlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5idWZmZXIgPSBbXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CdWZmZXJpbmdMb2dnZXIucHJvdG90eXBlLnByaW50T3V0cHV0ID0gZnVuY3Rpb24obG9nRnVuY3Rpb24pIHtcbiAgICBpZiAoIWxvZ0Z1bmN0aW9uKSB7IGxvZ0Z1bmN0aW9uID0gdGhpcy5sb2dGdW5jdGlvbjsgfVxuICAgIHZhciB1bmlxdWVJRCA9IHRoaXMudW5pcXVlSUQ7XG4gICAgdGhpcy5idWZmZXIuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICB2YXIgZGF0ZSA9IGVudHJ5WzBdLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIHZhciBhcmdzID0gZW50cnlbMV0uc2xpY2UoKTtcbiAgICAgICAgdmFyIGZvcm1hdFN0cmluZyA9IGFyZ3NbMF07XG4gICAgICAgIGlmIChmb3JtYXRTdHJpbmcgIT09ICh2b2lkIDApICYmIGZvcm1hdFN0cmluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybWF0U3RyaW5nID0gJyVzIC0gJXMgLSAnICsgZm9ybWF0U3RyaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBhcmdzLnNwbGljZSgwLCAxLCBmb3JtYXRTdHJpbmcsIGRhdGUsIHVuaXF1ZUlEKTtcbiAgICAgICAgICAgIGxvZ0Z1bmN0aW9uLmFwcGx5KGdsb2JhbCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnc2VydmVyJyAgICAgICA6IHJlcXVpcmUoJy4vV2ViU29ja2V0U2VydmVyJyksXG4gICAgJ2NsaWVudCcgICAgICAgOiByZXF1aXJlKCcuL1dlYlNvY2tldENsaWVudCcpLFxuICAgICdyb3V0ZXInICAgICAgIDogcmVxdWlyZSgnLi9XZWJTb2NrZXRSb3V0ZXInKSxcbiAgICAnZnJhbWUnICAgICAgICA6IHJlcXVpcmUoJy4vV2ViU29ja2V0RnJhbWUnKSxcbiAgICAncmVxdWVzdCcgICAgICA6IHJlcXVpcmUoJy4vV2ViU29ja2V0UmVxdWVzdCcpLFxuICAgICdjb25uZWN0aW9uJyAgIDogcmVxdWlyZSgnLi9XZWJTb2NrZXRDb25uZWN0aW9uJyksXG4gICAgJ3czY3dlYnNvY2tldCcgOiByZXF1aXJlKCcuL1czQ1dlYlNvY2tldCcpLFxuICAgICdkZXByZWNhdGlvbicgIDogcmVxdWlyZSgnLi9EZXByZWNhdGlvbicpLFxuICAgICd2ZXJzaW9uJyAgICAgIDogcmVxdWlyZSgnLi92ZXJzaW9uJylcbn07XG4iLCIvLyBUaGlzIGZpbGUgd2FzIGNvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9ub2RlLWJ1ZmZlcmxpc3Rcbi8vIGFuZCBtb2RpZmllZCB0byBiZSBhYmxlIHRvIGNvcHkgYnl0ZXMgZnJvbSB0aGUgYnVmZmVybGlzdCBkaXJlY3RseSBpbnRvXG4vLyBhIHByZS1leGlzdGluZyBmaXhlZC1zaXplIGJ1ZmZlciB3aXRob3V0IGFuIGFkZGl0aW9uYWwgbWVtb3J5IGFsbG9jYXRpb24uXG5cbi8vIGJ1ZmZlcmxpc3QuanNcbi8vIFRyZWF0IGEgbGlua2VkIGxpc3Qgb2YgYnVmZmVycyBhcyBhIHNpbmdsZSB2YXJpYWJsZS1zaXplIGJ1ZmZlci5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGJ1ZmZlckFsbG9jVW5zYWZlID0gcmVxdWlyZSgnLi4vbGliL3V0aWxzJykuYnVmZmVyQWxsb2NVbnNhZmU7XG5cbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyTGlzdDtcbm1vZHVsZS5leHBvcnRzLkJ1ZmZlckxpc3QgPSBCdWZmZXJMaXN0OyAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG5mdW5jdGlvbiBCdWZmZXJMaXN0KG9wdHMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyTGlzdCkpIHJldHVybiBuZXcgQnVmZmVyTGlzdChvcHRzKTtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgXG4gICAgaWYgKHR5cGVvZihvcHRzKSA9PSAndW5kZWZpbmVkJykgb3B0cyA9IHt9O1xuICAgIFxuICAgIC8vIGRlZmF1bHQgZW5jb2RpbmcgdG8gdXNlIGZvciB0YWtlKCkuIExlYXZpbmcgYXMgJ3VuZGVmaW5lZCdcbiAgICAvLyBtYWtlcyB0YWtlKCkgcmV0dXJuIGEgQnVmZmVyIGluc3RlYWQuXG4gICAgc2VsZi5lbmNvZGluZyA9IG9wdHMuZW5jb2Rpbmc7XG4gICAgXG4gICAgdmFyIGhlYWQgPSB7IG5leHQgOiBudWxsLCBidWZmZXIgOiBudWxsIH07XG4gICAgdmFyIGxhc3QgPSB7IG5leHQgOiBudWxsLCBidWZmZXIgOiBudWxsIH07XG4gICAgXG4gICAgLy8gbGVuZ3RoIGNhbiBnZXQgbmVnYXRpdmUgd2hlbiBhZHZhbmNlZCBwYXN0IHRoZSBlbmRcbiAgICAvLyBhbmQgdGhpcyBpcyB0aGUgZGVzaXJlZCBiZWhhdmlvclxuICAgIHZhciBsZW5ndGggPSAwO1xuICAgIHNlbGYuX19kZWZpbmVHZXR0ZXJfXygnbGVuZ3RoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIGtlZXAgYW4gb2Zmc2V0IG9mIHRoZSBoZWFkIHRvIGRlY2lkZSB3aGVuIHRvIGhlYWQgPSBoZWFkLm5leHRcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICBcbiAgICAvLyBXcml0ZSB0byB0aGUgYnVmZmVybGlzdC4gRW1pdHMgJ3dyaXRlJy4gQWx3YXlzIHJldHVybnMgdHJ1ZS5cbiAgICBzZWxmLndyaXRlID0gZnVuY3Rpb24gKGJ1Zikge1xuICAgICAgICBpZiAoIWhlYWQuYnVmZmVyKSB7XG4gICAgICAgICAgICBoZWFkLmJ1ZmZlciA9IGJ1ZjtcbiAgICAgICAgICAgIGxhc3QgPSBoZWFkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGFzdC5uZXh0ID0geyBuZXh0IDogbnVsbCwgYnVmZmVyIDogYnVmIH07XG4gICAgICAgICAgICBsYXN0ID0gbGFzdC5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGxlbmd0aCArPSBidWYubGVuZ3RoO1xuICAgICAgICBzZWxmLmVtaXQoJ3dyaXRlJywgYnVmKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmVuZCA9IGZ1bmN0aW9uIChidWYpIHtcbiAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihidWYpKSBzZWxmLndyaXRlKGJ1Zik7XG4gICAgfTtcbiAgICBcbiAgICAvLyBQdXNoIGJ1ZmZlcnMgdG8gdGhlIGVuZCBvZiB0aGUgbGlua2VkIGxpc3QuIChkZXByZWNhdGVkKVxuICAgIC8vIFJldHVybiB0aGlzIChzZWxmKS5cbiAgICBzZWxmLnB1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uY29uY2F0LmFwcGx5KFtdLCBhcmd1bWVudHMpO1xuICAgICAgICBhcmdzLmZvckVhY2goc2VsZi53cml0ZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgXG4gICAgLy8gRm9yIGVhY2ggYnVmZmVyLCBwZXJmb3JtIHNvbWUgYWN0aW9uLlxuICAgIC8vIElmIGZuJ3MgcmVzdWx0IGlzIGEgdHJ1ZSB2YWx1ZSwgY3V0IG91dCBlYXJseS5cbiAgICAvLyBSZXR1cm5zIHRoaXMgKHNlbGYpLlxuICAgIHNlbGYuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBpZiAoIWhlYWQuYnVmZmVyKSByZXR1cm4gYnVmZmVyQWxsb2NVbnNhZmUoMCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoaGVhZC5idWZmZXIubGVuZ3RoIC0gb2Zmc2V0IDw9IDApIHJldHVybiBzZWxmO1xuICAgICAgICB2YXIgZmlyc3RCdWYgPSBoZWFkLmJ1ZmZlci5zbGljZShvZmZzZXQpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGIgPSB7IGJ1ZmZlciA6IGZpcnN0QnVmLCBuZXh0IDogaGVhZC5uZXh0IH07XG4gICAgICAgIFxuICAgICAgICB3aGlsZSAoYiAmJiBiLmJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIHIgPSBmbihiLmJ1ZmZlcik7XG4gICAgICAgICAgICBpZiAocikgYnJlYWs7XG4gICAgICAgICAgICBiID0gYi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIFxuICAgIC8vIENyZWF0ZSBhIHNpbmdsZSBCdWZmZXIgb3V0IG9mIGFsbCB0aGUgY2h1bmtzIG9yIHNvbWUgc3Vic2V0IHNwZWNpZmllZCBieVxuICAgIC8vIHN0YXJ0IGFuZCBvbmUtcGFzdCB0aGUgZW5kIChsaWtlIHNsaWNlKSBpbiBieXRlcy5cbiAgICBzZWxmLmpvaW4gPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoIWhlYWQuYnVmZmVyKSByZXR1cm4gYnVmZmVyQWxsb2NVbnNhZmUoMCk7XG4gICAgICAgIGlmIChzdGFydCA9PSB1bmRlZmluZWQpIHN0YXJ0ID0gMDtcbiAgICAgICAgaWYgKGVuZCA9PSB1bmRlZmluZWQpIGVuZCA9IHNlbGYubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgdmFyIGJpZyA9IGJ1ZmZlckFsbG9jVW5zYWZlKGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgdmFyIGl4ID0gMDtcbiAgICAgICAgc2VsZi5mb3JFYWNoKGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgICAgIGlmIChzdGFydCA8IChpeCArIGJ1ZmZlci5sZW5ndGgpICYmIGl4IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gYXQgbGVhc3QgcGFydGlhbGx5IGNvbnRhaW5lZCBpbiB0aGUgcmFuZ2VcbiAgICAgICAgICAgICAgICBidWZmZXIuY29weShcbiAgICAgICAgICAgICAgICAgICAgYmlnLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCgwLCBpeCAtIHN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMCwgc3RhcnQgLSBpeCksXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWluKGJ1ZmZlci5sZW5ndGgsIGVuZCAtIGl4KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpeCArPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGl4ID4gZW5kKSByZXR1cm4gdHJ1ZTsgLy8gc3RvcCBwcm9jZXNzaW5nIHBhc3QgZW5kXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJpZztcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuam9pbkludG8gPSBmdW5jdGlvbiAodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydCwgc291cmNlU3RhcnQsIHNvdXJjZUVuZCkge1xuICAgICAgICBpZiAoIWhlYWQuYnVmZmVyKSByZXR1cm4gbmV3IGJ1ZmZlckFsbG9jVW5zYWZlKDApO1xuICAgICAgICBpZiAoc291cmNlU3RhcnQgPT0gdW5kZWZpbmVkKSBzb3VyY2VTdGFydCA9IDA7XG4gICAgICAgIGlmIChzb3VyY2VFbmQgPT0gdW5kZWZpbmVkKSBzb3VyY2VFbmQgPSBzZWxmLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIHZhciBiaWcgPSB0YXJnZXRCdWZmZXI7XG4gICAgICAgIGlmIChiaWcubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBzb3VyY2VFbmQgLSBzb3VyY2VTdGFydCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5zdWZmaWNpZW50IHNwYWNlIGF2YWlsYWJsZSBpbiB0YXJnZXQgQnVmZmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXggPSAwO1xuICAgICAgICBzZWxmLmZvckVhY2goZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgaWYgKHNvdXJjZVN0YXJ0IDwgKGl4ICsgYnVmZmVyLmxlbmd0aCkgJiYgaXggPCBzb3VyY2VFbmQpIHtcbiAgICAgICAgICAgICAgICAvLyBhdCBsZWFzdCBwYXJ0aWFsbHkgY29udGFpbmVkIGluIHRoZSByYW5nZVxuICAgICAgICAgICAgICAgIGJ1ZmZlci5jb3B5KFxuICAgICAgICAgICAgICAgICAgICBiaWcsXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KHRhcmdldFN0YXJ0LCB0YXJnZXRTdGFydCArIGl4IC0gc291cmNlU3RhcnQpLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCgwLCBzb3VyY2VTdGFydCAtIGl4KSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oYnVmZmVyLmxlbmd0aCwgc291cmNlRW5kIC0gaXgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl4ICs9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoaXggPiBzb3VyY2VFbmQpIHJldHVybiB0cnVlOyAvLyBzdG9wIHByb2Nlc3NpbmcgcGFzdCBlbmRcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmlnO1xuICAgIH07XG4gICAgXG4gICAgLy8gQWR2YW5jZSB0aGUgYnVmZmVyIHN0cmVhbSBieSBuIGJ5dGVzLlxuICAgIC8vIElmIG4gdGhlIGFnZ3JlZ2F0ZSBhZHZhbmNlIG9mZnNldCBwYXNzZXMgdGhlIGVuZCBvZiB0aGUgYnVmZmVyIGxpc3QsXG4gICAgLy8gb3BlcmF0aW9ucyBzdWNoIGFzIC50YWtlKCkgd2lsbCByZXR1cm4gZW1wdHkgc3RyaW5ncyB1bnRpbCBlbm91Z2ggZGF0YSBpc1xuICAgIC8vIHB1c2hlZC5cbiAgICAvLyBSZXR1cm5zIHRoaXMgKHNlbGYpLlxuICAgIHNlbGYuYWR2YW5jZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIG9mZnNldCArPSBuO1xuICAgICAgICBsZW5ndGggLT0gbjtcbiAgICAgICAgd2hpbGUgKGhlYWQuYnVmZmVyICYmIG9mZnNldCA+PSBoZWFkLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9mZnNldCAtPSBoZWFkLmJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICBoZWFkID0gaGVhZC5uZXh0XG4gICAgICAgICAgICAgICAgPyBoZWFkLm5leHRcbiAgICAgICAgICAgICAgICA6IHsgYnVmZmVyIDogbnVsbCwgbmV4dCA6IG51bGwgfVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWFkLmJ1ZmZlciA9PT0gbnVsbCkgbGFzdCA9IHsgbmV4dCA6IG51bGwsIGJ1ZmZlciA6IG51bGwgfTtcbiAgICAgICAgc2VsZi5lbWl0KCdhZHZhbmNlJywgbik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgXG4gICAgLy8gVGFrZSBuIGJ5dGVzIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBidWZmZXJzLlxuICAgIC8vIFJldHVybnMgYSBzdHJpbmcuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGxlc3MgdGhhbiBuIGJ5dGVzIGluIGFsbCB0aGUgYnVmZmVycyBvciBuIGlzIHVuZGVmaW5lZCxcbiAgICAvLyByZXR1cm5zIHRoZSBlbnRpcmUgY29uY2F0ZW5hdGVkIGJ1ZmZlciBzdHJpbmcuXG4gICAgc2VsZi50YWtlID0gZnVuY3Rpb24gKG4sIGVuY29kaW5nKSB7XG4gICAgICAgIGlmIChuID09IHVuZGVmaW5lZCkgbiA9IHNlbGYubGVuZ3RoO1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGVuY29kaW5nID0gbjtcbiAgICAgICAgICAgIG4gPSBzZWxmLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYiA9IGhlYWQ7XG4gICAgICAgIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gc2VsZi5lbmNvZGluZztcbiAgICAgICAgaWYgKGVuY29kaW5nKSB7XG4gICAgICAgICAgICB2YXIgYWNjID0gJyc7XG4gICAgICAgICAgICBzZWxmLmZvckVhY2goZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGlmIChuIDw9IDApIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjYyArPSBidWZmZXIudG9TdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nLCAwLCBNYXRoLm1pbihuLGJ1ZmZlci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBuIC09IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBubyAnZW5jb2RpbmcnIGlzIHNwZWNpZmllZCwgdGhlbiByZXR1cm4gYSBCdWZmZXIuXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5qb2luKDAsIG4pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICAvLyBUaGUgZW50aXJlIGNvbmNhdGVuYXRlZCBidWZmZXIgYXMgYSBzdHJpbmcuXG4gICAgc2VsZi50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYudGFrZSgnYmluYXJ5Jyk7XG4gICAgfTtcbn1cbnJlcXVpcmUoJ3V0aWwnKS5pbmhlcml0cyhCdWZmZXJMaXN0LCBFdmVudEVtaXR0ZXIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdEV2ZW50VGFyZ2V0IDogcmVxdWlyZSgnLi9saWIvRXZlbnRUYXJnZXQnKSxcblx0RXZlbnQgICAgICAgOiByZXF1aXJlKCcuL2xpYi9FdmVudCcpXG59O1xuIiwiLyoqXG4gKiBFeHBvc2UgdGhlIEV2ZW50IGNsYXNzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9FdmVudDtcblxuXG5mdW5jdGlvbiBfRXZlbnQodHlwZSkge1xuXHR0aGlzLnR5cGUgPSB0eXBlO1xuXHR0aGlzLmlzVHJ1c3RlZCA9IGZhbHNlO1xuXG5cdC8vIFNldCBhIGZsYWcgaW5kaWNhdGluZyB0aGlzIGlzIG5vdCBhIERPTSBFdmVudCBvYmplY3Rcblx0dGhpcy5feWFldGkgPSB0cnVlO1xufVxuIiwiLyoqXG4gKiBFeHBvc2UgdGhlIF9FdmVudFRhcmdldCBjbGFzcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfRXZlbnRUYXJnZXQ7XG5cbmZ1bmN0aW9uIF9FdmVudFRhcmdldCgpIHtcblx0Ly8gRG8gbm90aGluZyBpZiBjYWxsZWQgZm9yIGEgbmF0aXZlIEV2ZW50VGFyZ2V0IG9iamVjdC4uXG5cdGlmICh0eXBlb2YgdGhpcy5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhpcy5fbGlzdGVuZXJzID0ge307XG5cblx0dGhpcy5hZGRFdmVudExpc3RlbmVyID0gX2FkZEV2ZW50TGlzdGVuZXI7XG5cdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IF9yZW1vdmVFdmVudExpc3RlbmVyO1xuXHR0aGlzLmRpc3BhdGNoRXZlbnQgPSBfZGlzcGF0Y2hFdmVudDtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoX0V2ZW50VGFyZ2V0LnByb3RvdHlwZSwge1xuXHRsaXN0ZW5lcnM6IHtcblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLl9saXN0ZW5lcnM7XG5cdFx0fVxuXHR9XG59KTtcblxuZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXIodHlwZSwgbmV3TGlzdGVuZXIpIHtcblx0dmFyXG5cdFx0bGlzdGVuZXJzVHlwZSxcblx0XHRpLCBsaXN0ZW5lcjtcblxuXHRpZiAoIXR5cGUgfHwgIW5ld0xpc3RlbmVyKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGlzdGVuZXJzVHlwZSA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcblx0aWYgKGxpc3RlbmVyc1R5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IGxpc3RlbmVyc1R5cGUgPSBbXTtcblx0fVxuXG5cdGZvciAoaSA9IDA7ICEhKGxpc3RlbmVyID0gbGlzdGVuZXJzVHlwZVtpXSk7IGkrKykge1xuXHRcdGlmIChsaXN0ZW5lciA9PT0gbmV3TGlzdGVuZXIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRsaXN0ZW5lcnNUeXBlLnB1c2gobmV3TGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBvbGRMaXN0ZW5lcikge1xuXHR2YXJcblx0XHRsaXN0ZW5lcnNUeXBlLFxuXHRcdGksIGxpc3RlbmVyO1xuXG5cdGlmICghdHlwZSB8fCAhb2xkTGlzdGVuZXIpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRsaXN0ZW5lcnNUeXBlID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuXHRpZiAobGlzdGVuZXJzVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yIChpID0gMDsgISEobGlzdGVuZXIgPSBsaXN0ZW5lcnNUeXBlW2ldKTsgaSsrKSB7XG5cdFx0aWYgKGxpc3RlbmVyID09PSBvbGRMaXN0ZW5lcikge1xuXHRcdFx0bGlzdGVuZXJzVHlwZS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAobGlzdGVuZXJzVHlwZS5sZW5ndGggPT09IDApIHtcblx0XHRkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuXHR9XG59XG5cbmZ1bmN0aW9uIF9kaXNwYXRjaEV2ZW50KGV2ZW50KSB7XG5cdHZhclxuXHRcdHR5cGUsXG5cdFx0bGlzdGVuZXJzVHlwZSxcblx0XHRkdW1teUxpc3RlbmVyLFxuXHRcdHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZhbHNlLFxuXHRcdGksIGxpc3RlbmVyO1xuXG5cdGlmICghZXZlbnQgfHwgdHlwZW9mIGV2ZW50LnR5cGUgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdgZXZlbnRgIG11c3QgaGF2ZSBhIHZhbGlkIGB0eXBlYCBwcm9wZXJ0eScpO1xuXHR9XG5cblx0Ly8gRG8gc29tZSBzdHVmZiB0byBlbXVsYXRlIERPTSBFdmVudCBiZWhhdmlvciAoanVzdCBpZiB0aGlzIGlzIG5vdCBhXG5cdC8vIERPTSBFdmVudCBvYmplY3QpXG5cdGlmIChldmVudC5feWFldGkpIHtcblx0XHRldmVudC50YXJnZXQgPSB0aGlzO1xuXHRcdGV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXHR9XG5cblx0Ly8gQXR0ZW1wdCB0byBvdmVycmlkZSB0aGUgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgbWV0aG9kXG5cdHRyeSB7XG5cdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gdHJ1ZTtcblx0XHR9O1xuXHR9IGNhdGNoIChlcnJvcikge31cblxuXHR0eXBlID0gZXZlbnQudHlwZTtcblx0bGlzdGVuZXJzVHlwZSA9ICh0aGlzLl9saXN0ZW5lcnNbdHlwZV0gfHwgW10pO1xuXG5cdGR1bW15TGlzdGVuZXIgPSB0aGlzWydvbicgKyB0eXBlXTtcblx0aWYgKHR5cGVvZiBkdW1teUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0ZHVtbXlMaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fVxuXG5cdGZvciAoaSA9IDA7ICEhKGxpc3RlbmVyID0gbGlzdGVuZXJzVHlwZVtpXSk7IGkrKykge1xuXHRcdGlmIChzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQpO1xuXHR9XG5cblx0cmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkO1xufVxuIiwiaW1wb3J0IHtJU2Vzc2lvbkRhdGEgYXMgSVNlc3Npb25EYXRhfSBmcm9tICdTZXNzaW9uU2VydmVyL1Nlc3Npb25EYXRhSW50ZXJmYWNlJ1xyXG5cclxuY2xhc3MgUGllY2Vcclxue1xyXG5cdHggOiBudW1iZXIgPSAwO1xyXG5cdHkgOiBudW1iZXIgPSAwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHV6emxlRGF0YSBpbXBsZW1lbnRzIElTZXNzaW9uRGF0YVxyXG57XHJcblx0cGllY2VzIDogUGllY2VbXVtdID0gW107XHJcblx0aW1hZ2VVUkwgOiBzdHJpbmcgPSBcIlwiO1xyXG5cdGNvbnN0cnVjdG9yKHBhcmFtZXRlcnMgOiBhbnkpXHJcblx0e1xyXG5cdFx0aWYgKHR5cGVvZiBwYXJhbWV0ZXJzLmltYWdlVVJMICE9IFwic3RyaW5nXCIpXHJcblx0XHR7XHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIkNvbnN0cnVjdGluZyBQdXp6bGVEYXRhIHJlcXVpcmVzIGEgJ2ltYWdlVVJMJy1zdHJpbmcgcGFyYW1ldGVyXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLmltYWdlVVJMID0gcGFyYW1ldGVycy5pbWFnZVVSTDtcclxuXHR9XHJcblxyXG5cdFVwZGF0ZShwYXJhbWV0ZXJzIDogYW55KSA6IHZvaWRcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHBhcmFtZXRlcnMuaW5kZXhYICE9IFwibnVtYmVyXCIpXHJcblx0XHR7XHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIkNvbnN0cnVjdGluZyBQdXp6bGVEYXRhIHJlcXVpcmVzIGEgJ2luZGV4WCctbnVtYmVyIHBhcmFtZXRlclwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHR5cGVvZiBwYXJhbWV0ZXJzLmluZGV4WSAhPSBcIm51bWJlclwiKVxyXG5cdFx0e1xyXG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoXCJDb25zdHJ1Y3RpbmcgUHV6emxlRGF0YSByZXF1aXJlcyBhICdpbmRleFknLW51bWJlciBwYXJhbWV0ZXJcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgcGFyYW1ldGVycy5wb3NYICE9IFwibnVtYmVyXCIpXHJcblx0XHR7XHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIkNvbnN0cnVjdGluZyBQdXp6bGVEYXRhIHJlcXVpcmVzIGEgJ3Bvc1gnLW51bWJlciBwYXJhbWV0ZXJcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgcGFyYW1ldGVycy5wb3NZICE9IFwibnVtYmVyXCIpXHJcblx0XHR7XHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIkNvbnN0cnVjdGluZyBQdXp6bGVEYXRhIHJlcXVpcmVzIGEgJ3Bvc1knLW51bWJlciBwYXJhbWV0ZXJcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnBpZWNlc1twYXJhbWV0ZXJzLmluZGV4WF0gPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5waWVjZXNbcGFyYW1ldGVycy5pbmRleFhdID0gW107XHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mIHRoaXMucGllY2VzW3BhcmFtZXRlcnMuaW5kZXhYXVtwYXJhbWV0ZXJzLmluZGV4WV0gPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5waWVjZXNbcGFyYW1ldGVycy5pbmRleFhdW3BhcmFtZXRlcnMuaW5kZXhZXSA9IG5ldyBQaWVjZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGllY2VzW3BhcmFtZXRlcnMuaW5kZXhYXVtwYXJhbWV0ZXJzLmluZGV4WV0ueCA9IHBhcmFtZXRlcnMucG9zWDtcclxuXHRcdHRoaXMucGllY2VzW3BhcmFtZXRlcnMuaW5kZXhYXVtwYXJhbWV0ZXJzLmluZGV4WV0ueSA9IHBhcmFtZXRlcnMucG9zWTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcblxyXG4vL0B0cy1pZ25vcmVcclxuaW1wb3J0IGh0dHBTaHV0ZG93biBmcm9tICdodHRwLXNodXRkb3duJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2VydmVyXHJcbntcclxuXHRodHRwU2VydmVyIDogYW55O1xyXG5cdHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cdHN0YXRpYyBDcmVhdGUocG9ydCA6IG51bWJlciwgcm9vdEZvbGRlciA6IHN0cmluZykgOiBQcm9taXNlPFBhZ2VTZXJ2ZXI+XHJcblx0e1xyXG5cdFx0Y29uc3Qgc2VydmVyIDogUGFnZVNlcnZlciA9IG5ldyBQYWdlU2VydmVyKCk7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8UGFnZVNlcnZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRpZiAoIWZzLmxzdGF0U3luYyhyb290Rm9sZGVyKS5pc0RpcmVjdG9yeSgpKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmVqZWN0KG5ldyBSZWZlcmVuY2VFcnJvcihgUm9vdCBmb2xkZXIgJyR7cm9vdEZvbGRlcn0nIGlzIG5vdCBhIHZhbGlkIGZvbGRlciFgKSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXJ2ZXIuaHR0cFNlcnZlciA9IGh0dHBTaHV0ZG93bihodHRwLmNyZWF0ZVNlcnZlcigocmVxdWVzdCA6IGh0dHAuSW5jb21pbmdNZXNzYWdlLCByZXNwb25zZSA6IGh0dHAuU2VydmVyUmVzcG9uc2UpID0+IHtcclxuXHJcblxyXG5cdFx0XHRcdGNvbnN0IHsgaGVhZGVycywgbWV0aG9kLCB1cmwgfSA9IHJlcXVlc3Q7XHJcblx0XHRcdFx0bGV0IGJvZHkgOiBVaW50OEFycmF5W10gPSBbXTtcclxuXHJcblx0XHRcdFx0cmVxdWVzdC5vbignZXJyb3InLCAoZXJyIDogRXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHR9KS5vbignZGF0YScsIChjaHVuayA6IEJ1ZmZlcikgPT4ge1xyXG5cdFx0XHRcdFx0Ym9keS5wdXNoKGNodW5rKTtcclxuXHRcdFx0XHR9KS5vbignZW5kJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGZpbGVQYXRoIDogc3RyaW5nID0gcm9vdEZvbGRlciArIHJlcXVlc3QudXJsO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGVQYXRoID09IHJvb3RGb2xkZXIgKyBcIi9cIilcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0ZmlsZVBhdGggPSByb290Rm9sZGVyICsgXCIvaW5kZXguaHRtbFwiO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGV4dG5hbWUgOiBzdHJpbmcgPSBwYXRoLmV4dG5hbWUoZmlsZVBhdGgpO1xyXG5cdFx0XHRcdFx0bGV0IGNvbnRlbnRUeXBlIDogc3RyaW5nID0gJ3RleHQvaHRtbCc7XHJcblx0XHRcdFx0XHRzd2l0Y2ggKGV4dG5hbWUpIHsgXHJcblx0XHRcdFx0XHRcdGNhc2UgJy5qcyc6XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAnLmNzcyc6XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSAndGV4dC9jc3MnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICcuanNvbic6XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJy5wbmcnOlxyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnRUeXBlID0gJ2ltYWdlL3BuZyc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7ICAgICAgXHJcblx0XHRcdFx0XHRcdGNhc2UgJy5qcGcnOlxyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnRUeXBlID0gJ2ltYWdlL2pwZyc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYFtQYWdlU2VydmVyXSBIYW5kbGluZyByZXF1ZXN0IGZvciAke2ZpbGVQYXRofS4uLmApO1xyXG5cclxuXHRcdFx0XHRcdGZzLnJlYWRGaWxlKGZpbGVQYXRoLCBmdW5jdGlvbihlcnJvciA6IEVycm9yLCBjb250ZW50IDogQnVmZmVyKSB7XHJcblx0XHRcdFx0XHRcdGlmIChlcnJvcilcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZ3JvdXAoXCJbUGFnZVNlcnZlcl0gQ291bGRuJ3QgaGFuZGxlIHJlcXVlc3RcIik7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5ncm91cEVuZCgpO1xyXG5cdFx0XHRcdFx0XHRcdGZzLnJlYWRGaWxlKHJvb3RGb2xkZXIgKyAnL2luZGV4Lmh0bWwnLCBmdW5jdGlvbihlcnJvciA6IEVycm9yLCBjb250ZW50IDogQnVmZmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyb3IpXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLndyaXRlSGVhZCg1MDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5lbmQoJzUwMCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmdyb3VwKFwiW1BhZ2VTZXJ2ZXJdIENvdWxkbid0IHJldHVybiBpbmRleC5odG1sIGFzIHJlc3BvbnNlIHRvIGVycm9yIGhhbmRsaW5nXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5ncm91cEVuZCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5lbmQoKTsgXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmVuZChjb250ZW50LCAndXRmLTgnKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZS53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZSB9KTtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZS5lbmQoY29udGVudCwgJ3V0Zi04Jyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KSk7XHJcblxyXG5cdFx0XHRzZXJ2ZXIuaHR0cFNlcnZlci5vbignbGlzdGVuaW5nJywgKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGBbUGFnZVNlcnZlcl0gTGlzdGVuaW5nIG9uIHBvcnQgJHtwb3J0fS4uLmApO1xyXG5cdFx0XHRcdHJlc29sdmUoc2VydmVyKTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHNlcnZlci5odHRwU2VydmVyLm9uKCdlcnJvcicsIChlcnJvciA6IEVycm9yKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgW1BhZ2VTZXJ2ZXJdIEVycm9yIHN0YXJ0aW5nIHNlcnZlci4uLmApO1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdH0pXHJcblx0XHRcdFxyXG5cdFx0XHRzZXJ2ZXIuaHR0cFNlcnZlci5saXN0ZW4ocG9ydCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHNodXRkb3duKCkgOiBQcm9taXNlPHZvaWQ+XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5odHRwU2VydmVyLnNodXRkb3duKCgpPT57XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSIsImRlY2xhcmUgZ2xvYmFsIHtcclxuXHRpbnRlcmZhY2UgQXJyYXk8VD4ge1xyXG5cdFx0cmVtb3ZlKGVsZW06IFQpOiBBcnJheTxUPjtcclxuXHR9XHJcbn1cclxuXHJcbmlmIChBcnJheS5wcm90b3R5cGUucmVtb3ZlKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uPFQ+KHRoaXM6IFRbXSwgZWxlbTogVCk6IFRbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZSA9PiBlICE9PSBlbGVtKTtcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCB7SVNlc3Npb25EYXRhIGFzIElTZXNzaW9uRGF0YSwgSVNlc3Npb25EYXRhQ29uc3RydWN0b3IgYXMgSVNlc3Npb25EYXRhQ29uc3RydWN0b3J9IGZyb20gJ1Nlc3Npb25TZXJ2ZXIvU2Vzc2lvbkRhdGFJbnRlcmZhY2UnO1xyXG5cclxudHlwZSBGb3JFYWNoUGxheWVyQ2FsbGJhY2sgPSAocGxheWVySUQgOiBudW1iZXIpID0+IHZvaWQ7XHJcbmNsYXNzIFNlc3Npb24ge1xyXG5cdHByaXZhdGUgaWQgOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBjdXJyZW50U2Vzc2lvbkRhdGEgOiBJU2Vzc2lvbkRhdGE7XHJcblx0cHJpdmF0ZSBjb25uZWN0ZWRQbGF5ZXJJRHMgOiBudW1iZXJbXSA9IFtdO1xyXG5cdGdldCBDdXJyZW50UGxheWVyQ291bnQoKSB7IHJldHVybiB0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5sZW5ndGg7IH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKHNlc3Npb25UeXBlIDogSVNlc3Npb25EYXRhQ29uc3RydWN0b3IsIElEIDogbnVtYmVyLCBzZXNzaW9uQ3JlYXRpb25Bcmd1bWVudHMgOiBhbnkpXHJcblx0e1xyXG5cdFx0dGhpcy5pZCA9IElEO1xyXG5cdFx0dGhpcy5jdXJyZW50U2Vzc2lvbkRhdGEgPSBuZXcgc2Vzc2lvblR5cGUoc2Vzc2lvbkNyZWF0aW9uQXJndW1lbnRzKTtcclxuXHR9XHJcblxyXG5cdEhhc1BsYXllckluU2Vzc2lvbihwbGF5ZXJJRCA6IG51bWJlcikgOiBib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY29ubmVjdGVkUGxheWVySURzLmluZGV4T2YocGxheWVySUQpID4gLTE7XHJcblx0fVxyXG5cclxuXHRBZGRQbGF5ZXJCeUlEKHBsYXllcklEIDogbnVtYmVyKSA6IGJvb2xlYW5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5IYXNQbGF5ZXJJblNlc3Npb24ocGxheWVySUQpKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBbU2Vzc2lvblNlcnZlcl0gUGxheWVyICR7cGxheWVySUR9IGlzIGFscmVhZHkgcGFydCBvZiBzZXNzaW9uICR7dGhpcy5pZH0gKGN1cnJlbnQgcGxheWVyczogJHt0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5qb2luKCcsICcpfSlgKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jb25uZWN0ZWRQbGF5ZXJJRHMucHVzaChwbGF5ZXJJRCk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdFJlbW92ZVBsYXllckJ5SUQocGxheWVySUQgOiBudW1iZXIpIDogYm9vbGVhblxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5IYXNQbGF5ZXJJblNlc3Npb24ocGxheWVySUQpKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBbU2Vzc2lvblNlcnZlcl0gUGxheWVyICR7cGxheWVySUR9IGlzIG5vdCBwYXJ0IG9mIHNlc3Npb24gJHt0aGlzLmlkfSAoY3VycmVudCBwbGF5ZXJzOiAke3RoaXMuY29ubmVjdGVkUGxheWVySURzLmpvaW4oJywgJyl9KWApO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5zbGljZSh0aGlzLmNvbm5lY3RlZFBsYXllcklEcy5pbmRleE9mKHBsYXllcklEKSwgMSk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdFVwZGF0ZShwbGF5ZXJJRCA6IG51bWJlciwgc2Vzc2lvblVwZGF0ZUFyZ3VtZW50cyA6IGFueSkgOiBib29sZWFuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLkhhc1BsYXllckluU2Vzc2lvbihwbGF5ZXJJRCkpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFtTZXNzaW9uU2VydmVyXSBQbGF5ZXIgJHtwbGF5ZXJJRH0gaXMgbm90IHBhcnQgb2Ygc2Vzc2lvbiAke3RoaXMuaWR9IGFuZCB0aGVyZWZvcmUgY2FuJ3QgdXBkYXRlIHRoZSBzZXNzaW9uIChjdXJyZW50IHBsYXllcnM6ICR7dGhpcy5jb25uZWN0ZWRQbGF5ZXJJRHMuam9pbignLCAnKX0pYCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY3VycmVudFNlc3Npb25EYXRhLlVwZGF0ZShzZXNzaW9uVXBkYXRlQXJndW1lbnRzKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0R2V0RGF0YSgpIDogYW55XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFNlc3Npb25EYXRhIGFzIGFueTtcclxuXHR9XHJcblxyXG5cdEZvckVhY2hQbGF5ZXIoY2FsbGJhY2sgOiBGb3JFYWNoUGxheWVyQ2FsbGJhY2spXHJcblx0e1xyXG5cdFx0dGhpcy5jb25uZWN0ZWRQbGF5ZXJJRHMuZm9yRWFjaChjYWxsYmFjayk7XHJcblx0fVxyXG59O1xyXG5cclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0ICogYXMgd3MgZnJvbSAnd2Vic29ja2V0JztcclxuXHJcbnR5cGUgY29tbWFuZFNpZ25hdHVyZSA9IChwbGF5ZXJJRCA6IG51bWJlciwganNvbk1lc3NhZ2UgOiBhbnkpID0+IGFueTtcclxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2ZXJcclxue1xyXG5cdHByaXZhdGUgY29tbWFuZHMgOiB7W25hbWUgOiBzdHJpbmddOiBjb21tYW5kU2lnbmF0dXJlfSA9IHt9O1xyXG5cclxuXHRwcml2YXRlIG5leHRTZXNzaW9uSUQgOiBudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgc2Vzc2lvbnMgOiB7W0lEIDogbnVtYmVyXTogU2Vzc2lvbn0gPSB7fTtcclxuXHJcblx0cHJpdmF0ZSBuZXh0UGxheWVySUQgOiBudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgcGxheWVyIDoge1tJRCA6IG51bWJlcl06IHdzLmNvbm5lY3Rpb259ID0ge307XHJcblxyXG5cdHByaXZhdGUgc2Vzc2lvblR5cGUgOiBJU2Vzc2lvbkRhdGFDb25zdHJ1Y3RvcjtcclxuXHRwcml2YXRlIHBvcnQgOiBudW1iZXI7XHJcblxyXG5cdHByaXZhdGUgaHR0cFNlcnZlciA6IGh0dHAuU2VydmVyO1xyXG5cdHByaXZhdGUgd3NTZXJ2ZXIgOiB3cy5zZXJ2ZXI7XHJcblxyXG5cdHByaXZhdGUgdmFsaWRhdGVTZXNzaW9uSUQocGxheWVySUQgOiBudW1iZXIsIHNlc3Npb25JRCA6IGFueSwgcmVxdWVzdCA6IHN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIHNlc3Npb25JRCAhPSBcIm51bWJlclwiKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBbU2Vzc2lvblNlcnZlcl0gJHtyZXF1ZXN0fSByZXF1aXJlcyBhICdzZXNzaW9uSUQnLXBhcmFtZXRlciBhcyBudW1iZXIhIChzdXBwbGllZDogJHtzZXNzaW9uSUR9IFske3R5cGVvZiBzZXNzaW9uSUR9XSlgKTtcclxuXHRcdFx0dGhpcy5zZW5kTWVzc2FnZVRvUGxheWVyKHBsYXllcklELCBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0XCJjb21tYW5kXCI6IHJlcXVlc3QsXHJcblx0XHRcdFx0XCJzZXNzaW9uSURcIjogLTFcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklEXSlcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5zZW5kTWVzc2FnZVRvUGxheWVyKHBsYXllcklELCBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0XCJjb21tYW5kXCI6IHJlcXVlc3QsXHJcblx0XHRcdFx0XCJzZXNzaW9uSURcIjogLTJcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0dXBDb21tYW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5jb21tYW5kc1tcImNyZWF0ZVNlc3Npb25cIl0gPSAocGxheWVySUQgOiBudW1iZXIsIGpzb25NZXNzYWdlIDogYW55KSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBuZXdTZXNzaW9uSUQgPSB0aGlzLmdlbmVyYXRlU2Vzc2lvbklEKCk7XHJcblx0XHRcdHRoaXMuc2Vzc2lvbnNbbmV3U2Vzc2lvbklEXSA9IG5ldyBTZXNzaW9uKHRoaXMuc2Vzc2lvblR5cGUsIG5ld1Nlc3Npb25JRCwganNvbk1lc3NhZ2UucGFyYW1ldGVycyk7XHJcblx0XHRcdGlmICghdGhpcy5zZXNzaW9uc1tuZXdTZXNzaW9uSURdLkFkZFBsYXllckJ5SUQocGxheWVySUQpKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgW1Nlc3Npb25TZXJ2ZXJdIFVuYWJsZSB0byBhZGQgcGxheWVyICR7cGxheWVySUR9IHRvIG5ld2x5IGNyZWF0ZWQgc2Vzc2lvbiAke25ld1Nlc3Npb25JRH1gKTtcclxuXHRcdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25Kb2luXCIsXHJcblx0XHRcdFx0XHRcInNlc3Npb25JRFwiOiAtMSxcclxuXHRcdFx0XHRcdFwic2Vzc2lvblwiOiB7fVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKGBbU2Vzc2lvblNlcnZlcl0gQ3JlYXRlZCBuZXcgc2Vzc2lvbiB3aXRoIElEICR7bmV3U2Vzc2lvbklEfWApO1xyXG5cclxuXHRcdFx0dGhpcy5zZW5kTWVzc2FnZVRvUGxheWVyKHBsYXllcklELCBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0XCJjb21tYW5kXCI6IFwic2Vzc2lvbkpvaW5cIixcclxuXHRcdFx0XHRcInNlc3Npb25JRFwiOiBuZXdTZXNzaW9uSUQsXHJcblx0XHRcdFx0XCJzZXNzaW9uXCI6IHRoaXMuc2Vzc2lvbnNbbmV3U2Vzc2lvbklEXS5HZXREYXRhKClcclxuXHRcdFx0fSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmNvbW1hbmRzW1widXBkYXRlU2Vzc2lvblwiXSA9IChwbGF5ZXJJRCA6IG51bWJlciwganNvbk1lc3NhZ2UgOiBhbnkpID0+XHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUubG9nKGBbU2Vzc2lvblNlcnZlcl0gUGxheWVyICR7cGxheWVySUR9IGF0dGVtcHRpbmcgdG8gdXBkYXRlIHNlc3Npb24gJHtqc29uTWVzc2FnZS5zZXNzaW9uSUR9YCk7XHJcblx0XHRcdGlmICghdGhpcy52YWxpZGF0ZVNlc3Npb25JRChwbGF5ZXJJRCwganNvbk1lc3NhZ2Uuc2Vzc2lvbklELCBcInNlc3Npb25VcGRhdGVcIikpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdLlVwZGF0ZShwbGF5ZXJJRCwganNvbk1lc3NhZ2UucGFyYW1ldGVycykpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25VcGRhdGVcIixcclxuXHRcdFx0XHRcdFwic2Vzc2lvbklEXCI6IC0zXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkZGRkZGRkZGRkZGRkZGRkZGRlwiKTtcclxuXHRcdFx0Y29uc29sZS5sb2coKHRoaXMuc2Vzc2lvbnNbanNvbk1lc3NhZ2Uuc2Vzc2lvbklEXSBhcyBhbnkpLmNvbm5lY3RlZFBsYXllcklEcyk7XHJcblx0XHRcdHRoaXMuc2Vzc2lvbnNbanNvbk1lc3NhZ2Uuc2Vzc2lvbklEXS5Gb3JFYWNoUGxheWVyKCgocGxheWVySUQgOiBudW1iZXIpID0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVwZGF0ZSBmb3IgXCIrcGxheWVySUQpO1xyXG5cdFx0XHRcdHRoaXMuc2VuZE1lc3NhZ2VUb1BsYXllcihwbGF5ZXJJRCwgSlNPTi5zdHJpbmdpZnkoe1wiY29tbWFuZFwiOiBcInNlc3Npb25VcGRhdGVcIiwgXCJzZXNzaW9uSURcIjoganNvbk1lc3NhZ2Uuc2Vzc2lvbklELCBcInNlc3Npb25cIjogdGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdLkdldERhdGEoKX0pKTtcclxuXHRcdFx0fSkuYmluZCh0aGlzKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuY29tbWFuZHNbXCJqb2luU2Vzc2lvblwiXSA9IChwbGF5ZXJJRCA6IG51bWJlciwganNvbk1lc3NhZ2UgOiBhbnkpID0+XHJcblx0XHR7XHJcblx0XHRcdGlmIChqc29uTWVzc2FnZS5zZXNzaW9uSUQgIT0gLTEgJiYgIXRoaXMudmFsaWRhdGVTZXNzaW9uSUQocGxheWVySUQsIGpzb25NZXNzYWdlLnNlc3Npb25JRCwgXCJzZXNzaW9uSm9pblwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gcmVxdWVzdGluZyBhIGpvaW4gdG8gc2Vzc2lvbiBJRCAtMSB3aWxsIGpvaW4gdGhlIGxhdGVzdCBzZXNzaW9uXHJcblx0XHRcdGlmIChqc29uTWVzc2FnZS5zZXNzaW9uSUQgPT0gLTEpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRqc29uTWVzc2FnZS5zZXNzaW9uSUQgPSB0aGlzLm5leHRTZXNzaW9uSUQgLSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMudmFsaWRhdGVTZXNzaW9uSUQocGxheWVySUQsIGpzb25NZXNzYWdlLnNlc3Npb25JRCwgXCJzZXNzaW9uSm9pblwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uQWRkUGxheWVyQnlJRChwbGF5ZXJJRCkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25Kb2luXCIsXHJcblx0XHRcdFx0XHRcInNlc3Npb25JRFwiOiAtM1xyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2VuZE1lc3NhZ2VUb1BsYXllcihwbGF5ZXJJRCwgSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25Kb2luXCIsXHJcblx0XHRcdFx0XCJzZXNzaW9uSURcIjoganNvbk1lc3NhZ2Uuc2Vzc2lvbklELFxyXG5cdFx0XHRcdFwic2Vzc2lvblwiOiB0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uR2V0RGF0YSgpXHJcblx0XHRcdH0pKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5jb21tYW5kc1tcImxlYXZlU2Vzc2lvblwiXSA9IChwbGF5ZXJJRCA6IG51bWJlciwganNvbk1lc3NhZ2UgOiBhbnkpID0+XHJcblx0XHR7XHJcblx0XHRcdGlmICghdGhpcy52YWxpZGF0ZVNlc3Npb25JRChwbGF5ZXJJRCwganNvbk1lc3NhZ2Uuc2Vzc2lvbklELCBcInNlc3Npb25MZWF2ZVwiKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uUmVtb3ZlUGxheWVyQnlJRChwbGF5ZXJJRCkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFwiY29tbWFuZFwiOiBcInNlc3Npb25MZWF2ZVwiLFxyXG5cdFx0XHRcdFx0XCJzZXNzaW9uSURcIjogLTNcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIFBsYXllcnMgbGVmdCBpbiBzZXNzaW9uICR7anNvbk1lc3NhZ2Uuc2Vzc2lvbklEfTogJHt0aGlzLnNlc3Npb25zW2pzb25NZXNzYWdlLnNlc3Npb25JRF0uQ3VycmVudFBsYXllckNvdW50fWApO1xyXG5cdFx0XHRpZiAoIXRoaXMuc2Vzc2lvbnNbanNvbk1lc3NhZ2Uuc2Vzc2lvbklEXS5DdXJyZW50UGxheWVyQ291bnQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhgW1Nlc3Npb25TZXJ2ZXJdIFNlc3Npb24gJHtqc29uTWVzc2FnZS5zZXNzaW9uSUR9IGhhcyBubyBwbGF5ZXJzIGxlZnQ7IGRpc2NhcmRpbmcgaXRgKTtcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5zZXNzaW9uc1tqc29uTWVzc2FnZS5zZXNzaW9uSURdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlbmRNZXNzYWdlVG9QbGF5ZXIocGxheWVySUQsIEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcImNvbW1hbmRcIjogXCJzZXNzaW9uTGVhdmVcIixcclxuXHRcdFx0XHRcInNlc3Npb25JRFwiOiBqc29uTWVzc2FnZS5zZXNzaW9uSURcclxuXHRcdFx0fSkpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2VuZXJhdGVQbGF5ZXJDbG9zZUhhbmRsZXIocGxheWVySUQgOiBudW1iZXIpXHJcblx0e1xyXG5cdFx0cmV0dXJuIChyZWFzb25Db2RlIDogbnVtYmVyLCBkZXNjcmlwdGlvbiA6IHN0cmluZykgPT4ge1xyXG5cdFx0XHR0aGlzLnJlbW92ZVBsYXllcihwbGF5ZXJJRCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZW1vdmVQbGF5ZXIocGxheWVySUQgOiBudW1iZXIpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5sb2coYFtTZXNzaW9uU2VydmVyXSBDb25uZWN0aW9uIGZyb20gcGxheWVyICR7cGxheWVySUR9IGNsb3NlZC4uLmApO1xyXG5cdFx0Zm9yIChjb25zdCBzZXNzaW9uSUQgaW4gdGhpcy5zZXNzaW9ucylcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5jb21tYW5kcy5sZWF2ZVNlc3Npb24uYXBwbHkodGhpcywgW3BsYXllcklELCB7XCJzZXNzaW9uSURcIjogcGFyc2VJbnQoc2Vzc2lvbklEKX1dKTtcclxuXHRcdH1cclxuXHRcdGRlbGV0ZSB0aGlzLnBsYXllcltwbGF5ZXJJRF07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGhhbmRsZU5ld1BsYXllcihyZXF1ZXN0IDogd3MucmVxdWVzdClcclxuXHR7XHJcblx0XHRjb25zdCBjb25uZWN0aW9uIDogd3MuY29ubmVjdGlvbiA9IHJlcXVlc3QuYWNjZXB0KHVuZGVmaW5lZCwgcmVxdWVzdC5vcmlnaW4pO1xyXG5cdFx0XHJcblx0XHRjb25zdCBwbGF5ZXJJRCA6IG51bWJlciA9IHRoaXMuZ2VuZXJhdGVQbGF5ZXJJRCgpO1xyXG5cdFx0dGhpcy5wbGF5ZXJbcGxheWVySURdID0gY29ubmVjdGlvbjtcclxuXHJcblx0XHR0aGlzLnBsYXllcltwbGF5ZXJJRF0ub24oJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xyXG5cdFx0XHRpZiAobWVzc2FnZS50eXBlID09PSAndXRmOCcpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0cnlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb25zdCBqc29uTWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZS51dGY4RGF0YSBhcyBzdHJpbmcpO1xyXG5cdFx0XHRcdFx0dGhpcy5oYW5kbGVNZXNzYWdlKHBsYXllcklELCBqc29uTWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoKGUpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5ncm91cChcIkludmFsaWQgSlNPTiBzdHJpbmcgcmVjZWl2ZWQhXCIpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnBsYXllcltwbGF5ZXJJRF0ub24oJ2Nsb3NlJyxcclxuXHRcdFx0dGhpcy5nZW5lcmF0ZVBsYXllckNsb3NlSGFuZGxlcihwbGF5ZXJJRClcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihzZXNzaW9uVHlwZSA6IElTZXNzaW9uRGF0YUNvbnN0cnVjdG9yLCBwb3J0IDogbnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuc2Vzc2lvblR5cGUgPSBzZXNzaW9uVHlwZTtcclxuXHRcdHRoaXMucG9ydCA9IHBvcnQ7XHJcblxyXG5cdFx0dGhpcy5odHRwU2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKCkgPT4ge30pO1xyXG5cdFx0dGhpcy5odHRwU2VydmVyLmxpc3Rlbih0aGlzLnBvcnQsICgpID0+IHt9KTtcclxuXHJcblx0XHR0aGlzLndzU2VydmVyID0gbmV3IHdzLnNlcnZlcih7IGh0dHBTZXJ2ZXI6IHRoaXMuaHR0cFNlcnZlciB9KTtcclxuXHJcblx0XHR0aGlzLnNldHVwQ29tbWFuZHMoKTtcclxuXHJcblx0XHR0aGlzLndzU2VydmVyLm9uKCdyZXF1ZXN0JywgdGhpcy5oYW5kbGVOZXdQbGF5ZXIuYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coYFtTZXNzaW9uU2VydmVyXSBMaXN0ZW5pbmcgb24gcG9ydCAke3RoaXMucG9ydH0uLi5gKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2VuZXJhdGVQbGF5ZXJJRCgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMubmV4dFBsYXllcklEKys7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdlbmVyYXRlU2Vzc2lvbklEKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5uZXh0U2Vzc2lvbklEKys7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGhhbmRsZU1lc3NhZ2UocGxheWVySUQgOiBudW1iZXIsIGpzb25NZXNzYWdlIDogYW55KVxyXG5cdHtcclxuXHRcdGlmIChqc29uTWVzc2FnZS5jb21tYW5kKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuY29tbWFuZHNbanNvbk1lc3NhZ2UuY29tbWFuZF0gPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5jb21tYW5kc1tqc29uTWVzc2FnZS5jb21tYW5kXS5hcHBseSh0aGlzLCBbcGxheWVySUQsIGpzb25NZXNzYWdlXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgW1Nlc3Npb25TZXJ2ZXJdIG5vIGNvbW1hbmQgY2FsbGVkIFwiJHtqc29uTWVzc2FnZS5jb21tYW5kfVwiIGF2YWlsYWJsZWApXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2VuZE1lc3NhZ2VUb1BsYXllcihwbGF5ZXJJRCA6IG51bWJlciwgbWVzc2FnZSA6IHN0cmluZylcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMucGxheWVyW3BsYXllcklEXSlcclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgW1Nlc3Npb25TZXJ2ZXJdIE5vIHBsYXllciB3aXRoIElEICR7cGxheWVySUR9IGlzIGNvbm5lY3RlZCFgKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGxheWVyW3BsYXllcklEXS5zZW5kKG1lc3NhZ2UpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59OyIsImltcG9ydCB7UHV6emxlRGF0YX0gZnJvbSBcIkdhbWUvUHV6emxlRGF0YVwiXHJcbmltcG9ydCB7U2Vzc2lvblNlcnZlcn0gZnJvbSBcIlNlc3Npb25TZXJ2ZXIvU2Vzc2lvblNlcnZlclwiXHJcbmltcG9ydCB7UGFnZVNlcnZlcn0gZnJvbSBcIlBhZ2VTZXJ2ZXIvUGFnZVNlcnZlclwiXHJcblxyXG5jb25zdCBzZXNzaW9uU2VydmVyIDogU2Vzc2lvblNlcnZlciA9IG5ldyBTZXNzaW9uU2VydmVyKFB1enpsZURhdGEsIHBhcnNlSW50KHByb2Nlc3MuZW52LlBPUlQgfHwgXCJcIikgfHwgNzk5Nik7XHJcbmNvbnN0IHBhZ2VTZXJ2ZXIgOiBQcm9taXNlPFBhZ2VTZXJ2ZXI+ID0gUGFnZVNlcnZlci5DcmVhdGUocGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCB8fCBcIlwiKSB8fCA3OTk1LCBcImh0bWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYnVmZmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0dHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==