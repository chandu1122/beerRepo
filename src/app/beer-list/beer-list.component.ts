import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeerService } from '../beer.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseType } from '../beer-list/beer-list.type';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit, OnDestroy {

  public beerList: ResponseType[];
  private unsubscribe$: Subject<void> = new Subject();
  public defaultIcon = 'https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-medium.png';

  constructor(public service: BeerService, public router: Router) { }

  ngOnInit() {
    this.service.getBeers().pipe(takeUntil(this.unsubscribe$)).subscribe((responseBody: any) => {
      const list =  responseBody.json();
      const fullResponse = JSON.parse(list.data).data;
      this.beerList = this.filterData(fullResponse);
    }, (error) => {
      alert(error);
    });
  }

  // emitting beer details of each beer
  details(beer: any) {
    this.service.getDetails(beer);
    this.router.navigate(['/details'], {queryParams: {id: beer.id}});
  }

  // filtering required data from BrewerryDb
  filterData(response: any[]) {
    const filterList: ResponseType[] = [];
    response.forEach((list: any) => {

      const eachBeer = {
        id: list.id,
        name: list.name,
        abv: list.abv ? list.abv : 'NA',
        ibu: list.ibu ? list.ibu : 'NA',
        isOrganic: list.isOrganic ?  list.isOrganic : 'NA',
        icon: list.labels ? list.labels.large : this.defaultIcon,
        glass: list.glass ? list.glass : false,
        status: list.status ? list.status : 'NA',
        year: list.year ? list.year : 'NA',
      };

      filterList.push(eachBeer);
    });

    return filterList;
  }

  // destorying subscription
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
