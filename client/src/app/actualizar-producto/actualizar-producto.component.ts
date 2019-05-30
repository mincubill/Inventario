import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  agregado : boolean;
  error : boolean;
  Productos = [];
  ActualizarProductoForm : FormGroup;
  constructor(private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) { 
    this.ActualizarProductoForm = formBuilder.group({
      producto: [''],
      nombre: [''],
      descripcion: [''],
      precio: [''],
      inventario: [''],
    });
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos() {
    this.http.post('http://127.0.0.1:3000/getProductsByStorage', {
      storage: 1
    }).subscribe( ( res : any[] ) => {
      this.Productos = res;
    },
    ( error ) => {
      console.log( error );
    });
  }

  
  ActualizarProductos() {
    this.http.post('http://127.0.0.1:3000/updateProduct', {
      id: this.ActualizarProductoForm.controls.producto.value,
      name: this.ActualizarProductoForm.controls.nombre.value,
      description: this.ActualizarProductoForm.controls.descripcion.value,
      price: this.ActualizarProductoForm.controls.precio.value,
      store: this.ActualizarProductoForm.controls.inventario.value
    }).subscribe( ( res : any ) => {
      if(+res == 1) 
      this.agregado = true;
      else  
      this.error = true;
    },
    ( error ) => {
      console.log( error );
      this.error = true;
    });
  }

  ProductoChanged(e) {
    this.Productos.forEach( ( p ) => {
      if( p.ID == e ) {
        this.ActualizarProductoForm.controls.nombre.setValue(p.NAME);
        this.ActualizarProductoForm.controls.descripcion.setValue(p.DESCRIPTION);
        this.ActualizarProductoForm.controls.precio.setValue(p.PRICE);
        this.ActualizarProductoForm.controls.inventario.setValue(p.STORE);
        return;
      }
    });
  }

  LimpiarCampos() {
    this.ActualizarProductoForm.controls.nombre.setValue('');
    this.ActualizarProductoForm.controls.descripcion.setValue('');
    this.ActualizarProductoForm.controls.precio.setValue('');
    this.ActualizarProductoForm.controls.inventario.setValue(0);
    this.CargarProductos();
  }

  confirmDialog() {
    const dialogData = new PopupModel('Confirmacion', '¿Guardar producto ingresado?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.ActualizarProductos();
        this.LimpiarCampos();
      }
    });
  }
  
}
