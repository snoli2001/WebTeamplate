import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageInfo} from "../interfaces/page-info.interface";

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {
  info: PageInfo ={};
  loaded: boolean = false;
  team: any[] = [];
  constructor( private http: HttpClient) {
    console.log('page info ready');

    // read json file
    this.loadInfo();
    this.loadTeam();
  }

  private loadInfo(){
    this.http.get('assets/data/data-pages.json').subscribe( (response:PageInfo) =>{
      this.loaded = true;
      this.info = response;
    })
  }

  private loadTeam(){
    this.http.get('https://astratemplate.firebaseio.com/equipo.json').subscribe((response:any[])=>{
      this.team = response;
      // console.log(response);
    })
  }



}
