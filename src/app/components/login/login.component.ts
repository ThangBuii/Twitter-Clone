import { Component,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('myModal') modalComponent!: ModalComponent;

  constructor(private modalService: ModalService) {}

  openModal(modalType:string) {
    // open the modal using the TemplateRef from the ExampleComponent
    this.modalService.initateModal(modalType)
    this.modalService.openModal(this.modalComponent.content);
  }
}
