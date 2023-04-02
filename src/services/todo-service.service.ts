import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import todo from 'src/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) { }


  //host: any = "http://localhost:3000/" 
  host: any = "https://frightened-rose-salamander.cyclic.app/"


  getTodos():Observable<todo[]> {
    return this.http.get<todo[]>(this.host + "todos")
  }

  addTodo(todo: todo) {
    return this.http.post(this.host + "todos", todo)
  }

  deleteTodo(todo: todo) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: todo,
    };

    return this.http.delete(this.host + "todos/" + todo.id )

  }

  editTodo(todo:todo) {
    return this.http.put(this.host + "todos/" + todo.id, todo )
  }

}
