import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
 import { HotToastService, Toast } from '@ngneat/hot-toast';
 import { ToastrService } from 'ngx-toastr';
import { Client } from '../models/clients';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  mac: string ="";
  password: string ="";
  client!: Client ; 
  login_is_correct = true;
  client_type :boolean= true;
  constructor(private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private storage : StorageService
    ) { }


  navigateToRegister() {
      this.router.navigate(['/register']);
    }
    
  login() {
    this.loginService.login(this.mac, this.password).subscribe(
      (response: any) => {
        this.toastr.success('Logged In Successfully');
        // Login successful
        response = JSON.parse(response);
        //console.log(response);
        if (response.message === "Login successful") {
          this.storage.setClient(response.client)
          this.storage.setToken(response.token)
          this.router.navigate(['/dashboard']);
        } else if(response.message === "Adresse Mac or Password Incorrect") {
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



  setClient(){
    this.client_type = true; 
    
  }
  setDoctor(){
    this.client_type = false; 

  }
  
}
