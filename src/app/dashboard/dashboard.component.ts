import { Component, OnInit } from '@angular/core';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todolists$: Observable<Todolist[]> = new Observable<Todolist[]>();

  constructor(private todolistService: TodolistService) { }

  ngOnInit(): void {
    this.todolists$ = this.todolistService.getTodolists()
  }

}
