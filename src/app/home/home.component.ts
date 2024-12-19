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
        <!-- Asignamos el nombre de elemento 'filter' para el campo de texto --> 
        <input type="text" placeholder="Filter by city" #filter />  
        
        <!-- Adjumtamos el evento de consulta al momento de presionar el boton -->
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>      
      </form>    
    </section>
    <section class="results">      
      <!-- 
        Se hace un recorrido de los elementos listados en housingLocationList de HomeComponent

        * Actualizamos la lista recorrida por 'filteredLocationList' ya que será la lista que considerará los filtrados de busqueda
      -->
      <app-housing-location        
      *ngFor="let housingLocation of filteredLocationList"        
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

  // Esto guardara los valores que haran match para el criterio de busqueda ingresado por el usuario.
  // Debe contener el total de valores de locaciones seteadas por default cuando la pagina carga.
  filteredLocationList: HousingLocation[] = [];


  constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  //Metodo para realizar el filtrado de texto para la consulta, recibe el valor del campo de texto de la consulta.
  filterResults(text: string){
    if(!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>      
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),    
    );

    // Esta Funcion usa String filter para comparar el valor de el parametro de texto contra la propiedad 'housingLocation.city'
  }

  
}
