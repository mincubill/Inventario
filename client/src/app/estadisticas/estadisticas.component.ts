import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  Prestamos : any;
  Morosos : any;
  constructor( private http : HttpClient ) { 

  }

  ngOnInit() {
    this.http.get('http://127.0.0.1:3000/loans').subscribe( ( res : any ) => {
      this.Prestamos = res;
    }, 
    ( error ) => {
      console.log( error );
    });
    this.http.get('http://127.0.0.1:3000/defaulter').subscribe( ( res : any ) => {
      this.Morosos = res;
    }, 
    ( error ) => {
      console.log( error );
    });
  }

  
}
