import { Component } from '@angular/core';
import { todo } from 'src/app/Todo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  todos: todo[] = [];
  todoItem: any = localStorage.getItem('todo');
  
  constructor() {
    if (this.todoItem === null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.todoItem);
    }
  }

  DeleteTodo(todoData: todo) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Delete! <i class="bi bi-hand-thumbs-up-fill"></i>',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel <i class="bi bi-hand-thumbs-down-fill"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todos.splice(this.todos.indexOf(todoData), 1);
        for (const key in this.todos) {
          this.todos[key].sno = parseInt(key) + 1;
        }
        localStorage.setItem('todo', JSON.stringify(this.todos));
        Swal.fire({
          title: 'Your todo has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  addTodo(todoData: todo) {
    todoData.sno = this.todos.length + 1;
    this.todos.push(todoData);
    localStorage.setItem('todo', JSON.stringify(this.todos));
    Swal.fire({
      title: 'Your todo has been added successfully.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  markAsDone(todoData: todo) {
    this.todos[this.todos.indexOf(todoData)].active = !todoData.active;
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }
}
