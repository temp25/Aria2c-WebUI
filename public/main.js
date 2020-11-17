(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\tmp\Angular\Aria2cWebUI\src\main.ts */"zUnb");


/***/ }),

/***/ "0qM2":
/*!**********************************************!*\
  !*** ./src/app/service/aria2-api.service.ts ***!
  \**********************************************/
/*! exports provided: Aria2ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Aria2ApiService", function() { return Aria2ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _base_url_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-url.service */ "ILzr");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");







class Aria2ApiService {
    constructor(baseUrlService, httpClient) {
        this.baseUrlService = baseUrlService;
        this.httpClient = httpClient;
    }
    executeMultiCall(multiCallAria2cRPCRequest) {
        const rpcURL = `${this.baseUrlService.getBaseURL()}${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].RPC_URI}`;
        return this.httpClient.post(rpcURL, multiCallAria2cRPCRequest).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((res) => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])('Error in executing multi-call')));
    }
    getAria2Version() {
        const rpcURL = `${this.baseUrlService.getBaseURL()}${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].RPC_URI}?showOutput=true`;
        const versionRequestBody = {
            method: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ARIA2_VERSION,
            params: [[]]
        };
        return this.httpClient.post(rpcURL, versionRequestBody).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((res) => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])('Error in fetching version')));
    }
    getAria2SessionInfo() {
        const rpcURL = `${this.baseUrlService.getBaseURL()}${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].RPC_URI}?showOutput=true`;
        const sessionInfoRequestBody = {
            method: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ARIA2_SESSION_INFO,
            params: [[]]
        };
        return this.httpClient.post(rpcURL, sessionInfoRequestBody).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((res) => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])('Error in fetching session info')));
    }
}
Aria2ApiService.ɵfac = function Aria2ApiService_Factory(t) { return new (t || Aria2ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_base_url_service__WEBPACK_IMPORTED_MODULE_4__["BaseUrlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"])); };
Aria2ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: Aria2ApiService, factory: Aria2ApiService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Aria2ApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _base_url_service__WEBPACK_IMPORTED_MODULE_4__["BaseUrlService"] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "A5YV":
/*!*************************************!*\
  !*** ./src/app/util/RequestUtil.ts ***!
  \*************************************/
/*! exports provided: buildMultiCallRequest, toDownloadURIArray, isValidURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildMultiCallRequest", function() { return buildMultiCallRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDownloadURIArray", function() { return toDownloadURIArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidURIs", function() { return isValidURIs; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ "AytR");

const URI_SPLIT_REGEX = /\r?\n/;
const ARIA2_SUPPORTED_PROTOCOLS = ['http', 'https', 'ftp', 'sftp']; // TODO: Add more protocols here
const buildMultiCallRequest = (downloadURIs) => {
    return {
        method: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].MULTI_CALL,
        params: [buildMultiCallRequestParams(downloadURIs)]
    };
};
const buildMultiCallRequestParams = (downloadURIs) => {
    const multiCallParams = [];
    downloadURIs.forEach(downloadURI => {
        if (downloadURI !== undefined && downloadURI.trim().length !== 0) {
            multiCallParams.push(buildMultiCallParams(downloadURI.trim()));
        }
        else {
            console.warn('Ignoring empty/blank URI detected in Add URI list');
        }
    });
    return multiCallParams;
};
const buildMultiCallParams = (downloadURI) => {
    return {
        methodName: _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].ADD_URI,
        params: [[downloadURI]]
    };
};
const toDownloadURIArray = (URIs) => {
    return URIs.split(URI_SPLIT_REGEX);
};
/**
 * Checks if all URI in array are valid URI by checking for valid protocol
 *
 * @param downloadURIs String array containing URI to be validated
 */
const isValidURIs = (downloadURIs) => {
    const downloadURIsLength = downloadURIs === null || downloadURIs === void 0 ? void 0 : downloadURIs.length;
    for (let i = 0; i < downloadURIsLength; i++) {
        if (!isStartsWithValidProtocol(downloadURIs[i])) {
            return false;
        }
    }
    return true;
};
/**
 * Checks if the given URI starts with supported protocol
 *
 * @param downloadURI URI to be checked for protocol support
 * return true if starts with valid protocol; false otherwise.
 */
const isStartsWithValidProtocol = (downloadURI) => {
    const protocols = ARIA2_SUPPORTED_PROTOCOLS.length;
    for (let i = 0; i < protocols; i++) {
        const supportedProtocol = ARIA2_SUPPORTED_PROTOCOLS[i];
        if (downloadURI.startsWith(supportedProtocol) || downloadURI.startsWith(supportedProtocol.toUpperCase())) {
            return true;
        }
    }
    return false;
};


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    PANEL_CLASS_G: 'green-snackbar',
    PANEL_CLASS_R: 'red-snackbar',
    RPC_URI: '/aria2cRPC',
    RPC_FEED_URI: '/aria2cRPCFeed',
    ADD_URI: 'aria2.addUri',
    MULTI_CALL: 'system.multicall',
    ARIA2_VERSION: 'aria2.getVersion',
    ARIA2_SESSION_INFO: 'aria2.getSessionInfo',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "D84e":
/*!********************************************************************!*\
  !*** ./src/app/component/download-item/download-item.component.ts ***!
  \********************************************************************/
/*! exports provided: DownloadItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadItemComponent", function() { return DownloadItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_util_FormatUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/util/FormatUtils */ "JBwP");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");









function DownloadItemComponent_a_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "/downloads/", ctx_r0.baseName(ctx_r0.result.files[0] == null ? null : ctx_r0.result.files[0].path), "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function DownloadItemComponent_mat_icon_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_mat_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "pause");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_mat_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_mat_icon_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_mat_icon_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DownloadItemComponent_mat_icon_16_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.toggleExpandableSection(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_mat_icon_17_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DownloadItemComponent_mat_icon_17_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.toggleExpandableSection(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DownloadItemComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "reorder");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "cloud_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "get_app");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "folder_open");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "section", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "mat-progress-bar", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r7.result == null ? null : ctx_r7.result.gid, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r7.result == null ? null : ctx_r7.result.status, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r7.formatBytes(ctx_r7.result == null ? null : ctx_r7.result.downloadSpeed), "/s");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r7.formatBytes(ctx_r7.result == null ? null : ctx_r7.result.completedLength), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("matTooltip", "download directory, ", ctx_r7.result == null ? null : ctx_r7.result.dir, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r7.result == null ? null : ctx_r7.result.dir, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r7.formatCompletion(ctx_r7.result == null ? null : ctx_r7.result.completedLength, ctx_r7.result == null ? null : ctx_r7.result.totalLength));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r7.formatCompletion(ctx_r7.result == null ? null : ctx_r7.result.completedLength, ctx_r7.result == null ? null : ctx_r7.result.totalLength));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r7.formatCompletion(ctx_r7.result == null ? null : ctx_r7.result.completedLength, ctx_r7.result == null ? null : ctx_r7.result.totalLength), "%");
} }
function DownloadItemComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "arrow_circle_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "query_builder");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "cloud_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "arrow_circle_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "chevron_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "section", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "mat-progress-bar", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "query_builder");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "cloud_download");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "move_to_inbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "arrow_circle_down");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "\u00A0\u00A0\u00A0\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "link");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "reorder");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "# of ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "extension");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "extension");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "folder_open");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.getStatusIcon(ctx_r8.result == null ? null : ctx_r8.result.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.result == null ? null : ctx_r8.result.status, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.downloadSpeed), "/s");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatSeconds(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength, ctx_r8.result == null ? null : ctx_r8.result.downloadSpeed), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.totalLength), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.completedLength), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatCompletion(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r8.formatCompletion(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r8.formatCompletion(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r8.formatCompletion(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatSeconds(ctx_r8.result == null ? null : ctx_r8.result.completedLength, ctx_r8.result == null ? null : ctx_r8.result.totalLength, ctx_r8.result == null ? null : ctx_r8.result.downloadSpeed), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.totalLength), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.completedLength), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.formatBytes(ctx_r8.result == null ? null : ctx_r8.result.downloadSpeed), "/s");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0", ctx_r8.result == null ? null : ctx_r8.result.connections, "\u00A0\u00A0\u00A0\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.result == null ? null : ctx_r8.result.gid, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.result == null ? null : ctx_r8.result.numPieces, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0Length ", ctx_r8.result == null ? null : ctx_r8.result.pieceLength, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("matTooltip", "download directory, ", ctx_r8.result == null ? null : ctx_r8.result.dir, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", ctx_r8.result == null ? null : ctx_r8.result.dir, "");
} }
class DownloadItemComponent {
    constructor() {
        this.isExpanded = false;
    }
    ngOnInit() {
    }
    toggleExpandableSection() {
        this.isExpanded = !this.isExpanded;
    }
    baseName(path) {
        return Object(src_app_util_FormatUtils__WEBPACK_IMPORTED_MODULE_1__["baseName"])(path);
    }
    formatBytes(bytes, decimals = 2) {
        const formattedBytes = Object(src_app_util_FormatUtils__WEBPACK_IMPORTED_MODULE_1__["formatBytes"])(bytes, decimals);
        if (formattedBytes.indexOf('undefined') !== -1 || formattedBytes.indexOf('NaN') !== -1) {
            return '0 B';
        }
        return formattedBytes;
    }
    formatCompletion(completedLength, totalLength, isRemaining = false) {
        return this.toNumber(Object(src_app_util_FormatUtils__WEBPACK_IMPORTED_MODULE_1__["formatCompletion"])(completedLength, totalLength, isRemaining));
    }
    formatSeconds(completedLength, totalLength, downloadSpeed) {
        return Object(src_app_util_FormatUtils__WEBPACK_IMPORTED_MODULE_1__["formatSeconds"])(completedLength, totalLength, downloadSpeed);
    }
    getStatusIcon(status) {
        switch (status) {
            case 'active': return 'play_circle_outline';
            case 'waiting': return 'av_timer';
            case 'paused': return 'pause_circle_outline';
            case 'error': return 'error_outline';
            case 'complete': return 'check_circle_outline';
            case 'removed': return 'remove_circle_outline';
        }
    }
    toNumber(str) {
        return parseFloat(str);
    }
}
DownloadItemComponent.ɵfac = function DownloadItemComponent_Factory(t) { return new (t || DownloadItemComponent)(); };
DownloadItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DownloadItemComponent, selectors: [["app-download-item"]], inputs: { result: "result" }, decls: 21, vars: 10, consts: [[1, "downloadItemContainer"], ["class", "infoIcon downloadBtn", "mat-raised-button", "", "color", "primary", "download", "", "matTooltip", "Click to download file", 3, "href", 4, "ngIf"], [1, "filler"], ["class", "dControlBorder", "matTooltip", "Start", 4, "ngIf"], ["class", "dControlBorder", "matTooltip", "Pause", 4, "ngIf"], ["class", "dControlBorder", "matTooltip", "Stop", 4, "ngIf"], ["class", "dControlBorder", "matTooltip", "Restart", 4, "ngIf"], ["matTooltip", "Settings", 1, "dControlBorder"], ["class", "dControlBorder", "matTooltip", "Collapse", 3, "click", 4, "ngIf"], ["class", "dControlBorder", "matTooltip", "Expand", 3, "click", 4, "ngIf"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", "download", "", "matTooltip", "Click to download file", 1, "infoIcon", "downloadBtn", 3, "href"], ["matTooltip", "Start", 1, "dControlBorder"], ["matTooltip", "Pause", 1, "dControlBorder"], ["matTooltip", "Stop", 1, "dControlBorder"], ["matTooltip", "Restart", 1, "dControlBorder"], ["matTooltip", "Collapse", 1, "dControlBorder", 3, "click"], ["matTooltip", "Expand", 1, "dControlBorder", 3, "click"], ["id", "infoContainer1"], ["mat-flat-button", "", "color", "accent", "matTooltip", "id of the download item", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", "matTooltip", "status of download", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", "matTooltip", "download speed", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", "matTooltip", "downloaded size", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", 1, "infoIcon", "truncateText", 3, "matTooltip"], [1, "progressContainer1"], [1, "dSection"], ["mode", "determinate", 3, "value", "matTooltip"], [1, "dSectionText"], ["id", "infoContainer2"], ["mat-flat-button", "", "color", "accent", "matTooltip", "eta to complete", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", "matTooltip", "total size", 1, "infoIcon"], ["mat-flat-button", "", "color", "accent", "matTooltip", "completion percent", 1, "infoIcon"], ["id", "infoContainer3"], ["id", "infoSubContainer31"], ["mat-flat-button", "", "color", "accent", "matTooltip", "eta to complete", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "total size", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "downloaded size", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "download speed", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "connections", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "id of the download item", 1, "infoIcon", "infoGrey"], ["id", "infoSubContainer32"], ["mat-flat-button", "", "color", "accent", "matTooltip", "pieces", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", "matTooltip", "piece length", 1, "infoIcon", "infoGrey"], ["mat-flat-button", "", "color", "accent", 1, "infoIcon", "infoGrey", "truncateText", 3, "matTooltip"]], template: function DownloadItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u00A0\u00A0\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, DownloadItemComponent_a_7_Template, 2, 1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, DownloadItemComponent_mat_icon_10_Template, 2, 0, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DownloadItemComponent_mat_icon_11_Template, 2, 0, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, DownloadItemComponent_mat_icon_12_Template, 2, 0, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, DownloadItemComponent_mat_icon_13_Template, 2, 0, "mat-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, DownloadItemComponent_mat_icon_16_Template, 2, 0, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, DownloadItemComponent_mat_icon_17_Template, 2, 0, "mat-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, DownloadItemComponent_div_19_Template, 28, 9, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, DownloadItemComponent_div_20_Template, 73, 20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.baseName(ctx.result.files[0] == null ? null : ctx.result.files[0].path));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.result == null ? null : ctx.result.status) === "complete");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.result.status === "paused");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.result.status === "active");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.result.status === "active");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.result.status === "error");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isExpanded);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardTitleGroup"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MatTooltip"], _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardContent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatAnchor"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__["MatProgressBar"]], styles: [".filler[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.dControlBorder[_ngcontent-%COMP%] {\n  border: 1px solid grey;\n  cursor: pointer;\n}\n\n.downloadItemContainer[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  width: 100%;\n}\n\n.mat-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.mat-progress-bar[_ngcontent-%COMP%] {\n  height: 20px;\n  width: 80%;\n}\n\n.infoIcon[_ngcontent-%COMP%] {\n  margin-right: 5px;\n  \n  font-size: 14px;\n  line-height: 22px;\n  height: auto;\n  min-width: 30px;\n  width: auto;\n}\n\n.infoGrey[_ngcontent-%COMP%] {\n  background-color: grey;\n}\n\n#infoContainer1[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.progressContainer1[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\n#infoSubContainer32[_ngcontent-%COMP%] {\n  margin-top: 5px;\n}\n\n.downloadBtn[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.dSection[_ngcontent-%COMP%] {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px;\n}\n\n.dSectionText[_ngcontent-%COMP%] {\n  position: absolute;\n  color: white;\n  width: 80%;\n  padding: 10px;\n  text-align: center;\n}\n\n.truncateText[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2Rvd25sb2FkLWl0ZW0vZG93bmxvYWQtaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLHNCQUFBO0VBQ0EsZUFBQTtBQUFGOztBQUdBO0VBQ0UsbUJBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsVUFBQTtBQUFGOztBQUdBO0VBQ0UsaUJBQUE7RUFDQTtnQkFBQTtFQUVBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0Usc0JBQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7QUFBRjs7QUFHQTtFQUNFLG1CQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFBRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kb3dubG9hZC1pdGVtL2Rvd25sb2FkLWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmZpbGxlciB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbn1cclxuXHJcbi5kQ29udHJvbEJvcmRlciB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kb3dubG9hZEl0ZW1Db250YWluZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtY2FyZCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtcHJvZ3Jlc3MtYmFyIHtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgd2lkdGg6IDgwJTtcclxufVxyXG5cclxuLmluZm9JY29uIHtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICAvKmJhY2tncm91bmQ6ICM0Mjg1RjQ7XHJcbiAgY29sb3I6IHdoaXRlOyovXHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xyXG4gIGhlaWdodDogYXV0bztcclxuICBtaW4td2lkdGg6IDMwcHg7XHJcbiAgd2lkdGg6IGF1dG87XHJcbn1cclxuXHJcbi5pbmZvR3JleSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuI2luZm9Db250YWluZXIxIHtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5wcm9ncmVzc0NvbnRhaW5lcjEge1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbiNpbmZvU3ViQ29udGFpbmVyMzIge1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG5cclxuLmRvd25sb2FkQnRuIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uZFNlY3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4uZFNlY3Rpb25UZXh0IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50cnVuY2F0ZVRleHQge1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DownloadItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-download-item',
                templateUrl: './download-item.component.html',
                styleUrls: ['./download-item.component.scss']
            }]
    }], function () { return []; }, { result: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "EDHd":
/*!*****************************************************!*\
  !*** ./src/app/dialog/add-uri/add-uri.component.ts ***!
  \*****************************************************/
/*! exports provided: AddUriComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUriComponent", function() { return AddUriComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _util_URIValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/URIValidation */ "EO0m");
/* harmony import */ var _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/aria2-api.service */ "0qM2");
/* harmony import */ var _service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/snackbar.service */ "nxnM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");









class AddUriComponent extends _util_URIValidation__WEBPACK_IMPORTED_MODULE_1__["URIValidation"] {
    constructor(aria2ApiService, snackbarService, matDialogRef) {
        super(aria2ApiService, snackbarService);
        this.aria2ApiService = aria2ApiService;
        this.snackbarService = snackbarService;
        this.matDialogRef = matDialogRef;
        this.uris = '';
    }
    ngOnInit() {
    }
    addUri() {
        if (this.uris === undefined || this.uris.trim().length === 0) {
            this.snackbarService.showErrorSnackbar('Error occurred in reading text file');
            return;
        }
        this.makeAddURIRequest(this.uris);
        this.matDialogRef.close();
    }
    closeDialog() {
        this.matDialogRef.close();
    }
}
AddUriComponent.ɵfac = function AddUriComponent_Factory(t) { return new (t || AddUriComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__["Aria2ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__["SnackbarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"])); };
AddUriComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AddUriComponent, selectors: [["app-add-uri"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 3, consts: [[1, "addURIDialogContainer"], ["mat-dialog-title", "", "align", "center"], ["matInput", "", "rows", "12", "cols", "100", "placeholder", "Enter URIs here. One per line", 1, "uriTextArea", 3, "ngModel", "cols", "ngModelChange"], ["align", "center"], ["color", "accent", "mat-raised-button", "", 3, "click"], ["color", "accent", "mat-raised-button", "", 3, "disabled", "click"]], template: function AddUriComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Add URI");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "textarea", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AddUriComponent_Template_textarea_ngModelChange_4_listener($event) { return ctx.uris = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-dialog-actions", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AddUriComponent_Template_button_click_6_listener() { return ctx.closeDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AddUriComponent_Template_button_click_8_listener() { return ctx.addUri(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.uris)("cols", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.uris.length === 0);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogContent"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"]], styles: [".addURIDialogContainer[_ngcontent-%COMP%] {\n  width: 800px;\n  height: 300px;\n}\n\n.uriTextArea[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9nL2FkZC11cmkvYWRkLXVyaS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsY0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9nL2FkZC11cmkvYWRkLXVyaS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGRVUklEaWFsb2dDb250YWluZXIge1xyXG4gIHdpZHRoOiA4MDBweDtcclxuICBoZWlnaHQ6IDMwMHB4O1xyXG59XHJcblxyXG4udXJpVGV4dEFyZWEge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AddUriComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-add-uri',
                templateUrl: './add-uri.component.html',
                styleUrls: ['./add-uri.component.scss']
            }]
    }], function () { return [{ type: _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__["Aria2ApiService"] }, { type: _service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__["SnackbarService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }]; }, null); })();


/***/ }),

/***/ "EO0m":
/*!***************************************!*\
  !*** ./src/app/util/URIValidation.ts ***!
  \***************************************/
/*! exports provided: URIValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URIValidation", function() { return URIValidation; });
/* harmony import */ var _RequestUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestUtil */ "A5YV");

class URIValidation {
    constructor(aria2ApiService, snackbarService) {
        this.apiService = aria2ApiService;
        this.alertService = snackbarService;
    }
    makeAddURIRequest(dURIs) {
        const downloadURIs = Object(_RequestUtil__WEBPACK_IMPORTED_MODULE_0__["toDownloadURIArray"])(dURIs);
        if (Object(_RequestUtil__WEBPACK_IMPORTED_MODULE_0__["isValidURIs"])(downloadURIs)) {
            this.apiService.executeMultiCall(Object(_RequestUtil__WEBPACK_IMPORTED_MODULE_0__["buildMultiCallRequest"])(downloadURIs)).subscribe(_ => {
                this.alertService.showSuccessSnackbar('URIs added successfully');
            }, err => {
                this.alertService.showErrorSnackbar('Error in executing multi-call add URI request');
                console.error(err);
            });
        }
        else {
            this.alertService.showErrorSnackbar('Error occurred in parsing the download URI');
        }
    }
}


/***/ }),

/***/ "Ey3b":
/*!*************************************************************!*\
  !*** ./src/app/dialog/upload-file/upload-file.component.ts ***!
  \*************************************************************/
/*! exports provided: UploadFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFileComponent", function() { return UploadFileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _util_URIValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/URIValidation */ "EO0m");
/* harmony import */ var _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/aria2-api.service */ "0qM2");
/* harmony import */ var _service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/snackbar.service */ "nxnM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");












function UploadFileComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadFileComponent_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5); return _r0.click(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Choose file");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function UploadFileComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadFileComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.uploadFile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Upload file");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class UploadFileComponent extends _util_URIValidation__WEBPACK_IMPORTED_MODULE_1__["URIValidation"] {
    constructor(aria2ApiService, snackbarService, matDialogRef) {
        super(aria2ApiService, snackbarService);
        this.aria2ApiService = aria2ApiService;
        this.snackbarService = snackbarService;
        this.matDialogRef = matDialogRef;
        this.selectedFileName = 'Choose file';
    }
    ngOnInit() {
    }
    fileUploadChangeEvent(event) {
        var _a;
        const fileInput = event.target;
        if (fileInput.files !== undefined && fileInput.files.length > 0) {
            this.fileList = fileInput.files;
            this.selectedFileName = (_a = this.fileList.item(0)) === null || _a === void 0 ? void 0 : _a.name;
        }
    }
    uploadFile() {
        var _a, _b;
        if (((_a = this.fileList) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            //TODO: Handle multiple file pick
            const fileReader = new FileReader();
            const file = (_b = this.fileList) === null || _b === void 0 ? void 0 : _b.item(0);
            this.selectedFileName = file === null || file === void 0 ? void 0 : file.name;
            fileReader.onload = e => {
                const URIs = e.target.result;
                this.makeAddURIRequest(URIs);
            };
            fileReader.onerror = e => {
                this.snackbarService.showErrorSnackbar('Error occurred in reading text file');
                console.error(e);
            };
            fileReader.readAsText(file, 'UTF-8');
            this.matDialogRef.close();
        }
    }
    closeDialog() {
        this.matDialogRef.close();
    }
}
UploadFileComponent.ɵfac = function UploadFileComponent_Factory(t) { return new (t || UploadFileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__["Aria2ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__["SnackbarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"])); };
UploadFileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UploadFileComponent, selectors: [["app-upload-file"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 14, vars: 3, consts: [[1, "uploadFileContainer"], ["mat-dialog-title", "", "align", "center"], ["id", "uploadFile", "type", "file", "accept", "text/plain", 2, "display", "none", 3, "change"], ["fileUpload", ""], ["matInput", "", "disabled", "", 3, "value"], ["mat-raised-button", "", "color", "primary", "matTooltip", "Click to open file upload dialog", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", "matTooltip", "Click to upload file", 3, "click", 4, "ngIf"], ["align", "center"], ["color", "accent", "mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", "matTooltip", "Click to open file upload dialog", 3, "click"], ["mat-raised-button", "", "color", "primary", "matTooltip", "Click to upload file", 3, "click"]], template: function UploadFileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Add URI");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function UploadFileComponent_Template_input_change_4_listener($event) { return ctx.fileUploadChangeEvent($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, UploadFileComponent_button_9_Template, 2, 0, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, UploadFileComponent_button_10_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-dialog-actions", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadFileComponent_Template_button_click_12_listener() { return ctx.closeDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx.selectedFileName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.fileList == null ? null : ctx.fileList.length) <= 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.fileList == null ? null : ctx.fileList.length) > 0);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__["MatTooltip"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZy91cGxvYWQtZmlsZS91cGxvYWQtZmlsZS5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadFileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-upload-file',
                templateUrl: './upload-file.component.html',
                styleUrls: ['./upload-file.component.scss']
            }]
    }], function () { return [{ type: _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_2__["Aria2ApiService"] }, { type: _service_snackbar_service__WEBPACK_IMPORTED_MODULE_3__["SnackbarService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }]; }, null); })();


/***/ }),

/***/ "Fyjg":
/*!***************************************************!*\
  !*** ./src/app/service/aria2-rpc-feed.service.ts ***!
  \***************************************************/
/*! exports provided: Aria2RpcFeedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Aria2RpcFeedService", function() { return Aria2RpcFeedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "gFX4");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base_url_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-url.service */ "ILzr");






// import { Socket } from 'ngx-socket-io';
class Aria2RpcFeedService {
    constructor(ngZone, baseUrlService) {
        this.ngZone = ngZone;
        this.baseUrlService = baseUrlService;
        /**
         * Returns the feed observable object
         *
         */
        this.getFeedObservable = () => this.observable;
        /**
         * Returns the event-source for RPC feed URI
         *
         */
        this.getEventSource = () => new EventSource(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].RPC_FEED_URI);
        this.getRPCFeedObservable = () => this.rpcObservable;
        if (this.rpcObservable === undefined) {
            this.rpcObservable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((observer) => {
                const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_3__('http://localhost:3000');
                socket.on('connect', (message) => {
                    console.log('Connected to server successfully');
                    console.debug(message);
                    socket.on('testPong', (pongMessage) => {
                        console.debug(pongMessage);
                        setTimeout(() => {
                            this.emitPingMessage(socket);
                        }, 3000);
                    });
                    socket.on('rpc-message', (rpcMessage) => {
                        this.ngZone.run(() => {
                            console.log(rpcMessage);
                            observer.next(rpcMessage);
                        });
                    });
                    this.emitPingMessage(socket);
                });
                socket.on('disconnect', () => {
                    console.error('dis-connected from server. Refresh to reconnect');
                });
            });
            console.debug('RPC Feed observable is initialized');
        }
        else {
            console.debug('RPC Feed observable is already initialized');
        }
        /* if(this.observable === undefined) {
          this.observable = new Observable((observer: Observer<MessageEvent>) => {
    
            const eventSource = this.getEventSource();
    
            eventSource.onmessage = event => {
              this.ngZone.run(() => {
                observer.next(event);
              });
            };
    
            eventSource.onerror = error => {
              this.ngZone.run(() => {
                console.error('Error in feed observable');
                console.error(error);
                observer.error(error);
              });
            }
          });
    
          console.debug('RPC Feed observable is initialized');
        } else {
          console.debug('RPC Feed observable is already initialized');
        } */
    }
    emitPingMessage(socket) {
        socket.emit('testPing', {
            type: 'keep-alive',
            message: 'ping',
            timestamp: new Date().toISOString()
        });
    }
}
Aria2RpcFeedService.ɵfac = function Aria2RpcFeedService_Factory(t) { return new (t || Aria2RpcFeedService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_base_url_service__WEBPACK_IMPORTED_MODULE_4__["BaseUrlService"])); };
Aria2RpcFeedService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: Aria2RpcFeedService, factory: Aria2RpcFeedService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Aria2RpcFeedService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _base_url_service__WEBPACK_IMPORTED_MODULE_4__["BaseUrlService"] }]; }, null); })();


/***/ }),

/***/ "ILzr":
/*!*********************************************!*\
  !*** ./src/app/service/base-url.service.ts ***!
  \*********************************************/
/*! exports provided: BaseUrlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUrlService", function() { return BaseUrlService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");



class BaseUrlService {
    constructor(window) {
        this.window = window;
    }
    getBaseURL() {
        const protocol = this.window.location.protocol.replace(':', '');
        const hostName = this.window.location.hostname;
        const port = this.window.location.port;
        return `${protocol}://${hostName}:${port}`;
    }
}
BaseUrlService.ɵfac = function BaseUrlService_Factory(t) { return new (t || BaseUrlService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](Window)); };
BaseUrlService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BaseUrlService, factory: BaseUrlService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseUrlService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: Window, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [Window]
            }] }]; }, null); })();


/***/ }),

/***/ "JBwP":
/*!*************************************!*\
  !*** ./src/app/util/FormatUtils.ts ***!
  \*************************************/
/*! exports provided: formatBytes, formatCompletion, formatSeconds, baseName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatBytes", function() { return formatBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatCompletion", function() { return formatCompletion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSeconds", function() { return formatSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseName", function() { return baseName; });
// Utility class to format download info
/**
 * Returns the format of the file length in required units
 *
 * @param bytes Length of the file in bytes
 * @param decimals Decimal places holder for output
 */
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0 || bytes === undefined) {
        return '0 B';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
/**
 * Returns the completion percentage w.r.t two decimals
 *
 * @param completedLength Length of the file contents downloaded (in bytes)
 * @param totalLength Total length of the file contents (in bytes)
 * @param isRemaining Boolean to mention whether to give the remaining percentage of completion
 */
const formatCompletion = (completedLength, totalLength, isRemaining = false) => {
    const cLength = toNumber(completedLength);
    const tLength = toNumber(totalLength);
    if (tLength === undefined || tLength === 0) {
        return '0.00';
    }
    const difference = isRemaining ? (tLength - cLength) : cLength;
    const completion = difference / tLength;
    return (completion * 100).toFixed(2);
};
const toNumber = (str) => parseFloat(str);
/**
 * Returns the string containing ETA to complete in format HH:mm:ss
 *
 * @param completedLength Length of the file contents downloaded (in bytes)
 * @param totalLength Total length of the file contents (in bytes)
 * @param downloadSpeed Download speed of the file contents (in bytes/second)
 */
const formatSeconds = (completedLength, totalLength, downloadSpeed) => {
    const dSpeed = toNumber(downloadSpeed) === 0 ? 1 : toNumber(downloadSpeed);
    const completion = (toNumber(totalLength) - toNumber(completedLength)) / dSpeed;
    return new Date(parseFloat((completion * 1000).toFixed(2))).toISOString().substr(11, 8);
};
/**
 * Returns the filename with extension
 *
 * @param path Absolute path of the downloaded file
 */
const baseName = (path) => {
    const lastIndex = path.lastIndexOf('/');
    return (lastIndex !== -1) ? path.substring(lastIndex + 1) : path;
};


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_aria2_rpc_feed_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service/aria2-rpc-feed.service */ "Fyjg");
/* harmony import */ var _component_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/toolbar/toolbar.component */ "l6ma");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _component_download_item_download_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/download-item/download-item.component */ "D84e");











function AppComponent_li_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-checkbox", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_li_11_Template_mat_checkbox_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const filter_r2 = ctx.$implicit; return filter_r2.isChecked = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const filter_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", filter_r2.isChecked);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](filter_r2.shortName);
} }
function AppComponent_app_download_item_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-download-item", 10);
} if (rf & 2) {
    const result_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("result", result_r5);
} }
class AppComponent {
    constructor(rpcFeedService) {
        this.rpcFeedService = rpcFeedService;
        this.appTitle = 'Aria2cWebUI';
        this.dFilter = [];
        this.results = [];
        /* this.rpcFeedSubscription = this.rpcFeedService.getFeedObservable().subscribe(rpcMessageEvent => {
          if (rpcMessageEvent !== undefined && rpcMessageEvent.data !== undefined) {
            if ((rpcMessageEvent.data.indexOf('system.multicall') !== -1) &&
              (rpcMessageEvent.data.indexOf('result') !== -1)) { // Download status is returned
              const status = JSON.parse(rpcMessageEvent.data) as Status;
              this.updateDownloadResults(status);
            }
          }
        }); */
        this.rpcFeedSubscription = this.rpcFeedService.getRPCFeedObservable().subscribe(rpcMessage => {
            if (rpcMessage !== undefined) {
                console.log('rpcMessage');
                console.log(rpcMessage);
                console.log('rpcMessage.indexOf(\'system.multicall\'): ' + rpcMessage.indexOf('system.multicall'));
                console.log('rpcMessage.indexOf(\'result\') !== -1 : ' + rpcMessage.indexOf('result'));
                console.log('\n\n');
                if ((rpcMessage.indexOf('system.multicall') !== -1) &&
                    (rpcMessage.indexOf('result') !== -1)) { // Download status is returned
                    const status = JSON.parse(rpcMessage);
                    this.updateDownloadResults(status);
                }
            }
        });
        this.initializeDFilter();
    }
    initializeDFilter() {
        this.dFilter.push({ filterName: 'running', shortName: 'Running', isChecked: true });
        this.dFilter.push({ filterName: 'active', shortName: 'Active', isChecked: true });
        this.dFilter.push({ filterName: 'waiting', shortName: 'Waiting', isChecked: true });
        this.dFilter.push({ filterName: 'complete', shortName: 'Complete', isChecked: true });
        this.dFilter.push({ filterName: 'error', shortName: 'Error', isChecked: true });
        this.dFilter.push({ filterName: 'paused', shortName: 'Paused', isChecked: true });
        this.dFilter.push({ filterName: 'removed', shortName: 'Removed', isChecked: true });
        this.dFilter.push({ filterName: 'hideLinkedMetadata', shortName: 'Hide linked meta-data', isChecked: true });
    }
    trackByGID(index, item) {
        return item.gid;
    }
    filterAndSortByGID(unsortedResults) {
        if (unsortedResults !== undefined) {
            return unsortedResults
                .filter(filter => this.getFilters().indexOf(filter === null || filter === void 0 ? void 0 : filter.status) !== -1)
                .sort((result1, result2) => result1.gid > result2.gid ? -1 : 1);
        }
        return [];
    }
    /**
     * Cleanup or release the resources on exiting
     */
    ngOnDestroy() {
        // Unsubscribe from feed
        this.rpcFeedSubscription.unsubscribe();
    }
    updateDownloadResults(status) {
        if (status.statusCode === 200) {
            if (status.result !== undefined) {
                this.results = [].concat.apply([], status.result);
            }
        }
        else {
            console.error(status.error);
        }
    }
    resetFilter() {
        this.dFilter.forEach(filter => filter.isChecked = true);
    }
    toggleFilter() {
        this.dFilter.forEach(filter => filter.isChecked = !filter.isChecked);
    }
    getFilters() {
        return this.dFilter.filter(filter => filter.isChecked).map(filter => filter.filterName);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_aria2_rpc_feed_service__WEBPACK_IMPORTED_MODULE_1__["Aria2RpcFeedService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 22, vars: 6, consts: [[3, "title"], [1, "mainContainer"], [1, "downloadToolsCard"], ["align", "center", 1, "small", "font-weight-normal"], [1, "dFilter"], [4, "ngFor", "ngForOf"], ["mat-raised-button", "", 3, "click"], [1, "downloadsView"], [3, "result", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "ngModel", "ngModelChange"], [3, "result"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Download Filters\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "filter_alt");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AppComponent_li_11_Template, 3, 2, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_13_listener() { return ctx.toggleFilter(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Toggle Filter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "\u00A0\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_16_listener() { return ctx.resetFilter(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Reset Filter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, AppComponent_app_download_item_21_Template, 1, 1, "app-download-item", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx.appTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dFilter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("Displaying ", ctx.filterAndSortByGID(ctx.results).length, " of ", ctx.results == null ? null : ctx.results.length, " downloads");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.filterAndSortByGID(ctx.results))("ngForTrackBy", ctx.trackByGID);
    } }, directives: [_component_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_2__["ToolbarComponent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _component_download_item_download_item_component__WEBPACK_IMPORTED_MODULE_9__["DownloadItemComponent"]], styles: [".mainContainer[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-top: 10px;\n  height: auto;\n  display: block;\n}\n\n.downloadToolsCard[_ngcontent-%COMP%] {\n  width: 300px;\n  height: auto;\n  float: left;\n}\n\nul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\n.filler[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.downloadsView[_ngcontent-%COMP%] {\n  height: 100px;\n  \n  width: 70%;\n  float: left;\n  margin-left: 20px;\n}\n\n.dFilter[_ngcontent-%COMP%] {\n  display: inline-flex;\n  vertical-align: bottom;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EscUJBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLG9CQUFBO0VBQ0Esc0JBQUE7QUFBRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ubWFpbkNvbnRhaW5lciB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5kb3dubG9hZFRvb2xzQ2FyZCB7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG4gIGhlaWdodDogYXV0bztcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG5cclxudWwge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxufVxyXG5cclxuLmZpbGxlciB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbn1cclxuXHJcbi5kb3dubG9hZHNWaWV3IHtcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIC8qd2lkdGg6IDcyMHB4OyovXHJcbiAgd2lkdGg6IDcwJTtcclxuICBmbG9hdDogbGVmdDtcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG5cclxuLmRGaWx0ZXIge1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _service_aria2_rpc_feed_service__WEBPACK_IMPORTED_MODULE_1__["Aria2RpcFeedService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-socket-io */ "7JkF");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _pipe_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pipe/sanitize-html.pipe */ "o4GV");
/* harmony import */ var _dialog_add_uri_add_uri_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dialog/add-uri/add-uri.component */ "EDHd");
/* harmony import */ var _dialog_info_info_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./dialog/info/info.component */ "rso4");
/* harmony import */ var _dialog_upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./dialog/upload-file/upload-file.component */ "Ey3b");
/* harmony import */ var _component_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./component/toolbar/toolbar.component */ "l6ma");
/* harmony import */ var _component_download_item_download_item_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./component/download-item/download-item.component */ "D84e");


























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        { provide: Window, useValue: window }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_17__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__["MatProgressBarModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__["SocketIoModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"],
        _pipe_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_19__["SanitizeHtmlPipe"],
        _dialog_add_uri_add_uri_component__WEBPACK_IMPORTED_MODULE_20__["AddUriComponent"],
        _dialog_info_info_component__WEBPACK_IMPORTED_MODULE_21__["InfoComponent"],
        _dialog_upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_22__["UploadFileComponent"],
        _component_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ToolbarComponent"],
        _component_download_item_download_item_component__WEBPACK_IMPORTED_MODULE_24__["DownloadItemComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_17__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__["MatProgressBarModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
        ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__["SocketIoModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"],
                    _pipe_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_19__["SanitizeHtmlPipe"],
                    _dialog_add_uri_add_uri_component__WEBPACK_IMPORTED_MODULE_20__["AddUriComponent"],
                    _dialog_info_info_component__WEBPACK_IMPORTED_MODULE_21__["InfoComponent"],
                    _dialog_upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_22__["UploadFileComponent"],
                    _component_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_23__["ToolbarComponent"],
                    _component_download_item_download_item_component__WEBPACK_IMPORTED_MODULE_24__["DownloadItemComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_17__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
                    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__["MatProgressBarModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
                    ngx_socket_io__WEBPACK_IMPORTED_MODULE_16__["SocketIoModule"]
                ],
                providers: [
                    { provide: Window, useValue: window }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "l6ma":
/*!********************************************************!*\
  !*** ./src/app/component/toolbar/toolbar.component.ts ***!
  \********************************************************/
/*! exports provided: ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _dialog_add_uri_add_uri_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dialog/add-uri/add-uri.component */ "EDHd");
/* harmony import */ var _dialog_info_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dialog/info/info.component */ "rso4");
/* harmony import */ var _dialog_upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dialog/upload-file/upload-file.component */ "Ey3b");
/* harmony import */ var _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/aria2-api.service */ "0qM2");
/* harmony import */ var _service_snackbar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/snackbar.service */ "nxnM");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");













class ToolbarComponent {
    constructor(matDialog, aria2ApiService, snackbarService) {
        this.matDialog = matDialog;
        this.aria2ApiService = aria2ApiService;
        this.snackbarService = snackbarService;
    }
    ngOnInit() {
    }
    openAddURIDialog() {
        const addUriDialogRef = this.matDialog.open(_dialog_add_uri_add_uri_component__WEBPACK_IMPORTED_MODULE_2__["AddUriComponent"], this.getMatDialogConfig());
        addUriDialogRef.afterClosed().subscribe(val => {
            console.debug('Add URI dialog closed');
        });
    }
    openAddURIViaFileDialog() {
        const addUriDialogRef = this.matDialog.open(_dialog_upload_file_upload_file_component__WEBPACK_IMPORTED_MODULE_4__["UploadFileComponent"], this.getMatDialogConfig());
        addUriDialogRef.afterClosed().subscribe(val => {
            console.debug('Add URI via file dialog closed');
        });
    }
    openSessionInfoDialog() {
        this.aria2ApiService.getAria2SessionInfo().subscribe(res => {
            if (res.statusCode === 200) {
                const sessionId = res.result.sessionId;
                const matDialogConfig = this.getMatDialogConfig();
                matDialogConfig.disableClose = false;
                matDialogConfig.data = {
                    content: `<br><strong>Session Id</strong>: ${sessionId}</br>`,
                    title: 'Session information'
                };
                this.showInfoDialog(matDialogConfig);
            }
            else {
                this.raiseError(res.error, 'Error in fetching aria2 session info');
            }
        }, err => {
            this.raiseError(err, 'Error in fetching aria2 session info');
        });
    }
    openAria2AboutDialog() {
        this.aria2ApiService.getAria2Version().subscribe(res => {
            if (res.statusCode === 200) {
                const aria2VersionAndFeatures = res.result;
                let featureList = '';
                featureList += '<ol>';
                aria2VersionAndFeatures.enabledFeatures.forEach(feature => featureList += `<li>${feature}</li>`);
                featureList += '</ol>';
                const matDialogConfig = this.getMatDialogConfig();
                matDialogConfig.disableClose = false;
                matDialogConfig.data = {
                    content: `<br><strong>Aria2 version</strong>: ${aria2VersionAndFeatures.version}</br><br/><br/><strong>Supported features</strong>:<br/>${featureList}`,
                    title: 'About Aria2'
                };
                this.showInfoDialog(matDialogConfig);
            }
            else {
                this.raiseError(res.error, 'Error in fetching aria2 session info');
            }
        }, err => {
            this.raiseError(err, 'Error in fetching aria2 version info');
        });
    }
    showInfoDialog(matDialogConfig) {
        const infoDialogRef = this.matDialog.open(_dialog_info_info_component__WEBPACK_IMPORTED_MODULE_3__["InfoComponent"], matDialogConfig);
        infoDialogRef.afterClosed().subscribe(val => {
            console.debug('Info dialog closed');
        });
    }
    raiseError(err, msg) {
        this.snackbarService.showErrorSnackbar(msg);
        if (err != null) {
            console.error(err);
        }
    }
    getMatDialogConfig() {
        const matDialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogConfig"]();
        matDialogConfig.hasBackdrop = true;
        matDialogConfig.autoFocus = true;
        matDialogConfig.disableClose = true;
        return matDialogConfig;
    }
}
ToolbarComponent.ɵfac = function ToolbarComponent_Factory(t) { return new (t || ToolbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_aria2_api_service__WEBPACK_IMPORTED_MODULE_5__["Aria2ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_service_snackbar_service__WEBPACK_IMPORTED_MODULE_6__["SnackbarService"])); };
ToolbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ToolbarComponent, selectors: [["app-toolbar"]], inputs: { title: "title" }, decls: 27, vars: 3, consts: [["color", "primary"], ["mat-button", "", 3, "matMenuTriggerFor"], ["yPosition", "below"], ["addMenu", "matMenu"], ["mat-menu-item", "", 3, "click"], ["miscellaneousMenu", ""], [1, "filler"]], template: function ToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-menu", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_9_listener() { return ctx.openAddURIDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Add URI via UI");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_11_listener() { return ctx.openAddURIViaFileDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Add URI via file");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Miscellaneous");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "arrow_drop_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-menu", 2, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_20_listener() { return ctx.openSessionInfoDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Session info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToolbarComponent_Template_button_click_22_listener() { return ctx.openAria2AboutDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "About aria2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbar"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarRow"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuTrigger"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["_MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuItem"]], styles: [".filler[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L3Rvb2xiYXIvdG9vbGJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsbGVyIHtcclxuICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ToolbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-toolbar',
                templateUrl: './toolbar.component.html',
                styleUrls: ['./toolbar.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }, { type: _service_aria2_api_service__WEBPACK_IMPORTED_MODULE_5__["Aria2ApiService"] }, { type: _service_snackbar_service__WEBPACK_IMPORTED_MODULE_6__["SnackbarService"] }]; }, { title: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "nxnM":
/*!*********************************************!*\
  !*** ./src/app/service/snackbar.service.ts ***!
  \*********************************************/
/*! exports provided: SnackbarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackbarService", function() { return SnackbarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");





class SnackbarService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.horizontalPosition = 'center';
        this.verticalPosition = 'bottom';
        this.snackBarAutoHideDuration = 1500;
        this.defaultPanel = 'glam-snackbar';
    }
    openSnackBar(message, options = {}) {
        this.snackBarConfig = new _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarConfig"]();
        this.snackBarConfig.horizontalPosition = options.horizontalPosition || this.horizontalPosition;
        this.snackBarConfig.verticalPosition = options.verticalPosition || this.verticalPosition;
        this.snackBarConfig.duration = options.duration || this.snackBarAutoHideDuration;
        this.snackBarConfig.panelClass = options.panelClass || this.defaultPanel;
        this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
    }
    showSuccessSnackbar(message) {
        this.openSnackBar(message, { panelClass: src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].PANEL_CLASS_G });
    }
    showErrorSnackbar(message) {
        this.openSnackBar(message, { panelClass: src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].PANEL_CLASS_R });
    }
}
SnackbarService.ɵfac = function SnackbarService_Factory(t) { return new (t || SnackbarService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"])); };
SnackbarService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SnackbarService, factory: SnackbarService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SnackbarService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"] }]; }, null); })();


/***/ }),

/***/ "o4GV":
/*!********************************************!*\
  !*** ./src/app/pipe/sanitize-html.pipe.ts ***!
  \********************************************/
/*! exports provided: SanitizeHtmlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SanitizeHtmlPipe", function() { return SanitizeHtmlPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");



class SanitizeHtmlPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    transform(unsafeHtmlString) {
        return this.domSanitizer.bypassSecurityTrustHtml(unsafeHtmlString);
    }
}
SanitizeHtmlPipe.ɵfac = function SanitizeHtmlPipe_Factory(t) { return new (t || SanitizeHtmlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"])); };
SanitizeHtmlPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "sanitizeHtml", type: SanitizeHtmlPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SanitizeHtmlPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'sanitizeHtml'
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"] }]; }, null); })();


/***/ }),

/***/ "rso4":
/*!***********************************************!*\
  !*** ./src/app/dialog/info/info.component.ts ***!
  \***********************************************/
/*! exports provided: InfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoComponent", function() { return InfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _pipe_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pipe/sanitize-html.pipe */ "o4GV");






class InfoComponent {
    constructor(matDialogRef, data) {
        this.matDialogRef = matDialogRef;
        this.data = data;
        this.dialogTitle = this.dialogContent = '';
    }
    ngOnInit() {
        this.dialogTitle = this.data.title;
        this.dialogContent = this.data.content;
    }
    closeDialog() {
        this.matDialogRef.close();
    }
}
InfoComponent.ɵfac = function InfoComponent_Factory(t) { return new (t || InfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
InfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InfoComponent, selectors: [["app-info"]], decls: 9, vars: 6, consts: [[1, "infoDialogContainer"], ["mat-dialog-title", "", "align", "center", 3, "innerHTML"], [3, "innerHTML"], ["align", "center"], ["color", "accent", "mat-raised-button", "", 3, "click"]], template: function InfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "sanitizeHtml");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-dialog-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "sanitizeHtml");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-dialog-actions", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InfoComponent_Template_button_click_7_listener() { return ctx.closeDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Dismiss");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx.dialogTitle), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 4, ctx.dialogContent), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"]], pipes: [_pipe_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_3__["SanitizeHtmlPipe"]], styles: [".infoDialogContainer[_ngcontent-%COMP%] {\n  width: 500px;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9nL2luZm8vaW5mby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9kaWFsb2cvaW5mby9pbmZvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmluZm9EaWFsb2dDb250YWluZXIge1xyXG4gIHdpZHRoOiA1MDBweDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InfoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-info',
                templateUrl: './info.component.html',
                styleUrls: ['./info.component.scss']
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map