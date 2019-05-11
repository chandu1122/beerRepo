import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

  beerList: any;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(public service: BeerService, public router: Router) { }

  ngOnInit() {
    this.service.getBeers().pipe(takeUntil(this.unsubscribe$)).subscribe(response => {
      const list =  response.json();
      this.beerList = JSON.parse(list.data).data;
    }, (error) => {
      this.service.handleError(error);
    });
  }

  details(beer: any) {
    this.service.getDetails(beer);
    this.router.navigate(['/details'], {queryParams: {id: beer}});
  }

}
