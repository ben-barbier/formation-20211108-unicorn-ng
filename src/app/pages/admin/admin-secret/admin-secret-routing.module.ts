import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSecretComponent } from './admin-secret.component';

const routes: Routes = [{ path: '', component: AdminSecretComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSecretRoutingModule {}
