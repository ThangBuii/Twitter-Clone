import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  @ViewChild('content') content!: TemplateRef<any>;


  closeResult: string = '';

  constructor() {}

  // open() {
  //   this.modal.open(this.content).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       console.log(reason);
  //     }
  //   );
  // }
}
