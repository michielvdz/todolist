import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodolistDetailComponent } from './todolist-detail/todolist-detail.component';

const routes: Routes = [
  {path:'',component: DashboardComponent},
  {path: 'todolist',component: TodolistComponent},
  { path: 'todolist/:id', component: TodolistDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
