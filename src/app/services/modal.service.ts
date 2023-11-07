import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  private currentStepSubject = new BehaviorSubject<number>(1);
  private currentModalSubject = new Subject<string>;

  showModal$ = this.showModalSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  currentModal$ = this.currentModalSubject.asObservable();

  constructor() { }

  openModal(modalType: string) {
    this.showModalSubject.next(true);
    this.currentModalSubject.next(modalType)
    this.currentStepSubject.next(1);
  }

  closeModal() {
    this.showModalSubject.next(false);
    this.resetSteps();
  }

  setCurrentModal(modelType: string){
    this.currentModalSubject.next(modelType)
  }

  nextStep(){
    const currentStep = this.currentStepSubject.value;
    this.setCurrentStep(currentStep+1)
  }

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  resetSteps() {
    this.currentStepSubject.next(1);
  }
}
