
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
    private loginUrl = 'http://localhost:8088/login'; 
    private registerUrl = 'http://localhost:8088/saveClient'
    constructor(private http: HttpClient,
      private storage : StorageService,
      private router : Router
      ) { }
  
    login(mac: string, password: string) {
      const requestBody = { mac, password };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
      return this.http.post(this.loginUrl, requestBody, {
        headers,
        responseType: 'text' // Set the response type to 'text'
      });    }


      register(mac: string, password: string, nom:string,prenom:string,tel:string,adresse:string,mail:string, ) {
        const requestBody = { mac, password ,nom,prenom,tel,adresse,mail};
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this.http.post(this.registerUrl, requestBody, {
          headers,
          responseType: 'text' // Set the response type to 'text'
        });    }


        logout(): void {
          this.storage.clearData();
          this.router.navigate(['/']);
        }
  }