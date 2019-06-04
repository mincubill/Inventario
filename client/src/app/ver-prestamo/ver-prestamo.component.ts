import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ver-prestamo',
  templateUrl: './ver-prestamo.component.html',
  styleUrls: ['./ver-prestamo.component.css']
})
export class VerPrestamoComponent implements OnInit {

  Prestamos = [];
  constructor( private http : HttpClient, private router : Router ) { 

  }

  ngOnInit() {
    this.http.get('http://127.0.0.1:3000/getMovementHeaders').subscribe( ( res : any[] ) => {
      this.Prestamos = res;
    },
    ( error ) => {
      console.log( error );
    });
  }

  PerfilUsuario() {
    // this.router.navigateByUrl('PerfilUsuario');
  }
}
