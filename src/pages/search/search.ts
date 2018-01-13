import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { SwitchPage } from '../switch/switch';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';
import { Schedule } from './../../models/schedule';


//@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild(Content) content: Content;

  profileItemRef$: any;

  username: string = globalUser.username;
  workerID = globalUser.workerID;
  message: string = '';
  subscription;

  messages: any;
  switch_time = {
    date: "",
    time: ""
  };
  want_time = {
    date: "",
    time: ""
  };

  constructor(public db: AngularFireDatabase, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.subscription = this.db.list('/chat').subscribe(data => {
      this.messages = data;
      console.log(this.messages);
      //this.content.scrollToBottom(0);
    });

  }

  sendMessage() {
    if (this.message != '') {
      this.db.list('/chat').push({
        username: globalUser.username,
        message: this.message,
        image: globalUser.image,
        time: new Date().toLocaleString(),
        switch_time: this.switch_time,
        want_time: this.want_time,
        switch: false
      }).then(() => {
        //message is sent
      });
      this.message = '';
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ChatPage');
  }

  callFunction() {
    // in order to load to botton for default
    this.content.scrollToBottom(0);
  } // callFunction()
  private goChangePage() {
    this.navCtrl.push(SwitchPage);
  }

  private switchSche(message) {
    let permit: boolean = false;
    this.db.object(`sche-list/${message.want_time.sche_uid}`).subscribe(
      (data: Schedule) => {
        if (message.want_time.time == "早班") {
          if (data.firstShift1 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/firstShift1`).set(message.username);
            permit = true;
          } else if (data.firstShift2 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/firstShift2`).set(message.username);
            permit = true;
          }
        } else if (message.want_time.time == "晚班") {
          if (data.secondShift1 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/secondShift1`).set(message.username);
            permit = true;
          } else if (data.secondShift2 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/secondShift2`).set(message.username);
            permit = true;
          }
        } else if (message.want_time.time == "夜班") {
          if (data.thirdShift1 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/thirdShift1`).set(message.username);
            permit = true;
          } else if (data.thirdShift2 == globalUser.username) {
            this.db.object(`sche-list/${message.switch_time.sche_uid}/${message.switch_time.sche_time}`).set(globalUser.username);
            this.db.object(`sche-list/${message.want_time.sche_uid}/thirdShift2`).set(message.username);
            permit = true;
          }
        }
        if (permit) {
          this.profileItemRef$ = this.db.object(`chat/${message.$key}`);
          message.switch = true;
          this.profileItemRef$.update(message);

          let alert = this.alertCtrl.create({
            title: '換班成功~~',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: '換班失敗',
            buttons: ['OK']
          });
          alert.present();
        }
      })

  }

}