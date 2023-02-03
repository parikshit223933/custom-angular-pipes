import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DurationPipe implements PipeTransform {
    getAbbreviation(s: string): string;
    capitalize(s: string): string;
    pluralize(s: string): string;
    transform(epochs_in_seconds: number, limit_to?: DurationLimit, short_hand?: boolean, append_zero?: boolean, show_zero?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DurationPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DurationPipe, "duration">;
}
export declare type DurationLimit = 'years' | 'days' | 'hours' | 'minutes' | 'seconds';
