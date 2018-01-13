import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  selector: 'page-switch',
  templateUrl: 'switch.html',
})
export class SwitchPage {
  profileItemRef$: any;

  profile = {} as Profile; //profile as a new object of Profile
  switch_time = {
    date: "",
    time: "1",
    sche_uid: "",
    sche_time: ""
  };
  want_time = {
    date: "",
    time: "1",
    sche_uid: "",
    sche_time: ""
  };
  sche: any;

  constructor(public alertCtrl: AlertController,
    private fire: AngularFireAuth, private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  private checkSche() {
    this.db.list('sche-list').subscribe(data => {
      this.sche = data;
      console.log(this.sche);

      if (this.switch_time.date != "" && this.want_time.date != "") {

        for (let i = 0; i < this.sche.length; i++) {
          if (this.switch_time.date == this.sche[i].date) {
            if (this.switch_time.time == "1") {
              if (globalUser.username == this.sche[i].firstShift1) {
                this.switch_time.sche_time = "firstShift1";
                this.createSwitch(this.sche[i]);
                return;
              }
              if (globalUser.username == this.sche[i].firstShift2) {
                this.switch_time.sche_time = "firstShift2";
                this.createSwitch(this.sche[i]);
                return;
              }
            } else if (this.switch_time.time == "2") {
              if (globalUser.username == this.sche[i].secondShift1) {
                this.switch_time.sche_time = "secondShift1";
                this.createSwitch(this.sche[i]);
                return;
              }
              if (globalUser.username == this.sche[i].secondShift2) {
                this.switch_time.sche_time = "secondShift2";
                this.createSwitch(this.sche[i]);
                return;
              }
            } else if (this.switch_time.time == "3") {
              if (globalUser.username == this.sche[i].thirdShift1) {
                this.switch_time.sche_time = "thirdShift1";
                this.createSwitch(this.sche[i]);
                return;
              }
              if (globalUser.username == this.sche[i].thirdShift2) {
                this.switch_time.sche_time = "thirdShift2";
                this.createSwitch(this.sche[i]);
                return;
              }
            }
            let alert = this.alertCtrl.create({
              title: '時段選擇錯誤!!',
              buttons: ['OK']
            });
            alert.present();
            break;
          }
        }
        /*
        if(this.switch_time.date != "" && this.want_time.date != ""){
          this.createSwitch();
        }else
          alert("未選擇時段!!");
        */
      }
      else{
        let alert = this.alertCtrl.create({
          title: '未選擇時段!!',
          buttons: ['OK']
        });
        alert.present();
      }
    });


  }

  private createSwitch(sche) {

    this.switch_time.sche_uid = sche.$key;

    for (let i = 0; i < this.sche.length; i++) {
      if (this.want_time.date == this.sche[i].date) {
        this.want_time.sche_uid = this.sche[i].$key;
      }
    }

    if (this.switch_time.time == "1")
      this.switch_time.time = "早班";
    else if (this.switch_time.time == "2")
      this.switch_time.time = "晚班";
    else
      this.switch_time.time = "夜班";

    if (this.want_time.time == "1")
      this.want_time.time = "早班";
    else if (this.want_time.time == "2")
      this.want_time.time = "晚班";
    else
      this.want_time.time = "夜班";

    this.profileItemRef$ = this.db.object(`chat/${this.switch_time.date}`);

    this.db.list('/chat').push({
      username: globalUser.username,
      message: "求換班!!!!",
      image: globalUser.image,
      time: new Date().toLocaleString(),
      switch_time: this.switch_time,
      want_time: this.want_time,
      switch: false
    }).then(() => {
      console.log("switch crteat.");
    });
  }

}