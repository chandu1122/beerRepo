import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', component: BeerListComponent },
  { path: 'details', component: BeerDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BeerListComponent,
    BeerDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
