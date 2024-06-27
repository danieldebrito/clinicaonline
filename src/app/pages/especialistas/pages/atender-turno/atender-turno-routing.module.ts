import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtenderTurnoComponent } from './atender-turno.component';

const routes: Routes = [{ path: '', component: AtenderTurnoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtenderTurnoRoutingModule { }
