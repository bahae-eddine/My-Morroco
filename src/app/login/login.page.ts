import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl('/home');
    }
   }

  ngOnInit() {
  }

  signIn(email, password){
    this.authService.signIn(email.value, password.value).then((res) => {
      this.router.navigateByUrl('home');
    }).catch((error) => {
      console.log(error);
    });
  }

}
