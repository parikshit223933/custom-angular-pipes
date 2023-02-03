import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DurationPipe {
    getAbbreviation(s) {
        return s[0];
    }
    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    pluralize(s) {
        return s + 's';
    }
    transform(epochs_in_seconds, limit_to = 'seconds', short_hand = false, append_zero = false, show_zero = false) {
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
                }
                else {
                    durationString += ' ';
                }
            }
            else if (entities[i] === 0 &&
                limit_to === this.pluralize(duration_names[i]) &&
                !durationString) {
                return (short_hand
                    ? 0 + this.getAbbreviation(duration_names[i])
                    : '0 ' + this.capitalize(this.pluralize(duration_names[i]))).trim();
            }
            else if (entities[i] === 0 &&
                isHighestDenominationPresent &&
                show_zero) {
                entityString += '0';
                durationString +=
                    entityString +
                        (short_hand
                            ? this.getAbbreviation(duration_names[i])
                            : ' ' + this.capitalize(duration_names[i]));
                if (limit_to === this.pluralize(duration_names[i])) {
                    return durationString.trim();
                }
                else {
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
DurationPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DurationPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, name: "duration" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'duration',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25pbmphcy10cmFuc2Zvcm1zL3NyYy9saWIvZHVyYXRpb24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsZUFBZSxDQUFDLENBQVM7UUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsVUFBVSxDQUFDLENBQVM7UUFDbEIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxDQUFTO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRU0sU0FBUyxDQUNkLGlCQUF5QixFQUN6QixXQUEwQixTQUFTLEVBQ25DLFVBQVUsR0FBRyxLQUFLLEVBQ2xCLFdBQVcsR0FBRyxLQUFLLEVBQ25CLFNBQVMsR0FBRyxLQUFLO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDakUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FB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QyxDQUFDLENBQUM7Z0JBRWhELElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xELE9BQU8sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxjQUFjLElBQUksR0FBRyxDQUFDO2lCQUN2QjthQUNGO1lBRUQsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDOUI7U0FDRjtRQUVELE9BQU8sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7OzBHQTdGVSxZQUFZO3dHQUFaLFlBQVk7NEZBQVosWUFBWTtrQkFIeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2R1cmF0aW9uJyxcbn0pXG5leHBvcnQgY2xhc3MgRHVyYXRpb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGdldEFiYnJldmlhdGlvbihzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc1swXTtcbiAgfVxuXG4gIGNhcGl0YWxpemUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xuICB9XG5cbiAgcGx1cmFsaXplKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzICsgJ3MnO1xuICB9XG5cbiAgcHVibGljIHRyYW5zZm9ybShcbiAgICBlcG9jaHNfaW5fc2Vjb25kczogbnVtYmVyLFxuICAgIGxpbWl0X3RvOiBEdXJhdGlvbkxpbWl0ID0gJ3NlY29uZHMnLFxuICAgIHNob3J0X2hhbmQgPSBmYWxzZSxcbiAgICBhcHBlbmRfemVybyA9IGZhbHNlLFxuICAgIHNob3dfemVybyA9IGZhbHNlXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgeWVhcnMgPSBNYXRoLmZsb29yKGVwb2Noc19pbl9zZWNvbmRzIC8gNjAgLyA2MCAvIDI0IC8gMzY1KTtcbiAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcigoZXBvY2hzX2luX3NlY29uZHMgLyA2MCAvIDYwIC8gMjQpICUgMzY1KTtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoKGVwb2Noc19pbl9zZWNvbmRzIC8gNjAgLyA2MCkgJSAyNCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKGVwb2Noc19pbl9zZWNvbmRzIC8gNjApICUgNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKGVwb2Noc19pbl9zZWNvbmRzICUgNjApO1xuXG4gICAgbGV0IGR1cmF0aW9uU3RyaW5nID0gJyc7XG5cbiAgICBsZXQgaXNIaWdoZXN0RGVub21pbmF0aW9uUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3QgZW50aXRpZXMgPSBbeWVhcnMsIGRheXMsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzXTtcbiAgICBjb25zdCBkdXJhdGlvbl9uYW1lcyA9IFsneWVhcicsICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJ107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZW50aXR5U3RyaW5nID0gZW50aXRpZXNbaV0udG9TdHJpbmcoKTtcbiAgICAgIGlmIChlbnRpdGllc1tpXSAhPT0gMCkge1xuICAgICAgICBpZiAoIWlzSGlnaGVzdERlbm9taW5hdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBpc0hpZ2hlc3REZW5vbWluYXRpb25QcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50aXRpZXNbaV0gPCAxMCAmJiBhcHBlbmRfemVybykge1xuICAgICAgICAgIGVudGl0eVN0cmluZyA9ICcwJyArIGVudGl0eVN0cmluZztcbiAgICAgICAgfVxuICAgICAgICBkdXJhdGlvblN0cmluZyArPVxuICAgICAgICAgIGVudGl0eVN0cmluZyArXG4gICAgICAgICAgKHNob3J0X2hhbmRcbiAgICAgICAgICAgID8gdGhpcy5nZXRBYmJyZXZpYXRpb24oZHVyYXRpb25fbmFtZXNbaV0pXG4gICAgICAgICAgICA6ICcgJyArIHRoaXMuY2FwaXRhbGl6ZShkdXJhdGlvbl9uYW1lc1tpXSkpO1xuXG4gICAgICAgIGlmICghc2hvcnRfaGFuZCkge1xuICAgICAgICAgIGR1cmF0aW9uU3RyaW5nICs9XG4gICAgICAgICAgICBlbnRpdHlTdHJpbmcgPT09ICcwMScgfHwgZW50aXR5U3RyaW5nID09PSAnMScgPyAnJyA6ICdzJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaW1pdF90byA9PT0gdGhpcy5wbHVyYWxpemUoZHVyYXRpb25fbmFtZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGR1cmF0aW9uU3RyaW5nLnRyaW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdXJhdGlvblN0cmluZyArPSAnICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGVudGl0aWVzW2ldID09PSAwICYmXG4gICAgICAgIGxpbWl0X3RvID09PSB0aGlzLnBsdXJhbGl6ZShkdXJhdGlvbl9uYW1lc1tpXSkgJiZcbiAgICAgICAgIWR1cmF0aW9uU3RyaW5nXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBzaG9ydF9oYW5kXG4gICAgICAgICAgICA/IDAgKyB0aGlzLmdldEFiYnJldmlhdGlvbihkdXJhdGlvbl9uYW1lc1tpXSlcbiAgICAgICAgICAgIDogJzAgJyArIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLnBsdXJhbGl6ZShkdXJhdGlvbl9uYW1lc1tpXSkpXG4gICAgICAgICkudHJpbSgpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZW50aXRpZXNbaV0gPT09IDAgJiZcbiAgICAgICAgaXNIaWdoZXN0RGVub21pbmF0aW9uUHJlc2VudCAmJlxuICAgICAgICBzaG93X3plcm9cbiAgICAgICkge1xuICAgICAgICBlbnRpdHlTdHJpbmcgKz0gJzAnO1xuICAgICAgICBkdXJhdGlvblN0cmluZyArPVxuICAgICAgICAgIGVudGl0eVN0cmluZyArXG4gICAgICAgICAgKHNob3J0X2hhbmRcbiAgICAgICAgICAgID8gdGhpcy5nZXRBYmJyZXZpYXRpb24oZHVyYXRpb25fbmFtZXNbaV0pXG4gICAgICAgICAgICA6ICcgJyArIHRoaXMuY2FwaXRhbGl6ZShkdXJhdGlvbl9uYW1lc1tpXSkpO1xuXG4gICAgICAgIGlmIChsaW1pdF90byA9PT0gdGhpcy5wbHVyYWxpemUoZHVyYXRpb25fbmFtZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGR1cmF0aW9uU3RyaW5nLnRyaW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdXJhdGlvblN0cmluZyArPSAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpbWl0X3RvID09PSB0aGlzLnBsdXJhbGl6ZShkdXJhdGlvbl9uYW1lc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uU3RyaW5nLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHVyYXRpb25TdHJpbmcudHJpbSgpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIER1cmF0aW9uTGltaXQgPSAneWVhcnMnIHwgJ2RheXMnIHwgJ2hvdXJzJyB8ICdtaW51dGVzJyB8ICdzZWNvbmRzJztcbiJdfQ==