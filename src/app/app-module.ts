import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//interceptorji
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { asteroidiInterceptor } from './core/interceptors/asteroidi-interceptor';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Login } from './feauters/authentication/login/login';
import { Register } from './feauters/authentication/register/register';
import { AsteroidiDate } from './feauters/asteroidi/asteroidi-date/asteroidi-date';


//services
import { Auth } from './core/services/auth';
import { AsteroidiFave } from './feauters/asteroidi-fave/asteroidi-fave/asteroidi-fave';
import { Loader } from './feauters/loader/loader';


@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    Login,
    Register,
    AsteroidiDate,
    AsteroidiFave,
    Loader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([asteroidiInterceptor])),
    Auth
  ],
  bootstrap: [App]
})
export class AppModule { }
