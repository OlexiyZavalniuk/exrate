import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetExRateService {
  constructor(private http: HttpClient) {}

  private token = '3dba6c8d8d6ed19a2bc9cde0';

  getCourses(code1: string, code2: string): Observable<number> {
    return this.http
      .get(
        `https://v6.exchangerate-api.com/v6/${this.token}/pair/${code1}/${code2}`
      )
      .pipe(map((data: any) => data.conversion_rate));
  }
}
