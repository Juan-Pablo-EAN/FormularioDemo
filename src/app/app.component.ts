import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'formulario-factura-demo2';
  public reserva: string = '';
  public fecha: string = '';
  public pais: string = '';
  public tipoDoc: string = '';
  public numeroDoc: string = '';
  public tipoPersona: string = '';
  public razon: string = '';
  public nombres: string = '';
  public apellidos: string = '';
  public correo: string = '';
  public direccion: string = '';
  public paymentSessionID: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paymentID = params['PaymentID'];
      const PNR = params['PNR'];
      const nombre = params['Nombre'];
      const apellido = params['Apellido'];
      const direccion = params['direccion'];
      const pais = params['Pais'];
      const documentoIdentidad = params['DocumentoIdentidad'];

      this.paymentSessionID = paymentID;
      this.reserva = PNR;
      this.nombres = nombre;
      this.apellidos = apellido;
      this.direccion = direccion;
      this.pais = pais;
      this.numeroDoc = documentoIdentidad;
    });
  }

  enviar() {
    window.open(
      `https://localhost:44357/ReceiveDataBill?PaymentID=${this.paymentSessionID}&PNR=${this.reserva}&Date=${this.fecha}&Country=${this.pais}&DocType=${this.tipoDoc}&NumberDoc=${this.numeroDoc}&PersonType=${this.tipoPersona}&BussinesName=${this.razon}&Name=${this.nombres}&Lastname=${this.apellidos}&Email=${this.correo}`,
      '_self'
    );
  }

  onSubmit(data: NgForm) {
    console.log(data.value, 'DATA');

    this.http
      .get('https://localhost:44357/ReceiveDataBill', {
        headers: new HttpHeaders({
          'Content-Type': 'text/html',
        }),
      })
      .subscribe((res) => {
        console.log(res, 'RESPONSE');
      });
  }
}
