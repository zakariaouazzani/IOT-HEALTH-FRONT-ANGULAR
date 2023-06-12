import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
 import { HotToastService, Toast } from '@ngneat/hot-toast';
 import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  mac: string ="";
  password: string ="";
  login_is_correct = true;
  constructor(private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
    ) { }


  navigateToRegister() {
      this.router.navigate(['/register']);
    }
    
  login() {
    this.loginService.login(this.mac, this.password).subscribe(
      (response: any) => {
        // Login successful
        if (response === 'Login successful') {
          // Handle successful login
          console.log("success")
          this.router.navigate(['/dashboard']);
        } else {
          // Handle unsuccessful login
           console.log("Nsuccess");
           this.login_is_correct = false; 
          //this.toastr.error('Hello world!', 'Toastr fun!');
        }
      },
      (error: any) => {
        // Login failed
        console.log(error);
      }
    );
  }
}
