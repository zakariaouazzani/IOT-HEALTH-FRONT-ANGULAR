import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeartBeat } from '../models/heartbeat';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../models/clients';
import { Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  heartBeatsSubject = new Subject();
  

  constructor(private http: HttpClient) { }

  getHeartbeatsByClient(id:number) {
    // size ==> 10000 / 10 = nbr pages 

    return this.http.get(`http://localhost:8088/getHeartbeatsByClient/${id}?pageNo=0&pageSize=10`).pipe(
      tap((data: any) => {
        //console.log(data);
        
        
        this.heartBeatsSubject.next(data);

      })  
    )
  }
}
