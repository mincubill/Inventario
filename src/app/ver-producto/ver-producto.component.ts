import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  ///Lista con datos duros para probar el ngFor, estos datos deben llegar desde la base de datos
  ///Con una estructura parecida
  Productos = [{id:1, nombre:'Balon Futbol', total:10, disponible:7, prestado:3},
               {id:2, nombre:'Balon Basketbol', total:8, disponible:7, prestado:1},
               {id:3, nombre:'Raqueta Ping-Pong', total:20, disponible:12, prestado:8}];
  constructor() { }

  ngOnInit() {
  }

}
