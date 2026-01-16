import { Component } from '@angular/core';
import { AsteroidiService } from '../../../core/services/asteroidi-service';
import seedrandom from 'seedrandom';

@Component({
  selector: 'app-asteroidi-fave',
  standalone: false,
  templateUrl: './asteroidi-fave.html',
  styleUrl: './asteroidi-fave.css',
})
export class AsteroidiFave {

  constructor(private asteroidiService: AsteroidiService) { }

  faveList: any[] = [];

  ngOnInit() {
    this.faveList = this.displayFave();
  }


  //prikaz priljubljenih  
  displayFave() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      const userId = user.id;
      const userKey = 'favourites_' + userId;

      const favourites = localStorage.getItem(userKey);
      if (favourites) {
        console.log(JSON.parse(favourites));
        return JSON.parse(favourites);
      } else {
        return [];
      }

    }
    return [];
  }


  //odstranitev s seznama
  removeFromFave(asteroid: any) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      const userId = user.id;
      const userKey = 'favourites_' + userId;

      const favourites = localStorage.getItem(userKey);
      if (favourites) {
        let faveList = JSON.parse(favourites);
        faveList = faveList.filter((item: any) => item.id !== asteroid.id);
        localStorage.setItem(userKey, JSON.stringify(faveList));
        this.faveList = this.displayFave();
      }
      else {
        return;
      }
    }
    else {
      return;
    }
  }

   getAsteroidGradient(id: string): string {
      const rng = seedrandom(id);
  
      const randomColor = Math.floor(rng()* 0xFFFFFF)
      const c = randomColor.toString(16).toUpperCase();
      const hexColor = '#' + c.padStart(6, '0')
      
      const body = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, ${hexColor} 40%, #0d0d0d 100%)`;
  
      return `${body}`;
    }
  


}



