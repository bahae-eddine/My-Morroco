import { Injectable, NgZone } from '@angular/core';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  public auth = getAuth();

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  signIn(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register user with email/password
  registerUser(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return (user !== null) ? true : false;
  }

  userDetails() {
    return this.auth.currentUser;
  }

  logout(){
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      console.log('logged out');
    });
    }

//   // Auth providers
//   authLogin(provider) {
//     return this.ngFireAuth.auth.signInWithPopup(provider)
//     .then((result) => {
//        this.ngZone.run(() => {
//           this.router.navigate(['dashboard']);
//         });
//       this.setUserData(result.user);
//     }).catch((error) => {
//       window.alert(error);
//     });
//   }

//   // Store user in localStorage
//   setUserData(user) {
//     const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
//     const userData: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//     };
//     return userRef.set(userData, {
//       merge: true
//     });
//   }

//   // Sign-out
//   signOut() {
//     return this.ngFireAuth.auth.signOut().then(() => {
//       localStorage.removeItem('user');
//       this.router.navigate(['login']);
//     });
//   }

}
