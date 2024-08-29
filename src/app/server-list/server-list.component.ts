import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {  Server } from '../model/models.model';import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Import for mat-icon-button
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommunicatorService } from '../communicator.service';
import { RouterOutlet } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, RouterOutlet
  ],
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
  providers: [AsyncPipe]
})
export class ServerListComponent implements OnInit {



@Input() servers!: Server[]; 
// In your component class (e.g., `your-component.component.ts`)
 displayedColumns: string[] = ['imageURL', 'ipAddress', 'memory', 'type', 'name', 'status', 'ping', 'actions'];
 serverData = new MatTableDataSource<Server>([]) ;
 servers$ = new Observable<Server[]> ;
 private subscription = new Subscription() ;
  constructor(private communicator : CommunicatorService,
    // private async : AsyncPipe 
  ){} 
  //Use Async Pipe instead
 ngOnInit(): void {
     this.subscription.add(
      this.communicator.servers$.subscribe(servers => {

        this.serverData.data = servers;
      })
    );
    // this.servers$ = this.communicator.servers$;
    // this.serverData = of(new MatTableDataSource<Server>(this.async.transform(this.servers$)!)) ;
      
     
 }

  onDelete(id : number) {   
    this.communicator.deleteServer(id) ;    
  }

  
  onPing(ipAddress: string) {
    const serverPinged : Server = this.serverData.data.find(server => server.ipAddress === ipAddress)! ;
    setTimeout(() => {
      this.communicator.ping(ipAddress) ;
      serverPinged.loading = false ; 
    }, 6000) ;
    serverPinged.loading = true ;
    
  }
}

