import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServerService } from './server-list/server.service'; // Adjust path as necessary
import { Server } from './model/models.model'; // Adjust path as necessary
import { ResponseBody } from './model/models.model'; // Adjust path as necessary
import { CommunicatorService } from './communicator.service';

//to be reviewed
export const serverListResolver: ResolveFn<ResponseBody<{ servers: Server[] }> | Error>= (route, state) => {
  const serverService = inject(ServerService);
  const communicator = inject(CommunicatorService)
  
  return serverService.getServers().pipe(
    catchError(error => {
      console.error('Error fetching servers', error);
      
      return of(
        new Error('Server down')
      ) ;
    }),
    tap(
      (response) => {
        if ('data' in response) {
          communicator.serversSubject.next(response.data.servers);
          communicator.serverList = response.data.servers ; 
        }
      }
    )
  );
}
