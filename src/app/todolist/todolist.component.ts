import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import {Subscription} from "rxjs";
import {DashboardComponent} from '../dashboard/dashboard.component'
import {ItemService} from "../item.service";
import {Item} from "../item";


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  @Input() todolist: Todolist = {id: 0, title: "", color: "", items:[]};

  todolists$: Subscription = new Subscription();
  items: Item[] = []

  constructor(private router: Router,
              private todolistService: TodolistService,
              private dashboardComponent: DashboardComponent,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems()
  }

  detail(id: number) {
    this.router.navigate(['/todolist', id]);
  }

  ngOnDestroy(): void {
    this.todolists$.unsubscribe();
  }


  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['todolist/todolist/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.dashboardComponent.delete(id)
  }

  getItems(): void{
    this.itemService.getItems(this.todolist.id.toString()).subscribe(data => {
      this.items = data;
    });
  }

}
