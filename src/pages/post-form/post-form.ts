import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from './../../models/post';
import { AngularFireDatabase , FirebaseListObservable} from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';

/**
 * Generated class for the PostFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-post-form',
  templateUrl: 'post-form.html',
})
export class PostFormPage {
  postItem = {} as Post;
  postItemRef$: FirebaseListObservable<Post[]>

  constructor(private db:AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.postItemRef$ = this.db.list('post-list');
      /*
        posi-list:
          0:
            username: 'pastf',
            date: '2018/1/1 12:01',
            title: 'Happy New Year!!'
            content: 'fwegwhrwh'
          1:
            username:...
            .....
      */
  }

  addPostItem(postItem: Post){
    this.postItem.username = globalUser.username;
    this.postItem.image = globalUser.image;
    this.postItem.time = new Date().toLocaleString();
    this.postItem.workerID = globalUser.workerID;
    this.addPostToServer();
  }

  private addPostToServer(){
    this.postItemRef$.push(this.postItem);
    this.postItem = {} as Post;

    this.navCtrl.pop();
  }

}
