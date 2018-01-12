import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

import { IonicStorageModule } from '@ionic/storage';

//import { LoginPage } from '../pages/login/login';
import { LogintestPage } from '../pages/logintest/logintest';
import { SearchPage } from '../pages/search/search';
import { LeavePage } from '../pages/leave/leave';
import { PersonPage } from '../pages/person/person'
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LeaveFormPage } from '../pages/leave-form/leave-form';
import { PostFormPage } from '../pages/post-form/post-form';
import { ProfilePage } from '../pages/profile/profile';
import { EditPostItemPage } from '../pages/edit-post-item/edit-post-item';
import { ScheduleTestPage } from '../pages/schedule-test/schedule-test';
import { GenSchedulePage } from '../pages/gen-schedule/gen-schedule';
import { ForgetPage } from '../pages/logintest/forget/forget';
import { EditPersonPage } from '../pages/edit-person/edit-person';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { firebaseAuth } from "./app.firebase.config";

@NgModule({
  declarations: [
    MyApp,
  //  LoginPage,
    SearchPage,
    LeavePage,
    PersonPage,
    PostFormPage,
    LeaveFormPage,
    HomePage,
    TabsPage,
    LogintestPage,
    ProfilePage,
    EditPostItemPage,
    ScheduleTestPage,
    GenSchedulePage,
    ForgetPage,
    EditPersonPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{},{
      links: [
        { component: LogintestPage, name: 'LogintestPage', segment: 'logintest' },
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' }
      ]
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
//    LoginPage,
    SearchPage,
    LeavePage,
    PersonPage,
    LeaveFormPage,
    PostFormPage,
    HomePage,
    TabsPage,
    LogintestPage,
    ProfilePage,
    EditPostItemPage,
    ScheduleTestPage,
    GenSchedulePage,
    ForgetPage,
    EditPersonPage
  ],
  providers: [
    StatusBar,
    //InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
