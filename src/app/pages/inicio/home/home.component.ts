import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { min } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  MatchDocument: boolean = true;
  usuario: any = [];
  constructor(private usuarioSvc: UsuariosService, private route: Router, private readonly fb:FormBuilder) {
  }

  userForm!:FormGroup;


  checkLimit(min: number, max: number): ValidatorFn {
    console.log(min);

    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
  }


  ngOnInit(): void {
    this.userForm = this.initForm();
  }


  toogleLoading = (form: Usuarios) => {
    this.MatchDocument = true;
    console.log(form);
    console.log("userform ->",this.userForm.valid, "valores", this.userForm);
    this.usuarioSvc.obtenerUsuariosXId(form.numeroDocumento).subscribe(respuesta =>{
      this.usuario = respuesta;
      localStorage.setItem('user', JSON.stringify(respuesta));
      if(this.usuario.length > 0 && this.usuario[0].tipoDocumento == this.userForm.value.tipoDocumento){
          this.buscarUsuario();
      }
      else{
        this.MatchDocument = false;
      }
    })
  }

  public buscarUsuario(){
      this.route.navigate(['/details'])
  }

  initForm(): FormGroup {
    return this.fb.group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
    });
  }

}
