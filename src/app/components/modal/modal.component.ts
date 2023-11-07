import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  currentModal?: Observable<string>;
  currentStep?: Observable<number>;
  showModal?: Observable<boolean>;
  @ViewChild('content') content: any;
  user = {
    password: '',
    email: '',
    displayName: '',
    dob: '',
    username: ''
  }
  showError = false;
  otp = 0
  otpValue = ''
  dob = {
    day: 0,
    month: 0,
    year: 0,
  }
  alerts: any[] = [{
    type: '',
    msg: ``,
    timeout: 5000
  }];
  usernameOrEmailLabel = ''

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



  constructor(
    private router: Router,
    private userService: UserServiceService,
    private modalService: ModalService,
    ) {
    this.currentModal = this.modalService.currentModal$;
    this.currentStep = this.modalService.currentStep$;
    this.showModal = this.modalService.showModal$;
  }

  //close alert
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openModal(modalType: string) {
    this.modalService.openModal(modalType)
  }

  closeModal() {
    this.modalService.closeModal();
  }

  setCurrentModal(modal: string) {
    this.modalService.setCurrentModal(modal);
  }

  nextStep() {
    this.modalService.nextStep();
  }

  resetStep() {
    this.modalService.resetSteps();
    this.resetUser()
    this.dob = {
      month: 0,
      day: 0,
      year: 0
    }
  }

  resetUser() {
    this.user = {
      password: '',
      email: '',
      displayName: '',
      dob: '',
      username: ''
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
    if (!formData.email) {
      return;
    }
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
          formData.email.includes("@") ? this.usernameOrEmailLabel = "Email" : this.usernameOrEmailLabel = "Username"
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



  onSubmitLogin2(formData: any) {
    const data = {
      username: this.user.email,
      password: this.user.password
    }
    if (!data.password || !data.username) {
      return;
    }
    this.userService.loginUser(data).subscribe(
      (response) => {
        if (response.message === "Login successful") {
          // The response is "Login successful", do something here
          this.closeModal();
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

  onSubmitRegister1(data: any) {
    console.log(data.email + " " + data.username)
    const userInfo = {
      email: data.email
    }
    if (!data.month || !data.day || !data.year) {
      // Display an error message or handle the invalid date scenario as needed
      return;
    }
    this.userService.checkUsernameAndEmailUser(userInfo).subscribe(
      (response) => {
        if (response.emailExist) {
          this.alerts.push({
            type: 'info',
            msg: 'Username and email is existed',
            timeout: 3000
          });
        } else if (!response.emailExist) {
          this.sendOtp(data.email);
          this.user.dob = this.transferBirthDate(data.month, data.day, data.year)
          this.nextStep();
        }
      },
      (error) => {
        console.error('Error checking ', error);
        // Hide loading indicator in case of an error
      }
    )
  }

  sendOtp(email: string) {
    const data = {
      email: email
    }

    this.userService.sendOTPUser(data).subscribe(
      (response) => {
        this.otp = response;
      },
      (error) => {
        console.error('Error checking ', error);
      }
    )
  }

  transferBirthDate(month: number, day: number, year: number) {
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedYear = year.toString();
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  onSubmitRegister2(data: any) {
    if (!this.otpValue) return;
    if (this.otpValue == this.otp.toString()) {
      this.nextStep();
    } else {
      this.showError = true;
    }
  }

  onSubmitRegister3(formData: any) {
    const data = {
      email: this.user.email,
      password: this.user.password,
      displayName: this.user.displayName,
      dob: this.user.dob,
      username: this.user.username
    }
    if (!this.user.password) return;
    this.userService.registerUser(data).subscribe(
      (response) => {
        if (response.message == 'Account created') {
          this.closeModal()
          this.redirectToHome()
        } else {
          this.alerts.push({
            type: 'info',
            msg: 'Server error',
            timeout: 3000
          });
        }
      }
    )
  }
}
