import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CaptchaService } from '../services/captcha.service';

@Directive({
  selector: '[appMyCaptchaSuma]',
})
export class MyCatchaSumaDirective {
  @Output() captchaVerified = new EventEmitter<boolean>();

  private num1: number = 0;
  private num2: number = 0;
  private sum: number = 0;

  constructor(private captchaSv: CaptchaService) {
    this.generateCaptcha();
  }

  private generateCaptcha() {
    // Generar dos números aleatorios
    this.num1 = Math.floor(Math.random() * 10);
    this.num2 = Math.floor(Math.random() * 10);
    this.sum = this.num1 + this.num2;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    Swal.fire({
      title: '¿Cuál es la suma de los siguientes números?',
      html: `
        <img src="/assets/numeroscaptcha/${this.num1}.png" alt="Número ${this.num1}" style="width: 50px;">
        +
        <img src="/assets/numeroscaptcha/${this.num2}.png" alt="Número ${this.num2}" style="width: 50px;">
      `,
      input: 'text',
      inputAttributes: {
        'aria-label': 'Ingrese la suma de los números'
      },
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      cancelButtonText: 'Cancelar',
      preConfirm: (userInput) => {
        const isVerified = parseInt(userInput) === this.sum;
        this.captchaVerified.emit(isVerified);
      }
    });
  }
}
