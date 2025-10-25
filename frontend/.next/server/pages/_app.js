/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"(pages-dir-node)/./node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_chains__WEBPACK_IMPORTED_MODULE_3__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_chains__WEBPACK_IMPORTED_MODULE_3__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\nconst wcProjectId = \"939924e327efcf0409814be14281c4ad\";\nif (!wcProjectId) {\n    throw new Error(\"Missing NEXT_PUBLIC_WC_PROJECT_ID in .env.local\");\n}\nconst config = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__.getDefaultConfig)({\n    appName: \"Caelum Protocol\",\n    projectId: wcProjectId,\n    chains: [\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_3__.base,\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_3__.polygon,\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_3__.mainnet\n    ],\n    ssr: true\n});\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_2__.WagmiProvider, {\n        config: config,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {\n            client: queryClient,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__.RainbowKitProvider, {\n                theme: (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_4__.darkTheme)({\n                    accentColor: \"#00FFF0\",\n                    borderRadius: \"medium\"\n                }),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\roweg\\\\Desktop\\\\CaelumBase\\\\caelum-base-buildathon\\\\frontend\\\\pages\\\\_app.tsx\",\n                    lineNumber: 28,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\roweg\\\\Desktop\\\\CaelumBase\\\\caelum-base-buildathon\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 27,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\roweg\\\\Desktop\\\\CaelumBase\\\\caelum-base-buildathon\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 26,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\roweg\\\\Desktop\\\\CaelumBase\\\\caelum-base-buildathon\\\\frontend\\\\pages\\\\_app.tsx\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUVRO0FBQ2dCO0FBQ21DO0FBQzlDO0FBQzhCO0FBRXpFLE1BQU1TLGNBQWNDLGtDQUFxQztBQUN6RCxJQUFJLENBQUNELGFBQWE7SUFDaEIsTUFBTSxJQUFJSSxNQUFNO0FBQ2xCO0FBRUEsTUFBTUMsU0FBU1Ysd0VBQWdCQSxDQUFDO0lBQzlCVyxTQUFTO0lBQ1RDLFdBQVdQO0lBQ1hRLFFBQVE7UUFBQ2YsOENBQUlBO1FBQUVDLGlEQUFPQTtRQUFFRixpREFBT0E7S0FBQztJQUNoQ2lCLEtBQUs7QUFDUDtBQUVBLE1BQU1DLGNBQWMsSUFBSVosOERBQVdBO0FBRXBCLFNBQVNhLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0UsOERBQUN0QixnREFBYUE7UUFBQ2MsUUFBUUE7a0JBQ3JCLDRFQUFDTixzRUFBbUJBO1lBQUNlLFFBQVFKO3NCQUMzQiw0RUFBQ2Qsc0VBQWtCQTtnQkFBQ21CLE9BQU9sQixpRUFBU0EsQ0FBQztvQkFBRW1CLGFBQWE7b0JBQVdDLGNBQWM7Z0JBQVM7MEJBQ3BGLDRFQUFDTDtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xccm93ZWdcXERlc2t0b3BcXENhZWx1bUJhc2VcXGNhZWx1bS1iYXNlLWJ1aWxkYXRob25cXGZyb250ZW5kXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiQC9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xyXG5pbXBvcnQgeyBXYWdtaVByb3ZpZGVyIH0gZnJvbSBcIndhZ21pXCI7XHJcbmltcG9ydCB7IG1haW5uZXQsIGJhc2UsIHBvbHlnb24gfSBmcm9tIFwid2FnbWkvY2hhaW5zXCI7XHJcbmltcG9ydCB7IGdldERlZmF1bHRDb25maWcsIFJhaW5ib3dLaXRQcm92aWRlciwgZGFya1RoZW1lIH0gZnJvbSBcIkByYWluYm93LW1lL3JhaW5ib3draXRcIjtcclxuaW1wb3J0IFwiQHJhaW5ib3ctbWUvcmFpbmJvd2tpdC9zdHlsZXMuY3NzXCI7XHJcbmltcG9ydCB7IFF1ZXJ5Q2xpZW50LCBRdWVyeUNsaWVudFByb3ZpZGVyIH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xyXG5cclxuY29uc3Qgd2NQcm9qZWN0SWQgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19XQ19QUk9KRUNUX0lEO1xyXG5pZiAoIXdjUHJvamVjdElkKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBORVhUX1BVQkxJQ19XQ19QUk9KRUNUX0lEIGluIC5lbnYubG9jYWxcIik7XHJcbn1cclxuXHJcbmNvbnN0IGNvbmZpZyA9IGdldERlZmF1bHRDb25maWcoe1xyXG4gIGFwcE5hbWU6IFwiQ2FlbHVtIFByb3RvY29sXCIsXHJcbiAgcHJvamVjdElkOiB3Y1Byb2plY3RJZCxcclxuICBjaGFpbnM6IFtiYXNlLCBwb2x5Z29uLCBtYWlubmV0XSxcclxuICBzc3I6IHRydWUsXHJcbn0pO1xyXG5cclxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxXYWdtaVByb3ZpZGVyIGNvbmZpZz17Y29uZmlnfT5cclxuICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XHJcbiAgICAgICAgPFJhaW5ib3dLaXRQcm92aWRlciB0aGVtZT17ZGFya1RoZW1lKHsgYWNjZW50Q29sb3I6IFwiIzAwRkZGMFwiLCBib3JkZXJSYWRpdXM6IFwibWVkaXVtXCIgfSl9PlxyXG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgIDwvUmFpbmJvd0tpdFByb3ZpZGVyPlxyXG4gICAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XHJcbiAgICA8L1dhZ21pUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiV2FnbWlQcm92aWRlciIsIm1haW5uZXQiLCJiYXNlIiwicG9seWdvbiIsImdldERlZmF1bHRDb25maWciLCJSYWluYm93S2l0UHJvdmlkZXIiLCJkYXJrVGhlbWUiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJ3Y1Byb2plY3RJZCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19XQ19QUk9KRUNUX0lEIiwiRXJyb3IiLCJjb25maWciLCJhcHBOYW1lIiwicHJvamVjdElkIiwiY2hhaW5zIiwic3NyIiwicXVlcnlDbGllbnQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjbGllbnQiLCJ0aGVtZSIsImFjY2VudENvbG9yIiwiYm9yZGVyUmFkaXVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@rainbow-me"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();