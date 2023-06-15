import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeartBeat } from '../models/heartbeat';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../models/clients';
@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {

  constructor(
    private http  : HttpClient,
    private toastr: ToastrService,

  ) { }



  getHeartbeatsByClient(id: number) {
    return this.http.get(`http://localhost:8088/getHeartbeatsByClient/${id}?pageNo=0&pageSize=50`);
  }   


  // addHeartbeatClient(client :Client ){
  //   // this.toastr.success('Client Added Sucessfully');
  //   return this.http.post(`http://localhost:8088/saveClient`, client);
    
  // }
}
