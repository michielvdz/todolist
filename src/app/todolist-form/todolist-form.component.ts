import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todolist} from '../todolist';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TodolistService} from '../todolist.service';

@Component({
  selector: 'app-todolist-form',
  templateUrl: './todolist-form.component.html',
  styleUrls: ['./todolist-form.component.scss']
})
export class TodolistFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  todolistId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';


  todolist$: Subscription = new Subscription();
  posttodolist$: Subscription = new Subscription();
  puttodolist$: Subscription = new Subscription();

  // reactive form
  todolistForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private todolistService: TodolistService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.todolistId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.todolistId != null && this.todolistId > 0) {
      this.todolist$ = this.todolistService.getTodolistById(this.todolistId).subscribe(result => {
        this.todolistForm.setValue({
          title: result.title,
          color: result.color
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.todolist$.unsubscribe();
    this.posttodolist$.unsubscribe();
    this.puttodolist$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.posttodolist$ = this.todolistService.postTodolist(this.todolistForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("");
        },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      this.puttodolist$ = this.todolistService.putTodolist(this.todolistId, this.todolistForm.value).subscribe(result => {
          //all went well
          this.router.navigateByUrl("");
        },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}
