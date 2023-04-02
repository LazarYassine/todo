import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import todo from 'src/models/todo';
import { TodoServiceService } from 'src/services/todo-service.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  term = ''
  p= 1
  txtTodo: string = ""
  modeEdit = false
  AddMode = false
  todos : any

  myTodo: todo = {
    id : '',
    todo: '',
    completed: false
  }

  count = 0

  constructor(private todoServie: TodoServiceService) { }

  ngOnInit(): void {
  
    this.getTodos()
    console.log(this.todos)
    
  }

  getTodos() {
    return this.todoServie.getTodos().subscribe(
      (data) => { this.todos = data; console.log(this.todos.length) }
    )
  }

  getTodo(txtTodo: string) {
    this.txtTodo = txtTodo
    // return this.todoServie.getTodos().subscribe(
    //   (data) => { 
    //     this.myTodo.id = data.length
    //   }
  //)
    //this.myTodo.id = this.count

    // this.todoServie.getTodos().subscribe(

    //   (data) => {this.todos = data}
    // )
    this.myTodo.id = this.todos.length + 1
    this.myTodo.todo = txtTodo
    console.log(this.myTodo)    
    this.todoServie.addTodo(this.todos).subscribe()
    this.getTodos()
  }
 
  deleteTask(todo: todo){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.todoServie.deleteTodo(todo).subscribe(
          (data) => this.getTodos()
        )

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'The Task has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Taks has not been deleted :)',
          'error'
        )
      }
    })
  }

  AddNewTask(){
    if( this.AddMode == false ) {
      this.AddMode = true
      Swal.fire(
        'Add Mode!',
        'Adding Mode Activated!',
        'success'
      )
    }
    else if( this.txtTodo != ""  || this.txtTodo != undefined ) {
      this.myTodo.id = this.todos.length + 1
      this.myTodo.todo = this.txtTodo
      this.AddTask()
    }
    else {
      this.AddMode = false
    }
  }

  AddTask() {
    this.todoServie.addTodo(this.myTodo).subscribe(
      () => this.getTodos()
    )
  }


  ActiveEdit(todo: todo) {
    //this.modeEdit = !this.modeEdit
    var id = `todo_${todo.id}`
    window.document.getElementById(id).style.display = 'inherit'
    window.document.getElementById(`task_${todo.id}`).style.display = 'none'
    window.document.getElementById(id).style.color = 'black'
    //this.getTodos()
  }

  DisctiveEdit(todo: todo){
    var id = `todo_${todo.id}`
    window.document.getElementById(id).style.display = 'none'
    window.document.getElementById(`task_${todo.id}`).style.display = 'inherit'
    window.document.getElementById(id).style.color = 'black'

    let newTodo: todo = this.todos.find((element) => element.id = todo.id )
    newTodo.todo = ( document.getElementById(id) as HTMLInputElement ).value
    console.log(newTodo)
    this.todoServie.editTodo(newTodo).subscribe( () => this.getTodos() )
    //this.getTodos()
  }

}
