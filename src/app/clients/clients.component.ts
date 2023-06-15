import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Client } from '../models/clients';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  
  clients: Client []  = [];
  
  //heartbeats: any[] = [];

  constructor(private http: HttpClient,
      private clientService : ClientService ,
      private router : Router,
      private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.fetchData();

  }
  onEdit(IdClient:number){
    this.router.navigate(["/edit", IdClient]);
  }

  onDelete(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      // Perform the delete operation
      // Add your delete logic here
      this.clientService.deleteClient(id).subscribe({
        next: (response) => {
          console.log(response);
          this.fetchData();

        },
        error: (error) => {
          console.log(error);
          if (error.status == 200) {
            this.fetchData();
          }
        }
      });
      this.toastr.error('Patient deleted successfully!');

    } 
    
  }
  onAdd(){
    this.router.navigate(["/add"]);


  }

  onViewClientDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  fetchData(){
    this.clientService.fetchData().subscribe({
      next:(data : any)=>{
        this.clients = data ; 
        //console.log(data);

      },
      error:(error)=>{
        console.log(error);
      }
    })


  }
  // fetchHeartbeatData(clientId: number) {
  //   const apiUrl = `http://localhost:8088/getHeartbeatsByClient/${clientId}?pageNo=0&pageSize=5`; // Replace 'your-api-url' with your actual API URL
    
  //   this.http.get<any>(apiUrl).subscribe((response: any)=> {
  //     console.log(response)
  //     this.clients[clientId].heartbeats = response;

  //     console.log(this.clients[clientId].heartbeats);
      
  //     //this.clients.heartbeats = response;
  //     // const clientsWithHeartbeats = this.clients.map(client => {
  //     //   const clientHeartbeats = this.heartbeats.filter(heartbeat => heartbeat.clientId === client.id);
  //     //   return { ...client, heartbeats: clientHeartbeats };
  //     // });
  //     // console.log(this.heartbeats)
      
  //   });
  // }
 
}

