import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Schedule } from './../../models/schedule';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { worker } from '../../app/global';
import { FirebaseApp } from 'angularfire2';

/**
 * Generated class for the GenSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-gen-schedule',
  templateUrl: 'gen-schedule.html',
})
export class GenSchedulePage {
  scheItem = {} as Schedule;
  maxDay = 30;
  year: string = "2018";
  month: string = "1";
  scheItemRef$: FirebaseListObservable<Schedule[]>
  workerData = [];
  createMonth = 1;
  Month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(private db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.scheItemRef$ = this.db.list('sche-list');
    this.db.list('profile').subscribe(data => {
      for(let i = 0; i < data.length; i++){
        if (data[i].workerID.charAt(0)=='A')
          this.workerData.push(data[i]);
      }
      console.log(this.workerData);
    });
  }

  private deleteSchedule() {
      this.scheItemRef$.remove();
      this.navCtrl.pop();
  }

  addScheduleItem(postItem: Schedule) {
    this.scheItemRef$.push(this.scheItem);
    this.scheItem = {} as Schedule;
  }

  private createSchedule() {
    this.month = this.createMonth.toString();
    let count = 0;
    for (let day = 1; day <= this.Month_day[this.createMonth-1]; day++) {
 
      this.scheItem.date = this.year + '/' + this.month + '/' + day;
      for (let no = 0; no < 3; no++) {

        let shift1: string = "", shift2: string ="";
        for (let i = 0; i < 2; i++ , count++) {
          if (i == 0) shift1 = this.workerData[count % 9].username;
          else shift2 = this.workerData[count % 9].username;
        }
        if (no == 0) {
          this.scheItem.firstShift1 = shift1;
          this.scheItem.firstShift2 = shift2;
        }
        else if (no == 1) {
          this.scheItem.secondShift1 = shift1;
          this.scheItem.secondShift2 = shift2;
        }
        else {
          this.scheItem.thirdShift1 = shift1;
          this.scheItem.thirdShift2 = shift2; 
        }
      }
      this.addScheduleItem(this.scheItem);
    }

      this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenSchedulePage');
  }

}
