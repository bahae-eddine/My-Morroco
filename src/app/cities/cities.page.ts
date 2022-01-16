import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ville } from 'src/models/ville';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  public ville: Ville={};

  constructor(private route: ActivatedRoute, private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.ville.id = params.id;
      if(this.ville.id){
        const ref = this.fireStore.collection('villes').doc(this.ville.id);
        ref.get().toPromise().then((r) => {
            let obj: Ville={};
            obj = r.data();
            obj.id = this.ville.id;

            this.ville = obj;
          });
        };
      });
  }

}
