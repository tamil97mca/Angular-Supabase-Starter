import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService, private readonly router: Router) { }


  async canActivate(): Promise<boolean> {
    const { data } = await this.supabase.client.auth.getUser();
    const user = data?.user;
    if (user) return true;
    this.router.navigate(['/auth/login']);
    return false;
  }
}