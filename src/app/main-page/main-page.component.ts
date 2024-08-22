import { Component, Input, OnInit, Output } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ServerListComponent } from '../server-list/server-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseBody, Server } from '../model/models.model';
import { MatTableDataSource } from '@angular/material/table';
import { E } from '@angular/cdk/keycodes';
import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ActionBarComponent, ServerListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  
  constructor(private router: Router, private route : ActivatedRoute, private communicator : CommunicatorService){}
  servers : Server[] = [] ;
   
  ngOnInit(): void {
     
    this.route.data.subscribe(data => {
      
      if (data['response'] instanceof Error) {
        this.communicator.route('Navigate to error page') ; 
        return; 
      }
      console.log(typeof data['response']);
      
      this.servers = data['response'].data.servers;
      console.log(typeof this.servers + this.servers);
      
    });
  }
}
