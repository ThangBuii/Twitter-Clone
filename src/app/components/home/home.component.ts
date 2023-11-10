import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo?: User
  constructor(private auth: UserServiceService, private router: Router) { }
  ngOnInit(): void {
    var userData = this.auth.loadUserFromLocalStorage();
    if(userData.userID === 0){
      this.redirectToLogin();
    }else{
      this.userInfo = userData
    }
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }

  logOut(){
    this.auth.logOut();
  }
}
