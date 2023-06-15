import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../models/clients';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { HeartbeatService } from '../services/heartbeat.service';
import { HeartBeat } from '../models/heartbeat';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  client!: Client;
  heartbeats: HeartBeat []  = [];
   series = {
    monthDataSeries1: {
      data1: [
        
      ] as number[],
      dates: [
     

      ] as string [],
    },
  };
  

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;


  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService,
    private heartbeatService : HeartbeatService
    ) {}

  ngOnInit() {    
    
    const id = this.activatedRoute.snapshot.params['id'];
    setInterval(()=>{
      this.initHeartBeat(id);
    }, 700)
    
    this.clientService.getCLientByid(id).subscribe({
      next: (data: any) => {
        //console.log(data);
        this.client = data;
        this.chartOptions = {
          series: [
            {
              name: "STOCK ABC",
              //data: []
              data: this.series.monthDataSeries1.data1
            }
          ],
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
          },
    
          title: {
            text: "HeartBeat Monitor ",
            align: "left"
          },
          subtitle: {
            text: "BPM",
            align: "left"
          },
          labels: this.series.monthDataSeries1.dates,
          //labels: [],
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            opposite: false
          },
          legend: {
            horizontalAlign: "left"
          }
        };
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  initHeartBeat(id :number){
    
    this.heartbeatService.getHeartbeatsByClient(id).subscribe({
      next:(data : any)=>{
        //this.clients = data ; 
        this.heartbeats = data;
        console.log(this.heartbeats);
        for (const heartbeat of this.heartbeats) {
          if (heartbeat.data1) {
           this.series.monthDataSeries1.data1.push(heartbeat.data1);
           this.series.monthDataSeries1.dates.push(heartbeat.date_prelevement!.toString());
            //console.log(heartbeat.date_prelevement)
            
          }
        }


      },
      error:(error)=>{
        console.log(error);
      }
    })

  }

}
