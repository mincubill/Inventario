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
  Cuenta = 0;
  constructor(private router : Router, private http : HttpClient) { }

  ngOnInit() {
    this.cargarMorosos();
  }

  cargarMorosos(){
    //Cambiar storage
    this.http.get('http://127.0.0.1:3000/getMovementHeaderWithDebtTop3')
    .subscribe( ( res : any[] ) => {
      this.Morosos = res;   
      this.Cuenta = this.Morosos.length;     
    },
    ( error ) => {
      console.log( error );
    });
    this.Cuenta = this.Morosos.length;
  }
}
