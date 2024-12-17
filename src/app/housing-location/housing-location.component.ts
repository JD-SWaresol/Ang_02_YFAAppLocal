import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  imports: [],
  template: `
    <section class="listing">      
      <img        
        class="listing-photo"        
        [src]="housingLocation.photo"        
        alt="Exterior photo of {{ housingLocation.name }}"        
        crossorigin      
      />      
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>      
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>    
    </section>
    <!--
      'src' guarda la propiedad para construir 'housingLocation.photo'.
      'alt' hace una interpolacion para proporcionar mas contexto al texto del titulo.
      la interpolacion esta presente para mostrar valores de 'name', 'city' y 'state'
    -->
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

  /**
   * El simbolo de '!' indica al TS Compiler que el valor de la propiedad housingLocation no será 'null' o 'undefined'
   */

}
