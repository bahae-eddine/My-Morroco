import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ville } from 'src/models/ville';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  villes: Ville[]=[];

  constructor( private authService: AuthenticationService,
    private router: Router,
    private fireStore: AngularFirestore,
    ) {
        const ref = this.fireStore.collection('villes');
        ref.get().toPromise().then((r) => {
          r.docs.forEach((d) => {
            let obj: Ville={};
            obj = d.data();
            obj.id = d.id;

            this.villes.push(obj);
          });
        });

        console.log(this.villes);
      }

  ngOnInit() {
  }

}
