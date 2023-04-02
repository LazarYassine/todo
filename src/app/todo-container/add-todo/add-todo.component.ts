import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  txtTodo: string = ""
  @Output() todoEvent = new EventEmitter<string>()
  
  constructor() { }


  ngOnInit(): void {
  }

  AddTodo() {
    this.todoEvent.emit(this.txtTodo)
  }

}
