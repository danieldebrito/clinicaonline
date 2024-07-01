import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialistasGridComponent } from './especialistas-grid/especialistas-grid.component';
import { EspecialistaCardComponent } from './especialista-card/especialista-card.component';
import { EspecialistaFichaComponent } from './especialista-ficha/especialista-ficha.component';

@NgModule({
  declarations: [
    EspecialistasGridComponent,
    EspecialistaCardComponent,
    EspecialistaFichaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EspecialistasGridComponent,
    EspecialistaCardComponent,
    EspecialistaFichaComponent
  ]
})
export class EspecialistaComponentsModule { }
