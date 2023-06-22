import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor( 
    private http : HttpClient
  ) { }
  temperaturesSubject = new Subject();



  getTemperaturesByClient(id:number) {
    // size ==> 10000 / 10 = nbr pages 

    return this.http.get(`http://localhost:8088/getTemperaturesByClient/${id}?pageNo=0&pageSize=10`).pipe(
      tap((data: any) => {
        //console.log(data);
        
        
        this.temperaturesSubject.next(data);

      })  
    )
  }
}
