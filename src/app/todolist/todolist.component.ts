import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import {Subscription} from "rxjs";
import {DashboardComponent} from '../dashboard/dashboard.component'


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  @Input() todolist: Todolist = {id: 0, title: "", color: "", items:[]};
  todolists: Todolist[] = [];
  alert: boolean = false;
  deleteTodoId: number = 0
  todolistTitle: string = '';

  todolists$: Subscription = new Subscription();
  deleteTodolist$: Subscription = new Subscription();
  private errorMessage: string = '';

  constructor(private router: Router, private todolistService: TodolistService, private dashboardComponent: DashboardComponent) { }

  ngOnInit(): void {
    this.getTodolists(1)
  }

  detail(id: number) {
    this.router.navigate(['/todolist', id]);
  }

  ngOnDestroy(): void {
    this.todolists$.unsubscribe();
    this.deleteTodolist$.unsubscribe();
  }


  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todolist/todolist/form'], {state: {id: id, mode: 'edit'}});
  }

  showAlert(id: number, title: string): void {
    this.dashboardComponent.deleteTodoId = id
    this.dashboardComponent.todolistTitle = title
    this.dashboardComponent.alert = true
  }


  getTodolists(id : number) {
    this.todolists$ = this.todolistService.getTodolists().subscribe(result => this.todolists = result);
    console.log('test2')
  }

}
