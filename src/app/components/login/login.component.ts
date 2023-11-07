import { Component, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private modalService: ModalService) {}

  openModal(modalType:string){
    this.modalService.openModal(modalType);
  }

}
