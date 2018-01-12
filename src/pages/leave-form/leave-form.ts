import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Leave } from './../../models/leaveform';
import { AngularFireDatabase , FirebaseListObservable} from 'angularfire2/database-deprecated';

import { globalUser } from '../../app/global';
/**
 * Generated class for the LeaveFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-form',
  templateUrl: 'leave-form.html',
})
export class LeaveFormPage {
  leaveItem = {} as Leave;
  leaveItemRef$: FirebaseListObservable<Leave[]>

  constructor(private db:AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.leaveItem.username = globalUser.username;
      this.leaveItem.workerID = globalUser.workerID;
      this.leaveItem.phone = globalUser.phone;
      this.leaveItem.checkId ="notYet";
      this.leaveItemRef$ = this.db.list('leave-list');
  }

  addLeaveItem(leaveItem: Leave){
    this.leaveItemRef$.push(this.leaveItem);
    this.leaveItem = {} as Leave;

    this.navCtrl.pop();
  }

}
