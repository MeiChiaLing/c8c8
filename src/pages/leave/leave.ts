import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { LeaveFormPage } from '../../pages/leave-form/leave-form';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Leave } from './../../models/leaveform';
import { globalUser } from '../../app/global';

@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {
  leaveForm: string = "passOrNot";
  permit: boolean = false;

  form_await: Leave[] = [];
  form_processed: Leave[] = [];

  constructor(
    private db: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    if (globalUser.workerID.charAt(0) == 'B') {
      //this is admin, gain auth.
      this.permit = true;
    }
  }

  showLeaveDetail(item: Leave) {
    let alert = this.alertCtrl.create({
      title: '請假原因',
      message: item.about,
      buttons: [
        {
          text: '批准',
          handler: () => {
            console.log('accpet clicked');
            this.db.object(`leave-list/${item.$key}/checkId`).set("pass");
          }
        },
        {
          text: '拒絕',
          handler: () => {
            console.log('reject clicked');
            this.db.object(`leave-list/${item.$key}/checkId`).set("reject");
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showLeaveDetailWorker(item: Leave) {
    let alert = this.alertCtrl.create({
      title: '請假原因',
      message: item.about,
      buttons: [
        {
          text: '刪除',
          role: 'destructive',
          handler: () => {
            console.log('delete clicked');
            this.db.list(`leave-list`).remove(item.$key);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showLeaveDetailWorkerCantDelete(item: Leave) {
    let alert = this.alertCtrl.create({
      title: '請假原因',
      message: item.about,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.db.list('leave-list').subscribe(data => {
      this.leaveForm = "passOrNot";
      this.form_await = [];
      this.form_processed = [];

      for (let i = 0; i < data.length; i++) {
        if (this.permit) {
          if (data[i].checkId == "notYet") {
            this.form_await.push(data[i]);
          } else {
            this.form_processed.push(data[i]);
          }
        }
        else {
          if (data[i].username == globalUser.username) {
            if (data[i].checkId == "notYet") {
              this.form_await.push(data[i]);
            } else {
              this.form_processed.push(data[i]);
            }
          }
        }
      }
    });
  }

  showLeaveForm() {
    this.navCtrl.push(LeaveFormPage);
  }

}