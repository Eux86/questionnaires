import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { environment } from '../environments/environment';
import { Router }   from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
      private authService: AuthenticationService,
      public router: Router
    )   
    {
        
    }

    title = 'Questionnaires';
    isLogged: Boolean = false;

    ngOnInit(): void {
        this.authService.isAdminObservable.subscribe(
            (isAdmin) => this.isLogged = isAdmin,
            () => {},
            () => {}
        )

        this.isLogged = this.authService.isAdmin();
    }
}