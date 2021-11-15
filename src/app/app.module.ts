import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodolistComponent } from './todolist/todolist.component';

import { HttpClientModule } from '@angular/common/http';
import { TodolistDetailComponent } from './todolist-detail/todolist-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodolistComponent,
    TodolistDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
