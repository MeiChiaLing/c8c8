import { Component } from '@angular/core';
import { AlertController, NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';

import { Profile } from './../../models/profile';
import { User } from './../../models/user';
import { PersonPage } from '../person/person';
import { globalUser } from '../../app/global';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the EditPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-edit-person',
  templateUrl: 'edit-person.html',
})
export class EditPersonPage {
  
  profileItemSubscription: Subscription;
  profileItemRef$: FirebaseObjectObservable<Profile>;
  profileItem = {} as Profile;

  constructor(private db: AngularFireDatabase,private fire: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {

      //capture the postItemId as a NavParameter
      const profileItemId = this.navParams.get('profileItemId');

      //log out the navParam
      console.log(profileItemId);
      this.profileItemRef$ = this.db.object(`profile/${profileItemId}`);
      //subscribe to the object and assign the result to this.postItem
      this.profileItemSubscription =
      this.profileItemRef$.subscribe(
        profileItem => this.profileItem = profileItem);
  }

  ionViewDidLoad() {
    this.fire.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        const personRef: firebase.database.Reference = firebase.database().ref(`profile/${data.uid}`);
        personRef.on('value', personSnapshot => {
          this.profileItem = personSnapshot.val();
          console.log(this.profileItem);
        });
      }

    })

  }

  editPersonInfo(profileItem: Profile){
    this.profileItemRef$.update(profileItem);
    globalUser.username = this.profileItem.username;
    globalUser.workerID = this.profileItem.workerID;
    globalUser.phone = this.profileItem.phone;
    this.navCtrl.pop(); 
    //this.navCtrl.push(PersonPage);
  }

  ionViewWillLeave() {
    //unsubscribe from the observable while leaving the page
    this.profileItemSubscription.unsubscribe();
  }
  //async pipe: Subscription and unsubscription is handled automatically by angular
}