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
  eliminado : boolean;
  error : boolean;
  TipoUsuario = "";
  
  constructor(private router : Router, public dialog : MatDialog, private http : HttpClient)  {

  }

  ngOnInit() {
    this.TipoUsuario = localStorage.getItem('type');
    if(this.TipoUsuario == "3"){
      this.CargarProductos();
    }
    else{
      this.CargarProductosPorBodega()
    }
  }

  CargarProductos () {
    this.http.get('http://127.0.0.1:3000/getProductsByStats')
    .subscribe( ( res : any[] ) => {
      this.Productos = res;
      this.EliminarNull(this.Productos);
    },
    ( error ) => {
      console.log( error );
    });
  }

  CargarProductosPorBodega() {
    let storage = 0;
    if ( this.TipoUsuario  == "4" ){
      storage = 1;
    }
    else if ( this.TipoUsuario  == "5"){
      storage = 2;
    }
    else{
      return;
    }
    this.http.post('http://127.0.0.1:3000/getProductsByStorageStats', {
      storage: storage
    })
    .subscribe( ( res : any[] ) => {
      this.Productos = res;
      this.EliminarNull(this.Productos);
    },
    ( error ) => {
      console.log( error );
    });
  }

  EliminarNull(productos) {
    productos.forEach( p => {
      p.BORROWED = p.BORROWED != null ? p.BORROWED : 0;
    });
  }

  EditarProducto()
  {
    this.router.navigateByUrl('ActualizarProducto');
  }

  QuitarProducto(id)
  {
    this.http.post('http://127.0.0.1:3000/updateStatusProduct', {
      id: id,
      status: 0
    }).subscribe( ( res : any ) => {
      if(+res == 1) {
        this.eliminado = true;
        this.CargarProductos();
      }
      else
      {
        this.error = true;
      }
    },
    ( error ) => {
      this.error = true;
      console.log( error );
    });
  }

  confirmDialog(id) {
    const dialogData = new PopupModel('Confirmacion', 'Eliminar producto seleccionado?', '');
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