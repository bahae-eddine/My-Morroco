import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl('/home');
    }else {
      console.log(this.authService.userDetails());
    }
  }

  ngOnInit() {
  }

  signUp(email, password, fname, lname){
    this.authService.registerUser(email.value, password.value).then((res) => {
      updateProfile(this.authService.userDetails(), {
        displayName: `${fname.value} ${lname.value}`, photoURL: ''
      }).then((r) => {
        this.firestore.collection('users').add({uid : this.authService.userDetails().uid}).then((result) => {
          this.router.navigateByUrl('/login');
        });
      });
    }).catch((error) => {
      window.alert(error.message);
    });
  }

}
