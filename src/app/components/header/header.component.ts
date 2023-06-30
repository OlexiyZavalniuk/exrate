import { Component } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { GetExRateService } from 'src/app/services/get-exrate-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private service: GetExRateService) {}

  usd: number = 0;
  eur: number = 0;

  ngOnInit() {
    this.service
      .getCourses('USD', 'UAH')
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((value: number) => {
        this.usd = value;
      });

    this.service
      .getCourses('EUR', 'UAH')
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((value: number) => {
        this.eur = value;
      });
  }
}
