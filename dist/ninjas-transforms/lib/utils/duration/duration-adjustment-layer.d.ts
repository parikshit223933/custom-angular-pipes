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
    /**
     setLimit - Sets the limit of duration entities to be shown in the final output.
     @param {SmallPluralDurationEntityType} [limitToEntity='seconds'] The duration entity upto which the duration should be limited.
     @returns {void}
     */
    setLimit(limitToEntity?: SmallPluralDurationEntityType): void;
    /**
     * Sets the string used to join the duration entities
     * @param joiner - The string used to join the duration entities. Default value is an empty string.
     */
    setJoiner(joiner?: string): void;
    /**
     Set the shorthand flag to determine if the unit should be abbreviated.
     If set to true, it will abbreviate the units to y for year, d for day,
     h for hour, m for minute, and s for second.
     @param {boolean} useShortHand - flag to use shorthand for units
     */
    setShortHand(useShortHand: boolean): void;
    /**
     Set the minimum number of digits for each duration entity.
     If the count of a duration entity is less than the minimum digits, it will be padded with zeros until it meets the requirement.
     @param {number|null} minDigits - The minimum number of digits for each duration entity.
     */
    setMinimumDigits(minDigits: number | null): void;
    /**
     This method sets the visibility of zero count durations in the final result string.
     If zeroCountsVisible is set to true, durations with zero count will be included in the final result string.
     By default, zeroCountsVisible is set to false.
     @param {boolean} zeroCountsVisible - Determines the visibility of zero count durations in the final result string.
     */
    setZeroVisibility(zeroCountsVisible?: boolean): void;
    /**
     * getDurationString() generates a string representation of the duration,
     * taking into account options such as shortHand, joiner and minimumDigits.
     * It includes only non-zero values, unless zeroCountsVisible is set to true.
     *
     * @returns {string}  - A string representation of the duration
     */
    getDurationString(): string;
    /**
     * setUnitWithCapitalLetter - function to set the unit type in the duration string to be capitalized
     * @param unitWithCapitalLetter - whether to use capital letter unit or not (default false)
     */
    setUnitWithCapitalLetter(unitWithCapitalLetter?: boolean): void;
    private setDurationEntityHash;
    private setRespectiveForms;
    private repeatStringNumTimes;
    private capitalize;
}
