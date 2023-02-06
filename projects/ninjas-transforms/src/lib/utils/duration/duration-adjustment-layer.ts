export type SmallPluralDurationEntityType =
  | 'years'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds';

export type SmallSingularDurationEntityType =
  | 'year'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

export type SmallDurationEntityAbbreviationModel = 'y' | 'd' | 'h' | 'm' | 's';

export type CapitalPluralDurationEntityType =
  | 'Years'
  | 'Days'
  | 'Hours'
  | 'Minutes'
  | 'Seconds';

export type CapitalSingularDurationEntityType =
  | 'Year'
  | 'Day'
  | 'Hour'
  | 'Minute'
  | 'Second';

export type CapitalDurationEntityAbbreviationModel =
  | 'Y'
  | 'D'
  | 'H'
  | 'M'
  | 'S';

export interface SingleEntityDataModel {
  count: string;
  unit:
    | SmallPluralDurationEntityType
    | SmallSingularDurationEntityType
    | SmallDurationEntityAbbreviationModel
    | CapitalPluralDurationEntityType
    | CapitalSingularDurationEntityType
    | CapitalDurationEntityAbbreviationModel;
}

export interface DurationEntityHashModel {
  [p: string]: SingleEntityDataModel;
}

export class DurationAdjustmentLayer {
  private durationEntityHash: DurationEntityHashModel = {};
  private joiner: string = ' ';
  private zerosVisible: boolean = false;
  private shortHand: boolean = false;
  private UnitHash = {
    YEAR: 'year',
    DAY: 'day',
    HOUR: 'hour',
    MINUTE: 'minute',
    SECOND: 'second',
  };

  constructor(epochsInSeconds: number) {
    this.setDurationEntityHash(epochsInSeconds);
    this.setRespectiveForms();
  }

  /**
   setLimit - Sets the limit of duration entities to be shown in the final output.
   @param {SmallPluralDurationEntityType} [limitToEntity='seconds'] The duration entity upto which the duration should be limited.
   @returns {void}
   */
  setLimit(limitToEntity: SmallPluralDurationEntityType = 'seconds') {
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
  setJoiner(joiner: string = '') {
    this.joiner = joiner;
  }

  /**
   Set the shorthand flag to determine if the unit should be abbreviated.
   If set to true, it will abbreviate the units to y for year, d for day,
   h for hour, m for minute, and s for second.
   @param {boolean} useShortHand - flag to use shorthand for units
   */
  setShortHand(useShortHand: boolean) {
    this.shortHand = useShortHand;
    if (!this.shortHand) return;

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
  setMinimumDigits(minDigits: number | null) {
    if (minDigits === null) return;
    Object.values(this.UnitHash).forEach((hKey) => {
      if (!this.durationEntityHash[hKey]) return;

      if (this.durationEntityHash[hKey].count.length >= minDigits) return;

      this.durationEntityHash[hKey].count =
        this.repeatStringNumTimes(
          '0',
          minDigits - this.durationEntityHash[hKey].count.length
        ) + this.durationEntityHash[hKey].count;
    });
  }


  /**
   This method sets the visibility of zero count durations in the final result string.
   If zeroCountsVisible is set to true, durations with zero count will be included in the final result string.
   By default, zeroCountsVisible is set to false.
   @param {boolean} zeroCountsVisible - Determines the visibility of zero count durations in the final result string.
   */
  setZeroVisibility(zeroCountsVisible: boolean = false) {
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
    let entities: string[] = [];
    Object.values(this.UnitHash).forEach((hKey) => {
      if (!this.durationEntityHash[hKey]) return;
      if (
        parseInt(this.durationEntityHash[hKey].count) == 0 &&
        !this.zerosVisible
      )
        return;

      entities.push(
        this.durationEntityHash[hKey].count +
          (this.shortHand ? '' : ' ') +
          this.durationEntityHash[hKey].unit
      );
    });
    return entities.join(this.joiner);
  }

  /**
   * setUnitWithCapitalLetter - function to set the unit type in the duration string to be capitalized
   * @param unitWithCapitalLetter - whether to use capital letter unit or not (default false)
   */
  setUnitWithCapitalLetter(unitWithCapitalLetter: boolean = false) {
    if (!unitWithCapitalLetter) return;

    Object.values(this.UnitHash).forEach((hKey) => {
      if (!this.durationEntityHash[hKey]) return;
      this.durationEntityHash[hKey].unit = this.capitalize(
        this.durationEntityHash[hKey].unit
      ) as
        | CapitalPluralDurationEntityType
        | CapitalSingularDurationEntityType
        | CapitalDurationEntityAbbreviationModel;
    });
  }

  private setDurationEntityHash(epochsInSeconds: number) {
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

  private setRespectiveForms() {
    Object.values(this.UnitHash).forEach((hKey) => {
      if (!this.durationEntityHash[hKey]) return;
      if (parseInt(this.durationEntityHash[hKey].count) != 1) return;
      if (this.shortHand) return;

      this.durationEntityHash[hKey].unit = this.durationEntityHash[
        hKey
      ].unit.slice(0, -1) as SmallSingularDurationEntityType;
    });
  }

  private repeatStringNumTimes(str: string, times: number): string {
    if (times <= 0) return '';
    return str + this.repeatStringNumTimes(str, times - 1);
  }

  private capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
