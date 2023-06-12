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

   series = {
    monthDataSeries1: {
      prices: [
        8107.85,
        8128.0,
        8122.9,
        8165.5,
        8340.7,
        8423.7,
        8423.5,
        8514.3,
        8481.85,
        8487.7,
        8506.9,
        8626.2,
        8668.95,
        8602.3,
        8607.55,
        8512.9,
        8496.25,
        8600.65,
        8881.1,
        9340.85,
        2,
        4,
      ],
      dates: [
        "13 Nov 2017",
        "14 Nov 2017",
        "15 Nov 2017",
        "16 Nov 2017",
        "17 Nov 2017",
        "20 Nov 2017",
        "21 Nov 2017",
        "22 Nov 2017",
        "23 Nov 2017",
        "24 Nov 2017",
        "27 Nov 2017",
        "28 Nov 2017",
        "29 Nov 2017",
        "30 Nov 2017",
        "01 Dec 2017",
        "04 Dec 2017",
        "05 Dec 2017",
        "06 Dec 2017",
        "07 Dec 2017",
        "08 Dec 2017",
        "09 Dec 2017",
        "10 Dec 2017",
      ]
    },
  };
  

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;


  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.clientService.getCLientByid(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.client = data;
        this.chartOptions = {
          series: [
            {
              name: "STOCK ABC",
              data: []
              //data: this.series.monthDataSeries1.prices
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
            text: "Fundamental Analysis of Stocks",
            align: "left"
          },
          subtitle: {
            text: "Price Movements",
            align: "left"
          },
          // labels: this.series.monthDataSeries1.dates,
          labels: [],
          xaxis: {
            type: "datetime"
          },
          yaxis: {
            opposite: true
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
}
