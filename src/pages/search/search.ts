import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { SwitchPage } from '../switch/switch';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';

//@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild(Content) content: Content;  

  profileItemRef$: any;

  username : string =  globalUser.username;
  workerID = globalUser.workerID;
  message: string = '';
  subscription;

  messages: any;
  switch_time = {
    date: "",
    time : ""
  };
  want_time = {
    date: "",
    time: ""
  };

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.subscription = this.db.list('/chat').subscribe(data => {
      this.messages=data;
      console.log(this.messages);
      //this.content.scrollToBottom(0);
    });
    
  }

  sendMessage() {
    if(this.message != ''){
      this.db.list('/chat').push({
        username: globalUser.username,
        message: this.message,
        image : globalUser.image,
        time : new Date().toLocaleString(),
        switch_time : this.switch_time,
        want_time : this.want_time,
        switch : false
      }).then(() => {
        //message is sent
      });
      this.message='';
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ChatPage');
  }

  callFunction() {
    // in order to load to botton for default
    this.content.scrollToBottom(0);
  } // callFunction()

  private goChangePage(){
    this.navCtrl.push(SwitchPage);
  }

  private switchSche(message){
    this.profileItemRef$ = this.db.object(`chat/${message.$key}`);
    message.switch = true;
    this.profileItemRef$.update(message);
    alert("換班成功~~");

    //剩下改班表那邊 感恩~~~~
  }

}
