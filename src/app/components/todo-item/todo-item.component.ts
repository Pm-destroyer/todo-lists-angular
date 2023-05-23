import { Component, EventEmitter, Input, Output } from '@angular/core';
import { todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: todo = new todo;
  @Output() DeleteTodo: EventEmitter<todo> = new EventEmitter;
  @Output() markAsDone: EventEmitter<todo> = new EventEmitter;

  todoDelete(todo: todo) {
    this.DeleteTodo.emit(todo);
  }

  onTodoCheck(todo: todo) {
    this.markAsDone.emit(todo);    
  }
}
