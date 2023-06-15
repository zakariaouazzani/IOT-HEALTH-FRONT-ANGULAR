import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Client } from '../models/clients';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})


export class NavigationBarComponent {
  constructor(
    private storage : StorageService,
    private loginService : LoginService,
    ) { }


    client! : Client; 
    ngOnInit(){
      this.client = this.storage.getClient();
    }

    logout() : void{
      this.loginService.logout();
          console.log("logged out ");
         
        
        
    }
}
