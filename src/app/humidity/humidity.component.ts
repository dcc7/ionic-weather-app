import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../home/weather.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit {
  cityInformation?: any;
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
      this.weatherSub$ = this.weatherService.fetchData(selectedCity).subscribe((data) => {
        this.cityInformation = data;
        this.isLoading = false;
      });
    }
  }

  ionViewWillLeave(){
    if (this.weatherSub$){
      this.weatherSub$.unsubscribe();
    }
  }

}
