import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation, GeolocationOptions} from '@ionic-native/geolocation';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  title: string;
  description: string;
  key: any;
  public lat = "";
    public lon = "";
    private geoOptions: GeolocationOptions
   constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
   // constructor(public navParams: NavParams, public view: ViewController) {

    }

    ionViewDidLoad() {
      console.log(new Date().toString());
      console.log(JSON.stringify(this.navParams));
      console.log("Edit item details loaded to edit dialog",JSON.stringify(this.navParams.get('item')));
      this.title = this.navParams.get('item').title;
        this.description = this.navParams.get('item').description;
      this.key = this.navParams.get('item').key;
      item.lat = "#######";
				item.lon = "#######";
      }

      editItem(){
        let newItem = {
          title: this.title,
          description: this.description,
        key: this.key,
        item.lat = "#####";
				item.lon = "#####";
        };
      console.log("newItem in dialog edit-item.ts", JSON.stringify(newItem));
        this.view.dismiss(newItem);

      }

      close(){
      console.log("Edit item in edit-item.ts close()")
        this.view.dismiss();
      }

    }
