import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { min } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  MatchDocument: boolean = true;
  model: string = '';
  usuario: any = [];
  //************** Se genera la carga de scripts mediante un servicio  *************/
  constructor(private usuarioSvc: UsuariosService, private route: Router, private readonly fb: FormBuilder, private cargarScripts: CargarScriptsService) {
    cargarScripts.cargar(['index']);
  }

  //************** Se crea un FormGroup   *************/
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.initForm();
  }

  //************** Metodo encargado de consultar la información del usuario  *************/
  consultarUsuario = (form: Usuarios) => {
    this.MatchDocument = true;

    //************** Se descomponene los decimales  *************/
    let entrada = form.numeroDocumento.split('.').join('');
    entrada = entrada.split('').reverse();
    let salida = [];
    let aux = '';
    let paginador = Math.ceil(entrada.length / 3);
    for (let i = 0; i < paginador; i++) {
      for (let j = 0; j < 3; j++) {
        if (entrada[j + (i * 3)] != undefined) {
          aux += entrada[j + (i * 3)];
        }
      }
      salida.push(aux);
      aux = '';
      form.numeroDocumento = salida.join('').split("").reverse().join('');
    }
    //************** Se realiza la conexión con el servicio  *************/
    this.usuarioSvc.obtenerUsuariosXId(form.numeroDocumento).subscribe(respuesta => {
      this.usuario = respuesta;
      localStorage.setItem('user', JSON.stringify(respuesta));
      if (this.usuario.length > 0 && this.usuario[0].tipoDocumento == this.userForm.value.tipoDocumento) {
        this.route.navigate(['/details'])
      }
      else {
        this.MatchDocument = false;
      }
    })
  }

  //************** Metodo encargado de las validaciones del formulario  *************/
  initForm(): FormGroup {
    return this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
    });
  }

}
