import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: UpdateClientComponent },
  { path: 'details/:id', component: ClientDetailsComponent },
  { path: 'add', component: AddClientComponent },



  // Add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
