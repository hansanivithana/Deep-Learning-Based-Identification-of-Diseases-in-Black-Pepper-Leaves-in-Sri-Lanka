import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent implements OnInit {

  @Input() label:string | undefined;
  @Input() btnClass:string | undefined;
  @Input() disable:boolean = false;
  @Input() spinner:boolean = false;
  @Input() type:string = 'submit';

  constructor() { }

  ngOnInit(): void {

  }

}
