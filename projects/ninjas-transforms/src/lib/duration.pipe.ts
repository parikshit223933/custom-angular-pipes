import { Pipe, PipeTransform } from '@angular/core';
import {
  DurationAdjustmentLayer,
  SmallPluralDurationEntityType,
} from './utils/duration/duration-adjustment-layer';

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
