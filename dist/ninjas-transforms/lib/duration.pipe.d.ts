import { PipeTransform } from '@angular/core';
import { SmallPluralDurationEntityType } from './utils/duration/duration-adjustment-layer';
import * as i0 from "@angular/core";
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
export declare class DurationPipe implements PipeTransform {
    transform(epochsInSeconds: number, limitTo?: SmallPluralDurationEntityType, shortHand?: boolean, minDigits?: number | null, showZero?: boolean, unitWithCapitalLetter?: boolean, entityJoiner?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DurationPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DurationPipe, "duration">;
}
export declare type DurationLimit = SmallPluralDurationEntityType;
