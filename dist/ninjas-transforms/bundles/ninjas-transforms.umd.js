(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ninjas-transforms', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ninjas-transforms"] = {}, global.ng.core));
})(this, (function (exports, i0) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var DurationAdjustmentLayer = /** @class */ (function () {
        function DurationAdjustmentLayer(epochsInSeconds) {
            this.durationEntityHash = {};
            this.joiner = ' ';
            this.zerosVisible = false;
            this.shortHand = false;
            this.UnitHash = {
                YEAR: 'year',
                DAY: 'day',
                HOUR: 'hour',
                MINUTE: 'minute',
                SECOND: 'second',
            };
            this.setDurationEntityHash(epochsInSeconds);
            this.setRespectiveForms();
        }
        DurationAdjustmentLayer.prototype.setLimit = function (limitToEntity) {
            if (limitToEntity === void 0) { limitToEntity = 'seconds'; }
            switch (limitToEntity) {
                case 'years':
                    delete this.durationEntityHash.day;
                    delete this.durationEntityHash.hour;
                    delete this.durationEntityHash.minute;
                    delete this.durationEntityHash.second;
                    return;
                case 'days':
                    delete this.durationEntityHash.hour;
                    delete this.durationEntityHash.minute;
                    delete this.durationEntityHash.second;
                    return;
                case 'hours':
                    delete this.durationEntityHash.minute;
                    delete this.durationEntityHash.second;
                    return;
                case 'minutes':
                    delete this.durationEntityHash.second;
                    return;
                case 'seconds':
                    return;
                default:
                    return;
            }
        };
        DurationAdjustmentLayer.prototype.setJoiner = function (joiner) {
            if (joiner === void 0) { joiner = ''; }
            this.joiner = joiner;
        };
        DurationAdjustmentLayer.prototype.setShortHand = function (useShortHand) {
            this.shortHand = useShortHand;
            if (!this.shortHand)
                return;
            if (this.durationEntityHash.year) {
                this.durationEntityHash.year.unit = 'y';
            }
            if (this.durationEntityHash.day) {
                this.durationEntityHash.day.unit = 'd';
            }
            if (this.durationEntityHash.hour) {
                this.durationEntityHash.hour.unit = 'h';
            }
            if (this.durationEntityHash.minute) {
                this.durationEntityHash.minute.unit = 'm';
            }
            if (this.durationEntityHash.second) {
                this.durationEntityHash.second.unit = 's';
            }
        };
        DurationAdjustmentLayer.prototype.setMinimumDigits = function (minDigits) {
            var _this = this;
            if (minDigits === null)
                return;
            Object.values(this.UnitHash).forEach(function (hKey) {
                if (!_this.durationEntityHash[hKey])
                    return;
                if (_this.durationEntityHash[hKey].count.length >= minDigits)
                    return;
                _this.durationEntityHash[hKey].count =
                    _this.repeatStringNumTimes('0', minDigits - _this.durationEntityHash[hKey].count.length) + _this.durationEntityHash[hKey].count;
            });
        };
        DurationAdjustmentLayer.prototype.setZeroVisibility = function (zeroCountsVisible) {
            if (zeroCountsVisible === void 0) { zeroCountsVisible = false; }
            this.zerosVisible = zeroCountsVisible;
        };
        DurationAdjustmentLayer.prototype.getDurationString = function () {
            var _this = this;
            var entities = [];
            Object.values(this.UnitHash).forEach(function (hKey) {
                if (!_this.durationEntityHash[hKey])
                    return;
                if (parseInt(_this.durationEntityHash[hKey].count) == 0 &&
                    !_this.zerosVisible)
                    return;
                entities.push(_this.durationEntityHash[hKey].count +
                    (_this.shortHand ? '' : ' ') +
                    _this.durationEntityHash[hKey].unit);
            });
            return entities.join(this.joiner);
        };
        DurationAdjustmentLayer.prototype.setUnitWithCapitalLetter = function (unitWithCapitalLetter) {
            var _this = this;
            if (unitWithCapitalLetter === void 0) { unitWithCapitalLetter = false; }
            if (!unitWithCapitalLetter)
                return;
            Object.values(this.UnitHash).forEach(function (hKey) {
                if (!_this.durationEntityHash[hKey])
                    return;
                _this.durationEntityHash[hKey].unit = _this.capitalize(_this.durationEntityHash[hKey].unit);
            });
        };
        DurationAdjustmentLayer.prototype.setDurationEntityHash = function (epochsInSeconds) {
            this.durationEntityHash = {
                year: {
                    count: Math.floor(epochsInSeconds / 60 / 60 / 24 / 365).toString(),
                    unit: 'years',
                },
                day: {
                    count: Math.floor((epochsInSeconds / 60 / 60 / 24) % 365).toString(),
                    unit: 'days',
                },
                hour: {
                    count: Math.floor((epochsInSeconds / 60 / 60) % 24).toString(),
                    unit: 'hours',
                },
                minute: {
                    count: Math.floor((epochsInSeconds / 60) % 60).toString(),
                    unit: 'minutes',
                },
                second: {
                    count: Math.floor(epochsInSeconds % 60).toString(),
                    unit: 'seconds',
                },
            };
        };
        DurationAdjustmentLayer.prototype.setRespectiveForms = function () {
            var _this = this;
            Object.values(this.UnitHash).forEach(function (hKey) {
                if (!_this.durationEntityHash[hKey])
                    return;
                if (parseInt(_this.durationEntityHash[hKey].count) != 1)
                    return;
                if (_this.shortHand)
                    return;
                _this.durationEntityHash[hKey].unit = _this.durationEntityHash[hKey].unit.slice(0, -1);
            });
        };
        DurationAdjustmentLayer.prototype.repeatStringNumTimes = function (str, times) {
            if (times <= 0)
                return '';
            return str + this.repeatStringNumTimes(str, times - 1);
        };
        DurationAdjustmentLayer.prototype.capitalize = function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        };
        return DurationAdjustmentLayer;
    }());

    var DurationPipe = /** @class */ (function () {
        function DurationPipe() {
        }
        DurationPipe.prototype.transform = function (epochsInSeconds, limitTo, shortHand, minDigits, showZero, unitWithCapitalLetter, entityJoiner) {
            if (limitTo === void 0) { limitTo = 'seconds'; }
            if (shortHand === void 0) { shortHand = false; }
            if (minDigits === void 0) { minDigits = null; }
            if (showZero === void 0) { showZero = false; }
            if (unitWithCapitalLetter === void 0) { unitWithCapitalLetter = false; }
            if (entityJoiner === void 0) { entityJoiner = ' '; }
            var durationAdjustmentLayer = new DurationAdjustmentLayer(epochsInSeconds);
            // ORDER MATTERS
            durationAdjustmentLayer.setLimit(limitTo);
            durationAdjustmentLayer.setJoiner(entityJoiner);
            durationAdjustmentLayer.setShortHand(shortHand);
            durationAdjustmentLayer.setMinimumDigits(minDigits);
            durationAdjustmentLayer.setZeroVisibility(showZero);
            durationAdjustmentLayer.setJoiner(entityJoiner);
            durationAdjustmentLayer.setUnitWithCapitalLetter(unitWithCapitalLetter);
            return durationAdjustmentLayer.getDurationString();
        };
        return DurationPipe;
    }());
    DurationPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DurationPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    DurationPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DurationPipe, name: "duration" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DurationPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'duration',
                    }]
            }] });

    var NinjasTransformsModule = /** @class */ (function () {
        function NinjasTransformsModule() {
        }
        return NinjasTransformsModule;
    }());
    NinjasTransformsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NinjasTransformsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NinjasTransformsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NinjasTransformsModule, declarations: [DurationPipe], exports: [DurationPipe] });
    NinjasTransformsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NinjasTransformsModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NinjasTransformsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            DurationPipe
                        ],
                        imports: [],
                        exports: [
                            DurationPipe
                        ]
                    }]
            }] });

    /*
     * Public API Surface of ninjas-transforms
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DurationPipe = DurationPipe;
    exports.NinjasTransformsModule = NinjasTransformsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ninjas-transforms.umd.js.map
