import {
  require_react_is
} from "./chunk-3OHSKRNP.js";
import {
  require_react
} from "./chunk-3ALM24AN.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-HL2QZUHZ.js";

// node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module2) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics5(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics5(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys2 = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys2 = keys2.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys2.length; ++i) {
          var key = keys2[i];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e2) {
            }
          }
        }
      }
      return targetComponent;
    }
    module2.exports = hoistNonReactStatics5;
  }
});

// node_modules/@sentry/utils/esm/is.js
var objectToString = Object.prototype.toString;
function isError(wat) {
  switch (objectToString.call(wat)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent(wat) {
  return isBuiltin(wat, "ErrorEvent");
}
function isDOMError(wat) {
  return isBuiltin(wat, "DOMError");
}
function isDOMException(wat) {
  return isBuiltin(wat, "DOMException");
}
function isString(wat) {
  return isBuiltin(wat, "String");
}
function isParameterizedString(wat) {
  return typeof wat === "object" && wat !== null && "__sentry_template_string__" in wat && "__sentry_template_values__" in wat;
}
function isPrimitive(wat) {
  return wat === null || isParameterizedString(wat) || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
function isEvent(wat) {
  return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isElement(wat) {
  return typeof Element !== "undefined" && isInstanceOf(wat, Element);
}
function isRegExp(wat) {
  return isBuiltin(wat, "RegExp");
}
function isThenable(wat) {
  return Boolean(wat && wat.then && typeof wat.then === "function");
}
function isSyntheticEvent(wat) {
  return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
}
function isNaN2(wat) {
  return typeof wat === "number" && wat !== wat;
}
function isInstanceOf(wat, base) {
  try {
    return wat instanceof base;
  } catch (_e) {
    return false;
  }
}
function isVueViewModel(wat) {
  return !!(typeof wat === "object" && wat !== null && (wat.__isVue || wat._isVue));
}

// node_modules/@sentry/utils/esm/string.js
function truncate(str, max = 0) {
  if (typeof str !== "string" || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return "";
  }
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    try {
      if (isVueViewModel(value)) {
        output.push("[VueViewModel]");
      } else {
        output.push(String(value));
      }
    } catch (e2) {
      output.push("[value cannot be serialized]");
    }
  }
  return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
  if (!isString(value)) {
    return false;
  }
  if (isRegExp(pattern)) {
    return pattern.test(value);
  }
  if (isString(pattern)) {
    return requireExactStringMatch ? value === pattern : value.includes(pattern);
  }
  return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
  return patterns.some((pattern) => isMatchingPattern(testString, pattern, requireExactStringMatch));
}

// node_modules/@sentry/utils/esm/aggregate-errors.js
function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, maxValueLimit = 250, key, limit, event, hint) {
  if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
    return;
  }
  const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
  if (originalException) {
    event.exception.values = truncateAggregateExceptions(
      aggregateExceptionsFromError(
        exceptionFromErrorImplementation,
        parser,
        limit,
        hint.originalException,
        key,
        event.exception.values,
        originalException,
        0
      ),
      maxValueLimit
    );
  }
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
  if (prevExceptions.length >= limit + 1) {
    return prevExceptions;
  }
  let newExceptions = [...prevExceptions];
  if (isInstanceOf(error[key], Error)) {
    applyExceptionGroupFieldsForParentException(exception, exceptionId);
    const newException = exceptionFromErrorImplementation(parser, error[key]);
    const newExceptionId = newExceptions.length;
    applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
    newExceptions = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error[key],
      key,
      [newException, ...newExceptions],
      newException,
      newExceptionId
    );
  }
  if (Array.isArray(error.errors)) {
    error.errors.forEach((childError, i) => {
      if (isInstanceOf(childError, Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, childError);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          childError,
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId
        );
      }
    });
  }
  return newExceptions;
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    ...exception.type === "AggregateError" && { is_exception_group: true },
    exception_id: exceptionId
  };
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    type: "chained",
    source,
    exception_id: exceptionId,
    parent_id: parentId
  };
}
function truncateAggregateExceptions(exceptions, maxValueLength) {
  return exceptions.map((exception) => {
    if (exception.value) {
      exception.value = truncate(exception.value, maxValueLength);
    }
    return exception;
  });
}

// node_modules/@sentry/utils/esm/worldwide.js
function isGlobalObj(obj) {
  return obj && obj.Math == Math ? obj : void 0;
}
var GLOBAL_OBJ = typeof globalThis == "object" && isGlobalObj(globalThis) || // eslint-disable-next-line no-restricted-globals
typeof window == "object" && isGlobalObj(window) || typeof self == "object" && isGlobalObj(self) || typeof global == "object" && isGlobalObj(global) || /* @__PURE__ */ function() {
  return this;
}() || {};
function getGlobalObject() {
  return GLOBAL_OBJ;
}
function getGlobalSingleton(name, creator, obj) {
  const gbl = obj || GLOBAL_OBJ;
  const __SENTRY__ = gbl.__SENTRY__ = gbl.__SENTRY__ || {};
  const singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
  return singleton;
}

// node_modules/@sentry/utils/esm/browser.js
var WINDOW = getGlobalObject();
var DEFAULT_MAX_STRING_LENGTH = 80;
function htmlTreeAsString(elem, options = {}) {
  if (!elem) {
    return "<unknown>";
  }
  try {
    let currentElem = elem;
    const MAX_TRAVERSE_HEIGHT = 5;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = " > ";
    const sepLength = separator.length;
    let nextStr;
    const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
    const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem, keyAttrs);
      if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
        break;
      }
      out.push(nextStr);
      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
  } catch (_oO) {
    return "<unknown>";
  }
}
function _htmlElementAsString(el, keyAttrs) {
  const elem = el;
  const out = [];
  let className;
  let classes;
  let key;
  let attr;
  let i;
  if (!elem || !elem.tagName) {
    return "";
  }
  if (WINDOW.HTMLElement) {
    if (elem instanceof HTMLElement && elem.dataset && elem.dataset["sentryComponent"]) {
      return elem.dataset["sentryComponent"];
    }
  }
  out.push(elem.tagName.toLowerCase());
  const keyAttrPairs = keyAttrs && keyAttrs.length ? keyAttrs.filter((keyAttr) => elem.getAttribute(keyAttr)).map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)]) : null;
  if (keyAttrPairs && keyAttrPairs.length) {
    keyAttrPairs.forEach((keyAttrPair) => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }
    className = elem.className;
    if (className && isString(className)) {
      classes = className.split(/\s+/);
      for (i = 0; i < classes.length; i++) {
        out.push(`.${classes[i]}`);
      }
    }
  }
  const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push(`[${key}="${attr}"]`);
    }
  }
  return out.join("");
}
function getLocationHref() {
  try {
    return WINDOW.document.location.href;
  } catch (oO) {
    return "";
  }
}
function getDomElement(selector) {
  if (WINDOW.document && WINDOW.document.querySelector) {
    return WINDOW.document.querySelector(selector);
  }
  return null;
}
function getComponentName(elem) {
  if (!WINDOW.HTMLElement) {
    return null;
  }
  let currentElem = elem;
  const MAX_TRAVERSE_HEIGHT = 5;
  for (let i = 0; i < MAX_TRAVERSE_HEIGHT; i++) {
    if (!currentElem) {
      return null;
    }
    if (currentElem instanceof HTMLElement && currentElem.dataset["sentryComponent"]) {
      return currentElem.dataset["sentryComponent"];
    }
    currentElem = currentElem.parentNode;
  }
  return null;
}

// node_modules/@sentry/utils/esm/debug-build.js
var DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/@sentry/utils/esm/logger.js
var PREFIX = "Sentry Logger ";
var CONSOLE_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
];
var originalConsoleMethods = {};
function consoleSandbox(callback) {
  if (!("console" in GLOBAL_OBJ)) {
    return callback();
  }
  const console2 = GLOBAL_OBJ.console;
  const wrappedFuncs = {};
  const wrappedLevels = Object.keys(originalConsoleMethods);
  wrappedLevels.forEach((level) => {
    const originalConsoleMethod = originalConsoleMethods[level];
    wrappedFuncs[level] = console2[level];
    console2[level] = originalConsoleMethod;
  });
  try {
    return callback();
  } finally {
    wrappedLevels.forEach((level) => {
      console2[level] = wrappedFuncs[level];
    });
  }
}
function makeLogger() {
  let enabled = false;
  const logger2 = {
    enable: () => {
      enabled = true;
    },
    disable: () => {
      enabled = false;
    },
    isEnabled: () => enabled
  };
  if (DEBUG_BUILD) {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = (...args) => {
        if (enabled) {
          consoleSandbox(() => {
            GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
          });
        }
      };
    });
  } else {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = () => void 0;
    });
  }
  return logger2;
}
var logger = makeLogger();

// node_modules/@sentry/utils/esm/dsn.js
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
  return protocol === "http" || protocol === "https";
}
function dsnToString(dsn, withPassword = false) {
  const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
  return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
function dsnFromString(str) {
  const match = DSN_REGEX.exec(str);
  if (!match) {
    consoleSandbox(() => {
      console.error(`Invalid Sentry Dsn: ${str}`);
    });
    return void 0;
  }
  const [protocol, publicKey, pass = "", host, port = "", lastPath] = match.slice(1);
  let path = "";
  let projectId = lastPath;
  const split = projectId.split("/");
  if (split.length > 1) {
    path = split.slice(0, -1).join("/");
    projectId = split.pop();
  }
  if (projectId) {
    const projectMatch = projectId.match(/^\d+/);
    if (projectMatch) {
      projectId = projectMatch[0];
    }
  }
  return dsnFromComponents({ host, pass, path, projectId, port, protocol, publicKey });
}
function dsnFromComponents(components) {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || "",
    pass: components.pass || "",
    host: components.host,
    port: components.port || "",
    path: components.path || "",
    projectId: components.projectId
  };
}
function validateDsn(dsn) {
  if (!DEBUG_BUILD) {
    return true;
  }
  const { port, projectId, protocol } = dsn;
  const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
  const hasMissingRequiredComponent = requiredComponents.find((component) => {
    if (!dsn[component]) {
      logger.error(`Invalid Sentry Dsn: ${component} missing`);
      return true;
    }
    return false;
  });
  if (hasMissingRequiredComponent) {
    return false;
  }
  if (!projectId.match(/^\d+$/)) {
    logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }
  if (!isValidProtocol(protocol)) {
    logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
    return false;
  }
  if (port && isNaN(parseInt(port, 10))) {
    logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }
  return true;
}
function makeDsn(from) {
  const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
  if (!components || !validateDsn(components)) {
    return void 0;
  }
  return components;
}

// node_modules/@sentry/utils/esm/error.js
var SentryError = class extends Error {
  /** Display name of this error instance. */
  constructor(message, logLevel = "warn") {
    super(message);
    this.message = message;
    this.name = new.target.prototype.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    this.logLevel = logLevel;
  }
};

// node_modules/@sentry/utils/esm/object.js
function fill(source, name, replacementFactory) {
  if (!(name in source)) {
    return;
  }
  const original = source[name];
  const wrapped = replacementFactory(original);
  if (typeof wrapped === "function") {
    markFunctionWrapped(wrapped, original);
  }
  source[name] = wrapped;
}
function addNonEnumerableProperty(obj, name, value) {
  try {
    Object.defineProperty(obj, name, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value,
      writable: true,
      configurable: true
    });
  } catch (o_O) {
    DEBUG_BUILD && logger.log(`Failed to add non-enumerable property "${name}" to object`, obj);
  }
}
function markFunctionWrapped(wrapped, original) {
  try {
    const proto = original.prototype || {};
    wrapped.prototype = original.prototype = proto;
    addNonEnumerableProperty(wrapped, "__sentry_original__", original);
  } catch (o_O) {
  }
}
function getOriginalFunction(func) {
  return func.__sentry_original__;
}
function urlEncode(object) {
  return Object.keys(object).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join("&");
}
function convertToPlainObject(value) {
  if (isError(value)) {
    return {
      message: value.message,
      name: value.name,
      stack: value.stack,
      ...getOwnProperties(value)
    };
  } else if (isEvent(value)) {
    const newObj = {
      type: value.type,
      target: serializeEventTarget(value.target),
      currentTarget: serializeEventTarget(value.currentTarget),
      ...getOwnProperties(value)
    };
    if (typeof CustomEvent !== "undefined" && isInstanceOf(value, CustomEvent)) {
      newObj.detail = value.detail;
    }
    return newObj;
  } else {
    return value;
  }
}
function serializeEventTarget(target) {
  try {
    return isElement(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
  } catch (_oO) {
    return "<unknown>";
  }
}
function getOwnProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const extractedProps = {};
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = obj[property];
      }
    }
    return extractedProps;
  } else {
    return {};
  }
}
function extractExceptionKeysForMessage(exception, maxLength = 40) {
  const keys2 = Object.keys(convertToPlainObject(exception));
  keys2.sort();
  if (!keys2.length) {
    return "[object has no keys]";
  }
  if (keys2[0].length >= maxLength) {
    return truncate(keys2[0], maxLength);
  }
  for (let includedKeys = keys2.length; includedKeys > 0; includedKeys--) {
    const serialized = keys2.slice(0, includedKeys).join(", ");
    if (serialized.length > maxLength) {
      continue;
    }
    if (includedKeys === keys2.length) {
      return serialized;
    }
    return truncate(serialized, maxLength);
  }
  return "";
}
function dropUndefinedKeys(inputValue) {
  const memoizationMap = /* @__PURE__ */ new Map();
  return _dropUndefinedKeys(inputValue, memoizationMap);
}
function _dropUndefinedKeys(inputValue, memoizationMap) {
  if (isPojo(inputValue)) {
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== void 0) {
      return memoVal;
    }
    const returnValue = {};
    memoizationMap.set(inputValue, returnValue);
    for (const key of Object.keys(inputValue)) {
      if (typeof inputValue[key] !== "undefined") {
        returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap);
      }
    }
    return returnValue;
  }
  if (Array.isArray(inputValue)) {
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== void 0) {
      return memoVal;
    }
    const returnValue = [];
    memoizationMap.set(inputValue, returnValue);
    inputValue.forEach((item) => {
      returnValue.push(_dropUndefinedKeys(item, memoizationMap));
    });
    return returnValue;
  }
  return inputValue;
}
function isPojo(input) {
  if (!isPlainObject(input)) {
    return false;
  }
  try {
    const name = Object.getPrototypeOf(input).constructor.name;
    return !name || name === "Object";
  } catch (e2) {
    return true;
  }
}

// node_modules/@sentry/utils/esm/stacktrace.js
var STACKTRACE_FRAME_LIMIT = 50;
var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
var STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
  const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  return (stack, skipFirst = 0) => {
    const frames = [];
    const lines = stack.split("\n");
    for (let i = skipFirst; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 1024) {
        continue;
      }
      const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
      if (cleanedLine.match(/\S*Error: /)) {
        continue;
      }
      for (const parser of sortedParsers) {
        const frame = parser(cleanedLine);
        if (frame) {
          frames.push(frame);
          break;
        }
      }
      if (frames.length >= STACKTRACE_FRAME_LIMIT) {
        break;
      }
    }
    return stripSentryFramesAndReverse(frames);
  };
}
function stackParserFromStackParserOptions(stackParser) {
  if (Array.isArray(stackParser)) {
    return createStackParser(...stackParser);
  }
  return stackParser;
}
function stripSentryFramesAndReverse(stack) {
  if (!stack.length) {
    return [];
  }
  const localStack = Array.from(stack);
  if (/sentryWrapped/.test(localStack[localStack.length - 1].function || "")) {
    localStack.pop();
  }
  localStack.reverse();
  if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
    localStack.pop();
    if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
      localStack.pop();
    }
  }
  return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
    ...frame,
    filename: frame.filename || localStack[localStack.length - 1].filename,
    function: frame.function || "?"
  }));
}
var defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== "function") {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch (e2) {
    return defaultFunctionName;
  }
}

// node_modules/@sentry/utils/esm/instrument/_handlers.js
var handlers = {};
var instrumented = {};
function addHandler(type, handler) {
  handlers[type] = handlers[type] || [];
  handlers[type].push(handler);
}
function maybeInstrument(type, instrumentFn) {
  if (!instrumented[type]) {
    instrumentFn();
    instrumented[type] = true;
  }
}
function triggerHandlers(type, data) {
  const typeHandlers = type && handlers[type];
  if (!typeHandlers) {
    return;
  }
  for (const handler of typeHandlers) {
    try {
      handler(data);
    } catch (e2) {
      DEBUG_BUILD && logger.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`,
        e2
      );
    }
  }
}

// node_modules/@sentry/utils/esm/instrument/console.js
function addConsoleInstrumentationHandler(handler) {
  const type = "console";
  addHandler(type, handler);
  maybeInstrument(type, instrumentConsole);
}
function instrumentConsole() {
  if (!("console" in GLOBAL_OBJ)) {
    return;
  }
  CONSOLE_LEVELS.forEach(function(level) {
    if (!(level in GLOBAL_OBJ.console)) {
      return;
    }
    fill(GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
      originalConsoleMethods[level] = originalConsoleMethod;
      return function(...args) {
        const handlerData = { args, level };
        triggerHandlers("console", handlerData);
        const log2 = originalConsoleMethods[level];
        log2 && log2.apply(GLOBAL_OBJ.console, args);
      };
    });
  });
}

// node_modules/@sentry/utils/esm/misc.js
function uuid4() {
  const gbl = GLOBAL_OBJ;
  const crypto = gbl.crypto || gbl.msCrypto;
  let getRandomByte = () => Math.random() * 16;
  try {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    if (crypto && crypto.getRandomValues) {
      getRandomByte = () => {
        const typedArray = new Uint8Array(1);
        crypto.getRandomValues(typedArray);
        return typedArray[0];
      };
    }
  } catch (_) {
  }
  return ("10000000100040008000" + 1e11).replace(
    /[018]/g,
    (c) => (
      // eslint-disable-next-line no-bitwise
      (c ^ (getRandomByte() & 15) >> c / 4).toString(16)
    )
  );
}
function getFirstException(event) {
  return event.exception && event.exception.values ? event.exception.values[0] : void 0;
}
function getEventDescription(event) {
  const { message, event_id: eventId } = event;
  if (message) {
    return message;
  }
  const firstException = getFirstException(event);
  if (firstException) {
    if (firstException.type && firstException.value) {
      return `${firstException.type}: ${firstException.value}`;
    }
    return firstException.type || firstException.value || eventId || "<unknown>";
  }
  return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
  const exception = event.exception = event.exception || {};
  const values = exception.values = exception.values || [];
  const firstException = values[0] = values[0] || {};
  if (!firstException.value) {
    firstException.value = value || "";
  }
  if (!firstException.type) {
    firstException.type = type || "Error";
  }
}
function addExceptionMechanism(event, newMechanism) {
  const firstException = getFirstException(event);
  if (!firstException) {
    return;
  }
  const defaultMechanism = { type: "generic", handled: true };
  const currentMechanism = firstException.mechanism;
  firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };
  if (newMechanism && "data" in newMechanism) {
    const mergedData = { ...currentMechanism && currentMechanism.data, ...newMechanism.data };
    firstException.mechanism.data = mergedData;
  }
}
function checkOrSetAlreadyCaught(exception) {
  if (exception && exception.__sentry_captured__) {
    return true;
  }
  try {
    addNonEnumerableProperty(exception, "__sentry_captured__", true);
  } catch (err) {
  }
  return false;
}
function arrayify(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

// node_modules/@sentry/utils/esm/instrument/dom.js
var WINDOW2 = GLOBAL_OBJ;
var DEBOUNCE_DURATION = 1e3;
var debounceTimerID;
var lastCapturedEventType;
var lastCapturedEventTargetId;
function addClickKeypressInstrumentationHandler(handler) {
  const type = "dom";
  addHandler(type, handler);
  maybeInstrument(type, instrumentDOM);
}
function instrumentDOM() {
  if (!WINDOW2.document) {
    return;
  }
  const triggerDOMHandler = triggerHandlers.bind(null, "dom");
  const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
  WINDOW2.document.addEventListener("click", globalDOMEventHandler, false);
  WINDOW2.document.addEventListener("keypress", globalDOMEventHandler, false);
  ["EventTarget", "Node"].forEach((target) => {
    const proto = WINDOW2[target] && WINDOW2[target].prototype;
    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
      return;
    }
    fill(proto, "addEventListener", function(originalAddEventListener) {
      return function(type, listener, options) {
        if (type === "click" || type == "keypress") {
          try {
            const el = this;
            const handlers4 = el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {};
            const handlerForType = handlers4[type] = handlers4[type] || { refCount: 0 };
            if (!handlerForType.handler) {
              const handler = makeDOMEventHandler(triggerDOMHandler);
              handlerForType.handler = handler;
              originalAddEventListener.call(this, type, handler, options);
            }
            handlerForType.refCount++;
          } catch (e2) {
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
    fill(
      proto,
      "removeEventListener",
      function(originalRemoveEventListener) {
        return function(type, listener, options) {
          if (type === "click" || type == "keypress") {
            try {
              const el = this;
              const handlers4 = el.__sentry_instrumentation_handlers__ || {};
              const handlerForType = handlers4[type];
              if (handlerForType) {
                handlerForType.refCount--;
                if (handlerForType.refCount <= 0) {
                  originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                  handlerForType.handler = void 0;
                  delete handlers4[type];
                }
                if (Object.keys(handlers4).length === 0) {
                  delete el.__sentry_instrumentation_handlers__;
                }
              }
            } catch (e2) {
            }
          }
          return originalRemoveEventListener.call(this, type, listener, options);
        };
      }
    );
  });
}
function isSimilarToLastCapturedEvent(event) {
  if (event.type !== lastCapturedEventType) {
    return false;
  }
  try {
    if (!event.target || event.target._sentryId !== lastCapturedEventTargetId) {
      return false;
    }
  } catch (e2) {
  }
  return true;
}
function shouldSkipDOMEvent(eventType, target) {
  if (eventType !== "keypress") {
    return false;
  }
  if (!target || !target.tagName) {
    return true;
  }
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
    return false;
  }
  return true;
}
function makeDOMEventHandler(handler, globalListener = false) {
  return (event) => {
    if (!event || event["_sentryCaptured"]) {
      return;
    }
    const target = getEventTarget(event);
    if (shouldSkipDOMEvent(event.type, target)) {
      return;
    }
    addNonEnumerableProperty(event, "_sentryCaptured", true);
    if (target && !target._sentryId) {
      addNonEnumerableProperty(target, "_sentryId", uuid4());
    }
    const name = event.type === "keypress" ? "input" : event.type;
    if (!isSimilarToLastCapturedEvent(event)) {
      const handlerData = { event, name, global: globalListener };
      handler(handlerData);
      lastCapturedEventType = event.type;
      lastCapturedEventTargetId = target ? target._sentryId : void 0;
    }
    clearTimeout(debounceTimerID);
    debounceTimerID = WINDOW2.setTimeout(() => {
      lastCapturedEventTargetId = void 0;
      lastCapturedEventType = void 0;
    }, DEBOUNCE_DURATION);
  };
}
function getEventTarget(event) {
  try {
    return event.target;
  } catch (e2) {
    return null;
  }
}

// node_modules/@sentry/utils/esm/supports.js
var WINDOW3 = getGlobalObject();
function supportsFetch() {
  if (!("fetch" in WINDOW3)) {
    return false;
  }
  try {
    new Headers();
    new Request("http://www.example.com");
    new Response();
    return true;
  } catch (e2) {
    return false;
  }
}
function isNativeFetch(func) {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
function supportsNativeFetch() {
  if (typeof EdgeRuntime === "string") {
    return true;
  }
  if (!supportsFetch()) {
    return false;
  }
  if (isNativeFetch(WINDOW3.fetch)) {
    return true;
  }
  let result = false;
  const doc2 = WINDOW3.document;
  if (doc2 && typeof doc2.createElement === "function") {
    try {
      const sandbox = doc2.createElement("iframe");
      sandbox.hidden = true;
      doc2.head.appendChild(sandbox);
      if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
        result = isNativeFetch(sandbox.contentWindow.fetch);
      }
      doc2.head.removeChild(sandbox);
    } catch (err) {
      DEBUG_BUILD && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
    }
  }
  return result;
}

// node_modules/@sentry/utils/esm/instrument/fetch.js
function addFetchInstrumentationHandler(handler) {
  const type = "fetch";
  addHandler(type, handler);
  maybeInstrument(type, instrumentFetch);
}
function instrumentFetch() {
  if (!supportsNativeFetch()) {
    return;
  }
  fill(GLOBAL_OBJ, "fetch", function(originalFetch) {
    return function(...args) {
      const { method, url } = parseFetchArgs(args);
      const handlerData = {
        args,
        fetchData: {
          method,
          url
        },
        startTimestamp: Date.now()
      };
      triggerHandlers("fetch", {
        ...handlerData
      });
      return originalFetch.apply(GLOBAL_OBJ, args).then(
        (response) => {
          const finishedHandlerData = {
            ...handlerData,
            endTimestamp: Date.now(),
            response
          };
          triggerHandlers("fetch", finishedHandlerData);
          return response;
        },
        (error) => {
          const erroredHandlerData = {
            ...handlerData,
            endTimestamp: Date.now(),
            error
          };
          triggerHandlers("fetch", erroredHandlerData);
          throw error;
        }
      );
    };
  });
}
function hasProp(obj, prop) {
  return !!obj && typeof obj === "object" && !!obj[prop];
}
function getUrlFromResource(resource) {
  if (typeof resource === "string") {
    return resource;
  }
  if (!resource) {
    return "";
  }
  if (hasProp(resource, "url")) {
    return resource.url;
  }
  if (resource.toString) {
    return resource.toString();
  }
  return "";
}
function parseFetchArgs(fetchArgs) {
  if (fetchArgs.length === 0) {
    return { method: "GET", url: "" };
  }
  if (fetchArgs.length === 2) {
    const [url, options] = fetchArgs;
    return {
      url: getUrlFromResource(url),
      method: hasProp(options, "method") ? String(options.method).toUpperCase() : "GET"
    };
  }
  const arg = fetchArgs[0];
  return {
    url: getUrlFromResource(arg),
    method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET"
  };
}

// node_modules/@sentry/utils/esm/instrument/globalError.js
var _oldOnErrorHandler = null;
function addGlobalErrorInstrumentationHandler(handler) {
  const type = "error";
  addHandler(type, handler);
  maybeInstrument(type, instrumentError);
}
function instrumentError() {
  _oldOnErrorHandler = GLOBAL_OBJ.onerror;
  GLOBAL_OBJ.onerror = function(msg, url, line, column, error) {
    const handlerData = {
      column,
      error,
      line,
      msg,
      url
    };
    triggerHandlers("error", handlerData);
    if (_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__) {
      return _oldOnErrorHandler.apply(this, arguments);
    }
    return false;
  };
  GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
}

// node_modules/@sentry/utils/esm/instrument/globalUnhandledRejection.js
var _oldOnUnhandledRejectionHandler = null;
function addGlobalUnhandledRejectionInstrumentationHandler(handler) {
  const type = "unhandledrejection";
  addHandler(type, handler);
  maybeInstrument(type, instrumentUnhandledRejection);
}
function instrumentUnhandledRejection() {
  _oldOnUnhandledRejectionHandler = GLOBAL_OBJ.onunhandledrejection;
  GLOBAL_OBJ.onunhandledrejection = function(e2) {
    const handlerData = e2;
    triggerHandlers("unhandledrejection", handlerData);
    if (_oldOnUnhandledRejectionHandler && !_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__) {
      return _oldOnUnhandledRejectionHandler.apply(this, arguments);
    }
    return true;
  };
  GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}

// node_modules/@sentry/utils/esm/vendor/supportsHistory.js
var WINDOW4 = getGlobalObject();
function supportsHistory() {
  const chromeVar = WINDOW4.chrome;
  const isChromePackagedApp = chromeVar && chromeVar.app && chromeVar.app.runtime;
  const hasHistoryApi = "history" in WINDOW4 && !!WINDOW4.history.pushState && !!WINDOW4.history.replaceState;
  return !isChromePackagedApp && hasHistoryApi;
}

// node_modules/@sentry/utils/esm/instrument/history.js
var WINDOW5 = GLOBAL_OBJ;
var lastHref;
function addHistoryInstrumentationHandler(handler) {
  const type = "history";
  addHandler(type, handler);
  maybeInstrument(type, instrumentHistory);
}
function instrumentHistory() {
  if (!supportsHistory()) {
    return;
  }
  const oldOnPopState = WINDOW5.onpopstate;
  WINDOW5.onpopstate = function(...args) {
    const to = WINDOW5.location.href;
    const from = lastHref;
    lastHref = to;
    const handlerData = { from, to };
    triggerHandlers("history", handlerData);
    if (oldOnPopState) {
      try {
        return oldOnPopState.apply(this, args);
      } catch (_oO) {
      }
    }
  };
  function historyReplacementFunction(originalHistoryFunction) {
    return function(...args) {
      const url = args.length > 2 ? args[2] : void 0;
      if (url) {
        const from = lastHref;
        const to = String(url);
        lastHref = to;
        const handlerData = { from, to };
        triggerHandlers("history", handlerData);
      }
      return originalHistoryFunction.apply(this, args);
    };
  }
  fill(WINDOW5.history, "pushState", historyReplacementFunction);
  fill(WINDOW5.history, "replaceState", historyReplacementFunction);
}

// node_modules/@sentry/utils/esm/instrument/xhr.js
var WINDOW6 = GLOBAL_OBJ;
var SENTRY_XHR_DATA_KEY = "__sentry_xhr_v3__";
function addXhrInstrumentationHandler(handler) {
  const type = "xhr";
  addHandler(type, handler);
  maybeInstrument(type, instrumentXHR);
}
function instrumentXHR() {
  if (!WINDOW6.XMLHttpRequest) {
    return;
  }
  const xhrproto = XMLHttpRequest.prototype;
  fill(xhrproto, "open", function(originalOpen) {
    return function(...args) {
      const startTimestamp = Date.now();
      const method = isString(args[0]) ? args[0].toUpperCase() : void 0;
      const url = parseUrl(args[1]);
      if (!method || !url) {
        return originalOpen.apply(this, args);
      }
      this[SENTRY_XHR_DATA_KEY] = {
        method,
        url,
        request_headers: {}
      };
      if (method === "POST" && url.match(/sentry_key/)) {
        this.__sentry_own_request__ = true;
      }
      const onreadystatechangeHandler = () => {
        const xhrInfo = this[SENTRY_XHR_DATA_KEY];
        if (!xhrInfo) {
          return;
        }
        if (this.readyState === 4) {
          try {
            xhrInfo.status_code = this.status;
          } catch (e2) {
          }
          const handlerData = {
            args: [method, url],
            endTimestamp: Date.now(),
            startTimestamp,
            xhr: this
          };
          triggerHandlers("xhr", handlerData);
        }
      };
      if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") {
        fill(this, "onreadystatechange", function(original) {
          return function(...readyStateArgs) {
            onreadystatechangeHandler();
            return original.apply(this, readyStateArgs);
          };
        });
      } else {
        this.addEventListener("readystatechange", onreadystatechangeHandler);
      }
      fill(this, "setRequestHeader", function(original) {
        return function(...setRequestHeaderArgs) {
          const [header, value] = setRequestHeaderArgs;
          const xhrInfo = this[SENTRY_XHR_DATA_KEY];
          if (xhrInfo && isString(header) && isString(value)) {
            xhrInfo.request_headers[header.toLowerCase()] = value;
          }
          return original.apply(this, setRequestHeaderArgs);
        };
      });
      return originalOpen.apply(this, args);
    };
  });
  fill(xhrproto, "send", function(originalSend) {
    return function(...args) {
      const sentryXhrData = this[SENTRY_XHR_DATA_KEY];
      if (!sentryXhrData) {
        return originalSend.apply(this, args);
      }
      if (args[0] !== void 0) {
        sentryXhrData.body = args[0];
      }
      const handlerData = {
        args: [sentryXhrData.method, sentryXhrData.url],
        startTimestamp: Date.now(),
        xhr: this
      };
      triggerHandlers("xhr", handlerData);
      return originalSend.apply(this, args);
    };
  });
}
function parseUrl(url) {
  if (isString(url)) {
    return url;
  }
  try {
    return url.toString();
  } catch (e2) {
  }
  return void 0;
}

// node_modules/@sentry/utils/esm/env.js
function isBrowserBundle() {
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function getSDKSource() {
  return "npm";
}

// node_modules/@sentry/utils/esm/node.js
function isNodeEnv() {
  return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
function dynamicRequire(mod, request) {
  return mod.require(request);
}
function loadModule(moduleName) {
  let mod;
  try {
    mod = dynamicRequire(module, moduleName);
  } catch (e2) {
  }
  try {
    const { cwd } = dynamicRequire(module, "process");
    mod = dynamicRequire(module, `${cwd()}/node_modules/${moduleName}`);
  } catch (e2) {
  }
  return mod;
}

// node_modules/@sentry/utils/esm/isBrowser.js
function isBrowser() {
  return typeof window !== "undefined" && (!isNodeEnv() || isElectronNodeRenderer());
}
function isElectronNodeRenderer() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    GLOBAL_OBJ.process !== void 0 && GLOBAL_OBJ.process.type === "renderer"
  );
}

// node_modules/@sentry/utils/esm/memo.js
function memoBuilder() {
  const hasWeakSet = typeof WeakSet === "function";
  const inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
  function memoize(obj) {
    if (hasWeakSet) {
      if (inner.has(obj)) {
        return true;
      }
      inner.add(obj);
      return false;
    }
    for (let i = 0; i < inner.length; i++) {
      const value = inner[i];
      if (value === obj) {
        return true;
      }
    }
    inner.push(obj);
    return false;
  }
  function unmemoize(obj) {
    if (hasWeakSet) {
      inner.delete(obj);
    } else {
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === obj) {
          inner.splice(i, 1);
          break;
        }
      }
    }
  }
  return [memoize, unmemoize];
}

// node_modules/@sentry/utils/esm/normalize.js
function normalize(input, depth = 100, maxProperties = Infinity) {
  try {
    return visit("", input, depth, maxProperties);
  } catch (err) {
    return { ERROR: `**non-serializable** (${err})` };
  }
}
function normalizeToSize(object, depth = 3, maxSize = 100 * 1024) {
  const normalized = normalize(object, depth);
  if (jsonSize(normalized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }
  return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
  const [memoize, unmemoize] = memo;
  if (value == null || // this matches null and undefined -> eqeq not eqeqeq
  ["number", "boolean", "string"].includes(typeof value) && !isNaN2(value)) {
    return value;
  }
  const stringified = stringifyValue(key, value);
  if (!stringified.startsWith("[object ")) {
    return stringified;
  }
  if (value["__sentry_skip_normalization__"]) {
    return value;
  }
  const remainingDepth = typeof value["__sentry_override_normalization_depth__"] === "number" ? value["__sentry_override_normalization_depth__"] : depth;
  if (remainingDepth === 0) {
    return stringified.replace("object ", "");
  }
  if (memoize(value)) {
    return "[Circular ~]";
  }
  const valueWithToJSON = value;
  if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
    try {
      const jsonValue = valueWithToJSON.toJSON();
      return visit("", jsonValue, remainingDepth - 1, maxProperties, memo);
    } catch (err) {
    }
  }
  const normalized = Array.isArray(value) ? [] : {};
  let numAdded = 0;
  const visitable = convertToPlainObject(value);
  for (const visitKey in visitable) {
    if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
      continue;
    }
    if (numAdded >= maxProperties) {
      normalized[visitKey] = "[MaxProperties ~]";
      break;
    }
    const visitValue = visitable[visitKey];
    normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
    numAdded++;
  }
  unmemoize(value);
  return normalized;
}
function stringifyValue(key, value) {
  try {
    if (key === "domain" && value && typeof value === "object" && value._events) {
      return "[Domain]";
    }
    if (key === "domainEmitter") {
      return "[DomainEmitter]";
    }
    if (typeof global !== "undefined" && value === global) {
      return "[Global]";
    }
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }
    if (isVueViewModel(value)) {
      return "[VueViewModel]";
    }
    if (isSyntheticEvent(value)) {
      return "[SyntheticEvent]";
    }
    if (typeof value === "number" && value !== value) {
      return "[NaN]";
    }
    if (typeof value === "function") {
      return `[Function: ${getFunctionName(value)}]`;
    }
    if (typeof value === "symbol") {
      return `[${String(value)}]`;
    }
    if (typeof value === "bigint") {
      return `[BigInt: ${String(value)}]`;
    }
    const objName = getConstructorName(value);
    if (/^HTML(\w*)Element$/.test(objName)) {
      return `[HTMLElement: ${objName}]`;
    }
    return `[object ${objName}]`;
  } catch (err) {
    return `**non-serializable** (${err})`;
  }
}
function getConstructorName(value) {
  const prototype = Object.getPrototypeOf(value);
  return prototype ? prototype.constructor.name : "null prototype";
}
function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}

// node_modules/@sentry/utils/esm/syncpromise.js
var States;
(function(States2) {
  const PENDING = 0;
  States2[States2["PENDING"] = PENDING] = "PENDING";
  const RESOLVED = 1;
  States2[States2["RESOLVED"] = RESOLVED] = "RESOLVED";
  const REJECTED = 2;
  States2[States2["REJECTED"] = REJECTED] = "REJECTED";
})(States || (States = {}));
function resolvedSyncPromise(value) {
  return new SyncPromise((resolve2) => {
    resolve2(value);
  });
}
function rejectedSyncPromise(reason) {
  return new SyncPromise((_, reject) => {
    reject(reason);
  });
}
var SyncPromise = class _SyncPromise {
  constructor(executor) {
    _SyncPromise.prototype.__init.call(this);
    _SyncPromise.prototype.__init2.call(this);
    _SyncPromise.prototype.__init3.call(this);
    _SyncPromise.prototype.__init4.call(this);
    this._state = States.PENDING;
    this._handlers = [];
    try {
      executor(this._resolve, this._reject);
    } catch (e2) {
      this._reject(e2);
    }
  }
  /** JSDoc */
  then(onfulfilled, onrejected) {
    return new _SyncPromise((resolve2, reject) => {
      this._handlers.push([
        false,
        (result) => {
          if (!onfulfilled) {
            resolve2(result);
          } else {
            try {
              resolve2(onfulfilled(result));
            } catch (e2) {
              reject(e2);
            }
          }
        },
        (reason) => {
          if (!onrejected) {
            reject(reason);
          } else {
            try {
              resolve2(onrejected(reason));
            } catch (e2) {
              reject(e2);
            }
          }
        }
      ]);
      this._executeHandlers();
    });
  }
  /** JSDoc */
  catch(onrejected) {
    return this.then((val) => val, onrejected);
  }
  /** JSDoc */
  finally(onfinally) {
    return new _SyncPromise((resolve2, reject) => {
      let val;
      let isRejected;
      return this.then(
        (value) => {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        },
        (reason) => {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }
      ).then(() => {
        if (isRejected) {
          reject(val);
          return;
        }
        resolve2(val);
      });
    });
  }
  /** JSDoc */
  __init() {
    this._resolve = (value) => {
      this._setResult(States.RESOLVED, value);
    };
  }
  /** JSDoc */
  __init2() {
    this._reject = (reason) => {
      this._setResult(States.REJECTED, reason);
    };
  }
  /** JSDoc */
  __init3() {
    this._setResult = (state, value) => {
      if (this._state !== States.PENDING) {
        return;
      }
      if (isThenable(value)) {
        void value.then(this._resolve, this._reject);
        return;
      }
      this._state = state;
      this._value = value;
      this._executeHandlers();
    };
  }
  /** JSDoc */
  __init4() {
    this._executeHandlers = () => {
      if (this._state === States.PENDING) {
        return;
      }
      const cachedHandlers = this._handlers.slice();
      this._handlers = [];
      cachedHandlers.forEach((handler) => {
        if (handler[0]) {
          return;
        }
        if (this._state === States.RESOLVED) {
          handler[1](this._value);
        }
        if (this._state === States.REJECTED) {
          handler[2](this._value);
        }
        handler[0] = true;
      });
    };
  }
};

// node_modules/@sentry/utils/esm/promisebuffer.js
function makePromiseBuffer(limit) {
  const buffer = [];
  function isReady() {
    return limit === void 0 || buffer.length < limit;
  }
  function remove(task) {
    return buffer.splice(buffer.indexOf(task), 1)[0];
  }
  function add(taskProducer) {
    if (!isReady()) {
      return rejectedSyncPromise(new SentryError("Not adding Promise because buffer limit was reached."));
    }
    const task = taskProducer();
    if (buffer.indexOf(task) === -1) {
      buffer.push(task);
    }
    void task.then(() => remove(task)).then(
      null,
      () => remove(task).then(null, () => {
      })
    );
    return task;
  }
  function drain(timeout) {
    return new SyncPromise((resolve2, reject) => {
      let counter = buffer.length;
      if (!counter) {
        return resolve2(true);
      }
      const capturedSetTimeout = setTimeout(() => {
        if (timeout && timeout > 0) {
          resolve2(false);
        }
      }, timeout);
      buffer.forEach((item) => {
        void resolvedSyncPromise(item).then(() => {
          if (!--counter) {
            clearTimeout(capturedSetTimeout);
            resolve2(true);
          }
        }, reject);
      });
    });
  }
  return {
    $: buffer,
    add,
    drain
  };
}

// node_modules/@sentry/utils/esm/cookie.js
function parseCookie(str) {
  const obj = {};
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      try {
        obj[key] = val.indexOf("%") !== -1 ? decodeURIComponent(val) : val;
      } catch (e2) {
        obj[key] = val;
      }
    }
    index = endIdx + 1;
  }
  return obj;
}

// node_modules/@sentry/utils/esm/url.js
function parseUrl2(url) {
  if (!url) {
    return {};
  }
  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || "";
  const fragment = match[8] || "";
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    search: query,
    hash: fragment,
    relative: match[5] + query + fragment
    // everything minus origin
  };
}
function stripUrlQueryAndFragment(urlPath) {
  return urlPath.split(/[\?#]/, 1)[0];
}
function getNumberOfUrlSegments(url) {
  return url.split(/\\?\//).filter((s) => s.length > 0 && s !== ",").length;
}

// node_modules/@sentry/utils/esm/requestdata.js
var DEFAULT_INCLUDES = {
  ip: false,
  request: true,
  transaction: true,
  user: true
};
var DEFAULT_REQUEST_INCLUDES = ["cookies", "data", "headers", "method", "query_string", "url"];
var DEFAULT_USER_INCLUDES = ["id", "username", "email"];
function extractPathForTransaction(req, options = {}) {
  const method = req.method && req.method.toUpperCase();
  let path = "";
  let source = "url";
  if (options.customRoute || req.route) {
    path = options.customRoute || `${req.baseUrl || ""}${req.route && req.route.path}`;
    source = "route";
  } else if (req.originalUrl || req.url) {
    path = stripUrlQueryAndFragment(req.originalUrl || req.url || "");
  }
  let name = "";
  if (options.method && method) {
    name += method;
  }
  if (options.method && options.path) {
    name += " ";
  }
  if (options.path && path) {
    name += path;
  }
  return [name, source];
}
function extractTransaction(req, type) {
  switch (type) {
    case "path": {
      return extractPathForTransaction(req, { path: true })[0];
    }
    case "handler": {
      return req.route && req.route.stack && req.route.stack[0] && req.route.stack[0].name || "<anonymous>";
    }
    case "methodPath":
    default: {
      const customRoute = req._reconstructedRoute ? req._reconstructedRoute : void 0;
      return extractPathForTransaction(req, { path: true, method: true, customRoute })[0];
    }
  }
}
function extractUserData(user, keys2) {
  const extractedUser = {};
  const attributes = Array.isArray(keys2) ? keys2 : DEFAULT_USER_INCLUDES;
  attributes.forEach((key) => {
    if (user && key in user) {
      extractedUser[key] = user[key];
    }
  });
  return extractedUser;
}
function extractRequestData(req, options) {
  const { include = DEFAULT_REQUEST_INCLUDES, deps } = options || {};
  const requestData = {};
  const headers = req.headers || {};
  const method = req.method;
  const host = headers.host || req.hostname || req.host || "<no host>";
  const protocol = req.protocol === "https" || req.socket && req.socket.encrypted ? "https" : "http";
  const originalUrl = req.originalUrl || req.url || "";
  const absoluteUrl = originalUrl.startsWith(protocol) ? originalUrl : `${protocol}://${host}${originalUrl}`;
  include.forEach((key) => {
    switch (key) {
      case "headers": {
        requestData.headers = headers;
        if (!include.includes("cookies")) {
          delete requestData.headers.cookie;
        }
        break;
      }
      case "method": {
        requestData.method = method;
        break;
      }
      case "url": {
        requestData.url = absoluteUrl;
        break;
      }
      case "cookies": {
        requestData.cookies = // TODO (v8 / #5257): We're only sending the empty object for backwards compatibility, so the last bit can
        // come off in v8
        req.cookies || headers.cookie && parseCookie(headers.cookie) || {};
        break;
      }
      case "query_string": {
        requestData.query_string = extractQueryParams(req, deps);
        break;
      }
      case "data": {
        if (method === "GET" || method === "HEAD") {
          break;
        }
        if (req.body !== void 0) {
          requestData.data = isString(req.body) ? req.body : JSON.stringify(normalize(req.body));
        }
        break;
      }
      default: {
        if ({}.hasOwnProperty.call(req, key)) {
          requestData[key] = req[key];
        }
      }
    }
  });
  return requestData;
}
function addRequestDataToEvent(event, req, options) {
  const include = {
    ...DEFAULT_INCLUDES,
    ...options && options.include
  };
  if (include.request) {
    const extractedRequestData = Array.isArray(include.request) ? extractRequestData(req, { include: include.request, deps: options && options.deps }) : extractRequestData(req, { deps: options && options.deps });
    event.request = {
      ...event.request,
      ...extractedRequestData
    };
  }
  if (include.user) {
    const extractedUser = req.user && isPlainObject(req.user) ? extractUserData(req.user, include.user) : {};
    if (Object.keys(extractedUser).length) {
      event.user = {
        ...event.user,
        ...extractedUser
      };
    }
  }
  if (include.ip) {
    const ip = req.ip || req.socket && req.socket.remoteAddress;
    if (ip) {
      event.user = {
        ...event.user,
        ip_address: ip
      };
    }
  }
  if (include.transaction && !event.transaction) {
    event.transaction = extractTransaction(req, include.transaction);
  }
  return event;
}
function extractQueryParams(req, deps) {
  let originalUrl = req.originalUrl || req.url || "";
  if (!originalUrl) {
    return;
  }
  if (originalUrl.startsWith("/")) {
    originalUrl = `http://dogs.are.great${originalUrl}`;
  }
  try {
    return req.query || typeof URL !== "undefined" && new URL(originalUrl).search.slice(1) || // In Node 8, `URL` isn't in the global scope, so we have to use the built-in module from Node
    deps && deps.url && deps.url.parse(originalUrl).query || void 0;
  } catch (e2) {
    return void 0;
  }
}

// node_modules/@sentry/utils/esm/severity.js
var validSeverityLevels = ["fatal", "error", "warning", "log", "info", "debug"];
function severityLevelFromString(level) {
  return level === "warn" ? "warning" : validSeverityLevels.includes(level) ? level : "log";
}

// node_modules/@sentry/utils/esm/time.js
var ONE_SECOND_IN_MS = 1e3;
function dateTimestampInSeconds() {
  return Date.now() / ONE_SECOND_IN_MS;
}
function createUnixTimestampInSecondsFunc() {
  const { performance: performance2 } = GLOBAL_OBJ;
  if (!performance2 || !performance2.now) {
    return dateTimestampInSeconds;
  }
  const approxStartingTimeOrigin = Date.now() - performance2.now();
  const timeOrigin = performance2.timeOrigin == void 0 ? approxStartingTimeOrigin : performance2.timeOrigin;
  return () => {
    return (timeOrigin + performance2.now()) / ONE_SECOND_IN_MS;
  };
}
var timestampInSeconds = createUnixTimestampInSecondsFunc();
var _browserPerformanceTimeOriginMode;
var browserPerformanceTimeOrigin = (() => {
  const { performance: performance2 } = GLOBAL_OBJ;
  if (!performance2 || !performance2.now) {
    _browserPerformanceTimeOriginMode = "none";
    return void 0;
  }
  const threshold = 3600 * 1e3;
  const performanceNow = performance2.now();
  const dateNow = Date.now();
  const timeOriginDelta = performance2.timeOrigin ? Math.abs(performance2.timeOrigin + performanceNow - dateNow) : threshold;
  const timeOriginIsReliable = timeOriginDelta < threshold;
  const navigationStart = performance2.timing && performance2.timing.navigationStart;
  const hasNavigationStart = typeof navigationStart === "number";
  const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
  const navigationStartIsReliable = navigationStartDelta < threshold;
  if (timeOriginIsReliable || navigationStartIsReliable) {
    if (timeOriginDelta <= navigationStartDelta) {
      _browserPerformanceTimeOriginMode = "timeOrigin";
      return performance2.timeOrigin;
    } else {
      _browserPerformanceTimeOriginMode = "navigationStart";
      return navigationStart;
    }
  }
  _browserPerformanceTimeOriginMode = "dateNow";
  return dateNow;
})();

// node_modules/@sentry/utils/esm/baggage.js
var BAGGAGE_HEADER_NAME = "baggage";
var SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
var SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
var MAX_BAGGAGE_STRING_LENGTH = 8192;
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
  if (!isString(baggageHeader) && !Array.isArray(baggageHeader)) {
    return void 0;
  }
  let baggageObject = {};
  if (Array.isArray(baggageHeader)) {
    baggageObject = baggageHeader.reduce((acc, curr) => {
      const currBaggageObject = baggageHeaderToObject(curr);
      for (const key of Object.keys(currBaggageObject)) {
        acc[key] = currBaggageObject[key];
      }
      return acc;
    }, {});
  } else {
    if (!baggageHeader) {
      return void 0;
    }
    baggageObject = baggageHeaderToObject(baggageHeader);
  }
  const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
    if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
      const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
      acc[nonPrefixedKey] = value;
    }
    return acc;
  }, {});
  if (Object.keys(dynamicSamplingContext).length > 0) {
    return dynamicSamplingContext;
  } else {
    return void 0;
  }
}
function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
  if (!dynamicSamplingContext) {
    return void 0;
  }
  const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
    (acc, [dscKey, dscValue]) => {
      if (dscValue) {
        acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
      }
      return acc;
    },
    {}
  );
  return objectToBaggageHeader(sentryPrefixedDSC);
}
function baggageHeaderToObject(baggageHeader) {
  return baggageHeader.split(",").map((baggageEntry) => baggageEntry.split("=").map((keyOrValue) => decodeURIComponent(keyOrValue.trim()))).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}
function objectToBaggageHeader(object) {
  if (Object.keys(object).length === 0) {
    return void 0;
  }
  return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
    const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
    const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
    if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
      DEBUG_BUILD && logger.warn(
        `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`
      );
      return baggageHeader;
    } else {
      return newBaggageHeader;
    }
  }, "");
}

// node_modules/@sentry/utils/esm/tracing.js
var TRACEPARENT_REGEXP = new RegExp(
  "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
  // whitespace
);
function extractTraceparentData(traceparent) {
  if (!traceparent) {
    return void 0;
  }
  const matches = traceparent.match(TRACEPARENT_REGEXP);
  if (!matches) {
    return void 0;
  }
  let parentSampled;
  if (matches[3] === "1") {
    parentSampled = true;
  } else if (matches[3] === "0") {
    parentSampled = false;
  }
  return {
    traceId: matches[1],
    parentSampled,
    parentSpanId: matches[2]
  };
}
function tracingContextFromHeaders(sentryTrace, baggage) {
  const traceparentData = extractTraceparentData(sentryTrace);
  const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);
  const { traceId, parentSpanId, parentSampled } = traceparentData || {};
  if (!traceparentData) {
    return {
      traceparentData,
      dynamicSamplingContext: void 0,
      propagationContext: {
        traceId: traceId || uuid4(),
        spanId: uuid4().substring(16)
      }
    };
  } else {
    return {
      traceparentData,
      dynamicSamplingContext: dynamicSamplingContext || {},
      // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
      propagationContext: {
        traceId: traceId || uuid4(),
        parentSpanId: parentSpanId || uuid4().substring(16),
        spanId: uuid4().substring(16),
        sampled: parentSampled,
        dsc: dynamicSamplingContext || {}
        // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
      }
    };
  }
}
function propagationContextFromHeaders(sentryTrace, baggage) {
  const traceparentData = extractTraceparentData(sentryTrace);
  const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);
  const { traceId, parentSpanId, parentSampled } = traceparentData || {};
  if (!traceparentData) {
    return {
      traceId: traceId || uuid4(),
      spanId: uuid4().substring(16)
    };
  } else {
    return {
      traceId: traceId || uuid4(),
      parentSpanId: parentSpanId || uuid4().substring(16),
      spanId: uuid4().substring(16),
      sampled: parentSampled,
      dsc: dynamicSamplingContext || {}
      // If we have traceparent data but no DSC it means we are not head of trace and we must freeze it
    };
  }
}
function generateSentryTraceHeader(traceId = uuid4(), spanId = uuid4().substring(16), sampled) {
  let sampledString = "";
  if (sampled !== void 0) {
    sampledString = sampled ? "-1" : "-0";
  }
  return `${traceId}-${spanId}${sampledString}`;
}

// node_modules/@sentry/utils/esm/envelope.js
function createEnvelope(headers, items = []) {
  return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
  const [headers, items] = envelope;
  return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
  const envelopeItems = envelope[1];
  for (const envelopeItem of envelopeItems) {
    const envelopeItemType = envelopeItem[0].type;
    const result = callback(envelopeItem, envelopeItemType);
    if (result) {
      return true;
    }
  }
  return false;
}
function envelopeContainsItemType(envelope, types) {
  return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
}
function encodeUTF8(input, textEncoder) {
  const utf8 = textEncoder || new TextEncoder();
  return utf8.encode(input);
}
function serializeEnvelope(envelope, textEncoder) {
  const [envHeaders, items] = envelope;
  let parts = JSON.stringify(envHeaders);
  function append(next) {
    if (typeof parts === "string") {
      parts = typeof next === "string" ? parts + next : [encodeUTF8(parts, textEncoder), next];
    } else {
      parts.push(typeof next === "string" ? encodeUTF8(next, textEncoder) : next);
    }
  }
  for (const item of items) {
    const [itemHeaders, payload] = item;
    append(`
${JSON.stringify(itemHeaders)}
`);
    if (typeof payload === "string" || payload instanceof Uint8Array) {
      append(payload);
    } else {
      let stringifiedPayload;
      try {
        stringifiedPayload = JSON.stringify(payload);
      } catch (e2) {
        stringifiedPayload = JSON.stringify(normalize(payload));
      }
      append(stringifiedPayload);
    }
  }
  return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }
  return merged;
}
function parseEnvelope(env, textEncoder, textDecoder) {
  let buffer = typeof env === "string" ? textEncoder.encode(env) : env;
  function readBinary(length) {
    const bin = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1);
    return bin;
  }
  function readJson() {
    let i = buffer.indexOf(10);
    if (i < 0) {
      i = buffer.length;
    }
    return JSON.parse(textDecoder.decode(readBinary(i)));
  }
  const envelopeHeader = readJson();
  const items = [];
  while (buffer.length) {
    const itemHeader = readJson();
    const binaryLength = typeof itemHeader.length === "number" ? itemHeader.length : void 0;
    items.push([itemHeader, binaryLength ? readBinary(binaryLength) : readJson()]);
  }
  return [envelopeHeader, items];
}
function createAttachmentEnvelopeItem(attachment, textEncoder) {
  const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data, textEncoder) : attachment.data;
  return [
    dropUndefinedKeys({
      type: "attachment",
      length: buffer.length,
      filename: attachment.filename,
      content_type: attachment.contentType,
      attachment_type: attachment.attachmentType
    }),
    buffer
  ];
}
var ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  // TODO: This is a temporary workaround until we have a proper data category for metrics
  statsd: "unknown"
};
function envelopeItemTypeToDataCategory(type) {
  return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
  if (!metadataOrEvent || !metadataOrEvent.sdk) {
    return;
  }
  const { name, version: version2 } = metadataOrEvent.sdk;
  return { name, version: version2 };
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
  const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;
  return {
    event_id: event.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: dsnToString(dsn) },
    ...dynamicSamplingContext && {
      trace: dropUndefinedKeys({ ...dynamicSamplingContext })
    }
  };
}

// node_modules/@sentry/utils/esm/clientreport.js
function createClientReportEnvelope(discarded_events, dsn, timestamp) {
  const clientReportItem = [
    { type: "client_report" },
    {
      timestamp: timestamp || dateTimestampInSeconds(),
      discarded_events
    }
  ];
  return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
}

// node_modules/@sentry/utils/esm/ratelimit.js
var DEFAULT_RETRY_AFTER = 60 * 1e3;
function parseRetryAfterHeader(header, now = Date.now()) {
  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1e3;
  }
  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }
  return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, category) {
  return limits[category] || limits.all || 0;
}
function isRateLimited(limits, category, now = Date.now()) {
  return disabledUntil(limits, category) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = Date.now()) {
  const updatedRateLimits = {
    ...limits
  };
  const rateLimitHeader = headers && headers["x-sentry-rate-limits"];
  const retryAfterHeader = headers && headers["retry-after"];
  if (rateLimitHeader) {
    for (const limit of rateLimitHeader.trim().split(",")) {
      const [retryAfter, categories] = limit.split(":", 2);
      const headerDelay = parseInt(retryAfter, 10);
      const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
      if (!categories) {
        updatedRateLimits.all = now + delay;
      } else {
        for (const category of categories.split(";")) {
          updatedRateLimits[category] = now + delay;
        }
      }
    }
  } else if (retryAfterHeader) {
    updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
  } else if (statusCode === 429) {
    updatedRateLimits.all = now + 60 * 1e3;
  }
  return updatedRateLimits;
}

// node_modules/@sentry/utils/esm/eventbuilder.js
function parseStackFrames(stackParser, error) {
  return stackParser(error.stack || "", 1);
}
function exceptionFromError(stackParser, error) {
  const exception = {
    type: error.name || error.constructor.name,
    value: error.message
  };
  const frames = parseStackFrames(stackParser, error);
  if (frames.length) {
    exception.stacktrace = { frames };
  }
  return exception;
}

// node_modules/@sentry/utils/esm/buildPolyfills/_nullishCoalesce.js
function _nullishCoalesce(lhs, rhsFn) {
  return lhs != null ? lhs : rhsFn();
}

// node_modules/@sentry/utils/esm/buildPolyfills/_optionalChain.js
function _optionalChain(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}

// node_modules/@sentry/core/esm/debug-build.js
var DEBUG_BUILD2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/@sentry/core/esm/constants.js
var DEFAULT_ENVIRONMENT = "production";

// node_modules/@sentry/core/esm/eventProcessors.js
function getGlobalEventProcessors() {
  return getGlobalSingleton("globalEventProcessors", () => []);
}
function addGlobalEventProcessor(callback) {
  getGlobalEventProcessors().push(callback);
}
function notifyEventProcessors(processors, event, hint, index = 0) {
  return new SyncPromise((resolve2, reject) => {
    const processor = processors[index];
    if (event === null || typeof processor !== "function") {
      resolve2(event);
    } else {
      const result = processor({ ...event }, hint);
      DEBUG_BUILD2 && processor.id && result === null && logger.log(`Event processor "${processor.id}" dropped event`);
      if (isThenable(result)) {
        void result.then((final) => notifyEventProcessors(processors, final, hint, index + 1).then(resolve2)).then(null, reject);
      } else {
        void notifyEventProcessors(processors, result, hint, index + 1).then(resolve2).then(null, reject);
      }
    }
  });
}

// node_modules/@sentry/core/esm/session.js
function makeSession(context) {
  const startingTime = timestampInSeconds();
  const session = {
    sid: uuid4(),
    init: true,
    timestamp: startingTime,
    started: startingTime,
    duration: 0,
    status: "ok",
    errors: 0,
    ignoreDuration: false,
    toJSON: () => sessionToJSON(session)
  };
  if (context) {
    updateSession(session, context);
  }
  return session;
}
function updateSession(session, context = {}) {
  if (context.user) {
    if (!session.ipAddress && context.user.ip_address) {
      session.ipAddress = context.user.ip_address;
    }
    if (!session.did && !context.did) {
      session.did = context.user.id || context.user.email || context.user.username;
    }
  }
  session.timestamp = context.timestamp || timestampInSeconds();
  if (context.abnormal_mechanism) {
    session.abnormal_mechanism = context.abnormal_mechanism;
  }
  if (context.ignoreDuration) {
    session.ignoreDuration = context.ignoreDuration;
  }
  if (context.sid) {
    session.sid = context.sid.length === 32 ? context.sid : uuid4();
  }
  if (context.init !== void 0) {
    session.init = context.init;
  }
  if (!session.did && context.did) {
    session.did = `${context.did}`;
  }
  if (typeof context.started === "number") {
    session.started = context.started;
  }
  if (session.ignoreDuration) {
    session.duration = void 0;
  } else if (typeof context.duration === "number") {
    session.duration = context.duration;
  } else {
    const duration = session.timestamp - session.started;
    session.duration = duration >= 0 ? duration : 0;
  }
  if (context.release) {
    session.release = context.release;
  }
  if (context.environment) {
    session.environment = context.environment;
  }
  if (!session.ipAddress && context.ipAddress) {
    session.ipAddress = context.ipAddress;
  }
  if (!session.userAgent && context.userAgent) {
    session.userAgent = context.userAgent;
  }
  if (typeof context.errors === "number") {
    session.errors = context.errors;
  }
  if (context.status) {
    session.status = context.status;
  }
}
function closeSession(session, status) {
  let context = {};
  if (status) {
    context = { status };
  } else if (session.status === "ok") {
    context = { status: "exited" };
  }
  updateSession(session, context);
}
function sessionToJSON(session) {
  return dropUndefinedKeys({
    sid: `${session.sid}`,
    init: session.init,
    // Make sure that sec is converted to ms for date constructor
    started: new Date(session.started * 1e3).toISOString(),
    timestamp: new Date(session.timestamp * 1e3).toISOString(),
    status: session.status,
    errors: session.errors,
    did: typeof session.did === "number" || typeof session.did === "string" ? `${session.did}` : void 0,
    duration: session.duration,
    abnormal_mechanism: session.abnormal_mechanism,
    attrs: {
      release: session.release,
      environment: session.environment,
      ip_address: session.ipAddress,
      user_agent: session.userAgent
    }
  });
}

// node_modules/@sentry/core/esm/utils/spanUtils.js
var TRACE_FLAG_NONE = 0;
var TRACE_FLAG_SAMPLED = 1;
function spanToTraceContext(span) {
  const { spanId: span_id, traceId: trace_id } = span.spanContext();
  const { data, op, parent_span_id, status, tags, origin } = spanToJSON(span);
  return dropUndefinedKeys({
    data,
    op,
    parent_span_id,
    span_id,
    status,
    tags,
    trace_id,
    origin
  });
}
function spanToTraceHeader(span) {
  const { traceId, spanId } = span.spanContext();
  const sampled = spanIsSampled(span);
  return generateSentryTraceHeader(traceId, spanId, sampled);
}
function spanTimeInputToSeconds(input) {
  if (typeof input === "number") {
    return ensureTimestampInSeconds(input);
  }
  if (Array.isArray(input)) {
    return input[0] + input[1] / 1e9;
  }
  if (input instanceof Date) {
    return ensureTimestampInSeconds(input.getTime());
  }
  return timestampInSeconds();
}
function ensureTimestampInSeconds(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function spanToJSON(span) {
  if (spanIsSpanClass(span)) {
    return span.getSpanJSON();
  }
  if (typeof span.toJSON === "function") {
    return span.toJSON();
  }
  return {};
}
function spanIsSpanClass(span) {
  return typeof span.getSpanJSON === "function";
}
function spanIsSampled(span) {
  const { traceFlags } = span.spanContext();
  return Boolean(traceFlags & TRACE_FLAG_SAMPLED);
}

// node_modules/@sentry/core/esm/utils/prepareEvent.js
function prepareEvent(options, event, hint, scope, client, isolationScope) {
  const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
  const prepared = {
    ...event,
    event_id: event.event_id || hint.event_id || uuid4(),
    timestamp: event.timestamp || dateTimestampInSeconds()
  };
  const integrations = hint.integrations || options.integrations.map((i) => i.name);
  applyClientOptions(prepared, options);
  applyIntegrationsMetadata(prepared, integrations);
  if (event.type === void 0) {
    applyDebugIds(prepared, options.stackParser);
  }
  const finalScope = getFinalScope(scope, hint.captureContext);
  if (hint.mechanism) {
    addExceptionMechanism(prepared, hint.mechanism);
  }
  const clientEventProcessors = client && client.getEventProcessors ? client.getEventProcessors() : [];
  const data = getGlobalScope().getScopeData();
  if (isolationScope) {
    const isolationData = isolationScope.getScopeData();
    mergeScopeData(data, isolationData);
  }
  if (finalScope) {
    const finalScopeData = finalScope.getScopeData();
    mergeScopeData(data, finalScopeData);
  }
  const attachments = [...hint.attachments || [], ...data.attachments];
  if (attachments.length) {
    hint.attachments = attachments;
  }
  applyScopeDataToEvent(prepared, data);
  const eventProcessors = [
    ...clientEventProcessors,
    // eslint-disable-next-line deprecation/deprecation
    ...getGlobalEventProcessors(),
    // Run scope event processors _after_ all other processors
    ...data.eventProcessors
  ];
  const result = notifyEventProcessors(eventProcessors, prepared, hint);
  return result.then((evt) => {
    if (evt) {
      applyDebugMeta(evt);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
    }
    return evt;
  });
}
function applyClientOptions(event, options) {
  const { environment, release, dist, maxValueLength = 250 } = options;
  if (!("environment" in event)) {
    event.environment = "environment" in options ? environment : DEFAULT_ENVIRONMENT;
  }
  if (event.release === void 0 && release !== void 0) {
    event.release = release;
  }
  if (event.dist === void 0 && dist !== void 0) {
    event.dist = dist;
  }
  if (event.message) {
    event.message = truncate(event.message, maxValueLength);
  }
  const exception = event.exception && event.exception.values && event.exception.values[0];
  if (exception && exception.value) {
    exception.value = truncate(exception.value, maxValueLength);
  }
  const request = event.request;
  if (request && request.url) {
    request.url = truncate(request.url, maxValueLength);
  }
}
var debugIdStackParserCache = /* @__PURE__ */ new WeakMap();
function applyDebugIds(event, stackParser) {
  const debugIdMap = GLOBAL_OBJ._sentryDebugIds;
  if (!debugIdMap) {
    return;
  }
  let debugIdStackFramesCache;
  const cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
  if (cachedDebugIdStackFrameCache) {
    debugIdStackFramesCache = cachedDebugIdStackFrameCache;
  } else {
    debugIdStackFramesCache = /* @__PURE__ */ new Map();
    debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
  }
  const filenameDebugIdMap = Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
    let parsedStack;
    const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
    if (cachedParsedStack) {
      parsedStack = cachedParsedStack;
    } else {
      parsedStack = stackParser(debugIdStackTrace);
      debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
    }
    for (let i = parsedStack.length - 1; i >= 0; i--) {
      const stackFrame = parsedStack[i];
      if (stackFrame.filename) {
        acc[stackFrame.filename] = debugIdMap[debugIdStackTrace];
        break;
      }
    }
    return acc;
  }, {});
  try {
    event.exception.values.forEach((exception) => {
      exception.stacktrace.frames.forEach((frame) => {
        if (frame.filename) {
          frame.debug_id = filenameDebugIdMap[frame.filename];
        }
      });
    });
  } catch (e2) {
  }
}
function applyDebugMeta(event) {
  const filenameDebugIdMap = {};
  try {
    event.exception.values.forEach((exception) => {
      exception.stacktrace.frames.forEach((frame) => {
        if (frame.debug_id) {
          if (frame.abs_path) {
            filenameDebugIdMap[frame.abs_path] = frame.debug_id;
          } else if (frame.filename) {
            filenameDebugIdMap[frame.filename] = frame.debug_id;
          }
          delete frame.debug_id;
        }
      });
    });
  } catch (e2) {
  }
  if (Object.keys(filenameDebugIdMap).length === 0) {
    return;
  }
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;
  Object.keys(filenameDebugIdMap).forEach((filename) => {
    images.push({
      type: "sourcemap",
      code_file: filename,
      debug_id: filenameDebugIdMap[filename]
    });
  });
}
function applyIntegrationsMetadata(event, integrationNames) {
  if (integrationNames.length > 0) {
    event.sdk = event.sdk || {};
    event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
  }
}
function normalizeEvent(event, depth, maxBreadth) {
  if (!event) {
    return null;
  }
  const normalized = {
    ...event,
    ...event.breadcrumbs && {
      breadcrumbs: event.breadcrumbs.map((b) => ({
        ...b,
        ...b.data && {
          data: normalize(b.data, depth, maxBreadth)
        }
      }))
    },
    ...event.user && {
      user: normalize(event.user, depth, maxBreadth)
    },
    ...event.contexts && {
      contexts: normalize(event.contexts, depth, maxBreadth)
    },
    ...event.extra && {
      extra: normalize(event.extra, depth, maxBreadth)
    }
  };
  if (event.contexts && event.contexts.trace && normalized.contexts) {
    normalized.contexts.trace = event.contexts.trace;
    if (event.contexts.trace.data) {
      normalized.contexts.trace.data = normalize(event.contexts.trace.data, depth, maxBreadth);
    }
  }
  if (event.spans) {
    normalized.spans = event.spans.map((span) => {
      const data = spanToJSON(span).data;
      if (data) {
        span.data = normalize(data, depth, maxBreadth);
      }
      return span;
    });
  }
  return normalized;
}
function getFinalScope(scope, captureContext) {
  if (!captureContext) {
    return scope;
  }
  const finalScope = scope ? scope.clone() : new Scope();
  finalScope.update(captureContext);
  return finalScope;
}
function parseEventHintOrCaptureContext(hint) {
  if (!hint) {
    return void 0;
  }
  if (hintIsScopeOrFunction(hint)) {
    return { captureContext: hint };
  }
  if (hintIsScopeContext(hint)) {
    return {
      captureContext: hint
    };
  }
  return hint;
}
function hintIsScopeOrFunction(hint) {
  return hint instanceof Scope || typeof hint === "function";
}
var captureContextKeys = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "requestSession",
  "propagationContext"
];
function hintIsScopeContext(hint) {
  return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}

// node_modules/@sentry/core/esm/exports.js
function captureException(exception, hint) {
  return getCurrentHub().captureException(exception, parseEventHintOrCaptureContext(hint));
}
function captureMessage(message, captureContext) {
  const level = typeof captureContext === "string" ? captureContext : void 0;
  const context = typeof captureContext !== "string" ? { captureContext } : void 0;
  return getCurrentHub().captureMessage(message, level, context);
}
function captureEvent(event, hint) {
  return getCurrentHub().captureEvent(event, hint);
}
function configureScope(callback) {
  getCurrentHub().configureScope(callback);
}
function addBreadcrumb(breadcrumb, hint) {
  getCurrentHub().addBreadcrumb(breadcrumb, hint);
}
function setContext(name, context) {
  getCurrentHub().setContext(name, context);
}
function setExtras(extras) {
  getCurrentHub().setExtras(extras);
}
function setExtra(key, extra) {
  getCurrentHub().setExtra(key, extra);
}
function setTags(tags) {
  getCurrentHub().setTags(tags);
}
function setTag(key, value) {
  getCurrentHub().setTag(key, value);
}
function setUser(user) {
  getCurrentHub().setUser(user);
}
function withScope(...rest) {
  const hub = getCurrentHub();
  if (rest.length === 2) {
    const [scope, callback] = rest;
    if (!scope) {
      return hub.withScope(callback);
    }
    return hub.withScope(() => {
      hub.getStackTop().scope = scope;
      return callback(scope);
    });
  }
  return hub.withScope(rest[0]);
}
function withIsolationScope(callback) {
  return runWithAsyncContext(() => {
    return callback(getIsolationScope());
  });
}
function withActiveSpan(span, callback) {
  return withScope((scope) => {
    scope.setSpan(span);
    return callback(scope);
  });
}
function startTransaction(context, customSamplingContext) {
  return getCurrentHub().startTransaction({ ...context }, customSamplingContext);
}
async function flush(timeout) {
  const client = getClient();
  if (client) {
    return client.flush(timeout);
  }
  DEBUG_BUILD2 && logger.warn("Cannot flush events. No client defined.");
  return Promise.resolve(false);
}
async function close(timeout) {
  const client = getClient();
  if (client) {
    return client.close(timeout);
  }
  DEBUG_BUILD2 && logger.warn("Cannot flush events and disable SDK. No client defined.");
  return Promise.resolve(false);
}
function lastEventId() {
  return getCurrentHub().lastEventId();
}
function getClient() {
  return getCurrentHub().getClient();
}
function isInitialized() {
  return !!getClient();
}
function getCurrentScope() {
  return getCurrentHub().getScope();
}
function startSession(context) {
  const client = getClient();
  const isolationScope = getIsolationScope();
  const currentScope = getCurrentScope();
  const { release, environment = DEFAULT_ENVIRONMENT } = client && client.getOptions() || {};
  const { userAgent } = GLOBAL_OBJ.navigator || {};
  const session = makeSession({
    release,
    environment,
    user: currentScope.getUser() || isolationScope.getUser(),
    ...userAgent && { userAgent },
    ...context
  });
  const currentSession = isolationScope.getSession();
  if (currentSession && currentSession.status === "ok") {
    updateSession(currentSession, { status: "exited" });
  }
  endSession();
  isolationScope.setSession(session);
  currentScope.setSession(session);
  return session;
}
function endSession() {
  const isolationScope = getIsolationScope();
  const currentScope = getCurrentScope();
  const session = currentScope.getSession() || isolationScope.getSession();
  if (session) {
    closeSession(session);
  }
  _sendSessionUpdate();
  isolationScope.setSession();
  currentScope.setSession();
}
function _sendSessionUpdate() {
  const isolationScope = getIsolationScope();
  const currentScope = getCurrentScope();
  const client = getClient();
  const session = currentScope.getSession() || isolationScope.getSession();
  if (session && client && client.captureSession) {
    client.captureSession(session);
  }
}
function captureSession(end = false) {
  if (end) {
    endSession();
    return;
  }
  _sendSessionUpdate();
}

// node_modules/@sentry/core/esm/utils/getRootSpan.js
function getRootSpan(span) {
  return span.transaction;
}

// node_modules/@sentry/core/esm/tracing/dynamicSamplingContext.js
function getDynamicSamplingContextFromClient(trace_id, client, scope) {
  const options = client.getOptions();
  const { publicKey: public_key } = client.getDsn() || {};
  const { segment: user_segment } = scope && scope.getUser() || {};
  const dsc = dropUndefinedKeys({
    environment: options.environment || DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment,
    public_key,
    trace_id
  });
  client.emit && client.emit("createDsc", dsc);
  return dsc;
}
function getDynamicSamplingContextFromSpan(span) {
  const client = getClient();
  if (!client) {
    return {};
  }
  const dsc = getDynamicSamplingContextFromClient(spanToJSON(span).trace_id || "", client, getCurrentScope());
  const txn = getRootSpan(span);
  if (!txn) {
    return dsc;
  }
  const v7FrozenDsc = txn && txn._frozenDynamicSamplingContext;
  if (v7FrozenDsc) {
    return v7FrozenDsc;
  }
  const { sampleRate: maybeSampleRate, source } = txn.metadata;
  if (maybeSampleRate != null) {
    dsc.sample_rate = `${maybeSampleRate}`;
  }
  const jsonSpan = spanToJSON(txn);
  if (source && source !== "url") {
    dsc.transaction = jsonSpan.description;
  }
  dsc.sampled = String(spanIsSampled(txn));
  client.emit && client.emit("createDsc", dsc);
  return dsc;
}

// node_modules/@sentry/core/esm/utils/applyScopeDataToEvent.js
function applyScopeDataToEvent(event, data) {
  const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
  applyDataToEvent(event, data);
  if (span) {
    applySpanToEvent(event, span);
  }
  applyFingerprintToEvent(event, fingerprint);
  applyBreadcrumbsToEvent(event, breadcrumbs);
  applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
function mergeScopeData(data, mergeData) {
  const {
    extra,
    tags,
    user,
    contexts,
    level,
    sdkProcessingMetadata,
    breadcrumbs,
    fingerprint,
    eventProcessors,
    attachments,
    propagationContext,
    // eslint-disable-next-line deprecation/deprecation
    transactionName,
    span
  } = mergeData;
  mergeAndOverwriteScopeData(data, "extra", extra);
  mergeAndOverwriteScopeData(data, "tags", tags);
  mergeAndOverwriteScopeData(data, "user", user);
  mergeAndOverwriteScopeData(data, "contexts", contexts);
  mergeAndOverwriteScopeData(data, "sdkProcessingMetadata", sdkProcessingMetadata);
  if (level) {
    data.level = level;
  }
  if (transactionName) {
    data.transactionName = transactionName;
  }
  if (span) {
    data.span = span;
  }
  if (breadcrumbs.length) {
    data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
  }
  if (fingerprint.length) {
    data.fingerprint = [...data.fingerprint, ...fingerprint];
  }
  if (eventProcessors.length) {
    data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
  }
  if (attachments.length) {
    data.attachments = [...data.attachments, ...attachments];
  }
  data.propagationContext = { ...data.propagationContext, ...propagationContext };
}
function mergeAndOverwriteScopeData(data, prop, mergeVal) {
  if (mergeVal && Object.keys(mergeVal).length) {
    data[prop] = { ...data[prop] };
    for (const key in mergeVal) {
      if (Object.prototype.hasOwnProperty.call(mergeVal, key)) {
        data[prop][key] = mergeVal[key];
      }
    }
  }
}
function applyDataToEvent(event, data) {
  const {
    extra,
    tags,
    user,
    contexts,
    level,
    // eslint-disable-next-line deprecation/deprecation
    transactionName
  } = data;
  const cleanedExtra = dropUndefinedKeys(extra);
  if (cleanedExtra && Object.keys(cleanedExtra).length) {
    event.extra = { ...cleanedExtra, ...event.extra };
  }
  const cleanedTags = dropUndefinedKeys(tags);
  if (cleanedTags && Object.keys(cleanedTags).length) {
    event.tags = { ...cleanedTags, ...event.tags };
  }
  const cleanedUser = dropUndefinedKeys(user);
  if (cleanedUser && Object.keys(cleanedUser).length) {
    event.user = { ...cleanedUser, ...event.user };
  }
  const cleanedContexts = dropUndefinedKeys(contexts);
  if (cleanedContexts && Object.keys(cleanedContexts).length) {
    event.contexts = { ...cleanedContexts, ...event.contexts };
  }
  if (level) {
    event.level = level;
  }
  if (transactionName) {
    event.transaction = transactionName;
  }
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
  const mergedBreadcrumbs = [...event.breadcrumbs || [], ...breadcrumbs];
  event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : void 0;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
  event.sdkProcessingMetadata = {
    ...event.sdkProcessingMetadata,
    ...sdkProcessingMetadata
  };
}
function applySpanToEvent(event, span) {
  event.contexts = { trace: spanToTraceContext(span), ...event.contexts };
  const rootSpan = getRootSpan(span);
  if (rootSpan) {
    event.sdkProcessingMetadata = {
      dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
      ...event.sdkProcessingMetadata
    };
    const transactionName = spanToJSON(rootSpan).description;
    if (transactionName) {
      event.tags = { transaction: transactionName, ...event.tags };
    }
  }
}
function applyFingerprintToEvent(event, fingerprint) {
  event.fingerprint = event.fingerprint ? arrayify(event.fingerprint) : [];
  if (fingerprint) {
    event.fingerprint = event.fingerprint.concat(fingerprint);
  }
  if (event.fingerprint && !event.fingerprint.length) {
    delete event.fingerprint;
  }
}

// node_modules/@sentry/core/esm/scope.js
var DEFAULT_MAX_BREADCRUMBS = 100;
var globalScope;
var Scope = class _Scope {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called after {@link applyToEvent}. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  // eslint-disable-next-line deprecation/deprecation
  /**
   * Transaction Name
   */
  /** Span */
  /** Session */
  /** Request Mode Session Status */
  /** The client on this scope */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
    this._propagationContext = generatePropagationContext();
  }
  /**
   * Inherit values from the parent scope.
   * @deprecated Use `scope.clone()` and `new Scope()` instead.
   */
  static clone(scope) {
    return scope ? scope.clone() : new _Scope();
  }
  /**
   * Clone this scope instance.
   */
  clone() {
    const newScope = new _Scope();
    newScope._breadcrumbs = [...this._breadcrumbs];
    newScope._tags = { ...this._tags };
    newScope._extra = { ...this._extra };
    newScope._contexts = { ...this._contexts };
    newScope._user = this._user;
    newScope._level = this._level;
    newScope._span = this._span;
    newScope._session = this._session;
    newScope._transactionName = this._transactionName;
    newScope._fingerprint = this._fingerprint;
    newScope._eventProcessors = [...this._eventProcessors];
    newScope._requestSession = this._requestSession;
    newScope._attachments = [...this._attachments];
    newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
    newScope._propagationContext = { ...this._propagationContext };
    newScope._client = this._client;
    return newScope;
  }
  /** Update the client on the scope. */
  setClient(client) {
    this._client = client;
  }
  /**
   * Get the client assigned to this scope.
   *
   * It is generally recommended to use the global function `Sentry.getClient()` instead, unless you know what you are doing.
   */
  getClient() {
    return this._client;
  }
  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */
  addScopeListener(callback) {
    this._scopeListeners.push(callback);
  }
  /**
   * @inheritDoc
   */
  addEventProcessor(callback) {
    this._eventProcessors.push(callback);
    return this;
  }
  /**
   * @inheritDoc
   */
  setUser(user) {
    this._user = user || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      segment: void 0,
      username: void 0
    };
    if (this._session) {
      updateSession(this._session, { user });
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getUser() {
    return this._user;
  }
  /**
   * @inheritDoc
   */
  getRequestSession() {
    return this._requestSession;
  }
  /**
   * @inheritDoc
   */
  setRequestSession(requestSession) {
    this._requestSession = requestSession;
    return this;
  }
  /**
   * @inheritDoc
   */
  setTags(tags) {
    this._tags = {
      ...this._tags,
      ...tags
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setTag(key, value) {
    this._tags = { ...this._tags, [key]: value };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setExtras(extras) {
    this._extra = {
      ...this._extra,
      ...extras
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setExtra(key, extra) {
    this._extra = { ...this._extra, [key]: extra };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setFingerprint(fingerprint) {
    this._fingerprint = fingerprint;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setLevel(level) {
    this._level = level;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the transaction name on the scope for future events.
   */
  setTransactionName(name) {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setContext(key, context) {
    if (context === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Sets the Span on the scope.
   * @param span Span
   * @deprecated Instead of setting a span on a scope, use `startSpan()`/`startSpanManual()` instead.
   */
  setSpan(span) {
    this._span = span;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * Returns the `Span` if there is one.
   * @deprecated Use `getActiveSpan()` instead.
   */
  getSpan() {
    return this._span;
  }
  /**
   * Returns the `Transaction` attached to the scope (if there is one).
   * @deprecated You should not rely on the transaction, but just use `startSpan()` APIs instead.
   */
  getTransaction() {
    const span = this._span;
    return span && span.transaction;
  }
  /**
   * @inheritDoc
   */
  setSession(session) {
    if (!session) {
      delete this._session;
    } else {
      this._session = session;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getSession() {
    return this._session;
  }
  /**
   * @inheritDoc
   */
  update(captureContext) {
    if (!captureContext) {
      return this;
    }
    const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
    if (scopeToMerge instanceof _Scope) {
      const scopeData = scopeToMerge.getScopeData();
      this._tags = { ...this._tags, ...scopeData.tags };
      this._extra = { ...this._extra, ...scopeData.extra };
      this._contexts = { ...this._contexts, ...scopeData.contexts };
      if (scopeData.user && Object.keys(scopeData.user).length) {
        this._user = scopeData.user;
      }
      if (scopeData.level) {
        this._level = scopeData.level;
      }
      if (scopeData.fingerprint.length) {
        this._fingerprint = scopeData.fingerprint;
      }
      if (scopeToMerge.getRequestSession()) {
        this._requestSession = scopeToMerge.getRequestSession();
      }
      if (scopeData.propagationContext) {
        this._propagationContext = scopeData.propagationContext;
      }
    } else if (isPlainObject(scopeToMerge)) {
      const scopeContext = captureContext;
      this._tags = { ...this._tags, ...scopeContext.tags };
      this._extra = { ...this._extra, ...scopeContext.extra };
      this._contexts = { ...this._contexts, ...scopeContext.contexts };
      if (scopeContext.user) {
        this._user = scopeContext.user;
      }
      if (scopeContext.level) {
        this._level = scopeContext.level;
      }
      if (scopeContext.fingerprint) {
        this._fingerprint = scopeContext.fingerprint;
      }
      if (scopeContext.requestSession) {
        this._requestSession = scopeContext.requestSession;
      }
      if (scopeContext.propagationContext) {
        this._propagationContext = scopeContext.propagationContext;
      }
    }
    return this;
  }
  /**
   * @inheritDoc
   */
  clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = void 0;
    this._transactionName = void 0;
    this._fingerprint = void 0;
    this._requestSession = void 0;
    this._span = void 0;
    this._session = void 0;
    this._notifyScopeListeners();
    this._attachments = [];
    this._propagationContext = generatePropagationContext();
    return this;
  }
  /**
   * @inheritDoc
   */
  addBreadcrumb(breadcrumb, maxBreadcrumbs) {
    const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
    if (maxCrumbs <= 0) {
      return this;
    }
    const mergedBreadcrumb = {
      timestamp: dateTimestampInSeconds(),
      ...breadcrumb
    };
    const breadcrumbs = this._breadcrumbs;
    breadcrumbs.push(mergedBreadcrumb);
    this._breadcrumbs = breadcrumbs.length > maxCrumbs ? breadcrumbs.slice(-maxCrumbs) : breadcrumbs;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * @inheritDoc
   */
  clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  addAttachment(attachment) {
    this._attachments.push(attachment);
    return this;
  }
  /**
   * @inheritDoc
   * @deprecated Use `getScopeData()` instead.
   */
  getAttachments() {
    const data = this.getScopeData();
    return data.attachments;
  }
  /**
   * @inheritDoc
   */
  clearAttachments() {
    this._attachments = [];
    return this;
  }
  /** @inheritDoc */
  getScopeData() {
    const {
      _breadcrumbs,
      _attachments,
      _contexts,
      _tags,
      _extra,
      _user,
      _level,
      _fingerprint,
      _eventProcessors,
      _propagationContext,
      _sdkProcessingMetadata,
      _transactionName,
      _span
    } = this;
    return {
      breadcrumbs: _breadcrumbs,
      attachments: _attachments,
      contexts: _contexts,
      tags: _tags,
      extra: _extra,
      user: _user,
      level: _level,
      fingerprint: _fingerprint || [],
      eventProcessors: _eventProcessors,
      propagationContext: _propagationContext,
      sdkProcessingMetadata: _sdkProcessingMetadata,
      transactionName: _transactionName,
      span: _span
    };
  }
  /**
   * Applies data from the scope to the event and runs all event processors on it.
   *
   * @param event Event
   * @param hint Object containing additional information about the original exception, for use by the event processors.
   * @hidden
   * @deprecated Use `applyScopeDataToEvent()` directly
   */
  applyToEvent(event, hint = {}, additionalEventProcessors = []) {
    applyScopeDataToEvent(event, this.getScopeData());
    const eventProcessors = [
      ...additionalEventProcessors,
      // eslint-disable-next-line deprecation/deprecation
      ...getGlobalEventProcessors(),
      ...this._eventProcessors
    ];
    return notifyEventProcessors(eventProcessors, event, hint);
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry
   */
  setSDKProcessingMetadata(newData) {
    this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...newData };
    return this;
  }
  /**
   * @inheritDoc
   */
  setPropagationContext(context) {
    this._propagationContext = context;
    return this;
  }
  /**
   * @inheritDoc
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Capture an exception for this scope.
   *
   * @param exception The exception to capture.
   * @param hint Optinal additional data to attach to the Sentry event.
   * @returns the id of the captured Sentry event.
   */
  captureException(exception, hint) {
    const eventId = hint && hint.event_id ? hint.event_id : uuid4();
    if (!this._client) {
      logger.warn("No client configured on scope - will not capture exception!");
      return eventId;
    }
    const syntheticException = new Error("Sentry syntheticException");
    this._client.captureException(
      exception,
      {
        originalException: exception,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Capture a message for this scope.
   *
   * @param message The message to capture.
   * @param level An optional severity level to report the message with.
   * @param hint Optional additional data to attach to the Sentry event.
   * @returns the id of the captured message.
   */
  captureMessage(message, level, hint) {
    const eventId = hint && hint.event_id ? hint.event_id : uuid4();
    if (!this._client) {
      logger.warn("No client configured on scope - will not capture message!");
      return eventId;
    }
    const syntheticException = new Error(message);
    this._client.captureMessage(
      message,
      level,
      {
        originalException: message,
        syntheticException,
        ...hint,
        event_id: eventId
      },
      this
    );
    return eventId;
  }
  /**
   * Captures a manually created event for this scope and sends it to Sentry.
   *
   * @param exception The event to capture.
   * @param hint Optional additional data to attach to the Sentry event.
   * @returns the id of the captured event.
   */
  captureEvent(event, hint) {
    const eventId = hint && hint.event_id ? hint.event_id : uuid4();
    if (!this._client) {
      logger.warn("No client configured on scope - will not capture event!");
      return eventId;
    }
    this._client.captureEvent(event, { ...hint, event_id: eventId }, this);
    return eventId;
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach((callback) => {
        callback(this);
      });
      this._notifyingListeners = false;
    }
  }
};
function getGlobalScope() {
  if (!globalScope) {
    globalScope = new Scope();
  }
  return globalScope;
}
function generatePropagationContext() {
  return {
    traceId: uuid4(),
    spanId: uuid4().substring(16)
  };
}

// node_modules/@sentry/core/esm/version.js
var SDK_VERSION = "7.107.0";

// node_modules/@sentry/core/esm/hub.js
var API_VERSION = parseFloat(SDK_VERSION);
var DEFAULT_BREADCRUMBS = 100;
var Hub = class {
  /** Is a {@link Layer}[] containing the client and scope */
  /** Contains the last event id of a captured event.  */
  /**
   * Creates a new instance of the hub, will push one {@link Layer} into the
   * internal stack on creation.
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   * @param version number, higher number means higher priority.
   *
   * @deprecated Instantiation of Hub objects is deprecated and the constructor will be removed in version 8 of the SDK.
   *
   * If you are currently using the Hub for multi-client use like so:
   *
   * ```
   * // OLD
   * const hub = new Hub();
   * hub.bindClient(client);
   * makeMain(hub)
   * ```
   *
   * instead initialize the client as follows:
   *
   * ```
   * // NEW
   * Sentry.withIsolationScope(() => {
   *    Sentry.setCurrentClient(client);
   *    client.init();
   * });
   * ```
   *
   * If you are using the Hub to capture events like so:
   *
   * ```
   * // OLD
   * const client = new Client();
   * const hub = new Hub(client);
   * hub.captureException()
   * ```
   *
   * instead capture isolated events as follows:
   *
   * ```
   * // NEW
   * const client = new Client();
   * const scope = new Scope();
   * scope.setClient(client);
   * scope.captureException();
   * ```
   */
  constructor(client, scope, isolationScope, _version = API_VERSION) {
    this._version = _version;
    let assignedScope;
    if (!scope) {
      assignedScope = new Scope();
      assignedScope.setClient(client);
    } else {
      assignedScope = scope;
    }
    let assignedIsolationScope;
    if (!isolationScope) {
      assignedIsolationScope = new Scope();
      assignedIsolationScope.setClient(client);
    } else {
      assignedIsolationScope = isolationScope;
    }
    this._stack = [{ scope: assignedScope }];
    if (client) {
      this.bindClient(client);
    }
    this._isolationScope = assignedIsolationScope;
  }
  /**
   * Checks if this hub's version is older than the given version.
   *
   * @param version A version number to compare to.
   * @return True if the given version is newer; otherwise false.
   *
   * @deprecated This will be removed in v8.
   */
  isOlderThan(version2) {
    return this._version < version2;
  }
  /**
   * This binds the given client to the current scope.
   * @param client An SDK client (client) instance.
   *
   * @deprecated Use `initAndBind()` directly, or `setCurrentClient()` and/or `client.init()` instead.
   */
  bindClient(client) {
    const top = this.getStackTop();
    top.client = client;
    top.scope.setClient(client);
    if (client && client.setupIntegrations) {
      client.setupIntegrations();
    }
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `withScope` instead.
   */
  pushScope() {
    const scope = this.getScope().clone();
    this.getStack().push({
      // eslint-disable-next-line deprecation/deprecation
      client: this.getClient(),
      scope
    });
    return scope;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `withScope` instead.
   */
  popScope() {
    if (this.getStack().length <= 1)
      return false;
    return !!this.getStack().pop();
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `Sentry.withScope()` instead.
   */
  withScope(callback) {
    const scope = this.pushScope();
    let maybePromiseResult;
    try {
      maybePromiseResult = callback(scope);
    } catch (e2) {
      this.popScope();
      throw e2;
    }
    if (isThenable(maybePromiseResult)) {
      return maybePromiseResult.then(
        (res) => {
          this.popScope();
          return res;
        },
        (e2) => {
          this.popScope();
          throw e2;
        }
      );
    }
    this.popScope();
    return maybePromiseResult;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `Sentry.getClient()` instead.
   */
  getClient() {
    return this.getStackTop().client;
  }
  /**
   * Returns the scope of the top stack.
   *
   * @deprecated Use `Sentry.getCurrentScope()` instead.
   */
  getScope() {
    return this.getStackTop().scope;
  }
  /**
   * @deprecated Use `Sentry.getIsolationScope()` instead.
   */
  getIsolationScope() {
    return this._isolationScope;
  }
  /**
   * Returns the scope stack for domains or the process.
   * @deprecated This will be removed in v8.
   */
  getStack() {
    return this._stack;
  }
  /**
   * Returns the topmost scope layer in the order domain > local > process.
   * @deprecated This will be removed in v8.
   */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `Sentry.captureException()` instead.
   */
  captureException(exception, hint) {
    const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
    const syntheticException = new Error("Sentry syntheticException");
    this.getScope().captureException(exception, {
      originalException: exception,
      syntheticException,
      ...hint,
      event_id: eventId
    });
    return eventId;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use  `Sentry.captureMessage()` instead.
   */
  captureMessage(message, level, hint) {
    const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
    const syntheticException = new Error(message);
    this.getScope().captureMessage(message, level, {
      originalException: message,
      syntheticException,
      ...hint,
      event_id: eventId
    });
    return eventId;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `Sentry.captureEvent()` instead.
   */
  captureEvent(event, hint) {
    const eventId = hint && hint.event_id ? hint.event_id : uuid4();
    if (!event.type) {
      this._lastEventId = eventId;
    }
    this.getScope().captureEvent(event, { ...hint, event_id: eventId });
    return eventId;
  }
  /**
   * @inheritDoc
   *
   * @deprecated This will be removed in v8.
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `Sentry.addBreadcrumb()` instead.
   */
  addBreadcrumb(breadcrumb, hint) {
    const { scope, client } = this.getStackTop();
    if (!client)
      return;
    const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions && client.getOptions() || {};
    if (maxBreadcrumbs <= 0)
      return;
    const timestamp = dateTimestampInSeconds();
    const mergedBreadcrumb = { timestamp, ...breadcrumb };
    const finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
    if (finalBreadcrumb === null)
      return;
    if (client.emit) {
      client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
    }
    scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setUser()` instead.
   */
  setUser(user) {
    this.getScope().setUser(user);
    this.getIsolationScope().setUser(user);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setTags()` instead.
   */
  setTags(tags) {
    this.getScope().setTags(tags);
    this.getIsolationScope().setTags(tags);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setExtras()` instead.
   */
  setExtras(extras) {
    this.getScope().setExtras(extras);
    this.getIsolationScope().setExtras(extras);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setTag()` instead.
   */
  setTag(key, value) {
    this.getScope().setTag(key, value);
    this.getIsolationScope().setTag(key, value);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setExtra()` instead.
   */
  setExtra(key, extra) {
    this.getScope().setExtra(key, extra);
    this.getIsolationScope().setExtra(key, extra);
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.setContext()` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContext(name, context) {
    this.getScope().setContext(name, context);
    this.getIsolationScope().setContext(name, context);
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `getScope()` directly.
   */
  configureScope(callback) {
    const { scope, client } = this.getStackTop();
    if (client) {
      callback(scope);
    }
  }
  /**
   * @inheritDoc
   */
  run(callback) {
    const oldHub = makeMain(this);
    try {
      callback(this);
    } finally {
      makeMain(oldHub);
    }
  }
  /**
   * @inheritDoc
   * @deprecated Use `Sentry.getClient().getIntegrationByName()` instead.
   */
  getIntegration(integration) {
    const client = this.getClient();
    if (!client)
      return null;
    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      DEBUG_BUILD2 && logger.warn(`Cannot retrieve integration ${integration.id} from the current Hub`);
      return null;
    }
  }
  /**
   * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
   *
   * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
   * new child span within the transaction or any span, call the respective `.startChild()` method.
   *
   * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
   *
   * The transaction must be finished with a call to its `.end()` method, at which point the transaction with all its
   * finished child spans will be sent to Sentry.
   *
   * @param context Properties of the new `Transaction`.
   * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
   * default values). See {@link Options.tracesSampler}.
   *
   * @returns The transaction which was just started
   *
   * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
   */
  startTransaction(context, customSamplingContext) {
    const result = this._callExtensionMethod("startTransaction", context, customSamplingContext);
    if (DEBUG_BUILD2 && !result) {
      const client = this.getClient();
      if (!client) {
        logger.warn(
          "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'"
        );
      } else {
        logger.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
      }
    }
    return result;
  }
  /**
   * @inheritDoc
   * @deprecated Use `spanToTraceHeader()` instead.
   */
  traceHeaders() {
    return this._callExtensionMethod("traceHeaders");
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use top level `captureSession` instead.
   */
  captureSession(endSession2 = false) {
    if (endSession2) {
      return this.endSession();
    }
    this._sendSessionUpdate();
  }
  /**
   * @inheritDoc
   * @deprecated Use top level `endSession` instead.
   */
  endSession() {
    const layer = this.getStackTop();
    const scope = layer.scope;
    const session = scope.getSession();
    if (session) {
      closeSession(session);
    }
    this._sendSessionUpdate();
    scope.setSession();
  }
  /**
   * @inheritDoc
   * @deprecated Use top level `startSession` instead.
   */
  startSession(context) {
    const { scope, client } = this.getStackTop();
    const { release, environment = DEFAULT_ENVIRONMENT } = client && client.getOptions() || {};
    const { userAgent } = GLOBAL_OBJ.navigator || {};
    const session = makeSession({
      release,
      environment,
      user: scope.getUser(),
      ...userAgent && { userAgent },
      ...context
    });
    const currentSession = scope.getSession && scope.getSession();
    if (currentSession && currentSession.status === "ok") {
      updateSession(currentSession, { status: "exited" });
    }
    this.endSession();
    scope.setSession(session);
    return session;
  }
  /**
   * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
   * when Tracing is used.
   *
   * @deprecated Use top-level `getClient().getOptions().sendDefaultPii` instead. This function
   * only unnecessarily increased API surface but only wrapped accessing the option.
   */
  shouldSendDefaultPii() {
    const client = this.getClient();
    const options = client && client.getOptions();
    return Boolean(options && options.sendDefaultPii);
  }
  /**
   * Sends the current Session on the scope
   */
  _sendSessionUpdate() {
    const { scope, client } = this.getStackTop();
    const session = scope.getSession();
    if (session && client && client.captureSession) {
      client.captureSession(session);
    }
  }
  /**
   * Calls global extension method and binding current instance to the function call
   */
  // @ts-expect-error Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _callExtensionMethod(method, ...args) {
    const carrier = getMainCarrier();
    const sentry = carrier.__SENTRY__;
    if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
      return sentry.extensions[method].apply(this, args);
    }
    DEBUG_BUILD2 && logger.warn(`Extension method ${method} couldn't be found, doing nothing.`);
  }
};
function getMainCarrier() {
  GLOBAL_OBJ.__SENTRY__ = GLOBAL_OBJ.__SENTRY__ || {
    extensions: {},
    hub: void 0
  };
  return GLOBAL_OBJ;
}
function makeMain(hub) {
  const registry = getMainCarrier();
  const oldHub = getHubFromCarrier(registry);
  setHubOnCarrier(registry, hub);
  return oldHub;
}
function getCurrentHub() {
  const registry = getMainCarrier();
  if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
    const hub = registry.__SENTRY__.acs.getCurrentHub();
    if (hub) {
      return hub;
    }
  }
  return getGlobalHub(registry);
}
function getIsolationScope() {
  return getCurrentHub().getIsolationScope();
}
function getGlobalHub(registry = getMainCarrier()) {
  if (!hasHubOnCarrier(registry) || // eslint-disable-next-line deprecation/deprecation
  getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
    setHubOnCarrier(registry, new Hub());
  }
  return getHubFromCarrier(registry);
}
function runWithAsyncContext(callback, options = {}) {
  const registry = getMainCarrier();
  if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
    return registry.__SENTRY__.acs.runWithAsyncContext(callback, options);
  }
  return callback();
}
function hasHubOnCarrier(carrier) {
  return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
}
function getHubFromCarrier(carrier) {
  return getGlobalSingleton("hub", () => new Hub(), carrier);
}
function setHubOnCarrier(carrier, hub) {
  if (!carrier)
    return false;
  const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.hub = hub;
  return true;
}

// node_modules/@sentry/core/esm/tracing/utils.js
function getActiveTransaction(maybeHub) {
  const hub = maybeHub || getCurrentHub();
  const scope = hub.getScope();
  return scope.getTransaction();
}
var extractTraceparentData2 = extractTraceparentData;

// node_modules/@sentry/core/esm/tracing/errors.js
var errorsInstrumented = false;
function registerErrorInstrumentation() {
  if (errorsInstrumented) {
    return;
  }
  errorsInstrumented = true;
  addGlobalErrorInstrumentationHandler(errorCallback);
  addGlobalUnhandledRejectionInstrumentationHandler(errorCallback);
}
function errorCallback() {
  const activeTransaction3 = getActiveTransaction();
  if (activeTransaction3) {
    const status = "internal_error";
    DEBUG_BUILD2 && logger.log(`[Tracing] Transaction: ${status} -> Global error occured`);
    activeTransaction3.setStatus(status);
  }
}
errorCallback.tag = "sentry_tracingErrorCallback";

// node_modules/@sentry/core/esm/tracing/spanstatus.js
var SpanStatus;
(function(SpanStatus2) {
  const Ok = "ok";
  SpanStatus2["Ok"] = Ok;
  const DeadlineExceeded = "deadline_exceeded";
  SpanStatus2["DeadlineExceeded"] = DeadlineExceeded;
  const Unauthenticated = "unauthenticated";
  SpanStatus2["Unauthenticated"] = Unauthenticated;
  const PermissionDenied = "permission_denied";
  SpanStatus2["PermissionDenied"] = PermissionDenied;
  const NotFound = "not_found";
  SpanStatus2["NotFound"] = NotFound;
  const ResourceExhausted = "resource_exhausted";
  SpanStatus2["ResourceExhausted"] = ResourceExhausted;
  const InvalidArgument = "invalid_argument";
  SpanStatus2["InvalidArgument"] = InvalidArgument;
  const Unimplemented = "unimplemented";
  SpanStatus2["Unimplemented"] = Unimplemented;
  const Unavailable = "unavailable";
  SpanStatus2["Unavailable"] = Unavailable;
  const InternalError = "internal_error";
  SpanStatus2["InternalError"] = InternalError;
  const UnknownError = "unknown_error";
  SpanStatus2["UnknownError"] = UnknownError;
  const Cancelled = "cancelled";
  SpanStatus2["Cancelled"] = Cancelled;
  const AlreadyExists = "already_exists";
  SpanStatus2["AlreadyExists"] = AlreadyExists;
  const FailedPrecondition = "failed_precondition";
  SpanStatus2["FailedPrecondition"] = FailedPrecondition;
  const Aborted = "aborted";
  SpanStatus2["Aborted"] = Aborted;
  const OutOfRange = "out_of_range";
  SpanStatus2["OutOfRange"] = OutOfRange;
  const DataLoss = "data_loss";
  SpanStatus2["DataLoss"] = DataLoss;
})(SpanStatus || (SpanStatus = {}));
function getSpanStatusFromHttpCode(httpStatus) {
  if (httpStatus < 400 && httpStatus >= 100) {
    return "ok";
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return "unauthenticated";
      case 403:
        return "permission_denied";
      case 404:
        return "not_found";
      case 409:
        return "already_exists";
      case 413:
        return "failed_precondition";
      case 429:
        return "resource_exhausted";
      default:
        return "invalid_argument";
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        return "internal_error";
    }
  }
  return "unknown_error";
}
var spanStatusfromHttpCode = getSpanStatusFromHttpCode;
function setHttpStatus(span, httpStatus) {
  span.setTag("http.status_code", String(httpStatus));
  span.setData("http.response.status_code", httpStatus);
  const spanStatus = getSpanStatusFromHttpCode(httpStatus);
  if (spanStatus !== "unknown_error") {
    span.setStatus(spanStatus);
  }
}

// node_modules/@sentry/core/esm/utils/handleCallbackErrors.js
function handleCallbackErrors(fn, onError, onFinally = () => {
}) {
  let maybePromiseResult;
  try {
    maybePromiseResult = fn();
  } catch (e2) {
    onError(e2);
    onFinally();
    throw e2;
  }
  return maybeHandlePromiseRejection(maybePromiseResult, onError, onFinally);
}
function maybeHandlePromiseRejection(value, onError, onFinally) {
  if (isThenable(value)) {
    return value.then(
      (res) => {
        onFinally();
        return res;
      },
      (e2) => {
        onError(e2);
        onFinally();
        throw e2;
      }
    );
  }
  onFinally();
  return value;
}

// node_modules/@sentry/core/esm/utils/hasTracingEnabled.js
function hasTracingEnabled(maybeOptions) {
  if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
    return false;
  }
  const client = getClient();
  const options = maybeOptions || client && client.getOptions();
  return !!options && (options.enableTracing || "tracesSampleRate" in options || "tracesSampler" in options);
}

// node_modules/@sentry/core/esm/tracing/trace.js
function trace(context, callback, onError = () => {
}, afterFinish = () => {
}) {
  const hub = getCurrentHub();
  const scope = getCurrentScope();
  const parentSpan = scope.getSpan();
  const spanContext = normalizeContext(context);
  const activeSpan = createChildSpanOrTransaction(hub, {
    parentSpan,
    spanContext,
    forceTransaction: false,
    scope
  });
  scope.setSpan(activeSpan);
  return handleCallbackErrors(
    () => callback(activeSpan),
    (error) => {
      activeSpan && activeSpan.setStatus("internal_error");
      onError(error, activeSpan);
    },
    () => {
      activeSpan && activeSpan.end();
      scope.setSpan(parentSpan);
      afterFinish();
    }
  );
}
function startSpan(context, callback) {
  const spanContext = normalizeContext(context);
  return runWithAsyncContext(() => {
    return withScope(context.scope, (scope) => {
      const hub = getCurrentHub();
      const parentSpan = scope.getSpan();
      const shouldSkipSpan = context.onlyIfParent && !parentSpan;
      const activeSpan = shouldSkipSpan ? void 0 : createChildSpanOrTransaction(hub, {
        parentSpan,
        spanContext,
        forceTransaction: context.forceTransaction,
        scope
      });
      return handleCallbackErrors(
        () => callback(activeSpan),
        () => {
          if (activeSpan) {
            const { status } = spanToJSON(activeSpan);
            if (!status || status === "ok") {
              activeSpan.setStatus("internal_error");
            }
          }
        },
        () => activeSpan && activeSpan.end()
      );
    });
  });
}
function startSpanManual(context, callback) {
  const spanContext = normalizeContext(context);
  return runWithAsyncContext(() => {
    return withScope(context.scope, (scope) => {
      const hub = getCurrentHub();
      const parentSpan = scope.getSpan();
      const shouldSkipSpan = context.onlyIfParent && !parentSpan;
      const activeSpan = shouldSkipSpan ? void 0 : createChildSpanOrTransaction(hub, {
        parentSpan,
        spanContext,
        forceTransaction: context.forceTransaction,
        scope
      });
      function finishAndSetSpan() {
        activeSpan && activeSpan.end();
      }
      return handleCallbackErrors(
        () => callback(activeSpan, finishAndSetSpan),
        () => {
          if (activeSpan && activeSpan.isRecording()) {
            const { status } = spanToJSON(activeSpan);
            if (!status || status === "ok") {
              activeSpan.setStatus("internal_error");
            }
          }
        }
      );
    });
  });
}
function startInactiveSpan(context) {
  if (!hasTracingEnabled()) {
    return void 0;
  }
  const spanContext = normalizeContext(context);
  const hub = getCurrentHub();
  const parentSpan = context.scope ? (
    // eslint-disable-next-line deprecation/deprecation
    context.scope.getSpan()
  ) : getActiveSpan();
  const shouldSkipSpan = context.onlyIfParent && !parentSpan;
  if (shouldSkipSpan) {
    return void 0;
  }
  const scope = context.scope || getCurrentScope();
  const temporaryScope = scope.clone();
  return createChildSpanOrTransaction(hub, {
    parentSpan,
    spanContext,
    forceTransaction: context.forceTransaction,
    scope: temporaryScope
  });
}
function getActiveSpan() {
  return getCurrentScope().getSpan();
}
var continueTrace = ({
  sentryTrace,
  baggage
}, callback) => {
  const currentScope = getCurrentScope();
  const { traceparentData, dynamicSamplingContext, propagationContext } = tracingContextFromHeaders(
    sentryTrace,
    baggage
  );
  currentScope.setPropagationContext(propagationContext);
  if (DEBUG_BUILD2 && traceparentData) {
    logger.log(`[Tracing] Continuing trace ${traceparentData.traceId}.`);
  }
  const transactionContext = {
    ...traceparentData,
    metadata: dropUndefinedKeys({
      dynamicSamplingContext
    })
  };
  if (!callback) {
    return transactionContext;
  }
  return runWithAsyncContext(() => {
    return callback(transactionContext);
  });
};
function createChildSpanOrTransaction(hub, {
  parentSpan,
  spanContext,
  forceTransaction,
  scope
}) {
  if (!hasTracingEnabled()) {
    return void 0;
  }
  const isolationScope = getIsolationScope();
  let span;
  if (parentSpan && !forceTransaction) {
    span = parentSpan.startChild(spanContext);
  } else if (parentSpan) {
    const dsc = getDynamicSamplingContextFromSpan(parentSpan);
    const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
    const sampled = spanIsSampled(parentSpan);
    span = hub.startTransaction({
      traceId,
      parentSpanId,
      parentSampled: sampled,
      ...spanContext,
      metadata: {
        dynamicSamplingContext: dsc,
        // eslint-disable-next-line deprecation/deprecation
        ...spanContext.metadata
      }
    });
  } else {
    const { traceId, dsc, parentSpanId, sampled } = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };
    span = hub.startTransaction({
      traceId,
      parentSpanId,
      parentSampled: sampled,
      ...spanContext,
      metadata: {
        dynamicSamplingContext: dsc,
        // eslint-disable-next-line deprecation/deprecation
        ...spanContext.metadata
      }
    });
  }
  scope.setSpan(span);
  setCapturedScopesOnSpan(span, scope, isolationScope);
  return span;
}
function normalizeContext(context) {
  if (context.startTime) {
    const ctx = { ...context };
    ctx.startTimestamp = spanTimeInputToSeconds(context.startTime);
    delete ctx.startTime;
    return ctx;
  }
  return context;
}
var SCOPE_ON_START_SPAN_FIELD = "_sentryScope";
var ISOLATION_SCOPE_ON_START_SPAN_FIELD = "_sentryIsolationScope";
function setCapturedScopesOnSpan(span, scope, isolationScope) {
  if (span) {
    addNonEnumerableProperty(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, isolationScope);
    addNonEnumerableProperty(span, SCOPE_ON_START_SPAN_FIELD, scope);
  }
}
function getCapturedScopesOnSpan(span) {
  return {
    scope: span[SCOPE_ON_START_SPAN_FIELD],
    isolationScope: span[ISOLATION_SCOPE_ON_START_SPAN_FIELD]
  };
}

// node_modules/@sentry/core/esm/metrics/metric-summary.js
var SPAN_METRIC_SUMMARY;
function getMetricStorageForSpan(span) {
  return SPAN_METRIC_SUMMARY ? SPAN_METRIC_SUMMARY.get(span) : void 0;
}
function getMetricSummaryJsonForSpan(span) {
  const storage = getMetricStorageForSpan(span);
  if (!storage) {
    return void 0;
  }
  const output = {};
  for (const [, [exportKey, summary]] of storage) {
    if (!output[exportKey]) {
      output[exportKey] = [];
    }
    output[exportKey].push(dropUndefinedKeys(summary));
  }
  return output;
}
function updateMetricSummaryOnActiveSpan(metricType, sanitizedName, value, unit, tags, bucketKey) {
  const span = getActiveSpan();
  if (span) {
    const storage = getMetricStorageForSpan(span) || /* @__PURE__ */ new Map();
    const exportKey = `${metricType}:${sanitizedName}@${unit}`;
    const bucketItem = storage.get(bucketKey);
    if (bucketItem) {
      const [, summary] = bucketItem;
      storage.set(bucketKey, [
        exportKey,
        {
          min: Math.min(summary.min, value),
          max: Math.max(summary.max, value),
          count: summary.count += 1,
          sum: summary.sum += value,
          tags: summary.tags
        }
      ]);
    } else {
      storage.set(bucketKey, [
        exportKey,
        {
          min: value,
          max: value,
          count: 1,
          sum: value,
          tags
        }
      ]);
    }
    if (!SPAN_METRIC_SUMMARY) {
      SPAN_METRIC_SUMMARY = /* @__PURE__ */ new WeakMap();
    }
    SPAN_METRIC_SUMMARY.set(span, storage);
  }
}

// node_modules/@sentry/core/esm/semanticAttributes.js
var SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
var SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
var SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
var SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";
var SEMANTIC_ATTRIBUTE_PROFILE_ID = "profile_id";

// node_modules/@sentry/core/esm/tracing/span.js
var SpanRecorder = class {
  constructor(maxlen = 1e3) {
    this._maxlen = maxlen;
    this.spans = [];
  }
  /**
   * This is just so that we don't run out of memory while recording a lot
   * of spans. At some point we just stop and flush out the start of the
   * trace tree (i.e.the first n spans with the smallest
   * start_timestamp).
   */
  add(span) {
    if (this.spans.length > this._maxlen) {
      span.spanRecorder = void 0;
    } else {
      this.spans.push(span);
    }
  }
};
var Span = class _Span {
  /**
   * Tags for the span.
   * @deprecated Use `spanToJSON(span).atttributes` instead.
   */
  /**
   * Data for the span.
   * @deprecated Use `spanToJSON(span).atttributes` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * List of spans that were finalized
   *
   * @deprecated This property will no longer be public. Span recording will be handled internally.
   */
  /**
   * @inheritDoc
   * @deprecated Use top level `Sentry.getRootSpan()` instead
   */
  /**
   * The instrumenter that created this span.
   *
   * TODO (v8): This can probably be replaced by an `instanceOf` check of the span class.
   *            the instrumenter can only be sentry or otel so we can check the span instance
   *            to verify which one it is and remove this field entirely.
   *
   * @deprecated This field will be removed.
   */
  /** Epoch timestamp in seconds when the span started. */
  /** Epoch timestamp in seconds when the span ended. */
  /** Internal keeper of the status */
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(spanContext = {}) {
    this._traceId = spanContext.traceId || uuid4();
    this._spanId = spanContext.spanId || uuid4().substring(16);
    this._startTime = spanContext.startTimestamp || timestampInSeconds();
    this.tags = spanContext.tags ? { ...spanContext.tags } : {};
    this.data = spanContext.data ? { ...spanContext.data } : {};
    this.instrumenter = spanContext.instrumenter || "sentry";
    this._attributes = {};
    this.setAttributes({
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: spanContext.origin || "manual",
      [SEMANTIC_ATTRIBUTE_SENTRY_OP]: spanContext.op,
      ...spanContext.attributes
    });
    this._name = spanContext.name || spanContext.description;
    if (spanContext.parentSpanId) {
      this._parentSpanId = spanContext.parentSpanId;
    }
    if ("sampled" in spanContext) {
      this._sampled = spanContext.sampled;
    }
    if (spanContext.status) {
      this._status = spanContext.status;
    }
    if (spanContext.endTimestamp) {
      this._endTime = spanContext.endTimestamp;
    }
    if (spanContext.exclusiveTime) {
      this._exclusiveTime = spanContext.exclusiveTime;
    }
    this._measurements = spanContext.measurements ? { ...spanContext.measurements } : {};
  }
  // This rule conflicts with another eslint rule :(
  /* eslint-disable @typescript-eslint/member-ordering */
  /**
   * An alias for `description` of the Span.
   * @deprecated Use `spanToJSON(span).description` instead.
   */
  get name() {
    return this._name || "";
  }
  /**
   * Update the name of the span.
   * @deprecated Use `spanToJSON(span).description` instead.
   */
  set name(name) {
    this.updateName(name);
  }
  /**
   * Get the description of the Span.
   * @deprecated Use `spanToJSON(span).description` instead.
   */
  get description() {
    return this._name;
  }
  /**
   * Get the description of the Span.
   * @deprecated Use `spanToJSON(span).description` instead.
   */
  set description(description) {
    this._name = description;
  }
  /**
   * The ID of the trace.
   * @deprecated Use `spanContext().traceId` instead.
   */
  get traceId() {
    return this._traceId;
  }
  /**
   * The ID of the trace.
   * @deprecated You cannot update the traceId of a span after span creation.
   */
  set traceId(traceId) {
    this._traceId = traceId;
  }
  /**
   * The ID of the span.
   * @deprecated Use `spanContext().spanId` instead.
   */
  get spanId() {
    return this._spanId;
  }
  /**
   * The ID of the span.
   * @deprecated You cannot update the spanId of a span after span creation.
   */
  set spanId(spanId) {
    this._spanId = spanId;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `startSpan` functions instead.
   */
  set parentSpanId(string) {
    this._parentSpanId = string;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `spanToJSON(span).parent_span_id` instead.
   */
  get parentSpanId() {
    return this._parentSpanId;
  }
  /**
   * Was this span chosen to be sent as part of the sample?
   * @deprecated Use `isRecording()` instead.
   */
  get sampled() {
    return this._sampled;
  }
  /**
   * Was this span chosen to be sent as part of the sample?
   * @deprecated You cannot update the sampling decision of a span after span creation.
   */
  set sampled(sampled) {
    this._sampled = sampled;
  }
  /**
   * Attributes for the span.
   * @deprecated Use `spanToJSON(span).atttributes` instead.
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Attributes for the span.
   * @deprecated Use `setAttributes()` instead.
   */
  set attributes(attributes) {
    this._attributes = attributes;
  }
  /**
   * Timestamp in seconds (epoch time) indicating when the span started.
   * @deprecated Use `spanToJSON()` instead.
   */
  get startTimestamp() {
    return this._startTime;
  }
  /**
   * Timestamp in seconds (epoch time) indicating when the span started.
   * @deprecated In v8, you will not be able to update the span start time after creation.
   */
  set startTimestamp(startTime) {
    this._startTime = startTime;
  }
  /**
   * Timestamp in seconds when the span ended.
   * @deprecated Use `spanToJSON()` instead.
   */
  get endTimestamp() {
    return this._endTime;
  }
  /**
   * Timestamp in seconds when the span ended.
   * @deprecated Set the end time via `span.end()` instead.
   */
  set endTimestamp(endTime) {
    this._endTime = endTime;
  }
  /**
   * The status of the span.
   *
   * @deprecated Use `spanToJSON().status` instead to get the status.
   */
  get status() {
    return this._status;
  }
  /**
   * The status of the span.
   *
   * @deprecated Use `.setStatus()` instead to set or update the status.
   */
  set status(status) {
    this._status = status;
  }
  /**
   * Operation of the span
   *
   * @deprecated Use `spanToJSON().op` to read the op instead.
   */
  get op() {
    return this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP];
  }
  /**
   * Operation of the span
   *
   * @deprecated Use `startSpan()` functions to set or `span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, 'op')
   *             to update the span instead.
   */
  set op(op) {
    this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, op);
  }
  /**
   * The origin of the span, giving context about what created the span.
   *
   * @deprecated Use `spanToJSON().origin` to read the origin instead.
   */
  get origin() {
    return this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN];
  }
  /**
   * The origin of the span, giving context about what created the span.
   *
   * @deprecated Use `startSpan()` functions to set the origin instead.
   */
  set origin(origin) {
    this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, origin);
  }
  /* eslint-enable @typescript-eslint/member-ordering */
  /** @inheritdoc */
  spanContext() {
    const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
    return {
      spanId,
      traceId,
      traceFlags: sampled ? TRACE_FLAG_SAMPLED : TRACE_FLAG_NONE
    };
  }
  /**
   * Creates a new `Span` while setting the current `Span.id` as `parentSpanId`.
   * Also the `sampled` decision will be inherited.
   *
   * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
   */
  startChild(spanContext) {
    const childSpan = new _Span({
      ...spanContext,
      parentSpanId: this._spanId,
      sampled: this._sampled,
      traceId: this._traceId
    });
    childSpan.spanRecorder = this.spanRecorder;
    if (childSpan.spanRecorder) {
      childSpan.spanRecorder.add(childSpan);
    }
    const rootSpan = getRootSpan(this);
    childSpan.transaction = rootSpan;
    if (DEBUG_BUILD2 && rootSpan) {
      const opStr = spanContext && spanContext.op || "< unknown op >";
      const nameStr = spanToJSON(childSpan).description || "< unknown name >";
      const idStr = rootSpan.spanContext().spanId;
      const logMessage = `[Tracing] Starting '${opStr}' span on transaction '${nameStr}' (${idStr}).`;
      logger.log(logMessage);
      this._logMessage = logMessage;
    }
    return childSpan;
  }
  /**
   * Sets the tag attribute on the current span.
   *
   * Can also be used to unset a tag, by passing `undefined`.
   *
   * @param key Tag key
   * @param value Tag value
   * @deprecated Use `setAttribute()` instead.
   */
  setTag(key, value) {
    this.tags = { ...this.tags, [key]: value };
    return this;
  }
  /**
   * Sets the data attribute on the current span
   * @param key Data key
   * @param value Data value
   * @deprecated Use `setAttribute()` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData(key, value) {
    this.data = { ...this.data, [key]: value };
    return this;
  }
  /** @inheritdoc */
  setAttribute(key, value) {
    if (value === void 0) {
      delete this._attributes[key];
    } else {
      this._attributes[key] = value;
    }
  }
  /** @inheritdoc */
  setAttributes(attributes) {
    Object.keys(attributes).forEach((key) => this.setAttribute(key, attributes[key]));
  }
  /**
   * @inheritDoc
   */
  setStatus(value) {
    this._status = value;
    return this;
  }
  /**
   * @inheritDoc
   * @deprecated Use top-level `setHttpStatus()` instead.
   */
  setHttpStatus(httpStatus) {
    setHttpStatus(this, httpStatus);
    return this;
  }
  /**
   * @inheritdoc
   *
   * @deprecated Use `.updateName()` instead.
   */
  setName(name) {
    this.updateName(name);
  }
  /**
   * @inheritDoc
   */
  updateName(name) {
    this._name = name;
    return this;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `spanToJSON(span).status === 'ok'` instead.
   */
  isSuccess() {
    return this._status === "ok";
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `.end()` instead.
   */
  finish(endTimestamp) {
    return this.end(endTimestamp);
  }
  /** @inheritdoc */
  end(endTimestamp) {
    if (this._endTime) {
      return;
    }
    const rootSpan = getRootSpan(this);
    if (DEBUG_BUILD2 && // Don't call this for transactions
    rootSpan && rootSpan.spanContext().spanId !== this._spanId) {
      const logMessage = this._logMessage;
      if (logMessage) {
        logger.log(logMessage.replace("Starting", "Finishing"));
      }
    }
    this._endTime = spanTimeInputToSeconds(endTimestamp);
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `spanToTraceHeader()` instead.
   */
  toTraceparent() {
    return spanToTraceHeader(this);
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `spanToJSON()` or access the fields directly instead.
   */
  toContext() {
    return dropUndefinedKeys({
      data: this._getData(),
      description: this._name,
      endTimestamp: this._endTime,
      // eslint-disable-next-line deprecation/deprecation
      op: this.op,
      parentSpanId: this._parentSpanId,
      sampled: this._sampled,
      spanId: this._spanId,
      startTimestamp: this._startTime,
      status: this._status,
      // eslint-disable-next-line deprecation/deprecation
      tags: this.tags,
      traceId: this._traceId
    });
  }
  /**
   * @inheritDoc
   *
   * @deprecated Update the fields directly instead.
   */
  updateWithContext(spanContext) {
    this.data = spanContext.data || {};
    this._name = spanContext.name || spanContext.description;
    this._endTime = spanContext.endTimestamp;
    this.op = spanContext.op;
    this._parentSpanId = spanContext.parentSpanId;
    this._sampled = spanContext.sampled;
    this._spanId = spanContext.spanId || this._spanId;
    this._startTime = spanContext.startTimestamp || this._startTime;
    this._status = spanContext.status;
    this.tags = spanContext.tags || {};
    this._traceId = spanContext.traceId || this._traceId;
    return this;
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use `spanToTraceContext()` util function instead.
   */
  getTraceContext() {
    return spanToTraceContext(this);
  }
  /**
   * Get JSON representation of this span.
   *
   * @hidden
   * @internal This method is purely for internal purposes and should not be used outside
   * of SDK code. If you need to get a JSON representation of a span,
   * use `spanToJSON(span)` instead.
   */
  getSpanJSON() {
    return dropUndefinedKeys({
      data: this._getData(),
      description: this._name,
      op: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: this._status,
      // eslint-disable-next-line deprecation/deprecation
      tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
      _metrics_summary: getMetricSummaryJsonForSpan(this),
      profile_id: this._attributes[SEMANTIC_ATTRIBUTE_PROFILE_ID],
      exclusive_time: this._exclusiveTime,
      measurements: Object.keys(this._measurements).length > 0 ? this._measurements : void 0
    });
  }
  /** @inheritdoc */
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  /**
   * Convert the object to JSON.
   * @deprecated Use `spanToJSON(span)` instead.
   */
  toJSON() {
    return this.getSpanJSON();
  }
  /**
   * Get the merged data for this span.
   * For now, this combines `data` and `attributes` together,
   * until eventually we can ingest `attributes` directly.
   */
  _getData() {
    const { data, _attributes: attributes } = this;
    const hasData = Object.keys(data).length > 0;
    const hasAttributes = Object.keys(attributes).length > 0;
    if (!hasData && !hasAttributes) {
      return void 0;
    }
    if (hasData && hasAttributes) {
      return {
        ...data,
        ...attributes
      };
    }
    return hasData ? data : attributes;
  }
};

// node_modules/@sentry/core/esm/tracing/transaction.js
var Transaction = class extends Span {
  /**
   * The reference to the current hub.
   */
  // DO NOT yet remove this property, it is used in a hack for v7 backwards compatibility.
  /**
   * This constructor should never be called manually. Those instrumenting tracing should use
   * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
   * @internal
   * @hideconstructor
   * @hidden
   *
   * @deprecated Transactions will be removed in v8. Use spans instead.
   */
  constructor(transactionContext, hub) {
    super(transactionContext);
    this._contexts = {};
    this._hub = hub || getCurrentHub();
    this._name = transactionContext.name || "";
    this._metadata = {
      // eslint-disable-next-line deprecation/deprecation
      ...transactionContext.metadata
    };
    this._trimEnd = transactionContext.trimEnd;
    this.transaction = this;
    const incomingDynamicSamplingContext = this._metadata.dynamicSamplingContext;
    if (incomingDynamicSamplingContext) {
      this._frozenDynamicSamplingContext = { ...incomingDynamicSamplingContext };
    }
  }
  // This sadly conflicts with the getter/setter ordering :(
  /* eslint-disable @typescript-eslint/member-ordering */
  /**
   * Getter for `name` property.
   * @deprecated Use `spanToJSON(span).description` instead.
   */
  get name() {
    return this._name;
  }
  /**
   * Setter for `name` property, which also sets `source` as custom.
   * @deprecated Use `updateName()` and `setMetadata()` instead.
   */
  set name(newName) {
    this.setName(newName);
  }
  /**
   * Get the metadata for this transaction.
   * @deprecated Use `spanGetMetadata(transaction)` instead.
   */
  get metadata() {
    return {
      // Defaults
      // eslint-disable-next-line deprecation/deprecation
      source: "custom",
      spanMetadata: {},
      // Legacy metadata
      ...this._metadata,
      // From attributes
      ...this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] && {
        source: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]
      },
      ...this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE] && {
        sampleRate: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]
      }
    };
  }
  /**
   * Update the metadata for this transaction.
   * @deprecated Use `spanGetMetadata(transaction)` instead.
   */
  set metadata(metadata) {
    this._metadata = metadata;
  }
  /* eslint-enable @typescript-eslint/member-ordering */
  /**
   * Setter for `name` property, which also sets `source` on the metadata.
   *
   * @deprecated Use `.updateName()` and `.setAttribute()` instead.
   */
  setName(name, source = "custom") {
    this._name = name;
    this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, source);
  }
  /** @inheritdoc */
  updateName(name) {
    this._name = name;
    return this;
  }
  /**
   * Attaches SpanRecorder to the span itself
   * @param maxlen maximum number of spans that can be recorded
   */
  initSpanRecorder(maxlen = 1e3) {
    if (!this.spanRecorder) {
      this.spanRecorder = new SpanRecorder(maxlen);
    }
    this.spanRecorder.add(this);
  }
  /**
   * Set the context of a transaction event.
   * @deprecated Use either `.setAttribute()`, or set the context on the scope before creating the transaction.
   */
  setContext(key, context) {
    if (context === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }
  }
  /**
   * @inheritDoc
   *
   * @deprecated Use top-level `setMeasurement()` instead.
   */
  setMeasurement(name, value, unit = "") {
    this._measurements[name] = { value, unit };
  }
  /**
   * Store metadata on this transaction.
   * @deprecated Use attributes or store data on the scope instead.
   */
  setMetadata(newMetadata) {
    this._metadata = { ...this._metadata, ...newMetadata };
  }
  /**
   * @inheritDoc
   */
  end(endTimestamp) {
    const timestampInS = spanTimeInputToSeconds(endTimestamp);
    const transaction = this._finishTransaction(timestampInS);
    if (!transaction) {
      return void 0;
    }
    return this._hub.captureEvent(transaction);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const spanContext = super.toContext();
    return dropUndefinedKeys({
      ...spanContext,
      name: this._name,
      trimEnd: this._trimEnd
    });
  }
  /**
   * @inheritDoc
   */
  updateWithContext(transactionContext) {
    super.updateWithContext(transactionContext);
    this._name = transactionContext.name || "";
    this._trimEnd = transactionContext.trimEnd;
    return this;
  }
  /**
   * @inheritdoc
   *
   * @experimental
   *
   * @deprecated Use top-level `getDynamicSamplingContextFromSpan` instead.
   */
  getDynamicSamplingContext() {
    return getDynamicSamplingContextFromSpan(this);
  }
  /**
   * Override the current hub with a new one.
   * Used if you want another hub to finish the transaction.
   *
   * @internal
   */
  setHub(hub) {
    this._hub = hub;
  }
  /**
   * Get the profile id of the transaction.
   */
  getProfileId() {
    if (this._contexts !== void 0 && this._contexts["profile"] !== void 0) {
      return this._contexts["profile"].profile_id;
    }
    return void 0;
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _finishTransaction(endTimestamp) {
    if (this._endTime !== void 0) {
      return void 0;
    }
    if (!this._name) {
      DEBUG_BUILD2 && logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
      this._name = "<unlabeled transaction>";
    }
    super.end(endTimestamp);
    const client = this._hub.getClient();
    if (client && client.emit) {
      client.emit("finishTransaction", this);
    }
    if (this._sampled !== true) {
      DEBUG_BUILD2 && logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
      if (client) {
        client.recordDroppedEvent("sample_rate", "transaction");
      }
      return void 0;
    }
    const finishedSpans = this.spanRecorder ? (
      // eslint-disable-next-line deprecation/deprecation
      this.spanRecorder.spans.filter((span) => span !== this && spanToJSON(span).timestamp)
    ) : [];
    if (this._trimEnd && finishedSpans.length > 0) {
      const endTimes = finishedSpans.map((span) => spanToJSON(span).timestamp).filter(Boolean);
      this._endTime = endTimes.reduce((prev, current) => {
        return prev > current ? prev : current;
      });
    }
    const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = getCapturedScopesOnSpan(this);
    const { metadata } = this;
    const { source } = metadata;
    const transaction = {
      contexts: {
        ...this._contexts,
        // We don't want to override trace context
        trace: spanToTraceContext(this)
      },
      // TODO: Pass spans serialized via `spanToJSON()` here instead in v8.
      spans: finishedSpans,
      start_timestamp: this._startTime,
      // eslint-disable-next-line deprecation/deprecation
      tags: this.tags,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        ...metadata,
        capturedSpanScope,
        capturedSpanIsolationScope,
        ...dropUndefinedKeys({
          dynamicSamplingContext: getDynamicSamplingContextFromSpan(this)
        })
      },
      _metrics_summary: getMetricSummaryJsonForSpan(this),
      ...source && {
        transaction_info: {
          source
        }
      }
    };
    const hasMeasurements = Object.keys(this._measurements).length > 0;
    if (hasMeasurements) {
      DEBUG_BUILD2 && logger.log(
        "[Measurements] Adding measurements to transaction",
        JSON.stringify(this._measurements, void 0, 2)
      );
      transaction.measurements = this._measurements;
    }
    DEBUG_BUILD2 && logger.log(`[Tracing] Finishing ${this.op} transaction: ${this._name}.`);
    return transaction;
  }
};

// node_modules/@sentry/core/esm/tracing/idletransaction.js
var TRACING_DEFAULTS = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  heartbeatInterval: 5e3
};
var FINISH_REASON_TAG = "finishReason";
var IDLE_TRANSACTION_FINISH_REASONS = [
  "heartbeatFailed",
  "idleTimeout",
  "documentHidden",
  "finalTimeout",
  "externalFinish",
  "cancelled"
];
var IdleTransactionSpanRecorder = class extends SpanRecorder {
  constructor(_pushActivity, _popActivity, transactionSpanId, maxlen) {
    super(maxlen);
    this._pushActivity = _pushActivity;
    this._popActivity = _popActivity;
    this.transactionSpanId = transactionSpanId;
  }
  /**
   * @inheritDoc
   */
  add(span) {
    if (span.spanContext().spanId !== this.transactionSpanId) {
      const originalEnd = span.end;
      span.end = (...rest) => {
        this._popActivity(span.spanContext().spanId);
        return originalEnd.apply(span, rest);
      };
      if (spanToJSON(span).timestamp === void 0) {
        this._pushActivity(span.spanContext().spanId);
      }
    }
    super.add(span);
  }
};
var IdleTransaction = class extends Transaction {
  // Activities store a list of active spans
  // Track state of activities in previous heartbeat
  // Amount of times heartbeat has counted. Will cause transaction to finish after 3 beats.
  // We should not use heartbeat if we finished a transaction
  // Idle timeout was canceled and we should finish the transaction with the last span end.
  /**
   * Timer that tracks Transaction idleTimeout
   */
  /**
   * @deprecated Transactions will be removed in v8. Use spans instead.
   */
  constructor(transactionContext, _idleHub, _idleTimeout = TRACING_DEFAULTS.idleTimeout, _finalTimeout = TRACING_DEFAULTS.finalTimeout, _heartbeatInterval = TRACING_DEFAULTS.heartbeatInterval, _onScope = false, delayAutoFinishUntilSignal = false) {
    super(transactionContext, _idleHub);
    this._idleHub = _idleHub;
    this._idleTimeout = _idleTimeout;
    this._finalTimeout = _finalTimeout;
    this._heartbeatInterval = _heartbeatInterval;
    this._onScope = _onScope;
    this.activities = {};
    this._heartbeatCounter = 0;
    this._finished = false;
    this._idleTimeoutCanceledPermanently = false;
    this._beforeFinishCallbacks = [];
    this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[4];
    this._autoFinishAllowed = !delayAutoFinishUntilSignal;
    if (_onScope) {
      DEBUG_BUILD2 && logger.log(`Setting idle transaction on scope. Span ID: ${this.spanContext().spanId}`);
      _idleHub.getScope().setSpan(this);
    }
    if (!delayAutoFinishUntilSignal) {
      this._restartIdleTimeout();
    }
    setTimeout(() => {
      if (!this._finished) {
        this.setStatus("deadline_exceeded");
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[3];
        this.end();
      }
    }, this._finalTimeout);
  }
  /** {@inheritDoc} */
  end(endTimestamp) {
    const endTimestampInS = spanTimeInputToSeconds(endTimestamp);
    this._finished = true;
    this.activities = {};
    if (this.op === "ui.action.click") {
      this.setAttribute(FINISH_REASON_TAG, this._finishReason);
    }
    if (this.spanRecorder) {
      DEBUG_BUILD2 && // eslint-disable-next-line deprecation/deprecation
      logger.log("[Tracing] finishing IdleTransaction", new Date(endTimestampInS * 1e3).toISOString(), this.op);
      for (const callback of this._beforeFinishCallbacks) {
        callback(this, endTimestampInS);
      }
      this.spanRecorder.spans = this.spanRecorder.spans.filter((span) => {
        if (span.spanContext().spanId === this.spanContext().spanId) {
          return true;
        }
        if (!spanToJSON(span).timestamp) {
          span.setStatus("cancelled");
          span.end(endTimestampInS);
          DEBUG_BUILD2 && logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(span, void 0, 2));
        }
        const { start_timestamp: startTime, timestamp: endTime } = spanToJSON(span);
        const spanStartedBeforeTransactionFinish = startTime && startTime < endTimestampInS;
        const timeoutWithMarginOfError = (this._finalTimeout + this._idleTimeout) / 1e3;
        const spanEndedBeforeFinalTimeout = endTime && startTime && endTime - startTime < timeoutWithMarginOfError;
        if (DEBUG_BUILD2) {
          const stringifiedSpan = JSON.stringify(span, void 0, 2);
          if (!spanStartedBeforeTransactionFinish) {
            logger.log("[Tracing] discarding Span since it happened after Transaction was finished", stringifiedSpan);
          } else if (!spanEndedBeforeFinalTimeout) {
            logger.log("[Tracing] discarding Span since it finished after Transaction final timeout", stringifiedSpan);
          }
        }
        return spanStartedBeforeTransactionFinish && spanEndedBeforeFinalTimeout;
      });
      DEBUG_BUILD2 && logger.log("[Tracing] flushing IdleTransaction");
    } else {
      DEBUG_BUILD2 && logger.log("[Tracing] No active IdleTransaction");
    }
    if (this._onScope) {
      const scope = this._idleHub.getScope();
      if (scope.getTransaction() === this) {
        scope.setSpan(void 0);
      }
    }
    return super.end(endTimestamp);
  }
  /**
   * Register a callback function that gets executed before the transaction finishes.
   * Useful for cleanup or if you want to add any additional spans based on current context.
   *
   * This is exposed because users have no other way of running something before an idle transaction
   * finishes.
   */
  registerBeforeFinishCallback(callback) {
    this._beforeFinishCallbacks.push(callback);
  }
  /**
   * @inheritDoc
   */
  initSpanRecorder(maxlen) {
    if (!this.spanRecorder) {
      const pushActivity = (id) => {
        if (this._finished) {
          return;
        }
        this._pushActivity(id);
      };
      const popActivity = (id) => {
        if (this._finished) {
          return;
        }
        this._popActivity(id);
      };
      this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanContext().spanId, maxlen);
      DEBUG_BUILD2 && logger.log("Starting heartbeat");
      this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  /**
   * Cancels the existing idle timeout, if there is one.
   * @param restartOnChildSpanChange Default is `true`.
   *                                 If set to false the transaction will end
   *                                 with the last child span.
   */
  cancelIdleTimeout(endTimestamp, {
    restartOnChildSpanChange
  } = {
    restartOnChildSpanChange: true
  }) {
    this._idleTimeoutCanceledPermanently = restartOnChildSpanChange === false;
    if (this._idleTimeoutID) {
      clearTimeout(this._idleTimeoutID);
      this._idleTimeoutID = void 0;
      if (Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently) {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
        this.end(endTimestamp);
      }
    }
  }
  /**
   * Temporary method used to externally set the transaction's `finishReason`
   *
   * ** WARNING**
   * This is for the purpose of experimentation only and will be removed in the near future, do not use!
   *
   * @internal
   *
   */
  setFinishReason(reason) {
    this._finishReason = reason;
  }
  /**
   * Permits the IdleTransaction to automatically end itself via the idle timeout and heartbeat mechanisms when the `delayAutoFinishUntilSignal` option was set to `true`.
   */
  sendAutoFinishSignal() {
    if (!this._autoFinishAllowed) {
      DEBUG_BUILD2 && logger.log("[Tracing] Received finish signal for idle transaction.");
      this._restartIdleTimeout();
      this._autoFinishAllowed = true;
    }
  }
  /**
   * Restarts idle timeout, if there is no running idle timeout it will start one.
   */
  _restartIdleTimeout(endTimestamp) {
    this.cancelIdleTimeout();
    this._idleTimeoutID = setTimeout(() => {
      if (!this._finished && Object.keys(this.activities).length === 0) {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[1];
        this.end(endTimestamp);
      }
    }, this._idleTimeout);
  }
  /**
   * Start tracking a specific activity.
   * @param spanId The span id that represents the activity
   */
  _pushActivity(spanId) {
    this.cancelIdleTimeout(void 0, { restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently });
    DEBUG_BUILD2 && logger.log(`[Tracing] pushActivity: ${spanId}`);
    this.activities[spanId] = true;
    DEBUG_BUILD2 && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  /**
   * Remove an activity from usage
   * @param spanId The span id that represents the activity
   */
  _popActivity(spanId) {
    if (this.activities[spanId]) {
      DEBUG_BUILD2 && logger.log(`[Tracing] popActivity ${spanId}`);
      delete this.activities[spanId];
      DEBUG_BUILD2 && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
    }
    if (Object.keys(this.activities).length === 0) {
      const endTimestamp = timestampInSeconds();
      if (this._idleTimeoutCanceledPermanently) {
        if (this._autoFinishAllowed) {
          this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
          this.end(endTimestamp);
        }
      } else {
        this._restartIdleTimeout(endTimestamp + this._idleTimeout / 1e3);
      }
    }
  }
  /**
   * Checks when entries of this.activities are not changing for 3 beats.
   * If this occurs we finish the transaction.
   */
  _beat() {
    if (this._finished) {
      return;
    }
    const heartbeatString = Object.keys(this.activities).join("");
    if (heartbeatString === this._prevHeartbeatString) {
      this._heartbeatCounter++;
    } else {
      this._heartbeatCounter = 1;
    }
    this._prevHeartbeatString = heartbeatString;
    if (this._heartbeatCounter >= 3) {
      if (this._autoFinishAllowed) {
        DEBUG_BUILD2 && logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
        this.setStatus("deadline_exceeded");
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[0];
        this.end();
      }
    } else {
      this._pingHeartbeat();
    }
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    DEBUG_BUILD2 && logger.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`);
    setTimeout(() => {
      this._beat();
    }, this._heartbeatInterval);
  }
};

// node_modules/@sentry/core/esm/tracing/sampling.js
function sampleTransaction(transaction, options, samplingContext) {
  if (!hasTracingEnabled(options)) {
    transaction.sampled = false;
    return transaction;
  }
  if (transaction.sampled !== void 0) {
    transaction.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(transaction.sampled));
    return transaction;
  }
  let sampleRate;
  if (typeof options.tracesSampler === "function") {
    sampleRate = options.tracesSampler(samplingContext);
    transaction.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else if (samplingContext.parentSampled !== void 0) {
    sampleRate = samplingContext.parentSampled;
  } else if (typeof options.tracesSampleRate !== "undefined") {
    sampleRate = options.tracesSampleRate;
    transaction.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else {
    sampleRate = 1;
    transaction.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, sampleRate);
  }
  if (!isValidSampleRate(sampleRate)) {
    DEBUG_BUILD2 && logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
    transaction.sampled = false;
    return transaction;
  }
  if (!sampleRate) {
    DEBUG_BUILD2 && logger.log(
      `[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    );
    transaction.sampled = false;
    return transaction;
  }
  transaction.sampled = Math.random() < sampleRate;
  if (!transaction.sampled) {
    DEBUG_BUILD2 && logger.log(
      `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
        sampleRate
      )})`
    );
    return transaction;
  }
  DEBUG_BUILD2 && // eslint-disable-next-line deprecation/deprecation
  logger.log(`[Tracing] starting ${transaction.op} transaction - ${spanToJSON(transaction).description}`);
  return transaction;
}
function isValidSampleRate(rate) {
  if (isNaN2(rate) || !(typeof rate === "number" || typeof rate === "boolean")) {
    DEBUG_BUILD2 && logger.warn(
      `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        rate
      )} of type ${JSON.stringify(typeof rate)}.`
    );
    return false;
  }
  if (rate < 0 || rate > 1) {
    DEBUG_BUILD2 && logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${rate}.`);
    return false;
  }
  return true;
}

// node_modules/@sentry/core/esm/tracing/hubextensions.js
function traceHeaders() {
  const scope = this.getScope();
  const span = scope.getSpan();
  return span ? {
    "sentry-trace": spanToTraceHeader(span)
  } : {};
}
function _startTransaction(transactionContext, customSamplingContext) {
  const client = this.getClient();
  const options = client && client.getOptions() || {};
  const configInstrumenter = options.instrumenter || "sentry";
  const transactionInstrumenter = transactionContext.instrumenter || "sentry";
  if (configInstrumenter !== transactionInstrumenter) {
    DEBUG_BUILD2 && logger.error(
      `A transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${configInstrumenter}\` instrumenter.
The transaction will not be sampled. Please use the ${configInstrumenter} instrumentation to start transactions.`
    );
    transactionContext.sampled = false;
  }
  let transaction = new Transaction(transactionContext, this);
  transaction = sampleTransaction(transaction, options, {
    name: transactionContext.name,
    parentSampled: transactionContext.parentSampled,
    transactionContext,
    attributes: {
      // eslint-disable-next-line deprecation/deprecation
      ...transactionContext.data,
      ...transactionContext.attributes
    },
    ...customSamplingContext
  });
  if (transaction.isRecording()) {
    transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
  }
  if (client && client.emit) {
    client.emit("startTransaction", transaction);
  }
  return transaction;
}
function startIdleTransaction(hub, transactionContext, idleTimeout, finalTimeout, onScope, customSamplingContext, heartbeatInterval, delayAutoFinishUntilSignal = false) {
  const client = hub.getClient();
  const options = client && client.getOptions() || {};
  let transaction = new IdleTransaction(
    transactionContext,
    hub,
    idleTimeout,
    finalTimeout,
    heartbeatInterval,
    onScope,
    delayAutoFinishUntilSignal
  );
  transaction = sampleTransaction(transaction, options, {
    name: transactionContext.name,
    parentSampled: transactionContext.parentSampled,
    transactionContext,
    attributes: {
      // eslint-disable-next-line deprecation/deprecation
      ...transactionContext.data,
      ...transactionContext.attributes
    },
    ...customSamplingContext
  });
  if (transaction.isRecording()) {
    transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
  }
  if (client && client.emit) {
    client.emit("startTransaction", transaction);
  }
  return transaction;
}
function addTracingExtensions() {
  const carrier = getMainCarrier();
  if (!carrier.__SENTRY__) {
    return;
  }
  carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
  if (!carrier.__SENTRY__.extensions.startTransaction) {
    carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
  }
  if (!carrier.__SENTRY__.extensions.traceHeaders) {
    carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
  }
  registerErrorInstrumentation();
}

// node_modules/@sentry/core/esm/tracing/measurement.js
function setMeasurement(name, value, unit) {
  const transaction = getActiveTransaction();
  if (transaction) {
    transaction.setMeasurement(name, value, unit);
  }
}

// node_modules/@sentry/core/esm/envelope.js
function enhanceEventWithSdkInfo(event, sdkInfo) {
  if (!sdkInfo) {
    return event;
  }
  event.sdk = event.sdk || {};
  event.sdk.name = event.sdk.name || sdkInfo.name;
  event.sdk.version = event.sdk.version || sdkInfo.version;
  event.sdk.integrations = [...event.sdk.integrations || [], ...sdkInfo.integrations || []];
  event.sdk.packages = [...event.sdk.packages || [], ...sdkInfo.packages || []];
  return event;
}
function createSessionEnvelope(session, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const envelopeHeaders = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && dsn && { dsn: dsnToString(dsn) }
  };
  const envelopeItem = "aggregates" in session ? [{ type: "sessions" }, session] : [{ type: "session" }, session.toJSON()];
  return createEnvelope(envelopeHeaders, [envelopeItem]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
  enhanceEventWithSdkInfo(event, metadata && metadata.sdk);
  const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
  delete event.sdkProcessingMetadata;
  const eventItem = [{ type: eventType }, event];
  return createEnvelope(envelopeHeaders, [eventItem]);
}

// node_modules/@sentry/core/esm/api.js
var SENTRY_API_VERSION = "7";
function getBaseApiEndpoint(dsn) {
  const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
  const port = dsn.port ? `:${dsn.port}` : "";
  return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
  return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
  return urlEncode({
    // We send only the minimum set of required information. See
    // https://github.com/getsentry/sentry-javascript/issues/2572.
    sentry_key: dsn.publicKey,
    sentry_version: SENTRY_API_VERSION,
    ...sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }
  });
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnelOrOptions = {}) {
  const tunnel = typeof tunnelOrOptions === "string" ? tunnelOrOptions : tunnelOrOptions.tunnel;
  const sdkInfo = typeof tunnelOrOptions === "string" || !tunnelOrOptions._metadata ? void 0 : tunnelOrOptions._metadata.sdk;
  return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}
function getReportDialogEndpoint(dsnLike, dialogOptions) {
  const dsn = makeDsn(dsnLike);
  if (!dsn) {
    return "";
  }
  const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;
  let encodedOptions = `dsn=${dsnToString(dsn)}`;
  for (const key in dialogOptions) {
    if (key === "dsn") {
      continue;
    }
    if (key === "onClose") {
      continue;
    }
    if (key === "user") {
      const user = dialogOptions.user;
      if (!user) {
        continue;
      }
      if (user.name) {
        encodedOptions += `&name=${encodeURIComponent(user.name)}`;
      }
      if (user.email) {
        encodedOptions += `&email=${encodeURIComponent(user.email)}`;
      }
    } else {
      encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key])}`;
    }
  }
  return `${endpoint}?${encodedOptions}`;
}

// node_modules/@sentry/core/esm/integration.js
var installedIntegrations = [];
function filterDuplicates(integrations) {
  const integrationsByName = {};
  integrations.forEach((currentInstance) => {
    const { name } = currentInstance;
    const existingInstance = integrationsByName[name];
    if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
      return;
    }
    integrationsByName[name] = currentInstance;
  });
  return Object.keys(integrationsByName).map((k) => integrationsByName[k]);
}
function getIntegrationsToSetup(options) {
  const defaultIntegrations2 = options.defaultIntegrations || [];
  const userIntegrations = options.integrations;
  defaultIntegrations2.forEach((integration) => {
    integration.isDefaultInstance = true;
  });
  let integrations;
  if (Array.isArray(userIntegrations)) {
    integrations = [...defaultIntegrations2, ...userIntegrations];
  } else if (typeof userIntegrations === "function") {
    integrations = arrayify(userIntegrations(defaultIntegrations2));
  } else {
    integrations = defaultIntegrations2;
  }
  const finalIntegrations = filterDuplicates(integrations);
  const debugIndex = findIndex(finalIntegrations, (integration) => integration.name === "Debug");
  if (debugIndex !== -1) {
    const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
    finalIntegrations.push(debugInstance);
  }
  return finalIntegrations;
}
function setupIntegrations(client, integrations) {
  const integrationIndex = {};
  integrations.forEach((integration) => {
    if (integration) {
      setupIntegration(client, integration, integrationIndex);
    }
  });
  return integrationIndex;
}
function afterSetupIntegrations(client, integrations) {
  for (const integration of integrations) {
    if (integration && integration.afterAllSetup) {
      integration.afterAllSetup(client);
    }
  }
}
function setupIntegration(client, integration, integrationIndex) {
  if (integrationIndex[integration.name]) {
    DEBUG_BUILD2 && logger.log(`Integration skipped because it was already installed: ${integration.name}`);
    return;
  }
  integrationIndex[integration.name] = integration;
  if (installedIntegrations.indexOf(integration.name) === -1) {
    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
    installedIntegrations.push(integration.name);
  }
  if (integration.setup && typeof integration.setup === "function") {
    integration.setup(client);
  }
  if (client.on && typeof integration.preprocessEvent === "function") {
    const callback = integration.preprocessEvent.bind(integration);
    client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
  }
  if (client.addEventProcessor && typeof integration.processEvent === "function") {
    const callback = integration.processEvent.bind(integration);
    const processor = Object.assign((event, hint) => callback(event, hint, client), {
      id: integration.name
    });
    client.addEventProcessor(processor);
  }
  DEBUG_BUILD2 && logger.log(`Integration installed: ${integration.name}`);
}
function addIntegration(integration) {
  const client = getClient();
  if (!client || !client.addIntegration) {
    DEBUG_BUILD2 && logger.warn(`Cannot add integration "${integration.name}" because no SDK Client is available.`);
    return;
  }
  client.addIntegration(integration);
}
function findIndex(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i]) === true) {
      return i;
    }
  }
  return -1;
}
function convertIntegrationFnToClass(name, fn) {
  return Object.assign(
    function ConvertedIntegration(...args) {
      return fn(...args);
    },
    { id: name }
  );
}
function defineIntegration(fn) {
  return fn;
}

// node_modules/@sentry/core/esm/metrics/constants.js
var COUNTER_METRIC_TYPE = "c";
var GAUGE_METRIC_TYPE = "g";
var SET_METRIC_TYPE = "s";
var DISTRIBUTION_METRIC_TYPE = "d";
var NAME_AND_TAG_KEY_NORMALIZATION_REGEX = /[^a-zA-Z0-9_/.-]+/g;
var TAG_VALUE_NORMALIZATION_REGEX = /[^\w\d\s_:/@.{}[\]$-]+/g;
var DEFAULT_BROWSER_FLUSH_INTERVAL = 5e3;

// node_modules/@sentry/core/esm/metrics/utils.js
function getBucketKey(metricType, name, unit, tags) {
  const stringifiedTags = Object.entries(dropUndefinedKeys(tags)).sort((a, b) => a[0].localeCompare(b[0]));
  return `${metricType}${name}${unit}${stringifiedTags}`;
}
function simpleHash(s) {
  let rv = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    rv = (rv << 5) - rv + c;
    rv &= rv;
  }
  return rv >>> 0;
}
function serializeMetricBuckets(metricBucketItems) {
  let out = "";
  for (const item of metricBucketItems) {
    const tagEntries = Object.entries(item.tags);
    const maybeTags = tagEntries.length > 0 ? `|#${tagEntries.map(([key, value]) => `${key}:${value}`).join(",")}` : "";
    out += `${item.name}@${item.unit}:${item.metric}|${item.metricType}${maybeTags}|T${item.timestamp}
`;
  }
  return out;
}
function sanitizeTags(unsanitizedTags) {
  const tags = {};
  for (const key in unsanitizedTags) {
    if (Object.prototype.hasOwnProperty.call(unsanitizedTags, key)) {
      const sanitizedKey = key.replace(NAME_AND_TAG_KEY_NORMALIZATION_REGEX, "_");
      tags[sanitizedKey] = String(unsanitizedTags[key]).replace(TAG_VALUE_NORMALIZATION_REGEX, "");
    }
  }
  return tags;
}

// node_modules/@sentry/core/esm/metrics/envelope.js
function createMetricEnvelope(metricBucketItems, dsn, metadata, tunnel) {
  const headers = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (metadata && metadata.sdk) {
    headers.sdk = {
      name: metadata.sdk.name,
      version: metadata.sdk.version
    };
  }
  if (!!tunnel && dsn) {
    headers.dsn = dsnToString(dsn);
  }
  const item = createMetricEnvelopeItem(metricBucketItems);
  return createEnvelope(headers, [item]);
}
function createMetricEnvelopeItem(metricBucketItems) {
  const payload = serializeMetricBuckets(metricBucketItems);
  const metricHeaders = {
    type: "statsd",
    length: payload.length
  };
  return [metricHeaders, payload];
}

// node_modules/@sentry/core/esm/baseclient.js
var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
var BaseClient = class {
  /**
   * A reference to a metrics aggregator
   *
   * @experimental Note this is alpha API. It may experience breaking changes in the future.
   */
  /** Options passed to the SDK. */
  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  /** Array of set up integrations. */
  /** Indicates whether this client's integrations have been set up. */
  /** Number of calls being processed */
  /** Holds flushable  */
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
  constructor(options) {
    this._options = options;
    this._integrations = {};
    this._integrationsInitialized = false;
    this._numProcessing = 0;
    this._outcomes = {};
    this._hooks = {};
    this._eventProcessors = [];
    if (options.dsn) {
      this._dsn = makeDsn(options.dsn);
    } else {
      DEBUG_BUILD2 && logger.warn("No DSN provided, client will not send events.");
    }
    if (this._dsn) {
      const url = getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options);
      this._transport = options.transport({
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...options.transportOptions,
        url
      });
    }
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  captureException(exception, hint, scope) {
    if (checkOrSetAlreadyCaught(exception)) {
      DEBUG_BUILD2 && logger.log(ALREADY_SEEN_ERROR);
      return;
    }
    let eventId = hint && hint.event_id;
    this._process(
      this.eventFromException(exception, hint).then((event) => this._captureEvent(event, hint, scope)).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureMessage(message, level, hint, scope) {
    let eventId = hint && hint.event_id;
    const eventMessage = isParameterizedString(message) ? message : String(message);
    const promisedEvent = isPrimitive(message) ? this.eventFromMessage(eventMessage, level, hint) : this.eventFromException(message, hint);
    this._process(
      promisedEvent.then((event) => this._captureEvent(event, hint, scope)).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureEvent(event, hint, scope) {
    if (hint && hint.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
      DEBUG_BUILD2 && logger.log(ALREADY_SEEN_ERROR);
      return;
    }
    let eventId = hint && hint.event_id;
    const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
    const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;
    this._process(
      this._captureEvent(event, hint, capturedSpanScope || scope).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureSession(session) {
    if (!(typeof session.release === "string")) {
      DEBUG_BUILD2 && logger.warn("Discarded session because of missing or non-string release");
    } else {
      this.sendSession(session);
      updateSession(session, { init: false });
    }
  }
  /**
   * @inheritDoc
   */
  getDsn() {
    return this._dsn;
  }
  /**
   * @inheritDoc
   */
  getOptions() {
    return this._options;
  }
  /**
   * @see SdkMetadata in @sentry/types
   *
   * @return The metadata of the SDK
   */
  getSdkMetadata() {
    return this._options._metadata;
  }
  /**
   * @inheritDoc
   */
  getTransport() {
    return this._transport;
  }
  /**
   * @inheritDoc
   */
  flush(timeout) {
    const transport = this._transport;
    if (transport) {
      if (this.metricsAggregator) {
        this.metricsAggregator.flush();
      }
      return this._isClientDoneProcessing(timeout).then((clientFinished) => {
        return transport.flush(timeout).then((transportFlushed) => clientFinished && transportFlushed);
      });
    } else {
      return resolvedSyncPromise(true);
    }
  }
  /**
   * @inheritDoc
   */
  close(timeout) {
    return this.flush(timeout).then((result) => {
      this.getOptions().enabled = false;
      if (this.metricsAggregator) {
        this.metricsAggregator.close();
      }
      return result;
    });
  }
  /** Get all installed event processors. */
  getEventProcessors() {
    return this._eventProcessors;
  }
  /** @inheritDoc */
  addEventProcessor(eventProcessor) {
    this._eventProcessors.push(eventProcessor);
  }
  /**
   * This is an internal function to setup all integrations that should run on the client.
   * @deprecated Use `client.init()` instead.
   */
  setupIntegrations(forceInitialize) {
    if (forceInitialize && !this._integrationsInitialized || this._isEnabled() && !this._integrationsInitialized) {
      this._setupIntegrations();
    }
  }
  /** @inheritdoc */
  init() {
    if (this._isEnabled()) {
      this._setupIntegrations();
    }
  }
  /**
   * Gets an installed integration by its `id`.
   *
   * @returns The installed integration or `undefined` if no integration with that `id` was installed.
   * @deprecated Use `getIntegrationByName()` instead.
   */
  getIntegrationById(integrationId) {
    return this.getIntegrationByName(integrationId);
  }
  /**
   * Gets an installed integration by its name.
   *
   * @returns The installed integration or `undefined` if no integration with that `name` was installed.
   */
  getIntegrationByName(integrationName) {
    return this._integrations[integrationName];
  }
  /**
   * Returns the client's instance of the given integration class, it any.
   * @deprecated Use `getIntegrationByName()` instead.
   */
  getIntegration(integration) {
    try {
      return this._integrations[integration.id] || null;
    } catch (_oO) {
      DEBUG_BUILD2 && logger.warn(`Cannot retrieve integration ${integration.id} from the current Client`);
      return null;
    }
  }
  /**
   * @inheritDoc
   */
  addIntegration(integration) {
    const isAlreadyInstalled = this._integrations[integration.name];
    setupIntegration(this, integration, this._integrations);
    if (!isAlreadyInstalled) {
      afterSetupIntegrations(this, [integration]);
    }
  }
  /**
   * @inheritDoc
   */
  sendEvent(event, hint = {}) {
    this.emit("beforeSendEvent", event, hint);
    let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
    for (const attachment of hint.attachments || []) {
      env = addItemToEnvelope(
        env,
        createAttachmentEnvelopeItem(
          attachment,
          this._options.transportOptions && this._options.transportOptions.textEncoder
        )
      );
    }
    const promise = this._sendEnvelope(env);
    if (promise) {
      promise.then((sendResponse) => this.emit("afterSendEvent", event, sendResponse), null);
    }
  }
  /**
   * @inheritDoc
   */
  sendSession(session) {
    const env = createSessionEnvelope(session, this._dsn, this._options._metadata, this._options.tunnel);
    this._sendEnvelope(env);
  }
  /**
   * @inheritDoc
   */
  recordDroppedEvent(reason, category, _event) {
    if (this._options.sendClientReports) {
      const key = `${reason}:${category}`;
      DEBUG_BUILD2 && logger.log(`Adding outcome: "${key}"`);
      this._outcomes[key] = this._outcomes[key] + 1 || 1;
    }
  }
  /**
   * @inheritDoc
   */
  captureAggregateMetrics(metricBucketItems) {
    DEBUG_BUILD2 && logger.log(`Flushing aggregated metrics, number of metrics: ${metricBucketItems.length}`);
    const metricsEnvelope = createMetricEnvelope(
      metricBucketItems,
      this._dsn,
      this._options._metadata,
      this._options.tunnel
    );
    this._sendEnvelope(metricsEnvelope);
  }
  // Keep on() & emit() signatures in sync with types' client.ts interface
  /* eslint-disable @typescript-eslint/unified-signatures */
  /** @inheritdoc */
  /** @inheritdoc */
  on(hook, callback) {
    if (!this._hooks[hook]) {
      this._hooks[hook] = [];
    }
    this._hooks[hook].push(callback);
  }
  /** @inheritdoc */
  /** @inheritdoc */
  emit(hook, ...rest) {
    if (this._hooks[hook]) {
      this._hooks[hook].forEach((callback) => callback(...rest));
    }
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations } = this._options;
    this._integrations = setupIntegrations(this, integrations);
    afterSetupIntegrations(this, integrations);
    this._integrationsInitialized = true;
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(session, event) {
    let crashed = false;
    let errored = false;
    const exceptions = event.exception && event.exception.values;
    if (exceptions) {
      errored = true;
      for (const ex of exceptions) {
        const mechanism = ex.mechanism;
        if (mechanism && mechanism.handled === false) {
          crashed = true;
          break;
        }
      }
    }
    const sessionNonTerminal = session.status === "ok";
    const shouldUpdateAndSend = sessionNonTerminal && session.errors === 0 || sessionNonTerminal && crashed;
    if (shouldUpdateAndSend) {
      updateSession(session, {
        ...crashed && { status: "crashed" },
        errors: session.errors || Number(errored || crashed)
      });
      this.captureSession(session);
    }
  }
  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
  _isClientDoneProcessing(timeout) {
    return new SyncPromise((resolve2) => {
      let ticked = 0;
      const tick = 1;
      const interval = setInterval(() => {
        if (this._numProcessing == 0) {
          clearInterval(interval);
          resolve2(true);
        } else {
          ticked += tick;
          if (timeout && ticked >= timeout) {
            clearInterval(interval);
            resolve2(false);
          }
        }
      }, tick);
    });
  }
  /** Determines whether this SDK is enabled and a transport is present. */
  _isEnabled() {
    return this.getOptions().enabled !== false && this._transport !== void 0;
  }
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */
  _prepareEvent(event, hint, scope, isolationScope = getIsolationScope()) {
    const options = this.getOptions();
    const integrations = Object.keys(this._integrations);
    if (!hint.integrations && integrations.length > 0) {
      hint.integrations = integrations;
    }
    this.emit("preprocessEvent", event, hint);
    return prepareEvent(options, event, hint, scope, this, isolationScope).then((evt) => {
      if (evt === null) {
        return evt;
      }
      const propagationContext = {
        ...isolationScope.getPropagationContext(),
        ...scope ? scope.getPropagationContext() : void 0
      };
      const trace2 = evt.contexts && evt.contexts.trace;
      if (!trace2 && propagationContext) {
        const { traceId: trace_id, spanId, parentSpanId, dsc } = propagationContext;
        evt.contexts = {
          trace: {
            trace_id,
            span_id: spanId,
            parent_span_id: parentSpanId
          },
          ...evt.contexts
        };
        const dynamicSamplingContext = dsc ? dsc : getDynamicSamplingContextFromClient(trace_id, this, scope);
        evt.sdkProcessingMetadata = {
          dynamicSamplingContext,
          ...evt.sdkProcessingMetadata
        };
      }
      return evt;
    });
  }
  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  _captureEvent(event, hint = {}, scope) {
    return this._processEvent(event, hint, scope).then(
      (finalEvent) => {
        return finalEvent.event_id;
      },
      (reason) => {
        if (DEBUG_BUILD2) {
          const sentryError = reason;
          if (sentryError.logLevel === "log") {
            logger.log(sentryError.message);
          } else {
            logger.warn(sentryError);
          }
        }
        return void 0;
      }
    );
  }
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  _processEvent(event, hint, scope) {
    const options = this.getOptions();
    const { sampleRate } = options;
    const isTransaction = isTransactionEvent(event);
    const isError2 = isErrorEvent2(event);
    const eventType = event.type || "error";
    const beforeSendLabel = `before send for type \`${eventType}\``;
    if (isError2 && typeof sampleRate === "number" && Math.random() > sampleRate) {
      this.recordDroppedEvent("sample_rate", "error", event);
      return rejectedSyncPromise(
        new SentryError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
          "log"
        )
      );
    }
    const dataCategory = eventType === "replay_event" ? "replay" : eventType;
    const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
    const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;
    return this._prepareEvent(event, hint, scope, capturedSpanIsolationScope).then((prepared) => {
      if (prepared === null) {
        this.recordDroppedEvent("event_processor", dataCategory, event);
        throw new SentryError("An event processor returned `null`, will not send event.", "log");
      }
      const isInternalException = hint.data && hint.data.__sentry__ === true;
      if (isInternalException) {
        return prepared;
      }
      const result = processBeforeSend(options, prepared, hint);
      return _validateBeforeSendResult(result, beforeSendLabel);
    }).then((processedEvent) => {
      if (processedEvent === null) {
        this.recordDroppedEvent("before_send", dataCategory, event);
        throw new SentryError(`${beforeSendLabel} returned \`null\`, will not send event.`, "log");
      }
      const session = scope && scope.getSession();
      if (!isTransaction && session) {
        this._updateSessionFromEvent(session, processedEvent);
      }
      const transactionInfo = processedEvent.transaction_info;
      if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
        const source = "custom";
        processedEvent.transaction_info = {
          ...transactionInfo,
          source
        };
      }
      this.sendEvent(processedEvent, hint);
      return processedEvent;
    }).then(null, (reason) => {
      if (reason instanceof SentryError) {
        throw reason;
      }
      this.captureException(reason, {
        data: {
          __sentry__: true
        },
        originalException: reason
      });
      throw new SentryError(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`
      );
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(promise) {
    this._numProcessing++;
    void promise.then(
      (value) => {
        this._numProcessing--;
        return value;
      },
      (reason) => {
        this._numProcessing--;
        return reason;
      }
    );
  }
  /**
   * @inheritdoc
   */
  _sendEnvelope(envelope) {
    this.emit("beforeEnvelope", envelope);
    if (this._isEnabled() && this._transport) {
      return this._transport.send(envelope).then(null, (reason) => {
        DEBUG_BUILD2 && logger.error("Error while sending event:", reason);
      });
    } else {
      DEBUG_BUILD2 && logger.error("Transport disabled");
    }
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const outcomes = this._outcomes;
    this._outcomes = {};
    return Object.keys(outcomes).map((key) => {
      const [reason, category] = key.split(":");
      return {
        reason,
        category,
        quantity: outcomes[key]
      };
    });
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
};
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
  const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
  if (isThenable(beforeSendResult)) {
    return beforeSendResult.then(
      (event) => {
        if (!isPlainObject(event) && event !== null) {
          throw new SentryError(invalidValueError);
        }
        return event;
      },
      (e2) => {
        throw new SentryError(`${beforeSendLabel} rejected with ${e2}`);
      }
    );
  } else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) {
    throw new SentryError(invalidValueError);
  }
  return beforeSendResult;
}
function processBeforeSend(options, event, hint) {
  const { beforeSend, beforeSendTransaction } = options;
  if (isErrorEvent2(event) && beforeSend) {
    return beforeSend(event, hint);
  }
  if (isTransactionEvent(event) && beforeSendTransaction) {
    return beforeSendTransaction(event, hint);
  }
  return event;
}
function isErrorEvent2(event) {
  return event.type === void 0;
}
function isTransactionEvent(event) {
  return event.type === "transaction";
}
function addEventProcessor(callback) {
  const client = getClient();
  if (!client || !client.addEventProcessor) {
    return;
  }
  client.addEventProcessor(callback);
}

// node_modules/@sentry/core/esm/metrics/instance.js
var CounterMetric = class {
  constructor(_value) {
    this._value = _value;
  }
  /** @inheritDoc */
  get weight() {
    return 1;
  }
  /** @inheritdoc */
  add(value) {
    this._value += value;
  }
  /** @inheritdoc */
  toString() {
    return `${this._value}`;
  }
};
var GaugeMetric = class {
  constructor(value) {
    this._last = value;
    this._min = value;
    this._max = value;
    this._sum = value;
    this._count = 1;
  }
  /** @inheritDoc */
  get weight() {
    return 5;
  }
  /** @inheritdoc */
  add(value) {
    this._last = value;
    if (value < this._min) {
      this._min = value;
    }
    if (value > this._max) {
      this._max = value;
    }
    this._sum += value;
    this._count++;
  }
  /** @inheritdoc */
  toString() {
    return `${this._last}:${this._min}:${this._max}:${this._sum}:${this._count}`;
  }
};
var DistributionMetric = class {
  constructor(first) {
    this._value = [first];
  }
  /** @inheritDoc */
  get weight() {
    return this._value.length;
  }
  /** @inheritdoc */
  add(value) {
    this._value.push(value);
  }
  /** @inheritdoc */
  toString() {
    return this._value.join(":");
  }
};
var SetMetric = class {
  constructor(first) {
    this.first = first;
    this._value = /* @__PURE__ */ new Set([first]);
  }
  /** @inheritDoc */
  get weight() {
    return this._value.size;
  }
  /** @inheritdoc */
  add(value) {
    this._value.add(value);
  }
  /** @inheritdoc */
  toString() {
    return Array.from(this._value).map((val) => typeof val === "string" ? simpleHash(val) : val).join(":");
  }
};
var METRIC_MAP = {
  [COUNTER_METRIC_TYPE]: CounterMetric,
  [GAUGE_METRIC_TYPE]: GaugeMetric,
  [DISTRIBUTION_METRIC_TYPE]: DistributionMetric,
  [SET_METRIC_TYPE]: SetMetric
};

// node_modules/@sentry/core/esm/sdk.js
function initAndBind(clientClass, options) {
  if (options.debug === true) {
    if (DEBUG_BUILD2) {
      logger.enable();
    } else {
      consoleSandbox(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
      });
    }
  }
  const scope = getCurrentScope();
  scope.update(options.initialScope);
  const client = new clientClass(options);
  setCurrentClient(client);
  initializeClient(client);
}
function setCurrentClient(client) {
  const hub = getCurrentHub();
  const top = hub.getStackTop();
  top.client = client;
  top.scope.setClient(client);
}
function initializeClient(client) {
  if (client.init) {
    client.init();
  } else if (client.setupIntegrations) {
    client.setupIntegrations();
  }
}

// node_modules/@sentry/core/esm/transports/base.js
var DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
function createTransport(options, makeRequest, buffer = makePromiseBuffer(
  options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE
)) {
  let rateLimits = {};
  const flush2 = (timeout) => buffer.drain(timeout);
  function send(envelope) {
    const filteredEnvelopeItems = [];
    forEachEnvelopeItem(envelope, (item, type) => {
      const envelopeItemDataCategory = envelopeItemTypeToDataCategory(type);
      if (isRateLimited(rateLimits, envelopeItemDataCategory)) {
        const event = getEventForEnvelopeItem(item, type);
        options.recordDroppedEvent("ratelimit_backoff", envelopeItemDataCategory, event);
      } else {
        filteredEnvelopeItems.push(item);
      }
    });
    if (filteredEnvelopeItems.length === 0) {
      return resolvedSyncPromise();
    }
    const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);
    const recordEnvelopeLoss = (reason) => {
      forEachEnvelopeItem(filteredEnvelope, (item, type) => {
        const event = getEventForEnvelopeItem(item, type);
        options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type), event);
      });
    };
    const requestTask = () => makeRequest({ body: serializeEnvelope(filteredEnvelope, options.textEncoder) }).then(
      (response) => {
        if (response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) {
          DEBUG_BUILD2 && logger.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
        }
        rateLimits = updateRateLimits(rateLimits, response);
        return response;
      },
      (error) => {
        recordEnvelopeLoss("network_error");
        throw error;
      }
    );
    return buffer.add(requestTask).then(
      (result) => result,
      (error) => {
        if (error instanceof SentryError) {
          DEBUG_BUILD2 && logger.error("Skipped sending event because buffer is full.");
          recordEnvelopeLoss("queue_overflow");
          return resolvedSyncPromise();
        } else {
          throw error;
        }
      }
    );
  }
  send.__sentry__baseTransport__ = true;
  return {
    send,
    flush: flush2
  };
}
function getEventForEnvelopeItem(item, type) {
  if (type !== "event" && type !== "transaction") {
    return void 0;
  }
  return Array.isArray(item) ? item[1] : void 0;
}

// node_modules/@sentry/core/esm/transports/offline.js
var MIN_DELAY = 100;
var START_DELAY = 5e3;
var MAX_DELAY = 36e5;
function log(msg, error) {
  DEBUG_BUILD2 && logger.info(`[Offline]: ${msg}`, error);
}
function makeOfflineTransport(createTransport2) {
  return (options) => {
    const transport = createTransport2(options);
    const store = options.createStore ? options.createStore(options) : void 0;
    let retryDelay = START_DELAY;
    let flushTimer;
    function shouldQueue(env, error, retryDelay2) {
      if (envelopeContainsItemType(env, ["replay_event", "replay_recording", "client_report"])) {
        return false;
      }
      if (options.shouldStore) {
        return options.shouldStore(env, error, retryDelay2);
      }
      return true;
    }
    function flushIn(delay) {
      if (!store) {
        return;
      }
      if (flushTimer) {
        clearTimeout(flushTimer);
      }
      flushTimer = setTimeout(async () => {
        flushTimer = void 0;
        const found = await store.pop();
        if (found) {
          log("Attempting to send previously queued event");
          void send(found).catch((e2) => {
            log("Failed to retry sending", e2);
          });
        }
      }, delay);
      if (typeof flushTimer !== "number" && flushTimer.unref) {
        flushTimer.unref();
      }
    }
    function flushWithBackOff() {
      if (flushTimer) {
        return;
      }
      flushIn(retryDelay);
      retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
    }
    async function send(envelope) {
      try {
        const result = await transport.send(envelope);
        let delay = MIN_DELAY;
        if (result) {
          if (result.headers && result.headers["retry-after"]) {
            delay = parseRetryAfterHeader(result.headers["retry-after"]);
          } else if ((result.statusCode || 0) >= 400) {
            return result;
          }
        }
        flushIn(delay);
        retryDelay = START_DELAY;
        return result;
      } catch (e2) {
        if (store && await shouldQueue(envelope, e2, retryDelay)) {
          await store.insert(envelope);
          flushWithBackOff();
          log("Error sending. Event queued", e2);
          return {};
        } else {
          throw e2;
        }
      }
    }
    if (options.flushAtStartup) {
      flushWithBackOff();
    }
    return {
      send,
      flush: (t2) => transport.flush(t2)
    };
  };
}

// node_modules/@sentry/core/esm/transports/multiplexed.js
function eventFromEnvelope(env, types) {
  let event;
  forEachEnvelopeItem(env, (item, type) => {
    if (types.includes(type)) {
      event = Array.isArray(item) ? item[1] : void 0;
    }
    return !!event;
  });
  return event;
}
function makeOverrideReleaseTransport(createTransport2, release) {
  return (options) => {
    const transport = createTransport2(options);
    return {
      send: async (envelope) => {
        const event = eventFromEnvelope(envelope, ["event", "transaction", "profile", "replay_event"]);
        if (event) {
          event.release = release;
        }
        return transport.send(envelope);
      },
      flush: (timeout) => transport.flush(timeout)
    };
  };
}
function makeMultiplexedTransport(createTransport2, matcher) {
  return (options) => {
    const fallbackTransport = createTransport2(options);
    const otherTransports = {};
    function getTransport(dsn, release) {
      const key = release ? `${dsn}:${release}` : dsn;
      if (!otherTransports[key]) {
        const validatedDsn = dsnFromString(dsn);
        if (!validatedDsn) {
          return void 0;
        }
        const url = getEnvelopeEndpointWithUrlEncodedAuth(validatedDsn);
        otherTransports[key] = release ? makeOverrideReleaseTransport(createTransport2, release)({ ...options, url }) : createTransport2({ ...options, url });
      }
      return otherTransports[key];
    }
    async function send(envelope) {
      function getEvent(types) {
        const eventTypes = types && types.length ? types : ["event"];
        return eventFromEnvelope(envelope, eventTypes);
      }
      const transports = matcher({ envelope, getEvent }).map((result) => {
        if (typeof result === "string") {
          return getTransport(result, void 0);
        } else {
          return getTransport(result.dsn, result.release);
        }
      }).filter((t2) => !!t2);
      if (transports.length === 0) {
        transports.push(fallbackTransport);
      }
      const results = await Promise.all(transports.map((transport) => transport.send(envelope)));
      return results[0];
    }
    async function flush2(timeout) {
      const allTransports = [...Object.keys(otherTransports).map((dsn) => otherTransports[dsn]), fallbackTransport];
      const results = await Promise.all(allTransports.map((transport) => transport.flush(timeout)));
      return results.every((r3) => r3);
    }
    return {
      send,
      flush: flush2
    };
  };
}

// node_modules/@sentry/core/esm/span.js
function createSpanEnvelope(spans, dsn) {
  const headers = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (dsn) {
    headers.dsn = dsnToString(dsn);
  }
  const items = spans.map(createSpanItem);
  return createEnvelope(headers, items);
}
function createSpanItem(span) {
  const spanHeaders = {
    type: "span"
  };
  return [spanHeaders, span];
}

// node_modules/@sentry/core/esm/utils/isSentryRequestUrl.js
function isSentryRequestUrl(url, hubOrClient) {
  const client = hubOrClient && isHub(hubOrClient) ? (
    // eslint-disable-next-line deprecation/deprecation
    hubOrClient.getClient()
  ) : hubOrClient;
  const dsn = client && client.getDsn();
  const tunnel = client && client.getOptions().tunnel;
  return checkDsn(url, dsn) || checkTunnel(url, tunnel);
}
function checkTunnel(url, tunnel) {
  if (!tunnel) {
    return false;
  }
  return removeTrailingSlash(url) === removeTrailingSlash(tunnel);
}
function checkDsn(url, dsn) {
  return dsn ? url.includes(dsn.host) : false;
}
function removeTrailingSlash(str) {
  return str[str.length - 1] === "/" ? str.slice(0, -1) : str;
}
function isHub(hubOrClient) {
  return hubOrClient.getClient !== void 0;
}

// node_modules/@sentry/core/esm/utils/parameterize.js
function parameterize(strings, ...values) {
  const formatted = new String(String.raw(strings, ...values));
  formatted.__sentry_template_string__ = strings.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s");
  formatted.__sentry_template_values__ = values;
  return formatted;
}

// node_modules/@sentry/core/esm/utils/sdkMetadata.js
function applySdkMetadata(options, name, names = [name], source = "npm") {
  const metadata = options._metadata || {};
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${name}`,
      packages: names.map((name2) => ({
        name: `${source}:@sentry/${name2}`,
        version: SDK_VERSION
      })),
      version: SDK_VERSION
    };
  }
  options._metadata = metadata;
}

// node_modules/@sentry/core/esm/metadata.js
var filenameMetadataMap = /* @__PURE__ */ new Map();
var parsedStacks = /* @__PURE__ */ new Set();
function ensureMetadataStacksAreParsed(parser) {
  if (!GLOBAL_OBJ._sentryModuleMetadata) {
    return;
  }
  for (const stack of Object.keys(GLOBAL_OBJ._sentryModuleMetadata)) {
    const metadata = GLOBAL_OBJ._sentryModuleMetadata[stack];
    if (parsedStacks.has(stack)) {
      continue;
    }
    parsedStacks.add(stack);
    const frames = parser(stack);
    for (const frame of frames.reverse()) {
      if (frame.filename) {
        filenameMetadataMap.set(frame.filename, metadata);
        break;
      }
    }
  }
}
function getMetadataForUrl(parser, filename) {
  ensureMetadataStacksAreParsed(parser);
  return filenameMetadataMap.get(filename);
}
function addMetadataToStackFrames(parser, event) {
  try {
    event.exception.values.forEach((exception) => {
      if (!exception.stacktrace) {
        return;
      }
      for (const frame of exception.stacktrace.frames || []) {
        if (!frame.filename) {
          continue;
        }
        const metadata = getMetadataForUrl(parser, frame.filename);
        if (metadata) {
          frame.module_metadata = metadata;
        }
      }
    });
  } catch (_) {
  }
}
function stripMetadataFromStackFrames(event) {
  try {
    event.exception.values.forEach((exception) => {
      if (!exception.stacktrace) {
        return;
      }
      for (const frame of exception.stacktrace.frames || []) {
        delete frame.module_metadata;
      }
    });
  } catch (_) {
  }
}

// node_modules/@sentry/core/esm/integrations/metadata.js
var INTEGRATION_NAME = "ModuleMetadata";
var _moduleMetadataIntegration = () => {
  return {
    name: INTEGRATION_NAME,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    setup(client) {
      if (typeof client.on !== "function") {
        return;
      }
      client.on("beforeEnvelope", (envelope) => {
        forEachEnvelopeItem(envelope, (item, type) => {
          if (type === "event") {
            const event = Array.isArray(item) ? item[1] : void 0;
            if (event) {
              stripMetadataFromStackFrames(event);
              item[1] = event;
            }
          }
        });
      });
    },
    processEvent(event, _hint, client) {
      const stackParser = client.getOptions().stackParser;
      addMetadataToStackFrames(stackParser, event);
      return event;
    }
  };
};
var moduleMetadataIntegration = defineIntegration(_moduleMetadataIntegration);
var ModuleMetadata = convertIntegrationFnToClass(
  INTEGRATION_NAME,
  moduleMetadataIntegration
);

// node_modules/@sentry/core/esm/integrations/requestdata.js
var DEFAULT_OPTIONS = {
  include: {
    cookies: true,
    data: true,
    headers: true,
    ip: false,
    query_string: true,
    url: true,
    user: {
      id: true,
      username: true,
      email: true
    }
  },
  transactionNamingScheme: "methodPath"
};
var INTEGRATION_NAME2 = "RequestData";
var _requestDataIntegration = (options = {}) => {
  const _addRequestData = addRequestDataToEvent;
  const _options = {
    ...DEFAULT_OPTIONS,
    ...options,
    include: {
      // @ts-expect-error It's mad because `method` isn't a known `include` key. (It's only here and not set by default in
      // `addRequestDataToEvent` for legacy reasons. TODO (v8): Change that.)
      method: true,
      ...DEFAULT_OPTIONS.include,
      ...options.include,
      user: options.include && typeof options.include.user === "boolean" ? options.include.user : {
        ...DEFAULT_OPTIONS.include.user,
        // Unclear why TS still thinks `options.include.user` could be a boolean at this point
        ...(options.include || {}).user
      }
    }
  };
  return {
    name: INTEGRATION_NAME2,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    processEvent(event, _hint, client) {
      const { transactionNamingScheme } = _options;
      const { sdkProcessingMetadata = {} } = event;
      const req = sdkProcessingMetadata.request;
      if (!req) {
        return event;
      }
      const addRequestDataOptions = sdkProcessingMetadata.requestDataOptionsFromExpressHandler || sdkProcessingMetadata.requestDataOptionsFromGCPWrapper || convertReqDataIntegrationOptsToAddReqDataOpts(_options);
      const processedEvent = _addRequestData(event, req, addRequestDataOptions);
      if (event.type === "transaction" || transactionNamingScheme === "handler") {
        return processedEvent;
      }
      const reqWithTransaction = req;
      const transaction = reqWithTransaction._sentryTransaction;
      if (transaction) {
        const name = spanToJSON(transaction).description || "";
        const shouldIncludeMethodInTransactionName = getSDKName(client) === "sentry.javascript.nextjs" ? name.startsWith("/api") : transactionNamingScheme !== "path";
        const [transactionValue] = extractPathForTransaction(req, {
          path: true,
          method: shouldIncludeMethodInTransactionName,
          customRoute: name
        });
        processedEvent.transaction = transactionValue;
      }
      return processedEvent;
    }
  };
};
var requestDataIntegration = defineIntegration(_requestDataIntegration);
var RequestData = convertIntegrationFnToClass(INTEGRATION_NAME2, requestDataIntegration);
function convertReqDataIntegrationOptsToAddReqDataOpts(integrationOptions) {
  const {
    transactionNamingScheme,
    include: { ip, user, ...requestOptions }
  } = integrationOptions;
  const requestIncludeKeys = [];
  for (const [key, value] of Object.entries(requestOptions)) {
    if (value) {
      requestIncludeKeys.push(key);
    }
  }
  let addReqDataUserOpt;
  if (user === void 0) {
    addReqDataUserOpt = true;
  } else if (typeof user === "boolean") {
    addReqDataUserOpt = user;
  } else {
    const userIncludeKeys = [];
    for (const [key, value] of Object.entries(user)) {
      if (value) {
        userIncludeKeys.push(key);
      }
    }
    addReqDataUserOpt = userIncludeKeys;
  }
  return {
    include: {
      ip,
      user: addReqDataUserOpt,
      request: requestIncludeKeys.length !== 0 ? requestIncludeKeys : void 0,
      transaction: transactionNamingScheme
    }
  };
}
function getSDKName(client) {
  try {
    return client.getOptions()._metadata.sdk.name;
  } catch (err) {
    return void 0;
  }
}

// node_modules/@sentry/core/esm/integrations/inboundfilters.js
var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
var DEFAULT_IGNORE_TRANSACTIONS = [
  /^.*\/healthcheck$/,
  /^.*\/healthy$/,
  /^.*\/live$/,
  /^.*\/ready$/,
  /^.*\/heartbeat$/,
  /^.*\/health$/,
  /^.*\/healthz$/
];
var INTEGRATION_NAME3 = "InboundFilters";
var _inboundFiltersIntegration = (options = {}) => {
  return {
    name: INTEGRATION_NAME3,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    processEvent(event, _hint, client) {
      const clientOptions = client.getOptions();
      const mergedOptions = _mergeOptions(options, clientOptions);
      return _shouldDropEvent(event, mergedOptions) ? null : event;
    }
  };
};
var inboundFiltersIntegration = defineIntegration(_inboundFiltersIntegration);
var InboundFilters = convertIntegrationFnToClass(
  INTEGRATION_NAME3,
  inboundFiltersIntegration
);
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
  return {
    allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
    denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
    ignoreErrors: [
      ...internalOptions.ignoreErrors || [],
      ...clientOptions.ignoreErrors || [],
      ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
    ],
    ignoreTransactions: [
      ...internalOptions.ignoreTransactions || [],
      ...clientOptions.ignoreTransactions || [],
      ...internalOptions.disableTransactionDefaults ? [] : DEFAULT_IGNORE_TRANSACTIONS
    ],
    ignoreInternal: internalOptions.ignoreInternal !== void 0 ? internalOptions.ignoreInternal : true
  };
}
function _shouldDropEvent(event, options) {
  if (options.ignoreInternal && _isSentryError(event)) {
    DEBUG_BUILD2 && logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${getEventDescription(event)}`);
    return true;
  }
  if (_isIgnoredError(event, options.ignoreErrors)) {
    DEBUG_BUILD2 && logger.warn(
      `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${getEventDescription(event)}`
    );
    return true;
  }
  if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
    DEBUG_BUILD2 && logger.warn(
      `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${getEventDescription(event)}`
    );
    return true;
  }
  if (_isDeniedUrl(event, options.denyUrls)) {
    DEBUG_BUILD2 && logger.warn(
      `Event dropped due to being matched by \`denyUrls\` option.
Event: ${getEventDescription(
        event
      )}.
Url: ${_getEventFilterUrl(event)}`
    );
    return true;
  }
  if (!_isAllowedUrl(event, options.allowUrls)) {
    DEBUG_BUILD2 && logger.warn(
      `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${getEventDescription(
        event
      )}.
Url: ${_getEventFilterUrl(event)}`
    );
    return true;
  }
  return false;
}
function _isIgnoredError(event, ignoreErrors) {
  if (event.type || !ignoreErrors || !ignoreErrors.length) {
    return false;
  }
  return _getPossibleEventMessages(event).some((message) => stringMatchesSomePattern(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
  if (event.type !== "transaction" || !ignoreTransactions || !ignoreTransactions.length) {
    return false;
  }
  const name = event.transaction;
  return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
  if (!denyUrls || !denyUrls.length) {
    return false;
  }
  const url = _getEventFilterUrl(event);
  return !url ? false : stringMatchesSomePattern(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
  if (!allowUrls || !allowUrls.length) {
    return true;
  }
  const url = _getEventFilterUrl(event);
  return !url ? true : stringMatchesSomePattern(url, allowUrls);
}
function _getPossibleEventMessages(event) {
  const possibleMessages = [];
  if (event.message) {
    possibleMessages.push(event.message);
  }
  let lastException;
  try {
    lastException = event.exception.values[event.exception.values.length - 1];
  } catch (e2) {
  }
  if (lastException) {
    if (lastException.value) {
      possibleMessages.push(lastException.value);
      if (lastException.type) {
        possibleMessages.push(`${lastException.type}: ${lastException.value}`);
      }
    }
  }
  if (DEBUG_BUILD2 && possibleMessages.length === 0) {
    logger.error(`Could not extract message for event ${getEventDescription(event)}`);
  }
  return possibleMessages;
}
function _isSentryError(event) {
  try {
    return event.exception.values[0].type === "SentryError";
  } catch (e2) {
  }
  return false;
}
function _getLastValidUrl(frames = []) {
  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];
    if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
      return frame.filename || null;
    }
  }
  return null;
}
function _getEventFilterUrl(event) {
  try {
    let frames;
    try {
      frames = event.exception.values[0].stacktrace.frames;
    } catch (e2) {
    }
    return frames ? _getLastValidUrl(frames) : null;
  } catch (oO) {
    DEBUG_BUILD2 && logger.error(`Cannot extract url for event ${getEventDescription(event)}`);
    return null;
  }
}

// node_modules/@sentry/core/esm/integrations/functiontostring.js
var originalFunctionToString;
var INTEGRATION_NAME4 = "FunctionToString";
var SETUP_CLIENTS = /* @__PURE__ */ new WeakMap();
var _functionToStringIntegration = () => {
  return {
    name: INTEGRATION_NAME4,
    setupOnce() {
      originalFunctionToString = Function.prototype.toString;
      try {
        Function.prototype.toString = function(...args) {
          const originalFunction = getOriginalFunction(this);
          const context = SETUP_CLIENTS.has(getClient()) && originalFunction !== void 0 ? originalFunction : this;
          return originalFunctionToString.apply(context, args);
        };
      } catch (e2) {
      }
    },
    setup(client) {
      SETUP_CLIENTS.set(client, true);
    }
  };
};
var functionToStringIntegration = defineIntegration(_functionToStringIntegration);
var FunctionToString = convertIntegrationFnToClass(
  INTEGRATION_NAME4,
  functionToStringIntegration
);

// node_modules/@sentry/core/esm/integrations/linkederrors.js
var DEFAULT_KEY = "cause";
var DEFAULT_LIMIT = 5;
var INTEGRATION_NAME5 = "LinkedErrors";
var _linkedErrorsIntegration = (options = {}) => {
  const limit = options.limit || DEFAULT_LIMIT;
  const key = options.key || DEFAULT_KEY;
  return {
    name: INTEGRATION_NAME5,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    preprocessEvent(event, hint, client) {
      const options2 = client.getOptions();
      applyAggregateErrorsToEvent(
        exceptionFromError,
        options2.stackParser,
        options2.maxValueLength,
        key,
        limit,
        event,
        hint
      );
    }
  };
};
var linkedErrorsIntegration = defineIntegration(_linkedErrorsIntegration);
var LinkedErrors = convertIntegrationFnToClass(INTEGRATION_NAME5, linkedErrorsIntegration);

// node_modules/@sentry/core/esm/integrations/index.js
var integrations_exports = {};
__export(integrations_exports, {
  FunctionToString: () => FunctionToString,
  InboundFilters: () => InboundFilters,
  LinkedErrors: () => LinkedErrors
});

// node_modules/@sentry/core/esm/metrics/browser-aggregator.js
var BrowserMetricsAggregator = class {
  // TODO(@anonrig): Use FinalizationRegistry to have a proper way of flushing the buckets
  // when the aggregator is garbage collected.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry
  constructor(_client) {
    this._client = _client;
    this._buckets = /* @__PURE__ */ new Map();
    this._interval = setInterval(() => this.flush(), DEFAULT_BROWSER_FLUSH_INTERVAL);
  }
  /**
   * @inheritDoc
   */
  add(metricType, unsanitizedName, value, unit = "none", unsanitizedTags = {}, maybeFloatTimestamp = timestampInSeconds()) {
    const timestamp = Math.floor(maybeFloatTimestamp);
    const name = unsanitizedName.replace(NAME_AND_TAG_KEY_NORMALIZATION_REGEX, "_");
    const tags = sanitizeTags(unsanitizedTags);
    const bucketKey = getBucketKey(metricType, name, unit, tags);
    let bucketItem = this._buckets.get(bucketKey);
    const previousWeight = bucketItem && metricType === SET_METRIC_TYPE ? bucketItem.metric.weight : 0;
    if (bucketItem) {
      bucketItem.metric.add(value);
      if (bucketItem.timestamp < timestamp) {
        bucketItem.timestamp = timestamp;
      }
    } else {
      bucketItem = {
        // @ts-expect-error we don't need to narrow down the type of value here, saves bundle size.
        metric: new METRIC_MAP[metricType](value),
        timestamp,
        metricType,
        name,
        unit,
        tags
      };
      this._buckets.set(bucketKey, bucketItem);
    }
    const val = typeof value === "string" ? bucketItem.metric.weight - previousWeight : value;
    updateMetricSummaryOnActiveSpan(metricType, name, val, unit, unsanitizedTags, bucketKey);
  }
  /**
   * @inheritDoc
   */
  flush() {
    if (this._buckets.size === 0) {
      return;
    }
    if (this._client.captureAggregateMetrics) {
      const metricBuckets = Array.from(this._buckets).map(([, bucketItem]) => bucketItem);
      this._client.captureAggregateMetrics(metricBuckets);
    }
    this._buckets.clear();
  }
  /**
   * @inheritDoc
   */
  close() {
    clearInterval(this._interval);
    this.flush();
  }
};

// node_modules/@sentry/core/esm/metrics/integration.js
var INTEGRATION_NAME6 = "MetricsAggregator";
var _metricsAggregatorIntegration = () => {
  return {
    name: INTEGRATION_NAME6,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    setup(client) {
      client.metricsAggregator = new BrowserMetricsAggregator(client);
    }
  };
};
var metricsAggregatorIntegration = defineIntegration(_metricsAggregatorIntegration);
var MetricsAggregator2 = convertIntegrationFnToClass(
  INTEGRATION_NAME6,
  metricsAggregatorIntegration
);

// node_modules/@sentry/core/esm/metrics/exports.js
function addToMetricsAggregator(metricType, name, value, data = {}) {
  const client = getClient();
  const scope = getCurrentScope();
  if (client) {
    if (!client.metricsAggregator) {
      DEBUG_BUILD2 && logger.warn("No metrics aggregator enabled. Please add the MetricsAggregator integration to use metrics APIs");
      return;
    }
    const { unit, tags, timestamp } = data;
    const { release, environment } = client.getOptions();
    const transaction = scope.getTransaction();
    const metricTags = {};
    if (release) {
      metricTags.release = release;
    }
    if (environment) {
      metricTags.environment = environment;
    }
    if (transaction) {
      metricTags.transaction = spanToJSON(transaction).description || "";
    }
    DEBUG_BUILD2 && logger.log(`Adding value of ${value} to ${metricType} metric ${name}`);
    client.metricsAggregator.add(metricType, name, value, unit, { ...metricTags, ...tags }, timestamp);
  }
}
function increment(name, value = 1, data) {
  addToMetricsAggregator(COUNTER_METRIC_TYPE, name, value, data);
}
function distribution(name, value, data) {
  addToMetricsAggregator(DISTRIBUTION_METRIC_TYPE, name, value, data);
}
function set(name, value, data) {
  addToMetricsAggregator(SET_METRIC_TYPE, name, value, data);
}
function gauge(name, value, data) {
  addToMetricsAggregator(GAUGE_METRIC_TYPE, name, value, data);
}
var metrics = {
  increment,
  distribution,
  set,
  gauge,
  /** @deprecated Use `metrics.metricsAggregratorIntegration()` instead. */
  // eslint-disable-next-line deprecation/deprecation
  MetricsAggregator: MetricsAggregator2,
  metricsAggregatorIntegration
};

// node_modules/@sentry/core/esm/index.js
var Integrations = integrations_exports;

// node_modules/@sentry-internal/tracing/esm/common/debug-build.js
var DEBUG_BUILD3 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/@sentry-internal/tracing/esm/node/integrations/utils/node-utils.js
function shouldDisableAutoInstrumentation(getCurrentHub2) {
  const clientOptions = _optionalChain([getCurrentHub2, "call", (_) => _(), "access", (_2) => _2.getClient, "call", (_3) => _3(), "optionalAccess", (_4) => _4.getOptions, "call", (_5) => _5()]);
  const instrumenter = _optionalChain([clientOptions, "optionalAccess", (_6) => _6.instrumenter]) || "sentry";
  return instrumenter !== "sentry";
}

// node_modules/@sentry-internal/tracing/esm/node/integrations/express.js
var Express = class _Express {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Express";
  }
  /**
   * @inheritDoc
   */
  /**
   * Express App instance
   */
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = _Express.id;
    this._router = options.router || options.app;
    this._methods = (Array.isArray(options.methods) ? options.methods : []).concat("use");
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (!this._router) {
      DEBUG_BUILD3 && logger.error("ExpressIntegration is missing an Express instance");
      return;
    }
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("Express Integration is skipped because of instrumenter configuration.");
      return;
    }
    instrumentMiddlewares(this._router, this._methods);
    instrumentRouter(this._router);
  }
};
Express.__initStatic();
function wrap(fn, method) {
  const arity = fn.length;
  switch (arity) {
    case 2: {
      return function(req, res) {
        const transaction = res.__sentry_transaction;
        if (transaction) {
          const span = transaction.startChild({
            description: fn.name,
            op: `middleware.express.${method}`,
            origin: "auto.middleware.express"
          });
          res.once("finish", () => {
            span.end();
          });
        }
        return fn.call(this, req, res);
      };
    }
    case 3: {
      return function(req, res, next) {
        const transaction = res.__sentry_transaction;
        const span = _optionalChain([transaction, "optionalAccess", (_2) => _2.startChild, "call", (_3) => _3({
          description: fn.name,
          op: `middleware.express.${method}`,
          origin: "auto.middleware.express"
        })]);
        fn.call(this, req, res, function(...args) {
          _optionalChain([span, "optionalAccess", (_4) => _4.end, "call", (_5) => _5()]);
          next.call(this, ...args);
        });
      };
    }
    case 4: {
      return function(err, req, res, next) {
        const transaction = res.__sentry_transaction;
        const span = _optionalChain([transaction, "optionalAccess", (_6) => _6.startChild, "call", (_7) => _7({
          description: fn.name,
          op: `middleware.express.${method}`,
          origin: "auto.middleware.express"
        })]);
        fn.call(this, err, req, res, function(...args) {
          _optionalChain([span, "optionalAccess", (_8) => _8.end, "call", (_9) => _9()]);
          next.call(this, ...args);
        });
      };
    }
    default: {
      throw new Error(`Express middleware takes 2-4 arguments. Got: ${arity}`);
    }
  }
}
function wrapMiddlewareArgs(args, method) {
  return args.map((arg) => {
    if (typeof arg === "function") {
      return wrap(arg, method);
    }
    if (Array.isArray(arg)) {
      return arg.map((a) => {
        if (typeof a === "function") {
          return wrap(a, method);
        }
        return a;
      });
    }
    return arg;
  });
}
function patchMiddleware(router, method) {
  const originalCallback = router[method];
  router[method] = function(...args) {
    return originalCallback.call(this, ...wrapMiddlewareArgs(args, method));
  };
  return router;
}
function instrumentMiddlewares(router, methods = []) {
  methods.forEach((method) => patchMiddleware(router, method));
}
function instrumentRouter(appOrRouter) {
  const isApp = "settings" in appOrRouter;
  if (isApp && appOrRouter._router === void 0 && appOrRouter.lazyrouter) {
    appOrRouter.lazyrouter();
  }
  const router = isApp ? appOrRouter._router : appOrRouter;
  if (!router) {
    DEBUG_BUILD3 && logger.debug("Cannot instrument router for URL Parameterization (did not find a valid router).");
    DEBUG_BUILD3 && logger.debug("Routing instrumentation is currently only supported in Express 4.");
    return;
  }
  const routerProto = Object.getPrototypeOf(router);
  const originalProcessParams = routerProto.process_params;
  routerProto.process_params = function process_params(layer, called, req, res, done) {
    if (!req._reconstructedRoute) {
      req._reconstructedRoute = "";
    }
    const { layerRoutePath, isRegex, isArray, numExtraSegments } = getLayerRoutePathInfo(layer);
    if (layerRoutePath || isRegex || isArray) {
      req._hasParameters = true;
    }
    let partialRoute;
    if (layerRoutePath) {
      partialRoute = layerRoutePath;
    } else {
      partialRoute = preventDuplicateSegments(req.originalUrl, req._reconstructedRoute, layer.path) || "";
    }
    const finalPartialRoute = partialRoute.split("/").filter((segment) => segment.length > 0 && (isRegex || isArray || !segment.includes("*"))).join("/");
    if (finalPartialRoute && finalPartialRoute.length > 0) {
      req._reconstructedRoute += `/${finalPartialRoute}${isRegex ? "/" : ""}`;
    }
    const urlLength = getNumberOfUrlSegments(stripUrlQueryAndFragment(req.originalUrl || "")) + numExtraSegments;
    const routeLength = getNumberOfUrlSegments(req._reconstructedRoute);
    if (urlLength === routeLength) {
      if (!req._hasParameters) {
        if (req._reconstructedRoute !== req.originalUrl) {
          req._reconstructedRoute = req.originalUrl ? stripUrlQueryAndFragment(req.originalUrl) : req.originalUrl;
        }
      }
      const transaction = res.__sentry_transaction;
      const attributes = transaction && spanToJSON(transaction).data || {};
      if (transaction && attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] !== "custom") {
        const finalRoute = req._reconstructedRoute || "/";
        const [name, source] = extractPathForTransaction(req, { path: true, method: true, customRoute: finalRoute });
        transaction.updateName(name);
        transaction.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, source);
      }
    }
    return originalProcessParams.call(this, layer, called, req, res, done);
  };
}
var extractOriginalRoute = (path, regexp, keys2) => {
  if (!path || !regexp || !keys2 || Object.keys(keys2).length === 0 || !_optionalChain([keys2, "access", (_10) => _10[0], "optionalAccess", (_11) => _11.offset])) {
    return void 0;
  }
  const orderedKeys = keys2.sort((a, b) => a.offset - b.offset);
  const pathRegex = new RegExp(regexp, `${regexp.flags}d`);
  const execResult = pathRegex.exec(path);
  if (!execResult || !execResult.indices) {
    return void 0;
  }
  const [, ...paramIndices] = execResult.indices;
  if (paramIndices.length !== orderedKeys.length) {
    return void 0;
  }
  let resultPath = path;
  let indexShift = 0;
  paramIndices.forEach((item, index) => {
    if (item) {
      const [startOffset, endOffset] = item;
      const substr1 = resultPath.substring(0, startOffset - indexShift);
      const replacement = `:${orderedKeys[index].name}`;
      const substr2 = resultPath.substring(endOffset - indexShift);
      resultPath = substr1 + replacement + substr2;
      indexShift = indexShift + (endOffset - startOffset - replacement.length);
    }
  });
  return resultPath;
};
function getLayerRoutePathInfo(layer) {
  let lrp = _optionalChain([layer, "access", (_12) => _12.route, "optionalAccess", (_13) => _13.path]);
  const isRegex = isRegExp(lrp);
  const isArray = Array.isArray(lrp);
  if (!lrp) {
    const [major] = GLOBAL_OBJ.process.versions.node.split(".").map(Number);
    if (major >= 16) {
      lrp = extractOriginalRoute(layer.path, layer.regexp, layer.keys);
    }
  }
  if (!lrp) {
    return { isRegex, isArray, numExtraSegments: 0 };
  }
  const numExtraSegments = isArray ? Math.max(getNumberOfArrayUrlSegments(lrp) - getNumberOfUrlSegments(layer.path || ""), 0) : 0;
  const layerRoutePath = getLayerRoutePathString(isArray, lrp);
  return { layerRoutePath, isRegex, isArray, numExtraSegments };
}
function getNumberOfArrayUrlSegments(routesArray) {
  return routesArray.reduce((accNumSegments, currentRoute) => {
    return accNumSegments + getNumberOfUrlSegments(currentRoute.toString());
  }, 0);
}
function getLayerRoutePathString(isArray, lrp) {
  if (isArray) {
    return lrp.map((r3) => r3.toString()).join(",");
  }
  return lrp && lrp.toString();
}
function preventDuplicateSegments(originalUrl, reconstructedRoute, layerPath) {
  const normalizeURL = stripUrlQueryAndFragment(originalUrl || "");
  const originalUrlSplit = _optionalChain([normalizeURL, "optionalAccess", (_14) => _14.split, "call", (_15) => _15("/"), "access", (_16) => _16.filter, "call", (_17) => _17((v) => !!v)]);
  let tempCounter = 0;
  const currentOffset = _optionalChain([reconstructedRoute, "optionalAccess", (_18) => _18.split, "call", (_19) => _19("/"), "access", (_20) => _20.filter, "call", (_21) => _21((v) => !!v), "access", (_22) => _22.length]) || 0;
  const result = _optionalChain([
    layerPath,
    "optionalAccess",
    (_23) => _23.split,
    "call",
    (_24) => _24("/"),
    "access",
    (_25) => _25.filter,
    "call",
    (_26) => _26((segment) => {
      if (_optionalChain([originalUrlSplit, "optionalAccess", (_27) => _27[currentOffset + tempCounter]]) === segment) {
        tempCounter += 1;
        return true;
      }
      return false;
    }),
    "access",
    (_28) => _28.join,
    "call",
    (_29) => _29("/")
  ]);
  return result;
}

// node_modules/@sentry-internal/tracing/esm/node/integrations/postgres.js
var Postgres = class _Postgres {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Postgres";
  }
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = _Postgres.id;
    this._usePgNative = !!options.usePgNative;
    this._module = options.module;
  }
  /** @inheritdoc */
  loadDependency() {
    return this._module = this._module || loadModule("pg");
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("Postgres Integration is skipped because of instrumenter configuration.");
      return;
    }
    const pkg = this.loadDependency();
    if (!pkg) {
      DEBUG_BUILD3 && logger.error("Postgres Integration was unable to require `pg` package.");
      return;
    }
    const Client = this._usePgNative ? _optionalChain([pkg, "access", (_2) => _2.native, "optionalAccess", (_3) => _3.Client]) : pkg.Client;
    if (!Client) {
      DEBUG_BUILD3 && logger.error("Postgres Integration was unable to access 'pg-native' bindings.");
      return;
    }
    fill(Client.prototype, "query", function(orig) {
      return function(config, values, callback) {
        const scope = getCurrentHub2().getScope();
        const parentSpan = scope.getSpan();
        const data = {
          "db.system": "postgresql"
        };
        try {
          if (this.database) {
            data["db.name"] = this.database;
          }
          if (this.host) {
            data["server.address"] = this.host;
          }
          if (this.port) {
            data["server.port"] = this.port;
          }
          if (this.user) {
            data["db.user"] = this.user;
          }
        } catch (e2) {
        }
        const span = _optionalChain([parentSpan, "optionalAccess", (_4) => _4.startChild, "call", (_5) => _5({
          description: typeof config === "string" ? config : config.text,
          op: "db",
          origin: "auto.db.postgres",
          data
        })]);
        if (typeof callback === "function") {
          return orig.call(this, config, values, function(err, result) {
            _optionalChain([span, "optionalAccess", (_6) => _6.end, "call", (_7) => _7()]);
            callback(err, result);
          });
        }
        if (typeof values === "function") {
          return orig.call(this, config, function(err, result) {
            _optionalChain([span, "optionalAccess", (_8) => _8.end, "call", (_9) => _9()]);
            values(err, result);
          });
        }
        const rv = typeof values !== "undefined" ? orig.call(this, config, values) : orig.call(this, config);
        if (isThenable(rv)) {
          return rv.then((res) => {
            _optionalChain([span, "optionalAccess", (_10) => _10.end, "call", (_11) => _11()]);
            return res;
          });
        }
        _optionalChain([span, "optionalAccess", (_12) => _12.end, "call", (_13) => _13()]);
        return rv;
      };
    });
  }
};
Postgres.__initStatic();

// node_modules/@sentry-internal/tracing/esm/node/integrations/mysql.js
var Mysql = class _Mysql {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Mysql";
  }
  /**
   * @inheritDoc
   */
  constructor() {
    this.name = _Mysql.id;
  }
  /** @inheritdoc */
  loadDependency() {
    return this._module = this._module || loadModule("mysql/lib/Connection.js");
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("Mysql Integration is skipped because of instrumenter configuration.");
      return;
    }
    const pkg = this.loadDependency();
    if (!pkg) {
      DEBUG_BUILD3 && logger.error("Mysql Integration was unable to require `mysql` package.");
      return;
    }
    let mySqlConfig = void 0;
    try {
      pkg.prototype.connect = new Proxy(pkg.prototype.connect, {
        apply(wrappingTarget, thisArg, args) {
          if (!mySqlConfig) {
            mySqlConfig = thisArg.config;
          }
          return wrappingTarget.apply(thisArg, args);
        }
      });
    } catch (e2) {
      DEBUG_BUILD3 && logger.error("Mysql Integration was unable to instrument `mysql` config.");
    }
    function spanDataFromConfig() {
      if (!mySqlConfig) {
        return {};
      }
      return {
        "server.address": mySqlConfig.host,
        "server.port": mySqlConfig.port,
        "db.user": mySqlConfig.user
      };
    }
    function finishSpan(span) {
      if (!span) {
        return;
      }
      const data = spanDataFromConfig();
      Object.keys(data).forEach((key) => {
        span.setAttribute(key, data[key]);
      });
      span.end();
    }
    fill(pkg, "createQuery", function(orig) {
      return function(options, values, callback) {
        const scope = getCurrentHub2().getScope();
        const parentSpan = scope.getSpan();
        const span = _optionalChain([parentSpan, "optionalAccess", (_2) => _2.startChild, "call", (_3) => _3({
          description: typeof options === "string" ? options : options.sql,
          op: "db",
          origin: "auto.db.mysql",
          data: {
            "db.system": "mysql"
          }
        })]);
        if (typeof callback === "function") {
          return orig.call(this, options, values, function(err, result, fields) {
            finishSpan(span);
            callback(err, result, fields);
          });
        }
        if (typeof values === "function") {
          return orig.call(this, options, function(err, result, fields) {
            finishSpan(span);
            values(err, result, fields);
          });
        }
        const query = orig.call(this, options, values);
        query.on("end", () => {
          finishSpan(span);
        });
        return query;
      };
    });
  }
};
Mysql.__initStatic();

// node_modules/@sentry-internal/tracing/esm/node/integrations/mongo.js
var OPERATIONS = [
  "aggregate",
  // aggregate(pipeline, options, callback)
  "bulkWrite",
  // bulkWrite(operations, options, callback)
  "countDocuments",
  // countDocuments(query, options, callback)
  "createIndex",
  // createIndex(fieldOrSpec, options, callback)
  "createIndexes",
  // createIndexes(indexSpecs, options, callback)
  "deleteMany",
  // deleteMany(filter, options, callback)
  "deleteOne",
  // deleteOne(filter, options, callback)
  "distinct",
  // distinct(key, query, options, callback)
  "drop",
  // drop(options, callback)
  "dropIndex",
  // dropIndex(indexName, options, callback)
  "dropIndexes",
  // dropIndexes(options, callback)
  "estimatedDocumentCount",
  // estimatedDocumentCount(options, callback)
  "find",
  // find(query, options, callback)
  "findOne",
  // findOne(query, options, callback)
  "findOneAndDelete",
  // findOneAndDelete(filter, options, callback)
  "findOneAndReplace",
  // findOneAndReplace(filter, replacement, options, callback)
  "findOneAndUpdate",
  // findOneAndUpdate(filter, update, options, callback)
  "indexes",
  // indexes(options, callback)
  "indexExists",
  // indexExists(indexes, options, callback)
  "indexInformation",
  // indexInformation(options, callback)
  "initializeOrderedBulkOp",
  // initializeOrderedBulkOp(options, callback)
  "insertMany",
  // insertMany(docs, options, callback)
  "insertOne",
  // insertOne(doc, options, callback)
  "isCapped",
  // isCapped(options, callback)
  "mapReduce",
  // mapReduce(map, reduce, options, callback)
  "options",
  // options(options, callback)
  "parallelCollectionScan",
  // parallelCollectionScan(options, callback)
  "rename",
  // rename(newName, options, callback)
  "replaceOne",
  // replaceOne(filter, doc, options, callback)
  "stats",
  // stats(options, callback)
  "updateMany",
  // updateMany(filter, update, options, callback)
  "updateOne"
  // updateOne(filter, update, options, callback)
];
var OPERATION_SIGNATURES = {
  // aggregate intentionally not included because `pipeline` arguments are too complex to serialize well
  // see https://github.com/getsentry/sentry-javascript/pull/3102
  bulkWrite: ["operations"],
  countDocuments: ["query"],
  createIndex: ["fieldOrSpec"],
  createIndexes: ["indexSpecs"],
  deleteMany: ["filter"],
  deleteOne: ["filter"],
  distinct: ["key", "query"],
  dropIndex: ["indexName"],
  find: ["query"],
  findOne: ["query"],
  findOneAndDelete: ["filter"],
  findOneAndReplace: ["filter", "replacement"],
  findOneAndUpdate: ["filter", "update"],
  indexExists: ["indexes"],
  insertMany: ["docs"],
  insertOne: ["doc"],
  mapReduce: ["map", "reduce"],
  rename: ["newName"],
  replaceOne: ["filter", "doc"],
  updateMany: ["filter", "update"],
  updateOne: ["filter", "update"]
};
function isCursor(maybeCursor) {
  return maybeCursor && typeof maybeCursor === "object" && maybeCursor.once && typeof maybeCursor.once === "function";
}
var Mongo = class _Mongo {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Mongo";
  }
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = _Mongo.id;
    this._operations = Array.isArray(options.operations) ? options.operations : OPERATIONS;
    this._describeOperations = "describeOperations" in options ? options.describeOperations : true;
    this._useMongoose = !!options.useMongoose;
  }
  /** @inheritdoc */
  loadDependency() {
    const moduleName = this._useMongoose ? "mongoose" : "mongodb";
    return this._module = this._module || loadModule(moduleName);
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("Mongo Integration is skipped because of instrumenter configuration.");
      return;
    }
    const pkg = this.loadDependency();
    if (!pkg) {
      const moduleName = this._useMongoose ? "mongoose" : "mongodb";
      DEBUG_BUILD3 && logger.error(`Mongo Integration was unable to require \`${moduleName}\` package.`);
      return;
    }
    this._instrumentOperations(pkg.Collection, this._operations, getCurrentHub2);
  }
  /**
   * Patches original collection methods
   */
  _instrumentOperations(collection, operations, getCurrentHub2) {
    operations.forEach((operation) => this._patchOperation(collection, operation, getCurrentHub2));
  }
  /**
   * Patches original collection to utilize our tracing functionality
   */
  _patchOperation(collection, operation, getCurrentHub2) {
    if (!(operation in collection.prototype))
      return;
    const getSpanContext = this._getSpanContextFromOperationArguments.bind(this);
    fill(collection.prototype, operation, function(orig) {
      return function(...args) {
        const lastArg = args[args.length - 1];
        const hub = getCurrentHub2();
        const scope = hub.getScope();
        const client = hub.getClient();
        const parentSpan = scope.getSpan();
        const sendDefaultPii = _optionalChain([client, "optionalAccess", (_2) => _2.getOptions, "call", (_3) => _3(), "access", (_4) => _4.sendDefaultPii]);
        if (typeof lastArg !== "function" || operation === "mapReduce" && args.length === 2) {
          const span2 = _optionalChain([parentSpan, "optionalAccess", (_5) => _5.startChild, "call", (_6) => _6(getSpanContext(this, operation, args, sendDefaultPii))]);
          const maybePromiseOrCursor = orig.call(this, ...args);
          if (isThenable(maybePromiseOrCursor)) {
            return maybePromiseOrCursor.then((res) => {
              _optionalChain([span2, "optionalAccess", (_7) => _7.end, "call", (_8) => _8()]);
              return res;
            });
          } else if (isCursor(maybePromiseOrCursor)) {
            const cursor = maybePromiseOrCursor;
            try {
              cursor.once("close", () => {
                _optionalChain([span2, "optionalAccess", (_9) => _9.end, "call", (_10) => _10()]);
              });
            } catch (e2) {
              _optionalChain([span2, "optionalAccess", (_11) => _11.end, "call", (_12) => _12()]);
            }
            return cursor;
          } else {
            _optionalChain([span2, "optionalAccess", (_13) => _13.end, "call", (_14) => _14()]);
            return maybePromiseOrCursor;
          }
        }
        const span = _optionalChain([parentSpan, "optionalAccess", (_15) => _15.startChild, "call", (_16) => _16(getSpanContext(this, operation, args.slice(0, -1)))]);
        return orig.call(this, ...args.slice(0, -1), function(err, result) {
          _optionalChain([span, "optionalAccess", (_17) => _17.end, "call", (_18) => _18()]);
          lastArg(err, result);
        });
      };
    });
  }
  /**
   * Form a SpanContext based on the user input to a given operation.
   */
  _getSpanContextFromOperationArguments(collection, operation, args, sendDefaultPii = false) {
    const data = {
      "db.system": "mongodb",
      "db.name": collection.dbName,
      "db.operation": operation,
      "db.mongodb.collection": collection.collectionName
    };
    const spanContext = {
      op: "db",
      // TODO v8: Use `${collection.collectionName}.${operation}`
      origin: "auto.db.mongo",
      description: operation,
      data
    };
    const signature = OPERATION_SIGNATURES[operation];
    const shouldDescribe = Array.isArray(this._describeOperations) ? this._describeOperations.includes(operation) : this._describeOperations;
    if (!signature || !shouldDescribe || !sendDefaultPii) {
      return spanContext;
    }
    try {
      if (operation === "mapReduce") {
        const [map, reduce] = args;
        data[signature[0]] = typeof map === "string" ? map : map.name || "<anonymous>";
        data[signature[1]] = typeof reduce === "string" ? reduce : reduce.name || "<anonymous>";
      } else {
        for (let i = 0; i < signature.length; i++) {
          data[`db.mongodb.${signature[i]}`] = JSON.stringify(args[i]);
        }
      }
    } catch (_oO) {
    }
    return spanContext;
  }
};
Mongo.__initStatic();

// node_modules/@sentry-internal/tracing/esm/node/integrations/prisma.js
function isValidPrismaClient(possibleClient) {
  return !!possibleClient && !!possibleClient["$use"];
}
var Prisma = class _Prisma {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Prisma";
  }
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = _Prisma.id;
    if (isValidPrismaClient(options.client) && !options.client._sentryInstrumented) {
      addNonEnumerableProperty(options.client, "_sentryInstrumented", true);
      const clientData = {};
      try {
        const engineConfig = options.client._engineConfig;
        if (engineConfig) {
          const { activeProvider, clientVersion } = engineConfig;
          if (activeProvider) {
            clientData["db.system"] = activeProvider;
          }
          if (clientVersion) {
            clientData["db.prisma.version"] = clientVersion;
          }
        }
      } catch (e2) {
      }
      options.client.$use((params, next) => {
        if (shouldDisableAutoInstrumentation(getCurrentHub)) {
          return next(params);
        }
        const action = params.action;
        const model = params.model;
        return startSpan(
          {
            name: model ? `${model} ${action}` : action,
            onlyIfParent: true,
            op: "db.prisma",
            attributes: {
              [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.prisma"
            },
            data: { ...clientData, "db.operation": action }
          },
          () => next(params)
        );
      });
    } else {
      DEBUG_BUILD3 && logger.warn("Unsupported Prisma client provided to PrismaIntegration. Provided client:", options.client);
    }
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
  }
};
Prisma.__initStatic();

// node_modules/@sentry-internal/tracing/esm/node/integrations/graphql.js
var GraphQL = class _GraphQL {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "GraphQL";
  }
  /**
   * @inheritDoc
   */
  constructor() {
    this.name = _GraphQL.id;
  }
  /** @inheritdoc */
  loadDependency() {
    return this._module = this._module || loadModule("graphql/execution/execute.js");
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("GraphQL Integration is skipped because of instrumenter configuration.");
      return;
    }
    const pkg = this.loadDependency();
    if (!pkg) {
      DEBUG_BUILD3 && logger.error("GraphQL Integration was unable to require graphql/execution package.");
      return;
    }
    fill(pkg, "execute", function(orig) {
      return function(...args) {
        const scope = getCurrentHub2().getScope();
        const parentSpan = scope.getSpan();
        const span = _optionalChain([parentSpan, "optionalAccess", (_2) => _2.startChild, "call", (_3) => _3({
          description: "execute",
          op: "graphql.execute",
          origin: "auto.graphql.graphql"
        })]);
        _optionalChain([scope, "optionalAccess", (_4) => _4.setSpan, "call", (_5) => _5(span)]);
        const rv = orig.call(this, ...args);
        if (isThenable(rv)) {
          return rv.then((res) => {
            _optionalChain([span, "optionalAccess", (_6) => _6.end, "call", (_7) => _7()]);
            _optionalChain([scope, "optionalAccess", (_8) => _8.setSpan, "call", (_9) => _9(parentSpan)]);
            return res;
          });
        }
        _optionalChain([span, "optionalAccess", (_10) => _10.end, "call", (_11) => _11()]);
        _optionalChain([scope, "optionalAccess", (_12) => _12.setSpan, "call", (_13) => _13(parentSpan)]);
        return rv;
      };
    });
  }
};
GraphQL.__initStatic();

// node_modules/@sentry-internal/tracing/esm/node/integrations/apollo.js
var Apollo = class _Apollo {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Apollo";
  }
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  constructor(options = {
    useNestjs: false
  }) {
    this.name = _Apollo.id;
    this._useNest = !!options.useNestjs;
  }
  /** @inheritdoc */
  loadDependency() {
    if (this._useNest) {
      this._module = this._module || loadModule("@nestjs/graphql");
    } else {
      this._module = this._module || loadModule("apollo-server-core");
    }
    return this._module;
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    if (shouldDisableAutoInstrumentation(getCurrentHub2)) {
      DEBUG_BUILD3 && logger.log("Apollo Integration is skipped because of instrumenter configuration.");
      return;
    }
    if (this._useNest) {
      const pkg = this.loadDependency();
      if (!pkg) {
        DEBUG_BUILD3 && logger.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package.");
        return;
      }
      fill(
        pkg.GraphQLFactory.prototype,
        "mergeWithSchema",
        function(orig) {
          return function(...args) {
            fill(this.resolversExplorerService, "explore", function(orig2) {
              return function() {
                const resolvers = arrayify(orig2.call(this));
                const instrumentedResolvers = instrumentResolvers(resolvers, getCurrentHub2);
                return instrumentedResolvers;
              };
            });
            return orig.call(this, ...args);
          };
        }
      );
    } else {
      const pkg = this.loadDependency();
      if (!pkg) {
        DEBUG_BUILD3 && logger.error("Apollo Integration was unable to require apollo-server-core package.");
        return;
      }
      fill(pkg.ApolloServerBase.prototype, "constructSchema", function(orig) {
        return function() {
          if (!this.config.resolvers) {
            if (DEBUG_BUILD3) {
              if (this.config.schema) {
                logger.warn(
                  "Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."
                );
                logger.warn();
              } else if (this.config.modules) {
                logger.warn(
                  "Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property."
                );
              }
              logger.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.");
            }
            return orig.call(this);
          }
          const resolvers = arrayify(this.config.resolvers);
          this.config.resolvers = instrumentResolvers(resolvers, getCurrentHub2);
          return orig.call(this);
        };
      });
    }
  }
};
Apollo.__initStatic();
function instrumentResolvers(resolvers, getCurrentHub2) {
  return resolvers.map((model) => {
    Object.keys(model).forEach((resolverGroupName) => {
      Object.keys(model[resolverGroupName]).forEach((resolverName) => {
        if (typeof model[resolverGroupName][resolverName] !== "function") {
          return;
        }
        wrapResolver(model, resolverGroupName, resolverName, getCurrentHub2);
      });
    });
    return model;
  });
}
function wrapResolver(model, resolverGroupName, resolverName, getCurrentHub2) {
  fill(model[resolverGroupName], resolverName, function(orig) {
    return function(...args) {
      const scope = getCurrentHub2().getScope();
      const parentSpan = scope.getSpan();
      const span = _optionalChain([parentSpan, "optionalAccess", (_2) => _2.startChild, "call", (_3) => _3({
        description: `${resolverGroupName}.${resolverName}`,
        op: "graphql.resolve",
        origin: "auto.graphql.apollo"
      })]);
      const rv = orig.call(this, ...args);
      if (isThenable(rv)) {
        return rv.then((res) => {
          _optionalChain([span, "optionalAccess", (_4) => _4.end, "call", (_5) => _5()]);
          return res;
        });
      }
      _optionalChain([span, "optionalAccess", (_6) => _6.end, "call", (_7) => _7()]);
      return rv;
    };
  });
}

// node_modules/@sentry-internal/tracing/esm/browser/types.js
var WINDOW7 = GLOBAL_OBJ;

// node_modules/@sentry-internal/tracing/esm/browser/backgroundtab.js
function registerBackgroundTabDetection() {
  if (WINDOW7 && WINDOW7.document) {
    WINDOW7.document.addEventListener("visibilitychange", () => {
      const activeTransaction3 = getActiveTransaction();
      if (WINDOW7.document.hidden && activeTransaction3) {
        const statusType = "cancelled";
        const { op, status } = spanToJSON(activeTransaction3);
        DEBUG_BUILD3 && logger.log(`[Tracing] Transaction: ${statusType} -> since tab moved to the background, op: ${op}`);
        if (!status) {
          activeTransaction3.setStatus(statusType);
        }
        activeTransaction3.setTag("visibilitychange", "document.hidden");
        activeTransaction3.end();
      }
    });
  } else {
    DEBUG_BUILD3 && logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
  }
}

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/bindReporter.js
var bindReporter = (callback, metric, reportAllChanges) => {
  let prevValue;
  let delta;
  return (forceReport) => {
    if (metric.value >= 0) {
      if (forceReport || reportAllChanges) {
        delta = metric.value - (prevValue || 0);
        if (delta || prevValue === void 0) {
          prevValue = metric.value;
          metric.delta = delta;
          callback(metric);
        }
      }
    }
  };
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/generateUniqueID.js
var generateUniqueID = () => {
  return `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/getNavigationEntry.js
var getNavigationEntryFromPerformanceTiming = () => {
  const timing = WINDOW7.performance.timing;
  const type = WINDOW7.performance.navigation.type;
  const navigationEntry = {
    entryType: "navigation",
    startTime: 0,
    type: type == 2 ? "back_forward" : type === 1 ? "reload" : "navigate"
  };
  for (const key in timing) {
    if (key !== "navigationStart" && key !== "toJSON") {
      navigationEntry[key] = Math.max(timing[key] - timing.navigationStart, 0);
    }
  }
  return navigationEntry;
};
var getNavigationEntry = () => {
  if (WINDOW7.__WEB_VITALS_POLYFILL__) {
    return WINDOW7.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || getNavigationEntryFromPerformanceTiming());
  } else {
    return WINDOW7.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  }
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/getActivationStart.js
var getActivationStart = () => {
  const navEntry = getNavigationEntry();
  return navEntry && navEntry.activationStart || 0;
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/initMetric.js
var initMetric = (name, value) => {
  const navEntry = getNavigationEntry();
  let navigationType = "navigate";
  if (navEntry) {
    if (WINDOW7.document.prerendering || getActivationStart() > 0) {
      navigationType = "prerender";
    } else {
      navigationType = navEntry.type.replace(/_/g, "-");
    }
  }
  return {
    name,
    value: typeof value === "undefined" ? -1 : value,
    rating: "good",
    // Will be updated if the value changes.
    delta: 0,
    entries: [],
    id: generateUniqueID(),
    navigationType
  };
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/observe.js
var observe = (type, callback, opts) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      const po2 = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      po2.observe(
        Object.assign(
          {
            type,
            buffered: true
          },
          opts || {}
        )
      );
      return po2;
    }
  } catch (e2) {
  }
  return;
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/onHidden.js
var onHidden = (cb, once) => {
  const onHiddenOrPageHide = (event) => {
    if (event.type === "pagehide" || WINDOW7.document.visibilityState === "hidden") {
      cb(event);
      if (once) {
        removeEventListener("visibilitychange", onHiddenOrPageHide, true);
        removeEventListener("pagehide", onHiddenOrPageHide, true);
      }
    }
  };
  addEventListener("visibilitychange", onHiddenOrPageHide, true);
  addEventListener("pagehide", onHiddenOrPageHide, true);
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/getCLS.js
var onCLS = (onReport) => {
  const metric = initMetric("CLS", 0);
  let report;
  let sessionValue = 0;
  let sessionEntries = [];
  const handleEntries = (entries) => {
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        if (sessionValue && sessionEntries.length !== 0 && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }
        if (sessionValue > metric.value) {
          metric.value = sessionValue;
          metric.entries = sessionEntries;
          if (report) {
            report();
          }
        }
      }
    });
  };
  const po2 = observe("layout-shift", handleEntries);
  if (po2) {
    report = bindReporter(onReport, metric);
    const stopListening = () => {
      handleEntries(po2.takeRecords());
      report(true);
    };
    onHidden(stopListening);
    return stopListening;
  }
  return;
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/getVisibilityWatcher.js
var firstHiddenTime = -1;
var initHiddenTime = () => {
  return WINDOW7.document.visibilityState === "hidden" && !WINDOW7.document.prerendering ? 0 : Infinity;
};
var trackChanges = () => {
  onHidden(({ timeStamp }) => {
    firstHiddenTime = timeStamp;
  }, true);
};
var getVisibilityWatcher = () => {
  if (firstHiddenTime < 0) {
    firstHiddenTime = initHiddenTime();
    trackChanges();
  }
  return {
    get firstHiddenTime() {
      return firstHiddenTime;
    }
  };
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/getFID.js
var onFID = (onReport) => {
  const visibilityWatcher = getVisibilityWatcher();
  const metric = initMetric("FID");
  let report;
  const handleEntry = (entry) => {
    if (entry.startTime < visibilityWatcher.firstHiddenTime) {
      metric.value = entry.processingStart - entry.startTime;
      metric.entries.push(entry);
      report(true);
    }
  };
  const handleEntries = (entries) => {
    entries.forEach(handleEntry);
  };
  const po2 = observe("first-input", handleEntries);
  report = bindReporter(onReport, metric);
  if (po2) {
    onHidden(() => {
      handleEntries(po2.takeRecords());
      po2.disconnect();
    }, true);
  }
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/lib/polyfills/interactionCountPolyfill.js
var interactionCountEstimate = 0;
var minKnownInteractionId = Infinity;
var maxKnownInteractionId = 0;
var updateEstimate = (entries) => {
  entries.forEach((e2) => {
    if (e2.interactionId) {
      minKnownInteractionId = Math.min(minKnownInteractionId, e2.interactionId);
      maxKnownInteractionId = Math.max(maxKnownInteractionId, e2.interactionId);
      interactionCountEstimate = maxKnownInteractionId ? (maxKnownInteractionId - minKnownInteractionId) / 7 + 1 : 0;
    }
  });
};
var po;
var getInteractionCount = () => {
  return po ? interactionCountEstimate : performance.interactionCount || 0;
};
var initInteractionCountPolyfill = () => {
  if ("interactionCount" in performance || po)
    return;
  po = observe("event", updateEstimate, {
    type: "event",
    buffered: true,
    durationThreshold: 0
  });
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/getINP.js
var getInteractionCountForNavigation = () => {
  return getInteractionCount();
};
var MAX_INTERACTIONS_TO_CONSIDER = 10;
var longestInteractionList = [];
var longestInteractionMap = {};
var processEntry = (entry) => {
  const minLongestInteraction = longestInteractionList[longestInteractionList.length - 1];
  const existingInteraction = longestInteractionMap[entry.interactionId];
  if (existingInteraction || longestInteractionList.length < MAX_INTERACTIONS_TO_CONSIDER || entry.duration > minLongestInteraction.latency) {
    if (existingInteraction) {
      existingInteraction.entries.push(entry);
      existingInteraction.latency = Math.max(existingInteraction.latency, entry.duration);
    } else {
      const interaction = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: entry.interactionId,
        latency: entry.duration,
        entries: [entry]
      };
      longestInteractionMap[interaction.id] = interaction;
      longestInteractionList.push(interaction);
    }
    longestInteractionList.sort((a, b) => b.latency - a.latency);
    longestInteractionList.splice(MAX_INTERACTIONS_TO_CONSIDER).forEach((i) => {
      delete longestInteractionMap[i.id];
    });
  }
};
var estimateP98LongestInteraction = () => {
  const candidateInteractionIndex = Math.min(
    longestInteractionList.length - 1,
    Math.floor(getInteractionCountForNavigation() / 50)
  );
  return longestInteractionList[candidateInteractionIndex];
};
var onINP = (onReport, opts) => {
  opts = opts || {};
  initInteractionCountPolyfill();
  const metric = initMetric("INP");
  let report;
  const handleEntries = (entries) => {
    entries.forEach((entry) => {
      if (entry.interactionId) {
        processEntry(entry);
      }
      if (entry.entryType === "first-input") {
        const noMatchingEntry = !longestInteractionList.some((interaction) => {
          return interaction.entries.some((prevEntry) => {
            return entry.duration === prevEntry.duration && entry.startTime === prevEntry.startTime;
          });
        });
        if (noMatchingEntry) {
          processEntry(entry);
        }
      }
    });
    const inp = estimateP98LongestInteraction();
    if (inp && inp.latency !== metric.value) {
      metric.value = inp.latency;
      metric.entries = inp.entries;
      report();
    }
  };
  const po2 = observe("event", handleEntries, {
    // Event Timing entries have their durations rounded to the nearest 8ms,
    // so a duration of 40ms would be any event that spans 2.5 or more frames
    // at 60Hz. This threshold is chosen to strike a balance between usefulness
    // and performance. Running this callback for any interaction that spans
    // just one or two frames is likely not worth the insight that could be
    // gained.
    durationThreshold: opts.durationThreshold || 40
  });
  report = bindReporter(onReport, metric, opts.reportAllChanges);
  if (po2) {
    po2.observe({ type: "first-input", buffered: true });
    onHidden(() => {
      handleEntries(po2.takeRecords());
      if (metric.value < 0 && getInteractionCountForNavigation() > 0) {
        metric.value = 0;
        metric.entries = [];
      }
      report(true);
    });
  }
};

// node_modules/@sentry-internal/tracing/esm/browser/web-vitals/getLCP.js
var reportedMetricIDs = {};
var onLCP = (onReport) => {
  const visibilityWatcher = getVisibilityWatcher();
  const metric = initMetric("LCP");
  let report;
  const handleEntries = (entries) => {
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      const value = Math.max(lastEntry.startTime - getActivationStart(), 0);
      if (value < visibilityWatcher.firstHiddenTime) {
        metric.value = value;
        metric.entries = [lastEntry];
        report();
      }
    }
  };
  const po2 = observe("largest-contentful-paint", handleEntries);
  if (po2) {
    report = bindReporter(onReport, metric);
    const stopListening = () => {
      if (!reportedMetricIDs[metric.id]) {
        handleEntries(po2.takeRecords());
        po2.disconnect();
        reportedMetricIDs[metric.id] = true;
        report(true);
      }
    };
    ["keydown", "click"].forEach((type) => {
      addEventListener(type, stopListening, { once: true, capture: true });
    });
    onHidden(stopListening, true);
    return stopListening;
  }
  return;
};

// node_modules/@sentry-internal/tracing/esm/browser/instrument.js
var handlers2 = {};
var instrumented2 = {};
var _previousCls;
var _previousFid;
var _previousLcp;
var _previousInp;
function addClsInstrumentationHandler(callback, stopOnCallback = false) {
  return addMetricObserver("cls", callback, instrumentCls, _previousCls, stopOnCallback);
}
function addLcpInstrumentationHandler(callback, stopOnCallback = false) {
  return addMetricObserver("lcp", callback, instrumentLcp, _previousLcp, stopOnCallback);
}
function addFidInstrumentationHandler(callback) {
  return addMetricObserver("fid", callback, instrumentFid, _previousFid);
}
function addInpInstrumentationHandler(callback) {
  return addMetricObserver("inp", callback, instrumentInp, _previousInp);
}
function addPerformanceInstrumentationHandler(type, callback) {
  addHandler2(type, callback);
  if (!instrumented2[type]) {
    instrumentPerformanceObserver(type);
    instrumented2[type] = true;
  }
  return getCleanupCallback(type, callback);
}
function triggerHandlers2(type, data) {
  const typeHandlers = handlers2[type];
  if (!typeHandlers || !typeHandlers.length) {
    return;
  }
  for (const handler of typeHandlers) {
    try {
      handler(data);
    } catch (e2) {
      DEBUG_BUILD3 && logger.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`,
        e2
      );
    }
  }
}
function instrumentCls() {
  return onCLS((metric) => {
    triggerHandlers2("cls", {
      metric
    });
    _previousCls = metric;
  });
}
function instrumentFid() {
  return onFID((metric) => {
    triggerHandlers2("fid", {
      metric
    });
    _previousFid = metric;
  });
}
function instrumentLcp() {
  return onLCP((metric) => {
    triggerHandlers2("lcp", {
      metric
    });
    _previousLcp = metric;
  });
}
function instrumentInp() {
  return onINP((metric) => {
    triggerHandlers2("inp", {
      metric
    });
    _previousInp = metric;
  });
}
function addMetricObserver(type, callback, instrumentFn, previousValue, stopOnCallback = false) {
  addHandler2(type, callback);
  let stopListening;
  if (!instrumented2[type]) {
    stopListening = instrumentFn();
    instrumented2[type] = true;
  }
  if (previousValue) {
    callback({ metric: previousValue });
  }
  return getCleanupCallback(type, callback, stopOnCallback ? stopListening : void 0);
}
function instrumentPerformanceObserver(type) {
  const options = {};
  if (type === "event") {
    options.durationThreshold = 0;
  }
  observe(
    type,
    (entries) => {
      triggerHandlers2(type, { entries });
    },
    options
  );
}
function addHandler2(type, handler) {
  handlers2[type] = handlers2[type] || [];
  handlers2[type].push(handler);
}
function getCleanupCallback(type, callback, stopListening) {
  return () => {
    if (stopListening) {
      stopListening();
    }
    const typeHandlers = handlers2[type];
    if (!typeHandlers) {
      return;
    }
    const index = typeHandlers.indexOf(callback);
    if (index !== -1) {
      typeHandlers.splice(index, 1);
    }
  };
}

// node_modules/@sentry-internal/tracing/esm/browser/metrics/utils.js
function isMeasurementValue(value) {
  return typeof value === "number" && isFinite(value);
}
function _startChild(transaction, { startTimestamp, ...ctx }) {
  if (startTimestamp && transaction.startTimestamp > startTimestamp) {
    transaction.startTimestamp = startTimestamp;
  }
  return transaction.startChild({
    startTimestamp,
    ...ctx
  });
}

// node_modules/@sentry-internal/tracing/esm/browser/metrics/index.js
var MAX_INT_AS_BYTES = 2147483647;
function msToSec(time) {
  return time / 1e3;
}
function getBrowserPerformanceAPI() {
  return WINDOW7 && WINDOW7.addEventListener && WINDOW7.performance;
}
var _performanceCursor = 0;
var _measurements = {};
var _lcpEntry;
var _clsEntry;
function startTrackingWebVitals() {
  const performance2 = getBrowserPerformanceAPI();
  if (performance2 && browserPerformanceTimeOrigin) {
    if (performance2.mark) {
      WINDOW7.performance.mark("sentry-tracing-init");
    }
    const fidCallback = _trackFID();
    const clsCallback = _trackCLS();
    const lcpCallback = _trackLCP();
    return () => {
      fidCallback();
      clsCallback();
      lcpCallback();
    };
  }
  return () => void 0;
}
function startTrackingLongTasks() {
  addPerformanceInstrumentationHandler("longtask", ({ entries }) => {
    for (const entry of entries) {
      const transaction = getActiveTransaction();
      if (!transaction) {
        return;
      }
      const startTime = msToSec(browserPerformanceTimeOrigin + entry.startTime);
      const duration = msToSec(entry.duration);
      transaction.startChild({
        description: "Main UI thread blocked",
        op: "ui.long-task",
        origin: "auto.ui.browser.metrics",
        startTimestamp: startTime,
        endTimestamp: startTime + duration
      });
    }
  });
}
function startTrackingInteractions() {
  addPerformanceInstrumentationHandler("event", ({ entries }) => {
    for (const entry of entries) {
      const transaction = getActiveTransaction();
      if (!transaction) {
        return;
      }
      if (entry.name === "click") {
        const startTime = msToSec(browserPerformanceTimeOrigin + entry.startTime);
        const duration = msToSec(entry.duration);
        const span = {
          description: htmlTreeAsString(entry.target),
          op: `ui.interaction.${entry.name}`,
          origin: "auto.ui.browser.metrics",
          startTimestamp: startTime,
          endTimestamp: startTime + duration
        };
        const componentName = getComponentName(entry.target);
        if (componentName) {
          span.attributes = { "ui.component_name": componentName };
        }
        transaction.startChild(span);
      }
    }
  });
}
function startTrackingINP(interactionIdtoRouteNameMapping) {
  const performance2 = getBrowserPerformanceAPI();
  if (performance2 && browserPerformanceTimeOrigin) {
    const inpCallback = _trackINP(interactionIdtoRouteNameMapping);
    return () => {
      inpCallback();
    };
  }
  return () => void 0;
}
function _trackCLS() {
  return addClsInstrumentationHandler(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    DEBUG_BUILD3 && logger.log("[Measurements] Adding CLS");
    _measurements["cls"] = { value: metric.value, unit: "" };
    _clsEntry = entry;
  }, true);
}
function _trackLCP() {
  return addLcpInstrumentationHandler(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    DEBUG_BUILD3 && logger.log("[Measurements] Adding LCP");
    _measurements["lcp"] = { value: metric.value, unit: "millisecond" };
    _lcpEntry = entry;
  }, true);
}
function _trackFID() {
  return addFidInstrumentationHandler(({ metric }) => {
    const entry = metric.entries[metric.entries.length - 1];
    if (!entry) {
      return;
    }
    const timeOrigin = msToSec(browserPerformanceTimeOrigin);
    const startTime = msToSec(entry.startTime);
    DEBUG_BUILD3 && logger.log("[Measurements] Adding FID");
    _measurements["fid"] = { value: metric.value, unit: "millisecond" };
    _measurements["mark.fid"] = { value: timeOrigin + startTime, unit: "second" };
  });
}
function _trackINP(interactionIdtoRouteNameMapping) {
  return addInpInstrumentationHandler(({ metric }) => {
    const entry = metric.entries.find((e2) => e2.name === "click" || e2.name === "pointerdown");
    const client = getClient();
    if (!entry || !client) {
      return;
    }
    const options = client.getOptions();
    const startTime = msToSec(browserPerformanceTimeOrigin + entry.startTime);
    const duration = msToSec(metric.value);
    const { routeName, parentContext, activeTransaction: activeTransaction3, user, replayId } = entry.interactionId !== void 0 ? interactionIdtoRouteNameMapping[entry.interactionId] : {
      routeName: void 0,
      parentContext: void 0,
      activeTransaction: void 0,
      user: void 0,
      replayId: void 0
    };
    const userDisplay = user !== void 0 ? user.email || user.id || user.ip_address : void 0;
    const profileId = activeTransaction3 !== void 0 ? activeTransaction3.getProfileId() : void 0;
    const span = new Span({
      startTimestamp: startTime,
      endTimestamp: startTime + duration,
      op: "ui.interaction.click",
      name: htmlTreeAsString(entry.target),
      attributes: {
        release: options.release,
        environment: options.environment,
        transaction: routeName,
        ...userDisplay !== void 0 && userDisplay !== "" ? { user: userDisplay } : {},
        ...profileId !== void 0 ? { profile_id: profileId } : {},
        ...replayId !== void 0 ? { replay_id: replayId } : {}
      },
      exclusiveTime: metric.value,
      measurements: {
        inp: { value: metric.value, unit: "millisecond" }
      }
    });
    const sampleRate = getSampleRate(parentContext, options);
    if (!sampleRate) {
      return;
    }
    if (Math.random() < sampleRate) {
      const envelope = span ? createSpanEnvelope([span], client.getDsn()) : void 0;
      const transport = client && client.getTransport();
      if (transport && envelope) {
        transport.send(envelope).then(null, (reason) => {
          DEBUG_BUILD3 && logger.error("Error while sending interaction:", reason);
        });
      }
      return;
    }
  });
}
function addPerformanceEntries(transaction) {
  const performance2 = getBrowserPerformanceAPI();
  if (!performance2 || !WINDOW7.performance.getEntries || !browserPerformanceTimeOrigin) {
    return;
  }
  DEBUG_BUILD3 && logger.log("[Tracing] Adding & adjusting spans using Performance API");
  const timeOrigin = msToSec(browserPerformanceTimeOrigin);
  const performanceEntries = performance2.getEntries();
  let responseStartTimestamp;
  let requestStartTimestamp;
  const { op, start_timestamp: transactionStartTime } = spanToJSON(transaction);
  performanceEntries.slice(_performanceCursor).forEach((entry) => {
    const startTime = msToSec(entry.startTime);
    const duration = msToSec(entry.duration);
    if (transaction.op === "navigation" && transactionStartTime && timeOrigin + startTime < transactionStartTime) {
      return;
    }
    switch (entry.entryType) {
      case "navigation": {
        _addNavigationSpans(transaction, entry, timeOrigin);
        responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
        requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
        break;
      }
      case "mark":
      case "paint":
      case "measure": {
        _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
        const firstHidden = getVisibilityWatcher();
        const shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
        if (entry.name === "first-paint" && shouldRecord) {
          DEBUG_BUILD3 && logger.log("[Measurements] Adding FP");
          _measurements["fp"] = { value: entry.startTime, unit: "millisecond" };
        }
        if (entry.name === "first-contentful-paint" && shouldRecord) {
          DEBUG_BUILD3 && logger.log("[Measurements] Adding FCP");
          _measurements["fcp"] = { value: entry.startTime, unit: "millisecond" };
        }
        break;
      }
      case "resource": {
        _addResourceSpans(transaction, entry, entry.name, startTime, duration, timeOrigin);
        break;
      }
    }
  });
  _performanceCursor = Math.max(performanceEntries.length - 1, 0);
  _trackNavigator(transaction);
  if (op === "pageload") {
    _addTtfbToMeasurements(_measurements, responseStartTimestamp, requestStartTimestamp, transactionStartTime);
    ["fcp", "fp", "lcp"].forEach((name) => {
      if (!_measurements[name] || !transactionStartTime || timeOrigin >= transactionStartTime) {
        return;
      }
      const oldValue = _measurements[name].value;
      const measurementTimestamp = timeOrigin + msToSec(oldValue);
      const normalizedValue = Math.abs((measurementTimestamp - transactionStartTime) * 1e3);
      const delta = normalizedValue - oldValue;
      DEBUG_BUILD3 && logger.log(`[Measurements] Normalized ${name} from ${oldValue} to ${normalizedValue} (${delta})`);
      _measurements[name].value = normalizedValue;
    });
    const fidMark = _measurements["mark.fid"];
    if (fidMark && _measurements["fid"]) {
      _startChild(transaction, {
        description: "first input delay",
        endTimestamp: fidMark.value + msToSec(_measurements["fid"].value),
        op: "ui.action",
        origin: "auto.ui.browser.metrics",
        startTimestamp: fidMark.value
      });
      delete _measurements["mark.fid"];
    }
    if (!("fcp" in _measurements)) {
      delete _measurements.cls;
    }
    Object.keys(_measurements).forEach((measurementName) => {
      setMeasurement(measurementName, _measurements[measurementName].value, _measurements[measurementName].unit);
    });
    _tagMetricInfo(transaction);
  }
  _lcpEntry = void 0;
  _clsEntry = void 0;
  _measurements = {};
}
function _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
  const measureStartTimestamp = timeOrigin + startTime;
  const measureEndTimestamp = measureStartTimestamp + duration;
  _startChild(transaction, {
    description: entry.name,
    endTimestamp: measureEndTimestamp,
    op: entry.entryType,
    origin: "auto.resource.browser.metrics",
    startTimestamp: measureStartTimestamp
  });
  return measureStartTimestamp;
}
function _addNavigationSpans(transaction, entry, timeOrigin) {
  ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((event) => {
    _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin);
  });
  _addPerformanceNavigationTiming(transaction, entry, "secureConnection", timeOrigin, "TLS/SSL", "connectEnd");
  _addPerformanceNavigationTiming(transaction, entry, "fetch", timeOrigin, "cache", "domainLookupStart");
  _addPerformanceNavigationTiming(transaction, entry, "domainLookup", timeOrigin, "DNS");
  _addRequest(transaction, entry, timeOrigin);
}
function _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin, description, eventEnd) {
  const end = eventEnd ? entry[eventEnd] : entry[`${event}End`];
  const start = entry[`${event}Start`];
  if (!start || !end) {
    return;
  }
  _startChild(transaction, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: description || event,
    startTimestamp: timeOrigin + msToSec(start),
    endTimestamp: timeOrigin + msToSec(end)
  });
}
function _addRequest(transaction, entry, timeOrigin) {
  if (entry.responseEnd) {
    _startChild(transaction, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: timeOrigin + msToSec(entry.requestStart),
      endTimestamp: timeOrigin + msToSec(entry.responseEnd)
    });
    _startChild(transaction, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: timeOrigin + msToSec(entry.responseStart),
      endTimestamp: timeOrigin + msToSec(entry.responseEnd)
    });
  }
}
function _addResourceSpans(transaction, entry, resourceUrl, startTime, duration, timeOrigin) {
  if (entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch") {
    return;
  }
  const parsedUrl = parseUrl2(resourceUrl);
  const data = {};
  setResourceEntrySizeData(data, entry, "transferSize", "http.response_transfer_size");
  setResourceEntrySizeData(data, entry, "encodedBodySize", "http.response_content_length");
  setResourceEntrySizeData(data, entry, "decodedBodySize", "http.decoded_response_content_length");
  if ("renderBlockingStatus" in entry) {
    data["resource.render_blocking_status"] = entry.renderBlockingStatus;
  }
  if (parsedUrl.protocol) {
    data["url.scheme"] = parsedUrl.protocol.split(":").pop();
  }
  if (parsedUrl.host) {
    data["server.address"] = parsedUrl.host;
  }
  data["url.same_origin"] = resourceUrl.includes(WINDOW7.location.origin);
  const startTimestamp = timeOrigin + startTime;
  const endTimestamp = startTimestamp + duration;
  _startChild(transaction, {
    description: resourceUrl.replace(WINDOW7.location.origin, ""),
    endTimestamp,
    op: entry.initiatorType ? `resource.${entry.initiatorType}` : "resource.other",
    origin: "auto.resource.browser.metrics",
    startTimestamp,
    data
  });
}
function _trackNavigator(transaction) {
  const navigator = WINDOW7.navigator;
  if (!navigator) {
    return;
  }
  const connection = navigator.connection;
  if (connection) {
    if (connection.effectiveType) {
      transaction.setTag("effectiveConnectionType", connection.effectiveType);
    }
    if (connection.type) {
      transaction.setTag("connectionType", connection.type);
    }
    if (isMeasurementValue(connection.rtt)) {
      _measurements["connection.rtt"] = { value: connection.rtt, unit: "millisecond" };
    }
  }
  if (isMeasurementValue(navigator.deviceMemory)) {
    transaction.setTag("deviceMemory", `${navigator.deviceMemory} GB`);
  }
  if (isMeasurementValue(navigator.hardwareConcurrency)) {
    transaction.setTag("hardwareConcurrency", String(navigator.hardwareConcurrency));
  }
}
function _tagMetricInfo(transaction) {
  if (_lcpEntry) {
    DEBUG_BUILD3 && logger.log("[Measurements] Adding LCP Data");
    if (_lcpEntry.element) {
      transaction.setTag("lcp.element", htmlTreeAsString(_lcpEntry.element));
    }
    if (_lcpEntry.id) {
      transaction.setTag("lcp.id", _lcpEntry.id);
    }
    if (_lcpEntry.url) {
      transaction.setTag("lcp.url", _lcpEntry.url.trim().slice(0, 200));
    }
    transaction.setTag("lcp.size", _lcpEntry.size);
  }
  if (_clsEntry && _clsEntry.sources) {
    DEBUG_BUILD3 && logger.log("[Measurements] Adding CLS Data");
    _clsEntry.sources.forEach(
      (source, index) => (
        // TODO: Can we rewrite this to an attribute?
        // eslint-disable-next-line deprecation/deprecation
        transaction.setTag(`cls.source.${index + 1}`, htmlTreeAsString(source.node))
      )
    );
  }
}
function setResourceEntrySizeData(data, entry, key, dataKey) {
  const entryVal = entry[key];
  if (entryVal != null && entryVal < MAX_INT_AS_BYTES) {
    data[dataKey] = entryVal;
  }
}
function _addTtfbToMeasurements(_measurements2, responseStartTimestamp, requestStartTimestamp, transactionStartTime) {
  if (typeof responseStartTimestamp === "number" && transactionStartTime) {
    DEBUG_BUILD3 && logger.log("[Measurements] Adding TTFB");
    _measurements2["ttfb"] = {
      // As per https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseStart,
      // responseStart can be 0 if the request is coming straight from the cache.
      // This might lead us to calculate a negative ttfb if we don't use Math.max here.
      //
      // This logic is the same as what is in the web-vitals library to calculate ttfb
      // https://github.com/GoogleChrome/web-vitals/blob/2301de5015e82b09925238a228a0893635854587/src/onTTFB.ts#L92
      // TODO(abhi): We should use the web-vitals library instead of this custom calculation.
      value: Math.max(responseStartTimestamp - transactionStartTime, 0) * 1e3,
      unit: "millisecond"
    };
    if (typeof requestStartTimestamp === "number" && requestStartTimestamp <= responseStartTimestamp) {
      _measurements2["ttfb.requestTime"] = {
        value: (responseStartTimestamp - requestStartTimestamp) * 1e3,
        unit: "millisecond"
      };
    }
  }
}
function getSampleRate(transactionContext, options) {
  if (!hasTracingEnabled(options)) {
    return false;
  }
  let sampleRate;
  if (transactionContext !== void 0 && typeof options.tracesSampler === "function") {
    sampleRate = options.tracesSampler({
      transactionContext,
      name: transactionContext.name,
      parentSampled: transactionContext.parentSampled,
      attributes: {
        // eslint-disable-next-line deprecation/deprecation
        ...transactionContext.data,
        ...transactionContext.attributes
      },
      location: WINDOW7.location
    });
  } else if (transactionContext !== void 0 && transactionContext.sampled !== void 0) {
    sampleRate = transactionContext.sampled;
  } else if (typeof options.tracesSampleRate !== "undefined") {
    sampleRate = options.tracesSampleRate;
  } else {
    sampleRate = 1;
  }
  if (!isValidSampleRate(sampleRate)) {
    DEBUG_BUILD3 && logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
    return false;
  }
  return sampleRate;
}

// node_modules/@sentry-internal/tracing/esm/common/fetch.js
function instrumentFetchRequest(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans, spanOrigin = "auto.http.browser") {
  if (!hasTracingEnabled() || !handlerData.fetchData) {
    return void 0;
  }
  const shouldCreateSpanResult = shouldCreateSpan(handlerData.fetchData.url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = handlerData.fetchData.__span;
    if (!spanId)
      return;
    const span2 = spans[spanId];
    if (span2) {
      if (handlerData.response) {
        setHttpStatus(span2, handlerData.response.status);
        const contentLength = handlerData.response && handlerData.response.headers && handlerData.response.headers.get("content-length");
        if (contentLength) {
          const contentLengthNum = parseInt(contentLength);
          if (contentLengthNum > 0) {
            span2.setAttribute("http.response_content_length", contentLengthNum);
          }
        }
      } else if (handlerData.error) {
        span2.setStatus("internal_error");
      }
      span2.end();
      delete spans[spanId];
    }
    return void 0;
  }
  const scope = getCurrentScope();
  const client = getClient();
  const { method, url } = handlerData.fetchData;
  const span = shouldCreateSpanResult ? startInactiveSpan({
    name: `${method} ${url}`,
    onlyIfParent: true,
    attributes: {
      url,
      type: "fetch",
      "http.method": method,
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: spanOrigin
    },
    op: "http.client"
  }) : void 0;
  if (span) {
    handlerData.fetchData.__span = span.spanContext().spanId;
    spans[span.spanContext().spanId] = span;
  }
  if (shouldAttachHeaders2(handlerData.fetchData.url) && client) {
    const request = handlerData.args[0];
    handlerData.args[1] = handlerData.args[1] || {};
    const options = handlerData.args[1];
    options.headers = addTracingHeadersToFetchRequest(request, client, scope, options, span);
  }
  return span;
}
function addTracingHeadersToFetchRequest(request, client, scope, options, requestSpan) {
  const span = requestSpan || scope.getSpan();
  const isolationScope = getIsolationScope();
  const { traceId, spanId, sampled, dsc } = {
    ...isolationScope.getPropagationContext(),
    ...scope.getPropagationContext()
  };
  const sentryTraceHeader = span ? spanToTraceHeader(span) : generateSentryTraceHeader(traceId, spanId, sampled);
  const sentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader(
    dsc || (span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromClient(traceId, client, scope))
  );
  const headers = options.headers || (typeof Request !== "undefined" && isInstanceOf(request, Request) ? request.headers : void 0);
  if (!headers) {
    return { "sentry-trace": sentryTraceHeader, baggage: sentryBaggageHeader };
  } else if (typeof Headers !== "undefined" && isInstanceOf(headers, Headers)) {
    const newHeaders = new Headers(headers);
    newHeaders.append("sentry-trace", sentryTraceHeader);
    if (sentryBaggageHeader) {
      newHeaders.append(BAGGAGE_HEADER_NAME, sentryBaggageHeader);
    }
    return newHeaders;
  } else if (Array.isArray(headers)) {
    const newHeaders = [...headers, ["sentry-trace", sentryTraceHeader]];
    if (sentryBaggageHeader) {
      newHeaders.push([BAGGAGE_HEADER_NAME, sentryBaggageHeader]);
    }
    return newHeaders;
  } else {
    const existingBaggageHeader = "baggage" in headers ? headers.baggage : void 0;
    const newBaggageHeaders = [];
    if (Array.isArray(existingBaggageHeader)) {
      newBaggageHeaders.push(...existingBaggageHeader);
    } else if (existingBaggageHeader) {
      newBaggageHeaders.push(existingBaggageHeader);
    }
    if (sentryBaggageHeader) {
      newBaggageHeaders.push(sentryBaggageHeader);
    }
    return {
      ...headers,
      "sentry-trace": sentryTraceHeader,
      baggage: newBaggageHeaders.length > 0 ? newBaggageHeaders.join(",") : void 0
    };
  }
}

// node_modules/@sentry-internal/tracing/esm/browser/request.js
var DEFAULT_TRACE_PROPAGATION_TARGETS = ["localhost", /^\/(?!\/)/];
var defaultRequestInstrumentationOptions = {
  traceFetch: true,
  traceXHR: true,
  enableHTTPTimings: true,
  // TODO (v8): Remove this property
  tracingOrigins: DEFAULT_TRACE_PROPAGATION_TARGETS,
  tracePropagationTargets: DEFAULT_TRACE_PROPAGATION_TARGETS
};
function instrumentOutgoingRequests(_options) {
  const {
    traceFetch,
    traceXHR,
    // eslint-disable-next-line deprecation/deprecation
    tracePropagationTargets,
    // eslint-disable-next-line deprecation/deprecation
    tracingOrigins,
    shouldCreateSpanForRequest,
    enableHTTPTimings
  } = {
    traceFetch: defaultRequestInstrumentationOptions.traceFetch,
    traceXHR: defaultRequestInstrumentationOptions.traceXHR,
    ..._options
  };
  const shouldCreateSpan = typeof shouldCreateSpanForRequest === "function" ? shouldCreateSpanForRequest : (_) => true;
  const shouldAttachHeadersWithTargets = (url) => shouldAttachHeaders(url, tracePropagationTargets || tracingOrigins);
  const spans = {};
  if (traceFetch) {
    addFetchInstrumentationHandler((handlerData) => {
      const createdSpan = instrumentFetchRequest(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (enableHTTPTimings && createdSpan) {
        addHTTPTimings(createdSpan);
      }
    });
  }
  if (traceXHR) {
    addXhrInstrumentationHandler((handlerData) => {
      const createdSpan = xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (enableHTTPTimings && createdSpan) {
        addHTTPTimings(createdSpan);
      }
    });
  }
}
function isPerformanceResourceTiming(entry) {
  return entry.entryType === "resource" && "initiatorType" in entry && typeof entry.nextHopProtocol === "string" && (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest");
}
function addHTTPTimings(span) {
  const { url } = spanToJSON(span).data || {};
  if (!url || typeof url !== "string") {
    return;
  }
  const cleanup = addPerformanceInstrumentationHandler("resource", ({ entries }) => {
    entries.forEach((entry) => {
      if (isPerformanceResourceTiming(entry) && entry.name.endsWith(url)) {
        const spanData = resourceTimingEntryToSpanData(entry);
        spanData.forEach((data) => span.setAttribute(...data));
        setTimeout(cleanup);
      }
    });
  });
}
function extractNetworkProtocol(nextHopProtocol) {
  let name = "unknown";
  let version2 = "unknown";
  let _name = "";
  for (const char of nextHopProtocol) {
    if (char === "/") {
      [name, version2] = nextHopProtocol.split("/");
      break;
    }
    if (!isNaN(Number(char))) {
      name = _name === "h" ? "http" : _name;
      version2 = nextHopProtocol.split(_name)[1];
      break;
    }
    _name += char;
  }
  if (_name === nextHopProtocol) {
    name = _name;
  }
  return { name, version: version2 };
}
function getAbsoluteTime(time = 0) {
  return ((browserPerformanceTimeOrigin || performance.timeOrigin) + time) / 1e3;
}
function resourceTimingEntryToSpanData(resourceTiming) {
  const { name, version: version2 } = extractNetworkProtocol(resourceTiming.nextHopProtocol);
  const timingSpanData = [];
  timingSpanData.push(["network.protocol.version", version2], ["network.protocol.name", name]);
  if (!browserPerformanceTimeOrigin) {
    return timingSpanData;
  }
  return [
    ...timingSpanData,
    ["http.request.redirect_start", getAbsoluteTime(resourceTiming.redirectStart)],
    ["http.request.fetch_start", getAbsoluteTime(resourceTiming.fetchStart)],
    ["http.request.domain_lookup_start", getAbsoluteTime(resourceTiming.domainLookupStart)],
    ["http.request.domain_lookup_end", getAbsoluteTime(resourceTiming.domainLookupEnd)],
    ["http.request.connect_start", getAbsoluteTime(resourceTiming.connectStart)],
    ["http.request.secure_connection_start", getAbsoluteTime(resourceTiming.secureConnectionStart)],
    ["http.request.connection_end", getAbsoluteTime(resourceTiming.connectEnd)],
    ["http.request.request_start", getAbsoluteTime(resourceTiming.requestStart)],
    ["http.request.response_start", getAbsoluteTime(resourceTiming.responseStart)],
    ["http.request.response_end", getAbsoluteTime(resourceTiming.responseEnd)]
  ];
}
function shouldAttachHeaders(url, tracePropagationTargets) {
  return stringMatchesSomePattern(url, tracePropagationTargets || DEFAULT_TRACE_PROPAGATION_TARGETS);
}
function xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
  const xhr = handlerData.xhr;
  const sentryXhrData = xhr && xhr[SENTRY_XHR_DATA_KEY];
  if (!hasTracingEnabled() || !xhr || xhr.__sentry_own_request__ || !sentryXhrData) {
    return void 0;
  }
  const shouldCreateSpanResult = shouldCreateSpan(sentryXhrData.url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = xhr.__sentry_xhr_span_id__;
    if (!spanId)
      return;
    const span2 = spans[spanId];
    if (span2 && sentryXhrData.status_code !== void 0) {
      setHttpStatus(span2, sentryXhrData.status_code);
      span2.end();
      delete spans[spanId];
    }
    return void 0;
  }
  const scope = getCurrentScope();
  const isolationScope = getIsolationScope();
  const span = shouldCreateSpanResult ? startInactiveSpan({
    name: `${sentryXhrData.method} ${sentryXhrData.url}`,
    onlyIfParent: true,
    attributes: {
      type: "xhr",
      "http.method": sentryXhrData.method,
      url: sentryXhrData.url,
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser"
    },
    op: "http.client"
  }) : void 0;
  if (span) {
    xhr.__sentry_xhr_span_id__ = span.spanContext().spanId;
    spans[xhr.__sentry_xhr_span_id__] = span;
  }
  const client = getClient();
  if (xhr.setRequestHeader && shouldAttachHeaders2(sentryXhrData.url) && client) {
    const { traceId, spanId, sampled, dsc } = {
      ...isolationScope.getPropagationContext(),
      ...scope.getPropagationContext()
    };
    const sentryTraceHeader = span ? spanToTraceHeader(span) : generateSentryTraceHeader(traceId, spanId, sampled);
    const sentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader(
      dsc || (span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromClient(traceId, client, scope))
    );
    setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader);
  }
  return span;
}
function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader) {
  try {
    xhr.setRequestHeader("sentry-trace", sentryTraceHeader);
    if (sentryBaggageHeader) {
      xhr.setRequestHeader(BAGGAGE_HEADER_NAME, sentryBaggageHeader);
    }
  } catch (_) {
  }
}

// node_modules/@sentry-internal/tracing/esm/browser/router.js
function instrumentRoutingWithDefaults(customStartTransaction, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) {
  if (!WINDOW7 || !WINDOW7.location) {
    DEBUG_BUILD3 && logger.warn("Could not initialize routing instrumentation due to invalid location");
    return;
  }
  let startingUrl = WINDOW7.location.href;
  let activeTransaction3;
  if (startTransactionOnPageLoad) {
    activeTransaction3 = customStartTransaction({
      name: WINDOW7.location.pathname,
      // pageload should always start at timeOrigin (and needs to be in s, not ms)
      startTimestamp: browserPerformanceTimeOrigin ? browserPerformanceTimeOrigin / 1e3 : void 0,
      op: "pageload",
      origin: "auto.pageload.browser",
      metadata: { source: "url" }
    });
  }
  if (startTransactionOnLocationChange) {
    addHistoryInstrumentationHandler(({ to, from }) => {
      if (from === void 0 && startingUrl && startingUrl.indexOf(to) !== -1) {
        startingUrl = void 0;
        return;
      }
      if (from !== to) {
        startingUrl = void 0;
        if (activeTransaction3) {
          DEBUG_BUILD3 && logger.log(`[Tracing] Finishing current transaction with op: ${activeTransaction3.op}`);
          activeTransaction3.end();
        }
        activeTransaction3 = customStartTransaction({
          name: WINDOW7.location.pathname,
          op: "navigation",
          origin: "auto.navigation.browser",
          metadata: { source: "url" }
        });
      }
    });
  }
}

// node_modules/@sentry-internal/tracing/esm/browser/browsertracing.js
var BROWSER_TRACING_INTEGRATION_ID = "BrowserTracing";
var DEFAULT_BROWSER_TRACING_OPTIONS = {
  ...TRACING_DEFAULTS,
  markBackgroundTransactions: true,
  routingInstrumentation: instrumentRoutingWithDefaults,
  startTransactionOnLocationChange: true,
  startTransactionOnPageLoad: true,
  enableLongTask: true,
  enableInp: false,
  _experiments: {},
  ...defaultRequestInstrumentationOptions
};
var MAX_INTERACTIONS = 10;
var BrowserTracing = class {
  // This class currently doesn't have a static `id` field like the other integration classes, because it prevented
  // @sentry/tracing from being treeshaken. Tree shakers do not like static fields, because they behave like side effects.
  // TODO: Come up with a better plan, than using static fields on integration classes, and use that plan on all
  // integrations.
  /** Browser Tracing integration options */
  /**
   * @inheritDoc
   */
  constructor(_options) {
    this.name = BROWSER_TRACING_INTEGRATION_ID;
    this._hasSetTracePropagationTargets = false;
    addTracingExtensions();
    if (DEBUG_BUILD3) {
      this._hasSetTracePropagationTargets = !!(_options && // eslint-disable-next-line deprecation/deprecation
      (_options.tracePropagationTargets || _options.tracingOrigins));
    }
    this.options = {
      ...DEFAULT_BROWSER_TRACING_OPTIONS,
      ..._options
    };
    if (this.options._experiments.enableLongTask !== void 0) {
      this.options.enableLongTask = this.options._experiments.enableLongTask;
    }
    if (_options && !_options.tracePropagationTargets && _options.tracingOrigins) {
      this.options.tracePropagationTargets = _options.tracingOrigins;
    }
    this._collectWebVitals = startTrackingWebVitals();
    this._interactionIdtoRouteNameMapping = {};
    if (this.options.enableInp) {
      startTrackingINP(this._interactionIdtoRouteNameMapping);
    }
    if (this.options.enableLongTask) {
      startTrackingLongTasks();
    }
    if (this.options._experiments.enableInteractions) {
      startTrackingInteractions();
    }
    this._latestRoute = {
      name: void 0,
      context: void 0
    };
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    this._getCurrentHub = getCurrentHub2;
    const hub = getCurrentHub2();
    const client = hub.getClient();
    const clientOptions = client && client.getOptions();
    const {
      routingInstrumentation: instrumentRouting,
      startTransactionOnLocationChange,
      startTransactionOnPageLoad,
      markBackgroundTransactions,
      traceFetch,
      traceXHR,
      shouldCreateSpanForRequest,
      enableHTTPTimings,
      _experiments
    } = this.options;
    const clientOptionsTracePropagationTargets = clientOptions && clientOptions.tracePropagationTargets;
    const tracePropagationTargets = clientOptionsTracePropagationTargets || this.options.tracePropagationTargets;
    if (DEBUG_BUILD3 && this._hasSetTracePropagationTargets && clientOptionsTracePropagationTargets) {
      logger.warn(
        "[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."
      );
    }
    instrumentRouting(
      (context) => {
        const transaction = this._createRouteTransaction(context);
        this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(transaction, context, getCurrentHub2);
        return transaction;
      },
      startTransactionOnPageLoad,
      startTransactionOnLocationChange
    );
    if (markBackgroundTransactions) {
      registerBackgroundTabDetection();
    }
    if (_experiments.enableInteractions) {
      this._registerInteractionListener();
    }
    if (this.options.enableInp) {
      this._registerInpInteractionListener();
    }
    instrumentOutgoingRequests({
      traceFetch,
      traceXHR,
      tracePropagationTargets,
      shouldCreateSpanForRequest,
      enableHTTPTimings
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(context) {
    if (!this._getCurrentHub) {
      DEBUG_BUILD3 && logger.warn(`[Tracing] Did not create ${context.op} transaction because _getCurrentHub is invalid.`);
      return void 0;
    }
    const hub = this._getCurrentHub();
    const { beforeNavigate, idleTimeout, finalTimeout, heartbeatInterval } = this.options;
    const isPageloadTransaction = context.op === "pageload";
    let expandedContext;
    if (isPageloadTransaction) {
      const sentryTrace = isPageloadTransaction ? getMetaContent("sentry-trace") : "";
      const baggage = isPageloadTransaction ? getMetaContent("baggage") : void 0;
      const { traceId, dsc, parentSpanId, sampled } = propagationContextFromHeaders(sentryTrace, baggage);
      expandedContext = {
        traceId,
        parentSpanId,
        parentSampled: sampled,
        ...context,
        metadata: {
          // eslint-disable-next-line deprecation/deprecation
          ...context.metadata,
          dynamicSamplingContext: dsc
        },
        trimEnd: true
      };
    } else {
      expandedContext = {
        trimEnd: true,
        ...context
      };
    }
    const modifiedContext = typeof beforeNavigate === "function" ? beforeNavigate(expandedContext) : expandedContext;
    const finalContext = modifiedContext === void 0 ? { ...expandedContext, sampled: false } : modifiedContext;
    finalContext.metadata = finalContext.name !== expandedContext.name ? (
      // eslint-disable-next-line deprecation/deprecation
      { ...finalContext.metadata, source: "custom" }
    ) : (
      // eslint-disable-next-line deprecation/deprecation
      finalContext.metadata
    );
    this._latestRoute.name = finalContext.name;
    this._latestRoute.context = finalContext;
    if (finalContext.sampled === false) {
      DEBUG_BUILD3 && logger.log(`[Tracing] Will not send ${finalContext.op} transaction because of beforeNavigate.`);
    }
    DEBUG_BUILD3 && logger.log(`[Tracing] Starting ${finalContext.op} transaction on scope`);
    const { location } = WINDOW7;
    const idleTransaction = startIdleTransaction(
      hub,
      finalContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      // for use in the tracesSampler
      heartbeatInterval,
      isPageloadTransaction
      // should wait for finish signal if it's a pageload transaction
    );
    if (isPageloadTransaction) {
      WINDOW7.document.addEventListener("readystatechange", () => {
        if (["interactive", "complete"].includes(WINDOW7.document.readyState)) {
          idleTransaction.sendAutoFinishSignal();
        }
      });
      if (["interactive", "complete"].includes(WINDOW7.document.readyState)) {
        idleTransaction.sendAutoFinishSignal();
      }
    }
    idleTransaction.registerBeforeFinishCallback((transaction) => {
      this._collectWebVitals();
      addPerformanceEntries(transaction);
    });
    return idleTransaction;
  }
  /** Start listener for interaction transactions */
  _registerInteractionListener() {
    let inflightInteractionTransaction;
    const registerInteractionTransaction = () => {
      const { idleTimeout, finalTimeout, heartbeatInterval } = this.options;
      const op = "ui.action.click";
      const currentTransaction = getActiveTransaction();
      if (currentTransaction && currentTransaction.op && ["navigation", "pageload"].includes(currentTransaction.op)) {
        DEBUG_BUILD3 && logger.warn(
          `[Tracing] Did not create ${op} transaction because a pageload or navigation transaction is in progress.`
        );
        return void 0;
      }
      if (inflightInteractionTransaction) {
        inflightInteractionTransaction.setFinishReason("interactionInterrupted");
        inflightInteractionTransaction.end();
        inflightInteractionTransaction = void 0;
      }
      if (!this._getCurrentHub) {
        DEBUG_BUILD3 && logger.warn(`[Tracing] Did not create ${op} transaction because _getCurrentHub is invalid.`);
        return void 0;
      }
      if (!this._latestRoute.name) {
        DEBUG_BUILD3 && logger.warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
        return void 0;
      }
      const hub = this._getCurrentHub();
      const { location } = WINDOW7;
      const context = {
        name: this._latestRoute.name,
        op,
        trimEnd: true,
        data: {
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: this._latestRoute.context ? getSource(this._latestRoute.context) : "url"
        }
      };
      inflightInteractionTransaction = startIdleTransaction(
        hub,
        context,
        idleTimeout,
        finalTimeout,
        true,
        { location },
        // for use in the tracesSampler
        heartbeatInterval
      );
    };
    ["click"].forEach((type) => {
      addEventListener(type, registerInteractionTransaction, { once: false, capture: true });
    });
  }
  /** Creates a listener on interaction entries, and maps interactionIds to the origin path of the interaction */
  _registerInpInteractionListener() {
    addPerformanceInstrumentationHandler("event", ({ entries }) => {
      const client = getClient();
      const replay = client !== void 0 && client.getIntegrationByName !== void 0 ? client.getIntegrationByName("Replay") : void 0;
      const replayId = replay !== void 0 ? replay.getReplayId() : void 0;
      const activeTransaction3 = getActiveTransaction();
      const currentScope = getCurrentScope();
      const user = currentScope !== void 0 ? currentScope.getUser() : void 0;
      for (const entry of entries) {
        if (isPerformanceEventTiming(entry)) {
          const duration = entry.duration;
          const keys2 = Object.keys(this._interactionIdtoRouteNameMapping);
          const minInteractionId = keys2.length > 0 ? keys2.reduce((a, b) => {
            return this._interactionIdtoRouteNameMapping[a].duration < this._interactionIdtoRouteNameMapping[b].duration ? a : b;
          }) : void 0;
          if (minInteractionId === void 0 || duration > this._interactionIdtoRouteNameMapping[minInteractionId].duration) {
            const interactionId = entry.interactionId;
            const routeName = this._latestRoute.name;
            const parentContext = this._latestRoute.context;
            if (interactionId && routeName && parentContext) {
              if (minInteractionId && Object.keys(this._interactionIdtoRouteNameMapping).length >= MAX_INTERACTIONS) {
                delete this._interactionIdtoRouteNameMapping[minInteractionId];
              }
              this._interactionIdtoRouteNameMapping[interactionId] = {
                routeName,
                duration,
                parentContext,
                user,
                activeTransaction: activeTransaction3,
                replayId
              };
            }
          }
        }
      }
    });
  }
};
function getMetaContent(metaName) {
  const metaTag = getDomElement(`meta[name=${metaName}]`);
  return metaTag ? metaTag.getAttribute("content") : void 0;
}
function getSource(context) {
  const sourceFromAttributes = context.attributes && context.attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const sourceFromData = context.data && context.data[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const sourceFromMetadata = context.metadata && context.metadata.source;
  return sourceFromAttributes || sourceFromData || sourceFromMetadata;
}
function isPerformanceEventTiming(entry) {
  return "duration" in entry;
}

// node_modules/@sentry-internal/tracing/esm/browser/browserTracingIntegration.js
var BROWSER_TRACING_INTEGRATION_ID2 = "BrowserTracing";
var DEFAULT_BROWSER_TRACING_OPTIONS2 = {
  ...TRACING_DEFAULTS,
  instrumentNavigation: true,
  instrumentPageLoad: true,
  markBackgroundSpan: true,
  enableLongTask: true,
  enableInp: false,
  _experiments: {},
  ...defaultRequestInstrumentationOptions
};
var browserTracingIntegration = (_options = {}) => {
  const _hasSetTracePropagationTargets = DEBUG_BUILD3 ? !!// eslint-disable-next-line deprecation/deprecation
  (_options.tracePropagationTargets || _options.tracingOrigins) : false;
  addTracingExtensions();
  if (!_options.tracePropagationTargets && _options.tracingOrigins) {
    _options.tracePropagationTargets = _options.tracingOrigins;
  }
  const options = {
    ...DEFAULT_BROWSER_TRACING_OPTIONS2,
    ..._options
  };
  const _collectWebVitals = startTrackingWebVitals();
  const interactionIdtoRouteNameMapping = {};
  if (options.enableInp) {
    startTrackingINP(interactionIdtoRouteNameMapping);
  }
  if (options.enableLongTask) {
    startTrackingLongTasks();
  }
  if (options._experiments.enableInteractions) {
    startTrackingInteractions();
  }
  const latestRoute = {
    name: void 0,
    context: void 0
  };
  function _createRouteTransaction(context) {
    const hub = getCurrentHub();
    const { beforeStartSpan, idleTimeout, finalTimeout, heartbeatInterval } = options;
    const isPageloadTransaction = context.op === "pageload";
    let expandedContext;
    if (isPageloadTransaction) {
      const sentryTrace = isPageloadTransaction ? getMetaContent2("sentry-trace") : "";
      const baggage = isPageloadTransaction ? getMetaContent2("baggage") : void 0;
      const { traceId, dsc, parentSpanId, sampled } = propagationContextFromHeaders(sentryTrace, baggage);
      expandedContext = {
        traceId,
        parentSpanId,
        parentSampled: sampled,
        ...context,
        metadata: {
          // eslint-disable-next-line deprecation/deprecation
          ...context.metadata,
          dynamicSamplingContext: dsc
        },
        trimEnd: true
      };
    } else {
      expandedContext = {
        trimEnd: true,
        ...context
      };
    }
    const finalContext = beforeStartSpan ? beforeStartSpan(expandedContext) : expandedContext;
    finalContext.metadata = finalContext.name !== expandedContext.name ? (
      // eslint-disable-next-line deprecation/deprecation
      { ...finalContext.metadata, source: "custom" }
    ) : (
      // eslint-disable-next-line deprecation/deprecation
      finalContext.metadata
    );
    latestRoute.name = finalContext.name;
    latestRoute.context = finalContext;
    if (finalContext.sampled === false) {
      DEBUG_BUILD3 && logger.log(`[Tracing] Will not send ${finalContext.op} transaction because of beforeNavigate.`);
    }
    DEBUG_BUILD3 && logger.log(`[Tracing] Starting ${finalContext.op} transaction on scope`);
    const { location } = WINDOW7;
    const idleTransaction = startIdleTransaction(
      hub,
      finalContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      // for use in the tracesSampler
      heartbeatInterval,
      isPageloadTransaction
      // should wait for finish signal if it's a pageload transaction
    );
    if (isPageloadTransaction && WINDOW7.document) {
      WINDOW7.document.addEventListener("readystatechange", () => {
        if (["interactive", "complete"].includes(WINDOW7.document.readyState)) {
          idleTransaction.sendAutoFinishSignal();
        }
      });
      if (["interactive", "complete"].includes(WINDOW7.document.readyState)) {
        idleTransaction.sendAutoFinishSignal();
      }
    }
    idleTransaction.registerBeforeFinishCallback((transaction) => {
      _collectWebVitals();
      addPerformanceEntries(transaction);
    });
    return idleTransaction;
  }
  return {
    name: BROWSER_TRACING_INTEGRATION_ID2,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setupOnce: () => {
    },
    afterAllSetup(client) {
      const clientOptions = client.getOptions();
      const { markBackgroundSpan, traceFetch, traceXHR, shouldCreateSpanForRequest, enableHTTPTimings, _experiments } = options;
      const clientOptionsTracePropagationTargets = clientOptions && clientOptions.tracePropagationTargets;
      const tracePropagationTargets = clientOptionsTracePropagationTargets || options.tracePropagationTargets;
      if (DEBUG_BUILD3 && _hasSetTracePropagationTargets && clientOptionsTracePropagationTargets) {
        logger.warn(
          "[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."
        );
      }
      let activeSpan;
      let startingUrl = WINDOW7.location && WINDOW7.location.href;
      if (client.on) {
        client.on("startNavigationSpan", (context) => {
          if (activeSpan) {
            DEBUG_BUILD3 && logger.log(`[Tracing] Finishing current transaction with op: ${spanToJSON(activeSpan).op}`);
            activeSpan.end();
          }
          activeSpan = _createRouteTransaction({
            op: "navigation",
            ...context
          });
        });
        client.on("startPageLoadSpan", (context) => {
          if (activeSpan) {
            DEBUG_BUILD3 && logger.log(`[Tracing] Finishing current transaction with op: ${spanToJSON(activeSpan).op}`);
            activeSpan.end();
          }
          activeSpan = _createRouteTransaction({
            op: "pageload",
            ...context
          });
        });
      }
      if (options.instrumentPageLoad && client.emit && WINDOW7.location) {
        const context = {
          name: WINDOW7.location.pathname,
          // pageload should always start at timeOrigin (and needs to be in s, not ms)
          startTimestamp: browserPerformanceTimeOrigin ? browserPerformanceTimeOrigin / 1e3 : void 0,
          origin: "auto.pageload.browser",
          attributes: {
            [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
          }
        };
        startBrowserTracingPageLoadSpan(client, context);
      }
      if (options.instrumentNavigation && client.emit && WINDOW7.location) {
        addHistoryInstrumentationHandler(({ to, from }) => {
          if (from === void 0 && startingUrl && startingUrl.indexOf(to) !== -1) {
            startingUrl = void 0;
            return;
          }
          if (from !== to) {
            startingUrl = void 0;
            const context = {
              name: WINDOW7.location.pathname,
              origin: "auto.navigation.browser",
              attributes: {
                [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
              }
            };
            startBrowserTracingNavigationSpan(client, context);
          }
        });
      }
      if (markBackgroundSpan) {
        registerBackgroundTabDetection();
      }
      if (_experiments.enableInteractions) {
        registerInteractionListener(options, latestRoute);
      }
      if (options.enableInp) {
        registerInpInteractionListener(interactionIdtoRouteNameMapping, latestRoute);
      }
      instrumentOutgoingRequests({
        traceFetch,
        traceXHR,
        tracePropagationTargets,
        shouldCreateSpanForRequest,
        enableHTTPTimings
      });
    },
    // TODO v8: Remove this again
    // This is private API that we use to fix converted BrowserTracing integrations in Next.js & SvelteKit
    options
  };
};
function startBrowserTracingPageLoadSpan(client, spanOptions) {
  if (!client.emit) {
    return;
  }
  client.emit("startPageLoadSpan", spanOptions);
  const span = getActiveSpan();
  const op = span && spanToJSON(span).op;
  return op === "pageload" ? span : void 0;
}
function startBrowserTracingNavigationSpan(client, spanOptions) {
  if (!client.emit) {
    return;
  }
  client.emit("startNavigationSpan", spanOptions);
  const span = getActiveSpan();
  const op = span && spanToJSON(span).op;
  return op === "navigation" ? span : void 0;
}
function getMetaContent2(metaName) {
  const metaTag = getDomElement(`meta[name=${metaName}]`);
  return metaTag ? metaTag.getAttribute("content") : void 0;
}
function registerInteractionListener(options, latestRoute) {
  let inflightInteractionTransaction;
  const registerInteractionTransaction = () => {
    const { idleTimeout, finalTimeout, heartbeatInterval } = options;
    const op = "ui.action.click";
    const currentTransaction = getActiveTransaction();
    if (currentTransaction && currentTransaction.op && ["navigation", "pageload"].includes(currentTransaction.op)) {
      DEBUG_BUILD3 && logger.warn(
        `[Tracing] Did not create ${op} transaction because a pageload or navigation transaction is in progress.`
      );
      return void 0;
    }
    if (inflightInteractionTransaction) {
      inflightInteractionTransaction.setFinishReason("interactionInterrupted");
      inflightInteractionTransaction.end();
      inflightInteractionTransaction = void 0;
    }
    if (!latestRoute.name) {
      DEBUG_BUILD3 && logger.warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
      return void 0;
    }
    const { location } = WINDOW7;
    const context = {
      name: latestRoute.name,
      op,
      trimEnd: true,
      data: {
        [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: latestRoute.context ? getSource2(latestRoute.context) : "url"
      }
    };
    inflightInteractionTransaction = startIdleTransaction(
      // eslint-disable-next-line deprecation/deprecation
      getCurrentHub(),
      context,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      // for use in the tracesSampler
      heartbeatInterval
    );
  };
  ["click"].forEach((type) => {
    addEventListener(type, registerInteractionTransaction, { once: false, capture: true });
  });
}
function isPerformanceEventTiming2(entry) {
  return "duration" in entry;
}
var MAX_INTERACTIONS2 = 10;
function registerInpInteractionListener(interactionIdtoRouteNameMapping, latestRoute) {
  addPerformanceInstrumentationHandler("event", ({ entries }) => {
    const client = getClient();
    const replay = client !== void 0 && client.getIntegrationByName !== void 0 ? client.getIntegrationByName("Replay") : void 0;
    const replayId = replay !== void 0 ? replay.getReplayId() : void 0;
    const activeTransaction3 = getActiveTransaction();
    const currentScope = getCurrentScope();
    const user = currentScope !== void 0 ? currentScope.getUser() : void 0;
    for (const entry of entries) {
      if (isPerformanceEventTiming2(entry)) {
        const duration = entry.duration;
        const keys2 = Object.keys(interactionIdtoRouteNameMapping);
        const minInteractionId = keys2.length > 0 ? keys2.reduce((a, b) => {
          return interactionIdtoRouteNameMapping[a].duration < interactionIdtoRouteNameMapping[b].duration ? a : b;
        }) : void 0;
        if (minInteractionId === void 0 || duration > interactionIdtoRouteNameMapping[minInteractionId].duration) {
          const interactionId = entry.interactionId;
          const routeName = latestRoute.name;
          const parentContext = latestRoute.context;
          if (interactionId && routeName && parentContext) {
            if (minInteractionId && Object.keys(interactionIdtoRouteNameMapping).length >= MAX_INTERACTIONS2) {
              delete interactionIdtoRouteNameMapping[minInteractionId];
            }
            interactionIdtoRouteNameMapping[interactionId] = {
              routeName,
              duration,
              parentContext,
              user,
              activeTransaction: activeTransaction3,
              replayId
            };
          }
        }
      }
    }
  });
}
function getSource2(context) {
  const sourceFromAttributes = context.attributes && context.attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const sourceFromData = context.data && context.data[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
  const sourceFromMetadata = context.metadata && context.metadata.source;
  return sourceFromAttributes || sourceFromData || sourceFromMetadata;
}

// node_modules/@sentry/browser/esm/helpers.js
var WINDOW8 = GLOBAL_OBJ;
var ignoreOnError = 0;
function shouldIgnoreOnError() {
  return ignoreOnError > 0;
}
function ignoreNextOnError() {
  ignoreOnError++;
  setTimeout(() => {
    ignoreOnError--;
  });
}
function wrap2(fn, options = {}, before) {
  if (typeof fn !== "function") {
    return fn;
  }
  try {
    const wrapper = fn.__sentry_wrapped__;
    if (wrapper) {
      return wrapper;
    }
    if (getOriginalFunction(fn)) {
      return fn;
    }
  } catch (e2) {
    return fn;
  }
  const sentryWrapped = function() {
    const args = Array.prototype.slice.call(arguments);
    try {
      if (before && typeof before === "function") {
        before.apply(this, arguments);
      }
      const wrappedArguments = args.map((arg) => wrap2(arg, options));
      return fn.apply(this, wrappedArguments);
    } catch (ex) {
      ignoreNextOnError();
      withScope((scope) => {
        scope.addEventProcessor((event) => {
          if (options.mechanism) {
            addExceptionTypeValue(event, void 0, void 0);
            addExceptionMechanism(event, options.mechanism);
          }
          event.extra = {
            ...event.extra,
            arguments: args
          };
          return event;
        });
        captureException(ex);
      });
      throw ex;
    }
  };
  try {
    for (const property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        sentryWrapped[property] = fn[property];
      }
    }
  } catch (_oO) {
  }
  markFunctionWrapped(sentryWrapped, fn);
  addNonEnumerableProperty(fn, "__sentry_wrapped__", sentryWrapped);
  try {
    const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
    if (descriptor.configurable) {
      Object.defineProperty(sentryWrapped, "name", {
        get() {
          return fn.name;
        }
      });
    }
  } catch (_oO) {
  }
  return sentryWrapped;
}

// node_modules/@sentry/browser/esm/debug-build.js
var DEBUG_BUILD4 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/@sentry/browser/esm/eventbuilder.js
function exceptionFromError2(stackParser, ex) {
  const frames = parseStackFrames2(stackParser, ex);
  const exception = {
    type: ex && ex.name,
    value: extractMessage(ex)
  };
  if (frames.length) {
    exception.stacktrace = { frames };
  }
  if (exception.type === void 0 && exception.value === "") {
    exception.value = "Unrecoverable error caught";
  }
  return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
  const client = getClient();
  const normalizeDepth = client && client.getOptions().normalizeDepth;
  const event = {
    exception: {
      values: [
        {
          type: isEvent(exception) ? exception.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
          value: getNonErrorObjectExceptionValue(exception, { isUnhandledRejection })
        }
      ]
    },
    extra: {
      __serialized__: normalizeToSize(exception, normalizeDepth)
    }
  };
  if (syntheticException) {
    const frames = parseStackFrames2(stackParser, syntheticException);
    if (frames.length) {
      event.exception.values[0].stacktrace = { frames };
    }
  }
  return event;
}
function eventFromError(stackParser, ex) {
  return {
    exception: {
      values: [exceptionFromError2(stackParser, ex)]
    }
  };
}
function parseStackFrames2(stackParser, ex) {
  const stacktrace = ex.stacktrace || ex.stack || "";
  const popSize = getPopSize(ex);
  try {
    return stackParser(stacktrace, popSize);
  } catch (e2) {
  }
  return [];
}
var reactMinifiedRegexp = /Minified React error #\d+;/i;
function getPopSize(ex) {
  if (ex) {
    if (typeof ex.framesToPop === "number") {
      return ex.framesToPop;
    }
    if (reactMinifiedRegexp.test(ex.message)) {
      return 1;
    }
  }
  return 0;
}
function extractMessage(ex) {
  const message = ex && ex.message;
  if (!message) {
    return "No error message";
  }
  if (message.error && typeof message.error.message === "string") {
    return message.error.message;
  }
  return message;
}
function eventFromException(stackParser, exception, hint, attachStacktrace) {
  const syntheticException = hint && hint.syntheticException || void 0;
  const event = eventFromUnknownInput2(stackParser, exception, syntheticException, attachStacktrace);
  addExceptionMechanism(event);
  event.level = "error";
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return resolvedSyncPromise(event);
}
function eventFromMessage2(stackParser, message, level = "info", hint, attachStacktrace) {
  const syntheticException = hint && hint.syntheticException || void 0;
  const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
  event.level = level;
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return resolvedSyncPromise(event);
}
function eventFromUnknownInput2(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
  let event;
  if (isErrorEvent(exception) && exception.error) {
    const errorEvent = exception;
    return eventFromError(stackParser, errorEvent.error);
  }
  if (isDOMError(exception) || isDOMException(exception)) {
    const domException = exception;
    if ("stack" in exception) {
      event = eventFromError(stackParser, exception);
    } else {
      const name = domException.name || (isDOMError(domException) ? "DOMError" : "DOMException");
      const message = domException.message ? `${name}: ${domException.message}` : name;
      event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
      addExceptionTypeValue(event, message);
    }
    if ("code" in domException) {
      event.tags = { ...event.tags, "DOMException.code": `${domException.code}` };
    }
    return event;
  }
  if (isError(exception)) {
    return eventFromError(stackParser, exception);
  }
  if (isPlainObject(exception) || isEvent(exception)) {
    const objectException = exception;
    event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
    addExceptionMechanism(event, {
      synthetic: true
    });
    return event;
  }
  event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
  addExceptionTypeValue(event, `${exception}`, void 0);
  addExceptionMechanism(event, {
    synthetic: true
  });
  return event;
}
function eventFromString(stackParser, message, syntheticException, attachStacktrace) {
  const event = {};
  if (attachStacktrace && syntheticException) {
    const frames = parseStackFrames2(stackParser, syntheticException);
    if (frames.length) {
      event.exception = {
        values: [{ value: message, stacktrace: { frames } }]
      };
    }
  }
  if (isParameterizedString(message)) {
    const { __sentry_template_string__, __sentry_template_values__ } = message;
    event.logentry = {
      message: __sentry_template_string__,
      params: __sentry_template_values__
    };
    return event;
  }
  event.message = message;
  return event;
}
function getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }) {
  const keys2 = extractExceptionKeysForMessage(exception);
  const captureType = isUnhandledRejection ? "promise rejection" : "exception";
  if (isErrorEvent(exception)) {
    return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
  }
  if (isEvent(exception)) {
    const className = getObjectClassName(exception);
    return `Event \`${className}\` (type=${exception.type}) captured as ${captureType}`;
  }
  return `Object captured as ${captureType} with keys: ${keys2}`;
}
function getObjectClassName(obj) {
  try {
    const prototype = Object.getPrototypeOf(obj);
    return prototype ? prototype.constructor.name : void 0;
  } catch (e2) {
  }
}

// node_modules/@sentry/browser/esm/userfeedback.js
function createUserFeedbackEnvelope(feedback, {
  metadata,
  tunnel,
  dsn
}) {
  const headers = {
    event_id: feedback.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...metadata && metadata.sdk && {
      sdk: {
        name: metadata.sdk.name,
        version: metadata.sdk.version
      }
    },
    ...!!tunnel && !!dsn && { dsn: dsnToString(dsn) }
  };
  const item = createUserFeedbackEnvelopeItem(feedback);
  return createEnvelope(headers, [item]);
}
function createUserFeedbackEnvelopeItem(feedback) {
  const feedbackHeaders = {
    type: "user_report"
  };
  return [feedbackHeaders, feedback];
}

// node_modules/@sentry/browser/esm/client.js
var BrowserClient = class extends BaseClient {
  /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(options) {
    const sdkSource = WINDOW8.SENTRY_SDK_SOURCE || getSDKSource();
    applySdkMetadata(options, "browser", ["browser"], sdkSource);
    super(options);
    if (options.sendClientReports && WINDOW8.document) {
      WINDOW8.document.addEventListener("visibilitychange", () => {
        if (WINDOW8.document.visibilityState === "hidden") {
          this._flushOutcomes();
        }
      });
    }
  }
  /**
   * @inheritDoc
   */
  eventFromException(exception, hint) {
    return eventFromException(this._options.stackParser, exception, hint, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  eventFromMessage(message, level = "info", hint) {
    return eventFromMessage2(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
  }
  /**
   * Sends user feedback to Sentry.
   */
  captureUserFeedback(feedback) {
    if (!this._isEnabled()) {
      DEBUG_BUILD4 && logger.warn("SDK not enabled, will not capture user feedback.");
      return;
    }
    const envelope = createUserFeedbackEnvelope(feedback, {
      metadata: this.getSdkMetadata(),
      dsn: this.getDsn(),
      tunnel: this.getOptions().tunnel
    });
    this._sendEnvelope(envelope);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(event, hint, scope) {
    event.platform = event.platform || "javascript";
    return super._prepareEvent(event, hint, scope);
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    const outcomes = this._clearOutcomes();
    if (outcomes.length === 0) {
      DEBUG_BUILD4 && logger.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      DEBUG_BUILD4 && logger.log("No dsn provided, will not send outcomes");
      return;
    }
    DEBUG_BUILD4 && logger.log("Sending outcomes:", outcomes);
    const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));
    this._sendEnvelope(envelope);
  }
};

// node_modules/@sentry/browser/esm/transports/utils.js
var cachedFetchImpl = void 0;
function getNativeFetchImplementation() {
  if (cachedFetchImpl) {
    return cachedFetchImpl;
  }
  if (isNativeFetch(WINDOW8.fetch)) {
    return cachedFetchImpl = WINDOW8.fetch.bind(WINDOW8);
  }
  const document2 = WINDOW8.document;
  let fetchImpl = WINDOW8.fetch;
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow.fetch) {
        fetchImpl = contentWindow.fetch;
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
      DEBUG_BUILD4 && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e2);
    }
  }
  return cachedFetchImpl = fetchImpl.bind(WINDOW8);
}
function clearCachedFetchImplementation() {
  cachedFetchImpl = void 0;
}

// node_modules/@sentry/browser/esm/transports/fetch.js
function makeFetchTransport(options, nativeFetch = getNativeFetchImplementation()) {
  let pendingBodySize = 0;
  let pendingCount = 0;
  function makeRequest(request) {
    const requestSize = request.body.length;
    pendingBodySize += requestSize;
    pendingCount++;
    const requestOptions = {
      body: request.body,
      method: "POST",
      referrerPolicy: "origin",
      headers: options.headers,
      // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
      // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
      // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
      // frequently sending events right before the user is switching pages (eg. whenfinishing navigation transactions).
      // Gotchas:
      // - `keepalive` isn't supported by Firefox
      // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
      //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
      //   We will therefore only activate the flag when we're below that limit.
      // There is also a limit of requests that can be open at the same time, so we also limit this to 15
      // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
      keepalive: pendingBodySize <= 6e4 && pendingCount < 15,
      ...options.fetchOptions
    };
    try {
      return nativeFetch(options.url, requestOptions).then((response) => {
        pendingBodySize -= requestSize;
        pendingCount--;
        return {
          statusCode: response.status,
          headers: {
            "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
            "retry-after": response.headers.get("Retry-After")
          }
        };
      });
    } catch (e2) {
      clearCachedFetchImplementation();
      pendingBodySize -= requestSize;
      pendingCount--;
      return rejectedSyncPromise(e2);
    }
  }
  return createTransport(options, makeRequest);
}

// node_modules/@sentry/browser/esm/transports/xhr.js
var XHR_READYSTATE_DONE = 4;
function makeXHRTransport(options) {
  function makeRequest(request) {
    return new SyncPromise((resolve2, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XHR_READYSTATE_DONE) {
          resolve2({
            statusCode: xhr.status,
            headers: {
              "x-sentry-rate-limits": xhr.getResponseHeader("X-Sentry-Rate-Limits"),
              "retry-after": xhr.getResponseHeader("Retry-After")
            }
          });
        }
      };
      xhr.open("POST", options.url);
      for (const header in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
      xhr.send(request.body);
    });
  }
  return createTransport(options, makeRequest);
}

// node_modules/@sentry/browser/esm/stack-parsers.js
var UNKNOWN_FUNCTION = "?";
var OPERA10_PRIORITY = 10;
var OPERA11_PRIORITY = 20;
var CHROME_PRIORITY = 30;
var WINJS_PRIORITY = 40;
var GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
  const frame = {
    filename,
    function: func,
    in_app: true
    // All browser frames are considered in_app
  };
  if (lineno !== void 0) {
    frame.lineno = lineno;
  }
  if (colno !== void 0) {
    frame.colno = colno;
  }
  return frame;
}
var chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var chromeStackParserFn = (line) => {
  const parts = chromeRegex.exec(line);
  if (parts) {
    const isEval = parts[2] && parts[2].indexOf("eval") === 0;
    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);
      if (subMatch) {
        parts[2] = subMatch[1];
        parts[3] = subMatch[2];
        parts[4] = subMatch[3];
      }
    }
    const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);
    return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
  }
  return;
};
var chromeStackLineParser = [CHROME_PRIORITY, chromeStackParserFn];
var geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var gecko = (line) => {
  const parts = geckoREgex.exec(line);
  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);
      if (subMatch) {
        parts[1] = parts[1] || "eval";
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = "";
      }
    }
    let filename = parts[3];
    let func = parts[1] || UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);
    return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
  }
  return;
};
var geckoStackLineParser = [GECKO_PRIORITY, gecko];
var winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var winjs = (line) => {
  const parts = winjsRegex.exec(line);
  return parts ? createFrame(parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : void 0) : void 0;
};
var winjsStackLineParser = [WINJS_PRIORITY, winjs];
var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
var opera10 = (line) => {
  const parts = opera10Regex.exec(line);
  return parts ? createFrame(parts[2], parts[3] || UNKNOWN_FUNCTION, +parts[1]) : void 0;
};
var opera10StackLineParser = [OPERA10_PRIORITY, opera10];
var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
var opera11 = (line) => {
  const parts = opera11Regex.exec(line);
  return parts ? createFrame(parts[5], parts[3] || parts[4] || UNKNOWN_FUNCTION, +parts[1], +parts[2]) : void 0;
};
var opera11StackLineParser = [OPERA11_PRIORITY, opera11];
var defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser, winjsStackLineParser];
var defaultStackParser = createStackParser(...defaultStackLineParsers);
var extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = func.indexOf("safari-extension") !== -1;
  const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
  return isSafariExtension || isSafariWebExtension ? [
    func.indexOf("@") !== -1 ? func.split("@")[0] : UNKNOWN_FUNCTION,
    isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
  ] : [func, filename];
};

// node_modules/@sentry/browser/esm/integrations/breadcrumbs.js
var MAX_ALLOWED_STRING_LENGTH = 1024;
var INTEGRATION_NAME7 = "Breadcrumbs";
var _breadcrumbsIntegration = (options = {}) => {
  const _options = {
    console: true,
    dom: true,
    fetch: true,
    history: true,
    sentry: true,
    xhr: true,
    ...options
  };
  return {
    name: INTEGRATION_NAME7,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    setup(client) {
      if (_options.console) {
        addConsoleInstrumentationHandler(_getConsoleBreadcrumbHandler(client));
      }
      if (_options.dom) {
        addClickKeypressInstrumentationHandler(_getDomBreadcrumbHandler(client, _options.dom));
      }
      if (_options.xhr) {
        addXhrInstrumentationHandler(_getXhrBreadcrumbHandler(client));
      }
      if (_options.fetch) {
        addFetchInstrumentationHandler(_getFetchBreadcrumbHandler(client));
      }
      if (_options.history) {
        addHistoryInstrumentationHandler(_getHistoryBreadcrumbHandler(client));
      }
      if (_options.sentry && client.on) {
        client.on("beforeSendEvent", _getSentryBreadcrumbHandler(client));
      }
    }
  };
};
var breadcrumbsIntegration = defineIntegration(_breadcrumbsIntegration);
var Breadcrumbs = convertIntegrationFnToClass(INTEGRATION_NAME7, breadcrumbsIntegration);
function _getSentryBreadcrumbHandler(client) {
  return function addSentryBreadcrumb(event) {
    if (getClient() !== client) {
      return;
    }
    addBreadcrumb(
      {
        category: `sentry.${event.type === "transaction" ? "transaction" : "event"}`,
        event_id: event.event_id,
        level: event.level,
        message: getEventDescription(event)
      },
      {
        event
      }
    );
  };
}
function _getDomBreadcrumbHandler(client, dom) {
  return function _innerDomBreadcrumb(handlerData) {
    if (getClient() !== client) {
      return;
    }
    let target;
    let componentName;
    let keyAttrs = typeof dom === "object" ? dom.serializeAttribute : void 0;
    let maxStringLength = typeof dom === "object" && typeof dom.maxStringLength === "number" ? dom.maxStringLength : void 0;
    if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
      DEBUG_BUILD4 && logger.warn(
        `\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`
      );
      maxStringLength = MAX_ALLOWED_STRING_LENGTH;
    }
    if (typeof keyAttrs === "string") {
      keyAttrs = [keyAttrs];
    }
    try {
      const event = handlerData.event;
      const element = _isEvent(event) ? event.target : event;
      target = htmlTreeAsString(element, { keyAttrs, maxStringLength });
      componentName = getComponentName(element);
    } catch (e2) {
      target = "<unknown>";
    }
    if (target.length === 0) {
      return;
    }
    const breadcrumb = {
      category: `ui.${handlerData.name}`,
      message: target
    };
    if (componentName) {
      breadcrumb.data = { "ui.component_name": componentName };
    }
    addBreadcrumb(breadcrumb, {
      event: handlerData.event,
      name: handlerData.name,
      global: handlerData.global
    });
  };
}
function _getConsoleBreadcrumbHandler(client) {
  return function _consoleBreadcrumb(handlerData) {
    if (getClient() !== client) {
      return;
    }
    const breadcrumb = {
      category: "console",
      data: {
        arguments: handlerData.args,
        logger: "console"
      },
      level: severityLevelFromString(handlerData.level),
      message: safeJoin(handlerData.args, " ")
    };
    if (handlerData.level === "assert") {
      if (handlerData.args[0] === false) {
        breadcrumb.message = `Assertion failed: ${safeJoin(handlerData.args.slice(1), " ") || "console.assert"}`;
        breadcrumb.data.arguments = handlerData.args.slice(1);
      } else {
        return;
      }
    }
    addBreadcrumb(breadcrumb, {
      input: handlerData.args,
      level: handlerData.level
    });
  };
}
function _getXhrBreadcrumbHandler(client) {
  return function _xhrBreadcrumb(handlerData) {
    if (getClient() !== client) {
      return;
    }
    const { startTimestamp, endTimestamp } = handlerData;
    const sentryXhrData = handlerData.xhr[SENTRY_XHR_DATA_KEY];
    if (!startTimestamp || !endTimestamp || !sentryXhrData) {
      return;
    }
    const { method, url, status_code, body } = sentryXhrData;
    const data = {
      method,
      url,
      status_code
    };
    const hint = {
      xhr: handlerData.xhr,
      input: body,
      startTimestamp,
      endTimestamp
    };
    addBreadcrumb(
      {
        category: "xhr",
        data,
        type: "http"
      },
      hint
    );
  };
}
function _getFetchBreadcrumbHandler(client) {
  return function _fetchBreadcrumb(handlerData) {
    if (getClient() !== client) {
      return;
    }
    const { startTimestamp, endTimestamp } = handlerData;
    if (!endTimestamp) {
      return;
    }
    if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") {
      return;
    }
    if (handlerData.error) {
      const data = handlerData.fetchData;
      const hint = {
        data: handlerData.error,
        input: handlerData.args,
        startTimestamp,
        endTimestamp
      };
      addBreadcrumb(
        {
          category: "fetch",
          data,
          level: "error",
          type: "http"
        },
        hint
      );
    } else {
      const response = handlerData.response;
      const data = {
        ...handlerData.fetchData,
        status_code: response && response.status
      };
      const hint = {
        input: handlerData.args,
        response,
        startTimestamp,
        endTimestamp
      };
      addBreadcrumb(
        {
          category: "fetch",
          data,
          type: "http"
        },
        hint
      );
    }
  };
}
function _getHistoryBreadcrumbHandler(client) {
  return function _historyBreadcrumb(handlerData) {
    if (getClient() !== client) {
      return;
    }
    let from = handlerData.from;
    let to = handlerData.to;
    const parsedLoc = parseUrl2(WINDOW8.location.href);
    let parsedFrom = from ? parseUrl2(from) : void 0;
    const parsedTo = parseUrl2(to);
    if (!parsedFrom || !parsedFrom.path) {
      parsedFrom = parsedLoc;
    }
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      to = parsedTo.relative;
    }
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      from = parsedFrom.relative;
    }
    addBreadcrumb({
      category: "navigation",
      data: {
        from,
        to
      }
    });
  };
}
function _isEvent(event) {
  return !!event && !!event.target;
}

// node_modules/@sentry/browser/esm/integrations/dedupe.js
var INTEGRATION_NAME8 = "Dedupe";
var _dedupeIntegration = () => {
  let previousEvent;
  return {
    name: INTEGRATION_NAME8,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    processEvent(currentEvent) {
      if (currentEvent.type) {
        return currentEvent;
      }
      try {
        if (_shouldDropEvent2(currentEvent, previousEvent)) {
          DEBUG_BUILD4 && logger.warn("Event dropped due to being a duplicate of previously captured event.");
          return null;
        }
      } catch (_oO) {
      }
      return previousEvent = currentEvent;
    }
  };
};
var dedupeIntegration = defineIntegration(_dedupeIntegration);
var Dedupe = convertIntegrationFnToClass(INTEGRATION_NAME8, dedupeIntegration);
function _shouldDropEvent2(currentEvent, previousEvent) {
  if (!previousEvent) {
    return false;
  }
  if (_isSameMessageEvent(currentEvent, previousEvent)) {
    return true;
  }
  if (_isSameExceptionEvent(currentEvent, previousEvent)) {
    return true;
  }
  return false;
}
function _isSameMessageEvent(currentEvent, previousEvent) {
  const currentMessage = currentEvent.message;
  const previousMessage = previousEvent.message;
  if (!currentMessage && !previousMessage) {
    return false;
  }
  if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
    return false;
  }
  if (currentMessage !== previousMessage) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameExceptionEvent(currentEvent, previousEvent) {
  const previousException = _getExceptionFromEvent(previousEvent);
  const currentException = _getExceptionFromEvent(currentEvent);
  if (!previousException || !currentException) {
    return false;
  }
  if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameStacktrace(currentEvent, previousEvent) {
  let currentFrames = _getFramesFromEvent(currentEvent);
  let previousFrames = _getFramesFromEvent(previousEvent);
  if (!currentFrames && !previousFrames) {
    return true;
  }
  if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
    return false;
  }
  currentFrames = currentFrames;
  previousFrames = previousFrames;
  if (previousFrames.length !== currentFrames.length) {
    return false;
  }
  for (let i = 0; i < previousFrames.length; i++) {
    const frameA = previousFrames[i];
    const frameB = currentFrames[i];
    if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
      return false;
    }
  }
  return true;
}
function _isSameFingerprint(currentEvent, previousEvent) {
  let currentFingerprint = currentEvent.fingerprint;
  let previousFingerprint = previousEvent.fingerprint;
  if (!currentFingerprint && !previousFingerprint) {
    return true;
  }
  if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
    return false;
  }
  currentFingerprint = currentFingerprint;
  previousFingerprint = previousFingerprint;
  try {
    return !!(currentFingerprint.join("") === previousFingerprint.join(""));
  } catch (_oO) {
    return false;
  }
}
function _getExceptionFromEvent(event) {
  return event.exception && event.exception.values && event.exception.values[0];
}
function _getFramesFromEvent(event) {
  const exception = event.exception;
  if (exception) {
    try {
      return exception.values[0].stacktrace.frames;
    } catch (_oO) {
      return void 0;
    }
  }
  return void 0;
}

// node_modules/@sentry/browser/esm/integrations/globalhandlers.js
var INTEGRATION_NAME9 = "GlobalHandlers";
var _globalHandlersIntegration = (options = {}) => {
  const _options = {
    onerror: true,
    onunhandledrejection: true,
    ...options
  };
  return {
    name: INTEGRATION_NAME9,
    setupOnce() {
      Error.stackTraceLimit = 50;
    },
    setup(client) {
      if (_options.onerror) {
        _installGlobalOnErrorHandler(client);
        globalHandlerLog("onerror");
      }
      if (_options.onunhandledrejection) {
        _installGlobalOnUnhandledRejectionHandler(client);
        globalHandlerLog("onunhandledrejection");
      }
    }
  };
};
var globalHandlersIntegration = defineIntegration(_globalHandlersIntegration);
var GlobalHandlers = convertIntegrationFnToClass(
  INTEGRATION_NAME9,
  globalHandlersIntegration
);
function _installGlobalOnErrorHandler(client) {
  addGlobalErrorInstrumentationHandler((data) => {
    const { stackParser, attachStacktrace } = getOptions();
    if (getClient() !== client || shouldIgnoreOnError()) {
      return;
    }
    const { msg, url, line, column, error } = data;
    const event = error === void 0 && isString(msg) ? _eventFromIncompleteOnError(msg, url, line, column) : _enhanceEventWithInitialFrame(
      eventFromUnknownInput2(stackParser, error || msg, void 0, attachStacktrace, false),
      url,
      line,
      column
    );
    event.level = "error";
    captureEvent(event, {
      originalException: error,
      mechanism: {
        handled: false,
        type: "onerror"
      }
    });
  });
}
function _installGlobalOnUnhandledRejectionHandler(client) {
  addGlobalUnhandledRejectionInstrumentationHandler((e2) => {
    const { stackParser, attachStacktrace } = getOptions();
    if (getClient() !== client || shouldIgnoreOnError()) {
      return;
    }
    const error = _getUnhandledRejectionError(e2);
    const event = isPrimitive(error) ? _eventFromRejectionWithPrimitive(error) : eventFromUnknownInput2(stackParser, error, void 0, attachStacktrace, true);
    event.level = "error";
    captureEvent(event, {
      originalException: error,
      mechanism: {
        handled: false,
        type: "onunhandledrejection"
      }
    });
  });
}
function _getUnhandledRejectionError(error) {
  if (isPrimitive(error)) {
    return error;
  }
  const e2 = error;
  try {
    if ("reason" in e2) {
      return e2.reason;
    } else if ("detail" in e2 && "reason" in e2.detail) {
      return e2.detail.reason;
    }
  } catch (e22) {
  }
  return error;
}
function _eventFromRejectionWithPrimitive(reason) {
  return {
    exception: {
      values: [
        {
          type: "UnhandledRejection",
          // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
          value: `Non-Error promise rejection captured with value: ${String(reason)}`
        }
      ]
    }
  };
}
function _eventFromIncompleteOnError(msg, url, line, column) {
  const ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  let message = isErrorEvent(msg) ? msg.message : msg;
  let name = "Error";
  const groups = message.match(ERROR_TYPES_RE);
  if (groups) {
    name = groups[1];
    message = groups[2];
  }
  const event = {
    exception: {
      values: [
        {
          type: name,
          value: message
        }
      ]
    }
  };
  return _enhanceEventWithInitialFrame(event, url, line, column);
}
function _enhanceEventWithInitialFrame(event, url, line, column) {
  const e2 = event.exception = event.exception || {};
  const ev = e2.values = e2.values || [];
  const ev0 = ev[0] = ev[0] || {};
  const ev0s = ev0.stacktrace = ev0.stacktrace || {};
  const ev0sf = ev0s.frames = ev0s.frames || [];
  const colno = isNaN(parseInt(column, 10)) ? void 0 : column;
  const lineno = isNaN(parseInt(line, 10)) ? void 0 : line;
  const filename = isString(url) && url.length > 0 ? url : getLocationHref();
  if (ev0sf.length === 0) {
    ev0sf.push({
      colno,
      filename,
      function: "?",
      in_app: true,
      lineno
    });
  }
  return event;
}
function globalHandlerLog(type) {
  DEBUG_BUILD4 && logger.log(`Global Handler attached: ${type}`);
}
function getOptions() {
  const client = getClient();
  const options = client && client.getOptions() || {
    stackParser: () => [],
    attachStacktrace: false
  };
  return options;
}

// node_modules/@sentry/browser/esm/integrations/httpcontext.js
var INTEGRATION_NAME10 = "HttpContext";
var _httpContextIntegration = () => {
  return {
    name: INTEGRATION_NAME10,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    preprocessEvent(event) {
      if (!WINDOW8.navigator && !WINDOW8.location && !WINDOW8.document) {
        return;
      }
      const url = event.request && event.request.url || WINDOW8.location && WINDOW8.location.href;
      const { referrer } = WINDOW8.document || {};
      const { userAgent } = WINDOW8.navigator || {};
      const headers = {
        ...event.request && event.request.headers,
        ...referrer && { Referer: referrer },
        ...userAgent && { "User-Agent": userAgent }
      };
      const request = { ...event.request, ...url && { url }, headers };
      event.request = request;
    }
  };
};
var httpContextIntegration = defineIntegration(_httpContextIntegration);
var HttpContext = convertIntegrationFnToClass(INTEGRATION_NAME10, httpContextIntegration);

// node_modules/@sentry/browser/esm/integrations/linkederrors.js
var DEFAULT_KEY2 = "cause";
var DEFAULT_LIMIT2 = 5;
var INTEGRATION_NAME11 = "LinkedErrors";
var _linkedErrorsIntegration2 = (options = {}) => {
  const limit = options.limit || DEFAULT_LIMIT2;
  const key = options.key || DEFAULT_KEY2;
  return {
    name: INTEGRATION_NAME11,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    preprocessEvent(event, hint, client) {
      const options2 = client.getOptions();
      applyAggregateErrorsToEvent(
        // This differs from the LinkedErrors integration in core by using a different exceptionFromError function
        exceptionFromError2,
        options2.stackParser,
        options2.maxValueLength,
        key,
        limit,
        event,
        hint
      );
    }
  };
};
var linkedErrorsIntegration2 = defineIntegration(_linkedErrorsIntegration2);
var LinkedErrors2 = convertIntegrationFnToClass(INTEGRATION_NAME11, linkedErrorsIntegration2);

// node_modules/@sentry/browser/esm/integrations/trycatch.js
var DEFAULT_EVENT_TARGET = [
  "EventTarget",
  "Window",
  "Node",
  "ApplicationCache",
  "AudioTrackList",
  "BroadcastChannel",
  "ChannelMergerNode",
  "CryptoOperation",
  "EventSource",
  "FileReader",
  "HTMLUnknownElement",
  "IDBDatabase",
  "IDBRequest",
  "IDBTransaction",
  "KeyOperation",
  "MediaController",
  "MessagePort",
  "ModalWindow",
  "Notification",
  "SVGElementInstance",
  "Screen",
  "SharedWorker",
  "TextTrack",
  "TextTrackCue",
  "TextTrackList",
  "WebSocket",
  "WebSocketWorker",
  "Worker",
  "XMLHttpRequest",
  "XMLHttpRequestEventTarget",
  "XMLHttpRequestUpload"
];
var INTEGRATION_NAME12 = "TryCatch";
var _browserApiErrorsIntegration = (options = {}) => {
  const _options = {
    XMLHttpRequest: true,
    eventTarget: true,
    requestAnimationFrame: true,
    setInterval: true,
    setTimeout: true,
    ...options
  };
  return {
    name: INTEGRATION_NAME12,
    // TODO: This currently only works for the first client this is setup
    // We may want to adjust this to check for client etc.
    setupOnce() {
      if (_options.setTimeout) {
        fill(WINDOW8, "setTimeout", _wrapTimeFunction);
      }
      if (_options.setInterval) {
        fill(WINDOW8, "setInterval", _wrapTimeFunction);
      }
      if (_options.requestAnimationFrame) {
        fill(WINDOW8, "requestAnimationFrame", _wrapRAF);
      }
      if (_options.XMLHttpRequest && "XMLHttpRequest" in WINDOW8) {
        fill(XMLHttpRequest.prototype, "send", _wrapXHR);
      }
      const eventTargetOption = _options.eventTarget;
      if (eventTargetOption) {
        const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
        eventTarget.forEach(_wrapEventTarget);
      }
    }
  };
};
var browserApiErrorsIntegration = defineIntegration(_browserApiErrorsIntegration);
var TryCatch = convertIntegrationFnToClass(
  INTEGRATION_NAME12,
  browserApiErrorsIntegration
);
function _wrapTimeFunction(original) {
  return function(...args) {
    const originalCallback = args[0];
    args[0] = wrap2(originalCallback, {
      mechanism: {
        data: { function: getFunctionName(original) },
        handled: false,
        type: "instrument"
      }
    });
    return original.apply(this, args);
  };
}
function _wrapRAF(original) {
  return function(callback) {
    return original.apply(this, [
      wrap2(callback, {
        mechanism: {
          data: {
            function: "requestAnimationFrame",
            handler: getFunctionName(original)
          },
          handled: false,
          type: "instrument"
        }
      })
    ]);
  };
}
function _wrapXHR(originalSend) {
  return function(...args) {
    const xhr = this;
    const xmlHttpRequestProps = ["onload", "onerror", "onprogress", "onreadystatechange"];
    xmlHttpRequestProps.forEach((prop) => {
      if (prop in xhr && typeof xhr[prop] === "function") {
        fill(xhr, prop, function(original) {
          const wrapOptions = {
            mechanism: {
              data: {
                function: prop,
                handler: getFunctionName(original)
              },
              handled: false,
              type: "instrument"
            }
          };
          const originalFunction = getOriginalFunction(original);
          if (originalFunction) {
            wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
          }
          return wrap2(original, wrapOptions);
        });
      }
    });
    return originalSend.apply(this, args);
  };
}
function _wrapEventTarget(target) {
  const globalObject = WINDOW8;
  const proto = globalObject[target] && globalObject[target].prototype;
  if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
    return;
  }
  fill(proto, "addEventListener", function(original) {
    return function(eventName, fn, options) {
      try {
        if (typeof fn.handleEvent === "function") {
          fn.handleEvent = wrap2(fn.handleEvent, {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: getFunctionName(fn),
                target
              },
              handled: false,
              type: "instrument"
            }
          });
        }
      } catch (err) {
      }
      return original.apply(this, [
        eventName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrap2(fn, {
          mechanism: {
            data: {
              function: "addEventListener",
              handler: getFunctionName(fn),
              target
            },
            handled: false,
            type: "instrument"
          }
        }),
        options
      ]);
    };
  });
  fill(
    proto,
    "removeEventListener",
    function(originalRemoveEventListener) {
      return function(eventName, fn, options) {
        const wrappedEventHandler = fn;
        try {
          const originalEventHandler = wrappedEventHandler && wrappedEventHandler.__sentry_wrapped__;
          if (originalEventHandler) {
            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
          }
        } catch (e2) {
        }
        return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
      };
    }
  );
}

// node_modules/@sentry/browser/esm/sdk.js
var defaultIntegrations = [
  inboundFiltersIntegration(),
  functionToStringIntegration(),
  browserApiErrorsIntegration(),
  breadcrumbsIntegration(),
  globalHandlersIntegration(),
  linkedErrorsIntegration2(),
  dedupeIntegration(),
  httpContextIntegration()
];
function getDefaultIntegrations(_options) {
  return [
    // eslint-disable-next-line deprecation/deprecation
    ...defaultIntegrations
  ];
}
function init(options = {}) {
  if (options.defaultIntegrations === void 0) {
    options.defaultIntegrations = getDefaultIntegrations();
  }
  if (options.release === void 0) {
    if (typeof __SENTRY_RELEASE__ === "string") {
      options.release = __SENTRY_RELEASE__;
    }
    if (WINDOW8.SENTRY_RELEASE && WINDOW8.SENTRY_RELEASE.id) {
      options.release = WINDOW8.SENTRY_RELEASE.id;
    }
  }
  if (options.autoSessionTracking === void 0) {
    options.autoSessionTracking = true;
  }
  if (options.sendClientReports === void 0) {
    options.sendClientReports = true;
  }
  const clientOptions = {
    ...options,
    stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
    integrations: getIntegrationsToSetup(options),
    transport: options.transport || (supportsFetch() ? makeFetchTransport : makeXHRTransport)
  };
  initAndBind(BrowserClient, clientOptions);
  if (options.autoSessionTracking) {
    startSessionTracking();
  }
}
var showReportDialog = (options = {}, hub = getCurrentHub()) => {
  if (!WINDOW8.document) {
    DEBUG_BUILD4 && logger.error("Global document not defined in showReportDialog call");
    return;
  }
  const { client, scope } = hub.getStackTop();
  const dsn = options.dsn || client && client.getDsn();
  if (!dsn) {
    DEBUG_BUILD4 && logger.error("DSN not configured for showReportDialog call");
    return;
  }
  if (scope) {
    options.user = {
      ...scope.getUser(),
      ...options.user
    };
  }
  if (!options.eventId) {
    options.eventId = hub.lastEventId();
  }
  const script = WINDOW8.document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = getReportDialogEndpoint(dsn, options);
  if (options.onLoad) {
    script.onload = options.onLoad;
  }
  const { onClose } = options;
  if (onClose) {
    const reportDialogClosedMessageHandler = (event) => {
      if (event.data === "__sentry_reportdialog_closed__") {
        try {
          onClose();
        } finally {
          WINDOW8.removeEventListener("message", reportDialogClosedMessageHandler);
        }
      }
    };
    WINDOW8.addEventListener("message", reportDialogClosedMessageHandler);
  }
  const injectionPoint = WINDOW8.document.head || WINDOW8.document.body;
  if (injectionPoint) {
    injectionPoint.appendChild(script);
  } else {
    DEBUG_BUILD4 && logger.error("Not injecting report dialog. No injection point found in HTML");
  }
};
function forceLoad() {
}
function onLoad(callback) {
  callback();
}
function wrap3(fn) {
  return wrap2(fn)();
}
function startSessionTracking() {
  if (typeof WINDOW8.document === "undefined") {
    DEBUG_BUILD4 && logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
    return;
  }
  startSession({ ignoreDuration: true });
  captureSession();
  addHistoryInstrumentationHandler(({ from, to }) => {
    if (from !== void 0 && from !== to) {
      startSession({ ignoreDuration: true });
      captureSession();
    }
  });
}
function captureUserFeedback(feedback) {
  const client = getClient();
  if (client) {
    client.captureUserFeedback(feedback);
  }
}

// node_modules/@sentry/browser/esm/integrations/index.js
var integrations_exports2 = {};
__export(integrations_exports2, {
  Breadcrumbs: () => Breadcrumbs,
  Dedupe: () => Dedupe,
  GlobalHandlers: () => GlobalHandlers,
  HttpContext: () => HttpContext,
  LinkedErrors: () => LinkedErrors2,
  TryCatch: () => TryCatch
});

// node_modules/@sentry/replay/esm/index.js
var WINDOW9 = GLOBAL_OBJ;
var REPLAY_SESSION_KEY = "sentryReplaySession";
var REPLAY_EVENT_NAME = "replay_event";
var UNABLE_TO_SEND_REPLAY = "Unable to send Replay";
var SESSION_IDLE_PAUSE_DURATION = 3e5;
var SESSION_IDLE_EXPIRE_DURATION = 9e5;
var DEFAULT_FLUSH_MIN_DELAY = 5e3;
var DEFAULT_FLUSH_MAX_DELAY = 5500;
var BUFFER_CHECKOUT_TIME = 6e4;
var RETRY_BASE_INTERVAL = 5e3;
var RETRY_MAX_COUNT = 3;
var NETWORK_BODY_MAX_SIZE = 15e4;
var CONSOLE_ARG_MAX_SIZE = 5e3;
var SLOW_CLICK_THRESHOLD = 3e3;
var SLOW_CLICK_SCROLL_TIMEOUT = 300;
var REPLAY_MAX_EVENT_BUFFER_SIZE = 2e7;
var MIN_REPLAY_DURATION = 4999;
var MIN_REPLAY_DURATION_LIMIT = 15e3;
var MAX_REPLAY_DURATION = 36e5;
function _nullishCoalesce$1(lhs, rhsFn) {
  if (lhs != null) {
    return lhs;
  } else {
    return rhsFn();
  }
}
function _optionalChain$5(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
var NodeType$1;
(function(NodeType3) {
  NodeType3[NodeType3["Document"] = 0] = "Document";
  NodeType3[NodeType3["DocumentType"] = 1] = "DocumentType";
  NodeType3[NodeType3["Element"] = 2] = "Element";
  NodeType3[NodeType3["Text"] = 3] = "Text";
  NodeType3[NodeType3["CDATA"] = 4] = "CDATA";
  NodeType3[NodeType3["Comment"] = 5] = "Comment";
})(NodeType$1 || (NodeType$1 = {}));
function isElement$1(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function isShadowRoot(n) {
  const host = _optionalChain$5([n, "optionalAccess", (_) => _.host]);
  return Boolean(_optionalChain$5([host, "optionalAccess", (_2) => _2.shadowRoot]) === n);
}
function isNativeShadowDom(shadowRoot) {
  return Object.prototype.toString.call(shadowRoot) === "[object ShadowRoot]";
}
function fixBrowserCompatibilityIssuesInCSS(cssText) {
  if (cssText.includes(" background-clip: text;") && !cssText.includes(" -webkit-background-clip: text;")) {
    cssText = cssText.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;");
  }
  return cssText;
}
function escapeImportStatement(rule) {
  const { cssText } = rule;
  if (cssText.split('"').length < 3)
    return cssText;
  const statement = ["@import", `url(${JSON.stringify(rule.href)})`];
  if (rule.layerName === "") {
    statement.push(`layer`);
  } else if (rule.layerName) {
    statement.push(`layer(${rule.layerName})`);
  }
  if (rule.supportsText) {
    statement.push(`supports(${rule.supportsText})`);
  }
  if (rule.media.length) {
    statement.push(rule.media.mediaText);
  }
  return statement.join(" ") + ";";
}
function stringifyStylesheet(s) {
  try {
    const rules = s.rules || s.cssRules;
    return rules ? fixBrowserCompatibilityIssuesInCSS(Array.from(rules, stringifyRule).join("")) : null;
  } catch (error) {
    return null;
  }
}
function stringifyRule(rule) {
  let importStringified;
  if (isCSSImportRule(rule)) {
    try {
      importStringified = stringifyStylesheet(rule.styleSheet) || escapeImportStatement(rule);
    } catch (error) {
    }
  } else if (isCSSStyleRule(rule) && rule.selectorText.includes(":")) {
    return fixSafariColons(rule.cssText);
  }
  return importStringified || rule.cssText;
}
function fixSafariColons(cssStringified) {
  const regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return cssStringified.replace(regex, "$1\\$2");
}
function isCSSImportRule(rule) {
  return "styleSheet" in rule;
}
function isCSSStyleRule(rule) {
  return "selectorText" in rule;
}
var Mirror = class {
  constructor() {
    this.idNodeMap = /* @__PURE__ */ new Map();
    this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
  getId(n) {
    if (!n)
      return -1;
    const id = _optionalChain$5([this, "access", (_3) => _3.getMeta, "call", (_4) => _4(n), "optionalAccess", (_5) => _5.id]);
    return _nullishCoalesce$1(id, () => -1);
  }
  getNode(id) {
    return this.idNodeMap.get(id) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(n) {
    return this.nodeMetaMap.get(n) || null;
  }
  removeNodeFromMap(n) {
    const id = this.getId(n);
    this.idNodeMap.delete(id);
    if (n.childNodes) {
      n.childNodes.forEach((childNode) => this.removeNodeFromMap(childNode));
    }
  }
  has(id) {
    return this.idNodeMap.has(id);
  }
  hasNode(node2) {
    return this.nodeMetaMap.has(node2);
  }
  add(n, meta) {
    const id = meta.id;
    this.idNodeMap.set(id, n);
    this.nodeMetaMap.set(n, meta);
  }
  replace(id, n) {
    const oldNode = this.getNode(id);
    if (oldNode) {
      const meta = this.nodeMetaMap.get(oldNode);
      if (meta)
        this.nodeMetaMap.set(n, meta);
    }
    this.idNodeMap.set(id, n);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map();
    this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
};
function createMirror() {
  return new Mirror();
}
function shouldMaskInput({ maskInputOptions, tagName, type }) {
  if (tagName === "OPTION") {
    tagName = "SELECT";
  }
  return Boolean(maskInputOptions[tagName.toLowerCase()] || type && maskInputOptions[type] || type === "password" || tagName === "INPUT" && !type && maskInputOptions["text"]);
}
function maskInputValue({ isMasked, element, value, maskInputFn }) {
  let text = value || "";
  if (!isMasked) {
    return text;
  }
  if (maskInputFn) {
    text = maskInputFn(text, element);
  }
  return "*".repeat(text.length);
}
function toLowerCase(str) {
  return str.toLowerCase();
}
function toUpperCase(str) {
  return str.toUpperCase();
}
var ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return true;
  const chunkSize = 50;
  for (let x = 0; x < canvas.width; x += chunkSize) {
    for (let y = 0; y < canvas.height; y += chunkSize) {
      const getImageData = ctx.getImageData;
      const originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
      const pixelBuffer = new Uint32Array(originalGetImageData.call(ctx, x, y, Math.min(chunkSize, canvas.width - x), Math.min(chunkSize, canvas.height - y)).data.buffer);
      if (pixelBuffer.some((pixel) => pixel !== 0))
        return false;
    }
  }
  return true;
}
function getInputType(element) {
  const type = element.type;
  return element.hasAttribute("data-rr-is-password") ? "password" : type ? toLowerCase(type) : null;
}
function getInputValue(el, tagName, type) {
  if (tagName === "INPUT" && (type === "radio" || type === "checkbox")) {
    return el.getAttribute("value") || "";
  }
  return el.value;
}
var _id = 1;
var tagNameRegex = new RegExp("[^a-z0-9-_:]");
var IGNORED_NODE = -2;
function genId() {
  return _id++;
}
function getValidTagName(element) {
  if (element instanceof HTMLFormElement) {
    return "form";
  }
  const processedTagName = toLowerCase(element.tagName);
  if (tagNameRegex.test(processedTagName)) {
    return "div";
  }
  return processedTagName;
}
function extractOrigin(url) {
  let origin = "";
  if (url.indexOf("//") > -1) {
    origin = url.split("/").slice(0, 3).join("/");
  } else {
    origin = url.split("/")[0];
  }
  origin = origin.split("?")[0];
  return origin;
}
var canvasService;
var canvasCtx;
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
var URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
var URL_WWW_MATCH = /^www\..*/i;
var DATA_URI = /^(data:)([^,]*),(.*)/i;
function absoluteToStylesheet(cssText, href) {
  return (cssText || "").replace(URL_IN_CSS_REF, (origin, quote1, path1, quote2, path2, path3) => {
    const filePath = path1 || path2 || path3;
    const maybeQuote = quote1 || quote2 || "";
    if (!filePath) {
      return origin;
    }
    if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) {
      return `url(${maybeQuote}${filePath}${maybeQuote})`;
    }
    if (DATA_URI.test(filePath)) {
      return `url(${maybeQuote}${filePath}${maybeQuote})`;
    }
    if (filePath[0] === "/") {
      return `url(${maybeQuote}${extractOrigin(href) + filePath}${maybeQuote})`;
    }
    const stack = href.split("/");
    const parts = filePath.split("/");
    stack.pop();
    for (const part of parts) {
      if (part === ".") {
        continue;
      } else if (part === "..") {
        stack.pop();
      } else {
        stack.push(part);
      }
    }
    return `url(${maybeQuote}${stack.join("/")}${maybeQuote})`;
  });
}
var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc2, attributeValue) {
  if (attributeValue.trim() === "") {
    return attributeValue;
  }
  let pos = 0;
  function collectCharacters(regEx) {
    let chars2;
    const match = regEx.exec(attributeValue.substring(pos));
    if (match) {
      chars2 = match[0];
      pos += chars2.length;
      return chars2;
    }
    return "";
  }
  const output = [];
  while (true) {
    collectCharacters(SRCSET_COMMAS_OR_SPACES);
    if (pos >= attributeValue.length) {
      break;
    }
    let url = collectCharacters(SRCSET_NOT_SPACES);
    if (url.slice(-1) === ",") {
      url = absoluteToDoc(doc2, url.substring(0, url.length - 1));
      output.push(url);
    } else {
      let descriptorsStr = "";
      url = absoluteToDoc(doc2, url);
      let inParens = false;
      while (true) {
        const c = attributeValue.charAt(pos);
        if (c === "") {
          output.push((url + descriptorsStr).trim());
          break;
        } else if (!inParens) {
          if (c === ",") {
            pos += 1;
            output.push((url + descriptorsStr).trim());
            break;
          } else if (c === "(") {
            inParens = true;
          }
        } else {
          if (c === ")") {
            inParens = false;
          }
        }
        descriptorsStr += c;
        pos += 1;
      }
    }
  }
  return output.join(", ");
}
function absoluteToDoc(doc2, attributeValue) {
  if (!attributeValue || attributeValue.trim() === "") {
    return attributeValue;
  }
  const a = doc2.createElement("a");
  a.href = attributeValue;
  return a.href;
}
function isSVGElement(el) {
  return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref() {
  const a = document.createElement("a");
  a.href = "";
  return a.href;
}
function transformAttribute(doc2, tagName, name, value, element, maskAttributeFn) {
  if (!value) {
    return value;
  }
  if (name === "src" || name === "href" && !(tagName === "use" && value[0] === "#")) {
    return absoluteToDoc(doc2, value);
  } else if (name === "xlink:href" && value[0] !== "#") {
    return absoluteToDoc(doc2, value);
  } else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) {
    return absoluteToDoc(doc2, value);
  } else if (name === "srcset") {
    return getAbsoluteSrcsetString(doc2, value);
  } else if (name === "style") {
    return absoluteToStylesheet(value, getHref());
  } else if (tagName === "object" && name === "data") {
    return absoluteToDoc(doc2, value);
  }
  if (typeof maskAttributeFn === "function") {
    return maskAttributeFn(name, value, element);
  }
  return value;
}
function ignoreAttribute(tagName, name, _value) {
  return (tagName === "video" || tagName === "audio") && name === "autoplay";
}
function _isBlockedElement(element, blockClass, blockSelector, unblockSelector) {
  try {
    if (unblockSelector && element.matches(unblockSelector)) {
      return false;
    }
    if (typeof blockClass === "string") {
      if (element.classList.contains(blockClass)) {
        return true;
      }
    } else {
      for (let eIndex = element.classList.length; eIndex--; ) {
        const className = element.classList[eIndex];
        if (blockClass.test(className)) {
          return true;
        }
      }
    }
    if (blockSelector) {
      return element.matches(blockSelector);
    }
  } catch (e2) {
  }
  return false;
}
function elementClassMatchesRegex(el, regex) {
  for (let eIndex = el.classList.length; eIndex--; ) {
    const className = el.classList[eIndex];
    if (regex.test(className)) {
      return true;
    }
  }
  return false;
}
function distanceToMatch(node2, matchPredicate, limit = Infinity, distance = 0) {
  if (!node2)
    return -1;
  if (node2.nodeType !== node2.ELEMENT_NODE)
    return -1;
  if (distance > limit)
    return -1;
  if (matchPredicate(node2))
    return distance;
  return distanceToMatch(node2.parentNode, matchPredicate, limit, distance + 1);
}
function createMatchPredicate(className, selector) {
  return (node2) => {
    const el = node2;
    if (el === null)
      return false;
    try {
      if (className) {
        if (typeof className === "string") {
          if (el.matches(`.${className}`))
            return true;
        } else if (elementClassMatchesRegex(el, className)) {
          return true;
        }
      }
      if (selector && el.matches(selector))
        return true;
      return false;
    } catch (e2) {
      return false;
    }
  };
}
function needMaskingText(node2, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, maskAllText) {
  try {
    const el = node2.nodeType === node2.ELEMENT_NODE ? node2 : node2.parentElement;
    if (el === null)
      return false;
    if (el.tagName === "INPUT") {
      const autocomplete = el.getAttribute("autocomplete");
      const disallowedAutocompleteValues = [
        "current-password",
        "new-password",
        "cc-number",
        "cc-exp",
        "cc-exp-month",
        "cc-exp-year",
        "cc-csc"
      ];
      if (disallowedAutocompleteValues.includes(autocomplete)) {
        return true;
      }
    }
    let maskDistance = -1;
    let unmaskDistance = -1;
    if (maskAllText) {
      unmaskDistance = distanceToMatch(el, createMatchPredicate(unmaskTextClass, unmaskTextSelector));
      if (unmaskDistance < 0) {
        return true;
      }
      maskDistance = distanceToMatch(el, createMatchPredicate(maskTextClass, maskTextSelector), unmaskDistance >= 0 ? unmaskDistance : Infinity);
    } else {
      maskDistance = distanceToMatch(el, createMatchPredicate(maskTextClass, maskTextSelector));
      if (maskDistance < 0) {
        return false;
      }
      unmaskDistance = distanceToMatch(el, createMatchPredicate(unmaskTextClass, unmaskTextSelector), maskDistance >= 0 ? maskDistance : Infinity);
    }
    return maskDistance >= 0 ? unmaskDistance >= 0 ? maskDistance <= unmaskDistance : true : unmaskDistance >= 0 ? false : !!maskAllText;
  } catch (e2) {
  }
  return !!maskAllText;
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
  const win = iframeEl.contentWindow;
  if (!win) {
    return;
  }
  let fired = false;
  let readyState;
  try {
    readyState = win.document.readyState;
  } catch (error) {
    return;
  }
  if (readyState !== "complete") {
    const timer = setTimeout(() => {
      if (!fired) {
        listener();
        fired = true;
      }
    }, iframeLoadTimeout);
    iframeEl.addEventListener("load", () => {
      clearTimeout(timer);
      fired = true;
      listener();
    });
    return;
  }
  const blankUrl = "about:blank";
  if (win.location.href !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
    setTimeout(listener, 0);
    return iframeEl.addEventListener("load", listener);
  }
  iframeEl.addEventListener("load", listener);
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
  let fired = false;
  let styleSheetLoaded;
  try {
    styleSheetLoaded = link.sheet;
  } catch (error) {
    return;
  }
  if (styleSheetLoaded)
    return;
  const timer = setTimeout(() => {
    if (!fired) {
      listener();
      fired = true;
    }
  }, styleSheetLoadTimeout);
  link.addEventListener("load", () => {
    clearTimeout(timer);
    fired = true;
    listener();
  });
}
function serializeNode(n, options) {
  const { doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, maskAllText, maskAttributeFn, maskTextClass, unmaskTextClass, maskTextSelector, unmaskTextSelector, inlineStylesheet, maskInputOptions = {}, maskTextFn, maskInputFn, dataURLOptions = {}, inlineImages, recordCanvas, keepIframeSrcFn, newlyAddedElement = false } = options;
  const rootId = getRootId(doc2, mirror2);
  switch (n.nodeType) {
    case n.DOCUMENT_NODE:
      if (n.compatMode !== "CSS1Compat") {
        return {
          type: NodeType$1.Document,
          childNodes: [],
          compatMode: n.compatMode
        };
      } else {
        return {
          type: NodeType$1.Document,
          childNodes: []
        };
      }
    case n.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType$1.DocumentType,
        name: n.name,
        publicId: n.publicId,
        systemId: n.systemId,
        rootId
      };
    case n.ELEMENT_NODE:
      return serializeElementNode(n, {
        doc: doc2,
        blockClass,
        blockSelector,
        unblockSelector,
        inlineStylesheet,
        maskAttributeFn,
        maskInputOptions,
        maskInputFn,
        dataURLOptions,
        inlineImages,
        recordCanvas,
        keepIframeSrcFn,
        newlyAddedElement,
        rootId,
        maskAllText,
        maskTextClass,
        unmaskTextClass,
        maskTextSelector,
        unmaskTextSelector
      });
    case n.TEXT_NODE:
      return serializeTextNode(n, {
        maskAllText,
        maskTextClass,
        unmaskTextClass,
        maskTextSelector,
        unmaskTextSelector,
        maskTextFn,
        maskInputOptions,
        maskInputFn,
        rootId
      });
    case n.CDATA_SECTION_NODE:
      return {
        type: NodeType$1.CDATA,
        textContent: "",
        rootId
      };
    case n.COMMENT_NODE:
      return {
        type: NodeType$1.Comment,
        textContent: n.textContent || "",
        rootId
      };
    default:
      return false;
  }
}
function getRootId(doc2, mirror2) {
  if (!mirror2.hasNode(doc2))
    return void 0;
  const docId = mirror2.getId(doc2);
  return docId === 1 ? void 0 : docId;
}
function serializeTextNode(n, options) {
  const { maskAllText, maskTextClass, unmaskTextClass, maskTextSelector, unmaskTextSelector, maskTextFn, maskInputOptions, maskInputFn, rootId } = options;
  const parentTagName = n.parentNode && n.parentNode.tagName;
  let textContent = n.textContent;
  const isStyle = parentTagName === "STYLE" ? true : void 0;
  const isScript = parentTagName === "SCRIPT" ? true : void 0;
  const isTextarea = parentTagName === "TEXTAREA" ? true : void 0;
  if (isStyle && textContent) {
    try {
      if (n.nextSibling || n.previousSibling) {
      } else if (_optionalChain$5([n, "access", (_6) => _6.parentNode, "access", (_7) => _7.sheet, "optionalAccess", (_8) => _8.cssRules])) {
        textContent = stringifyStylesheet(n.parentNode.sheet);
      }
    } catch (err) {
      console.warn(`Cannot get CSS styles from text's parentNode. Error: ${err}`, n);
    }
    textContent = absoluteToStylesheet(textContent, getHref());
  }
  if (isScript) {
    textContent = "SCRIPT_PLACEHOLDER";
  }
  const forceMask = needMaskingText(n, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, maskAllText);
  if (!isStyle && !isScript && !isTextarea && textContent && forceMask) {
    textContent = maskTextFn ? maskTextFn(textContent) : textContent.replace(/[\S]/g, "*");
  }
  if (isTextarea && textContent && (maskInputOptions.textarea || forceMask)) {
    textContent = maskInputFn ? maskInputFn(textContent, n.parentNode) : textContent.replace(/[\S]/g, "*");
  }
  if (parentTagName === "OPTION" && textContent) {
    const isInputMasked = shouldMaskInput({
      type: null,
      tagName: parentTagName,
      maskInputOptions
    });
    textContent = maskInputValue({
      isMasked: needMaskingText(n, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, isInputMasked),
      element: n,
      value: textContent,
      maskInputFn
    });
  }
  return {
    type: NodeType$1.Text,
    textContent: textContent || "",
    isStyle,
    rootId
  };
}
function serializeElementNode(n, options) {
  const { doc: doc2, blockClass, blockSelector, unblockSelector, inlineStylesheet, maskInputOptions = {}, maskAttributeFn, maskInputFn, dataURLOptions = {}, inlineImages, recordCanvas, keepIframeSrcFn, newlyAddedElement = false, rootId, maskAllText, maskTextClass, unmaskTextClass, maskTextSelector, unmaskTextSelector } = options;
  const needBlock = _isBlockedElement(n, blockClass, blockSelector, unblockSelector);
  const tagName = getValidTagName(n);
  let attributes = {};
  const len = n.attributes.length;
  for (let i = 0; i < len; i++) {
    const attr = n.attributes[i];
    if (attr.name && !ignoreAttribute(tagName, attr.name, attr.value)) {
      attributes[attr.name] = transformAttribute(doc2, tagName, toLowerCase(attr.name), attr.value, n, maskAttributeFn);
    }
  }
  if (tagName === "link" && inlineStylesheet) {
    const stylesheet = Array.from(doc2.styleSheets).find((s) => {
      return s.href === n.href;
    });
    let cssText = null;
    if (stylesheet) {
      cssText = stringifyStylesheet(stylesheet);
    }
    if (cssText) {
      delete attributes.rel;
      delete attributes.href;
      attributes._cssText = absoluteToStylesheet(cssText, stylesheet.href);
    }
  }
  if (tagName === "style" && n.sheet && !(n.innerText || n.textContent || "").trim().length) {
    const cssText = stringifyStylesheet(n.sheet);
    if (cssText) {
      attributes._cssText = absoluteToStylesheet(cssText, getHref());
    }
  }
  if (tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "option") {
    const el = n;
    const type = getInputType(el);
    const value = getInputValue(el, toUpperCase(tagName), type);
    const checked = el.checked;
    if (type !== "submit" && type !== "button" && value) {
      const forceMask = needMaskingText(el, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, shouldMaskInput({
        type,
        tagName: toUpperCase(tagName),
        maskInputOptions
      }));
      attributes.value = maskInputValue({
        isMasked: forceMask,
        element: el,
        value,
        maskInputFn
      });
    }
    if (checked) {
      attributes.checked = checked;
    }
  }
  if (tagName === "option") {
    if (n.selected && !maskInputOptions["select"]) {
      attributes.selected = true;
    } else {
      delete attributes.selected;
    }
  }
  if (tagName === "canvas" && recordCanvas) {
    if (n.__context === "2d") {
      if (!is2DCanvasBlank(n)) {
        attributes.rr_dataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      }
    } else if (!("__context" in n)) {
      const canvasDataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      const blankCanvas = document.createElement("canvas");
      blankCanvas.width = n.width;
      blankCanvas.height = n.height;
      const blankCanvasDataURL = blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      if (canvasDataURL !== blankCanvasDataURL) {
        attributes.rr_dataURL = canvasDataURL;
      }
    }
  }
  if (tagName === "img" && inlineImages) {
    if (!canvasService) {
      canvasService = doc2.createElement("canvas");
      canvasCtx = canvasService.getContext("2d");
    }
    const image = n;
    const oldValue = image.crossOrigin;
    image.crossOrigin = "anonymous";
    const recordInlineImage = () => {
      image.removeEventListener("load", recordInlineImage);
      try {
        canvasService.width = image.naturalWidth;
        canvasService.height = image.naturalHeight;
        canvasCtx.drawImage(image, 0, 0);
        attributes.rr_dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      } catch (err) {
        console.warn(`Cannot inline img src=${image.currentSrc}! Error: ${err}`);
      }
      oldValue ? attributes.crossOrigin = oldValue : image.removeAttribute("crossorigin");
    };
    if (image.complete && image.naturalWidth !== 0)
      recordInlineImage();
    else
      image.addEventListener("load", recordInlineImage);
  }
  if (tagName === "audio" || tagName === "video") {
    attributes.rr_mediaState = n.paused ? "paused" : "played";
    attributes.rr_mediaCurrentTime = n.currentTime;
  }
  if (!newlyAddedElement) {
    if (n.scrollLeft) {
      attributes.rr_scrollLeft = n.scrollLeft;
    }
    if (n.scrollTop) {
      attributes.rr_scrollTop = n.scrollTop;
    }
  }
  if (needBlock) {
    const { width, height } = n.getBoundingClientRect();
    attributes = {
      class: attributes.class,
      rr_width: `${width}px`,
      rr_height: `${height}px`
    };
  }
  if (tagName === "iframe" && !keepIframeSrcFn(attributes.src)) {
    if (!n.contentDocument) {
      attributes.rr_src = attributes.src;
    }
    delete attributes.src;
  }
  let isCustomElement;
  try {
    if (customElements.get(tagName))
      isCustomElement = true;
  } catch (e2) {
  }
  return {
    type: NodeType$1.Element,
    tagName,
    attributes,
    childNodes: [],
    isSVG: isSVGElement(n) || void 0,
    needBlock,
    rootId,
    isCustom: isCustomElement
  };
}
function lowerIfExists(maybeAttr) {
  if (maybeAttr === void 0 || maybeAttr === null) {
    return "";
  } else {
    return maybeAttr.toLowerCase();
  }
}
function slimDOMExcluded(sn, slimDOMOptions) {
  if (slimDOMOptions.comment && sn.type === NodeType$1.Comment) {
    return true;
  } else if (sn.type === NodeType$1.Element) {
    if (slimDOMOptions.script && (sn.tagName === "script" || sn.tagName === "link" && (sn.attributes.rel === "preload" || sn.attributes.rel === "modulepreload") && sn.attributes.as === "script" || sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && sn.attributes.href.endsWith(".js"))) {
      return true;
    } else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) || lowerIfExists(sn.attributes.name) === "application-name" || lowerIfExists(sn.attributes.rel) === "icon" || lowerIfExists(sn.attributes.rel) === "apple-touch-icon" || lowerIfExists(sn.attributes.rel) === "shortcut icon"))) {
      return true;
    } else if (sn.tagName === "meta") {
      if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
        return true;
      } else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) || lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) {
        return true;
      } else if (slimDOMOptions.headMetaRobots && (lowerIfExists(sn.attributes.name) === "robots" || lowerIfExists(sn.attributes.name) === "googlebot" || lowerIfExists(sn.attributes.name) === "bingbot")) {
        return true;
      } else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) {
        return true;
      } else if (slimDOMOptions.headMetaAuthorship && (lowerIfExists(sn.attributes.name) === "author" || lowerIfExists(sn.attributes.name) === "generator" || lowerIfExists(sn.attributes.name) === "framework" || lowerIfExists(sn.attributes.name) === "publisher" || lowerIfExists(sn.attributes.name) === "progid" || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) {
        return true;
      } else if (slimDOMOptions.headMetaVerification && (lowerIfExists(sn.attributes.name) === "google-site-verification" || lowerIfExists(sn.attributes.name) === "yandex-verification" || lowerIfExists(sn.attributes.name) === "csrf-token" || lowerIfExists(sn.attributes.name) === "p:domain_verify" || lowerIfExists(sn.attributes.name) === "verify-v1" || lowerIfExists(sn.attributes.name) === "verification" || lowerIfExists(sn.attributes.name) === "shopify-checkout-api-token")) {
        return true;
      }
    }
  }
  return false;
}
function serializeNodeWithId(n, options) {
  const { doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, maskAllText, maskTextClass, unmaskTextClass, maskTextSelector, unmaskTextSelector, skipChild = false, inlineStylesheet = true, maskInputOptions = {}, maskAttributeFn, maskTextFn, maskInputFn, slimDOMOptions, dataURLOptions = {}, inlineImages = false, recordCanvas = false, onSerialize, onIframeLoad, iframeLoadTimeout = 5e3, onStylesheetLoad, stylesheetLoadTimeout = 5e3, keepIframeSrcFn = () => false, newlyAddedElement = false } = options;
  let { preserveWhiteSpace = true } = options;
  const _serializedNode = serializeNode(n, {
    doc: doc2,
    mirror: mirror2,
    blockClass,
    blockSelector,
    maskAllText,
    unblockSelector,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    inlineStylesheet,
    maskInputOptions,
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    keepIframeSrcFn,
    newlyAddedElement
  });
  if (!_serializedNode) {
    console.warn(n, "not serialized");
    return null;
  }
  let id;
  if (mirror2.hasNode(n)) {
    id = mirror2.getId(n);
  } else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType$1.Text && !_serializedNode.isStyle && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) {
    id = IGNORED_NODE;
  } else {
    id = genId();
  }
  const serializedNode = Object.assign(_serializedNode, { id });
  mirror2.add(n, serializedNode);
  if (id === IGNORED_NODE) {
    return null;
  }
  if (onSerialize) {
    onSerialize(n);
  }
  let recordChild = !skipChild;
  if (serializedNode.type === NodeType$1.Element) {
    recordChild = recordChild && !serializedNode.needBlock;
    delete serializedNode.needBlock;
    const shadowRoot = n.shadowRoot;
    if (shadowRoot && isNativeShadowDom(shadowRoot))
      serializedNode.isShadowHost = true;
  }
  if ((serializedNode.type === NodeType$1.Document || serializedNode.type === NodeType$1.Element) && recordChild) {
    if (slimDOMOptions.headWhitespace && serializedNode.type === NodeType$1.Element && serializedNode.tagName === "head") {
      preserveWhiteSpace = false;
    }
    const bypassOptions = {
      doc: doc2,
      mirror: mirror2,
      blockClass,
      blockSelector,
      maskAllText,
      unblockSelector,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      skipChild,
      inlineStylesheet,
      maskInputOptions,
      maskAttributeFn,
      maskTextFn,
      maskInputFn,
      slimDOMOptions,
      dataURLOptions,
      inlineImages,
      recordCanvas,
      preserveWhiteSpace,
      onSerialize,
      onIframeLoad,
      iframeLoadTimeout,
      onStylesheetLoad,
      stylesheetLoadTimeout,
      keepIframeSrcFn
    };
    for (const childN of Array.from(n.childNodes)) {
      const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
      if (serializedChildNode) {
        serializedNode.childNodes.push(serializedChildNode);
      }
    }
    if (isElement$1(n) && n.shadowRoot) {
      for (const childN of Array.from(n.shadowRoot.childNodes)) {
        const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          isNativeShadowDom(n.shadowRoot) && (serializedChildNode.isShadow = true);
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
  }
  if (n.parentNode && isShadowRoot(n.parentNode) && isNativeShadowDom(n.parentNode)) {
    serializedNode.isShadow = true;
  }
  if (serializedNode.type === NodeType$1.Element && serializedNode.tagName === "iframe") {
    onceIframeLoaded(n, () => {
      const iframeDoc = n.contentDocument;
      if (iframeDoc && onIframeLoad) {
        const serializedIframeNode = serializeNodeWithId(iframeDoc, {
          doc: iframeDoc,
          mirror: mirror2,
          blockClass,
          blockSelector,
          unblockSelector,
          maskAllText,
          maskTextClass,
          unmaskTextClass,
          maskTextSelector,
          unmaskTextSelector,
          skipChild: false,
          inlineStylesheet,
          maskInputOptions,
          maskAttributeFn,
          maskTextFn,
          maskInputFn,
          slimDOMOptions,
          dataURLOptions,
          inlineImages,
          recordCanvas,
          preserveWhiteSpace,
          onSerialize,
          onIframeLoad,
          iframeLoadTimeout,
          onStylesheetLoad,
          stylesheetLoadTimeout,
          keepIframeSrcFn
        });
        if (serializedIframeNode) {
          onIframeLoad(n, serializedIframeNode);
        }
      }
    }, iframeLoadTimeout);
  }
  if (serializedNode.type === NodeType$1.Element && serializedNode.tagName === "link" && serializedNode.attributes.rel === "stylesheet") {
    onceStylesheetLoaded(n, () => {
      if (onStylesheetLoad) {
        const serializedLinkNode = serializeNodeWithId(n, {
          doc: doc2,
          mirror: mirror2,
          blockClass,
          blockSelector,
          unblockSelector,
          maskAllText,
          maskTextClass,
          unmaskTextClass,
          maskTextSelector,
          unmaskTextSelector,
          skipChild: false,
          inlineStylesheet,
          maskInputOptions,
          maskAttributeFn,
          maskTextFn,
          maskInputFn,
          slimDOMOptions,
          dataURLOptions,
          inlineImages,
          recordCanvas,
          preserveWhiteSpace,
          onSerialize,
          onIframeLoad,
          iframeLoadTimeout,
          onStylesheetLoad,
          stylesheetLoadTimeout,
          keepIframeSrcFn
        });
        if (serializedLinkNode) {
          onStylesheetLoad(n, serializedLinkNode);
        }
      }
    }, stylesheetLoadTimeout);
  }
  return serializedNode;
}
function snapshot(n, options) {
  const { mirror: mirror2 = new Mirror(), blockClass = "rr-block", blockSelector = null, unblockSelector = null, maskAllText = false, maskTextClass = "rr-mask", unmaskTextClass = null, maskTextSelector = null, unmaskTextSelector = null, inlineStylesheet = true, inlineImages = false, recordCanvas = false, maskAllInputs = false, maskAttributeFn, maskTextFn, maskInputFn, slimDOM = false, dataURLOptions, preserveWhiteSpace, onSerialize, onIframeLoad, iframeLoadTimeout, onStylesheetLoad, stylesheetLoadTimeout, keepIframeSrcFn = () => false } = options || {};
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true
  } : maskAllInputs === false ? {} : maskAllInputs;
  const slimDOMOptions = slimDOM === true || slimDOM === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaDescKeywords: slimDOM === "all",
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaAuthorship: true,
    headMetaVerification: true
  } : slimDOM === false ? {} : slimDOM;
  return serializeNodeWithId(n, {
    doc: n,
    mirror: mirror2,
    blockClass,
    blockSelector,
    unblockSelector,
    maskAllText,
    maskTextClass,
    unmaskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    skipChild: false,
    inlineStylesheet,
    maskInputOptions,
    maskAttributeFn,
    maskTextFn,
    maskInputFn,
    slimDOMOptions,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    preserveWhiteSpace,
    onSerialize,
    onIframeLoad,
    iframeLoadTimeout,
    onStylesheetLoad,
    stylesheetLoadTimeout,
    keepIframeSrcFn,
    newlyAddedElement: false
  });
}
function _optionalChain$4(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
function on(type, fn, target = document) {
  const options = { capture: true, passive: true };
  target.addEventListener(type, fn, options);
  return () => target.removeEventListener(type, fn, options);
}
var DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
var _mirror = {
  map: {},
  getId() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return -1;
  },
  getNode() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return null;
  },
  removeNodeFromMap() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  },
  has() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return false;
  },
  reset() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
  _mirror = new Proxy(_mirror, {
    get(target, prop, receiver) {
      if (prop === "map") {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function throttle$1(func, wait, options = {}) {
  let timeout = null;
  let previous = 0;
  return function(...args) {
    const now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    const context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}
function hookSetter(target, key, d, isRevoked, win = window) {
  const original = win.Object.getOwnPropertyDescriptor(target, key);
  win.Object.defineProperty(target, key, isRevoked ? d : {
    set(value) {
      setTimeout(() => {
        d.set.call(this, value);
      }, 0);
      if (original && original.set) {
        original.set.call(this, value);
      }
    }
  });
  return () => hookSetter(target, key, original || {}, true);
}
function patch(source, name, replacement) {
  try {
    if (!(name in source)) {
      return () => {
      };
    }
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return () => {
      source[name] = original;
    };
  } catch (e2) {
    return () => {
    };
  }
}
var nowTimestamp = Date.now;
if (!/[1-9][0-9]{12}/.test(Date.now().toString())) {
  nowTimestamp = () => (/* @__PURE__ */ new Date()).getTime();
}
function getWindowScroll(win) {
  const doc2 = win.document;
  return {
    left: doc2.scrollingElement ? doc2.scrollingElement.scrollLeft : win.pageXOffset !== void 0 ? win.pageXOffset : _optionalChain$4([doc2, "optionalAccess", (_) => _.documentElement, "access", (_2) => _2.scrollLeft]) || _optionalChain$4([doc2, "optionalAccess", (_3) => _3.body, "optionalAccess", (_4) => _4.parentElement, "optionalAccess", (_5) => _5.scrollLeft]) || _optionalChain$4([doc2, "optionalAccess", (_6) => _6.body, "optionalAccess", (_7) => _7.scrollLeft]) || 0,
    top: doc2.scrollingElement ? doc2.scrollingElement.scrollTop : win.pageYOffset !== void 0 ? win.pageYOffset : _optionalChain$4([doc2, "optionalAccess", (_8) => _8.documentElement, "access", (_9) => _9.scrollTop]) || _optionalChain$4([doc2, "optionalAccess", (_10) => _10.body, "optionalAccess", (_11) => _11.parentElement, "optionalAccess", (_12) => _12.scrollTop]) || _optionalChain$4([doc2, "optionalAccess", (_13) => _13.body, "optionalAccess", (_14) => _14.scrollTop]) || 0
  };
}
function getWindowHeight() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function getWindowWidth() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function isBlocked(node2, blockClass, blockSelector, unblockSelector, checkAncestors) {
  if (!node2) {
    return false;
  }
  const el = node2.nodeType === node2.ELEMENT_NODE ? node2 : node2.parentElement;
  if (!el)
    return false;
  const blockedPredicate = createMatchPredicate(blockClass, blockSelector);
  if (!checkAncestors) {
    const isUnblocked = unblockSelector && el.matches(unblockSelector);
    return blockedPredicate(el) && !isUnblocked;
  }
  const blockDistance = distanceToMatch(el, blockedPredicate);
  let unblockDistance = -1;
  if (blockDistance < 0) {
    return false;
  }
  if (unblockSelector) {
    unblockDistance = distanceToMatch(el, createMatchPredicate(null, unblockSelector));
  }
  if (blockDistance > -1 && unblockDistance < 0) {
    return true;
  }
  return blockDistance < unblockDistance;
}
function isSerialized(n, mirror2) {
  return mirror2.getId(n) !== -1;
}
function isIgnored(n, mirror2) {
  return mirror2.getId(n) === IGNORED_NODE;
}
function isAncestorRemoved(target, mirror2) {
  if (isShadowRoot(target)) {
    return false;
  }
  const id = mirror2.getId(target);
  if (!mirror2.has(id)) {
    return true;
  }
  if (target.parentNode && target.parentNode.nodeType === target.DOCUMENT_NODE) {
    return false;
  }
  if (!target.parentNode) {
    return true;
  }
  return isAncestorRemoved(target.parentNode, mirror2);
}
function legacy_isTouchEvent(event) {
  return Boolean(event.changedTouches);
}
function polyfill(win = window) {
  if ("NodeList" in win && !win.NodeList.prototype.forEach) {
    win.NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if ("DOMTokenList" in win && !win.DOMTokenList.prototype.forEach) {
    win.DOMTokenList.prototype.forEach = Array.prototype.forEach;
  }
  if (!Node.prototype.contains) {
    Node.prototype.contains = (...args) => {
      let node2 = args[0];
      if (!(0 in args)) {
        throw new TypeError("1 argument is required");
      }
      do {
        if (this === node2) {
          return true;
        }
      } while (node2 = node2 && node2.parentNode);
      return false;
    };
  }
}
function isSerializedIframe(n, mirror2) {
  return Boolean(n.nodeName === "IFRAME" && mirror2.getMeta(n));
}
function isSerializedStylesheet(n, mirror2) {
  return Boolean(n.nodeName === "LINK" && n.nodeType === n.ELEMENT_NODE && n.getAttribute && n.getAttribute("rel") === "stylesheet" && mirror2.getMeta(n));
}
function hasShadowRoot(n) {
  return Boolean(_optionalChain$4([n, "optionalAccess", (_18) => _18.shadowRoot]));
}
var StyleSheetMirror = class {
  constructor() {
    this.id = 1;
    this.styleIDMap = /* @__PURE__ */ new WeakMap();
    this.idStyleMap = /* @__PURE__ */ new Map();
  }
  getId(stylesheet) {
    return _nullishCoalesce(this.styleIDMap.get(stylesheet), () => -1);
  }
  has(stylesheet) {
    return this.styleIDMap.has(stylesheet);
  }
  add(stylesheet, id) {
    if (this.has(stylesheet))
      return this.getId(stylesheet);
    let newId;
    if (id === void 0) {
      newId = this.id++;
    } else
      newId = id;
    this.styleIDMap.set(stylesheet, newId);
    this.idStyleMap.set(newId, stylesheet);
    return newId;
  }
  getStyle(id) {
    return this.idStyleMap.get(id) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap();
    this.idStyleMap = /* @__PURE__ */ new Map();
    this.id = 1;
  }
  generateId() {
    return this.id++;
  }
};
function getShadowHost(n) {
  let shadowHost = null;
  if (_optionalChain$4([n, "access", (_19) => _19.getRootNode, "optionalCall", (_20) => _20(), "optionalAccess", (_21) => _21.nodeType]) === Node.DOCUMENT_FRAGMENT_NODE && n.getRootNode().host)
    shadowHost = n.getRootNode().host;
  return shadowHost;
}
function getRootShadowHost(n) {
  let rootShadowHost = n;
  let shadowHost;
  while (shadowHost = getShadowHost(rootShadowHost))
    rootShadowHost = shadowHost;
  return rootShadowHost;
}
function shadowHostInDom(n) {
  const doc2 = n.ownerDocument;
  if (!doc2)
    return false;
  const shadowHost = getRootShadowHost(n);
  return doc2.contains(shadowHost);
}
function inDom(n) {
  const doc2 = n.ownerDocument;
  if (!doc2)
    return false;
  return doc2.contains(n) || shadowHostInDom(n);
}
var cachedRequestAnimationFrameImplementation;
function getRequestAnimationFrameImplementation() {
  if (cachedRequestAnimationFrameImplementation) {
    return cachedRequestAnimationFrameImplementation;
  }
  const document2 = window.document;
  let requestAnimationFrameImplementation = window.requestAnimationFrame;
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow.requestAnimationFrame) {
        requestAnimationFrameImplementation = contentWindow.requestAnimationFrame;
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
    }
  }
  return cachedRequestAnimationFrameImplementation = requestAnimationFrameImplementation.bind(window);
}
function onRequestAnimationFrame(...rest) {
  return getRequestAnimationFrameImplementation()(...rest);
}
var EventType = ((EventType2) => {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
  return EventType2;
})(EventType || {});
var IncrementalSource = ((IncrementalSource2) => {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
  IncrementalSource2[IncrementalSource2["Selection"] = 14] = "Selection";
  IncrementalSource2[IncrementalSource2["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
  IncrementalSource2[IncrementalSource2["CustomElement"] = 16] = "CustomElement";
  return IncrementalSource2;
})(IncrementalSource || {});
var MouseInteractions = ((MouseInteractions2) => {
  MouseInteractions2[MouseInteractions2["MouseUp"] = 0] = "MouseUp";
  MouseInteractions2[MouseInteractions2["MouseDown"] = 1] = "MouseDown";
  MouseInteractions2[MouseInteractions2["Click"] = 2] = "Click";
  MouseInteractions2[MouseInteractions2["ContextMenu"] = 3] = "ContextMenu";
  MouseInteractions2[MouseInteractions2["DblClick"] = 4] = "DblClick";
  MouseInteractions2[MouseInteractions2["Focus"] = 5] = "Focus";
  MouseInteractions2[MouseInteractions2["Blur"] = 6] = "Blur";
  MouseInteractions2[MouseInteractions2["TouchStart"] = 7] = "TouchStart";
  MouseInteractions2[MouseInteractions2["TouchMove_Departed"] = 8] = "TouchMove_Departed";
  MouseInteractions2[MouseInteractions2["TouchEnd"] = 9] = "TouchEnd";
  MouseInteractions2[MouseInteractions2["TouchCancel"] = 10] = "TouchCancel";
  return MouseInteractions2;
})(MouseInteractions || {});
var PointerTypes = ((PointerTypes2) => {
  PointerTypes2[PointerTypes2["Mouse"] = 0] = "Mouse";
  PointerTypes2[PointerTypes2["Pen"] = 1] = "Pen";
  PointerTypes2[PointerTypes2["Touch"] = 2] = "Touch";
  return PointerTypes2;
})(PointerTypes || {});
function _optionalChain$3(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
function isNodeInLinkedList(n) {
  return "__ln" in n;
}
var DoubleLinkedList = class {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  get(position) {
    if (position >= this.length) {
      throw new Error("Position outside of list range");
    }
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = _optionalChain$3([current, "optionalAccess", (_) => _.next]) || null;
    }
    return current;
  }
  addNode(n) {
    const node2 = {
      value: n,
      previous: null,
      next: null
    };
    n.__ln = node2;
    if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
      const current = n.previousSibling.__ln.next;
      node2.next = current;
      node2.previous = n.previousSibling.__ln;
      n.previousSibling.__ln.next = node2;
      if (current) {
        current.previous = node2;
      }
    } else if (n.nextSibling && isNodeInLinkedList(n.nextSibling) && n.nextSibling.__ln.previous) {
      const current = n.nextSibling.__ln.previous;
      node2.previous = current;
      node2.next = n.nextSibling.__ln;
      n.nextSibling.__ln.previous = node2;
      if (current) {
        current.next = node2;
      }
    } else {
      if (this.head) {
        this.head.previous = node2;
      }
      node2.next = this.head;
      this.head = node2;
    }
    if (node2.next === null) {
      this.tail = node2;
    }
    this.length++;
  }
  removeNode(n) {
    const current = n.__ln;
    if (!this.head) {
      return;
    }
    if (!current.previous) {
      this.head = current.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
    } else {
      current.previous.next = current.next;
      if (current.next) {
        current.next.previous = current.previous;
      } else {
        this.tail = current.previous;
      }
    }
    if (n.__ln) {
      delete n.__ln;
    }
    this.length--;
  }
};
var moveKey = (id, parentId) => `${id}@${parentId}`;
var MutationBuffer = class {
  constructor() {
    this.frozen = false;
    this.locked = false;
    this.texts = [];
    this.attributes = [];
    this.removes = [];
    this.mapRemoves = [];
    this.movedMap = {};
    this.addedSet = /* @__PURE__ */ new Set();
    this.movedSet = /* @__PURE__ */ new Set();
    this.droppedSet = /* @__PURE__ */ new Set();
    this.processMutations = (mutations) => {
      mutations.forEach(this.processMutation);
      this.emit();
    };
    this.emit = () => {
      if (this.frozen || this.locked) {
        return;
      }
      const adds = [];
      const addedIds = /* @__PURE__ */ new Set();
      const addList = new DoubleLinkedList();
      const getNextId = (n) => {
        let ns = n;
        let nextId = IGNORED_NODE;
        while (nextId === IGNORED_NODE) {
          ns = ns && ns.nextSibling;
          nextId = ns && this.mirror.getId(ns);
        }
        return nextId;
      };
      const pushAdd = (n) => {
        if (!n.parentNode || !inDom(n)) {
          return;
        }
        const parentId = isShadowRoot(n.parentNode) ? this.mirror.getId(getShadowHost(n)) : this.mirror.getId(n.parentNode);
        const nextId = getNextId(n);
        if (parentId === -1 || nextId === -1) {
          return addList.addNode(n);
        }
        const sn = serializeNodeWithId(n, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskAllText: this.maskAllText,
          unblockSelector: this.unblockSelector,
          maskTextClass: this.maskTextClass,
          unmaskTextClass: this.unmaskTextClass,
          maskTextSelector: this.maskTextSelector,
          unmaskTextSelector: this.unmaskTextSelector,
          skipChild: true,
          newlyAddedElement: true,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskAttributeFn: this.maskAttributeFn,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (currentN) => {
            if (isSerializedIframe(currentN, this.mirror)) {
              this.iframeManager.addIframe(currentN);
            }
            if (isSerializedStylesheet(currentN, this.mirror)) {
              this.stylesheetManager.trackLinkElement(currentN);
            }
            if (hasShadowRoot(n)) {
              this.shadowDomManager.addShadowRoot(n.shadowRoot, this.doc);
            }
          },
          onIframeLoad: (iframe, childSn) => {
            this.iframeManager.attachIframe(iframe, childSn);
            this.shadowDomManager.observeAttachShadow(iframe);
          },
          onStylesheetLoad: (link, childSn) => {
            this.stylesheetManager.attachLinkElement(link, childSn);
          }
        });
        if (sn) {
          adds.push({
            parentId,
            nextId,
            node: sn
          });
          addedIds.add(sn.id);
        }
      };
      while (this.mapRemoves.length) {
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      }
      for (const n of this.movedSet) {
        if (isParentRemoved(this.removes, n, this.mirror) && !this.movedSet.has(n.parentNode)) {
          continue;
        }
        pushAdd(n);
      }
      for (const n of this.addedSet) {
        if (!isAncestorInSet(this.droppedSet, n) && !isParentRemoved(this.removes, n, this.mirror)) {
          pushAdd(n);
        } else if (isAncestorInSet(this.movedSet, n)) {
          pushAdd(n);
        } else {
          this.droppedSet.add(n);
        }
      }
      let candidate = null;
      while (addList.length) {
        let node2 = null;
        if (candidate) {
          const parentId = this.mirror.getId(candidate.value.parentNode);
          const nextId = getNextId(candidate.value);
          if (parentId !== -1 && nextId !== -1) {
            node2 = candidate;
          }
        }
        if (!node2) {
          let tailNode = addList.tail;
          while (tailNode) {
            const _node = tailNode;
            tailNode = tailNode.previous;
            if (_node) {
              const parentId = this.mirror.getId(_node.value.parentNode);
              const nextId = getNextId(_node.value);
              if (nextId === -1)
                continue;
              else if (parentId !== -1) {
                node2 = _node;
                break;
              } else {
                const unhandledNode = _node.value;
                if (unhandledNode.parentNode && unhandledNode.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const shadowHost = unhandledNode.parentNode.host;
                  const parentId2 = this.mirror.getId(shadowHost);
                  if (parentId2 !== -1) {
                    node2 = _node;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!node2) {
          while (addList.head) {
            addList.removeNode(addList.head.value);
          }
          break;
        }
        candidate = node2.previous;
        addList.removeNode(node2.value);
        pushAdd(node2.value);
      }
      const payload = {
        texts: this.texts.map((text) => ({
          id: this.mirror.getId(text.node),
          value: text.value
        })).filter((text) => !addedIds.has(text.id)).filter((text) => this.mirror.has(text.id)),
        attributes: this.attributes.map((attribute) => {
          const { attributes } = attribute;
          if (typeof attributes.style === "string") {
            const diffAsStr = JSON.stringify(attribute.styleDiff);
            const unchangedAsStr = JSON.stringify(attribute._unchangedStyles);
            if (diffAsStr.length < attributes.style.length) {
              if ((diffAsStr + unchangedAsStr).split("var(").length === attributes.style.split("var(").length) {
                attributes.style = attribute.styleDiff;
              }
            }
          }
          return {
            id: this.mirror.getId(attribute.node),
            attributes
          };
        }).filter((attribute) => !addedIds.has(attribute.id)).filter((attribute) => this.mirror.has(attribute.id)),
        removes: this.removes,
        adds
      };
      if (!payload.texts.length && !payload.attributes.length && !payload.removes.length && !payload.adds.length) {
        return;
      }
      this.texts = [];
      this.attributes = [];
      this.removes = [];
      this.addedSet = /* @__PURE__ */ new Set();
      this.movedSet = /* @__PURE__ */ new Set();
      this.droppedSet = /* @__PURE__ */ new Set();
      this.movedMap = {};
      this.mutationCb(payload);
    };
    this.processMutation = (m) => {
      if (isIgnored(m.target, this.mirror)) {
        return;
      }
      let unattachedDoc;
      try {
        unattachedDoc = document.implementation.createHTMLDocument();
      } catch (e2) {
        unattachedDoc = this.doc;
      }
      switch (m.type) {
        case "characterData": {
          const value = m.target.textContent;
          if (!isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector, false) && value !== m.oldValue) {
            this.texts.push({
              value: needMaskingText(m.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, this.maskAllText) && value ? this.maskTextFn ? this.maskTextFn(value) : value.replace(/[\S]/g, "*") : value,
              node: m.target
            });
          }
          break;
        }
        case "attributes": {
          const target = m.target;
          let attributeName = m.attributeName;
          let value = m.target.getAttribute(attributeName);
          if (attributeName === "value") {
            const type = getInputType(target);
            const tagName = target.tagName;
            value = getInputValue(target, tagName, type);
            const isInputMasked = shouldMaskInput({
              maskInputOptions: this.maskInputOptions,
              tagName,
              type
            });
            const forceMask = needMaskingText(m.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, isInputMasked);
            value = maskInputValue({
              isMasked: forceMask,
              element: target,
              value,
              maskInputFn: this.maskInputFn
            });
          }
          if (isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector, false) || value === m.oldValue) {
            return;
          }
          let item = this.attributes.find((a) => a.node === m.target);
          if (target.tagName === "IFRAME" && attributeName === "src" && !this.keepIframeSrcFn(value)) {
            if (!target.contentDocument) {
              attributeName = "rr_src";
            } else {
              return;
            }
          }
          if (!item) {
            item = {
              node: m.target,
              attributes: {},
              styleDiff: {},
              _unchangedStyles: {}
            };
            this.attributes.push(item);
          }
          if (attributeName === "type" && target.tagName === "INPUT" && (m.oldValue || "").toLowerCase() === "password") {
            target.setAttribute("data-rr-is-password", "true");
          }
          if (!ignoreAttribute(target.tagName, attributeName)) {
            item.attributes[attributeName] = transformAttribute(this.doc, toLowerCase(target.tagName), toLowerCase(attributeName), value, target, this.maskAttributeFn);
            if (attributeName === "style") {
              const old = unattachedDoc.createElement("span");
              if (m.oldValue) {
                old.setAttribute("style", m.oldValue);
              }
              for (const pname of Array.from(target.style)) {
                const newValue = target.style.getPropertyValue(pname);
                const newPriority = target.style.getPropertyPriority(pname);
                if (newValue !== old.style.getPropertyValue(pname) || newPriority !== old.style.getPropertyPriority(pname)) {
                  if (newPriority === "") {
                    item.styleDiff[pname] = newValue;
                  } else {
                    item.styleDiff[pname] = [newValue, newPriority];
                  }
                } else {
                  item._unchangedStyles[pname] = [newValue, newPriority];
                }
              }
              for (const pname of Array.from(old.style)) {
                if (target.style.getPropertyValue(pname) === "") {
                  item.styleDiff[pname] = false;
                }
              }
            }
          }
          break;
        }
        case "childList": {
          if (isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector, true)) {
            return;
          }
          m.addedNodes.forEach((n) => this.genAdds(n, m.target));
          m.removedNodes.forEach((n) => {
            const nodeId = this.mirror.getId(n);
            const parentId = isShadowRoot(m.target) ? this.mirror.getId(m.target.host) : this.mirror.getId(m.target);
            if (isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector, false) || isIgnored(n, this.mirror) || !isSerialized(n, this.mirror)) {
              return;
            }
            if (this.addedSet.has(n)) {
              deepDelete(this.addedSet, n);
              this.droppedSet.add(n);
            } else if (this.addedSet.has(m.target) && nodeId === -1)
              ;
            else if (isAncestorRemoved(m.target, this.mirror))
              ;
            else if (this.movedSet.has(n) && this.movedMap[moveKey(nodeId, parentId)]) {
              deepDelete(this.movedSet, n);
            } else {
              this.removes.push({
                parentId,
                id: nodeId,
                isShadow: isShadowRoot(m.target) && isNativeShadowDom(m.target) ? true : void 0
              });
            }
            this.mapRemoves.push(n);
          });
          break;
        }
      }
    };
    this.genAdds = (n, target) => {
      if (this.processedNodeManager.inOtherBuffer(n, this))
        return;
      if (this.addedSet.has(n) || this.movedSet.has(n))
        return;
      if (this.mirror.hasNode(n)) {
        if (isIgnored(n, this.mirror)) {
          return;
        }
        this.movedSet.add(n);
        let targetId = null;
        if (target && this.mirror.hasNode(target)) {
          targetId = this.mirror.getId(target);
        }
        if (targetId && targetId !== -1) {
          this.movedMap[moveKey(this.mirror.getId(n), targetId)] = true;
        }
      } else {
        this.addedSet.add(n);
        this.droppedSet.delete(n);
      }
      if (!isBlocked(n, this.blockClass, this.blockSelector, this.unblockSelector, false)) {
        n.childNodes.forEach((childN) => this.genAdds(childN));
        if (hasShadowRoot(n)) {
          n.shadowRoot.childNodes.forEach((childN) => {
            this.processedNodeManager.add(childN, this);
            this.genAdds(childN, n);
          });
        }
      }
    };
  }
  init(options) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "unblockSelector",
      "maskAllText",
      "maskTextClass",
      "unmaskTextClass",
      "maskTextSelector",
      "unmaskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskAttributeFn",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach((key) => {
      this[key] = options[key];
    });
  }
  freeze() {
    this.frozen = true;
    this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = false;
    this.canvasManager.unfreeze();
    this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = true;
    this.canvasManager.lock();
  }
  unlock() {
    this.locked = false;
    this.canvasManager.unlock();
    this.emit();
  }
  reset() {
    this.shadowDomManager.reset();
    this.canvasManager.reset();
  }
};
function deepDelete(addsSet, n) {
  addsSet.delete(n);
  n.childNodes.forEach((childN) => deepDelete(addsSet, childN));
}
function isParentRemoved(removes, n, mirror2) {
  if (removes.length === 0)
    return false;
  return _isParentRemoved(removes, n, mirror2);
}
function _isParentRemoved(removes, n, mirror2) {
  const { parentNode } = n;
  if (!parentNode) {
    return false;
  }
  const parentId = mirror2.getId(parentNode);
  if (removes.some((r3) => r3.id === parentId)) {
    return true;
  }
  return _isParentRemoved(removes, parentNode, mirror2);
}
function isAncestorInSet(set2, n) {
  if (set2.size === 0)
    return false;
  return _isAncestorInSet(set2, n);
}
function _isAncestorInSet(set2, n) {
  const { parentNode } = n;
  if (!parentNode) {
    return false;
  }
  if (set2.has(parentNode)) {
    return true;
  }
  return _isAncestorInSet(set2, parentNode);
}
var errorHandler;
function registerErrorHandler(handler) {
  errorHandler = handler;
}
function unregisterErrorHandler() {
  errorHandler = void 0;
}
var callbackWrapper = (cb) => {
  if (!errorHandler) {
    return cb;
  }
  const rrwebWrapped = (...rest) => {
    try {
      return cb(...rest);
    } catch (error) {
      if (errorHandler && errorHandler(error) === true) {
        return () => {
        };
      }
      throw error;
    }
  };
  return rrwebWrapped;
};
function _optionalChain$2(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
var mutationBuffers = [];
function getEventTarget2(event) {
  try {
    if ("composedPath" in event) {
      const path = event.composedPath();
      if (path.length) {
        return path[0];
      }
    } else if ("path" in event && event.path.length) {
      return event.path[0];
    }
  } catch (e2) {
  }
  return event && event.target;
}
function initMutationObserver(options, rootEl) {
  const mutationBuffer = new MutationBuffer();
  mutationBuffers.push(mutationBuffer);
  mutationBuffer.init(options);
  let mutationObserverCtor = window.MutationObserver || window.__rrMutationObserver;
  const angularZoneSymbol = _optionalChain$2([window, "optionalAccess", (_) => _.Zone, "optionalAccess", (_2) => _2.__symbol__, "optionalCall", (_3) => _3("MutationObserver")]);
  if (angularZoneSymbol && window[angularZoneSymbol]) {
    mutationObserverCtor = window[angularZoneSymbol];
  }
  const observer = new mutationObserverCtor(callbackWrapper((mutations) => {
    if (options.onMutation && options.onMutation(mutations) === false) {
      return;
    }
    mutationBuffer.processMutations.bind(mutationBuffer)(mutations);
  }));
  observer.observe(rootEl, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  });
  return observer;
}
function initMoveObserver({ mousemoveCb, sampling, doc: doc2, mirror: mirror2 }) {
  if (sampling.mousemove === false) {
    return () => {
    };
  }
  const threshold = typeof sampling.mousemove === "number" ? sampling.mousemove : 50;
  const callbackThreshold = typeof sampling.mousemoveCallback === "number" ? sampling.mousemoveCallback : 500;
  let positions = [];
  let timeBaseline;
  const wrappedCb = throttle$1(callbackWrapper((source) => {
    const totalOffset = Date.now() - timeBaseline;
    mousemoveCb(positions.map((p) => {
      p.timeOffset -= totalOffset;
      return p;
    }), source);
    positions = [];
    timeBaseline = null;
  }), callbackThreshold);
  const updatePosition = callbackWrapper(throttle$1(callbackWrapper((evt) => {
    const target = getEventTarget2(evt);
    const { clientX, clientY } = legacy_isTouchEvent(evt) ? evt.changedTouches[0] : evt;
    if (!timeBaseline) {
      timeBaseline = nowTimestamp();
    }
    positions.push({
      x: clientX,
      y: clientY,
      id: mirror2.getId(target),
      timeOffset: nowTimestamp() - timeBaseline
    });
    wrappedCb(typeof DragEvent !== "undefined" && evt instanceof DragEvent ? IncrementalSource.Drag : evt instanceof MouseEvent ? IncrementalSource.MouseMove : IncrementalSource.TouchMove);
  }), threshold, {
    trailing: false
  }));
  const handlers4 = [
    on("mousemove", updatePosition, doc2),
    on("touchmove", updatePosition, doc2),
    on("drag", updatePosition, doc2)
  ];
  return callbackWrapper(() => {
    handlers4.forEach((h) => h());
  });
}
function initMouseInteractionObserver({ mouseInteractionCb, doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, sampling }) {
  if (sampling.mouseInteraction === false) {
    return () => {
    };
  }
  const disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === void 0 ? {} : sampling.mouseInteraction;
  const handlers4 = [];
  let currentPointerType = null;
  const getHandler = (eventKey) => {
    return (event) => {
      const target = getEventTarget2(event);
      if (isBlocked(target, blockClass, blockSelector, unblockSelector, true)) {
        return;
      }
      let pointerType = null;
      let thisEventKey = eventKey;
      if ("pointerType" in event) {
        switch (event.pointerType) {
          case "mouse":
            pointerType = PointerTypes.Mouse;
            break;
          case "touch":
            pointerType = PointerTypes.Touch;
            break;
          case "pen":
            pointerType = PointerTypes.Pen;
            break;
        }
        if (pointerType === PointerTypes.Touch) {
          if (MouseInteractions[eventKey] === MouseInteractions.MouseDown) {
            thisEventKey = "TouchStart";
          } else if (MouseInteractions[eventKey] === MouseInteractions.MouseUp) {
            thisEventKey = "TouchEnd";
          }
        } else if (pointerType === PointerTypes.Pen)
          ;
      } else if (legacy_isTouchEvent(event)) {
        pointerType = PointerTypes.Touch;
      }
      if (pointerType !== null) {
        currentPointerType = pointerType;
        if (thisEventKey.startsWith("Touch") && pointerType === PointerTypes.Touch || thisEventKey.startsWith("Mouse") && pointerType === PointerTypes.Mouse) {
          pointerType = null;
        }
      } else if (MouseInteractions[eventKey] === MouseInteractions.Click) {
        pointerType = currentPointerType;
        currentPointerType = null;
      }
      const e2 = legacy_isTouchEvent(event) ? event.changedTouches[0] : event;
      if (!e2) {
        return;
      }
      const id = mirror2.getId(target);
      const { clientX, clientY } = e2;
      callbackWrapper(mouseInteractionCb)({
        type: MouseInteractions[thisEventKey],
        id,
        x: clientX,
        y: clientY,
        ...pointerType !== null && { pointerType }
      });
    };
  };
  Object.keys(MouseInteractions).filter((key) => Number.isNaN(Number(key)) && !key.endsWith("_Departed") && disableMap[key] !== false).forEach((eventKey) => {
    let eventName = toLowerCase(eventKey);
    const handler = getHandler(eventKey);
    if (window.PointerEvent) {
      switch (MouseInteractions[eventKey]) {
        case MouseInteractions.MouseDown:
        case MouseInteractions.MouseUp:
          eventName = eventName.replace("mouse", "pointer");
          break;
        case MouseInteractions.TouchStart:
        case MouseInteractions.TouchEnd:
          return;
      }
    }
    handlers4.push(on(eventName, handler, doc2));
  });
  return callbackWrapper(() => {
    handlers4.forEach((h) => h());
  });
}
function initScrollObserver({ scrollCb, doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, sampling }) {
  const updatePosition = callbackWrapper(throttle$1(callbackWrapper((evt) => {
    const target = getEventTarget2(evt);
    if (!target || isBlocked(target, blockClass, blockSelector, unblockSelector, true)) {
      return;
    }
    const id = mirror2.getId(target);
    if (target === doc2 && doc2.defaultView) {
      const scrollLeftTop = getWindowScroll(doc2.defaultView);
      scrollCb({
        id,
        x: scrollLeftTop.left,
        y: scrollLeftTop.top
      });
    } else {
      scrollCb({
        id,
        x: target.scrollLeft,
        y: target.scrollTop
      });
    }
  }), sampling.scroll || 100));
  return on("scroll", updatePosition, doc2);
}
function initViewportResizeObserver({ viewportResizeCb }, { win }) {
  let lastH = -1;
  let lastW = -1;
  const updateDimension = callbackWrapper(throttle$1(callbackWrapper(() => {
    const height = getWindowHeight();
    const width = getWindowWidth();
    if (lastH !== height || lastW !== width) {
      viewportResizeCb({
        width: Number(width),
        height: Number(height)
      });
      lastH = height;
      lastW = width;
    }
  }), 200));
  return on("resize", updateDimension, win);
}
var INPUT_TAGS = ["INPUT", "TEXTAREA", "SELECT"];
var lastInputValueMap = /* @__PURE__ */ new WeakMap();
function initInputObserver({ inputCb, doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, ignoreClass, ignoreSelector, maskInputOptions, maskInputFn, sampling, userTriggeredOnInput, maskTextClass, unmaskTextClass, maskTextSelector, unmaskTextSelector }) {
  function eventHandler(event) {
    let target = getEventTarget2(event);
    const userTriggered = event.isTrusted;
    const tagName = target && toUpperCase(target.tagName);
    if (tagName === "OPTION")
      target = target.parentElement;
    if (!target || !tagName || INPUT_TAGS.indexOf(tagName) < 0 || isBlocked(target, blockClass, blockSelector, unblockSelector, true)) {
      return;
    }
    const el = target;
    if (el.classList.contains(ignoreClass) || ignoreSelector && el.matches(ignoreSelector)) {
      return;
    }
    const type = getInputType(target);
    let text = getInputValue(el, tagName, type);
    let isChecked = false;
    const isInputMasked = shouldMaskInput({
      maskInputOptions,
      tagName,
      type
    });
    const forceMask = needMaskingText(target, maskTextClass, maskTextSelector, unmaskTextClass, unmaskTextSelector, isInputMasked);
    if (type === "radio" || type === "checkbox") {
      isChecked = target.checked;
    }
    text = maskInputValue({
      isMasked: forceMask,
      element: target,
      value: text,
      maskInputFn
    });
    cbWithDedup(target, userTriggeredOnInput ? { text, isChecked, userTriggered } : { text, isChecked });
    const name = target.name;
    if (type === "radio" && name && isChecked) {
      doc2.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach((el2) => {
        if (el2 !== target) {
          const text2 = maskInputValue({
            isMasked: forceMask,
            element: el2,
            value: getInputValue(el2, tagName, type),
            maskInputFn
          });
          cbWithDedup(el2, userTriggeredOnInput ? { text: text2, isChecked: !isChecked, userTriggered: false } : { text: text2, isChecked: !isChecked });
        }
      });
    }
  }
  function cbWithDedup(target, v) {
    const lastInputValue = lastInputValueMap.get(target);
    if (!lastInputValue || lastInputValue.text !== v.text || lastInputValue.isChecked !== v.isChecked) {
      lastInputValueMap.set(target, v);
      const id = mirror2.getId(target);
      callbackWrapper(inputCb)({
        ...v,
        id
      });
    }
  }
  const events = sampling.input === "last" ? ["change"] : ["input", "change"];
  const handlers4 = events.map((eventName) => on(eventName, callbackWrapper(eventHandler), doc2));
  const currentWindow = doc2.defaultView;
  if (!currentWindow) {
    return () => {
      handlers4.forEach((h) => h());
    };
  }
  const propertyDescriptor = currentWindow.Object.getOwnPropertyDescriptor(currentWindow.HTMLInputElement.prototype, "value");
  const hookProperties = [
    [currentWindow.HTMLInputElement.prototype, "value"],
    [currentWindow.HTMLInputElement.prototype, "checked"],
    [currentWindow.HTMLSelectElement.prototype, "value"],
    [currentWindow.HTMLTextAreaElement.prototype, "value"],
    [currentWindow.HTMLSelectElement.prototype, "selectedIndex"],
    [currentWindow.HTMLOptionElement.prototype, "selected"]
  ];
  if (propertyDescriptor && propertyDescriptor.set) {
    handlers4.push(...hookProperties.map((p) => hookSetter(p[0], p[1], {
      set() {
        callbackWrapper(eventHandler)({
          target: this,
          isTrusted: false
        });
      }
    }, false, currentWindow)));
  }
  return callbackWrapper(() => {
    handlers4.forEach((h) => h());
  });
}
function getNestedCSSRulePositions(rule) {
  const positions = [];
  function recurse(childRule, pos) {
    if (hasNestedCSSRule("CSSGroupingRule") && childRule.parentRule instanceof CSSGroupingRule || hasNestedCSSRule("CSSMediaRule") && childRule.parentRule instanceof CSSMediaRule || hasNestedCSSRule("CSSSupportsRule") && childRule.parentRule instanceof CSSSupportsRule || hasNestedCSSRule("CSSConditionRule") && childRule.parentRule instanceof CSSConditionRule) {
      const rules = Array.from(childRule.parentRule.cssRules);
      const index = rules.indexOf(childRule);
      pos.unshift(index);
    } else if (childRule.parentStyleSheet) {
      const rules = Array.from(childRule.parentStyleSheet.cssRules);
      const index = rules.indexOf(childRule);
      pos.unshift(index);
    }
    return pos;
  }
  return recurse(rule, positions);
}
function getIdAndStyleId(sheet, mirror2, styleMirror) {
  let id, styleId;
  if (!sheet)
    return {};
  if (sheet.ownerNode)
    id = mirror2.getId(sheet.ownerNode);
  else
    styleId = styleMirror.getId(sheet);
  return {
    styleId,
    id
  };
}
function initStyleSheetObserver({ styleSheetRuleCb, mirror: mirror2, stylesheetManager }, { win }) {
  if (!win.CSSStyleSheet || !win.CSSStyleSheet.prototype) {
    return () => {
    };
  }
  const insertRule = win.CSSStyleSheet.prototype.insertRule;
  win.CSSStyleSheet.prototype.insertRule = new Proxy(insertRule, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [rule, index] = argumentsList;
      const { id, styleId } = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror);
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleSheetRuleCb({
          id,
          styleId,
          adds: [{ rule, index }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  const deleteRule = win.CSSStyleSheet.prototype.deleteRule;
  win.CSSStyleSheet.prototype.deleteRule = new Proxy(deleteRule, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [index] = argumentsList;
      const { id, styleId } = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror);
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleSheetRuleCb({
          id,
          styleId,
          removes: [{ index }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  let replace;
  if (win.CSSStyleSheet.prototype.replace) {
    replace = win.CSSStyleSheet.prototype.replace;
    win.CSSStyleSheet.prototype.replace = new Proxy(replace, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [text] = argumentsList;
        const { id, styleId } = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror);
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            replace: text
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  }
  let replaceSync;
  if (win.CSSStyleSheet.prototype.replaceSync) {
    replaceSync = win.CSSStyleSheet.prototype.replaceSync;
    win.CSSStyleSheet.prototype.replaceSync = new Proxy(replaceSync, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [text] = argumentsList;
        const { id, styleId } = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror);
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            replaceSync: text
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  }
  const supportedNestedCSSRuleTypes = {};
  if (canMonkeyPatchNestedCSSRule("CSSGroupingRule")) {
    supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
  } else {
    if (canMonkeyPatchNestedCSSRule("CSSMediaRule")) {
      supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSConditionRule")) {
      supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSSupportsRule")) {
      supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
    }
  }
  const unmodifiedFunctions = {};
  Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
    unmodifiedFunctions[typeKey] = {
      insertRule: type.prototype.insertRule,
      deleteRule: type.prototype.deleteRule
    };
    type.prototype.insertRule = new Proxy(unmodifiedFunctions[typeKey].insertRule, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [rule, index] = argumentsList;
        const { id, styleId } = getIdAndStyleId(thisArg.parentStyleSheet, mirror2, stylesheetManager.styleMirror);
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            adds: [
              {
                rule,
                index: [
                  ...getNestedCSSRulePositions(thisArg),
                  index || 0
                ]
              }
            ]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
    type.prototype.deleteRule = new Proxy(unmodifiedFunctions[typeKey].deleteRule, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [index] = argumentsList;
        const { id, styleId } = getIdAndStyleId(thisArg.parentStyleSheet, mirror2, stylesheetManager.styleMirror);
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id,
            styleId,
            removes: [
              { index: [...getNestedCSSRulePositions(thisArg), index] }
            ]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  });
  return callbackWrapper(() => {
    win.CSSStyleSheet.prototype.insertRule = insertRule;
    win.CSSStyleSheet.prototype.deleteRule = deleteRule;
    replace && (win.CSSStyleSheet.prototype.replace = replace);
    replaceSync && (win.CSSStyleSheet.prototype.replaceSync = replaceSync);
    Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
      type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
      type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
    });
  });
}
function initAdoptedStyleSheetObserver({ mirror: mirror2, stylesheetManager }, host) {
  let hostId = null;
  if (host.nodeName === "#document")
    hostId = mirror2.getId(host);
  else
    hostId = mirror2.getId(host.host);
  const patchTarget = host.nodeName === "#document" ? _optionalChain$2([host, "access", (_4) => _4.defaultView, "optionalAccess", (_5) => _5.Document]) : _optionalChain$2([host, "access", (_6) => _6.ownerDocument, "optionalAccess", (_7) => _7.defaultView, "optionalAccess", (_8) => _8.ShadowRoot]);
  const originalPropertyDescriptor = _optionalChain$2([patchTarget, "optionalAccess", (_9) => _9.prototype]) ? Object.getOwnPropertyDescriptor(_optionalChain$2([patchTarget, "optionalAccess", (_10) => _10.prototype]), "adoptedStyleSheets") : void 0;
  if (hostId === null || hostId === -1 || !patchTarget || !originalPropertyDescriptor)
    return () => {
    };
  Object.defineProperty(host, "adoptedStyleSheets", {
    configurable: originalPropertyDescriptor.configurable,
    enumerable: originalPropertyDescriptor.enumerable,
    get() {
      return _optionalChain$2([originalPropertyDescriptor, "access", (_11) => _11.get, "optionalAccess", (_12) => _12.call, "call", (_13) => _13(this)]);
    },
    set(sheets) {
      const result = _optionalChain$2([originalPropertyDescriptor, "access", (_14) => _14.set, "optionalAccess", (_15) => _15.call, "call", (_16) => _16(this, sheets)]);
      if (hostId !== null && hostId !== -1) {
        try {
          stylesheetManager.adoptStyleSheets(sheets, hostId);
        } catch (e2) {
        }
      }
      return result;
    }
  });
  return callbackWrapper(() => {
    Object.defineProperty(host, "adoptedStyleSheets", {
      configurable: originalPropertyDescriptor.configurable,
      enumerable: originalPropertyDescriptor.enumerable,
      get: originalPropertyDescriptor.get,
      set: originalPropertyDescriptor.set
    });
  });
}
function initStyleDeclarationObserver({ styleDeclarationCb, mirror: mirror2, ignoreCSSAttributes, stylesheetManager }, { win }) {
  const setProperty = win.CSSStyleDeclaration.prototype.setProperty;
  win.CSSStyleDeclaration.prototype.setProperty = new Proxy(setProperty, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [property, value, priority] = argumentsList;
      if (ignoreCSSAttributes.has(property)) {
        return setProperty.apply(thisArg, [property, value, priority]);
      }
      const { id, styleId } = getIdAndStyleId(_optionalChain$2([thisArg, "access", (_17) => _17.parentRule, "optionalAccess", (_18) => _18.parentStyleSheet]), mirror2, stylesheetManager.styleMirror);
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleDeclarationCb({
          id,
          styleId,
          set: {
            property,
            value,
            priority
          },
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  const removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
  win.CSSStyleDeclaration.prototype.removeProperty = new Proxy(removeProperty, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [property] = argumentsList;
      if (ignoreCSSAttributes.has(property)) {
        return removeProperty.apply(thisArg, [property]);
      }
      const { id, styleId } = getIdAndStyleId(_optionalChain$2([thisArg, "access", (_19) => _19.parentRule, "optionalAccess", (_20) => _20.parentStyleSheet]), mirror2, stylesheetManager.styleMirror);
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleDeclarationCb({
          id,
          styleId,
          remove: {
            property
          },
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  return callbackWrapper(() => {
    win.CSSStyleDeclaration.prototype.setProperty = setProperty;
    win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
  });
}
function initMediaInteractionObserver({ mediaInteractionCb, blockClass, blockSelector, unblockSelector, mirror: mirror2, sampling, doc: doc2 }) {
  const handler = callbackWrapper((type) => throttle$1(callbackWrapper((event) => {
    const target = getEventTarget2(event);
    if (!target || isBlocked(target, blockClass, blockSelector, unblockSelector, true)) {
      return;
    }
    const { currentTime, volume, muted, playbackRate } = target;
    mediaInteractionCb({
      type,
      id: mirror2.getId(target),
      currentTime,
      volume,
      muted,
      playbackRate
    });
  }), sampling.media || 500));
  const handlers4 = [
    on("play", handler(0), doc2),
    on("pause", handler(1), doc2),
    on("seeked", handler(2), doc2),
    on("volumechange", handler(3), doc2),
    on("ratechange", handler(4), doc2)
  ];
  return callbackWrapper(() => {
    handlers4.forEach((h) => h());
  });
}
function initFontObserver({ fontCb, doc: doc2 }) {
  const win = doc2.defaultView;
  if (!win) {
    return () => {
    };
  }
  const handlers4 = [];
  const fontMap = /* @__PURE__ */ new WeakMap();
  const originalFontFace = win.FontFace;
  win.FontFace = function FontFace(family, source, descriptors) {
    const fontFace = new originalFontFace(family, source, descriptors);
    fontMap.set(fontFace, {
      family,
      buffer: typeof source !== "string",
      descriptors,
      fontSource: typeof source === "string" ? source : JSON.stringify(Array.from(new Uint8Array(source)))
    });
    return fontFace;
  };
  const restoreHandler = patch(doc2.fonts, "add", function(original) {
    return function(fontFace) {
      setTimeout(callbackWrapper(() => {
        const p = fontMap.get(fontFace);
        if (p) {
          fontCb(p);
          fontMap.delete(fontFace);
        }
      }), 0);
      return original.apply(this, [fontFace]);
    };
  });
  handlers4.push(() => {
    win.FontFace = originalFontFace;
  });
  handlers4.push(restoreHandler);
  return callbackWrapper(() => {
    handlers4.forEach((h) => h());
  });
}
function initSelectionObserver(param) {
  const { doc: doc2, mirror: mirror2, blockClass, blockSelector, unblockSelector, selectionCb } = param;
  let collapsed = true;
  const updateSelection = callbackWrapper(() => {
    const selection = doc2.getSelection();
    if (!selection || collapsed && _optionalChain$2([selection, "optionalAccess", (_21) => _21.isCollapsed]))
      return;
    collapsed = selection.isCollapsed || false;
    const ranges = [];
    const count = selection.rangeCount || 0;
    for (let i = 0; i < count; i++) {
      const range = selection.getRangeAt(i);
      const { startContainer, startOffset, endContainer, endOffset } = range;
      const blocked = isBlocked(startContainer, blockClass, blockSelector, unblockSelector, true) || isBlocked(endContainer, blockClass, blockSelector, unblockSelector, true);
      if (blocked)
        continue;
      ranges.push({
        start: mirror2.getId(startContainer),
        startOffset,
        end: mirror2.getId(endContainer),
        endOffset
      });
    }
    selectionCb({ ranges });
  });
  updateSelection();
  return on("selectionchange", updateSelection);
}
function initCustomElementObserver({ doc: doc2, customElementCb }) {
  const win = doc2.defaultView;
  if (!win || !win.customElements)
    return () => {
    };
  const restoreHandler = patch(win.customElements, "define", function(original) {
    return function(name, constructor, options) {
      try {
        customElementCb({
          define: {
            name
          }
        });
      } catch (e2) {
      }
      return original.apply(this, [name, constructor, options]);
    };
  });
  return restoreHandler;
}
function initObservers(o, _hooks = {}) {
  const currentWindow = o.doc.defaultView;
  if (!currentWindow) {
    return () => {
    };
  }
  const mutationObserver = initMutationObserver(o, o.doc);
  const mousemoveHandler = initMoveObserver(o);
  const mouseInteractionHandler = initMouseInteractionObserver(o);
  const scrollHandler = initScrollObserver(o);
  const viewportResizeHandler = initViewportResizeObserver(o, {
    win: currentWindow
  });
  const inputHandler = initInputObserver(o);
  const mediaInteractionHandler = initMediaInteractionObserver(o);
  const styleSheetObserver = initStyleSheetObserver(o, { win: currentWindow });
  const adoptedStyleSheetObserver = initAdoptedStyleSheetObserver(o, o.doc);
  const styleDeclarationObserver = initStyleDeclarationObserver(o, {
    win: currentWindow
  });
  const fontObserver = o.collectFonts ? initFontObserver(o) : () => {
  };
  const selectionObserver = initSelectionObserver(o);
  const customElementObserver = initCustomElementObserver(o);
  const pluginHandlers = [];
  for (const plugin of o.plugins) {
    pluginHandlers.push(plugin.observer(plugin.callback, currentWindow, plugin.options));
  }
  return callbackWrapper(() => {
    mutationBuffers.forEach((b) => b.reset());
    mutationObserver.disconnect();
    mousemoveHandler();
    mouseInteractionHandler();
    scrollHandler();
    viewportResizeHandler();
    inputHandler();
    mediaInteractionHandler();
    styleSheetObserver();
    adoptedStyleSheetObserver();
    styleDeclarationObserver();
    fontObserver();
    selectionObserver();
    customElementObserver();
    pluginHandlers.forEach((h) => h());
  });
}
function hasNestedCSSRule(prop) {
  return typeof window[prop] !== "undefined";
}
function canMonkeyPatchNestedCSSRule(prop) {
  return Boolean(typeof window[prop] !== "undefined" && window[prop].prototype && "insertRule" in window[prop].prototype && "deleteRule" in window[prop].prototype);
}
var CrossOriginIframeMirror = class {
  constructor(generateIdFn) {
    this.generateIdFn = generateIdFn;
    this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap();
    this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
  }
  getId(iframe, remoteId, idToRemoteMap, remoteToIdMap) {
    const idToRemoteIdMap = idToRemoteMap || this.getIdToRemoteIdMap(iframe);
    const remoteIdToIdMap = remoteToIdMap || this.getRemoteIdToIdMap(iframe);
    let id = idToRemoteIdMap.get(remoteId);
    if (!id) {
      id = this.generateIdFn();
      idToRemoteIdMap.set(remoteId, id);
      remoteIdToIdMap.set(id, remoteId);
    }
    return id;
  }
  getIds(iframe, remoteId) {
    const idToRemoteIdMap = this.getIdToRemoteIdMap(iframe);
    const remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
    return remoteId.map((id) => this.getId(iframe, id, idToRemoteIdMap, remoteIdToIdMap));
  }
  getRemoteId(iframe, id, map) {
    const remoteIdToIdMap = map || this.getRemoteIdToIdMap(iframe);
    if (typeof id !== "number")
      return id;
    const remoteId = remoteIdToIdMap.get(id);
    if (!remoteId)
      return -1;
    return remoteId;
  }
  getRemoteIds(iframe, ids) {
    const remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
    return ids.map((id) => this.getRemoteId(iframe, id, remoteIdToIdMap));
  }
  reset(iframe) {
    if (!iframe) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap();
      this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(iframe);
    this.iframeRemoteIdToIdMap.delete(iframe);
  }
  getIdToRemoteIdMap(iframe) {
    let idToRemoteIdMap = this.iframeIdToRemoteIdMap.get(iframe);
    if (!idToRemoteIdMap) {
      idToRemoteIdMap = /* @__PURE__ */ new Map();
      this.iframeIdToRemoteIdMap.set(iframe, idToRemoteIdMap);
    }
    return idToRemoteIdMap;
  }
  getRemoteIdToIdMap(iframe) {
    let remoteIdToIdMap = this.iframeRemoteIdToIdMap.get(iframe);
    if (!remoteIdToIdMap) {
      remoteIdToIdMap = /* @__PURE__ */ new Map();
      this.iframeRemoteIdToIdMap.set(iframe, remoteIdToIdMap);
    }
    return remoteIdToIdMap;
  }
};
function _optionalChain$1(ops) {
  let lastAccessLHS = void 0;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return void 0;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = void 0;
    }
  }
  return value;
}
var IframeManagerNoop = class {
  constructor() {
    this.crossOriginIframeMirror = new CrossOriginIframeMirror(genId);
    this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap();
  }
  addIframe() {
  }
  addLoadListener() {
  }
  attachIframe() {
  }
};
var IframeManager = class {
  constructor(options) {
    this.iframes = /* @__PURE__ */ new WeakMap();
    this.crossOriginIframeMap = /* @__PURE__ */ new WeakMap();
    this.crossOriginIframeMirror = new CrossOriginIframeMirror(genId);
    this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap();
    this.mutationCb = options.mutationCb;
    this.wrappedEmit = options.wrappedEmit;
    this.stylesheetManager = options.stylesheetManager;
    this.recordCrossOriginIframes = options.recordCrossOriginIframes;
    this.crossOriginIframeStyleMirror = new CrossOriginIframeMirror(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror));
    this.mirror = options.mirror;
    if (this.recordCrossOriginIframes) {
      window.addEventListener("message", this.handleMessage.bind(this));
    }
  }
  addIframe(iframeEl) {
    this.iframes.set(iframeEl, true);
    if (iframeEl.contentWindow)
      this.crossOriginIframeMap.set(iframeEl.contentWindow, iframeEl);
  }
  addLoadListener(cb) {
    this.loadListener = cb;
  }
  attachIframe(iframeEl, childSn) {
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(iframeEl),
          nextId: null,
          node: childSn
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: true
    });
    _optionalChain$1([this, "access", (_) => _.loadListener, "optionalCall", (_2) => _2(iframeEl)]);
    if (iframeEl.contentDocument && iframeEl.contentDocument.adoptedStyleSheets && iframeEl.contentDocument.adoptedStyleSheets.length > 0)
      this.stylesheetManager.adoptStyleSheets(iframeEl.contentDocument.adoptedStyleSheets, this.mirror.getId(iframeEl.contentDocument));
  }
  handleMessage(message) {
    const crossOriginMessageEvent = message;
    if (crossOriginMessageEvent.data.type !== "rrweb" || crossOriginMessageEvent.origin !== crossOriginMessageEvent.data.origin)
      return;
    const iframeSourceWindow = message.source;
    if (!iframeSourceWindow)
      return;
    const iframeEl = this.crossOriginIframeMap.get(message.source);
    if (!iframeEl)
      return;
    const transformedEvent = this.transformCrossOriginEvent(iframeEl, crossOriginMessageEvent.data.event);
    if (transformedEvent)
      this.wrappedEmit(transformedEvent, crossOriginMessageEvent.data.isCheckout);
  }
  transformCrossOriginEvent(iframeEl, e2) {
    switch (e2.type) {
      case EventType.FullSnapshot: {
        this.crossOriginIframeMirror.reset(iframeEl);
        this.crossOriginIframeStyleMirror.reset(iframeEl);
        this.replaceIdOnNode(e2.data.node, iframeEl);
        const rootId = e2.data.node.id;
        this.crossOriginIframeRootIdMap.set(iframeEl, rootId);
        this.patchRootIdOnNode(e2.data.node, rootId);
        return {
          timestamp: e2.timestamp,
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(iframeEl),
                nextId: null,
                node: e2.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: true
          }
        };
      }
      case EventType.Meta:
      case EventType.Load:
      case EventType.DomContentLoaded: {
        return false;
      }
      case EventType.Plugin: {
        return e2;
      }
      case EventType.Custom: {
        this.replaceIds(e2.data.payload, iframeEl, ["id", "parentId", "previousId", "nextId"]);
        return e2;
      }
      case EventType.IncrementalSnapshot: {
        switch (e2.data.source) {
          case IncrementalSource.Mutation: {
            e2.data.adds.forEach((n) => {
              this.replaceIds(n, iframeEl, [
                "parentId",
                "nextId",
                "previousId"
              ]);
              this.replaceIdOnNode(n.node, iframeEl);
              const rootId = this.crossOriginIframeRootIdMap.get(iframeEl);
              rootId && this.patchRootIdOnNode(n.node, rootId);
            });
            e2.data.removes.forEach((n) => {
              this.replaceIds(n, iframeEl, ["parentId", "id"]);
            });
            e2.data.attributes.forEach((n) => {
              this.replaceIds(n, iframeEl, ["id"]);
            });
            e2.data.texts.forEach((n) => {
              this.replaceIds(n, iframeEl, ["id"]);
            });
            return e2;
          }
          case IncrementalSource.Drag:
          case IncrementalSource.TouchMove:
          case IncrementalSource.MouseMove: {
            e2.data.positions.forEach((p) => {
              this.replaceIds(p, iframeEl, ["id"]);
            });
            return e2;
          }
          case IncrementalSource.ViewportResize: {
            return false;
          }
          case IncrementalSource.MediaInteraction:
          case IncrementalSource.MouseInteraction:
          case IncrementalSource.Scroll:
          case IncrementalSource.CanvasMutation:
          case IncrementalSource.Input: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            return e2;
          }
          case IncrementalSource.StyleSheetRule:
          case IncrementalSource.StyleDeclaration: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            this.replaceStyleIds(e2.data, iframeEl, ["styleId"]);
            return e2;
          }
          case IncrementalSource.Font: {
            return e2;
          }
          case IncrementalSource.Selection: {
            e2.data.ranges.forEach((range) => {
              this.replaceIds(range, iframeEl, ["start", "end"]);
            });
            return e2;
          }
          case IncrementalSource.AdoptedStyleSheet: {
            this.replaceIds(e2.data, iframeEl, ["id"]);
            this.replaceStyleIds(e2.data, iframeEl, ["styleIds"]);
            _optionalChain$1([e2, "access", (_3) => _3.data, "access", (_4) => _4.styles, "optionalAccess", (_5) => _5.forEach, "call", (_6) => _6((style) => {
              this.replaceStyleIds(style, iframeEl, ["styleId"]);
            })]);
            return e2;
          }
        }
      }
    }
    return false;
  }
  replace(iframeMirror, obj, iframeEl, keys2) {
    for (const key of keys2) {
      if (!Array.isArray(obj[key]) && typeof obj[key] !== "number")
        continue;
      if (Array.isArray(obj[key])) {
        obj[key] = iframeMirror.getIds(iframeEl, obj[key]);
      } else {
        obj[key] = iframeMirror.getId(iframeEl, obj[key]);
      }
    }
    return obj;
  }
  replaceIds(obj, iframeEl, keys2) {
    return this.replace(this.crossOriginIframeMirror, obj, iframeEl, keys2);
  }
  replaceStyleIds(obj, iframeEl, keys2) {
    return this.replace(this.crossOriginIframeStyleMirror, obj, iframeEl, keys2);
  }
  replaceIdOnNode(node2, iframeEl) {
    this.replaceIds(node2, iframeEl, ["id", "rootId"]);
    if ("childNodes" in node2) {
      node2.childNodes.forEach((child) => {
        this.replaceIdOnNode(child, iframeEl);
      });
    }
  }
  patchRootIdOnNode(node2, rootId) {
    if (node2.type !== NodeType$1.Document && !node2.rootId)
      node2.rootId = rootId;
    if ("childNodes" in node2) {
      node2.childNodes.forEach((child) => {
        this.patchRootIdOnNode(child, rootId);
      });
    }
  }
};
var ShadowDomManagerNoop = class {
  init() {
  }
  addShadowRoot() {
  }
  observeAttachShadow() {
  }
  reset() {
  }
};
var ShadowDomManager = class {
  constructor(options) {
    this.shadowDoms = /* @__PURE__ */ new WeakSet();
    this.restoreHandlers = [];
    this.mutationCb = options.mutationCb;
    this.scrollCb = options.scrollCb;
    this.bypassOptions = options.bypassOptions;
    this.mirror = options.mirror;
    this.init();
  }
  init() {
    this.reset();
    this.patchAttachShadow(Element, document);
  }
  addShadowRoot(shadowRoot, doc2) {
    if (!isNativeShadowDom(shadowRoot))
      return;
    if (this.shadowDoms.has(shadowRoot))
      return;
    this.shadowDoms.add(shadowRoot);
    const observer = initMutationObserver({
      ...this.bypassOptions,
      doc: doc2,
      mutationCb: this.mutationCb,
      mirror: this.mirror,
      shadowDomManager: this
    }, shadowRoot);
    this.restoreHandlers.push(() => observer.disconnect());
    this.restoreHandlers.push(initScrollObserver({
      ...this.bypassOptions,
      scrollCb: this.scrollCb,
      doc: shadowRoot,
      mirror: this.mirror
    }));
    setTimeout(() => {
      if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length > 0)
        this.bypassOptions.stylesheetManager.adoptStyleSheets(shadowRoot.adoptedStyleSheets, this.mirror.getId(shadowRoot.host));
      this.restoreHandlers.push(initAdoptedStyleSheetObserver({
        mirror: this.mirror,
        stylesheetManager: this.bypassOptions.stylesheetManager
      }, shadowRoot));
    }, 0);
  }
  observeAttachShadow(iframeElement) {
    if (!iframeElement.contentWindow || !iframeElement.contentDocument)
      return;
    this.patchAttachShadow(iframeElement.contentWindow.Element, iframeElement.contentDocument);
  }
  patchAttachShadow(element, doc2) {
    const manager = this;
    this.restoreHandlers.push(patch(element.prototype, "attachShadow", function(original) {
      return function(option) {
        const shadowRoot = original.call(this, option);
        if (this.shadowRoot && inDom(this))
          manager.addShadowRoot(this.shadowRoot, doc2);
        return shadowRoot;
      };
    }));
  }
  reset() {
    this.restoreHandlers.forEach((handler) => {
      try {
        handler();
      } catch (e2) {
      }
    });
    this.restoreHandlers = [];
    this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }
};
var CanvasManagerNoop = class {
  reset() {
  }
  freeze() {
  }
  unfreeze() {
  }
  lock() {
  }
  unlock() {
  }
  snapshot() {
  }
};
var StylesheetManager = class {
  constructor(options) {
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
    this.styleMirror = new StyleSheetMirror();
    this.mutationCb = options.mutationCb;
    this.adoptedStyleSheetCb = options.adoptedStyleSheetCb;
  }
  attachLinkElement(linkEl, childSn) {
    if ("_cssText" in childSn.attributes)
      this.mutationCb({
        adds: [],
        removes: [],
        texts: [],
        attributes: [
          {
            id: childSn.id,
            attributes: childSn.attributes
          }
        ]
      });
    this.trackLinkElement(linkEl);
  }
  trackLinkElement(linkEl) {
    if (this.trackedLinkElements.has(linkEl))
      return;
    this.trackedLinkElements.add(linkEl);
    this.trackStylesheetInLinkElement(linkEl);
  }
  adoptStyleSheets(sheets, hostId) {
    if (sheets.length === 0)
      return;
    const adoptedStyleSheetData = {
      id: hostId,
      styleIds: []
    };
    const styles = [];
    for (const sheet of sheets) {
      let styleId;
      if (!this.styleMirror.has(sheet)) {
        styleId = this.styleMirror.add(sheet);
        styles.push({
          styleId,
          rules: Array.from(sheet.rules || CSSRule, (r3, index) => ({
            rule: stringifyRule(r3),
            index
          }))
        });
      } else
        styleId = this.styleMirror.getId(sheet);
      adoptedStyleSheetData.styleIds.push(styleId);
    }
    if (styles.length > 0)
      adoptedStyleSheetData.styles = styles;
    this.adoptedStyleSheetCb(adoptedStyleSheetData);
  }
  reset() {
    this.styleMirror.reset();
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  trackStylesheetInLinkElement(linkEl) {
  }
};
var ProcessedNodeManager = class {
  constructor() {
    this.nodeMap = /* @__PURE__ */ new WeakMap();
    this.loop = true;
    this.periodicallyClear();
  }
  periodicallyClear() {
    onRequestAnimationFrame(() => {
      this.clear();
      if (this.loop)
        this.periodicallyClear();
    });
  }
  inOtherBuffer(node2, thisBuffer) {
    const buffers = this.nodeMap.get(node2);
    return buffers && Array.from(buffers).some((buffer) => buffer !== thisBuffer);
  }
  add(node2, buffer) {
    this.nodeMap.set(node2, (this.nodeMap.get(node2) || /* @__PURE__ */ new Set()).add(buffer));
  }
  clear() {
    this.nodeMap = /* @__PURE__ */ new WeakMap();
  }
  destroy() {
    this.loop = false;
  }
};
function wrapEvent(e2) {
  const eWithTime = e2;
  eWithTime.timestamp = nowTimestamp();
  return eWithTime;
}
var _takeFullSnapshot;
var mirror = createMirror();
function record(options = {}) {
  const { emit, checkoutEveryNms, checkoutEveryNth, blockClass = "rr-block", blockSelector = null, unblockSelector = null, ignoreClass = "rr-ignore", ignoreSelector = null, maskAllText = false, maskTextClass = "rr-mask", unmaskTextClass = null, maskTextSelector = null, unmaskTextSelector = null, inlineStylesheet = true, maskAllInputs, maskInputOptions: _maskInputOptions, slimDOMOptions: _slimDOMOptions, maskAttributeFn, maskInputFn, maskTextFn, packFn, sampling = {}, dataURLOptions = {}, mousemoveWait, recordCanvas = false, recordCrossOriginIframes = false, recordAfter = options.recordAfter === "DOMContentLoaded" ? options.recordAfter : "load", userTriggeredOnInput = false, collectFonts = false, inlineImages = false, plugins, keepIframeSrcFn = () => false, ignoreCSSAttributes = /* @__PURE__ */ new Set([]), errorHandler: errorHandler3, onMutation, getCanvasManager } = options;
  registerErrorHandler(errorHandler3);
  const inEmittingFrame = recordCrossOriginIframes ? window.parent === window : true;
  let passEmitsToParent = false;
  if (!inEmittingFrame) {
    try {
      if (window.parent.document) {
        passEmitsToParent = false;
      }
    } catch (e2) {
      passEmitsToParent = true;
    }
  }
  if (inEmittingFrame && !emit) {
    throw new Error("emit function is required");
  }
  if (mousemoveWait !== void 0 && sampling.mousemove === void 0) {
    sampling.mousemove = mousemoveWait;
  }
  mirror.reset();
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    radio: true,
    checkbox: true
  } : _maskInputOptions !== void 0 ? _maskInputOptions : {};
  const slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaVerification: true,
    headMetaAuthorship: _slimDOMOptions === "all",
    headMetaDescKeywords: _slimDOMOptions === "all"
  } : _slimDOMOptions ? _slimDOMOptions : {};
  polyfill();
  let lastFullSnapshotEvent;
  let incrementalSnapshotCount = 0;
  const eventProcessor = (e2) => {
    for (const plugin of plugins || []) {
      if (plugin.eventProcessor) {
        e2 = plugin.eventProcessor(e2);
      }
    }
    if (packFn && !passEmitsToParent) {
      e2 = packFn(e2);
    }
    return e2;
  };
  const wrappedEmit = (e2, isCheckout) => {
    if (_optionalChain([mutationBuffers, "access", (_) => _[0], "optionalAccess", (_2) => _2.isFrozen, "call", (_3) => _3()]) && e2.type !== EventType.FullSnapshot && !(e2.type === EventType.IncrementalSnapshot && e2.data.source === IncrementalSource.Mutation)) {
      mutationBuffers.forEach((buf) => buf.unfreeze());
    }
    if (inEmittingFrame) {
      _optionalChain([emit, "optionalCall", (_4) => _4(eventProcessor(e2), isCheckout)]);
    } else if (passEmitsToParent) {
      const message = {
        type: "rrweb",
        event: eventProcessor(e2),
        origin: window.location.origin,
        isCheckout
      };
      window.parent.postMessage(message, "*");
    }
    if (e2.type === EventType.FullSnapshot) {
      lastFullSnapshotEvent = e2;
      incrementalSnapshotCount = 0;
    } else if (e2.type === EventType.IncrementalSnapshot) {
      if (e2.data.source === IncrementalSource.Mutation && e2.data.isAttachIframe) {
        return;
      }
      incrementalSnapshotCount++;
      const exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
      const exceedTime = checkoutEveryNms && e2.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
      if (exceedCount || exceedTime) {
        takeFullSnapshot2(true);
      }
    }
  };
  const wrappedMutationEmit = (m) => {
    wrappedEmit(wrapEvent({
      type: EventType.IncrementalSnapshot,
      data: {
        source: IncrementalSource.Mutation,
        ...m
      }
    }));
  };
  const wrappedScrollEmit = (p) => wrappedEmit(wrapEvent({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.Scroll,
      ...p
    }
  }));
  const wrappedCanvasMutationEmit = (p) => wrappedEmit(wrapEvent({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.CanvasMutation,
      ...p
    }
  }));
  const wrappedAdoptedStyleSheetEmit = (a) => wrappedEmit(wrapEvent({
    type: EventType.IncrementalSnapshot,
    data: {
      source: IncrementalSource.AdoptedStyleSheet,
      ...a
    }
  }));
  const stylesheetManager = new StylesheetManager({
    mutationCb: wrappedMutationEmit,
    adoptedStyleSheetCb: wrappedAdoptedStyleSheetEmit
  });
  const iframeManager = typeof __RRWEB_EXCLUDE_IFRAME__ === "boolean" && __RRWEB_EXCLUDE_IFRAME__ ? new IframeManagerNoop() : new IframeManager({
    mirror,
    mutationCb: wrappedMutationEmit,
    stylesheetManager,
    recordCrossOriginIframes,
    wrappedEmit
  });
  for (const plugin of plugins || []) {
    if (plugin.getMirror)
      plugin.getMirror({
        nodeMirror: mirror,
        crossOriginIframeMirror: iframeManager.crossOriginIframeMirror,
        crossOriginIframeStyleMirror: iframeManager.crossOriginIframeStyleMirror
      });
  }
  const processedNodeManager = new ProcessedNodeManager();
  const canvasManager = _getCanvasManager(getCanvasManager, {
    mirror,
    win: window,
    mutationCb: (p) => wrappedEmit(wrapEvent({
      type: EventType.IncrementalSnapshot,
      data: {
        source: IncrementalSource.CanvasMutation,
        ...p
      }
    })),
    recordCanvas,
    blockClass,
    blockSelector,
    unblockSelector,
    sampling: sampling["canvas"],
    dataURLOptions,
    errorHandler: errorHandler3
  });
  const shadowDomManager = typeof __RRWEB_EXCLUDE_SHADOW_DOM__ === "boolean" && __RRWEB_EXCLUDE_SHADOW_DOM__ ? new ShadowDomManagerNoop() : new ShadowDomManager({
    mutationCb: wrappedMutationEmit,
    scrollCb: wrappedScrollEmit,
    bypassOptions: {
      onMutation,
      blockClass,
      blockSelector,
      unblockSelector,
      maskAllText,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      inlineStylesheet,
      maskInputOptions,
      dataURLOptions,
      maskAttributeFn,
      maskTextFn,
      maskInputFn,
      recordCanvas,
      inlineImages,
      sampling,
      slimDOMOptions,
      iframeManager,
      stylesheetManager,
      canvasManager,
      keepIframeSrcFn,
      processedNodeManager
    },
    mirror
  });
  const takeFullSnapshot2 = (isCheckout = false) => {
    wrappedEmit(wrapEvent({
      type: EventType.Meta,
      data: {
        href: window.location.href,
        width: getWindowWidth(),
        height: getWindowHeight()
      }
    }), isCheckout);
    stylesheetManager.reset();
    shadowDomManager.init();
    mutationBuffers.forEach((buf) => buf.lock());
    const node2 = snapshot(document, {
      mirror,
      blockClass,
      blockSelector,
      unblockSelector,
      maskAllText,
      maskTextClass,
      unmaskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      inlineStylesheet,
      maskAllInputs: maskInputOptions,
      maskAttributeFn,
      maskInputFn,
      maskTextFn,
      slimDOM: slimDOMOptions,
      dataURLOptions,
      recordCanvas,
      inlineImages,
      onSerialize: (n) => {
        if (isSerializedIframe(n, mirror)) {
          iframeManager.addIframe(n);
        }
        if (isSerializedStylesheet(n, mirror)) {
          stylesheetManager.trackLinkElement(n);
        }
        if (hasShadowRoot(n)) {
          shadowDomManager.addShadowRoot(n.shadowRoot, document);
        }
      },
      onIframeLoad: (iframe, childSn) => {
        iframeManager.attachIframe(iframe, childSn);
        shadowDomManager.observeAttachShadow(iframe);
      },
      onStylesheetLoad: (linkEl, childSn) => {
        stylesheetManager.attachLinkElement(linkEl, childSn);
      },
      keepIframeSrcFn
    });
    if (!node2) {
      return console.warn("Failed to snapshot the document");
    }
    wrappedEmit(wrapEvent({
      type: EventType.FullSnapshot,
      data: {
        node: node2,
        initialOffset: getWindowScroll(window)
      }
    }));
    mutationBuffers.forEach((buf) => buf.unlock());
    if (document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0)
      stylesheetManager.adoptStyleSheets(document.adoptedStyleSheets, mirror.getId(document));
  };
  _takeFullSnapshot = takeFullSnapshot2;
  try {
    const handlers4 = [];
    const observe2 = (doc2) => {
      return callbackWrapper(initObservers)({
        onMutation,
        mutationCb: wrappedMutationEmit,
        mousemoveCb: (positions, source) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source,
            positions
          }
        })),
        mouseInteractionCb: (d) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.MouseInteraction,
            ...d
          }
        })),
        scrollCb: wrappedScrollEmit,
        viewportResizeCb: (d) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.ViewportResize,
            ...d
          }
        })),
        inputCb: (v) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.Input,
            ...v
          }
        })),
        mediaInteractionCb: (p) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.MediaInteraction,
            ...p
          }
        })),
        styleSheetRuleCb: (r3) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.StyleSheetRule,
            ...r3
          }
        })),
        styleDeclarationCb: (r3) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.StyleDeclaration,
            ...r3
          }
        })),
        canvasMutationCb: wrappedCanvasMutationEmit,
        fontCb: (p) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source: IncrementalSource.Font,
            ...p
          }
        })),
        selectionCb: (p) => {
          wrappedEmit(wrapEvent({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.Selection,
              ...p
            }
          }));
        },
        customElementCb: (c) => {
          wrappedEmit(wrapEvent({
            type: EventType.IncrementalSnapshot,
            data: {
              source: IncrementalSource.CustomElement,
              ...c
            }
          }));
        },
        blockClass,
        ignoreClass,
        ignoreSelector,
        maskAllText,
        maskTextClass,
        unmaskTextClass,
        maskTextSelector,
        unmaskTextSelector,
        maskInputOptions,
        inlineStylesheet,
        sampling,
        recordCanvas,
        inlineImages,
        userTriggeredOnInput,
        collectFonts,
        doc: doc2,
        maskAttributeFn,
        maskInputFn,
        maskTextFn,
        keepIframeSrcFn,
        blockSelector,
        unblockSelector,
        slimDOMOptions,
        dataURLOptions,
        mirror,
        iframeManager,
        stylesheetManager,
        shadowDomManager,
        processedNodeManager,
        canvasManager,
        ignoreCSSAttributes,
        plugins: _optionalChain([
          plugins,
          "optionalAccess",
          (_5) => _5.filter,
          "call",
          (_6) => _6((p) => p.observer),
          "optionalAccess",
          (_7) => _7.map,
          "call",
          (_8) => _8((p) => ({
            observer: p.observer,
            options: p.options,
            callback: (payload) => wrappedEmit(wrapEvent({
              type: EventType.Plugin,
              data: {
                plugin: p.name,
                payload
              }
            }))
          }))
        ]) || []
      }, {});
    };
    iframeManager.addLoadListener((iframeEl) => {
      try {
        handlers4.push(observe2(iframeEl.contentDocument));
      } catch (error) {
        console.warn(error);
      }
    });
    const init3 = () => {
      takeFullSnapshot2();
      handlers4.push(observe2(document));
    };
    if (document.readyState === "interactive" || document.readyState === "complete") {
      init3();
    } else {
      handlers4.push(on("DOMContentLoaded", () => {
        wrappedEmit(wrapEvent({
          type: EventType.DomContentLoaded,
          data: {}
        }));
        if (recordAfter === "DOMContentLoaded")
          init3();
      }));
      handlers4.push(on("load", () => {
        wrappedEmit(wrapEvent({
          type: EventType.Load,
          data: {}
        }));
        if (recordAfter === "load")
          init3();
      }, window));
    }
    return () => {
      handlers4.forEach((h) => h());
      processedNodeManager.destroy();
      _takeFullSnapshot = void 0;
      unregisterErrorHandler();
    };
  } catch (error) {
    console.warn(error);
  }
}
function takeFullSnapshot(isCheckout) {
  if (!_takeFullSnapshot) {
    throw new Error("please take full snapshot after start recording");
  }
  _takeFullSnapshot(isCheckout);
}
record.mirror = mirror;
record.takeFullSnapshot = takeFullSnapshot;
function _getCanvasManager(getCanvasManagerFn, options) {
  try {
    return getCanvasManagerFn ? getCanvasManagerFn(options) : new CanvasManagerNoop();
  } catch (e2) {
    console.warn("Unable to initialize CanvasManager");
    return new CanvasManagerNoop();
  }
}
var ReplayEventTypeIncrementalSnapshot = 3;
var ReplayEventTypeCustom = 5;
function timestampToMs(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp : timestamp * 1e3;
}
function timestampToS(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function addBreadcrumbEvent(replay, breadcrumb) {
  if (breadcrumb.category === "sentry.transaction") {
    return;
  }
  if (["ui.click", "ui.input"].includes(breadcrumb.category)) {
    replay.triggerUserActivity();
  } else {
    replay.checkAndHandleExpiredSession();
  }
  replay.addUpdate(() => {
    replay.throttledAddEvent({
      type: EventType.Custom,
      // TODO: We were converting from ms to seconds for breadcrumbs, spans,
      // but maybe we should just keep them as milliseconds
      timestamp: (breadcrumb.timestamp || 0) * 1e3,
      data: {
        tag: "breadcrumb",
        // normalize to max. 10 depth and 1_000 properties per object
        payload: normalize(breadcrumb, 10, 1e3)
      }
    });
    return breadcrumb.category === "console";
  });
}
var INTERACTIVE_SELECTOR = "button,a";
function getClosestInteractive(element) {
  const closestInteractive = element.closest(INTERACTIVE_SELECTOR);
  return closestInteractive || element;
}
function getClickTargetNode(event) {
  const target = getTargetNode(event);
  if (!target || !(target instanceof Element)) {
    return target;
  }
  return getClosestInteractive(target);
}
function getTargetNode(event) {
  if (isEventWithTarget(event)) {
    return event.target;
  }
  return event;
}
function isEventWithTarget(event) {
  return typeof event === "object" && !!event && "target" in event;
}
var handlers3;
function onWindowOpen(cb) {
  if (!handlers3) {
    handlers3 = [];
    monkeyPatchWindowOpen();
  }
  handlers3.push(cb);
  return () => {
    const pos = handlers3 ? handlers3.indexOf(cb) : -1;
    if (pos > -1) {
      handlers3.splice(pos, 1);
    }
  };
}
function monkeyPatchWindowOpen() {
  fill(WINDOW9, "open", function(originalWindowOpen) {
    return function(...args) {
      if (handlers3) {
        try {
          handlers3.forEach((handler) => handler());
        } catch (e2) {
        }
      }
      return originalWindowOpen.apply(WINDOW9, args);
    };
  });
}
function handleClick(clickDetector, clickBreadcrumb, node2) {
  clickDetector.handleClick(clickBreadcrumb, node2);
}
var ClickDetector = class {
  // protected for testing
  constructor(replay, slowClickConfig, _addBreadcrumbEvent = addBreadcrumbEvent) {
    this._lastMutation = 0;
    this._lastScroll = 0;
    this._clicks = [];
    this._timeout = slowClickConfig.timeout / 1e3;
    this._threshold = slowClickConfig.threshold / 1e3;
    this._scollTimeout = slowClickConfig.scrollTimeout / 1e3;
    this._replay = replay;
    this._ignoreSelector = slowClickConfig.ignoreSelector;
    this._addBreadcrumbEvent = _addBreadcrumbEvent;
  }
  /** Register click detection handlers on mutation or scroll. */
  addListeners() {
    const cleanupWindowOpen = onWindowOpen(() => {
      this._lastMutation = nowInSeconds();
    });
    this._teardown = () => {
      cleanupWindowOpen();
      this._clicks = [];
      this._lastMutation = 0;
      this._lastScroll = 0;
    };
  }
  /** Clean up listeners. */
  removeListeners() {
    if (this._teardown) {
      this._teardown();
    }
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
  }
  /** @inheritDoc */
  handleClick(breadcrumb, node2) {
    if (ignoreElement(node2, this._ignoreSelector) || !isClickBreadcrumb(breadcrumb)) {
      return;
    }
    const newClick = {
      timestamp: timestampToS(breadcrumb.timestamp),
      clickBreadcrumb: breadcrumb,
      // Set this to 0 so we know it originates from the click breadcrumb
      clickCount: 0,
      node: node2
    };
    if (this._clicks.some((click) => click.node === newClick.node && Math.abs(click.timestamp - newClick.timestamp) < 1)) {
      return;
    }
    this._clicks.push(newClick);
    if (this._clicks.length === 1) {
      this._scheduleCheckClicks();
    }
  }
  /** @inheritDoc */
  registerMutation(timestamp = Date.now()) {
    this._lastMutation = timestampToS(timestamp);
  }
  /** @inheritDoc */
  registerScroll(timestamp = Date.now()) {
    this._lastScroll = timestampToS(timestamp);
  }
  /** @inheritDoc */
  registerClick(element) {
    const node2 = getClosestInteractive(element);
    this._handleMultiClick(node2);
  }
  /** Count multiple clicks on elements. */
  _handleMultiClick(node2) {
    this._getClicks(node2).forEach((click) => {
      click.clickCount++;
    });
  }
  /** Get all pending clicks for a given node. */
  _getClicks(node2) {
    return this._clicks.filter((click) => click.node === node2);
  }
  /** Check the clicks that happened. */
  _checkClicks() {
    const timedOutClicks = [];
    const now = nowInSeconds();
    this._clicks.forEach((click) => {
      if (!click.mutationAfter && this._lastMutation) {
        click.mutationAfter = click.timestamp <= this._lastMutation ? this._lastMutation - click.timestamp : void 0;
      }
      if (!click.scrollAfter && this._lastScroll) {
        click.scrollAfter = click.timestamp <= this._lastScroll ? this._lastScroll - click.timestamp : void 0;
      }
      if (click.timestamp + this._timeout <= now) {
        timedOutClicks.push(click);
      }
    });
    for (const click of timedOutClicks) {
      const pos = this._clicks.indexOf(click);
      if (pos > -1) {
        this._generateBreadcrumbs(click);
        this._clicks.splice(pos, 1);
      }
    }
    if (this._clicks.length) {
      this._scheduleCheckClicks();
    }
  }
  /** Generate matching breadcrumb(s) for the click. */
  _generateBreadcrumbs(click) {
    const replay = this._replay;
    const hadScroll = click.scrollAfter && click.scrollAfter <= this._scollTimeout;
    const hadMutation = click.mutationAfter && click.mutationAfter <= this._threshold;
    const isSlowClick = !hadScroll && !hadMutation;
    const { clickCount, clickBreadcrumb } = click;
    if (isSlowClick) {
      const timeAfterClickMs = Math.min(click.mutationAfter || this._timeout, this._timeout) * 1e3;
      const endReason = timeAfterClickMs < this._timeout * 1e3 ? "mutation" : "timeout";
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.slowClickDetected",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW9.location.href,
          route: replay.getCurrentRoute(),
          timeAfterClickMs,
          endReason,
          // If clickCount === 0, it means multiClick was not correctly captured here
          // - we still want to send 1 in this case
          clickCount: clickCount || 1
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
      return;
    }
    if (clickCount > 1) {
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.multiClick",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW9.location.href,
          route: replay.getCurrentRoute(),
          clickCount,
          metric: true
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
    }
  }
  /** Schedule to check current clicks. */
  _scheduleCheckClicks() {
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
    this._checkClickTimeout = setTimeout(() => this._checkClicks(), 1e3);
  }
};
var SLOW_CLICK_TAGS = ["A", "BUTTON", "INPUT"];
function ignoreElement(node2, ignoreSelector) {
  if (!SLOW_CLICK_TAGS.includes(node2.tagName)) {
    return true;
  }
  if (node2.tagName === "INPUT" && !["submit", "button"].includes(node2.getAttribute("type") || "")) {
    return true;
  }
  if (node2.tagName === "A" && (node2.hasAttribute("download") || node2.hasAttribute("target") && node2.getAttribute("target") !== "_self")) {
    return true;
  }
  if (ignoreSelector && node2.matches(ignoreSelector)) {
    return true;
  }
  return false;
}
function isClickBreadcrumb(breadcrumb) {
  return !!(breadcrumb.data && typeof breadcrumb.data.nodeId === "number" && breadcrumb.timestamp);
}
function nowInSeconds() {
  return Date.now() / 1e3;
}
function updateClickDetectorForRecordingEvent(clickDetector, event) {
  try {
    if (!isIncrementalEvent(event)) {
      return;
    }
    const { source } = event.data;
    if (source === IncrementalSource.Mutation) {
      clickDetector.registerMutation(event.timestamp);
    }
    if (source === IncrementalSource.Scroll) {
      clickDetector.registerScroll(event.timestamp);
    }
    if (isIncrementalMouseInteraction(event)) {
      const { type, id } = event.data;
      const node2 = record.mirror.getNode(id);
      if (node2 instanceof HTMLElement && type === MouseInteractions.Click) {
        clickDetector.registerClick(node2);
      }
    }
  } catch (e2) {
  }
}
function isIncrementalEvent(event) {
  return event.type === ReplayEventTypeIncrementalSnapshot;
}
function isIncrementalMouseInteraction(event) {
  return event.data.source === IncrementalSource.MouseInteraction;
}
function createBreadcrumb(breadcrumb) {
  return {
    timestamp: Date.now() / 1e3,
    type: "default",
    ...breadcrumb
  };
}
var NodeType;
(function(NodeType3) {
  NodeType3[NodeType3["Document"] = 0] = "Document";
  NodeType3[NodeType3["DocumentType"] = 1] = "DocumentType";
  NodeType3[NodeType3["Element"] = 2] = "Element";
  NodeType3[NodeType3["Text"] = 3] = "Text";
  NodeType3[NodeType3["CDATA"] = 4] = "CDATA";
  NodeType3[NodeType3["Comment"] = 5] = "Comment";
})(NodeType || (NodeType = {}));
var ATTRIBUTES_TO_RECORD = /* @__PURE__ */ new Set([
  "id",
  "class",
  "aria-label",
  "role",
  "name",
  "alt",
  "title",
  "data-test-id",
  "data-testid",
  "disabled",
  "aria-disabled",
  "data-sentry-component"
]);
function getAttributesToRecord(attributes) {
  const obj = {};
  for (const key in attributes) {
    if (ATTRIBUTES_TO_RECORD.has(key)) {
      let normalizedKey = key;
      if (key === "data-testid" || key === "data-test-id") {
        normalizedKey = "testId";
      }
      obj[normalizedKey] = attributes[key];
    }
  }
  return obj;
}
var handleDomListener = (replay) => {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleDom(handlerData);
    if (!result) {
      return;
    }
    const isClick = handlerData.name === "click";
    const event = isClick ? handlerData.event : void 0;
    if (isClick && replay.clickDetector && event && event.target && !event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      handleClick(
        replay.clickDetector,
        result,
        getClickTargetNode(handlerData.event)
      );
    }
    addBreadcrumbEvent(replay, result);
  };
};
function getBaseDomBreadcrumb(target, message) {
  const nodeId = record.mirror.getId(target);
  const node2 = nodeId && record.mirror.getNode(nodeId);
  const meta = node2 && record.mirror.getMeta(node2);
  const element = meta && isElement2(meta) ? meta : null;
  return {
    message,
    data: element ? {
      nodeId,
      node: {
        id: nodeId,
        tagName: element.tagName,
        textContent: Array.from(element.childNodes).map((node3) => node3.type === NodeType.Text && node3.textContent).filter(Boolean).map((text) => text.trim()).join(""),
        attributes: getAttributesToRecord(element.attributes)
      }
    } : {}
  };
}
function handleDom(handlerData) {
  const { target, message } = getDomTarget(handlerData);
  return createBreadcrumb({
    category: `ui.${handlerData.name}`,
    ...getBaseDomBreadcrumb(target, message)
  });
}
function getDomTarget(handlerData) {
  const isClick = handlerData.name === "click";
  let message;
  let target = null;
  try {
    target = isClick ? getClickTargetNode(handlerData.event) : getTargetNode(handlerData.event);
    message = htmlTreeAsString(target, { maxStringLength: 200 }) || "<unknown>";
  } catch (e2) {
    message = "<unknown>";
  }
  return { target, message };
}
function isElement2(node2) {
  return node2.type === NodeType.Element;
}
function handleKeyboardEvent(replay, event) {
  if (!replay.isEnabled()) {
    return;
  }
  replay.updateUserActivity();
  const breadcrumb = getKeyboardBreadcrumb(event);
  if (!breadcrumb) {
    return;
  }
  addBreadcrumbEvent(replay, breadcrumb);
}
function getKeyboardBreadcrumb(event) {
  const { metaKey, shiftKey, ctrlKey, altKey, key, target } = event;
  if (!target || isInputElement(target) || !key) {
    return null;
  }
  const hasModifierKey = metaKey || ctrlKey || altKey;
  const isCharacterKey = key.length === 1;
  if (!hasModifierKey && isCharacterKey) {
    return null;
  }
  const message = htmlTreeAsString(target, { maxStringLength: 200 }) || "<unknown>";
  const baseBreadcrumb = getBaseDomBreadcrumb(target, message);
  return createBreadcrumb({
    category: "ui.keyDown",
    message,
    data: {
      ...baseBreadcrumb.data,
      metaKey,
      shiftKey,
      ctrlKey,
      altKey,
      key
    }
  });
}
function isInputElement(target) {
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
}
var ENTRY_TYPES = {
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  resource: createResourceEntry,
  paint: createPaintEntry,
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  navigation: createNavigationEntry
};
function createPerformanceEntries(entries) {
  return entries.map(createPerformanceEntry).filter(Boolean);
}
function createPerformanceEntry(entry) {
  if (!ENTRY_TYPES[entry.entryType]) {
    return null;
  }
  return ENTRY_TYPES[entry.entryType](entry);
}
function getAbsoluteTime2(time) {
  return ((browserPerformanceTimeOrigin || WINDOW9.performance.timeOrigin) + time) / 1e3;
}
function createPaintEntry(entry) {
  const { duration, entryType, name, startTime } = entry;
  const start = getAbsoluteTime2(startTime);
  return {
    type: entryType,
    name,
    start,
    end: start + duration,
    data: void 0
  };
}
function createNavigationEntry(entry) {
  const {
    entryType,
    name,
    decodedBodySize,
    duration,
    domComplete,
    encodedBodySize,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domInteractive,
    loadEventStart,
    loadEventEnd,
    redirectCount,
    startTime,
    transferSize,
    type
  } = entry;
  if (duration === 0) {
    return null;
  }
  return {
    type: `${entryType}.${type}`,
    start: getAbsoluteTime2(startTime),
    end: getAbsoluteTime2(domComplete),
    name,
    data: {
      size: transferSize,
      decodedBodySize,
      encodedBodySize,
      duration,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      loadEventStart,
      loadEventEnd,
      domComplete,
      redirectCount
    }
  };
}
function createResourceEntry(entry) {
  const {
    entryType,
    initiatorType,
    name,
    responseEnd,
    startTime,
    decodedBodySize,
    encodedBodySize,
    responseStatus,
    transferSize
  } = entry;
  if (["fetch", "xmlhttprequest"].includes(initiatorType)) {
    return null;
  }
  return {
    type: `${entryType}.${initiatorType}`,
    start: getAbsoluteTime2(startTime),
    end: getAbsoluteTime2(responseEnd),
    name,
    data: {
      size: transferSize,
      statusCode: responseStatus,
      decodedBodySize,
      encodedBodySize
    }
  };
}
function getLargestContentfulPaint(metric) {
  const entries = metric.entries;
  const lastEntry = entries[entries.length - 1];
  const element = lastEntry ? lastEntry.element : void 0;
  const value = metric.value;
  const end = getAbsoluteTime2(value);
  const data = {
    type: "largest-contentful-paint",
    name: "largest-contentful-paint",
    start: end,
    end,
    data: {
      value,
      size: value,
      nodeId: element ? record.mirror.getId(element) : void 0
    }
  };
  return data;
}
function setupPerformanceObserver(replay) {
  function addPerformanceEntry(entry) {
    if (!replay.performanceEntries.includes(entry)) {
      replay.performanceEntries.push(entry);
    }
  }
  function onEntries({ entries }) {
    entries.forEach(addPerformanceEntry);
  }
  const clearCallbacks = [];
  ["navigation", "paint", "resource"].forEach((type) => {
    clearCallbacks.push(addPerformanceInstrumentationHandler(type, onEntries));
  });
  clearCallbacks.push(
    addLcpInstrumentationHandler(({ metric }) => {
      replay.replayPerformanceEntries.push(getLargestContentfulPaint(metric));
    })
  );
  return () => {
    clearCallbacks.forEach((clearCallback) => clearCallback());
  };
}
var DEBUG_BUILD5 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
var r = `var t=Uint8Array,n=Uint16Array,r=Int32Array,e=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),a=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=function(t,e){for(var i=new n(31),a=0;a<31;++a)i[a]=e+=1<<t[a-1];var s=new r(i[30]);for(a=1;a<30;++a)for(var o=i[a];o<i[a+1];++o)s[o]=o-i[a]<<5|a;return{b:i,r:s}},o=s(e,2),f=o.b,h=o.r;f[28]=258,h[258]=28;for(var l=s(i,0).r,u=new n(32768),c=0;c<32768;++c){var v=(43690&c)>>1|(21845&c)<<1;v=(61680&(v=(52428&v)>>2|(13107&v)<<2))>>4|(3855&v)<<4,u[c]=((65280&v)>>8|(255&v)<<8)>>1}var d=function(t,r,e){for(var i=t.length,a=0,s=new n(r);a<i;++a)t[a]&&++s[t[a]-1];var o,f=new n(r);for(a=1;a<r;++a)f[a]=f[a-1]+s[a-1]<<1;if(e){o=new n(1<<r);var h=15-r;for(a=0;a<i;++a)if(t[a])for(var l=a<<4|t[a],c=r-t[a],v=f[t[a]-1]++<<c,d=v|(1<<c)-1;v<=d;++v)o[u[v]>>h]=l}else for(o=new n(i),a=0;a<i;++a)t[a]&&(o[a]=u[f[t[a]-1]++]>>15-t[a]);return o},g=new t(288);for(c=0;c<144;++c)g[c]=8;for(c=144;c<256;++c)g[c]=9;for(c=256;c<280;++c)g[c]=7;for(c=280;c<288;++c)g[c]=8;var w=new t(32);for(c=0;c<32;++c)w[c]=5;var p=d(g,9,0),y=d(w,5,0),m=function(t){return(t+7)/8|0},b=function(n,r,e){return(null==r||r<0)&&(r=0),(null==e||e>n.length)&&(e=n.length),new t(n.subarray(r,e))},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(t,n,r){var e=new Error(n||M[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,E),!r)throw e;return e},z=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8},A=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8,t[e+2]|=r>>16},_=function(r,e){for(var i=[],a=0;a<r.length;++a)r[a]&&i.push({s:a,f:r[a]});var s=i.length,o=i.slice();if(!s)return{t:F,l:0};if(1==s){var f=new t(i[0].s+1);return f[i[0].s]=1,{t:f,l:1}}i.sort((function(t,n){return t.f-n.f})),i.push({s:-1,f:25001});var h=i[0],l=i[1],u=0,c=1,v=2;for(i[0]={s:-1,f:h.f+l.f,l:h,r:l};c!=s-1;)h=i[i[u].f<i[v].f?u++:v++],l=i[u!=c&&i[u].f<i[v].f?u++:v++],i[c++]={s:-1,f:h.f+l.f,l:h,r:l};var d=o[0].s;for(a=1;a<s;++a)o[a].s>d&&(d=o[a].s);var g=new n(d+1),w=x(i[c-1],g,0);if(w>e){a=0;var p=0,y=w-e,m=1<<y;for(o.sort((function(t,n){return g[n.s]-g[t.s]||t.f-n.f}));a<s;++a){var b=o[a].s;if(!(g[b]>e))break;p+=m-(1<<w-g[b]),g[b]=e}for(p>>=y;p>0;){var M=o[a].s;g[M]<e?p-=1<<e-g[M]++-1:++a}for(;a>=0&&p;--a){var E=o[a].s;g[E]==e&&(--g[E],++p)}w=e}return{t:new t(g),l:w}},x=function(t,n,r){return-1==t.s?Math.max(x(t.l,n,r+1),x(t.r,n,r+1)):n[t.s]=r},D=function(t){for(var r=t.length;r&&!t[--r];);for(var e=new n(++r),i=0,a=t[0],s=1,o=function(t){e[i++]=t},f=1;f<=r;++f)if(t[f]==a&&f!=r)++s;else{if(!a&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(a),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(a);s=1,a=t[f]}return{c:e.subarray(0,i),n:r}},T=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},k=function(t,n,r){var e=r.length,i=m(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var a=0;a<e;++a)t[i+a+4]=r[a];return 8*(i+4+e)},C=function(t,r,s,o,f,h,l,u,c,v,m){z(r,m++,s),++f[256];for(var b=_(f,15),M=b.t,E=b.l,x=_(h,15),C=x.t,U=x.l,F=D(M),I=F.c,S=F.n,L=D(C),O=L.c,j=L.n,q=new n(19),B=0;B<I.length;++B)++q[31&I[B]];for(B=0;B<O.length;++B)++q[31&O[B]];for(var G=_(q,7),H=G.t,J=G.l,K=19;K>4&&!H[a[K-1]];--K);var N,P,Q,R,V=v+5<<3,W=T(f,g)+T(h,w)+l,X=T(f,M)+T(h,C)+l+14+3*K+T(q,H)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&V<=W&&V<=X)return k(r,m,t.subarray(c,c+v));if(z(r,m,1+(X<W)),m+=2,X<W){N=d(M,E,0),P=M,Q=d(C,U,0),R=C;var Y=d(H,J,0);z(r,m,S-257),z(r,m+5,j-1),z(r,m+10,K-4),m+=14;for(B=0;B<K;++B)z(r,m+3*B,H[a[B]]);m+=3*K;for(var Z=[I,O],$=0;$<2;++$){var tt=Z[$];for(B=0;B<tt.length;++B){var nt=31&tt[B];z(r,m,Y[nt]),m+=H[nt],nt>15&&(z(r,m,tt[B]>>5&127),m+=tt[B]>>12)}}}else N=p,P=g,Q=y,R=w;for(B=0;B<u;++B){var rt=o[B];if(rt>255){A(r,m,N[(nt=rt>>18&31)+257]),m+=P[nt+257],nt>7&&(z(r,m,rt>>23&31),m+=e[nt]);var et=31&rt;A(r,m,Q[et]),m+=R[et],et>3&&(A(r,m,rt>>5&8191),m+=i[et])}else A(r,m,N[rt]),m+=P[rt]}return A(r,m,N[256]),m+P[256]},U=new r([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),F=new t(0),I=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),S=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,a=0|r.length,s=0;s!=a;){for(var o=Math.min(s+2655,a);s<o;++s)i+=e+=r[s];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},L=function(a,s,o,f,u){if(!u&&(u={l:1},s.dictionary)){var c=s.dictionary.subarray(-32768),v=new t(c.length+a.length);v.set(c),v.set(a,c.length),a=v,u.w=c.length}return function(a,s,o,f,u,c){var v=c.z||a.length,d=new t(f+v+5*(1+Math.ceil(v/7e3))+u),g=d.subarray(f,d.length-u),w=c.l,p=7&(c.r||0);if(s){p&&(g[0]=c.r>>3);for(var y=U[s-1],M=y>>13,E=8191&y,z=(1<<o)-1,A=c.p||new n(32768),_=c.h||new n(z+1),x=Math.ceil(o/3),D=2*x,T=function(t){return(a[t]^a[t+1]<<x^a[t+2]<<D)&z},F=new r(25e3),I=new n(288),S=new n(32),L=0,O=0,j=c.i||0,q=0,B=c.w||0,G=0;j+2<v;++j){var H=T(j),J=32767&j,K=_[H];if(A[J]=K,_[H]=J,B<=j){var N=v-j;if((L>7e3||q>24576)&&(N>423||!w)){p=C(a,g,0,F,I,S,O,q,G,j-G,p),q=L=O=0,G=j;for(var P=0;P<286;++P)I[P]=0;for(P=0;P<30;++P)S[P]=0}var Q=2,R=0,V=E,W=J-K&32767;if(N>2&&H==T(j-W))for(var X=Math.min(M,N)-1,Y=Math.min(32767,j),Z=Math.min(258,N);W<=Y&&--V&&J!=K;){if(a[j+Q]==a[j+Q-W]){for(var $=0;$<Z&&a[j+$]==a[j+$-W];++$);if($>Q){if(Q=$,R=W,$>X)break;var tt=Math.min(W,$-2),nt=0;for(P=0;P<tt;++P){var rt=j-W+P&32767,et=rt-A[rt]&32767;et>nt&&(nt=et,K=rt)}}}W+=(J=K)-(K=A[J])&32767}if(R){F[q++]=268435456|h[Q]<<18|l[R];var it=31&h[Q],at=31&l[R];O+=e[it]+i[at],++I[257+it],++S[at],B=j+Q,++L}else F[q++]=a[j],++I[a[j]]}}for(j=Math.max(j,B);j<v;++j)F[q++]=a[j],++I[a[j]];p=C(a,g,w,F,I,S,O,q,G,j-G,p),w||(c.r=7&p|g[p/8|0]<<3,p-=7,c.h=_,c.p=A,c.i=j,c.w=B)}else{for(j=c.w||0;j<v+w;j+=65535){var st=j+65535;st>=v&&(g[p/8|0]=w,st=v),p=k(g,p+1,a.subarray(j,st))}c.i=v}return b(d,0,f+m(p)+u)}(a,null==s.level?6:s.level,null==s.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(a.length)))):12+s.mem,o,f,u)},O=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},j=function(){function n(n,r){if("function"==typeof n&&(r=n,n={}),this.ondata=r,this.o=n||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new t(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return n.prototype.p=function(t,n){this.ondata(L(t,this.o,0,0,this.s),n)},n.prototype.push=function(n,r){this.ondata||E(5),this.s.l&&E(4);var e=n.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new t(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var a=this.b.length-this.s.z;a&&(this.b.set(n.subarray(0,a),this.s.z),this.s.z=this.b.length,this.p(this.b,!1)),this.b.set(this.b.subarray(-32768)),this.b.set(n.subarray(a),32768),this.s.z=n.length-a+32768,this.s.i=32766,this.s.w=32768}else this.b.set(n,this.s.z),this.s.z+=n.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},n}();function q(t,n){n||(n={});var r=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=I[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}}(),e=t.length;r.p(t);var i,a=L(t,n,10+((i=n).filename?i.filename.length+1:0),8),s=a.length;return function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&O(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}}(a,n),O(a,s-8,r.d()),O(a,s-4,e),a}var B=function(){function t(t,n){this.c=S(),this.v=1,j.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),j.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=L(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=S();i.p(n.dictionary),O(t,2,i.d())}}(r,this.o),this.v=0),n&&O(r,r.length-4,this.c.d()),this.ondata(r,n)},t}(),G="undefined"!=typeof TextEncoder&&new TextEncoder,H="undefined"!=typeof TextDecoder&&new TextDecoder;try{H.decode(F,{stream:!0})}catch(t){}var J=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||E(5),this.d&&E(4),this.ondata(K(t),this.d=n||!1)},t}();function K(n,r){if(r){for(var e=new t(n.length),i=0;i<n.length;++i)e[i]=n.charCodeAt(i);return e}if(G)return G.encode(n);var a=n.length,s=new t(n.length+(n.length>>1)),o=0,f=function(t){s[o++]=t};for(i=0;i<a;++i){if(o+5>s.length){var h=new t(o+8+(a-i<<1));h.set(s),s=h}var l=n.charCodeAt(i);l<128||r?f(l):l<2048?(f(192|l>>6),f(128|63&l)):l>55295&&l<57344?(f(240|(l=65536+(1047552&l)|1023&n.charCodeAt(++i))>>18),f(128|l>>12&63),f(128|l>>6&63),f(128|63&l)):(f(224|l>>12),f(128|l>>6&63),f(128|63&l))}return b(s,0,o)}const N=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const n=this._hasEvents?",":"";this.stream.push(n+t),this._hasEvents=!0}finish(){this.stream.push("]",!0);const t=function(t){let n=0;for(let r=0,e=t.length;r<e;r++)n+=t[r].length;const r=new Uint8Array(n);for(let n=0,e=0,i=t.length;n<i;n++){const i=t[n];r.set(i,e),e+=i.length}return r}(this._deflatedData);return this._init(),t}_init(){this._hasEvents=!1,this._deflatedData=[],this.deflate=new B,this.deflate.ondata=(t,n)=>{this._deflatedData.push(t)},this.stream=new J(((t,n)=>{this.deflate.push(t,n)})),this.stream.push("[")}},P={clear:()=>{N.clear()},addEvent:t=>N.addEvent(t),finish:()=>N.finish(),compress:t=>function(t){return q(K(t))}(t)};addEventListener("message",(function(t){const n=t.data.method,r=t.data.id,e=t.data.arg;if(n in P&&"function"==typeof P[n])try{const t=P[n](e);postMessage({id:r,method:n,success:!0,response:t})}catch(t){postMessage({id:r,method:n,success:!1,response:t.message}),console.error(t)}})),postMessage({id:void 0,method:"init",success:!0,response:void 0});`;
function e() {
  const e2 = new Blob([r]);
  return URL.createObjectURL(e2);
}
function logInfo(message, shouldAddBreadcrumb) {
  if (!DEBUG_BUILD5) {
    return;
  }
  logger.info(message);
  if (shouldAddBreadcrumb) {
    addLogBreadcrumb(message);
  }
}
function logInfoNextTick(message, shouldAddBreadcrumb) {
  if (!DEBUG_BUILD5) {
    return;
  }
  logger.info(message);
  if (shouldAddBreadcrumb) {
    setTimeout(() => {
      addLogBreadcrumb(message);
    }, 0);
  }
}
function addLogBreadcrumb(message) {
  addBreadcrumb(
    {
      category: "console",
      data: {
        logger: "replay"
      },
      level: "info",
      message
    },
    { level: "info" }
  );
}
var EventBufferSizeExceededError = class extends Error {
  constructor() {
    super(`Event buffer exceeded maximum size of ${REPLAY_MAX_EVENT_BUFFER_SIZE}.`);
  }
};
var EventBufferArray = class {
  /** All the events that are buffered to be sent. */
  /** @inheritdoc */
  constructor() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return this.events.length > 0;
  }
  /** @inheritdoc */
  get type() {
    return "sync";
  }
  /** @inheritdoc */
  destroy() {
    this.events = [];
  }
  /** @inheritdoc */
  async addEvent(event) {
    const eventSize = JSON.stringify(event).length;
    this._totalSize += eventSize;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      throw new EventBufferSizeExceededError();
    }
    this.events.push(event);
  }
  /** @inheritdoc */
  finish() {
    return new Promise((resolve2) => {
      const eventsRet = this.events;
      this.clear();
      resolve2(JSON.stringify(eventsRet));
    });
  }
  /** @inheritdoc */
  clear() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    const timestamp = this.events.map((event) => event.timestamp).sort()[0];
    if (!timestamp) {
      return null;
    }
    return timestampToMs(timestamp);
  }
};
var WorkerHandler = class {
  constructor(worker) {
    this._worker = worker;
    this._id = 0;
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occured.
   */
  ensureReady() {
    if (this._ensureReadyPromise) {
      return this._ensureReadyPromise;
    }
    this._ensureReadyPromise = new Promise((resolve2, reject) => {
      this._worker.addEventListener(
        "message",
        ({ data }) => {
          if (data.success) {
            resolve2();
          } else {
            reject();
          }
        },
        { once: true }
      );
      this._worker.addEventListener(
        "error",
        (error) => {
          reject(error);
        },
        { once: true }
      );
    });
    return this._ensureReadyPromise;
  }
  /**
   * Destroy the worker.
   */
  destroy() {
    logInfo("[Replay] Destroying compression worker");
    this._worker.terminate();
  }
  /**
   * Post message to worker and wait for response before resolving promise.
   */
  postMessage(method, arg) {
    const id = this._getAndIncrementId();
    return new Promise((resolve2, reject) => {
      const listener = ({ data }) => {
        const response = data;
        if (response.method !== method) {
          return;
        }
        if (response.id !== id) {
          return;
        }
        this._worker.removeEventListener("message", listener);
        if (!response.success) {
          DEBUG_BUILD5 && logger.error("[Replay]", response.response);
          reject(new Error("Error in compression worker"));
          return;
        }
        resolve2(response.response);
      };
      this._worker.addEventListener("message", listener);
      this._worker.postMessage({ id, method, arg });
    });
  }
  /** Get the current ID and increment it for the next call. */
  _getAndIncrementId() {
    return this._id++;
  }
};
var EventBufferCompressionWorker = class {
  /** @inheritdoc */
  constructor(worker) {
    this._worker = new WorkerHandler(worker);
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return !!this._earliestTimestamp;
  }
  /** @inheritdoc */
  get type() {
    return "worker";
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occured.
   */
  ensureReady() {
    return this._worker.ensureReady();
  }
  /**
   * Destroy the event buffer.
   */
  destroy() {
    this._worker.destroy();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfuly received and processed by worker.
   */
  addEvent(event) {
    const timestamp = timestampToMs(event.timestamp);
    if (!this._earliestTimestamp || timestamp < this._earliestTimestamp) {
      this._earliestTimestamp = timestamp;
    }
    const data = JSON.stringify(event);
    this._totalSize += data.length;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      return Promise.reject(new EventBufferSizeExceededError());
    }
    return this._sendEventToWorker(data);
  }
  /**
   * Finish the event buffer and return the compressed data.
   */
  finish() {
    return this._finishRequest();
  }
  /** @inheritdoc */
  clear() {
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
    this._worker.postMessage("clear").then(null, (e2) => {
      DEBUG_BUILD5 && logger.warn('[Replay] Sending "clear" message to worker failed', e2);
    });
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._earliestTimestamp;
  }
  /**
   * Send the event to the worker.
   */
  _sendEventToWorker(data) {
    return this._worker.postMessage("addEvent", data);
  }
  /**
   * Finish the request and return the compressed data from the worker.
   */
  async _finishRequest() {
    const response = await this._worker.postMessage("finish");
    this._earliestTimestamp = null;
    this._totalSize = 0;
    return response;
  }
};
var EventBufferProxy = class {
  constructor(worker) {
    this._fallback = new EventBufferArray();
    this._compression = new EventBufferCompressionWorker(worker);
    this._used = this._fallback;
    this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded();
  }
  /** @inheritdoc */
  get type() {
    return this._used.type;
  }
  /** @inheritDoc */
  get hasEvents() {
    return this._used.hasEvents;
  }
  /** @inheritdoc */
  get hasCheckout() {
    return this._used.hasCheckout;
  }
  /** @inheritdoc */
  set hasCheckout(value) {
    this._used.hasCheckout = value;
  }
  /** @inheritDoc */
  destroy() {
    this._fallback.destroy();
    this._compression.destroy();
  }
  /** @inheritdoc */
  clear() {
    return this._used.clear();
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._used.getEarliestTimestamp();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfully added.
   */
  addEvent(event) {
    return this._used.addEvent(event);
  }
  /** @inheritDoc */
  async finish() {
    await this.ensureWorkerIsLoaded();
    return this._used.finish();
  }
  /** Ensure the worker has loaded. */
  ensureWorkerIsLoaded() {
    return this._ensureWorkerIsLoadedPromise;
  }
  /** Actually check if the worker has been loaded. */
  async _ensureWorkerIsLoaded() {
    try {
      await this._compression.ensureReady();
    } catch (error) {
      logInfo("[Replay] Failed to load the compression worker, falling back to simple buffer");
      return;
    }
    await this._switchToCompressionWorker();
  }
  /** Switch the used buffer to the compression worker. */
  async _switchToCompressionWorker() {
    const { events, hasCheckout } = this._fallback;
    const addEventPromises = [];
    for (const event of events) {
      addEventPromises.push(this._compression.addEvent(event));
    }
    this._compression.hasCheckout = hasCheckout;
    this._used = this._compression;
    try {
      await Promise.all(addEventPromises);
    } catch (error) {
      DEBUG_BUILD5 && logger.warn("[Replay] Failed to add events when switching buffers.", error);
    }
  }
};
function createEventBuffer({
  useCompression,
  workerUrl: customWorkerUrl
}) {
  if (useCompression && // eslint-disable-next-line no-restricted-globals
  window.Worker) {
    const worker = _loadWorker(customWorkerUrl);
    if (worker) {
      return worker;
    }
  }
  logInfo("[Replay] Using simple buffer");
  return new EventBufferArray();
}
function _loadWorker(customWorkerUrl) {
  try {
    const workerUrl = customWorkerUrl || _getWorkerUrl();
    if (!workerUrl) {
      return;
    }
    logInfo(`[Replay] Using compression worker${customWorkerUrl ? ` from ${customWorkerUrl}` : ""}`);
    const worker = new Worker(workerUrl);
    return new EventBufferProxy(worker);
  } catch (error) {
    logInfo("[Replay] Failed to create compression worker");
  }
}
function _getWorkerUrl() {
  if (typeof __SENTRY_EXCLUDE_REPLAY_WORKER__ === "undefined" || !__SENTRY_EXCLUDE_REPLAY_WORKER__) {
    return e();
  }
  return "";
}
function hasSessionStorage() {
  try {
    return "sessionStorage" in WINDOW9 && !!WINDOW9.sessionStorage;
  } catch (e2) {
    return false;
  }
}
function clearSession(replay) {
  deleteSession();
  replay.session = void 0;
}
function deleteSession() {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW9.sessionStorage.removeItem(REPLAY_SESSION_KEY);
  } catch (e2) {
  }
}
function isSampled(sampleRate) {
  if (sampleRate === void 0) {
    return false;
  }
  return Math.random() < sampleRate;
}
function makeSession2(session) {
  const now = Date.now();
  const id = session.id || uuid4();
  const started = session.started || now;
  const lastActivity = session.lastActivity || now;
  const segmentId = session.segmentId || 0;
  const sampled = session.sampled;
  const previousSessionId = session.previousSessionId;
  return {
    id,
    started,
    lastActivity,
    segmentId,
    sampled,
    previousSessionId
  };
}
function saveSession(session) {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW9.sessionStorage.setItem(REPLAY_SESSION_KEY, JSON.stringify(session));
  } catch (e2) {
  }
}
function getSessionSampleType(sessionSampleRate, allowBuffering) {
  return isSampled(sessionSampleRate) ? "session" : allowBuffering ? "buffer" : false;
}
function createSession({ sessionSampleRate, allowBuffering, stickySession = false }, { previousSessionId } = {}) {
  const sampled = getSessionSampleType(sessionSampleRate, allowBuffering);
  const session = makeSession2({
    sampled,
    previousSessionId
  });
  if (stickySession) {
    saveSession(session);
  }
  return session;
}
function fetchSession(traceInternals) {
  if (!hasSessionStorage()) {
    return null;
  }
  try {
    const sessionStringFromStorage = WINDOW9.sessionStorage.getItem(REPLAY_SESSION_KEY);
    if (!sessionStringFromStorage) {
      return null;
    }
    const sessionObj = JSON.parse(sessionStringFromStorage);
    logInfoNextTick("[Replay] Loading existing session", traceInternals);
    return makeSession2(sessionObj);
  } catch (e2) {
    return null;
  }
}
function isExpired(initialTime, expiry, targetTime = +/* @__PURE__ */ new Date()) {
  if (initialTime === null || expiry === void 0 || expiry < 0) {
    return true;
  }
  if (expiry === 0) {
    return false;
  }
  return initialTime + expiry <= targetTime;
}
function isSessionExpired(session, {
  maxReplayDuration,
  sessionIdleExpire,
  targetTime = Date.now()
}) {
  return (
    // First, check that maximum session length has not been exceeded
    isExpired(session.started, maxReplayDuration, targetTime) || // check that the idle timeout has not been exceeded (i.e. user has
    // performed an action within the last `sessionIdleExpire` ms)
    isExpired(session.lastActivity, sessionIdleExpire, targetTime)
  );
}
function shouldRefreshSession(session, { sessionIdleExpire, maxReplayDuration }) {
  if (!isSessionExpired(session, { sessionIdleExpire, maxReplayDuration })) {
    return false;
  }
  if (session.sampled === "buffer" && session.segmentId === 0) {
    return false;
  }
  return true;
}
function loadOrCreateSession({
  traceInternals,
  sessionIdleExpire,
  maxReplayDuration,
  previousSessionId
}, sessionOptions) {
  const existingSession = sessionOptions.stickySession && fetchSession(traceInternals);
  if (!existingSession) {
    logInfoNextTick("[Replay] Creating new session", traceInternals);
    return createSession(sessionOptions, { previousSessionId });
  }
  if (!shouldRefreshSession(existingSession, { sessionIdleExpire, maxReplayDuration })) {
    return existingSession;
  }
  logInfoNextTick("[Replay] Session in sessionStorage is expired, creating new one...");
  return createSession(sessionOptions, { previousSessionId: existingSession.id });
}
function isCustomEvent(event) {
  return event.type === EventType.Custom;
}
function addEventSync(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return false;
  }
  _addEvent(replay, event, isCheckout);
  return true;
}
function addEvent(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return Promise.resolve(null);
  }
  return _addEvent(replay, event, isCheckout);
}
async function _addEvent(replay, event, isCheckout) {
  if (!replay.eventBuffer) {
    return null;
  }
  try {
    if (isCheckout && replay.recordingMode === "buffer") {
      replay.eventBuffer.clear();
    }
    if (isCheckout) {
      replay.eventBuffer.hasCheckout = true;
    }
    const replayOptions = replay.getOptions();
    const eventAfterPossibleCallback = maybeApplyCallback(event, replayOptions.beforeAddRecordingEvent);
    if (!eventAfterPossibleCallback) {
      return;
    }
    return await replay.eventBuffer.addEvent(eventAfterPossibleCallback);
  } catch (error) {
    const reason = error && error instanceof EventBufferSizeExceededError ? "addEventSizeExceeded" : "addEvent";
    DEBUG_BUILD5 && logger.error(error);
    await replay.stop({ reason });
    const client = getClient();
    if (client) {
      client.recordDroppedEvent("internal_sdk_error", "replay");
    }
  }
}
function shouldAddEvent(replay, event) {
  if (!replay.eventBuffer || replay.isPaused() || !replay.isEnabled()) {
    return false;
  }
  const timestampInMs = timestampToMs(event.timestamp);
  if (timestampInMs + replay.timeouts.sessionIdlePause < Date.now()) {
    return false;
  }
  if (timestampInMs > replay.getContext().initialTimestamp + replay.getOptions().maxReplayDuration) {
    logInfo(
      `[Replay] Skipping event with timestamp ${timestampInMs} because it is after maxReplayDuration`,
      replay.getOptions()._experiments.traceInternals
    );
    return false;
  }
  return true;
}
function maybeApplyCallback(event, callback) {
  try {
    if (typeof callback === "function" && isCustomEvent(event)) {
      return callback(event);
    }
  } catch (error) {
    DEBUG_BUILD5 && logger.error("[Replay] An error occured in the `beforeAddRecordingEvent` callback, skipping the event...", error);
    return null;
  }
  return event;
}
function isErrorEvent3(event) {
  return !event.type;
}
function isTransactionEvent2(event) {
  return event.type === "transaction";
}
function isReplayEvent(event) {
  return event.type === "replay_event";
}
function isFeedbackEvent(event) {
  return event.type === "feedback";
}
function handleAfterSendEvent(replay) {
  const enforceStatusCode = isBaseTransportSend();
  return (event, sendResponse) => {
    if (!replay.isEnabled() || !isErrorEvent3(event) && !isTransactionEvent2(event)) {
      return;
    }
    const statusCode = sendResponse && sendResponse.statusCode;
    if (enforceStatusCode && (!statusCode || statusCode < 200 || statusCode >= 300)) {
      return;
    }
    if (isTransactionEvent2(event)) {
      handleTransactionEvent(replay, event);
      return;
    }
    handleErrorEvent(replay, event);
  };
}
function handleTransactionEvent(replay, event) {
  const replayContext = replay.getContext();
  if (event.contexts && event.contexts.trace && event.contexts.trace.trace_id && replayContext.traceIds.size < 100) {
    replayContext.traceIds.add(event.contexts.trace.trace_id);
  }
}
function handleErrorEvent(replay, event) {
  const replayContext = replay.getContext();
  if (event.event_id && replayContext.errorIds.size < 100) {
    replayContext.errorIds.add(event.event_id);
  }
  if (replay.recordingMode !== "buffer" || !event.tags || !event.tags.replayId) {
    return;
  }
  const { beforeErrorSampling } = replay.getOptions();
  if (typeof beforeErrorSampling === "function" && !beforeErrorSampling(event)) {
    return;
  }
  setTimeout(() => {
    replay.sendBufferedReplayOrFlush();
  });
}
function isBaseTransportSend() {
  const client = getClient();
  if (!client) {
    return false;
  }
  const transport = client.getTransport();
  if (!transport) {
    return false;
  }
  return transport.send.__sentry__baseTransport__ || false;
}
function handleBeforeSendEvent(replay) {
  return (event) => {
    if (!replay.isEnabled() || !isErrorEvent3(event)) {
      return;
    }
    handleHydrationError(replay, event);
  };
}
function handleHydrationError(replay, event) {
  const exceptionValue = event.exception && event.exception.values && event.exception.values[0].value;
  if (typeof exceptionValue !== "string") {
    return;
  }
  if (
    // Only matches errors in production builds of react-dom
    // Example https://reactjs.org/docs/error-decoder.html?invariant=423
    exceptionValue.match(/reactjs\.org\/docs\/error-decoder\.html\?invariant=(418|419|422|423|425)/) || // Development builds of react-dom
    // Error 1: Hydration failed because the initial UI does not match what was rendered on the server.
    // Error 2: Text content does not match server-rendered HTML. Warning: Text content did not match.
    exceptionValue.match(/(does not match server-rendered HTML|Hydration failed because)/i)
  ) {
    const breadcrumb = createBreadcrumb({
      category: "replay.hydrate-error"
    });
    addBreadcrumbEvent(replay, breadcrumb);
  }
}
function isRrwebError(event, hint) {
  if (event.type || !event.exception || !event.exception.values || !event.exception.values.length) {
    return false;
  }
  if (hint.originalException && hint.originalException.__rrweb__) {
    return true;
  }
  return false;
}
function addFeedbackBreadcrumb(replay, event) {
  replay.triggerUserActivity();
  replay.addUpdate(() => {
    if (!event.timestamp) {
      return true;
    }
    replay.throttledAddEvent({
      type: EventType.Custom,
      timestamp: event.timestamp * 1e3,
      data: {
        tag: "breadcrumb",
        payload: {
          timestamp: event.timestamp,
          type: "default",
          category: "sentry.feedback",
          data: {
            feedbackId: event.event_id
          }
        }
      }
    });
    return false;
  });
}
function shouldSampleForBufferEvent(replay, event) {
  if (replay.recordingMode !== "buffer") {
    return false;
  }
  if (event.message === UNABLE_TO_SEND_REPLAY) {
    return false;
  }
  if (!event.exception || event.type) {
    return false;
  }
  return isSampled(replay.getOptions().errorSampleRate);
}
function handleGlobalEventListener(replay, includeAfterSendEventHandling = false) {
  const afterSendHandler = includeAfterSendEventHandling ? handleAfterSendEvent(replay) : void 0;
  return Object.assign(
    (event, hint) => {
      if (!replay.isEnabled()) {
        return event;
      }
      if (isReplayEvent(event)) {
        delete event.breadcrumbs;
        return event;
      }
      if (!isErrorEvent3(event) && !isTransactionEvent2(event) && !isFeedbackEvent(event)) {
        return event;
      }
      const isSessionActive = replay.checkAndHandleExpiredSession();
      if (!isSessionActive) {
        return event;
      }
      if (isFeedbackEvent(event)) {
        replay.flush();
        event.contexts.feedback.replay_id = replay.getSessionId();
        addFeedbackBreadcrumb(replay, event);
        return event;
      }
      if (isRrwebError(event, hint) && !replay.getOptions()._experiments.captureExceptions) {
        DEBUG_BUILD5 && logger.log("[Replay] Ignoring error from rrweb internals", event);
        return null;
      }
      const isErrorEventSampled = shouldSampleForBufferEvent(replay, event);
      const shouldTagReplayId = isErrorEventSampled || replay.recordingMode === "session";
      if (shouldTagReplayId) {
        event.tags = { ...event.tags, replayId: replay.getSessionId() };
      }
      if (afterSendHandler) {
        afterSendHandler(event, { statusCode: 200 });
      }
      return event;
    },
    { id: "Replay" }
  );
}
function createPerformanceSpans(replay, entries) {
  return entries.map(({ type, start, end, name, data }) => {
    const response = replay.throttledAddEvent({
      type: EventType.Custom,
      timestamp: start,
      data: {
        tag: "performanceSpan",
        payload: {
          op: type,
          description: name,
          startTimestamp: start,
          endTimestamp: end,
          data
        }
      }
    });
    return typeof response === "string" ? Promise.resolve(null) : response;
  });
}
function handleHistory(handlerData) {
  const { from, to } = handlerData;
  const now = Date.now() / 1e3;
  return {
    type: "navigation.push",
    start: now,
    end: now,
    name: to,
    data: {
      previous: from
    }
  };
}
function handleHistorySpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleHistory(handlerData);
    if (result === null) {
      return;
    }
    replay.getContext().urls.push(result.name);
    replay.triggerUserActivity();
    replay.addUpdate(() => {
      createPerformanceSpans(replay, [result]);
      return false;
    });
  };
}
function shouldFilterRequest(replay, url) {
  if (DEBUG_BUILD5 && replay.getOptions()._experiments.traceInternals) {
    return false;
  }
  return isSentryRequestUrl(url, getClient());
}
function addNetworkBreadcrumb(replay, result) {
  if (!replay.isEnabled()) {
    return;
  }
  if (result === null) {
    return;
  }
  if (shouldFilterRequest(replay, result.name)) {
    return;
  }
  replay.addUpdate(() => {
    createPerformanceSpans(replay, [result]);
    return true;
  });
}
function handleFetch(handlerData) {
  const { startTimestamp, endTimestamp, fetchData, response } = handlerData;
  if (!endTimestamp) {
    return null;
  }
  const { method, url } = fetchData;
  return {
    type: "resource.fetch",
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    name: url,
    data: {
      method,
      statusCode: response ? response.status : void 0
    }
  };
}
function handleFetchSpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleFetch(handlerData);
    addNetworkBreadcrumb(replay, result);
  };
}
function handleXhr(handlerData) {
  const { startTimestamp, endTimestamp, xhr } = handlerData;
  const sentryXhrData = xhr[SENTRY_XHR_DATA_KEY];
  if (!startTimestamp || !endTimestamp || !sentryXhrData) {
    return null;
  }
  const { method, url, status_code: statusCode } = sentryXhrData;
  if (url === void 0) {
    return null;
  }
  return {
    type: "resource.xhr",
    name: url,
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    data: {
      method,
      statusCode
    }
  };
}
function handleXhrSpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleXhr(handlerData);
    addNetworkBreadcrumb(replay, result);
  };
}
function getBodySize(body, textEncoder) {
  if (!body) {
    return void 0;
  }
  try {
    if (typeof body === "string") {
      return textEncoder.encode(body).length;
    }
    if (body instanceof URLSearchParams) {
      return textEncoder.encode(body.toString()).length;
    }
    if (body instanceof FormData) {
      const formDataStr = _serializeFormData(body);
      return textEncoder.encode(formDataStr).length;
    }
    if (body instanceof Blob) {
      return body.size;
    }
    if (body instanceof ArrayBuffer) {
      return body.byteLength;
    }
  } catch (e2) {
  }
  return void 0;
}
function parseContentLengthHeader(header) {
  if (!header) {
    return void 0;
  }
  const size = parseInt(header, 10);
  return isNaN(size) ? void 0 : size;
}
function getBodyString(body) {
  try {
    if (typeof body === "string") {
      return [body];
    }
    if (body instanceof URLSearchParams) {
      return [body.toString()];
    }
    if (body instanceof FormData) {
      return [_serializeFormData(body)];
    }
    if (!body) {
      return [void 0];
    }
  } catch (e2) {
    DEBUG_BUILD5 && logger.warn("[Replay] Failed to serialize body", body);
    return [void 0, "BODY_PARSE_ERROR"];
  }
  DEBUG_BUILD5 && logger.info("[Replay] Skipping network body because of body type", body);
  return [void 0, "UNPARSEABLE_BODY_TYPE"];
}
function mergeWarning(info, warning) {
  if (!info) {
    return {
      headers: {},
      size: void 0,
      _meta: {
        warnings: [warning]
      }
    };
  }
  const newMeta = { ...info._meta };
  const existingWarnings = newMeta.warnings || [];
  newMeta.warnings = [...existingWarnings, warning];
  info._meta = newMeta;
  return info;
}
function makeNetworkReplayBreadcrumb(type, data) {
  if (!data) {
    return null;
  }
  const { startTimestamp, endTimestamp, url, method, statusCode, request, response } = data;
  const result = {
    type,
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    name: url,
    data: dropUndefinedKeys({
      method,
      statusCode,
      request,
      response
    })
  };
  return result;
}
function buildSkippedNetworkRequestOrResponse(bodySize) {
  return {
    headers: {},
    size: bodySize,
    _meta: {
      warnings: ["URL_SKIPPED"]
    }
  };
}
function buildNetworkRequestOrResponse(headers, bodySize, body) {
  if (!bodySize && Object.keys(headers).length === 0) {
    return void 0;
  }
  if (!bodySize) {
    return {
      headers
    };
  }
  if (!body) {
    return {
      headers,
      size: bodySize
    };
  }
  const info = {
    headers,
    size: bodySize
  };
  const { body: normalizedBody, warnings } = normalizeNetworkBody(body);
  info.body = normalizedBody;
  if (warnings && warnings.length > 0) {
    info._meta = {
      warnings
    };
  }
  return info;
}
function getAllowedHeaders(headers, allowedHeaders) {
  return Object.keys(headers).reduce((filteredHeaders, key) => {
    const normalizedKey = key.toLowerCase();
    if (allowedHeaders.includes(normalizedKey) && headers[key]) {
      filteredHeaders[normalizedKey] = headers[key];
    }
    return filteredHeaders;
  }, {});
}
function _serializeFormData(formData) {
  return new URLSearchParams(formData).toString();
}
function normalizeNetworkBody(body) {
  if (!body || typeof body !== "string") {
    return {
      body
    };
  }
  const exceedsSizeLimit = body.length > NETWORK_BODY_MAX_SIZE;
  const isProbablyJson = _strIsProbablyJson(body);
  if (exceedsSizeLimit) {
    const truncatedBody = body.slice(0, NETWORK_BODY_MAX_SIZE);
    if (isProbablyJson) {
      return {
        body: truncatedBody,
        warnings: ["MAYBE_JSON_TRUNCATED"]
      };
    }
    return {
      body: `${truncatedBody}…`,
      warnings: ["TEXT_TRUNCATED"]
    };
  }
  if (isProbablyJson) {
    try {
      const jsonBody = JSON.parse(body);
      return {
        body: jsonBody
      };
    } catch (e3) {
    }
  }
  return {
    body
  };
}
function _strIsProbablyJson(str) {
  const first = str[0];
  const last = str[str.length - 1];
  return first === "[" && last === "]" || first === "{" && last === "}";
}
function urlMatches(url, urls) {
  const fullUrl = getFullUrl(url);
  return stringMatchesSomePattern(fullUrl, urls);
}
function getFullUrl(url, baseURI = WINDOW9.document.baseURI) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith(WINDOW9.location.origin)) {
    return url;
  }
  const fixedUrl = new URL(url, baseURI);
  if (fixedUrl.origin !== new URL(baseURI).origin) {
    return url;
  }
  const fullUrl = fixedUrl.href;
  if (!url.endsWith("/") && fullUrl.endsWith("/")) {
    return fullUrl.slice(0, -1);
  }
  return fullUrl;
}
async function captureFetchBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = await _prepareFetchData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.fetch", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    DEBUG_BUILD5 && logger.error("[Replay] Failed to capture fetch breadcrumb", error);
  }
}
function enrichFetchBreadcrumb(breadcrumb, hint, options) {
  const { input, response } = hint;
  const body = input ? _getFetchRequestArgBody(input) : void 0;
  const reqSize = getBodySize(body, options.textEncoder);
  const resSize = response ? parseContentLengthHeader(response.headers.get("content-length")) : void 0;
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
async function _prepareFetchData(breadcrumb, hint, options) {
  const now = Date.now();
  const { startTimestamp = now, endTimestamp = now } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  const captureDetails = urlMatches(url, options.networkDetailAllowUrls) && !urlMatches(url, options.networkDetailDenyUrls);
  const request = captureDetails ? _getRequestInfo(options, hint.input, requestBodySize) : buildSkippedNetworkRequestOrResponse(requestBodySize);
  const response = await _getResponseInfo(captureDetails, options, hint.response, responseBodySize);
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request,
    response
  };
}
function _getRequestInfo({ networkCaptureBodies, networkRequestHeaders }, input, requestBodySize) {
  const headers = input ? getRequestHeaders(input, networkRequestHeaders) : {};
  if (!networkCaptureBodies) {
    return buildNetworkRequestOrResponse(headers, requestBodySize, void 0);
  }
  const requestBody = _getFetchRequestArgBody(input);
  const [bodyStr, warning] = getBodyString(requestBody);
  const data = buildNetworkRequestOrResponse(headers, requestBodySize, bodyStr);
  if (warning) {
    return mergeWarning(data, warning);
  }
  return data;
}
async function _getResponseInfo(captureDetails, {
  networkCaptureBodies,
  textEncoder,
  networkResponseHeaders
}, response, responseBodySize) {
  if (!captureDetails && responseBodySize !== void 0) {
    return buildSkippedNetworkRequestOrResponse(responseBodySize);
  }
  const headers = response ? getAllHeaders(response.headers, networkResponseHeaders) : {};
  if (!response || !networkCaptureBodies && responseBodySize !== void 0) {
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
  const [bodyText, warning] = await _parseFetchResponseBody(response);
  const result = getResponseData(bodyText, {
    networkCaptureBodies,
    textEncoder,
    responseBodySize,
    captureDetails,
    headers
  });
  if (warning) {
    return mergeWarning(result, warning);
  }
  return result;
}
function getResponseData(bodyText, {
  networkCaptureBodies,
  textEncoder,
  responseBodySize,
  captureDetails,
  headers
}) {
  try {
    const size = bodyText && bodyText.length && responseBodySize === void 0 ? getBodySize(bodyText, textEncoder) : responseBodySize;
    if (!captureDetails) {
      return buildSkippedNetworkRequestOrResponse(size);
    }
    if (networkCaptureBodies) {
      return buildNetworkRequestOrResponse(headers, size, bodyText);
    }
    return buildNetworkRequestOrResponse(headers, size, void 0);
  } catch (error) {
    DEBUG_BUILD5 && logger.warn("[Replay] Failed to serialize response body", error);
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
}
async function _parseFetchResponseBody(response) {
  const res = _tryCloneResponse(response);
  if (!res) {
    return [void 0, "BODY_PARSE_ERROR"];
  }
  try {
    const text = await _tryGetResponseText(res);
    return [text];
  } catch (error) {
    DEBUG_BUILD5 && logger.warn("[Replay] Failed to get text body from response", error);
    return [void 0, "BODY_PARSE_ERROR"];
  }
}
function _getFetchRequestArgBody(fetchArgs = []) {
  if (fetchArgs.length !== 2 || typeof fetchArgs[1] !== "object") {
    return void 0;
  }
  return fetchArgs[1].body;
}
function getAllHeaders(headers, allowedHeaders) {
  const allHeaders = {};
  allowedHeaders.forEach((header) => {
    if (headers.get(header)) {
      allHeaders[header] = headers.get(header);
    }
  });
  return allHeaders;
}
function getRequestHeaders(fetchArgs, allowedHeaders) {
  if (fetchArgs.length === 1 && typeof fetchArgs[0] !== "string") {
    return getHeadersFromOptions(fetchArgs[0], allowedHeaders);
  }
  if (fetchArgs.length === 2) {
    return getHeadersFromOptions(fetchArgs[1], allowedHeaders);
  }
  return {};
}
function getHeadersFromOptions(input, allowedHeaders) {
  if (!input) {
    return {};
  }
  const headers = input.headers;
  if (!headers) {
    return {};
  }
  if (headers instanceof Headers) {
    return getAllHeaders(headers, allowedHeaders);
  }
  if (Array.isArray(headers)) {
    return {};
  }
  return getAllowedHeaders(headers, allowedHeaders);
}
function _tryCloneResponse(response) {
  try {
    return response.clone();
  } catch (error) {
    DEBUG_BUILD5 && logger.warn("[Replay] Failed to clone response body", error);
  }
}
function _tryGetResponseText(response) {
  return new Promise((resolve2, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timeout while trying to read response body")), 500);
    _getResponseText(response).then(
      (txt) => resolve2(txt),
      (reason) => reject(reason)
    ).finally(() => clearTimeout(timeout));
  });
}
async function _getResponseText(response) {
  return await response.text();
}
async function captureXhrBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = _prepareXhrData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.xhr", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    DEBUG_BUILD5 && logger.error("[Replay] Failed to capture xhr breadcrumb", error);
  }
}
function enrichXhrBreadcrumb(breadcrumb, hint, options) {
  const { xhr, input } = hint;
  if (!xhr) {
    return;
  }
  const reqSize = getBodySize(input, options.textEncoder);
  const resSize = xhr.getResponseHeader("content-length") ? parseContentLengthHeader(xhr.getResponseHeader("content-length")) : _getBodySize(xhr.response, xhr.responseType, options.textEncoder);
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
function _prepareXhrData(breadcrumb, hint, options) {
  const now = Date.now();
  const { startTimestamp = now, endTimestamp = now, input, xhr } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  if (!url) {
    return null;
  }
  if (!xhr || !urlMatches(url, options.networkDetailAllowUrls) || urlMatches(url, options.networkDetailDenyUrls)) {
    const request2 = buildSkippedNetworkRequestOrResponse(requestBodySize);
    const response2 = buildSkippedNetworkRequestOrResponse(responseBodySize);
    return {
      startTimestamp,
      endTimestamp,
      url,
      method,
      statusCode,
      request: request2,
      response: response2
    };
  }
  const xhrInfo = xhr[SENTRY_XHR_DATA_KEY];
  const networkRequestHeaders = xhrInfo ? getAllowedHeaders(xhrInfo.request_headers, options.networkRequestHeaders) : {};
  const networkResponseHeaders = getAllowedHeaders(getResponseHeaders(xhr), options.networkResponseHeaders);
  const [requestBody, requestWarning] = options.networkCaptureBodies ? getBodyString(input) : [void 0];
  const [responseBody, responseWarning] = options.networkCaptureBodies ? _getXhrResponseBody(xhr) : [void 0];
  const request = buildNetworkRequestOrResponse(networkRequestHeaders, requestBodySize, requestBody);
  const response = buildNetworkRequestOrResponse(networkResponseHeaders, responseBodySize, responseBody);
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request: requestWarning ? mergeWarning(request, requestWarning) : request,
    response: responseWarning ? mergeWarning(response, responseWarning) : response
  };
}
function getResponseHeaders(xhr) {
  const headers = xhr.getAllResponseHeaders();
  if (!headers) {
    return {};
  }
  return headers.split("\r\n").reduce((acc, line) => {
    const [key, value] = line.split(": ");
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
}
function _getXhrResponseBody(xhr) {
  const errors = [];
  try {
    return [xhr.responseText];
  } catch (e2) {
    errors.push(e2);
  }
  try {
    return _parseXhrResponse(xhr.response, xhr.responseType);
  } catch (e2) {
    errors.push(e2);
  }
  DEBUG_BUILD5 && logger.warn("[Replay] Failed to get xhr response body", ...errors);
  return [void 0];
}
function _parseXhrResponse(body, responseType) {
  try {
    if (typeof body === "string") {
      return [body];
    }
    if (body instanceof Document) {
      return [body.body.outerHTML];
    }
    if (responseType === "json" && body && typeof body === "object") {
      return [JSON.stringify(body)];
    }
    if (!body) {
      return [void 0];
    }
  } catch (e2) {
    DEBUG_BUILD5 && logger.warn("[Replay] Failed to serialize body", body);
    return [void 0, "BODY_PARSE_ERROR"];
  }
  DEBUG_BUILD5 && logger.info("[Replay] Skipping network body because of body type", body);
  return [void 0, "UNPARSEABLE_BODY_TYPE"];
}
function _getBodySize(body, responseType, textEncoder) {
  try {
    const bodyStr = responseType === "json" && body && typeof body === "object" ? JSON.stringify(body) : body;
    return getBodySize(bodyStr, textEncoder);
  } catch (e3) {
    return void 0;
  }
}
function handleNetworkBreadcrumbs(replay) {
  const client = getClient();
  try {
    const textEncoder = new TextEncoder();
    const {
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    } = replay.getOptions();
    const options = {
      replay,
      textEncoder,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    };
    if (client && client.on) {
      client.on("beforeAddBreadcrumb", (breadcrumb, hint) => beforeAddNetworkBreadcrumb(options, breadcrumb, hint));
    } else {
      addFetchInstrumentationHandler(handleFetchSpanListener(replay));
      addXhrInstrumentationHandler(handleXhrSpanListener(replay));
    }
  } catch (e2) {
  }
}
function beforeAddNetworkBreadcrumb(options, breadcrumb, hint) {
  if (!breadcrumb.data) {
    return;
  }
  try {
    if (_isXhrBreadcrumb(breadcrumb) && _isXhrHint(hint)) {
      enrichXhrBreadcrumb(breadcrumb, hint, options);
      captureXhrBreadcrumbToReplay(breadcrumb, hint, options);
    }
    if (_isFetchBreadcrumb(breadcrumb) && _isFetchHint(hint)) {
      enrichFetchBreadcrumb(breadcrumb, hint, options);
      captureFetchBreadcrumbToReplay(breadcrumb, hint, options);
    }
  } catch (e2) {
    DEBUG_BUILD5 && logger.warn("Error when enriching network breadcrumb");
  }
}
function _isXhrBreadcrumb(breadcrumb) {
  return breadcrumb.category === "xhr";
}
function _isFetchBreadcrumb(breadcrumb) {
  return breadcrumb.category === "fetch";
}
function _isXhrHint(hint) {
  return hint && hint.xhr;
}
function _isFetchHint(hint) {
  return hint && hint.response;
}
var _LAST_BREADCRUMB = null;
function isBreadcrumbWithCategory(breadcrumb) {
  return !!breadcrumb.category;
}
var handleScopeListener = (replay) => (scope) => {
  if (!replay.isEnabled()) {
    return;
  }
  const result = handleScope(scope);
  if (!result) {
    return;
  }
  addBreadcrumbEvent(replay, result);
};
function handleScope(scope) {
  const newBreadcrumb = scope.getLastBreadcrumb && scope.getLastBreadcrumb();
  if (_LAST_BREADCRUMB === newBreadcrumb || !newBreadcrumb) {
    return null;
  }
  _LAST_BREADCRUMB = newBreadcrumb;
  if (!isBreadcrumbWithCategory(newBreadcrumb) || ["fetch", "xhr", "sentry.event", "sentry.transaction"].includes(newBreadcrumb.category) || newBreadcrumb.category.startsWith("ui.")) {
    return null;
  }
  if (newBreadcrumb.category === "console") {
    return normalizeConsoleBreadcrumb(newBreadcrumb);
  }
  return createBreadcrumb(newBreadcrumb);
}
function normalizeConsoleBreadcrumb(breadcrumb) {
  const args = breadcrumb.data && breadcrumb.data.arguments;
  if (!Array.isArray(args) || args.length === 0) {
    return createBreadcrumb(breadcrumb);
  }
  let isTruncated = false;
  const normalizedArgs = args.map((arg) => {
    if (!arg) {
      return arg;
    }
    if (typeof arg === "string") {
      if (arg.length > CONSOLE_ARG_MAX_SIZE) {
        isTruncated = true;
        return `${arg.slice(0, CONSOLE_ARG_MAX_SIZE)}…`;
      }
      return arg;
    }
    if (typeof arg === "object") {
      try {
        const normalizedArg = normalize(arg, 7);
        const stringified = JSON.stringify(normalizedArg);
        if (stringified.length > CONSOLE_ARG_MAX_SIZE) {
          isTruncated = true;
          return `${JSON.stringify(normalizedArg, null, 2).slice(0, CONSOLE_ARG_MAX_SIZE)}…`;
        }
        return normalizedArg;
      } catch (e2) {
      }
    }
    return arg;
  });
  return createBreadcrumb({
    ...breadcrumb,
    data: {
      ...breadcrumb.data,
      arguments: normalizedArgs,
      ...isTruncated ? { _meta: { warnings: ["CONSOLE_ARG_TRUNCATED"] } } : {}
    }
  });
}
function addGlobalListeners(replay) {
  const scope = getCurrentScope();
  const client = getClient();
  scope.addScopeListener(handleScopeListener(replay));
  addClickKeypressInstrumentationHandler(handleDomListener(replay));
  addHistoryInstrumentationHandler(handleHistorySpanListener(replay));
  handleNetworkBreadcrumbs(replay);
  const eventProcessor = handleGlobalEventListener(replay, !hasHooks(client));
  if (client && client.addEventProcessor) {
    client.addEventProcessor(eventProcessor);
  } else {
    addEventProcessor(eventProcessor);
  }
  if (hasHooks(client)) {
    client.on("beforeSendEvent", handleBeforeSendEvent(replay));
    client.on("afterSendEvent", handleAfterSendEvent(replay));
    client.on("createDsc", (dsc) => {
      const replayId = replay.getSessionId();
      if (replayId && replay.isEnabled() && replay.recordingMode === "session") {
        const isSessionActive = replay.checkAndHandleExpiredSession();
        if (isSessionActive) {
          dsc.replay_id = replayId;
        }
      }
    });
    client.on("startTransaction", (transaction) => {
      replay.lastTransaction = transaction;
    });
    client.on("finishTransaction", (transaction) => {
      replay.lastTransaction = transaction;
    });
    client.on("beforeSendFeedback", (feedbackEvent, options) => {
      const replayId = replay.getSessionId();
      if (options && options.includeReplay && replay.isEnabled() && replayId) {
        if (feedbackEvent.contexts && feedbackEvent.contexts.feedback) {
          feedbackEvent.contexts.feedback.replay_id = replayId;
        }
      }
    });
  }
}
function hasHooks(client) {
  return !!(client && client.on);
}
async function addMemoryEntry(replay) {
  try {
    return Promise.all(
      createPerformanceSpans(replay, [
        // @ts-expect-error memory doesn't exist on type Performance as the API is non-standard (we check that it exists above)
        createMemoryEntry(WINDOW9.performance.memory)
      ])
    );
  } catch (error) {
    return [];
  }
}
function createMemoryEntry(memoryEntry) {
  const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = memoryEntry;
  const time = Date.now() / 1e3;
  return {
    type: "memory",
    name: "memory",
    start: time,
    end: time,
    data: {
      memory: {
        jsHeapSizeLimit,
        totalJSHeapSize,
        usedJSHeapSize
      }
    }
  };
}
function debounce(func, wait, options) {
  let callbackReturnValue;
  let timerId;
  let maxTimerId;
  const maxWait = options && options.maxWait ? Math.max(options.maxWait, wait) : 0;
  function invokeFunc() {
    cancelTimers();
    callbackReturnValue = func();
    return callbackReturnValue;
  }
  function cancelTimers() {
    timerId !== void 0 && clearTimeout(timerId);
    maxTimerId !== void 0 && clearTimeout(maxTimerId);
    timerId = maxTimerId = void 0;
  }
  function flush2() {
    if (timerId !== void 0 || maxTimerId !== void 0) {
      return invokeFunc();
    }
    return callbackReturnValue;
  }
  function debounced() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(invokeFunc, wait);
    if (maxWait && maxTimerId === void 0) {
      maxTimerId = setTimeout(invokeFunc, maxWait);
    }
    return callbackReturnValue;
  }
  debounced.cancel = cancelTimers;
  debounced.flush = flush2;
  return debounced;
}
function getHandleRecordingEmit(replay) {
  let hadFirstEvent = false;
  return (event, _isCheckout) => {
    if (!replay.checkAndHandleExpiredSession()) {
      DEBUG_BUILD5 && logger.warn("[Replay] Received replay event after session expired.");
      return;
    }
    const isCheckout = _isCheckout || !hadFirstEvent;
    hadFirstEvent = true;
    if (replay.clickDetector) {
      updateClickDetectorForRecordingEvent(replay.clickDetector, event);
    }
    replay.addUpdate(() => {
      if (replay.recordingMode === "buffer" && isCheckout) {
        replay.setInitialState();
      }
      if (!addEventSync(replay, event, isCheckout)) {
        return true;
      }
      if (!isCheckout) {
        return false;
      }
      addSettingsEvent(replay, isCheckout);
      if (replay.session && replay.session.previousSessionId) {
        return true;
      }
      if (replay.recordingMode === "buffer" && replay.session && replay.eventBuffer) {
        const earliestEvent = replay.eventBuffer.getEarliestTimestamp();
        if (earliestEvent) {
          logInfo(
            `[Replay] Updating session start time to earliest event in buffer to ${new Date(earliestEvent)}`,
            replay.getOptions()._experiments.traceInternals
          );
          replay.session.started = earliestEvent;
          if (replay.getOptions().stickySession) {
            saveSession(replay.session);
          }
        }
      }
      if (replay.recordingMode === "session") {
        void replay.flush();
      }
      return true;
    });
  };
}
function createOptionsEvent(replay) {
  const options = replay.getOptions();
  return {
    type: EventType.Custom,
    timestamp: Date.now(),
    data: {
      tag: "options",
      payload: {
        shouldRecordCanvas: replay.isRecordingCanvas(),
        sessionSampleRate: options.sessionSampleRate,
        errorSampleRate: options.errorSampleRate,
        useCompressionOption: options.useCompression,
        blockAllMedia: options.blockAllMedia,
        maskAllText: options.maskAllText,
        maskAllInputs: options.maskAllInputs,
        useCompression: replay.eventBuffer ? replay.eventBuffer.type === "worker" : false,
        networkDetailHasUrls: options.networkDetailAllowUrls.length > 0,
        networkCaptureBodies: options.networkCaptureBodies,
        networkRequestHasHeaders: options.networkRequestHeaders.length > 0,
        networkResponseHasHeaders: options.networkResponseHeaders.length > 0
      }
    }
  };
}
function addSettingsEvent(replay, isCheckout) {
  if (!isCheckout || !replay.session || replay.session.segmentId !== 0) {
    return;
  }
  addEventSync(replay, createOptionsEvent(replay), false);
}
function createReplayEnvelope(replayEvent, recordingData, dsn, tunnel) {
  return createEnvelope(
    createEventEnvelopeHeaders(replayEvent, getSdkMetadataForEnvelopeHeader(replayEvent), tunnel, dsn),
    [
      [{ type: "replay_event" }, replayEvent],
      [
        {
          type: "replay_recording",
          // If string then we need to encode to UTF8, otherwise will have
          // wrong size. TextEncoder has similar browser support to
          // MutationObserver, although it does not accept IE11.
          length: typeof recordingData === "string" ? new TextEncoder().encode(recordingData).length : recordingData.length
        },
        recordingData
      ]
    ]
  );
}
function prepareRecordingData({
  recordingData,
  headers
}) {
  let payloadWithSequence;
  const replayHeaders = `${JSON.stringify(headers)}
`;
  if (typeof recordingData === "string") {
    payloadWithSequence = `${replayHeaders}${recordingData}`;
  } else {
    const enc = new TextEncoder();
    const sequence = enc.encode(replayHeaders);
    payloadWithSequence = new Uint8Array(sequence.length + recordingData.length);
    payloadWithSequence.set(sequence);
    payloadWithSequence.set(recordingData, sequence.length);
  }
  return payloadWithSequence;
}
async function prepareReplayEvent({
  client,
  scope,
  replayId: event_id,
  event
}) {
  const integrations = typeof client._integrations === "object" && client._integrations !== null && !Array.isArray(client._integrations) ? Object.keys(client._integrations) : void 0;
  const eventHint = { event_id, integrations };
  if (client.emit) {
    client.emit("preprocessEvent", event, eventHint);
  }
  const preparedEvent = await prepareEvent(
    client.getOptions(),
    event,
    eventHint,
    scope,
    client,
    getIsolationScope()
  );
  if (!preparedEvent) {
    return null;
  }
  preparedEvent.platform = preparedEvent.platform || "javascript";
  const metadata = client.getSdkMetadata && client.getSdkMetadata();
  const { name, version: version2 } = metadata && metadata.sdk || {};
  preparedEvent.sdk = {
    ...preparedEvent.sdk,
    name: name || "sentry.javascript.unknown",
    version: version2 || "0.0.0"
  };
  return preparedEvent;
}
async function sendReplayRequest({
  recordingData,
  replayId,
  segmentId: segment_id,
  eventContext,
  timestamp,
  session
}) {
  const preparedRecordingData = prepareRecordingData({
    recordingData,
    headers: {
      segment_id
    }
  });
  const { urls, errorIds, traceIds, initialTimestamp } = eventContext;
  const client = getClient();
  const scope = getCurrentScope();
  const transport = client && client.getTransport();
  const dsn = client && client.getDsn();
  if (!client || !transport || !dsn || !session.sampled) {
    return;
  }
  const baseEvent = {
    type: REPLAY_EVENT_NAME,
    replay_start_timestamp: initialTimestamp / 1e3,
    timestamp: timestamp / 1e3,
    error_ids: errorIds,
    trace_ids: traceIds,
    urls,
    replay_id: replayId,
    segment_id,
    replay_type: session.sampled
  };
  const replayEvent = await prepareReplayEvent({ scope, client, replayId, event: baseEvent });
  if (!replayEvent) {
    client.recordDroppedEvent("event_processor", "replay", baseEvent);
    logInfo("An event processor returned `null`, will not send event.");
    return;
  }
  delete replayEvent.sdkProcessingMetadata;
  const envelope = createReplayEnvelope(replayEvent, preparedRecordingData, dsn, client.getOptions().tunnel);
  let response;
  try {
    response = await transport.send(envelope);
  } catch (err) {
    const error = new Error(UNABLE_TO_SEND_REPLAY);
    try {
      error.cause = err;
    } catch (e2) {
    }
    throw error;
  }
  if (!response) {
    return response;
  }
  if (typeof response.statusCode === "number" && (response.statusCode < 200 || response.statusCode >= 300)) {
    throw new TransportStatusCodeError(response.statusCode);
  }
  const rateLimits = updateRateLimits({}, response);
  if (isRateLimited(rateLimits, "replay")) {
    throw new RateLimitError(rateLimits);
  }
  return response;
}
var TransportStatusCodeError = class extends Error {
  constructor(statusCode) {
    super(`Transport returned status code ${statusCode}`);
  }
};
var RateLimitError = class extends Error {
  constructor(rateLimits) {
    super("Rate limit hit");
    this.rateLimits = rateLimits;
  }
};
async function sendReplay(replayData, retryConfig = {
  count: 0,
  interval: RETRY_BASE_INTERVAL
}) {
  const { recordingData, options } = replayData;
  if (!recordingData.length) {
    return;
  }
  try {
    await sendReplayRequest(replayData);
    return true;
  } catch (err) {
    if (err instanceof TransportStatusCodeError || err instanceof RateLimitError) {
      throw err;
    }
    setContext("Replays", {
      _retryCount: retryConfig.count
    });
    if (DEBUG_BUILD5 && options._experiments && options._experiments.captureExceptions) {
      captureException(err);
    }
    if (retryConfig.count >= RETRY_MAX_COUNT) {
      const error = new Error(`${UNABLE_TO_SEND_REPLAY} - max retries exceeded`);
      try {
        error.cause = err;
      } catch (e2) {
      }
      throw error;
    }
    retryConfig.interval *= ++retryConfig.count;
    return new Promise((resolve2, reject) => {
      setTimeout(async () => {
        try {
          await sendReplay(replayData, retryConfig);
          resolve2(true);
        } catch (err2) {
          reject(err2);
        }
      }, retryConfig.interval);
    });
  }
}
var THROTTLED = "__THROTTLED";
var SKIPPED = "__SKIPPED";
function throttle(fn, maxCount, durationSeconds) {
  const counter = /* @__PURE__ */ new Map();
  const _cleanup = (now) => {
    const threshold = now - durationSeconds;
    counter.forEach((_value, key) => {
      if (key < threshold) {
        counter.delete(key);
      }
    });
  };
  const _getTotalCount = () => {
    return [...counter.values()].reduce((a, b) => a + b, 0);
  };
  let isThrottled = false;
  return (...rest) => {
    const now = Math.floor(Date.now() / 1e3);
    _cleanup(now);
    if (_getTotalCount() >= maxCount) {
      const wasThrottled = isThrottled;
      isThrottled = true;
      return wasThrottled ? SKIPPED : THROTTLED;
    }
    isThrottled = false;
    const count = counter.get(now) || 0;
    counter.set(now, count + 1);
    return fn(...rest);
  };
}
var ReplayContainer = class _ReplayContainer {
  /**
   * Recording can happen in one of three modes:
   *   - session: Record the whole session, sending it continuously
   *   - buffer: Always keep the last 60s of recording, requires:
   *     - having replaysOnErrorSampleRate > 0 to capture replay when an error occurs
   *     - or calling `flush()` to send the replay
   */
  /**
   * The current or last active transcation.
   * This is only available when performance is enabled.
   */
  /**
   * These are here so we can overwrite them in tests etc.
   * @hidden
   */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Timestamp of the last user activity. This lives across sessions.
   */
  /**
   * Is the integration currently active?
   */
  /**
   * Paused is a state where:
   * - DOM Recording is not listening at all
   * - Nothing will be added to event buffer (e.g. core SDK events)
   */
  /**
   * Have we attached listeners to the core SDK?
   * Note we have to track this as there is no way to remove instrumentation handlers.
   */
  /**
   * Function to stop recording
   */
  /**
   * Internal use for canvas recording options
   */
  constructor({
    options,
    recordingOptions
  }) {
    _ReplayContainer.prototype.__init.call(this);
    _ReplayContainer.prototype.__init2.call(this);
    _ReplayContainer.prototype.__init3.call(this);
    _ReplayContainer.prototype.__init4.call(this);
    _ReplayContainer.prototype.__init5.call(this);
    _ReplayContainer.prototype.__init6.call(this);
    this.eventBuffer = null;
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    this.recordingMode = "session";
    this.timeouts = {
      sessionIdlePause: SESSION_IDLE_PAUSE_DURATION,
      sessionIdleExpire: SESSION_IDLE_EXPIRE_DURATION
    };
    this._lastActivity = Date.now();
    this._isEnabled = false;
    this._isPaused = false;
    this._hasInitializedCoreListeners = false;
    this._context = {
      errorIds: /* @__PURE__ */ new Set(),
      traceIds: /* @__PURE__ */ new Set(),
      urls: [],
      initialTimestamp: Date.now(),
      initialUrl: ""
    };
    this._recordingOptions = recordingOptions;
    this._options = options;
    this._debouncedFlush = debounce(() => this._flush(), this._options.flushMinDelay, {
      maxWait: this._options.flushMaxDelay
    });
    this._throttledAddEvent = throttle(
      (event, isCheckout) => addEvent(this, event, isCheckout),
      // Max 300 events...
      300,
      // ... per 5s
      5
    );
    const { slowClickTimeout, slowClickIgnoreSelectors } = this.getOptions();
    const slowClickConfig = slowClickTimeout ? {
      threshold: Math.min(SLOW_CLICK_THRESHOLD, slowClickTimeout),
      timeout: slowClickTimeout,
      scrollTimeout: SLOW_CLICK_SCROLL_TIMEOUT,
      ignoreSelector: slowClickIgnoreSelectors ? slowClickIgnoreSelectors.join(",") : ""
    } : void 0;
    if (slowClickConfig) {
      this.clickDetector = new ClickDetector(this, slowClickConfig);
    }
  }
  /** Get the event context. */
  getContext() {
    return this._context;
  }
  /** If recording is currently enabled. */
  isEnabled() {
    return this._isEnabled;
  }
  /** If recording is currently paused. */
  isPaused() {
    return this._isPaused;
  }
  /**
   * Determine if canvas recording is enabled
   */
  isRecordingCanvas() {
    return Boolean(this._canvas);
  }
  /** Get the replay integration options. */
  getOptions() {
    return this._options;
  }
  /**
   * Initializes the plugin based on sampling configuration. Should not be
   * called outside of constructor.
   */
  initializeSampling(previousSessionId) {
    const { errorSampleRate, sessionSampleRate } = this._options;
    if (errorSampleRate <= 0 && sessionSampleRate <= 0) {
      return;
    }
    this._initializeSessionForSampling(previousSessionId);
    if (!this.session) {
      this._handleException(new Error("Unable to initialize and create session"));
      return;
    }
    if (this.session.sampled === false) {
      return;
    }
    this.recordingMode = this.session.sampled === "buffer" && this.session.segmentId === 0 ? "buffer" : "session";
    logInfoNextTick(
      `[Replay] Starting replay in ${this.recordingMode} mode`,
      this._options._experiments.traceInternals
    );
    this._initializeRecording();
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will throw an error if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * _performanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (this._isEnabled && this.recordingMode === "session") {
      throw new Error("Replay recording is already in progress");
    }
    if (this._isEnabled && this.recordingMode === "buffer") {
      throw new Error("Replay buffering is in progress, call `flush()` to save the replay");
    }
    logInfoNextTick("[Replay] Starting replay in session mode", this._options._experiments.traceInternals);
    const session = loadOrCreateSession(
      {
        maxReplayDuration: this._options.maxReplayDuration,
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        traceInternals: this._options._experiments.traceInternals
      },
      {
        stickySession: this._options.stickySession,
        // This is intentional: create a new session-based replay when calling `start()`
        sessionSampleRate: 1,
        allowBuffering: false
      }
    );
    this.session = session;
    this._initializeRecording();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, an error occurs.
   */
  startBuffering() {
    if (this._isEnabled) {
      throw new Error("Replay recording is already in progress");
    }
    logInfoNextTick("[Replay] Starting replay in buffer mode", this._options._experiments.traceInternals);
    const session = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration,
        traceInternals: this._options._experiments.traceInternals
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: 0,
        allowBuffering: true
      }
    );
    this.session = session;
    this.recordingMode = "buffer";
    this._initializeRecording();
  }
  /**
   * Start recording.
   *
   * Note that this will cause a new DOM checkout
   */
  startRecording() {
    try {
      const canvasOptions = this._canvas;
      this._stopRecording = record({
        ...this._recordingOptions,
        // When running in error sampling mode, we need to overwrite `checkoutEveryNms`
        // Without this, it would record forever, until an error happens, which we don't want
        // instead, we'll always keep the last 60 seconds of replay before an error happened
        ...this.recordingMode === "buffer" && { checkoutEveryNms: BUFFER_CHECKOUT_TIME },
        emit: getHandleRecordingEmit(this),
        onMutation: this._onMutationHandler,
        ...canvasOptions ? {
          recordCanvas: canvasOptions.recordCanvas,
          getCanvasManager: canvasOptions.getCanvasManager,
          sampling: canvasOptions.sampling,
          dataURLOptions: canvasOptions.dataURLOptions
        } : {}
      });
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Stops the recording, if it was running.
   *
   * Returns true if it was previously stopped, or is now stopped,
   * otherwise false.
   */
  stopRecording() {
    try {
      if (this._stopRecording) {
        this._stopRecording();
        this._stopRecording = void 0;
      }
      return true;
    } catch (err) {
      this._handleException(err);
      return false;
    }
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  async stop({ forceFlush = false, reason } = {}) {
    if (!this._isEnabled) {
      return;
    }
    this._isEnabled = false;
    try {
      logInfo(
        `[Replay] Stopping Replay${reason ? ` triggered by ${reason}` : ""}`,
        this._options._experiments.traceInternals
      );
      this._removeListeners();
      this.stopRecording();
      this._debouncedFlush.cancel();
      if (forceFlush) {
        await this._flush({ force: true });
      }
      this.eventBuffer && this.eventBuffer.destroy();
      this.eventBuffer = null;
      clearSession(this);
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Pause some replay functionality. See comments for `_isPaused`.
   * This differs from stop as this only stops DOM recording, it is
   * not as thorough of a shutdown as `stop()`.
   */
  pause() {
    if (this._isPaused) {
      return;
    }
    this._isPaused = true;
    this.stopRecording();
    logInfo("[Replay] Pausing replay", this._options._experiments.traceInternals);
  }
  /**
   * Resumes recording, see notes for `pause().
   *
   * Note that calling `startRecording()` here will cause a
   * new DOM checkout.`
   */
  resume() {
    if (!this._isPaused || !this._checkSession()) {
      return;
    }
    this._isPaused = false;
    this.startRecording();
    logInfo("[Replay] Resuming replay", this._options._experiments.traceInternals);
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  async sendBufferedReplayOrFlush({ continueRecording = true } = {}) {
    if (this.recordingMode === "session") {
      return this.flushImmediate();
    }
    const activityTime = Date.now();
    logInfo("[Replay] Converting buffer to session", this._options._experiments.traceInternals);
    await this.flushImmediate();
    const hasStoppedRecording = this.stopRecording();
    if (!continueRecording || !hasStoppedRecording) {
      return;
    }
    if (this.recordingMode === "session") {
      return;
    }
    this.recordingMode = "session";
    if (this.session) {
      this._updateUserActivity(activityTime);
      this._updateSessionActivity(activityTime);
      this._maybeSaveSession();
    }
    this.startRecording();
  }
  /**
   * We want to batch uploads of replay events. Save events only if
   * `<flushMinDelay>` milliseconds have elapsed since the last event
   * *OR* if `<flushMaxDelay>` milliseconds have elapsed.
   *
   * Accepts a callback to perform side-effects and returns true to stop batch
   * processing and hand back control to caller.
   */
  addUpdate(cb) {
    const cbResult = cb();
    if (this.recordingMode === "buffer") {
      return;
    }
    if (cbResult === true) {
      return;
    }
    this._debouncedFlush();
  }
  /**
   * Updates the user activity timestamp and resumes recording. This should be
   * called in an event handler for a user action that we consider as the user
   * being "active" (e.g. a mouse click).
   */
  triggerUserActivity() {
    this._updateUserActivity();
    if (!this._stopRecording) {
      if (!this._checkSession()) {
        return;
      }
      this.resume();
      return;
    }
    this.checkAndHandleExpiredSession();
    this._updateSessionActivity();
  }
  /**
   * Updates the user activity timestamp *without* resuming
   * recording. Some user events (e.g. keydown) can be create
   * low-value replays that only contain the keypress as a
   * breadcrumb. Instead this would require other events to
   * create a new replay after a session has expired.
   */
  updateUserActivity() {
    this._updateUserActivity();
    this._updateSessionActivity();
  }
  /**
   * Only flush if `this.recordingMode === 'session'`
   */
  conditionalFlush() {
    if (this.recordingMode === "buffer") {
      return Promise.resolve();
    }
    return this.flushImmediate();
  }
  /**
   * Flush using debounce flush
   */
  flush() {
    return this._debouncedFlush();
  }
  /**
   * Always flush via `_debouncedFlush` so that we do not have flushes triggered
   * from calling both `flush` and `_debouncedFlush`. Otherwise, there could be
   * cases of mulitple flushes happening closely together.
   */
  flushImmediate() {
    this._debouncedFlush();
    return this._debouncedFlush.flush();
  }
  /**
   * Cancels queued up flushes.
   */
  cancelFlush() {
    this._debouncedFlush.cancel();
  }
  /** Get the current sesion (=replay) ID */
  getSessionId() {
    return this.session && this.session.id;
  }
  /**
   * Checks if recording should be stopped due to user inactivity. Otherwise
   * check if session is expired and create a new session if so. Triggers a new
   * full snapshot on new session.
   *
   * Returns true if session is not expired, false otherwise.
   * @hidden
   */
  checkAndHandleExpiredSession() {
    if (this._lastActivity && isExpired(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && this.session.sampled === "session") {
      this.pause();
      return;
    }
    if (!this._checkSession()) {
      return false;
    }
    return true;
  }
  /**
   * Capture some initial state that can change throughout the lifespan of the
   * replay. This is required because otherwise they would be captured at the
   * first flush.
   */
  setInitialState() {
    const urlPath = `${WINDOW9.location.pathname}${WINDOW9.location.hash}${WINDOW9.location.search}`;
    const url = `${WINDOW9.location.origin}${urlPath}`;
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    this._clearContext();
    this._context.initialUrl = url;
    this._context.initialTimestamp = Date.now();
    this._context.urls.push(url);
  }
  /**
   * Add a breadcrumb event, that may be throttled.
   * If it was throttled, we add a custom breadcrumb to indicate that.
   */
  throttledAddEvent(event, isCheckout) {
    const res = this._throttledAddEvent(event, isCheckout);
    if (res === THROTTLED) {
      const breadcrumb = createBreadcrumb({
        category: "replay.throttled"
      });
      this.addUpdate(() => {
        return !addEventSync(this, {
          type: ReplayEventTypeCustom,
          timestamp: breadcrumb.timestamp || 0,
          data: {
            tag: "breadcrumb",
            payload: breadcrumb,
            metric: true
          }
        });
      });
    }
    return res;
  }
  /**
   * This will get the parametrized route name of the current page.
   * This is only available if performance is enabled, and if an instrumented router is used.
   */
  getCurrentRoute() {
    const lastTransaction = this.lastTransaction || getCurrentScope().getTransaction();
    const attributes = lastTransaction && spanToJSON(lastTransaction).data || {};
    const source = attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    if (!lastTransaction || !source || !["route", "custom"].includes(source)) {
      return void 0;
    }
    return spanToJSON(lastTransaction).description;
  }
  /**
   * Initialize and start all listeners to varying events (DOM,
   * Performance Observer, Recording, Sentry SDK, etc)
   */
  _initializeRecording() {
    this.setInitialState();
    this._updateSessionActivity();
    this.eventBuffer = createEventBuffer({
      useCompression: this._options.useCompression,
      workerUrl: this._options.workerUrl
    });
    this._removeListeners();
    this._addListeners();
    this._isEnabled = true;
    this._isPaused = false;
    this.startRecording();
  }
  /** A wrapper to conditionally capture exceptions. */
  _handleException(error) {
    DEBUG_BUILD5 && logger.error("[Replay]", error);
    if (DEBUG_BUILD5 && this._options._experiments && this._options._experiments.captureExceptions) {
      captureException(error);
    }
  }
  /**
   * Loads (or refreshes) the current session.
   */
  _initializeSessionForSampling(previousSessionId) {
    const allowBuffering = this._options.errorSampleRate > 0;
    const session = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration,
        traceInternals: this._options._experiments.traceInternals,
        previousSessionId
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: this._options.sessionSampleRate,
        allowBuffering
      }
    );
    this.session = session;
  }
  /**
   * Checks and potentially refreshes the current session.
   * Returns false if session is not recorded.
   */
  _checkSession() {
    if (!this.session) {
      return false;
    }
    const currentSession = this.session;
    if (shouldRefreshSession(currentSession, {
      sessionIdleExpire: this.timeouts.sessionIdleExpire,
      maxReplayDuration: this._options.maxReplayDuration
    })) {
      this._refreshSession(currentSession);
      return false;
    }
    return true;
  }
  /**
   * Refresh a session with a new one.
   * This stops the current session (without forcing a flush, as that would never work since we are expired),
   * and then does a new sampling based on the refreshed session.
   */
  async _refreshSession(session) {
    if (!this._isEnabled) {
      return;
    }
    await this.stop({ reason: "refresh session" });
    this.initializeSampling(session.id);
  }
  /**
   * Adds listeners to record events for the replay
   */
  _addListeners() {
    try {
      WINDOW9.document.addEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW9.addEventListener("blur", this._handleWindowBlur);
      WINDOW9.addEventListener("focus", this._handleWindowFocus);
      WINDOW9.addEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.addListeners();
      }
      if (!this._hasInitializedCoreListeners) {
        addGlobalListeners(this);
        this._hasInitializedCoreListeners = true;
      }
    } catch (err) {
      this._handleException(err);
    }
    this._performanceCleanupCallback = setupPerformanceObserver(this);
  }
  /**
   * Cleans up listeners that were created in `_addListeners`
   */
  _removeListeners() {
    try {
      WINDOW9.document.removeEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW9.removeEventListener("blur", this._handleWindowBlur);
      WINDOW9.removeEventListener("focus", this._handleWindowFocus);
      WINDOW9.removeEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.removeListeners();
      }
      if (this._performanceCleanupCallback) {
        this._performanceCleanupCallback();
      }
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Handle when visibility of the page content changes. Opening a new tab will
   * cause the state to change to hidden because of content of current page will
   * be hidden. Likewise, moving a different window to cover the contents of the
   * page will also trigger a change to a hidden state.
   */
  __init() {
    this._handleVisibilityChange = () => {
      if (WINDOW9.document.visibilityState === "visible") {
        this._doChangeToForegroundTasks();
      } else {
        this._doChangeToBackgroundTasks();
      }
    };
  }
  /**
   * Handle when page is blurred
   */
  __init2() {
    this._handleWindowBlur = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.blur"
      });
      this._doChangeToBackgroundTasks(breadcrumb);
    };
  }
  /**
   * Handle when page is focused
   */
  __init3() {
    this._handleWindowFocus = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.focus"
      });
      this._doChangeToForegroundTasks(breadcrumb);
    };
  }
  /** Ensure page remains active when a key is pressed. */
  __init4() {
    this._handleKeyboardEvent = (event) => {
      handleKeyboardEvent(this, event);
    };
  }
  /**
   * Tasks to run when we consider a page to be hidden (via blurring and/or visibility)
   */
  _doChangeToBackgroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const expired = isSessionExpired(this.session, {
      maxReplayDuration: this._options.maxReplayDuration,
      sessionIdleExpire: this.timeouts.sessionIdleExpire
    });
    if (expired) {
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
    void this.conditionalFlush();
  }
  /**
   * Tasks to run when we consider a page to be visible (via focus and/or visibility)
   */
  _doChangeToForegroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const isSessionActive = this.checkAndHandleExpiredSession();
    if (!isSessionActive) {
      logInfo("[Replay] Document has become active, but session has expired");
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
  }
  /**
   * Update user activity (across session lifespans)
   */
  _updateUserActivity(_lastActivity = Date.now()) {
    this._lastActivity = _lastActivity;
  }
  /**
   * Updates the session's last activity timestamp
   */
  _updateSessionActivity(_lastActivity = Date.now()) {
    if (this.session) {
      this.session.lastActivity = _lastActivity;
      this._maybeSaveSession();
    }
  }
  /**
   * Helper to create (and buffer) a replay breadcrumb from a core SDK breadcrumb
   */
  _createCustomBreadcrumb(breadcrumb) {
    this.addUpdate(() => {
      this.throttledAddEvent({
        type: EventType.Custom,
        timestamp: breadcrumb.timestamp || 0,
        data: {
          tag: "breadcrumb",
          payload: breadcrumb
        }
      });
    });
  }
  /**
   * Observed performance events are added to `this.performanceEntries`. These
   * are included in the replay event before it is finished and sent to Sentry.
   */
  _addPerformanceEntries() {
    const performanceEntries = createPerformanceEntries(this.performanceEntries).concat(this.replayPerformanceEntries);
    this.performanceEntries = [];
    this.replayPerformanceEntries = [];
    return Promise.all(createPerformanceSpans(this, performanceEntries));
  }
  /**
   * Clear _context
   */
  _clearContext() {
    this._context.errorIds.clear();
    this._context.traceIds.clear();
    this._context.urls = [];
  }
  /** Update the initial timestamp based on the buffer content. */
  _updateInitialTimestampFromEventBuffer() {
    const { session, eventBuffer } = this;
    if (!session || !eventBuffer) {
      return;
    }
    if (session.segmentId) {
      return;
    }
    const earliestEvent = eventBuffer.getEarliestTimestamp();
    if (earliestEvent && earliestEvent < this._context.initialTimestamp) {
      this._context.initialTimestamp = earliestEvent;
    }
  }
  /**
   * Return and clear _context
   */
  _popEventContext() {
    const _context = {
      initialTimestamp: this._context.initialTimestamp,
      initialUrl: this._context.initialUrl,
      errorIds: Array.from(this._context.errorIds),
      traceIds: Array.from(this._context.traceIds),
      urls: this._context.urls
    };
    this._clearContext();
    return _context;
  }
  /**
   * Flushes replay event buffer to Sentry.
   *
   * Performance events are only added right before flushing - this is
   * due to the buffered performance observer events.
   *
   * Should never be called directly, only by `flush`
   */
  async _runFlush() {
    const replayId = this.getSessionId();
    if (!this.session || !this.eventBuffer || !replayId) {
      DEBUG_BUILD5 && logger.error("[Replay] No session or eventBuffer found to flush.");
      return;
    }
    await this._addPerformanceEntries();
    if (!this.eventBuffer || !this.eventBuffer.hasEvents) {
      return;
    }
    await addMemoryEntry(this);
    if (!this.eventBuffer) {
      return;
    }
    if (replayId !== this.getSessionId()) {
      return;
    }
    try {
      this._updateInitialTimestampFromEventBuffer();
      const timestamp = Date.now();
      if (timestamp - this._context.initialTimestamp > this._options.maxReplayDuration + 3e4) {
        throw new Error("Session is too long, not sending replay");
      }
      const eventContext = this._popEventContext();
      const segmentId = this.session.segmentId++;
      this._maybeSaveSession();
      const recordingData = await this.eventBuffer.finish();
      await sendReplay({
        replayId,
        recordingData,
        segmentId,
        eventContext,
        session: this.session,
        options: this.getOptions(),
        timestamp
      });
    } catch (err) {
      this._handleException(err);
      this.stop({ reason: "sendReplay" });
      const client = getClient();
      if (client) {
        client.recordDroppedEvent("send_error", "replay");
      }
    }
  }
  /**
   * Flush recording data to Sentry. Creates a lock so that only a single flush
   * can be active at a time. Do not call this directly.
   */
  __init5() {
    this._flush = async ({
      force = false
    } = {}) => {
      if (!this._isEnabled && !force) {
        return;
      }
      if (!this.checkAndHandleExpiredSession()) {
        DEBUG_BUILD5 && logger.error("[Replay] Attempting to finish replay event after session expired.");
        return;
      }
      if (!this.session) {
        return;
      }
      const start = this.session.started;
      const now = Date.now();
      const duration = now - start;
      this._debouncedFlush.cancel();
      const tooShort = duration < this._options.minReplayDuration;
      const tooLong = duration > this._options.maxReplayDuration + 5e3;
      if (tooShort || tooLong) {
        logInfo(
          `[Replay] Session duration (${Math.floor(duration / 1e3)}s) is too ${tooShort ? "short" : "long"}, not sending replay.`,
          this._options._experiments.traceInternals
        );
        if (tooShort) {
          this._debouncedFlush();
        }
        return;
      }
      const eventBuffer = this.eventBuffer;
      if (eventBuffer && this.session.segmentId === 0 && !eventBuffer.hasCheckout) {
        logInfo("[Replay] Flushing initial segment without checkout.", this._options._experiments.traceInternals);
      }
      if (!this._flushLock) {
        this._flushLock = this._runFlush();
        await this._flushLock;
        this._flushLock = void 0;
        return;
      }
      try {
        await this._flushLock;
      } catch (err) {
        DEBUG_BUILD5 && logger.error(err);
      } finally {
        this._debouncedFlush();
      }
    };
  }
  /** Save the session, if it is sticky */
  _maybeSaveSession() {
    if (this.session && this._options.stickySession) {
      saveSession(this.session);
    }
  }
  /** Handler for rrweb.record.onMutation */
  __init6() {
    this._onMutationHandler = (mutations) => {
      const count = mutations.length;
      const mutationLimit = this._options.mutationLimit;
      const mutationBreadcrumbLimit = this._options.mutationBreadcrumbLimit;
      const overMutationLimit = mutationLimit && count > mutationLimit;
      if (count > mutationBreadcrumbLimit || overMutationLimit) {
        const breadcrumb = createBreadcrumb({
          category: "replay.mutations",
          data: {
            count,
            limit: overMutationLimit
          }
        });
        this._createCustomBreadcrumb(breadcrumb);
      }
      if (overMutationLimit) {
        this.stop({ reason: "mutationLimit", forceFlush: this.recordingMode === "session" });
        return false;
      }
      return true;
    };
  }
};
function getOption(selectors, defaultSelectors, deprecatedClassOption, deprecatedSelectorOption) {
  const deprecatedSelectors = typeof deprecatedSelectorOption === "string" ? deprecatedSelectorOption.split(",") : [];
  const allSelectors = [
    ...selectors,
    // @deprecated
    ...deprecatedSelectors,
    // sentry defaults
    ...defaultSelectors
  ];
  if (typeof deprecatedClassOption !== "undefined") {
    if (typeof deprecatedClassOption === "string") {
      allSelectors.push(`.${deprecatedClassOption}`);
    }
    consoleSandbox(() => {
      console.warn(
        "[Replay] You are using a deprecated configuration item for privacy. Read the documentation on how to use the new privacy configuration."
      );
    });
  }
  return allSelectors.join(",");
}
function getPrivacyOptions({
  mask,
  unmask,
  block,
  unblock,
  ignore,
  // eslint-disable-next-line deprecation/deprecation
  blockClass,
  // eslint-disable-next-line deprecation/deprecation
  blockSelector,
  // eslint-disable-next-line deprecation/deprecation
  maskTextClass,
  // eslint-disable-next-line deprecation/deprecation
  maskTextSelector,
  // eslint-disable-next-line deprecation/deprecation
  ignoreClass
}) {
  const defaultBlockedElements = ['base[href="/"]'];
  const maskSelector = getOption(mask, [".sentry-mask", "[data-sentry-mask]"], maskTextClass, maskTextSelector);
  const unmaskSelector = getOption(unmask, [".sentry-unmask", "[data-sentry-unmask]"]);
  const options = {
    // We are making the decision to make text and input selectors the same
    maskTextSelector: maskSelector,
    unmaskTextSelector: unmaskSelector,
    blockSelector: getOption(
      block,
      [".sentry-block", "[data-sentry-block]", ...defaultBlockedElements],
      blockClass,
      blockSelector
    ),
    unblockSelector: getOption(unblock, [".sentry-unblock", "[data-sentry-unblock]"]),
    ignoreSelector: getOption(ignore, [".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]'], ignoreClass)
  };
  if (blockClass instanceof RegExp) {
    options.blockClass = blockClass;
  }
  if (maskTextClass instanceof RegExp) {
    options.maskTextClass = maskTextClass;
  }
  return options;
}
function maskAttribute({
  el,
  key,
  maskAttributes,
  maskAllText,
  privacyOptions,
  value
}) {
  if (!maskAllText) {
    return value;
  }
  if (privacyOptions.unmaskTextSelector && el.matches(privacyOptions.unmaskTextSelector)) {
    return value;
  }
  if (maskAttributes.includes(key) || // Need to mask `value` attribute for `<input>` if it's a button-like
  // type
  key === "value" && el.tagName === "INPUT" && ["submit", "button"].includes(el.getAttribute("type") || "")) {
    return value.replace(/[\S]/g, "*");
  }
  return value;
}
var MEDIA_SELECTORS = 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]';
var DEFAULT_NETWORK_HEADERS = ["content-length", "content-type", "accept"];
var _initialized = false;
var replayIntegration = (options) => {
  return new Replay(options);
};
var Replay = class _Replay {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Replay";
  }
  /**
   * @inheritDoc
   */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Initial options passed to the replay integration, merged with default values.
   * Note: `sessionSampleRate` and `errorSampleRate` are not required here, as they
   * can only be finally set when setupOnce() is called.
   *
   * @private
   */
  constructor({
    flushMinDelay = DEFAULT_FLUSH_MIN_DELAY,
    flushMaxDelay = DEFAULT_FLUSH_MAX_DELAY,
    minReplayDuration = MIN_REPLAY_DURATION,
    maxReplayDuration = MAX_REPLAY_DURATION,
    stickySession = true,
    useCompression = true,
    workerUrl,
    _experiments = {},
    sessionSampleRate,
    errorSampleRate,
    maskAllText = true,
    maskAllInputs = true,
    blockAllMedia = true,
    mutationBreadcrumbLimit = 750,
    mutationLimit = 1e4,
    slowClickTimeout = 7e3,
    slowClickIgnoreSelectors = [],
    networkDetailAllowUrls = [],
    networkDetailDenyUrls = [],
    networkCaptureBodies = true,
    networkRequestHeaders = [],
    networkResponseHeaders = [],
    mask = [],
    maskAttributes = ["title", "placeholder"],
    unmask = [],
    block = [],
    unblock = [],
    ignore = [],
    maskFn,
    beforeAddRecordingEvent,
    beforeErrorSampling,
    // eslint-disable-next-line deprecation/deprecation
    blockClass,
    // eslint-disable-next-line deprecation/deprecation
    blockSelector,
    // eslint-disable-next-line deprecation/deprecation
    maskInputOptions,
    // eslint-disable-next-line deprecation/deprecation
    maskTextClass,
    // eslint-disable-next-line deprecation/deprecation
    maskTextSelector,
    // eslint-disable-next-line deprecation/deprecation
    ignoreClass
  } = {}) {
    this.name = _Replay.id;
    const privacyOptions = getPrivacyOptions({
      mask,
      unmask,
      block,
      unblock,
      ignore,
      blockClass,
      blockSelector,
      maskTextClass,
      maskTextSelector,
      ignoreClass
    });
    this._recordingOptions = {
      maskAllInputs,
      maskAllText,
      maskInputOptions: { ...maskInputOptions || {}, password: true },
      maskTextFn: maskFn,
      maskInputFn: maskFn,
      maskAttributeFn: (key, value, el) => maskAttribute({
        maskAttributes,
        maskAllText,
        privacyOptions,
        key,
        value,
        el
      }),
      ...privacyOptions,
      // Our defaults
      slimDOMOptions: "all",
      inlineStylesheet: true,
      // Disable inline images as it will increase segment/replay size
      inlineImages: false,
      // collect fonts, but be aware that `sentry.io` needs to be an allowed
      // origin for playback
      collectFonts: true,
      errorHandler: (err) => {
        try {
          err.__rrweb__ = true;
        } catch (error) {
        }
      }
    };
    this._initialOptions = {
      flushMinDelay,
      flushMaxDelay,
      minReplayDuration: Math.min(minReplayDuration, MIN_REPLAY_DURATION_LIMIT),
      maxReplayDuration: Math.min(maxReplayDuration, MAX_REPLAY_DURATION),
      stickySession,
      sessionSampleRate,
      errorSampleRate,
      useCompression,
      workerUrl,
      blockAllMedia,
      maskAllInputs,
      maskAllText,
      mutationBreadcrumbLimit,
      mutationLimit,
      slowClickTimeout,
      slowClickIgnoreSelectors,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders: _getMergedNetworkHeaders(networkRequestHeaders),
      networkResponseHeaders: _getMergedNetworkHeaders(networkResponseHeaders),
      beforeAddRecordingEvent,
      beforeErrorSampling,
      _experiments
    };
    if (typeof sessionSampleRate === "number") {
      console.warn(
        `[Replay] You are passing \`sessionSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysSessionSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysSessionSampleRate: ${sessionSampleRate} })`
      );
      this._initialOptions.sessionSampleRate = sessionSampleRate;
    }
    if (typeof errorSampleRate === "number") {
      console.warn(
        `[Replay] You are passing \`errorSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysOnErrorSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysOnErrorSampleRate: ${errorSampleRate} })`
      );
      this._initialOptions.errorSampleRate = errorSampleRate;
    }
    if (this._initialOptions.blockAllMedia) {
      this._recordingOptions.blockSelector = !this._recordingOptions.blockSelector ? MEDIA_SELECTORS : `${this._recordingOptions.blockSelector},${MEDIA_SELECTORS}`;
    }
    if (this._isInitialized && isBrowser()) {
      throw new Error("Multiple Sentry Session Replay instances are not supported");
    }
    this._isInitialized = true;
  }
  /** If replay has already been initialized */
  get _isInitialized() {
    return _initialized;
  }
  /** Update _isInitialized */
  set _isInitialized(value) {
    _initialized = value;
  }
  /**
   * Setup and initialize replay container
   */
  setupOnce() {
    if (!isBrowser()) {
      return;
    }
    this._setup();
    setTimeout(() => this._initialize());
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will throw an error if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * PerformanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (!this._replay) {
      return;
    }
    this._replay.start();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, until an error occurs.
   */
  startBuffering() {
    if (!this._replay) {
      return;
    }
    this._replay.startBuffering();
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  stop() {
    if (!this._replay) {
      return Promise.resolve();
    }
    return this._replay.stop({ forceFlush: this._replay.recordingMode === "session" });
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  flush(options) {
    if (!this._replay || !this._replay.isEnabled()) {
      return Promise.resolve();
    }
    return this._replay.sendBufferedReplayOrFlush(options);
  }
  /**
   * Get the current session ID.
   */
  getReplayId() {
    if (!this._replay || !this._replay.isEnabled()) {
      return;
    }
    return this._replay.getSessionId();
  }
  /**
   * Initializes replay.
   */
  _initialize() {
    if (!this._replay) {
      return;
    }
    this._maybeLoadFromReplayCanvasIntegration();
    this._replay.initializeSampling();
  }
  /** Setup the integration. */
  _setup() {
    const finalOptions = loadReplayOptionsFromClient(this._initialOptions);
    this._replay = new ReplayContainer({
      options: finalOptions,
      recordingOptions: this._recordingOptions
    });
  }
  /** Get canvas options from ReplayCanvas integration, if it is also added. */
  _maybeLoadFromReplayCanvasIntegration() {
    try {
      const client = getClient();
      const canvasIntegration = client.getIntegrationByName("ReplayCanvas");
      if (!canvasIntegration) {
        return;
      }
      this._replay["_canvas"] = canvasIntegration.getOptions();
    } catch (e2) {
    }
  }
};
Replay.__initStatic();
function loadReplayOptionsFromClient(initialOptions) {
  const client = getClient();
  const opt = client && client.getOptions();
  const finalOptions = { sessionSampleRate: 0, errorSampleRate: 0, ...dropUndefinedKeys(initialOptions) };
  if (!opt) {
    consoleSandbox(() => {
      console.warn("SDK client is not available.");
    });
    return finalOptions;
  }
  if (initialOptions.sessionSampleRate == null && // TODO remove once deprecated rates are removed
  initialOptions.errorSampleRate == null && // TODO remove once deprecated rates are removed
  opt.replaysSessionSampleRate == null && opt.replaysOnErrorSampleRate == null) {
    consoleSandbox(() => {
      console.warn(
        "Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set."
      );
    });
  }
  if (typeof opt.replaysSessionSampleRate === "number") {
    finalOptions.sessionSampleRate = opt.replaysSessionSampleRate;
  }
  if (typeof opt.replaysOnErrorSampleRate === "number") {
    finalOptions.errorSampleRate = opt.replaysOnErrorSampleRate;
  }
  return finalOptions;
}
function _getMergedNetworkHeaders(headers) {
  return [...DEFAULT_NETWORK_HEADERS, ...headers.map((header) => header.toLowerCase())];
}
function getReplay() {
  const client = getClient();
  return client && client.getIntegrationByName && client.getIntegrationByName("Replay");
}

// node_modules/@sentry-internal/replay-canvas/esm/index.js
var NodeType2;
(function(NodeType3) {
  NodeType3[NodeType3["Document"] = 0] = "Document";
  NodeType3[NodeType3["DocumentType"] = 1] = "DocumentType";
  NodeType3[NodeType3["Element"] = 2] = "Element";
  NodeType3[NodeType3["Text"] = 3] = "Text";
  NodeType3[NodeType3["CDATA"] = 4] = "CDATA";
  NodeType3[NodeType3["Comment"] = 5] = "Comment";
})(NodeType2 || (NodeType2 = {}));
function elementClassMatchesRegex2(el, regex) {
  for (let eIndex = el.classList.length; eIndex--; ) {
    const className = el.classList[eIndex];
    if (regex.test(className)) {
      return true;
    }
  }
  return false;
}
function distanceToMatch2(node2, matchPredicate, limit = Infinity, distance = 0) {
  if (!node2)
    return -1;
  if (node2.nodeType !== node2.ELEMENT_NODE)
    return -1;
  if (distance > limit)
    return -1;
  if (matchPredicate(node2))
    return distance;
  return distanceToMatch2(node2.parentNode, matchPredicate, limit, distance + 1);
}
function createMatchPredicate2(className, selector) {
  return (node2) => {
    const el = node2;
    if (el === null)
      return false;
    try {
      if (className) {
        if (typeof className === "string") {
          if (el.matches(`.${className}`))
            return true;
        } else if (elementClassMatchesRegex2(el, className)) {
          return true;
        }
      }
      if (selector && el.matches(selector))
        return true;
      return false;
    } catch (e2) {
      return false;
    }
  };
}
var DEPARTED_MIRROR_ACCESS_WARNING2 = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
var _mirror2 = {
  map: {},
  getId() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
    return -1;
  },
  getNode() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
    return null;
  },
  removeNodeFromMap() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
  },
  has() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
    return false;
  },
  reset() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
  }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
  _mirror2 = new Proxy(_mirror2, {
    get(target, prop, receiver) {
      if (prop === "map") {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING2);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function hookSetter2(target, key, d, isRevoked, win = window) {
  const original = win.Object.getOwnPropertyDescriptor(target, key);
  win.Object.defineProperty(target, key, isRevoked ? d : {
    set(value) {
      setTimeout(() => {
        d.set.call(this, value);
      }, 0);
      if (original && original.set) {
        original.set.call(this, value);
      }
    }
  });
  return () => hookSetter2(target, key, original || {}, true);
}
function patch2(source, name, replacement) {
  try {
    if (!(name in source)) {
      return () => {
      };
    }
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return () => {
      source[name] = original;
    };
  } catch (e2) {
    return () => {
    };
  }
}
if (!/[1-9][0-9]{12}/.test(Date.now().toString()))
  ;
function isBlocked2(node2, blockClass, blockSelector, unblockSelector, checkAncestors) {
  if (!node2) {
    return false;
  }
  const el = node2.nodeType === node2.ELEMENT_NODE ? node2 : node2.parentElement;
  if (!el)
    return false;
  const blockedPredicate = createMatchPredicate2(blockClass, blockSelector);
  if (!checkAncestors) {
    const isUnblocked = unblockSelector && el.matches(unblockSelector);
    return blockedPredicate(el) && !isUnblocked;
  }
  const blockDistance = distanceToMatch2(el, blockedPredicate);
  let unblockDistance = -1;
  if (blockDistance < 0) {
    return false;
  }
  if (unblockSelector) {
    unblockDistance = distanceToMatch2(el, createMatchPredicate2(null, unblockSelector));
  }
  if (blockDistance > -1 && unblockDistance < 0) {
    return true;
  }
  return blockDistance < unblockDistance;
}
var cachedRequestAnimationFrameImplementation2;
function getRequestAnimationFrameImplementation2() {
  if (cachedRequestAnimationFrameImplementation2) {
    return cachedRequestAnimationFrameImplementation2;
  }
  const document2 = window.document;
  let requestAnimationFrameImplementation = window.requestAnimationFrame;
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow.requestAnimationFrame) {
        requestAnimationFrameImplementation = contentWindow.requestAnimationFrame;
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
    }
  }
  return cachedRequestAnimationFrameImplementation2 = requestAnimationFrameImplementation.bind(window);
}
function onRequestAnimationFrame2(...rest) {
  return getRequestAnimationFrameImplementation2()(...rest);
}
var CanvasContext = ((CanvasContext2) => {
  CanvasContext2[CanvasContext2["2D"] = 0] = "2D";
  CanvasContext2[CanvasContext2["WebGL"] = 1] = "WebGL";
  CanvasContext2[CanvasContext2["WebGL2"] = 2] = "WebGL2";
  return CanvasContext2;
})(CanvasContext || {});
var errorHandler2;
function registerErrorHandler2(handler) {
  errorHandler2 = handler;
}
var callbackWrapper2 = (cb) => {
  if (!errorHandler2) {
    return cb;
  }
  const rrwebWrapped = (...rest) => {
    try {
      return cb(...rest);
    } catch (error) {
      if (errorHandler2 && errorHandler2(error) === true) {
        return () => {
        };
      }
      throw error;
    }
  };
  return rrwebWrapped;
};
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var i;
var encode = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
};
var canvasVarMap = /* @__PURE__ */ new Map();
function variableListFor(ctx, ctor) {
  let contextMap = canvasVarMap.get(ctx);
  if (!contextMap) {
    contextMap = /* @__PURE__ */ new Map();
    canvasVarMap.set(ctx, contextMap);
  }
  if (!contextMap.has(ctor)) {
    contextMap.set(ctor, []);
  }
  return contextMap.get(ctor);
}
var saveWebGLVar = (value, win, ctx) => {
  if (!value || !(isInstanceOfWebGLObject(value, win) || typeof value === "object"))
    return;
  const name = value.constructor.name;
  const list = variableListFor(ctx, name);
  let index = list.indexOf(value);
  if (index === -1) {
    index = list.length;
    list.push(value);
  }
  return index;
};
function serializeArg(value, win, ctx) {
  if (value instanceof Array) {
    return value.map((arg) => serializeArg(arg, win, ctx));
  } else if (value === null) {
    return value;
  } else if (value instanceof Float32Array || value instanceof Float64Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Int16Array || value instanceof Int8Array || value instanceof Uint8ClampedArray) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [Object.values(value)]
    };
  } else if (value instanceof ArrayBuffer) {
    const name = value.constructor.name;
    const base64 = encode(value);
    return {
      rr_type: name,
      base64
    };
  } else if (value instanceof DataView) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [
        serializeArg(value.buffer, win, ctx),
        value.byteOffset,
        value.byteLength
      ]
    };
  } else if (value instanceof HTMLImageElement) {
    const name = value.constructor.name;
    const { src } = value;
    return {
      rr_type: name,
      src
    };
  } else if (value instanceof HTMLCanvasElement) {
    const name = "HTMLImageElement";
    const src = value.toDataURL();
    return {
      rr_type: name,
      src
    };
  } else if (value instanceof ImageData) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [serializeArg(value.data, win, ctx), value.width, value.height]
    };
  } else if (isInstanceOfWebGLObject(value, win) || typeof value === "object") {
    const name = value.constructor.name;
    const index = saveWebGLVar(value, win, ctx);
    return {
      rr_type: name,
      index
    };
  }
  return value;
}
var serializeArgs = (args, win, ctx) => {
  return args.map((arg) => serializeArg(arg, win, ctx));
};
var isInstanceOfWebGLObject = (value, win) => {
  const webGLConstructorNames = [
    "WebGLActiveInfo",
    "WebGLBuffer",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLRenderbuffer",
    "WebGLShader",
    "WebGLShaderPrecisionFormat",
    "WebGLTexture",
    "WebGLUniformLocation",
    "WebGLVertexArrayObject",
    "WebGLVertexArrayObjectOES"
  ];
  const supportedWebGLConstructorNames = webGLConstructorNames.filter((name) => typeof win[name] === "function");
  return Boolean(supportedWebGLConstructorNames.find((name) => value instanceof win[name]));
};
function initCanvas2DMutationObserver(cb, win, blockClass, blockSelector, unblockSelector) {
  const handlers4 = [];
  const props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
  for (const prop of props2D) {
    try {
      if (typeof win.CanvasRenderingContext2D.prototype[prop] !== "function") {
        continue;
      }
      const restoreHandler = patch2(win.CanvasRenderingContext2D.prototype, prop, function(original) {
        return function(...args) {
          if (!isBlocked2(this.canvas, blockClass, blockSelector, unblockSelector, true)) {
            setTimeout(() => {
              const recordArgs = serializeArgs(args, win, this);
              cb(this.canvas, {
                type: CanvasContext["2D"],
                property: prop,
                args: recordArgs
              });
            }, 0);
          }
          return original.apply(this, args);
        };
      });
      handlers4.push(restoreHandler);
    } catch (e2) {
      const hookHandler = hookSetter2(win.CanvasRenderingContext2D.prototype, prop, {
        set(v) {
          cb(this.canvas, {
            type: CanvasContext["2D"],
            property: prop,
            args: [v],
            setter: true
          });
        }
      });
      handlers4.push(hookHandler);
    }
  }
  return () => {
    handlers4.forEach((h) => h());
  };
}
function getNormalizedContextName(contextType) {
  return contextType === "experimental-webgl" ? "webgl" : contextType;
}
function initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, setPreserveDrawingBufferToTrue) {
  const handlers4 = [];
  try {
    const restoreHandler = patch2(win.HTMLCanvasElement.prototype, "getContext", function(original) {
      return function(contextType, ...args) {
        if (!isBlocked2(this, blockClass, blockSelector, unblockSelector, true)) {
          const ctxName = getNormalizedContextName(contextType);
          if (!("__context" in this))
            this.__context = ctxName;
          if (setPreserveDrawingBufferToTrue && ["webgl", "webgl2"].includes(ctxName)) {
            if (args[0] && typeof args[0] === "object") {
              const contextAttributes = args[0];
              if (!contextAttributes.preserveDrawingBuffer) {
                contextAttributes.preserveDrawingBuffer = true;
              }
            } else {
              args.splice(0, 1, {
                preserveDrawingBuffer: true
              });
            }
          }
        }
        return original.apply(this, [contextType, ...args]);
      };
    });
    handlers4.push(restoreHandler);
  } catch (e2) {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    handlers4.forEach((h) => h());
  };
}
function patchGLPrototype(prototype, type, cb, blockClass, blockSelector, unblockSelector, mirror2, win) {
  const handlers4 = [];
  const props = Object.getOwnPropertyNames(prototype);
  for (const prop of props) {
    if ([
      "isContextLost",
      "canvas",
      "drawingBufferWidth",
      "drawingBufferHeight"
    ].includes(prop)) {
      continue;
    }
    try {
      if (typeof prototype[prop] !== "function") {
        continue;
      }
      const restoreHandler = patch2(prototype, prop, function(original) {
        return function(...args) {
          const result = original.apply(this, args);
          saveWebGLVar(result, win, this);
          if ("tagName" in this.canvas && !isBlocked2(this.canvas, blockClass, blockSelector, unblockSelector, true)) {
            const recordArgs = serializeArgs(args, win, this);
            const mutation = {
              type,
              property: prop,
              args: recordArgs
            };
            cb(this.canvas, mutation);
          }
          return result;
        };
      });
      handlers4.push(restoreHandler);
    } catch (e2) {
      const hookHandler = hookSetter2(prototype, prop, {
        set(v) {
          cb(this.canvas, {
            type,
            property: prop,
            args: [v],
            setter: true
          });
        }
      });
      handlers4.push(hookHandler);
    }
  }
  return handlers4;
}
function initCanvasWebGLMutationObserver(cb, win, blockClass, blockSelector, unblockSelector, mirror2) {
  const handlers4 = [];
  handlers4.push(...patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass, blockSelector, unblockSelector, mirror2, win));
  if (typeof win.WebGL2RenderingContext !== "undefined") {
    handlers4.push(...patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass, blockSelector, unblockSelector, mirror2, win));
  }
  return () => {
    handlers4.forEach((h) => h());
  };
}
var r2 = `for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e="undefined"==typeof Uint8Array?[]:new Uint8Array(256),n=0;n<64;n++)e[t.charCodeAt(n)]=n;var a=function(e){var n,a=new Uint8Array(e),s=a.length,r="";for(n=0;n<s;n+=3)r+=t[a[n]>>2],r+=t[(3&a[n])<<4|a[n+1]>>4],r+=t[(15&a[n+1])<<2|a[n+2]>>6],r+=t[63&a[n+2]];return s%3==2?r=r.substring(0,r.length-1)+"=":s%3==1&&(r=r.substring(0,r.length-2)+"=="),r};const s=new Map,r=new Map;const i=self;i.onmessage=async function(t){if(!("OffscreenCanvas"in globalThis))return i.postMessage({id:t.data.id});{const{id:e,bitmap:n,width:o,height:f,dataURLOptions:c}=t.data,g=async function(t,e,n){const s=t+"-"+e;if("OffscreenCanvas"in globalThis){if(r.has(s))return r.get(s);const i=new OffscreenCanvas(t,e);i.getContext("2d");const o=await i.convertToBlob(n),f=await o.arrayBuffer(),c=a(f);return r.set(s,c),c}return""}(o,f,c),d=new OffscreenCanvas(o,f);d.getContext("2d").drawImage(n,0,0),n.close();const u=await d.convertToBlob(c),h=u.type,w=await u.arrayBuffer(),l=a(w);if(!s.has(e)&&await g===l)return s.set(e,l),i.postMessage({id:e});if(s.get(e)===l)return i.postMessage({id:e});i.postMessage({id:e,type:h,base64:l,width:o,height:f}),s.set(e,l)}};`;
function t() {
  const t2 = new Blob([r2]);
  return URL.createObjectURL(t2);
}
var CanvasManager = class {
  reset() {
    this.pendingCanvasMutations.clear();
    this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = true;
  }
  unfreeze() {
    this.frozen = false;
  }
  lock() {
    this.locked = true;
  }
  unlock() {
    this.locked = false;
  }
  constructor(options) {
    this.pendingCanvasMutations = /* @__PURE__ */ new Map();
    this.rafStamps = { latestId: 0, invokeId: null };
    this.frozen = false;
    this.locked = false;
    this.processMutation = (target, mutation) => {
      const newFrame = this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId;
      if (newFrame || !this.rafStamps.invokeId)
        this.rafStamps.invokeId = this.rafStamps.latestId;
      if (!this.pendingCanvasMutations.has(target)) {
        this.pendingCanvasMutations.set(target, []);
      }
      this.pendingCanvasMutations.get(target).push(mutation);
    };
    const { sampling = "all", win, blockClass, blockSelector, unblockSelector, recordCanvas, dataURLOptions, errorHandler: errorHandler3 } = options;
    this.mutationCb = options.mutationCb;
    this.mirror = options.mirror;
    this.options = options;
    if (errorHandler3) {
      registerErrorHandler2(errorHandler3);
    }
    if (options.enableManualSnapshot) {
      return;
    }
    callbackWrapper2(() => {
      if (recordCanvas && sampling === "all")
        this.initCanvasMutationObserver(win, blockClass, blockSelector, unblockSelector);
      if (recordCanvas && typeof sampling === "number")
        this.initCanvasFPSObserver(sampling, win, blockClass, blockSelector, unblockSelector, {
          dataURLOptions
        });
    })();
  }
  initCanvasFPSObserver(fps, win, blockClass, blockSelector, unblockSelector, options) {
    const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, true);
    const rafId = this.takeSnapshot(false, fps, win, blockClass, blockSelector, unblockSelector, options.dataURLOptions);
    this.resetObservers = () => {
      canvasContextReset();
      cancelAnimationFrame(rafId);
    };
  }
  initCanvasMutationObserver(win, blockClass, blockSelector, unblockSelector) {
    this.startRAFTimestamping();
    this.startPendingCanvasMutationFlusher();
    const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector, false);
    const canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector);
    const canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector, this.mirror);
    this.resetObservers = () => {
      canvasContextReset();
      canvas2DReset();
      canvasWebGL1and2Reset();
    };
  }
  snapshot(canvasElement) {
    const { options } = this;
    const rafId = this.takeSnapshot(true, options.sampling === "all" ? 2 : options.sampling || 2, options.win, options.blockClass, options.blockSelector, options.unblockSelector, options.dataURLOptions, canvasElement);
    this.resetObservers = () => {
      cancelAnimationFrame(rafId);
    };
  }
  takeSnapshot(isManualSnapshot, fps, win, blockClass, blockSelector, unblockSelector, dataURLOptions, canvasElement) {
    const snapshotInProgressMap = /* @__PURE__ */ new Map();
    const worker = new Worker(t());
    worker.onmessage = (e2) => {
      const data = e2.data;
      const { id } = data;
      snapshotInProgressMap.set(id, false);
      if (!("base64" in data))
        return;
      const { base64, type, width, height } = data;
      this.mutationCb({
        id,
        type: CanvasContext["2D"],
        commands: [
          {
            property: "clearRect",
            args: [0, 0, width, height]
          },
          {
            property: "drawImage",
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64 }],
                    type
                  }
                ]
              },
              0,
              0
            ]
          }
        ]
      });
    };
    const timeBetweenSnapshots = 1e3 / fps;
    let lastSnapshotTime = 0;
    let rafId;
    const getCanvas = (canvasElement2) => {
      if (canvasElement2) {
        return [canvasElement2];
      }
      const matchedCanvas = [];
      win.document.querySelectorAll("canvas").forEach((canvas) => {
        if (!isBlocked2(canvas, blockClass, blockSelector, unblockSelector, true)) {
          matchedCanvas.push(canvas);
        }
      });
      return matchedCanvas;
    };
    const takeCanvasSnapshots = (timestamp) => {
      if (lastSnapshotTime && timestamp - lastSnapshotTime < timeBetweenSnapshots) {
        rafId = onRequestAnimationFrame2(takeCanvasSnapshots);
        return;
      }
      lastSnapshotTime = timestamp;
      getCanvas(canvasElement).forEach((canvas) => {
        const id = this.mirror.getId(canvas);
        if (snapshotInProgressMap.get(id))
          return;
        snapshotInProgressMap.set(id, true);
        if (!isManualSnapshot && ["webgl", "webgl2"].includes(canvas.__context)) {
          const context = canvas.getContext(canvas.__context);
          if (_optionalChain([context, "optionalAccess", (_) => _.getContextAttributes, "call", (_2) => _2(), "optionalAccess", (_3) => _3.preserveDrawingBuffer]) === false) {
            context.clear(context.COLOR_BUFFER_BIT);
          }
        }
        createImageBitmap(canvas).then((bitmap) => {
          worker.postMessage({
            id,
            bitmap,
            width: canvas.width,
            height: canvas.height,
            dataURLOptions
          }, [bitmap]);
        }).catch((error) => {
          callbackWrapper2(() => {
            throw error;
          })();
        });
      });
      rafId = onRequestAnimationFrame2(takeCanvasSnapshots);
    };
    rafId = onRequestAnimationFrame2(takeCanvasSnapshots);
    return rafId;
  }
  startPendingCanvasMutationFlusher() {
    onRequestAnimationFrame2(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const setLatestRAFTimestamp = (timestamp) => {
      this.rafStamps.latestId = timestamp;
      onRequestAnimationFrame2(setLatestRAFTimestamp);
    };
    onRequestAnimationFrame2(setLatestRAFTimestamp);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach((values, canvas) => {
      const id = this.mirror.getId(canvas);
      this.flushPendingCanvasMutationFor(canvas, id);
    });
    onRequestAnimationFrame2(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(canvas, id) {
    if (this.frozen || this.locked) {
      return;
    }
    const valuesWithType = this.pendingCanvasMutations.get(canvas);
    if (!valuesWithType || id === -1)
      return;
    const values = valuesWithType.map((value) => {
      const { type: type2, ...rest } = value;
      return rest;
    });
    const { type } = valuesWithType[0];
    this.mutationCb({ id, type, commands: values });
    this.pendingCanvasMutations.delete(canvas);
  }
};
var CANVAS_QUALITY = {
  low: {
    sampling: {
      canvas: 1
    },
    dataURLOptions: {
      type: "image/webp",
      quality: 0.25
    }
  },
  medium: {
    sampling: {
      canvas: 2
    },
    dataURLOptions: {
      type: "image/webp",
      quality: 0.4
    }
  },
  high: {
    sampling: {
      canvas: 4
    },
    dataURLOptions: {
      type: "image/webp",
      quality: 0.5
    }
  }
};
var INTEGRATION_NAME13 = "ReplayCanvas";
var _replayCanvasIntegration = (options = {}) => {
  const _canvasOptions = {
    quality: options.quality || "medium",
    enableManualSnapshot: options.enableManualSnapshot
  };
  let canvasManagerResolve;
  const _canvasManager = new Promise((resolve2) => canvasManagerResolve = resolve2);
  return {
    name: INTEGRATION_NAME13,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setupOnce() {
    },
    getOptions() {
      const { quality, enableManualSnapshot } = _canvasOptions;
      return {
        enableManualSnapshot,
        recordCanvas: true,
        getCanvasManager: (options2) => {
          const manager = new CanvasManager({
            ...options2,
            enableManualSnapshot,
            errorHandler: (err) => {
              try {
                if (typeof err === "object") {
                  err.__rrweb__ = true;
                }
              } catch (error) {
              }
            }
          });
          canvasManagerResolve(manager);
          return manager;
        },
        ...CANVAS_QUALITY[quality || "medium"] || CANVAS_QUALITY.medium
      };
    },
    async snapshot(canvasElement) {
      const canvasManager = await _canvasManager;
      canvasManager.snapshot(canvasElement);
    }
  };
};
var replayCanvasIntegration = defineIntegration(_replayCanvasIntegration);
var ReplayCanvas = convertIntegrationFnToClass(INTEGRATION_NAME13, replayCanvasIntegration);

// node_modules/@sentry-internal/feedback/esm/index.js
var WINDOW10 = GLOBAL_OBJ;
var LIGHT_BACKGROUND = "#ffffff";
var INHERIT = "inherit";
var SUBMIT_COLOR = "rgba(108, 95, 199, 1)";
var LIGHT_THEME = {
  fontFamily: "system-ui, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "14px",
  background: LIGHT_BACKGROUND,
  backgroundHover: "#f6f6f7",
  foreground: "#2b2233",
  border: "1.5px solid rgba(41, 35, 47, 0.13)",
  borderRadius: "12px",
  boxShadow: "0px 4px 24px 0px rgba(43, 34, 51, 0.12)",
  success: "#268d75",
  error: "#df3338",
  submitBackground: "rgba(88, 74, 192, 1)",
  submitBackgroundHover: SUBMIT_COLOR,
  submitBorder: SUBMIT_COLOR,
  submitOutlineFocus: "#29232f",
  submitForeground: LIGHT_BACKGROUND,
  submitForegroundHover: LIGHT_BACKGROUND,
  cancelBackground: "transparent",
  cancelBackgroundHover: "var(--background-hover)",
  cancelBorder: "var(--border)",
  cancelOutlineFocus: "var(--input-outline-focus)",
  cancelForeground: "var(--foreground)",
  cancelForegroundHover: "var(--foreground)",
  inputBackground: INHERIT,
  inputForeground: INHERIT,
  inputBorder: "var(--border)",
  inputOutlineFocus: SUBMIT_COLOR,
  formBorderRadius: "20px",
  formContentBorderRadius: "6px"
};
var DEFAULT_THEME = {
  light: LIGHT_THEME,
  dark: {
    ...LIGHT_THEME,
    background: "#29232f",
    backgroundHover: "#352f3b",
    foreground: "#ebe6ef",
    border: "1.5px solid rgba(235, 230, 239, 0.15)",
    success: "#2da98c",
    error: "#f55459"
  }
};
var ACTOR_LABEL = "Report a Bug";
var CANCEL_BUTTON_LABEL = "Cancel";
var SUBMIT_BUTTON_LABEL = "Send Bug Report";
var FORM_TITLE = "Report a Bug";
var EMAIL_PLACEHOLDER = "your.email@example.org";
var EMAIL_LABEL = "Email";
var MESSAGE_PLACEHOLDER = "What's the bug? What did you expect?";
var MESSAGE_LABEL = "Description";
var NAME_PLACEHOLDER = "Your Name";
var NAME_LABEL = "Name";
var SUCCESS_MESSAGE_TEXT = "Thank you for your report!";
var FEEDBACK_WIDGET_SOURCE = "widget";
var FEEDBACK_API_SOURCE = "api";
async function prepareFeedbackEvent({
  client,
  scope,
  event
}) {
  const eventHint = {};
  if (client.emit) {
    client.emit("preprocessEvent", event, eventHint);
  }
  const preparedEvent = await prepareEvent(
    client.getOptions(),
    event,
    eventHint,
    scope,
    client,
    getIsolationScope()
  );
  if (preparedEvent === null) {
    client.recordDroppedEvent("event_processor", "feedback", event);
    return null;
  }
  preparedEvent.platform = preparedEvent.platform || "javascript";
  return preparedEvent;
}
async function sendFeedbackRequest({ feedback: { message, email, name, source, url } }, { includeReplay = true } = {}) {
  const client = getClient();
  const transport = client && client.getTransport();
  const dsn = client && client.getDsn();
  if (!client || !transport || !dsn) {
    return;
  }
  const baseEvent = {
    contexts: {
      feedback: {
        contact_email: email,
        name,
        message,
        url,
        source
      }
    },
    type: "feedback"
  };
  return withScope(async (scope) => {
    scope.clearBreadcrumbs();
    if ([FEEDBACK_API_SOURCE, FEEDBACK_WIDGET_SOURCE].includes(String(source))) {
      scope.setLevel("info");
    }
    const feedbackEvent = await prepareFeedbackEvent({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scope,
      client,
      event: baseEvent
    });
    if (!feedbackEvent) {
      return;
    }
    if (client.emit) {
      client.emit("beforeSendFeedback", feedbackEvent, { includeReplay: Boolean(includeReplay) });
    }
    const envelope = createEventEnvelope(feedbackEvent, dsn, client.getOptions()._metadata, client.getOptions().tunnel);
    let response;
    try {
      response = await transport.send(envelope);
    } catch (err) {
      const error = new Error("Unable to send Feedback");
      try {
        error.cause = err;
      } catch (e2) {
      }
      throw error;
    }
    if (!response) {
      return;
    }
    if (typeof response.statusCode === "number" && (response.statusCode < 200 || response.statusCode >= 300)) {
      throw new Error("Unable to send Feedback");
    }
    return response;
  });
}
function sendFeedback({ name, email, message, source = FEEDBACK_API_SOURCE, url = getLocationHref() }, options = {}) {
  if (!message) {
    throw new Error("Unable to submit feedback with empty message");
  }
  return sendFeedbackRequest(
    {
      feedback: {
        name,
        email,
        message,
        url,
        source
      }
    },
    options
  );
}
var DEBUG_BUILD6 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
function mergeOptions(defaultOptions2, optionOverrides) {
  return {
    ...defaultOptions2,
    ...optionOverrides,
    themeDark: {
      ...defaultOptions2.themeDark,
      ...optionOverrides.themeDark
    },
    themeLight: {
      ...defaultOptions2.themeLight,
      ...optionOverrides.themeLight
    }
  };
}
function createActorStyles(d) {
  const style = d.createElement("style");
  style.textContent = `
.widget__actor {
  line-height: 25px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  text-decoration: none;
  z-index: 9000;

  color: var(--foreground);
  background-color: var(--background);
  border: var(--border);
  box-shadow: var(--box-shadow);
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
}

.widget__actor:hover {
  background-color: var(--background-hover);
}

.widget__actor svg {
  width: 16px;
  height: 16px;
}

.widget__actor--hidden {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.widget__actor__text {
}

.feedback-icon path {
  fill: var(--foreground);
}
`;
  return style;
}
function createDialogStyles(d) {
  const style = d.createElement("style");
  style.textContent = `
.dialog {
  line-height: 25px;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  position: fixed;
  inset: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.dialog:not([open]) {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
.dialog:not([open]) .dialog__content {
  transform: translate(0, -16px) scale(0.98);
}

.dialog__content {
  position: fixed;
  left: var(--left);
  right: var(--right);
  bottom: var(--bottom);
  top: var(--top);

  border: var(--border);
  border-radius: var(--form-border-radius);
  background-color: var(--background);
  color: var(--foreground);

  width: 320px;
  max-width: 100%;
  max-height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  transition: transform 0.2s ease-in-out;
  transform: translate(0, 0) scale(1);
}

.dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 600;
  padding: 24px 24px 0 24px;
  margin: 0;
  margin-bottom: 16px;
}

.brand-link {
  display: inline-flex;
}

.error {
  color: var(--error);
  margin-bottom: 16px;
}

.form {
  display: grid;
  overflow: auto;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px 24px;
}

.form__error-container {
  color: var(--error);
}

.form__error-container--hidden {
  display: none;
}

.form__label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0px;
}

.form__label__text {
  display: grid;
  gap: 4px;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
}

.form__label__text--required {
  font-size: 0.85em;
}

.form__input {
  font-family: inherit;
  line-height: inherit;
  background-color: var(--input-background);
  box-sizing: border-box;
  border: var(--input-border);
  border-radius: var(--form-content-border-radius);
  color: var(--input-foreground);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
}

.form__input:focus-visible {
  outline: 1px auto var(--input-outline-focus);
}

.form__input--textarea {
  font-family: inherit;
  resize: vertical;
}

.btn-group {
  display: grid;
  gap: 8px;
  margin-top: 8px;
}

.btn {
  line-height: inherit;
  border: var(--cancel-border);
  border-radius: var(--form-content-border-radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
}
.btn[disabled] {
  opacity: 0.6;
  pointer-events: none;
}

.btn--primary {
  background-color: var(--submit-background);
  border-color: var(--submit-border);
  color: var(--submit-foreground);
}
.btn--primary:hover {
  background-color: var(--submit-background-hover);
  color: var(--submit-foreground-hover);
}
.btn--primary:focus-visible {
  outline: 1px auto var(--submit-outline-focus);
}

.btn--default {
  background-color: var(--cancel-background);
  color: var(--cancel-foreground);
  font-weight: 500;
}
.btn--default:hover {
  background-color: var(--cancel-background-hover);
  color: var(--cancel-foreground-hover);
}
.btn--default:focus-visible {
  outline: 1px auto var(--cancel-outline-focus);
}

.success-message {
  background-color: var(--background);
  border: var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  font-weight: 600;
  color: var(--success);
  padding: 12px 24px;
  line-height: 25px;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  gap: 6px;
  cursor: default;
}

.success-icon path {
  fill: var(--success);
}
`;
  return style;
}
function getThemedCssVariables(theme) {
  return `
  --background: ${theme.background};
  --background-hover: ${theme.backgroundHover};
  --foreground: ${theme.foreground};
  --error: ${theme.error};
  --success: ${theme.success};
  --border: ${theme.border};
  --border-radius: ${theme.borderRadius};
  --box-shadow: ${theme.boxShadow};

  --submit-background: ${theme.submitBackground};
  --submit-background-hover: ${theme.submitBackgroundHover};
  --submit-border: ${theme.submitBorder};
  --submit-outline-focus: ${theme.submitOutlineFocus};
  --submit-foreground: ${theme.submitForeground};
  --submit-foreground-hover: ${theme.submitForegroundHover};

  --cancel-background: ${theme.cancelBackground};
  --cancel-background-hover: ${theme.cancelBackgroundHover};
  --cancel-border: ${theme.cancelBorder};
  --cancel-outline-focus: ${theme.cancelOutlineFocus};
  --cancel-foreground: ${theme.cancelForeground};
  --cancel-foreground-hover: ${theme.cancelForegroundHover};

  --input-background: ${theme.inputBackground};
  --input-foreground: ${theme.inputForeground};
  --input-border: ${theme.inputBorder};
  --input-outline-focus: ${theme.inputOutlineFocus};

  --form-border-radius: ${theme.formBorderRadius};
  --form-content-border-radius: ${theme.formContentBorderRadius};
  `;
}
function createMainStyles(d, colorScheme, themes) {
  const style = d.createElement("style");
  style.textContent = `
:host {
  --bottom: 1rem;
  --right: 1rem;
  --top: auto;
  --left: auto;
  --z-index: 100000;
  --font-family: ${themes.light.fontFamily};
  --font-size: ${themes.light.fontSize};

  position: fixed;
  left: var(--left);
  right: var(--right);
  bottom: var(--bottom);
  top: var(--top);
  z-index: var(--z-index);

  font-family: var(--font-family);
  font-size: var(--font-size);

  ${getThemedCssVariables(colorScheme === "dark" ? themes.dark : themes.light)}
}

${colorScheme === "system" ? `
@media (prefers-color-scheme: dark) {
  :host {
    ${getThemedCssVariables(themes.dark)}
  }
}` : ""}
}`;
  return style;
}
function createShadowHost({ id, colorScheme, themeDark, themeLight }) {
  try {
    const doc2 = WINDOW10.document;
    const host = doc2.createElement("div");
    host.id = id;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.appendChild(createMainStyles(doc2, colorScheme, { dark: themeDark, light: themeLight }));
    shadow.appendChild(createDialogStyles(doc2));
    return { shadow, host };
  } catch (e2) {
    logger.warn("[Feedback] Browser does not support shadow DOM API");
    throw new Error("Browser does not support shadow DOM API.");
  }
}
async function handleFeedbackSubmit(dialog, feedback, options) {
  if (!dialog) {
    return;
  }
  const showFetchError = () => {
    if (!dialog) {
      return;
    }
    dialog.showError("There was a problem submitting feedback, please wait and try again.");
  };
  dialog.hideError();
  try {
    const resp = await sendFeedback({ ...feedback, source: FEEDBACK_WIDGET_SOURCE }, options);
    return resp;
  } catch (err) {
    DEBUG_BUILD6 && logger.error(err);
    showFetchError();
  }
}
function setAttributesNS(el, attributes) {
  Object.entries(attributes).forEach(([key, val]) => {
    el.setAttributeNS(null, key, val);
  });
  return el;
}
var SIZE = 20;
var XMLNS$2 = "http://www.w3.org/2000/svg";
function Icon() {
  const createElementNS = (tagName) => WINDOW10.document.createElementNS(XMLNS$2, tagName);
  const svg = setAttributesNS(createElementNS("svg"), {
    class: "feedback-icon",
    width: `${SIZE}`,
    height: `${SIZE}`,
    viewBox: `0 0 ${SIZE} ${SIZE}`,
    fill: "none"
  });
  const g = setAttributesNS(createElementNS("g"), {
    clipPath: "url(#clip0_57_80)"
  });
  const path = setAttributesNS(createElementNS("path"), {
    ["fill-rule"]: "evenodd",
    ["clip-rule"]: "evenodd",
    d: "M15.6622 15H12.3997C12.2129 14.9959 12.031 14.9396 11.8747 14.8375L8.04965 12.2H7.49956V19.1C7.4875 19.3348 7.3888 19.5568 7.22256 19.723C7.05632 19.8892 6.83435 19.9879 6.59956 20H2.04956C1.80193 19.9968 1.56535 19.8969 1.39023 19.7218C1.21511 19.5467 1.1153 19.3101 1.11206 19.0625V12.2H0.949652C0.824431 12.2017 0.700142 12.1783 0.584123 12.1311C0.468104 12.084 0.362708 12.014 0.274155 11.9255C0.185602 11.8369 0.115689 11.7315 0.0685419 11.6155C0.0213952 11.4995 -0.00202913 11.3752 -0.00034808 11.25V3.75C-0.00900498 3.62067 0.0092504 3.49095 0.0532651 3.36904C0.0972798 3.24712 0.166097 3.13566 0.255372 3.04168C0.344646 2.94771 0.452437 2.87327 0.571937 2.82307C0.691437 2.77286 0.82005 2.74798 0.949652 2.75H8.04965L11.8747 0.1625C12.031 0.0603649 12.2129 0.00407221 12.3997 0H15.6622C15.9098 0.00323746 16.1464 0.103049 16.3215 0.278167C16.4966 0.453286 16.5964 0.689866 16.5997 0.9375V3.25269C17.3969 3.42959 18.1345 3.83026 18.7211 4.41679C19.5322 5.22788 19.9878 6.32796 19.9878 7.47502C19.9878 8.62209 19.5322 9.72217 18.7211 10.5333C18.1345 11.1198 17.3969 11.5205 16.5997 11.6974V14.0125C16.6047 14.1393 16.5842 14.2659 16.5395 14.3847C16.4948 14.5035 16.4268 14.6121 16.3394 14.7042C16.252 14.7962 16.147 14.8698 16.0307 14.9206C15.9144 14.9714 15.7891 14.9984 15.6622 15ZM1.89695 10.325H1.88715V4.625H8.33715C8.52423 4.62301 8.70666 4.56654 8.86215 4.4625L12.6872 1.875H14.7247V13.125H12.6872L8.86215 10.4875C8.70666 10.3835 8.52423 10.327 8.33715 10.325H2.20217C2.15205 10.3167 2.10102 10.3125 2.04956 10.3125C1.9981 10.3125 1.94708 10.3167 1.89695 10.325ZM2.98706 12.2V18.1625H5.66206V12.2H2.98706ZM16.5997 9.93612V5.01393C16.6536 5.02355 16.7072 5.03495 16.7605 5.04814C17.1202 5.13709 17.4556 5.30487 17.7425 5.53934C18.0293 5.77381 18.2605 6.06912 18.4192 6.40389C18.578 6.73866 18.6603 7.10452 18.6603 7.47502C18.6603 7.84552 18.578 8.21139 18.4192 8.54616C18.2605 8.88093 18.0293 9.17624 17.7425 9.41071C17.4556 9.64518 17.1202 9.81296 16.7605 9.90191C16.7072 9.91509 16.6536 9.9265 16.5997 9.93612Z"
  });
  svg.appendChild(g).appendChild(path);
  const speakerDefs = createElementNS("defs");
  const speakerClipPathDef = setAttributesNS(createElementNS("clipPath"), {
    id: "clip0_57_80"
  });
  const speakerRect = setAttributesNS(createElementNS("rect"), {
    width: `${SIZE}`,
    height: `${SIZE}`,
    fill: "white"
  });
  speakerClipPathDef.appendChild(speakerRect);
  speakerDefs.appendChild(speakerClipPathDef);
  svg.appendChild(speakerDefs).appendChild(speakerClipPathDef).appendChild(speakerRect);
  return {
    get el() {
      return svg;
    }
  };
}
function createElement(tagName, attributes, ...children) {
  const doc2 = WINDOW10.document;
  const element = doc2.createElement(tagName);
  if (attributes) {
    Object.entries(attributes).forEach(([attribute, attributeValue]) => {
      if (attribute === "className" && typeof attributeValue === "string") {
        element.setAttribute("class", attributeValue);
      } else if (typeof attributeValue === "boolean" && attributeValue) {
        element.setAttribute(attribute, "");
      } else if (typeof attributeValue === "string") {
        element.setAttribute(attribute, attributeValue);
      } else if (attribute.startsWith("on") && typeof attributeValue === "function") {
        element.addEventListener(attribute.substring(2).toLowerCase(), attributeValue);
      }
    });
  }
  for (const child of children) {
    appendChild(element, child);
  }
  return element;
}
function appendChild(parent, child) {
  const doc2 = WINDOW10.document;
  if (typeof child === "undefined" || child === null) {
    return;
  }
  if (Array.isArray(child)) {
    for (const value of child) {
      appendChild(parent, value);
    }
  } else if (child === false)
    ;
  else if (typeof child === "string") {
    parent.appendChild(doc2.createTextNode(child));
  } else if (child instanceof Node) {
    parent.appendChild(child);
  } else {
    parent.appendChild(doc2.createTextNode(String(child)));
  }
}
function Actor({ buttonLabel, onClick }) {
  function _handleClick(e2) {
    onClick && onClick(e2);
  }
  const el = createElement(
    "button",
    {
      type: "button",
      className: "widget__actor",
      ["aria-label"]: buttonLabel,
      ["aria-hidden"]: "false"
    },
    Icon().el,
    buttonLabel ? createElement(
      "span",
      {
        className: "widget__actor__text"
      },
      buttonLabel
    ) : null
  );
  el.addEventListener("click", _handleClick);
  return {
    get el() {
      return el;
    },
    show: () => {
      el.classList.remove("widget__actor--hidden");
      el.setAttribute("aria-hidden", "false");
    },
    hide: () => {
      el.classList.add("widget__actor--hidden");
      el.setAttribute("aria-hidden", "true");
    }
  };
}
function SubmitButton({ label }) {
  const el = createElement(
    "button",
    {
      type: "submit",
      className: "btn btn--primary",
      ["aria-label"]: label
    },
    label
  );
  return {
    el
  };
}
function retrieveStringValue(formData, key) {
  const value = formData.get(key);
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}
function Form({
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  messageLabel,
  messagePlaceholder,
  cancelButtonLabel,
  submitButtonLabel,
  showName,
  showEmail,
  isNameRequired,
  isEmailRequired,
  defaultName,
  defaultEmail,
  onCancel,
  onSubmit
}) {
  const { el: submitEl } = SubmitButton({
    label: submitButtonLabel
  });
  function handleSubmit(e2) {
    e2.preventDefault();
    if (!(e2.target instanceof HTMLFormElement)) {
      return;
    }
    try {
      if (onSubmit) {
        const formData = new FormData(e2.target);
        const feedback = {
          name: retrieveStringValue(formData, "name"),
          email: retrieveStringValue(formData, "email"),
          message: retrieveStringValue(formData, "message")
        };
        onSubmit(feedback);
      }
    } catch (e22) {
    }
  }
  const errorEl = createElement("div", {
    className: "form__error-container form__error-container--hidden",
    ["aria-hidden"]: "true"
  });
  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove("form__error-container--hidden");
    errorEl.setAttribute("aria-hidden", "false");
  }
  function hideError() {
    errorEl.textContent = "";
    errorEl.classList.add("form__error-container--hidden");
    errorEl.setAttribute("aria-hidden", "true");
  }
  const nameEl = createElement("input", {
    id: "name",
    type: showName ? "text" : "hidden",
    ["aria-hidden"]: showName ? "false" : "true",
    name: "name",
    required: isNameRequired,
    className: "form__input",
    placeholder: namePlaceholder,
    value: defaultName
  });
  const emailEl = createElement("input", {
    id: "email",
    type: showEmail ? "text" : "hidden",
    ["aria-hidden"]: showEmail ? "false" : "true",
    name: "email",
    required: isEmailRequired,
    className: "form__input",
    placeholder: emailPlaceholder,
    value: defaultEmail
  });
  const messageEl = createElement("textarea", {
    id: "message",
    autoFocus: "true",
    rows: "5",
    name: "message",
    required: true,
    className: "form__input form__input--textarea",
    placeholder: messagePlaceholder
  });
  const cancelEl = createElement(
    "button",
    {
      type: "button",
      className: "btn btn--default",
      ["aria-label"]: cancelButtonLabel,
      onClick: (e2) => {
        onCancel && onCancel(e2);
      }
    },
    cancelButtonLabel
  );
  const formEl = createElement(
    "form",
    {
      className: "form",
      onSubmit: handleSubmit
    },
    [
      errorEl,
      showName && createElement(
        "label",
        {
          htmlFor: "name",
          className: "form__label"
        },
        [
          createElement(
            "span",
            { className: "form__label__text" },
            nameLabel,
            isNameRequired && createElement("span", { className: "form__label__text--required" }, " (required)")
          ),
          nameEl
        ]
      ),
      !showName && nameEl,
      showEmail && createElement(
        "label",
        {
          htmlFor: "email",
          className: "form__label"
        },
        [
          createElement(
            "span",
            { className: "form__label__text" },
            emailLabel,
            isEmailRequired && createElement("span", { className: "form__label__text--required" }, " (required)")
          ),
          emailEl
        ]
      ),
      !showEmail && emailEl,
      createElement(
        "label",
        {
          htmlFor: "message",
          className: "form__label"
        },
        [
          createElement(
            "span",
            { className: "form__label__text" },
            messageLabel,
            createElement("span", { className: "form__label__text--required" }, " (required)")
          ),
          messageEl
        ]
      ),
      createElement(
        "div",
        {
          className: "btn-group"
        },
        [submitEl, cancelEl]
      )
    ]
  );
  return {
    get el() {
      return formEl;
    },
    showError,
    hideError
  };
}
var XMLNS$1 = "http://www.w3.org/2000/svg";
function Logo({ colorScheme }) {
  const createElementNS = (tagName) => WINDOW10.document.createElementNS(XMLNS$1, tagName);
  const svg = setAttributesNS(createElementNS("svg"), {
    class: "sentry-logo",
    width: "32",
    height: "30",
    viewBox: "0 0 72 66",
    fill: "none"
  });
  const path = setAttributesNS(createElementNS("path"), {
    transform: "translate(11, 11)",
    d: "M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
  });
  svg.append(path);
  const defs = createElementNS("defs");
  const style = createElementNS("style");
  style.textContent = `
    path {
      fill: ${colorScheme === "dark" ? "#fff" : "#362d59"};
    }`;
  if (colorScheme === "system") {
    style.textContent += `
    @media (prefers-color-scheme: dark) {
      path: {
        fill: '#fff';
      }
    }
    `;
  }
  defs.append(style);
  svg.append(defs);
  return {
    get el() {
      return svg;
    }
  };
}
function Dialog({
  formTitle,
  showBranding,
  showName,
  showEmail,
  isNameRequired,
  isEmailRequired,
  colorScheme,
  defaultName,
  defaultEmail,
  onClosed,
  onCancel,
  onSubmit,
  ...textLabels
}) {
  let el = null;
  function handleDialogClick() {
    close2();
    onClosed && onClosed();
  }
  function close2() {
    if (el) {
      el.open = false;
    }
  }
  function open() {
    if (el) {
      el.open = true;
    }
  }
  function checkIsOpen() {
    return el && el.open === true || false;
  }
  const {
    el: formEl,
    showError,
    hideError
  } = Form({
    showEmail,
    showName,
    isEmailRequired,
    isNameRequired,
    defaultName,
    defaultEmail,
    onSubmit,
    onCancel,
    ...textLabels
  });
  el = createElement(
    "dialog",
    {
      className: "dialog",
      open: true,
      onClick: handleDialogClick
    },
    createElement(
      "div",
      {
        className: "dialog__content",
        onClick: (e2) => {
          e2.stopPropagation();
        }
      },
      createElement(
        "h2",
        { className: "dialog__header" },
        formTitle,
        showBranding && createElement(
          "a",
          {
            className: "brand-link",
            target: "_blank",
            href: "https://sentry.io/welcome/",
            title: "Powered by Sentry",
            rel: "noopener noreferrer"
          },
          Logo({ colorScheme }).el
        )
      ),
      formEl
    )
  );
  return {
    get el() {
      return el;
    },
    showError,
    hideError,
    open,
    close: close2,
    checkIsOpen
  };
}
var WIDTH = 16;
var HEIGHT = 17;
var XMLNS = "http://www.w3.org/2000/svg";
function SuccessIcon() {
  const createElementNS = (tagName) => WINDOW10.document.createElementNS(XMLNS, tagName);
  const svg = setAttributesNS(createElementNS("svg"), {
    class: "success-icon",
    width: `${WIDTH}`,
    height: `${HEIGHT}`,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none"
  });
  const g = setAttributesNS(createElementNS("g"), {
    clipPath: "url(#clip0_57_156)"
  });
  const path2 = setAttributesNS(createElementNS("path"), {
    ["fill-rule"]: "evenodd",
    ["clip-rule"]: "evenodd",
    d: "M3.55544 15.1518C4.87103 16.0308 6.41775 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.91775 15.5308 5.37103 14.6518 4.05544C13.7727 2.73985 12.5233 1.71447 11.0615 1.10897C9.59966 0.503466 7.99113 0.34504 6.43928 0.653721C4.88743 0.962403 3.46197 1.72433 2.34315 2.84315C1.22433 3.96197 0.462403 5.38743 0.153721 6.93928C-0.15496 8.49113 0.00346625 10.0997 0.608967 11.5615C1.21447 13.0233 2.23985 14.2727 3.55544 15.1518ZM4.40546 3.1204C5.46945 2.40946 6.72036 2.03 8 2.03C9.71595 2.03 11.3616 2.71166 12.575 3.92502C13.7883 5.13838 14.47 6.78405 14.47 8.5C14.47 9.77965 14.0905 11.0306 13.3796 12.0945C12.6687 13.1585 11.6582 13.9878 10.476 14.4775C9.29373 14.9672 7.99283 15.0953 6.73777 14.8457C5.48271 14.596 4.32987 13.9798 3.42502 13.075C2.52018 12.1701 1.90397 11.0173 1.65432 9.76224C1.40468 8.50718 1.5328 7.20628 2.0225 6.02404C2.5122 4.8418 3.34148 3.83133 4.40546 3.1204Z"
  });
  const path = setAttributesNS(createElementNS("path"), {
    d: "M6.68775 12.4297C6.78586 12.4745 6.89218 12.4984 7 12.5C7.11275 12.4955 7.22315 12.4664 7.32337 12.4145C7.4236 12.3627 7.51121 12.2894 7.58 12.2L12 5.63999C12.0848 5.47724 12.1071 5.28902 12.0625 5.11098C12.0178 4.93294 11.9095 4.77744 11.7579 4.67392C11.6064 4.57041 11.4221 4.52608 11.24 4.54931C11.0579 4.57254 10.8907 4.66173 10.77 4.79999L6.88 10.57L5.13 8.56999C5.06508 8.49566 4.98613 8.43488 4.89768 8.39111C4.80922 8.34735 4.713 8.32148 4.61453 8.31498C4.51605 8.30847 4.41727 8.32147 4.32382 8.35322C4.23038 8.38497 4.14413 8.43484 4.07 8.49999C3.92511 8.63217 3.83692 8.81523 3.82387 9.01092C3.81083 9.2066 3.87393 9.39976 4 9.54999L6.43 12.24C6.50187 12.3204 6.58964 12.385 6.68775 12.4297Z"
  });
  svg.appendChild(g).append(path, path2);
  const speakerDefs = createElementNS("defs");
  const speakerClipPathDef = setAttributesNS(createElementNS("clipPath"), {
    id: "clip0_57_156"
  });
  const speakerRect = setAttributesNS(createElementNS("rect"), {
    width: `${WIDTH}`,
    height: `${WIDTH}`,
    fill: "white",
    transform: "translate(0 0.5)"
  });
  speakerClipPathDef.appendChild(speakerRect);
  speakerDefs.appendChild(speakerClipPathDef);
  svg.appendChild(speakerDefs).appendChild(speakerClipPathDef).appendChild(speakerRect);
  return {
    get el() {
      return svg;
    }
  };
}
function SuccessMessage({ message, onRemove }) {
  function remove() {
    if (!el) {
      return;
    }
    el.remove();
    onRemove && onRemove();
  }
  const el = createElement(
    "div",
    {
      className: "success-message",
      onClick: remove
    },
    SuccessIcon().el,
    message
  );
  return {
    el,
    remove
  };
}
function createWidget({
  shadow,
  options: { shouldCreateActor = true, ...options },
  attachTo
}) {
  let actor;
  let dialog;
  let isDialogOpen = false;
  function showSuccessMessage() {
    if (!shadow) {
      return;
    }
    try {
      const success = SuccessMessage({
        message: options.successMessageText,
        onRemove: () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          showActor();
        }
      });
      if (!success.el) {
        throw new Error("Unable to show success message");
      }
      shadow.appendChild(success.el);
      const timeoutId = setTimeout(() => {
        if (success) {
          success.remove();
        }
      }, 5e3);
    } catch (err) {
      logger.error(err);
    }
  }
  async function _handleFeedbackSubmit(feedback) {
    if (!dialog) {
      return;
    }
    const emptyField = [];
    if (options.isNameRequired && !feedback.name) {
      emptyField.push(options.nameLabel);
    }
    if (options.isEmailRequired && !feedback.email) {
      emptyField.push(options.emailLabel);
    }
    if (!feedback.message) {
      emptyField.push(options.messageLabel);
    }
    if (emptyField.length > 0) {
      dialog.showError(`Please enter in the following required fields: ${emptyField.join(", ")}`);
      return;
    }
    const result = await handleFeedbackSubmit(dialog, feedback);
    if (!result) {
      if (options.onSubmitError) {
        options.onSubmitError();
      }
      return;
    }
    removeDialog();
    showSuccessMessage();
    if (options.onSubmitSuccess) {
      options.onSubmitSuccess();
    }
  }
  function handleOpenDialog() {
    const client = getClient();
    const replay = client && client.getIntegrationByName && client.getIntegrationByName("Replay");
    if (!replay) {
      return;
    }
    replay.flush().catch((err) => {
      DEBUG_BUILD6 && logger.error(err);
    });
  }
  function showActor() {
    actor && actor.show();
  }
  function hideActor() {
    actor && actor.hide();
  }
  function removeActor() {
    actor && actor.el && actor.el.remove();
  }
  function openDialog() {
    try {
      if (dialog) {
        dialog.open();
        isDialogOpen = true;
        if (options.onFormOpen) {
          options.onFormOpen();
        }
        handleOpenDialog();
        return;
      }
      const userKey = options.useSentryUser;
      const scope = getCurrentScope();
      const user = scope && scope.getUser();
      dialog = Dialog({
        colorScheme: options.colorScheme,
        showBranding: options.showBranding,
        showName: options.showName || options.isNameRequired,
        showEmail: options.showEmail || options.isEmailRequired,
        isNameRequired: options.isNameRequired,
        isEmailRequired: options.isEmailRequired,
        formTitle: options.formTitle,
        cancelButtonLabel: options.cancelButtonLabel,
        submitButtonLabel: options.submitButtonLabel,
        emailLabel: options.emailLabel,
        emailPlaceholder: options.emailPlaceholder,
        messageLabel: options.messageLabel,
        messagePlaceholder: options.messagePlaceholder,
        nameLabel: options.nameLabel,
        namePlaceholder: options.namePlaceholder,
        defaultName: userKey && user && user[userKey.name] || "",
        defaultEmail: userKey && user && user[userKey.email] || "",
        onClosed: () => {
          showActor();
          isDialogOpen = false;
          if (options.onFormClose) {
            options.onFormClose();
          }
        },
        onCancel: () => {
          closeDialog();
          showActor();
        },
        onSubmit: _handleFeedbackSubmit
      });
      if (!dialog.el) {
        throw new Error("Unable to open Feedback dialog");
      }
      shadow.appendChild(dialog.el);
      hideActor();
      if (options.onFormOpen) {
        options.onFormOpen();
      }
      handleOpenDialog();
    } catch (err) {
      logger.error(err);
    }
  }
  function closeDialog() {
    if (dialog) {
      dialog.close();
      isDialogOpen = false;
      if (options.onFormClose) {
        options.onFormClose();
      }
    }
  }
  function removeDialog() {
    if (dialog) {
      closeDialog();
      const dialogEl = dialog.el;
      dialogEl && dialogEl.remove();
      dialog = void 0;
    }
  }
  function handleActorClick() {
    if (!isDialogOpen) {
      openDialog();
    }
    hideActor();
  }
  if (attachTo) {
    attachTo.addEventListener("click", handleActorClick);
  } else if (shouldCreateActor) {
    actor = Actor({ buttonLabel: options.buttonLabel, onClick: handleActorClick });
    actor.el && shadow.appendChild(actor.el);
  }
  return {
    get actor() {
      return actor;
    },
    get dialog() {
      return dialog;
    },
    showActor,
    hideActor,
    removeActor,
    openDialog,
    closeDialog,
    removeDialog
  };
}
var doc = WINDOW10.document;
var feedbackIntegration = (options) => {
  return new Feedback(options);
};
var Feedback = class _Feedback {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Feedback";
  }
  /**
   * @inheritDoc
   */
  /**
   * Feedback configuration options
   */
  /**
   * Reference to widget element that is created when autoInject is true
   */
  /**
   * List of all widgets that are created from the integration
   */
  /**
   * Reference to the host element where widget is inserted
   */
  /**
   * Refernce to Shadow DOM root
   */
  /**
   * Tracks if actor styles have ever been inserted into shadow DOM
   */
  constructor({
    autoInject = true,
    id = "sentry-feedback",
    isEmailRequired = false,
    isNameRequired = false,
    showBranding = true,
    showEmail = true,
    showName = true,
    useSentryUser = {
      email: "email",
      name: "username"
    },
    themeDark,
    themeLight,
    colorScheme = "system",
    buttonLabel = ACTOR_LABEL,
    cancelButtonLabel = CANCEL_BUTTON_LABEL,
    submitButtonLabel = SUBMIT_BUTTON_LABEL,
    formTitle = FORM_TITLE,
    emailPlaceholder = EMAIL_PLACEHOLDER,
    emailLabel = EMAIL_LABEL,
    messagePlaceholder = MESSAGE_PLACEHOLDER,
    messageLabel = MESSAGE_LABEL,
    namePlaceholder = NAME_PLACEHOLDER,
    nameLabel = NAME_LABEL,
    successMessageText = SUCCESS_MESSAGE_TEXT,
    onFormClose,
    onFormOpen,
    onSubmitError,
    onSubmitSuccess
  } = {}) {
    this.name = _Feedback.id;
    this._host = null;
    this._shadow = null;
    this._widget = null;
    this._widgets = /* @__PURE__ */ new Set();
    this._hasInsertedActorStyles = false;
    this.options = {
      autoInject,
      showBranding,
      id,
      isEmailRequired,
      isNameRequired,
      showEmail,
      showName,
      useSentryUser,
      colorScheme,
      themeDark: {
        ...DEFAULT_THEME.dark,
        ...themeDark
      },
      themeLight: {
        ...DEFAULT_THEME.light,
        ...themeLight
      },
      buttonLabel,
      cancelButtonLabel,
      submitButtonLabel,
      formTitle,
      emailLabel,
      emailPlaceholder,
      messageLabel,
      messagePlaceholder,
      nameLabel,
      namePlaceholder,
      successMessageText,
      onFormClose,
      onFormOpen,
      onSubmitError,
      onSubmitSuccess
    };
  }
  /**
   * Setup and initialize feedback container
   */
  setupOnce() {
    if (!isBrowser()) {
      return;
    }
    try {
      this._cleanupWidgetIfExists();
      const { autoInject } = this.options;
      if (!autoInject) {
        return;
      }
      this._createWidget(this.options);
    } catch (err) {
      DEBUG_BUILD6 && logger.error(err);
    }
  }
  /**
   * Allows user to open the dialog box. Creates a new widget if
   * `autoInject` was false, otherwise re-uses the default widget that was
   * created during initialization of the integration.
   */
  openDialog() {
    if (!this._widget) {
      this._createWidget({ ...this.options, shouldCreateActor: false });
    }
    if (!this._widget) {
      return;
    }
    this._widget.openDialog();
  }
  /**
   * Closes the dialog for the default widget, if it exists
   */
  closeDialog() {
    if (!this._widget) {
      return;
    }
    this._widget.closeDialog();
  }
  /**
   * Adds click listener to attached element to open a feedback dialog
   */
  attachTo(el, optionOverrides) {
    try {
      const options = mergeOptions(this.options, optionOverrides || {});
      return this._ensureShadowHost(options, ({ shadow }) => {
        const targetEl = typeof el === "string" ? doc.querySelector(el) : typeof el.addEventListener === "function" ? el : null;
        if (!targetEl) {
          DEBUG_BUILD6 && logger.error("[Feedback] Unable to attach to target element");
          return null;
        }
        const widget = createWidget({ shadow, options, attachTo: targetEl });
        this._widgets.add(widget);
        if (!this._widget) {
          this._widget = widget;
        }
        return widget;
      });
    } catch (err) {
      DEBUG_BUILD6 && logger.error(err);
      return null;
    }
  }
  /**
   * Creates a new widget. Accepts partial options to override any options passed to constructor.
   */
  createWidget(optionOverrides) {
    try {
      return this._createWidget(mergeOptions(this.options, optionOverrides || {}));
    } catch (err) {
      DEBUG_BUILD6 && logger.error(err);
      return null;
    }
  }
  /**
   * Removes a single widget
   */
  removeWidget(widget) {
    if (!widget) {
      return false;
    }
    try {
      if (this._widgets.has(widget)) {
        widget.removeActor();
        widget.removeDialog();
        this._widgets.delete(widget);
        if (this._widget === widget) {
          this._widget = null;
        }
        return true;
      }
    } catch (err) {
      DEBUG_BUILD6 && logger.error(err);
    }
    return false;
  }
  /**
   * Returns the default (first-created) widget
   */
  getWidget() {
    return this._widget;
  }
  /**
   * Removes the Feedback integration (including host, shadow DOM, and all widgets)
   */
  remove() {
    if (this._host) {
      this._host.remove();
    }
    this._initialize();
  }
  /**
   * Initializes values of protected properties
   */
  _initialize() {
    this._host = null;
    this._shadow = null;
    this._widget = null;
    this._widgets = /* @__PURE__ */ new Set();
    this._hasInsertedActorStyles = false;
  }
  /**
   * Clean-up the widget if it already exists in the DOM. This shouldn't happen
   * in prod, but can happen in development with hot module reloading.
   */
  _cleanupWidgetIfExists() {
    if (this._host) {
      this.remove();
    }
    const existingFeedback = doc.querySelector(`#${this.options.id}`);
    if (existingFeedback) {
      existingFeedback.remove();
    }
  }
  /**
   * Creates a new widget, after ensuring shadow DOM exists
   */
  _createWidget(options) {
    return this._ensureShadowHost(options, ({ shadow }) => {
      const widget = createWidget({ shadow, options });
      if (!this._hasInsertedActorStyles && widget.actor) {
        shadow.appendChild(createActorStyles(doc));
        this._hasInsertedActorStyles = true;
      }
      this._widgets.add(widget);
      if (!this._widget) {
        this._widget = widget;
      }
      return widget;
    });
  }
  /**
   * Ensures that shadow DOM exists and is added to the DOM
   */
  _ensureShadowHost(options, cb) {
    let needsAppendHost = false;
    if (!this._shadow || !this._host) {
      const { id, colorScheme, themeLight, themeDark } = options;
      const { shadow, host } = createShadowHost({
        id,
        colorScheme,
        themeLight,
        themeDark
      });
      this._shadow = shadow;
      this._host = host;
      needsAppendHost = true;
    }
    this._host.dataset.sentryFeedbackColorscheme = options.colorScheme;
    const result = cb({ shadow: this._shadow, host: this._host });
    if (needsAppendHost) {
      doc.body.appendChild(this._host);
    }
    return result;
  }
};
Feedback.__initStatic();

// node_modules/@sentry/browser/esm/transports/offline.js
function promisifyRequest(request) {
  return new Promise((resolve2, reject) => {
    request.oncomplete = request.onsuccess = () => resolve2(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (callback) => dbp.then((db) => callback(db.transaction(storeName, "readwrite").objectStore(storeName)));
}
function keys(store) {
  return promisifyRequest(store.getAllKeys());
}
function insert(store, value, maxQueueSize) {
  return store((store2) => {
    return keys(store2).then((keys2) => {
      if (keys2.length >= maxQueueSize) {
        return;
      }
      store2.put(value, Math.max(...keys2, 0) + 1);
      return promisifyRequest(store2.transaction);
    });
  });
}
function pop(store) {
  return store((store2) => {
    return keys(store2).then((keys2) => {
      if (keys2.length === 0) {
        return void 0;
      }
      return promisifyRequest(store2.get(keys2[0])).then((value) => {
        store2.delete(keys2[0]);
        return promisifyRequest(store2.transaction).then(() => value);
      });
    });
  });
}
function createIndexedDbStore(options) {
  let store;
  function getStore() {
    if (store == void 0) {
      store = createStore(options.dbName || "sentry-offline", options.storeName || "queue");
    }
    return store;
  }
  return {
    insert: async (env) => {
      try {
        const serialized = await serializeEnvelope(env, options.textEncoder);
        await insert(getStore(), serialized, options.maxQueueSize || 30);
      } catch (_) {
      }
    },
    pop: async () => {
      try {
        const deserialized = await pop(getStore());
        if (deserialized) {
          return parseEnvelope(
            deserialized,
            options.textEncoder || new TextEncoder(),
            options.textDecoder || new TextDecoder()
          );
        }
      } catch (_) {
      }
      return void 0;
    }
  };
}
function makeIndexedDbOfflineTransport(createTransport2) {
  return (options) => createTransport2({ ...options, createStore: createIndexedDbStore });
}
function makeBrowserOfflineTransport(createTransport2) {
  return makeIndexedDbOfflineTransport(makeOfflineTransport(createTransport2));
}

// node_modules/@sentry/browser/esm/profiling/utils.js
var MS_TO_NS = 1e6;
var THREAD_ID_STRING = String(0);
var THREAD_NAME = "main";
var OS_PLATFORM = "";
var OS_PLATFORM_VERSION = "";
var OS_ARCH = "";
var OS_BROWSER = WINDOW8.navigator && WINDOW8.navigator.userAgent || "";
var OS_MODEL = "";
var OS_LOCALE = WINDOW8.navigator && WINDOW8.navigator.language || WINDOW8.navigator && WINDOW8.navigator.languages && WINDOW8.navigator.languages[0] || "";
function isUserAgentData(data) {
  return typeof data === "object" && data !== null && "getHighEntropyValues" in data;
}
var userAgentData = WINDOW8.navigator && WINDOW8.navigator.userAgentData;
if (isUserAgentData(userAgentData)) {
  userAgentData.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "fullVersionList"]).then((ua) => {
    OS_PLATFORM = ua.platform || "";
    OS_ARCH = ua.architecture || "";
    OS_MODEL = ua.model || "";
    OS_PLATFORM_VERSION = ua.platformVersion || "";
    if (ua.fullVersionList && ua.fullVersionList.length > 0) {
      const firstUa = ua.fullVersionList[ua.fullVersionList.length - 1];
      OS_BROWSER = `${firstUa.brand} ${firstUa.version}`;
    }
  }).catch((e2) => void 0);
}
function isProcessedJSSelfProfile(profile) {
  return !("thread_metadata" in profile);
}
function enrichWithThreadInformation(profile) {
  if (!isProcessedJSSelfProfile(profile)) {
    return profile;
  }
  return convertJSSelfProfileToSampledFormat(profile);
}
function getTraceId(event) {
  const traceId = event && event.contexts && event.contexts["trace"] && event.contexts["trace"]["trace_id"];
  if (typeof traceId === "string" && traceId.length !== 32) {
    if (DEBUG_BUILD4) {
      logger.log(`[Profiling] Invalid traceId: ${traceId} on profiled event`);
    }
  }
  if (typeof traceId !== "string") {
    return "";
  }
  return traceId;
}
function createProfilePayload(profile_id, start_timestamp, processed_profile, event) {
  if (event.type !== "transaction") {
    throw new TypeError("Profiling events may only be attached to transactions, this should never occur.");
  }
  if (processed_profile === void 0 || processed_profile === null) {
    throw new TypeError(
      `Cannot construct profiling event envelope without a valid profile. Got ${processed_profile} instead.`
    );
  }
  const traceId = getTraceId(event);
  const enrichedThreadProfile = enrichWithThreadInformation(processed_profile);
  const transactionStartMs = start_timestamp ? start_timestamp : typeof event.start_timestamp === "number" ? event.start_timestamp * 1e3 : Date.now();
  const transactionEndMs = typeof event.timestamp === "number" ? event.timestamp * 1e3 : Date.now();
  const profile = {
    event_id: profile_id,
    timestamp: new Date(transactionStartMs).toISOString(),
    platform: "javascript",
    version: "1",
    release: event.release || "",
    environment: event.environment || DEFAULT_ENVIRONMENT,
    runtime: {
      name: "javascript",
      version: WINDOW8.navigator.userAgent
    },
    os: {
      name: OS_PLATFORM,
      version: OS_PLATFORM_VERSION,
      build_number: OS_BROWSER
    },
    device: {
      locale: OS_LOCALE,
      model: OS_MODEL,
      manufacturer: OS_BROWSER,
      architecture: OS_ARCH,
      is_emulator: false
    },
    debug_meta: {
      images: applyDebugMetadata(processed_profile.resources)
    },
    profile: enrichedThreadProfile,
    transactions: [
      {
        name: event.transaction || "",
        id: event.event_id || uuid4(),
        trace_id: traceId,
        active_thread_id: THREAD_ID_STRING,
        relative_start_ns: "0",
        relative_end_ns: ((transactionEndMs - transactionStartMs) * 1e6).toFixed(0)
      }
    ]
  };
  return profile;
}
function isAutomatedPageLoadTransaction(transaction) {
  return transaction.op === "pageload";
}
function convertJSSelfProfileToSampledFormat(input) {
  let EMPTY_STACK_ID = void 0;
  let STACK_ID = 0;
  const profile = {
    samples: [],
    stacks: [],
    frames: [],
    thread_metadata: {
      [THREAD_ID_STRING]: { name: THREAD_NAME }
    }
  };
  if (!input.samples.length) {
    return profile;
  }
  const start = input.samples[0].timestamp;
  const origin = typeof performance.timeOrigin === "number" ? performance.timeOrigin : browserPerformanceTimeOrigin || 0;
  const adjustForOriginChange = origin - (browserPerformanceTimeOrigin || origin);
  for (let i = 0; i < input.samples.length; i++) {
    const jsSample = input.samples[i];
    if (jsSample.stackId === void 0) {
      if (EMPTY_STACK_ID === void 0) {
        EMPTY_STACK_ID = STACK_ID;
        profile.stacks[EMPTY_STACK_ID] = [];
        STACK_ID++;
      }
      profile["samples"][i] = {
        // convert ms timestamp to ns
        elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
        stack_id: EMPTY_STACK_ID,
        thread_id: THREAD_ID_STRING
      };
      continue;
    }
    let stackTop = input.stacks[jsSample.stackId];
    const stack = [];
    while (stackTop) {
      stack.push(stackTop.frameId);
      const frame = input.frames[stackTop.frameId];
      if (profile.frames[stackTop.frameId] === void 0) {
        profile.frames[stackTop.frameId] = {
          function: frame.name,
          abs_path: typeof frame.resourceId === "number" ? input.resources[frame.resourceId] : void 0,
          lineno: frame.line,
          colno: frame.column
        };
      }
      stackTop = stackTop.parentId === void 0 ? void 0 : input.stacks[stackTop.parentId];
    }
    const sample = {
      // convert ms timestamp to ns
      elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
      stack_id: STACK_ID,
      thread_id: THREAD_ID_STRING
    };
    profile["stacks"][STACK_ID] = stack;
    profile["samples"][i] = sample;
    STACK_ID++;
  }
  return profile;
}
function addProfilesToEnvelope(envelope, profiles) {
  if (!profiles.length) {
    return envelope;
  }
  for (const profile of profiles) {
    envelope[1].push([{ type: "profile" }, profile]);
  }
  return envelope;
}
function findProfiledTransactionsFromEnvelope(envelope) {
  const events = [];
  forEachEnvelopeItem(envelope, (item, type) => {
    if (type !== "transaction") {
      return;
    }
    for (let j = 1; j < item.length; j++) {
      const event = item[j];
      if (event && event.contexts && event.contexts["profile"] && event.contexts["profile"]["profile_id"]) {
        events.push(item[j]);
      }
    }
  });
  return events;
}
var debugIdStackParserCache2 = /* @__PURE__ */ new WeakMap();
function applyDebugMetadata(resource_paths) {
  const debugIdMap = GLOBAL_OBJ._sentryDebugIds;
  if (!debugIdMap) {
    return [];
  }
  const client = getClient();
  const options = client && client.getOptions();
  const stackParser = options && options.stackParser;
  if (!stackParser) {
    return [];
  }
  let debugIdStackFramesCache;
  const cachedDebugIdStackFrameCache = debugIdStackParserCache2.get(stackParser);
  if (cachedDebugIdStackFrameCache) {
    debugIdStackFramesCache = cachedDebugIdStackFrameCache;
  } else {
    debugIdStackFramesCache = /* @__PURE__ */ new Map();
    debugIdStackParserCache2.set(stackParser, debugIdStackFramesCache);
  }
  const filenameDebugIdMap = Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
    let parsedStack;
    const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
    if (cachedParsedStack) {
      parsedStack = cachedParsedStack;
    } else {
      parsedStack = stackParser(debugIdStackTrace);
      debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
    }
    for (let i = parsedStack.length - 1; i >= 0; i--) {
      const stackFrame = parsedStack[i];
      const file = stackFrame && stackFrame.filename;
      if (stackFrame && file) {
        acc[file] = debugIdMap[debugIdStackTrace];
        break;
      }
    }
    return acc;
  }, {});
  const images = [];
  for (const path of resource_paths) {
    if (path && filenameDebugIdMap[path]) {
      images.push({
        type: "sourcemap",
        code_file: path,
        debug_id: filenameDebugIdMap[path]
      });
    }
  }
  return images;
}
function isValidSampleRate2(rate) {
  if (typeof rate !== "number" && typeof rate !== "boolean" || typeof rate === "number" && isNaN(rate)) {
    DEBUG_BUILD4 && logger.warn(
      `[Profiling] Invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        rate
      )} of type ${JSON.stringify(typeof rate)}.`
    );
    return false;
  }
  if (rate === true || rate === false) {
    return true;
  }
  if (rate < 0 || rate > 1) {
    DEBUG_BUILD4 && logger.warn(`[Profiling] Invalid sample rate. Sample rate must be between 0 and 1. Got ${rate}.`);
    return false;
  }
  return true;
}
function isValidProfile(profile) {
  if (profile.samples.length < 2) {
    if (DEBUG_BUILD4) {
      logger.log("[Profiling] Discarding profile because it contains less than 2 samples");
    }
    return false;
  }
  if (!profile.frames.length) {
    if (DEBUG_BUILD4) {
      logger.log("[Profiling] Discarding profile because it contains no frames");
    }
    return false;
  }
  return true;
}
var PROFILING_CONSTRUCTOR_FAILED = false;
var MAX_PROFILE_DURATION_MS = 3e4;
function isJSProfilerSupported(maybeProfiler) {
  return typeof maybeProfiler === "function";
}
function startJSSelfProfile() {
  const JSProfilerConstructor = WINDOW8.Profiler;
  if (!isJSProfilerSupported(JSProfilerConstructor)) {
    if (DEBUG_BUILD4) {
      logger.log(
        "[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object."
      );
    }
    return;
  }
  const samplingIntervalMS = 10;
  const maxSamples = Math.floor(MAX_PROFILE_DURATION_MS / samplingIntervalMS);
  try {
    return new JSProfilerConstructor({ sampleInterval: samplingIntervalMS, maxBufferSize: maxSamples });
  } catch (e2) {
    if (DEBUG_BUILD4) {
      logger.log(
        "[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header."
      );
      logger.log("[Profiling] Disabling profiling for current user session.");
    }
    PROFILING_CONSTRUCTOR_FAILED = true;
  }
  return;
}
function shouldProfileTransaction(transaction) {
  if (PROFILING_CONSTRUCTOR_FAILED) {
    if (DEBUG_BUILD4) {
      logger.log("[Profiling] Profiling has been disabled for the duration of the current user session.");
    }
    return false;
  }
  if (!transaction.isRecording()) {
    if (DEBUG_BUILD4) {
      logger.log("[Profiling] Discarding profile because transaction was not sampled.");
    }
    return false;
  }
  const client = getClient();
  const options = client && client.getOptions();
  if (!options) {
    DEBUG_BUILD4 && logger.log("[Profiling] Profiling disabled, no options found.");
    return false;
  }
  const profilesSampleRate = options.profilesSampleRate;
  if (!isValidSampleRate2(profilesSampleRate)) {
    DEBUG_BUILD4 && logger.warn("[Profiling] Discarding profile because of invalid sample rate.");
    return false;
  }
  if (!profilesSampleRate) {
    DEBUG_BUILD4 && logger.log(
      "[Profiling] Discarding profile because a negative sampling decision was inherited or profileSampleRate is set to 0"
    );
    return false;
  }
  const sampled = profilesSampleRate === true ? true : Math.random() < profilesSampleRate;
  if (!sampled) {
    DEBUG_BUILD4 && logger.log(
      `[Profiling] Discarding profile because it's not included in the random sample (sampling rate = ${Number(
        profilesSampleRate
      )})`
    );
    return false;
  }
  return true;
}
function createProfilingEvent(profile_id, start_timestamp, profile, event) {
  if (!isValidProfile(profile)) {
    return null;
  }
  return createProfilePayload(profile_id, start_timestamp, profile, event);
}
var PROFILE_MAP = /* @__PURE__ */ new Map();
function getActiveProfilesCount() {
  return PROFILE_MAP.size;
}
function takeProfileFromGlobalCache(profile_id) {
  const profile = PROFILE_MAP.get(profile_id);
  if (profile) {
    PROFILE_MAP.delete(profile_id);
  }
  return profile;
}
function addProfileToGlobalCache(profile_id, profile) {
  PROFILE_MAP.set(profile_id, profile);
  if (PROFILE_MAP.size > 30) {
    const last = PROFILE_MAP.keys().next().value;
    PROFILE_MAP.delete(last);
  }
}

// node_modules/@sentry/browser/esm/profiling/hubextensions.js
function onProfilingStartRouteTransaction(transaction) {
  if (!transaction) {
    if (DEBUG_BUILD4) {
      logger.log("[Profiling] Transaction is undefined, skipping profiling");
    }
    return transaction;
  }
  if (shouldProfileTransaction(transaction)) {
    return startProfileForTransaction(transaction);
  }
  return transaction;
}
function startProfileForTransaction(transaction) {
  let startTimestamp;
  if (isAutomatedPageLoadTransaction(transaction)) {
    startTimestamp = timestampInSeconds() * 1e3;
  }
  const profiler = startJSSelfProfile();
  if (!profiler) {
    return transaction;
  }
  if (DEBUG_BUILD4) {
    logger.log(`[Profiling] started profiling transaction: ${spanToJSON(transaction).description}`);
  }
  const profileId = uuid4();
  async function onProfileHandler() {
    if (!transaction) {
      return null;
    }
    if (!profiler) {
      return null;
    }
    return profiler.stop().then((profile) => {
      if (maxDurationTimeoutID) {
        WINDOW8.clearTimeout(maxDurationTimeoutID);
        maxDurationTimeoutID = void 0;
      }
      if (DEBUG_BUILD4) {
        logger.log(`[Profiling] stopped profiling of transaction: ${spanToJSON(transaction).description}`);
      }
      if (!profile) {
        if (DEBUG_BUILD4) {
          logger.log(
            `[Profiling] profiler returned null profile for: ${spanToJSON(transaction).description}`,
            "this may indicate an overlapping transaction or a call to stopProfiling with a profile title that was never started"
          );
        }
        return null;
      }
      addProfileToGlobalCache(profileId, profile);
      return null;
    }).catch((error) => {
      if (DEBUG_BUILD4) {
        logger.log("[Profiling] error while stopping profiler:", error);
      }
      return null;
    });
  }
  let maxDurationTimeoutID = WINDOW8.setTimeout(() => {
    if (DEBUG_BUILD4) {
      logger.log(
        "[Profiling] max profile duration elapsed, stopping profiling for:",
        spanToJSON(transaction).description
      );
    }
    onProfileHandler();
  }, MAX_PROFILE_DURATION_MS);
  const originalEnd = transaction.end.bind(transaction);
  function profilingWrappedTransactionEnd() {
    if (!transaction) {
      return originalEnd();
    }
    void onProfileHandler().then(
      () => {
        transaction.setContext("profile", { profile_id: profileId, start_timestamp: startTimestamp });
        originalEnd();
      },
      () => {
        originalEnd();
      }
    );
    return transaction;
  }
  transaction.end = profilingWrappedTransactionEnd;
  return transaction;
}

// node_modules/@sentry/browser/esm/profiling/integration.js
var INTEGRATION_NAME14 = "BrowserProfiling";
var _browserProfilingIntegration = () => {
  return {
    name: INTEGRATION_NAME14,
    // TODO v8: Remove this
    setupOnce() {
    },
    // eslint-disable-line @typescript-eslint/no-empty-function
    setup(client) {
      const scope = getCurrentScope();
      const transaction = scope.getTransaction();
      if (transaction && isAutomatedPageLoadTransaction(transaction)) {
        if (shouldProfileTransaction(transaction)) {
          startProfileForTransaction(transaction);
        }
      }
      if (typeof client.on !== "function") {
        logger.warn("[Profiling] Client does not support hooks, profiling will be disabled");
        return;
      }
      client.on("startTransaction", (transaction2) => {
        if (shouldProfileTransaction(transaction2)) {
          startProfileForTransaction(transaction2);
        }
      });
      client.on("beforeEnvelope", (envelope) => {
        if (!getActiveProfilesCount()) {
          return;
        }
        const profiledTransactionEvents = findProfiledTransactionsFromEnvelope(envelope);
        if (!profiledTransactionEvents.length) {
          return;
        }
        const profilesToAddToEnvelope = [];
        for (const profiledTransaction of profiledTransactionEvents) {
          const context = profiledTransaction && profiledTransaction.contexts;
          const profile_id = context && context["profile"] && context["profile"]["profile_id"];
          const start_timestamp = context && context["profile"] && context["profile"]["start_timestamp"];
          if (typeof profile_id !== "string") {
            DEBUG_BUILD4 && logger.log("[Profiling] cannot find profile for a transaction without a profile context");
            continue;
          }
          if (!profile_id) {
            DEBUG_BUILD4 && logger.log("[Profiling] cannot find profile for a transaction without a profile context");
            continue;
          }
          if (context && context["profile"]) {
            delete context.profile;
          }
          const profile = takeProfileFromGlobalCache(profile_id);
          if (!profile) {
            DEBUG_BUILD4 && logger.log(`[Profiling] Could not retrieve profile for transaction: ${profile_id}`);
            continue;
          }
          const profileEvent = createProfilingEvent(
            profile_id,
            start_timestamp,
            profile,
            profiledTransaction
          );
          if (profileEvent) {
            profilesToAddToEnvelope.push(profileEvent);
          }
        }
        addProfilesToEnvelope(envelope, profilesToAddToEnvelope);
      });
    }
  };
};
var browserProfilingIntegration = defineIntegration(_browserProfilingIntegration);
var BrowserProfilingIntegration = convertIntegrationFnToClass(
  INTEGRATION_NAME14,
  browserProfilingIntegration
);

// node_modules/@sentry/browser/esm/index.js
var windowIntegrations = {};
if (WINDOW8.Sentry && WINDOW8.Sentry.Integrations) {
  windowIntegrations = WINDOW8.Sentry.Integrations;
}
var INTEGRATIONS = {
  ...windowIntegrations,
  // eslint-disable-next-line deprecation/deprecation
  ...Integrations,
  ...integrations_exports2
};

// node_modules/@sentry/react/esm/sdk.js
function init2(options) {
  const opts = {
    ...options
  };
  applySdkMetadata(opts, "react");
  init(opts);
}

// node_modules/@sentry/react/esm/profiler.js
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var React = __toESM(require_react());

// node_modules/@sentry/react/esm/constants.js
var REACT_RENDER_OP = "ui.react.render";
var REACT_UPDATE_OP = "ui.react.update";
var REACT_MOUNT_OP = "ui.react.mount";

// node_modules/@sentry/react/esm/profiler.js
var _jsxFileName = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/profiler.tsx";
var UNKNOWN_COMPONENT = "unknown";
var Profiler = class extends React.Component {
  /**
   * The span of the mount activity
   * Made protected for the React Native SDK to access
   */
  /**
   * The span that represents the duration of time between shouldComponentUpdate and componentDidUpdate
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static __initStatic() {
    this.defaultProps = {
      disabled: false,
      includeRender: true,
      includeUpdates: true
    };
  }
  constructor(props) {
    super(props);
    const { name, disabled = false } = this.props;
    if (disabled) {
      return;
    }
    this._mountSpan = startInactiveSpan({
      name: `<${name}>`,
      onlyIfParent: true,
      op: REACT_MOUNT_OP,
      origin: "auto.ui.react.profiler",
      attributes: { "ui.component_name": name }
    });
  }
  // If a component mounted, we can finish the mount activity.
  componentDidMount() {
    if (this._mountSpan) {
      this._mountSpan.end();
    }
  }
  shouldComponentUpdate({ updateProps, includeUpdates = true }) {
    if (includeUpdates && this._mountSpan && updateProps !== this.props.updateProps) {
      const changedProps = Object.keys(updateProps).filter((k) => updateProps[k] !== this.props.updateProps[k]);
      if (changedProps.length > 0) {
        const now = timestampInSeconds();
        this._updateSpan = withActiveSpan(this._mountSpan, () => {
          return startInactiveSpan({
            name: `<${this.props.name}>`,
            onlyIfParent: true,
            op: REACT_UPDATE_OP,
            origin: "auto.ui.react.profiler",
            startTimestamp: now,
            attributes: {
              "ui.component_name": this.props.name,
              "ui.react.changed_props": changedProps
            }
          });
        });
      }
    }
    return true;
  }
  componentDidUpdate() {
    if (this._updateSpan) {
      this._updateSpan.end();
      this._updateSpan = void 0;
    }
  }
  // If a component is unmounted, we can say it is no longer on the screen.
  // This means we can finish the span representing the component render.
  componentWillUnmount() {
    const endTimestamp = timestampInSeconds();
    const { name, includeRender = true } = this.props;
    if (this._mountSpan && includeRender) {
      const startTimestamp = spanToJSON(this._mountSpan).timestamp;
      withActiveSpan(this._mountSpan, () => {
        const renderSpan = startInactiveSpan({
          onlyIfParent: true,
          name: `<${name}>`,
          op: REACT_RENDER_OP,
          origin: "auto.ui.react.profiler",
          startTimestamp,
          attributes: { "ui.component_name": name }
        });
        if (renderSpan) {
          renderSpan.end(endTimestamp);
        }
      });
    }
  }
  render() {
    return this.props.children;
  }
};
Profiler.__initStatic();
function withProfiler(WrappedComponent, options) {
  const componentDisplayName = options && options.name || WrappedComponent.displayName || WrappedComponent.name || UNKNOWN_COMPONENT;
  const Wrapped = (props) => React.createElement(
    Profiler,
    { ...options, name: componentDisplayName, updateProps: props, __self: this, __source: { fileName: _jsxFileName, lineNumber: 159 } },
    React.createElement(WrappedComponent, { ...props, __self: this, __source: { fileName: _jsxFileName, lineNumber: 160 } })
  );
  Wrapped.displayName = `profiler(${componentDisplayName})`;
  (0, import_hoist_non_react_statics.default)(Wrapped, WrappedComponent);
  return Wrapped;
}
function useProfiler(name, options = {
  disabled: false,
  hasRenderSpan: true
}) {
  const [mountSpan] = React.useState(() => {
    if (options && options.disabled) {
      return void 0;
    }
    return startInactiveSpan({
      name: `<${name}>`,
      onlyIfParent: true,
      op: REACT_MOUNT_OP,
      origin: "auto.ui.react.profiler",
      attributes: { "ui.component_name": name }
    });
  });
  React.useEffect(() => {
    if (mountSpan) {
      mountSpan.end();
    }
    return () => {
      if (mountSpan && options.hasRenderSpan) {
        const startTimestamp = spanToJSON(mountSpan).timestamp;
        const endTimestamp = timestampInSeconds();
        const renderSpan = startInactiveSpan({
          name: `<${name}>`,
          onlyIfParent: true,
          op: REACT_RENDER_OP,
          origin: "auto.ui.react.profiler",
          startTimestamp,
          attributes: { "ui.component_name": name }
        });
        if (renderSpan) {
          renderSpan.end(endTimestamp);
        }
      }
    };
  }, []);
}

// node_modules/@sentry/react/esm/errorboundary.js
var import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
var React2 = __toESM(require_react());

// node_modules/@sentry/react/esm/debug-build.js
var DEBUG_BUILD7 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;

// node_modules/@sentry/react/esm/errorboundary.js
var _jsxFileName2 = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/errorboundary.tsx";
function isAtLeastReact17(version2) {
  const major = version2.match(/^([^.]+)/);
  return major !== null && parseInt(major[0]) >= 17;
}
var UNKNOWN_COMPONENT2 = "unknown";
var INITIAL_STATE = {
  componentStack: null,
  error: null,
  eventId: null
};
function setCause(error, cause) {
  const seenErrors = /* @__PURE__ */ new WeakMap();
  function recurse(error2, cause2) {
    if (seenErrors.has(error2)) {
      return;
    }
    if (error2.cause) {
      seenErrors.set(error2, true);
      return recurse(error2.cause, cause2);
    }
    error2.cause = cause2;
  }
  recurse(error, cause);
}
var ErrorBoundary = class _ErrorBoundary extends React2.Component {
  constructor(props) {
    super(props);
    _ErrorBoundary.prototype.__init.call(this);
    this.state = INITIAL_STATE;
    this._openFallbackReportDialog = true;
    const client = getClient();
    if (client && client.on && props.showDialog) {
      this._openFallbackReportDialog = false;
      client.on("afterSendEvent", (event) => {
        if (!event.type && event.event_id === this._lastEventId) {
          showReportDialog({ ...props.dialogOptions, eventId: this._lastEventId });
        }
      });
    }
  }
  componentDidCatch(error, { componentStack }) {
    const { beforeCapture, onError, showDialog, dialogOptions } = this.props;
    withScope((scope) => {
      if (isAtLeastReact17(React2.version) && isError(error)) {
        const errorBoundaryError = new Error(error.message);
        errorBoundaryError.name = `React ErrorBoundary ${error.name}`;
        errorBoundaryError.stack = componentStack;
        setCause(error, errorBoundaryError);
      }
      if (beforeCapture) {
        beforeCapture(scope, error, componentStack);
      }
      const eventId = captureException(error, {
        captureContext: {
          contexts: { react: { componentStack } }
        },
        // If users provide a fallback component we can assume they are handling the error.
        // Therefore, we set the mechanism depending on the presence of the fallback prop.
        mechanism: { handled: !!this.props.fallback }
      });
      if (onError) {
        onError(error, componentStack, eventId);
      }
      if (showDialog) {
        this._lastEventId = eventId;
        if (this._openFallbackReportDialog) {
          showReportDialog({ ...dialogOptions, eventId });
        }
      }
      this.setState({ error, componentStack, eventId });
    });
  }
  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) {
      onMount();
    }
  }
  componentWillUnmount() {
    const { error, componentStack, eventId } = this.state;
    const { onUnmount } = this.props;
    if (onUnmount) {
      onUnmount(error, componentStack, eventId);
    }
  }
  __init() {
    this.resetErrorBoundary = () => {
      const { onReset } = this.props;
      const { error, componentStack, eventId } = this.state;
      if (onReset) {
        onReset(error, componentStack, eventId);
      }
      this.setState(INITIAL_STATE);
    };
  }
  render() {
    const { fallback, children } = this.props;
    const state = this.state;
    if (state.error) {
      let element = void 0;
      if (typeof fallback === "function") {
        element = fallback({
          error: state.error,
          componentStack: state.componentStack,
          resetError: this.resetErrorBoundary,
          eventId: state.eventId
        });
      } else {
        element = fallback;
      }
      if (React2.isValidElement(element)) {
        return element;
      }
      if (fallback) {
        DEBUG_BUILD7 && logger.warn("fallback did not produce a valid ReactElement");
      }
      return null;
    }
    if (typeof children === "function") {
      return children();
    }
    return children;
  }
};
function withErrorBoundary(WrappedComponent, errorBoundaryOptions) {
  const componentDisplayName = WrappedComponent.displayName || WrappedComponent.name || UNKNOWN_COMPONENT2;
  const Wrapped = (props) => React2.createElement(
    ErrorBoundary,
    { ...errorBoundaryOptions, __self: this, __source: { fileName: _jsxFileName2, lineNumber: 240 } },
    React2.createElement(WrappedComponent, { ...props, __self: this, __source: { fileName: _jsxFileName2, lineNumber: 241 } })
  );
  Wrapped.displayName = `errorBoundary(${componentDisplayName})`;
  (0, import_hoist_non_react_statics2.default)(Wrapped, WrappedComponent);
  return Wrapped;
}

// node_modules/@sentry/react/esm/redux.js
var ACTION_BREADCRUMB_CATEGORY = "redux.action";
var ACTION_BREADCRUMB_TYPE = "info";
var defaultOptions = {
  attachReduxState: true,
  actionTransformer: (action) => action,
  stateTransformer: (state) => state || null
};
function createReduxEnhancer(enhancerOptions) {
  const options = {
    ...defaultOptions,
    ...enhancerOptions
  };
  return (next) => (reducer, initialState) => {
    options.attachReduxState && getGlobalScope().addEventProcessor((event, hint) => {
      try {
        if (event.type === void 0 && event.contexts.state.state.type === "redux") {
          hint.attachments = [
            ...hint.attachments || [],
            // @ts-expect-error try catch to reduce bundle size
            { filename: "redux_state.json", data: JSON.stringify(event.contexts.state.state.value) }
          ];
        }
      } catch (_) {
      }
      return event;
    });
    const sentryReducer = (state, action) => {
      const newState = reducer(state, action);
      const scope = getCurrentScope();
      const transformedAction = options.actionTransformer(action);
      if (typeof transformedAction !== "undefined" && transformedAction !== null) {
        scope.addBreadcrumb({
          category: ACTION_BREADCRUMB_CATEGORY,
          data: transformedAction,
          type: ACTION_BREADCRUMB_TYPE
        });
      }
      const transformedState = options.stateTransformer(newState);
      if (typeof transformedState !== "undefined" && transformedState !== null) {
        const client = getClient();
        const options2 = client && client.getOptions();
        const normalizationDepth = options2 && options2.normalizeDepth || 3;
        const newStateContext = { state: { type: "redux", value: transformedState } };
        addNonEnumerableProperty(
          newStateContext,
          "__sentry_override_normalization_depth__",
          3 + // 3 layers for `state.value.transformedState`
          normalizationDepth
          // rest for the actual state
        );
        scope.setContext("state", newStateContext);
      } else {
        scope.setContext("state", null);
      }
      const { configureScopeWithState } = options;
      if (typeof configureScopeWithState === "function") {
        configureScopeWithState(scope, newState);
      }
      return newState;
    };
    return next(sentryReducer, initialState);
  };
}

// node_modules/@sentry/react/esm/reactrouterv3.js
function reactRouterV3BrowserTracingIntegration(options) {
  const integration = browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false
  });
  const { history, routes, match, instrumentPageLoad = true, instrumentNavigation = true } = options;
  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);
      const startPageloadCallback = (startSpanOptions) => {
        startBrowserTracingPageLoadSpan(client, startSpanOptions);
        return void 0;
      };
      const startNavigationCallback = (startSpanOptions) => {
        startBrowserTracingNavigationSpan(client, startSpanOptions);
        return void 0;
      };
      const instrumentation = reactRouterV3Instrumentation(history, routes, match);
      instrumentation(startPageloadCallback, instrumentPageLoad, false);
      instrumentation(startNavigationCallback, false, instrumentNavigation);
    }
  };
}
function reactRouterV3Instrumentation(history, routes, match) {
  return (startTransaction2, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) => {
    let activeTransaction3;
    let prevName;
    if (startTransactionOnPageLoad && WINDOW8 && WINDOW8.location) {
      normalizeTransactionName(
        routes,
        WINDOW8.location,
        match,
        (localName, source = "url") => {
          prevName = localName;
          activeTransaction3 = startTransaction2({
            name: prevName,
            attributes: {
              [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
              [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.pageload.react.reactrouter_v3",
              [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source
            }
          });
        }
      );
    }
    if (startTransactionOnLocationChange && history.listen) {
      history.listen((location) => {
        if (location.action === "PUSH" || location.action === "POP") {
          if (activeTransaction3) {
            activeTransaction3.end();
          }
          normalizeTransactionName(routes, location, match, (localName, source = "url") => {
            prevName = localName;
            const attributes = {
              [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
              [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.navigation.react.reactrouter_v3",
              [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source
            };
            activeTransaction3 = startTransaction2({
              name: prevName,
              attributes
            });
          });
        }
      });
    }
  };
}
function normalizeTransactionName(appRoutes, location, match, callback) {
  let name = location.pathname;
  match(
    {
      location,
      routes: appRoutes
    },
    (error, _redirectLocation, renderProps) => {
      if (error || !renderProps) {
        return callback(name);
      }
      const routePath = getRouteStringFromRoutes(renderProps.routes || []);
      if (routePath.length === 0 || routePath === "/*") {
        return callback(name);
      }
      name = routePath;
      return callback(name, "route");
    }
  );
}
function getRouteStringFromRoutes(routes) {
  if (!Array.isArray(routes) || routes.length === 0) {
    return "";
  }
  const routesWithPaths = routes.filter((route) => !!route.path);
  let index = -1;
  for (let x = routesWithPaths.length - 1; x >= 0; x--) {
    const route = routesWithPaths[x];
    if (route.path && route.path.startsWith("/")) {
      index = x;
      break;
    }
  }
  return routesWithPaths.slice(index).filter(({ path }) => !!path).map(({ path }) => path).join("");
}

// node_modules/@sentry/react/esm/reactrouter.js
var import_hoist_non_react_statics3 = __toESM(require_hoist_non_react_statics_cjs());
var React3 = __toESM(require_react());
var _jsxFileName3 = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/reactrouter.tsx";
var activeTransaction;
function reactRouterV4BrowserTracingIntegration(options) {
  const integration = browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false
  });
  const { history, routes, matchPath, instrumentPageLoad = true, instrumentNavigation = true } = options;
  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);
      const startPageloadCallback = (startSpanOptions) => {
        startBrowserTracingPageLoadSpan(client, startSpanOptions);
        return void 0;
      };
      const startNavigationCallback = (startSpanOptions) => {
        startBrowserTracingNavigationSpan(client, startSpanOptions);
        return void 0;
      };
      const instrumentation = reactRouterV4Instrumentation(history, routes, matchPath);
      instrumentation(startPageloadCallback, instrumentPageLoad, false);
      instrumentation(startNavigationCallback, false, instrumentNavigation);
    }
  };
}
function reactRouterV5BrowserTracingIntegration(options) {
  const integration = browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false
  });
  const { history, routes, matchPath } = options;
  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);
      const startPageloadCallback = (startSpanOptions) => {
        startBrowserTracingPageLoadSpan(client, startSpanOptions);
        return void 0;
      };
      const startNavigationCallback = (startSpanOptions) => {
        startBrowserTracingNavigationSpan(client, startSpanOptions);
        return void 0;
      };
      const instrumentation = reactRouterV5Instrumentation(history, routes, matchPath);
      instrumentation(startPageloadCallback, options.instrumentPageLoad, false);
      instrumentation(startNavigationCallback, false, options.instrumentNavigation);
    }
  };
}
function reactRouterV4Instrumentation(history, routes, matchPath) {
  return createReactRouterInstrumentation(history, "reactrouter_v4", routes, matchPath);
}
function reactRouterV5Instrumentation(history, routes, matchPath) {
  return createReactRouterInstrumentation(history, "reactrouter_v5", routes, matchPath);
}
function createReactRouterInstrumentation(history, instrumentationName, allRoutes = [], matchPath) {
  function getInitPathName() {
    if (history && history.location) {
      return history.location.pathname;
    }
    if (WINDOW8 && WINDOW8.location) {
      return WINDOW8.location.pathname;
    }
    return void 0;
  }
  function normalizeTransactionName2(pathname) {
    if (allRoutes.length === 0 || !matchPath) {
      return [pathname, "url"];
    }
    const branches = matchRoutes(allRoutes, pathname, matchPath);
    for (let x = 0; x < branches.length; x++) {
      if (branches[x].match.isExact) {
        return [branches[x].match.path, "route"];
      }
    }
    return [pathname, "url"];
  }
  return (customStartTransaction, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) => {
    const initPathName = getInitPathName();
    if (startTransactionOnPageLoad && initPathName) {
      const [name, source] = normalizeTransactionName2(initPathName);
      activeTransaction = customStartTransaction({
        name,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: `auto.pageload.react.${instrumentationName}`,
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source
        }
      });
    }
    if (startTransactionOnLocationChange && history.listen) {
      history.listen((location, action) => {
        if (action && (action === "PUSH" || action === "POP")) {
          if (activeTransaction) {
            activeTransaction.end();
          }
          const [name, source] = normalizeTransactionName2(location.pathname);
          activeTransaction = customStartTransaction({
            name,
            attributes: {
              [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
              [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: `auto.navigation.react.${instrumentationName}`,
              [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source
            }
          });
        }
      });
    }
  };
}
function matchRoutes(routes, pathname, matchPath, branch = []) {
  routes.some((route) => {
    const match = route.path ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match : computeRootMatch(pathname);
    if (match) {
      branch.push({ route, match });
      if (route.routes) {
        matchRoutes(route.routes, pathname, matchPath, branch);
      }
    }
    return !!match;
  });
  return branch;
}
function computeRootMatch(pathname) {
  return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
}
function withSentryRouting(Route) {
  const componentDisplayName = Route.displayName || Route.name;
  const activeRootSpan = getActiveRootSpan();
  const WrappedRoute = (props) => {
    if (activeRootSpan && props && props.computedMatch && props.computedMatch.isExact) {
      activeRootSpan.updateName(props.computedMatch.path);
      activeRootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
    }
    return React3.createElement(Route, { ...props, __self: this, __source: { fileName: _jsxFileName3, lineNumber: 277 } });
  };
  WrappedRoute.displayName = `sentryRoute(${componentDisplayName})`;
  (0, import_hoist_non_react_statics3.default)(WrappedRoute, Route);
  return WrappedRoute;
}
function getActiveRootSpan() {
  if (activeTransaction) {
    return activeTransaction;
  }
  const span = getActiveSpan();
  const rootSpan = span ? getRootSpan(span) : void 0;
  if (!rootSpan) {
    return void 0;
  }
  const op = spanToJSON(rootSpan).op;
  return op === "navigation" || op === "pageload" ? rootSpan : void 0;
}

// node_modules/@sentry/react/esm/reactrouterv6.js
var import_hoist_non_react_statics4 = __toESM(require_hoist_non_react_statics_cjs());
var React4 = __toESM(require_react());
var _jsxFileName4 = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/reactrouterv6.tsx";
var activeTransaction2;
var _useEffect;
var _useLocation;
var _useNavigationType;
var _createRoutesFromChildren;
var _matchRoutes;
var _customStartTransaction;
var _startTransactionOnLocationChange;
var _stripBasename = false;
function reactRouterV6BrowserTracingIntegration(options) {
  const integration = browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false
  });
  const {
    useEffect: useEffect2,
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes: matchRoutes2,
    stripBasename,
    instrumentPageLoad = true,
    instrumentNavigation = true
  } = options;
  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);
      const startNavigationCallback = (startSpanOptions) => {
        startBrowserTracingNavigationSpan(client, startSpanOptions);
        return void 0;
      };
      const initPathName = WINDOW8 && WINDOW8.location && WINDOW8.location.pathname;
      if (instrumentPageLoad && initPathName) {
        startBrowserTracingPageLoadSpan(client, {
          name: initPathName,
          attributes: {
            [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
            [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
            [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.pageload.react.reactrouter_v6"
          }
        });
      }
      _useEffect = useEffect2;
      _useLocation = useLocation;
      _useNavigationType = useNavigationType;
      _matchRoutes = matchRoutes2;
      _createRoutesFromChildren = createRoutesFromChildren;
      _stripBasename = stripBasename || false;
      _customStartTransaction = startNavigationCallback;
      _startTransactionOnLocationChange = instrumentNavigation;
    }
  };
}
function reactRouterV6Instrumentation(useEffect2, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes2, stripBasename) {
  return (customStartTransaction, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) => {
    const initPathName = WINDOW8 && WINDOW8.location && WINDOW8.location.pathname;
    if (startTransactionOnPageLoad && initPathName) {
      activeTransaction2 = customStartTransaction({
        name: initPathName,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.pageload.react.reactrouter_v6"
        }
      });
    }
    _useEffect = useEffect2;
    _useLocation = useLocation;
    _useNavigationType = useNavigationType;
    _matchRoutes = matchRoutes2;
    _createRoutesFromChildren = createRoutesFromChildren;
    _stripBasename = stripBasename || false;
    _customStartTransaction = customStartTransaction;
    _startTransactionOnLocationChange = startTransactionOnLocationChange;
  };
}
function stripBasenameFromPathname(pathname, basename2) {
  if (!basename2 || basename2 === "/") {
    return pathname;
  }
  if (!pathname.toLowerCase().startsWith(basename2.toLowerCase())) {
    return pathname;
  }
  const startIndex = basename2.endsWith("/") ? basename2.length - 1 : basename2.length;
  const nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return pathname;
  }
  return pathname.slice(startIndex) || "/";
}
function getNormalizedName(routes, location, branches, basename2 = "") {
  if (!routes || routes.length === 0) {
    return [_stripBasename ? stripBasenameFromPathname(location.pathname, basename2) : location.pathname, "url"];
  }
  let pathBuilder = "";
  if (branches) {
    for (let x = 0; x < branches.length; x++) {
      const branch = branches[x];
      const route = branch.route;
      if (route) {
        if (route.index) {
          return [_stripBasename ? stripBasenameFromPathname(branch.pathname, basename2) : branch.pathname, "route"];
        }
        const path = route.path;
        if (path) {
          const newPath = path[0] === "/" || pathBuilder[pathBuilder.length - 1] === "/" ? path : `/${path}`;
          pathBuilder += newPath;
          if (basename2 + branch.pathname === location.pathname) {
            if (
              // If the route defined on the element is something like
              // <Route path="/stores/:storeId/products/:productId" element={<div>Product</div>} />
              // We should check against the branch.pathname for the number of / seperators
              getNumberOfUrlSegments(pathBuilder) !== getNumberOfUrlSegments(branch.pathname) && // We should not count wildcard operators in the url segments calculation
              pathBuilder.slice(-2) !== "/*"
            ) {
              return [(_stripBasename ? "" : basename2) + newPath, "route"];
            }
            return [(_stripBasename ? "" : basename2) + pathBuilder, "route"];
          }
        }
      }
    }
  }
  return [_stripBasename ? stripBasenameFromPathname(location.pathname, basename2) : location.pathname, "url"];
}
function updatePageloadTransaction(activeRootSpan, location, routes, matches, basename2) {
  const branches = Array.isArray(matches) ? matches : _matchRoutes(routes, location, basename2);
  if (activeRootSpan && branches) {
    const [name, source] = getNormalizedName(routes, location, branches, basename2);
    activeRootSpan.updateName(name);
    activeRootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, source);
  }
}
function handleNavigation(location, routes, navigationType, matches, basename2) {
  const branches = Array.isArray(matches) ? matches : _matchRoutes(routes, location, basename2);
  if (_startTransactionOnLocationChange && (navigationType === "PUSH" || navigationType === "POP") && branches) {
    if (activeTransaction2) {
      activeTransaction2.end();
    }
    const [name, source] = getNormalizedName(routes, location, branches, basename2);
    activeTransaction2 = _customStartTransaction({
      name,
      attributes: {
        [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
        [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
        [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.navigation.react.reactrouter_v6"
      }
    });
  }
}
function withSentryReactRouterV6Routing(Routes) {
  if (!_useEffect || !_useLocation || !_useNavigationType || !_createRoutesFromChildren || !_matchRoutes || !_customStartTransaction) {
    DEBUG_BUILD7 && logger.warn(`reactRouterV6Instrumentation was unable to wrap Routes because of one or more missing parameters.
      useEffect: ${_useEffect}. useLocation: ${_useLocation}. useNavigationType: ${_useNavigationType}.
      createRoutesFromChildren: ${_createRoutesFromChildren}. matchRoutes: ${_matchRoutes}. customStartTransaction: ${_customStartTransaction}.`);
    return Routes;
  }
  let isMountRenderPass = true;
  const SentryRoutes = (props) => {
    const location = _useLocation();
    const navigationType = _useNavigationType();
    _useEffect(
      () => {
        const routes = _createRoutesFromChildren(props.children);
        if (isMountRenderPass) {
          updatePageloadTransaction(getActiveRootSpan2(), location, routes);
          isMountRenderPass = false;
        } else {
          handleNavigation(location, routes, navigationType);
        }
      },
      // `props.children` is purpusely not included in the dependency array, because we do not want to re-run this effect
      // when the children change. We only want to start transactions when the location or navigation type change.
      [location, navigationType]
    );
    return React4.createElement(Routes, { ...props, __self: this, __source: { fileName: _jsxFileName4, lineNumber: 329 } });
  };
  (0, import_hoist_non_react_statics4.default)(SentryRoutes, Routes);
  return SentryRoutes;
}
function wrapUseRoutes(origUseRoutes) {
  if (!_useEffect || !_useLocation || !_useNavigationType || !_matchRoutes || !_customStartTransaction) {
    DEBUG_BUILD7 && logger.warn(
      "reactRouterV6Instrumentation was unable to wrap `useRoutes` because of one or more missing parameters."
    );
    return origUseRoutes;
  }
  let isMountRenderPass = true;
  const SentryRoutes = (props) => {
    const { routes, locationArg } = props;
    const Routes = origUseRoutes(routes, locationArg);
    const location = _useLocation();
    const navigationType = _useNavigationType();
    const stableLocationParam = typeof locationArg === "string" || locationArg && locationArg.pathname ? locationArg : location;
    _useEffect(() => {
      const normalizedLocation = typeof stableLocationParam === "string" ? { pathname: stableLocationParam } : stableLocationParam;
      if (isMountRenderPass) {
        updatePageloadTransaction(getActiveRootSpan2(), normalizedLocation, routes);
        isMountRenderPass = false;
      } else {
        handleNavigation(normalizedLocation, routes, navigationType);
      }
    }, [navigationType, stableLocationParam]);
    return Routes;
  };
  return (routes, locationArg) => {
    return React4.createElement(SentryRoutes, { routes, locationArg, __self: this, __source: { fileName: _jsxFileName4, lineNumber: 386 } });
  };
}
function wrapCreateBrowserRouter(createRouterFunction) {
  return function(routes, opts) {
    const router = createRouterFunction(routes, opts);
    const basename2 = opts && opts.basename;
    const activeRootSpan = getActiveRootSpan2();
    if (router.state.historyAction === "POP" && activeRootSpan) {
      updatePageloadTransaction(activeRootSpan, router.state.location, routes, void 0, basename2);
    }
    router.subscribe((state) => {
      const location = state.location;
      if (_startTransactionOnLocationChange && (state.historyAction === "PUSH" || state.historyAction === "POP")) {
        handleNavigation(location, routes, state.historyAction, void 0, basename2);
      }
    });
    return router;
  };
}
function getActiveRootSpan2() {
  if (activeTransaction2) {
    return activeTransaction2;
  }
  const span = getActiveSpan();
  const rootSpan = span ? getRootSpan(span) : void 0;
  if (!rootSpan) {
    return void 0;
  }
  const op = spanToJSON(rootSpan).op;
  return op === "navigation" || op === "pageload" ? rootSpan : void 0;
}
export {
  Breadcrumbs,
  BrowserClient,
  BrowserProfilingIntegration,
  BrowserTracing,
  Dedupe,
  ErrorBoundary,
  Feedback,
  FunctionToString,
  GlobalHandlers,
  HttpContext,
  Hub,
  InboundFilters,
  INTEGRATIONS as Integrations,
  LinkedErrors2 as LinkedErrors,
  ModuleMetadata,
  Profiler,
  Replay,
  ReplayCanvas,
  SDK_VERSION,
  SEMANTIC_ATTRIBUTE_SENTRY_OP,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  Scope,
  TryCatch,
  WINDOW8 as WINDOW,
  addBreadcrumb,
  addEventProcessor,
  addGlobalEventProcessor,
  addIntegration,
  addTracingExtensions,
  breadcrumbsIntegration,
  browserApiErrorsIntegration,
  browserProfilingIntegration,
  browserTracingIntegration,
  captureEvent,
  captureException,
  captureMessage,
  captureSession,
  captureUserFeedback,
  chromeStackLineParser,
  close,
  configureScope,
  continueTrace,
  createReduxEnhancer,
  createTransport,
  createUserFeedbackEnvelope,
  dedupeIntegration,
  defaultIntegrations,
  defaultRequestInstrumentationOptions,
  defaultStackLineParsers,
  defaultStackParser,
  endSession,
  eventFromException,
  eventFromMessage2 as eventFromMessage,
  exceptionFromError2 as exceptionFromError,
  extractTraceparentData2 as extractTraceparentData,
  feedbackIntegration,
  flush,
  forceLoad,
  functionToStringIntegration,
  geckoStackLineParser,
  getActiveSpan,
  getActiveTransaction,
  getClient,
  getCurrentHub,
  getCurrentScope,
  getDefaultIntegrations,
  getHubFromCarrier,
  getReplay,
  getSpanStatusFromHttpCode,
  globalHandlersIntegration,
  httpContextIntegration,
  inboundFiltersIntegration,
  init2 as init,
  instrumentOutgoingRequests,
  isInitialized,
  lastEventId,
  linkedErrorsIntegration2 as linkedErrorsIntegration,
  makeBrowserOfflineTransport,
  makeFetchTransport,
  makeMain,
  makeMultiplexedTransport,
  makeXHRTransport,
  metrics,
  moduleMetadataIntegration,
  onLoad,
  onProfilingStartRouteTransaction,
  opera10StackLineParser,
  opera11StackLineParser,
  parameterize,
  reactRouterV3BrowserTracingIntegration,
  reactRouterV3Instrumentation,
  reactRouterV4BrowserTracingIntegration,
  reactRouterV4Instrumentation,
  reactRouterV5BrowserTracingIntegration,
  reactRouterV5Instrumentation,
  reactRouterV6BrowserTracingIntegration,
  reactRouterV6Instrumentation,
  replayCanvasIntegration,
  replayIntegration,
  sendFeedback,
  setContext,
  setCurrentClient,
  setExtra,
  setExtras,
  setHttpStatus,
  setMeasurement,
  setTag,
  setTags,
  setUser,
  showReportDialog,
  spanStatusfromHttpCode,
  startBrowserTracingNavigationSpan,
  startBrowserTracingPageLoadSpan,
  startInactiveSpan,
  startSession,
  startSpan,
  startSpanManual,
  startTransaction,
  trace,
  useProfiler,
  winjsStackLineParser,
  withActiveSpan,
  withErrorBoundary,
  withIsolationScope,
  withProfiler,
  withScope,
  withSentryReactRouterV6Routing,
  withSentryRouting,
  wrap3 as wrap,
  wrapCreateBrowserRouter,
  wrapUseRoutes
};
//# sourceMappingURL=@sentry_react.js.map
