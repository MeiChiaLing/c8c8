import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';

import { Profile } from './../../models/profile';
import { User } from './../../models/user';
import { EditPersonPage } from '../edit-person/edit-person';
import { globalUser } from '../../app/global';


@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {
  profileItemRef$: FirebaseListObservable<Profile[]>
  profilekey : any;
  profileItem = {} as Profile;
  
  constructor(
    private fire: AngularFireAuth,
    private db: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController) {
      this.profileItemRef$ = this.db.list('profile');
  }

  ionViewDidLoad() {
    this.fire.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        const personRef: firebase.database.Reference = firebase.database().ref(`profile/${data.uid}`);
        personRef.on('value', personSnapshot => {
          this.profileItem = personSnapshot.val();
          console.log(this.profileItem);
          this.profilekey=data.uid;
        });
      }

    })

  }



  

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  
 

  logout() {
    window.location.reload();
  }

  
  changePersonDetail(profileItem : Profile){
    console.log(this.profilekey);
    this.navCtrl.push(EditPersonPage,{profileItemId: this.profilekey});
  }
}