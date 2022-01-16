import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/models/reservation';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

import firebase from 'firebase/compat/app';

import Timestamp = firebase.firestore.Timestamp;


@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.page.html',
  styleUrls: ['./reserver.page.scss'],
})
export class ReserverPage implements OnInit {


  public reservation: Reservation={};
  today = new Date().toISOString();

  constructor(private route: ActivatedRoute,
    private fireStore: AngularFirestore,
    private toastController: ToastController,
    private authService: AuthenticationService) {

  }

  ngOnInit() {}


  reserver(dateDebut, dateFin) {
    this.route.params.subscribe((params: any) => {
      this.reservation.ville = this.fireStore.doc('villes/'+params.id).ref;
      this.reservation.dateDebut = Timestamp.fromDate( new Date(dateDebut.value));
      this.reservation.dateFin = Timestamp.fromDate(new Date(dateFin.value));
      this.fireStore.collection('users').ref.where('uid', '==', this.authService.userDetails().uid).get().then((snapshot) => {
        this.reservation.user = snapshot.docs[0].id;
        if(this.reservation.ville && this.reservation.user){
          const ref = this.fireStore.collection('reservations').add(this.reservation).then((res) => {
              this.printToastMessage();
          });
        }
      });
    });
  }


  async printToastMessage() {
      const toast = await this.toastController.create({
        color: 'success',
        duration: 2000,
        message: 'Reservation effectué'
      });

      await toast.present();
  }

}
