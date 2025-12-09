import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  newTitle = '';
  loading = false;


  constructor(private readonly supabase: SupabaseService) { }


  ngOnInit() {
    this.loadTodos();
    this.setupRealtime();
  }


  async loadTodos() {
    this.loading = true;
    const { data, error } = await this.supabase.client
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });


    this.loading = false;
    if (!error && data) this.todos = data;
  }


  async addTodo() {
    if (!this.newTitle.trim()) return;
    const payload = { id: uuidv4(), title: this.newTitle, completed: false };
    const { data, error } = await this.supabase.client.from('todos').insert([payload]);
    if (!error) {
      this.newTitle = '';
      if (data) {
        this.todos.unshift(data[0]);
      }
    }
  }


  async toggleComplete(todo: any) {
    const { data, error } = await this.supabase.client
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', todo.id);

    console.log('data:', data);
    console.log('error:', error);
    if (!error) this.loadTodos();
  }


  async deleteTodo(todo: any) {
    const { error } = await this.supabase.client.from('todos').delete().eq('id', todo.id);
    if (!error) this.loadTodos();
  }


  setupRealtime() {
    this.supabase.client
      .channel('public:todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, () => {
        this.loadTodos();
      })
      .subscribe();
  }
}
