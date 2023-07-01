import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { GetExRateService } from 'src/app/services/get-exrate-service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {
  value1: number;
  value2: number;
  k: number;
  code1: string;
  code2: string;

  constructor(private service: GetExRateService) {
    this.value1 = 0;
    this.value2 = 0;
    this.k = 1;
    this.code1 = 'USD';
    this.code2 = 'UAH';
    this.getK();
  }

  onSelected1(code: string) {
    this.code1 = code;
    this.getK();
    this.value1 = 0;
    this.value2 = 0;
  }

  onSelected2(code: string) {
    this.code2 = code;
    this.getK();
    this.value1 = 0;
    this.value2 = 0;
  }

  Value1Change(event: any) {
    this.value1 = event.target.value;
    this.value2 = Math.round(100 * this.value1 * this.k) / 100;
  }

  Value2Change(event: any) {
    this.value2 = event.target.value;
    this.value1 = Math.round((100 * this.value2) / this.k) / 100;
  }

  getK() {
    this.service
      .getCourses(this.code1, this.code2)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((value: number) => {
        this.k = value;
      });
  }
}
