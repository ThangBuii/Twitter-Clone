import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  currentStep: number = 0
  user = {
    password: '',
    email: '',
    username: '',
    dob: '',
  }
  alerts: any[] = [{
    type: '',
    msg: ``,
    timeout: 5000
  }];
  usernameOrEmailLabel= ''

  yearArray: number[] = [];
  dayArray: number[] = [];
  monthArray: { id: number; value: string }[] = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'October' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' }
  ];



  constructor(private modalService: BsModalService, private router: Router, private userService: UserServiceService) { }

  //close alert
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      backdrop: 'static', // Prevent closing on backdrop click
      keyboard: false,
      // Prevent closing when pressing the Escape key
    });
  }

  openLoginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static', // Prevent closing on backdrop click
      keyboard: false,
      // Prevent closing when pressing the Escape key
    });
  }

  closeLoginModal(){
    this.modalRef?.hide();
    this.resetStep();
  }
  closeRegisterModal(){
    this.modalRef2?.hide();
    this.resetStep();
  }

  nextStep() {
    this.currentStep++;
  }

  resetStep() {
    this.currentStep = 0;
    this.user = {
      password: '',
      email: '',
      username: '',
      dob: '',
    }
  }

  resetUser(){
    this.user = {
      password: '',
      email: '',
      username: '',
      dob: '',
    }
  }

  ngOnInit(): void {
    const currentYear: number = new Date().getFullYear();
    const yearsInPast: number = 200;

    for (let day = 1; day <= 31; day++) {
      this.dayArray.push(day)
    }

    for (let year = currentYear; year >= currentYear - yearsInPast; year--) {
      this.yearArray.push(year);
    }
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  //handle form
  onSubmitLogin1(formData: any) {
    
      
      this.userService.checkUsernameUser(formData.email).subscribe(
        (isAvailable: boolean) => {
          if (!isAvailable) {
            this.alerts.push({
              type: 'info',
              msg: 'Username or email is not existed',
              timeout: 3000
            });
            this.user.email = '';
          } else {
            console.log('Hiiiii ');
            formData.email.includes("@")?this.usernameOrEmailLabel = "Email":this.usernameOrEmailLabel = "Username"
            this.nextStep();
          }

          // Hide loading indicator when the API call is complete
        },
        (error) => {
          console.error('Error checking ', error);

          // Hide loading indicator in case of an error
      

        }
      );
    }

    

    onSubmitLogin2(formData: any){
      const data = {
        username : this.user.email,
        password: this.user.password
      }
      this.userService.loginUser(data).subscribe(
        (response) => {
          if (response.message === "Login successful") {
            // The response is "Login successful", do something here
            this.modalRef?.hide();
            this.redirectToHome();
            this.resetStep()
          } else {
            this.alerts.push({
              type: 'info',
              msg: 'Wrong password',
              timeout: 3000
            });
            this.user.password = ''
          }
        },
        (error) => {
          this.alerts.push({
            type: 'info',
            msg: error.error.message,
            timeout: 3000
          });
          this.user.password = ''
        }
      )
    }

}
