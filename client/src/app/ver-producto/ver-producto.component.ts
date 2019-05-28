import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { PopupComponent, PopupModel } from '../popup/popup.component';

import { DataManagerService } from '../data-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  ///Lista con datos duros para probar el ngFor, estos datos deben llegar desde la base de datos
  ///Con una estructura parecida
  Productos = [];
  
  constructor(private router:Router, public dialog: MatDialog)  {

  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {
  }

  EditarProducto(id)
  {
  }

  QuitarProducto(id)
  {
    this.data.QuitarProducto(id);
    this.CargarProductos();
  }

  confirmDialog(id) {
    const dialogData = new PopupModel("Confirmacion", "Eliminar producto seleccionado?");
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res == true)
      {
        this.QuitarProducto(id);
      }
    });
  }
}