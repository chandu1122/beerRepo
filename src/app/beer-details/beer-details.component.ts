import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../beer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResponseType } from '../beer-list/beer-list.type';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnDestroy {

  details: ResponseType;
  private destroy$ = new Subject();

  constructor(public router: ActivatedRoute, public service: BeerService) {
    this.service.detailsOfBeer.pipe( takeUntil(this.destroy$)).subscribe((data: any) => {
      this.details = data;
    });
  }

  // destroying subscription to avoid leaks
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
