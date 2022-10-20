import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../item';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  todoId: number = 0;

  item$: Subscription = new Subscription();
  postitem$: Subscription = new Subscription();
  putitem$: Subscription = new Subscription();

  // reactive form
  itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    todolistId: new FormControl(0),
    done: new FormControl(0),
    order: new FormControl(0),

  });

  constructor(private router: Router, private itemService: ItemService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = +this.router.getCurrentNavigation()?.extras.state?.id;
    this.todoId = +this.router.getCurrentNavigation()?.extras.state?.todolistId;
    this.getItem();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postitem$.unsubscribe();
    this.putitem$.unsubscribe();
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.itemForm.value.todolistId = this.todoId
      this.postitem$ = await this.itemService.postItem(this.itemForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("/todolist/"+this.todoId);

        },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.putitem$ = await this.itemService.putItem(this.itemId, this.itemForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("/todolist/"+this.todoId);
        },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

  async getItem(){
    if (this.itemId != null && this.itemId > 0) {
      this.item$ = await this.itemService.getItemById(this.itemId).subscribe(result => {
        console.log(result)
        this.itemForm.setValue({
          title: result.title,
          description: result.description,
          date: result.date,
          todolistId: this.todoId,
          done: result.done,
          order: result.order,

        });

      });

    }
  }
}
