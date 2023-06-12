import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../models/clients';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerClientForm!: FormGroup;
  client!: Client;
  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private clientService: ClientService, 
    private router: Router) { }

    ngOnInit(){
    
      this.initForm();
  
     
    }

    initForm() {
      this.registerClientForm = new FormGroup({
        nom: new FormControl( null, [Validators.required]),
        prenom: new FormControl( null, [Validators.required]),
        mac: new FormControl(null, [Validators.required]),
        mail: new FormControl( null, [Validators.required, Validators.email]),
        adresse: new FormControl(null, [Validators.required]),
        tel: new FormControl(null,  [Validators.required]),
        password: new FormControl(null,  [Validators.required]),

      });
    }
    onSubmit() {
      this.clientService.addClient( this.registerClientForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
  
        },
        error: (error) => {
          console.log(error.ok);
          if (error.status == 200) {
            this.router.navigate(['/dashboard']);
          }
        }
      })
    }
}
