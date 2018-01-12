import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';//email login
import firebase from 'firebase'; //facebook login

import { User } from "../../models/user";
import { globalUser } from '../../app/global';


import { TabsPage } from '../tabs/tabs';
import { ForgetPage } from './forget/forget';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the LogintestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-logintest',
  templateUrl: 'logintest.html',
})
export class LogintestPage {
  //object
  facebook = {
    loggedin: false,
    name: '',
    profilePicture: '',
    email: ''
  }

  user = {} as User;
  mailtest = "";
  //@ViewChild('username') uname;   #username
  //@ViewChild('password') password;#password

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {
      this.user.email = "worker1@c8c8.com";
      this.user.password = "111111";
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  loginWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.facebook.loggedin = true;
        this.facebook.name = res.user.displayname;
        this.facebook.email = res.user.email;
        this.facebook.profilePicture = res.user.photoURL;
      })
  }

  logoutWithFacebook() {
    this.fire.auth.signOut();
    this.facebook.loggedin = false;
  }

  //for email user
  signIn(user: User) {
    //this.fire.auth.sendPasswordResetEmail(this.uname.value);
    this.fire.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log('got some data ', this.fire.auth.currentUser);
    //    this.alert('Success! You\'re logged in');
        this.setGlobalUserData();
      })
      .catch(error => {
        console.log('got an error ', error);
        this.alert(error.message);
      });

  }
  //another writing
  /*
  async signIn(user: User) {
    //this.fire.auth.sendPasswordResetEmail(this.uname.value);
    try {
      const result = this.fire.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }
    } catch (e) {
      console.error(e);
    }
  }
  */
  //add email user
  async addUser() {
    try {
      const result = await this.fire.auth.createUserWithEmailAndPassword(this.user.email,
        this.user.password);
      console.log('result');
    } catch (err) {
      console.error(err);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogintestPage');
  }

  private forget(){
    this.navCtrl.push(ForgetPage);
  }

  private setGlobalUserData(){
    
    let profileData : any;
    this.fire.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        const personRef: firebase.database.Reference = firebase.database().ref(`profile/${data.uid}`);
        personRef.on('value', personSnapshot => {
          profileData = personSnapshot.val();
          if (profileData.username != "") {
            console.log(profileData);
            //set global user
            globalUser.username = profileData.username;
            globalUser.workerID = profileData.workerID;
            globalUser.phone = profileData.phone;
            globalUser.image = profileData.image;
  
            this.navCtrl.setRoot(TabsPage);
          }
          else this.navCtrl.push(ProfilePage);
        });
      }
    });
    
  }

}
