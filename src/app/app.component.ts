import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActionBarComponent} from './action-bar/action-bar.component';
import { ServerListComponent } from './server-list/server-list.component';
import { CommunicatorService } from './communicator.service';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActionBarComponent, ServerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private communicator  : CommunicatorService, private router : Router){}
  ngOnInit(): void {
      this.communicator.router$.subscribe(
        data => { 
          if(data) {
          this.router.navigate(['error']) ;
          }
        }
      )
  }
}
