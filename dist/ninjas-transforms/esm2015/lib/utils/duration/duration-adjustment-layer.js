export class DurationAdjustmentLayer {
    constructor(epochsInSeconds) {
        this.durationEntityHash = {};
        this.joiner = ' ';
        this.zerosVisible = false;
        this.shortHand = false;
        this.UnitHash = {
            YEAR: 'year',
            DAY: 'day',
            HOUR: 'hour',
            MINUTE: 'minute',
            SECOND: 'second',
        };
        this.setDurationEntityHash(epochsInSeconds);
        this.setRespectiveForms();
    }
    /**
     setLimit - Sets the limit of duration entities to be shown in the final output.
     @param {SmallPluralDurationEntityType} [limitToEntity='seconds'] The duration entity upto which the duration should be limited.
     @returns {void}
     */
    setLimit(limitToEntity = 'seconds') {
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
    setJoiner(joiner = '') {
        this.joiner = joiner;
    }
    /**
     Set the shorthand flag to determine if the unit should be abbreviated.
     If set to true, it will abbreviate the units to y for year, d for day,
     h for hour, m for minute, and s for second.
     @param {boolean} useShortHand - flag to use shorthand for units
     */
    setShortHand(useShortHand) {
        this.shortHand = useShortHand;
        if (!this.shortHand)
            return;
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
    setMinimumDigits(minDigits) {
        if (minDigits === null)
            return;
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (this.durationEntityHash[hKey].count.length >= minDigits)
                return;
            this.durationEntityHash[hKey].count =
                this.repeatStringNumTimes('0', minDigits - this.durationEntityHash[hKey].count.length) + this.durationEntityHash[hKey].count;
        });
    }
    /**
     This method sets the visibility of zero count durations in the final result string.
     If zeroCountsVisible is set to true, durations with zero count will be included in the final result string.
     By default, zeroCountsVisible is set to false.
     @param {boolean} zeroCountsVisible - Determines the visibility of zero count durations in the final result string.
     */
    setZeroVisibility(zeroCountsVisible = false) {
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
        let entities = [];
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (parseInt(this.durationEntityHash[hKey].count) == 0 &&
                !this.zerosVisible)
                return;
            entities.push(this.durationEntityHash[hKey].count +
                (this.shortHand ? '' : ' ') +
                this.durationEntityHash[hKey].unit);
        });
        return entities.join(this.joiner);
    }
    /**
     * setUnitWithCapitalLetter - function to set the unit type in the duration string to be capitalized
     * @param unitWithCapitalLetter - whether to use capital letter unit or not (default false)
     */
    setUnitWithCapitalLetter(unitWithCapitalLetter = false) {
        if (!unitWithCapitalLetter)
            return;
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            this.durationEntityHash[hKey].unit = this.capitalize(this.durationEntityHash[hKey].unit);
        });
    }
    setDurationEntityHash(epochsInSeconds) {
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
    setRespectiveForms() {
        Object.values(this.UnitHash).forEach((hKey) => {
            if (!this.durationEntityHash[hKey])
                return;
            if (parseInt(this.durationEntityHash[hKey].count) != 1)
                return;
            if (this.shortHand)
                return;
            this.durationEntityHash[hKey].unit = this.durationEntityHash[hKey].unit.slice(0, -1);
        });
    }
    repeatStringNumTimes(str, times) {
        if (times <= 0)
            return '';
        return str + this.repeatStringNumTimes(str, times - 1);
    }
    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24tYWRqdXN0bWVudC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25pbmphcy10cmFuc2Zvcm1zL3NyYy9saWIvdXRpbHMvZHVyYXRpb24vZHVyYXRpb24tYWRqdXN0bWVudC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvREEsTUFBTSxPQUFPLHVCQUF1QjtJQWFsQyxZQUFZLGVBQXVCO1FBWjNCLHVCQUFrQixHQUE0QixFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUNyQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGFBQVEsR0FBRztZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLEdBQUcsRUFBRSxLQUFLO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFDO1FBR0EsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLGdCQUErQyxTQUFTO1FBQy9ELFFBQVEsYUFBYSxFQUFFO1lBQ3JCLEtBQUssT0FBTztnQkFDVixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDcEMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RDLE9BQU87WUFDVCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxPQUFPLElB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QUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTztZQUMvRCxJQUFJLElBQUksQ0FBQyxTQUFTO2dCQUFFLE9BQU87WUFFM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQzFELElBQUksQ0FDTCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFvQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLG9CQUFvQixDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQ3JELElBQUksS0FBSyxJQUFJLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMxQixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sVUFBVSxDQUFDLENBQVM7UUFDMUIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgU21hbGxQbHVyYWxEdXJhdGlvbkVudGl0eVR5cGUgPVxuICB8ICd5ZWFycydcbiAgfCAnZGF5cydcbiAgfCAnaG91cnMnXG4gIHwgJ21pbnV0ZXMnXG4gIHwgJ3NlY29uZHMnO1xuXG5leHBvcnQgdHlwZSBTbWFsbFNpbmd1bGFyRHVyYXRpb25FbnRpdHlUeXBlID1cbiAgfCAneWVhcidcbiAgfCAnZGF5J1xuICB8ICdob3VyJ1xuICB8ICdtaW51dGUnXG4gIHwgJ3NlY29uZCc7XG5cbmV4cG9ydCB0eXBlIFNtYWxsRHVyYXRpb25FbnRpdHlBYmJyZXZpYXRpb25Nb2RlbCA9ICd5JyB8ICdkJyB8ICdoJyB8ICdtJyB8ICdzJztcblxuZXhwb3J0IHR5cGUgQ2FwaXRhbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZSA9XG4gIHwgJ1llYXJzJ1xuICB8ICdEYXlzJ1xuICB8ICdIb3VycydcbiAgfCAnTWludXRlcydcbiAgfCAnU2Vjb25kcyc7XG5cbmV4cG9ydCB0eXBlIENhcGl0YWxTaW5ndWxhckR1cmF0aW9uRW50aXR5VHlwZSA9XG4gIHwgJ1llYXInXG4gIHwgJ0RheSdcbiAgfCAnSG91cidcbiAgfCAnTWludXRlJ1xuICB8ICdTZWNvbmQnO1xuXG5leHBvcnQgdHlwZSBDYXBpdGFsRHVyYXRpb25FbnRpdHlBYmJyZXZpYXRpb25Nb2RlbCA9XG4gIHwgJ1knXG4gIHwgJ0QnXG4gIHwgJ0gnXG4gIHwgJ00nXG4gIHwgJ1MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbmdsZUVudGl0eURhdGFNb2RlbCB7XG4gIGNvdW50OiBzdHJpbmc7XG4gIHVuaXQ6XG4gICAgfCBTbWFsbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZVxuICAgIHwgU21hbGxTaW5ndWxhckR1cmF0aW9uRW50aXR5VHlwZVxuICAgIHwgU21hbGxEdXJhdGlvbkVudGl0eUFiYnJldmlhdGlvbk1vZGVsXG4gICAgfCBDYXBpdGFsUGx1cmFsRHVyYXRpb25FbnRpdHlUeXBlXG4gICAgfCBDYXBpdGFsU2luZ3VsYXJEdXJhdGlvbkVudGl0eVR5cGVcbiAgICB8IENhcGl0YWxEdXJhdGlvbkVudGl0eUFiYnJldmlhdGlvbk1vZGVsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIER1cmF0aW9uRW50aXR5SGFzaE1vZGVsIHtcbiAgW3A6IHN0cmluZ106IFNpbmdsZUVudGl0eURhdGFNb2RlbDtcbn1cblxuZXhwb3J0IGNsYXNzIER1cmF0aW9uQWRqdXN0bWVudExheWVyIHtcbiAgcHJpdmF0ZSBkdXJhdGlvbkVudGl0eUhhc2g6IER1cmF0aW9uRW50aXR5SGFzaE1vZGVsID0ge307XG4gIHByaXZhdGUgam9pbmVyOiBzdHJpbmcgPSAnICc7XG4gIHByaXZhdGUgemVyb3NWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2hvcnRIYW5kOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgVW5pdEhhc2ggPSB7XG4gICAgWUVBUjogJ3llYXInLFxuICAgIERBWTogJ2RheScsXG4gICAgSE9VUjogJ2hvdXInLFxuICAgIE1JTlVURTogJ21pbnV0ZScsXG4gICAgU0VDT05EOiAnc2Vjb25kJyxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihlcG9jaHNJblNlY29uZHM6IG51bWJlcikge1xuICAgIHRoaXMuc2V0RHVyYXRpb25FbnRpdHlIYXNoKGVwb2Noc0luU2Vjb25kcyk7XG4gICAgdGhpcy5zZXRSZXNwZWN0aXZlRm9ybXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgc2V0TGltaXQgLSBTZXRzIHRoZSBsaW1pdCBvZiBkdXJhdGlvbiBlbnRpdGllcyB0byBiZSBzaG93biBpbiB0aGUgZmluYWwgb3V0cHV0LlxuICAgQHBhcmFtIHtTbWFsbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZX0gW2xpbWl0VG9FbnRpdHk9J3NlY29uZHMnXSBUaGUgZHVyYXRpb24gZW50aXR5IHVwdG8gd2hpY2ggdGhlIGR1cmF0aW9uIHNob3VsZCBiZSBsaW1pdGVkLlxuICAgQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBzZXRMaW1pdChsaW1pdFRvRW50aXR5OiBTbWFsbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZSA9ICdzZWNvbmRzJykge1xuICAgIHN3aXRjaCAobGltaXRUb0VudGl0eSkge1xuICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guZGF5O1xuICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guaG91cjtcbiAgICAgICAgZGVsZXRlIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoLm1pbnV0ZTtcbiAgICAgICAgZGVsZXRlIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoLnNlY29uZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgIGRlbGV0ZSB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC5ob3VyO1xuICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2gubWludXRlO1xuICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guc2Vjb25kO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgIGRlbGV0ZSB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC5taW51dGU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC5zZWNvbmQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgICBkZWxldGUgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guc2Vjb25kO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzdHJpbmcgdXNlZCB0byBqb2luIHRoZSBkdXJhdGlvbiBlbnRpdGllc1xuICAgKiBAcGFyYW0gam9pbmVyIC0gVGhlIHN0cmluZyB1c2VkIHRvIGpvaW4gdGhlIGR1cmF0aW9uIGVudGl0aWVzLiBEZWZhdWx0IHZhbHVlIGlzIGFuIGVtcHR5IHN0cmluZy5cbiAgICovXG4gIHNldEpvaW5lcihqb2luZXI6IHN0cmluZyA9ICcnKSB7XG4gICAgdGhpcy5qb2luZXIgPSBqb2luZXI7XG4gIH1cblxuICAvKipcbiAgIFNldCB0aGUgc2hvcnRoYW5kIGZsYWcgdG8gZGV0ZXJtaW5lIGlmIHRoZSB1bml0IHNob3VsZCBiZSBhYmJyZXZpYXRlZC5cbiAgIElmIHNldCB0byB0cnVlLCBpdCB3aWxsIGFiYnJldmlhdGUgdGhlIHVuaXRzIHRvIHkgZm9yIHllYXIsIGQgZm9yIGRheSxcbiAgIGggZm9yIGhvdXIsIG0gZm9yIG1pbnV0ZSwgYW5kIHMgZm9yIHNlY29uZC5cbiAgIEBwYXJhbSB7Ym9vbGVhbn0gdXNlU2hvcnRIYW5kIC0gZmxhZyB0byB1c2Ugc2hvcnRoYW5kIGZvciB1bml0c1xuICAgKi9cbiAgc2V0U2hvcnRIYW5kKHVzZVNob3J0SGFuZDogYm9vbGVhbikge1xuICAgIHRoaXMuc2hvcnRIYW5kID0gdXNlU2hvcnRIYW5kO1xuICAgIGlmICghdGhpcy5zaG9ydEhhbmQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC55ZWFyKSB7XG4gICAgICB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC55ZWFyLnVuaXQgPSAneSc7XG4gICAgfVxuICAgIGlmICh0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC5kYXkpIHtcbiAgICAgIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoLmRheS51bml0ID0gJ2QnO1xuICAgIH1cbiAgICBpZiAodGhpcy5kdXJhdGlvbkVudGl0eUhhc2guaG91cikge1xuICAgICAgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guaG91ci51bml0ID0gJ2gnO1xuICAgIH1cbiAgICBpZiAodGhpcy5kdXJhdGlvbkVudGl0eUhhc2gubWludXRlKSB7XG4gICAgICB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaC5taW51dGUudW5pdCA9ICdtJztcbiAgICB9XG4gICAgaWYgKHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoLnNlY29uZCkge1xuICAgICAgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2guc2Vjb25kLnVuaXQgPSAncyc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICBTZXQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBmb3IgZWFjaCBkdXJhdGlvbiBlbnRpdHkuXG4gICBJZiB0aGUgY291bnQgb2YgYSBkdXJhdGlvbiBlbnRpdHkgaXMgbGVzcyB0aGFuIHRoZSBtaW5pbXVtIGRpZ2l0cywgaXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB1bnRpbCBpdCBtZWV0cyB0aGUgcmVxdWlyZW1lbnQuXG4gICBAcGFyYW0ge251bWJlcnxudWxsfSBtaW5EaWdpdHMgLSBUaGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGZvciBlYWNoIGR1cmF0aW9uIGVudGl0eS5cbiAgICovXG4gIHNldE1pbmltdW1EaWdpdHMobWluRGlnaXRzOiBudW1iZXIgfCBudWxsKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5Vbml0SGFzaCkuZm9yRWFjaCgoaEtleSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XSkgcmV0dXJuO1xuXG4gICAgICBpZiAodGhpcy5kdXJhdGlvbkVudGl0eUhhc2hbaEtleV0uY291bnQubGVuZ3RoID49IG1pbkRpZ2l0cykgcmV0dXJuO1xuXG4gICAgICB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XS5jb3VudCA9XG4gICAgICAgIHRoaXMucmVwZWF0U3RyaW5nTnVtVGltZXMoXG4gICAgICAgICAgJzAnLFxuICAgICAgICAgIG1pbkRpZ2l0cyAtIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoW2hLZXldLmNvdW50Lmxlbmd0aFxuICAgICAgICApICsgdGhpcy5kdXJhdGlvbkVudGl0eUhhc2hbaEtleV0uY291bnQ7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgVGhpcyBtZXRob2Qgc2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB6ZXJvIGNvdW50IGR1cmF0aW9ucyBpbiB0aGUgZmluYWwgcmVzdWx0IHN0cmluZy5cbiAgIElmIHplcm9Db3VudHNWaXNpYmxlIGlzIHNldCB0byB0cnVlLCBkdXJhdGlvbnMgd2l0aCB6ZXJvIGNvdW50IHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHJlc3VsdCBzdHJpbmcuXG4gICBCeSBkZWZhdWx0LCB6ZXJvQ291bnRzVmlzaWJsZSBpcyBzZXQgdG8gZmFsc2UuXG4gICBAcGFyYW0ge2Jvb2xlYW59IHplcm9Db3VudHNWaXNpYmxlIC0gRGV0ZXJtaW5lcyB0aGUgdmlzaWJpbGl0eSBvZiB6ZXJvIGNvdW50IGR1cmF0aW9ucyBpbiB0aGUgZmluYWwgcmVzdWx0IHN0cmluZy5cbiAgICovXG4gIHNldFplcm9WaXNpYmlsaXR5KHplcm9Db3VudHNWaXNpYmxlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLnplcm9zVmlzaWJsZSA9IHplcm9Db3VudHNWaXNpYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldER1cmF0aW9uU3RyaW5nKCkgZ2VuZXJhdGVzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkdXJhdGlvbixcbiAgICogdGFraW5nIGludG8gYWNjb3VudCBvcHRpb25zIHN1Y2ggYXMgc2hvcnRIYW5kLCBqb2luZXIgYW5kIG1pbmltdW1EaWdpdHMuXG4gICAqIEl0IGluY2x1ZGVzIG9ubHkgbm9uLXplcm8gdmFsdWVzLCB1bmxlc3MgemVyb0NvdW50c1Zpc2libGUgaXMgc2V0IHRvIHRydWUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9ICAtIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkdXJhdGlvblxuICAgKi9cbiAgZ2V0RHVyYXRpb25TdHJpbmcoKSB7XG4gICAgbGV0IGVudGl0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5Vbml0SGFzaCkuZm9yRWFjaCgoaEtleSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XSkgcmV0dXJuO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJzZUludCh0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XS5jb3VudCkgPT0gMCAmJlxuICAgICAgICAhdGhpcy56ZXJvc1Zpc2libGVcbiAgICAgIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBlbnRpdGllcy5wdXNoKFxuICAgICAgICB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XS5jb3VudCArXG4gICAgICAgICAgKHRoaXMuc2hvcnRIYW5kID8gJycgOiAnICcpICtcbiAgICAgICAgICB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XS51bml0XG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiBlbnRpdGllcy5qb2luKHRoaXMuam9pbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRVbml0V2l0aENhcGl0YWxMZXR0ZXIgLSBmdW5jdGlvbiB0byBzZXQgdGhlIHVuaXQgdHlwZSBpbiB0aGUgZHVyYXRpb24gc3RyaW5nIHRvIGJlIGNhcGl0YWxpemVkXG4gICAqIEBwYXJhbSB1bml0V2l0aENhcGl0YWxMZXR0ZXIgLSB3aGV0aGVyIHRvIHVzZSBjYXBpdGFsIGxldHRlciB1bml0IG9yIG5vdCAoZGVmYXVsdCBmYWxzZSlcbiAgICovXG4gIHNldFVuaXRXaXRoQ2FwaXRhbExldHRlcih1bml0V2l0aENhcGl0YWxMZXR0ZXI6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICghdW5pdFdpdGhDYXBpdGFsTGV0dGVyKSByZXR1cm47XG5cbiAgICBPYmplY3QudmFsdWVzKHRoaXMuVW5pdEhhc2gpLmZvckVhY2goKGhLZXkpID0+IHtcbiAgICAgIGlmICghdGhpcy5kdXJhdGlvbkVudGl0eUhhc2hbaEtleV0pIHJldHVybjtcbiAgICAgIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoW2hLZXldLnVuaXQgPSB0aGlzLmNhcGl0YWxpemUoXG4gICAgICAgIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoW2hLZXldLnVuaXRcbiAgICAgICkgYXNcbiAgICAgICAgfCBDYXBpdGFsUGx1cmFsRHVyYXRpb25FbnRpdHlUeXBlXG4gICAgICAgIHwgQ2FwaXRhbFNpbmd1bGFyRHVyYXRpb25FbnRpdHlUeXBlXG4gICAgICAgIHwgQ2FwaXRhbER1cmF0aW9uRW50aXR5QWJicmV2aWF0aW9uTW9kZWw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldER1cmF0aW9uRW50aXR5SGFzaChlcG9jaHNJblNlY29uZHM6IG51bWJlcikge1xuICAgIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoID0ge1xuICAgICAgeWVhcjoge1xuICAgICAgICBjb3VudDogTWF0aC5mbG9vcihlcG9jaHNJblNlY29uZHMgLyA2MCAvIDYwIC8gMjQgLyAzNjUpLnRvU3RyaW5nKCksXG4gICAgICAgIHVuaXQ6ICd5ZWFycycsXG4gICAgICB9LFxuICAgICAgZGF5OiB7XG4gICAgICAgIGNvdW50OiBNYXRoLmZsb29yKChlcG9jaHNJblNlY29uZHMgLyA2MCAvIDYwIC8gMjQpICUgMzY1KS50b1N0cmluZygpLFxuICAgICAgICB1bml0OiAnZGF5cycsXG4gICAgICB9LFxuICAgICAgaG91cjoge1xuICAgICAgICBjb3VudDogTWF0aC5mbG9vcigoZXBvY2hzSW5TZWNvbmRzIC8gNjAgLyA2MCkgJSAyNCkudG9TdHJpbmcoKSxcbiAgICAgICAgdW5pdDogJ2hvdXJzJyxcbiAgICAgIH0sXG4gICAgICBtaW51dGU6IHtcbiAgICAgICAgY291bnQ6IE1hdGguZmxvb3IoKGVwb2Noc0luU2Vjb25kcyAvIDYwKSAlIDYwKS50b1N0cmluZygpLFxuICAgICAgICB1bml0OiAnbWludXRlcycsXG4gICAgICB9LFxuICAgICAgc2Vjb25kOiB7XG4gICAgICAgIGNvdW50OiBNYXRoLmZsb29yKGVwb2Noc0luU2Vjb25kcyAlIDYwKS50b1N0cmluZygpLFxuICAgICAgICB1bml0OiAnc2Vjb25kcycsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHNldFJlc3BlY3RpdmVGb3JtcygpIHtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuVW5pdEhhc2gpLmZvckVhY2goKGhLZXkpID0+IHtcbiAgICAgIGlmICghdGhpcy5kdXJhdGlvbkVudGl0eUhhc2hbaEtleV0pIHJldHVybjtcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtoS2V5XS5jb3VudCkgIT0gMSkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMuc2hvcnRIYW5kKSByZXR1cm47XG5cbiAgICAgIHRoaXMuZHVyYXRpb25FbnRpdHlIYXNoW2hLZXldLnVuaXQgPSB0aGlzLmR1cmF0aW9uRW50aXR5SGFzaFtcbiAgICAgICAgaEtleVxuICAgICAgXS51bml0LnNsaWNlKDAsIC0xKSBhcyBTbWFsbFNpbmd1bGFyRHVyYXRpb25FbnRpdHlUeXBlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXBlYXRTdHJpbmdOdW1UaW1lcyhzdHI6IHN0cmluZywgdGltZXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHRpbWVzIDw9IDApIHJldHVybiAnJztcbiAgICByZXR1cm4gc3RyICsgdGhpcy5yZXBlYXRTdHJpbmdOdW1UaW1lcyhzdHIsIHRpbWVzIC0gMSk7XG4gIH1cblxuICBwcml2YXRlIGNhcGl0YWxpemUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xuICB9XG59XG4iXX0=