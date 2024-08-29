import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Server, Status } from '../model/models.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContainer, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommunicatorService } from '../communicator.service';
import { validIP } from '../customValidators/IPAddress.validator';
import { MatIconModule } from '@angular/material/icon';
import { IPAddressExists } from '../customValidators/IPAddressExists.validator';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-server',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogContainer,
    MatDialogModule
  ],
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {
  errorMessage: string = ' ';

  addServer!: FormGroup; // Declare the form group without initialization

  constructor(
    private dialogRef: MatDialogRef<AddServerComponent>,
    private communicator: CommunicatorService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.addServer = new FormGroup({
      ipAddress: new FormControl<string>('', {
        validators: [Validators.required, validIP()],
        asyncValidators: [IPAddressExists(this.http)],
        nonNullable: true
      }),
      name: new FormControl<string>('', {
        validators: Validators.required, 
        nonNullable: true
      }),
      type: new FormControl<string>('', {
        validators: Validators.required,
        nonNullable: true
      }),
      memory: new FormControl<string>('', {
        validators: Validators.required,
        nonNullable: true
      })
    });
  }

  onSubmit() {
    if (this.addServer.invalid) {
      return;
    }
    const server = this.addServer.getRawValue() as Server;
    server.status = Status.SERVER_DOWN;
    this.communicator.addServer(server);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
