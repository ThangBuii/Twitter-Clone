import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  private currentStepSubject = new BehaviorSubject<number>(1);
  private currentModalSubject = new Subject<string>;
  private modalRef: any;

  showModal$ = this.showModalSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  currentModal$ = this.currentModalSubject.asObservable();

  constructor(private modalService: NgbModal) { }

  initateModal(modalType: string) {
    this.showModalSubject.next(true);
    this.currentModalSubject.next(modalType)
    this.currentStepSubject.next(1);
  }
  openModal(content: any) {
    this.modalRef = this.modalService.open(content, { backdrop: 'static' });
  }
  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
      this.showModalSubject.next(false);
      this.resetSteps(); // Clear the reference when closed
    }
  }

  setCurrentModal(modelType: string) {
    this.currentModalSubject.next(modelType)
  }

  nextStep() {
    const currentStep = this.currentStepSubject.value;
    this.setCurrentStep(currentStep + 1)
  }

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  resetSteps() {
    this.currentStepSubject.next(1);
  }
}
