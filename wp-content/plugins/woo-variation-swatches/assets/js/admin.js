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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

jQuery(function ($) {
    Promise.resolve().then(function () {
        return __webpack_require__(2);
    }).then(function (_ref) {
        var PluginHelper = _ref.PluginHelper;


        PluginHelper.GWPAdmin();
        PluginHelper.SelectWoo();
        PluginHelper.ColorPicker();
        PluginHelper.FieldDependency();
        PluginHelper.ImageUploader();
        PluginHelper.AttributeDialog();

        $(document.body).on('woocommerce_added_attribute', function () {
            PluginHelper.SelectWoo();
            PluginHelper.ColorPicker();
            PluginHelper.ImageUploader();
            PluginHelper.AttributeDialog();
        });

        $(document.body).on('wvs_pro_product_swatches_variation_loaded', function () {
            PluginHelper.ColorPicker();
            PluginHelper.ImageUploader();
        });
    });
}); // end of jquery main wrapper

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelper", function() { return PluginHelper; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global WVSPluginObject, wp, woocommerce_admin_meta_boxes*/

var PluginHelper = function ($) {
    var PluginHelper = function () {
        function PluginHelper() {
            _classCallCheck(this, PluginHelper);
        }

        _createClass(PluginHelper, null, [{
            key: 'GWPAdmin',
            value: function GWPAdmin() {
                if ($().gwp_live_feed) {
                    $().gwp_live_feed();
                }
                if ($().gwp_deactivate_popup) {
                    $().gwp_deactivate_popup('woo-variation-swatches');
                }
            }
        }, {
            key: 'ImageUploader',
            value: function ImageUploader() {
                $(document).off('click', 'button.wvs_upload_image_button');
                $(document).on('click', 'button.wvs_upload_image_button', this.AddImage);
                $(document).on('click', 'button.wvs_remove_image_button', this.RemoveImage);
            }
        }, {
            key: 'AddImage',
            value: function AddImage(event) {
                var _this = this;

                event.preventDefault();
                event.stopPropagation();

                var file_frame = void 0;

                if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {

                    // If the media frame already exists, reopen it.
                    if (file_frame) {
                        file_frame.open();
                        return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.select_image = wp.media({
                        title: WVSPluginObject.media_title,
                        button: {
                            text: WVSPluginObject.button_title
                        },
                        multiple: false
                    });

                    // When an image is selected, run a callback.
                    file_frame.on('select', function () {
                        var attachment = file_frame.state().get('selection').first().toJSON();

                        if ($.trim(attachment.id) !== '') {

                            var url = typeof attachment.sizes.thumbnail === 'undefined' ? attachment.sizes.full.url : attachment.sizes.thumbnail.url;

                            $(_this).prev().val(attachment.id);
                            $(_this).closest('.meta-image-field-wrapper').find('img').attr('src', url);
                            $(_this).next().show();
                        }
                        //file_frame.close();
                    });

                    // When open select selected
                    file_frame.on('open', function () {

                        // Grab our attachment selection and construct a JSON representation of the model.
                        var selection = file_frame.state().get('selection');
                        var current = $(_this).prev().val();
                        var attachment = wp.media.attachment(current);
                        attachment.fetch();
                        selection.add(attachment ? [attachment] : []);
                    });

                    // Finally, open the modal.
                    file_frame.open();
                }
            }
        }, {
            key: 'RemoveImage',
            value: function RemoveImage(event) {

                event.preventDefault();
                event.stopPropagation();

                var placeholder = $(this).closest('.meta-image-field-wrapper').find('img').data('placeholder');
                $(this).closest('.meta-image-field-wrapper').find('img').attr('src', placeholder);
                $(this).prev().prev().val('');
                $(this).hide();
                return false;
            }
        }, {
            key: 'SelectWoo',
            value: function SelectWoo() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select.wvs-selectwoo';

                if ($().selectWoo) {
                    $(selector).selectWoo({
                        allowClear: true
                    });
                }
            }
        }, {
            key: 'ColorPicker',
            value: function ColorPicker() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input.wvs-color-picker';

                if ($().wpColorPicker) {
                    $(selector).wpColorPicker();
                }
            }
        }, {
            key: 'FieldDependency',
            value: function FieldDependency() {
                var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-depends]';

                if ($().FormFieldDependency) {
                    $(selector).FormFieldDependency();
                }
            }
        }, {
            key: 'savingDialog',
            value: function savingDialog($wrapper, $dialog, taxonomy) {

                var data = {};
                var term = '';

                // @TODO: We should use form data, because we have to pick array based data also :)

                $dialog.find('input, select').each(function () {
                    var key = $(this).attr('name');
                    var value = $(this).val();
                    if (key) {
                        if (key === 'tag_name') {
                            term = value;
                        } else {
                            data[key] = value;
                        }
                        $(this).val('');
                    }
                });

                if (term) {
                    $('.product_attributes').block({
                        message: null,
                        overlayCSS: {
                            background: '#fff',
                            opacity: 0.6
                        }
                    });

                    var ajax_data = _extends({
                        action: 'woocommerce_add_new_attribute',
                        taxonomy: taxonomy,
                        term: term,
                        security: woocommerce_admin_meta_boxes.add_attribute_nonce
                    }, data);

                    $.post(woocommerce_admin_meta_boxes.ajax_url, ajax_data, function (response) {

                        if (response.error) {
                            // Error.
                            window.alert(response.error);
                        } else if (response.slug) {
                            // Success.
                            $wrapper.find('select.attribute_values').append('<option value="' + response.term_id + '" selected="selected">' + response.name + '</option>');
                            $wrapper.find('select.attribute_values').change();
                        }

                        $('.product_attributes').unblock();
                    });
                } else {
                    $('.product_attributes').unblock();
                }
            }
        }, {
            key: 'AttributeDialog',
            value: function AttributeDialog() {

                var self = this;
                $('.product_attributes').on('click', 'button.wvs_add_new_attribute', function (event) {

                    event.preventDefault();

                    var $wrapper = $(this).closest('.woocommerce_attribute');
                    var attribute = $wrapper.data('taxonomy');
                    var title = $(this).data('dialog_title');

                    $('.wvs-attribute-dialog-for-' + attribute).dialog({
                        title: '',
                        dialogClass: 'wp-dialog wvs-attribute-dialog',
                        classes: {
                            "ui-dialog": "wp-dialog wvs-attribute-dialog"
                        },
                        autoOpen: false,
                        draggable: true,
                        width: 'auto',
                        modal: true,
                        resizable: false,
                        closeOnEscape: true,
                        position: {
                            my: "center",
                            at: "center",
                            of: window
                        },
                        open: function open() {
                            // close dialog by clicking the overlay behind it
                            $('.ui-widget-overlay').bind('click', function () {
                                $('#attribute-dialog').dialog('close');
                            });
                        },
                        create: function create() {
                            // style fix for WordPress admin
                            // $('.ui-dialog-titlebar-close').addClass('ui-button');
                        }
                    }).dialog("option", "title", title).dialog("option", "buttons", [{
                        text: WVSPluginObject.dialog_save,
                        click: function click() {
                            self.savingDialog($wrapper, $(this), attribute);
                            $(this).dialog("close").dialog("destroy");
                        }
                    }, {
                        text: WVSPluginObject.dialog_cancel,
                        click: function click() {
                            $(this).dialog("close").dialog("destroy");
                        }
                    }]).dialog('open');
                });
            }
        }]);

        return PluginHelper;
    }();

    return PluginHelper;
}(jQuery);



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2FkbWluLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGQ2ZjVlZGY1YzI4Y2NhNWYyMjQ2Iiwid2VicGFjazovLy9zcmMvanMvYmFja2VuZC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL1BsdWdpbkhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9iYWNrZW5kLnNjc3M/YmU2MSIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9nd3AtYWRtaW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9mcm9udGVuZC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3Rvb2x0aXAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy90aGVtZS1vdmVycmlkZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL2N1c3RvbWl6ZS1oZWFkaW5nLWNvbnRyb2wuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNmY1ZWRmNWMyOGNjYTVmMjI0NiIsImpRdWVyeSgkID0+IHtcbiAgICBpbXBvcnQoJy4vUGx1Z2luSGVscGVyJykudGhlbigoe1BsdWdpbkhlbHBlcn0pID0+IHtcblxuICAgICAgICBQbHVnaW5IZWxwZXIuR1dQQWRtaW4oKTtcbiAgICAgICAgUGx1Z2luSGVscGVyLlNlbGVjdFdvbygpO1xuICAgICAgICBQbHVnaW5IZWxwZXIuQ29sb3JQaWNrZXIoKTtcbiAgICAgICAgUGx1Z2luSGVscGVyLkZpZWxkRGVwZW5kZW5jeSgpO1xuICAgICAgICBQbHVnaW5IZWxwZXIuSW1hZ2VVcGxvYWRlcigpO1xuICAgICAgICBQbHVnaW5IZWxwZXIuQXR0cmlidXRlRGlhbG9nKCk7XG5cbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5vbignd29vY29tbWVyY2VfYWRkZWRfYXR0cmlidXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUGx1Z2luSGVscGVyLlNlbGVjdFdvbygpO1xuICAgICAgICAgICAgUGx1Z2luSGVscGVyLkNvbG9yUGlja2VyKCk7XG4gICAgICAgICAgICBQbHVnaW5IZWxwZXIuSW1hZ2VVcGxvYWRlcigpO1xuICAgICAgICAgICAgUGx1Z2luSGVscGVyLkF0dHJpYnV0ZURpYWxvZygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLm9uKCd3dnNfcHJvX3Byb2R1Y3Rfc3dhdGNoZXNfdmFyaWF0aW9uX2xvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIFBsdWdpbkhlbHBlci5Db2xvclBpY2tlcigpO1xuICAgICAgICAgICAgUGx1Z2luSGVscGVyLkltYWdlVXBsb2FkZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsgIC8vIGVuZCBvZiBqcXVlcnkgbWFpbiB3cmFwcGVyXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9iYWNrZW5kLmpzIiwiLypnbG9iYWwgV1ZTUGx1Z2luT2JqZWN0LCB3cCwgd29vY29tbWVyY2VfYWRtaW5fbWV0YV9ib3hlcyovXG5cbmNvbnN0IFBsdWdpbkhlbHBlciA9ICgoJCkgPT4ge1xuICAgIGNsYXNzIFBsdWdpbkhlbHBlciB7XG5cbiAgICAgICAgc3RhdGljIEdXUEFkbWluKCkge1xuICAgICAgICAgICAgaWYgKCQoKS5nd3BfbGl2ZV9mZWVkKSB7XG4gICAgICAgICAgICAgICAgJCgpLmd3cF9saXZlX2ZlZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKCkuZ3dwX2RlYWN0aXZhdGVfcG9wdXApIHtcbiAgICAgICAgICAgICAgICAkKCkuZ3dwX2RlYWN0aXZhdGVfcG9wdXAoJ3dvby12YXJpYXRpb24tc3dhdGNoZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBJbWFnZVVwbG9hZGVyKCkge1xuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsICdidXR0b24ud3ZzX3VwbG9hZF9pbWFnZV9idXR0b24nKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24ud3ZzX3VwbG9hZF9pbWFnZV9idXR0b24nLCB0aGlzLkFkZEltYWdlKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24ud3ZzX3JlbW92ZV9pbWFnZV9idXR0b24nLCB0aGlzLlJlbW92ZUltYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBBZGRJbWFnZShldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGxldCBmaWxlX2ZyYW1lO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdwICE9PSAndW5kZWZpbmVkJyAmJiB3cC5tZWRpYSAmJiB3cC5tZWRpYS5lZGl0b3IpIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtZWRpYSBmcmFtZSBhbHJlYWR5IGV4aXN0cywgcmVvcGVuIGl0LlxuICAgICAgICAgICAgICAgIGlmIChmaWxlX2ZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBtZWRpYSBmcmFtZS5cbiAgICAgICAgICAgICAgICBmaWxlX2ZyYW1lID0gd3AubWVkaWEuZnJhbWVzLnNlbGVjdF9pbWFnZSA9IHdwLm1lZGlhKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgICAgOiBXVlNQbHVnaW5PYmplY3QubWVkaWFfdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA6IFdWU1BsdWdpbk9iamVjdC5idXR0b25fdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYW4gaW1hZ2UgaXMgc2VsZWN0ZWQsIHJ1biBhIGNhbGxiYWNrLlxuICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub24oJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSBmaWxlX2ZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0oYXR0YWNobWVudC5pZCkgIT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSAodHlwZW9mKGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsKSA9PT0gJ3VuZGVmaW5lZCcpID8gYXR0YWNobWVudC5zaXplcy5mdWxsLnVybCA6IGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcmV2KCkudmFsKGF0dGFjaG1lbnQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubWV0YS1pbWFnZS1maWVsZC13cmFwcGVyJykuZmluZCgnaW1nJykuYXR0cignc3JjJywgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dCgpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2ZpbGVfZnJhbWUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gb3BlbiBzZWxlY3Qgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBmaWxlX2ZyYW1lLm9uKCdvcGVuJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgb3VyIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjb25zdHJ1Y3QgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbC5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiAgPSBmaWxlX2ZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgICAgPSAkKHRoaXMpLnByZXYoKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSB3cC5tZWRpYS5hdHRhY2htZW50KGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50LmZldGNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoYXR0YWNobWVudCA/IFthdHRhY2htZW50XSA6IFtdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHksIG9wZW4gdGhlIG1vZGFsLlxuICAgICAgICAgICAgICAgIGZpbGVfZnJhbWUub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIFJlbW92ZUltYWdlKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5jbG9zZXN0KCcubWV0YS1pbWFnZS1maWVsZC13cmFwcGVyJykuZmluZCgnaW1nJykuZGF0YSgncGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1ldGEtaW1hZ2UtZmllbGQtd3JhcHBlcicpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICQodGhpcykucHJldigpLnByZXYoKS52YWwoJycpO1xuICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgU2VsZWN0V29vKHNlbGVjdG9yID0gJ3NlbGVjdC53dnMtc2VsZWN0d29vJykge1xuICAgICAgICAgICAgaWYgKCQoKS5zZWxlY3RXb28pIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5zZWxlY3RXb28oe1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0NsZWFyIDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIENvbG9yUGlja2VyKHNlbGVjdG9yID0gJ2lucHV0Lnd2cy1jb2xvci1waWNrZXInKSB7XG4gICAgICAgICAgICBpZiAoJCgpLndwQ29sb3JQaWNrZXIpIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS53cENvbG9yUGlja2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgRmllbGREZXBlbmRlbmN5KHNlbGVjdG9yID0gJ1tkYXRhLWRlcGVuZHNdJykge1xuICAgICAgICAgICAgaWYgKCQoKS5Gb3JtRmllbGREZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuRm9ybUZpZWxkRGVwZW5kZW5jeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIHNhdmluZ0RpYWxvZygkd3JhcHBlciwgJGRpYWxvZywgdGF4b25vbXkpIHtcblxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGxldCB0ZXJtID0gJyc7XG5cbiAgICAgICAgICAgIC8vIEBUT0RPOiBXZSBzaG91bGQgdXNlIGZvcm0gZGF0YSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHBpY2sgYXJyYXkgYmFzZWQgZGF0YSBhbHNvIDopXG5cbiAgICAgICAgICAgICRkaWFsb2cuZmluZChgaW5wdXQsIHNlbGVjdGApLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgICA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndGFnX25hbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0ZXJtKSB7XG4gICAgICAgICAgICAgICAgJCgnLnByb2R1Y3RfYXR0cmlidXRlcycpLmJsb2NrKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlDU1MgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kIDogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSAgICA6IDAuNlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYWpheF9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gICA6ICd3b29jb21tZXJjZV9hZGRfbmV3X2F0dHJpYnV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRheG9ub215IDogdGF4b25vbXksXG4gICAgICAgICAgICAgICAgICAgIHRlcm0gICAgIDogdGVybSxcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJpdHkgOiB3b29jb21tZXJjZV9hZG1pbl9tZXRhX2JveGVzLmFkZF9hdHRyaWJ1dGVfbm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJC5wb3N0KHdvb2NvbW1lcmNlX2FkbWluX21ldGFfYm94ZXMuYWpheF91cmwsIGFqYXhfZGF0YSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFcnJvci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChyZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc2x1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VjY2Vzcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmZpbmQoJ3NlbGVjdC5hdHRyaWJ1dGVfdmFsdWVzJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIHJlc3BvbnNlLnRlcm1faWQgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyByZXNwb25zZS5uYW1lICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuZmluZCgnc2VsZWN0LmF0dHJpYnV0ZV92YWx1ZXMnKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9kdWN0X2F0dHJpYnV0ZXMnKS51bmJsb2NrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcucHJvZHVjdF9hdHRyaWJ1dGVzJykudW5ibG9jaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIEF0dHJpYnV0ZURpYWxvZygpIHtcblxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RfYXR0cmlidXRlcycpLm9uKCdjbGljaycsICdidXR0b24ud3ZzX2FkZF9uZXdfYXR0cmlidXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgbGV0ICR3cmFwcGVyICA9ICQodGhpcykuY2xvc2VzdCgnLndvb2NvbW1lcmNlX2F0dHJpYnV0ZScpO1xuICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSAkd3JhcHBlci5kYXRhKCd0YXhvbm9teScpO1xuICAgICAgICAgICAgICAgIGxldCB0aXRsZSAgICAgPSAkKHRoaXMpLmRhdGEoJ2RpYWxvZ190aXRsZScpO1xuXG4gICAgICAgICAgICAgICAgJCgnLnd2cy1hdHRyaWJ1dGUtZGlhbG9nLWZvci0nICsgYXR0cmlidXRlKS5kaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgIDogJycsXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ0NsYXNzICAgOiAnd3AtZGlhbG9nIHd2cy1hdHRyaWJ1dGUtZGlhbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidWktZGlhbG9nXCIgOiBcIndwLWRpYWxvZyB3dnMtYXR0cmlidXRlLWRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGF1dG9PcGVuICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlICAgICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoICAgICAgICAgOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByZXNpemFibGUgICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGUgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXkgOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXQgOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2YgOiB3aW5kb3dcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb3BlbiAgICAgICAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGRpYWxvZyBieSBjbGlja2luZyB0aGUgb3ZlcmxheSBiZWhpbmQgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy51aS13aWRnZXQtb3ZlcmxheScpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNhdHRyaWJ1dGUtZGlhbG9nJykuZGlhbG9nKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlICAgICAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlIGZpeCBmb3IgV29yZFByZXNzIGFkbWluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAkKCcudWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlJykuYWRkQ2xhc3MoJ3VpLWJ1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRpYWxvZyhcIm9wdGlvblwiLCBcInRpdGxlXCIsIHRpdGxlKVxuICAgICAgICAgICAgICAgICAgICAuZGlhbG9nKFwib3B0aW9uXCIsIFwiYnV0dG9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgOiBXVlNQbHVnaW5PYmplY3QuZGlhbG9nX3NhdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zYXZpbmdEaWFsb2coJHdyYXBwZXIsICQodGhpcyksIGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpLmRpYWxvZyhcImRlc3Ryb3lcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgOiBXVlNQbHVnaW5PYmplY3QuZGlhbG9nX2NhbmNlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2sgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpLmRpYWxvZyhcImRlc3Ryb3lcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmRpYWxvZygnb3BlbicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQbHVnaW5IZWxwZXI7XG59KShqUXVlcnkpO1xuXG5leHBvcnQgeyBQbHVnaW5IZWxwZXIgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL1BsdWdpbkhlbHBlci5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9iYWNrZW5kLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL2d3cC1hZG1pbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9mcm9udGVuZC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy90b29sdGlwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL3RoZW1lLW92ZXJyaWRlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL2N1c3RvbWl6ZS1oZWFkaW5nLWNvbnRyb2wuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFBQTtBQUFBO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7QUFBQTtBQUFBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZFQTtBQUFBO0FBQUE7QUFDQTtBQTBFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuRkE7QUFBQTtBQUFBO0FBcUZBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUEzRkE7QUFBQTtBQUFBO0FBNkZBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQWpHQTtBQUFBO0FBQUE7QUFtR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBdkdBO0FBQUE7QUFBQTtBQUNBO0FBMEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQWpLQTtBQUFBO0FBQUE7QUFDQTtBQW9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExQkE7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVNBO0FBQ0E7QUE5TkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWdPQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyT0E7Ozs7OztBQ0FBOzs7Ozs7QUNBQTs7Ozs7O0FDQUE7Ozs7OztBQ0FBOzs7Ozs7QUNBQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=