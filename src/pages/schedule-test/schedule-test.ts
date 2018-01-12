import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Schedule } from './../../models/schedule';
import { GenSchedulePage } from '../gen-schedule/gen-schedule';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { globalUser } from '../../app/global';


/**
 * Generated class for the ScheduleTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-schedule-test',
  templateUrl: 'schedule-test.html',
})
export class ScheduleTestPage {
  //scheItemRef$: FirebaseListObservable<Schedule[]>

  sche : any;
  private sche_self: any;
  private sche_search: any;
  private searchkeyword: any;
  scheData: string = "self";
  userID = globalUser.workerID;
  

  constructor(private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      //this.scheItemRef$ = this.db.list('sche-list');
  }
  ionViewWillEnter(){
    this.init();
  }

  private init(){
    this.scheData = "self";
    this.sche = [];
    this.sche_self = [];
    this.searchkeyword = "";
    this.getSche();
  }

  showScheduleGenPage() {
    this.navCtrl.push(GenSchedulePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleTestPage');
  }

  private getSche(){
    this.db.list('sche-list').subscribe(data => {
      this.sche = data;
      console.log(this.sche);
      for(let i = 0; i < this.sche.length; i++){
        if(this.sche[i].firstShift1 == globalUser.username || this.sche[i].firstShift2 == globalUser.username ||
            this.sche[i].secondShift1 == globalUser.username || this.sche[i].secondShift2 == globalUser.username ||
            this.sche[i].thirdShift1 == globalUser.username || this.sche[i].thirdShift2 == globalUser.username){
            this.sche_self.push(this.sche[i]);
        }
      }

    });
  }

}
