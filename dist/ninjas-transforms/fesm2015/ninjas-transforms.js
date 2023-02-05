import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';

class DurationAdjustmentLayer {
    constructor(epochsInSeconds) {
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
    setLimit(limitToEntity = 'seconds') {
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
    }
    setJoiner(joiner = '') {
        this.joiner = joiner;
    }
    setShortHand(useShortHand) {
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
    }
    setMinimumDigits(minDigits) {
        if (minDigits === null)
            return;
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (this.durationEntityHash[hKey].count.length >= minDigits)
                return;
            this.durationEntityHash[hKey].count =
                this.repeatStringNumTimes('0', minDigits - this.durationEntityHash[hKey].count.length) + this.durationEntityHash[hKey].count;
        });
    }
    setZeroVisibility(zeroCountsVisible = false) {
        this.zerosVisible = zeroCountsVisible;
    }
    getDurationString() {
        let entities = [];
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (parseInt(this.durationEntityHash[hKey].count) == 0 &&
                !this.zerosVisible)
                return;
            entities.push(this.durationEntityHash[hKey].count +
                (this.shortHand ? '' : ' ') +
                this.durationEntityHash[hKey].unit);
        });
        return entities.join(this.joiner);
    }
    setUnitWithCapitalLetter(unitWithCapitalLetter = false) {
        if (!unitWithCapitalLetter)
            return;
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            this.durationEntityHash[hKey].unit = this.capitalize(this.durationEntityHash[hKey].unit);
        });
    }
    setDurationEntityHash(epochsInSeconds) {
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
    }
    setRespectiveForms() {
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (parseInt(this.durationEntityHash[hKey].count) != 1)
                return;
            if (this.shortHand)
                return;
            this.durationEntityHash[hKey].unit = this.durationEntityHash[hKey].unit.slice(0, -1);
        });
    }
    repeatStringNumTimes(str, times) {
        if (times <= 0)
            return '';
        return str + this.repeatStringNumTimes(str, times - 1);
    }
    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}

class DurationPipe {
    transform(epochsInSeconds, limitTo = 'seconds', shortHand = false, minDigits = null, showZero = false, unitWithCapitalLetter = false, entityJoiner = ' ') {
        const durationAdjustmentLayer = new DurationAdjustmentLayer(epochsInSeconds);
        // ORDER MATTERS
        durationAdjustmentLayer.setLimit(limitTo);
        durationAdjustmentLayer.setJoiner(entityJoiner);
        durationAdjustmentLayer.setShortHand(shortHand);
        durationAdjustmentLayer.setMinimumDigits(minDigits);
        durationAdjustmentLayer.setZeroVisibility(showZero);
        durationAdjustmentLayer.setJoiner(entityJoiner);
        durationAdjustmentLayer.setUnitWithCapitalLetter(unitWithCapitalLetter);
        return durationAdjustmentLayer.getDurationString();
    }
}
DurationPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DurationPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, name: "duration" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'duration',
                }]
        }] });

class NinjasTransformsModule {
}
NinjasTransformsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NinjasTransformsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NinjasTransformsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NinjasTransformsModule, declarations: [DurationPipe], exports: [DurationPipe] });
NinjasTransformsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NinjasTransformsModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NinjasTransformsModule, decorators: [{
            type: NgModule,
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

export { DurationPipe, NinjasTransformsModule };
//# sourceMappingURL=ninjas-transforms.js.map
