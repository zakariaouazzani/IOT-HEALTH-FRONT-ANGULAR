import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/clients';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
addClientForm!: FormGroup;
  client!: Client;

  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService, private router: Router,
    private toastr: ToastrService
    ){}

  ngOnInit(){
    //const id = this.activatedRoute.snapshot.params["id"]
    // console.log(id);
    this.initForm();

    // this.clientService.getCLientByid(id).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.client = data;
    //   },
    //   error: (error: any) => {
    //     console.log(error);
        
    //   }
    // })
  }

  initForm() {
    this.addClientForm = new FormGroup({
      nom: new FormControl( null, [Validators.required]),
      prenom: new FormControl( null, [Validators.required]),
      mac: new FormControl(null, [Validators.required]),
      mail: new FormControl( null, [Validators.required, Validators.email]),
      adresse: new FormControl(null, [Validators.required]),
      tel: new FormControl(null,  [Validators.required]),
    });
  }

  onSubmit() {
    this.clientService.addClient( this.addClientForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']);

      },
      error: (error) => {
        console.log(error);
        if (error.status == 200) {
          this.router.navigate(['/dashboard']);
        }
      }
    })
  }
}
