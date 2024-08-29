import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActionBarComponent} from './action-bar/action-bar.component';
import { ServerListComponent } from './server-list/server-list.component';
import { CommunicatorService } from './communicator.service';
import { ErrorComponent } from './error/error.component';
import { MainPageComponent } from './main-page/main-page.component';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActionBarComponent, ServerListComponent, ErrorComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//to be reviewed
export class AppComponent implements OnInit{
  constructor(private communicator  : CommunicatorService, private router : Router){}
  errorPage : string = '' ;//inline initializations precede any constructor or intializatioon function
  ngOnInit(): void {
      this.communicator.error$.subscribe(
        data => { 
          if (data) {
            this.errorPage = 'Error' ;
          }
          else {
            this.errorPage = 'No Error'; 
          }    
        }
      )
  }
}
