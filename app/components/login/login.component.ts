import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                         from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  
  username: string;
  password: string;


  constructor(
    private route: ActivatedRoute,
	  private location: Location,
    private authService: AuthenticationService,
  ) { }
  


  ngOnInit(): void {
    
  }

  login():void {
    this.authService.login(this.username,this.password);
  }
}
