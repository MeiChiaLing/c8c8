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
  selector: 'page-switch',
  templateUrl: 'switch.html',
})
export class SwitchPage {

  profile = {} as Profile; //profile as a new object of Profile
  switch_time = {
    date: "",
    time : "1"
  };
  want_time = {
    date: "",
    time: "1"
  };
  sche : any;

  constructor(private fire: AngularFireAuth, private db: AngularFireDatabase,
     public navCtrl: NavController,public navParams: NavParams) {
  }

  private checkSche(){
    this.db.list('sche-list').subscribe(data => {
      this.sche = data;
      console.log(this.sche);
      /*
      for(let i = 0; i < this.sche.length; i++){
        if(this.switch_time.date == this.sche[i].date){
            if(this.switch_time.time == 1){
              if(globalUser.username == this.sche[i].firstShift1 || globalUser.username == this.sche[i].firstShift2){
                this.createSwitch();
                return;
              }
            }else if(this.switch_time.time == 2){
              if(globalUser.username == this.sche[i].secondShift1 || globalUser.username == this.sche[i].secondShift2){
                this.createSwitch();
                return;
              }
            }else if(this.switch_time.time == 3){
              if(globalUser.username == this.sche[i].thirdShift1 || globalUser.username == this.sche[i].thirdShift2){
                this.createSwitch();
                return;
              }
            }
            alert("時段選擇錯誤!!");
            break;
        } 
      }
      */
      if(this.switch_time.date != "" && this.want_time.date != ""){
        this.createSwitch();
      }else
        alert("未選擇時段!!");

    });
    
  }

  private createSwitch(){
    if(this.switch_time.time == "1")
      this.switch_time.time = "早班";
    else if(this.switch_time.time == "2")
      this.switch_time.time = "午班";
    else
      this.switch_time.time = "晚班";

    if(this.want_time.time == "1")
      this.want_time.time = "早班";
    else if(this.want_time.time == "2")
      this.want_time.time = "午班";
    else
      this.want_time.time = "晚班";
    
      this.db.list('/chat').push({
        username: globalUser.username,
        message: "求換班!!!!",
        image : globalUser.image,
        time : new Date().toLocaleString(),
        switch_time : this.switch_time,
        want_time : this.want_time,
        switch : false
      }).then(() => {
        console.log("switch crteat.");
      });
  }

}
