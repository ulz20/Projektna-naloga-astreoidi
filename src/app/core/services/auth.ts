import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})


export class Auth {
  constructor(private router: Router) { }  


  finalRegistration(registerFields: any): Observable<any> { 
    return from (this.registerData(registerFields));
  }




   private async registerData(registerFields: any) {

    const localData = localStorage.getItem('registeredUsers');
    let registeredUsers = localData ? JSON.parse(localData) : [];


    //preveri če obstaja že meil
    for (const user of registeredUsers) {
      if (user.email === registerFields.email) {
        throw new Error('Email is already registered');
      }
    }

    const hashedPassword = await this.hashPassword(registerFields.password);
    

    // shrani user z hashanim geslom
    const userToSave = { 
      id: registerFields.id,
      name: registerFields.name,
      surname: registerFields.surname,
      email: registerFields.email,
      password: hashedPassword
    };


    registeredUsers.push(userToSave);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    return of({ success: true, message: 'User registered successfully' });

    
  }



  // login logika
  login(loginFields: any): Observable<any> {
    return from(this.hashPassword(loginFields.password)).pipe(
      switchMap((hashedInputPassword) => {


        const localData = localStorage.getItem('registeredUsers');
        const registeredUsers = localData ? JSON.parse(localData) : [];

        let userMatch = null;

        //loop cez userje shrani userja v userMatch   
        for (const user of registeredUsers){
          if (user.email === loginFields.email && user.password === hashedInputPassword) {
            userMatch = user;
            break;
        } 
      }
      

        if (userMatch) { 
          

          //fake token generacija
          const tokenGenerated = {
            email: userMatch.email,
            role: 'user',
            timestamp: new Date().toISOString()
          }

          const token = 'bearer ' + btoa(JSON.stringify(tokenGenerated));
          localStorage.setItem('authToken', token); 
          localStorage.setItem('currentUser', JSON.stringify(userMatch));
          return of({ success: true, message: 'Login successful', token: token });

       }

       else { 
          return throwError(() => new Error('Invalid email or password'));
        }
      })
    );
  }  


  //logout 
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }



  // za hashanje gesla  
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }



  //ali je logged in 
  isLoggedIn(): boolean {
    if (localStorage.getItem('authToken')) {
      return true;
    }
    return false;
  }
}







