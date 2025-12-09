import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';


  constructor(private readonly supabase: SupabaseService, private readonly router: Router) { }


  async login() {
    this.loading = true;
    this.error = '';
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });

    console.log('data:', data);
    console.log('error:', error);

    this.loading = false;
    if (error) {
      this.error = error.message;
      return;
    }


    // Navigate to protected route (todos)
    this.router.navigate(['/todos']);
  }
}
