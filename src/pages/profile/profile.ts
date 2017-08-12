import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user: string = '';

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth) {

      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user.email;
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  submit(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
