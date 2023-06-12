import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/clients';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {
  updateClientForm!: FormGroup;
  client!: Client;

  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientService, private router: Router,
    private toastr: ToastrService
    ){}

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params["id"]
    // console.log(id);
    this.clientService.getCLientByid(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.client = data;
        this.initForm();
      },
      error: (error: any) => {
        console.log(error);
        
      }
    })
  }

  initForm() {
    this.updateClientForm = new FormGroup({
      nom: new FormControl(this.client.nom, [Validators.required]),
      prenom: new FormControl(this.client.prenom, [Validators.required]),
      mac: new FormControl(this.client.mac, [Validators.required]),
      mail: new FormControl(this.client.mail, [Validators.required, Validators.email]),
      adresse: new FormControl(this.client.adresse, [Validators.required]),
      tel: new FormControl(this.client.tel, [Validators.required]),
    });
  }

  onSubmit() {
    this.clientService.editClient(this.client.id!, this.updateClientForm.value).subscribe({
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
    this.toastr.success('Patient updated successfully!');

  }

}
