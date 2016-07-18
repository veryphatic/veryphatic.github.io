(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MashupStartController =

/**
 * Constructor
 * @constructor
 */
exports.MashupStartController = function MashupStartController() {
    _classCallCheck(this, MashupStartController);
};

},{}],2:[function(require,module,exports){
'use strict';

var _dataService = require('./services/dataService');

var _MashupStartController = require('./components/mashup-start/MashupStartController');

(function (angular) {

    angular.module('nathenstreet', []).service('DataService', _dataService.DataService).config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            rewriteLinks: false
        });
    }).value('$routerRootComponent', 'mainApp').component('mainApp', {
        templateUrl: '/main-app.html',
        $routeConfig: [{ path: '/', name: 'MashupStart', component: 'mashupStart', useAsDefault: true }]
    }).component('mashupStart', {
        templateUrl: '/mashup-start.html',
        controller: _MashupStartController.MashupStartController
    });
})(angular);

},{"./components/mashup-start/MashupStartController":1,"./services/dataService":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataService = exports.DataService = function () {

    /**
     * Constructor
     * @constructor
     */

    function DataService() {
        _classCallCheck(this, DataService);
    }

    /**
     * Make a get request
     */


    _createClass(DataService, [{
        key: "getRequest",
        value: function getRequest(url) {}

        /**
         * Make a post request
         * @param payload
         * @param url
         */

    }, {
        key: "postRequest",
        value: function postRequest(payload, url) {}
    }]);

    return DataService;
}();

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29tcG9uZW50cy9tYXNodXAtc3RhcnQvTWFzaHVwU3RhcnRDb250cm9sbGVyLmpzIiwiYXBwL21haW4uanMiLCJhcHAvc2VydmljZXMvZGF0YVNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FhLHFCOztBQUdUOzs7O1FBSFMscUIsR0FPVCxpQ0FBYztBQUFBO0FBRWIsQzs7Ozs7QUNUTDs7QUFDQTs7QUFFQSxDQUFFLFVBQUMsT0FBRCxFQUFhOztBQUVYLFlBQVEsTUFBUixDQUFlLGNBQWYsRUFBK0IsRUFBL0IsRUFDSyxPQURMLENBQ2EsYUFEYiw0QkFJSyxNQUpMLENBSWEsVUFBQyxpQkFBRCxFQUF1QjtBQUM1QiwwQkFBa0IsU0FBbEIsQ0FBNEI7QUFDeEIscUJBQVMsSUFEZTtBQUV4QiwwQkFBYztBQUZVLFNBQTVCO0FBSUgsS0FUTCxFQVdLLEtBWEwsQ0FXVyxzQkFYWCxFQVdtQyxTQVhuQyxFQWFLLFNBYkwsQ0FhZSxTQWJmLEVBYTBCO0FBQ2xCLHFCQUFhLGdCQURLO0FBRWxCLHNCQUFjLENBQ1YsRUFBRSxNQUFNLEdBQVIsRUFBYSxNQUFNLGFBQW5CLEVBQWtDLFdBQVcsYUFBN0MsRUFBNEQsY0FBYyxJQUExRSxFQURVO0FBRkksS0FiMUIsRUFvQkssU0FwQkwsQ0FvQmUsYUFwQmYsRUFvQjhCO0FBQ3RCLHFCQUFhLG9CQURTO0FBRXRCO0FBRnNCLEtBcEI5QjtBQXlCSCxDQTNCRCxFQTJCRyxPQTNCSDs7Ozs7Ozs7Ozs7OztJQ0hhLFcsV0FBQSxXOztBQUVUOzs7OztBQUlBLDJCQUFjO0FBQUE7QUFBRTs7QUFHaEI7Ozs7Ozs7bUNBR1csRyxFQUFLLENBRWY7O0FBR0Q7Ozs7Ozs7O29DQUtZLE8sRUFBUyxHLEVBQUssQ0FFekIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIE1hc2h1cFN0YXJ0Q29udHJvbGxlciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGFTZXJ2aWNlJztcclxuaW1wb3J0IHsgTWFzaHVwU3RhcnRDb250cm9sbGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL21hc2h1cC1zdGFydC9NYXNodXBTdGFydENvbnRyb2xsZXInO1xyXG5cclxuKCAoYW5ndWxhcikgPT4ge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCduYXRoZW5zdHJlZXQnLCBbXSlcclxuICAgICAgICAuc2VydmljZSgnRGF0YVNlcnZpY2UnLCBEYXRhU2VydmljZSlcclxuXHJcblxyXG4gICAgICAgIC5jb25maWcoICgkbG9jYXRpb25Qcm92aWRlcikgPT4ge1xyXG4gICAgICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJld3JpdGVMaW5rczogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLnZhbHVlKCckcm91dGVyUm9vdENvbXBvbmVudCcsICdtYWluQXBwJylcclxuXHJcbiAgICAgICAgLmNvbXBvbmVudCgnbWFpbkFwcCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbWFpbi1hcHAuaHRtbCcsXHJcbiAgICAgICAgICAgICRyb3V0ZUNvbmZpZzogW1xyXG4gICAgICAgICAgICAgICAgeyBwYXRoOiAnLycsIG5hbWU6ICdNYXNodXBTdGFydCcsIGNvbXBvbmVudDogJ21hc2h1cFN0YXJ0JywgdXNlQXNEZWZhdWx0OiB0cnVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5jb21wb25lbnQoJ21hc2h1cFN0YXJ0Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tYXNodXAtc3RhcnQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IE1hc2h1cFN0YXJ0Q29udHJvbGxlclxyXG4gICAgICAgIH0pXHJcblxyXG59KShhbmd1bGFyKTsiLCJleHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZSBhIGdldCByZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIGdldFJlcXVlc3QodXJsKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ha2UgYSBwb3N0IHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBwYXlsb2FkXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHBvc3RSZXF1ZXN0KHBheWxvYWQsIHVybCkge1xyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=
