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
    this.initHeartBeat(id);
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
    setInterval(() => {
      this.initHeartBeat(id);
    }, 1000)
    
  }

  initHeartBeat(id :number){
    
    this.heartbeatService.getHeartbeatsByClient(id).subscribe()

  }

}
