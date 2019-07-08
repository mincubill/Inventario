import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  Prestamos : any;
  Morosos : any;
  excel = [];
  constructor( private service : DataManagerService, private http : HttpClient ) {  
    this.getJson().subscribe(data => {
      data.forEach(row => {
        this.excel.push(row);
      });
    });
  }  
      
  exportAsXLSX(){
    this.service.exportAsExcelFile(this.excel, 'Pedidos Activos');  
  }

  public getJson():Observable<any>
  {    
    return this.http.get('http://127.0.0.1:3000/activeLoans');
  }
  
  ngOnInit() {
    this.http.get('http://127.0.0.1:3000/loans').subscribe( ( res : any ) => {
      this.Prestamos = res;
    }, 
    ( error ) => {
      console.log( error );
    });
    this.http.get('http://127.0.0.1:3000/defaulter').subscribe( ( res : any ) => {
      this.Morosos = res;
    }, 
    ( error ) => {
      console.log( error );
    });    
  }
}
