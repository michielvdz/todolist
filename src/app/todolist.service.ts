import { Injectable } from '@angular/core';
import { Todolist } from './todolist';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private httpClient: HttpClient) {
  }

  getTodolists(): Observable<Todolist[]> {
    return this.httpClient.get<Todolist[]>("http://localhost:3000/todolists?_embed=items");
  }

  getTodolistById(id: number): Observable<Todolist> {
    return this.httpClient.get<Todolist>("http://localhost:3000/todolists/" + id + "?_embed=items");
  }
}
