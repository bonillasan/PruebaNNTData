import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

 //************** Metodo que consulta la información del usuario  *************/
 public obtenerUsuariosXId(numerdoDocumento:number){
   return this.http.get(`http://localhost:3000/usuarios?numeroDocumento=${numerdoDocumento}`);
  }
  public obtenerUsuarios(url:string){
    return this.http.get(url);
  }
}
