import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';

//@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild(Content) content: Content;  

  username : string =  globalUser.username;
  message: string = '';
  subscription;

  messages: any;

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
        time : new Date().toLocaleString()
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

}
