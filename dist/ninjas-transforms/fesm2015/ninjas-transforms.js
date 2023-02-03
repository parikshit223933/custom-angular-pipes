import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';

class DurationPipe {
    getAbbreviation(s) {
        return s[0];
    }
    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    pluralize(s) {
        return s + 's';
    }
    transform(epochs_in_seconds, limit_to = 'seconds', short_hand = false, append_zero = false, show_zero = false) {
        const years = Math.floor(epochs_in_seconds / 60 / 60 / 24 / 365);
        const days = Math.floor((epochs_in_seconds / 60 / 60 / 24) % 365);
        const hours = Math.floor((epochs_in_seconds / 60 / 60) % 24);
        const minutes = Math.floor((epochs_in_seconds / 60) % 60);
        const seconds = Math.floor(epochs_in_seconds % 60);
        let durationString = '';
        let isHighestDenominationPresent = false;
        const entities = [years, days, hours, minutes, seconds];
        const duration_names = ['year', 'day', 'hour', 'minute', 'second'];
        for (let i = 0; i < entities.length; i++) {
            let entityString = entities[i].toString();
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
