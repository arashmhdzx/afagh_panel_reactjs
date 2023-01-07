exports.id = 521;
exports.ids = [521];
exports.modules = {

/***/ 651:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "modal_wrapper__4tJcG",
	"header": "modal_header__7YKzx",
	"body": "modal_body__n_isx",
	"footer": "modal_footer__ow_pE",
	"btn": "modal_btn__QhORv"
};


/***/ }),

/***/ 5521:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rsuite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4210);
/* harmony import */ var rsuite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rsuite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inputs_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6592);
/* harmony import */ var _styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(651);
/* harmony import */ var _styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _solvers_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5213);
/* harmony import */ var _layout_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2230);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_inputs_button__WEBPACK_IMPORTED_MODULE_3__, _solvers_form__WEBPACK_IMPORTED_MODULE_4__, _layout_view__WEBPACK_IMPORTED_MODULE_5__]);
([_inputs_button__WEBPACK_IMPORTED_MODULE_3__, _solvers_form__WEBPACK_IMPORTED_MODULE_4__, _layout_view__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function AModal({ open , header , body , footer , onClose , Solver  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(rsuite__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        open: open,
        onClose: ()=>onClose(),
        className: `${_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__.wrapper}`,
        children: [
            header && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(rsuite__WEBPACK_IMPORTED_MODULE_2__.Modal.Header, {
                className: `${_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__.header}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    children: header
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(rsuite__WEBPACK_IMPORTED_MODULE_2__.Modal.Body, {
                className: `${_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__.body}`,
                children: body?.form ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solvers_form__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    ...body.form,
                    Solver: Solver
                }) : body?.view ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_view__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    ...body.view,
                    Solver: Solver
                }) : body
            }),
            footer && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(rsuite__WEBPACK_IMPORTED_MODULE_2__.Modal.Footer, {
                className: `${_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__.footer}`,
                children: Array.isArray(footer) && footer.map((v, i)=>{
                    const { type , prompt , state , onClick , handleClick , color  } = v ?? {};
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `${_styles_components_display_modal_module_scss__WEBPACK_IMPORTED_MODULE_6__.btn}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_inputs_button__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            status: state,
                            clickHandler: onClick ?? handleClick,
                            prompt: prompt,
                            color: color
                        })
                    }, `modal-btn-${i}`);
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;