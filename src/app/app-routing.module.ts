import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodolistDetailComponent } from './todolist-detail/todolist-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { TodolistFormComponent } from './todolist-form/todolist-form.component';


const routes: Routes = [
  {path:'',component: DashboardComponent},
  {path: 'todolist',component: TodolistComponent},
  { path: 'todolist/:id', component: TodolistDetailComponent },
  { path: 'todolist/item/form', component: ItemFormComponent },
  { path: 'todolist/todolist/form', component: TodolistFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
