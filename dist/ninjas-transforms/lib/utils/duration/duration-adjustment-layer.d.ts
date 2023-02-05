export declare type SmallPluralDurationEntityType = 'years' | 'days' | 'hours' | 'minutes' | 'seconds';
export declare type SmallSingularDurationEntityType = 'year' | 'day' | 'hour' | 'minute' | 'second';
export declare type SmallDurationEntityAbbreviationModel = 'y' | 'd' | 'h' | 'm' | 's';
export declare type CapitalPluralDurationEntityType = 'Years' | 'Days' | 'Hours' | 'Minutes' | 'Seconds';
export declare type CapitalSingularDurationEntityType = 'Year' | 'Day' | 'Hour' | 'Minute' | 'Second';
export declare type CapitalDurationEntityAbbreviationModel = 'Y' | 'D' | 'H' | 'M' | 'S';
export interface SingleEntityDataModel {
    count: string;
    unit: SmallPluralDurationEntityType | SmallSingularDurationEntityType | SmallDurationEntityAbbreviationModel | CapitalPluralDurationEntityType | CapitalSingularDurationEntityType | CapitalDurationEntityAbbreviationModel;
}
export interface DurationEntityHashModel {
    [p: string]: SingleEntityDataModel;
}
export declare class DurationAdjustmentLayer {
    private durationEntityHash;
    private joiner;
    private zerosVisible;
    private shortHand;
    private UnitHash;
    constructor(epochsInSeconds: number);
    setLimit(limitToEntity?: SmallPluralDurationEntityType): void;
    setJoiner(joiner?: string): void;
    setShortHand(useShortHand: boolean): void;
    setMinimumDigits(minDigits: number | null): void;
    setZeroVisibility(zeroCountsVisible?: boolean): void;
    getDurationString(): string;
    setUnitWithCapitalLetter(unitWithCapitalLetter?: boolean): void;
    private setDurationEntityHash;
    private setRespectiveForms;
    private repeatStringNumTimes;
    private capitalize;
}
