import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JornadaRoutingModule } from './jornada-routing.module';
import { JornadaComponent } from './jornada.component';
import { EspecialidadesModule } from '../../../especialidades/especialidades.module';
import { JornadaItemComponent } from './components/jornada-item/jornada-item.component';
import { EspecialistaComponentsModule } from '../../components/especialista-components.module';


@NgModule({
  declarations: [
    JornadaComponent,
    JornadaItemComponent
  ],
  imports: [
    CommonModule,
    JornadaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialidadesModule,
    EspecialistaComponentsModule
  ],
  exports: [
    JornadaComponent
  ]
})
export class JornadaModule { }
