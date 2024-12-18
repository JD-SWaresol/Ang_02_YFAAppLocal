import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  imports: [],
  template: `
    <article>      
      <img        
        class="listing-photo"        
        [src]="housingLocation?.photo"        
        alt="Exterior photo of {{ housingLocation?.name }}"        
        crossorigin      
      />      
      <section class="listing-description">        
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>        
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>      
      </section>      
      <section class="listing-features">        
        <h2 class="section-heading">About this housing location</h2>        
        <ul>          
          <li>Units available: {{ housingLocation?.availableUnits }}</li>          
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>          
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>        
        </ul>      
        <!-- 
            Note que indicamos con '?' que en caso de que el el valor obtenido sea 'null' o 'undefined' la aplicación no hará crash.
      -->
      </section>    
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  // ActivatedRoute es una caracteristica de ruteo que permite ingresar a los datos sobre una actual ruta.
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  constructor(){
    // Dentro del constructor se transforma el Id obtenido de la ruta, de un string a un number
    const housingLocationId = Number(this.route.snapshot.params['id']);

    //Incluimos un llamado a 'HousingService' para pasar el parametro de ruta como un argumento para la función del servicio 'getHousingLocationById'
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
