import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { unitReducer } from './state/unit.reducer';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    UnitListComponent,
    UnitDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    StoreModule.forRoot({ unit: unitReducer }),
    RouterModule.forRoot([
      { path: '', component: MainpageComponent },
      { path: 'list', component: UnitListComponent },
      { path: 'details/:id', component: UnitDetailComponent },



    ]),
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
