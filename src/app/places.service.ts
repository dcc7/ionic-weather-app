import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  savedPlaces: any[] = [];

  constructor() {}

  // placeListSub = new Subject<any>();

  fetchPlaces() {
    return this.savedPlaces;
  }

  deletePlace(location: string){
    this.savedPlaces = this.savedPlaces.filter( place => {
      return place.location.name !== location;
    })
  }
}
