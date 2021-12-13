import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomDetails } from 'src/app/shared/room-details.model';
import { RoomDetailsService } from 'src/app/shared/room-details.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-room-details-form',
  templateUrl: './room-details-form.component.html',
  styles: [
  ]
})
export class RoomDetailsFormComponent implements OnInit {

  constructor(public service:RoomDetailsService,
    private toastr:ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") ==null){
      this.router.navigateByUrl("/?returnUrl=RoomDetails");
    }
    else {
      this.service.UserName  = localStorage.getItem("token")
        }
  }

  reDirectToLogin(form:NgForm){
    this.router.navigateByUrl("/RoomList");
  }
  onSubmit(form:NgForm){
    this.service.postRoomDetails().subscribe(
      res=>{
        console.info(res.succeeded);
        if(res.succeeded){
          this.resetForm(form);
        this.toastr.success("Room Addedd successfully", "Hotel Booking System")
        }        
      },
      err=>{
        if(!err.error.Succeeded){          
          this.toastr.error(err.error.Message, "Hotel Booking System")
        }
        else {
          this.toastr.error("Unable add room", "Hotel Booking System")
        }
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formdata = new RoomDetails(0,true,1);
  }

  logOut(form:NgForm){
    form.form.reset();
    this.service.formdata = new RoomDetails(0,true,1);
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
