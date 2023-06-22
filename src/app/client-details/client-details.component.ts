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
import { TemperatureService } from '../services/temperature.service';
import { Temperature } from '../models/temperature';

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
  temperatures: Temperature []  = [];
   series = {
    monthDataSeries1: {
      data1: [
        
      ] as number[],
      dates: [
     

      ] as string [],
    },
  };

  series2 = {
    monthDataSeries1: {
      data1: [
        
      ] as number[],
      dates: [
     

      ] as string [],
    },
  };
  

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2!: Partial<ChartOptions>;



  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService,
    private heartbeatService : HeartbeatService,
    private temperatureService : TemperatureService,
    ) {}

  ngOnInit() {    
    const id = this.activatedRoute.snapshot.params['id'];
    this.getClientById(id);
    this.initHeartBeat(id);
    this.initTemperature(id)
    this.heartbeatService.heartBeatsSubject.subscribe({
      next: (data: any) => {
        //console.log(data);
        this.series.monthDataSeries1.dates  = [];
        this.series.monthDataSeries1.data1 = [];
        for (const heartbeat of data) {
          if (heartbeat.data1) {
            // console.log(heartbeat);
            
           this.series.monthDataSeries1.data1.push(heartbeat.data1);
           this.series.monthDataSeries1.dates.push(heartbeat.date_prelevement!.toString());
            //console.log(heartbeat.date_prelevement)
            
          }
        }

        this.chartOptions = {
          series: [
            {
              name: "Heartbeat",
              //data: []
              data: this.series.monthDataSeries1.data1
            }
          ],
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false
            },
            animations: {
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
          },
          
        };
      }
    })




    this.temperatureService.temperaturesSubject.subscribe({
      next: (data: any) => {
        //console.log(data);
        this.series2.monthDataSeries1.dates  = [];
        this.series2.monthDataSeries1.data1 = [];
        for (const temp of data) {
          if (temp.data1) {
            // console.log(heartbeat);
            
           this.series2.monthDataSeries1.data1.push(temp.data1);
           this.series2.monthDataSeries1.dates.push(temp.date_prelevement!.toString());
            //console.log(heartbeat.date_prelevement)
            
          }
        }

        this.chartOptions2 = {
          series: [
            {
              name: "Temperature",
              //data: []
              data: this.series2.monthDataSeries1.data1
            }
          ],
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false
            },
            animations: {
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
            text: "Temperature Monitor ",
            align: "left"
          },
          subtitle: {
            text: "Temp",
            align: "left"
          },
          labels: this.series2.monthDataSeries1.dates,
          //labels: [],
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            opposite: false
          },
          legend: {
            horizontalAlign: "left"
          },
          
        };
      }
    })



    setInterval(() => {
      this.initHeartBeat(id);
      this.initTemperature(id);

    }, 1000)
    
  }
  initTemperature(id :number){
    
    this.temperatureService.getTemperaturesByClient(id).subscribe()

  }


  initHeartBeat(id :number){
    
    this.heartbeatService.getHeartbeatsByClient(id).subscribe()

  }


  getClientById(id : number){
    this.clientService.getCLientByid(id).subscribe({
      next:(data : any)=>{
        this.client = data ; 
        console.log(data);

      },
      error:(error)=>{
        console.log(error);
      }
    }
    )

  }
}
