import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  selectedCity: string;

  constructor(
    private http: HttpClient,
  ) {}

  fetchData(city: any) {

      let headers = new HttpHeaders({
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': 'e63b3071a3mshb8ff66b511d1367p160c54jsn12aa06b15df8',
      });

      return this.http.get<any>(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, {
        headers: headers
      });
  }

  fetchForecast(city: any) {

    let headers = new HttpHeaders({
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': 'e63b3071a3mshb8ff66b511d1367p160c54jsn12aa06b15df8',
    });

    return this.http.get<any>(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, {
      headers: headers
    });

  }
}
