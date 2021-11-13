import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnicornsListComponent } from './unicorns-list.component';

const routes: Routes = [{ path: '', component: UnicornsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnicornsListRoutingModule {}
