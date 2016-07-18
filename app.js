(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineChartController = exports.LineChartController = function () {

    /**
     * Constructor
     */

    function LineChartController($scope, $element) {
        var _this = this;

        _classCallCheck(this, LineChartController);

        this.$scope = $scope;
        this.element = angular.element($element)[0];

        // watch for data
        this.$scope.$watch('chartData', function (newData) {

            if (newData.length > 0) {
                _this.chartData = $scope.chartData;
                _this.originalData = $scope.originalData;
                _this.drawChart();
            }
        });
    }

    /**
     * Draw the data to the chart
     */


    _createClass(LineChartController, [{
        key: 'drawChart',
        value: function drawChart() {
            this.resetGraph();
            this.setupChart();
            this.setupAxis();
            this.drawAxis();
            this.drawLines();
        }

        /**
         * Reset the graph
         */

    }, {
        key: 'resetGraph',
        value: function resetGraph() {
            if (typeof this.container !== 'undefined') {
                d3.select('svg').remove();
            }
        }

        /**
         * Setup the container
         */

    }, {
        key: 'setupChart',
        value: function setupChart() {
            this.width = 600;
            this.height = 400;
            this.margin = 60;
            this.chartDimensions = { width: this.width - this.margin * 2, height: this.height - this.margin * 2 };
            this.container = d3.select(this.element).append('svg');
            this.containerX = this.container.append('g').attr('class', 'xAxis');
            this.containerY = this.container.append('g').attr('class', 'yAxis');
            this.graph = this.container.append('g').attr('class', 'graph');
        }

        /**
         * Setup the axis
         */

    }, {
        key: 'setupAxis',
        value: function setupAxis() {
            var _this2 = this;

            // X Axis
            this.x = d3.scaleLinear().domain([0, this.originalData.length - 1]).range([0, this.chartDimensions.width]);

            this.xAxis = d3.axisBottom(this.x).ticks(10);

            // Y Axis
            this.y = d3.scaleLinear().domain([0, 1]).range([this.chartDimensions.height, 0]);

            this.yAxis = d3.axisLeft(this.y);

            // Z
            this.z = d3.scaleOrdinal(d3.schemeCategory10);

            // Line
            this.line = d3.line().curve(d3.curveBasis).x(function (d, i) {
                return _this2.x(i);
            }).y(function (d) {
                return _this2.y(+d);
            });
        }

        /**
         * Draw the axis
         */

    }, {
        key: 'drawAxis',
        value: function drawAxis() {
            var _this3 = this;

            // x axis
            d3.select('.xAxis').attr('transform', function () {
                return 'translate(' + _this3.margin + ' ,' + (_this3.chartDimensions.height + _this3.margin) + ')';
            }).call(this.xAxis);

            // y axis
            d3.select('.yAxis').attr('transform', function () {
                return 'translate(' + _this3.margin + ', ' + _this3.margin + ')';
            }).call(this.yAxis);
        }

        /**
         * Draw the lines
         */

    }, {
        key: 'drawLines',
        value: function drawLines() {
            var _this4 = this;

            this.emotion = this.graph.selectAll('.emotions').data(this.chartData).enter().append('g').attr('class', 'emotions').attr('transform', 'translate(' + this.margin + ', 0)');

            this.emotion.append('path').attr('class', 'line').attr('d', function (d) {
                return _this4.line(d.values);
            }).style('stroke', function (d) {
                return _this4.z(d.id);
            });

            this.emotion.append('text').datum(function (d) {
                return { id: d.id, value: d.values[d.values.length - 1], end: d.values.length - 1 };
            }).attr('transform', function (d, i) {
                return 'translate( ' + _this4.x(d.end) + ', ' + _this4.y(d.value) + ' )';
            }).attr('x', 3).attr('dy', '0.35em').style('font', '10px sans-serif').text(function (d) {
                return d.id;
            });
        }
    }]);

    return LineChartController;
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineChartDirective = LineChartDirective;

var _lineChart = require('./line-chart.controller');

function LineChartDirective() {

    return {
        template: '<div class="linegraph"></div>',
        restrict: 'E',
        scope: {
            chartData: '=',
            originalData: '='
        },
        replace: true,
        controller: ['$scope', '$element', _lineChart.LineChartController]
    };
}

},{"./line-chart.controller":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MashupStartController = exports.MashupStartController = function () {

    /**
     * Constructor
     * @constructor
     */

    function MashupStartController(DataService, $q) {
        _classCallCheck(this, MashupStartController);

        // services
        this.dataService = DataService;
        this.$q = $q;

        // urls
        this.scriptDataURL = '/data/henry_iv.json';
        this.alchemyUrl = 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion';
        // this.alchemyAPIKey = '9541481794480afe68df1285e67824421ae9cdcb';
        this.alchemyAPIKey = '3a4591ee979e026e8c5d84e373c330dd23a61b32'; //veryphatic

        // models
        this.scriptData = null;
        this.speakers = [];
        this.scriptByAct = [];
        this.isLoading = true;
        this.textByScene = [];

        this.sceneSortedByEmotion = [];
        this.sceneEmotionRaw = [];
        this.isProcessing = false;
    }

    /**
     * Component lifecycle event
     */


    _createClass(MashupStartController, [{
        key: '$onInit',
        value: function $onInit() {
            var _this = this;

            this.dataService.getRequest(this.scriptDataURL).then(function (res) {
                _this.scriptData = res.data;
                _this.processScript();
            }, function (err) {
                throw new Error(err);
            });
        }

        /**
         * Conduct some basic analysis on the script
         */

    }, {
        key: 'processScript',
        value: function processScript() {
            var _this2 = this;

            this.scriptData.forEach(function (entry, key, arr) {

                // break up the acts and scene
                if (entry.line_number !== '') {
                    var actScene = entry.line_number.split('.');
                    var act = Number(actScene[0]) - 1;
                    var scene = Number(actScene[1]) - 1;

                    if (typeof _this2.scriptByAct[act] === 'undefined') _this2.scriptByAct[act] = [];
                    if (typeof _this2.scriptByAct[act][scene] === 'undefined') _this2.scriptByAct[act][scene] = [];
                    _this2.scriptByAct[act][scene].push(entry);

                    // Identify the speakers
                    if (_this2.speakers.indexOf(entry.speaker) === -1) _this2.speakers.push(entry.speaker);
                }
            }, this);

            this.isLoading = false;
        }

        /**
         * Make reqests to analyse the text
         */

    }, {
        key: 'showEmotionsByAct',
        value: function showEmotionsByAct(act, scene) {
            var _this3 = this;

            this.isProcessing = true;

            var promises = this.scriptByAct[act][scene].map(function (scene, key) {
                var sceneText = scene.text_entry;
                var query = _this3.alchemyUrl + '?apikey=' + _this3.alchemyAPIKey + '&outputMode=json&text=' + encodeURIComponent(sceneText) + '&jsonp=JSON_CALLBACK';
                return _this3.dataService.jsonpRequest(query);
            }, this);

            this.$q.all(promises).then(function (res) {
                _this3.prepareDataForChart(res);
            }, function (err) {
                throw new Error(err);
            }).finally(function () {
                _this3.isProcessing = false;
            });
        }

        /**
         * Prepare and sort the returned emotions
         * @param res
         */

    }, {
        key: 'prepareDataForChart',
        value: function prepareDataForChart(res) {
            var _this4 = this;

            var keys = [];
            var sortedByKeys = {};
            this.sceneEmotionRaw = [];

            res.forEach(function (resItem) {

                // create a raw source
                _this4.sceneEmotionRaw.push(resItem.data.docEmotions);

                // create the keys
                if (keys.length === 0) {
                    keys = Object.keys(resItem.data.docEmotions);
                    keys.forEach(function (key) {
                        sortedByKeys[key] = [];
                    });
                }

                // iterate over the values and put them into each array
                for (var key in resItem.data.docEmotions) {
                    sortedByKeys[key].push(resItem.data.docEmotions[key]);
                }
            });

            // Push everything into an array
            this.sceneSortedByEmotion = keys.map(function (key) {
                return { id: key, values: sortedByKeys[key] };
            });
        }
    }]);

    return MashupStartController;
}();

MashupStartController.$inject = ['DataService', '$q'];

},{}],4:[function(require,module,exports){
'use strict';

var _dataService = require('./services/dataService');

var _mashupStart = require('./components/mashup-start/mashup-start.controller');

var _lineChart = require('./components/line-chart/line-chart.directive');

(function (angular) {

    angular.module('nathenstreet', ['ngComponentRouter']).service('DataService', _dataService.DataService).directive('lineChart', _lineChart.LineChartDirective).config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            rewriteLinks: false
        });
    }).value('$routerRootComponent', 'mainApp').component('mainApp', {
        templateUrl: '/main-app.html',
        $routeConfig: [{ path: '/', name: 'MashupStart', component: 'mashupStart', useAsDefault: true }]
    }).component('mashupStart', {
        templateUrl: '/mashup-start.html',
        controller: _mashupStart.MashupStartController
    }).component('statsPanel', {
        templateUrl: '/stats-panel.html',
        require: {
            parent: '^mashupStart'
        }
    }).component('loadingStrip', {
        templateUrl: '/loading-strip.html',
        bindings: {
            isLoading: '='
        }
    }).component('navActions', {
        templateUrl: '/nav-actions.html',
        bindings: {
            acts: '='
        },
        require: {
            parent: '^mashupStart'
        }
    });
})(angular);

},{"./components/line-chart/line-chart.directive":2,"./components/mashup-start/mashup-start.controller":3,"./services/dataService":5}],5:[function(require,module,exports){
'use strict';

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

    function DataService($q, $http) {
        _classCallCheck(this, DataService);

        // services
        this.$q = $q;
        this.$http = $http;
    }

    /**
     * Make a get request
     */


    _createClass(DataService, [{
        key: 'getRequest',
        value: function getRequest(url) {
            var def = this.$q.defer();

            this.$http({
                method: 'GET',
                url: url
            }).then(function (res) {
                def.resolve(res);
            }).catch(function (err) {
                def.reject(err);
            });

            return def.promise;
        }

        /**
         * Make a post request
         * @param payload
         * @param url
         */

    }, {
        key: 'postRequest',
        value: function postRequest(url, payload) {
            var def = this.$q.defer();

            this.$http({
                method: 'POST',
                url: url,
                data: payload
            }).then(function (res) {
                def.resolve(res);
            }).catch(function (err) {
                def.reject(err);
            });

            return def.promise;
        }

        /**
         * Make a jsonP request
         * @param payload
         * @param url
         */

    }, {
        key: 'jsonpRequest',
        value: function jsonpRequest(url) {
            var def = this.$q.defer();

            this.$http({
                method: 'JSONP',
                url: '' + url
            }).then(function (res) {
                def.resolve(res);
            }).catch(function (err) {
                def.reject(err);
            });

            return def.promise;
        }
    }]);

    return DataService;
}();

DataService.$inject = ['$q', '$http'];

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29tcG9uZW50cy9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29udHJvbGxlci5qcyIsImFwcC9jb21wb25lbnRzL2xpbmUtY2hhcnQvbGluZS1jaGFydC5kaXJlY3RpdmUuanMiLCJhcHAvY29tcG9uZW50cy9tYXNodXAtc3RhcnQvbWFzaHVwLXN0YXJ0LmNvbnRyb2xsZXIuanMiLCJhcHAvbWFpbi5qcyIsImFwcC9zZXJ2aWNlcy9kYXRhU2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBYSxtQixXQUFBLG1COztBQUdUOzs7O0FBR0EsaUNBQVksTUFBWixFQUFvQixRQUFwQixFQUE4QjtBQUFBOztBQUFBOztBQUUxQixhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxPQUFMLEdBQWUsUUFBUSxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLENBQTFCLENBQWY7O0FBRUE7QUFDQSxhQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLFdBQW5CLEVBQWdDLFVBQUMsT0FBRCxFQUFZOztBQUV4QyxnQkFBSSxRQUFRLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsc0JBQUssU0FBTCxHQUFpQixPQUFPLFNBQXhCO0FBQ0Esc0JBQUssWUFBTCxHQUFvQixPQUFPLFlBQTNCO0FBQ0Esc0JBQUssU0FBTDtBQUNIO0FBQ0osU0FQRDtBQVNIOztBQUdEOzs7Ozs7O29DQUdZO0FBQ1IsaUJBQUssVUFBTDtBQUNBLGlCQUFLLFVBQUw7QUFDQSxpQkFBSyxTQUFMO0FBQ0EsaUJBQUssUUFBTDtBQUNBLGlCQUFLLFNBQUw7QUFDSDs7QUFJRDs7Ozs7O3FDQUdhO0FBQ1QsZ0JBQUksT0FBTyxLQUFLLFNBQVosS0FBMEIsV0FBOUIsRUFBMkM7QUFDdkMsbUJBQUcsTUFBSCxDQUFVLEtBQVYsRUFBaUIsTUFBakI7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LEcsRUFBSztBQUNkLGdCQUFJLE1BQU0sS0FBSyxFQUFMLENBQVEsS0FBUixFQUFWOztBQUVBLGlCQUFLLEtBQUwsQ0FBVztBQUNQLHdCQUFRLE9BREQ7QUFFUCwwQkFBUTtBQUZELGFBQVgsRUFHRyxJQUhILENBSUksVUFBQyxHQUFELEVBQVM7QUFDTCxvQkFBSSxPQUFKLENBQVksR0FBWjtBQUNILGFBTkwsRUFPRSxLQVBGLENBUUksVUFBQyxHQUFELEVBQVM7QUFDTCxvQkFBSSxNQUFKLENBQVcsR0FBWDtBQUNILGFBVkw7O0FBYUEsbUJBQU8sSUFBSSxPQUFYO0FBQ0g7Ozs7OztBQVNMLFlBQVksT0FBWixHQUFzQixDQUFDLElBQUQsRUFBTyxPQUFQLENBQXRCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBMaW5lQ2hhcnRDb250cm9sbGVyIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZWxlbWVudClbMF07XHJcblxyXG4gICAgICAgIC8vIHdhdGNoIGZvciBkYXRhXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJHdhdGNoKCdjaGFydERhdGEnLCAobmV3RGF0YSkgPT57XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3RGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0RGF0YSA9ICRzY29wZS5jaGFydERhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsRGF0YSA9ICRzY29wZS5vcmlnaW5hbERhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdDaGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdGhlIGRhdGEgdG8gdGhlIGNoYXJ0XHJcbiAgICAgKi9cclxuICAgIGRyYXdDaGFydCgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0R3JhcGgoKTtcclxuICAgICAgICB0aGlzLnNldHVwQ2hhcnQoKTtcclxuICAgICAgICB0aGlzLnNldHVwQXhpcygpO1xyXG4gICAgICAgIHRoaXMuZHJhd0F4aXMoKTtcclxuICAgICAgICB0aGlzLmRyYXdMaW5lcygpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCB0aGUgZ3JhcGhcclxuICAgICAqL1xyXG4gICAgcmVzZXRHcmFwaCgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29udGFpbmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkMy5zZWxlY3QoJ3N2ZycpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBzZXR1cENoYXJ0KCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSA2MDA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA0MDA7XHJcbiAgICAgICAgdGhpcy5tYXJnaW4gPSA2MDtcclxuICAgICAgICB0aGlzLmNoYXJ0RGltZW5zaW9ucyA9IHsgd2lkdGg6IHRoaXMud2lkdGggLSAodGhpcy5tYXJnaW4gKiAyKSwgaGVpZ2h0OiB0aGlzLmhlaWdodCAtICh0aGlzLm1hcmdpbiAqIDIpIH07XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkMy5zZWxlY3QodGhpcy5lbGVtZW50KS5hcHBlbmQoJ3N2ZycpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyWCA9IHRoaXMuY29udGFpbmVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3hBeGlzJyk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJZID0gdGhpcy5jb250YWluZXIuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAneUF4aXMnKTtcclxuICAgICAgICB0aGlzLmdyYXBoID0gdGhpcy5jb250YWluZXIuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ3JhcGgnKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIGF4aXNcclxuICAgICAqL1xyXG4gICAgc2V0dXBBeGlzKCkge1xyXG4gICAgICAgIC8vIFggQXhpc1xyXG4gICAgICAgIHRoaXMueCA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLmRvbWFpbihbIDAsIHRoaXMub3JpZ2luYWxEYXRhLmxlbmd0aCAtIDEgXSlcclxuICAgICAgICAgICAgLnJhbmdlKFsgMCwgdGhpcy5jaGFydERpbWVuc2lvbnMud2lkdGggXSk7XHJcblxyXG4gICAgICAgIHRoaXMueEF4aXMgPSBkMy5heGlzQm90dG9tKHRoaXMueClcclxuICAgICAgICAgICAgLnRpY2tzKDEwKTtcclxuXHJcbiAgICAgICAgLy8gWSBBeGlzXHJcbiAgICAgICAgdGhpcy55ID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFsgMCwgMSBdKVxyXG4gICAgICAgICAgICAucmFuZ2UoWyB0aGlzLmNoYXJ0RGltZW5zaW9ucy5oZWlnaHQsIDAgXSk7XHJcblxyXG4gICAgICAgIHRoaXMueUF4aXMgPSBkMy5heGlzTGVmdCh0aGlzLnkpO1xyXG5cclxuICAgICAgICAvLyBaXHJcbiAgICAgICAgdGhpcy56ID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xyXG5cclxuICAgICAgICAvLyBMaW5lXHJcbiAgICAgICAgdGhpcy5saW5lID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUJhc2lzKVxyXG4gICAgICAgICAgICAueCggKGQsaSkgPT4geyByZXR1cm4gdGhpcy54KGkpIH0pXHJcbiAgICAgICAgICAgIC55KCAoZCkgPT4geyByZXR1cm4gdGhpcy55KCtkKSB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgdGhlIGF4aXNcclxuICAgICAqL1xyXG4gICAgZHJhd0F4aXMoKSB7XHJcbiAgICAgICAgLy8geCBheGlzXHJcbiAgICAgICAgZDMuc2VsZWN0KCcueEF4aXMnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKCk9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3RoaXMubWFyZ2lufSAsJHt0aGlzLmNoYXJ0RGltZW5zaW9ucy5oZWlnaHQgKyB0aGlzLm1hcmdpbn0pYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2FsbCh0aGlzLnhBeGlzKTtcclxuXHJcbiAgICAgICAgLy8geSBheGlzXHJcbiAgICAgICAgZDMuc2VsZWN0KCcueUF4aXMnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKCk9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3RoaXMubWFyZ2lufSwgJHt0aGlzLm1hcmdpbn0pYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2FsbCh0aGlzLnlBeGlzKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IHRoZSBsaW5lc1xyXG4gICAgICovXHJcbiAgICBkcmF3TGluZXMoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZW1vdGlvbiA9IHRoaXMuZ3JhcGguc2VsZWN0QWxsKCcuZW1vdGlvbnMnKVxyXG4gICAgICAgICAgICAuZGF0YSh0aGlzLmNoYXJ0RGF0YSlcclxuICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdlbW90aW9ucycpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW59LCAwKWApO1xyXG5cclxuICAgICAgICB0aGlzLmVtb3Rpb24uYXBwZW5kKCdwYXRoJylcclxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxyXG4gICAgICAgICAgICAuYXR0cignZCcsIChkKSA9PiB7IHJldHVybiB0aGlzLmxpbmUoZC52YWx1ZXMpIH0pXHJcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgKGQpID0+IHsgcmV0dXJuIHRoaXMueihkLmlkKSB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZW1vdGlvbi5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAuZGF0dW0oIChkKSA9PiB7IHJldHVybiB7aWQ6IGQuaWQsIHZhbHVlOiBkLnZhbHVlc1tkLnZhbHVlcy5sZW5ndGggLSAxXSwgZW5kOiBkLnZhbHVlcy5sZW5ndGggLSAxIH0gfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PiB7IHJldHVybiBgdHJhbnNsYXRlKCAke3RoaXMueChkLmVuZCl9LCAke3RoaXMueShkLnZhbHVlKX0gKWAgfSlcclxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAzKVxyXG4gICAgICAgICAgICAuYXR0cignZHknLCAnMC4zNWVtJylcclxuICAgICAgICAgICAgLnN0eWxlKCdmb250JywgJzEwcHggc2Fucy1zZXJpZicpXHJcbiAgICAgICAgICAgIC50ZXh0KCAoZCkgPT4geyByZXR1cm4gZC5pZDsgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IExpbmVDaGFydENvbnRyb2xsZXIgfSBmcm9tICcuL2xpbmUtY2hhcnQuY29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTGluZUNoYXJ0RGlyZWN0aXZlKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibGluZWdyYXBoXCI+PC9kaXY+JyxcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGNoYXJ0RGF0YTogJz0nLFxyXG4gICAgICAgICAgICBvcmlnaW5hbERhdGE6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsJyRlbGVtZW50JywgTGluZUNoYXJ0Q29udHJvbGxlcl1cclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgTWFzaHVwU3RhcnRDb250cm9sbGVyIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKERhdGFTZXJ2aWNlLCAkcSkge1xyXG5cclxuICAgICAgICAvLyBzZXJ2aWNlc1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UgPSBEYXRhU2VydmljZTtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcblxyXG4gICAgICAgIC8vIHVybHNcclxuICAgICAgICB0aGlzLnNjcmlwdERhdGFVUkwgPSAnL2RhdGEvaGVucnlfaXYuanNvbic7XHJcbiAgICAgICAgdGhpcy5hbGNoZW15VXJsID0gJ2h0dHA6Ly9nYXRld2F5LWEud2F0c29ucGxhdGZvcm0ubmV0L2NhbGxzL3RleHQvVGV4dEdldEVtb3Rpb24nO1xyXG4gICAgICAgIC8vIHRoaXMuYWxjaGVteUFQSUtleSA9ICc5NTQxNDgxNzk0NDgwYWZlNjhkZjEyODVlNjc4MjQ0MjFhZTljZGNiJztcclxuICAgICAgICB0aGlzLmFsY2hlbXlBUElLZXkgPSAnM2E0NTkxZWU5NzllMDI2ZThjNWQ4NGUzNzNjMzMwZGQyM2E2MWIzMic7IC8vdmVyeXBoYXRpY1xyXG5cclxuICAgICAgICAvLyBtb2RlbHNcclxuICAgICAgICB0aGlzLnNjcmlwdERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3BlYWtlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNjcmlwdEJ5QWN0ID0gW107XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dEJ5U2NlbmUgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZVNvcnRlZEJ5RW1vdGlvbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2NlbmVFbW90aW9uUmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50IGxpZmVjeWNsZSBldmVudFxyXG4gICAgICovXHJcbiAgICAkb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0UmVxdWVzdCh0aGlzLnNjcmlwdERhdGFVUkwpXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0RGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NjcmlwdCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZHVjdCBzb21lIGJhc2ljIGFuYWx5c2lzIG9uIHRoZSBzY3JpcHRcclxuICAgICAqL1xyXG4gICAgcHJvY2Vzc1NjcmlwdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JpcHREYXRhLmZvckVhY2goIChlbnRyeSwga2V5LCBhcnIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJyZWFrIHVwIHRoZSBhY3RzIGFuZCBzY2VuZVxyXG4gICAgICAgICAgICBpZiAoZW50cnkubGluZV9udW1iZXIgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0U2NlbmUgPSBlbnRyeS5saW5lX251bWJlci5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdCA9IE51bWJlcihhY3RTY2VuZVswXSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lID0gTnVtYmVyKGFjdFNjZW5lWzFdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNjcmlwdEJ5QWN0W2FjdF0gPT09ICd1bmRlZmluZWQnKSB0aGlzLnNjcmlwdEJ5QWN0W2FjdF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zY3JpcHRCeUFjdFthY3RdW3NjZW5lXSA9PT0gJ3VuZGVmaW5lZCcpIHRoaXMuc2NyaXB0QnlBY3RbYWN0XVtzY2VuZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0QnlBY3RbYWN0XVtzY2VuZV0ucHVzaChlbnRyeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWRlbnRpZnkgdGhlIHNwZWFrZXJzXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcGVha2Vycy5pbmRleE9mKGVudHJ5LnNwZWFrZXIpID09PSAtMSkgdGhpcy5zcGVha2Vycy5wdXNoKGVudHJ5LnNwZWFrZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZSByZXFlc3RzIHRvIGFuYWx5c2UgdGhlIHRleHRcclxuICAgICAqL1xyXG4gICAgc2hvd0Vtb3Rpb25zQnlBY3QoYWN0LCBzY2VuZSkge1xyXG5cclxuICAgICAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCBwcm9taXNlcyA9IHRoaXMuc2NyaXB0QnlBY3RbYWN0XVtzY2VuZV0ubWFwKCAoc2NlbmUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVUZXh0ID0gc2NlbmUudGV4dF9lbnRyeTtcclxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gYCR7dGhpcy5hbGNoZW15VXJsfT9hcGlrZXk9JHt0aGlzLmFsY2hlbXlBUElLZXl9Jm91dHB1dE1vZGU9anNvbiZ0ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNjZW5lVGV4dCl9Jmpzb25wPUpTT05fQ0FMTEJBQ0tgO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5qc29ucFJlcXVlc3QocXVlcnkpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy4kcS5hbGwocHJvbWlzZXMpXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURhdGFGb3JDaGFydChyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZmluYWxseSggKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZSBhbmQgc29ydCB0aGUgcmV0dXJuZWQgZW1vdGlvbnNcclxuICAgICAqIEBwYXJhbSByZXNcclxuICAgICAqL1xyXG4gICAgcHJlcGFyZURhdGFGb3JDaGFydChyZXMpIHtcclxuICAgICAgICBsZXQga2V5cyA9IFtdO1xyXG4gICAgICAgIGxldCBzb3J0ZWRCeUtleXMgPSB7fTtcclxuICAgICAgICB0aGlzLnNjZW5lRW1vdGlvblJhdyA9IFtdO1xyXG5cclxuICAgICAgICByZXMuZm9yRWFjaCggKHJlc0l0ZW0pID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHJhdyBzb3VyY2VcclxuICAgICAgICAgICAgdGhpcy5zY2VuZUVtb3Rpb25SYXcucHVzaChyZXNJdGVtLmRhdGEuZG9jRW1vdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBrZXlzXHJcbiAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHJlc0l0ZW0uZGF0YS5kb2NFbW90aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goIChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRCeUtleXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgdmFsdWVzIGFuZCBwdXQgdGhlbSBpbnRvIGVhY2ggYXJyYXlcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHJlc0l0ZW0uZGF0YS5kb2NFbW90aW9ucykge1xyXG4gICAgICAgICAgICAgICAgc29ydGVkQnlLZXlzW2tleV0ucHVzaChyZXNJdGVtLmRhdGEuZG9jRW1vdGlvbnNba2V5XSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIFB1c2ggZXZlcnl0aGluZyBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgdGhpcy5zY2VuZVNvcnRlZEJ5RW1vdGlvbiA9IGtleXMubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBrZXksIHZhbHVlczogc29ydGVkQnlLZXlzW2tleV0gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5NYXNodXBTdGFydENvbnRyb2xsZXIuJGluamVjdCA9IFsnRGF0YVNlcnZpY2UnLCAnJHEnXTsiLCJpbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZGF0YVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXNodXBTdGFydENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFzaHVwLXN0YXJ0L21hc2h1cC1zdGFydC5jb250cm9sbGVyJztcclxuaW1wb3J0IHsgTGluZUNoYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2xpbmUtY2hhcnQvbGluZS1jaGFydC5kaXJlY3RpdmUnO1xyXG5cclxuKCAoYW5ndWxhcikgPT4ge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCduYXRoZW5zdHJlZXQnLCBbJ25nQ29tcG9uZW50Um91dGVyJ10pXHJcbiAgICAgICAgLnNlcnZpY2UoJ0RhdGFTZXJ2aWNlJywgRGF0YVNlcnZpY2UpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnbGluZUNoYXJ0JywgTGluZUNoYXJ0RGlyZWN0aXZlKVxyXG5cclxuXHJcbiAgICAgICAgLmNvbmZpZyggKCRsb2NhdGlvblByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmV3cml0ZUxpbmtzOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAudmFsdWUoJyRyb3V0ZXJSb290Q29tcG9uZW50JywgJ21haW5BcHAnKVxyXG5cclxuICAgICAgICAuY29tcG9uZW50KCdtYWluQXBwJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tYWluLWFwcC5odG1sJyxcclxuICAgICAgICAgICAgJHJvdXRlQ29uZmlnOiBbXHJcbiAgICAgICAgICAgICAgICB7IHBhdGg6ICcvJywgbmFtZTogJ01hc2h1cFN0YXJ0JywgY29tcG9uZW50OiAnbWFzaHVwU3RhcnQnLCB1c2VBc0RlZmF1bHQ6IHRydWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmNvbXBvbmVudCgnbWFzaHVwU3RhcnQnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21hc2h1cC1zdGFydC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogTWFzaHVwU3RhcnRDb250cm9sbGVyXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLmNvbXBvbmVudCgnc3RhdHNQYW5lbCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvc3RhdHMtcGFuZWwuaHRtbCcsXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IHtcclxuICAgICAgICAgICAgICAgIHBhcmVudDogJ15tYXNodXBTdGFydCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC5jb21wb25lbnQoJ2xvYWRpbmdTdHJpcCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9hZGluZy1zdHJpcC5odG1sJyxcclxuICAgICAgICAgICAgYmluZGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogJz0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAuY29tcG9uZW50KCduYXZBY3Rpb25zJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9uYXYtYWN0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgYmluZGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGFjdHM6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXF1aXJlOiB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6ICdebWFzaHVwU3RhcnQnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcblxyXG59KShhbmd1bGFyKTsiLCJleHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigkcSwgJGh0dHApIHtcclxuXHJcbiAgICAgICAgLy8gc2VydmljZXNcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ha2UgYSBnZXQgcmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBnZXRSZXF1ZXN0KHVybCkge1xyXG4gICAgICAgIGxldCBkZWYgPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICB1cmw6IHVybFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZSBhIHBvc3QgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIHBheWxvYWRcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgcG9zdFJlcXVlc3QodXJsLCBwYXlsb2FkKSB7XHJcbiAgICAgICAgbGV0IGRlZiA9IHRoaXMuJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogcGF5bG9hZFxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApLmNhdGNoKFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlIGEganNvblAgcmVxdWVzdFxyXG4gICAgICogQHBhcmFtIHBheWxvYWRcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAganNvbnBSZXF1ZXN0KHVybCkge1xyXG4gICAgICAgIGxldCBkZWYgPSB0aGlzLiRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdKU09OUCcsXHJcbiAgICAgICAgICAgIHVybDogYCR7dXJsfWBcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKS5jYXRjaChcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVmLnJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5EYXRhU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckaHR0cCddOyJdfQ==
