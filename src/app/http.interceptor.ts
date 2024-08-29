import { HttpInterceptorFn } from '@angular/common/http';


export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone ({
    setHeaders: {
      'cors' : 'no-cors' 
    }
  });

  return next(newReq);
};
