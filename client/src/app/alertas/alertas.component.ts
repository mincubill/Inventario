import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  Morosos = [];
  constructor(private router : Router, private http : HttpClient) { }

  ngOnInit() {
    this.cargarMorosos();
    console.log(this.Morosos);
  }

  cargarMorosos(){
    //Cambiar storage
    this.http.get('http://127.0.0.1:3000/getMovementHeaderWithDebt')
    .subscribe( ( res : any[] ) => {
      this.Morosos = res;  
      console.log(this.Morosos)    
    },
    ( error ) => {
      console.log( error );
    });
  }
}
