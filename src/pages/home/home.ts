import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController,
  ToastController
} from 'ionic-angular';
import { PostFormPage } from '../post-form/post-form';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile } from './../../models/profile';
import firebase from 'firebase';

import { Post } from './../../models/post';
import { EditPostItemPage } from '../edit-post-item/edit-post-item';
import { globalUser } from '../../app/global';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postItemRef$: FirebaseListObservable<Post[]>
  postItem : any;

  email: string;
  userID = globalUser.workerID;

  constructor(
    private fire: AngularFireAuth,
    private db: AngularFireDatabase,
    private toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
  ) {
    this.email = fire.auth.currentUser.email;
    this.postItemRef$ = this.db.list('post-list');
    //this.postItemRef$.subscribe(x => console.log(x));
    
  }

  ionViewWillEnter(){
    //console.log(globalUser.username);
    this.getPostItem();
  }

  showPostForm() {
    this.navCtrl.push(PostFormPage);
  }

  selectPostItem(postItem: Post){
    /*
      1. edit()
      2. delete()
      3.cancle()
    */
    this.actionSheetCtrl.create({
      title: `${postItem.title}`,
      buttons: [
        {
          text: '編輯',
          handler: () =>{
            //send to editPostPage and pass the key as a parameter
            this.navCtrl.push(EditPostItemPage,
             {postItemId: postItem.$key});
          }
        },
        {
          text: '刪除',
          role: 'destructive',
          handler: ()=>{
            this.postItemRef$.remove(postItem.$key);
            this.getPostItem();
          }
        },
        {
          text: '取消變動',
          role: 'cancle',
          handler:()=>{
            console.log("has selected the cancle button");
          }
        }
      ]
    }).present();
  }

  ionViewDidLoad() {
    this.fire.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to C8C8, ` + globalUser.username,
          duration: 3000
        }).present();

      }
      else {
        this.toast.create({
          message: `Could not find authention details`,
          duration: 3000
        }).present();
      }
    })

  }

  goToPostDetail(post: any) {
  }

  private getPostItem(){
    this.db.list('post-list').subscribe(data =>{
      this.postItem = data;
      this.postItem.reverse();
      console.log(this.postItem);
    });
  }

}
