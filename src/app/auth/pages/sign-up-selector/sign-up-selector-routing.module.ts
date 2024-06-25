import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpSelectorComponent } from './sign-up-selector.component';

const routes: Routes = [{ path: '', component: SignUpSelectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpSelectorRoutingModule { }
