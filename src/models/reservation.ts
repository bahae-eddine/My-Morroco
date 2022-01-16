import { User } from './user';
import { Ville } from './ville';
import firebase from 'firebase/compat/app';

import Timestamp = firebase.firestore.Timestamp;


export interface Reservation {
    dateDebut?: Timestamp;
    dateFin?: Timestamp;
    ville?: Ville;
    user?: string;
    dateDebutString?: string;
    dateFinString?: string;
};
