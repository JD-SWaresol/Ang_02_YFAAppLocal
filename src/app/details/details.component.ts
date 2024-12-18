import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
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
      <section class="listing-apply">        
        <h2 class="section-heading">Apply now to live here</h2>        
        <form [formGroup]="applyForm" (submit)="submitApplication()">          
          <label for="first-name">First Name</label>          
          <input id="first-name" type="text" formControlName="firstName" />          
          
          <label for="last-name">Last Name</label>          
          <input id="last-name" type="text" formControlName="lastName" />          
          
          <label for="email">Email</label>          
          <input id="email" type="email" formControlName="email" />          
          <button type="submit" class="primary">Apply now</button>        
          
        </form>      
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

  // Form
  applyForm = new FormGroup({    
    firstName: new FormControl(''),    
    lastName: new FormControl(''),    
    email: new FormControl(''),  
  });
  // FormGroup y FormControil permiten la construcción de Forms
  //  FormControl: proporciona un valor por default y la forma del form data. Por ejemplo:
  //          'firstName' es un string y su valor por default es 'empty string'

  constructor(){
    // Dentro del constructor se transforma el Id obtenido de la ruta, de un string a un number
    const housingLocationId = Number(this.route.snapshot.params['id']);

    //Incluimos un llamado a 'HousingService' para pasar el parametro de ruta como un argumento para la función del servicio 'getHousingLocationById'
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {    
    this.housingService.submitApplication(      
      this.applyForm.value.firstName ?? '',      
      this.applyForm.value.lastName ?? '',      
      this.applyForm.value.email ?? '',    
    );  
  }
}
