import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] }
];
