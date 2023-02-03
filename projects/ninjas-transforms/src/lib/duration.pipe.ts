import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  getAbbreviation(s: string) {
    return s[0];
  }

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  pluralize(s: string) {
    return s + 's';
  }

  public transform(
    epochs_in_seconds: number,
    limit_to: DurationLimit = 'seconds',
    short_hand = false,
    append_zero = false,
    show_zero = false
  ): string {
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
        } else {
          durationString += ' ';
        }
      } else if (
        entities[i] === 0 &&
        limit_to === this.pluralize(duration_names[i]) &&
        !durationString
      ) {
        return (
          short_hand
            ? 0 + this.getAbbreviation(duration_names[i])
            : '0 ' + this.capitalize(this.pluralize(duration_names[i]))
        ).trim();
      } else if (
        entities[i] === 0 &&
        isHighestDenominationPresent &&
        show_zero
      ) {
        entityString += '0';
        durationString +=
          entityString +
          (short_hand
            ? this.getAbbreviation(duration_names[i])
            : ' ' + this.capitalize(duration_names[i]));

        if (limit_to === this.pluralize(duration_names[i])) {
          return durationString.trim();
        } else {
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

export type DurationLimit = 'years' | 'days' | 'hours' | 'minutes' | 'seconds';
