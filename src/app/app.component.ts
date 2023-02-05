import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  fg = new FormGroup({
    epochInSeconds: new FormControl(null),
    limitTo: new FormControl('seconds'),
    shortHand: new FormControl(false),
    minDigits: new FormControl(null),
    showZero: new FormControl(false),
    unitWithCapitalLetter: new FormControl(false),
    entityJoiner: new FormControl(' '),
  });
}
