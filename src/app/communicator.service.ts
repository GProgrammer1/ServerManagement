import {  Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseBody, Server } from './model/models.model';
import { ServerService } from './server-list/server.service';


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  
  serversSubject = new BehaviorSubject<Server[]>([]);
  servers$ = this.serversSubject.asObservable();
  serverList : Server[] =  [] ;
  

  errorSubject = new BehaviorSubject<string>('') ;
  error$ = this.errorSubject.asObservable() ;

  constructor(private service : ServerService){
    
  }
  route(data : string) {
    this.errorSubject.next(data) ;
  }

  
  addServer(server: Server) {
    this.service.createServer(server).subscribe( {
      next :
      (response: ResponseBody<{ server: Server }>) => {
        
        
        const serverElement: Server = response.data.server;
        const updatedServers = [...this.serversSubject.value, serverElement];
        this.serverList.push(serverElement) ;
        this.serversSubject.next(updatedServers) ;
      }, 
      error: err => {
        this.errorSubject.next('Server Down') ;
      } 
  });
  }

  deleteServer(id: number) {

    this.service.deleteServer(id).subscribe({
     next : (response: ResponseBody<{ server: Server }>) => {
         
        const serverDeleted: Server = response.data.server;
        this.serverList = this.serverList.filter(server => server.id !== serverDeleted.id)
        const updatedServers = this.serversSubject.value.filter(server => server.id !== serverDeleted.id);
        this.serversSubject.next(updatedServers) ;
      },
    error : err => {
      this.errorSubject.next('Server Down') ;
    }
    });
  }

  ping(ipAddress: string) {
    this.service.pingServer(ipAddress).subscribe({
      next:  (response: ResponseBody<{ server: Server }>) => {
        
        const serverResult: Server = response.data.server;
        const updatedServers = this.serversSubject.value.map(server =>
          server.ipAddress === ipAddress ? { ...server, status: serverResult.status } : server
        );
        this.serverList = this.serverList.map(server =>
          server.ipAddress === ipAddress ? { ...server, status: serverResult.status } : server); 
          this.serversSubject.next(updatedServers) ;     
      }
    });
  }

  filter(status: string) {
    if (status === 'ALL') {
      this.serversSubject.next(this.serverList) ;
      return;
    }
    const filteredServers = this.serverList.filter(server => server.status === status);
    this.serversSubject.next(filteredServers);
  }
}

