import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DataManagerService } from '../data-manager.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  ///Nombre del usuario que debe llegar desde la base de datos
  ///Cuando el usuario este logeado
  usuario : any;
  constructor(private router : Router) {  
    this.usuario  
  }

  ngOnInit() {
    this.usuario = localStorage.getItem('name');
  }

  LogOut()
  {
    localStorage.removeItem('rut');    
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    location.href = '';
    // this.router.navigate(['']);
  }


}