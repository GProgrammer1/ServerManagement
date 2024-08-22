import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, Observable, of, Subject } from 'rxjs';
import { ResponseBody, Server } from './model/models.model';
import { ServerService } from './server-list/server.service';


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  
  serversSubject = new BehaviorSubject<Server[]>([]);
  errorSubject = new BehaviorSubject<string>('') ;
  servers$ = this.serversSubject.asObservable();
  error$ = this.errorSubject.asObservable() ;
  combined$ = combineLatest([this.servers$, this.error$]) ;
  serverList : Server[] =  [] ;
  dataReady : boolean = false ;

  routerSubject = new BehaviorSubject<string>('') ;
  router$ = this.routerSubject.asObservable() ;
  constructor(private serverService: ServerService) {
    this.loadServers();
  }

  route(data : string) {
    this.routerSubject.next(data) ;
  }
  private loadServers() {
    // console.log('a');
    
    // this.serverService.getServers().pipe(
    //   catchError(error => {
    //     console.log(error);
        
    //     this.errorSubject.next('Failed to load servers: ' + error) ; 
    //     return of({data : {servers: [] as Server[]} } ) as Observable<ResponseBody<{servers: Server[]}>>; 
    //   }
      
    //   ))
    //   .subscribe( 
    //   (response: ResponseBody<{ servers: Server[] }>) => { 
    //     if (response.data.servers.length > 0) {
    //     console.log(response);
        
    //     this.serverList = response.data.servers ;
    //     console.log(this.serverList);
        
    //     this.serversSubject.next(this.serverList); 
    //     console.log(this.serversSubject.value);
    //     this.dataReady = true ;
    //   }
    // }
    
    // );
    
  }

  addServer(server: Server) {
    this.serverService.createServer(server).subscribe( {
      next :
      (response: ResponseBody<{ server: Server }>) => {
        
        
        const serverElement: Server = response.data.server;
        const updatedServers = [...this.serversSubject.value, serverElement];
        this.serverList.push(serverElement); 
        this.serversSubject.next(updatedServers);
      }
    
    
    
  });
  }

  deleteServer(id: number) {

    this.serverService.deleteServer(id).subscribe(
      (response: ResponseBody<{ server: Server }>) => {

        const serverDeleted: Server = response.data.server;
        console.log(serverDeleted.id);
        this.serverList = this.serverList.filter(server => server.id !== serverDeleted.id)
        const updatedServers = this.serversSubject.value.filter(server => server.id !== serverDeleted.id);
        this.serversSubject.next(updatedServers);
      }
    );
  }

  ping(ipAddress: string) {
    this.serverService.pingServer(ipAddress).subscribe(
      (response: ResponseBody<{ server: Server }>) => {
        console.log(response.data);
        
        
        const serverResult: Server = response.data.server;
        this.serverList = this.serverList.map(server =>
          server.ipAddress === ipAddress ? { ...server, status: serverResult.status } : server
        );
        const updatedServers = this.serversSubject.value.map(server =>
          server.ipAddress === ipAddress ? { ...server, status: serverResult.status } : server
        );
        this.serversSubject.next(updatedServers);
      }
    );
  }

  filter(status: string) {
    if (status === 'ALL') {
      this.loadServers(); // Reload the full list
      return;
    }
    const filteredServers = this.serverList.filter(server => server.status === status);
    this.serversSubject.next(filteredServers);
  }
}
function subscribe(arg0: (response: ResponseBody<{ servers: Server[]; }>) => void): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

