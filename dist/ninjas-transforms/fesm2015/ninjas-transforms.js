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
    /**
     setLimit - Sets the limit of duration entities to be shown in the final output.
     @param {SmallPluralDurationEntityType} [limitToEntity='seconds'] The duration entity upto which the duration should be limited.
     @returns {void}
     */
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
    /**
     * Sets the string used to join the duration entities
     * @param joiner - The string used to join the duration entities. Default value is an empty string.
     */
    setJoiner(joiner = '') {
        this.joiner = joiner;
    }
    /**
     Set the shorthand flag to determine if the unit should be abbreviated.
     If set to true, it will abbreviate the units to y for year, d for day,
     h for hour, m for minute, and s for second.
     @param {boolean} useShortHand - flag to use shorthand for units
     */
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
    /**
     Set the minimum number of digits for each duration entity.
     If the count of a duration entity is less than the minimum digits, it will be padded with zeros until it meets the requirement.
     @param {number|null} minDigits - The minimum number of digits for each duration entity.
     */
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
    /**
     This method sets the visibility of zero count durations in the final result string.
     If zeroCountsVisible is set to true, durations with zero count will be included in the final result string.
     By default, zeroCountsVisible is set to false.
     @param {boolean} zeroCountsVisible - Determines the visibility of zero count durations in the final result string.
     */
    setZeroVisibility(zeroCountsVisible = false) {
        this.zerosVisible = zeroCountsVisible;
    }
    /**
     * getDurationString() generates a string representation of the duration,
     * taking into account options such as shortHand, joiner and minimumDigits.
     * It includes only non-zero values, unless zeroCountsVisible is set to true.
     *
     * @returns {string}  - A string representation of the duration
     */
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
    /**
     * setUnitWithCapitalLetter - function to set the unit type in the duration string to be capitalized
     * @param unitWithCapitalLetter - whether to use capital letter unit or not (default false)
     */
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

/**
 * DurationPipe is an angular pipe that can be used to format duration in seconds in a readable string format.
 * The duration is provided in epochsInSeconds and it can be transformed into different
 * formats like minutes, hours, days, etc.
 *
 * limitTo: specify the highest entity that should be shown in the duration string.
 * shortHand: whether or not to use abbreviated form of entities, such as "s" for "seconds".
 * minDigits: minimum number of digits for each entity.
 * showZero: show entity even if the value is 0.
 * unitWithCapitalLetter: show unit with a capital letter, such as "Seconds".
 * entityJoiner: the string used to join different entities in the duration string.
 *
 * @example
 *
 * <p>{{ epochsInSeconds | duration }}</p>
 * <p>{{ epochsInSeconds | duration: 'minutes': true: 2: true: true: ',' }}</p>
 */
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
