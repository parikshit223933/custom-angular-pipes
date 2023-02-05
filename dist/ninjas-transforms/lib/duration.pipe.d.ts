import { PipeTransform } from '@angular/core';
import { SmallPluralDurationEntityType } from './utils/duration/duration-adjustment-layer';
import * as i0 from "@angular/core";
export declare class DurationPipe implements PipeTransform {
    transform(epochsInSeconds: number, limitTo?: SmallPluralDurationEntityType, shortHand?: boolean, minDigits?: number | null, showZero?: boolean, unitWithCapitalLetter?: boolean, entityJoiner?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DurationPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DurationPipe, "duration">;
}
export declare type DurationLimit = SmallPluralDurationEntityType;
