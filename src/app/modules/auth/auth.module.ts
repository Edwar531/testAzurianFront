import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
