import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EditUnicornComponent } from './unicorn-card/edit-unicorn/edit-unicorn.component';
import { UnicornCardComponent } from './unicorn-card/unicorn-card.component';
import { UnicornsListRoutingModule } from './unicorns-list-routing.module';
import { UnicornsListComponent } from './unicorns-list.component';

@NgModule({
  declarations: [UnicornsListComponent, UnicornCardComponent, EditUnicornComponent],
  imports: [CommonModule, UnicornsListRoutingModule, SharedModule],
})
export class UnicornsListModule {}
