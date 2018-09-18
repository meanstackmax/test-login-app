import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    NgxBootstrapModule
  ],
  exports: [
    CommonModule,
    NgxBootstrapModule
  ],
  declarations: [],
  providers: [
    DataService
  ]
})
export class SharedModule { }
