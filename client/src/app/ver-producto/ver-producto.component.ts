import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  ///Lista con datos duros para probar el ngFor, estos datos deben llegar desde la base de datos
  ///Con una estructura parecida
  Productos = [];
  
  constructor(private router:Router, public dialog: MatDialog, private http : HttpClient)  {

  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos () {
    //Cambiar storage
    this.http.post('http://127.0.0.1:3000/getProductsByStorageStats', {
      storage: 1
    }).subscribe( ( res : any[] ) => {
      this.Productos = res;
    },
    ( error ) => {
      console.log( error );
    });
  }

  EditarProducto(id)
  {
  }

  QuitarProducto(id)
  {
    this.http.post('http://127.0.0.1:3000/', {
      id: id,
      status: 0
    }).subscribe( ( res : any ) => {
      if(+res == 1) {
        alert('Eliminado Exitosamente');
        this.CargarProductos();
      }
    },
    ( error ) => {
      console.log( error );
    });
  }

  confirmDialog(id) {
    const dialogData = new PopupModel("Confirmacion", "Eliminar producto seleccionado?");
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.QuitarProducto(id);
      }
    });
  }
}