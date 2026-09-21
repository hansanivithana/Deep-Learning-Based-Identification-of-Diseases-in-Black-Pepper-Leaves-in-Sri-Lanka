import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {

  diseasesNo : any;

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.diseasesNo = this.route.snapshot.params['param'];
  }

}
