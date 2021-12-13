import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomDetailsService } from 'src/app/shared/room-details.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { UserDetailsService } from '../shared/user-details.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public service:UserDetailsService,
    private toastr:ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // this.router.snapshot.queryParams
  }

  onSubmit(form:NgForm){
    this.service.postLoginDetails().subscribe(
      res=>{
        console.info(res.succeeded);
        console.info(res);

        if(res.succeeded){
          localStorage.setItem("token", res.data.jwToken);
          localStorage.setItem("email", res.data.email);
          this.toastr.success("Logged in successfully", "Hotel Booking System")
          this.router.navigateByUrl("/RoomList");
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

}
