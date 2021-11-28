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
  todolists$: Observable<Todolist[]> = new Observable<Todolist[]>();
  private errorMessage: any;
  deleteTodolist$: Subscription = new Subscription();

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.getTodolists()
  }

  getTodolists() {
    this.todolists$ = this.todolistService.getTodolists();
  }

  delete(id: number) {
    this.deleteTodolist$ = this.todolistService.deleteTodolist(id).subscribe(result => {
      //all went well
      this.getTodolists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }


}
