import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialistasGridComponent } from './especialistas-grid/especialistas-grid.component';
import { EspecialistaCardComponent } from './especialista-card/especialista-card.component';

@NgModule({
  declarations: [
    EspecialistasGridComponent,
    EspecialistaCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EspecialistasGridComponent,
    EspecialistaCardComponent
  ]
})
export class EspecialistaComponentsModule { }
