import { Injectable } from '@angular/core';
import { Todolist } from './todolist';

import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  postTodolist(category: Todolist): Observable<Todolist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Todolist>("http://localhost:3000/todolists", category, {headers: headers});
  }

  putTodolist(id:number, category: Todolist): Observable<Todolist> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Todolist>("http://localhost:3000/todolists/" + id, category, {headers: headers});
  }

  deleteTodolist(id: number): Observable<Todolist> {
    return this.httpClient.delete<Todolist>("http://localhost:3000/todolists/" + id);
  }
}

