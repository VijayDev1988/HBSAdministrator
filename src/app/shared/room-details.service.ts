import { Injectable } from '@angular/core';
import { RoomDetails, RoomDetailsList } from './room-details.model';
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {

  constructor(private http:HttpClient,
    private toastr:ToastrService,) { }

  formdata:RoomDetails = new RoomDetails();
  formdataList:RoomDetailsList = new RoomDetailsList();
  list:RoomDetailsList[];
  UserName:string |null; 

  readonly baseURL = "https://localhost:44377/api/v1/Room";
  readonly getURL = "https://localhost:44377/api/v1/Room/RoomStatus?bookingDate=";


  addHeader(){
    return  new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*')
                    .set('Authorization', `Bearer ${localStorage.getItem("token")}`);
  }

  postRoomDetails(){
    const httpOptions = {
      headers: this.addHeader()
    };

    return this.http.post<any>(this.baseURL,this.formdata,httpOptions); 
  }

  getRoomDetails(){
    
    const httpOptions = {
      headers: this.addHeader()
    };

    return this.http.get<any>(this.getURL+this.formdataList.bookingDate, httpOptions)
    .toPromise()
    .then(res=>{
      console.info(res.succeeded);
      if(res.succeeded){
        var result = res.data as RoomDetailsList[];
       result.map(function(value,index){
        value.roomTypeName = value.roomType == 0 ? "Single" : "Double";
      });

      this.list = result;
      }
      else {
        
        this.toastr.error("Fill booking date", "Hotel Booking System");    
      }

    },
    err=>{
      this.toastr.error("Fill booking date", "Hotel Booking System");
    }
    ); 
  }
}
