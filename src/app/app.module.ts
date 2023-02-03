import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NinjasTransformsModule} from "../../projects/ninjas-transforms/src/lib";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NinjasTransformsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
