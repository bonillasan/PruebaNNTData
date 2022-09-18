import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }


 public obtenerUsuariosXId(numerdoDocumento:number){
  console.log("en service ->>",numerdoDocumento);

   return this.http.get(`http://localhost:3000/usuarios?numeroDocumento=${numerdoDocumento}`);
  }

  public obtenerUsuarios(url:string){
    return this.http.get(url);
  }


}
