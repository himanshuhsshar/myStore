/*!
 * WooCommerce Variation Swatches v1.0.46 
 * 
 * Author: Emran Ahmed ( emran.bd.08@gmail.com ) 
 * Date: 2018-11-8 11:44:56
 * Released under the GPLv3 license.
 */
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

jQuery(function ($) {
    Promise.resolve().then(function () {
        return __webpack_require__(11);
    }).then(function () {
        // Init on Ajax Popup :)
        $(document).on('wc_variation_form', '.variations_form', function () {
            $(this).WooVariationSwatches();
        });

        // Support for Jetpack's Infinite Scroll,
        $(document.body).on('post-load', function () {
            $('.variations_form').each(function () {
                $(this).wc_variation_form();
            });
        });

        // Support for Yith Infinite Scroll
        $(document).on('yith_infs_added_elem', function () {
            $('.variations_form').each(function () {
                $(this).wc_variation_form();
            });
        });

        // Support for Woodmart theme
        $(document).on('wood-images-loaded', function () {
            $('.variations_form').each(function () {
                $(this).wc_variation_form();
            });
        });

        // Support for berocket ajax filters
        $(document).on('berocket_ajax_products_loaded', function () {
            $('.variations_form').each(function () {
                $(this).wc_variation_form();
            });
        });
    });
}); // end of jquery main wrapper

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ================================================================
// WooCommerce Variation Change
// ================================================================

var WooVariationSwatches = function ($) {

    var Default = {};

    var WooVariationSwatches = function () {
        function WooVariationSwatches(element, config) {
            _classCallCheck(this, WooVariationSwatches);

            // Assign
            this._element = $(element);
            this._config = $.extend({}, Default, config);
            this._generated = {};
            this._out_of_stock = {};
            this.product_variations = this._element.data('product_variations');
            this.is_ajax_variation = !this.product_variations;
            this.product_id = this._element.data('product_id');
            this.hidden_behaviour = $('body').hasClass('woo-variation-swatches-attribute-behavior-hide');
            this.is_mobile = $('body').hasClass('woo-variation-swatches-on-mobile');

            // Call
            this.init(this.is_ajax_variation, this.hidden_behaviour);
            this.loaded(this.is_ajax_variation, this.hidden_behaviour);
            this.update(this.is_ajax_variation, this.hidden_behaviour);
            this.reset(this.is_ajax_variation, this.hidden_behaviour);

            // Trigger
            $(document).trigger('woo_variation_swatches', [this._element]);
        }

        _createClass(WooVariationSwatches, [{
            key: 'init',
            value: function init(is_ajax, hidden_behaviour) {
                var _this3 = this;

                var _this = this;
                this._element.find('ul.variable-items-wrapper').each(function (i, el) {

                    var select = $(this).siblings('select.woo-variation-raw-select');
                    var li = $(this).find('li');
                    var reselect_clear = $(this).hasClass('reselect-clear');
                    var is_mobile = $('body').hasClass('woo-variation-swatches-on-mobile');

                    $(this).parent().addClass('woo-variation-items-wrapper');

                    // For Avada FIX
                    if (select.length < 1) {
                        select = $(this).parent().find('select.woo-variation-raw-select');
                    }

                    if (reselect_clear) {
                        $(this).on('touchstart click', 'li:not(.selected):not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).data('value');
                            select.val(value).trigger('change');
                            select.trigger('click');

                            select.trigger('focusin');

                            if (is_mobile) {
                                select.trigger('touchstart');
                            }

                            $(this).trigger('focus'); // Mobile tooltip
                            $(this).trigger('wvs-selected-item', [value, select, _this._element]); // Custom Event for li
                        });

                        $(this).on('touchstart click', 'li.selected:not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            select.val('').trigger('change');
                            select.trigger('click');

                            select.trigger('focusin');

                            if (is_mobile) {
                                select.trigger('touchstart');
                            }

                            $(this).trigger('focus'); // Mobile tooltip

                            $(this).trigger('wvs-unselected-item', [value, select, _this._element]); // Custom Event for li
                        });

                        // RADIO
                        $(this).on('touchstart click', 'input.wvs-radio-variable-item:radio', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(this).trigger('change');
                        });

                        $(this).on('change', 'input.wvs-radio-variable-item:radio', function (e) {
                            var _this2 = this;

                            e.preventDefault();
                            e.stopPropagation();

                            var value = $(this).val();

                            if ($(this).parent('li.radio-variable-item').hasClass('selected')) {
                                select.val('').trigger('change');
                                _.delay(function () {
                                    $(_this2).prop('checked', false);
                                    $(_this2).parent('li.radio-variable-item').trigger('wvs-unselected-item', [value, select, _this._element]); // Custom Event for li
                                }, 1);
                            } else {
                                select.val(value).trigger('change');
                                $(this).parent('.radio-variable-item').trigger('wvs-selected-item', [value, select, _this._element]); // Custom Event for li
                            }

                            select.trigger('click');
                            select.trigger('focusin');
                            if (is_mobile) {
                                select.trigger('touchstart');
                            }
                        });
                    } else {
                        $(this).on('touchstart click', 'li:not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).data('value');
                            select.val(value).trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');
                            if (is_mobile) {
                                select.trigger('touchstart');
                            }

                            $(this).trigger('focus'); // Mobile tooltip

                            $(this).trigger('wvs-selected-item', [value, select, _this._element]); // Custom Event for li
                        });

                        // Radio
                        $(this).on('change', 'input.wvs-radio-variable-item:radio', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).val();

                            select.val(value).trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');

                            if (is_mobile) {
                                select.trigger('touchstart');
                            }

                            // Radio
                            $(this).parent('li.radio-variable-item').removeClass('selected disabled').addClass('selected');
                            $(this).parent('li.radio-variable-item').trigger('wvs-selected-item', [value, select, _this._element]); // Custom Event for li
                        });
                    }
                });

                _.delay(function () {
                    _this3._element.trigger('reload_product_variations');
                    _this3._element.trigger('woo_variation_swatches_init', [_this3, _this3.product_variations]);
                    $(document).trigger('woo_variation_swatches_loaded', [_this3._element, _this3.product_variations]);
                }, 1);
            }
        }, {
            key: 'loaded',
            value: function loaded(is_ajax, hidden_behaviour) {
                if (!is_ajax) {
                    this._element.on('woo_variation_swatches_init', function (event, object, product_variations) {

                        object._generated = product_variations.reduce(function (obj, variation) {

                            Object.keys(variation.attributes).map(function (attribute_name) {
                                if (!obj[attribute_name]) {
                                    obj[attribute_name] = [];
                                }

                                if (variation.attributes[attribute_name]) {
                                    obj[attribute_name].push(variation.attributes[attribute_name]);
                                }
                            });

                            return obj;
                        }, {});

                        object._out_of_stock = product_variations.reduce(function (obj, variation) {

                            Object.keys(variation.attributes).map(function (attribute_name) {
                                if (!obj[attribute_name]) {
                                    obj[attribute_name] = [];
                                }

                                if (variation.attributes[attribute_name] && !variation.is_in_stock) {
                                    obj[attribute_name].push(variation.attributes[attribute_name]);
                                }
                            });

                            return obj;
                        }, {});

                        // console.log(object._out_of_stock);

                        $(this).find('ul.variable-items-wrapper').each(function () {
                            var li = $(this).find('li');
                            var attribute = $(this).data('attribute_name');
                            var attribute_values = object._generated[attribute];
                            var out_of_stock_values = object._out_of_stock[attribute];

                            //console.log(out_of_stock_values)

                            li.each(function () {
                                var attribute_value = $(this).attr('data-value');

                                // if (!_.isEmpty(attribute_values) && !_.contains(attribute_values, attribute_value)){}

                                if (!_.isEmpty(attribute_values) && _.indexOf(attribute_values, attribute_value) === -1) {
                                    $(this).removeClass('selected');
                                    $(this).addClass('disabled');

                                    if ($(this).hasClass('radio-variable-item')) {
                                        $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                                    }
                                }
                            });
                        });
                    });
                }
            }
        }, {
            key: 'reset',
            value: function reset(is_ajax, hidden_behaviour) {
                var _this = this;
                this._element.on('reset_data', function (event) {
                    $(this).find('ul.variable-items-wrapper').each(function () {
                        var li = $(this).find('li');
                        li.each(function () {
                            if (!is_ajax) {
                                $(this).removeClass('selected disabled');

                                if ($(this).hasClass('radio-variable-item')) {
                                    $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false).prop('checked', false);
                                }
                            } else {
                                if ($(this).hasClass('radio-variable-item')) {
                                    //    $(this).find('input.wvs-radio-variable-item:radio').prop('checked', false);
                                }
                            }

                            $(this).trigger('wvs-unselected-item', ['', '', _this._element]); // Custom Event for li
                        });
                    });
                });
            }
        }, {
            key: 'update',
            value: function update(is_ajax, hidden_behaviour) {

                this._element.on('__found_variation', function (event, variation) {

                    //console.log(this.$attributeFields);

                    /*  _.delay(() => {
                          $(this).find('ul.variable-items-wrapper').each(function () {
                              let attribute_name = $(this).data('attribute_name');
                               $(this).find('li').each(function () {
                                  let value = $(this).attr('data-value');
                                   console.log(variation)
                                   if (variation.attributes[attribute_name] === value && !variation.is_in_stock) {
                                      $(this).addClass('disabled');
                                  }
                               });
                          });
                       }, 2)*/
                });

                this._element.on('woocommerce_variation_has_changed', function (event) {
                    if (is_ajax) {
                        $(this).find('ul.variable-items-wrapper').each(function () {
                            var _this4 = this;

                            var selected = '',
                                options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                                current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                                eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                                li = $(this).find('li'),
                                selects = [];

                            // For Avada FIX
                            if (options.length < 1) {
                                options = $(this).parent().find('select.woo-variation-raw-select').find('option');
                                current = $(this).parent().find('select.woo-variation-raw-select').find('option:selected');
                                eq = $(this).parent().find('select.woo-variation-raw-select').find('option').eq(1);
                            }

                            options.each(function () {
                                if ($(this).val() !== '') {
                                    selects.push($(this).val());
                                    selected = current ? current.val() : eq.val();
                                }
                            });

                            _.delay(function () {
                                li.each(function () {
                                    var value = $(this).attr('data-value');
                                    $(this).removeClass('selected disabled');

                                    if (value === selected) {
                                        $(this).addClass('selected');
                                        if ($(this).hasClass('radio-variable-item')) {
                                            $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false).prop('checked', true);
                                        }
                                    }
                                });

                                // Items Updated
                                $(_this4).trigger('wvs-items-updated');
                            }, 1);
                        });
                    }
                });

                // WithOut Ajax Update
                this._element.on('woocommerce_update_variation_values', function (event) {
                    $(this).find('ul.variable-items-wrapper').each(function () {
                        var _this5 = this;

                        var selected = '',
                            options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                            current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                            eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                            li = $(this).find('li'),
                            selects = [];

                        // For Avada FIX
                        if (options.length < 1) {
                            options = $(this).parent().find('select.woo-variation-raw-select').find('option');
                            current = $(this).parent().find('select.woo-variation-raw-select').find('option:selected');
                            eq = $(this).parent().find('select.woo-variation-raw-select').find('option').eq(1);
                        }

                        options.each(function () {
                            if ($(this).val() !== '') {
                                selects.push($(this).val());
                                selected = current ? current.val() : eq.val();
                            }
                        });

                        _.delay(function () {
                            li.each(function () {
                                var value = $(this).attr('data-value');
                                $(this).removeClass('selected disabled').addClass('disabled');

                                // if (_.contains(selects, value))

                                if (_.indexOf(selects, value) !== -1) {

                                    $(this).removeClass('disabled');

                                    $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false);

                                    if (value === selected) {

                                        $(this).addClass('selected');

                                        if ($(this).hasClass('radio-variable-item')) {
                                            $(this).find('input.wvs-radio-variable-item:radio').prop('checked', true);
                                        }
                                    }
                                } else {

                                    if ($(this).hasClass('radio-variable-item')) {
                                        $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                                    }
                                }
                            });

                            // Items Updated
                            $(_this5).trigger('wvs-items-updated');
                        }, 1);
                    });
                });
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function () {
                    new WooVariationSwatches(this, config);
                });
            }
        }]);

        return WooVariationSwatches;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn['WooVariationSwatches'] = WooVariationSwatches._jQueryInterface;
    $.fn['WooVariationSwatches'].Constructor = WooVariationSwatches;
    $.fn['WooVariationSwatches'].noConflict = function () {
        $.fn['WooVariationSwatches'] = $.fn['WooVariationSwatches'];
        return WooVariationSwatches._jQueryInterface;
    };

    return WooVariationSwatches;
}(jQuery);

/* harmony default export */ __webpack_exports__["default"] = (WooVariationSwatches);

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2Zyb250ZW5kLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGQ2ZjVlZGY1YzI4Y2NhNWYyMjQ2Iiwid2VicGFjazovLy9zcmMvanMvZnJvbnRlbmQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9Xb29WYXJpYXRpb25Td2F0Y2hlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNmY1ZWRmNWMyOGNjYTVmMjI0NiIsImpRdWVyeSgkID0+IHtcbiAgICBpbXBvcnQoJy4vV29vVmFyaWF0aW9uU3dhdGNoZXMnKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gSW5pdCBvbiBBamF4IFBvcHVwIDopXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd3Y192YXJpYXRpb25fZm9ybScsICcudmFyaWF0aW9uc19mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5Xb29WYXJpYXRpb25Td2F0Y2hlcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdXBwb3J0IGZvciBKZXRwYWNrJ3MgSW5maW5pdGUgU2Nyb2xsLFxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLm9uKCdwb3N0LWxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcudmFyaWF0aW9uc19mb3JtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS53Y192YXJpYXRpb25fZm9ybSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgWWl0aCBJbmZpbml0ZSBTY3JvbGxcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3lpdGhfaW5mc19hZGRlZF9lbGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLnZhcmlhdGlvbnNfZm9ybScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykud2NfdmFyaWF0aW9uX2Zvcm0oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIFdvb2RtYXJ0IHRoZW1lXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd3b29kLWltYWdlcy1sb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcudmFyaWF0aW9uc19mb3JtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS53Y192YXJpYXRpb25fZm9ybSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgYmVyb2NrZXQgYWpheCBmaWx0ZXJzXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdiZXJvY2tldF9hamF4X3Byb2R1Y3RzX2xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy52YXJpYXRpb25zX2Zvcm0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLndjX3ZhcmlhdGlvbl9mb3JtKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7ICAvLyBlbmQgb2YganF1ZXJ5IG1haW4gd3JhcHBlclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvZnJvbnRlbmQuanMiLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBXb29Db21tZXJjZSBWYXJpYXRpb24gQ2hhbmdlXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IFdvb1ZhcmlhdGlvblN3YXRjaGVzID0gKCgkKSA9PiB7XG5cbiAgICBjb25zdCBEZWZhdWx0ID0ge307XG5cbiAgICBjbGFzcyBXb29WYXJpYXRpb25Td2F0Y2hlcyB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG5cbiAgICAgICAgICAgIC8vIEFzc2lnblxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgICAgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlZCAgICAgICAgID0ge307XG4gICAgICAgICAgICB0aGlzLl9vdXRfb2Zfc3RvY2sgICAgICA9IHt9O1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0X3ZhcmlhdGlvbnMgPSB0aGlzLl9lbGVtZW50LmRhdGEoJ3Byb2R1Y3RfdmFyaWF0aW9ucycpO1xuICAgICAgICAgICAgdGhpcy5pc19hamF4X3ZhcmlhdGlvbiAgPSAhdGhpcy5wcm9kdWN0X3ZhcmlhdGlvbnM7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RfaWQgICAgICAgICA9IHRoaXMuX2VsZW1lbnQuZGF0YSgncHJvZHVjdF9pZCcpO1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5fYmVoYXZpb3VyICAgPSAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvby12YXJpYXRpb24tc3dhdGNoZXMtYXR0cmlidXRlLWJlaGF2aW9yLWhpZGUnKTtcbiAgICAgICAgICAgIHRoaXMuaXNfbW9iaWxlICAgICAgICAgID0gJCgnYm9keScpLmhhc0NsYXNzKCd3b28tdmFyaWF0aW9uLXN3YXRjaGVzLW9uLW1vYmlsZScpO1xuXG4gICAgICAgICAgICAvLyBDYWxsXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5pc19hamF4X3ZhcmlhdGlvbiwgdGhpcy5oaWRkZW5fYmVoYXZpb3VyKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkKHRoaXMuaXNfYWpheF92YXJpYXRpb24sIHRoaXMuaGlkZGVuX2JlaGF2aW91cik7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLmlzX2FqYXhfdmFyaWF0aW9uLCB0aGlzLmhpZGRlbl9iZWhhdmlvdXIpO1xuICAgICAgICAgICAgdGhpcy5yZXNldCh0aGlzLmlzX2FqYXhfdmFyaWF0aW9uLCB0aGlzLmhpZGRlbl9iZWhhdmlvdXIpO1xuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCd3b29fdmFyaWF0aW9uX3N3YXRjaGVzJywgW3RoaXMuX2VsZW1lbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbmV3IFdvb1ZhcmlhdGlvblN3YXRjaGVzKHRoaXMsIGNvbmZpZylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpbml0KGlzX2FqYXgsIGhpZGRlbl9iZWhhdmlvdXIpIHtcblxuICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ICAgICAgICAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGxpICAgICAgICAgICAgID0gJCh0aGlzKS5maW5kKCdsaScpO1xuICAgICAgICAgICAgICAgIGxldCByZXNlbGVjdF9jbGVhciA9ICQodGhpcykuaGFzQ2xhc3MoJ3Jlc2VsZWN0LWNsZWFyJyk7XG4gICAgICAgICAgICAgICAgbGV0IGlzX21vYmlsZSAgICAgID0gJCgnYm9keScpLmhhc0NsYXNzKCd3b28tdmFyaWF0aW9uLXN3YXRjaGVzLW9uLW1vYmlsZScpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnd29vLXZhcmlhdGlvbi1pdGVtcy13cmFwcGVyJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgQXZhZGEgRklYXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNlbGVjdF9jbGVhcikge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJ2xpOm5vdCguc2VsZWN0ZWQpOm5vdCgucmFkaW8tdmFyaWFibGUtaXRlbSknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC50cmlnZ2VyKCdmb2N1c2luJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19tb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcigndG91Y2hzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2ZvY3VzJyk7IC8vIE1vYmlsZSB0b29sdGlwXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3d2cy1zZWxlY3RlZC1pdGVtJywgW3ZhbHVlLCBzZWxlY3QsIF90aGlzLl9lbGVtZW50XSk7IC8vIEN1c3RvbSBFdmVudCBmb3IgbGlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbigndG91Y2hzdGFydCBjbGljaycsICdsaS5zZWxlY3RlZDpub3QoLnJhZGlvLXZhcmlhYmxlLWl0ZW0pJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudmFsKCcnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC50cmlnZ2VyKCdjbGljaycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdmb2N1cycpOyAvLyBNb2JpbGUgdG9vbHRpcFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3d2cy11bnNlbGVjdGVkLWl0ZW0nLCBbdmFsdWUsIHNlbGVjdCwgX3RoaXMuX2VsZW1lbnRdKTsgLy8gQ3VzdG9tIEV2ZW50IGZvciBsaVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJBRElPXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ3RvdWNoc3RhcnQgY2xpY2snLCAnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NoYW5nZScsICdpbnB1dC53dnMtcmFkaW8tdmFyaWFibGUtaXRlbTpyYWRpbycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoJ2xpLnJhZGlvLXZhcmlhYmxlLWl0ZW0nKS5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVsYXkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCdsaS5yYWRpby12YXJpYWJsZS1pdGVtJykudHJpZ2dlcignd3ZzLXVuc2VsZWN0ZWQtaXRlbScsIFt2YWx1ZSwgc2VsZWN0LCBfdGhpcy5fZWxlbWVudF0pOyAvLyBDdXN0b20gRXZlbnQgZm9yIGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCcucmFkaW8tdmFyaWFibGUtaXRlbScpLnRyaWdnZXIoJ3d2cy1zZWxlY3RlZC1pdGVtJywgW3ZhbHVlLCBzZWxlY3QsIF90aGlzLl9lbGVtZW50XSk7IC8vIEN1c3RvbSBFdmVudCBmb3IgbGlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX21vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC50cmlnZ2VyKCd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbigndG91Y2hzdGFydCBjbGljaycsICdsaTpub3QoLnJhZGlvLXZhcmlhYmxlLWl0ZW0pJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudmFsKHZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2ZvY3VzaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19tb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcigndG91Y2hzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2ZvY3VzJyk7IC8vIE1vYmlsZSB0b29sdGlwXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignd3ZzLXNlbGVjdGVkLWl0ZW0nLCBbdmFsdWUsIHNlbGVjdCwgX3RoaXMuX2VsZW1lbnRdKTsgLy8gQ3VzdG9tIEV2ZW50IGZvciBsaVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSYWRpb1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjaGFuZ2UnLCAnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCdsaS5yYWRpby12YXJpYWJsZS1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIGRpc2FibGVkJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgnbGkucmFkaW8tdmFyaWFibGUtaXRlbScpLnRyaWdnZXIoJ3d2cy1zZWxlY3RlZC1pdGVtJywgW3ZhbHVlLCBzZWxlY3QsIF90aGlzLl9lbGVtZW50XSk7IC8vIEN1c3RvbSBFdmVudCBmb3IgbGlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uZGVsYXkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQudHJpZ2dlcigncmVsb2FkX3Byb2R1Y3RfdmFyaWF0aW9ucycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQudHJpZ2dlcignd29vX3ZhcmlhdGlvbl9zd2F0Y2hlc19pbml0JywgW3RoaXMsIHRoaXMucHJvZHVjdF92YXJpYXRpb25zXSlcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCd3b29fdmFyaWF0aW9uX3N3YXRjaGVzX2xvYWRlZCcsIFt0aGlzLl9lbGVtZW50LCB0aGlzLnByb2R1Y3RfdmFyaWF0aW9uc10pXG4gICAgICAgICAgICB9LCAxKVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGVkKGlzX2FqYXgsIGhpZGRlbl9iZWhhdmlvdXIpIHtcbiAgICAgICAgICAgIGlmICghaXNfYWpheCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ3dvb192YXJpYXRpb25fc3dhdGNoZXNfaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgb2JqZWN0LCBwcm9kdWN0X3ZhcmlhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuX2dlbmVyYXRlZCA9IHByb2R1Y3RfdmFyaWF0aW9ucy5yZWR1Y2UoKG9iaiwgdmFyaWF0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhcmlhdGlvbi5hdHRyaWJ1dGVzKS5tYXAoKGF0dHJpYnV0ZV9uYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmpbYXR0cmlidXRlX25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyaWJ1dGVfbmFtZV0gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYXRpb24uYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHJpYnV0ZV9uYW1lXS5wdXNoKHZhcmlhdGlvbi5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV9uYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5fb3V0X29mX3N0b2NrID0gcHJvZHVjdF92YXJpYXRpb25zLnJlZHVjZSgob2JqLCB2YXJpYXRpb24pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModmFyaWF0aW9uLmF0dHJpYnV0ZXMpLm1hcCgoYXR0cmlidXRlX25hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9ialthdHRyaWJ1dGVfbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHJpYnV0ZV9uYW1lXSA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhdGlvbi5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV9uYW1lXSAmJiAhdmFyaWF0aW9uLmlzX2luX3N0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyaWJ1dGVfbmFtZV0ucHVzaCh2YXJpYXRpb24uYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmplY3QuX291dF9vZl9zdG9jayk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd1bC52YXJpYWJsZS1pdGVtcy13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGkgICAgICAgICAgICAgICAgICA9ICQodGhpcykuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgICAgICAgICAgID0gJCh0aGlzKS5kYXRhKCdhdHRyaWJ1dGVfbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZV92YWx1ZXMgICAgPSBvYmplY3QuX2dlbmVyYXRlZFthdHRyaWJ1dGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG91dF9vZl9zdG9ja192YWx1ZXMgPSBvYmplY3QuX291dF9vZl9zdG9ja1thdHRyaWJ1dGVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG91dF9vZl9zdG9ja192YWx1ZXMpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVfdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghXy5pc0VtcHR5KGF0dHJpYnV0ZV92YWx1ZXMpICYmICFfLmNvbnRhaW5zKGF0dHJpYnV0ZV92YWx1ZXMsIGF0dHJpYnV0ZV92YWx1ZSkpe31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KGF0dHJpYnV0ZV92YWx1ZXMpICYmIF8uaW5kZXhPZihhdHRyaWJ1dGVfdmFsdWVzLCBhdHRyaWJ1dGVfdmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyYWRpby12YXJpYWJsZS1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXNldChpc19hamF4LCBoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5vbigncmVzZXRfZGF0YScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGkgPSAkKHRoaXMpLmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgIGxpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc19hamF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQgZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyYWRpby12YXJpYWJsZS1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dC53dnMtcmFkaW8tdmFyaWFibGUtaXRlbTpyYWRpbycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3JhZGlvLXZhcmlhYmxlLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignd3ZzLXVuc2VsZWN0ZWQtaXRlbScsIFsnJywgJycsIF90aGlzLl9lbGVtZW50XSk7IC8vIEN1c3RvbSBFdmVudCBmb3IgbGlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZShpc19hamF4LCBoaWRkZW5fYmVoYXZpb3VyKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ19fZm91bmRfdmFyaWF0aW9uJywgKGV2ZW50LCB2YXJpYXRpb24pID0+IHtcblxuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLiRhdHRyaWJ1dGVGaWVsZHMpO1xuXG4gICAgICAgICAgICAgICAgLyogIF8uZGVsYXkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlX25hbWUgPSAkKHRoaXMpLmRhdGEoJ2F0dHJpYnV0ZV9uYW1lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhcmlhdGlvbilcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhdGlvbi5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV9uYW1lXSA9PT0gdmFsdWUgJiYgIXZhcmlhdGlvbi5pc19pbl9zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIH0sIDIpKi9cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCd3b29jb21tZXJjZV92YXJpYXRpb25faGFzX2NoYW5nZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNfYWpheCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3VsLnZhcmlhYmxlLWl0ZW1zLXdyYXBwZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxICAgICAgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpLmVxKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpICAgICAgID0gJCh0aGlzKS5maW5kKCdsaScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMgID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBBdmFkYSBGSVhcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxICAgICAgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb24nKS5lcSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGN1cnJlbnQgPyBjdXJyZW50LnZhbCgpIDogZXEudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVsYXkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQgZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3JhZGlvLXZhcmlhYmxlLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0ZW1zIFVwZGF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ3d2cy1pdGVtcy11cGRhdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFdpdGhPdXQgQWpheCBVcGRhdGVcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ3dvb2NvbW1lcmNlX3VwZGF0ZV92YXJpYXRpb25fdmFsdWVzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd1bC52YXJpYWJsZS1pdGVtcy13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXEgICAgICAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJykuZXEoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaSAgICAgICA9ICQodGhpcykuZmluZCgnbGknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMgID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIEF2YWRhIEZJWFxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJykuZXEoMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0cy5wdXNoKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gY3VycmVudCA/IGN1cnJlbnQudmFsKCkgOiBlcS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5kZWxheSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKF8uY29udGFpbnMoc2VsZWN0cywgdmFsdWUpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaW5kZXhPZihzZWxlY3RzLCB2YWx1ZSkgIT09IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzZWxlY3RlZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmFkaW8tdmFyaWFibGUtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dC53dnMtcmFkaW8tdmFyaWFibGUtaXRlbTpyYWRpbycpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmFkaW8tdmFyaWFibGUtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0ZW1zIFVwZGF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignd3ZzLWl0ZW1zLXVwZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10gPSBXb29WYXJpYXRpb25Td2F0Y2hlcy5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10uQ29uc3RydWN0b3IgPSBXb29WYXJpYXRpb25Td2F0Y2hlcztcbiAgICAkLmZuWydXb29WYXJpYXRpb25Td2F0Y2hlcyddLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuWydXb29WYXJpYXRpb25Td2F0Y2hlcyddID0gJC5mblsnV29vVmFyaWF0aW9uU3dhdGNoZXMnXTtcbiAgICAgICAgcmV0dXJuIFdvb1ZhcmlhdGlvblN3YXRjaGVzLl9qUXVlcnlJbnRlcmZhY2VcbiAgICB9XG5cbiAgICByZXR1cm4gV29vVmFyaWF0aW9uU3dhdGNoZXM7XG5cbn0pKGpRdWVyeSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdvb1ZhcmlhdGlvblN3YXRjaGVzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9Xb29WYXJpYXRpb25Td2F0Y2hlcy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVCQTtBQUFBO0FBQUE7QUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5LQTtBQUFBO0FBQUE7QUFzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwT0E7QUFBQTtBQUFBO0FBdU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBN1BBO0FBQUE7QUFBQTtBQUNBO0FBZ1FBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQWxZQTtBQUFBO0FBQUE7QUE4QkE7QUFDQTtBQUNBO0FBQ0E7QUFqQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQXFZQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=