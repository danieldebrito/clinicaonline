import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DenegadoComponent } from './denegado.component';

const routes: Routes = [{ path: '', component: DenegadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenegadoRoutingModule { }
