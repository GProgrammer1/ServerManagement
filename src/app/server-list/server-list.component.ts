import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {  Server } from '../model/models.model';import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Import for mat-icon-button
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommunicatorService } from '../communicator.service';
import { Router, RouterOutlet } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';


@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, RouterOutlet
  ],
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  
@Output() route = new EventEmitter<string>() ;
  @Input()
  servers!: Server[]; 
// In your component class (e.g., `your-component.component.ts`)
displayedColumns: string[] = ['imageURL', 'ipAddress', 'memory', 'type', 'name', 'status', 'ping', 'actions'];
 serverData = new MatTableDataSource<Server>([]) ;
  constructor(private communicator : CommunicatorService,
    private router : Router
  ){}
  
 ngOnInit(): void {
     this.serverData= new MatTableDataSource<Server>(this.servers);
 }

  onDelete(id : number) {
    this.communicator.deleteServer(id) ;
  }

  //to be reviewed
  onPing(ipAddress: string) {
    const serverPinged : Server = this.serverData.data.find(server => server.ipAddress === ipAddress)! ;
    serverPinged.loading = true ;
    
    setTimeout(() => {
      this.communicator.ping(ipAddress) ;
      serverPinged.loading = false ; 
    }, 5000) ;
  }
}

