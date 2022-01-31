import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  userEmail: string;
  displayName: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.authService.auth.onAuthStateChanged((user) => {
      if(user){
        this.userEmail = user.email;
        this.displayName = user.displayName;
      }else {
        this.router.navigateByUrl('login');
      }
    }, (err) => {
      alert(err.message);
    });
  }
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    console.log('logged out');
  }

}
