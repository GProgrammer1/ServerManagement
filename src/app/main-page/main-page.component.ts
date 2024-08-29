import { Component, OnInit} from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { ServerListComponent } from '../server-list/server-list.component';
import { ActivatedRoute } from '@angular/router';
import {  Server } from '../model/models.model';

import { CommunicatorService } from '../communicator.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ActionBarComponent, ServerListComponent],
  templateUrl: './main-page.component.html',
  
})

export class MainPageComponent implements OnInit {
  
  constructor( private route : ActivatedRoute, private communicator : CommunicatorService){}
  servers : Server[] = [] ;
   
  ngOnInit(): void {
     
    this.route.data.subscribe(data => {
      if (data['response'] instanceof Error) {
        this.communicator.route('Server Down') ; 
        return; 
      }
      this.servers = data['response'].data.servers;
    });
  }
}
