import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ],
      declarations: [ HomeComponent ],
      providers:[
        HttpClient
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar el formulario',() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    const form = app.userForm;
    const tipoDocumento = app.userForm.controls['tipoDocumento']
    const numeroDocumento = app.userForm.controls['numeroDocumento']
    numeroDocumento.setValue('1062327775')
    tipoDocumento.setValue('CC')
    expect(form.valid).toBeTruthy();
  })
});
