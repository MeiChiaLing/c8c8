import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Profile } from '../../models/profile';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase'; //facebook login
import { globalUser } from '../../app/global';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile; //profile as a new object of Profile

  constructor(private fire: AngularFireAuth, private db: AngularFireDatabase,
     public navCtrl: NavController,public navParams: NavParams) {
  }

//access profile node inside firebase througth the person's UID
//object ->set ('cause can have only one object'), list ->push
  createProfile(){
    this.fire.authState.take(1).subscribe(auth => {
        this.db.object(`profile/${auth.uid}`).set(this.profile)
        . then(()=>{
                globalUser.username = this.profile.username;
                globalUser.workerID = this.profile.workerID;
      
                this.navCtrl.setRoot('TabsPage');
              });        
    });
  }

}
