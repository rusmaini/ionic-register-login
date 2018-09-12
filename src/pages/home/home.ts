import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Profile } from '../../models/profile';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  location: {
    latitude: number,
    longitude: number
  };

  profileData: Observable<any>

  constructor(
    private fireAuth: AngularFireAuth, 
    private fireDatabase: AngularFireDatabase,
    public navCtrl: NavController, 
    private toast:ToastController  
  ) {
  }

  initMap() {

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: {lat: 3.1390, lng: 101.6869}
    });

    //this.directionsDisplay.setMap(this.map);
  }

  ionViewWillLoad(){
    this.fireAuth.authState.subscribe(data=>{
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Welcome..' + data.email,
          duration: 3000
        }).present();
        this.profileData = this.fireDatabase.object('profile/'+data.uid).valueChanges();
        
        this.initMap();

        console.log(this.profileData);
      }
      else{
        this.signOut();
      }
      
    });
  }
  

  signOut(){
    this.navCtrl.setRoot('LoginPage');
    window.location.reload();
  }

}
