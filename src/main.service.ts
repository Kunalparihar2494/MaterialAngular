import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class DataItems{
  _id: string | undefined
  name: string | undefined;
  gender: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
}

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor(private _http : HttpClient) { }

  getData(){
    return this._http.get('../assets/tableData.json');
   }
}
