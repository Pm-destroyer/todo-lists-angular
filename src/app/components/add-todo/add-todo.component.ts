import { Component, EventEmitter, Output } from '@angular/core';
import { todo } from 'src/app/Todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  @Output() addTodo: EventEmitter<todo> = new EventEmitter();

  title!: string;
  desc!: string;
  date!: string;
  display = false;

  todoForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z 0-9,\-]{3,50}$/),
    ]),
    desc: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.todoForm.invalid) {
      this.display = true;
    } else {
      const todo: any = {
        sno: 0,
        ...this.todoForm.value,
        active: true,
      };

      this.addTodo.emit(todo);
      this.display = false;
      this.todoForm.reset();
    }
  }
}
