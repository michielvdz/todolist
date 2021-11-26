import { Component, OnInit } from '@angular/core';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {Item} from "../item";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {waitForAsync} from "@angular/core/testing";


@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.scss']
})
export class TodolistDetailComponent implements OnInit {
  todolist: Todolist = { id: 0, title: "", color: "", items:[] };
  items: Item[] = []

  items$: Subscription = new Subscription();
  deleteitems$: Subscription = new Subscription();

  errorMessage: string = '';
  alert: boolean = false;
  itemId: number = 0;
  deleteItemId: number = 0;
  itemTitle: string = '';



  constructor(private todolistService: TodolistService,public itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const todolistId = this.route.snapshot.paramMap.get('id');
    if (todolistId != null) {
      this.todolistService.getTodolistById(+todolistId).subscribe(result => this.todolist = result);
    }
    this.getItems()
  }

  showAlert(id: number, title: string): void {
    this.deleteItemId = id
    this.itemTitle = title
    this.alert = true
  }
  hideAlert(): void {
    this.alert = false
  }

  noDetail(event: any): void{
    event.stopPropagation()
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['todolist/item/form'], {state: {mode: 'add', todolistId: this.todolist.id}});
  }

  edit(id: number) {

    //Navigate to form in edit mode
    this.router.navigate(['todolist/item/form'], {state: {id: id, mode: 'edit', todolistId: this.todolist.id}});
  }


  async delete() {
    this.deleteitems$ =await this.itemService.deleteItem(this.deleteItemId).subscribe(result => {
      //all went well
      this.getItems();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getItems() {
    this.items$ = this.itemService.getItems().subscribe(result => this.items = result);
    const todolistId = this.route.snapshot.paramMap.get('id');
    if (todolistId != null) {
      this.todolistService.getTodolistById(+todolistId).subscribe(result => this.todolist = result);
    }
  }
}
