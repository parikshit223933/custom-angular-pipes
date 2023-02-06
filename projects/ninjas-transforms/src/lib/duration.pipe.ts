import { Pipe, PipeTransform } from '@angular/core';
import {
  DurationAdjustmentLayer,
  SmallPluralDurationEntityType,
} from './utils/duration/duration-adjustment-layer';

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

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  public transform(
    epochsInSeconds: number,
    limitTo: SmallPluralDurationEntityType = 'seconds',
    shortHand: boolean = false,
    minDigits: number | null = null,
    showZero: boolean = false,
    unitWithCapitalLetter: boolean = false,
    entityJoiner: string = ' '
  ): string {
    const durationAdjustmentLayer = new DurationAdjustmentLayer(
      epochsInSeconds
    );
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

export type DurationLimit = SmallPluralDurationEntityType;
