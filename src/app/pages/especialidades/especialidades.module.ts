import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesComponent } from './especialidades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadesListComponent } from './components/especialidades-list/especialidades-list.component';
import { EspecialidadesGridComponent } from './components/especialidades-grid/especialidades-grid.component';
import { EspecialidadesCardComponent } from './components/especialidades-card/especialidades-card.component';
import { EspecialidadesItemComponent } from './components/especialidades-item/especialidades-item.component';


@NgModule({
  declarations: [
    EspecialidadesComponent,
    EspecialidadesListComponent,
    EspecialidadesGridComponent,
    EspecialidadesCardComponent,
    EspecialidadesItemComponent
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EspecialidadesComponent,
    EspecialidadesListComponent,
    EspecialidadesGridComponent,
    EspecialidadesCardComponent,
    EspecialidadesItemComponent
  ]
})
export class EspecialidadesModule { }
