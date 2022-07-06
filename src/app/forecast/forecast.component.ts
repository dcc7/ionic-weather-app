import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../home/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  cityInformationArray: any;
  cityName: string;
  isLoading: boolean = false;
  weatherSub$: Subscription;

  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    const selectedCity = this.weatherService.selectedCity;
    if (selectedCity) {
      this.isLoading = true;
      this.weatherSub$ = this.weatherService.fetchForecast(selectedCity).subscribe((data) => {
        this.cityInformationArray = data.forecast.forecastday;
        this.cityName = data.location.name;
        this.isLoading = false;
      });
    }
  }

  ionViewWillLeave(){
    if (this.weatherSub$){
      console.log('forecast unsubscribed');
       this.weatherSub$.unsubscribe();
    }
  }
}
