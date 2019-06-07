import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Data {

  constructor(public storage: Storage){

  }

  getData() {
    return this.storage.get('todos');
  }

  save(data){
    this.storage.set('todos', data);
  }

  saveImg(key,imgData) {
    console.log("saveImg called",key,"with",imgData.substring(0,100))
    this.storage.set('img'+key, imgData)
    this.storage.keys().then((ks) => {
      if(ks) console.log("keys after saveImg", JSON.stringify(ks))
    })
    }
    getImg(key) {
      console.log("getImg called for key",key)
      this.storage.get('img'+key).then((imgData) => {
        console.log("getImg retrived started",JSON.stringify(imgData).substring(0,100))
        return imgData
      })
      }
      removeImg(key) {
        console.log("removeImg called for key",key)
        this.storage.remove('img'+key);
        this.storage.keys().then((ks) => {
          if(ks) console.log("keys after removeImg", JSON.stringify(ks))
        })
        }
}
