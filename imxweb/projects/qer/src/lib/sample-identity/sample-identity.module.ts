import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleIdentitiesComponent } from './sample-identities/sample-identities.component';



@NgModule({
  declarations: [
    SampleIdentitiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SampleIdentitiesComponent
  ]
})
export class SampleIdentityModule { }
