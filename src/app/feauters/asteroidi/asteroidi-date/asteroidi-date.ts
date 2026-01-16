import { Component, inject, computed, signal } from '@angular/core';
import { AsteroidiService } from '../../../core/services/asteroidi-service';
import seedrandom from 'seedrandom';
import { Loader } from '../../loader/loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asteroidi-date',
  standalone: false,
  templateUrl: './asteroidi-date.html',
  styleUrl: './asteroidi-date.css',
})
export class AsteroidiDate {

  constructor(private asteroidiService: AsteroidiService) { }
  

  isLoading: boolean = false;

  
  asteroidiData: any;
  startDate: string = '2023-01-01';
  endDate: string = '2023-01-02';

  private currentRequest: Subscription | null = null;

  fetchData() {
    this.asteroidiData = null;
    this.isLoading = true;

    this.currentRequest = this.asteroidiService.getAsteroidiDate(this.startDate, this.endDate).subscribe({
      next: (response) => {
        console.log('Data received:', response);
        this.asteroidiData = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Request failed', error);
      }
    });
  }

  //Preveri če je datuum manj od sedem dni

  get isDateValid() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (diff < 0 || diff > 7) {
      return false;
    }
    else {
      return true;
    }

  }

  //shrani v fave 
  savetoFavourites(asteroid: any) {
    const loggedInUser = localStorage.getItem('currentUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      const userId = user.id;

      this.asteroidiService.saveToFavourites(userId, asteroid);

    } else {
      console.log('You must be logged in to save favorites!');
      return;
    }
  }

  //preveri če je v fave 
  isAsteroidFave(asteroid: any): boolean {
    const loggedInUser = localStorage.getItem('currentUser');
    
    
    if (!loggedInUser) {
        return false; 
    }
    
    const user = JSON.parse(loggedInUser);
    const userId = user.id;
    const userKey = 'favourites_' + userId;
    const favourites = localStorage.getItem(userKey);

    if (!favourites) return false;
    
    const list = JSON.parse(favourites);

    for (let fav of list) {
      if (fav.id === asteroid.id) {
        return true;
      }
    }

    return false;
}






  //velikost korga
  circleSize(diameter: number): number {
    return 20 + (Math.sqrt(diameter) * 15);
  }


  //gradient

  getAsteroidGradient(id: string): string {
    const rng = seedrandom(id);

    const randomColor = Math.floor(rng()* 0xFFFFFF)
    const c = randomColor.toString(16).toUpperCase();
    const hexColor = '#' + c.padStart(6, '0')
    
    const body = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, ${hexColor} 40%, #0d0d0d 100%)`;

    return `${body}`;
  }


  //random pozicija

  randomPosition(seed: string): string {
    const rng = seedrandom(seed);
    const x = Math.floor(rng() * 81) + 10;
    return x.toString() + "%"
  }

  //ustavi lodanje
  stopLoading() {
    this.isLoading = false;

    if (this.currentRequest) {
      this.currentRequest.unsubscribe();
      this.currentRequest = null;
    }
  }



}

