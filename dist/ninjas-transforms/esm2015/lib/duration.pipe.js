import { Pipe } from '@angular/core';
import { DurationAdjustmentLayer, } from './utils/duration/duration-adjustment-layer';
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
export class DurationPipe {
    transform(epochsInSeconds, limitTo = 'seconds', shortHand = false, minDigits = null, showZero = false, unitWithCapitalLetter = false, entityJoiner = ' ') {
        const durationAdjustmentLayer = new DurationAdjustmentLayer(epochsInSeconds);
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
DurationPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DurationPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, name: "duration" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DurationPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'duration',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25pbmphcy10cmFuc2Zvcm1zL3NyYy9saWIvZHVyYXRpb24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsdUJBQXVCLEdBRXhCLE1BQU0sNENBQTRDLENBQUM7O0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBS0gsTUFBTSxPQUFPLFlBQVk7SUFDaEIsU0FBUyxDQUNkLGVBQXVCLEVBQ3ZCLFVBQXlDLFNBQVMsRUFDbEQsWUFBcUIsS0FBSyxFQUMxQixZQUEyQixJQUFJLEVBQy9CLFdBQW9CLEtBQUssRUFDekIsd0JBQWlDLEtBQUssRUFDdEMsZUFBdUIsR0FBRztRQUUxQixNQUFNLHVCQUF1QixHQUFHLElBQUksdUJBQXVCLENBQ3pELGVBQWUsQ0FDaEIsQ0FBQztRQUNGLGdCQUFnQjtRQUNoQix1QkFBdUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELHVCQUF1QixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsdUJBQXVCLENBQUMsd0JBQXdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV4RSxPQUFPLHVCQUF1QixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDckQsQ0FBQzs7MEdBdkJVLFlBQVk7d0dBQVosWUFBWTs0RkFBWixZQUFZO2tCQUh4QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIER1cmF0aW9uQWRqdXN0bWVudExheWVyLFxuICBTbWFsbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZSxcbn0gZnJvbSAnLi91dGlscy9kdXJhdGlvbi9kdXJhdGlvbi1hZGp1c3RtZW50LWxheWVyJztcblxuLyoqXG4gKiBEdXJhdGlvblBpcGUgaXMgYW4gYW5ndWxhciBwaXBlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZm9ybWF0IGR1cmF0aW9uIGluIHNlY29uZHMgaW4gYSByZWFkYWJsZSBzdHJpbmcgZm9ybWF0LlxuICogVGhlIGR1cmF0aW9uIGlzIHByb3ZpZGVkIGluIGVwb2Noc0luU2Vjb25kcyBhbmQgaXQgY2FuIGJlIHRyYW5zZm9ybWVkIGludG8gZGlmZmVyZW50XG4gKiBmb3JtYXRzIGxpa2UgbWludXRlcywgaG91cnMsIGRheXMsIGV0Yy5cbiAqXG4gKiBsaW1pdFRvOiBzcGVjaWZ5IHRoZSBoaWdoZXN0IGVudGl0eSB0aGF0IHNob3VsZCBiZSBzaG93biBpbiB0aGUgZHVyYXRpb24gc3RyaW5nLlxuICogc2hvcnRIYW5kOiB3aGV0aGVyIG9yIG5vdCB0byB1c2UgYWJicmV2aWF0ZWQgZm9ybSBvZiBlbnRpdGllcywgc3VjaCBhcyBcInNcIiBmb3IgXCJzZWNvbmRzXCIuXG4gKiBtaW5EaWdpdHM6IG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBzaG93WmVybzogc2hvdyBlbnRpdHkgZXZlbiBpZiB0aGUgdmFsdWUgaXMgMC5cbiAqIHVuaXRXaXRoQ2FwaXRhbExldHRlcjogc2hvdyB1bml0IHdpdGggYSBjYXBpdGFsIGxldHRlciwgc3VjaCBhcyBcIlNlY29uZHNcIi5cbiAqIGVudGl0eUpvaW5lcjogdGhlIHN0cmluZyB1c2VkIHRvIGpvaW4gZGlmZmVyZW50IGVudGl0aWVzIGluIHRoZSBkdXJhdGlvbiBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiA8cD57eyBlcG9jaHNJblNlY29uZHMgfCBkdXJhdGlvbiB9fTwvcD5cbiAqIDxwPnt7IGVwb2Noc0luU2Vjb25kcyB8IGR1cmF0aW9uOiAnbWludXRlcyc6IHRydWU6IDI6IHRydWU6IHRydWU6ICcsJyB9fTwvcD5cbiAqL1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkdXJhdGlvbicsXG59KVxuZXhwb3J0IGNsYXNzIER1cmF0aW9uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwdWJsaWMgdHJhbnNmb3JtKFxuICAgIGVwb2Noc0luU2Vjb25kczogbnVtYmVyLFxuICAgIGxpbWl0VG86IFNtYWxsUGx1cmFsRHVyYXRpb25FbnRpdHlUeXBlID0gJ3NlY29uZHMnLFxuICAgIHNob3J0SGFuZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIG1pbkRpZ2l0czogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4gICAgc2hvd1plcm86IGJvb2xlYW4gPSBmYWxzZSxcbiAgICB1bml0V2l0aENhcGl0YWxMZXR0ZXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBlbnRpdHlKb2luZXI6IHN0cmluZyA9ICcgJ1xuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGR1cmF0aW9uQWRqdXN0bWVudExheWVyID0gbmV3IER1cmF0aW9uQWRqdXN0bWVudExheWVyKFxuICAgICAgZXBvY2hzSW5TZWNvbmRzXG4gICAgKTtcbiAgICAvLyBPUkRFUiBNQVRURVJTXG4gICAgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIuc2V0TGltaXQobGltaXRUbyk7XG4gICAgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIuc2V0Sm9pbmVyKGVudGl0eUpvaW5lcik7XG4gICAgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIuc2V0U2hvcnRIYW5kKHNob3J0SGFuZCk7XG4gICAgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIuc2V0TWluaW11bURpZ2l0cyhtaW5EaWdpdHMpO1xuICAgIGR1cmF0aW9uQWRqdXN0bWVudExheWVyLnNldFplcm9WaXNpYmlsaXR5KHNob3daZXJvKTtcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRKb2luZXIoZW50aXR5Sm9pbmVyKTtcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRVbml0V2l0aENhcGl0YWxMZXR0ZXIodW5pdFdpdGhDYXBpdGFsTGV0dGVyKTtcblxuICAgIHJldHVybiBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5nZXREdXJhdGlvblN0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIER1cmF0aW9uTGltaXQgPSBTbWFsbFBsdXJhbER1cmF0aW9uRW50aXR5VHlwZTtcbiJdfQ==