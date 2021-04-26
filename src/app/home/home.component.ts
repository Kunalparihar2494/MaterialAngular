import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {MainService,DataItems} from '../../main.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[MainService,MatSnackBar]
  
})
export class HomeComponent implements OnInit {
//  listData : MatTableDataSource<any> | any ;
listData  = new MatTableDataSource();
@ViewChild('editDailog',{static:true}) editDailog: TemplateRef<any> | any;
@ViewChild('deleteDailog',{static:true}) deleteDialog: TemplateRef<any> | any;
dataList:any;
displayedColumns:string[] = ["name","gender","email","phone","actions"]
selectedData:any;
maleCount:number = 0;
femaleCount:number = 0;
progress:number = 100;
updateItemList = new DataItems();
genderList:any = ["male","female"];
gender:any;
  constructor(private mainService : MainService,
    public dialog:MatDialog,public _snackBar: MatSnackBar) { }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.mainService.getData().subscribe(
      data=>{    
          this.dataList = data;   
          this.listData.data = this.dataList;
          this.listData.data.forEach((element:any) => {
           if(element.gender == "male"){
             this.maleCount = this.maleCount + 1;
           }
           else{
             this.femaleCount = this.femaleCount + 1;
           }
          });
          console.log("data->",this.listData.data) 
      }    
    ) 
  }

  openDialogEdit(param:any){
      this.selectedData = param;
    //  console.log("param-",param);
      this.updateItemList._id = this.selectedData._id;
      this.updateItemList.name = this.selectedData.name;
      this.updateItemList.email = this.selectedData.email;
     // this.updateItemList.address = this.selectedData.address;
      this.updateItemList.phone = this.selectedData.phone;
      this.dialog.open(this.editDailog);
  }

  openDialogDelete(param:any){
    this.selectedData = param;
   this.dialog.open(this.deleteDialog);
  }

  deleteItemFromList(){
    this.maleCount = 0;
    this.femaleCount = 0;
    this.progress = this.progress - 10;
    this.listData.data = _.pull(this.listData.data,this.selectedData);
    this.listData.data.forEach((element:any) => {
      if(element.gender == "male"){
        this.maleCount = this.maleCount + 1;
      }
      else{
        this.femaleCount = this.femaleCount + 1;
      }
     });

     this._snackBar.open("Item delete successfully!");
   
  }

  updateItem(param:any){
    console.log("param-",param);
    this.listData.data.forEach((element:any) => {      
      if(element['_id'] == this.selectedData["_id"]){
        element.name = param.name;
        element.phone = param.phone;
        element.email = param.email;
       // element.address = param.address;
      }

    });
    this._snackBar.open("Item updated successfully!");
   // console.log("updaed items->",this.updateItemList);
  }
  
}
