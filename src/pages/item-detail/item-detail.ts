import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data'

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  title;
  description;
  key: any;
  items;
  public lat = "";
  public lon = "";
  dataService;
  imgData;

  constructor(public navParams: NavParams){

  }

  ionViewDidLoad() {
    console.log("item details ionViewDidLoad",JSON.stringify(this.navParams.get('item')))
      this.title = this.navParams.get('item').title
      this.description = this.navParams.get('item').description
    this.key = this.navParams.get('item').key
    this.lat = this.navParams.get('item').lat
    this.lon = this.navParams.get('item').lon
    this.dataService.storage.get("img"+this.key).then((imgData) => {
      if(imgData){
        console.log("item detail img retrieved length",imgData.toString().length,"starting",JSON.stringify(imgData).substring(0,100))
        this.imgData = imgData
      }
    })
    }}
