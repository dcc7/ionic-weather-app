import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputValue: string = "";
  weatherData?: any;
  places?: any[];
  weatherSub$: Subscription;

  @ViewChild('errorMessage') errorMessageHtml: ElementRef; 

  constructor(
    private weatherService: WeatherService,
    private renderer: Renderer2,
    private loadingCtrl: LoadingController,
    private placesService: PlacesService,
  ) {}
  
  getWeather(){
    if (this.inputValue === ""){
      this.renderer.setProperty(this.errorMessageHtml.nativeElement, 'innerHTML' , 'Please input a city name!');
      setTimeout(() => {
        this.renderer.setProperty(this.errorMessageHtml.nativeElement, 'innerHTML' , '');
      }, 2000)
    } else {
      this.loadingCtrl.create({
        message: 'Obtaining Data...'
      }).then(loadingEl => {
        loadingEl.present();
        this.weatherSub$ = this.weatherService.fetchData(this.inputValue).subscribe(data => {
          this.weatherService.selectedCity = data.location.name;
          this.weatherData = data;
          loadingEl.dismiss();
          this.inputValue = "";
        });
      });
    }
  }

  addToList(){
    this.placesService.savedPlaces.push(this.weatherData);
    this.places = this.placesService.fetchPlaces();
    this.weatherData = undefined;
  }

  deletePlace(location: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.placesService.deletePlace(location);
    this.places = this.placesService.fetchPlaces();
  }

  ionViewWillLeave(){
    if (this.weatherSub$){
      console.log('home unsubscribed');
      this.weatherSub$.unsubscribe();
    }
  }
}
