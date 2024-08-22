import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServerComponent } from '../add-server/add-server.component'; // Adjust path as needed
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { CommunicatorService } from '../communicator.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  standalone : true,
  imports: [MatFormField, MatToolbar, MatSelect, MatOption, MatLabel, MatIcon, MatTableModule, FormsModule]
})
export class ActionBarComponent {

  selectedStatus = 'ALL' ;
  constructor(private dialog:  MatDialog,
    private communicator : CommunicatorService
  ){}

  onClick() { 
    this.dialog.open(AddServerComponent, {
      width: '500px',
    
    });
  }

  filter() {
    console.log(this.selectedStatus);
    
    this.communicator.filter(this.selectedStatus) ;
  }

  print() : void {
    window.print() ;
  }
}