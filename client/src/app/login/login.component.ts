import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  validador:boolean;
  LoginForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private http : HttpClient, private router : Router ) { 
    this.LoginForm = this.formBuilder.group({
      username: [''],
      password: [''],      
    });
  }

  ngOnInit() {    
  }

  Login() {    
    this.http.post( 'http://127.0.0.1:3000/login', {      
      username: this.LoginForm.controls.username.value,
      password: this.LoginForm.controls.password.value      
    }).subscribe( ( res : any ) => {      
      if(  res != null && res != undefined ) {        
        localStorage.setItem( 'rut', res.RUT );
        localStorage.setItem( 'name', res.NAME );
        localStorage.setItem( 'type', res.TYPE );         
        // this.router.navigate(['']);
        location.href = '';
      }
      else {                
        this.validador = true;        
      }
    },
    (error) => {
      console.log( error );
    });
  }

}
