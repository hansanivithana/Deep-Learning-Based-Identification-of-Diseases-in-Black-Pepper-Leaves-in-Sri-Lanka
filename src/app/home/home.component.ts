import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: any;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('Token');
    if (!this.token) {
      this.router.navigateByUrl("/login");
    }
  }

  diseasesDetails(param: any) {
    this.router.navigate(['/diseases', param])
  }


}
