import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'X';
  userInfo?: User
  constructor(private auth: UserServiceService){}
  ngOnInit(): void {
    this.auth.userProfile.subscribe(
      (data) => {
        this.userInfo = data;
      }
    )
  }
}
