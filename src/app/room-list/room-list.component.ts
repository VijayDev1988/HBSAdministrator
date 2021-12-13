import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomDetailsService } from 'src/app/shared/room-details.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: [],
  providers: [DatePipe]
})
export class RoomListComponent implements OnInit {

  constructor(public service:RoomDetailsService,
    private toastr:ToastrService,
    private router: Router,
    private datePipe: DatePipe
    ) { }


  ngOnInit(): void {
    if(localStorage.getItem("token") ==null){
      this.router.navigateByUrl("/?returnUrl=RoomList");      
    }
    else {
      this.service.UserName  = localStorage.getItem("token")
        }
  }

  populateForm(form:NgForm){
    this.service.getRoomDetails();
  }

  RedirectToPage(form:NgForm){
    console.info("in")
    this.router.navigateByUrl("/RoomDetails");
    return false;
  }

  logOut(form:NgForm){
    form.form.reset();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }}
