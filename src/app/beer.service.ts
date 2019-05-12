import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Http } from '@angular/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  detailsOfBeer: BehaviorSubject<Object> = new BehaviorSubject({});

  constructor(public http: Http) { }

    // get beers using proxy to BrewerryDb
    getBeers(): Observable<any> {
      const proxyUrl = 'https://proxybeer.herokuapp.com/api/beerList';
      return this.http.get(proxyUrl).pipe(catchError(this.handleError));
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
