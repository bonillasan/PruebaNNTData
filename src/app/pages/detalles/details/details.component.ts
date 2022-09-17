import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  usuario:any=[]
  constructor(private UsuarioSvc:UsuariosService) { }

  ngOnInit(): void {
    this.usuario = new Object(JSON.parse(this.getNombre()));
  }

  public getNombre():any{
    return localStorage.getItem('user');
  }

}
