import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
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
    private router: Router,
    private location: Location,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => 
    {
      if (params['logout'] === "false") {
        this.logout();
      }
	  })
  }

  login(): void {
    this.authService.login(this.username, this.password).then((response) => {
      if (response) {
        window.location.href = '/';   
      } else {
        alert("couldn't login");
      }
    }).catch((ex) => {
      alert('error');
    });
  }

  logout():void{
    this.authService.logout().then((response) => {
      if (response) {
        window.location.href = '/';   
      } else {
        alert("couldn't logout");
      }
    }).catch((ex) => {
      alert('error');
    });
  }
}
