import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventario';
  user = {
    rut: localStorage.getItem('rut'),
    type: localStorage.getItem('type'),
    name: localStorage.getItem('name'),
  }
}
