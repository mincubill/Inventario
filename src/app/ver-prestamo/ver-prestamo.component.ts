import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'

@Component({
  selector: 'app-ver-prestamo',
  templateUrl: './ver-prestamo.component.html',
  styleUrls: ['./ver-prestamo.component.css']
})
export class VerPrestamoComponent implements OnInit {

  Prestamos = [];
  constructor(private data: DataManagerService) { }

  ngOnInit() {
    console.log(this.data.ObtenerPrestamos());
    this.Prestamos = this.data.ObtenerPrestamos();
  }

}
