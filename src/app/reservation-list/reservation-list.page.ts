import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/models/reservation';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthenticationService } from '../../services/authentication.service';

import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.page.html',
  styleUrls: ['./reservation-list.page.scss'],
})
export class ReservationListPage implements OnInit {

  public reservations: Reservation[]=[];

  constructor(public fireStore: AngularFirestore, public authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authService.userDetails().uid);
    const refUser = this.fireStore.collection('users').ref.where('uid', '==', this.authService.userDetails().uid);
    refUser.get().then((user) => {
     console.log(user.docs[0].id);
     const ref = this.fireStore.collection('reservations').ref.where('user', '==', user.docs[0].id);
     ref.get().then((reservations) => {
      reservations.forEach((reservation) => {
        let reserv: Reservation={};
        reserv = reservation.data();
        const villeRef = this.fireStore.doc('villes/'+reserv.ville.id).ref;
        villeRef.get().then((ville) => {
          reserv.ville = ville.data();
        });
        reserv.dateDebutString = reserv.dateDebut.toDate().getDay() +
        '-' +reserv.dateDebut.toDate().getMonth() +
        '-' +reserv.dateDebut.toDate().getFullYear();
        reserv.dateFinString = reserv.dateFin.toDate().getDay() +
        '-' +reserv.dateFin.toDate().getMonth() +
        '-' +reserv.dateFin.toDate().getFullYear();

        this.reservations.push(reserv);
        //this.reservations.push(reservation.data());
      });
     });
    });
  }

}
