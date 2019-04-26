import { Injectable } from '@angular/core';
import { ngDevModeResetPerfCounters } from '@angular/core/src/render3/ng_dev_mode';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  Productos = [{id:1, nombre:'Balon Futbol', total:10, disponible:7, prestado:3},
              {id:2, nombre:'Balon Basketbol', total:8, disponible:7, prestado:1},
              {id:3, nombre:'Raqueta Ping-Pong', total:20, disponible:12, prestado:8}];
  Prestamos = [];
  constructor() { }

  ObtenerProductos()
  {
    return this.Productos;
  }

  AgregarProducto(producto)
  {
    this.Productos.push(producto);
  }

  ObtenerProducto(id)
  {
    return this.Productos.filter( p => 
      {
        return p.id == id;
      })
  }

  EditarProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {
        this.Productos[i].nombre == producto.nomnre;
        this.Productos[i].total == producto.total;
        this.Productos[i].disponible == producto.disponible;
        this.Productos[i].prestado == producto.prestado;
      }
    }
  }

  DevolverProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {        
        
      }
    }
  }

  PrestarProducto(producto)
  {
    for(let i in this.Productos)
    {
      if(this.Productos[i].id == producto.Id)
      {
        
      }
    }
  }

  QuitarProducto(id)
  {
    let temp = this.Productos.map(p => 
    {
      if (p.id == id)
      {
        return p;
      }
    })
    let index = this.Productos.indexOf(temp[0]);
    this.Productos.splice(index, 1);
  }

  AgregarPrestamo (Prestamo)
  {
    this.Prestamos.push(Prestamo);
  }
}
