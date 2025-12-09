import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  loading = false;
  message = '';


  constructor(private readonly supabase: SupabaseService, private readonly router: Router) { }


  async register() {
    this.loading = true;
    const { data, error } = await this.supabase.client.auth.signUp({
      email: this.email,
      password: this.password
    });
    this.loading = false;

    console.log('data:', data);
    console.log('error:', error);
    if (error) {
      this.message = error.message;
      return;
    }


    this.message = 'Check your email for a confirmation link (if required).';
    // Optionally redirect to login
    this.router.navigate(['/auth/login']);
  }
}
