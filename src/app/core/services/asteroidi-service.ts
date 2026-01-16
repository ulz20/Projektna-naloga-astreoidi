import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config';
import { AsteroidiDate } from '../../feauters/asteroidi/asteroidi-date/asteroidi-date';

@Injectable({
  providedIn: 'root',
})
export class AsteroidiService {
  private http = inject(HttpClient);

  //Asteroidi glede na datum
  getAsteroidiDate(startDate: string, endDate: string) {
    const url = `${AppConfig.baseUrl}?start_date=${startDate}&end_date=${endDate}`;
    return this.http.get(url);
  }

  //shanrjevanje v favourites
  saveToFavourites(userId: string, asteroid: any) {
    const userKey = 'favourites_'+userId;

    const favourites = localStorage.getItem(userKey);
    const newFavourites = favourites ? JSON.parse(favourites) : [];

    for (let fav of newFavourites) {
      if (fav.id === asteroid.id) {
        console.log('Asteroid is already in favourites');
        return; 
      }
    }
    

    newFavourites.push(asteroid);
    localStorage.setItem(userKey, JSON.stringify(newFavourites));
    console.log('Asteroid saved to favourites:', asteroid);
    console.log(asteroid.isSaved)


  }
}
