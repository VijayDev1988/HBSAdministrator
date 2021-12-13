import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import { UserDetails } from './user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http:HttpClient) { }

  userdata:UserDetails = new UserDetails();

  readonly loginURL = "https://localhost:44377/api/v1/account/authenticate";


  postLoginDetails(){
    return this.http.post<any>(this.loginURL,this.userdata); 
  }
  
}
