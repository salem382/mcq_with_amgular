import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatrialModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserModule
  ],
  exports:[
    HttpClientModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    MatrialModule,
    CommonModule,
    NavbarComponent
  ]
})
export class SharedModule { }
