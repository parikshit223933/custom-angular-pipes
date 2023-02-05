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

  setJoiner(joiner: string = '') {
    this.joiner = joiner;
  }

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

  setZeroVisibility(zeroCountsVisible: boolean = false) {
    this.zerosVisible = zeroCountsVisible;
  }

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
