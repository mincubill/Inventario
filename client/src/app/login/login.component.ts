import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  constructor( private data : DataManagerService, private formBuilder: FormBuilder ) { 
    this.LoginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
  }

}
