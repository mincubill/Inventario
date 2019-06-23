import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user : any;
  Prestamos = [];

  constructor( private http : HttpClient, private rutaActiva : ActivatedRoute) { 

  }

  ngOnInit() {
    // this.CargarPerfil();
    // this.CargarPrestamos();
  }

  CargarPrestamos() {
    this.http.post('http://127.0.0.1:3000/getMovementHeadersByUser', { user: this.rutaActiva.snapshot.paramMap.get('rut') }).subscribe( ( res : any[] ) => {
      this.Prestamos = res;
    },
    ( error ) => {
      console.log( error );
    });
  }

  CargarPerfil () {
    this.http.post('http://127.0.0.1:3000/getUserByRut', { rut: this.rutaActiva.snapshot.paramMap.get('rut') }).subscribe( ( res : any ) => {
      this.user = {
        rut: res.RUT,
        nombre: res.NAME + ' ' + res.LASTNAME,
        nombreUsuario: res.USERNAME,
        correo: res.MAIL,
        carrera: res.CAREER,
        telefono: res.PHONE,
        direccion: res.ADDRESS
      }
    },
    ( error ) => {
      console.log( error );
    });
  }

}
