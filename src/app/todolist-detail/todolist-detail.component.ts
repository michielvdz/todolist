import {Component, OnDestroy, OnInit} from '@angular/core';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {Item} from "../item";
import {Subject, Subscription} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";



@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.scss']
})
export class TodolistDetailComponent implements OnInit,OnDestroy {
  todolist: Todolist = { id: 0, title: "", color: "", items:[] };
  items: Item[] = []

  items$: Subscription = new Subscription();
  deleteitems$: Subscription = new Subscription();

  errorMessage: string = '';
  alert: boolean = false;
  itemId: number = 0;
  deleteItemId: number = 0;
  itemTitle: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  private item: any;
  todolistId:string | null = '';


  constructor(private todolistService: TodolistService,
              public itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.todolistId = this.route.snapshot.paramMap.get('id');
    this.getItems()

    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
      order: [],
      columnDefs: [
        { "orderable": false, "targets": 2 }
      ],

    };
  }

  ngOnDestroy(): void {
    var i = 0
    for (this.item of this.items){
      this.item.order = i
      this.itemService.putItem(this.item.id, this.item).subscribe(result => {
          //all went well
        },
        error => {
          this.errorMessage = error.message;
        });
      i++
    }
    this.dtTrigger.unsubscribe();
  }

  showAlert(id: number, title: string): void {
    this.deleteItemId = id;
    this.itemTitle = title;
    this.alert = true;
  }
  hideAlert(): void {
    this.alert = false
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['todolist/item/form'], {state: {mode: 'add', todolistId: this.todolist.id}});
  }

  async edit(id: number) {

    //Navigate to form in edit mode
    await this.router.navigate(['todolist/item/form'], {state: {id: id, mode: 'edit', todolistId: this.todolist.id}});
  }


  async delete(id: number) {
    this.deleteitems$ =await this.itemService.deleteItem(id).subscribe(result => {
      //all went well
      this.getItems2()
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getItems(): void{
    const todolistId = this.route.snapshot.paramMap.get('id');
    if (todolistId != null) {
      this.todolistService.getTodolistById(+todolistId).subscribe(result => this.todolist = result);
    }

    this.itemService.getItems(todolistId).subscribe(data => {
      this.items = data;
      this.dtTrigger.next();
    });
  }

  getItems2(): void{
    const todolistId = this.route.snapshot.paramMap.get('id');
    if (todolistId != null) {
      this.todolistService.getTodolistById(+todolistId).subscribe(result => this.todolist = result);
    }

    this.itemService.getItems(todolistId).subscribe(data => {
      this.items = data;
    });
  }

  async done(item:Item) {

    item.done = !item.done;
    await this.itemService.putItem(item.id, item).subscribe(result => {
        //all went well

      },
      error => {
        this.errorMessage = error.message;
      });
  }

  async onDrop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
