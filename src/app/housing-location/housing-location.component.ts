import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterModule],
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

      <!-- 
        'routerLink: Esta directiva permite al ruteador de angular crear enlaces dinamicos en la aplicación' 
        routerLink cuenta con dos entradas, la ruta y el dato dinamico.
      -->
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
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
