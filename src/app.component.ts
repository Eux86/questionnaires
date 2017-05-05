import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
      private authService: AuthenticationService
    )   
    {
        
    }

    title = 'Questionnaires';
    isLogged: Boolean = false;

    ngOnInit(): void {
        this.isLogged = this.authService.isAdmin();
    }
}