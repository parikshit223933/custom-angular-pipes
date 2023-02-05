import { Pipe } from '@angular/core';
import { DurationAdjustmentLayer, } from './utils/duration/duration-adjustment-layer';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25pbmphcy10cmFuc2Zvcm1zL3NyYy9saWIvZHVyYXRpb24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsdUJBQXVCLEdBRXhCLE1BQU0sNENBQTRDLENBQUM7O0FBS3BELE1BQU0sT0FBTyxZQUFZO0lBQ2hCLFNBQVMsQ0FDZCxlQUF1QixFQUN2QixVQUF5QyxTQUFTLEVBQ2xELFlBQXFCLEtBQUssRUFDMUIsWUFBMkIsSUFBSSxFQUMvQixXQUFvQixLQUFLLEVBQ3pCLHdCQUFpQyxLQUFLLEVBQ3RDLGVBQXVCLEdBQUc7UUFFMUIsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixDQUN6RCxlQUFlLENBQ2hCLENBQUM7UUFDRixnQkFBZ0I7UUFDaEIsdUJBQXVCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsdUJBQXVCLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELHVCQUF1QixDQUFDLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFeEUsT0FBTyx1QkFBdUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7OzBHQXZCVSxZQUFZO3dHQUFaLFlBQVk7NEZBQVosWUFBWTtrQkFIeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEdXJhdGlvbkFkanVzdG1lbnRMYXllcixcbiAgU21hbGxQbHVyYWxEdXJhdGlvbkVudGl0eVR5cGUsXG59IGZyb20gJy4vdXRpbHMvZHVyYXRpb24vZHVyYXRpb24tYWRqdXN0bWVudC1sYXllcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2R1cmF0aW9uJyxcbn0pXG5leHBvcnQgY2xhc3MgRHVyYXRpb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHB1YmxpYyB0cmFuc2Zvcm0oXG4gICAgZXBvY2hzSW5TZWNvbmRzOiBudW1iZXIsXG4gICAgbGltaXRUbzogU21hbGxQbHVyYWxEdXJhdGlvbkVudGl0eVR5cGUgPSAnc2Vjb25kcycsXG4gICAgc2hvcnRIYW5kOiBib29sZWFuID0gZmFsc2UsXG4gICAgbWluRGlnaXRzOiBudW1iZXIgfCBudWxsID0gbnVsbCxcbiAgICBzaG93WmVybzogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHVuaXRXaXRoQ2FwaXRhbExldHRlcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGVudGl0eUpvaW5lcjogc3RyaW5nID0gJyAnXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIgPSBuZXcgRHVyYXRpb25BZGp1c3RtZW50TGF5ZXIoXG4gICAgICBlcG9jaHNJblNlY29uZHNcbiAgICApO1xuICAgIC8vIE9SREVSIE1BVFRFUlNcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRMaW1pdChsaW1pdFRvKTtcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRKb2luZXIoZW50aXR5Sm9pbmVyKTtcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRTaG9ydEhhbmQoc2hvcnRIYW5kKTtcbiAgICBkdXJhdGlvbkFkanVzdG1lbnRMYXllci5zZXRNaW5pbXVtRGlnaXRzKG1pbkRpZ2l0cyk7XG4gICAgZHVyYXRpb25BZGp1c3RtZW50TGF5ZXIuc2V0WmVyb1Zpc2liaWxpdHkoc2hvd1plcm8pO1xuICAgIGR1cmF0aW9uQWRqdXN0bWVudExheWVyLnNldEpvaW5lcihlbnRpdHlKb2luZXIpO1xuICAgIGR1cmF0aW9uQWRqdXN0bWVudExheWVyLnNldFVuaXRXaXRoQ2FwaXRhbExldHRlcih1bml0V2l0aENhcGl0YWxMZXR0ZXIpO1xuXG4gICAgcmV0dXJuIGR1cmF0aW9uQWRqdXN0bWVudExheWVyLmdldER1cmF0aW9uU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRHVyYXRpb25MaW1pdCA9IFNtYWxsUGx1cmFsRHVyYXRpb25FbnRpdHlUeXBlO1xuIl19