import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {
  IPetSaleDetail,
  IWeeklySales,
} from '../../core/models/pet-sales.model';
import { PetSalesService } from '../../core/services/pet-sales.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-pet-sales',
  standalone: false,
  templateUrl: './pet-sales.component.html',
  styleUrl: './pet-sales.component.scss',
  providers: [DatePipe],
})
export class PetSalesComponent implements AfterViewInit {
  @ViewChild('weeklyCanvas') weeklyCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('dailyCanvas') dailyCanvas!: ElementRef<HTMLCanvasElement>;

  private weeklyChart!: Chart;
  private dailyChart!: Chart;

  weeklyStartDate = new Date().toString();
  dailyStartDate = new Date().toString();

  constructor(
    private petSalesService: PetSalesService,
    private datePipe: DatePipe
  ) {}

  ngAfterViewInit() {
    this.renderWeeklyChart();
    this.renderDailyChart();
  }

  renderWeeklyChart() {
    this.petSalesService
      .getWeeklySales(this.weeklyStartDate)
      .subscribe((weeklySales: IWeeklySales) => {
        // destroy old if exists
        if (this.weeklyChart) this.weeklyChart.destroy();

        this.weeklyChart = new Chart(this.weeklyCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: weeklySales.categories,
            datasets: weeklySales.series.map((s) => ({
              label: s.name,
              data: s.data,
              fill: false,
              tension: 0.3,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: 'Date' } },
              y: { beginAtZero: true, title: { display: true, text: 'Sales' } },
            },
          },
        });
      });
  }

  renderDailyChart() {
    this.petSalesService
      .getDailySales(this.dailyStartDate)
      .subscribe((data: IPetSaleDetail[]) => {
        const labels = data.map((d) => d.animal);
        const values = data.map((d) => parseFloat(d.price));

        // destroy old if exists
        if (this.dailyChart) this.dailyChart.destroy();

        this.dailyChart = new Chart(this.dailyCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: `Sales on ${this.datePipe.transform(
                  this.dailyStartDate,
                  'EEEE yyyy-MM-dd'
                )}`,
                data: values,
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: 'Animal' } },
              y: {
                title: { display: true, text: 'Sales Amount' },
                beginAtZero: true,
              },
            },
          },
        });
      });
  }

  onWeeklyDateChange(e: MatDatepickerInputEvent<Date>) {
    this.weeklyStartDate = this.datePipe.transform(e.value, 'yyyy-MM-dd')!;
    this.renderWeeklyChart();
  }

  onDailyDateChange(e: MatDatepickerInputEvent<Date>) {
    this.dailyStartDate = this.datePipe.transform(e.value, 'yyyy-MM-dd')!;
    this.renderDailyChart();
  }
}
