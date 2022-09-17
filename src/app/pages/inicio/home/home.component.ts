import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  MatchDocument: Boolean = true;
  usuario: any = [];
  constructor(private usuarioSvc: UsuariosService, private route: Router, private readonly fb:FormBuilder) {
  }

  userForm!: FormGroup;

  buttonState: Boolean = false;

  ngOnInit(): void {
    this.userForm = this.initForm();
  }

  toogleLoading = (form: Usuarios) => {
    if(form != null){
    this.usuarioSvc.obtenerUsuariosXId(form.numeroDocumento).subscribe(respuesta =>{
      this.usuario = respuesta;
      localStorage.setItem('user', JSON.stringify(respuesta));
      if(this.usuario[0] !=null && this.usuario[0].tipoDocumento == this.userForm.value.tipoDocumento){
        this.buscarUsuario();
      }
      else if(this.usuario[0]){
        this.lanzarAlerta();
      }
    })
  }
  }

  public lanzarAlerta(){
    setTimeout(() =>{
      this.MatchDocument = false;
    },1000)
  }

  public buscarUsuario(){
      this.route.navigate(['/details'])
  }

  initForm(): FormGroup {
    return this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: [Validators.required],
    });
  }


}
