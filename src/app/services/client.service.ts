import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/clients';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Client []  = [];

  constructor(
      private http  : HttpClient,
      private toastr: ToastrService,
  ) { }



  // fetchHeartbeatData(clientId: number) {
  //   const apiUrl = `http://localhost:8088/getHeartbeatsByClient/${clientId}?pageNo=0&pageSize=5`; // Replace 'your-api-url' with your actual API URL
    
  //   return this.http.get<any>(apiUrl);



  // }


  deleteClient(id: number) {
    
    return this.http.delete(`http://35.197.209.87:8080/deleteClient/${id}`);
    //return this.http.delete(`http://localhost:8088/deleteClient/${id}`);
  }
   
  fetchData() {
    return this.http.get('http://35.197.209.87:8080/listClients');
    //return this.http.get('http://localhost:8088/listClients');
  }

  getCLientByid(id: number) {
    return this.http.get(`http://35.197.209.87:8080/getClientById/${id}`);

    //return this.http.get(`http://localhost:8088/getClientById/${id}`);
  }   


  editClient(IdClient: number, client :Client ){
    return this.http.put(`http://35.197.209.87:8080/updateClient/${IdClient}`, client);

    //return this.http.put(`http://localhost:8088/updateClient/${IdClient}`, client);
  }

  addClient(client :Client ){
    // this.toastr.success('Client Added Sucessfully');
    return this.http.post(`http://35.197.209.87:8080/saveClient`, client);

    //return this.http.post(`http://localhost:8088/saveClient`, client);
    
  }
}


