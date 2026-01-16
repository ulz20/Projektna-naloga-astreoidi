import { HttpInterceptorFn } from '@angular/common/http';
import { AppConfig } from '../config';

export const asteroidiInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('authToken');


  const newReq = req.clone({
    setParams: {
      api_key: AppConfig.nasaApiKey
    },
    //setHeaders: token ? { Authorization: token } : {}, ker je public nasa api ne rabim
  });
  
  return next(newReq);
};
