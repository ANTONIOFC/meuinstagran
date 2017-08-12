import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from './../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  submit(){
    let loader = this.loadingCtrl.create({ content: "Cadastrando..."});
    loader.present();

    this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.form.controls['email'].value,
        this.form.controls['password'].value)
      .then(() => {
        loader.dismiss();
            let alert = this.alertCtrl.create({
          title: "Bem vindo!",
          subTitle: "Seu cadastro foi realizado com sucesso. Você já tem acesso ao nosso App",
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "Ops, algo deu errado!",
          subTitle: "Não foi possível realizar seu cadastro.",
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  gotToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
