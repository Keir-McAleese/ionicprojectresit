import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import {Data} from '../../providers/data/data';
import {EditItemPage} from '../edit-item/edit-item';
import { Geolocation, GeolocationOptions} from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[],
})
export class HomePage {

  public lat = "";
  public lon = "";
private geoOptions: GeolocationOptions
private cameraOptions: CameraOptions


  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, private geolocation: Geolocation, private camera: Camera, ) {
    updateLocation(item);
    {  console.log("getLocation triggered");
          this.geolocation.getCurrentPosition(this.geoOptions).then((resp) => {
        console.log("location succcess")
              item.lat = resp.coords.latitude.toString()
              item.lon = resp.coords.longitude.toString()
        console.log("lat",item.lat,"lon",item.lon);
        console.log("item in list.ts", JSON.stringify(item));
        this.removeItem(item);
              this.saveItem(item);
        console.log("Edit item in list.ts to at lat lon")
          }).catch((error) => {
              console.log('Error getting location', error.toString(), error.code.toString(), error.message);
        this.lat = error.code.toString()
              this.lon = error.message
          });
      }

    this.dataService.getData().then((todos) => {

      if(todos){
        this.items = todos;
      }

    });

  }

  ionViewDidLoad(){
     this.items = [];


  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        item.key = new Date().getTime();
        item.lat = "######";
        item.lon = "######";
        this.saveItem(item);
        this.updateLocation(item);
        this.updatePhoto(item);
      }
    });
    addModal.present();
  }


  removeItem(item) {
		console.log('remove record by key',item.key,"from length",this.items.length );
		this.items = this.items.filter( i => i.key!=item.key );
		console.log("length now",this.items.length);
		this.dataService.save(this.items);
    }
    editItem(item) {
      console.log("within list.ts",JSON.stringify(item))
          let editModal = this.modalCtrl.create(EditItemPage,{ item: item }); // craetes dialog

          editModal.onDidDismiss((item) => {

              if (item) {
          console.log("item in list.ts", JSON.stringify(item));
          this.removeItem(item);
                  this.saveItem(item);
          console.log("Edit item in list.ts")
              }

          });

          editModal.present();
      }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
  updatePhoto(item) {
    console.log("camera triggered");
    this.camera.getPicture(this.cameraOptions).then((imageData)=>{
      this.dataService.saveImg(item.key,'data:image/jpeg;base64,' + imageData)
    }, (err) =>
    {
      console.log("updatePicture Camera Error" + JSON.stringify(err));
    })
  }
  removeItemIncludingImg(item) {
    console.log('remove item AND image by key',item.key,"from length",this.items.length )
    this.dataService.removeImg(item.key)
    this.removeItem(item)
  }


}
