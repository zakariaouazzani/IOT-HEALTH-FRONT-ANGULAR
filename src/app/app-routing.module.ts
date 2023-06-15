import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { AddClientComponent } from './add-client/add-client.component';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './services/auth.gard';
import { NoAuthGuard } from './services/no-auth.gard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent , canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent , canActivate: [NoAuthGuard]},
  { path: 'edit/:id', component: UpdateClientComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddClientComponent , canActivate: [AuthGuard]},



  // Add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NoAuthGuard],
 

})
export class AppRoutingModule { }
