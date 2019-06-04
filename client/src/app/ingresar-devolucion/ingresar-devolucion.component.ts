import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';


@Component({
  selector: 'app-ingresar-devolucion',
  templateUrl: './ingresar-devolucion.component.html',
  styleUrls: ['./ingresar-devolucion.component.css']
})
export class IngresarDevolucionComponent implements OnInit {

  Prestamos = [];
  BuscarPrestamoForm : FormGroup;
  agregado : boolean;
  error : boolean;
  user : any;

  constructor(private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) { 
    this.BuscarPrestamoForm = this.formBuilder.group({
      prestamo: ['']
    });
  }

  ngOnInit() {

  }

  BuscarPrestamo() {
    if(this.BuscarPrestamoForm.controls.prestamo.value.split('-').length > 1) {
      this.ConseguirPrestamosPorRut();
    }
    else {
      this.ConseguirPrestamosPorCodigo();
    }
  }

  ConseguirPrestamosPorRut() {
    this.http.post('http://127.0.0.1:3000/getMovementHeadersByUser', {
      user: this.BuscarPrestamoForm.controls.prestamo.value.split('-')[0]
    }).subscribe( ( res : any[] ) => {
      this.Prestamos = res;
    },
    ( error ) => {
      console.log( error );
    });
    this.LimpiarCampos();
  };

  ConseguirPrestamosPorCodigo() {
    this.http.post('http://127.0.0.1:3000/getMovementHeaderById', {
      idMovementHeader: this.BuscarPrestamoForm.controls.prestamo.value
    }).subscribe( ( res : any[] ) => {
      this.Prestamos = res;
    },
    ( error ) => {
      console.log( error );
    });
    this.LimpiarCampos();
  }

  IngresarDevolucion( idPrestamo ) {
    this.http.post('http://127.0.0.1:3000/changeStatusMovementHeader', {
      id: idPrestamo,
      status: 1
    }).subscribe( ( res : any ) => {
      if(+res == 1) {
        this.agregado = true;
        this.RemoverPrestamoLocal(idPrestamo);
      }
    },
    ( error ) => {
      console.log( error );
      this.error = true;
    });
  }

  ConfirmDialog( idPrestamo ) {
    const dialogData = new PopupModel('Confirmacion', 'Seguro que desea realizar la devolución?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.IngresarDevolucion( idPrestamo );
      }
    });
  };

  RemoverPrestamoLocal(idPrestamo) {
    this.Prestamos.forEach( ( p ) => {
      if(p.ID == idPrestamo) {
        this.Prestamos.splice(this.Prestamos.indexOf(p), 1);
        return;
      }
    });
  }

  LimpiarCampos() {
    this.BuscarPrestamoForm.controls.prestamo.setValue('');
  };

}
