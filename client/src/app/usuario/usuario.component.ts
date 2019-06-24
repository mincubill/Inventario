import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup, Validators } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  Carreras = [];
  AgregarUsuarioForm : FormGroup;
  ActualizarUsuarioForm : FormGroup;
  EliminarUsuarioForm : FormGroup;
  Opcion : number;
  Agregado = false;
  error = false;

  constructor( private http : HttpClient, private formBuilder : FormBuilder, public dialog : MatDialog ) { 
    this.Opcion = 1;/*Opciones: 1) Agregar  2) Actualizar   3) Eliminar*/
  }

  ngOnInit() {
    this.AgregarUsuarioForm = this.formBuilder.group( {
      rut: [''],
      nombre: [''],
      apellido: [''],
      nombreUsuario: [''],
      correo: [''],
      tipoUsuario: [1],
      carrera: [''],
      telefono: [''],
      direccion: [''],
      contrasena: ['']
    });
    this.ActualizarUsuarioForm = this.formBuilder.group( {
      rut: [''],
      nombre: [''],
      apellido: [''],
      nombreUsuario: [''],
      correo: [''],
      tipoUsuario: [1],
      carrera: [''],
      telefono: [''],
      direccion: [''],
      contrasena: ['']
    });
    this.EliminarUsuarioForm = this.formBuilder.group( {
      rut: [''],
      nombre: [''],
      apellido: [''],
      nombreUsuario: [''],
      correo: [''],
      tipoUsuario: [1],
      carrera: [''],
      telefono: [''],
      direccion: [''],
      contrasena: ['']
    });
    this.CargarCarreras();
  }

  AgregarUsuario () {
    this.http.post('http://127.0.0.1:3000/createUser', {
      rut: this.AgregarUsuarioForm.controls.rut.value,
      name: this.AgregarUsuarioForm.controls.nombre.value,
      latName:this.AgregarUsuarioForm.controls.apellido.value,
      userName:this.AgregarUsuarioForm.controls.nombreUsuario.value,
      mail: this.AgregarUsuarioForm.controls.correo.value,
      type:this.AgregarUsuarioForm.controls.tipoUsuario.value,
      career: this.AgregarUsuarioForm.controls.carrera.value,
      phone: this.AgregarUsuarioForm.controls.telefono.value,
      address:this.AgregarUsuarioForm.controls.direccion.value,
      pass:this.AgregarUsuarioForm.controls.contrasena.value
    }).subscribe( ( res : any ) => {
      if( +res == 1 ) {
        this.Agregado = true;
        this.LimpiarCampos();
      }
      else {
        this.error = true;
      }
    },
    ( error ) => {
      this.error = true;
      console.log( error );
    });
  }

  ActualizarUsuario () {
    this.http.post('http://127.0.0.1:3000/updateUser', {
      rut: this.ActualizarUsuarioForm.controls.rut.value,
      name: this.ActualizarUsuarioForm.controls.nombre.value,
      latName:this.ActualizarUsuarioForm.controls.apellido.value,
      userName:this.ActualizarUsuarioForm.controls.nombreUsuario.value,
      mail: this.ActualizarUsuarioForm.controls.correo.value,
      type:this.ActualizarUsuarioForm.controls.tipoUsuario.value,
      career: this.ActualizarUsuarioForm.controls.carrera.value,
      phone: this.ActualizarUsuarioForm.controls.telefono.value,
      address:this.ActualizarUsuarioForm.controls.direccion.value,
      pass:this.ActualizarUsuarioForm.controls.contrasena.value
    }).subscribe( ( res : any ) => {
      if( +res == 1 ) {
        this.Agregado = true;
        this.LimpiarCampos();
      }
    },
    ( error ) => {
      this.error = true;
      console.log( error );
    });
  }

  EliminarUsuario() {
    this.http.post('http://127.0.0.1:3000/updateUser', {
      rut: this.EliminarUsuarioForm.controls.rut.value,
      status: 0
    }).subscribe( ( res : any ) => {
      if( +res == 1 ) {
        this.Agregado = true;
        this.LimpiarCampos();
      }
    },
    ( error ) => {
      this.error = true;
      console.log( error );
    });
  }

  CambiarMenu( opcion : number) {
    this.Opcion = opcion;
    this.LimpiarCampos();
    this.Agregado = false;
    this.error = false;
  }

  CargarCarreras() {
    this.http.get('http://127.0.0.1:3000/getCareers').subscribe( ( res : any[] ) => {
      this.Carreras = res;
      this.AgregarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
      this.ActualizarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
      this.EliminarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
    },
    ( error ) => {
      console.log( error );
    });
  }

  BuscarUsuario () {
    let rutUsuario : string;
    switch (this.Opcion) {
      case 2:
        rutUsuario = this.ActualizarUsuarioForm.controls.rut.value;
        break;
      case 3:
        rutUsuario = this.EliminarUsuarioForm.controls.rut.value;        
        break;
    }
    this.http.post('http://127.0.0.1:3000/getUserByRut', { rut : rutUsuario }).subscribe( ( res : any ) => {
      res = res[0];
      switch (this.Opcion) {
        case 2:
            this.ActualizarUsuarioForm.controls.rut.setValue(res.RUT);
            this.ActualizarUsuarioForm.controls.nombre.setValue(res.NAME);
            this.ActualizarUsuarioForm.controls.apellido.setValue(res.LASTNAME);
            this.ActualizarUsuarioForm.controls.nombreUsuario.setValue(res.USERNAME);
            this.ActualizarUsuarioForm.controls.correo.setValue(res.MAIL);
            this.ActualizarUsuarioForm.controls.tipoUsuario.setValue(res.TYPE);
            this.ActualizarUsuarioForm.controls.carrera.setValue(res.CAREER);
            this.ActualizarUsuarioForm.controls.telefono.setValue(res.PHONE);
            this.ActualizarUsuarioForm.controls.direccion.setValue(res.ADDREES);
            this.ActualizarUsuarioForm.controls.contrasena.setValue(res.PASS);
          break;
        case 3:
          this.EliminarUsuarioForm.controls.rut.setValue(res.RUT);
          this.EliminarUsuarioForm.controls.nombre.setValue(res.NAME);
          this.EliminarUsuarioForm.controls.apellido.setValue(res.LASTNAME);
          this.EliminarUsuarioForm.controls.nombreUsuario.setValue(res.USERNAME);
          this.EliminarUsuarioForm.controls.correo.setValue(res.MAIL);
          this.EliminarUsuarioForm.controls.tipoUsuario.setValue(res.TYPE);
          this.EliminarUsuarioForm.controls.carrera.setValue(res.CAREER);
          this.EliminarUsuarioForm.controls.telefono.setValue(res.PHONE);
          this.EliminarUsuarioForm.controls.direccion.setValue(res.ADDREES);
          this.EliminarUsuarioForm.controls.contrasena.setValue(res.PASS);
          break;
      }
    },
    ( error ) => {
      console.log( error );
    });
  }

  LimpiarCampos() {
    this.AgregarUsuarioForm.controls.rut.setValue('');
    this.AgregarUsuarioForm.controls.nombre.setValue('');
    this.AgregarUsuarioForm.controls.apellido.setValue('');
    this.AgregarUsuarioForm.controls.nombreUsuario.setValue('');
    this.AgregarUsuarioForm.controls.correo.setValue('');
    this.AgregarUsuarioForm.controls.tipoUsuario.setValue(1);
    this.AgregarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
    this.AgregarUsuarioForm.controls.telefono.setValue('');
    this.AgregarUsuarioForm.controls.direccion.setValue('');
    this.AgregarUsuarioForm.controls.contrasena.setValue('');
    
    this.ActualizarUsuarioForm.controls.rut.setValue('');
    this.ActualizarUsuarioForm.controls.nombre.setValue('');
    this.ActualizarUsuarioForm.controls.apellido.setValue('');
    this.ActualizarUsuarioForm.controls.nombreUsuario.setValue('');
    this.ActualizarUsuarioForm.controls.correo.setValue('');
    this.ActualizarUsuarioForm.controls.tipoUsuario.setValue(1);
    this.ActualizarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
    this.ActualizarUsuarioForm.controls.telefono.setValue('');
    this.ActualizarUsuarioForm.controls.direccion.setValue('');
    this.ActualizarUsuarioForm.controls.contrasena.setValue('');
    
    this.EliminarUsuarioForm.controls.rut.setValue('');
    this.EliminarUsuarioForm.controls.nombre.setValue('');
    this.EliminarUsuarioForm.controls.apellido.setValue('');
    this.EliminarUsuarioForm.controls.nombreUsuario.setValue('');
    this.EliminarUsuarioForm.controls.correo.setValue('');
    this.EliminarUsuarioForm.controls.tipoUsuario.setValue(1);
    this.EliminarUsuarioForm.controls.carrera.setValue(this.Carreras[0].ID);
    this.EliminarUsuarioForm.controls.telefono.setValue('');
    this.EliminarUsuarioForm.controls.direccion.setValue('');
    this.EliminarUsuarioForm.controls.contrasena.setValue('');
  }

  ConfirmDialog() {
    this.error = false;
    this.error = false;
    const dialogData = new PopupModel('Confirmacion', this.Opcion == 1? '¿Guardar nuevo usuario?' : 
                                                      this.Opcion == 2? '¿Seguro que desea actualizar al usuario' : 
                                                                        '¿Seguro de eliminar al usuario?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        switch (this.Opcion) {
          case 1:
              this.AgregarUsuario();
            break;
          case 2:
              this.ActualizarUsuario();
            break;
          case 2:
              this.EliminarUsuario();
            break;
        }
      }
    });
  }
}