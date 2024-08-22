import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerService } from './server-list/server.service'; // Adjust path as necessary
import { Server } from './model/models.model'; // Adjust path as necessary
import { ResponseBody } from './model/models.model'; // Adjust path as necessary

export const serverListResolver: ResolveFn<ResponseBody<{ servers: Server[] }> | Error> = (route, state) => {
  const serverService = inject(ServerService);
  const router = inject(Router);

  return serverService.getServers().pipe(
    catchError(error => {
      console.error('Error fetching servers', error);
      
      // Return a ResponseBody object with an empty servers array
      return of(
        new Error('Server down')
      ) ;
    }),
  )
};
