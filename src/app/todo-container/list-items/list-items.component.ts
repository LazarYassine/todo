import { Component, Input, OnInit } from '@angular/core';
import todo from 'src/models/todo';
import { TodoServiceService } from 'src/services/todo-service.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  todos!: any
  modeEdit: boolean = false 
  @Input() txtTodo: string = ''
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.getTodos()
  }

  

  getTodos() {
    return this.todoService.getTodos().subscribe(
      (data) => this.todos = data
    )
  }

  ActiveEditMode() {
    this.modeEdit ? this.modeEdit = false : this.modeEdit = true
  }

TestEvent(txtTodo: string) {
    alert(txtTodo)
}

AddTodo(todo?: todo) {
    //this.todoService.addTodo(todo).subscribe()
  }

}
