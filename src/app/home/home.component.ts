import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { NgForOf } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, NgForOf],
  template: `
    <section>      
      <form>        
        <input type="text" placeholder="Filter by city" />        
        <button class="primary" type="button">Search</button>      
      </form>    
    </section>
    <section class="results">      
      <!-- 
        Se hace un recorrido de los elementos listados en housingLocationList de HomeComponent
      -->
      <app-housing-location        
      *ngFor="let housingLocation of housingLocationList"        
      [housingLocation]="housingLocation">
      </app-housing-location>    
    </section>
  `,
  styleUrls: [`./home.component.css`]
})
export class HomeComponent {

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  housingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
