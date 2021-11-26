import { Component, OnInit } from '@angular/core';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';


import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  alert: boolean = false;
  deleteTodoId: number = 0
  todolistTitle: string = '';

  todolists$: Observable<Todolist[]> = new Observable<Todolist[]>();
  deleteTodolist$: Subscription = new Subscription();
  private errorMessage: any;

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.getTodolists()
  }

  hideAlert(): void {
    this.alert = false
  }

  delete() {
    this.deleteTodolist$ = this.todolistService.deleteTodolist(this.deleteTodoId).subscribe(result => {
      //all went well
      this.getTodolists();
      console.log('test')
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }
  getTodolists() {
    this.todolists$ = this.todolistService.getTodolists();
  }
}
