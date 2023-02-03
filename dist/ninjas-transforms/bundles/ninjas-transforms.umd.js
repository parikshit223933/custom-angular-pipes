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

    var DurationPipe = /** @class */ (function () {
        function DurationPipe() {
        }
        DurationPipe.prototype.getAbbreviation = function (s) {
            return s[0];
        };
        DurationPipe.prototype.capitalize = function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        };
        DurationPipe.prototype.pluralize = function (s) {
            return s + 's';
        };
        DurationPipe.prototype.transform = function (epochs_in_seconds, limit_to, short_hand, append_zero, show_zero) {
            if (limit_to === void 0) { limit_to = 'seconds'; }
            if (short_hand === void 0) { short_hand = false; }
            if (append_zero === void 0) { append_zero = false; }
            if (show_zero === void 0) { show_zero = false; }
            var years = Math.floor(epochs_in_seconds / 60 / 60 / 24 / 365);
            var days = Math.floor((epochs_in_seconds / 60 / 60 / 24) % 365);
            var hours = Math.floor((epochs_in_seconds / 60 / 60) % 24);
            var minutes = Math.floor((epochs_in_seconds / 60) % 60);
            var seconds = Math.floor(epochs_in_seconds % 60);
            var durationString = '';
            var isHighestDenominationPresent = false;
            var entities = [years, days, hours, minutes, seconds];
            var duration_names = ['year', 'day', 'hour', 'minute', 'second'];
            for (var i = 0; i < entities.length; i++) {
                var entityString = entities[i].toString();
                if (entities[i] !== 0) {
                    if (!isHighestDenominationPresent) {
                        isHighestDenominationPresent = true;
                    }
                    if (entities[i] < 10 && append_zero) {
                        entityString = '0' + entityString;
                    }
                    durationString +=
                        entityString +
                            (short_hand
                                ? this.getAbbreviation(duration_names[i])
                                : ' ' + this.capitalize(duration_names[i]));
                    if (!short_hand) {
                        durationString +=
                            entityString === '01' || entityString === '1' ? '' : 's';
                    }
                    if (limit_to === this.pluralize(duration_names[i])) {
                        return durationString.trim();
                    }
                    else {
                        durationString += ' ';
                    }
                }
                else if (entities[i] === 0 &&
                    limit_to === this.pluralize(duration_names[i]) &&
                    !durationString) {
                    return (short_hand
                        ? 0 + this.getAbbreviation(duration_names[i])
                        : '0 ' + this.capitalize(this.pluralize(duration_names[i]))).trim();
                }
                else if (entities[i] === 0 &&
                    isHighestDenominationPresent &&
                    show_zero) {
                    entityString += '0';
                    durationString +=
                        entityString +
                            (short_hand
                                ? this.getAbbreviation(duration_names[i])
                                : ' ' + this.capitalize(duration_names[i]));
                    if (limit_to === this.pluralize(duration_names[i])) {
                        return durationString.trim();
                    }
                    else {
                        durationString += ' ';
                    }
                }
                if (limit_to === this.pluralize(duration_names[i])) {
                    return durationString.trim();
                }
            }
            return durationString.trim();
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
