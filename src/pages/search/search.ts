import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  username : string =  globalUser.username;
  message: string = '';
  subscription;

  messages: object[]=[];

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.subscription = this.db.list('/chat').subscribe(data => {
      this.messages=data;
    });
  }

  sendMessage() {
    this.db.list('/chat').push({
      username: globalUser.username,
      message: this.message
    }).then(() => {
      //message is sent
    });
    this.message='';
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ChatPage');
  }

}
