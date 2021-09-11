"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-10-01
 * @modified
 *
 * @description
 * @difficulty Easy Medium Hard
 * @complexity O(n)
 * @augments
 * @example
 * @link
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

// https://cdn.xgqfrms.xyz?uri=%s
// https://cdn.xgqfrms.xyz/URL-Scheme/handler.html

try {
  if(navigator.registerProtocolHandler) {
    // navigator.registerProtocolHandler("web+xgqfrms\/cdn", "https://cdn.xgqfrms.xyz?uri=%s", "自定义 URL Scheme, xgqfrms/cdn");
    // navigator.registerProtocolHandler("web+xgqfrms/cdn", "https://cdn.xgqfrms.xyz?uri=%s", "自定义 URL Scheme, xgqfrms/cdn");
    navigator.registerProtocolHandler("web+xgqfrms", "https://cdn.xgqfrms.xyz/URL-Scheme/handler.html?uri=%s", "自定义 URL Scheme, xgqfrms");
    navigator.registerProtocolHandler("web+cdn", "https://cdn.xgqfrms.xyz/URL-Scheme/handler.html?uri=%s", "自定义 URL Scheme, cdn");
    log(`navigator.registerProtocolHandler OK ✅`)
  }
} catch (error) {
 log(`navigator.registerProtocolHandler error ❌`, error)
}

try {
  if(navigator.registerProtocolHandler) {
    navigator.registerProtocolHandler("web+xgqfrms\/cdn", "https://cdn.xgqfrms.xyz/URL-Scheme/handler.html?uri=%s", "自定义 URL Scheme, xgqfrms\/cdn");
    navigator.registerProtocolHandler("web+xgqfrms/cdn", "https://cdn.xgqfrms.xyz/URL-Scheme/handler.html?uri=%s", "自定义 URL Scheme, xgqfrms/cdn");
    log(`navigator.registerProtocolHandler OK ✅`)
  }
} catch (error) {
 log(`navigator.registerProtocolHandler error ❌`, error)
}
