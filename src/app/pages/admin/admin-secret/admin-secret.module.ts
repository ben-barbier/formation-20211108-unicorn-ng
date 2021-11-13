import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSecretRoutingModule } from './admin-secret-routing.module';
import { AdminSecretComponent } from './admin-secret.component';

@NgModule({
  declarations: [AdminSecretComponent],
  imports: [CommonModule, AdminSecretRoutingModule],
})
export class AdminSecretModule {}
