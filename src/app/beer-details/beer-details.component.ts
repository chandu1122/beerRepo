import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent {

  details: any;

  constructor(public router: ActivatedRoute, public service: BeerService) {
    this.service.detailsOfBeer.subscribe(data => {
      this.details = data;
      console.log(this.details);
    });
  }

}
