import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../beer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit, OnDestroy {

  details: any;
  private destroy$ = new Subject();

  constructor(public router: ActivatedRoute, public service: BeerService) {
  }

  ngOnInit() {
    this.service.detailsOfBeer.pipe( takeUntil(this.destroy$)).subscribe(data => {
      this.details = data;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
