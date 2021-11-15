import { Component, OnInit } from '@angular/core';
import { Todolist } from '../todolist';
import { TodolistService } from '../todolist.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.scss']
})
export class TodolistDetailComponent implements OnInit {
  todolist: Todolist = { id: 0, title: "", color: "", textcolor: "", items:[] };

  constructor(private todolistService: TodolistService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const todolistId = this.route.snapshot.paramMap.get('id');
    if (todolistId != null) {
      this.todolistService.getTodolistById(+todolistId).subscribe(result => this.todolist = result);
    }
  }
}
