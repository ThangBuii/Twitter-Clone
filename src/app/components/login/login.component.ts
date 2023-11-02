import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  currentStep: number = 0
  password: string = '';
  email:string='';
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


  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static', // Prevent closing on backdrop click
      keyboard: false,
      // Prevent closing when pressing the Escape key
    });
  }

  nextStep() {
    this.currentStep++;
    console.log(this.currentStep)
  }

  resetStep() {
    this.currentStep = 0;
  }

  ngOnInit(): void {
    const currentYear: number = new Date().getFullYear();
    const yearsInPast: number = 200;
    
    for(let day = 1;day<=31;day++){
      this.dayArray.push(day)
    }

    for (let year = currentYear; year >= currentYear - yearsInPast; year--) {
      this.yearArray.push(year);
    }
  }


}
