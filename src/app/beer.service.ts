import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Http } from '@angular/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  detailsOfBeer: BehaviorSubject<Object> = new BehaviorSubject({});

  constructor(public http: Http) { }

    // get beers
    getBeers(): Observable<any> {
      const beerUrl = 'https://proxybeer.herokuapp.com/api/beerList';
      return this.http.get(beerUrl);
    }

    // handling errors
    handleError(error: any) {
      const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(errMsg);
    }

    getDetails(beer: any) {
      this.detailsOfBeer.next(beer);
    }
}
