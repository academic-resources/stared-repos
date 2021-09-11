/**
 * @description OOPMT: OOP_Modules_Tempalte v1.1.1 (2017-11-01)
 * @author xgqfrms
 * 
 * @copyright 2017-present
 * @license MIT
 */
'use strict';
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = root.document ?
            factory(root) :
            factory;
    } else {
        root.OOPMT = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function(win) {
    console.log(`win = this \n`, win);
    // IIFE
    var OOPMT = (function() {
        /**
         * (c) 2010-2017 xgqfrms
         *
         * License: www.OOPMT.com/license
         */
        /* global win */
        var doc = win.document,
            SVG_NS = 'http://www.w3.org/2000/svg',
            userAgent = (win.navigator && win.navigator.userAgent) || '',
            svg = doc && doc.createElementNS && !!doc.createElementNS(SVG_NS, 'svg').createSVGRect,
            isMS = /(edge|msie|trident)/i.test(userAgent) && !win.opera,
            isFirefox = /Firefox/.test(userAgent),
            hasBidiBug = isFirefox && parseInt(userAgent.split('Firefox/')[1], 10) < 4; // issue #38

        var OOPMT = win.OOPMT ? win.OOPMT.error(16, true) : {
            product: 'OOPMT',
            version: '6.0.2',
            deg2rad: Math.PI * 2 / 360,
            doc: doc,
            hasBidiBug: hasBidiBug,
            hasTouch: doc && doc.documentElement.ontouchstart !== undefined,
            isMS: isMS,
            isWebKit: /AppleWebKit/.test(userAgent),
            isFirefox: isFirefox,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(userAgent),
            SVG_NS: SVG_NS,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: svg,
            win: win,
            marginNames: ['plotTop', 'marginRight', 'marginBottom', 'plotLeft'],
            noop: function() {
                return undefined;
            },
            /**
             * An array containing the current chart objects in the page. A chart's
             * position in the array is preserved throughout the page's lifetime. When
             * a chart is destroyed, the array item becomes `undefined`.
             * @type {Array.<OOPMT.Chart>}
             * @memberOf OOPMT
             */
            charts: []
        };
        return OOPMT;
    }());
    // IIFE & OOPMT
    (function(H) {
        /**
         * (c) 2010-2017 xgqfrms
         *
         * License: www.OOPMT.com/license
         */
        var each = H.each,
            isNumber = H.isNumber,
            map = H.map,
            merge = H.merge,
            pInt = H.pInt;

        /**
         * @typedef {string} ColorString
         * A valid color to be parsed and handled by OOPMT. OOPMT internally 
         * supports hex colors like `#ffffff`, rgb colors like `rgb(255,255,255)` and
         * rgba colors like `rgba(255,255,255,1)`. Other colors may be supported by the
         * browsers and displayed correctly, but OOPMT is not able to process them
         * and apply concepts like opacity and brightening.
         */
        /**
         * Handle color operations. The object methods are chainable.
         * @param {String} input The input color in either rbga or hex format
         */
        H.Color = function(input) {
            // Backwards compatibility, allow instanciation without new
            if (!(this instanceof H.Color)) {
                return new H.Color(input);
            }
            // Initialize
            this.init(input);
        };
        H.Color.prototype = {

            // Collection of parsers. This can be extended from the outside by pushing parsers
            // to OOPMT.Color.prototype.parsers.
            parsers: [{
                // RGBA color
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(result) {
                    return [pInt(result[1]), pInt(result[2]), pInt(result[3]), parseFloat(result[4], 10)];
                }
            }, {
                // RGB color
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(result) {
                    return [pInt(result[1]), pInt(result[2]), pInt(result[3]), 1];
                }
            }],

            // Collection of named colors. Can be extended from the outside by adding
            // colors to OOPMT.Color.prototype.names.
            names: {
                none: 'rgba(255,255,255,0)',
                white: '#ffffff',
                black: '#000000'
            },

            /**
             * Parse the input color to rgba array
             * @param {String} input
             */
            init: function(input) {
                var result,
                    rgba,
                    i,
                    parser,
                    len;

                this.input = input = this.names[
                    input && input.toLowerCase ?
                    input.toLowerCase() :
                    ''
                ] || input;

                // Gradients
                if (input && input.stops) {
                    this.stops = map(input.stops, function(stop) {
                        return new H.Color(stop[1]);
                    });

                    // Solid colors
                } else {

                    // Bitmasking as input[0] is not working for legacy IE.
                    if (input && input.charAt && input.charAt() === '#') {

                        len = input.length;
                        input = parseInt(input.substr(1), 16);

                        // Handle long-form, e.g. #AABBCC
                        if (len === 7) {

                            rgba = [
                                (input & 0xFF0000) >> 16,
                                (input & 0xFF00) >> 8,
                                (input & 0xFF),
                                1
                            ];

                            // Handle short-form, e.g. #ABC
                            // In short form, the value is assumed to be the same 
                            // for both nibbles for each component. e.g. #ABC = #AABBCC
                        } else if (len === 4) {

                            rgba = [
                                ((input & 0xF00) >> 4) | (input & 0xF00) >> 8,
                                ((input & 0xF0) >> 4) | (input & 0xF0),
                                ((input & 0xF) << 4) | (input & 0xF),
                                1
                            ];
                        }
                    }

                    // Otherwise, check regex parsers
                    if (!rgba) {
                        i = this.parsers.length;
                        while (i-- && !rgba) {
                            parser = this.parsers[i];
                            result = parser.regex.exec(input);
                            if (result) {
                                rgba = parser.parse(result);
                            }
                        }
                    }
                }
                this.rgba = rgba || [];
            },

            /**
             * Return the color a specified format
             * @param {String} format
             */
            get: function(format) {
                var input = this.input,
                    rgba = this.rgba,
                    ret;

                if (this.stops) {
                    ret = merge(input);
                    ret.stops = [].concat(ret.stops);
                    each(this.stops, function(stop, i) {
                        ret.stops[i] = [ret.stops[i][0], stop.get(format)];
                    });

                    // it's NaN if gradient colors on a column chart
                } else if (rgba && isNumber(rgba[0])) {
                    if (format === 'rgb' || (!format && rgba[3] === 1)) {
                        ret = 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
                    } else if (format === 'a') {
                        ret = rgba[3];
                    } else {
                        ret = 'rgba(' + rgba.join(',') + ')';
                    }
                } else {
                    ret = input;
                }
                return ret;
            },

            /**
             * Brighten the color
             * @param {Number} alpha
             */
            brighten: function(alpha) {
                var i,
                    rgba = this.rgba;

                if (this.stops) {
                    each(this.stops, function(stop) {
                        stop.brighten(alpha);
                    });

                } else if (isNumber(alpha) && alpha !== 0) {
                    for (i = 0; i < 3; i++) {
                        rgba[i] += pInt(alpha * 255);

                        if (rgba[i] < 0) {
                            rgba[i] = 0;
                        }
                        if (rgba[i] > 255) {
                            rgba[i] = 255;
                        }
                    }
                }
                return this;
            },

            /**
             * Set the color's opacity to a given alpha value
             * @param {Number} alpha
             */
            setOpacity: function(alpha) {
                this.rgba[3] = alpha;
                return this;
            },

            /*
             * Return an intermediate color between two colors.
             *
             * @param  {OOPMT.Color} to
             *         The color object to tween to.
             * @param  {Number} pos
             *         The intermediate position, where 0 is the from color (current
             *         color item), and 1 is the `to` color.
             *
             * @return {String}
             *         The intermediate color in rgba notation.
             */
            tweenTo: function(to, pos) {
                // Check for has alpha, because rgba colors perform worse due to lack of
                // support in WebKit.
                var fromRgba = this.rgba,
                    toRgba = to.rgba,
                    hasAlpha,
                    ret;

                // Unsupported color, return to-color (#3920, #7034)
                if (!toRgba.length || !fromRgba || !fromRgba.length) {
                    ret = to.input || 'none';

                    // Interpolate
                } else {
                    hasAlpha = (toRgba[3] !== 1 || fromRgba[3] !== 1);
                    ret = (hasAlpha ? 'rgba(' : 'rgb(') +
                        Math.round(toRgba[0] + (fromRgba[0] - toRgba[0]) * (1 - pos)) +
                        ',' +
                        Math.round(toRgba[1] + (fromRgba[1] - toRgba[1]) * (1 - pos)) +
                        ',' +
                        Math.round(toRgba[2] + (fromRgba[2] - toRgba[2]) * (1 - pos)) +
                        (
                            hasAlpha ?
                            (
                                ',' +
                                (toRgba[3] + (fromRgba[3] - toRgba[3]) * (1 - pos))
                            ) :
                            ''
                        ) +
                        ')';
                }
                return ret;
            }
        };
        H.color = function(input) {
            return new H.Color(input);
        };

    }(OOPMT));
    // return Object
    return OOPMT;
}));


/* 

    'use strict';
    // window/this, function
    (function(root, factory) {
        // module & module.exports
        if (typeof module === 'object' && module.exports) {
            // window.document/this.document ? function( window/this) : function
            module.exports = root.document ? factory(root) : factory;
        } else {
            // window.OOPMT/this.OOPMT ? function(window/this)
            root.OOPMT = factory(root);
        }
    }(typeof window !== 'undefined' ? window : this, function(win) {
        console.log(`win = this \n`, win);
        // return Object
        return OOPMT;
    }));

*/