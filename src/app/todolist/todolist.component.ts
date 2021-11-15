import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Todolist } from '../todolist';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  @Input() todolist: Todolist = {id: 0, title: "", color: "", textcolor: "", items:[]};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/todolist', id]);
  }

}
