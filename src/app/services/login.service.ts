
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
    private loginUrl = 'http://localhost:8088/login'; // Replace with your API endpoint URL
    private registerUrl = 'http://localhost:8088/saveClient'
    constructor(private http: HttpClient) { }
  
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


  }