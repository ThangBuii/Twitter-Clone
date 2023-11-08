import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ExampleComponent } from '../example/example.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('myModal') modalComponent!: ModalComponent;
  private modalRef: any;

  constructor(private modalService: NgbModal,private modalSer: ModalService) {}

  openModal(modalType:string) {
    // open the modal using the TemplateRef from the ExampleComponent
    this.modalSer.openModal(modalType)
    this.modalRef = this.modalService.open(this.modalComponent.content, { backdrop: 'static' });
  }

  onCloseRequested() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
