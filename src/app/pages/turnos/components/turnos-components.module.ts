import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { TurnosGridComponent } from './turnos-grid/turnos-grid.component';
import { TurnoDetalleComponent } from './turno-detalle/turno-detalle.component';
import { EspecialidadesModule } from '../../especialidades/especialidades.module';
import { FormsModule } from '@angular/forms';
import { TurnosGeneradorDiasComponent } from './turnos-generador-dias/turnos-generador-dias.component';
import { TurnoCardDiaComponent } from './turno-card-dia/turno-card-dia.component';
import { TurnosListadoComponent } from './turnos-listado/turnos-listado.component';
import { TurnoCardHorarioComponent } from './turno-card-dia-horario/turno-card-dia-horario.component';
import { TurnoCardComponent } from './turno-card/turno-card.component';
import { TurnoCardDetalleComponent } from './turno-card-detalle/turno-card-detalle.component';
import { TurnosGrisHorariosComponent } from './turnos-gris-horarios/turnos-gris-horarios.component';
import { AppStarRatingComponent } from './app-star-rating/app-star-rating.component';
import { EspecialistaComponentsModule } from '../../especialistas/components/especialista-components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnoDetalleComponent,
    TurnosGeneradorDiasComponent,
    TurnoCardDiaComponent,
    TurnosListadoComponent,
    TurnoCardHorarioComponent,
    TurnoCardComponent,
    TurnoCardDetalleComponent,
    TurnosGrisHorariosComponent,
    AppStarRatingComponent
  ],
  imports: [
    CommonModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    FormsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnoDetalleComponent,
    TurnosGeneradorDiasComponent,
    TurnoCardDiaComponent,
    TurnosListadoComponent,
    TurnoCardHorarioComponent,
    TurnoCardComponent,
    TurnoCardDetalleComponent,
    TurnosGrisHorariosComponent
  ]
})
export class TurnosComponentsModule { }
